'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { bankDetails } from '@/data/products';

export default function CheckoutPage() {
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const router = useRouter();
  const { state, getSubtotalHT, getSubtotalTTC, getTVA, getTotalM2, clearCart } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    notes: '',
    acceptConditions: false,
  });

  const labels = {
    title: { fr: 'Finaliser votre commande', de: 'Bestellung abschließen', en: 'Complete your order' },
    contact: { fr: 'Vos coordonnées', de: 'Ihre Kontaktdaten', en: 'Your contact details' },
    email: { fr: 'Email', de: 'E-Mail', en: 'Email' },
    phone: { fr: 'Téléphone', de: 'Telefon', en: 'Phone' },
    company: { fr: 'Société (optionnel)', de: 'Firma (optional)', en: 'Company (optional)' },
    shipping: { fr: 'Adresse de livraison', de: 'Lieferadresse', en: 'Shipping address' },
    firstName: { fr: 'Prénom', de: 'Vorname', en: 'First name' },
    lastName: { fr: 'Nom', de: 'Nachname', en: 'Last name' },
    address: { fr: 'Adresse', de: 'Adresse', en: 'Address' },
    city: { fr: 'Ville', de: 'Stadt', en: 'City' },
    postalCode: { fr: 'Code postal', de: 'Postleitzahl', en: 'Postal code' },
    country: { fr: 'Pays', de: 'Land', en: 'Country' },
    notes: { fr: 'Instructions de livraison (optionnel)', de: 'Lieferhinweise (optional)', en: 'Delivery notes (optional)' },
    summary: { fr: 'Votre commande', de: 'Ihre Bestellung', en: 'Your order' },
    subtotalHT: { fr: 'Sous-total HT', de: 'Zwischensumme netto', en: 'Subtotal excl. VAT' },
    tva: { fr: 'TVA (20%)', de: 'MwSt. (20%)', en: 'VAT (20%)' },
    shippingCost: { fr: 'Livraison', de: 'Versand', en: 'Shipping' },
    free: { fr: 'Gratuite (France)', de: 'Kostenlos (Frankreich)', en: 'Free (France)' },
    total: { fr: 'Total TTC', de: 'Gesamtbetrag', en: 'Total' },
    placeOrder: { fr: 'Confirmer la commande', de: 'Bestellung bestätigen', en: 'Confirm order' },
    processing: { fr: 'Envoi en cours...', de: 'Wird gesendet...', en: 'Sending...' },
    emptyCart: { fr: 'Votre panier est vide', de: 'Ihr Warenkorb ist leer', en: 'Your cart is empty' },
    backToCart: { fr: 'Retour au panier', de: 'Zurück zum Warenkorb', en: 'Back to cart' },
    totalSurface: { fr: 'Surface totale', de: 'Gesamtfläche', en: 'Total surface' },
    paymentMethod: { fr: 'Paiement par virement bancaire', de: 'Zahlung per Banküberweisung', en: 'Payment by bank transfer' },
    paymentInfo: { 
      fr: 'Après validation, vous recevrez un email avec les coordonnées bancaires et le récapitulatif de votre commande.',
      de: 'Nach Bestätigung erhalten Sie eine E-Mail mit Bankdaten und Bestellübersicht.',
      en: 'After confirmation, you will receive an email with bank details and order summary.'
    },
    acceptConditions: {
      fr: "J'accepte les conditions générales de vente",
      de: 'Ich akzeptiere die Allgemeinen Geschäftsbedingungen',
      en: 'I accept the terms and conditions'
    },
    deliveryInfo: {
      fr: 'Délai de livraison : 2-4 semaines selon disponibilité',
      de: 'Lieferzeit: 2-4 Wochen je nach Verfügbarkeit',
      en: 'Delivery: 2-4 weeks depending on availability'
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptConditions) {
      setError(locale === 'fr' ? 'Veuillez accepter les conditions générales de vente' : 'Please accept the terms and conditions');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: state.items,
          customer: formData,
          totals: {
            surface: getTotalM2(),
            subtotalHT: getSubtotalHT(),
            tva: getTVA(),
            totalTTC: getSubtotalTTC(),
          },
          locale,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création de la commande');
      }

      // Redirect to confirmation page
      clearCart();
      router.push(`/${locale}/commande/confirmation?ref=${data.orderRef}`);
      
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (state.items.length === 0 && !success) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-2xl mx-auto text-center py-16">
            <h1 className="font-display text-3xl text-natura-900 mb-4">
              {labels.emptyCart[locale]}
            </h1>
            <Link
              href={`/${locale}/produits`}
              className="text-natura-700 hover:text-natura-900 underline"
            >
              {locale === 'fr' ? 'Voir nos produits' : 'View our products'}
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-natura-50">
      <Navigation />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-4xl text-natura-900 mb-8">
            {labels.title[locale]}
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="font-display text-xl text-natura-900 mb-6">
                    {labels.contact[locale]}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-natura-700 mb-1">
                        {labels.email[locale]} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-natura-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-natura-700 mb-1">
                        {labels.phone[locale]} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-natura-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-natura-700 mb-1">
                        {labels.company[locale]}
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-natura-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="font-display text-xl text-natura-900 mb-6">
                    {labels.shipping[locale]}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-natura-700 mb-1">
                        {labels.firstName[locale]} *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-natura-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-natura-700 mb-1">
                        {labels.lastName[locale]} *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-natura-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-natura-700 mb-1">
                        {labels.address[locale]} *
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-natura-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-natura-700 mb-1">
                        {labels.postalCode[locale]} *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-natura-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-natura-700 mb-1">
                        {labels.city[locale]} *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-natura-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-natura-700 mb-1">
                        {labels.country[locale]}
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-natura-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500"
                      >
                        <option value="France">France</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Suisse">Suisse</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Allemagne">Deutschland</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-natura-700 mb-1">
                        {labels.notes[locale]}
                      </label>
                      <textarea
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder={locale === 'fr' ? 'Instructions spéciales, contraintes d\'accès...' : 'Special instructions, access constraints...'}
                        className="w-full px-4 py-3 border border-natura-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="font-display text-xl text-natura-900 mb-4">
                    {labels.paymentMethod[locale]}
                  </h2>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <div>
                        <p className="text-natura-800 font-medium mb-1">
                          {locale === 'fr' ? 'Virement bancaire uniquement' : 'Bank transfer only'}
                        </p>
                        <p className="text-sm text-natura-600">
                          {labels.paymentInfo[locale]}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="acceptConditions"
                        checked={formData.acceptConditions}
                        onChange={handleInputChange}
                        className="w-5 h-5 mt-0.5 text-natura-600 border-natura-300 rounded focus:ring-natura-500"
                      />
                      <span className="text-sm text-natura-700">
                        {labels.acceptConditions[locale]} *
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                  <h2 className="font-display text-xl text-natura-900 mb-6">
                    {labels.summary[locale]}
                  </h2>

                  {/* Items */}
                  <ul className="divide-y divide-natura-100 mb-6 max-h-64 overflow-y-auto">
                    {state.items.map((item) => (
                      <li key={item.id} className="py-3 flex gap-3">
                        <div className="w-16 h-16 bg-natura-100 flex-shrink-0 rounded overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-natura-900 text-sm truncate">{item.name}</p>
                          <p className="text-xs text-natura-500">{item.quantity_m2} m² × {item.price_ttc} €</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{(item.price_ttc * item.quantity_m2).toFixed(2)} €</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Totals */}
                  <div className="space-y-3 text-sm border-t border-natura-200 pt-4">
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
                      <span className="text-natura-600">{labels.shippingCost[locale]}</span>
                      <span className="text-green-600 font-medium">{labels.free[locale]}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-natura-200">
                      <span className="font-medium text-natura-900">{labels.total[locale]}</span>
                      <span className="font-display text-2xl text-natura-900">
                        {getSubtotalTTC().toFixed(2)} €
                      </span>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading || !formData.acceptConditions}
                    className="w-full mt-6 py-4 bg-natura-900 text-white font-medium hover:bg-natura-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-lg"
                  >
                    {loading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {labels.processing[locale]}
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {labels.placeOrder[locale]}
                      </>
                    )}
                  </button>

                  <p className="mt-4 text-xs text-natura-500 text-center">
                    {labels.deliveryInfo[locale]}
                  </p>

                  <Link
                    href={`/${locale}/panier`}
                    className="block mt-4 text-center text-sm text-natura-600 hover:text-natura-900"
                  >
                    ← {labels.backToCart[locale]}
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
