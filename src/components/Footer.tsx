import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-amber-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg flex items-center justify-center">
                <span className="text-xl">🌳</span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif">Natura Parquets®</h3>
                <p className="text-xs text-amber-300">Marque déposée - Groupe Epenon</p>
              </div>
            </div>
            <p className="text-amber-200 mb-4 max-w-md">
              Parquets contrecollés de qualité supérieure. Couche d'usure en chêne 3,5 mm, 
              fabrication européenne responsable, certifié FSC.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-amber-300">
              <span className="bg-amber-900 px-2 py-1 rounded">🌿 FSC Certifié</span>
              <span className="bg-amber-900 px-2 py-1 rounded">🔥 Sans formaldéhyde</span>
              <span className="bg-amber-900 px-2 py-1 rounded">🏠 Chauffage sol</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-amber-200 hover:text-amber-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="text-amber-200 hover:text-amber-400 transition-colors">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="/devis" className="text-amber-200 hover:text-amber-400 transition-colors">
                  Demander un devis
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-amber-200 hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-amber-200 hover:text-amber-400 transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="text-amber-200 hover:text-amber-400 transition-colors">
                  CGV
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">Contact</h4>
            <ul className="space-y-3 text-amber-200">
              <li className="flex items-start space-x-2">
                <span>📍</span>
                <span>6 rue du Commerce<br />68420 Herrlisheim-près-Colmar</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📞</span>
                <a href="tel:+33612786185" className="hover:text-amber-400 transition-colors">
                  06 12 78 61 85
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span>✉️</span>
                <a href="mailto:contact@natura-parquets.fr" className="hover:text-amber-400 transition-colors">
                  contact@natura-parquets.fr
                </a>
              </li>
            </ul>
            <div className="mt-4 text-xs text-amber-400">
              <p>Responsable : Erwin N.</p>
            </div>
          </div>
        </div>

        {/* Bottom - Legal */}
        <div className="border-t border-amber-800 mt-8 pt-8 text-center text-amber-400 text-sm">
          <p className="mb-2">&copy; {new Date().getFullYear()} Natura Parquets® - Marque déposée</p>
          <p className="text-xs text-amber-500">
            EPENON SARL • SIREN 881 601 207 • TVA FR81881601207 • RCS Colmar • Capital 1 000 €
          </p>
        </div>
      </div>
    </footer>
  );
}
