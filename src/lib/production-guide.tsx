import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';

function readGuide(slug: string) {
  return fs.readFileSync(
    path.join(process.cwd(), 'publication', 'fr', slug, 'index.html'),
    'utf8'
  );
}

function decode(value: string) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function metaContent(html: string, name: string) {
  const match = html.match(new RegExp(`<meta name="${name}" content="([^"]*)"`));
  if (!match) {
    throw new Error(`Balise meta absente : ${name}`);
  }
  return decode(match[1]);
}

export function guideMetadata(slug: string): Metadata {
  const html = readGuide(slug);
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  const image = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  if (!title || !canonical || !image) {
    throw new Error(`Métadonnées incomplètes : ${slug}`);
  }

  return {
    title,
    description: metaContent(html, 'description'),
    keywords: metaContent(html, 'keywords'),
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        fr: canonical,
        'x-default': canonical,
      },
    },
    openGraph: {
      title,
      description: metaContent(html, 'description'),
      url: canonical,
      images: [image],
      locale: 'fr_FR',
    },
  };
}

export default function ProductionGuide({ slug }: { slug: string }) {
  const html = readGuide(slug);
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (!body) {
    throw new Error(`Corps HTML absent : ${slug}`);
  }
  const inner = body[1].replace('<script defer src="/assets/site.js"></script>', '');

  return (
    <>
      <link rel="stylesheet" href="/assets/site.css" />
      <div className="site" data-locale="fr" dangerouslySetInnerHTML={{ __html: inner }} />
      <script src="/assets/site.js" defer />
    </>
  );
}
