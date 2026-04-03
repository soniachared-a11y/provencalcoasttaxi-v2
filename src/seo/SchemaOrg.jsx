// Schema.org JSON-LD — TaxiService + LocalBusiness + FAQPage + Services + Breadcrumbs
import { CONTACT, FAQS, SERVICES, AVIS } from '../data/content'

const DOMAIN = 'https://www.taxisprovencaleaix.fr'

export function SchemaOrg() {
  // ── 1. LocalBusiness + TaxiService (core)
  const business = {
    '@context': 'https://schema.org',
    '@type': ['TaxiService', 'LocalBusiness'],
    '@id': `${DOMAIN}/#organization`,
    name: 'Taxis Provençale Aix',
    alternateName: [
      'Taxi Aix-en-Provence',
      'VTC Aix-en-Provence',
      'Chauffeur privé Aix-en-Provence',
      'Taxi aéroport Marseille',
      'Navette aéroport Marignane',
      'Taxi gare TGV Aix',
      'Taxi Provence',
      'VTC Provence',
      'Taxi Luberon',
    ],
    description: 'Service de chauffeur privé VTC et taxi à Aix-en-Provence. Transferts aéroport Marseille-Provence, gare TGV, déplacements affaires et tourisme en Provence. Flotte Mercedes Classe S, E et V. Tarifs fixes garantis, disponible 24h/24 7j/7.',
    url: DOMAIN,
    telephone: '+33615963275',
    email: CONTACT.email,
    image: [
      `${DOMAIN}/images/classe-s-provence.jpg`,
      `${DOMAIN}/images/classe-e-provence.jpg`,
      `${DOMAIN}/images/flotte-intercontinental.jpeg`,
    ],
    logo: `${DOMAIN}/images/favicon.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '82 avenue Henri Mauriat',
      addressLocality: 'Aix-en-Provence',
      postalCode: '13100',
      addressRegion: 'Provence-Alpes-Côte d\'Azur',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.5298,
      longitude: 5.4474,
    },
    areaServed: [
      { '@type': 'City', name: 'Aix-en-Provence', sameAs: 'https://fr.wikipedia.org/wiki/Aix-en-Provence' },
      { '@type': 'City', name: 'Marseille' },
      { '@type': 'City', name: 'Nice' },
      { '@type': 'City', name: 'Monaco' },
      { '@type': 'City', name: 'Toulon' },
      { '@type': 'City', name: 'Cannes' },
      { '@type': 'City', name: 'Salon-de-Provence' },
      { '@type': 'City', name: 'Pertuis' },
      { '@type': 'City', name: 'Manosque' },
      { '@type': 'City', name: 'Gardanne' },
      { '@type': 'City', name: 'Avignon' },
      { '@type': 'City', name: 'Gordes' },
      { '@type': 'City', name: 'Cassis' },
      { '@type': 'City', name: 'Lyon' },
      { '@type': 'AdministrativeArea', name: 'Provence-Alpes-Côte d\'Azur' },
      { '@type': 'AdministrativeArea', name: 'Bouches-du-Rhône' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Visa, Mastercard, American Express',
    hasMap: 'https://maps.google.com/?q=82+avenue+Henri+Mauriat+Aix-en-Provence',
    sameAs: [CONTACT.whatsappHref],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      ratingCount: '200',
      reviewCount: '200',
    },
    potentialAction: [
      {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${DOMAIN}/contact`,
          actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'],
        },
        name: 'Réserver un chauffeur privé',
        description: 'Réservez votre taxi Mercedes à Aix-en-Provence en ligne. Confirmation sous 15 minutes.',
      },
      {
        '@type': 'CommunicateAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'tel:+33615963275' },
        name: 'Appeler maintenant',
      },
    ],
    review: AVIS.slice(0, 3).map(a => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: a.nom },
      reviewBody: a.texte,
    })),
    // Keywords pour AI crawlers
    knowsAbout: [
      'transfert aéroport Marseille Provence Marignane',
      'taxi gare TGV Aix-en-Provence',
      'navette aéroport Marseille Aix-en-Provence',
      'chauffeur privé Luberon Gordes Roussillon',
      'VTC Aix-en-Provence tarif fixe',
      'taxi Aix-en-Provence 24h/24',
      'transport touristique Provence Calanques Cassis',
      'location Mercedes avec chauffeur Provence',
      'taxi mariage Aix-en-Provence événement',
      'taxi longue distance Nice Monaco Cannes',
      'transfert hôtel Aix-en-Provence',
      'taxi Salon-de-Provence Pertuis Manosque',
      'navette gare TGV Aix centre-ville',
      'chauffeur privé affaires Aix Marseille',
      'taxi nuit Aix-en-Provence sans supplément',
      'VTC premium Mercedes Classe S Provence',
      'taxi Avignon Aix-en-Provence',
      'transport groupe 7 places Provence',
    ],
  }

  // ── 2. Services individuels (Service schema)
  const serviceSchemas = SERVICES.map((s, i) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${DOMAIN}/services#service-${i + 1}`,
    name: s.titre,
    description: s.desc,
    provider: { '@id': `${DOMAIN}/#organization` },
    areaServed: { '@type': 'AdministrativeArea', name: 'Provence-Alpes-Côte d\'Azur' },
    serviceType: 'TaxiService',
    ...(s.prix ? { offers: { '@type': 'Offer', price: s.prix.replace(/[^0-9]/g, ''), priceCurrency: 'EUR', description: s.prix } } : {}),
  }))

  // ── 3. FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.r,
      },
    })),
  }

  // ── 4. BreadcrumbList
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: DOMAIN },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${DOMAIN}/services` },
      { '@type': 'ListItem', position: 3, name: 'Flotte', item: `${DOMAIN}/flotte` },
      { '@type': 'ListItem', position: 4, name: 'À propos', item: `${DOMAIN}/a-propos` },
      { '@type': 'ListItem', position: 5, name: 'Contact', item: `${DOMAIN}/contact` },
    ],
  }

  // ── 5. WebSite (pour sitelinks searchbox)
  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Taxis Provençale Aix',
    url: DOMAIN,
    description: 'Chauffeur privé et taxi haut de gamme à Aix-en-Provence. Mercedes avec chauffeur, transferts aéroport Marseille, gare TGV. Disponible 24h/24.',
    publisher: { '@id': `${DOMAIN}/#organization` },
  }

  const allSchemas = [business, ...serviceSchemas, faqSchema, breadcrumbs, webSite]

  return (
    <>
      {allSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
