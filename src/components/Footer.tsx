import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-wood-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-500 rounded-lg flex items-center justify-center">
                <span className="text-xl">🌳</span>
              </div>
              <h3 className="text-xl font-bold font-serif">Natura Parquets</h3>
            </div>
            <p className="text-wood-200 mb-4 max-w-md">
              Spécialiste des parquets européens de haute qualité. 
              Nous sélectionnons les plus belles essences de bois pour sublimer vos intérieurs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-wood-700 rounded-full flex items-center justify-center hover:bg-gold-400 transition-colors">
                <span>📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-wood-700 rounded-full flex items-center justify-center hover:bg-gold-400 transition-colors">
                <span>📸</span>
              </a>
              <a href="#" className="w-10 h-10 bg-wood-700 rounded-full flex items-center justify-center hover:bg-gold-400 transition-colors">
                <span>🔗</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold-400">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-wood-200 hover:text-gold-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="text-wood-200 hover:text-gold-400 transition-colors">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="/devis" className="text-wood-200 hover:text-gold-400 transition-colors">
                  Demander un devis
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-wood-200 hover:text-gold-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold-400">Contact</h4>
            <ul className="space-y-3 text-wood-200">
              <li className="flex items-center space-x-2">
                <span>📍</span>
                <span>6 rue du Commerce<br />68420 Herrlisheim-près-Colmar</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📞</span>
                <a href="tel:+33604440903" className="hover:text-gold-400 transition-colors">
                  06 04 44 09 03
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span>✉️</span>
                <a href="mailto:contact@natura-parquets.fr" className="hover:text-gold-400 transition-colors">
                  contact@natura-parquets.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-wood-700 mt-8 pt-8 text-center text-wood-300">
          <p>&copy; {new Date().getFullYear()} Natura Parquets. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
