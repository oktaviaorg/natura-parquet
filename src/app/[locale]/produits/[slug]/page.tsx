'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ImageLightbox from '@/components/ImageLightbox';
import SurfaceCalculator from '@/components/SurfaceCalculator';
import AddToCartButton from '@/components/AddToCartButton';
import { products, getProductBySlug, type Product } from '@/data/products';

export default function ProductPage({ params }: { params: { slug: string; locale: string } }) {
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const product = getProductBySlug(params.slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedSurface, setSelectedSurface] = useState(10);

  const handleSurfaceChange = useCallback((m2: number) => {
    setSelectedSurface(m2);
  }, []);

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-display text-3xl text-natura-900 mb-4">
              {locale === 'fr' ? 'Produit non trouvé' : locale === 'de' ? 'Produkt nicht gefunden' : 'Product not found'}
            </h1>
            <Link href={`/${locale}/produits`} className="text-natura-600 hover:text-natura-900 transition-colors">
              ← {locale === 'fr' ? 'Retour aux produits' : locale === 'de' ? 'Zurück zu Produkten' : 'Back to products'}
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const labels = {
    breadcrumb: { fr: 'Accueil', de: 'Startseite', en: 'Home' },
    products: { fr: 'Produits', de: 'Produkte', en: 'Products' },
    freeShipping: { fr: 'Livraison gratuite France', de: 'Kostenloser Versand Frankreich', en: 'Free shipping France' },
    delivery: { fr: 'Délai de livraison', de: 'Lieferzeit', en: 'Delivery time' },
    dimensions: { fr: 'Dimensions', de: 'Maße', en: 'Dimensions' },
    width: { fr: 'Largeur', de: 'Breite', en: 'Width' },
    length: { fr: 'Longueur', de: 'Länge', en: 'Length' },
    thickness: { fr: 'Épaisseur', de: 'Stärke', en: 'Thickness' },
    finish: { fr: 'Finition', de: 'Oberfläche', en: 'Finish' },
    woodType: { fr: 'Essence', de: 'Holzart', en: 'Wood' },
    features: { fr: 'Caractéristiques', de: 'Eigenschaften', en: 'Features' },
    requestQuote: { fr: 'Demander un devis', de: 'Angebot anfordern', en: 'Request a quote' },
    freeSample: { fr: 'Échantillon gratuit', de: 'Kostenloses Muster', en: 'Free sample' },
    related: { fr: 'Produits similaires', de: 'Ähnliche Produkte', en: 'Related products' },
    stock: {
      disponible: { fr: 'En stock', de: 'Auf Lager', en: 'In stock' },
      sur_commande: { fr: 'Sur commande', de: 'Auf Bestellung', en: 'On order' },
      premier_choix: { fr: 'Premier choix', de: 'Erste Wahl', en: 'First choice' },
      sur_mesure: { fr: 'Sur mesure', de: 'Maßanfertigung', en: 'Custom' },
    },
    guide: { fr: 'Consulter le guide', de: 'Leitfaden lesen', en: 'Read the guide' },
  };

  // Get related products (same gamme, different product)
  const relatedProducts = products
    .filter(p => p.gamme === product.gamme && p.id !== product.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-natura-50 py-4 px-6 mt-20">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-natura-600">
            <Link href={`/${locale}`} className="hover:text-natura-900 transition-colors">
              {labels.breadcrumb[locale]}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/produits`} className="hover:text-natura-900 transition-colors">
              {labels.products[locale]}
            </Link>
            <span>/</span>
            <span className="text-natura-900">{product.name[locale]}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div 
                className="aspect-[4/3] overflow-hidden bg-natura-100 cursor-zoom-in relative group rounded-lg"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name[locale]}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Zoom icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                  <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
                {/* Badge gamme */}
                <span className={`absolute top-4 left-4 px-3 py-1 text-sm font-medium rounded ${
                  product.gamme === 'Exclusive' 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-natura-100 text-natura-700'
                }`}>
                  {product.gamme}
                </span>
              </div>
              
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-24 h-24 overflow-hidden rounded transition-all ${
                        selectedImage === index 
                          ? 'ring-2 ring-natura-900' 
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name[locale]} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:py-8">
              {/* Stock Status */}
              <div className="mb-4 flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full ${
                  product.stockStatus === 'disponible' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    product.stockStatus === 'disponible' ? 'bg-green-500' : 'bg-amber-500'
                  }`} />
                  {labels.stock[product.stockStatus][locale]}
                </span>
                <span className="text-sm text-natura-500">
                  {labels.delivery[locale]}: {product.delaiLivraison}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl md:text-5xl text-natura-900 mb-4">
                {product.name[locale]}
              </h1>

              {/* Description */}
              <p className="text-lg text-natura-600 leading-relaxed mb-6">
                {product.description[locale]}
              </p>

              {/* Price Badge */}
              <div className="mb-6 p-4 bg-gradient-to-r from-natura-100 to-natura-50 border border-natura-200 rounded-lg">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-display text-natura-900">
                    {product.price.ttc} €
                  </span>
                  <span className="text-natura-600">/m² TTC</span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="text-natura-500">
                    {product.price.ht.toFixed(2)} € HT
                  </span>
                  <span className="text-green-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {labels.freeShipping[locale]}
                  </span>
                </div>
              </div>

              {/* Quick Specs */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="px-4 py-2 bg-natura-50 border border-natura-100 rounded-lg">
                  <span className="text-xs text-natura-500 block">{labels.dimensions[locale]}</span>
                  <span className="font-medium text-natura-900">{product.dimensions}</span>
                </div>
                <div className="px-4 py-2 bg-natura-50 border border-natura-100 rounded-lg">
                  <span className="text-xs text-natura-500 block">{labels.finish[locale]}</span>
                  <span className="font-medium text-natura-900">{product.finition}</span>
                </div>
                <div className="px-4 py-2 bg-natura-50 border border-natura-100 rounded-lg">
                  <span className="text-xs text-natura-500 block">{labels.woodType[locale]}</span>
                  <span className="font-medium text-natura-900">
                    {locale === 'fr' ? 'Chêne européen' : locale === 'de' ? 'Europäische Eiche' : 'European oak'}
                  </span>
                </div>
              </div>

              {/* Surface Calculator */}
              <div className="mb-6">
                <SurfaceCalculator
                  priceHT={product.price.ht}
                  priceTTC={product.price.ttc}
                  onSurfaceChange={handleSurfaceChange}
                />
              </div>

              {/* Add to Cart Button */}
              <AddToCartButton
                product={{
                  id: product.id,
                  slug: product.slug,
                  name: product.name[locale],
                  price_ht: product.price.ht,
                  price_ttc: product.price.ttc,
                  image: product.images[0],
                  dimensions: product.dimensions,
                }}
                quantity_m2={selectedSurface}
                className="w-full mb-4"
              />

              {/* Secondary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  href={`/${locale}/contact?product=${encodeURIComponent(product.name[locale])}&type=devis`}
                  className="flex-1 px-6 py-3 border border-natura-300 text-natura-700 text-center font-medium hover:bg-natura-50 transition-colors rounded-lg"
                >
                  {labels.requestQuote[locale]}
                </Link>
                <Link
                  href={`/${locale}/contact?product=${encodeURIComponent(product.name[locale])}&type=echantillon`}
                  className="flex-1 px-6 py-3 border border-natura-300 text-natura-700 text-center font-medium hover:bg-natura-50 transition-colors flex items-center justify-center gap-2 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  {labels.freeSample[locale]}
                </Link>
              </div>

              {/* Detailed Specifications */}
              <div className="border-t border-natura-200 pt-6 mb-6">
                <h3 className="font-display text-xl text-natura-900 mb-4">
                  {labels.dimensions[locale]}
                </h3>
                <table className="w-full">
                  <tbody className="divide-y divide-natura-100">
                    <tr>
                      <td className="py-3 text-natura-600">{labels.thickness[locale]}</td>
                      <td className="py-3 text-natura-900 font-medium text-right">{product.epaisseur} mm</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-natura-600">{labels.width[locale]}</td>
                      <td className="py-3 text-natura-900 font-medium text-right">{product.largeur} mm</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-natura-600">{labels.length[locale]}</td>
                      <td className="py-3 text-natura-900 font-medium text-right">{product.longueur} mm</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-natura-600">{labels.finish[locale]}</td>
                      <td className="py-3 text-natura-900 font-medium text-right">{product.finition}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Features */}
              <div className="border-t border-natura-200 pt-6 mb-6">
                <h3 className="font-display text-xl text-natura-900 mb-4">
                  {labels.features[locale]}
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-natura-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Guide Link */}
              <Link
                href={`/${locale}/guide-parquet`}
                className="flex items-center gap-2 text-natura-600 hover:text-natura-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {labels.guide[locale]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 px-6 bg-natura-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-3xl text-natura-900 mb-8">
              {labels.related[locale]}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* Image Lightbox */}
      <ImageLightbox
        images={product.images}
        initialIndex={selectedImage}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        productName={product.name[locale]}
      />
    </main>
  );
}
