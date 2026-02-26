'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { products, type Product } from '@/data/products';

export default function CataloguePage() {
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const labels = {
    title: { fr: 'Catalogue PDF', de: 'PDF-Katalog', en: 'PDF Catalog' },
    subtitle: { fr: 'Téléchargez notre catalogue complet avec tous nos parquets, dimensions et tarifs.', de: 'Laden Sie unseren vollständigen Katalog herunter.', en: 'Download our complete catalog with all parquets, dimensions and prices.' },
    download: { fr: 'Télécharger le catalogue', de: 'Katalog herunterladen', en: 'Download catalog' },
    generating: { fr: 'Génération en cours...', de: 'Wird generiert...', en: 'Generating...' },
    products: { fr: 'produits', de: 'Produkte', en: 'products' },
    included: { fr: 'Ce catalogue inclut', de: 'Dieser Katalog enthält', en: 'This catalog includes' },
    allProducts: { fr: 'Tous nos parquets', de: 'Alle unsere Parkette', en: 'All our parquets' },
    dimensions: { fr: 'Dimensions détaillées', de: 'Detaillierte Abmessungen', en: 'Detailed dimensions' },
    prices: { fr: 'Tarifs TTC actualisés', de: 'Aktuelle Preise inkl. MwSt.', en: 'Updated prices incl. VAT' },
    finishes: { fr: 'Finitions disponibles', de: 'Verfügbare Oberflächen', en: 'Available finishes' },
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    setProgress(0);

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;

    // Palette carton/kraft premium - Marron velouté
    const kraft = [210, 180, 140];           // #D2B48C - Fond kraft/carton
    const kraftLight = [235, 220, 195];      // #EBDCC3 - Kraft clair
    const velvet = [101, 67, 33];            // #654321 - Marron velouté foncé
    const velvetMid = [139, 90, 43];         // #8B5A2B - Marron velouté moyen
    const velvetLight = [160, 120, 80];      // #A07850 - Marron velouté clair
    const espresso = [59, 36, 20];           // #3B2414 - Espresso profond
    const cream = [250, 240, 225];           // #FAF0E1 - Crème papier
    const gold = [180, 140, 70];             // #B48C46 - Or antique
    const white = [255, 255, 255];
    
    // Aliases pour le code existant
    const chocolatDark = espresso;
    const chocolatMid = velvet;
    const chocolatLight = velvetLight;

    // ===== PAGE DE COUVERTURE - Style Carton Premium =====
    setProgress(5);

    // Fond kraft/carton
    doc.setFillColor(kraft[0], kraft[1], kraft[2]);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Bordure décorative double
    doc.setDrawColor(velvet[0], velvet[1], velvet[2]);
    doc.setLineWidth(2);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');
    doc.setLineWidth(0.5);
    doc.rect(15, 15, pageWidth - 30, pageHeight - 30, 'S');

    // Coins décoratifs (petits carrés)
    doc.setFillColor(velvet[0], velvet[1], velvet[2]);
    [15, pageWidth - 19].forEach(x => {
      [15, pageHeight - 19].forEach(yPos => {
        doc.rect(x, yPos, 4, 4, 'F');
      });
    });

    // En-tête avec style vintage
    doc.setTextColor(velvet[0], velvet[1], velvet[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('— COLLECTION 2026 —', pageWidth / 2, 45, { align: 'center' });

    // Ligne décorative avec ornements
    doc.setDrawColor(velvetMid[0], velvetMid[1], velvetMid[2]);
    doc.setLineWidth(0.8);
    doc.line(50, 55, pageWidth - 50, 55);
    doc.circle(50, 55, 2, 'F');
    doc.circle(pageWidth - 50, 55, 2, 'F');

    // Logo principal - Style élégant
    doc.setTextColor(espresso[0], espresso[1], espresso[2]);
    doc.setFontSize(56);
    doc.setFont('helvetica', 'bold');
    doc.text('NATURA', pageWidth / 2, 85, { align: 'center' });
    
    doc.setFontSize(22);
    doc.setFont('helvetica', 'normal');
    doc.text('P  A  R  Q  U  E  T  S', pageWidth / 2, 100, { align: 'center' });

    // Ligne décorative sous le titre
    doc.setLineWidth(0.5);
    doc.line(60, 110, pageWidth - 60, 110);

    // Sous-titre élégant
    doc.setFontSize(11);
    doc.setTextColor(velvetMid[0], velvetMid[1], velvetMid[2]);
    doc.text('L\'authenticité du chêne européen', pageWidth / 2, 125, { align: 'center' });

    // Zone centrale - Cadre carton avec effet embossé
    doc.setFillColor(kraftLight[0], kraftLight[1], kraftLight[2]);
    doc.roundedRect(25, 140, pageWidth - 50, 90, 5, 5, 'F');
    doc.setDrawColor(velvet[0], velvet[1], velvet[2]);
    doc.setLineWidth(1);
    doc.roundedRect(25, 140, pageWidth - 50, 90, 5, 5, 'S');

    // Titre du bloc central
    doc.setTextColor(espresso[0], espresso[1], espresso[2]);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('CATALOGUE PROFESSIONNEL', pageWidth / 2, 158, { align: 'center' });
    
    // Ligne sous le titre
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(0.5);
    doc.line(pageWidth / 2 - 35, 163, pageWidth / 2 + 35, 163);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(velvet[0], velvet[1], velvet[2]);
    
    const features = [
      `✦  ${products.length} références disponibles`,
      '✦  Gammes : Exclusive • Elegance • Rustic • Country',
      '✦  Poses : Lames • Bâton rompu • Chevron • Point de Hongrie',
      '✦  Finitions : Brut • Verni • Huilé • Huile blanche',
    ];
    
    let y = 178;
    features.forEach(f => {
      doc.text(f, pageWidth / 2, y, { align: 'center' });
      y += 10;
    });

    // Badge qualité
    doc.setFillColor(velvet[0], velvet[1], velvet[2]);
    doc.circle(pageWidth / 2, 250, 18, 'F');
    doc.setTextColor(kraft[0], kraft[1], kraft[2]);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('QUALITÉ', pageWidth / 2, 248, { align: 'center' });
    doc.text('PREMIUM', pageWidth / 2, 254, { align: 'center' });

    // Contact en bas - style carton
    doc.setFillColor(velvet[0], velvet[1], velvet[2]);
    doc.rect(25, pageHeight - 50, pageWidth - 50, 35, 'F');
    
    doc.setTextColor(kraft[0], kraft[1], kraft[2]);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('CONTACT', pageWidth / 2, pageHeight - 38, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('www.natura-parquets.fr  •  contact@natura-parquets.fr  •  06 12 78 61 85', pageWidth / 2, pageHeight - 28, { align: 'center' });

    // Filet or en bas
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(1.5);
    doc.line(25, pageHeight - 12, pageWidth - 25, pageHeight - 12);

    // ===== PAGE SOMMAIRE - Style Carton =====
    doc.addPage();
    setProgress(10);

    // Fond kraft
    doc.setFillColor(kraftLight[0], kraftLight[1], kraftLight[2]);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header avec style carton
    doc.setFillColor(velvet[0], velvet[1], velvet[2]);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(1);
    doc.line(0, 40, pageWidth, 40);

    doc.setTextColor(kraft[0], kraft[1], kraft[2]);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('SOMMAIRE', pageWidth / 2, 26, { align: 'center' });

    // Contenu sommaire
    const sommaire = [
      { title: 'Gamme Exclusive', desc: 'Le premium sans compromis', page: 3 },
      { title: 'Gamme Elegance', desc: 'L\'équilibre parfait', page: 4 },
      { title: 'Gamme Rustic', desc: 'Le caractère authentique', page: 5 },
      { title: 'Gamme Country', desc: 'L\'âme de la campagne', page: 6 },
      { title: 'Informations', desc: 'Livraison & échantillons', page: 7 },
    ];

    y = 65;
    sommaire.forEach((item, i) => {
      // Fond alternance
      if (i % 2 === 0) {
        doc.setFillColor(kraft[0], kraft[1], kraft[2]);
        doc.rect(20, y - 10, pageWidth - 40, 22, 'F');
      }
      
      // Numéro dans cercle
      doc.setFillColor(velvetMid[0], velvetMid[1], velvetMid[2]);
      doc.circle(32, y, 6, 'F');
      doc.setTextColor(white[0], white[1], white[2]);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`${i + 1}`, 32, y + 1, { align: 'center' });
      
      // Titre
      doc.setTextColor(espresso[0], espresso[1], espresso[2]);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text(item.title, 45, y - 1);
      
      // Description
      doc.setTextColor(velvetLight[0], velvetLight[1], velvetLight[2]);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(item.desc, 45, y + 7);
      
      // Ligne pointillée
      doc.setDrawColor(velvetLight[0], velvetLight[1], velvetLight[2]);
      doc.setLineDashPattern([2, 2], 0);
      doc.line(125, y, pageWidth - 35, y);
      doc.setLineDashPattern([], 0);
      
      // Page
      doc.setTextColor(velvet[0], velvet[1], velvet[2]);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`${item.page}`, pageWidth - 25, y + 1, { align: 'right' });
      
      y += 28;
    });

    // Footer
    addFooter(doc, pageWidth, pageHeight, velvetLight, 2);

    // ===== PAGES PRODUITS PAR GAMME =====
    const gammes = [
      { name: 'Exclusive', color: [101, 67, 33], desc: 'Grade premium sans nœuds, aspect épuré haut de gamme' },
      { name: 'Elegance', color: [139, 90, 43], desc: 'Grade naturel avec petits nœuds discrets' },
      { name: 'Rustic', color: [160, 110, 60], desc: 'Grade caractère avec nœuds apparents' },
      { name: 'Country', color: [180, 140, 90], desc: 'Grade campagne très rustique, maximum de caractère' },
    ] as const;

    let pageNum = 3;
    let progressVal = 15;

    for (const gamme of gammes) {
      const gammeProducts = products.filter(p => p.gamme === gamme.name);
      if (gammeProducts.length === 0) continue;

      doc.addPage();

      // Fond kraft pour la page
      doc.setFillColor(kraftLight[0], kraftLight[1], kraftLight[2]);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // Header avec couleur de gamme - style carton
      doc.setFillColor(gamme.color[0], gamme.color[1], gamme.color[2]);
      doc.rect(0, 0, pageWidth, 48, 'F');
      
      // Bordure or sous le header
      doc.setDrawColor(gold[0], gold[1], gold[2]);
      doc.setLineWidth(1.5);
      doc.line(0, 48, pageWidth, 48);

      doc.setTextColor(kraft[0], kraft[1], kraft[2]);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('COLLECTION NATURA PARQUETS', margin, 14);
      
      doc.setFontSize(26);
      doc.setFont('helvetica', 'bold');
      doc.text(`Gamme ${gamme.name}`, margin, 32);
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(gamme.desc, margin, 42);

      // Badge nombre de produits
      doc.setFillColor(kraft[0], kraft[1], kraft[2]);
      doc.roundedRect(pageWidth - margin - 35, 22, 35, 14, 3, 3, 'F');
      doc.setTextColor(gamme.color[0], gamme.color[1], gamme.color[2]);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(`${gammeProducts.length} réf.`, pageWidth - margin - 17, 31, { align: 'center' });

      // Table des produits - style carton premium
      const tableData = gammeProducts.map(p => [
        p.name[locale].substring(0, 35) + (p.name[locale].length > 35 ? '...' : ''),
        p.dimensions,
        p.finition,
        p.chanfrein ? '✓' : '—',
        `${p.price.ttc.toFixed(0)} €`,
      ]);

      autoTable(doc, {
        startY: 58,
        head: [[
          'Produit',
          'Dimensions',
          'Finition',
          'Chanfrein',
          'Prix/m²',
        ]],
        body: tableData,
        theme: 'plain',
        headStyles: {
          fillColor: [velvet[0], velvet[1], velvet[2]],
          textColor: [kraft[0], kraft[1], kraft[2]],
          fontSize: 8,
          fontStyle: 'bold',
          cellPadding: 4,
        },
        bodyStyles: {
          fontSize: 7,
          textColor: [espresso[0], espresso[1], espresso[2]],
          cellPadding: 3,
          lineColor: [velvetLight[0], velvetLight[1], velvetLight[2]],
          lineWidth: 0.2,
        },
        alternateRowStyles: {
          fillColor: [kraft[0], kraft[1], kraft[2]],
        },
        columnStyles: {
          0: { cellWidth: 50, fontStyle: 'bold' },
          1: { cellWidth: 35 },
          2: { cellWidth: 28 },
          3: { cellWidth: 18, halign: 'center' },
          4: { cellWidth: 22, halign: 'right', fontStyle: 'bold', textColor: [velvet[0], velvet[1], velvet[2]] },
        },
        margin: { left: margin, right: margin },
        styles: {
          overflow: 'linebreak',
        },
      });

      addFooter(doc, pageWidth, pageHeight, chocolatLight, pageNum);
      pageNum++;
      progressVal += 18;
      setProgress(Math.min(progressVal, 85));
    }

    // ===== PAGE INFORMATIONS - Style Carton =====
    doc.addPage();
    setProgress(90);

    // Fond kraft
    doc.setFillColor(kraftLight[0], kraftLight[1], kraftLight[2]);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header
    doc.setFillColor(velvet[0], velvet[1], velvet[2]);
    doc.rect(0, 0, pageWidth, 48, 'F');
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(1.5);
    doc.line(0, 48, pageWidth, 48);

    doc.setTextColor(kraft[0], kraft[1], kraft[2]);
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.text('Informations pratiques', margin, 32);

    // Contenu
    y = 65;
    
    // Section Livraison
    drawInfoSection(doc, margin, y, pageWidth, 'LIVRAISON', [
      '✦ Livraison gratuite en France métropolitaine',
      '✦ Délai : 2-4 semaines selon disponibilité',
      '✦ Livraison sur palette avec hayon',
      '✦ Possibilité de retrait sur place',
    ], espresso, velvet, velvetLight, kraft);

    y += 52;

    // Section Échantillons
    drawInfoSection(doc, margin, y, pageWidth, 'ÉCHANTILLONS', [
      '✦ Échantillons disponibles sur demande',
      '✦ Frais de port : 5€',
      '✦ Code GOFREE = livraison gratuite',
      '✦ Appelez-nous pour obtenir votre code !',
    ], espresso, velvet, velvetLight, kraft);

    y += 52;

    // Section Garantie
    drawInfoSection(doc, margin, y, pageWidth, 'QUALITÉ & GARANTIE', [
      '✦ Chêne européen certifié FSC',
      '✦ Fabrication en Pologne',
      '✦ Garantie fabricant 25 ans',
      '✦ Service conseil personnalisé',
    ], espresso, velvet, velvetLight, kraft);

    // Encart contact - style carton
    y += 58;
    doc.setFillColor(velvet[0], velvet[1], velvet[2]);
    doc.roundedRect(margin, y, pageWidth - 2 * margin, 38, 4, 4, 'F');
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(1);
    doc.roundedRect(margin, y, pageWidth - 2 * margin, 38, 4, 4, 'S');
    
    doc.setTextColor(kraft[0], kraft[1], kraft[2]);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Contactez-nous', pageWidth / 2, y + 13, { align: 'center' });
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('06 12 78 61 85  •  contact@natura-parquets.fr', pageWidth / 2, y + 24, { align: 'center' });
    doc.text('www.natura-parquets.fr', pageWidth / 2, y + 33, { align: 'center' });

    addFooter(doc, pageWidth, pageHeight, velvetLight, pageNum);

    setProgress(100);

    // Save
    doc.save(`Natura-Parquets-Catalogue-2026.pdf`);
    
    setIsGenerating(false);
    setProgress(0);
  };

  // Helper functions
  function addFooter(doc: jsPDF, pageWidth: number, pageHeight: number, color: number[], pageNum: number) {
    const m = 15;
    doc.setFontSize(8);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text('Natura Parquets — Catalogue 2026', m, pageHeight - 10);
    doc.text(`Page ${pageNum}`, pageWidth - m, pageHeight - 10, { align: 'right' });
    
    // Ligne décorative
    doc.setDrawColor(color[0], color[1], color[2]);
    doc.setLineWidth(0.3);
    doc.line(m, pageHeight - 15, pageWidth - m, pageHeight - 15);
  }

  function drawInfoSection(doc: jsPDF, x: number, y: number, pageWidth: number, title: string, items: string[], dark: number[], mid: number[], light: number[], kraftColor?: number[]) {
    // Fond de section
    if (kraftColor) {
      doc.setFillColor(kraftColor[0], kraftColor[1], kraftColor[2]);
      doc.roundedRect(x, y - 2, pageWidth - 2 * x, 48, 3, 3, 'F');
    }
    
    // Titre avec fond
    doc.setFillColor(mid[0], mid[1], mid[2]);
    doc.roundedRect(x + 5, y, 55, 9, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(title, x + 32, y + 6, { align: 'center' });
    
    // Items
    doc.setTextColor(dark[0], dark[1], dark[2]);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    let itemY = y + 18;
    items.forEach(item => {
      doc.text(item, x + 10, itemY);
      itemY += 8;
    });
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero section style bronze/marron */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background dégradé bronze */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#9C8568] via-[#8A7358] to-[#6D5847]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(60,45,35,0.25)_100%)]" />
        </div>
        
        {/* Effet cannelure en bas */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none overflow-hidden">
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
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          {/* Icon */}
          <div className="w-20 h-20 bg-[#6D5847] rounded-2xl flex items-center justify-center mx-auto mb-8 border border-[#D8C8B0]/30">
            <svg className="w-10 h-10 text-[#E8DCC8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-6xl text-white mb-4">
            {labels.title[locale]}
          </h1>
          <p className="text-[#E8DCC8] text-lg md:text-xl mb-10">
            {labels.subtitle[locale]}
          </p>

          {/* Stats box */}
          <div className="bg-[#FDFBF7] rounded-2xl p-6 shadow-lg mb-10 border border-[#D4C4B0]">
            <p className="text-[#6B5A4A] font-semibold text-lg mb-4">
              {labels.included[locale]} :
            </p>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#5A4A3A]">{labels.allProducts[locale]} ({products.length})</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#5A4A3A]">{labels.dimensions[locale]}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#5A4A3A]">{labels.prices[locale]}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#5A4A3A]">{labels.finishes[locale]}</span>
              </div>
            </div>
          </div>

          {/* Download buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium text-lg transition-all ${
                isGenerating
                  ? 'bg-[#A69282] text-white cursor-wait'
                  : 'bg-[#8B7355] hover:bg-[#6B5A45] text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {labels.generating[locale]} {progress}%
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {labels.download[locale]}
                </>
              )}
            </button>
            
            <a
              href="/Catalogue-NATURA-PARQUETS.pdf"
              download
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium text-lg border-2 border-[#D8C8B0]/60 text-[#E8DCC8] hover:bg-[#D8C8B0]/10 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              PDF
            </a>
          </div>

          {/* Progress bar */}
          {isGenerating && (
            <div className="mt-6 w-full bg-[#D4C4B0] rounded-full h-2 overflow-hidden">
              <div 
                className="bg-[#8B7355] h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Back link */}
          <div className="mt-10">
            <Link 
              href={`/${locale}/produits`}
              className="text-[#D8C8B0] hover:text-white transition-colors"
            >
              ← {locale === 'fr' ? 'Retour aux produits' : locale === 'de' ? 'Zurück zu Produkten' : 'Back to products'}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
