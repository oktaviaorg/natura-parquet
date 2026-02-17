'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Grade, Colour, Finish, Format } from '@/lib/types';

interface Product {
  id: number;
  prix_vente_ttc: number;
  grade: Grade;
  colour: Colour;
  finish: Finish;
  format: Format;
}

interface Filters {
  grades: Grade[];
  colours: Colour[];
  finishes: Finish[];
  formats: Format[];
}

interface Props {
  initialProducts: Product[];
  filters: Filters;
}

export default function CatalogueClient({ initialProducts, filters }: Props) {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedColour, setSelectedColour] = useState<number | null>(null);
  const [selectedFinish, setSelectedFinish] = useState<number | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('price-asc');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = initialProducts.filter(product => {
      if (selectedGrade && product.grade?.id !== selectedGrade) return false;
      if (selectedColour && product.colour?.id !== selectedColour) return false;
      if (selectedFinish && product.finish?.id !== selectedFinish) return false;
      if (selectedFormat && product.format?.id !== selectedFormat) return false;
      return true;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.prix_vente_ttc - b.prix_vente_ttc;
      if (sortBy === 'price-desc') return b.prix_vente_ttc - a.prix_vente_ttc;
      return (a.grade?.name || '').localeCompare(b.grade?.name || '');
    });

    return result;
  }, [initialProducts, selectedGrade, selectedColour, selectedFinish, selectedFormat, sortBy]);

  const clearFilters = () => {
    setSelectedGrade(null);
    setSelectedColour(null);
    setSelectedFinish(null);
    setSelectedFormat(null);
  };

  const hasActiveFilters = selectedGrade || selectedColour || selectedFinish || selectedFormat;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile filter button */}
      <button 
        className="lg:hidden btn-outline flex items-center justify-center gap-2"
        onClick={() => setShowFilters(!showFilters)}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filtres {hasActiveFilters && `(${[selectedGrade, selectedColour, selectedFinish, selectedFormat].filter(Boolean).length})`}
      </button>

      {/* Filters Sidebar */}
      <aside className={`lg:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-wood-600">Filtres</h3>
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="text-sm text-gold-500 hover:text-gold-600"
              >
                Effacer tout
              </button>
            )}
          </div>

          {/* Grade Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
            <select 
              value={selectedGrade || ''}
              onChange={(e) => setSelectedGrade(e.target.value ? Number(e.target.value) : null)}
              className="input"
            >
              <option value="">Tous les grades</option>
              {filters.grades.map(grade => (
                <option key={grade.id} value={grade.id}>{grade.name}</option>
              ))}
            </select>
          </div>

          {/* Colour Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
            <select 
              value={selectedColour || ''}
              onChange={(e) => setSelectedColour(e.target.value ? Number(e.target.value) : null)}
              className="input"
            >
              <option value="">Toutes les couleurs</option>
              {filters.colours.map(colour => (
                <option key={colour.id} value={colour.id}>{colour.name}</option>
              ))}
            </select>
          </div>

          {/* Finish Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Finition</label>
            <select 
              value={selectedFinish || ''}
              onChange={(e) => setSelectedFinish(e.target.value ? Number(e.target.value) : null)}
              className="input"
            >
              <option value="">Toutes les finitions</option>
              {filters.finishes.map(finish => (
                <option key={finish.id} value={finish.id}>{finish.name}</option>
              ))}
            </select>
          </div>

          {/* Format Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <select 
              value={selectedFormat || ''}
              onChange={(e) => setSelectedFormat(e.target.value ? Number(e.target.value) : null)}
              className="input"
            >
              <option value="">Tous les formats</option>
              {filters.formats.map(format => (
                <option key={format.id} value={format.id}>{format.name}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trier par</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="input"
            >
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="name">Nom</option>
            </select>
          </div>
        </div>
      </aside>

      {/* Products Grid */}
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-wood-600">{filteredProducts.length}</span> produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-xl font-bold text-wood-600 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600 mb-4">Essayez de modifier vos filtres</p>
            <button onClick={clearFilters} className="btn-primary">
              Effacer les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link 
                key={product.id} 
                href={`/catalogue/${product.id}`}
                className="card group hover:scale-[1.02] transition-transform duration-200"
              >
                <div 
                  className="h-48 flex items-center justify-center relative overflow-hidden"
                  style={{ 
                    backgroundColor: product.colour?.hex_color || '#d4bfa3',
                    backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)'
                  }}
                >
                  <span className="text-6xl opacity-30 group-hover:scale-110 transition-transform">🪵</span>
                  <div className="absolute top-3 right-3 bg-gold-400 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.grade?.code || 'STD'}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-wood-600 mb-1 group-hover:text-gold-500 transition-colors">
                    {product.grade?.name} - {product.colour?.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    {product.finish?.name} • {product.format?.width_mm}×{product.format?.length_mm}mm
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-gold-500">
                        {product.prix_vente_ttc?.toFixed(2)}€
                      </span>
                      <span className="text-sm text-gray-500">/m²</span>
                    </div>
                    <span className="text-wood-400 group-hover:text-wood-600 transition-colors text-sm font-medium">
                      Voir détails →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
