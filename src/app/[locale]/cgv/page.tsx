'use client';

import { useLocale } from 'next-intl';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function CGVPage() {
  const locale = useLocale() as 'fr' | 'de' | 'en';

  const content = {
    fr: {
      title: 'Conditions Générales de Vente',
      lastUpdate: 'Dernière mise à jour : 20 février 2026',
      sections: [
        {
          title: 'Article 1 - Objet',
          content: `Les présentes Conditions Générales de Vente (CGV) régissent les ventes de parquets et produits associés effectuées par la société EPENON Active SARL, exploitant la marque "Natura Parquets", auprès de ses clients professionnels et particuliers via le site www.natura-parquets.fr.

Toute commande implique l'acceptation sans réserve des présentes CGV.`
        },
        {
          title: 'Article 2 - Vendeur',
          content: `**EPENON Active SARL**
SIREN : 881 601 207
SIRET : 881 601 207 00015
N° TVA : FR81881601207
Siège social : 6 rue du Commerce, 68420 Herrlisheim-près-Colmar
Email : contact@natura-parquets.fr
Téléphone : 06 12 78 61 85`
        },
        {
          title: 'Article 3 - Produits',
          content: `Les produits proposés à la vente sont des parquets en chêne européen, ainsi que des produits d'entretien et accessoires associés.

Les photographies et descriptions des produits sont données à titre indicatif. Le bois étant un matériau naturel, des variations de teinte, de veinage et de structure sont normales et ne constituent pas un défaut.

Les produits sont conformes à la législation française et européenne en vigueur.`
        },
        {
          title: 'Article 4 - Prix',
          content: `Les prix sont indiqués en euros, toutes taxes comprises (TTC), hors frais de livraison.

Les prix applicables sont ceux en vigueur au jour de la commande. EPENON Active SARL se réserve le droit de modifier ses prix à tout moment, sans que cela n'affecte les commandes déjà validées.

Pour les professionnels, les prix peuvent être communiqués hors taxes (HT) sur demande.`
        },
        {
          title: 'Article 5 - Commande',
          content: `**5.1 Passation de commande**
La commande peut être passée :
- Sur le site www.natura-parquets.fr
- Par email à contact@natura-parquets.fr
- Par téléphone au 06 12 78 61 85

**5.2 Validation**
La commande est validée après :
- Confirmation écrite par email
- Réception de l'acompte (30% minimum)

**5.3 Modification / Annulation**
Toute modification ou annulation doit être demandée par écrit. Les commandes sur mesure ne peuvent être annulées.`
        },
        {
          title: 'Article 6 - Paiement',
          content: `**6.1 Modalités de paiement**
Le paiement peut s'effectuer par :
- Virement bancaire
- Chèque
- Carte bancaire (via paiement sécurisé)

**6.2 Conditions**
- Acompte de 30% à la commande
- Solde à réception de la marchandise ou avant livraison

**6.3 Retard de paiement**
En cas de retard de paiement, des pénalités de retard seront appliquées au taux de 3 fois le taux d'intérêt légal, ainsi qu'une indemnité forfaitaire de 40€ pour frais de recouvrement.`
        },
        {
          title: 'Article 7 - Livraison',
          content: `**7.1 Délais**
Les délais de livraison sont donnés à titre indicatif :
- Produits en stock : 2-3 semaines
- Produits sur commande : 3-6 semaines

**7.2 Frais de livraison**
- France métropolitaine : GRATUIT
- Belgique, Luxembourg, Suisse : sur devis
- Autres destinations : nous consulter

**7.3 Modalités**
La livraison est effectuée sur palette, avec camion équipé d'un hayon. Le client doit s'assurer de l'accessibilité du lieu de livraison.

**7.4 Réception**
À la réception, le client doit vérifier l'état des colis et émettre des réserves précises sur le bon de livraison en cas de dommage. Toute réclamation doit être confirmée par lettre recommandée dans les 48 heures.`
        },
        {
          title: 'Article 8 - Droit de rétractation',
          content: `**8.1 Pour les particuliers**
Conformément à l'article L221-18 du Code de la consommation, le client particulier dispose d'un délai de 14 jours à compter de la réception des produits pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.

**8.2 Exclusions**
Le droit de rétractation ne s'applique pas :
- Aux produits sur mesure ou personnalisés
- Aux produits descellés ne pouvant être renvoyés pour des raisons d'hygiène

**8.3 Modalités**
Le client doit notifier sa décision par écrit. Les produits doivent être retournés dans leur emballage d'origine, en parfait état. Les frais de retour sont à la charge du client.

**8.4 Remboursement**
Le remboursement sera effectué dans un délai de 14 jours suivant la réception des produits retournés.`
        },
        {
          title: 'Article 9 - Garanties',
          content: `**9.1 Garantie légale de conformité**
Conformément aux articles L217-4 et suivants du Code de la consommation, le vendeur est tenu de livrer un bien conforme au contrat et répond des défauts de conformité existant lors de la délivrance.

**9.2 Garantie des vices cachés**
Conformément aux articles 1641 et suivants du Code civil, le vendeur est tenu de la garantie à raison des défauts cachés de la chose vendue.

**9.3 Garantie fabricant**
Les parquets Natura Parquets bénéficient d'une garantie fabricant de 25 ans en usage résidentiel normal, couvrant les défauts de fabrication.

Cette garantie ne couvre pas :
- L'usure normale
- Les dommages dus à une pose incorrecte
- Les dommages dus à un entretien inapproprié
- Les variations naturelles du bois`
        },
        {
          title: 'Article 10 - Réclamations',
          content: `Toute réclamation doit être adressée par écrit à :

EPENON Active SARL
6 rue du Commerce
68420 Herrlisheim-près-Colmar
Email : contact@natura-parquets.fr

Le client doit conserver la preuve d'achat et joindre des photos en cas de réclamation relative à un défaut.`
        },
        {
          title: 'Article 11 - Propriété intellectuelle',
          content: `La marque "Natura Parquets", le logo et l'ensemble des contenus du site sont la propriété exclusive de EPENON Active SARL. Toute reproduction est interdite sans autorisation.`
        },
        {
          title: 'Article 12 - Données personnelles',
          content: `Les données personnelles collectées sont traitées conformément à notre Politique de confidentialité et au RGPD. Pour plus d'informations, consultez nos Mentions légales.`
        },
        {
          title: 'Article 13 - Médiation',
          content: `En cas de litige, le client peut recourir gratuitement au service de médiation de la consommation. Le médiateur compétent est :

[Nom du médiateur à compléter]

Conformément à l'article L612-1 du Code de la consommation, le client peut également utiliser la plateforme de règlement en ligne des litiges de l'Union européenne : https://ec.europa.eu/consumers/odr`
        },
        {
          title: 'Article 14 - Droit applicable',
          content: `Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents, sauf disposition légale contraire.`
        },
        {
          title: 'Article 15 - Modification des CGV',
          content: `EPENON Active SARL se réserve le droit de modifier les présentes CGV à tout moment. Les CGV applicables sont celles en vigueur à la date de la commande.`
        }
      ]
    },
    de: {
      title: 'Allgemeine Geschäftsbedingungen',
      lastUpdate: 'Letzte Aktualisierung: 20. Februar 2026',
      sections: [
        {
          title: 'Artikel 1 - Gegenstand',
          content: `Diese Allgemeinen Geschäftsbedingungen (AGB) regeln den Verkauf von Parkett und zugehörigen Produkten durch EPENON Active SARL unter der Marke "Natura Parquets".

Jede Bestellung impliziert die vorbehaltlose Annahme dieser AGB.`
        },
        {
          title: 'Artikel 2 - Verkäufer',
          content: `**EPENON Active SARL**
SIREN: 881 601 207
USt-IdNr.: FR81881601207
Adresse: 6 rue du Commerce, 68420 Herrlisheim-près-Colmar, Frankreich
E-Mail: contact@natura-parquets.fr`
        }
      ]
    },
    en: {
      title: 'Terms and Conditions',
      lastUpdate: 'Last updated: February 20, 2026',
      sections: [
        {
          title: 'Article 1 - Purpose',
          content: `These Terms and Conditions govern the sales of parquet flooring and related products by EPENON Active SARL, operating under the brand "Natura Parquets".

Any order implies unreserved acceptance of these Terms and Conditions.`
        },
        {
          title: 'Article 2 - Seller',
          content: `**EPENON Active SARL**
SIREN: 881 601 207
VAT Number: FR81881601207
Address: 6 rue du Commerce, 68420 Herrlisheim-près-Colmar, France
Email: contact@natura-parquets.fr`
        }
      ]
    }
  };

  const pageContent = content[locale];

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <article className="py-16 px-6 mt-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl text-natura-900 mb-2">
            {pageContent.title}
          </h1>
          <p className="text-natura-500 text-sm mb-12">
            {pageContent.lastUpdate}
          </p>

          <div className="space-y-10">
            {pageContent.sections.map((section, index) => (
              <section key={index}>
                <h2 className="font-semibold text-xl text-natura-900 mb-4">
                  {section.title}
                </h2>
                <div 
                  className="text-natura-600 leading-relaxed prose prose-natura max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: section.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br />')
                  }}
                />
              </section>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
