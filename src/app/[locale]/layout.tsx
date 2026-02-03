import { Inter, Playfair_Display } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
});

export const metadata = {
  title: 'Natura Parquet - L\'authenticité du bois européen',
  description: 'Parquets premium européens - Chêne & Frêne de qualité supérieure. Distribution France, Allemagne, Belgique, Suisse.',
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  const locales = ['fr', 'de', 'en'];
  if (!locales.includes(locale)) notFound();

  // Load messages
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <NextIntlClientProvider messages={messages}>
          {/* Language Switcher */}
          <nav className="fixed top-0 right-0 z-50 p-4">
            <div className="flex gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <a href="/fr" className={`px-2 py-1 rounded ${locale === 'fr' ? 'bg-natura-900 text-white' : 'hover:bg-natura-100'}`}>FR</a>
              <a href="/de" className={`px-2 py-1 rounded ${locale === 'de' ? 'bg-natura-900 text-white' : 'hover:bg-natura-100'}`}>DE</a>
              <a href="/en" className={`px-2 py-1 rounded ${locale === 'en' ? 'bg-natura-900 text-white' : 'hover:bg-natura-100'}`}>EN</a>
            </div>
          </nav>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
