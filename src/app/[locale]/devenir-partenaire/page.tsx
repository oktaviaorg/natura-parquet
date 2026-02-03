'use client';

import { useTranslations } from 'next-intl';
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
      setFormData({
        company: '',
        contact_name: '',
        email: '',
        phone: '',
        territory: '',
        profile_type: '',
        experience: '',
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
    <main className="min-h-screen bg-natura-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl text-natura-900">
            Natura Parquet
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-natura-600 hover:text-natura-900">{tNav('home')}</Link>
            <Link href="/produits" className="text-natura-600 hover:text-natura-900">{tNav('products')}</Link>
            <Link href="/devenir-partenaire" className="text-natura-900 font-medium">{tNav('partners')}</Link>
            <Link href="/contact" className="text-natura-600 hover:text-natura-900">{tNav('contact')}</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-natura-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl mb-6">{t('hero.title')}</h1>
          <p className="text-xl opacity-90">{t('hero.subtitle')}</p>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl text-natura-900 text-center mb-12">{t('benefits.title')}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-natura-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="font-display text-xl text-natura-900 mb-2">{t('benefits.quality.title')}</h3>
              <p className="text-natura-600">{t('benefits.quality.desc')}</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-natura-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-display text-xl text-natura-900 mb-2">{t('benefits.margin.title')}</h3>
              <p className="text-natura-600">{t('benefits.margin.desc')}</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-natura-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-display text-xl text-natura-900 mb-2">{t('benefits.logistics.title')}</h3>
              <p className="text-natura-600">{t('benefits.logistics.desc')}</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-natura-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="font-display text-xl text-natura-900 mb-2">{t('benefits.support.title')}</h3>
              <p className="text-natura-600">{t('benefits.support.desc')}</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-natura-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🗺️</span>
              </div>
              <h3 className="font-display text-xl text-natura-900 mb-2">{t('benefits.territory.title')}</h3>
              <p className="text-natura-600">{t('benefits.territory.desc')}</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-natura-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-display text-xl text-natura-900 mb-2">{t('benefits.partnership.title')}</h3>
              <p className="text-natura-600">{t('benefits.partnership.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Profils recherchés */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-natura-900 text-center mb-12">{t('profiles.title')}</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-natura-200 p-6 rounded-lg text-center">
              <span className="text-4xl mb-4 block">🏪</span>
              <h3 className="font-display text-lg text-natura-900 mb-2">{t('profiles.reseller.title')}</h3>
              <p className="text-natura-600 text-sm">{t('profiles.reseller.desc')}</p>
            </div>
            
            <div className="border border-natura-200 p-6 rounded-lg text-center">
              <span className="text-4xl mb-4 block">💼</span>
              <h3 className="font-display text-lg text-natura-900 mb-2">{t('profiles.agent.title')}</h3>
              <p className="text-natura-600 text-sm">{t('profiles.agent.desc')}</p>
            </div>
            
            <div className="border border-natura-200 p-6 rounded-lg text-center">
              <span className="text-4xl mb-4 block">🔨</span>
              <h3 className="font-display text-lg text-natura-900 mb-2">{t('profiles.installer.title')}</h3>
              <p className="text-natura-600 text-sm">{t('profiles.installer.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-16 px-4 bg-natura-100">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl text-natura-900 text-center mb-4">{t('form.title')}</h2>
          <p className="text-natura-600 text-center mb-12">{t('form.subtitle')}</p>
          
          {status === 'success' ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <span className="text-4xl mb-4 block">✅</span>
              <h3 className="font-display text-xl text-green-800 mb-2">{t('form.success.title')}</h3>
              <p className="text-green-700">{t('form.success.message')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-natura-700 mb-2 font-medium">{t('form.company')}</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500"
                  />
                </div>
                
                <div>
                  <label className="block text-natura-700 mb-2 font-medium">{t('form.contact_name')} *</label>
                  <input
                    type="text"
                    name="contact_name"
                    value={formData.contact_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-natura-700 mb-2 font-medium">{t('form.email')} *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500"
                  />
                </div>
                
                <div>
                  <label className="block text-natura-700 mb-2 font-medium">{t('form.phone')}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-natura-700 mb-2 font-medium">{t('form.profile_type')} *</label>
                  <select
                    name="profile_type"
                    value={formData.profile_type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500 bg-white"
                  >
                    <option value="">{t('form.select')}</option>
                    <option value="reseller">{t('profiles.reseller.title')}</option>
                    <option value="agent">{t('profiles.agent.title')}</option>
                    <option value="installer">{t('profiles.installer.title')}</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-natura-700 mb-2 font-medium">{t('form.territory')}</label>
                  <input
                    type="text"
                    name="territory"
                    value={formData.territory}
                    onChange={handleChange}
                    placeholder={t('form.territory_placeholder')}
                    className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-natura-700 mb-2 font-medium">{t('form.experience')}</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={3}
                  placeholder={t('form.experience_placeholder')}
                  className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500"
                />
              </div>
              
              <div>
                <label className="block text-natura-700 mb-2 font-medium">{t('form.message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t('form.message_placeholder')}
                  className="w-full px-4 py-3 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-natura-500"
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
      </section>

      {/* Footer */}
      <footer className="bg-natura-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-display text-2xl mb-4">Natura Parquet</p>
          <p className="opacity-70">© 2025 Natura Parquet. {t('footer.rights')}</p>
        </div>
      </footer>
    </main>
  );
}
