import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  meta_title: string;
  meta_description: string;
  keywords: string[];
  published_at: string;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: article } = await supabase
    .from('articles')
    .select('title, meta_title, meta_description, featured_image, keywords')
    .eq('slug', params.slug)
    .eq('site', 'natura-parquets')
    .single();

  if (!article) return { title: 'Article non trouvé' };

  return {
    title: article.meta_title || article.title,
    description: article.meta_description,
    keywords: article.keywords?.join(', '),
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description,
      images: [article.featured_image],
      type: 'article',
    },
  };
}

async function getArticle(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('site', 'natura-parquets')
    .eq('published', true)
    .single();

  if (error || !data) return null;
  return data;
}

interface RelatedArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featured_image: string;
}

async function getRelatedArticles(currentSlug: string): Promise<RelatedArticle[]> {
  const { data } = await supabase
    .from('articles')
    .select('id, slug, title, excerpt, featured_image')
    .eq('site', 'natura-parquets')
    .eq('published', true)
    .neq('slug', currentSlug)
    .limit(3);

  return data || [];
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  
  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(params.slug);

  // Clean content (remove markdown code blocks if present)
  const cleanContent = article.content
    .replace(/```html\n?/g, '')
    .replace(/```\n?/g, '');

  return (
    <div className="bg-cream-100 min-h-screen">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96">
        <img
          src={article.featured_image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-natura-text/80 to-transparent" />
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-gold-600">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-gold-600">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-natura-text">{article.title}</span>
          </nav>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl text-natura-text mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mb-8">
            {article.keywords?.map((keyword, idx) => (
              <span 
                key={idx}
                className="text-sm bg-gold-100 text-gold-800 px-3 py-1 rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-natura-text prose-a:text-gold-600 prose-strong:text-natura-text"
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          />

          {/* CTA */}
          <div className="mt-12 p-8 bg-natura-primary rounded-lg text-center">
            <h3 className="font-serif text-2xl text-white mb-4">
              Découvrez nos parquets premium
            </h3>
            <p className="text-cream-200 mb-6">
              Chêne européen FSC, fabrication polonaise, prix usine.
            </p>
            <Link 
              href="/catalogue"
              className="inline-block bg-gold-400 hover:bg-gold-500 text-natura-text font-semibold px-8 py-3 transition-colors"
            >
              Voir le catalogue
            </Link>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="font-serif text-2xl text-natura-text mb-8 text-center">
            Articles similaires
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <Link 
                key={related.id}
                href={`/blog/${related.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={related.featured_image}
                  alt={related.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-serif text-lg text-natura-text line-clamp-2">
                    {related.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
