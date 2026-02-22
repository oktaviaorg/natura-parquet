'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Types
interface Partner {
  id: string;
  name: string;
  type: 'revendeur' | 'poseur' | 'architecte' | 'poseur-revendeur';
  city: string;
  region: string;
  department: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: { fr: string; de: string; en: string };
  premium?: boolean;
}

// Données partenaires
const partners: Partner[] = [
  {
    id: '1',
    name: 'Parq\'line',
    type: 'poseur-revendeur',
    city: 'Herrlisheim-près-Colmar',
    region: 'Grand Est',
    department: '68',
    address: '6 rue du Commerce, 68420 Herrlisheim-près-Colmar',
    phone: '06 12 78 61 85',
    email: 'e.nuber@parqline.fr',
    website: 'https://parqline.fr',
    description: {
      fr: 'Revendeur avec showroom. Spécialiste parquet et pose professionnelle. Conseils personnalisés.',
      de: 'Händler mit Ausstellungsraum. Parkettspezialist und professionelle Verlegung.',
      en: 'Retailer with showroom. Parquet specialist and professional installation.'
    },
    premium: true,
  },
  {
    id: '2',
    name: 'Les Ponceurs Réunis',
    type: 'poseur-revendeur',
    city: 'Herrlisheim-près-Colmar',
    region: 'Grand Est',
    department: '68',
    address: '6 rue du Commerce, 68420 Herrlisheim-près-Colmar',
    phone: '06 04 44 09 03',
    email: 'contact@poncages.fr',
    website: 'https://ponceur-parquet.fr',
    description: {
      fr: 'Ponçage, vitrification et rénovation de parquets. Intervention en Alsace et Lorraine.',
      de: 'Schleifen, Versiegeln und Renovierung von Parkett. Einsatz in Elsass und Lothringen.',
      en: 'Sanding, sealing and parquet renovation. Service in Alsace and Lorraine.'
    },
    premium: true,
  },
  {
    id: '3',
    name: 'Sundgau Parquets',
    type: 'poseur-revendeur',
    city: 'Sundgau',
    region: 'Grand Est',
    department: '68',
    phone: '06 04 44 09 03',
    website: 'https://sundgau-parquets.fr',
    description: {
      fr: 'Pose et rénovation de parquets dans le Sundgau. Artisan local de confiance.',
      de: 'Parkettverlegung und Renovierung im Sundgau. Lokaler Handwerker Ihres Vertrauens.',
      en: 'Parquet installation and renovation in Sundgau. Trusted local craftsman.'
    },
    premium: true,
  },
  {
    id: '4',
    name: 'RENO\'LINE',
    type: 'architecte',
    city: 'Herrlisheim-près-Colmar',
    region: 'Grand Est',
    department: '68',
    address: '6 rue du Commerce, 68420 Herrlisheim-près-Colmar',
    phone: '06 04 44 09 03',
    email: 'contact@renoline.fr',
    website: 'https://renoline.fr',
    description: {
      fr: 'Rénovation & Agencement. Entreprise générale de bâtiment. Plus de 4400 avis clients.',
      de: 'Renovierung & Einrichtung. Bauunternehmen. Über 4400 Kundenbewertungen.',
      en: 'Renovation & Design. General contractor. Over 4400 customer reviews.'
    },
    premium: true,
  },
];

const regions = Array.from(new Set(partners.map(p => p.region))).sort();
const types = [
  { value: 'all', label: { fr: 'Tous', de: 'Alle', en: 'All' } },
  { value: 'poseur-revendeur', label: { fr: 'Poseurs & Revendeurs', de: 'Verleger & Händler', en: 'Installers & Retailers' } },
  { value: 'revendeur', label: { fr: 'Revendeurs', de: 'Händler', en: 'Retailers' } },
  { value: 'poseur', label: { fr: 'Poseurs', de: 'Verleger', en: 'Installers' } },
  { value: 'architecte', label: { fr: 'Architectes', de: 'Architekten', en: 'Architects' } },
];

