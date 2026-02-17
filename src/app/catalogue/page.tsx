import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
import CatalogueClient from './CatalogueClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Catalogue Parquets | Bâton Rompu, Point de Hongrie, Lames | Natura Parquets',
  description: 'Découvrez notre collection de parquets contrecollés européens. Bâton rompu, point de Hongrie, lames larges. Chêne massif, finitions huilées ou vernies. Livraison France. Devis gratuit.',
  openGraph: {
    title: 'Catalogue Parquets Premium | Natura Parquets',
    description: 'Parquets contrecollés chêne européen. Bâton rompu, chevron, lames. Prix compétitifs, livraison France.',
    type: 'website',
  },
};

async function getFilters() {
  const [grades, colours, finishes, formats] = await Promise.all([
    supabase.from('natura_grades').select('*').eq('active', true).order('name'),
    supabase.from('natura_colours').select('*').eq('active', true).order('name'),
    supabase.from('natura_finishes').select('*').eq('active', true).order('name'),
    supabase.from('natura_formats').select('*').eq('active', true).order('name'),
  ]);

  return {
    grades: grades.data || [],
    colours: colours.data || [],
    finishes: finishes.data || [],
    formats: formats.data || [],
  };
}

async function getProducts() {
  const { data } = await supabase
    .from('natura_prices')
    .select(`
      *,
      grade:natura_grades(*),
      colour:natura_colours(*),
      finish:natura_finishes(*),
      format:natura_formats(*)
    `)
    .eq('active', true)
    .order('prix_vente_ttc', { ascending: true });

  return data || [];
}

export default async function CataloguePage() {
  const [filters, products] = await Promise.all([
    getFilters(),
    getProducts(),
  ]);

  // Schema.org JSON-LD for collection
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Catalogue de Parquets - Natura Parquets',
    description: 'Collection complète de parquets contrecollés européens. Bâton rompu, point de Hongrie, lames larges.',
    url: 'https://natura-parquets.fr/catalogue',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.slice(0, 10).map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: `${product.grade?.name} ${product.colour?.name}`,
          offers: {
            '@type': 'Offer',
            price: product.prix_vente_ttc,
            priceCurrency: 'EUR',
          },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-cream-50">
        {/* Hero Header */}
        <div className="bg-gradient-to-br from-wood-600 via-wood-500 to-wood-600 text-white py-16 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)`,
              }}
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Notre Catalogue
              </h1>
              <p className="text-xl text-cream-200 mb-8 leading-relaxed">
                Découvrez notre sélection de parquets européens premium.
                Chêne massif, fabrication responsable, qualité certifiée.
              </p>
              
              {/* Stats */}
              <div className="flex justify-center gap-8 md:gap-16">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gold-400">{products.length}</div>
                  <div className="text-cream-300 text-sm">Produits</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gold-400">{filters.formats.length}</div>
                  <div className="text-cream-300 text-sm">Formats</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gold-400">{filters.colours.length}</div>
                  <div className="text-cream-300 text-sm">Teintes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gold-400">{filters.grades.length}</div>
                  <div className="text-cream-300 text-sm">Grades</div>
                </div>
              </div>
            </div>
          </div>

          {/* Wave separator */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
              <path 
                d="M0 60V20C240 40 480 50 720 50C960 50 1200 40 1440 20V60H0Z" 
                fill="#FDFCFB"
              />
            </svg>
          </div>
        </div>

        {/* Catalogue Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-cream-200">
              <span className="text-green-500">✓</span>
              <span className="text-sm font-medium text-gray-700">FSC Certifié</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-cream-200">
              <span className="text-green-500">✓</span>
              <span className="text-sm font-medium text-gray-700">Fabrication Europe</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-cream-200">
              <span className="text-green-500">✓</span>
              <span className="text-sm font-medium text-gray-700">Livraison France</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-cream-200">
              <span className="text-green-500">✓</span>
              <span className="text-sm font-medium text-gray-700">Devis gratuit</span>
            </div>
          </div>

          <CatalogueClient 
            initialProducts={products} 
            filters={filters}
          />
        </div>

        {/* Bottom CTA */}
        <div className="bg-cream-100 border-t border-cream-200 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl text-wood-600 mb-4">
              Besoin d'aide pour choisir ?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Nos experts vous accompagnent dans le choix du parquet idéal pour votre projet.
              Conseils gratuits, échantillons disponibles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/devis"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                📋 Demander un devis
              </a>
              <a 
                href="tel:+33604440903"
                className="btn-outline inline-flex items-center justify-center gap-2"
              >
                📞 06 04 44 09 03
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
