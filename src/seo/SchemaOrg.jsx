// Schema.org JSON-LD — TaxiService + LocalBusiness
import { CONTACT } from '../data/content'

export function SchemaOrg() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['TaxiService', 'LocalBusiness'],
    name: 'Taxis Provençale Aix',
    description: 'Service de chauffeur privé et taxi à Aix-en-Provence. Transferts aéroport Marseille, voyages d\'affaires, événements. Mercedes haut de gamme, tarifs fixes, disponible 24h/24.',
    url: 'https://taxisprovencaleaix.fr',
    telephone: '+33615963275',
    email: CONTACT.email,
    image: 'https://taxisprovencaleaix.fr/images/classe-s-provence.jpg',
    logo: 'https://taxisprovencaleaix.fr/images/favicon.png',
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
      { '@type': 'City', name: 'Aix-en-Provence' },
      { '@type': 'City', name: 'Marseille' },
      { '@type': 'City', name: 'Nice' },
      { '@type': 'City', name: 'Monaco' },
      { '@type': 'City', name: 'Toulon' },
      { '@type': 'City', name: 'Cannes' },
      { '@type': 'City', name: 'Salon-de-Provence' },
      { '@type': 'City', name: 'Pertuis' },
      { '@type': 'City', name: 'Manosque' },
      { '@type': 'AdministrativeArea', name: 'Provence-Alpes-Côte d\'Azur' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: '€€€',
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
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  )
}
