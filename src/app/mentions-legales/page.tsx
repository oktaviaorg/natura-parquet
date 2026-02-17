import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales - Natura Parquets',
  description: 'Mentions légales du site Natura Parquets - EPENON SARL',
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-900 mb-8 font-serif">Mentions Légales</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Éditeur du site</h2>
            <div className="bg-amber-50 p-6 rounded-lg">
              <p className="font-bold text-lg text-amber-900">NATURA PARQUETS®</p>
              <p className="text-amber-700">Marque déposée - Groupe Epenon</p>
              <div className="mt-4 space-y-1 text-gray-700">
                <p><strong>Raison sociale :</strong> EPENON SARL</p>
                <p><strong>Forme juridique :</strong> Société à responsabilité limitée</p>
                <p><strong>Capital social :</strong> 1 000,00 €</p>
                <p><strong>SIREN :</strong> 881 601 207</p>
                <p><strong>SIRET (siège) :</strong> 881 601 207 00015</p>
                <p><strong>N° TVA Intracommunautaire :</strong> FR81881601207</p>
                <p><strong>RCS :</strong> Colmar (inscrit le 13/05/2020)</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Siège social</h2>
            <p className="text-gray-700">
              6 rue du Commerce<br />
              68420 Herrlisheim-près-Colmar<br />
              France
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Contact</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Téléphone :</strong> <a href="tel:+33612786185" className="text-amber-600 hover:underline">06 12 78 61 85</a></p>
              <p><strong>Email :</strong> <a href="mailto:contact@natura-parquets.fr" className="text-amber-600 hover:underline">contact@natura-parquets.fr</a></p>
              <p><strong>Responsable de la communication :</strong> Erwin N.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Hébergement</h2>
            <p className="text-gray-700">
              Ce site est hébergé par :<br />
              <strong>Vercel Inc.</strong><br />
              440 N Barranca Ave #4133<br />
              Covina, CA 91723, États-Unis
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Propriété intellectuelle</h2>
            <p className="text-gray-700">
              L'ensemble du contenu de ce site (textes, images, logos, vidéos) est la propriété exclusive 
              d'EPENON SARL ou de ses partenaires. Toute reproduction, représentation, modification, 
              publication ou adaptation de tout ou partie des éléments du site est interdite sans 
              autorisation écrite préalable.
            </p>
            <p className="text-gray-700 mt-4">
              <strong>NATURA PARQUETS®</strong> est une marque déposée.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Données personnelles</h2>
            <p className="text-gray-700">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez 
              d'un droit d'accès, de rectification, de suppression et de portabilité de vos données 
              personnelles. Pour exercer ces droits, contactez-nous à : 
              <a href="mailto:contact@natura-parquets.fr" className="text-amber-600 hover:underline"> contact@natura-parquets.fr</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Crédits</h2>
            <p className="text-gray-700">
              <strong>Conception et développement :</strong> Groupe Epenon<br />
              <strong>Photos produits :</strong> Natura Parquets
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
