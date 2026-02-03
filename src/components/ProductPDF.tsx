'use client';

import { jsPDF } from 'jspdf';

interface ProductData {
  name: string;
  category: string;
  description: string;
  wood: string;
  grade: string;
  finish: string;
  width: number;
  length: number;
  thickness: number;
  features: string[];
}

interface Translations {
  title: string;
  technicalSheet: string;
  description: string;
  specifications: string;
  wood: string;
  grade: string;
  finish: string;
  dimensions: string;
  width: string;
  length: string;
  thickness: string;
  features: string;
  contact: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  generatedOn: string;
}

const translations: Record<string, Translations> = {
  fr: {
    title: 'FICHE TECHNIQUE',
    technicalSheet: 'Fiche Produit',
    description: 'Description',
    specifications: 'Caractéristiques techniques',
    wood: 'Essence',
    grade: 'Sélection',
    finish: 'Finition',
    dimensions: 'Dimensions',
    width: 'Largeur',
    length: 'Longueur',
    thickness: 'Épaisseur',
    features: 'Caractéristiques',
    contact: 'Contact',
    phone: 'Tél',
    email: 'Email',
    website: 'Web',
    address: 'Alsace, France',
    generatedOn: 'Document généré le',
  },
  de: {
    title: 'TECHNISCHES DATENBLATT',
    technicalSheet: 'Produktdatenblatt',
    description: 'Beschreibung',
    specifications: 'Technische Daten',
    wood: 'Holzart',
    grade: 'Sortierung',
    finish: 'Oberfläche',
    dimensions: 'Abmessungen',
    width: 'Breite',
    length: 'Länge',
    thickness: 'Stärke',
    features: 'Eigenschaften',
    contact: 'Kontakt',
    phone: 'Tel',
    email: 'E-Mail',
    website: 'Web',
    address: 'Elsass, Frankreich',
    generatedOn: 'Dokument erstellt am',
  },
  en: {
    title: 'TECHNICAL DATA SHEET',
    technicalSheet: 'Product Sheet',
    description: 'Description',
    specifications: 'Technical Specifications',
    wood: 'Wood Species',
    grade: 'Grade',
    finish: 'Finish',
    dimensions: 'Dimensions',
    width: 'Width',
    length: 'Length',
    thickness: 'Thickness',
    features: 'Features',
    contact: 'Contact',
    phone: 'Phone',
    email: 'Email',
    website: 'Web',
    address: 'Alsace, France',
    generatedOn: 'Document generated on',
  },
};

const categoryNames: Record<string, Record<string, string>> = {
  fr: { engineered: 'Parquet Contrecollé', solid: 'Parquet Massif', industrial: 'Parquet Industriel' },
  de: { engineered: 'Mehrschichtparkett', solid: 'Massivparkett', industrial: 'Industrieparkett' },
  en: { engineered: 'Engineered Flooring', solid: 'Solid Parquet', industrial: 'Industrial Parquet' },
};

export function generateProductPDF(product: ProductData, locale: string = 'fr') {
  const t = translations[locale] || translations.fr;
  const catNames = categoryNames[locale] || categoryNames.fr;
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let y = margin;

  // Header background
  doc.setFillColor(74, 63, 51); // natura-900
  doc.rect(0, 0, pageWidth, 45, 'F');

  // Logo/Brand
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('NATURA PARQUET', margin, 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text("L'authenticité du bois européen", margin, 28);

  // Document type
  doc.setFontSize(12);
  doc.text(t.title, pageWidth - margin, 20, { align: 'right' });

  y = 55;

  // Product name
  doc.setTextColor(74, 63, 51);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(product.name, margin, y);
  y += 8;

  // Category badge
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(146, 130, 89); // natura-500
  doc.text(catNames[product.category] || product.category, margin, y);
  y += 15;

  // Description section
  doc.setFillColor(246, 245, 240); // natura-50
  doc.rect(margin, y - 5, contentWidth, 35, 'F');
  
  doc.setTextColor(74, 63, 51);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(t.description, margin + 5, y + 3);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(86, 72, 56); // natura-800
  
  const descLines = doc.splitTextToSize(product.description, contentWidth - 10);
  doc.text(descLines, margin + 5, y + 12);
  y += 40;

  // Specifications section
  doc.setTextColor(74, 63, 51);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(t.specifications, margin, y);
  y += 10;

  // Specs table
  const specs = [
    [t.wood, product.wood],
    [t.grade, product.grade],
    [t.finish, product.finish],
  ];

  doc.setFontSize(10);
  specs.forEach((spec, i) => {
    const rowY = y + i * 10;
    if (i % 2 === 0) {
      doc.setFillColor(246, 245, 240);
      doc.rect(margin, rowY - 4, contentWidth, 10, 'F');
    }
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(74, 63, 51);
    doc.text(spec[0], margin + 5, rowY + 2);
    doc.setFont('helvetica', 'normal');
    doc.text(spec[1], margin + 60, rowY + 2);
  });
  y += 35;

  // Dimensions section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(74, 63, 51);
  doc.text(t.dimensions, margin, y);
  y += 10;

  const dims = [
    [t.width, `${product.width} mm`],
    [t.length, `${product.length} mm`],
    [t.thickness, `${product.thickness} mm`],
  ];

  doc.setFontSize(10);
  dims.forEach((dim, i) => {
    const rowY = y + i * 10;
    if (i % 2 === 0) {
      doc.setFillColor(246, 245, 240);
      doc.rect(margin, rowY - 4, contentWidth, 10, 'F');
    }
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(74, 63, 51);
    doc.text(dim[0], margin + 5, rowY + 2);
    doc.setFont('helvetica', 'normal');
    doc.text(dim[1], margin + 60, rowY + 2);
  });
  y += 40;

  // Features section
  if (product.features && product.features.length > 0) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(74, 63, 51);
    doc.text(t.features, margin, y);
    y += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    product.features.forEach((feature, i) => {
      doc.text(`• ${feature}`, margin + 5, y + i * 7);
    });
    y += product.features.length * 7 + 10;
  }

  // Footer with contact info
  const footerY = 260;
  doc.setFillColor(74, 63, 51);
  doc.rect(0, footerY, pageWidth, 37, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(t.contact, margin, footerY + 10);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`${t.email}: contact@natura-parquets.fr`, margin, footerY + 18);
  doc.text(`${t.website}: www.natura-parquets.fr`, margin, footerY + 24);
  doc.text(t.address, margin, footerY + 30);

  // Date
  const today = new Date().toLocaleDateString(locale === 'de' ? 'de-DE' : locale === 'en' ? 'en-GB' : 'fr-FR');
  doc.setFontSize(8);
  doc.text(`${t.generatedOn} ${today}`, pageWidth - margin, footerY + 30, { align: 'right' });

  // Save
  const filename = `natura-parquet-${product.name.toLowerCase().replace(/\s+/g, '-')}-${locale}.pdf`;
  doc.save(filename);
}

export default function DownloadPDFButton({ 
  product, 
  locale,
  className = ''
}: { 
  product: ProductData; 
  locale: string;
  className?: string;
}) {
  const labels: Record<string, string> = {
    fr: 'Télécharger la fiche PDF',
    de: 'PDF-Datenblatt herunterladen',
    en: 'Download PDF datasheet',
  };

  return (
    <button
      onClick={() => generateProductPDF(product, locale)}
      className={`inline-flex items-center gap-2 px-6 py-3 border-2 border-natura-900 text-natura-900 font-medium hover:bg-natura-900 hover:text-white transition-colors ${className}`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {labels[locale] || labels.fr}
    </button>
  );
}
