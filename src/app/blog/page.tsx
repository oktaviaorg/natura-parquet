import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Parquet | Conseils et guides - Natura Parquets',
  description: 'Découvrez nos articles experts sur le parquet : pose, finitions, entretien. Conseils de professionnels pour votre projet.',
};

export const revalidate = 3600; // Revalidate every hour

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featured_image: string;
  published_at: string;
  keywords: string[];
}

async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('id, slug, title, excerpt, featured_image, published_at, keywords')
    .eq('site', 'natura-parquets')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return data || [];
}

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="bg-cream-100 min-h-screen">
      {/* Hero */}
      <section className="bg-natura-text py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Blog Parquet
          </h1>
          <p className="text-cream-200 text-lg max-w-2xl mx-auto">
            Conseils d'experts, guides pratiques et actualités du monde du parquet
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        {articles.length === 0 ? (
          <p className="text-center text-gray-500">Aucun article pour le moment.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article 
                key={article.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Link href={`/blog/${article.slug}`}>
                  <div className="relative h-48">
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="font-serif text-xl text-natura-text mb-3 line-clamp-2 hover:text-gold-600 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {article.keywords?.slice(0, 3).map((keyword, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-cream-200 text-natura-text px-2 py-1 rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-natura-primary py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl text-white mb-4">
            Prêt à transformer votre intérieur ?
          </h2>
          <Link 
            href="/catalogue"
            className="inline-block bg-gold-400 hover:bg-gold-500 text-natura-text font-semibold px-8 py-3 transition-colors"
          >
            Découvrir nos parquets
          </Link>
        </div>
      </section>
    </div>
  );
}
