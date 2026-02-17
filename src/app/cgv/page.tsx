import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente - Natura Parquets',
  description: 'CGV du site Natura Parquets - Vente de parquets aux professionnels',
};

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-900 mb-8 font-serif">Conditions Générales de Vente</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <div className="bg-amber-50 p-4 rounded-lg text-amber-800 text-sm">
            <p><strong>Dernière mise à jour :</strong> Février 2026</p>
            <p><strong>Applicable aux ventes B2B (professionnels)</strong></p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Article 1 - Objet</h2>
            <p className="text-gray-700">
              Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles 
              entre la société EPENON SARL, exploitant la marque NATURA PARQUETS®, et tout professionnel 
              (ci-après "le Client") effectuant un achat sur le site natura-parquets.fr ou par tout autre moyen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Article 2 - Produits</h2>
            <p className="text-gray-700">
              NATURA PARQUETS® propose des parquets contrecollés de fabrication européenne. 
              Les caractéristiques essentielles des produits sont décrites sur les fiches produits du site.
              Les photographies n'ont pas de valeur contractuelle, des variations naturelles de teinte 
              et de veinage peuvent exister.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Article 3 - Prix</h2>
            <p className="text-gray-700 mb-4">
              Les prix sont indiqués en euros, hors taxes (HT) et toutes taxes comprises (TTC).
              TVA applicable : 20%.
            </p>
            <p className="text-gray-700">
              Les prix peuvent être modifiés à tout moment. Les produits sont facturés sur la base 
              des tarifs en vigueur au moment de la validation de la commande.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Article 4 - Commande</h2>
            <p className="text-gray-700">
              Toute commande fait l'objet d'un devis préalable. La commande est considérée comme ferme 
              et définitive après acceptation du devis et réception de l'acompte de 30%.
              Le solde est dû avant expédition.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Article 5 - Livraison</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Quantité</th>
                    <th className="text-left py-2">Frais de livraison</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b">
                    <td className="py-2">Moins de 60 m²</td>
                    <td className="py-2">Sur demande</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">De 60 à 149 m²</td>
                    <td className="py-2">2 € HT / m²</td>
                  </tr>
                  <tr>
                    <td className="py-2">150 m² et plus</td>
                    <td className="py-2 text-green-600 font-semibold">Franco de port</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700">
              Les délais de livraison sont donnés à titre indicatif (généralement 2 à 4 semaines).
              La livraison s'effectue au pied du camion. Le déchargement et la manutention 
              sont à la charge du Client.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Article 6 - Réception et réclamations</h2>
            <p className="text-gray-700">
              Le Client doit vérifier l'état des marchandises à la livraison et émettre des réserves 
              précises sur le bon de livraison en cas de dommage apparent. Toute réclamation doit être 
              confirmée par écrit dans les 48 heures suivant la livraison.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Article 7 - Garantie</h2>
            <p className="text-gray-700">
              Nos parquets bénéficient d'une garantie fabricant. Les défauts de fabrication doivent 
              être signalés avant la pose. Aucune réclamation ne sera acceptée après pose du parquet.
              L'entretien doit être effectué selon nos recommandations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Article 8 - Retour et annulation</h2>
            <p className="text-gray-700">
              S'agissant de ventes entre professionnels, le droit de rétractation ne s'applique pas.
              Toute annulation de commande après validation du devis entraîne des frais d'annulation 
              équivalents à l'acompte versé.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Article 9 - Réserve de propriété</h2>
            <p className="text-gray-700">
              Le transfert de propriété des produits est suspendu jusqu'au paiement intégral du prix.
              Le Client devient propriétaire des marchandises dès le règlement complet de la facture.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Article 10 - Litiges</h2>
            <p className="text-gray-700">
              En cas de litige, une solution amiable sera recherchée. À défaut, les tribunaux de 
              Colmar seront seuls compétents. Le droit français est applicable.
            </p>
          </section>

          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Coordonnées</h2>
            <div className="bg-amber-50 p-6 rounded-lg">
              <p className="font-bold text-amber-900">NATURA PARQUETS® - EPENON SARL</p>
              <p className="text-gray-700 mt-2">
                6 rue du Commerce<br />
                68420 Herrlisheim-près-Colmar<br />
                Tél : 06 12 78 61 85<br />
                Email : contact@natura-parquets.fr
              </p>
              <p className="text-gray-600 text-sm mt-4">
                SIREN 881 601 207 • TVA FR81881601207 • RCS Colmar
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
