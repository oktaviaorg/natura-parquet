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

// Traductions
const gradeTranslations: Record<string, string> = {
  'Exclusive': 'Prestige',
  'Elegance': 'Élégance',
  'Rustic': 'Rustique',
  'Country': 'Tradition',
};

const colourTranslations: Record<string, string> = {
  'Raw': 'Naturel',
  'Crema': 'Crème',
  'Honey': 'Miel',
  'Amber': 'Ambre',
  'Gilio': 'Noisette',
  'Nugat': 'Nougat',
  'Smoked Oil': 'Fumé',
  'Multicolored': 'Authentique',
  'Neutral': 'Naturel',
  'Raw Wood': 'Bois Brut',
  'Nugat Dark': 'Nougat Foncé',
  'Fumé': 'Fumé',
};

const formatTranslations: Record<string, string> = {
  'Herringbone': 'Bâton Rompu',
  'Chevron': 'Point de Hongrie',
  'Plank': 'Lame Large',
  'XL Plank': 'Lame XL',
};

function generateSlug(format: string, grade: string, colour: string, dimensions: string): string {
  const formatTr: Record<string, string> = {
    'Herringbone': 'baton-rompu',
    'Chevron': 'point-de-hongrie',
    'Plank': 'lame-large',
    'XL Plank': 'lame-xl',
    'Bâton Rompu': 'baton-rompu',
    'Point de Hongrie': 'point-de-hongrie',
  };
  
  const gradeTr: Record<string, string> = {
    'Exclusive': 'prestige',
    'Elegance': 'elegance',
    'Rustic': 'rustique',
    'Country': 'tradition',
  };
  
  const colourTr: Record<string, string> = {
    'Raw': 'naturel',
    'Crema': 'creme',
    'Honey': 'miel',
    'Amber': 'ambre',
    'Gilio': 'noisette',
    'Nugat': 'nougat',
    'Smoked Oil': 'fume',
    'Multicolored': 'authentique',
    'Neutral': 'naturel',
    'Raw Wood': 'bois-brut',
    'Nugat Dark': 'nougat-fonce',
    'Fumé': 'fume',
  };

  const formatSlug = formatTr[format] || format.toLowerCase().replace(/\s+/g, '-');
  const gradeSlug = gradeTr[grade] || grade.toLowerCase().replace(/\s+/g, '-');
  const colourSlug = colourTr[colour] || colour.toLowerCase().replace(/\s+/g, '-');
  
  return `${formatSlug}-${gradeSlug}-${colourSlug}-${dimensions}`.replace(/[^a-z0-9-]/g, '');
}

