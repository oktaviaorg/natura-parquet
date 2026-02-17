'use client';

import { useState, useEffect } from 'react';

interface Props {
  pricePerM2: number;
  packetM2: number;
}

export default function QuantitySimulator({ pricePerM2, packetM2 }: Props) {
  const [surface, setSurface] = useState<string>('25');
  const [marginPercent, setMarginPercent] = useState<number>(10);

  const surfaceNum = parseFloat(surface) || 0;
  const surfaceWithMargin = surfaceNum * (1 + marginPercent / 100);
  const packetsNeeded = Math.ceil(surfaceWithMargin / packetM2);
  const totalSurface = packetsNeeded * packetM2;
  const totalPrice = totalSurface * pricePerM2;
  const actualMargin = surfaceNum > 0 ? ((totalSurface - surfaceNum) / surfaceNum) * 100 : 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="bg-cream-50 rounded-xl p-5 border border-cream-200">
      <h3 className="font-semibold text-wood-600 mb-4 flex items-center gap-2">
        <span className="text-xl">📐</span>
        Simulateur de quantité
      </h3>
      
      <div className="space-y-4">
        {/* Surface Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Surface à couvrir (m²)
          </label>
          <div className="relative">
            <input
              type="number"
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
              min="1"
              max="1000"
              step="0.5"
              className="w-full px-4 py-3 pr-12 border border-cream-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all text-lg font-semibold"
              placeholder="25"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">m²</span>
          </div>
        </div>

        {/* Margin Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Marge de sécurité (coupe, casse)
          </label>
          <div className="flex gap-2">
            {[5, 10, 15].map((percent) => (
              <button
                key={percent}
                onClick={() => setMarginPercent(percent)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  marginPercent === percent
                    ? 'bg-gold-400 text-natura-text shadow-md'
                    : 'bg-white border border-cream-300 text-gray-600 hover:border-gold-400'
                }`}
              >
                +{percent}%
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {surfaceNum > 0 && (
          <div className="mt-6 pt-5 border-t border-cream-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Surface avec marge:</span>
              <span className="font-semibold text-gray-900">{surfaceWithMargin.toFixed(2)} m²</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Paquets nécessaires:</span>
              <span className="font-semibold text-gray-900">
                {packetsNeeded} paquet{packetsNeeded > 1 ? 's' : ''} × {packetM2} m²
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Surface totale commandée:</span>
              <span className="font-semibold text-gray-900">{totalSurface.toFixed(2)} m²</span>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Marge réelle:</span>
              <span>+{actualMargin.toFixed(1)}%</span>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-cream-200">
              <span className="text-lg font-semibold text-wood-600">Total estimé:</span>
              <span className="text-2xl font-bold text-gold-500">{formatPrice(totalPrice)}</span>
            </div>
            
            <p className="text-xs text-gray-500 mt-2">
              * Prix TTC indicatif. Devis personnalisé sur demande.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
