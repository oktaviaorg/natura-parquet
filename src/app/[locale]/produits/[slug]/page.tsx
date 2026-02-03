'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import DownloadPDFButton from '@/components/ProductPDF';
import ImageLightbox from '@/components/ImageLightbox';
import { products, getProductBySlug, type Product } from '@/data/products';

export default function ProductPage({ params }: { params: { slug: string; locale: string } }) {
  const t = useTranslations();
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const product = getProductBySlug(params.slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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

  const categoryLabels = {
    engineered: { fr: 'Parquet Contrecollé', de: 'Mehrschichtparkett', en: 'Engineered Parquet' },
    solid: { fr: 'Parquet Massif', de: 'Massivparkett', en: 'Solid Parquet' },
    industrial: { fr: 'Parquet Industriel', de: 'Industrieparkett', en: 'Industrial Parquet' },
  };

  const gradeLabels = {
    select: { fr: 'Select', de: 'Select', en: 'Select' },
    natur: { fr: 'Natur', de: 'Natur', en: 'Natur' },
    rustic: { fr: 'Rustique', de: 'Rustikal', en: 'Rustic' },
  };

  const woodLabels = {
    oak: { fr: 'Chêne', de: 'Eiche', en: 'Oak' },
    ash: { fr: 'Frêne', de: 'Esche', en: 'Ash' },
  };

  // Get related products (same category, different product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-natura-50 py-4 px-6 mt-20">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-natura-600">
            <Link href={`/${locale}`} className="hover:text-natura-900 transition-colors">
              {t('nav.home')}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/produits`} className="hover:text-natura-900 transition-colors">
              {t('nav.products')}
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
                className="aspect-[4/3] overflow-hidden bg-natura-100 cursor-zoom-in relative group"
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
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-24 h-24 overflow-hidden transition-all ${
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
            </div>

            {/* Product Info */}
            <div className="lg:py-8">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-natura-100 text-natura-700 text-xs font-medium uppercase tracking-wider">
                  {categoryLabels[product.category][locale]}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl md:text-5xl text-natura-900 mb-4">
                {product.name[locale]}
              </h1>

              {/* Description */}
              <p className="text-lg text-natura-600 leading-relaxed mb-8">
                {product.description[locale]}
              </p>

              {/* Quick Specs */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="px-4 py-2 bg-natura-50 border border-natura-100">
                  <span className="text-xs text-natura-500 block">
                    {locale === 'fr' ? 'Essence' : locale === 'de' ? 'Holzart' : 'Wood'}
                  </span>
                  <span className="font-medium text-natura-900">
                    {woodLabels[product.woodType][locale]}
                  </span>
                </div>
                <div className="px-4 py-2 bg-natura-50 border border-natura-100">
                  <span className="text-xs text-natura-500 block">
                    {locale === 'fr' ? 'Sélection' : locale === 'de' ? 'Auswahl' : 'Grade'}
                  </span>
                  <span className="font-medium text-natura-900">
                    {gradeLabels[product.grade][locale]}
                  </span>
                </div>
                <div className="px-4 py-2 bg-natura-50 border border-natura-100">
                  <span className="text-xs text-natura-500 block">
                    {locale === 'fr' ? 'Finition' : locale === 'de' ? 'Finish' : 'Finish'}
                  </span>
                  <span className="font-medium text-natura-900">
                    {product.finish}
                  </span>
                </div>
              </div>

              {/* Detailed Specifications */}
              <div className="border-t border-natura-200 pt-8 mb-8">
                <h3 className="font-display text-xl text-natura-900 mb-4">
                  {locale === 'fr' ? 'Dimensions' : locale === 'de' ? 'Maße' : 'Dimensions'}
                </h3>
                <table className="w-full">
                  <tbody className="divide-y divide-natura-100">
                    <tr>
                      <td className="py-3 text-natura-600">
                        {locale === 'fr' ? 'Largeur' : locale === 'de' ? 'Breite' : 'Width'}
                      </td>
                      <td className="py-3 text-natura-900 font-medium text-right">
                        {product.dimensions.width}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-natura-600">
                        {locale === 'fr' ? 'Longueur' : locale === 'de' ? 'Länge' : 'Length'}
                      </td>
                      <td className="py-3 text-natura-900 font-medium text-right">
                        {product.dimensions.length}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-natura-600">
                        {locale === 'fr' ? 'Épaisseur' : locale === 'de' ? 'Stärke' : 'Thickness'}
                      </td>
                      <td className="py-3 text-natura-900 font-medium text-right">
                        {product.dimensions.thickness}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Features */}
              <div className="border-t border-natura-200 pt-8 mb-8">
                <h3 className="font-display text-xl text-natura-900 mb-4">
                  {locale === 'fr' ? 'Caractéristiques' : locale === 'de' ? 'Eigenschaften' : 'Features'}
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-natura-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-natura-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="flex-1 px-8 py-4 bg-natura-900 text-white text-center font-medium hover:bg-natura-800 transition-colors"
                >
                  {locale === 'fr' ? 'Demander un devis' : locale === 'de' ? 'Angebot anfordern' : 'Request a quote'}
                </Link>
                <DownloadPDFButton
                  product={{
                    name: product.name[locale],
                    category: product.category,
                    description: product.description[locale],
                    wood: woodLabels[product.woodType][locale],
                    grade: gradeLabels[product.grade][locale],
                    finish: product.finish,
                    width: parseInt(product.dimensions.width),
                    length: parseInt(product.dimensions.length),
                    thickness: parseInt(product.dimensions.thickness),
                    features: product.features,
                  }}
                  locale={locale}
                  className="flex-1 justify-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 px-6 bg-natura-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-3xl text-natura-900 mb-8">
              {locale === 'fr' ? 'Produits similaires' : locale === 'de' ? 'Ähnliche Produkte' : 'Related products'}
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
