import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';

const ORIGIN = 'https://6addac51ba236bd7ef78d610--natura-parquet.netlify.app';
const OUT = join(process.cwd(), 'site-static');
const CONCURRENCY = 16;
const MENTION = 'Illustration générée par IA — ambiance indicative, ni photographie d’un produit Natura ni chantier réel.';

const REQUIRED = [
  '/robots.txt',
  '/sitemap.xml',
  '/assets/site.css',
  '/assets/site.js',
  '/formulaire.html',
  '/fr/',
  '/fr/professionnels/',
  '/fr/parquet-baton-rompu/',
  '/fr/parquet-lames-droites/',
  '/fr/guide-parquet/',
  '/fr/parquet-moderne-salon/',
  '/fr/contact/',
  '/fr/parquet-point-de-hongrie/',
  '/fr/parquet-fabrique-en-france/',
];

function sha256(buf) {
  return createHash('sha256').update(buf).digest('hex');
}

function locs(xml) {
  return [...xml.matchAll(/<(?:[\w-]+:)?loc>([^<]+)<\/(?:[\w-]+:)?loc>/g)].map((m) => m[1].trim());
}

function fileForPath(pathname) {
  const path = decodeURIComponent(pathname.split('?')[0]);
  if (path.endsWith('/')) return `${path.slice(1)}index.html`;
  if (!extname(path)) return `${path.slice(1)}/index.html`;
  return path.slice(1);
}

async function fetchBuf(url, redirects = 0) {
  const response = await fetch(url, {
    redirect: 'manual',
    headers: { 'user-agent': 'natura-static-preview-assembly' },
  });
  if ([301, 302, 303, 307, 308].includes(response.status)) {
    const location = response.headers.get('location');
    if (redirects < 3 && location && location.length < 2000) {
      return fetchBuf(new URL(location, url).href, redirects + 1);
    }
  }
  const buf = Buffer.from(await response.arrayBuffer());
  return { status: response.status, buf, type: response.headers.get('content-type') || '' };
}

async function fetchOk(url) {
  let last;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    last = await fetchBuf(url);
    if (last.status === 200) return last;
    await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
  }
  return last;
}

async function mapPool(items, worker) {
  const out = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      out[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, items.length) }, run));
  return out;
}

function assetUrls(html, pageUrl) {
  const found = new Set();
  const patterns = [
    /(?:href|src|poster)=["']([^"']+)["']/g,
    /srcset=["']([^"']+)["']/g,
  ];
  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      const raw = match[1];
      for (const part of raw.split(',')) {
        const value = part.trim().split(/\s+/)[0];
        if (!value || value.length > 500) continue;
        if (value.startsWith('#') || value.startsWith('data:') || value.startsWith('mailto:') || value.startsWith('tel:') || value.startsWith('javascript:')) continue;
        const rooted = value.startsWith('/') || value.startsWith('http://') || value.startsWith('https://') || value.startsWith('//');
        const relativeFile = /^[.\w/-]+\.[a-z0-9]{2,5}$/i.test(value);
        if (!rooted && !relativeFile) continue;
        let url;
        try {
          url = new URL(value, pageUrl);
        } catch {
          continue;
        }
        if (url.origin !== new URL(ORIGIN).origin) continue;
        if (url.pathname === '/sitemap.xml') continue;
        found.add(url.pathname);
      }
    }
  }
  return found;
}

