// MentionsLegalesPage.jsx — Page Mentions Légales
// À placer dans src/pages/ et ajouter la route dans App.jsx :
// import MentionsLegalesPage from './pages/MentionsLegalesPage'
// <Route path="/mentions-legales" element={<MentionsLegalesPage />} />

import { useEffect } from 'react'

/* ── Données structurées ── */
const EDITEUR = {
  raison: 'Taxis Provençal Aix',
  dirigeant: 'Yassine Ouerfelli',
  statut: '[À COMPLÉTER : Auto-entrepreneur / SARL / SAS / EI]',
  siret: '[À COMPLÉTER : N° SIRET]',
  licence: 'N°013230073',
  adresse: '82 avenue Henri Mauriat, Building 14, Résidence Saint Benoit, 13100 Aix-en-Provence',
  tel: '06 15 96 32 75',
  email: 'provencalcoastdriver@gmail.com',
}

const HEBERGEUR = {
  nom: 'Vercel Inc.',
  adresse: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
  site: 'https://vercel.com',
}

/* ── Sections du contenu ── */
const SECTIONS = [
  {
    num: '01',
    titre: 'Éditeur du site',
    type: 'card',
    items: [
      ['Raison sociale', EDITEUR.raison],
      ['Dirigeant / Responsable de la publication', EDITEUR.dirigeant],
      ['Statut', EDITEUR.statut, true],
      ['SIRET', EDITEUR.siret, true],
      ['Licence VTC', EDITEUR.licence],
      ['Adresse', EDITEUR.adresse],
      ['Téléphone', EDITEUR.tel, false, `tel:+33${EDITEUR.tel.replace(/\s/g, '').slice(1)}`],
      ['Email', EDITEUR.email, false, `mailto:${EDITEUR.email}`],
    ],
  },
  {
    num: '02',
    titre: 'Hébergement',
    type: 'card',
    items: [
      ['Hébergeur', HEBERGEUR.nom],
      ['Adresse', HEBERGEUR.adresse],
      ['Site web', 'vercel.com', false, HEBERGEUR.site],
    ],
  },
  {
    num: '03',
    titre: 'Activité réglementée',
    type: 'mixed',
    paragraphs: [
      "L'activité de Voiture de Transport avec Chauffeur (VTC) est réglementée par le Code des transports, notamment les articles L.3120-1 et suivants. Le chauffeur est titulaire d'une carte professionnelle VTC délivrée par la préfecture compétente.",
    ],
    items: [
      ['Licence VTC', EDITEUR.licence],
      ['Inscription', 'Registre des VTC tenu par le ministère chargé des transports'],
    ],
  },
  {
    num: '04',
    titre: 'Propriété intellectuelle',
    type: 'text',
    paragraphs: [
      "L'ensemble des éléments constituant le site taxisprovencaleaix.fr — textes, images, logos, graphismes, icônes, vidéos, mise en page — est protégé par les lois en vigueur relatives à la propriété intellectuelle.",
      "Toute reproduction, représentation, modification ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de Taxis Provençal Aix.",
      "Toute exploitation non autorisée sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux articles L.335-2 et suivants du Code de la propriété intellectuelle.",
    ],
  },
  {
    num: '05',
    titre: 'Protection des données personnelles',
    type: 'subsections',
    subsections: [
      {
        titre: 'Responsable du traitement',
        text: `Le responsable du traitement des données à caractère personnel est ${EDITEUR.dirigeant}, joignable à l'adresse ${EDITEUR.email}.`,
      },
      {
        titre: 'Données collectées',
        text: "Dans le cadre de son activité, Taxis Provençal Aix est amenée à collecter les données suivantes : nom, prénom, adresse email, numéro de téléphone, adresse de prise en charge et de destination, ainsi que toute information nécessaire à la réalisation d'une prestation de transport.",
      },
      {
        titre: 'Finalités du traitement',
        text: "Les données collectées sont utilisées pour la gestion des réservations, l'exécution des prestations de transport, la facturation, la communication avec les clients et l'amélioration des services proposés.",
      },
      {
        titre: 'Base légale',
        text: "Le traitement des données repose sur l'exécution du contrat de transport (article 6.1.b du RGPD) et, le cas échéant, sur le consentement de l'utilisateur (article 6.1.a du RGPD).",
      },
      {
        titre: 'Durée de conservation',
        text: "Les données personnelles sont conservées pendant la durée strictement nécessaire à la réalisation des finalités mentionnées ci-dessus, et au maximum pendant 3 ans à compter du dernier contact avec le client, sauf obligation légale de conservation plus longue.",
      },
      {
        titre: 'Vos droits',
        text: `Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement, de portabilité des données et d'opposition. Pour exercer ces droits, adressez un email à ${EDITEUR.email}. En cas de litige, vous pouvez introduire une réclamation auprès de la CNIL (www.cnil.fr).`,
      },
      {
        titre: 'Transfert de données',
        text: "Les données peuvent être hébergées en dehors de l'Union européenne via les services d'hébergement (Vercel). Ces transferts sont encadrés par les clauses contractuelles types de la Commission européenne.",
      },
    ],
  },
  {
    num: '06',
    titre: 'Cookies',
    type: 'subsections',
    subsections: [
      {
        titre: 'Cookies strictement nécessaires',
        text: "Indispensables au fonctionnement du site, ils ne nécessitent pas votre consentement.",
      },
      {
        titre: 'Cookies de mesure d\'audience',
        text: "Utilisés pour analyser la fréquentation du site et améliorer son contenu. Ces cookies sont soumis à votre consentement.",
      },
      {
        titre: 'Gestion des cookies',
        text: "Vous pouvez modifier vos préférences en matière de cookies via les paramètres de votre navigateur. Le refus des cookies peut limiter l'accès à certaines fonctionnalités du site.",
      },
    ],
  },
  {
    num: '07',
    titre: 'Limitation de responsabilité',
    type: 'text',
    paragraphs: [
      "Les informations diffusées sur le site taxisprovencaleaix.fr sont fournies à titre indicatif et ne sauraient engager la responsabilité de l'éditeur. Malgré les efforts pour maintenir les informations à jour, Taxis Provençal Aix ne peut garantir leur exactitude ou leur complétude.",
      "L'éditeur ne saurait être tenu responsable des dommages directs ou indirects résultant de l'accès ou de l'utilisation du site, y compris l'inaccessibilité, les pertes de données ou les dommages pouvant affecter votre équipement informatique.",
    ],
  },
  {
    num: '08',
    titre: 'Liens hypertextes',
    type: 'text',
    paragraphs: [
      "Le site peut contenir des liens vers d'autres sites internet. Taxis Provençal Aix n'exerce aucun contrôle sur le contenu de ces sites tiers et décline toute responsabilité quant à leur contenu ou aux dommages pouvant résulter de leur utilisation.",
    ],
  },
  {
    num: '09',
    titre: 'Droit applicable',
    type: 'text',
    paragraphs: [
      "Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut de résolution amiable, les tribunaux compétents d'Aix-en-Provence seront seuls compétents.",
    ],
  },
  {
    num: '10',
    titre: 'Mise à jour',
    type: 'text',
    paragraphs: [
      "Les présentes mentions légales peuvent être modifiées à tout moment.",
    ],
    extra: 'Dernière mise à jour : Avril 2026',
  },
]

