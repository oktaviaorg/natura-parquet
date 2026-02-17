import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

async function getProduct(id: string) {
  const { data } = await supabase
    .from('natura_prices')
    .select(`
      *,
      grade:natura_grades(*),
      colour:natura_colours(*),
      finish:natura_finishes(*),
      format:natura_formats(*)
    `)
    .eq('id', id)
    .eq('active', true)
    .single();

  return data;
}

async function getSimilarProducts(product: any) {
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
    .eq('grade_id', product.grade_id)
    .neq('id', product.id)
    .limit(3);

  return data || [];
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }

  const similarProducts = await getSimilarProducts(product);

  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-wood-500">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/catalogue" className="hover:text-wood-500">Catalogue</Link></li>
            <li>/</li>
            <li className="text-wood-600 font-medium">{product.grade?.name} - {product.colour?.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div 
              className="aspect-square rounded-2xl flex items-center justify-center shadow-lg overflow-hidden"
              style={{ 
                backgroundColor: product.colour?.hex_color || '#d4bfa3',
                backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)'
              }}
            >
              <span className="text-[200px] opacity-30">🪵</span>
            </div>
            
            {/* Color swatch */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md">
              <div 
                className="w-16 h-16 rounded-lg shadow-inner"
                style={{ backgroundColor: product.colour?.hex_color || '#d4bfa3' }}
              ></div>
              <div>
                <p className="font-medium text-wood-600">Couleur: {product.colour?.name}</p>
                <p className="text-sm text-gray-500">{product.colour?.hex_color}</p>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-4">
                <span className="bg-gold-100 text-gold-600 text-sm font-medium px-3 py-1 rounded-full">
                  Grade {product.grade?.code}
                </span>
                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  En stock
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-wood-600 font-serif mb-2">
                {product.grade?.name}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {product.colour?.name} • {product.finish?.name}
              </p>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-bold text-gold-500">
                  {product.prix_vente_ttc?.toFixed(2)}€
                </span>
                <span className="text-gray-500">/m² TTC</span>
              </div>

              {/* Specifications */}
              <div className="border-t border-gray-100 pt-6 mb-8">
                <h3 className="font-bold text-wood-600 mb-4">Caractéristiques</h3>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-500">Format</dt>
                    <dd className="font-medium text-gray-800">{product.format?.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Dimensions</dt>
                    <dd className="font-medium text-gray-800">
                      {product.format?.width_mm} × {product.format?.length_mm} mm
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Épaisseur</dt>
                    <dd className="font-medium text-gray-800">{product.format?.thickness_mm} mm</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Finition</dt>
                    <dd className="font-medium text-gray-800">{product.finish?.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Grade</dt>
                    <dd className="font-medium text-gray-800">{product.grade?.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Couleur</dt>
                    <dd className="font-medium text-gray-800">{product.colour?.name}</dd>
                  </div>
                </dl>
              </div>

              {/* Grade Description */}
              {product.grade?.description && (
                <div className="bg-cream-100 rounded-xl p-4 mb-8">
                  <h4 className="font-medium text-wood-600 mb-2">À propos du grade {product.grade.code}</h4>
                  <p className="text-gray-600 text-sm">{product.grade.description}</p>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href={`/devis?product=${product.id}`}
                  className="btn-primary text-center flex-1"
                >
                  Demander un devis
                </Link>
                <Link 
                  href="/contact"
                  className="btn-outline text-center flex-1"
                >
                  Nous contacter
                </Link>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-xl p-4 text-center shadow-md">
                <span className="text-2xl mb-1 block">🚚</span>
                <p className="text-xs text-gray-600">Livraison<br/>France entière</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-md">
                <span className="text-2xl mb-1 block">🛡️</span>
                <p className="text-xs text-gray-600">Garantie<br/>25 ans</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-md">
                <span className="text-2xl mb-1 block">🌱</span>
                <p className="text-xs text-gray-600">Bois<br/>certifié</p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-wood-600 font-serif mb-8">
              Produits similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProducts.map((p: any) => (
                <Link 
                  key={p.id}
                  href={`/catalogue/${p.id}`}
                  className="card group hover:scale-[1.02] transition-transform"
                >
                  <div 
                    className="h-40 flex items-center justify-center"
                    style={{ backgroundColor: p.colour?.hex_color || '#d4bfa3' }}
                  >
                    <span className="text-5xl opacity-30">🪵</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-wood-600 group-hover:text-gold-500 transition-colors">
                      {p.grade?.name} - {p.colour?.name}
                    </h3>
                    <p className="text-sm text-gray-500">{p.finish?.name}</p>
                    <p className="text-lg font-bold text-gold-500 mt-2">
                      {p.prix_vente_ttc?.toFixed(2)}€/m²
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
