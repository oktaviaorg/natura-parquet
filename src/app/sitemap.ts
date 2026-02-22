import { MetadataRoute } from 'next';
import { products } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://natura-parquets.fr';
  const locales = ['fr', 'de', 'en'];
  const now = new Date().toISOString();

  // Static pages
  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/produits', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/guide-parquet', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/articles', priority: 0.8, changeFrequency: 'daily' as const },
    { path: '/partenaires', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/devenir-partenaire', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/espace-pro', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/echantillon', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/catalogue', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/mentions-legales', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/cgv', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/confidentialite', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  // Generate URLs for static pages in all locales
  const staticUrls = staticPages.flatMap(page =>
    locales.map(locale => ({
      url: `${baseUrl}/${locale}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr${page.path}`,
          de: `${baseUrl}/de${page.path}`,
          en: `${baseUrl}/en${page.path}`,
        },
      },
    }))
  );

  // Generate URLs for products (first 200 most important)
  const productUrls = products.slice(0, 200).flatMap(product =>
    locales.map(locale => ({
      url: `${baseUrl}/${locale}/produits/${product.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: product.featured ? 0.8 : product.badge ? 0.7 : 0.6,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/produits/${product.slug}`,
          de: `${baseUrl}/de/produits/${product.slug}`,
          en: `${baseUrl}/en/produits/${product.slug}`,
        },
      },
    }))
  );

  // Articles
  const articleSlugs = [
    'entretien-parquet-huile-guide-complet',
    'baton-rompu-vs-chevron-differences',
    'parquet-chauffage-sol-compatible',
    'tendances-parquet-2026',
    'renover-ancien-parquet-etapes',
    'chene-europeen-qualite-origine',
  ];

  const articleUrls = articleSlugs.flatMap(slug =>
    locales.map(locale => ({
      url: `${baseUrl}/${locale}/articles/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/articles/${slug}`,
          de: `${baseUrl}/de/articles/${slug}`,
          en: `${baseUrl}/en/articles/${slug}`,
        },
      },
    }))
  );

  // Category pages (gammes and poses)
  const gammes = ['Exclusive', 'Elegance', 'Rustic', 'Country'];
  const poses = ['lame', 'baton-rompu', 'chevron-45', 'chevron-60', 'point-hongrie'];

  const categoryUrls = [
    ...gammes.flatMap(gamme =>
      locales.map(locale => ({
        url: `${baseUrl}/${locale}/produits?gamme=${gamme}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    ),
    ...poses.flatMap(pose =>
      locales.map(locale => ({
        url: `${baseUrl}/${locale}/produits?pose=${pose}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    ),
  ];

  return [...staticUrls, ...productUrls, ...articleUrls, ...categoryUrls];
}
