'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { products, heroImages, type Product } from '@/data/products';

export default function ProductsPage() {
  const t = useTranslations();
  const locale = useLocale() as 'fr' | 'de' | 'en';
  
  const [filters, setFilters] = useState<{
    category?: Product['category'];
    color?: Product['color'];
    woodType?: Product['woodType'];
    grade?: Product['grade'];
  }>({});
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleFilterChange = (filterType: string, value: string | undefined) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.color && p.color !== filters.color) return false;
      if (filters.woodType && p.woodType !== filters.woodType) return false;
      if (filters.grade && p.grade !== filters.grade) return false;
      return true;
    });
  }, [filters]);

  const pageTitle = {
    fr: 'Nos Parquets',
    de: 'Unsere Parkette',
    en: 'Our Parquets'
  };

  const pageSubtitle = {
    fr: 'Découvrez notre collection de parquets premium européens',
    de: 'Entdecken Sie unsere Kollektion europäischer Premium-Parkette',
    en: 'Discover our collection of premium European parquets'
  };

  const resultsText = {
    fr: `${filteredProducts.length} produit${filteredProducts.length > 1 ? 's' : ''}`,
    de: `${filteredProducts.length} Produkt${filteredProducts.length > 1 ? 'e' : ''}`,
    en: `${filteredProducts.length} product${filteredProducts.length > 1 ? 's' : ''}`
  };

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImages.ambiance2}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="font-display text-5xl md:text-6xl mb-4">
            {pageTitle[locale]}
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            {pageSubtitle[locale]}
          </p>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters */}
            <aside className="lg:w-72 flex-shrink-0">
              <ProductFilters 
                activeFilters={filters}
                onFilterChange={handleFilterChange}
              />
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-natura-100">
                <p className="text-natura-600">
                  {resultsText[locale]}
                </p>
                
                <div className="flex items-center gap-4">
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 bg-natura-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-natura-50'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-natura-50'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className={`grid gap-8 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 bg-natura-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-natura-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl text-natura-900 mb-2">
                    {locale === 'fr' ? 'Aucun produit trouvé' : locale === 'de' ? 'Keine Produkte gefunden' : 'No products found'}
                  </h3>
                  <p className="text-natura-600 mb-6">
                    {locale === 'fr' ? 'Essayez de modifier vos filtres' : locale === 'de' ? 'Versuchen Sie, Ihre Filter zu ändern' : 'Try adjusting your filters'}
                  </p>
                  <button
                    onClick={() => setFilters({})}
                    className="px-6 py-2 bg-natura-900 text-white text-sm font-medium hover:bg-natura-800 transition-colors"
                  >
                    {locale === 'fr' ? 'Réinitialiser les filtres' : locale === 'de' ? 'Filter zurücksetzen' : 'Reset filters'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
