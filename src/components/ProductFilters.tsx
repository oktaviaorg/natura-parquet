'use client';

import { useLocale } from 'next-intl';

interface FilterOption {
  value: string;
  label: { fr: string; de: string; en: string };
}

interface ProductFiltersProps {
  activeFilters: {
    category?: string;
    color?: string;
    woodType?: string;
    grade?: string;
  };
  onFilterChange: (filterType: string, value: string | undefined) => void;
}

const categoryOptions: FilterOption[] = [
  { value: 'engineered', label: { fr: 'Contrecollé', de: 'Mehrschicht', en: 'Engineered' } },
  { value: 'solid', label: { fr: 'Massif', de: 'Massiv', en: 'Solid' } },
  { value: 'industrial', label: { fr: 'Industriel', de: 'Industrie', en: 'Industrial' } },
];

const colorOptions: FilterOption[] = [
  { value: 'light', label: { fr: 'Clair', de: 'Hell', en: 'Light' } },
  { value: 'natural', label: { fr: 'Naturel', de: 'Natürlich', en: 'Natural' } },
  { value: 'medium', label: { fr: 'Moyen', de: 'Mittel', en: 'Medium' } },
  { value: 'dark', label: { fr: 'Foncé', de: 'Dunkel', en: 'Dark' } },
];

const woodTypeOptions: FilterOption[] = [
  { value: 'oak', label: { fr: 'Chêne', de: 'Eiche', en: 'Oak' } },
  { value: 'ash', label: { fr: 'Frêne', de: 'Esche', en: 'Ash' } },
];

const gradeOptions: FilterOption[] = [
  { value: 'select', label: { fr: 'Select', de: 'Select', en: 'Select' } },
  { value: 'natur', label: { fr: 'Natur', de: 'Natur', en: 'Natur' } },
  { value: 'rustic', label: { fr: 'Rustique', de: 'Rustikal', en: 'Rustic' } },
];

export default function ProductFilters({ activeFilters, onFilterChange }: ProductFiltersProps) {
  const locale = useLocale() as 'fr' | 'de' | 'en';

  const filterLabels = {
    category: { fr: 'Type', de: 'Typ', en: 'Type' },
    color: { fr: 'Couleur', de: 'Farbe', en: 'Color' },
    woodType: { fr: 'Essence', de: 'Holzart', en: 'Wood' },
    grade: { fr: 'Sélection', de: 'Auswahl', en: 'Grade' },
    all: { fr: 'Tous', de: 'Alle', en: 'All' },
    reset: { fr: 'Réinitialiser', de: 'Zurücksetzen', en: 'Reset' },
  };

  const colorSwatches: Record<string, string> = {
    light: '#f5efe6',
    natural: '#d4c4a8',
    medium: '#b8a07a',
    dark: '#6b5344',
  };

  const renderFilterGroup = (
    filterType: string,
    options: FilterOption[],
    isColorFilter = false
  ) => {
    const activeValue = activeFilters[filterType as keyof typeof activeFilters];

    return (
      <div className="space-y-3">
        <h4 className="text-xs font-medium uppercase tracking-wider text-natura-500">
          {filterLabels[filterType as keyof typeof filterLabels][locale]}
        </h4>
        <div className={`flex flex-wrap gap-2 ${isColorFilter ? 'gap-3' : ''}`}>
          {/* All option */}
          <button
            onClick={() => onFilterChange(filterType, undefined)}
            className={`transition-all ${
              isColorFilter
                ? `w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    !activeValue ? 'border-natura-900' : 'border-natura-200'
                  }`
                : `px-3 py-1.5 text-sm border transition-colors ${
                    !activeValue
                      ? 'border-natura-900 bg-natura-900 text-white'
                      : 'border-natura-200 hover:border-natura-400'
                  }`
            }`}
          >
            {isColorFilter ? (
              <span className="text-xs">∞</span>
            ) : (
              filterLabels.all[locale]
            )}
          </button>

          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onFilterChange(filterType, option.value)}
              className={`transition-all ${
                isColorFilter
                  ? `w-8 h-8 rounded-full border-2 transition-all ${
                      activeValue === option.value
                        ? 'border-natura-900 scale-110'
                        : 'border-transparent hover:scale-105'
                    }`
                  : `px-3 py-1.5 text-sm border transition-colors ${
                      activeValue === option.value
                        ? 'border-natura-900 bg-natura-900 text-white'
                        : 'border-natura-200 hover:border-natura-400'
                    }`
              }`}
              style={
                isColorFilter
                  ? { backgroundColor: colorSwatches[option.value] }
                  : undefined
              }
              title={option.label[locale]}
            >
              {!isColorFilter && option.label[locale]}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const hasActiveFilters = Object.values(activeFilters).some(v => v !== undefined);

  return (
    <div className="bg-white border border-natura-100 p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg text-natura-900">
          {locale === 'fr' ? 'Filtres' : locale === 'de' ? 'Filter' : 'Filters'}
        </h3>
        {hasActiveFilters && (
          <button
            onClick={() => {
              onFilterChange('category', undefined);
              onFilterChange('color', undefined);
              onFilterChange('woodType', undefined);
              onFilterChange('grade', undefined);
            }}
            className="text-xs text-natura-500 hover:text-natura-900 transition-colors"
          >
            {filterLabels.reset[locale]}
          </button>
        )}
      </div>

      <div className="space-y-6">
        {renderFilterGroup('category', categoryOptions)}
        {renderFilterGroup('color', colorOptions, true)}
        {renderFilterGroup('woodType', woodTypeOptions)}
        {renderFilterGroup('grade', gradeOptions)}
      </div>
    </div>
  );
}
