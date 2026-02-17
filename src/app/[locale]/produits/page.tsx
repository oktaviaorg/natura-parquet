'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { products, heroImages, type Product } from '@/data/products';

export default function ProductsPage() {
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const searchParams = useSearchParams();
  
  // Initialize filters from URL params
  const initialGamme = searchParams.get('gamme') as Product['gamme'] | null;
  
  const [filters, setFilters] = useState<{
    gamme?: Product['gamme'];
    finition?: string;
    largeur?: number;
    priceRange?: string;
  }>({
    gamme: initialGamme || undefined
  });
  
  // Update filters when URL params change
  useEffect(() => {
    const urlGamme = searchParams.get('gamme') as Product['gamme'] | null;
    if (urlGamme) {
      setFilters(prev => ({ ...prev, gamme: urlGamme }));
    }
  }, [searchParams]);
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('price-asc');

  const handleFilterChange = (filterType: string, value: string | number | undefined) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      // Gamme filter
      if (filters.gamme && p.gamme !== filters.gamme) return false;
      
      // Finition filter
      if (filters.finition) {
        const finitionLower = p.finition.toLowerCase();
        if (!finitionLower.includes(filters.finition.toLowerCase())) return false;
      }
      
      // Largeur filter
      if (filters.largeur && p.largeur !== filters.largeur) return false;
      
      // Price range filter
      if (filters.priceRange) {
        const price = p.price.ttc;
        if (filters.priceRange === '0-50' && price >= 50) return false;
        if (filters.priceRange === '50-60' && (price < 50 || price >= 60)) return false;
        if (filters.priceRange === '60+' && price < 60) return false;
      }
      
      return true;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price.ttc - b.price.ttc;
      if (sortBy === 'price-desc') return b.price.ttc - a.price.ttc;
      return a.name.fr.localeCompare(b.name.fr);
    });

    return result;
  }, [filters, sortBy]);

  const pageTitle = {
    fr: 'Nos Parquets',
    de: 'Unsere Parkette',
    en: 'Our Parquets'
  };

  const pageSubtitle = {
    fr: 'Parquets chêne européen de qualité premium, livrés directement de Pologne',
    de: 'Europäische Premium-Eichenparkette, direkt aus Polen geliefert',
    en: 'Premium European oak parquets, delivered directly from Poland'
  };

  const resultsText = {
    fr: `${filteredProducts.length} produit${filteredProducts.length > 1 ? 's' : ''}`,
    de: `${filteredProducts.length} Produkt${filteredProducts.length > 1 ? 'e' : ''}`,
    en: `${filteredProducts.length} product${filteredProducts.length > 1 ? 's' : ''}`
  };

  const sortLabels = {
    'price-asc': { fr: 'Prix croissant', de: 'Preis aufsteigend', en: 'Price: Low to High' },
    'price-desc': { fr: 'Prix décroissant', de: 'Preis absteigend', en: 'Price: High to Low' },
    'name': { fr: 'Nom', de: 'Name', en: 'Name' },
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
          
          {/* Price badge */}
          <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-amber-300">★</span>
            <span className="text-sm">
              {locale === 'fr' ? 'À partir de 45 €/m² TTC' : locale === 'de' ? 'Ab 45 €/m² inkl. MwSt.' : 'From €45/m² incl. VAT'}
            </span>
          </div>
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
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-natura-100 gap-4">
                <p className="text-natura-600">
                  {resultsText[locale]}
                </p>
                
                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="px-3 py-2 border border-natura-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-natura-500"
                  >
                    <option value="price-asc">{sortLabels['price-asc'][locale]}</option>
                    <option value="price-desc">{sortLabels['price-desc'][locale]}</option>
                    <option value="name">{sortLabels['name'][locale]}</option>
                  </select>
                  
                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex items-center gap-1 bg-natura-100 rounded-lg p-1">
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
                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
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
                    className="px-6 py-2 bg-natura-900 text-white text-sm font-medium hover:bg-natura-800 transition-colors rounded-lg"
                  >
                    {locale === 'fr' ? 'Réinitialiser les filtres' : locale === 'de' ? 'Filter zurücksetzen' : 'Reset filters'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-natura-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl text-natura-900 mb-4">
            {locale === 'fr' ? 'Besoin de conseils ?' : locale === 'de' ? 'Brauchen Sie Beratung?' : 'Need advice?'}
          </h2>
          <p className="text-natura-600 mb-8 max-w-2xl mx-auto">
            {locale === 'fr' 
              ? 'Notre guide vous aide à choisir le parquet idéal pour votre projet. Dimensions, finitions, pose... tout y est !'
              : locale === 'de'
              ? 'Unser Leitfaden hilft Ihnen bei der Auswahl des idealen Parketts für Ihr Projekt.'
              : 'Our guide helps you choose the ideal parquet for your project.'}
          </p>
          <a
            href={`/${locale}/guide-parquet`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-natura-900 text-white font-medium hover:bg-natura-800 transition-colors rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {locale === 'fr' ? 'Lire le guide' : locale === 'de' ? 'Leitfaden lesen' : 'Read the guide'}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
