import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guide : Comment choisir son parquet ? | Natura Parquets',
  description: 'Découvrez notre guide complet pour choisir le parquet idéal. Conseils sur les essences, finitions, dimensions et pose. Expert parquet chêne européen.',
  keywords: 'guide parquet, choisir parquet, parquet chêne, finition parquet, pose parquet, parquet contrecollé',
};

export default function GuideParquetPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'fr' | 'de' | 'en';

  const content = {
    fr: {
      title: 'Comment choisir son parquet ?',
      subtitle: 'Le guide complet pour faire le bon choix',
      intro: 'Choisir un parquet est une décision importante qui impacte l\'esthétique et le confort de votre intérieur pour de nombreuses années. Ce guide vous accompagne dans votre réflexion.',
      sections: [
        {
          title: '1. Contrecollé ou massif ?',
          icon: '🪵',
          content: `Le parquet contrecollé est aujourd'hui le choix de référence pour la plupart des projets. Composé de plusieurs couches de bois avec une couche noble en surface, il offre :

• **Stabilité dimensionnelle** : idéal avec chauffage au sol
• **Pose plus rapide** : système clipsable ou collé
• **Excellent rapport qualité-prix**
• **Couche noble de 2.5 à 4mm** : permet 1 à 2 rénovations

Le parquet massif reste pertinent pour les projets patrimoniaux ou les poses traditionnelles.`,
        },
        {
          title: '2. Quelle essence de bois ?',
          icon: '🌳',
          content: `Le **chêne européen** est l'essence reine pour les parquets. Nos parquets sont issus de forêts polonaises certifiées :

• **Dureté exceptionnelle** (Brinell 3.7) : résiste au passage intensif
• **Veinage élégant** : mailles et flammes naturelles
• **Tanins protecteurs** : durabilité naturelle
• **Teintes variées** : du blond au brun doré

Tous nos parquets sont en chêne européen de première qualité.`,
        },
        {
          title: '3. Dimensions des lames',
          icon: '📐',
          content: `Le format des lames influence fortement le rendu visuel :

**Largeur**
• **70mm** (compact) : style classique, adapté aux petites pièces
• **100mm** (chevron) : pose point de Hongrie traditionnelle
• **120mm** (standard) : polyvalent, équilibre esthétique/pratique
• **150mm** (large) : effet contemporain, agrandit visuellement l'espace

**Longueur**
• **490-600mm** : format économique, coupe limitée
• **1200-1330mm** : grandes longueurs pour pièces spacieuses

**Épaisseur**
• **11mm** : standard contrecollé, parfait sur chauffage au sol
• **14mm** : pour chevrons et lames premium`,
        },
        {
          title: '4. Quelle finition choisir ?',
          icon: '✨',
          content: `Trois options principales s'offrent à vous :

**Vernis UV**
• Protection maximale contre l'usure
• Entretien minimal (aspirateur + serpillère humide)
• Idéal pour les pièces à fort passage
• Rendu légèrement satiné

**Huile naturelle**
• Toucher authentique du bois
• Réparations localisées possibles
• Aspect mat naturel
• Entretien : huile d'entretien 1-2x/an

**Brut (à finir)**
• Personnalisation totale sur chantier
• Choix de teinte et finition
• Nécessite un professionnel pour la mise en œuvre
• Prix d'achat inférieur`,
        },
        {
          title: '5. Gamme Exclusive vs Élégance',
          icon: '⭐',
          content: `Nos deux gammes répondent à des besoins différents :

**Gamme Exclusive**
• Couche noble **3.5mm** (2 ponçages possibles)
• Sélection de bois premium
• Nœuds rares et petits
• Veinage régulier et élégant
• **Prix : 48 à 70 €/m²**

**Gamme Élégance**
• Couche noble **2.5mm** (1 ponçage possible)
• Excellent rapport qualité-prix
• Aspect naturel avec quelques nœuds
• Caractère authentique
• **Prix : 45 à 62 €/m²**`,
        },
        {
          title: '6. Compatibilité chauffage au sol',
          icon: '🔥',
          content: `Tous nos parquets contrecollés sont **compatibles chauffage au sol** (eau ou électrique basse température) :

• Épaisseur totale ≤ 15mm : bonne conductivité thermique
• Structure multicouche stable
• Pose collée recommandée pour optimiser le transfert thermique
• Température de surface max : 28°C

**Conseil** : prévoyez une montée en température progressive lors de la première chauffe.`,
        },
        {
          title: '7. Calculer la surface nécessaire',
          icon: '🧮',
          content: `Pour calculer la quantité de parquet :

1. **Mesurez** chaque pièce (longueur × largeur)
2. **Additionnez** les surfaces
3. **Ajoutez 10%** pour les coupes et chutes

**Exemple** :
Salon 25m² + Chambre 1 (12m²) + Chambre 2 (10m²) = 47m²
Avec marge 10% : **52m²** à commander

Notre calculateur intégré dans chaque fiche produit fait ce calcul automatiquement.`,
        },
        {
          title: '8. Délais de livraison',
          icon: '📦',
          content: `Nos parquets sont fabriqués sur commande en Pologne :

• **Stock standard** : 2 semaines
• **Premier choix** : 3-4 semaines
• **Sur-mesure** : 6-8 semaines

Livraison gratuite en France métropolitaine, sur rendez-vous.

**Conseil** : commandez suffisamment à l'avance pour éviter les retards de chantier.`,
        },
      ],
      cta: {
        title: 'Prêt à choisir votre parquet ?',
        subtitle: 'Découvrez notre collection de parquets chêne européen premium',
        button: 'Voir nos parquets',
      },
      contact: {
        title: 'Besoin d\'un conseil personnalisé ?',
        text: 'Notre équipe est à votre disposition pour vous guider dans votre choix.',
        phone: '06 12 78 61 85',
        email: 'contact@natura-parquets.fr',
      },
    },
    de: {
      title: 'Wie wählt man sein Parkett?',
      subtitle: 'Der komplette Leitfaden für die richtige Wahl',
      intro: 'Die Wahl eines Parketts ist eine wichtige Entscheidung, die die Ästhetik und den Komfort Ihres Interieurs für viele Jahre beeinflusst.',
      sections: [
        {
          title: '1. Mehrschicht oder Massiv?',
          icon: '🪵',
          content: `Mehrschichtparkett ist heute die Referenzwahl für die meisten Projekte. Es besteht aus mehreren Holzschichten mit einer Edelholzschicht an der Oberfläche:

• **Dimensionale Stabilität**: ideal mit Fußbodenheizung
• **Schnellere Verlegung**: Klick- oder Klebesystem
• **Ausgezeichnetes Preis-Leistungs-Verhältnis**
• **Edelholzschicht 2,5 bis 4mm**: ermöglicht 1-2 Renovierungen`,
        },
        {
          title: '2. Welche Holzart?',
          icon: '🌳',
          content: `**Europäische Eiche** ist die Königin der Parkettholzarten. Unsere Parkette stammen aus zertifizierten polnischen Wäldern:

• **Außergewöhnliche Härte** (Brinell 3,7)
• **Elegante Maserung**: natürliche Spiegel und Flammen
• **Schützende Tannine**: natürliche Haltbarkeit`,
        },
      ],
      cta: {
        title: 'Bereit, Ihr Parkett zu wählen?',
        subtitle: 'Entdecken Sie unsere Kollektion europäischer Premium-Eichenparkette',
        button: 'Unsere Parkette ansehen',
      },
      contact: {
        title: 'Brauchen Sie persönliche Beratung?',
        text: 'Unser Team steht Ihnen gerne zur Verfügung.',
        phone: '06 12 78 61 85',
        email: 'contact@natura-parquets.fr',
      },
    },
    en: {
      title: 'How to choose your parquet?',
      subtitle: 'The complete guide to making the right choice',
      intro: 'Choosing a parquet is an important decision that impacts the aesthetics and comfort of your interior for many years.',
      sections: [
        {
          title: '1. Engineered or Solid?',
          icon: '🪵',
          content: `Engineered parquet is now the reference choice for most projects. Made of multiple wood layers with a noble surface layer:

• **Dimensional stability**: ideal with underfloor heating
• **Faster installation**: click or glue system
• **Excellent value for money**
• **Noble layer 2.5 to 4mm**: allows 1-2 renovations`,
        },
        {
          title: '2. Which wood species?',
          icon: '🌳',
          content: `**European oak** is the queen of parquet woods. Our parquets come from certified Polish forests:

• **Exceptional hardness** (Brinell 3.7)
• **Elegant grain**: natural mirrors and flames
• **Protective tannins**: natural durability`,
        },
      ],
      cta: {
        title: 'Ready to choose your parquet?',
        subtitle: 'Discover our collection of premium European oak parquets',
        button: 'View our parquets',
      },
      contact: {
        title: 'Need personalized advice?',
        text: 'Our team is available to guide you.',
        phone: '06 12 78 61 85',
        email: 'contact@natura-parquets.fr',
      },
    },
  };

  const t = content[locale];

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-natura-100 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl text-natura-900 mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-natura-600 mb-6">
            {t.subtitle}
          </p>
          <p className="text-natura-700 max-w-2xl mx-auto">
            {t.intro}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            {t.sections.map((section, index) => (
              <article key={index} className="scroll-mt-24" id={`section-${index + 1}`}>
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-4xl">{section.icon}</span>
                  <h2 className="font-display text-2xl md:text-3xl text-natura-900">
                    {section.title}
                  </h2>
                </div>
                <div className="prose prose-natura max-w-none">
                  <div 
                    className="text-natura-700 leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{ 
                      __html: section.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br/>')
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-natura-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-natura-300 mb-8">
            {t.cta.subtitle}
          </p>
          <Link
            href={`/${locale}/produits`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-natura-900 font-medium hover:bg-natura-100 transition-colors rounded-lg"
          >
            {t.cta.button}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-6 bg-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl text-natura-900 mb-4">
            {t.contact.title}
          </h2>
          <p className="text-natura-600 mb-6">
            {t.contact.text}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-natura-900 font-medium hover:text-amber-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t.contact.phone}
            </a>
            <a
              href={`mailto:${t.contact.email}`}
              className="flex items-center gap-2 text-natura-900 font-medium hover:text-amber-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t.contact.email}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
