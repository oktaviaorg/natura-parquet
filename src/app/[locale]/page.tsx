import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, collections, heroImages } from '@/data/products';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  const featuredProducts = products.slice(0, 6);
  const typedLocale = locale as 'fr' | 'de' | 'en';

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section - Full Screen */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('${heroImages.main}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <p className="text-sm md:text-base uppercase tracking-[0.3em] mb-6 opacity-80 font-light">
            {locale === 'fr' ? 'Parquets Premium Européens' : locale === 'de' ? 'Premium Europäische Parkette' : 'Premium European Parquets'}
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl font-light mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${locale}/produits`}
              className="group px-10 py-4 bg-white text-natura-900 font-medium hover:bg-natura-50 transition-all inline-flex items-center justify-center gap-2"
            >
              {t('hero.cta_products')}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="#collections"
              className="px-10 py-4 border-2 border-white text-white font-medium hover:bg-white hover:text-natura-900 transition-all"
            >
              {t('hero.cta_catalog')}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* "In the mood for wood" Tagline Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-natura-500 uppercase tracking-widest text-sm mb-4">
            {locale === 'fr' ? 'Notre philosophie' : locale === 'de' ? 'Unsere Philosophie' : 'Our Philosophy'}
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-natura-900 mb-6 italic">
            "In the mood for wood"
          </h2>
          <p className="text-lg text-natura-600 max-w-3xl mx-auto leading-relaxed">
            {locale === 'fr' 
              ? "Chaque lame de parquet Natura raconte l'histoire de forêts européennes centenaires. Nous sélectionnons avec passion les plus beaux chênes et frênes pour créer des sols d'exception qui traverseront les générations."
              : locale === 'de'
              ? "Jede Natura Parkettdiele erzählt die Geschichte jahrhundertealter europäischer Wälder. Mit Leidenschaft wählen wir die schönsten Eichen und Eschen aus, um außergewöhnliche Böden zu schaffen, die Generationen überdauern."
              : "Each Natura parquet plank tells the story of centuries-old European forests. We passionately select the finest oaks and ashes to create exceptional floors that will last for generations."}
          </p>
        </div>
      </section>

      {/* Product Categories - Large Visual Grid */}
      <section className="py-24 px-6 bg-natura-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-natura-900 mb-4">
              {t('nav.products')}
            </h2>
            <p className="text-natura-600 text-lg">
              {t('brand.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Engineered */}
            <Link href={`/${locale}/produits?category=engineered`} className="group relative aspect-[3/4] overflow-hidden">
              <img 
                src={heroImages.engineered} 
                alt={t('products.engineered.name')}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-display text-3xl text-white mb-2">
                  {t('products.engineered.name')}
                </h3>
                <p className="text-white/80 mb-4">
                  {t('products.engineered.tagline')}
                </p>
                <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
                  {locale === 'fr' ? 'Découvrir' : locale === 'de' ? 'Entdecken' : 'Discover'}
                  <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Solid */}
            <Link href={`/${locale}/produits?category=solid`} className="group relative aspect-[3/4] overflow-hidden">
              <img 
                src={heroImages.solid} 
                alt={t('products.solid.name')}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-display text-3xl text-white mb-2">
                  {t('products.solid.name')}
                </h3>
                <p className="text-white/80 mb-4">
                  {t('products.solid.tagline')}
                </p>
                <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
                  {locale === 'fr' ? 'Découvrir' : locale === 'de' ? 'Entdecken' : 'Discover'}
                  <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Industrial */}
            <Link href={`/${locale}/produits?category=industrial`} className="group relative aspect-[3/4] overflow-hidden">
              <img 
                src={heroImages.industrial} 
                alt={t('products.industrial.name')}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-display text-3xl text-white mb-2">
                  {t('products.industrial.name')}
                </h3>
                <p className="text-white/80 mb-4">
                  {t('products.industrial.tagline')}
                </p>
                <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
                  {locale === 'fr' ? 'Découvrir' : locale === 'de' ? 'Entdecken' : 'Discover'}
                  <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-natura-900 mb-4">
              {t('collections.title')}
            </h2>
            <p className="text-natura-600 text-lg">
              {t('collections.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {collections.map((collection) => (
              <Link 
                key={collection.id} 
                href={`/${locale}/produits?collection=${collection.id}`}
                className="group text-center"
              >
                <div className="relative aspect-square overflow-hidden mb-4">
                  <img 
                    src={collection.image}
                    alt={collection.name[typedLocale]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <h4 className="font-display text-lg text-natura-900 mb-1">
                  {collection.name[typedLocale]}
                </h4>
                <p className="text-sm text-natura-500 line-clamp-2">
                  {collection.description[typedLocale]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 bg-natura-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl text-natura-900 mb-4">
                {locale === 'fr' ? 'Nos Best-sellers' : locale === 'de' ? 'Unsere Bestseller' : 'Our Best-sellers'}
              </h2>
              <p className="text-natura-600 text-lg">
                {locale === 'fr' ? 'Les parquets préférés de nos clients' : locale === 'de' ? 'Die Lieblingsparkette unserer Kunden' : 'Our customers favorite parquets'}
              </p>
            </div>
            <Link 
              href={`/${locale}/produits`}
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-natura-700 font-medium hover:text-natura-900 transition-colors"
            >
              {locale === 'fr' ? 'Voir tous les produits' : locale === 'de' ? 'Alle Produkte ansehen' : 'View all products'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Ambiance Gallery */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-natura-900 mb-4">
              {locale === 'fr' ? 'Inspirations' : locale === 'de' ? 'Inspirationen' : 'Inspirations'}
            </h2>
            <p className="text-natura-600 text-lg">
              {locale === 'fr' ? 'Nos parquets dans des intérieurs d\'exception' : locale === 'de' ? 'Unsere Parkette in außergewöhnlichen Interieurs' : 'Our parquets in exceptional interiors'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto overflow-hidden group">
              <img 
                src={heroImages.ambiance1}
                alt="Inspiration 1"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden group">
              <img 
                src={heroImages.ambiance2}
                alt="Inspiration 2"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden group">
              <img 
                src={heroImages.ambiance3}
                alt="Inspiration 3"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partner CTA Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url('${heroImages.solid}')` }}
        >
          <div className="absolute inset-0 bg-natura-900/85" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            {t('partners.title')}
          </h2>
          <p className="text-xl opacity-90 mb-10 leading-relaxed">
            {t('partners.subtitle')}
          </p>
          <Link 
            href={`/${locale}/devenir-partenaire`}
            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-natura-900 font-medium hover:bg-natura-50 transition-colors"
          >
            {t('partners.cta')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