async function save(pathname, buf) {
  const rel = fileForPath(pathname);
  const dest = join(OUT, rel);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return rel;
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const sitemapRes = await fetchBuf(`${ORIGIN}/sitemap.xml`);
  if (sitemapRes.status !== 200) throw new Error(`sitemap prod ${sitemapRes.status}`);
  const prodXml = sitemapRes.buf.toString('utf8');
  const prodLocs = locs(prodXml);
  if (prodLocs.length !== 1364) throw new Error(`sitemap prod ${prodLocs.length}, attendu 1364`);
  await save('/sitemap.xml', sitemapRes.buf);

  const pages = [...new Set([...prodLocs.map((url) => new URL(url).pathname), ...REQUIRED])];
  const failed = [];
  let done = 0;
  await mapPool(pages, async (pathname) => {
    const res = await fetchOk(`${ORIGIN}${pathname}`);
    done += 1;
    if (done % 200 === 0) console.log(`pages ${done}/${pages.length}`);
    if (res.status !== 200) {
      failed.push(`${res.status} ${String(pathname).slice(0, 160)} (${res.buf.length} octets)`);
      return;
    }
    await save(pathname, res.buf);
  });
  if (failed.length) {
    console.error(failed.slice(0, 20).join('\n'));
    throw new Error(`${failed.length} pages prod en échec`);
  }

  const htmlFiles = [];
  const extra = new Set();
  async function walk(dir) {
    const { readdir } = await import('node:fs/promises');
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name.endsWith('.html')) htmlFiles.push(full);
    }
  }
  await walk(OUT);
  for (const file of htmlFiles) {
    const rel = relative(OUT, file).replaceAll('\\', '/');
    const publicPath = rel.endsWith('index.html') ? `/${rel.slice(0, -'index.html'.length)}` : `/${rel}`;
    const html = await readFile(file, 'utf8');
    for (const pathname of assetUrls(html, `${ORIGIN}${publicPath}`)) extra.add(pathname);
  }
  const assetFailed = [];
  await mapPool([...extra], async (pathname) => {
    const dest = join(OUT, fileForPath(pathname));
    try {
      await readFile(dest);
      return;
    } catch {
      /* pas encore enregistré */
    }
    const res = await fetchOk(`${ORIGIN}${pathname}`);
    if (res.status !== 200) {
      assetFailed.push(`${res.status} ${String(pathname).slice(0, 160)} (${res.buf.length} octets)`);
      return;
    }
    await save(pathname, res.buf);
  });
  if (assetFailed.length) {
    console.error(assetFailed.slice(0, 30).join('\n'));
    throw new Error(`${assetFailed.length} médias prod en échec`);
  }

  const robots = await readFile(join(OUT, 'robots.txt'));
  const publicationSitemap = await readFile(join(process.cwd(), 'publication/sitemap.xml'));
  const prodSet = new Set(prodLocs);
  const nextLocs = locs(publicationSitemap.toString('utf8'));
  const missing = [...prodSet].filter((url) => !nextLocs.includes(url));
  const added = nextLocs.filter((url) => !prodSet.has(url));
  if (missing.length || added.length !== 2 || nextLocs.length !== 1366) {
    throw new Error(`sitemap overlay invalide missing=${missing.length} added=${added.join(',')}`);
  }
  await writeFile(join(OUT, 'sitemap.xml'), publicationSitemap);

  const { cp } = await import('node:fs/promises');
  await cp(join(process.cwd(), 'publication/fr'), join(OUT, 'fr'), { recursive: true });
  await cp(join(process.cwd(), 'public/images/guides'), join(OUT, 'images/guides'), { recursive: true });

  for (const slug of ['guide-baton-rompu-chene-sur-mesure', 'guide-lames-droites-chene-sur-mesure']) {
    const html = await readFile(join(OUT, 'fr', slug, 'index.html'), 'utf8');
    const mention = html.indexOf(MENTION);
    const caption = html.indexOf('</figcaption>');
    const toc = html.indexOf('<aside class="technicalToc">');
    const between = html.slice(caption, mention);
    if (html.split(MENTION).length !== 2 || between !== '</figcaption><p class="guideMention"><em>' || mention > toc) {
      throw new Error(`mention IA mal placée : ${slug}`);
    }
  }

  const observedRedirects = [
    '/fr/espace-pro/ /fr/professionnels/ 301',
    '/fr/espace-pro /fr/professionnels/ 301',
    '/fr/devenir-partenaire/ /fr/professionnels/ 301',
    '/fr/devenir-partenaire /fr/professionnels/ 301',
    '/fr/articles/ /fr/guide-parquet/ 301',
    '/fr/articles /fr/guide-parquet/ 301',
    '/fr/faq/ /fr/guide-parquet/ 301',
    '/fr/faq /fr/guide-parquet/ 301',
    '/fr/catalogue/ /fr/produits/ 301',
    '/fr/catalogue /fr/produits/ 301',
    '/fr/echantillon/ /fr/contact/?type=echantillon 301',
    '/fr/echantillon /fr/contact/?type=echantillon 301',
    '/fr/partenaires/ /fr/professionnels/ 301',
    '/fr/partenaires /fr/professionnels/ 301',
    '/fr /fr/ 301',
  ];
  await writeFile(join(OUT, '_redirects'), `${observedRedirects.join('\n')}\n`);

  let htmlCount = 0;
  async function countHtml(dir) {
    const { readdir } = await import('node:fs/promises');
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) await countHtml(full);
      else if (entry.name.endsWith('.html')) htmlCount += 1;
    }
  }
  await countHtml(OUT);

  const report = {
    originDeploy: '6addac51ba236bd7ef78d610',
    prodSitemapSha256: sha256(sitemapRes.buf),
    prodSitemapUrls: prodLocs.length,
    previewSitemapUrls: nextLocs.length,
    added,
    robotsSha256: sha256(robots),
    htmlFiles: htmlCount,
    assetPaths: extra.size,
    missingProdUrls: missing.length,
    redirectsWritten: observedRedirects.length,
    redirectsNote: 'Le fichier _redirects du déploiement manuel n’est pas téléchargeable (HTTP 404). Ces règles sont celles observées par sondage. Les 822 règles annoncées par Netlify restent dans le déploiement de production et ne doivent pas être écrasées par un remplacement intégral.',
  };
  console.log(JSON.stringify(report, null, 2));
  await writeFile(join(process.cwd(), 'publication/assemblage-compte.json'), JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