/* ── Composants internes ── */
function InfoCard({ items }) {
  return (
    <div
      className="bg-white rounded-xl border mt-4 px-7 py-6"
      style={{ borderColor: 'var(--border)' }}
    >
      {items.map(([label, value, isPlaceholder, href], i) => (
        <p key={i} className="text-[0.9rem] mb-1.5 last:mb-0" style={{ color: 'var(--texte-light)' }}>
          <strong className="font-medium" style={{ color: 'var(--texte)' }}>{label} : </strong>
          {isPlaceholder ? (
            <span
              className="italic text-[0.85rem] rounded px-1.5 py-0.5"
              style={{ color: 'var(--olive)', background: 'rgba(107,125,74,0.08)' }}
            >
              {value}
            </span>
          ) : href ? (
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="transition-colors duration-300"
              style={{ color: 'var(--olive)' }}
            >
              {value}
            </a>
          ) : (
            value
          )}
        </p>
      ))}
    </div>
  )
}

function SectionBlock({ section }) {
  return (
    <section className="mb-14">
      {/* Titre avec numéro */}
      <h2
        className="font-serif text-[1.6rem] font-normal pb-3 mb-5 border-b"
        style={{ color: 'var(--texte)', borderColor: 'var(--border)' }}
      >
        <span
          className="block text-[0.75rem] font-medium mb-1 tracking-wide"
          style={{ color: 'var(--olive)', fontFamily: "'Sora', sans-serif" }}
        >
          {section.num}
        </span>
        {section.titre}
      </h2>

      {/* Paragraphes */}
      {section.paragraphs?.map((p, i) => (
        <p key={i} className="text-[0.9rem] font-light mb-3.5 leading-relaxed" style={{ color: 'var(--texte-light)' }}>
          {p}
        </p>
      ))}

      {/* Card info */}
      {(section.type === 'card' || section.type === 'mixed') && section.items && (
        <InfoCard items={section.items} />
      )}

      {/* Sous-sections (RGPD, Cookies) */}
      {section.subsections?.map((sub, i) => (
        <div key={i}>
          <h3
            className="text-[0.85rem] font-semibold tracking-wide mt-7 mb-2.5"
            style={{ color: 'var(--texte)' }}
          >
            {sub.titre}
          </h3>
          <p className="text-[0.9rem] font-light mb-3.5 leading-relaxed" style={{ color: 'var(--texte-light)' }}>
            {sub.text}
          </p>
        </div>
      ))}

      {/* Extra (date de mise à jour) */}
      {section.extra && (
        <p className="text-[0.9rem] mt-2">
          <strong className="font-medium" style={{ color: 'var(--texte)' }}>{section.extra}</strong>
        </p>
      )}
    </section>
  )
}

/* ── Page principale ── */
export default function MentionsLegalesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      {/* Hero */}
      <header
        className="relative text-center overflow-hidden"
        style={{
          background: 'var(--texte)',
          padding: 'clamp(140px, 18vh, 200px) 24px clamp(80px, 10vh, 120px)',
        }}
      >
        {/* Glow subtil */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(107,125,74,0.12) 0%, transparent 60%)',
          }}
        />

        <span
          className="relative inline-block text-[0.7rem] font-medium tracking-[0.2em] uppercase mb-8"
          style={{ color: 'var(--olive)' }}
        >
          Informations légales
        </span>

        <h1
          className="font-serif font-normal leading-tight mx-auto mb-5"
          style={{
            color: 'var(--cream)',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            maxWidth: '700px',
          }}
        >
          Mentions légales
        </h1>

        <p
          className="text-[0.95rem] font-light mx-auto"
          style={{
            color: 'rgba(246,243,238,0.5)',
            maxWidth: '480px',
          }}
        >
          Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004
          pour la confiance dans l'économie numérique.
        </p>
      </header>

      {/* Contenu */}
      <div className="max-w-[780px] mx-auto px-6 md:px-8 py-20">
        {SECTIONS.map((section) => (
          <SectionBlock key={section.num} section={section} />
        ))}
      </div>
    </main>
  )
}
