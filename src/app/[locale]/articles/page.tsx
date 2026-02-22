import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Articles & Conseils Parquet | Natura Parquets',
  description: 'Découvrez nos articles et conseils d\'experts sur le parquet chêne : pose, entretien, tendances déco, rénovation. Guide complet pour votre projet parquet.',
  keywords: 'articles parquet, conseils parquet, entretien parquet, pose parquet, tendances parquet, rénovation parquet chêne',
};

// Articles data - will be moved to Supabase later
const articles = [
  {
    id: '1',
    slug: 'entretien-parquet-huile-guide-complet',
    title: {
      fr: 'Comment entretenir un parquet huilé ? Guide complet',
      de: 'Wie pflegt man ein geöltes Parkett? Vollständiger Leitfaden',
      en: 'How to maintain an oiled parquet? Complete guide',
    },
    excerpt: {
      fr: 'Découvrez les meilleures pratiques pour entretenir votre parquet huilé et lui conserver son éclat naturel pendant des années.',
      de: 'Entdecken Sie die besten Praktiken zur Pflege Ihres geölten Parketts.',
      en: 'Discover the best practices to maintain your oiled parquet.',
    },
    category: { fr: 'Entretien', de: 'Pflege', en: 'Maintenance' },
    date: '2026-02-20',
    readTime: 5,
    image: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/natura-parquets/ambiance/artisan-lames-02.jpg',
    featured: true,
  },
  {
    id: '2',
    slug: 'baton-rompu-vs-chevron-differences',
    title: {
      fr: 'Bâton rompu ou Chevron : quelles différences ?',
      de: 'Fischgrät oder Chevron: Was sind die Unterschiede?',
      en: 'Herringbone or Chevron: what are the differences?',
    },
    excerpt: {
      fr: 'Deux motifs de pose élégants qui se ressemblent mais présentent des caractéristiques distinctes. On vous explique tout.',
      de: 'Zwei elegante Verlegemuster, die sich ähneln, aber unterschiedliche Eigenschaften haben.',
      en: 'Two elegant laying patterns that look similar but have distinct characteristics.',
    },
    category: { fr: 'Pose', de: 'Verlegung', en: 'Installation' },
    date: '2026-02-18',
    readTime: 4,
    image: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/natura-parquets/products/herringbone-exclusive-11x70x490-01.jpg',
    featured: true,
  },
  {
    id: '3',
    slug: 'parquet-chauffage-sol-compatible',
    title: {
      fr: 'Parquet et chauffage au sol : le guide de compatibilité',
      de: 'Parkett und Fußbodenheizung: Der Kompatibilitätsleitfaden',
      en: 'Parquet and underfloor heating: the compatibility guide',
    },
    excerpt: {
      fr: 'Tout ce que vous devez savoir pour installer un parquet sur un plancher chauffant : types de pose, précautions, bonnes pratiques.',
      de: 'Alles, was Sie wissen müssen, um ein Parkett auf einer Fußbodenheizung zu verlegen.',
      en: 'Everything you need to know to install parquet on underfloor heating.',
    },
    category: { fr: 'Technique', de: 'Technik', en: 'Technical' },
    date: '2026-02-15',
    readTime: 6,
    image: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/natura-parquets/ambiance/coupe-structure-07.jpg',
    featured: false,
  },
  {
    id: '4',
    slug: 'tendances-parquet-2026',
    title: {
      fr: 'Tendances parquet 2026 : les styles qui cartonnent',
      de: 'Parketttrends 2026: Die angesagtesten Stile',
      en: 'Parquet trends 2026: the most popular styles',
    },
    excerpt: {
      fr: 'Couleurs, formats, finitions : découvrez les tendances qui feront votre intérieur cette année.',
      de: 'Farben, Formate, Oberflächen: Entdecken Sie die Trends des Jahres.',
      en: 'Colors, formats, finishes: discover the trends for this year.',
    },
    category: { fr: 'Déco', de: 'Deko', en: 'Decor' },
    date: '2026-02-10',
    readTime: 4,
    image: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/natura-parquets/ambiance/gammes-teintes-05.jpg',
    featured: true,
  },
  {
    id: '5',
    slug: 'renover-ancien-parquet-etapes',
    title: {
      fr: 'Rénover un ancien parquet : les étapes clés',
      de: 'Ein altes Parkett renovieren: Die wichtigsten Schritte',
      en: 'Renovating an old parquet: the key steps',
    },
    excerpt: {
      fr: 'Votre parquet a vécu ? Ponçage, vitrification ou huile : comment lui redonner une seconde jeunesse.',
      de: 'Ihr Parkett hat gelebt? Schleifen, Versiegeln oder Ölen: So geben Sie ihm eine zweite Jugend.',
      en: 'Your parquet has seen better days? Sanding, sealing or oiling: how to give it a second life.',
    },
    category: { fr: 'Rénovation', de: 'Renovierung', en: 'Renovation' },
    date: '2026-02-05',
    readTime: 7,
    image: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/natura-parquets/ambiance/escalier-chene-06.jpg',
    featured: false,
  },
  {
    id: '6',
    slug: 'chene-europeen-qualite-origine',
    title: {
      fr: 'Chêne européen : pourquoi c\'est le meilleur choix',
      de: 'Europäische Eiche: Warum sie die beste Wahl ist',
      en: 'European oak: why it\'s the best choice',
    },
    excerpt: {
      fr: 'Origine, qualité, durabilité : les raisons pour lesquelles le chêne européen reste la référence pour les parquets premium.',
      de: 'Herkunft, Qualität, Haltbarkeit: Die Gründe, warum europäische Eiche die Referenz für Premium-Parkette bleibt.',
      en: 'Origin, quality, durability: the reasons why European oak remains the benchmark for premium parquets.',
    },
    category: { fr: 'Matériaux', de: 'Materialien', en: 'Materials' },
    date: '2026-01-28',
    readTime: 5,
    image: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/natura-parquets/ambiance/usine-stock-04.jpg',
    featured: false,
  },
];

