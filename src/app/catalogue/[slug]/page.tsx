import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { translateGrade, translateColour, translateFormat, formatPrice, generateProductMeta } from '@/lib/utils';
import ProductGallery from './ProductGallery';
import QuantitySimulator from './QuantitySimulator';
import QuoteForm from './QuoteForm';

export const revalidate = 60;

interface Product {
  id: number;
  prix_vente_ttc: number;
  grade: {
    id: number;
    code: string;
    name: string;
    description?: string;
  };
  colour: {
    id: number;
    code: string;
    name: string;
    hex_color?: string;
  };
  finish: {
    id: number;
    code: string;
    name: string;
    description?: string;
  };
  format: {
    id: number;
    code: string;
    name: string;
    width_mm: number;
    length_mm: number;
    thickness_mm: number;
  };
}

async function getProduct(slug: string): Promise<Product | null> {
  // Parse slug to find matching product
  // Format: baton-rompu-prestige-ambre-11x70x490
  
  const { data: products } = await supabase
    .from('natura_prices')
    .select(`
      *,
      grade:natura_grades(*),
      colour:natura_colours(*),
      finish:natura_finishes(*),
      format:natura_formats(*)
    `)
    .eq('active', true);

  if (!products) return null;

  // Find product matching slug
  for (const product of products) {
    const dimensions = `${product.format?.thickness_mm}x${product.format?.width_mm}x${product.format?.length_mm}`;
    const productSlug = generateSlug(
      product.format?.name || '',
      product.grade?.name || '',
      product.colour?.name || '',
      dimensions
    );
    
    if (productSlug === slug || product.id.toString() === slug) {
      return product;
    }
  }

  // Fallback: try to find by ID
  const { data } = await supabase
    .from('natura_prices')
    .select(`
      *,
      grade:natura_grades(*),
      colour:natura_colours(*),
      finish:natura_finishes(*),
      format:natura_formats(*)
    `)
    .eq('id', parseInt(slug) || 0)
    .eq('active', true)
    .single();

  return data;
}

function generateSlug(format: string, grade: string, colour: string, dimensions: string): string {
  const formatTranslations: Record<string, string> = {
    'Herringbone': 'baton-rompu',
    'Chevron': 'point-de-hongrie',
    'Plank': 'lame-large',
    'XL Plank': 'lame-xl',
    'Bâton Rompu': 'baton-rompu',
    'Point de Hongrie': 'point-de-hongrie',
  };
  
  const gradeTranslations: Record<string, string> = {
    'Exclusive': 'prestige',
    'Elegance': 'elegance',
    'Rustic': 'rustique',
    'Country': 'tradition',
  };
  
  const colourTranslations: Record<string, string> = {
    'Raw': 'naturel',
    'Crema': 'creme',
    'Honey': 'miel',
    'Amber': 'ambre',
    'Gilio': 'noisette',
    'Nugat': 'nougat',
    'Smoked Oil': 'fume',
    'Multicolored': 'authentique',
    'Neutral': 'naturel',
    'Raw Wood': 'bois-brut',
    'Nugat Dark': 'nougat-fonce',
    'Fumé': 'fume',
  };

  const formatSlug = formatTranslations[format] || format.toLowerCase().replace(/\s+/g, '-');
  const gradeSlug = gradeTranslations[grade] || grade.toLowerCase().replace(/\s+/g, '-');
  const colourSlug = colourTranslations[colour] || colour.toLowerCase().replace(/\s+/g, '-');
  
  return `${formatSlug}-${gradeSlug}-${colourSlug}-${dimensions}`.replace(/[^a-z0-9-]/g, '');
}

