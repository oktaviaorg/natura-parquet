'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ContactPage() {
  const t = useTranslations('contact');
  const tNav = useTranslations('nav');
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          subject: `[${formData.subject.toUpperCase()}] ${formData.product || 'Demande générale'}`,
          message: `Téléphone: ${formData.phone || 'Non renseigné'}
Surface estimée: ${formData.surface || 'Non renseignée'}
Produit: ${formData.product || 'Non spécifié'}

Message:
${formData.message}`,
          locale: 'fr'
        }]);
      
      if (error) throw error;
      
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'devis',
        product: '',
        surface: '',
        message: ''
      });
    } catch (err) {
      console.error('Error:', err);
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
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl text-natura-900">
            Natura Parquet
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-natura-600 hover:text-natura-900">{tNav('home')}</Link>
            <Link href="/produits" className="text-natura-600 hover:text-natura-900">{tNav('products')}</Link>
            <Link href="/contact" className="text-natura-900 font-medium">{tNav('contact')}</Link>
            <Link href="/devenir-partenaire" className="text-natura-600 hover:text-natura-900">{tNav('partners')}</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-natura-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl mb-4">{t('title')}</h1>
          <p className="text-xl opacity-90">{t('subtitle')}</p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-xl text-natura-900 mb-4">{t('info.title')}</h3>
              <div className="space-y-4 text-natura-600">
                <p className="flex items-start gap-3">
                  <span className="text-xl">📧</span>
                  <span>contact@natura-parquets.fr</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <span>Alsace, France</span>
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="font-display text-xl text-natura-900 mb-4">{t('info.hours')}</h3>
              <p className="text-natura-600">
                Lun - Ven : 9h - 18h<br />
                Sam : Sur rendez-vous
              </p>
            </div>
            
            <div className="bg-natura-50 p-6 rounded-lg">
              <h3 className="font-display text-lg text-natura-900 mb-2">{t('info.pro')}</h3>
              <p className="text-natura-600 text-sm mb-4">{t('info.pro_desc')}</p>
              <Link 
                href="/devenir-partenaire"
                className="text-natura-700 font-medium hover:text-natura-900 underline"
              >
                {tNav('partners')} →
              </Link>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <span className="text-4xl mb-4 block">✅</span>
                <h3 className="font-display text-xl text-green-800 mb-2">{t('form.success.title')}</h3>
                <p className="text-green-700">{t('form.success.message')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-natura-50 p-8 rounded-lg space-y-6">
                <h2 className="font-display text-2xl text-natura-900 mb-6">{t('form.title')}</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-natura-700 mb-2 font-medium">{t('form.name')} *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500 bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-natura-700 mb-2 font-medium">{t('form.email')} *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500 bg-white"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-natura-700 mb-2 font-medium">{t('form.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500 bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-natura-700 mb-2 font-medium">{t('form.subject')}</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500 bg-white"
                    >
                      <option value="devis">{t('form.subjects.quote')}</option>
                      <option value="info">{t('form.subjects.info')}</option>
                      <option value="echantillon">{t('form.subjects.sample')}</option>
                      <option value="autre">{t('form.subjects.other')}</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-natura-700 mb-2 font-medium">{t('form.product')}</label>
                    <input
                      type="text"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      placeholder={t('form.product_placeholder')}
                      className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500 bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-natura-700 mb-2 font-medium">{t('form.surface')}</label>
                    <input
                      type="text"
                      name="surface"
                      value={formData.surface}
                      onChange={handleChange}
                      placeholder={t('form.surface_placeholder')}
                      className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500 bg-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-natura-700 mb-2 font-medium">{t('form.message')} *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={t('form.message_placeholder')}
                    className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500 bg-white"
                  />
                </div>
                
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    {t('form.error')}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-natura-900 text-white font-medium rounded-lg hover:bg-natura-800 transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? t('form.sending') : t('form.submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-natura-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-display text-2xl mb-4">Natura Parquet</p>
          <p className="opacity-70">© 2026 Natura Parquet. Tous droits réservés.</p>
        </div>
      </footer>
    </main>
  );
}
