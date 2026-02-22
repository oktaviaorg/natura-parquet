'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'devis',
    product: '',
    surface: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Pre-fill from URL params
  useEffect(() => {
    const productParam = searchParams.get('product');
    const typeParam = searchParams.get('type');
    
    if (productParam || typeParam) {
      setFormData(prev => ({
        ...prev,
        product: productParam || prev.product,
        subject: typeParam === 'echantillon' ? 'echantillon' : typeParam || prev.subject,
      }));
    }
  }, [searchParams]);

  const labels = {
    title: { fr: 'Contactez-nous', de: 'Kontaktieren Sie uns', en: 'Contact us' },
    subtitle: { 
      fr: 'Demande de devis, échantillons ou informations. Nous répondons sous 24h.',
      de: 'Angebot, Muster oder Informationen anfordern. Wir antworten innerhalb von 24h.',
      en: 'Request a quote, samples or information. We respond within 24h.'
    },
    name: { fr: 'Nom complet', de: 'Vollständiger Name', en: 'Full name' },
    email: { fr: 'Email', de: 'E-Mail', en: 'Email' },
    phone: { fr: 'Téléphone', de: 'Telefon', en: 'Phone' },
    subject: { fr: 'Type de demande', de: 'Art der Anfrage', en: 'Request type' },
    subjects: {
      devis: { fr: 'Demande de devis', de: 'Angebot anfordern', en: 'Quote request' },
      echantillon: { fr: 'Demande d\'échantillons', de: 'Muster anfordern', en: 'Sample request' },
      info: { fr: 'Informations produit', de: 'Produktinformationen', en: 'Product information' },
      autre: { fr: 'Autre', de: 'Andere', en: 'Other' },
    },
    product: { fr: 'Produit concerné', de: 'Betroffenes Produkt', en: 'Related product' },
    surface: { fr: 'Surface estimée (m²)', de: 'Geschätzte Fläche (m²)', en: 'Estimated surface (m²)' },
    message: { fr: 'Votre message', de: 'Ihre Nachricht', en: 'Your message' },
    send: { fr: 'Envoyer', de: 'Senden', en: 'Send' },
    sending: { fr: 'Envoi...', de: 'Senden...', en: 'Sending...' },
    success: { fr: 'Message envoyé ! Nous vous répondrons sous 24h.', de: 'Nachricht gesendet! Wir antworten innerhalb von 24h.', en: 'Message sent! We will respond within 24h.' },
    error: { fr: 'Erreur lors de l\'envoi. Veuillez réessayer.', de: 'Fehler beim Senden. Bitte versuchen Sie es erneut.', en: 'Error sending. Please try again.' },
    contactInfo: { fr: 'Nos coordonnées', de: 'Unsere Kontaktdaten', en: 'Our contact details' },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Send via mailto for now (simple solution)
      const subject = encodeURIComponent(`[${formData.subject.toUpperCase()}] ${formData.product || 'Natura Parquets'}`);
      const body = encodeURIComponent(`
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone || 'Non renseigné'}
Surface estimée: ${formData.surface || 'Non renseignée'}
Produit: ${formData.product || 'Non spécifié'}

Message:
${formData.message}
      `);
      
      window.location.href = `mailto:contact@natura-parquets.fr?subject=${subject}&body=${body}`;
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="min-h-screen bg-natura-50">
      <Navigation />

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-soft p-8">
                <h1 className="font-display text-3xl text-natura-900 mb-2">
                  {labels.title[locale]}
                </h1>
                <p className="text-natura-600 mb-8">
                  {labels.subtitle[locale]}
                </p>

                {status === 'success' ? (
                  <div className="p-6 bg-forest-50 rounded-xl border border-forest-200">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-forest-800 font-medium">{labels.success[locale]}</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-natura-700 mb-2">
                          {labels.name[locale]} *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-natura-700 mb-2">
                          {labels.email[locale]} *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-natura-700 mb-2">
                          {labels.phone[locale]}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-natura-700 mb-2">
                          {labels.subject[locale]}
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
                        >
                          <option value="devis">{labels.subjects.devis[locale]}</option>
                          <option value="echantillon">{labels.subjects.echantillon[locale]}</option>
                          <option value="info">{labels.subjects.info[locale]}</option>
                          <option value="autre">{labels.subjects.autre[locale]}</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-natura-700 mb-2">
                          {labels.product[locale]}
                        </label>
                        <input
                          type="text"
                          name="product"
                          value={formData.product}
                          onChange={handleChange}
                          placeholder={locale === 'fr' ? 'Ex: Bâton Rompu Exclusive 120mm' : 'Ex: Herringbone Exclusive 120mm'}
                          className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-natura-700 mb-2">
                          {labels.surface[locale]}
                        </label>
                        <input
                          type="text"
                          name="surface"
                          value={formData.surface}
                          onChange={handleChange}
                          placeholder="Ex: 45"
                          className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-natura-700 mb-2">
                        {labels.message[locale]} *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 bg-forest-500 text-white font-medium rounded-lg hover:bg-forest-600 transition-colors disabled:opacity-50"
                    >
                      {status === 'loading' ? labels.sending[locale] : labels.send[locale]}
                    </button>

                    {status === 'error' && (
                      <p className="text-red-600 text-sm text-center">{labels.error[locale]}</p>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <div className="bg-natura-900 text-white rounded-2xl p-8">
                <h2 className="font-display text-xl mb-6">{labels.contactInfo[locale]}</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Email</p>
                      <a href="mailto:contact@natura-parquets.fr" className="hover:text-forest-300 transition-colors">
                        contact@natura-parquets.fr
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">{locale === 'fr' ? 'Téléphone' : 'Phone'}</p>
                      <a href="tel:+33757821306" className="hover:text-forest-300 transition-colors">
                        07 57 82 13 06
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">{locale === 'fr' ? 'Adresse' : 'Address'}</p>
                      <p>6 rue du Commerce</p>
                      <p>68420 Herrlisheim-près-Colmar</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-white/60 text-sm mb-2">
                    {locale === 'fr' ? 'Horaires' : 'Hours'}
                  </p>
                  <p className="text-sm">
                    {locale === 'fr' ? 'Lun - Ven : 8h - 18h' : 'Mon - Fri: 8am - 6pm'}
                  </p>
                </div>
              </div>

              {/* Delivery info */}
              <div className="mt-6 bg-forest-50 rounded-xl p-6 border border-forest-100">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-forest-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <div>
                    <p className="font-medium text-forest-800">
                      {locale === 'fr' ? 'Échantillons gratuits' : 'Free samples'}
                    </p>
                    <p className="text-sm text-forest-600 mt-1">
                      {locale === 'fr' 
                        ? 'Recevez jusqu\'à 3 échantillons gratuits pour vous aider dans votre choix.'
                        : 'Receive up to 3 free samples to help you choose.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