export default function CatalogueClient({ initialProducts, filters }: Props) {
  const [selectedGrades, setSelectedGrades] = useState<number[]>([]);
  const [selectedColours, setSelectedColours] = useState<number[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<number[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('price-asc');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    let result = initialProducts.filter(product => {
      if (selectedGrades.length && !selectedGrades.includes(product.grade?.id)) return false;
      if (selectedColours.length && !selectedColours.includes(product.colour?.id)) return false;
      if (selectedFinishes.length && !selectedFinishes.includes(product.finish?.id)) return false;
      if (selectedFormats.length && !selectedFormats.includes(product.format?.id)) return false;
      return true;
    });

    result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.prix_vente_ttc - b.prix_vente_ttc;
      if (sortBy === 'price-desc') return b.prix_vente_ttc - a.prix_vente_ttc;
      return (a.grade?.name || '').localeCompare(b.grade?.name || '');
    });

    return result;
  }, [initialProducts, selectedGrades, selectedColours, selectedFinishes, selectedFormats, sortBy]);

  const toggleFilter = (
    value: number, 
    selected: number[], 
    setSelected: (v: number[]) => void
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearFilters = () => {
    setSelectedGrades([]);
    setSelectedColours([]);
    setSelectedFinishes([]);
    setSelectedFormats([]);
  };

  const activeFiltersCount = selectedGrades.length + selectedColours.length + selectedFinishes.length + selectedFormats.length;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile filter toggle */}
      <div className="lg:hidden flex gap-3">
        <button 
          className="flex-1 flex items-center justify-center gap-2 bg-white border border-cream-200 rounded-lg px-4 py-3 font-medium text-wood-600 hover:border-gold-400 transition-colors"
          onClick={() => setShowFilters(!showFilters)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filtres
          {activeFiltersCount > 0 && (
            <span className="bg-gold-400 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="flex-1 bg-white border border-cream-200 rounded-lg px-4 py-3 font-medium text-wood-600 focus:border-gold-400 outline-none"
        >
          <option value="price-asc">Prix ↑</option>
          <option value="price-desc">Prix ↓</option>
          <option value="name">Nom</option>
        </select>
      </div>

      {/* Filters Sidebar */}
      <aside className={`lg:w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div className="bg-white rounded-2xl shadow-lg border border-cream-200 sticky top-24 overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-cream-100 bg-cream-50">
            <h3 className="text-xl font-serif font-bold text-wood-600">Filtres</h3>
            {activeFiltersCount > 0 && (
              <button 
                onClick={clearFilters}
                className="text-sm text-gold-500 hover:text-gold-600 font-medium flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Effacer tout
              </button>
            )}
          </div>

          <div className="p-6 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Format Filter */}
            <div>
              <h4 className="font-semibold text-wood-600 mb-3 flex items-center gap-2">
                <span>📐</span> Format
              </h4>
              <div className="space-y-2">
                {filters.formats.map(format => {
                  const isSelected = selectedFormats.includes(format.id);
                  const formatFr = formatTranslations[format.name] || format.name;
                  return (
                    <button
                      key={format.id}
                      onClick={() => toggleFilter(format.id, selectedFormats, setSelectedFormats)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-gold-100 border-2 border-gold-400 text-wood-600' 
                          : 'bg-cream-50 border-2 border-transparent hover:border-cream-300'
                      }`}
                    >
                      <span className="font-medium">{formatFr}</span>
                      {isSelected && <span className="text-gold-500">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grade Filter */}
            <div>
              <h4 className="font-semibold text-wood-600 mb-3 flex items-center gap-2">
                <span>⭐</span> Grade
              </h4>
              <div className="space-y-2">
                {filters.grades.map(grade => {
                  const isSelected = selectedGrades.includes(grade.id);
                  const gradeFr = gradeTranslations[grade.name] || grade.name;
                  return (
                    <button
                      key={grade.id}
                      onClick={() => toggleFilter(grade.id, selectedGrades, setSelectedGrades)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-gold-100 border-2 border-gold-400 text-wood-600' 
                          : 'bg-cream-50 border-2 border-transparent hover:border-cream-300'
                      }`}
                    >
                      <div>
                        <span className="font-medium">{gradeFr}</span>
                        <span className="text-xs text-gray-500 ml-2">({grade.code})</span>
                      </div>
                      {isSelected && <span className="text-gold-500">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colour Filter */}
            <div>
              <h4 className="font-semibold text-wood-600 mb-3 flex items-center gap-2">
                <span>🎨</span> Couleur
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {filters.colours.map(colour => {
                  const isSelected = selectedColours.includes(colour.id);
                  const colourFr = colourTranslations[colour.name] || colour.name;
                  return (
                    <button
                      key={colour.id}
                      onClick={() => toggleFilter(colour.id, selectedColours, setSelectedColours)}
                      className={`text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
                        isSelected 
                          ? 'bg-gold-100 border-2 border-gold-400' 
                          : 'bg-cream-50 border-2 border-transparent hover:border-cream-300'
                      }`}
                    >
                      <div 
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                        style={{ backgroundColor: colour.hex_color || '#d4bfa3' }}
                      />
                      <span className="text-sm font-medium truncate">{colourFr}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Finish Filter */}
            <div>
              <h4 className="font-semibold text-wood-600 mb-3 flex items-center gap-2">
                <span>✨</span> Finition
              </h4>
              <div className="space-y-2">
                {filters.finishes.map(finish => {
                  const isSelected = selectedFinishes.includes(finish.id);
                  return (
                    <button
                      key={finish.id}
                      onClick={() => toggleFilter(finish.id, selectedFinishes, setSelectedFinishes)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-gold-100 border-2 border-gold-400 text-wood-600' 
                          : 'bg-cream-50 border-2 border-transparent hover:border-cream-300'
                      }`}
                    >
                      <span className="font-medium">{finish.name}</span>
                      {isSelected && <span className="text-gold-500">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Products Grid */}
      <div className="flex-grow">
        {/* Toolbar */}
        <div className="hidden lg:flex justify-between items-center mb-6 bg-white rounded-xl p-4 border border-cream-200">
          <p className="text-gray-600">
            <span className="font-bold text-wood-600 text-xl">{filteredProducts.length}</span> 
            <span className="ml-1">produit{filteredProducts.length > 1 ? 's' : ''}</span>
          </p>
          
          <div className="flex items-center gap-4">
            {/* View toggle */}
            <div className="flex bg-cream-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <svg className="w-5 h-5 text-wood-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <svg className="w-5 h-5 text-wood-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Sort */}
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-cream-50 border border-cream-200 rounded-lg px-4 py-2 font-medium text-wood-600 focus:border-gold-400 outline-none"
            >
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="name">Nom</option>
            </select>
          </div>
        </div>

        {/* Active Filters Pills */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedFormats.map(id => {
              const format = filters.formats.find(f => f.id === id);
              if (!format) return null;
              const formatFr = formatTranslations[format.name] || format.name;
              return (
                <button
                  key={`format-${id}`}
                  onClick={() => toggleFilter(id, selectedFormats, setSelectedFormats)}
                  className="bg-gold-100 text-gold-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-gold-200 transition-colors"
                >
                  {formatFr}
                  <span className="text-gold-600">×</span>
                </button>
              );
            })}
            {selectedGrades.map(id => {
              const grade = filters.grades.find(g => g.id === id);
              if (!grade) return null;
              const gradeFr = gradeTranslations[grade.name] || grade.name;
              return (
                <button
                  key={`grade-${id}`}
                  onClick={() => toggleFilter(id, selectedGrades, setSelectedGrades)}
                  className="bg-gold-100 text-gold-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-gold-200 transition-colors"
                >
                  {gradeFr}
                  <span className="text-gold-600">×</span>
                </button>
              );
            })}
            {selectedColours.map(id => {
              const colour = filters.colours.find(c => c.id === id);
              if (!colour) return null;
              const colourFr = colourTranslations[colour.name] || colour.name;
              return (
                <button
                  key={`colour-${id}`}
                  onClick={() => toggleFilter(id, selectedColours, setSelectedColours)}
                  className="bg-gold-100 text-gold-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-gold-200 transition-colors"
                >
                  <span 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colour.hex_color || '#d4bfa3' }}
                  />
                  {colourFr}
                  <span className="text-gold-600">×</span>
                </button>
              );
            })}
            {selectedFinishes.map(id => {
              const finish = filters.finishes.find(f => f.id === id);
              if (!finish) return null;
              return (
                <button
                  key={`finish-${id}`}
                  onClick={() => toggleFilter(id, selectedFinishes, setSelectedFinishes)}
                  className="bg-gold-100 text-gold-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-gold-200 transition-colors"
                >
                  {finish.name}
                  <span className="text-gold-600">×</span>
                </button>
              );
            })}
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-cream-200">
            <span className="text-7xl mb-6 block">🔍</span>
            <h3 className="text-2xl font-serif font-bold text-wood-600 mb-3">Aucun produit trouvé</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Essayez de modifier ou supprimer certains filtres pour voir plus de résultats.
            </p>
            <button onClick={clearFilters} className="btn-primary">
              Effacer les filtres
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const dimensions = `${product.format?.thickness_mm}x${product.format?.width_mm}x${product.format?.length_mm}`;
              const slug = generateSlug(
                product.format?.name || '',
                product.grade?.name || '',
                product.colour?.name || '',
                dimensions
              );
              const gradeFr = gradeTranslations[product.grade?.name || ''] || product.grade?.name;
              const colourFr = colourTranslations[product.colour?.name || ''] || product.colour?.name;
              const formatFr = formatTranslations[product.format?.name || ''] || product.format?.name;
              
              return (
                <Link 
                  key={product.id} 
                  href={`/catalogue/${slug}`}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-cream-200 hover:border-gold-400"
                >
                  {/* Image */}
                  <div 
                    className="h-56 relative overflow-hidden"
                    style={{ 
                      backgroundColor: product.colour?.hex_color || '#d4bfa3',
                    }}
                  >
                    {/* Wood grain pattern */}
                    <div 
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `
                          linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.1) 100%),
                          repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.03) 2px, rgba(0,0,0,.03) 4px)
                        `,
                      }}
                    />
                    
                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl opacity-20 group-hover:scale-110 group-hover:opacity-30 transition-all duration-300">🪵</span>
                    </div>
                    
                    {/* Grade badge */}
                    <div className="absolute top-4 right-4 bg-gold-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                      {gradeFr}
                    </div>

                    {/* Format badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-wood-600 text-xs font-medium px-3 py-1.5 rounded-full">
                      {formatFr}
                    </div>

                    {/* Quick view on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-white text-wood-600 font-semibold px-6 py-3 rounded-lg shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Voir le produit →
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-serif font-bold text-wood-600 mb-1 group-hover:text-gold-500 transition-colors">
                      {gradeFr} {colourFr}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      {product.finish?.name} • {product.format?.thickness_mm}×{product.format?.width_mm}×{product.format?.length_mm}mm
                    </p>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-2xl font-bold text-gold-500">
                          {formatPrice(product.prix_vente_ttc)}
                        </span>
                        <span className="text-gray-500 text-sm">/m²</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-green-600 text-sm">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        En stock
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredProducts.map((product) => {
              const dimensions = `${product.format?.thickness_mm}x${product.format?.width_mm}x${product.format?.length_mm}`;
              const slug = generateSlug(
                product.format?.name || '',
                product.grade?.name || '',
                product.colour?.name || '',
                dimensions
              );
              const gradeFr = gradeTranslations[product.grade?.name || ''] || product.grade?.name;
              const colourFr = colourTranslations[product.colour?.name || ''] || product.colour?.name;
              const formatFr = formatTranslations[product.format?.name || ''] || product.format?.name;
              
              return (
                <Link 
                  key={product.id} 
                  href={`/catalogue/${slug}`}
                  className="group flex bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-cream-200 hover:border-gold-400"
                >
                  {/* Image */}
                  <div 
                    className="w-40 h-32 flex-shrink-0 relative"
                    style={{ backgroundColor: product.colour?.hex_color || '#d4bfa3' }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl opacity-20">🪵</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-gold-100 text-gold-700 text-xs font-semibold px-2 py-0.5 rounded">
                          {gradeFr}
                        </span>
                        <span className="bg-cream-100 text-wood-600 text-xs font-medium px-2 py-0.5 rounded">
                          {formatFr}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-wood-600 group-hover:text-gold-500 transition-colors">
                        {gradeFr} {colourFr}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {product.finish?.name} • {dimensions.replace(/x/g, '×')}mm
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gold-500">
                        {formatPrice(product.prix_vente_ttc)}
                      </div>
                      <span className="text-gray-500 text-sm">/m² TTC</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
