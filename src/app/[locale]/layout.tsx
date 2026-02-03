import { Inter, Playfair_Display } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  title: 'Natura Parquet - L\'authenticité du bois européen',
  description: 'Parquets premium européens - Chêne & Frêne de qualité supérieure. Distribution France, Allemagne, Belgique, Suisse.',
  keywords: 'parquet, parquet chêne, parquet frêne, parquet premium, parquet européen, parquet contrecollé, parquet massif',
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
    <html lang={locale} className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
