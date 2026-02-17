'use client';

import { useLocale } from 'next-intl';

interface ProductFiltersProps {
  activeFilters: {
    gamme?: 'Exclusive' | 'Elegance';
    finition?: string;
    largeur?: number;
    priceRange?: string;
  };
  onFilterChange: (filterType: string, value: string | number | undefined) => void;
}

export default function ProductFilters({ activeFilters, onFilterChange }: ProductFiltersProps) {
  const locale = useLocale() as 'fr' | 'de' | 'en';

  const labels = {
    filters: { fr: 'Filtres', de: 'Filter', en: 'Filters' },
    gamme: { fr: 'Gamme', de: 'Kollektion', en: 'Range' },
    finition: { fr: 'Finition', de: 'Oberfläche', en: 'Finish' },
    largeur: { fr: 'Largeur de lame', de: 'Dielenbreite', en: 'Plank width' },
    price: { fr: 'Budget', de: 'Budget', en: 'Budget' },
    all: { fr: 'Tous', de: 'Alle', en: 'All' },
    reset: { fr: 'Réinitialiser', de: 'Zurücksetzen', en: 'Reset' },
  };

  const gammes = [
    { value: 'Exclusive', label: { fr: 'Exclusive', de: 'Exclusive', en: 'Exclusive' }, desc: { fr: 'Premium', de: 'Premium', en: 'Premium' } },
    { value: 'Elegance', label: { fr: 'Élégance', de: 'Eleganz', en: 'Elegance' }, desc: { fr: 'Rapport qualité-prix', de: 'Preis-Leistung', en: 'Value' } },
  ];

  const finitions = [
    { value: 'vernis', label: { fr: 'Vernis', de: 'Lackiert', en: 'Varnished' } },
    { value: 'huile', label: { fr: 'Huilé', de: 'Geölt', en: 'Oiled' } },
    { value: 'brut', label: { fr: 'Brut', de: 'Roh', en: 'Raw' } },
  ];

  const largeurs = [
    { value: 70, label: '70mm', desc: { fr: 'Compact', de: 'Kompakt', en: 'Compact' } },
    { value: 100, label: '100mm', desc: { fr: 'Chevron', de: 'Fischgrät', en: 'Chevron' } },
    { value: 120, label: '120mm', desc: { fr: 'Standard', de: 'Standard', en: 'Standard' } },
    { value: 150, label: '150mm', desc: { fr: 'Large', de: 'Breit', en: 'Wide' } },
  ];

  const priceRanges = [
    { value: '0-50', label: { fr: 'Moins de 50€/m²', de: 'Unter 50€/m²', en: 'Under €50/m²' } },
    { value: '50-60', label: { fr: '50-60€/m²', de: '50-60€/m²', en: '€50-60/m²' } },
    { value: '60+', label: { fr: 'Plus de 60€/m²', de: 'Über 60€/m²', en: 'Over €60/m²' } },
  ];

  const hasActiveFilters = Object.values(activeFilters).some(v => v !== undefined);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-lg text-natura-900">
          {labels.filters[locale]}
        </h2>
        {hasActiveFilters && (
          <button
            onClick={() => {
              onFilterChange('gamme', undefined);
              onFilterChange('finition', undefined);
              onFilterChange('largeur', undefined);
              onFilterChange('priceRange', undefined);
            }}
            className="text-sm text-natura-600 hover:text-natura-900 underline"
          >
            {labels.reset[locale]}
          </button>
        )}
      </div>

      {/* Gamme */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-natura-700 mb-3">
          {labels.gamme[locale]}
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => onFilterChange('gamme', undefined)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !activeFilters.gamme
                ? 'bg-natura-900 text-white'
                : 'bg-natura-50 text-natura-700 hover:bg-natura-100'
            }`}
          >
            {labels.all[locale]}
          </button>
          {gammes.map((g) => (
            <button
              key={g.value}
              onClick={() => onFilterChange('gamme', activeFilters.gamme === g.value ? undefined : g.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeFilters.gamme === g.value
                  ? 'bg-natura-900 text-white'
                  : 'bg-natura-50 text-natura-700 hover:bg-natura-100'
              }`}
            >
              <span className="font-medium">{g.label[locale]}</span>
              <span className="text-xs opacity-70 ml-2">{g.desc[locale]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Finition */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-natura-700 mb-3">
          {labels.finition[locale]}
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => onFilterChange('finition', undefined)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !activeFilters.finition
                ? 'bg-natura-900 text-white'
                : 'bg-natura-50 text-natura-700 hover:bg-natura-100'
            }`}
          >
            {labels.all[locale]}
          </button>
          {finitions.map((f) => (
            <button
              key={f.value}
              onClick={() => onFilterChange('finition', activeFilters.finition === f.value ? undefined : f.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeFilters.finition === f.value
                  ? 'bg-natura-900 text-white'
                  : 'bg-natura-50 text-natura-700 hover:bg-natura-100'
              }`}
            >
              {f.label[locale]}
            </button>
          ))}
        </div>
      </div>

      {/* Largeur */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-natura-700 mb-3">
          {labels.largeur[locale]}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onFilterChange('largeur', undefined)}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
              !activeFilters.largeur
                ? 'bg-natura-900 text-white'
                : 'bg-natura-50 text-natura-700 hover:bg-natura-100'
            }`}
          >
            {labels.all[locale]}
          </button>
          {largeurs.map((l) => (
            <button
              key={l.value}
              onClick={() => onFilterChange('largeur', activeFilters.largeur === l.value ? undefined : l.value)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                activeFilters.largeur === l.value
                  ? 'bg-natura-900 text-white'
                  : 'bg-natura-50 text-natura-700 hover:bg-natura-100'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-natura-700 mb-3">
          {labels.price[locale]}
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => onFilterChange('priceRange', undefined)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !activeFilters.priceRange
                ? 'bg-natura-900 text-white'
                : 'bg-natura-50 text-natura-700 hover:bg-natura-100'
            }`}
          >
            {labels.all[locale]}
          </button>
          {priceRanges.map((p) => (
            <button
              key={p.value}
              onClick={() => onFilterChange('priceRange', activeFilters.priceRange === p.value ? undefined : p.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeFilters.priceRange === p.value
                  ? 'bg-natura-900 text-white'
                  : 'bg-natura-50 text-natura-700 hover:bg-natura-100'
              }`}
            >
              {p.label[locale]}
            </button>
          ))}
        </div>
      </div>

      {/* Info délais */}
      <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <h4 className="font-medium text-amber-800 text-sm mb-2">
          {locale === 'fr' ? '📦 Délais de livraison' : locale === 'de' ? '📦 Lieferzeiten' : '📦 Delivery times'}
        </h4>
        <ul className="text-xs text-amber-700 space-y-1">
          <li>• {locale === 'fr' ? 'Standard : 2 semaines' : locale === 'de' ? 'Standard: 2 Wochen' : 'Standard: 2 weeks'}</li>
          <li>• {locale === 'fr' ? 'Premier choix : 3-4 semaines' : locale === 'de' ? 'Erste Wahl: 3-4 Wochen' : 'First choice: 3-4 weeks'}</li>
          <li>• {locale === 'fr' ? 'Sur-mesure : 6-8 semaines' : locale === 'de' ? 'Sonderanfertigung: 6-8 Wochen' : 'Custom: 6-8 weeks'}</li>
        </ul>
      </div>
    </div>
  );
}
