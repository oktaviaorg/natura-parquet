import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-main.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl font-light mb-6 tracking-wide">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl font-light mb-12 opacity-90">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/produits"
              className="px-8 py-4 bg-white text-natura-900 font-medium hover:bg-natura-100 transition-colors"
            >
              {t('hero.cta_products')}
            </Link>
            <Link 
              href="/catalogue"
              className="px-8 py-4 border-2 border-white text-white font-medium hover:bg-white hover:text-natura-900 transition-colors"
            >
              {t('hero.cta_catalog')}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 px-4 bg-natura-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-center text-natura-900 mb-4">
            {t('nav.products')}
          </h2>
          <p className="text-center text-natura-600 mb-16 text-lg">
            {t('brand.description')}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Engineered */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden bg-natura-200 mb-6">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: "url('/images/engineered-main.jpg')" }}
                />
              </div>
              <h3 className="font-display text-2xl text-natura-900 mb-2">
                {t('products.engineered.name')}
              </h3>
              <p className="text-natura-600">
                {t('products.engineered.tagline')}
              </p>
            </div>

            {/* Solid */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden bg-natura-200 mb-6">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: "url('/images/solid-main.jpg')" }}
                />
              </div>
              <h3 className="font-display text-2xl text-natura-900 mb-2">
                {t('products.solid.name')}
              </h3>
              <p className="text-natura-600">
                {t('products.solid.tagline')}
              </p>
            </div>

            {/* Industrial */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden bg-natura-200 mb-6">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: "url('/images/industrial-main.jpg')" }}
                />
              </div>
              <h3 className="font-display text-2xl text-natura-900 mb-2">
                {t('products.industrial.name')}
              </h3>
              <p className="text-natura-600">
                {t('products.industrial.tagline')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-center text-natura-900 mb-4">
            {t('collections.title')}
          </h2>
          <p className="text-center text-natura-600 mb-16 text-lg">
            {t('collections.subtitle')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['kashmir', 'raw', 'julia', 'brown', 'nude', 'natural-oil'].map((collection) => (
              <div key={collection} className="group cursor-pointer text-center">
                <div className="aspect-square overflow-hidden bg-natura-100 mb-4 rounded-lg">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url('/images/collections/${collection}.jpg')` }}
                  />
                </div>
                <h4 className="font-medium text-natura-900 capitalize">
                  {collection.replace('-', ' ')}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTA Section */}
      <section className="py-24 px-4 bg-natura-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            {t('partners.title')}
          </h2>
          <p className="text-xl opacity-90 mb-12">
            {t('partners.subtitle')}
          </p>
          <Link 
            href="/devenir-partenaire"
            className="inline-block px-10 py-4 bg-white text-natura-900 font-medium hover:bg-natura-100 transition-colors"
          >
            {t('partners.cta')}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-natura-950 text-natura-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="font-display text-2xl text-white mb-4">Natura Parquet</h3>
              <p className="opacity-80">
                {t('footer.description')}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">{t('nav.products')}</h4>
              <ul className="space-y-2 opacity-80">
                <li><Link href="/produits/parquet-contrecolle" className="hover:text-white transition-colors">Parquet Contrecollé</Link></li>
                <li><Link href="/produits/parquet-massif" className="hover:text-white transition-colors">Parquet Massif</Link></li>
                <li><Link href="/produits/parquet-industriel" className="hover:text-white transition-colors">Parquet Industriel</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">{t('nav.contact')}</h4>
              <ul className="space-y-2 opacity-80">
                <li>contact@natura-parquets.fr</li>
                <li>Alsace, France</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-natura-800 pt-8 text-center opacity-60">
            {t('footer.copyright')}
          </div>
        </div>
      </footer>
    </main>
  );
}
