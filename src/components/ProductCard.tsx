'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Product } from '@/data/products';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const locale = useLocale() as 'fr' | 'de' | 'en';

  const stockLabels = {
    disponible: { fr: 'En stock', de: 'Auf Lager', en: 'In stock' },
    sur_commande: { fr: 'Sur commande', de: 'Auf Bestellung', en: 'On order' },
    premier_choix: { fr: 'Premier choix', de: 'Erste Wahl', en: 'First choice' },
    sur_mesure: { fr: 'Sur mesure', de: 'Maßanfertigung', en: 'Custom' },
  };

  const delaiLabels = {
    fr: 'Délai',
    de: 'Lieferzeit',
    en: 'Delivery',
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-natura-100">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <Link 
            href={`/${locale}/produits/${product.slug}`}
            className="md:w-64 h-48 md:h-auto flex-shrink-0 relative overflow-hidden"
          >
            <img
              src={product.images[0]}
              alt={product.name[locale]}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            {/* Badge gamme */}
            <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded ${
              product.gamme === 'Exclusive' 
                ? 'bg-amber-100 text-amber-800' 
                : 'bg-natura-100 text-natura-700'
            }`}>
              {product.gamme}
            </span>
          </Link>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <Link href={`/${locale}/produits/${product.slug}`}>
                <h3 className="font-display text-xl text-natura-900 hover:text-natura-700 transition-colors mb-2">
                  {product.name[locale]}
                </h3>
              </Link>
              <p className="text-natura-600 text-sm mb-3 line-clamp-2">
                {product.description[locale]}
              </p>
              
              {/* Specs */}
              <div className="flex flex-wrap gap-4 text-sm text-natura-500 mb-4">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  {product.dimensions}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  {product.finition}
                </span>
                <span className={`flex items-center gap-1 ${
                  product.stockStatus === 'disponible' ? 'text-green-600' : 'text-amber-600'
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {stockLabels[product.stockStatus][locale]}
                </span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-natura-100">
              <div>
                <span className="font-display text-2xl text-natura-900">{product.price.ttc} €</span>
                <span className="text-natura-500 text-sm">/m² TTC</span>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/${locale}/produits/${product.slug}`}
                  className="px-4 py-2 border border-natura-300 text-natura-700 text-sm font-medium hover:bg-natura-50 transition-colors rounded-lg"
                >
                  {locale === 'fr' ? 'Voir détails' : locale === 'de' ? 'Details' : 'View details'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-natura-100">
      {/* Image */}
      <Link 
        href={`/${locale}/produits/${product.slug}`}
        className="block aspect-square relative overflow-hidden"
      >
        <img
          src={product.images[0]}
          alt={product.name[locale]}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Badge gamme */}
        <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded ${
          product.gamme === 'Exclusive' 
            ? 'bg-amber-100 text-amber-800' 
            : 'bg-natura-100 text-natura-700'
        }`}>
          {product.gamme}
        </span>
        {/* Stock status */}
        <span className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded ${
          product.stockStatus === 'disponible' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-amber-50 text-amber-700'
        }`}>
          {stockLabels[product.stockStatus][locale]}
        </span>
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/${locale}/produits/${product.slug}`}>
          <h3 className="font-display text-lg text-natura-900 group-hover:text-natura-700 transition-colors mb-1">
            {product.name[locale]}
          </h3>
        </Link>
        
        {/* Dimensions & Finition */}
        <p className="text-sm text-natura-500 mb-3">
          {product.dimensions} • {product.finition}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-display text-2xl text-natura-900">{product.price.ttc} €</span>
          <span className="text-natura-500 text-sm">/m² TTC</span>
        </div>

        {/* Délai */}
        <p className="text-xs text-natura-500 mb-4">
          {delaiLabels[locale]}: {product.delaiLivraison}
        </p>

        {/* CTA */}
        <Link
          href={`/${locale}/produits/${product.slug}`}
          className="block w-full py-3 bg-natura-900 text-white text-center text-sm font-medium hover:bg-natura-800 transition-colors rounded-lg"
        >
          {locale === 'fr' ? 'Voir le produit' : locale === 'de' ? 'Produkt ansehen' : 'View product'}
        </Link>
      </div>
    </div>
  );
}
