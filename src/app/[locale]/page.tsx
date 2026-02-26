'use client';

import { useMemo } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const SUPABASE_STORAGE = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/natura-parquets';

export default function HomePage() {
  const locale = useLocale() as 'fr' | 'de' | 'en';

  const labels = {
    heroTagline: {
      fr: 'REVÊTEMENT DE SOL EN BOIS',
      de: 'HOLZBODENBELÄGE',
      en: 'WOOD FLOORING'
    },
    heroTitle: {
      fr: 'NATURA\nPARQUETS',
      de: 'NATURA\nPARKETTE',
      en: 'NATURA\nPARQUETS'
    },
    heroSlogan: {
      fr: 'La force dans chaque couche de bois',
      de: 'Die Kraft in jeder Holzschicht',
      en: 'Strength in every layer of wood'
    },
    ctaDiscover: { fr: 'Découvrir nos parquets', de: 'Parkette entdecken', en: 'Discover our parquets' },
    ctaContact: { fr: 'Demander un devis', de: 'Angebot anfordern', en: 'Request a quote' },
    
    // About section
    aboutTitle: { fr: 'À propos de nous', de: 'Über uns', en: 'About us' },
    aboutText1: {
      fr: 'Natura Parquets propose des parquets contrecollés de qualité supérieure, dotés d\'une couche d\'usure en chêne de 3,5 mm, fabriqués de manière responsable en Europe, dans le plus grand respect de l\'environnement.',
      de: 'Natura Parkett bietet hochwertige Mehrschichtparkette mit einer 3,5 mm starken Eichen-Nutzschicht, die in Europa verantwortungsvoll und umweltfreundlich hergestellt werden.',
      en: 'Natura Parquets offers high-quality engineered parquet with a 3.5mm oak wear layer, responsibly manufactured in Europe with the utmost respect for the environment.'
    },
    aboutText2: {
      fr: 'Grâce à une structure innovante intégrant du pin et du sapin, nos parquets offrent une durabilité remarquable et une conductivité thermique optimale, répondant pleinement aux exigences des systèmes modernes de chauffage par le sol.',
      de: 'Dank einer innovativen Struktur aus Kiefer und Tanne bieten unsere Parkette eine bemerkenswerte Haltbarkeit und optimale Wärmeleitfähigkeit für moderne Fußbodenheizungen.',
      en: 'Thanks to an innovative structure combining pine and fir, our parquets offer remarkable durability and optimal thermal conductivity, fully meeting the requirements of modern underfloor heating systems.'
    },
    aboutText3: {
      fr: 'Tous nos produits sont certifiés FSC, garantissant une gestion durable des forêts et une production éthique.',
      de: 'Alle unsere Produkte sind FSC-zertifiziert und garantieren eine nachhaltige Forstwirtschaft und ethische Produktion.',
      en: 'All our products are FSC certified, ensuring sustainable forest management and ethical production.'
    },
    
    // Engagements
    engagementsTitle: { fr: 'Nos engagements', de: 'Unsere Verpflichtungen', en: 'Our commitments' },
    engagementsText: {
      fr: 'Tous les vernis, huiles et adhésifs utilisés dans notre processus de fabrication sont exempts de substances nocives telles que le formaldéhyde, garantissant ainsi un environnement intérieur plus sain.',
      de: 'Alle Lacke, Öle und Klebstoffe in unserem Herstellungsprozess sind frei von Schadstoffen wie Formaldehyd und gewährleisten so ein gesünderes Raumklima.',
      en: 'All varnishes, oils and adhesives used in our manufacturing process are free from harmful substances such as formaldehyde, ensuring a healthier indoor environment.'
    },
    fscCertified: { fr: 'FSC Certifié', de: 'FSC-zertifiziert', en: 'FSC Certified' },
    noFormaldehyde: { fr: 'Sans formaldéhyde', de: 'Ohne Formaldehyd', en: 'Formaldehyde-free' },
    
    // 3 Pillars
    pillar1Title: { fr: 'Responsabilité environnementale', de: 'Umweltverantwortung', en: 'Environmental responsibility' },
    pillar2Title: { fr: 'Santé humaine', de: 'Menschliche Gesundheit', en: 'Human health' },
    pillar3Title: { fr: 'Conductivité thermique', de: 'Wärmeleitfähigkeit', en: 'Thermal conductivity' },
    
    // Collections
    collectionTitle: { fr: 'Explorer par style de pose', de: 'Nach Verlegemuster entdecken', en: 'Explore by laying style' },
    collectionSubtitle: { 
      fr: 'Lames classiques, bâton rompu, chevron ou point de Hongrie : trouvez votre style.',
      de: 'Klassische Dielen, Fischgrät, Chevron oder Ungarisch: Finden Sie Ihren Stil.',
      en: 'Classic planks, herringbone, chevron or Hungarian point: find your style.'
    },
    
    poseStyles: {
      lame: { fr: 'Lames', de: 'Dielen', en: 'Planks' },
      'baton-rompu': { fr: 'Bâton rompu', de: 'Fischgrät', en: 'Herringbone' },
      'chevron-45': { fr: 'Chevron 45°', de: 'Chevron 45°', en: 'Chevron 45°' },
      'chevron-60': { fr: 'Chevron 60°', de: 'Chevron 60°', en: 'Chevron 60°' },
      'point-hongrie': { fr: 'Point de Hongrie', de: 'Ungarisch', en: 'Hungarian' },
    },
    
    // Gammes
    gammesTitle: { fr: 'Nos gammes', de: 'Unsere Sortimente', en: 'Our ranges' },
    gammesSubtitle: { fr: 'Du plus épuré au plus authentique, choisissez le caractère qui vous ressemble.', de: 'Vom schlichtesten bis zum authentischsten, wählen Sie den Charakter, der zu Ihnen passt.', en: 'From the most refined to the most authentic, choose the character that suits you.' },
    
    // Why
    whyTitle: { fr: 'Pourquoi Natura ?', de: 'Warum Natura?', en: 'Why Natura?' },
    whyItems: [
      {
        icon: '🏭',
        title: { fr: 'Direct fabricant', de: 'Direkt vom Hersteller', en: 'Direct from factory' },
        desc: { fr: 'Partenaire exclusif Axemark Wood, fabricant polonais reconnu.', de: 'Exklusivpartner von Axemark Wood, renommierter polnischer Hersteller.', en: 'Exclusive partner of Axemark Wood, renowned Polish manufacturer.' }
      },
      {
        icon: '🌳',
        title: { fr: 'Chêne européen', de: 'Europäische Eiche', en: 'European oak' },
        desc: { fr: 'Bois certifié FSC, séchage lent, qualité premium garantie.', de: 'FSC-zertifiziertes Holz, langsame Trocknung, garantierte Premium-Qualität.', en: 'FSC certified wood, slow drying, guaranteed premium quality.' }
      },
      {
        icon: '💰',
        title: { fr: 'Prix justes', de: 'Faire Preise', en: 'Fair prices' },
        desc: { fr: 'Sans intermédiaire, vous économisez 30 à 40% vs revendeurs.', de: 'Ohne Zwischenhändler sparen Sie 30-40% im Vergleich zu Wiederverkäufern.', en: 'No middleman, save 30-40% vs resellers.' }
      },
      {
        icon: '🚚',
        title: { fr: 'Livraison incluse', de: 'Lieferung inklusive', en: 'Delivery included' },
        desc: { fr: 'Franco de port dès 50m², livraison en 2-4 semaines.', de: 'Frei Haus ab 50m², Lieferung in 2-4 Wochen.', en: 'Free shipping from 50m², delivery in 2-4 weeks.' }
      },
    ],
    
    // Best-sellers
    bestsellersTitle: { fr: '🔥 Nos meilleures ventes', de: '🔥 Unsere meistverkauften', en: '🔥 Our Best Sellers' },
    bestsellersSubtitle: { fr: 'Les parquets préférés de nos clients', de: 'Die Lieblingsparkette unserer Kunden', en: 'Our customers\' favorite parquets' },
    viewAll: { fr: 'Voir tous les parquets', de: 'Alle Parkette ansehen', en: 'View all parquets' },
    
    // CTA
    ctaTitle: { fr: 'Prêt à transformer votre intérieur ?', de: 'Bereit, Ihr Interieur zu verwandeln?', en: 'Ready to transform your interior?' },
    ctaSubtitle: { fr: 'Demandez un devis gratuit ou contactez-nous pour des conseils personnalisés.', de: 'Fordern Sie ein kostenloses Angebot an oder kontaktieren Sie uns für eine persönliche Beratung.', en: 'Request a free quote or contact us for personalized advice.' },
  };

  // Best-sellers
  const bestsellers = useMemo(() => {
    const bestsellerProducts = products.filter(p => p.badge === 'bestseller');
    const featuredNotBestseller = products.filter(p => p.featured && p.badge !== 'bestseller');
    return [...bestsellerProducts, ...featuredNotBestseller].slice(0, 4);
  }, []);
  
  // Products by pose style
  const poseStyles = ['lame', 'baton-rompu', 'chevron-45', 'chevron-60', 'point-hongrie'] as const;
  const productsByPose = useMemo(() => 
    poseStyles.map(pose => ({
      pose,
      count: products.filter(p => p.pose === pose).length,
      minPrice: Math.min(...products.filter(p => p.pose === pose).map(p => p.price.ttc)),
      image: products.find(p => p.pose === pose && p.badge === 'bestseller')?.images[0] 
        || products.find(p => p.pose === pose)?.images[0],
    })),
  []);
  
  // Gammes
  const gammes = ['Exclusive', 'Elegance', 'Rustic', 'Country'] as const;
  const gammeData = useMemo(() => 
    gammes.map(gamme => ({
      name: gamme,
      count: products.filter(p => p.gamme === gamme).length,
      minPrice: Math.min(...products.filter(p => p.gamme === gamme).map(p => p.price.ttc)),
    })),
  []);

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* ============================================
          HERO SECTION - Style Catalogue Bronze/Marron Luxe
          ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background dégradé bronze doré → marron comme le catalogue */}
        <div className="absolute inset-0">
          {/* Base gradient - bronze doré en haut, marron en bas */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#9C8568] via-[#8A7358] to-[#6D5847]" />
          {/* Légère vignette subtile */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(60,45,35,0.25)_100%)]" />
        </div>
        
        {/* Effet lames de parquet en bas - PLUS GRAND ET VISIBLE */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none overflow-hidden">
          {/* Lignes verticales plus marquées style cannelure */}
          <div 
            className="absolute inset-0"
            style={{
              background: `repeating-linear-gradient(
                to right,
                transparent,
                transparent 3px,
                rgba(60,45,35,0.5) 3px,
                rgba(60,45,35,0.5) 4px
              )`,
            }}
          />
          {/* Ombre pour effet relief */}
          <div 
            className="absolute inset-0"
            style={{
              background: `repeating-linear-gradient(
                to right,
                transparent,
                transparent 4px,
                rgba(40,30,22,0.25) 4px,
                rgba(40,30,22,0.25) 4.5px,
                transparent 4.5px,
                transparent 7px
              )`,
            }}
          />
        </div>

        {/* Content - Monté encore plus haut */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto -mt-32">
          {/* Tagline EN PREMIER - BEAUCOUP PLUS GROS ET VISIBLE */}
          <p className="text-[#D8C8B0] text-base md:text-lg lg:text-xl tracking-[0.4em] mb-8 font-sans font-normal uppercase">
            {labels.heroTagline[locale]}
          </p>
          
          {/* Main title - NATURA PARQUETS - plus grand */}
          <h1 className="text-white font-display text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-light tracking-[0.06em] leading-[1.1] whitespace-pre-line">
            {labels.heroTitle[locale]}
          </h1>
          
          {/* Slogan - italique élégant */}
          <p className="text-[#E8DCC8] font-display text-xl md:text-2xl lg:text-3xl italic font-light tracking-wide mt-10">
            {labels.heroSlogan[locale]}
          </p>
          
          {/* CTA Buttons - ARRONDI */}
          <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${locale}/produits`}
              className="inline-block px-10 py-3.5 border border-[#C8B8A0]/50 text-[#D8C8B0] text-sm tracking-[0.2em] hover:bg-[#C8B8A0]/10 hover:border-[#C8B8A0]/70 transition-all duration-300 font-light rounded-full"
            >
              natura-parquets.fr
            </Link>
            <a
              href="/Catalogue-NATURA-PARQUETS.pdf"
              download
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8B7355]/80 hover:bg-[#8B7355] text-white text-sm tracking-[0.15em] transition-all duration-300 font-light rounded-full"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {locale === 'fr' ? 'Télécharger le catalogue' : locale === 'de' ? 'Katalog herunterladen' : 'Download catalogue'}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-5 h-5 text-[#E8DCC8]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ============================================
          ABOUT SECTION - Style Axemark
          ============================================ */}
      <section className="py-20 px-6 bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto">
          {/* Header bar */}
          <div className="flex justify-between items-center pb-4 border-b border-[#D4C4B0]">
            <span className="text-[#6B5A4A] font-medium tracking-wide">NATURA PARQUETS</span>
            <span className="text-[#9C8570] text-sm">natura-parquets.fr</span>
          </div>
          
          <div className="mt-12 grid md:grid-cols-2 gap-12">
            {/* Left column - About text */}
            <div>
              <h2 className="text-3xl md:text-4xl text-[#6B5A4A] font-light mb-8">
                {labels.aboutTitle[locale]}
              </h2>
              
              <div className="space-y-4 text-[#4A4A4A] text-sm leading-relaxed">
                <p>
                  <span className="font-semibold">Natura Parquets</span> {labels.aboutText1[locale].replace('Natura Parquets ', '')}
                </p>
                <p>{labels.aboutText2[locale]}</p>
                <p>{labels.aboutText3[locale]}</p>
              </div>
            </div>
            
            {/* Right column - Engagements box */}
            <div className="bg-[#A69080] text-white p-8 rounded-lg">
              <h3 className="text-xl font-medium mb-4">{labels.engagementsTitle[locale]}</h3>
              <p className="text-white/90 text-sm leading-relaxed mb-6">
                {labels.engagementsText[locale]}
              </p>
              <div className="flex gap-6 text-sm">
                <span className="flex items-center gap-2">
                  <span className="text-lg">✓</span> {labels.fscCertified[locale]}
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-lg">✓</span> {labels.noFormaldehyde[locale]}
                </span>
              </div>
            </div>
          </div>
          
          {/* 3 Pillars */}
          <div className="mt-16 grid grid-cols-3 gap-6">
            {[
              { icon: '🌿', title: labels.pillar1Title },
              { icon: '❤️', title: labels.pillar2Title },
              { icon: '🔥', title: labels.pillar3Title },
            ].map((pillar, i) => (
              <div key={i} className="border border-[#D4C4B0] p-6 text-center">
                <div className="text-3xl mb-3">{pillar.icon}</div>
                <p className="text-[#6B5A4A] text-sm">{pillar.title[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          BEST SELLERS
          ============================================ */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#F5EFE6] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-[#6B5A4A] font-light">
              {labels.bestsellersTitle[locale]}
            </h2>
            <p className="mt-2 text-[#9C8570]">
              {labels.bestsellersSubtitle[locale]}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/produits`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#6B5A4A] text-white font-medium hover:bg-[#5A4A3A] transition-colors"
            >
              {labels.viewAll[locale]}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          STYLES DE POSE
          ============================================ */}
      <section className="py-20 px-6 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-[#6B5A4A] font-light">
              {labels.collectionTitle[locale]}
            </h2>
            <p className="mt-4 text-[#9C8570] max-w-2xl mx-auto">
              {labels.collectionSubtitle[locale]}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {productsByPose.map(({ pose, count, minPrice, image }) => (
              <Link
                key={pose}
                href={`/${locale}/produits?pose=${pose}`}
                className="group relative aspect-square overflow-hidden border border-[#D4C4B0] hover:border-[#6B5A4A] transition-colors"
              >
                <img
                  src={image || `${SUPABASE_STORAGE}/ambiance/gammes-teintes-05.jpg`}
                  alt={labels.poseStyles[pose][locale]}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#6B5A4A]/90 via-[#6B5A4A]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-medium text-lg">{labels.poseStyles[pose][locale]}</h3>
                  <p className="text-sm text-white/70">{count} {locale === 'fr' ? 'réf.' : 'ref.'}</p>
                  <p className="text-sm font-medium mt-1">
                    {locale === 'fr' ? 'Dès' : 'From'} {minPrice.toFixed(0)}€/m²
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          GAMMES
          ============================================ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-[#6B5A4A] font-light">
              {labels.gammesTitle[locale]}
            </h2>
            <p className="mt-4 text-[#9C8570] max-w-2xl mx-auto">
              {labels.gammesSubtitle[locale]}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {gammeData.map(({ name, count, minPrice }) => {
              const colors: Record<string, string> = {
                Exclusive: 'from-[#6B5A4A] to-[#5A4A3A]',
                Elegance: 'from-[#8B7355] to-[#7A6345]',
                Rustic: 'from-[#A69080] to-[#958070]',
                Country: 'from-[#B8A090] to-[#A89080]',
              };
              const descriptions: Record<string, Record<string, string>> = {
                Exclusive: { fr: 'Sans nœuds, épuré', de: 'Ohne Äste', en: 'No knots, refined' },
                Elegance: { fr: 'Petits nœuds discrets', de: 'Kleine Äste', en: 'Small knots' },
                Rustic: { fr: 'Caractère authentique', de: 'Authentisch', en: 'Authentic' },
                Country: { fr: 'Maximum de charme', de: 'Maximaler Charme', en: 'Maximum charm' },
              };
              return (
                <Link
                  key={name}
                  href={`/${locale}/produits?gamme=${name}`}
                  className={`group relative p-6 bg-gradient-to-br ${colors[name]} text-white hover:scale-[1.02] transition-transform`}
                >
                  <h3 className="text-2xl font-light">{name}</h3>
                  <p className="text-white/70 text-sm mt-1">{descriptions[name][locale]}</p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-sm">{count} {locale === 'fr' ? 'produits' : 'products'}</p>
                    <p className="text-lg font-medium">{locale === 'fr' ? 'Dès' : 'From'} {minPrice.toFixed(0)}€/m²</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          WHY NATURA
          ============================================ */}
      <section className="py-20 px-6 bg-[#F5EFE6]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-[#6B5A4A] font-light text-center mb-12">
            {labels.whyTitle[locale]}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {labels.whyItems.map((item, i) => (
              <div key={i} className="bg-white p-8 border border-[#D4C4B0]">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl text-[#6B5A4A] font-medium mb-2">
                  {item.title[locale]}
                </h3>
                <p className="text-[#7A7A7A] text-sm leading-relaxed">
                  {item.desc[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className="py-20 px-6 bg-[#6B5A4A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-white font-light mb-6">
            {labels.ctaTitle[locale]}
          </h2>
          <p className="text-white/80 text-lg mb-10">
            {labels.ctaSubtitle[locale]}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="px-8 py-4 bg-white text-[#6B5A4A] font-medium hover:bg-[#F5EFE6] transition-colors"
            >
              {labels.ctaContact[locale]}
            </Link>
            <Link
              href={`/${locale}/produits`}
              className="px-8 py-4 border border-white/50 text-white font-medium hover:bg-white/10 transition-colors"
            >
              {labels.ctaDiscover[locale]}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
