import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { products } from '@/data/products';

const PILLAR_TITLE = 'Parquet Point de Hongrie';
const PILLAR_DESCRIPTION =
  'Le motif noble par excellence : lames coupées à 45° ou 60° formant des chevrons parfaitement alignés. Découvrez la collection Natura Parquets en chêne européen — Exclusive, Élégance, Rustic, Country.';
const PILLAR_PATH = '/parquet-point-de-hongrie';

export const metadata: Metadata = {
  title: 'Parquet Point de Hongrie en chêne européen — Natura Parquets',
  description:
    'Parquet Point de Hongrie en chêne premium européen : lames 70/90/100/120mm, finitions huilée, vernie ou brute. Pose, technique, prix, modèles. Échantillons gratuits.',
  keywords:
    'parquet point de hongrie, parquet hongrois, parquet chevron 45, parquet chevron 60, point de hongrie chêne, parquet premium, parquet hôtel, pose point hongrie',
  alternates: {
    canonical: `https://natura-parquets.fr/fr${PILLAR_PATH}`,
    languages: {
      fr: `https://natura-parquets.fr/fr${PILLAR_PATH}`,
      de: `https://natura-parquets.fr/de${PILLAR_PATH}`,
      en: `https://natura-parquets.fr/en${PILLAR_PATH}`,
    },
  },
  openGraph: {
    title: 'Parquet Point de Hongrie en chêne européen — Natura Parquets',
    description: PILLAR_DESCRIPTION,
    url: `https://natura-parquets.fr/fr${PILLAR_PATH}`,
    type: 'article',
    locale: 'fr_FR',
    siteName: 'Natura Parquets',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parquet Point de Hongrie en chêne européen',
    description: PILLAR_DESCRIPTION,
  },
};

const FAQ_ITEMS = [
  {
    q: 'Quelle est la différence entre Point de Hongrie et Chevron classique ?',
    a: "Le Point de Hongrie est un cas particulier de pose en chevrons : les lames sont coupées en biseau (généralement 45° ou 60°) et s'assemblent pointe contre pointe pour former une ligne parfaitement continue, sans décalage. Dans un chevron classique (à 90°), les lames restent rectangulaires et un décalage subsiste à la jonction. Le Point de Hongrie demande donc plus de précision en usine et offre un rendu visuel plus net, plus haut de gamme.",
  },
  {
    q: 'Quel angle choisir : 45° ou 60° ?',
    a: "Le 45° est l'angle classique français, le plus présent dans les hôtels particuliers parisiens et les châteaux. Le 60° donne des chevrons plus allongés, plus contemporains, qui agrandissent visuellement la pièce et conviennent particulièrement aux grands volumes. Le choix est avant tout esthétique : nous recommandons le 45° pour les rénovations patrimoniales et le 60° pour les projets contemporains ou les pièces étroites.",
  },
  {
    q: 'Quelles dimensions de lames choisir ?',
    a: "Notre collection propose le Point de Hongrie en 70 × 410 mm (proportions classiques), 90 × 480 mm, 100 × 480 mm et 120 × 600 mm (formats généreux). Les petites largeurs (70 mm) sont idéales pour les pièces de caractère et les espaces intimistes. Les grandes largeurs (100-120 mm) conviennent aux lofts, salons généreux et espaces commerciaux haut de gamme. La règle : plus la pièce est grande, plus la lame peut être large sans déséquilibrer la composition.",
  },
  {
    q: 'Le Point de Hongrie est-il compatible avec un chauffage au sol ?',
    a: "Oui. Tous nos parquets contrecollés Natura Parquets — y compris le Point de Hongrie — sont compatibles avec les systèmes de chauffage au sol basse température, électrique ou hydraulique. Notre construction multicouche (chêne 3,5 mm + sapin/pin) garantit une stabilité dimensionnelle optimale. Veillez simplement à respecter une montée en température progressive (max +5°C/24h) et à ne pas dépasser 27°C en surface.",
  },
  {
    q: 'Quelle finition recommandez-vous : huilée ou vernie ?',
    a: "L'huilage naturel reste notre recommandation pour le Point de Hongrie : il met en valeur la profondeur du grain du chêne, vieillit avec patine et se rénove localement (zone abîmée poncée et ré-huilée sans démontage). Le vernis offre une protection supérieure aux taches et liquides — pertinent pour les cuisines ouvertes, locaux commerciaux et zones très fréquentées. La finition brute (à finir sur place) reste l'option la plus haut de gamme pour les chantiers patrimoniaux où le maître d'œuvre choisit huile, cire ou vitrification sur mesure.",
  },
  {
    q: 'Quel est le prix moyen du Point de Hongrie en chêne ?',
    a: "Notre Point de Hongrie en chêne européen démarre à 73 €/m² TTC (Élégance brut 70 mm) et monte jusqu'à 130 €/m² TTC pour les formats 120 mm Exclusive vernis. La pose en Point de Hongrie représente un coût additionnel par rapport à une pose en lames droites (+30 à 50 % selon le poseur) car elle exige précision, calepinage et chutes plus importantes. Comptez 80 à 120 €/m² posé selon finition. Un devis précis prend en compte la surface, les contraintes du support et les finitions périphériques.",
  },
  {
    q: 'Combien de temps pour livraison et pose ?',
    a: "Nos parquets Point de Hongrie sont en stock pour les références principales (livraison 2 semaines en moyenne sur la France, l'Allemagne, la Belgique et la Suisse). Les configurations sur mesure sont livrées en 6 à 8 semaines. Côté pose, comptez 2 à 4 jours pour 50 m² selon la complexité du calepinage et la préparation du support. Nos partenaires poseurs agréés interviennent en France entière : voir la page Partenaires.",
  },
];

