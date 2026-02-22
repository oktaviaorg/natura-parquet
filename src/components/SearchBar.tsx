'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import type { Product } from '@/data/products';

interface SearchBarProps {
  products: Product[];
  className?: string;
}

export default function SearchBar({ products, className = '' }: SearchBarProps) {
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const labels = {
    placeholder: { fr: 'Rechercher un parquet...', de: 'Parkett suchen...', en: 'Search flooring...' },
    suggestions: { fr: 'suggestion', de: 'Vorschlag', en: 'suggestion' },
    noResults: { fr: 'Aucun résultat', de: 'Keine Ergebnisse', en: 'No results' },
    viewAll: { fr: 'Voir tous les produits', de: 'Alle Produkte anzeigen', en: 'View all products' },
  };

  // Normaliser le texte pour la recherche
  const normalize = (str: string) => {
    return str.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, ' ')
      .trim();
  };

  // Suggestions filtrées (max 8)
  const suggestions = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];
    
    const searchNormalized = normalize(searchTerm);
    const terms = searchNormalized.split(' ').filter(t => t.length > 0);
    
    return products
      .filter(product => {
        const nameNormalized = normalize(product.name[locale]);
        const descNormalized = normalize(product.description[locale]);
        const dims = product.dimensions.toLowerCase();
        const finition = product.finition.toLowerCase();
        const gamme = product.gamme.toLowerCase();
        
        // Tous les termes doivent matcher quelque part
        return terms.every(term => 
          nameNormalized.includes(term) || 
          descNormalized.includes(term) ||
          dims.includes(term) ||
          finition.includes(term) ||
          gamme.includes(term)
        );
      })
      .slice(0, 8);
  }, [products, searchTerm, locale]);

  // Fermer quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Ouvrir quand il y a des suggestions
  useEffect(() => {
    if (suggestions.length > 0 && searchTerm.length >= 2) {
      setIsOpen(true);
      setHighlightedIndex(-1);
    } else if (searchTerm.length >= 2) {
      setIsOpen(true); // Montrer "aucun résultat"
    } else {
      setIsOpen(false);
    }
  }, [suggestions, searchTerm]);

  // Navigation clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          window.location.href = `/${locale}/produits/${suggestions[highlightedIndex].slug}`;
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  // Highlight les termes de recherche
  const highlightMatch = (text: string) => {
    if (!searchTerm) return text;
    
    const terms = searchTerm.toLowerCase().split(' ').filter(t => t.length > 0);
    let result = text;
    
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      result = result.replace(regex, '<mark class="bg-forest-200 text-forest-900 rounded px-0.5">$1</mark>');
    });
    
    return result;
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* Input */}
      <div className="relative">
        <svg 
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
            searchTerm ? 'text-forest-500' : 'text-natura-400'
          }`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchTerm.length >= 2 && setIsOpen(true)}
          placeholder={labels.placeholder[locale]}
          className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl text-base transition-all ${
            searchTerm 
              ? 'border-forest-500 bg-forest-50/50 focus:ring-2 focus:ring-forest-500/30' 
              : 'border-natura-200 bg-white focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20'
          }`}
          autoComplete="off"
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-natura-400 hover:text-natura-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown suggestions */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-natura-200 overflow-hidden">
          {suggestions.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-natura-500 uppercase tracking-wide border-b border-natura-100">
                {suggestions.length} {labels.suggestions[locale]}{suggestions.length > 1 ? 's' : ''}
              </div>
              {suggestions.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/${locale}/produits/${product.slug}`}
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                    index === highlightedIndex 
                      ? 'bg-forest-50' 
                      : 'hover:bg-natura-50'
                  }`}
                >
                  {/* Badge gamme */}
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full flex-shrink-0 ${
                    product.gamme === 'Exclusive' ? 'bg-natura-800 text-white' :
                    product.gamme === 'Rustic' ? 'bg-amber-100 text-amber-800' :
                    product.gamme === 'Country' ? 'bg-orange-100 text-orange-800' :
                    'bg-natura-200 text-natura-700'
                  }`}>
                    {product.gamme}
                  </span>
                  
                  {/* Infos produit */}
                  <div className="flex-1 min-w-0">
                    <div 
                      className="font-medium text-natura-900 truncate"
                      dangerouslySetInnerHTML={{ __html: highlightMatch(product.name[locale]) }}
                    />
                    <div className="flex items-center gap-2 text-sm text-natura-500">
                      <span>{product.dimensions}</span>
                      <span>•</span>
                      <span>{product.finition}</span>
                    </div>
                  </div>
                  
                  {/* Prix */}
                  <span className="font-semibold text-forest-600 flex-shrink-0">
                    {product.price.ttc.toFixed(0)} €/m²
                  </span>
                  
                  {/* Flèche */}
                  <svg className={`w-4 h-4 transition-transform flex-shrink-0 ${
                    index === highlightedIndex ? 'text-forest-500 translate-x-1' : 'text-natura-300'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-natura-500 mb-3">{labels.noResults[locale]}</p>
              <Link 
                href={`/${locale}/produits`}
                className="text-forest-600 hover:text-forest-700 font-medium text-sm"
                onClick={() => setIsOpen(false)}
              >
                {labels.viewAll[locale]} →
              </Link>
            </div>
          )}
          
          {/* Footer */}
          {suggestions.length > 0 && (
            <div className="px-4 py-2 bg-natura-50 border-t border-natura-100 text-xs text-natura-500">
              ↑↓ naviguer • Entrée sélectionner • Échap fermer
            </div>
          )}
        </div>
      )}
    </div>
  );
}
