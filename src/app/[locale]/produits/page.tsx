'use client';

import { useState, useMemo, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { products, type Product } from '@/data/products';

const SUPABASE_STORAGE = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/natura-parquets';

export default function ProductsPage() {
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const searchParams = useSearchParams();
  
  const initialGamme = searchParams.get('gamme') as Product['gamme'] | null;
  
  const [filters, setFilters] = useState<{
    gamme?: 'Exclusive' | 'Elegance' | 'Rustic' | 'Country';
    finition?: string;
    largeur?: number;
    priceRange?: string;
    pose?: string;
    color?: string;
  }>({
    gamme: (initialGamme as 'Exclusive' | 'Elegance' | 'Rustic' | 'Country') || undefined
  });
  
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');

  useEffect(() => {
    const urlGamme = searchParams.get('gamme') as Product['gamme'] | null;
    if (urlGamme) {
      setFilters(prev => ({ ...prev, gamme: urlGamme }));
    }
  }, [searchParams]);

  const handleFilterChange = (filterType: string, value: string | number | undefined) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      if (filters.gamme && p.gamme !== filters.gamme) return false;
      if (filters.finition) {
        const finitionLower = p.finition.toLowerCase();
        if (!finitionLower.includes(filters.finition.toLowerCase())) return false;
      }
      if (filters.largeur && p.largeur !== filters.largeur) return false;
      if (filters.priceRange) {
        const price = p.price.ttc;
        if (filters.priceRange === '0-50' && price >= 50) return false;
        if (filters.priceRange === '50-60' && (price < 50 || price >= 60)) return false;
        if (filters.priceRange === '60+' && price < 60) return false;
      }
      // Filtre Format (pose)
      if (filters.pose) {
        if (filters.pose === 'lame' && p.pose !== 'lame') return false;
        if (filters.pose === 'baton-rompu' && p.pose !== 'baton-rompu') return false;
        if (filters.pose === 'point-hongrie' && p.pose !== 'point-hongrie') return false;
        if (filters.pose === 'chevron' && !p.pose.startsWith('chevron')) return false;
      }
      return true;
    });

    result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price.ttc - b.price.ttc;
      if (sortBy === 'price-desc') return b.price.ttc - a.price.ttc;
      return a.name.fr.localeCompare(b.name.fr);
    });

    return result;
  }, [filters, sortBy]);

  const labels = {
    pageTitle: { fr: 'Nos Parquets', de: 'Unsere Parkette', en: 'Our Parquets' },
    pageSubtitle: {
      fr: 'Parquets chêne européen de qualité premium, livrés directement de Pologne',
      de: 'Europäische Premium-Eichenparkette, direkt aus Polen geliefert',
      en: 'Premium European oak parquets, delivered directly from Poland'
    },
    results: { fr: 'produit', de: 'Produkt', en: 'product' },
    showFilters: { fr: 'Filtres', de: 'Filter', en: 'Filters' },
    hideFilters: { fr: 'Masquer', de: 'Ausblenden', en: 'Hide' },
    sortBy: { fr: 'Trier par', de: 'Sortieren nach', en: 'Sort by' },
    priceAsc: { fr: 'Prix croissant', de: 'Preis aufsteigend', en: 'Price: Low to High' },
    priceDesc: { fr: 'Prix décroissant', de: 'Preis absteigend', en: 'Price: High to Low' },
    nameSort: { fr: 'Nom', de: 'Name', en: 'Name' },
    noResults: { fr: 'Aucun produit trouvé', de: 'Keine Produkte gefunden', en: 'No products found' },
    noResultsHint: { fr: 'Essayez de modifier vos filtres', de: 'Versuchen Sie, Ihre Filter zu ändern', en: 'Try adjusting your filters' },
    resetFilters: { fr: 'Réinitialiser les filtres', de: 'Filter zurücksetzen', en: 'Reset filters' },
  };

  return (
    <main className="min-h-screen bg-natura-50">
      <Navigation />

      {/* Hero Banner - More compact */}
      <section className="relative h-[40vh] min-h-[320px] flex items-center overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0">
          <img 
            src={`${SUPABASE_STORAGE}/ambiance/gammes-teintes-05.jpg`}
            alt="Collection parquets"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-natura-900/80 to-natura-900/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white">
            {labels.pageTitle[locale]}
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-xl">
            {labels.pageSubtitle[locale]}
          </p>
          
          {/* Quick stats */}
          <div className="mt-6 flex items-center gap-6">
            <div className="flex items-center gap-2 text-white/60">
              <span className="text-2xl font-semibold text-white">{products.length}</span>
              <span className="text-sm">{labels.results[locale]}s</span>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="text-white/60 text-sm">
              {locale === 'fr' ? 'À partir de 45€/m²' : locale === 'de' ? 'Ab 45€/m²' : 'From €45/m²'}
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              {/* Toggle filters button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-natura-200 hover:border-natura-300 transition-colors"
              >
                <svg className="w-5 h-5 text-natura-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="text-sm font-medium text-natura-700">
                  {showFilters ? labels.hideFilters[locale] : labels.showFilters[locale]}
                </span>
              </button>

              {/* Results count */}
              <p className="text-natura-600 text-sm">
                <span className="font-semibold text-natura-900">{filteredProducts.length}</span> {labels.results[locale]}{filteredProducts.length > 1 ? 's' : ''}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-2 bg-white border border-natura-200 rounded-lg text-sm text-natura-700 focus:outline-none focus:ring-2 focus:ring-forest-500"
              >
                <option value="name">{labels.nameSort[locale]}</option>
                <option value="price-asc">{labels.priceAsc[locale]}</option>
                <option value="price-desc">{labels.priceDesc[locale]}</option>
              </select>
              
              {/* View Mode */}
              <div className="hidden sm:flex items-center gap-1 bg-white rounded-lg border border-natura-200 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-forest-500 text-white' : 'text-natura-500 hover:text-natura-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-forest-500 text-white' : 'text-natura-500 hover:text-natura-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            {showFilters && (
              <aside className="w-72 flex-shrink-0 hidden lg:block">
                <div className="sticky top-24">
                  <ProductFilters 
                    activeFilters={filters}
                    onFilterChange={handleFilterChange}
                  />
                </div>
              </aside>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? showFilters 
                      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                }`}>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-natura-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-natura-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl text-natura-900 mb-2">
                    {labels.noResults[locale]}
                  </h3>
                  <p className="text-natura-600 mb-6">
                    {labels.noResultsHint[locale]}
                  </p>
                  <button
                    onClick={() => setFilters({})}
                    className="px-6 py-2.5 bg-forest-500 text-white text-sm font-medium hover:bg-forest-600 transition-colors rounded-lg"
                  >
                    {labels.resetFilters[locale]}
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
