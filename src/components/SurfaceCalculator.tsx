'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';

interface SurfaceCalculatorProps {
  priceHT: number;
  priceTTC: number;
  minM2?: number;
  onSurfaceChange: (m2: number) => void;
}

export default function SurfaceCalculator({
  priceHT,
  priceTTC,
  minM2 = 1,
  onSurfaceChange,
}: SurfaceCalculatorProps) {
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const [surface, setSurface] = useState<number>(10);
  const [marge, setMarge] = useState<number>(10); // % de marge de sécurité
  
  const surfaceAvecMarge = surface * (1 + marge / 100);
  const totalHT = priceHT * surfaceAvecMarge;
  const totalTTC = priceTTC * surfaceAvecMarge;
  
  useEffect(() => {
    onSurfaceChange(surfaceAvecMarge);
  }, [surfaceAvecMarge, onSurfaceChange]);
  
  const labels = {
    surface: {
      fr: 'Surface à couvrir',
      de: 'Zu bedeckende Fläche',
      en: 'Surface to cover',
    },
    marge: {
      fr: 'Marge de sécurité',
      de: 'Sicherheitsmarge',
      en: 'Safety margin',
    },
    totalSurface: {
      fr: 'Surface à commander',
      de: 'Zu bestellende Fläche',
      en: 'Surface to order',
    },
    totalHT: {
      fr: 'Total HT',
      de: 'Netto gesamt',
      en: 'Total excl. VAT',
    },
    totalTTC: {
      fr: 'Total TTC',
      de: 'Brutto gesamt',
      en: 'Total incl. VAT',
    },
    tip: {
      fr: 'Nous recommandons 10% de marge pour les coupes et pertes.',
      de: 'Wir empfehlen 10% Sicherheitsmarge für Schnitte und Verlust.',
      en: 'We recommend 10% margin for cuts and waste.',
    },
    pricePerM2: {
      fr: 'Prix au m²',
      de: 'Preis pro m²',
      en: 'Price per m²',
    },
  };

  return (
    <div className="bg-natura-50 border border-natura-200 rounded-lg p-6">
      <h3 className="font-display text-lg text-natura-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-natura-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        {locale === 'fr' ? 'Calculateur de surface' : locale === 'de' ? 'Flächenrechner' : 'Surface Calculator'}
      </h3>
      
      {/* Prix au m² */}
      <div className="mb-4 pb-4 border-b border-natura-200">
        <div className="flex justify-between items-center text-sm">
          <span className="text-natura-600">{labels.pricePerM2[locale]}</span>
          <span className="font-semibold text-natura-900">{priceTTC.toFixed(2)} € TTC</span>
        </div>
      </div>
      
      {/* Surface Input */}
      <div className="mb-4">
        <label className="block text-sm text-natura-600 mb-2">
          {labels.surface[locale]}
        </label>
        <div className="relative">
          <input
            type="number"
            min={minM2}
            step="0.5"
            value={surface}
            onChange={(e) => setSurface(Math.max(minM2, parseFloat(e.target.value) || 0))}
            className="w-full px-4 py-3 pr-12 border border-natura-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500 focus:border-transparent text-lg"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-natura-500 font-medium">
            m²
          </span>
        </div>
      </div>
      
      {/* Marge de sécurité */}
      <div className="mb-4">
        <label className="block text-sm text-natura-600 mb-2">
          {labels.marge[locale]}
        </label>
        <div className="flex items-center gap-2">
          {[5, 10, 15].map((pct) => (
            <button
              key={pct}
              onClick={() => setMarge(pct)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                marge === pct
                  ? 'bg-natura-900 text-white'
                  : 'bg-white border border-natura-300 text-natura-700 hover:bg-natura-100'
              }`}
            >
              +{pct}%
            </button>
          ))}
        </div>
        <p className="text-xs text-natura-500 mt-2">
          💡 {labels.tip[locale]}
        </p>
      </div>
      
      {/* Résultats */}
      <div className="mt-6 pt-4 border-t border-natura-200 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-natura-600">{labels.totalSurface[locale]}</span>
          <span className="font-semibold text-natura-900 text-lg">
            {surfaceAvecMarge.toFixed(1)} m²
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-natura-600">{labels.totalHT[locale]}</span>
          <span className="text-natura-700">
            {totalHT.toFixed(2)} €
          </span>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-natura-200">
          <span className="text-natura-900 font-medium">{labels.totalTTC[locale]}</span>
          <span className="font-display text-2xl text-natura-900">
            {totalTTC.toFixed(2)} €
          </span>
        </div>
      </div>
    </div>
  );
}
