import { notFound } from 'next/navigation';
import ProductionGuide, { guideMetadata } from '@/lib/production-guide';

const SLUG = 'guide-lames-droites-chene-sur-mesure';

export function generateMetadata() {
  return guideMetadata(SLUG);
}

export default function GuideLamesDroitesPage({ params }: { params: { locale: string } }) {
  if (params.locale !== 'fr') notFound();
  return <ProductionGuide slug={SLUG} />;
}
