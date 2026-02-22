'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

interface ProductFiltersProps {
  activeFilters: {
    gamme?: 'Exclusive' | 'Elegance';
    finition?: string;
    largeur?: number;
    priceRange?: string;
    pose?: string;
    color?: string;
  };
  onFilterChange: (filterType: string, value: string | number | undefined) => void;
}

export default function ProductFilters({ activeFilters, onFilterChange }: ProductFiltersProps) {
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const [expandedSections, setExpandedSections] = useState<string[]>(['gamme', 'pose', 'finition']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const labels = {
    filters: { fr: 'Filtres', de: 'Filter', en: 'Filters' },
    hideFilters: { fr: 'Masquer les filtres', de: 'Filter ausblenden', en: 'Hide filters' },
    gamme: { fr: 'Catégorie', de: 'Kategorie', en: 'Category' },
    pose: { fr: 'Format', de: 'Format', en: 'Format' },
    finition: { fr: 'Finition', de: 'Oberfläche', en: 'Finish' },
    largeur: { fr: 'Largeur', de: 'Breite', en: 'Width' },
    color: { fr: 'Couleur', de: 'Farbe', en: 'Color' },
    price: { fr: 'Budget', de: 'Budget', en: 'Budget' },
    all: { fr: 'Tous', de: 'Alle', en: 'All' },
    reset: { fr: 'Réinitialiser', de: 'Zurücksetzen', en: 'Reset all' },
  };

  const gammes = [
    { value: 'Exclusive', label: { fr: 'Exclusive', de: 'Exclusive', en: 'Exclusive' }, count: 12 },
    { value: 'Elegance', label: { fr: 'Élégance', de: 'Eleganz', en: 'Elegance' }, count: 8 },
  ];

  const poses = [
    { value: 'lame', label: { fr: 'Lame Parquet', de: 'Diele', en: 'Plank' }, count: 15 },
    { value: 'baton-rompu', label: { fr: 'Bâton rompu', de: 'Fischgrät', en: 'Herringbone' }, count: 8 },
    { value: 'point-hongrie', label: { fr: 'Point de Hongrie', de: 'Ungarisch', en: 'Hungarian' }, count: 5 },
    { value: 'chevron', label: { fr: 'Chevron', de: 'Chevron', en: 'Chevron' }, count: 6 },
  ];

  const finitions = [
    { value: 'brut', label: { fr: 'Brut', de: 'Roh', en: 'Raw' } },
    { value: 'huile', label: { fr: 'Huilé', de: 'Geölt', en: 'Oiled' } },
    { value: 'vernis', label: { fr: 'Verni', de: 'Lackiert', en: 'Lacquered' } },
  ];

  const colors = [
    { value: 'naturel', label: { fr: 'Naturel', de: 'Natur', en: 'Natural' }, hex: '#D4B896' },
    { value: 'clair', label: { fr: 'Clair', de: 'Hell', en: 'Light' }, hex: '#E8DCC8' },
    { value: 'moyen', label: { fr: 'Moyen', de: 'Mittel', en: 'Medium' }, hex: '#B8956B' },
    { value: 'fonce', label: { fr: 'Foncé', de: 'Dunkel', en: 'Dark' }, hex: '#6B4423' },
  ];

  const largeurs = [
    { value: 70, label: '70 mm' },
    { value: 100, label: '100 mm' },
    { value: 120, label: '120 mm' },
    { value: 150, label: '150 mm' },
    { value: 190, label: '190 mm' },
  ];

  const priceRanges = [
    { value: '0-50', label: { fr: '< 50 €/m²', de: '< 50 €/m²', en: '< €50/m²' } },
    { value: '50-60', label: { fr: '50 - 60 €/m²', de: '50 - 60 €/m²', en: '€50 - €60/m²' } },
    { value: '60+', label: { fr: '> 60 €/m²', de: '> 60 €/m²', en: '> €60/m²' } },
  ];

  const hasActiveFilters = Object.values(activeFilters).some(v => v !== undefined);

  const FilterSection = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
    const isExpanded = expandedSections.includes(id);
    return (
      <div className="border-b border-natura-100 last:border-b-0">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between py-4 text-left"
        >
          <span className="text-sm font-semibold text-natura-900 uppercase tracking-wide">
            {title}
          </span>
          <svg 
            className={`w-4 h-4 text-natura-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded && <div className="pb-4">{children}</div>}
      </div>
    );
  };

  const CheckboxItem = ({ 
    checked, 
    label, 
    count,
    onChange 
  }: { 
    checked: boolean; 
    label: string; 
    count?: number;
    onChange: () => void 
  }) => (
    <label className="flex items-center gap-3 py-1.5 cursor-pointer group">
      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
        checked 
          ? 'bg-forest-500 border-forest-500' 
          : 'border-natura-300 group-hover:border-natura-400'
      }`}>
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
          </svg>
        )}
      </div>
      <span className={`text-sm flex-1 ${checked ? 'text-natura-900 font-medium' : 'text-natura-600'}`}>
        {label}
      </span>
      {count !== undefined && (
        <span className="text-xs text-natura-400">({count})</span>
      )}
    </label>
  );

  const ColorSwatch = ({ 
    hex, 
    label, 
    checked, 
    onChange 
  }: { 
    hex: string; 
    label: string; 
    checked: boolean; 
    onChange: () => void 
  }) => (
    <button
      onClick={onChange}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
        checked 
          ? 'border-forest-500 bg-forest-50' 
          : 'border-natura-200 hover:border-natura-300'
      }`}
    >
      <div 
        className="w-5 h-5 rounded-full border border-natura-200"
        style={{ backgroundColor: hex }}
      />
      <span className={`text-xs ${checked ? 'text-forest-700 font-medium' : 'text-natura-600'}`}>
        {label}
      </span>
    </button>
  );

  return (
    <div className="bg-white rounded-xl border border-natura-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-natura-100 bg-natura-50">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-natura-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="font-semibold text-natura-900">{labels.filters[locale]}</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={() => {
              onFilterChange('gamme', undefined);
              onFilterChange('pose', undefined);
              onFilterChange('finition', undefined);
              onFilterChange('largeur', undefined);
              onFilterChange('color', undefined);
              onFilterChange('priceRange', undefined);
            }}
            className="text-xs text-forest-600 hover:text-forest-700 font-medium"
          >
            {labels.reset[locale]}
          </button>
        )}
      </div>

      <div className="px-5">
        {/* Catégorie / Gamme */}
        <FilterSection id="gamme" title={labels.gamme[locale]}>
          <div className="space-y-1">
            {gammes.map((g) => (
              <CheckboxItem
                key={g.value}
                checked={activeFilters.gamme === g.value}
                label={g.label[locale]}
                count={g.count}
                onChange={() => onFilterChange('gamme', activeFilters.gamme === g.value ? undefined : g.value)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Format / Pose */}
        <FilterSection id="pose" title={labels.pose[locale]}>
          <div className="space-y-1">
            {poses.map((p) => (
              <CheckboxItem
                key={p.value}
                checked={activeFilters.pose === p.value}
                label={p.label[locale]}
                count={p.count}
                onChange={() => onFilterChange('pose', activeFilters.pose === p.value ? undefined : p.value)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Finition */}
        <FilterSection id="finition" title={labels.finition[locale]}>
          <div className="space-y-1">
            {finitions.map((f) => (
              <CheckboxItem
                key={f.value}
                checked={activeFilters.finition === f.value}
                label={f.label[locale]}
                onChange={() => onFilterChange('finition', activeFilters.finition === f.value ? undefined : f.value)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Couleur */}
        <FilterSection id="color" title={labels.color[locale]}>
          <div className="grid grid-cols-2 gap-2">
            {colors.map((c) => (
              <ColorSwatch
                key={c.value}
                hex={c.hex}
                label={c.label[locale]}
                checked={activeFilters.color === c.value}
                onChange={() => onFilterChange('color', activeFilters.color === c.value ? undefined : c.value)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Largeur */}
        <FilterSection id="largeur" title={labels.largeur[locale]}>
          <div className="flex flex-wrap gap-2">
            {largeurs.map((l) => (
              <button
                key={l.value}
                onClick={() => onFilterChange('largeur', activeFilters.largeur === l.value ? undefined : l.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                  activeFilters.largeur === l.value
                    ? 'bg-forest-500 border-forest-500 text-white'
                    : 'border-natura-200 text-natura-600 hover:border-natura-300'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Budget */}
        <FilterSection id="price" title={labels.price[locale]}>
          <div className="space-y-1">
            {priceRanges.map((p) => (
              <CheckboxItem
                key={p.value}
                checked={activeFilters.priceRange === p.value}
                label={p.label[locale]}
                onChange={() => onFilterChange('priceRange', activeFilters.priceRange === p.value ? undefined : p.value)}
              />
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Delivery info */}
      <div className="mx-5 mb-5 p-4 bg-forest-50 rounded-lg border border-forest-100">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-forest-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <div>
            <p className="text-sm font-medium text-forest-800">
              {locale === 'fr' ? 'Livraison directe Pologne' : locale === 'de' ? 'Direktlieferung aus Polen' : 'Direct delivery from Poland'}
            </p>
            <p className="text-xs text-forest-600 mt-1">
              {locale === 'fr' ? '2-4 semaines • Franco à partir de 50m²' : locale === 'de' ? '2-4 Wochen • Frei ab 50m²' : '2-4 weeks • Free shipping from 50m²'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
