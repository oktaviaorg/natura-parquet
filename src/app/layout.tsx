import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Natura Parquets - Parquets Premium Européens",
  description: "Découvrez notre collection de parquets contrecollés européens de haute qualité. Chêne 3,5mm, fabrication responsable en Europe.",
  keywords: "parquet, parquet chêne, parquet premium, parquet européen, parquet contrecollé, revêtement sol bois",
  openGraph: {
    title: "Natura Parquets - La force dans chaque couche de bois",
    description: "Collection exclusive de parquets contrecollés européens haut de gamme. FSC certifié, sans formaldéhyde.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
