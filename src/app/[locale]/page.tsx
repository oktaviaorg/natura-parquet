'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const SUPABASE_STORAGE = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/natura-parquets';

export default function HomePage() {
  const locale = useLocale() as 'fr' | 'de' | 'en';

  const labels = {
    heroTitle: {
      fr: 'Parquets chêne\nd\'exception',
      de: 'Außergewöhnliche\nEichenparkette',
      en: 'Exceptional\nOak Parquets'
    },
    heroSubtitle: {
      fr: 'Direct fabricant Pologne • Qualité premium • Prix justes',
      de: 'Direkt vom Hersteller aus Polen • Premium-Qualität • Faire Preise',
      en: 'Direct from Poland manufacturer • Premium quality • Fair prices'
    },
    ctaDiscover: { fr: 'Découvrir les parquets', de: 'Parkette entdecken', en: 'Discover parquets' },
    ctaGuide: { fr: 'Lire le guide', de: 'Ratgeber lesen', en: 'Read the guide' },
    trustBadge1: { fr: 'Livraison directe', de: 'Direktlieferung', en: 'Direct delivery' },
    trustBadge2: { fr: 'Chêne européen FSC', de: 'FSC-Eiche', en: 'FSC European oak' },
    trustBadge3: { fr: 'Prix fabricant', de: 'Herstellerpreis', en: 'Factory price' },
    collectionTitle: { fr: 'Nos collections', de: 'Unsere Kollektionen', en: 'Our collections' },
    collectionSubtitle: { 
      fr: 'Parquets contrecollés chêne, fabriqués en Pologne avec le meilleur bois européen.',
      de: 'Mehrschichtparkett aus Eiche, hergestellt in Polen aus dem besten europäischen Holz.',
      en: 'Engineered oak parquets, made in Poland with the finest European wood.'
    },
    viewAll: { fr: 'Voir tous les parquets', de: 'Alle Parkette ansehen', en: 'View all parquets' },
    whyTitle: { fr: 'Pourquoi Natura ?', de: 'Warum Natura?', en: 'Why Natura?' },
    whyItems: [
      {
        icon: '🏭',
        title: { fr: 'Direct fabricant', de: 'Direkt vom Hersteller', en: 'Direct from factory' },
        desc: { fr: 'Partenaire exclusif Axemark Wood, fabricant polonais reconnu.', de: 'Exklusivpartner von Axemark Wood, renommierter polnischer Hersteller.', en: 'Exclusive partner of Axemark Wood, renowned Polish manufacturer.' }
      },
      {
        icon: '🌳',
        title: { fr: 'Chêne européen', de: 'Europäische Eiche', en: 'European oak' },
        desc: { fr: 'Bois certifié FSC, séchage lent, qualité premium garantie.', de: 'FSC-zertifiziertes Holz, langsame Trocknung, garantierte Premium-Qualität.', en: 'FSC certified wood, slow drying, guaranteed premium quality.' }
      },
      {
        icon: '💰',
        title: { fr: 'Prix justes', de: 'Faire Preise', en: 'Fair prices' },
        desc: { fr: 'Sans intermédiaire, vous économisez 30 à 40% vs revendeurs.', de: 'Ohne Zwischenhändler sparen Sie 30-40% im Vergleich zu Wiederverkäufern.', en: 'No middleman, save 30-40% vs resellers.' }
      },
      {
        icon: '🚚',
        title: { fr: 'Livraison incluse', de: 'Lieferung inklusive', en: 'Delivery included' },
        desc: { fr: 'Franco de port dès 50m², livraison en 2-4 semaines.', de: 'Frei Haus ab 50m², Lieferung in 2-4 Wochen.', en: 'Free shipping from 50m², delivery in 2-4 weeks.' }
      },
    ],
    ctaTitle: { fr: 'Prêt à transformer votre intérieur ?', de: 'Bereit, Ihr Interieur zu verwandeln?', en: 'Ready to transform your interior?' },
    ctaSubtitle: { fr: 'Demandez un devis gratuit ou contactez-nous pour des conseils personnalisés.', de: 'Fordern Sie ein kostenloses Angebot an oder kontaktieren Sie uns für eine persönliche Beratung.', en: 'Request a free quote or contact us for personalized advice.' },
    ctaQuote: { fr: 'Demander un devis', de: 'Angebot anfordern', en: 'Request a quote' },
    ctaContact: { fr: 'Nous contacter', de: 'Kontaktieren Sie uns', en: 'Contact us' },
  };

  // Featured products (first 6)
  const featuredProducts = products.slice(0, 6);

  return (
    <main className="min-h-screen bg-natura-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src={`${SUPABASE_STORAGE}/ambiance/artisan-chevron-01.jpg`}
            alt="Parquet chêne premium"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-natura-900/80 via-natura-900/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-tight whitespace-pre-line">
              {labels.heroTitle[locale]}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/80">
              {labels.heroSubtitle[locale]}
            </p>
            
            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={`/${locale}/produits`}
                className="px-8 py-4 bg-forest-500 text-white font-medium rounded-lg hover:bg-forest-600 transition-colors shadow-lg"
              >
                {labels.ctaDiscover[locale]}
              </Link>
              <Link
                href={`/${locale}/guide-parquet`}
                className="px-8 py-4 bg-white/10 backdrop-blur text-white font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/30"
              >
                {labels.ctaGuide[locale]}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap gap-6">
              {[labels.trustBadge1, labels.trustBadge2, labels.trustBadge3].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-white/70">
                  <svg className="w-5 h-5 text-forest-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{badge[locale]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-natura-900">
              {labels.collectionTitle[locale]}
            </h2>
            <p className="mt-4 text-natura-600 max-w-2xl mx-auto">
              {labels.collectionSubtitle[locale]}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* View all CTA */}
          <div className="text-center mt-12">
            <Link
              href={`/${locale}/produits`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-natura-900 text-white font-medium rounded-lg hover:bg-natura-800 transition-colors"
            >
              {labels.viewAll[locale]}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Natura Section */}
      <section className="py-24 px-6 bg-natura-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-natura-900 text-center mb-16">
            {labels.whyTitle[locale]}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {labels.whyItems.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display text-xl text-natura-900 mb-2">
                  {item.title[locale]}
                </h3>
                <p className="text-natura-600 text-sm leading-relaxed">
                  {item.desc[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ambiance Gallery */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <img 
                src={`${SUPABASE_STORAGE}/ambiance/artisan-lames-02.jpg`}
                alt="Ambiance parquet"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <img 
              src={`${SUPABASE_STORAGE}/ambiance/escalier-chene-06.jpg`}
              alt="Escalier chêne"
              className="w-full h-48 object-cover rounded-xl"
            />
            <img 
              src={`${SUPABASE_STORAGE}/ambiance/coupe-structure-07.jpg`}
              alt="Structure parquet"
              className="w-full h-48 object-cover rounded-xl"
            />
            <img 
              src={`${SUPABASE_STORAGE}/ambiance/gammes-teintes-05.jpg`}
              alt="Gammes de teintes"
              className="w-full h-48 object-cover rounded-xl"
            />
            <img 
              src={`${SUPABASE_STORAGE}/ambiance/usine-stock-04.jpg`}
              alt="Usine Axemark"
              className="w-full h-48 object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-forest-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
            {labels.ctaTitle[locale]}
          </h2>
          <p className="text-forest-100 text-lg mb-10">
            {labels.ctaSubtitle[locale]}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="px-8 py-4 bg-white text-forest-600 font-medium rounded-lg hover:bg-natura-50 transition-colors"
            >
              {labels.ctaQuote[locale]}
            </Link>
            <a
              href="tel:+33757821306"
              className="px-8 py-4 bg-forest-700 text-white font-medium rounded-lg hover:bg-forest-800 transition-colors border border-forest-500"
            >
              {labels.ctaContact[locale]}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