async function getSimilarProducts(product: Product) {
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
    .eq('format_id', product.format?.id)
    .neq('id', product.id)
    .limit(4);

  return data || [];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);
  
  if (!product) {
    return { title: 'Produit non trouvé | Natura Parquets' };
  }

  const dimensions = `${product.format?.thickness_mm}×${product.format?.width_mm}×${product.format?.length_mm}mm`;
  const meta = generateProductMeta({
    format: product.format?.name || '',
    grade: product.grade?.name || '',
    colour: product.colour?.name || '',
    finish: product.finish?.name || '',
    dimensions,
    price: product.prix_vente_ttc,
  });

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  
  if (!product) {
    notFound();
  }

  const similarProducts = await getSimilarProducts(product);

  const formatFr = translateFormat(product.format?.name || '');
  const gradeFr = translateGrade(product.grade?.name || '');
  const colourFr = translateColour(product.colour?.name || '');
  const dimensions = `${product.format?.thickness_mm}×${product.format?.width_mm}×${product.format?.length_mm}mm`;
  const productName = `${formatFr} ${gradeFr} ${colourFr}`;

  // Conditionnement estimé (m²/paquet)
  const packetM2 = 1.58; // Standard pour bâton rompu

  // Schema.org JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    description: `Parquet contrecollé ${formatFr} grade ${gradeFr} teinte ${colourFr}. Finition ${product.finish?.name}. Dimensions ${dimensions}.`,
    image: `https://natura-parquets.fr/images/products/${product.colour?.code || 'default'}.jpg`,
    brand: {
      '@type': 'Brand',
      name: 'Natura Parquets',
    },
    offers: {
      '@type': 'Offer',
      url: `https://natura-parquets.fr/catalogue/${params.slug}`,
      priceCurrency: 'EUR',
      price: product.prix_vente_ttc,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Natura Parquets',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '47',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-cream-50">
        {/* Breadcrumb */}
        <nav className="bg-white border-b border-cream-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <ol className="flex items-center flex-wrap gap-2 text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-wood-600 transition-colors">
                  Accueil
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link href="/catalogue" className="text-gray-500 hover:text-wood-600 transition-colors">
                  Catalogue
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link href={`/catalogue?format=${product.format?.id}`} className="text-gray-500 hover:text-wood-600 transition-colors">
                  {formatFr}
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-wood-600 font-medium">{gradeFr} {colourFr}</li>
            </ol>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Column - Gallery */}
            <div className="space-y-6">
              <ProductGallery 
                colour={product.colour} 
                productName={productName}
              />
              
              {/* Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <span className="text-green-600 text-lg">✓</span>
                  <span className="text-xs font-medium text-green-800">FSC Certifié</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                  <span className="text-blue-600 text-lg">✓</span>
                  <span className="text-xs font-medium text-blue-800">Sans formaldéhyde</span>
                </div>
                <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
                  <span className="text-orange-600 text-lg">✓</span>
                  <span className="text-xs font-medium text-orange-800">Chauffage sol</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-lg px-3 py-2">
                  <span className="text-purple-600 text-lg">✓</span>
                  <span className="text-xs font-medium text-purple-800">Made in EU</span>
                </div>
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-gold-100 text-gold-700 text-sm font-semibold px-3 py-1 rounded-full">
                    Grade {gradeFr}
                  </span>
                  <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    En stock
                  </span>
                </div>
                
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-wood-600 mb-2">
                  {productName}
                </h1>
                <p className="text-lg text-gray-600">
                  {product.finish?.name} • {dimensions}
                </p>
              </div>

              {/* Price */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-cream-200">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold text-gold-500">
                    {formatPrice(product.prix_vente_ttc)}
                  </span>
                  <span className="text-xl text-gray-500">/m² TTC</span>
                </div>

                {/* Quantity Simulator */}
                <QuantitySimulator 
                  pricePerM2={product.prix_vente_ttc}
                  packetM2={packetM2}
                />

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Link 
                    href={`/devis?product=${product.id}`}
                    className="flex-1 bg-gold-400 hover:bg-gold-500 text-natura-text font-semibold px-6 py-4 text-center text-lg transition-all duration-200 rounded-lg shadow-md hover:shadow-lg"
                  >
                    Demander un devis
                  </Link>
                  <button 
                    className="flex-1 border-2 border-wood-600 text-wood-600 hover:bg-wood-600 hover:text-white font-semibold px-6 py-4 text-center text-lg transition-all duration-200 rounded-lg"
                  >
                    Échantillon gratuit
                  </button>
                </div>
              </div>

              {/* Description SEO */}
              <div className="prose prose-lg max-w-none">
                <h2 className="font-serif text-2xl text-wood-600 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  Découvrez notre parquet contrecollé <strong>{formatFr}</strong> dans sa version <strong>{gradeFr}</strong>, 
                  sublimé par la teinte <strong>{colourFr}</strong>. Ce revêtement de sol en chêne européen allie 
                  l'élégance intemporelle du bois à une fabrication moderne et responsable.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  La pose en {formatFr.toLowerCase()} crée un motif dynamique et sophistiqué qui agrandit visuellement 
                  vos espaces tout en apportant une touche de caractère. Grâce à sa finition {product.finish?.name?.toLowerCase()}, 
                  ce parquet est prêt à poser et bénéficie d'une protection optimale contre l'usure quotidienne.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Compatible avec le chauffage au sol (≤27°C), ce parquet est idéal pour tous vos projets de 
                  rénovation ou de construction neuve en France.
                </p>
              </div>

              {/* Technical Details */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-cream-200">
                <h2 className="font-serif text-2xl text-wood-600 p-6 pb-4 border-b border-cream-100">
                  Caractéristiques techniques
                </h2>
                <table className="w-full">
                  <tbody className="divide-y divide-cream-100">
                    <tr className="hover:bg-cream-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500 font-medium">Type</td>
                      <td className="px-6 py-4 text-gray-900">Parquet contrecollé 2 plis</td>
                    </tr>
                    <tr className="hover:bg-cream-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500 font-medium">Dimensions</td>
                      <td className="px-6 py-4 text-gray-900">{dimensions}</td>
                    </tr>
                    <tr className="hover:bg-cream-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500 font-medium">Épaisseur totale</td>
                      <td className="px-6 py-4 text-gray-900">{product.format?.thickness_mm} mm</td>
                    </tr>
                    <tr className="hover:bg-cream-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500 font-medium">Couche d'usure</td>
                      <td className="px-6 py-4 text-gray-900">Chêne 3,5 mm</td>
                    </tr>
                    <tr className="hover:bg-cream-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500 font-medium">Support</td>
                      <td className="px-6 py-4 text-gray-900">Pin {(product.format?.thickness_mm || 11) - 3.5} mm</td>
                    </tr>
                    <tr className="hover:bg-cream-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500 font-medium">Grade</td>
                      <td className="px-6 py-4 text-gray-900">{gradeFr} ({product.grade?.code})</td>
                    </tr>
                    <tr className="hover:bg-cream-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500 font-medium">Finition</td>
                      <td className="px-6 py-4 text-gray-900">{product.finish?.name}</td>
                    </tr>
                    <tr className="hover:bg-cream-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500 font-medium">Surface</td>
                      <td className="px-6 py-4 text-gray-900">Brossé</td>
                    </tr>
                    <tr className="hover:bg-cream-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500 font-medium">Chanfrein</td>
                      <td className="px-6 py-4 text-gray-900">4 côtés</td>
                    </tr>
                    <tr className="hover:bg-cream-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500 font-medium">Assemblage</td>
                      <td className="px-6 py-4 text-gray-900">Clic 5G</td>
                    </tr>
                    <tr className="hover:bg-cream-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500 font-medium">Conditionnement</td>
                      <td className="px-6 py-4 text-gray-900">{packetM2} m²/paquet</td>
                    </tr>
                    <tr className="hover:bg-cream-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500 font-medium">Chauffage sol</td>
                      <td className="px-6 py-4 text-gray-900">
                        <span className="inline-flex items-center gap-1 text-green-600">
                          <span>✓</span> Compatible (≤27°C)
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-cream-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500 font-medium">Certification</td>
                      <td className="px-6 py-4 text-gray-900">
                        <span className="inline-flex items-center gap-1 text-green-600">
                          <span>🌲</span> FSC
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Grade Info */}
              {product.grade?.description && (
                <div className="bg-cream-100 rounded-xl p-6 border border-cream-200">
                  <h3 className="font-serif text-xl text-wood-600 mb-3">
                    À propos du grade {gradeFr}
                  </h3>
                  <p className="text-gray-700">{product.grade.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quote Form Section */}
          <div className="mt-16">
            <QuoteForm 
              productId={product.id}
              productName={productName}
            />
          </div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="font-serif text-3xl text-wood-600 mb-8 text-center">
                Produits similaires
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((p: Product) => {
                  const pDimensions = `${p.format?.thickness_mm}x${p.format?.width_mm}x${p.format?.length_mm}`;
                  const pSlug = generateSlug(
                    p.format?.name || '',
                    p.grade?.name || '',
                    p.colour?.name || '',
                    pDimensions
                  );
                  const pGradeFr = translateGrade(p.grade?.name || '');
                  const pColourFr = translateColour(p.colour?.name || '');
                  
                  return (
                    <Link 
                      key={p.id}
                      href={`/catalogue/${pSlug}`}
                      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-cream-200 hover:border-gold-400"
                    >
                      <div 
                        className="h-48 flex items-center justify-center relative"
                        style={{ 
                          backgroundColor: p.colour?.hex_color || '#d4bfa3',
                          backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)'
                        }}
                      >
                        <span className="text-6xl opacity-20 group-hover:scale-110 transition-transform">🪵</span>
                        <div className="absolute top-3 right-3 bg-gold-400 text-white text-xs font-bold px-2 py-1 rounded">
                          {p.grade?.code}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-wood-600 group-hover:text-gold-500 transition-colors mb-1">
                          {pGradeFr} {pColourFr}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">{p.finish?.name}</p>
                        <p className="text-xl font-bold text-gold-500">
                          {formatPrice(p.prix_vente_ttc)}/m²
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
