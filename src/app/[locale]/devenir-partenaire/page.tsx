'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { heroImages } from '@/data/products';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PartnerPage() {
  const t = useTranslations('partner');
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

  const benefits = [
    { icon: '🌿', key: 'quality' },
    { icon: '💰', key: 'margin' },
    { icon: '🚚', key: 'logistics' },
    { icon: '📈', key: 'support' },
    { icon: '🗺️', key: 'territory' },
    { icon: '🤝', key: 'partnership' },
  ];

  const profiles = [
    { icon: '🏪', key: 'reseller' },
    { icon: '💼', key: 'agent' },
    { icon: '🔨', key: 'installer' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImages.ambiance3}')` }}
        >
          <div className="absolute inset-0 bg-natura-900/75" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] mb-6 opacity-80">
            {locale === 'fr' ? 'Développez votre activité' : locale === 'de' ? 'Entwickeln Sie Ihr Geschäft' : 'Grow your business'}
          </p>
          <h1 className="font-display text-4xl md:text-6xl mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-natura-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-natura-900 mb-4">
              {t('benefits.title')}
            </h2>
            <p className="text-natura-600 max-w-2xl mx-auto">
              {locale === 'fr' 
                ? 'Rejoignez un réseau de distribution premium et bénéficiez de nombreux avantages'
                : locale === 'de'
                ? 'Treten Sie einem Premium-Vertriebsnetz bei und profitieren Sie von zahlreichen Vorteilen'
                : 'Join a premium distribution network and enjoy numerous benefits'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div 
                key={benefit.key}
                className="bg-white p-8 border border-natura-100 hover:shadow-lg transition-shadow"
              >
                <span className="text-4xl mb-6 block">{benefit.icon}</span>
                <h3 className="font-display text-xl text-natura-900 mb-3">
                  {t(`benefits.${benefit.key}.title`)}
                </h3>
                <p className="text-natura-600 leading-relaxed">
                  {t(`benefits.${benefit.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profiles Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-natura-900 mb-4">
              {t('profiles.title')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {profiles.map((profile) => (
              <div 
                key={profile.key}
                className="text-center p-8 border-2 border-natura-100 hover:border-natura-300 transition-colors"
              >
                <span className="text-5xl mb-6 block">{profile.icon}</span>
                <h3 className="font-display text-xl text-natura-900 mb-3">
                  {t(`profiles.${profile.key}.title`)}
                </h3>
                <p className="text-natura-600">
                  {t(`profiles.${profile.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-6 bg-natura-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-natura-900 mb-4">
              {t('form.title')}
            </h2>
            <p className="text-natura-600">
              {t('form.subtitle')}
            </p>
          </div>
          
          {status === 'success' ? (
            <div className="bg-white border border-green-200 p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-2xl text-natura-900 mb-3">
                {t('form.success.title')}
              </h3>
              <p className="text-natura-600">
                {t('form.success.message')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 shadow-sm space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-natura-700 mb-2">
                    {t('form.company')}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-natura-200 focus:border-natura-900 focus:ring-1 focus:ring-natura-900 outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-natura-700 mb-2">
                    {t('form.contact_name')} *
                  </label>
                  <input
                    type="text"
                    name="contact_name"
                    value={formData.contact_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-natura-200 focus:border-natura-900 focus:ring-1 focus:ring-natura-900 outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-natura-700 mb-2">
                    {t('form.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-natura-200 focus:border-natura-900 focus:ring-1 focus:ring-natura-900 outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-natura-700 mb-2">
                    {t('form.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-natura-200 focus:border-natura-900 focus:ring-1 focus:ring-natura-900 outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-natura-700 mb-2">
                    {t('form.profile_type')} *
                  </label>
                  <select
                    name="profile_type"
                    value={formData.profile_type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-natura-200 focus:border-natura-900 focus:ring-1 focus:ring-natura-900 outline-none transition-colors bg-white"
                  >
                    <option value="">{t('form.select')}</option>
                    <option value="reseller">{t('profiles.reseller.title')}</option>
                    <option value="agent">{t('profiles.agent.title')}</option>
                    <option value="installer">{t('profiles.installer.title')}</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-natura-700 mb-2">
                    {t('form.territory')}
                  </label>
                  <input
                    type="text"
                    name="territory"
                    value={formData.territory}
                    onChange={handleChange}
                    placeholder={t('form.territory_placeholder')}
                    className="w-full px-4 py-3 border border-natura-200 focus:border-natura-900 focus:ring-1 focus:ring-natura-900 outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-natura-700 mb-2">
                  {t('form.experience')}
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={3}
                  placeholder={t('form.experience_placeholder')}
                  className="w-full px-4 py-3 border border-natura-200 focus:border-natura-900 focus:ring-1 focus:ring-natura-900 outline-none transition-colors resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-natura-700 mb-2">
                  {t('form.message')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t('form.message_placeholder')}
                  className="w-full px-4 py-3 border border-natura-200 focus:border-natura-900 focus:ring-1 focus:ring-natura-900 outline-none transition-colors resize-none"
                />
              </div>
              
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 p-4 text-red-700 text-center">
                  {t('form.error')}
                </div>
              )}
              
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-natura-900 text-white font-medium hover:bg-natura-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? t('form.sending') : t('form.submit')}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