const categories = [
  { id: 'all', label: { fr: 'Tous', de: 'Alle', en: 'All' } },
  { id: 'entretien', label: { fr: 'Entretien', de: 'Pflege', en: 'Maintenance' } },
  { id: 'pose', label: { fr: 'Pose', de: 'Verlegung', en: 'Installation' } },
  { id: 'technique', label: { fr: 'Technique', de: 'Technik', en: 'Technical' } },
  { id: 'deco', label: { fr: 'Déco', de: 'Deko', en: 'Decor' } },
  { id: 'renovation', label: { fr: 'Rénovation', de: 'Renovierung', en: 'Renovation' } },
];

export default function ArticlesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'fr' | 'de' | 'en';

  const labels = {
    title: { fr: 'Articles & Conseils', de: 'Artikel & Tipps', en: 'Articles & Tips' },
    subtitle: { fr: 'Nos experts partagent leurs connaissances pour vous aider dans votre projet parquet.', de: 'Unsere Experten teilen ihr Wissen, um Ihnen bei Ihrem Parkettprojekt zu helfen.', en: 'Our experts share their knowledge to help you with your parquet project.' },
    featured: { fr: 'À la une', de: 'Empfohlen', en: 'Featured' },
    readMore: { fr: 'Lire l\'article', de: 'Artikel lesen', en: 'Read article' },
    readTime: { fr: 'min de lecture', de: 'Min. Lesezeit', en: 'min read' },
    allArticles: { fr: 'Tous les articles', de: 'Alle Artikel', en: 'All articles' },
  };

  const featuredArticles = articles.filter(a => a.featured);
  const recentArticles = articles.slice(0, 6);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : locale === 'de' ? 'de-DE' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <main className="min-h-screen bg-natura-50">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-natura-800 to-natura-900 text-white py-20 px-6 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl mb-4">
            {labels.title[locale]}
          </h1>
          <p className="text-natura-300 text-lg max-w-2xl mx-auto">
            {labels.subtitle[locale]}
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticles[0] && (
        <section className="py-12 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full mb-6">
              ⭐ {labels.featured[locale]}
            </span>
            
            <Link href={`/${locale}/articles/${featuredArticles[0].slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="aspect-video rounded-xl overflow-hidden bg-natura-100">
                  <img 
                    src={featuredArticles[0].image} 
                    alt={featuredArticles[0].title[locale]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-forest-600 text-sm font-medium">
                    {featuredArticles[0].category[locale]}
                  </span>
                  <h2 className="font-display text-3xl text-natura-900 mt-2 group-hover:text-forest-600 transition-colors">
                    {featuredArticles[0].title[locale]}
                  </h2>
                  <p className="text-natura-600 mt-4 leading-relaxed">
                    {featuredArticles[0].excerpt[locale]}
                  </p>
                  <div className="flex items-center gap-4 mt-6 text-sm text-natura-500">
                    <span>{formatDate(featuredArticles[0].date)}</span>
                    <span>•</span>
                    <span>{featuredArticles[0].readTime} {labels.readTime[locale]}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl text-natura-900 mb-8">
            {labels.allArticles[locale]}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
              <Link 
                key={article.id}
                href={`/${locale}/articles/${article.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="aspect-video bg-natura-100 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title[locale]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-forest-600 text-xs font-medium uppercase tracking-wide">
                    {article.category[locale]}
                  </span>
                  <h3 className="font-display text-lg text-natura-900 mt-2 group-hover:text-forest-600 transition-colors line-clamp-2">
                    {article.title[locale]}
                  </h3>
                  <p className="text-natura-500 text-sm mt-2 line-clamp-2">
                    {article.excerpt[locale]}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-natura-100 text-xs text-natura-400">
                    <span>{formatDate(article.date)}</span>
                    <span>{article.readTime} {labels.readTime[locale]}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-6 bg-forest-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl text-white mb-4">
            {locale === 'fr' ? 'Restez informé' : locale === 'de' ? 'Bleiben Sie informiert' : 'Stay informed'}
          </h2>
          <p className="text-forest-100 mb-8">
            {locale === 'fr' 
              ? 'Recevez nos derniers articles et conseils directement dans votre boîte mail.'
              : locale === 'de'
              ? 'Erhalten Sie unsere neuesten Artikel und Tipps direkt in Ihrem Postfach.'
              : 'Receive our latest articles and tips directly in your inbox.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-forest-600 font-semibold rounded-xl hover:bg-forest-50 transition-colors"
          >
            {locale === 'fr' ? 'Nous contacter' : locale === 'de' ? 'Kontaktieren Sie uns' : 'Contact us'}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