const BREADCRUMB_LD = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Accueil',
      item: 'https://natura-parquets.fr/fr',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Nos Parquets',
      item: 'https://natura-parquets.fr/fr/produits',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: PILLAR_TITLE,
      item: `https://natura-parquets.fr/fr${PILLAR_PATH}`,
    },
  ],
};

const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

const ARTICLE_LD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: PILLAR_TITLE,
  description: PILLAR_DESCRIPTION,
  author: {
    '@type': 'Organization',
    name: 'Natura Parquets',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Natura Parquets',
    logo: {
      '@type': 'ImageObject',
      url: 'https://natura-parquets.fr/logo.png',
    },
  },
  mainEntityOfPage: `https://natura-parquets.fr/fr${PILLAR_PATH}`,
};

export default function PointDeHongriePillar({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const pillarProducts = products.filter(p => p.pose === 'point-hongrie').slice(0, 6);

  return (
    <main className="min-h-screen bg-natura-50">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_LD) }}
      />

      <Navigation />

      {/* Hero */}
      <section className="relative bg-natura-900 text-white pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-natura-700 via-natura-900 to-natura-800" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(60deg, transparent 0 30px, rgba(212,168,83,0.15) 30px 32px)',
        }} />
        <div className="relative max-w-5xl mx-auto text-center">
          {/* Breadcrumb visible */}
          <nav className="text-sm text-natura-300 mb-8 flex items-center justify-center gap-2" aria-label="Fil d'Ariane">
            <Link href={`/${locale}`} className="hover:text-gold-400 transition-colors">Accueil</Link>
            <span>/</span>
            <Link href={`/${locale}/produits`} className="hover:text-gold-400 transition-colors">Parquets</Link>
            <span>/</span>
            <span className="text-gold-400">Point de Hongrie</span>
          </nav>

          <p className="text-gold-400 text-sm tracking-[0.3em] uppercase mb-4">Le motif noble</p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight">
            Parquet Point de Hongrie
          </h1>
          <p className="text-xl md:text-2xl text-natura-200 max-w-3xl mx-auto leading-relaxed mb-10">
            Lames coupées à 45° ou 60° formant des chevrons parfaitement alignés. L&apos;assemblage le plus exigeant du parquet français, signature des hôtels particuliers et des intérieurs d&apos;exception.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/echantillon`}
              className="inline-block bg-gold-400 hover:bg-gold-500 text-natura-900 font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:shadow-xl"
            >
              Recevoir 3 échantillons gratuits
            </Link>
            <Link
              href={`/${locale}/produits?pose=point-hongrie`}
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-natura-900 font-semibold px-8 py-4 rounded-lg text-lg transition-all"
            >
              Voir tous nos modèles ({pillarProducts.length}+)
            </Link>
          </div>
        </div>
      </section>

      {/* Intro narrative */}
      <section className="py-20 px-6 bg-natura-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-natura-900 mb-8 font-semibold">
            Le Point de Hongrie, signature du parquet français
          </h2>
          <div className="prose prose-lg max-w-none text-natura-700 leading-relaxed space-y-5">
            <p>
              Le <strong>Point de Hongrie</strong> est, avec le Versailles, l&apos;un des deux motifs de parquet les plus emblématiques du patrimoine français. Apparu au XVIIᵉ siècle dans les grands appartements parisiens, il s&apos;est imposé comme la référence du parquet d&apos;exception : châteaux de la Loire, hôtels particuliers du Marais, palaces haussmanniens — partout où l&apos;élégance discrète primait sur l&apos;ostentation, le Point de Hongrie a été choisi.
            </p>
            <p>
              Sa singularité tient à un détail technique précis : à la différence du chevron classique (où des lames rectangulaires forment un angle droit en se chevauchant), le Point de Hongrie utilise des <strong>lames coupées en biseau aux extrémités</strong>, généralement à <strong>45° ou 60°</strong>. Quand elles s&apos;assemblent pointe contre pointe, l&apos;axe central forme une ligne parfaitement continue, sans le décalage caractéristique du chevron simple. Ce que l&apos;œil non averti perçoit comme une simple variante esthétique est en réalité une exécution d&apos;atelier exigeante, qui demande des coupes au degré près et une sélection de bois sans défaut.
            </p>
            <p>
              Aujourd&apos;hui, le Point de Hongrie connaît une seconde jeunesse. Les architectes d&apos;intérieur le redécouvrent dans des contextes contemporains — lofts industriels, villas minimalistes, boutiques de luxe — où sa rigueur géométrique apporte une tension visuelle absente des poses droites. Notre collection en chêne européen propose toutes les configurations : du <strong>70 × 410 mm</strong> classique au <strong>120 × 600 mm</strong> grand format, en quatre grades (Exclusive, Élégance, Rustic, Country) et cinq finitions (brut, huile, double huile, huile blanche, vernis usine).
            </p>
          </div>
        </div>
      </section>

      {/* Caractéristiques techniques */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-natura-900 mb-12 font-semibold text-center">
            Caractéristiques techniques
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-natura-50 rounded-xl p-8 border border-natura-200">
              <h3 className="font-display text-xl text-natura-900 mb-4 font-semibold flex items-center gap-3">
                <span className="text-gold-500 text-2xl">◢◣</span>
                Angle 45° — Le classique
              </h3>
              <p className="text-natura-700 leading-relaxed mb-4">
                L&apos;angle traditionnel français, présent dans la plupart des intérieurs patrimoniaux. Les chevrons sont plus compacts, le motif est plus dense visuellement. Recommandé pour les pièces de caractère, les rénovations Haussmann et les espaces où l&apos;on souhaite densifier la composition.
              </p>
              <ul className="text-sm text-natura-600 space-y-2">
                <li>• Compatible toutes pièces (séjour, chambre, couloir)</li>
                <li>• Densité visuelle élevée — convient aux petites surfaces</li>
                <li>• Coupes en biseau parfait à 45°</li>
              </ul>
            </div>
            <div className="bg-natura-50 rounded-xl p-8 border border-natura-200">
              <h3 className="font-display text-xl text-natura-900 mb-4 font-semibold flex items-center gap-3">
                <span className="text-gold-500 text-2xl">◤◥</span>
                Angle 60° — Le contemporain
              </h3>
              <p className="text-natura-700 leading-relaxed mb-4">
                Plus allongé, plus moderne. Les chevrons s&apos;étirent et donnent une impression d&apos;agrandissement de la pièce. Privilégié dans les projets architecturaux contemporains, les lofts, les hôtels-restaurants haut de gamme et les espaces commerciaux design.
              </p>
              <ul className="text-sm text-natura-600 space-y-2">
                <li>• Idéal pour grands volumes et pièces étroites</li>
                <li>• Effet d&apos;élongation visuelle</li>
                <li>• Coupes en biseau parfait à 60°</li>
              </ul>
            </div>
          </div>

          {/* Spec table */}
          <div className="mt-12 bg-natura-900 rounded-xl p-8 text-white">
            <h3 className="font-display text-2xl mb-6 font-semibold">Spécifications de la collection</h3>
            <div className="grid md:grid-cols-4 gap-6 text-sm">
              <div>
                <p className="text-gold-400 uppercase tracking-wider text-xs mb-2">Largeurs disponibles</p>
                <p className="text-lg">70 / 90 / 100 / 120 mm</p>
              </div>
              <div>
                <p className="text-gold-400 uppercase tracking-wider text-xs mb-2">Longueurs</p>
                <p className="text-lg">410 / 480 / 600 mm</p>
              </div>
              <div>
                <p className="text-gold-400 uppercase tracking-wider text-xs mb-2">Épaisseur</p>
                <p className="text-lg">11 mm (3,5 mm chêne + 7,5 mm pin)</p>
              </div>
              <div>
                <p className="text-gold-400 uppercase tracking-wider text-xs mb-2">Construction</p>
                <p className="text-lg">2 plis contrecollés</p>
              </div>
              <div>
                <p className="text-gold-400 uppercase tracking-wider text-xs mb-2">Grades</p>
                <p className="text-lg">Exclusive · Élégance · Rustic · Country</p>
              </div>
              <div>
                <p className="text-gold-400 uppercase tracking-wider text-xs mb-2">Finitions</p>
                <p className="text-lg">Brut · Huilé · Vernis · Huile blanche</p>
              </div>
              <div>
                <p className="text-gold-400 uppercase tracking-wider text-xs mb-2">Compatible chauffage sol</p>
                <p className="text-lg">Oui (basse température)</p>
              </div>
              <div>
                <p className="text-gold-400 uppercase tracking-wider text-xs mb-2">Origine bois</p>
                <p className="text-lg">Chêne européen FSC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi choisir */}
      <section className="py-20 px-6 bg-natura-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-natura-900 mb-12 font-semibold text-center">
            Pourquoi choisir le Point de Hongrie ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Valorisation immobilière',
                body: "Un parquet Point de Hongrie en chêne massif augmente significativement la valeur perçue d'un bien. Les agents immobiliers le citent régulièrement parmi les éléments décisifs lors d'une revente — au même titre qu'une cheminée d'origine ou des moulures conservées.",
              },
              {
                title: 'Intemporalité',
                body: "Un motif inventé il y a plus de trois siècles et toujours posé aujourd'hui dans les projets les plus contemporains. Vous ne risquez aucune péremption stylistique : votre Point de Hongrie sera aussi pertinent dans 20 ans qu'aujourd'hui.",
              },
              {
                title: 'Profondeur visuelle',
                body: "L'alignement des pointes crée une dynamique optique unique : le sol semble respirer, capturer la lumière différemment selon l'angle de vue, animer la pièce sans surcharger. Aucune autre pose n'offre cette qualité visuelle.",
              },
              {
                title: 'Rénovation possible',
                body: "Notre construction contrecollée 2 plis avec couche d'usure 3,5 mm permet 1 à 2 ponçages au cours de la vie du parquet. Un Point de Hongrie Natura Parquets peut traverser 40 à 60 ans sans dépose.",
              },
              {
                title: 'Prestige reconnu',
                body: "Un Point de Hongrie est immédiatement identifié par tout visiteur sensible à la décoration. C'est un signal de soin, d'investissement réfléchi et de qualité long terme — bien au-delà du parquet droit standard.",
              },
              {
                title: 'Adaptabilité',
                body: "Quatre grades (Exclusive, Élégance, Rustic, Country) et cinq finitions vous permettent de calibrer précisément l'esthétique : ultra-épuré pour un appartement minimaliste, plus marqué et noueux pour un mas de Provence ou un chalet alpin.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-soft border border-natura-200">
                <h3 className="font-display text-lg text-natura-900 mb-3 font-semibold">{item.title}</h3>
                <p className="text-natura-700 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos modèles Point de Hongrie */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-natura-900 mb-4 font-semibold">
              Nos parquets Point de Hongrie
            </h2>
            <p className="text-natura-600 text-lg max-w-2xl mx-auto">
              {pillarProducts.length} configurations en stock — chêne européen, formats 70 à 120 mm.
            </p>
          </div>

          {pillarProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {pillarProducts.map(product => (
                <Link
                  key={product.id}
                  href={`/${locale}/produits/${product.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-natura-200 hover:border-gold-400 hover:shadow-card-hover transition-all"
                >
                  <div className="aspect-square bg-natura-100 relative overflow-hidden">
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={`${product.name.fr} — Point de Hongrie ${product.dimensions}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-natura-400 text-4xl">◢◣</div>
                    )}
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-gold-400 text-natura-900 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gold-600 uppercase tracking-wider mb-1">{product.gamme}</p>
                    <h3 className="font-display text-lg text-natura-900 mb-2 group-hover:text-forest-600 transition-colors line-clamp-2">
                      {product.name.fr}
                    </h3>
                    <p className="text-xs text-natura-500 mb-3">{product.dimensions}</p>
                    <p className="font-semibold text-natura-900">{product.price.display} <span className="text-xs text-natura-500 font-normal">/ m²</span></p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-natura-600">Catalogue en cours de mise à jour.</p>
          )}

          <div className="text-center mt-12">
            <Link
              href={`/${locale}/produits?pose=point-hongrie`}
              className="inline-block bg-natura-900 hover:bg-natura-800 text-white font-semibold px-8 py-4 rounded-lg transition-all"
            >
              Voir toutes les références Point de Hongrie →
            </Link>
          </div>
        </div>
      </section>

      {/* Pose & technique */}
      <section className="py-20 px-6 bg-natura-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-natura-900 mb-8 font-semibold">
            Pose du Point de Hongrie : ce qu&apos;il faut savoir
          </h2>
          <div className="space-y-6 text-natura-700 leading-relaxed">
            <p>
              La pose en Point de Hongrie est l&apos;une des plus exigeantes du parquet. Elle se distingue d&apos;une pose en lames droites par trois contraintes majeures : un <strong>calepinage minutieux</strong> (chaque chevron doit s&apos;aligner sur l&apos;axe central de la pièce), des <strong>chutes plus importantes</strong> (10 à 15 % en moyenne, contre 5 à 7 % pour une pose droite) et un <strong>surcoût de pose</strong> (+30 à 50 % par rapport à une lame droite).
            </p>
            <h3 className="font-display text-xl text-natura-900 font-semibold pt-4">Préparation du support</h3>
            <p>
              Le support doit être parfaitement plan (tolérance 3 mm sur 2 m), sec (humidité résiduelle &lt; 3 % pour une chape ciment), propre et structurellement sain. Pour un chauffage au sol, un test de mise en chauffe progressive doit avoir été réalisé avant la pose. Notre équipe technique peut auditer un dossier de support et conseiller un poseur agréé local — voir <Link href={`/${locale}/partenaires`} className="text-forest-600 underline hover:text-forest-700">la page Partenaires</Link>.
            </p>
            <h3 className="font-display text-xl text-natura-900 font-semibold pt-4">Sens et orientation du motif</h3>
            <p>
              L&apos;axe central des chevrons est traditionnellement orienté <strong>perpendiculairement à la fenêtre principale</strong>, ce qui crée un effet d&apos;agrandissement en suivant la lumière. Dans une pièce traversante, l&apos;axe peut suivre la diagonale ou la longueur. Un calepinage en amont est indispensable — nous fournissons gratuitement un plan de pose pour toute commande supérieure à 30 m².
            </p>
            <h3 className="font-display text-xl text-natura-900 font-semibold pt-4">Pose collée recommandée</h3>
            <p>
              La pose collée plein bain est notre préconisation pour le Point de Hongrie : elle garantit une stabilité parfaite (essentielle pour les chevrons qui ne doivent jamais se désaxer), une absence totale de bruit de marche, et une compatibilité optimale avec le chauffage au sol. La pose flottante reste possible mais déconseillée pour ce motif.
            </p>
          </div>
        </div>
      </section>

      {/* Comparatif */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-natura-900 mb-12 font-semibold text-center">
            Point de Hongrie ou Bâton rompu ? Le comparatif
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-soft border border-natura-200">
              <thead className="bg-natura-900 text-white">
                <tr>
                  <th className="text-left px-6 py-4 font-display text-sm uppercase tracking-wider">Critère</th>
                  <th className="text-left px-6 py-4 font-display text-sm uppercase tracking-wider">Point de Hongrie</th>
                  <th className="text-left px-6 py-4 font-display text-sm uppercase tracking-wider">Bâton rompu</th>
                  <th className="text-left px-6 py-4 font-display text-sm uppercase tracking-wider">Chevron 45°</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  ['Découpe lame', 'Biseau 45° ou 60°', 'Rectangulaire', 'Biseau 45°'],
                  ['Jonction', 'Pointe contre pointe (alignée)', 'Décalage classique', 'Décalage 45°'],
                  ['Niveau de difficulté pose', 'Élevé', 'Moyen', 'Élevé'],
                  ['Coût pose vs lame droite', '+40 à 50 %', '+15 à 25 %', '+30 à 40 %'],
                  ['Effet visuel', 'Lignes nettes, prestige patrimonial', 'Mouvement classique', 'Élégance moderne'],
                  ['Style recommandé', 'Haussmannien / contemporain chic', 'Tradition / cottage', 'Contemporain'],
                ].map((row, i) => (
                  <tr key={i} className="border-t border-natura-200">
                    <td className="px-6 py-4 font-medium text-natura-900">{row[0]}</td>
                    <td className="px-6 py-4 text-natura-700 bg-gold-50">{row[1]}</td>
                    <td className="px-6 py-4 text-natura-700">{row[2]}</td>
                    <td className="px-6 py-4 text-natura-700">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-natura-600 mt-6 text-sm">
            Voir aussi : <Link href={`/${locale}/produits?pose=baton-rompu`} className="text-forest-600 underline">parquet bâton rompu</Link> · <Link href={`/${locale}/produits?pose=chevron-45`} className="text-forest-600 underline">chevron 45°</Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-natura-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-natura-900 mb-12 font-semibold text-center">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <details key={i} className="group bg-white rounded-xl border border-natura-200 overflow-hidden">
                <summary className="cursor-pointer px-6 py-5 font-display text-lg text-natura-900 font-semibold flex items-center justify-between hover:bg-natura-50">
                  <span className="pr-4">{item.q}</span>
                  <span className="text-2xl text-forest-500 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 text-natura-700 leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-6 bg-gradient-to-br from-natura-900 via-natura-800 to-natura-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl mb-6 font-semibold">
            Votre projet en Point de Hongrie commence ici
          </h2>
          <p className="text-xl text-natura-200 mb-10 max-w-2xl mx-auto">
            Recevez 3 échantillons gratuits, un plan de calepinage personnalisé et un devis sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/echantillon`}
              className="inline-block bg-gold-400 hover:bg-gold-500 text-natura-900 font-semibold px-10 py-4 rounded-lg text-lg transition-all hover:shadow-xl"
            >
              Commander 3 échantillons gratuits
            </Link>
            <Link
              href={`/${locale}/contact?type=devis&product=Point+de+Hongrie`}
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-natura-900 font-semibold px-10 py-4 rounded-lg text-lg transition-all"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      {/* Pages liées (cocon) */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl text-natura-900 mb-8 font-semibold text-center">
            Continuez votre exploration
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href={`/${locale}/produits?pose=baton-rompu`} className="group p-6 bg-natura-50 rounded-xl border border-natura-200 hover:border-gold-400 transition-all">
              <p className="text-xs text-gold-600 uppercase tracking-wider mb-2">Pose</p>
              <h3 className="font-display text-lg text-natura-900 mb-2 group-hover:text-forest-600">Parquet Bâton rompu</h3>
              <p className="text-sm text-natura-600">Le motif classique français à lames rectangulaires.</p>
            </Link>
            <Link href={`/${locale}/produits?gamme=Exclusive`} className="group p-6 bg-natura-50 rounded-xl border border-natura-200 hover:border-gold-400 transition-all">
              <p className="text-xs text-gold-600 uppercase tracking-wider mb-2">Gamme</p>
              <h3 className="font-display text-lg text-natura-900 mb-2 group-hover:text-forest-600">Collection Exclusive</h3>
              <p className="text-sm text-natura-600">Notre grade premium sans nœuds, aspect épuré.</p>
            </Link>
            <Link href={`/${locale}/guide-parquet`} className="group p-6 bg-natura-50 rounded-xl border border-natura-200 hover:border-gold-400 transition-all">
              <p className="text-xs text-gold-600 uppercase tracking-wider mb-2">Guide</p>
              <h3 className="font-display text-lg text-natura-900 mb-2 group-hover:text-forest-600">Bien choisir son parquet</h3>
              <p className="text-sm text-natura-600">Guide complet : essences, finitions, formats, pose.</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
