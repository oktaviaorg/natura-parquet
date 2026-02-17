'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useCart } from '@/contexts/CartContext';

export default function CartDrawer() {
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const { 
    state, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    getSubtotalTTC, 
    getTotalM2,
    getItemCount 
  } = useCart();
  
  const labels = {
    cart: {
      fr: 'Votre panier',
      de: 'Ihr Warenkorb',
      en: 'Your cart',
    },
    empty: {
      fr: 'Votre panier est vide',
      de: 'Ihr Warenkorb ist leer',
      en: 'Your cart is empty',
    },
    continueShopping: {
      fr: 'Continuer les achats',
      de: 'Weiter einkaufen',
      en: 'Continue shopping',
    },
    checkout: {
      fr: 'Passer commande',
      de: 'Zur Kasse',
      en: 'Checkout',
    },
    viewCart: {
      fr: 'Voir le panier',
      de: 'Warenkorb ansehen',
      en: 'View cart',
    },
    subtotal: {
      fr: 'Sous-total TTC',
      de: 'Zwischensumme inkl. MwSt.',
      en: 'Subtotal incl. VAT',
    },
    totalSurface: {
      fr: 'Surface totale',
      de: 'Gesamtfläche',
      en: 'Total surface',
    },
    remove: {
      fr: 'Supprimer',
      de: 'Entfernen',
      en: 'Remove',
    },
    shipping: {
      fr: 'Livraison gratuite en France',
      de: 'Kostenloser Versand nach Frankreich',
      en: 'Free shipping to France',
    },
  };

  if (!state.isOpen) return null;

  return (
    <Fragment>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transform transition-transform">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-natura-200">
          <h2 className="font-display text-xl text-natura-900">
            {labels.cart[locale]} ({getItemCount()})
          </h2>
          <button 
            onClick={closeCart}
            className="p-2 hover:bg-natura-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-natura-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-natura-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-natura-500">{labels.empty[locale]}</p>
              <button 
                onClick={closeCart}
                className="mt-4 text-natura-700 hover:text-natura-900 underline"
              >
                {labels.continueShopping[locale]}
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {state.items.map((item) => (
                <li key={item.id} className="flex gap-4 pb-4 border-b border-natura-100">
                  {/* Image */}
                  <div className="w-20 h-20 bg-natura-100 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-natura-900 truncate">
                      {item.name}
                    </h3>
                    {item.dimensions && (
                      <p className="text-xs text-natura-500 mt-0.5">{item.dimensions}</p>
                    )}
                    <p className="text-sm text-natura-600 mt-1">
                      {item.price_ttc.toFixed(2)} € / m²
                    </p>
                    
                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity_m2 - 1)}
                        className="w-7 h-7 flex items-center justify-center border border-natura-300 rounded hover:bg-natura-100"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-16 text-center text-sm font-medium">
                        {item.quantity_m2.toFixed(1)} m²
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity_m2 + 1)}
                        className="w-7 h-7 flex items-center justify-center border border-natura-300 rounded hover:bg-natura-100"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Price & Remove */}
                  <div className="text-right">
                    <p className="font-semibold text-natura-900">
                      {(item.price_ttc * item.quantity_m2).toFixed(2)} €
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-600 hover:text-red-800 mt-2"
                    >
                      {labels.remove[locale]}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-natura-200 px-6 py-4 bg-natura-50">
            {/* Summary */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-natura-600">{labels.totalSurface[locale]}</span>
                <span className="font-medium">{getTotalM2().toFixed(1)} m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-natura-900 font-medium">{labels.subtotal[locale]}</span>
                <span className="font-display text-xl text-natura-900">
                  {getSubtotalTTC().toFixed(2)} €
                </span>
              </div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {labels.shipping[locale]}
              </p>
            </div>
            
            {/* Buttons */}
            <div className="space-y-2">
              <Link
                href={`/${locale}/panier`}
                onClick={closeCart}
                className="block w-full py-3 bg-natura-900 text-white text-center font-medium hover:bg-natura-800 transition-colors"
              >
                {labels.viewCart[locale]}
              </Link>
              <Link
                href={`/${locale}/checkout`}
                onClick={closeCart}
                className="block w-full py-3 bg-green-600 text-white text-center font-medium hover:bg-green-700 transition-colors"
              >
                {labels.checkout[locale]}
              </Link>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
