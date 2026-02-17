import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, heroImages } from '@/data/products';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  const featuredProducts = products.slice(0, 6);
  const typedLocale = locale as 'fr' | 'de' | 'en';

  const content = {
    fr: {
      tagline: 'Parquets Chêne Européen Premium',
      title: 'La beauté naturelle du bois',
      subtitle: 'Parquets chêne européen de qualité premium, fabriqués en Pologne et livrés directement chez vous. Prix attractifs, qualité professionnelle.',
      ctaProducts: 'Voir nos parquets',
      ctaCatalog: 'Demander le catalogue',
      philosophy: 'Notre philosophie',
      philosophyText: "Chaque lame de parquet Natura raconte l'histoire de forêts européennes centenaires. Nous sélectionnons avec passion les plus beaux chênes pour créer des sols d'exception qui traverseront les générations.",
      gammes: 'Nos Gammes',
      gammesSubtitle: 'Deux gammes pour répondre à tous les projets',
      exclusive: {
        name: 'Gamme Exclusive',
        desc: 'Couche noble 3.5mm, sélection premium, veinage élégant',
        price: 'À partir de 48 €/m²',
      },
      elegance: {
        name: 'Gamme Élégance',
        desc: 'Excellent rapport qualité-prix, aspect naturel authentique',
        price: 'À partir de 45 €/m²',
      },
      discover: 'Découvrir',
      bestsellers: 'Nos Best-sellers',
      bestsellersSubtitle: 'Les parquets préférés de nos clients',
      viewAll: 'Voir tous les produits',
      inspirations: 'Inspirations',
      inspirationsSubtitle: 'Nos parquets dans des intérieurs d\'exception',
      guide: 'Besoin de conseils ?',
      guideSubtitle: 'Découvrez notre guide complet pour choisir le parquet idéal',
      guideBtn: 'Lire le guide',
      delivery: 'Livraison gratuite en France',
      quality: 'Qualité européenne certifiée',
      support: 'Conseils personnalisés',
    },
    de: {
      tagline: 'Premium Europäische Eichenparkette',
      title: 'Die natürliche Schönheit des Holzes',
      subtitle: 'Hochwertige europäische Eichenparkette, in Polen gefertigt und direkt zu Ihnen geliefert. Attraktive Preise, professionelle Qualität.',
      ctaProducts: 'Unsere Parkette ansehen',
      ctaCatalog: 'Katalog anfordern',
      philosophy: 'Unsere Philosophie',
      philosophyText: 'Jede Natura Parkettdiele erzählt die Geschichte jahrhundertealter europäischer Wälder. Mit Leidenschaft wählen wir die schönsten Eichen aus, um außergewöhnliche Böden zu schaffen.',
      gammes: 'Unsere Kollektionen',
      gammesSubtitle: 'Zwei Kollektionen für alle Projekte',
      exclusive: {
        name: 'Exclusive Kollektion',
        desc: 'Edelholzschicht 3.5mm, Premium-Auswahl, elegante Maserung',
        price: 'Ab 48 €/m²',
      },
      elegance: {
        name: 'Eleganz Kollektion',
        desc: 'Ausgezeichnetes Preis-Leistungs-Verhältnis, authentisches Aussehen',
        price: 'Ab 45 €/m²',
      },
      discover: 'Entdecken',
      bestsellers: 'Unsere Bestseller',
      bestsellersSubtitle: 'Die Lieblingsparkette unserer Kunden',
      viewAll: 'Alle Produkte ansehen',
      inspirations: 'Inspirationen',
      inspirationsSubtitle: 'Unsere Parkette in außergewöhnlichen Interieurs',
      guide: 'Brauchen Sie Beratung?',
      guideSubtitle: 'Entdecken Sie unseren vollständigen Leitfaden zur Parkettauswahl',
      guideBtn: 'Leitfaden lesen',
      delivery: 'Kostenlose Lieferung nach Frankreich',
      quality: 'Zertifizierte europäische Qualität',
      support: 'Persönliche Beratung',
    },
    en: {
      tagline: 'Premium European Oak Parquets',
      title: 'The natural beauty of wood',
      subtitle: 'Premium quality European oak parquets, made in Poland and delivered directly to you. Attractive prices, professional quality.',
      ctaProducts: 'View our parquets',
      ctaCatalog: 'Request catalog',
      philosophy: 'Our Philosophy',
      philosophyText: 'Each Natura parquet plank tells the story of centuries-old European forests. We passionately select the finest oaks to create exceptional floors that will last for generations.',
      gammes: 'Our Ranges',
      gammesSubtitle: 'Two ranges for all projects',
      exclusive: {
        name: 'Exclusive Range',
        desc: '3.5mm noble layer, premium selection, elegant grain',
        price: 'From €48/m²',
      },
      elegance: {
        name: 'Elegance Range',
        desc: 'Excellent value for money, authentic natural look',
        price: 'From €45/m²',
      },
      discover: 'Discover',
      bestsellers: 'Our Best-sellers',
      bestsellersSubtitle: 'Our customers favorite parquets',
      viewAll: 'View all products',
      inspirations: 'Inspirations',
      inspirationsSubtitle: 'Our parquets in exceptional interiors',
      guide: 'Need advice?',
      guideSubtitle: 'Discover our complete guide to choosing the ideal parquet',
      guideBtn: 'Read the guide',
      delivery: 'Free delivery to France',
      quality: 'Certified European quality',
      support: 'Personalized advice',
    },
  };

  const c = content[typedLocale];

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
            {c.tagline}
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight">
            {c.title}
          </h1>
          <p className="text-lg md:text-xl font-light mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
            {c.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${locale}/produits`}
              className="group px-10 py-4 bg-white text-natura-900 font-medium hover:bg-natura-50 transition-all inline-flex items-center justify-center gap-2 rounded-lg"
            >
              {c.ctaProducts}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href={`/${locale}/contact`}
              className="px-10 py-4 border-2 border-white text-white font-medium hover:bg-white hover:text-natura-900 transition-all rounded-lg"
            >
              {c.ctaCatalog}
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

      {/* Trust badges */}
      <section className="py-8 px-6 bg-natura-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3 text-white">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span className="font-medium">{c.delivery}</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span className="font-medium">{c.quality}</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="font-medium">{c.support}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-natura-500 uppercase tracking-widest text-sm mb-4">
            {c.philosophy}
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-natura-900 mb-6 italic">
            "In the mood for wood"
          </h2>
          <p className="text-lg text-natura-600 max-w-3xl mx-auto leading-relaxed">
            {c.philosophyText}
          </p>
        </div>
      </section>

      {/* Gammes Section */}
      <section className="py-24 px-6 bg-natura-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-natura-900 mb-4">
              {c.gammes}
            </h2>
            <p className="text-natura-600 text-lg">
              {c.gammesSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Exclusive */}
            <Link href={`/${locale}/produits?gamme=Exclusive`} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
              <img 
                src={heroImages.chevron} 
                alt={c.exclusive.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded mb-4">
                  Premium
                </span>
                <h3 className="font-display text-3xl text-white mb-2">
                  {c.exclusive.name}
                </h3>
                <p className="text-white/80 mb-4">
                  {c.exclusive.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-300 font-semibold">{c.exclusive.price}</span>
                  <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
                    {c.discover}
                    <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>

            {/* Elegance */}
            <Link href={`/${locale}/produits?gamme=Elegance`} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
              <img 
                src={heroImages.escalier} 
                alt={c.elegance.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block px-3 py-1 bg-natura-100 text-natura-700 text-sm font-medium rounded mb-4">
                  Rapport qualité-prix
                </span>
                <h3 className="font-display text-3xl text-white mb-2">
                  {c.elegance.name}
                </h3>
                <p className="text-white/80 mb-4">
                  {c.elegance.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-300 font-semibold">{c.elegance.price}</span>
                  <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
                    {c.discover}
                    <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl text-natura-900 mb-4">
                {c.bestsellers}
              </h2>
              <p className="text-natura-600 text-lg">
                {c.bestsellersSubtitle}
              </p>
            </div>
            <Link 
              href={`/${locale}/produits`}
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-natura-700 font-medium hover:text-natura-900 transition-colors"
            >
              {c.viewAll}
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
      <section className="py-24 px-6 bg-natura-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-natura-900 mb-4">
              {c.inspirations}
            </h2>
            <p className="text-natura-600 text-lg">
              {c.inspirationsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto overflow-hidden rounded-xl group">
              <img 
                src={heroImages.ambiance1}
                alt="Inspiration 1"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl group">
              <img 
                src={heroImages.ambiance2}
                alt="Inspiration 2"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl group">
              <img 
                src={heroImages.ambiance3}
                alt="Inspiration 3"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Guide CTA Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url('${heroImages.structure}')` }}
        >
          <div className="absolute inset-0 bg-natura-900/85" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            {c.guide}
          </h2>
          <p className="text-xl opacity-90 mb-10 leading-relaxed">
            {c.guideSubtitle}
          </p>
          <Link 
            href={`/${locale}/guide-parquet`}
            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-natura-900 font-medium hover:bg-natura-50 transition-colors rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {c.guideBtn}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
