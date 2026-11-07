import { readFileSync } from 'fs';
import { join } from 'path';
import { MetadataRoute } from 'next';

// Sitemap servi avec le site statique : les 1 364 URL de production + les 2 guides.
export default function sitemap(): MetadataRoute.Sitemap {
  const xml = readFileSync(join(process.cwd(), 'publication/sitemap.xml'), 'utf8');
  const urls: string[] = [];
  const pattern = /<(?:[\w-]+:)?loc>([^<]+)<\/(?:[\w-]+:)?loc>/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(xml))) urls.push(match[1]);
  return urls.map((url) => ({ url }));
}
