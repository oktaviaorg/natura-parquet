import Link from 'next/link';

// Couleurs pour les swatches
const colors11mm = [
  { name: 'Neutral', hex: '#C4B7A6' },
  { name: 'Honey', hex: '#D4A855' },
  { name: 'Crema', hex: '#E8DCC8' },
  { name: 'Nugat', hex: '#A67C52' },
  { name: 'Raw Wood', hex: '#BFA980' },
  { name: 'Nugat Dark', hex: '#7D5A3C' },
  { name: 'Amber', hex: '#C98B4A' },
  { name: 'Fumé', hex: '#5C4A3D' },
];

const gammes = [
  {
    name: 'Bâton Rompu',
    subtitle: 'Chevron',
    description: 'Élégance intemporelle du motif en chevron',
    icon: '◢◣',
  },
  {
    name: 'Lames de Parquet',
    subtitle: 'Classique',
    description: 'La beauté traditionnelle des lames droites',
    icon: '▬▬▬',
  },
  {
    name: 'Point de Hongrie',
    subtitle: 'Sophistiqué',
    description: 'Un motif noble aux lignes harmonieuses',
    icon: '◤◥',
  },
  {
    name: 'Collection Premium',
    subtitle: '14mm',
    description: 'Notre sélection haut de gamme',
    icon: '★',
  },
];

const certifications = [
  { name: 'FSC Certifié', icon: '🌲', description: 'Bois issu de forêts gérées durablement' },
  { name: 'Sans formaldéhyde', icon: '🍃', description: 'Respect de la qualité de l\'air intérieur' },
  { name: 'Responsabilité environnementale', icon: '🌍', description: 'Production éco-responsable en Europe' },
  { name: 'Santé humaine', icon: '❤️', description: 'Matériaux sains et naturels' },
  { name: 'Compatible chauffage sol', icon: '🔥', description: 'Adapté aux systèmes de chauffage au sol' },
];

