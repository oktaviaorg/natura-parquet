'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const SUPABASE_STORAGE = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/natura-parquets';

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const labels = {
    viewProduct: { fr: 'Voir le produit', de: 'Produkt ansehen', en: 'View product' },
    priceFrom: { fr: 'À partir de', de: 'Ab', en: 'From' },
    perM2: { fr: 'TTC le m²', de: 'inkl. MwSt./m²', en: 'incl. VAT/m²' },
    exclusive: { fr: 'Exclusive', de: 'Exclusive', en: 'Exclusive' },
    elegance: { fr: 'Élégance', de: 'Eleganz', en: 'Elegance' },
    newBadge: { fr: 'Nouveau', de: 'Neu', en: 'New' },
  };

  // Get image URL from Supabase or fallback
  const getImageUrl = () => {
    if (product.images?.[0]?.startsWith('http')) {
      return product.images[0];
    }
    // Map product slug to Supabase image
    const slug = product.slug.toLowerCase();
    if (slug.includes('kashmir')) return `${SUPABASE_STORAGE}/products/herringbone-exclusive-neutral-11x120x600-01.jpg`;
    if (slug.includes('chevron')) return `${SUPABASE_STORAGE}/products/chevron-45-exclusive-lacquer-neutral-01.jpg`;
    if (slug.includes('baton')) return `${SUPABASE_STORAGE}/products/herringbone-elegance-neutral-11x70x490-01.jpg`;
    return `${SUPABASE_STORAGE}/ambiance/gammes-teintes-05.jpg`;
  };

  // Gamme badge color
  const gammeColor = product.gamme === 'Exclusive' 
    ? 'bg-natura-800 text-white' 
    : 'bg-natura-200 text-natura-700';

  if (viewMode === 'list') {
    return (
      <div className="flex gap-6 p-4 bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow duration-300">
        <div className="w-48 h-48 flex-shrink-0 overflow-hidden rounded-lg bg-natura-100">
          <img
            src={getImageUrl()}
            alt={product.name[locale]}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between py-2">
          <div>
            <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${gammeColor}`}>
              {labels[product.gamme.toLowerCase() as 'exclusive' | 'elegance'][locale]}
            </span>
            <h3 className="font-display text-xl text-natura-900 mt-2">
              {product.name[locale]}
            </h3>
            <p className="text-natura-600 text-sm mt-1 line-clamp-2">
              {product.description[locale]}
            </p>
            <p className="text-natura-500 text-xs mt-2">
              {product.dimensions} • {product.finition}
            </p>
          </div>
          <div className="flex items-end justify-between mt-4">
            <div>
              <span className="text-2xl font-semibold text-natura-900">
                {product.price.ttc.toFixed(0)} €
              </span>
              <span className="text-natura-500 text-sm ml-1">{labels.perM2[locale]}</span>
            </div>
            <Link
              href={`/${locale}/produits/${product.slug}`}
              className="px-6 py-2.5 bg-forest-500 text-white text-sm font-medium rounded-lg hover:bg-forest-600 transition-colors"
            >
              {labels.viewProduct[locale]}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-natura-100">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-natura-100 animate-pulse" />
        )}
        <img
          src={getImageUrl()}
          alt={product.name[locale]}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Gamme Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${gammeColor}`}>
            {labels[product.gamme.toLowerCase() as 'exclusive' | 'elegance'][locale]}
          </span>
        </div>

        {/* Quick view overlay */}
        <div className={`absolute inset-0 bg-natura-900/20 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Link
            href={`/${locale}/produits/${product.slug}`}
            className="px-5 py-2.5 bg-white text-natura-900 text-sm font-medium rounded-lg hover:bg-natura-50 transition-colors shadow-lg"
          >
            {labels.viewProduct[locale]}
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-display text-lg text-natura-900 group-hover:text-forest-600 transition-colors line-clamp-1">
          {product.name[locale]}
        </h3>
        
        {/* Specs */}
        <p className="text-natura-500 text-xs mt-1">
          {product.dimensions} • {product.finition}
        </p>

        {/* Price Row */}
        <div className="flex items-end justify-between mt-4 pt-3 border-t border-natura-100">
          <div>
            <span className="text-2xl font-semibold text-natura-900">
              {product.price.ttc.toFixed(0)} €
            </span>
            <span className="text-natura-400 text-xs ml-1">{labels.perM2[locale]}</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/${locale}/produits/${product.slug}`}
          className="mt-3 w-full block text-center px-4 py-2.5 bg-forest-500 text-white text-sm font-medium rounded-lg hover:bg-forest-600 transition-colors"
        >
          {labels.viewProduct[locale]}
        </Link>
      </div>
    </div>
  );
}
