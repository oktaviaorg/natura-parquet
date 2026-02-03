'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale() as 'fr' | 'de' | 'en';

  const categoryLabels = {
    engineered: { fr: 'Contrecollé', de: 'Mehrschicht', en: 'Engineered' },
    solid: { fr: 'Massif', de: 'Massiv', en: 'Solid' },
    industrial: { fr: 'Industriel', de: 'Industrie', en: 'Industrial' },
  };

  const gradeLabels = {
    select: { fr: 'Select', de: 'Select', en: 'Select' },
    natur: { fr: 'Natur', de: 'Natur', en: 'Natur' },
    rustic: { fr: 'Rustique', de: 'Rustikal', en: 'Rustic' },
  };

  return (
    <Link 
      href={`/${locale}/produits/${product.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-natura-100 mb-4">
        <img
          src={product.images[0]}
          alt={product.name[locale]}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium uppercase tracking-wider text-natura-700">
            {categoryLabels[product.category][locale]}
          </span>
        </div>
        
        {/* Quick view button */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-4 py-2 bg-white text-natura-900 text-sm font-medium">
            {locale === 'fr' ? 'Voir' : locale === 'de' ? 'Ansehen' : 'View'}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-display text-xl text-natura-900 group-hover:text-natura-700 transition-colors">
          {product.name[locale]}
        </h3>
        
        <div className="flex items-center gap-3 text-sm text-natura-500">
          <span>{product.dimensions.width} × {product.dimensions.thickness}</span>
          <span className="w-1 h-1 rounded-full bg-natura-300" />
          <span className="font-medium">
            {locale === 'fr' ? 'Sélection' : locale === 'de' ? 'Auswahl' : 'Wood Selection'}: {gradeLabels[product.grade][locale]}
          </span>
        </div>
        
        <p className="text-sm text-natura-600 line-clamp-2">
          {product.description[locale]}
        </p>
        
        <div className="mt-3 pt-3 border-t border-natura-100">
          <span className="text-lg font-semibold text-natura-900">
            {product.price.display}
          </span>
          <span className="text-xs text-natura-500 ml-1">HT</span>
        </div>
      </div>
    </Link>
  );
}