export default function HomePage() {
  return (
    <div className="bg-cream-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/natura-parquets/ambiance/ambiance-parquet-salon.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-natura-text/70 via-natura-primary/50 to-natura-text/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-wide">
              NATURA
            </h1>
            <p className="text-gold-400 text-xl md:text-2xl tracking-[0.5em] uppercase mt-2">
              Parquets
            </p>
          </div>
          
          {/* Subtitle */}
          <p className="text-cream-200 text-lg md:text-xl tracking-wider uppercase mb-4">
            Revêtement de sol en bois
          </p>
          
          {/* Slogan */}
          <h2 className="font-serif text-2xl md:text-4xl text-white italic mb-12 max-w-3xl mx-auto leading-relaxed">
            "La force dans chaque couche de bois"
          </h2>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-16 h-px bg-gold-400"></div>
            <div className="w-3 h-3 rotate-45 border border-gold-400"></div>
            <div className="w-16 h-px bg-gold-400"></div>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/catalogue" 
              className="inline-block bg-gold-400 hover:bg-gold-500 text-natura-text font-semibold px-8 py-4 text-lg tracking-wide transition-all duration-300 hover:shadow-xl"
            >
              Découvrir nos parquets
            </Link>
            <Link 
              href="/devis" 
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-natura-primary font-semibold px-8 py-4 text-lg tracking-wide transition-all duration-300"
            >
              Demander un devis
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* À propos Section */}
      <section className="py-24 bg-cream-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-natura-primary mb-6">
              L'Excellence du Parquet Européen
            </h2>
            <div className="w-24 h-1 bg-gold-400 mx-auto mb-8"></div>
            <p className="text-natura-secondary text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Natura Parquets propose des parquets contrecollés de qualité supérieure, 
              dotés d'une couche d'usure en chêne de 3,5 mm, fabriqués de manière responsable en Europe.
            </p>
          </div>
          
          {/* Certifications badges */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-16">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300 border border-cream-200"
              >
                <div className="text-4xl mb-4">{cert.icon}</div>
                <h3 className="font-semibold text-natura-primary text-sm mb-2">{cert.name}</h3>
                <p className="text-natura-secondary text-xs leading-relaxed">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structure Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-natura-primary mb-6">
              Structure & Qualité
            </h2>
            <div className="w-24 h-1 bg-gold-400 mx-auto mb-8"></div>
            <p className="text-natura-secondary text-lg max-w-2xl mx-auto">
              Une construction multicouche pour une stabilité et une durabilité exceptionnelles
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* 2 plis */}
            <div className="bg-cream-100 rounded-xl p-8 border border-cream-200 hover:border-gold-400 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-natura-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-serif text-2xl">2</span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-natura-primary">Parquet 2 Plis</h3>
                  <p className="text-gold-500 font-semibold">11mm d'épaisseur</p>
                </div>
              </div>
              
              {/* Structure visualization */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-full h-10 bg-gradient-to-r from-amber-600 to-amber-500 rounded flex items-center justify-center text-white font-medium shadow-inner">
                    Chêne — 3,5 mm
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-full h-16 bg-gradient-to-r from-amber-200 to-amber-100 rounded flex items-center justify-center text-natura-primary font-medium border border-amber-300">
                    Pin — 7,5 mm
                  </div>
                </div>
              </div>
              
              <p className="text-natura-secondary text-sm">
                Idéal pour la rénovation et les espaces de vie. Épaisseur optimale pour une pose flottante ou collée.
              </p>
            </div>

            {/* 3 plis */}
            <div className="bg-cream-100 rounded-xl p-8 border border-cream-200 hover:border-gold-400 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-natura-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-serif text-2xl">3</span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-natura-primary">Parquet 3 Plis</h3>
                  <p className="text-gold-500 font-semibold">14mm d'épaisseur</p>
                </div>
              </div>
              
              {/* Structure visualization */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-full h-10 bg-gradient-to-r from-amber-600 to-amber-500 rounded flex items-center justify-center text-white font-medium shadow-inner">
                    Chêne — 3,5 mm
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-full h-14 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded flex items-center justify-center text-natura-primary font-medium border border-yellow-200">
                    Sapin — 8 mm
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-full h-6 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded flex items-center justify-center text-natura-primary text-sm font-medium border border-yellow-200">
                    Sapin — 2,5 mm
                  </div>
                </div>
              </div>
              
              <p className="text-natura-secondary text-sm">
                Construction premium pour une stabilité maximale. Parfait pour les grandes surfaces et le chauffage au sol.
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="mt-16 bg-natura-primary rounded-xl p-8 text-white">
            <h3 className="font-serif text-2xl mb-6 text-center">Options disponibles</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-gold-400 text-2xl mb-2">✨</div>
                <p className="font-medium">Finitions variées</p>
                <p className="text-sm text-white/70">Huilé, verni, naturel</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-gold-400 text-2xl mb-2">〰️</div>
                <p className="font-medium">Surface brossée</p>
                <p className="text-sm text-white/70">Texture authentique</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-gold-400 text-2xl mb-2">▭</div>
                <p className="font-medium">Chanfreins</p>
                <p className="text-sm text-white/70">4 côtés biseautés</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-gold-400 text-2xl mb-2">🔗</div>
                <p className="font-medium">Assemblage 5G</p>
                <p className="text-sm text-white/70">Clic facile</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Gammes Section */}
      <section className="py-24 bg-cream-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-natura-primary mb-6">
              Nos Gammes
            </h2>
            <div className="w-24 h-1 bg-gold-400 mx-auto mb-8"></div>
            <p className="text-natura-secondary text-lg max-w-2xl mx-auto">
              Des collections pensées pour tous les styles d'intérieur
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gammes.map((gamme, index) => (
              <Link 
                key={index}
                href={`/catalogue?gamme=${encodeURIComponent(gamme.name)}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-cream-200 hover:border-gold-400"
              >
                {/* Visual pattern */}
                <div className="h-40 bg-gradient-to-br from-natura-primary to-natura-secondary flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)`,
                    }}></div>
                  </div>
                  <span className="text-white text-5xl font-light opacity-80 group-hover:scale-110 transition-transform duration-300">
                    {gamme.icon}
                  </span>
                </div>
                
                <div className="p-6">
                  <h3 className="font-serif text-xl text-natura-primary mb-1 group-hover:text-gold-500 transition-colors">
                    {gamme.name}
                  </h3>
                  <p className="text-gold-500 text-sm font-medium mb-3">{gamme.subtitle}</p>
                  <p className="text-natura-secondary text-sm">{gamme.description}</p>
                  
                  <div className="mt-4 flex items-center text-natura-primary group-hover:text-gold-500 transition-colors">
                    <span className="text-sm font-medium">Découvrir</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Couleurs Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-natura-primary mb-6">
              Nos Teintes
            </h2>
            <div className="w-24 h-1 bg-gold-400 mx-auto mb-8"></div>
            <p className="text-natura-secondary text-lg max-w-2xl mx-auto">
              8 couleurs soigneusement sélectionnées pour la gamme 11mm
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {colors11mm.map((color, index) => (
              <div 
                key={index}
                className="group cursor-pointer"
              >
                <div 
                  className="aspect-square rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-4 border-white"
                  style={{ backgroundColor: color.hex }}
                >
                  {/* Wood grain overlay */}
                  <div className="w-full h-full rounded-lg opacity-30" style={{
                    backgroundImage: `repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 2px,
                      rgba(0,0,0,.05) 2px,
                      rgba(0,0,0,.05) 4px
                    )`,
                  }}></div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-natura-primary group-hover:text-gold-500 transition-colors">
                    {color.name}
                  </h3>
                  <p className="text-sm text-natura-secondary">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/catalogue"
              className="inline-block bg-natura-primary hover:bg-natura-secondary text-white font-semibold px-8 py-4 rounded-lg text-lg tracking-wide transition-all duration-300 hover:shadow-xl"
            >
              Voir tous les coloris disponibles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-natura-primary via-natura-secondary to-natura-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
            Prêt à sublimer votre intérieur ?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Nos experts vous accompagnent dans le choix de votre parquet idéal. 
            Devis gratuit et sans engagement sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/devis" 
              className="inline-block bg-gold-400 hover:bg-gold-500 text-natura-text font-semibold px-10 py-4 text-lg tracking-wide transition-all duration-300 hover:shadow-xl"
            >
              Demander un devis gratuit
            </Link>
            <Link 
              href="/contact" 
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-natura-primary font-semibold px-10 py-4 text-lg tracking-wide transition-all duration-300"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-natura-text text-cream-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="font-serif text-3xl text-white mb-2">NATURA</h3>
              <p className="text-gold-400 tracking-[0.3em] text-sm uppercase mb-4">Parquets</p>
              <p className="text-cream-300 leading-relaxed">
                Parquets contrecollés premium, fabriqués avec passion en Europe. 
                La force dans chaque couche de bois.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif text-xl text-white mb-4">Contact</h4>
              <div className="space-y-3 text-cream-300">
                <p className="flex items-center gap-3">
                  <span className="text-gold-400">📍</span>
                  6 rue du Commerce, 68420 Herrlisheim-près-Colmar
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-gold-400">📞</span>
                  <a href="tel:+33604440903" className="hover:text-gold-400 transition-colors">
                    06 04 44 09 03
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-gold-400">✉️</span>
                  <a href="mailto:contact@natura-parquets.fr" className="hover:text-gold-400 transition-colors">
                    contact@natura-parquets.fr
                  </a>
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-serif text-xl text-white mb-4">Navigation</h4>
              <div className="space-y-2">
                <Link href="/catalogue" className="block text-cream-300 hover:text-gold-400 transition-colors">
                  Catalogue
                </Link>
                <Link href="/devis" className="block text-cream-300 hover:text-gold-400 transition-colors">
                  Demander un devis
                </Link>
                <Link href="/contact" className="block text-cream-300 hover:text-gold-400 transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-cream-500/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream-400 text-sm">
              © {new Date().getFullYear()} Natura Parquets. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-cream-400 text-sm">🌲 FSC Certifié</span>
              <span className="text-cream-400 text-sm">🇪🇺 Made in Europe</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
