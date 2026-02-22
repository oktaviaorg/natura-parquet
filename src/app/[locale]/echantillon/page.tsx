'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { products, type Product } from '@/data/products';

const PROMO_CODE = 'GOFREE';
const SHIPPING_COST = 5;

export default function EchantillonPage() {
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const [step, setStep] = useState<'select' | 'form' | 'success'>('select');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoValid, setPromoValid] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    postalCode: '',
    city: '',
    country: 'France',
    projectType: '',
    projectSurface: '',
    message: '',
  });

  const labels = {
    title: { fr: 'Demander un échantillon', de: 'Muster anfordern', en: 'Request a sample' },
    subtitle: { fr: 'Recevez gratuitement* des échantillons de nos parquets pour voir et toucher la qualité.', de: 'Erhalten Sie kostenlos* Muster unserer Parkette.', en: 'Receive free* samples of our parquets.' },
    shippingNote: { fr: '*Frais de port : 5€. Appelez-nous pour obtenir un code de livraison gratuite.', de: '*Versandkosten: 5€. Rufen Sie uns an für kostenlosen Versand.', en: '*Shipping: €5. Call us for free shipping code.' },
    
    // Steps
    step1: { fr: '1. Choisir vos échantillons', de: '1. Muster auswählen', en: '1. Choose samples' },
    step2: { fr: '2. Vos coordonnées', de: '2. Ihre Daten', en: '2. Your details' },
    maxSamples: { fr: 'Maximum 3 échantillons par demande', de: 'Maximal 3 Muster pro Anfrage', en: 'Maximum 3 samples per request' },
    
    // Search
    search: { fr: 'Rechercher un parquet...', de: 'Parkett suchen...', en: 'Search flooring...' },
    selected: { fr: 'sélectionné', de: 'ausgewählt', en: 'selected' },
    
    // Form labels
    firstName: { fr: 'Prénom', de: 'Vorname', en: 'First name' },
    lastName: { fr: 'Nom', de: 'Nachname', en: 'Last name' },
    email: { fr: 'Email', de: 'E-Mail', en: 'Email' },
    phone: { fr: 'Téléphone', de: 'Telefon', en: 'Phone' },
    company: { fr: 'Entreprise (optionnel)', de: 'Firma (optional)', en: 'Company (optional)' },
    address: { fr: 'Adresse', de: 'Adresse', en: 'Address' },
    postalCode: { fr: 'Code postal', de: 'PLZ', en: 'Postal code' },
    city: { fr: 'Ville', de: 'Stadt', en: 'City' },
    country: { fr: 'Pays', de: 'Land', en: 'Country' },
    projectType: { fr: 'Type de projet', de: 'Projekttyp', en: 'Project type' },
    projectSurface: { fr: 'Surface estimée (m²)', de: 'Geschätzte Fläche (m²)', en: 'Estimated surface (m²)' },
    message: { fr: 'Message (optionnel)', de: 'Nachricht (optional)', en: 'Message (optional)' },
    
    // Project types
    projectTypes: {
      renovation: { fr: 'Rénovation', de: 'Renovierung', en: 'Renovation' },
      construction: { fr: 'Construction neuve', de: 'Neubau', en: 'New construction' },
      commercial: { fr: 'Local commercial', de: 'Gewerbe', en: 'Commercial' },
      other: { fr: 'Autre', de: 'Sonstiges', en: 'Other' },
    },
    
    // Promo
    promoCode: { fr: 'Code promo', de: 'Gutscheincode', en: 'Promo code' },
    promoPlaceholder: { fr: 'Entrez votre code', de: 'Code eingeben', en: 'Enter your code' },
    promoApply: { fr: 'Appliquer', de: 'Anwenden', en: 'Apply' },
    promoValid: { fr: '✓ Livraison gratuite !', de: '✓ Kostenloser Versand!', en: '✓ Free shipping!' },
    promoInvalid: { fr: 'Code invalide', de: 'Ungültiger Code', en: 'Invalid code' },
    promoHint: { fr: 'Appelez-nous au 06 12 78 61 85 pour obtenir un code de livraison gratuite', de: 'Rufen Sie uns an für einen Gratis-Versand-Code', en: 'Call us for a free shipping code' },
    
    // Summary
    summary: { fr: 'Récapitulatif', de: 'Zusammenfassung', en: 'Summary' },
    samples: { fr: 'Échantillons', de: 'Muster', en: 'Samples' },
    shipping: { fr: 'Frais de port', de: 'Versandkosten', en: 'Shipping' },
    free: { fr: 'GRATUIT', de: 'KOSTENLOS', en: 'FREE' },
    total: { fr: 'Total', de: 'Gesamt', en: 'Total' },
    
    // Buttons
    continue: { fr: 'Continuer', de: 'Weiter', en: 'Continue' },
    back: { fr: 'Retour', de: 'Zurück', en: 'Back' },
    submit: { fr: 'Envoyer ma demande', de: 'Anfrage senden', en: 'Submit request' },
    submitting: { fr: 'Envoi en cours...', de: 'Wird gesendet...', en: 'Sending...' },
    
    // Success
    successTitle: { fr: 'Demande envoyée !', de: 'Anfrage gesendet!', en: 'Request sent!' },
    successMessage: { fr: 'Nous préparons vos échantillons. Vous recevrez un email de confirmation sous 24h.', de: 'Wir bereiten Ihre Muster vor. Sie erhalten eine Bestätigung per E-Mail.', en: 'We are preparing your samples. You will receive a confirmation email within 24h.' },
    successCta: { fr: 'Retour aux produits', de: 'Zurück zu Produkten', en: 'Back to products' },
    
    // Required
    required: { fr: 'Champ obligatoire', de: 'Pflichtfeld', en: 'Required field' },
  };

  // Get unique products (one per gamme/pose combo for simplicity)
  const sampleProducts = products.filter((p, i, arr) => 
    arr.findIndex(x => x.gamme === p.gamme && x.pose === p.pose) === i
  ).slice(0, 20);

  const filteredProducts = sampleProducts.filter(p => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return p.name[locale].toLowerCase().includes(search) ||
           p.gamme.toLowerCase().includes(search) ||
           p.finition.toLowerCase().includes(search);
  });

  const toggleProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    } else if (selectedProducts.length < 3) {
      setSelectedProducts(prev => [...prev, productId]);
    }
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === PROMO_CODE) {
      setPromoValid(true);
    } else {
      setPromoValid(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // TODO: Send to backend/email
    console.log('Sample request:', {
      products: selectedProducts,
      formData,
      promoCode: promoValid ? PROMO_CODE : null,
      totalCost: promoValid ? 0 : SHIPPING_COST,
    });

    setStep('success');
    setIsSubmitting(false);
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && 
                      formData.phone && formData.address && formData.postalCode && 
                      formData.city && formData.projectType;

  return (
    <main className="min-h-screen bg-natura-50">
      <Navigation />

      <section className="py-16 px-6 mt-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl text-natura-900 mb-4">
              {labels.title[locale]}
            </h1>
            <p className="text-natura-600 text-lg max-w-2xl mx-auto">
              {labels.subtitle[locale]}
            </p>
            <p className="text-natura-500 text-sm mt-2">
              {labels.shippingNote[locale]}
            </p>
          </div>

          {step === 'select' && (
            <div className="space-y-8">
              {/* Step indicator */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-forest-500 text-white flex items-center justify-center font-semibold">1</span>
                  <span className="text-natura-900 font-medium">{labels.step1[locale]}</span>
                </div>
                <div className="w-12 h-0.5 bg-natura-200" />
                <div className="flex items-center gap-2 opacity-50">
                  <span className="w-8 h-8 rounded-full bg-natura-200 text-natura-500 flex items-center justify-center font-semibold">2</span>
                  <span className="text-natura-500">{labels.step2[locale]}</span>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-natura-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={labels.search[locale]}
                  className="w-full pl-12 pr-4 py-3 border border-natura-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
                />
              </div>

              {/* Selection info */}
              <div className="flex items-center justify-between">
                <p className="text-natura-600 text-sm">
                  {labels.maxSamples[locale]}
                </p>
                <p className="text-forest-600 font-medium">
                  {selectedProducts.length}/3 {labels.selected[locale]}{selectedProducts.length > 1 ? 's' : ''}
                </p>
              </div>

              {/* Product grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => {
                  const isSelected = selectedProducts.includes(product.id);
                  const isDisabled = selectedProducts.length >= 3 && !isSelected;
                  
                  return (
                    <button
                      key={product.id}
                      onClick={() => toggleProduct(product.id)}
                      disabled={isDisabled}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected 
                          ? 'border-forest-500 bg-forest-50' 
                          : isDisabled
                          ? 'border-natura-100 bg-natura-50 opacity-50 cursor-not-allowed'
                          : 'border-natura-200 bg-white hover:border-natura-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded mb-2 ${
                            product.gamme === 'Exclusive' ? 'bg-natura-800 text-white' :
                            product.gamme === 'Rustic' ? 'bg-amber-100 text-amber-800' :
                            product.gamme === 'Country' ? 'bg-orange-100 text-orange-800' :
                            'bg-natura-200 text-natura-700'
                          }`}>
                            {product.gamme}
                          </span>
                          <h3 className="font-medium text-natura-900 text-sm line-clamp-2">
                            {product.name[locale]}
                          </h3>
                          <p className="text-natura-500 text-xs mt-1">
                            {product.dimensions}
                          </p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'border-forest-500 bg-forest-500' : 'border-natura-300'
                        }`}>
                          {isSelected && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Continue button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setStep('form')}
                  disabled={selectedProducts.length === 0}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                    selectedProducts.length > 0
                      ? 'bg-forest-500 text-white hover:bg-forest-600'
                      : 'bg-natura-200 text-natura-400 cursor-not-allowed'
                  }`}
                >
                  {labels.continue[locale]} →
                </button>
              </div>
            </div>
          )}

          {step === 'form' && (
            <div className="space-y-8">
              {/* Step indicator */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 opacity-50">
                  <span className="w-8 h-8 rounded-full bg-forest-500 text-white flex items-center justify-center font-semibold">✓</span>
                  <span className="text-natura-500">{labels.step1[locale]}</span>
                </div>
                <div className="w-12 h-0.5 bg-forest-500" />
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-forest-500 text-white flex items-center justify-center font-semibold">2</span>
                  <span className="text-natura-900 font-medium">{labels.step2[locale]}</span>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Form */}
                <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-natura-700 mb-1">
                          {labels.firstName[locale]} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-natura-700 mb-1">
                          {labels.lastName[locale]} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                        />
                      </div>
                    </div>

                    {/* Contact row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-natura-700 mb-1">
                          {labels.email[locale]} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-natura-700 mb-1">
                          {labels.phone[locale]} *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-sm font-medium text-natura-700 mb-1">
                        {labels.company[locale]}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-natura-700 mb-1">
                        {labels.address[locale]} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                      />
                    </div>

                    {/* City row */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-natura-700 mb-1">
                          {labels.postalCode[locale]} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.postalCode}
                          onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-natura-700 mb-1">
                          {labels.city[locale]} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-natura-700 mb-1">
                          {labels.country[locale]}
                        </label>
                        <select
                          value={formData.country}
                          onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                        >
                          <option value="France">France</option>
                          <option value="Belgique">Belgique</option>
                          <option value="Suisse">Suisse</option>
                          <option value="Luxembourg">Luxembourg</option>
                          <option value="Allemagne">Deutschland</option>
                        </select>
                      </div>
                    </div>

                    {/* Project info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-natura-700 mb-1">
                          {labels.projectType[locale]} *
                        </label>
                        <select
                          required
                          value={formData.projectType}
                          onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                        >
                          <option value="">--</option>
                          <option value="renovation">{labels.projectTypes.renovation[locale]}</option>
                          <option value="construction">{labels.projectTypes.construction[locale]}</option>
                          <option value="commercial">{labels.projectTypes.commercial[locale]}</option>
                          <option value="other">{labels.projectTypes.other[locale]}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-natura-700 mb-1">
                          {labels.projectSurface[locale]}
                        </label>
                        <input
                          type="text"
                          value={formData.projectSurface}
                          onChange={(e) => setFormData(prev => ({ ...prev, projectSurface: e.target.value }))}
                          placeholder="ex: 45"
                          className="w-full px-4 py-2.5 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-natura-700 mb-1">
                        {labels.message[locale]}
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 resize-none"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep('select')}
                      className="px-6 py-3 text-natura-600 hover:text-natura-900 font-medium"
                    >
                      ← {labels.back[locale]}
                    </button>
                    <button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                        isFormValid && !isSubmitting
                          ? 'bg-forest-500 text-white hover:bg-forest-600'
                          : 'bg-natura-200 text-natura-400 cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? labels.submitting[locale] : labels.submit[locale]}
                    </button>
                  </div>
                </form>

                {/* Summary sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl p-6 shadow-sm sticky top-28">
                    <h3 className="font-semibold text-natura-900 mb-4">{labels.summary[locale]}</h3>
                    
                    {/* Selected products */}
                    <div className="space-y-3 mb-6">
                      {selectedProducts.map(id => {
                        const product = products.find(p => p.id === id);
                        if (!product) return null;
                        return (
                          <div key={id} className="flex items-center gap-3 text-sm">
                            <span className={`w-2 h-2 rounded-full ${
                              product.gamme === 'Exclusive' ? 'bg-natura-800' :
                              product.gamme === 'Rustic' ? 'bg-amber-500' :
                              product.gamme === 'Country' ? 'bg-orange-500' :
                              'bg-natura-400'
                            }`} />
                            <span className="text-natura-700 line-clamp-1">{product.name[locale]}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Promo code */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-natura-700 mb-2">
                        {labels.promoCode[locale]}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => { setPromoCode(e.target.value); setPromoValid(null); }}
                          placeholder={labels.promoPlaceholder[locale]}
                          className="flex-1 px-3 py-2 border border-natura-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
                        />
                        <button
                          type="button"
                          onClick={applyPromoCode}
                          className="px-4 py-2 bg-natura-100 text-natura-700 text-sm font-medium rounded-lg hover:bg-natura-200 transition-colors"
                        >
                          {labels.promoApply[locale]}
                        </button>
                      </div>
                      {promoValid === true && (
                        <p className="text-green-600 text-sm mt-2">{labels.promoValid[locale]}</p>
                      )}
                      {promoValid === false && (
                        <p className="text-red-500 text-sm mt-2">{labels.promoInvalid[locale]}</p>
                      )}
                      <p className="text-natura-400 text-xs mt-2">{labels.promoHint[locale]}</p>
                    </div>

                    {/* Totals */}
                    <div className="border-t border-natura-100 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-natura-600">{labels.samples[locale]}</span>
                        <span className="text-natura-900">{labels.free[locale]}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-natura-600">{labels.shipping[locale]}</span>
                        <span className={promoValid ? 'text-green-600 line-through' : 'text-natura-900'}>
                          {SHIPPING_COST}€
                        </span>
                      </div>
                      {promoValid && (
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600">Code {PROMO_CODE}</span>
                          <span className="text-green-600">-{SHIPPING_COST}€</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold text-lg pt-2 border-t border-natura-100">
                        <span className="text-natura-900">{labels.total[locale]}</span>
                        <span className="text-forest-600">{promoValid ? 0 : SHIPPING_COST}€</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-display text-3xl text-natura-900 mb-4">
                {labels.successTitle[locale]}
              </h2>
              <p className="text-natura-600 max-w-md mx-auto mb-8">
                {labels.successMessage[locale]}
              </p>
              <Link
                href={`/${locale}/produits`}
                className="inline-flex px-8 py-3 bg-forest-500 text-white font-medium rounded-lg hover:bg-forest-600 transition-colors"
              >
                {labels.successCta[locale]}
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