export default function PartenairesPage() {
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const labels = {
    title: { fr: 'Nos Partenaires', de: 'Unsere Partner', en: 'Our Partners' },
    subtitle: { fr: 'Trouvez un revendeur ou poseur agréé Natura Parquets près de chez vous', de: 'Finden Sie einen autorisierten Natura Parquets Händler in Ihrer Nähe', en: 'Find an authorized Natura Parquets retailer near you' },
    search: { fr: 'Rechercher par ville, nom...', de: 'Suche nach Stadt, Name...', en: 'Search by city, name...' },
    region: { fr: 'Région', de: 'Region', en: 'Region' },
    allRegions: { fr: 'Toutes les régions', de: 'Alle Regionen', en: 'All regions' },
    type: { fr: 'Type', de: 'Typ', en: 'Type' },
    results: { fr: 'partenaires trouvés', de: 'Partner gefunden', en: 'partners found' },
    noResults: { fr: 'Aucun partenaire trouvé', de: 'Keine Partner gefunden', en: 'No partners found' },
    premium: { fr: 'Partenaire Premium', de: 'Premium-Partner', en: 'Premium Partner' },
    revendeur: { fr: 'Revendeur', de: 'Händler', en: 'Retailer' },
    poseur: { fr: 'Poseur agréé', de: 'Zugelassener Verleger', en: 'Certified installer' },
    architecte: { fr: 'Architecte', de: 'Architekt', en: 'Architect' },
    contact: { fr: 'Contacter', de: 'Kontakt', en: 'Contact' },
    visit: { fr: 'Visiter le site', de: 'Website besuchen', en: 'Visit website' },
    becomePartner: { fr: 'Devenir partenaire', de: 'Partner werden', en: 'Become a partner' },
    becomePartnerDesc: { fr: 'Vous êtes professionnel et souhaitez rejoindre notre réseau ?', de: 'Sie sind Profi und möchten unserem Netzwerk beitreten?', en: 'Are you a professional and want to join our network?' },
  };

  const typeLabels: Record<string, { fr: string; de: string; en: string }> = {
    revendeur: labels.revendeur,
    poseur: labels.poseur,
    architecte: labels.architecte,
    'poseur-revendeur': { fr: 'Poseur & Revendeur confirmé', de: 'Verleger & Händler', en: 'Certified Installer & Retailer' },
  };

  // Filter partners
  const filteredPartners = partners.filter(partner => {
    const matchesSearch = searchTerm === '' || 
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.department.includes(searchTerm);
    
    const matchesRegion = selectedRegion === 'all' || partner.region === selectedRegion;
    // poseur-revendeur matches both "revendeur" and "poseur" filters
    const matchesType = selectedType === 'all' 
      || partner.type === selectedType
      || (selectedType === 'revendeur' && partner.type === 'poseur-revendeur')
      || (selectedType === 'poseur' && partner.type === 'poseur-revendeur');
    
    return matchesSearch && matchesRegion && matchesType;
  });

  // Sort: premium first, then alphabetically
  const sortedPartners = [...filteredPartners].sort((a, b) => {
    if (a.premium && !b.premium) return -1;
    if (!a.premium && b.premium) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <main className="min-h-screen bg-natura-50">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-natura-800 to-natura-900 text-white py-20 px-6 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl mb-4">
            {labels.title[locale]}
          </h1>
          <p className="text-natura-300 text-lg">
            {labels.subtitle[locale]}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white shadow-sm sticky top-20 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-natura-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={labels.search[locale]}
                  className="w-full pl-10 pr-4 py-2.5 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>
            </div>

            {/* Region filter */}
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2.5 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
            >
              <option value="all">{labels.allRegions[locale]}</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>

            {/* Type filter */}
            <div className="flex gap-2">
              {types.map(type => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedType === type.value
                      ? 'bg-forest-500 text-white'
                      : 'bg-natura-100 text-natura-600 hover:bg-natura-200'
                  }`}
                >
                  {type.label[locale]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Count */}
          <p className="text-natura-500 mb-6">
            {sortedPartners.length} {labels.results[locale]}
          </p>

          {sortedPartners.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-natura-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-natura-500 text-lg">{labels.noResults[locale]}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedPartners.map(partner => (
                <div
                  key={partner.id}
                  className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                    partner.premium ? 'ring-2 ring-amber-400' : ''
                  }`}
                >
                  {/* Header */}
                  <div className={`px-5 py-4 ${partner.premium ? 'bg-gradient-to-r from-amber-50 to-orange-50' : 'bg-natura-50'}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-natura-900 text-lg">{partner.name}</h3>
                        <p className="text-natura-500 text-sm flex items-center gap-1 mt-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {partner.city} ({partner.department})
                        </p>
                      </div>
                      {partner.premium && (
                        <span className="px-2 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded">
                          ⭐ PREMIUM
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-5 py-4">
                    {/* Type badge */}
                    <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full mb-3 ${
                      partner.type === 'poseur-revendeur' ? 'bg-amber-100 text-amber-800' :
                      partner.type === 'revendeur' ? 'bg-forest-100 text-forest-700' :
                      partner.type === 'poseur' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {typeLabels[partner.type][locale]}
                    </span>

                    {/* Description */}
                    {partner.description && (
                      <p className="text-natura-600 text-sm mb-4">
                        {partner.description[locale]}
                      </p>
                    )}

                    {/* Contact info */}
                    <div className="space-y-2 text-sm">
                      {partner.address && (
                        <p className="text-natura-500 flex items-start gap-2">
                          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {partner.address}
                        </p>
                      )}
                      {partner.phone && (
                        <a href={`tel:${partner.phone.replace(/\s/g, '')}`} className="text-natura-600 hover:text-forest-600 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {partner.phone}
                        </a>
                      )}
                      {partner.email && (
                        <a href={`mailto:${partner.email}`} className="text-natura-600 hover:text-forest-600 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {partner.email}
                        </a>
                      )}
                    </div>

                    {/* Website button */}
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm text-forest-600 hover:text-forest-700 font-medium"
                      >
                        {labels.visit[locale]}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Become Partner */}
      <section className="py-16 px-6 bg-gradient-to-br from-forest-600 to-forest-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl text-white mb-4">
            {labels.becomePartner[locale]}
          </h2>
          <p className="text-forest-100 mb-8">
            {labels.becomePartnerDesc[locale]}
          </p>
          <Link
            href={`/${locale}/devenir-partenaire`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-forest-700 font-semibold rounded-xl hover:bg-forest-50 transition-colors shadow-lg"
          >
            {labels.becomePartner[locale]}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
