'use client';

import { useLocale } from 'next-intl';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function MentionsLegalesPage() {
  const locale = useLocale() as 'fr' | 'de' | 'en';

  const content = {
    fr: {
      title: 'Mentions Légales',
      lastUpdate: 'Dernière mise à jour : 20 février 2026',
      sections: [
        {
          title: '1. Éditeur du site',
          content: `Le site www.natura-parquets.fr est édité par :

**EPENON Active SARL**
Société à responsabilité limitée (SARL)
Capital social : [À compléter]

**Siège social :**
6 rue du Commerce
68420 Herrlisheim-près-Colmar
France

**Immatriculation :**
- SIREN : 881 601 207
- SIRET (siège) : 881 601 207 00015
- N° TVA intracommunautaire : FR81881601207
- Code APE/NAF : 6630Z (Gestion de fonds)

**Date de création :** 13 mai 2020

**Direction :** Conseil d'administration Groupe EPENON

**Marque commerciale :** Natura Parquets est une marque de EPENON Active SARL`
        },
        {
          title: '2. Directeur de la publication',
          content: `Le directeur de la publication du site est :
**EPENON Active SARL**, représentée par le Conseil d'administration Groupe EPENON.

Contact : contact@natura-parquets.fr`
        },
        {
          title: '3. Hébergement',
          content: `Le site est hébergé par :

**Netlify, Inc.**
2325 3rd Street, Suite 296
San Francisco, California 94107
États-Unis

Site web : www.netlify.com`
        },
        {
          title: '4. Propriété intellectuelle',
          content: `L'ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes, icônes, sons, logiciels, etc.) est la propriété exclusive de EPENON Active SARL ou de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.

Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit, est interdite sans l'autorisation écrite préalable de EPENON Active SARL.

La marque "Natura Parquets" et le logo associé sont des marques déposées. Toute reproduction est interdite.`
        },
        {
          title: '5. Données personnelles',
          content: `EPENON Active SARL s'engage à respecter la réglementation en vigueur applicable au traitement de données à caractère personnel, et notamment le Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 (RGPD).

**Responsable du traitement :**
EPENON Active SARL
6 rue du Commerce
68420 Herrlisheim-près-Colmar
Email : contact@natura-parquets.fr

**Données collectées :**
- Données de contact (nom, email, téléphone)
- Données de navigation (cookies)
- Données de commande

**Finalités :**
- Traitement des commandes
- Gestion de la relation client
- Envoi de communications commerciales (avec consentement)
- Amélioration du site

**Durée de conservation :**
Les données sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles sont collectées, et au maximum 3 ans après le dernier contact.

**Vos droits :**
Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition au traitement de vos données personnelles.

Pour exercer ces droits, contactez-nous à : contact@natura-parquets.fr`
        },
        {
          title: '6. Cookies',
          content: `Le site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic.

**Types de cookies utilisés :**
- Cookies essentiels (fonctionnement du site)
- Cookies analytiques (statistiques de visite)
- Cookies de préférence (langue, panier)

Vous pouvez configurer votre navigateur pour refuser les cookies. Cependant, certaines fonctionnalités du site pourraient ne plus être disponibles.`
        },
        {
          title: '7. Limitation de responsabilité',
          content: `EPENON Active SARL s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, EPENON Active SARL ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.

EPENON Active SARL décline toute responsabilité :
- Pour toute interruption du site
- Pour toute survenance de bugs
- Pour toute inexactitude ou omission portant sur des informations disponibles sur le site
- Pour tout dommage résultant d'une intrusion frauduleuse d'un tiers`
        },
        {
          title: '8. Liens hypertextes',
          content: `Le site peut contenir des liens vers d'autres sites internet. EPENON Active SARL n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.`
        },
        {
          title: '9. Droit applicable',
          content: `Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.`
        },
        {
          title: '10. Contact',
          content: `Pour toute question concernant ces mentions légales :

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
      title: 'Impressum',
      lastUpdate: 'Letzte Aktualisierung: 20. Februar 2026',
      sections: [
        {
          title: '1. Herausgeber der Website',
          content: `Die Website www.natura-parquets.fr wird herausgegeben von:

**EPENON Active SARL**
Gesellschaft mit beschränkter Haftung

**Sitz:**
6 rue du Commerce
68420 Herrlisheim-près-Colmar
Frankreich

**Registrierung:**
- SIREN: 881 601 207
- SIRET: 881 601 207 00015
- USt-IdNr.: FR81881601207

**Leitung:** Vorstand Gruppe EPENON

**Handelsmarke:** Natura Parquets ist eine Marke von EPENON Active SARL`
        },
        {
          title: '2. Verantwortlich für den Inhalt',
          content: `Verantwortlich: EPENON Active SARL, vertreten durch den Vorstand Gruppe EPENON

Kontakt: contact@natura-parquets.fr`
        }
      ]
    },
    en: {
      title: 'Legal Notice',
      lastUpdate: 'Last updated: February 20, 2026',
      sections: [
        {
          title: '1. Website Publisher',
          content: `The website www.natura-parquets.fr is published by:

**EPENON Active SARL**
Limited Liability Company

**Registered Office:**
6 rue du Commerce
68420 Herrlisheim-près-Colmar
France

**Registration:**
- SIREN: 881 601 207
- SIRET: 881 601 207 00015
- VAT Number: FR81881601207

**Management:** EPENON Group Board of Directors

**Trademark:** Natura Parquets is a brand of EPENON Active SARL`
        },
        {
          title: '2. Publication Director',
          content: `Publication Director: EPENON Active SARL, represented by EPENON Group Board of Directors

Contact: contact@natura-parquets.fr`
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
