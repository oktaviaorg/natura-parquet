'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PartnerPage() {
  const t = useTranslations('partner');
  const tNav = useTranslations('nav');
  const locale = useLocale() as 'fr' | 'de' | 'en';
  
  const [formData, setFormData] = useState({
    company: '',
    contact_name: '',
    email: '',
    phone: '',
    territory: '',
    profile_type: '',
    experience: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const { error } = await supabase
        .from('partner_applications')
        .insert([formData]);
      
      if (error) throw error;
      setStatus('success');
      setFormData({ company: '', contact_name: '', email: '', phone: '', territory: '', profile_type: '', experience: '', message: '' });
    } catch (err) {
      console.error('Error:', err);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="bg-natura-900 text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href={`/${locale}`} className="font-display text-2xl">Natura Parquet</Link>
          <nav className="flex gap-6">
            <Link href={`/${locale}`} className="hover:opacity-80">{tNav('home')}</Link>
            <Link href={`/${locale}/produits`} className="hover:opacity-80">{tNav('products')}</Link>
            <Link href={`/${locale}/devenir-partenaire`} className="font-medium">{tNav('partners')}</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-natura-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl mb-6">{t('hero.title')}</h1>
          <p className="text-xl opacity-90">{t('hero.subtitle')}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6 bg-natura-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl text-natura-900 text-center mb-12">{t('benefits.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['quality', 'margin', 'logistics', 'support', 'territory', 'partnership'].map((key) => (
              <div key={key} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-display text-lg text-natura-900 mb-2">{t(`benefits.${key}.title`)}</h3>
                <p className="text-natura-600 text-sm">{t(`benefits.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profiles */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-natura-900 text-center mb-12">{t('profiles.title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {['reseller', 'agent', 'installer'].map((key) => (
              <div key={key} className="border border-natura-200 p-6 rounded-lg text-center">
                <h3 className="font-display text-lg text-natura-900 mb-2">{t(`profiles.${key}.title`)}</h3>
                <p className="text-natura-600 text-sm">{t(`profiles.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-6 bg-natura-100">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl text-natura-900 text-center mb-4">{t('form.title')}</h2>
          <p className="text-natura-600 text-center mb-8">{t('form.subtitle')}</p>
          
          {status === 'success' ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <h3 className="text-xl text-green-800 mb-2">{t('form.success.title')}</h3>
              <p className="text-green-700">{t('form.success.message')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-natura-700 mb-2">{t('form.company')}</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange}
                    className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:ring-2 focus:ring-natura-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-natura-700 mb-2">{t('form.contact_name')} *</label>
                  <input type="text" name="contact_name" value={formData.contact_name} onChange={handleChange} required
                    className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:ring-2 focus:ring-natura-500 focus:outline-none" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-natura-700 mb-2">{t('form.email')} *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:ring-2 focus:ring-natura-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-natura-700 mb-2">{t('form.phone')}</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:ring-2 focus:ring-natura-500 focus:outline-none" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-natura-700 mb-2">{t('form.profile_type')} *</label>
                  <select name="profile_type" value={formData.profile_type} onChange={handleChange} required
                    className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:ring-2 focus:ring-natura-500 focus:outline-none bg-white">
                    <option value="">{t('form.select')}</option>
                    <option value="reseller">{t('profiles.reseller.title')}</option>
                    <option value="agent">{t('profiles.agent.title')}</option>
                    <option value="installer">{t('profiles.installer.title')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-natura-700 mb-2">{t('form.territory')}</label>
                  <input type="text" name="territory" value={formData.territory} onChange={handleChange}
                    placeholder={t('form.territory_placeholder')}
                    className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:ring-2 focus:ring-natura-500 focus:outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-natura-700 mb-2">{t('form.experience')}</label>
                <textarea name="experience" value={formData.experience} onChange={handleChange} rows={3}
                  placeholder={t('form.experience_placeholder')}
                  className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:ring-2 focus:ring-natura-500 focus:outline-none" />
              </div>
              
              <div>
                <label className="block text-natura-700 mb-2">{t('form.message')}</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={4}
                  placeholder={t('form.message_placeholder')}
                  className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:ring-2 focus:ring-natura-500 focus:outline-none" />
              </div>
              
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">{t('form.error')}</div>
              )}
              
              <button type="submit" disabled={status === 'loading'}
                className="w-full py-4 bg-natura-900 text-white font-medium rounded-lg hover:bg-natura-800 transition-colors disabled:opacity-50">
                {status === 'loading' ? t('form.sending') : t('form.submit')}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-natura-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-display text-2xl mb-4">Natura Parquet</p>
          <p className="opacity-70">© 2026 Natura Parquet. Tous droits réservés.</p>
        </div>
      </footer>
    </main>
  );
}
