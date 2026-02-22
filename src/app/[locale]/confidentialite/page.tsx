'use client';

import { useLocale } from 'next-intl';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function ConfidentialitePage() {
  const locale = useLocale() as 'fr' | 'de' | 'en';

  const content = {
    fr: {
      title: 'Politique de Confidentialité',
      lastUpdate: 'Dernière mise à jour : 20 février 2026',
      sections: [
        {
          title: '1. Introduction',
          content: `EPENON Active SARL, exploitant la marque "Natura Parquets", s'engage à protéger la vie privée des utilisateurs de son site www.natura-parquets.fr.

Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD).`
        },
        {
          title: '2. Responsable du traitement',
          content: `**EPENON Active SARL**
6 rue du Commerce
68420 Herrlisheim-près-Colmar
France
Email : contact@natura-parquets.fr
Téléphone : 06 12 78 61 85`
        },
        {
          title: '3. Données collectées',
          content: `Nous collectons les données suivantes :

**Données que vous nous fournissez :**
- Nom et prénom
- Adresse email
- Numéro de téléphone
- Adresse postale
- Informations de paiement (traitées de manière sécurisée par notre prestataire de paiement)

**Données collectées automatiquement :**
- Adresse IP
- Type de navigateur
- Pages visitées
- Date et heure de connexion
- Cookies`
        },
        {
          title: '4. Finalités du traitement',
          content: `Vos données sont utilisées pour :

- Traiter et suivre vos commandes
- Gérer votre compte client
- Vous contacter concernant vos commandes
- Répondre à vos demandes d'information
- Envoyer des communications commerciales (avec votre consentement)
- Améliorer notre site et nos services
- Respecter nos obligations légales`
        },
        {
          title: '5. Base légale',
          content: `Le traitement de vos données repose sur :

- **L'exécution du contrat** : traitement des commandes
- **Votre consentement** : envoi de newsletters, cookies non essentiels
- **L'intérêt légitime** : amélioration des services, prévention de la fraude
- **L'obligation légale** : conservation des factures, obligations fiscales`
        },
        {
          title: '6. Durée de conservation',
          content: `Nous conservons vos données :

- **Données clients** : pendant la durée de la relation commerciale + 3 ans
- **Données de commande** : 10 ans (obligations comptables)
- **Données de prospection** : 3 ans après le dernier contact
- **Cookies** : 13 mois maximum`
        },
        {
          title: '7. Destinataires des données',
          content: `Vos données peuvent être transmises à :

- Nos équipes internes (vente, logistique, comptabilité)
- Nos prestataires de services (hébergement, paiement, livraison)
- Les autorités compétentes (sur réquisition légale)

Nous ne vendons jamais vos données à des tiers.`
        },
        {
          title: '8. Transferts hors UE',
          content: `Certains de nos prestataires peuvent être situés hors de l'Union européenne. Dans ce cas, nous nous assurons que des garanties appropriées sont en place (clauses contractuelles types, certification Privacy Shield, etc.).`
        },
        {
          title: '9. Vos droits',
          content: `Conformément au RGPD, vous disposez des droits suivants :

- **Droit d'accès** : obtenir une copie de vos données
- **Droit de rectification** : corriger vos données inexactes
- **Droit à l'effacement** : demander la suppression de vos données
- **Droit à la limitation** : limiter le traitement de vos données
- **Droit à la portabilité** : recevoir vos données dans un format structuré
- **Droit d'opposition** : vous opposer au traitement de vos données
- **Droit de retirer votre consentement** : à tout moment

Pour exercer ces droits, contactez-nous à : contact@natura-parquets.fr

Vous avez également le droit d'introduire une réclamation auprès de la CNIL (www.cnil.fr).`
        },
        {
          title: '10. Cookies',
          content: `Notre site utilise des cookies :

**Cookies essentiels :**
- Session utilisateur
- Panier d'achat
- Préférences de langue

**Cookies analytiques (avec consentement) :**
- Google Analytics
- Statistiques de visite

Vous pouvez gérer vos préférences de cookies via le bandeau affiché lors de votre première visite ou dans les paramètres de votre navigateur.`
        },
        {
          title: '11. Sécurité',
          content: `Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données :

- Chiffrement SSL/TLS pour toutes les transmissions
- Accès restreint aux données personnelles
- Sauvegarde régulière des données
- Mise à jour régulière de nos systèmes`
        },
        {
          title: '12. Modification de la politique',
          content: `Nous pouvons modifier cette politique de confidentialité à tout moment. La date de dernière mise à jour est indiquée en haut de cette page. Nous vous encourageons à la consulter régulièrement.`
        },
        {
          title: '13. Contact',
          content: `Pour toute question concernant cette politique ou vos données personnelles :

**EPENON Active SARL**
6 rue du Commerce
68420 Herrlisheim-près-Colmar
France

Email : contact@natura-parquets.fr
Téléphone : 06 12 78 61 85`
        }
      ]
    },
    de: {
      title: 'Datenschutzerklärung',
      lastUpdate: 'Letzte Aktualisierung: 20. Februar 2026',
      sections: [
        {
          title: '1. Einleitung',
          content: `EPENON Active SARL, die die Marke "Natura Parquets" betreibt, verpflichtet sich, die Privatsphäre der Benutzer ihrer Website www.natura-parquets.fr zu schützen.`
        },
        {
          title: '2. Verantwortlicher',
          content: `**EPENON Active SARL**
6 rue du Commerce
68420 Herrlisheim-près-Colmar
Frankreich
E-Mail: contact@natura-parquets.fr`
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      lastUpdate: 'Last updated: February 20, 2026',
      sections: [
        {
          title: '1. Introduction',
          content: `EPENON Active SARL, operating the brand "Natura Parquets", is committed to protecting the privacy of users of its website www.natura-parquets.fr.`
        },
        {
          title: '2. Data Controller',
          content: `**EPENON Active SARL**
6 rue du Commerce
68420 Herrlisheim-près-Colmar
France
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
