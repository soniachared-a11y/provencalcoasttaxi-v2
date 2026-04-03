// Schema.org JSON-LD — TaxiService + LocalBusiness
import { CONTACT } from '../data/content'

export function SchemaOrg() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['TaxiService', 'LocalBusiness'],
    name: 'Taxis Provençal Aix',
    description: 'Service de chauffeur privé et taxi à Aix-en-Provence. Transferts aéroport Marseille, voyages d\'affaires, événements. Mercedes haut de gamme, tarifs fixes, disponible 24h/24.',
    url: 'https://taxisprovencaleaix.fr',
    telephone: '+33615963275',
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '82 avenue Henri Mauriat',
      addressLocality: 'Aix-en-Provence',
      postalCode: '13100',
      addressCountry: 'FR',
    },
    areaServed: ['Aix-en-Provence', 'Marseille', 'Nice', 'Monaco', 'Toulon', 'Cannes', 'Provence-Alpes-Côte d\'Azur'],
    openingHours: 'Mo-Su 00:00-23:59',
    priceRange: '€€€',
    hasMap: 'https://maps.google.com/?q=82+avenue+Henri+Mauriat+Aix-en-Provence',
    sameAs: [CONTACT.waHref],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  )
}
