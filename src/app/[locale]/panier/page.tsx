'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const { 
    state, 
    removeItem, 
    updateQuantity, 
    clearCart,
    getSubtotalHT, 
    getSubtotalTTC,
    getTVA,
    getTotalM2,
  } = useCart();

  const labels = {
    title: { fr: 'Votre panier', de: 'Ihr Warenkorb', en: 'Your cart' },
    empty: { fr: 'Votre panier est vide', de: 'Ihr Warenkorb ist leer', en: 'Your cart is empty' },
    continueShopping: { fr: 'Continuer les achats', de: 'Weiter einkaufen', en: 'Continue shopping' },
    product: { fr: 'Produit', de: 'Produkt', en: 'Product' },
    price: { fr: 'Prix / m²', de: 'Preis / m²', en: 'Price / m²' },
    quantity: { fr: 'Surface', de: 'Fläche', en: 'Surface' },
    total: { fr: 'Total', de: 'Gesamt', en: 'Total' },
    remove: { fr: 'Supprimer', de: 'Entfernen', en: 'Remove' },
    clearCart: { fr: 'Vider le panier', de: 'Warenkorb leeren', en: 'Clear cart' },
    subtotalHT: { fr: 'Sous-total HT', de: 'Zwischensumme netto', en: 'Subtotal excl. VAT' },
    tva: { fr: 'TVA (20%)', de: 'MwSt. (20%)', en: 'VAT (20%)' },
    subtotalTTC: { fr: 'Sous-total TTC', de: 'Zwischensumme brutto', en: 'Subtotal incl. VAT' },
    shipping: { fr: 'Livraison', de: 'Versand', en: 'Shipping' },
    freeShipping: { fr: 'Gratuite (France)', de: 'Kostenlos (Frankreich)', en: 'Free (France)' },
    totalTTC: { fr: 'Total TTC', de: 'Gesamtbetrag', en: 'Total' },
    checkout: { fr: 'Passer commande', de: 'Zur Kasse', en: 'Proceed to checkout' },
    totalSurface: { fr: 'Surface totale', de: 'Gesamtfläche', en: 'Total surface' },
    deliveryInfo: { 
      fr: 'Délai de livraison : 2-4 semaines selon disponibilité', 
      de: 'Lieferzeit: 2-4 Wochen je nach Verfügbarkeit',
      en: 'Delivery: 2-4 weeks depending on availability'
    },
    paymentInfo: {
      fr: 'Paiement par virement bancaire',
      de: 'Zahlung per Banküberweisung',
      en: 'Payment by bank transfer'
    },
    summary: { fr: 'Récapitulatif', de: 'Zusammenfassung', en: 'Summary' },
  };

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-4xl text-natura-900 mb-8">
            {labels.title[locale]}
          </h1>

          {state.items.length === 0 ? (
            <div className="text-center py-16 bg-natura-50 rounded-xl">
              <svg className="w-20 h-20 mx-auto text-natura-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-xl text-natura-600 mb-6">{labels.empty[locale]}</p>
              <Link
                href={`/${locale}/produits`}
                className="inline-flex items-center gap-2 px-8 py-3 bg-natura-900 text-white font-medium hover:bg-natura-800 transition-colors rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {labels.continueShopping[locale]}
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                {/* Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-natura-200 text-sm text-natura-600 font-medium">
                  <div className="col-span-6">{labels.product[locale]}</div>
                  <div className="col-span-2 text-center">{labels.price[locale]}</div>
                  <div className="col-span-2 text-center">{labels.quantity[locale]}</div>
                  <div className="col-span-2 text-right">{labels.total[locale]}</div>
                </div>

                {/* Items */}
                <ul className="divide-y divide-natura-100">
                  {state.items.map((item) => (
                    <li key={item.id} className="py-6">
                      <div className="grid md:grid-cols-12 gap-4 items-start">
                        {/* Product */}
                        <div className="md:col-span-6 flex gap-4">
                          <Link 
                            href={`/${locale}/produits/${item.slug}`}
                            className="w-24 h-24 bg-natura-100 flex-shrink-0 rounded-lg overflow-hidden"
                          >
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </Link>
                          <div>
                            <Link 
                              href={`/${locale}/produits/${item.slug}`}
                              className="font-display text-lg text-natura-900 hover:text-natura-700"
                            >
                              {item.name}
                            </Link>
                            {item.dimensions && (
                              <p className="text-sm text-natura-500 mt-1">{item.dimensions}</p>
                            )}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-sm text-red-600 hover:text-red-800 mt-2 flex items-center gap-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              {labels.remove[locale]}
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="md:col-span-2 text-center">
                          <span className="md:hidden text-sm text-natura-500">{labels.price[locale]}: </span>
                          <span className="font-medium">{item.price_ttc.toFixed(2)} €</span>
                        </div>

                        {/* Quantity */}
                        <div className="md:col-span-2 flex items-center justify-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity_m2 - 1))}
                            className="w-8 h-8 flex items-center justify-center border border-natura-300 rounded-lg hover:bg-natura-100"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="1"
                            step="0.5"
                            value={item.quantity_m2}
                            onChange={(e) => updateQuantity(item.id, Math.max(1, parseFloat(e.target.value) || 1))}
                            className="w-16 text-center py-1 border border-natura-300 rounded-lg"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity_m2 + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-natura-300 rounded-lg hover:bg-natura-100"
                          >
                            +
                          </button>
                          <span className="text-sm text-natura-600">m²</span>
                        </div>

                        {/* Total */}
                        <div className="md:col-span-2 text-right">
                          <span className="md:hidden text-sm text-natura-500">{labels.total[locale]}: </span>
                          <span className="font-semibold text-natura-900">
                            {(item.price_ttc * item.quantity_m2).toFixed(2)} €
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Actions */}
                <div className="flex justify-between items-center pt-6 border-t border-natura-200">
                  <button
                    onClick={clearCart}
                    className="text-sm text-natura-600 hover:text-red-600 transition-colors"
                  >
                    {labels.clearCart[locale]}
                  </button>
                  <Link
                    href={`/${locale}/produits`}
                    className="text-sm text-natura-700 hover:text-natura-900 flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {labels.continueShopping[locale]}
                  </Link>
                </div>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="bg-natura-50 rounded-xl p-6 sticky top-24">
                  <h2 className="font-display text-xl text-natura-900 mb-6">
                    {labels.summary[locale]}
                  </h2>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-natura-600">{labels.totalSurface[locale]}</span>
                      <span className="font-medium">{getTotalM2().toFixed(1)} m²</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-natura-600">{labels.subtotalHT[locale]}</span>
                      <span>{getSubtotalHT().toFixed(2)} €</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-natura-600">{labels.tva[locale]}</span>
                      <span>{getTVA().toFixed(2)} €</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-natura-600">{labels.shipping[locale]}</span>
                      <span className="text-green-600 font-medium">{labels.freeShipping[locale]}</span>
                    </div>

                    <div className="pt-4 border-t border-natura-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-natura-900">{labels.totalTTC[locale]}</span>
                        <span className="font-display text-2xl text-natura-900">
                          {getSubtotalTTC().toFixed(2)} €
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/${locale}/checkout`}
                    className="block w-full mt-6 py-4 bg-natura-900 text-white text-center font-medium hover:bg-natura-800 transition-colors rounded-lg"
                  >
                    {labels.checkout[locale]}
                  </Link>

                  {/* Payment info */}
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-2 text-xs text-amber-800">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span>{labels.paymentInfo[locale]}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-natura-500 text-center">
                    {labels.deliveryInfo[locale]}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
