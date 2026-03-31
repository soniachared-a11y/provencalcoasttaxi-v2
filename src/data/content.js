// ── Données statiques — Provençal Coast Taxi
// Source unique de vérité. Ne jamais hardcoder dans les composants.

export const CONTACT = {
  tel: '06 15 96 32 75',
  telHref: 'tel:+33615963275',
  email: 'provencalcoastdriver@gmail.com',
  adresse: '82 avenue Henri Mauriat, 13100 Aix-en-Provence',
  licence: 'N°013230073',
  siret: 'SIRET N°013230073',
  zone: 'Aix-en-Provence & Provence',
}

// ── SERVICES (5 strips expandables)
// Chaque service a un vrai texte commercial de 3 lignes minimum
export const SERVICES = [
  {
    icon: 'Plane',
    titre: 'Transfert Aéroport',
    desc: 'Prise en charge personnalisée dès votre atterrissage à Marseille-Provence ou Nice Côte d\'Azur. Suivi de vol en temps réel, panneau nominatif à l\'arrivée, assistance bagages. Tarif fixe garanti, pas de supplément en cas de retard de vol.',
    tags: ['Suivi de vol', 'Tarif fixe', 'Panneau nominatif'],
    image: '/images/classe-s-parking.jpg',
    prix: 'dès 65€',
  },
  {
    icon: 'Briefcase',
    titre: 'Déplacement Affaires',
    desc: 'Ponctualité absolue et discrétion garantie pour vos rendez-vous professionnels. Mise à disposition à la demi-journée ou journée complète. Wi-Fi à bord, chargeurs, eau minérale. Votre bureau mobile en Mercedes Classe S.',
    tags: ['Wi-Fi', 'Discrétion', 'Mise à disposition'],
    image: '/images/classe-s-interieur.jpg',
    prix: 'dès 45€/h',
  },
  {
    icon: 'Wine',
    titre: 'Événements & Soirées',
    desc: 'Mariages, galas, concerts, soirées privées. Aller-retour avec chauffeur dédié qui reste à votre disposition toute la soirée. Attente incluse, itinéraire flexible. Profitez de votre événement, on s\'occupe du reste.',
    tags: ['Aller-retour', 'Attente incluse', 'Chauffeur dédié'],
    image: '/images/flotte-chateau.jpeg',
    prix: 'sur devis',
  },
  {
    icon: 'MapPin',
    titre: 'Longue Distance',
    desc: 'Nice, Lyon, Monaco, Cannes et au-delà. Voyagez en tout confort sans les contraintes du train ou de l\'avion. Véhicule privé, arrêts à la demande, tarif négocié pour les longs trajets.',
    tags: ['France entière', 'Tarif négocié', 'Arrêts libres'],
    image: '/images/classe-s-bastide.jpg',
    prix: 'dès 1.50€/km',
  },
  {
    icon: 'Compass',
    titre: 'Visite Touristique',
    desc: 'Gordes, Roussillon, les Calanques, le Luberon, les champs de lavande. Itinéraires sur mesure à la demi-journée ou journée complète. Votre chauffeur connaît chaque route, chaque point de vue, chaque adresse secrète de Provence.',
    tags: ['Sur mesure', 'Demi-journée', 'Guide local'],
    image: '/images/lavande-provence.jpg',
    prix: 'dès 90€/demi-journée',
  },
]

// ── FLOTTE (3 véhicules — grille éditoriale)
export const FLOTTE = [
  {
    modele: 'Mercedes Classe E',
    classe: 'Berline confort',
    desc: 'Notre berline de référence pour les transferts quotidiens. Confort premium, coffre généreux et consommation raisonnée. Idéale pour les trajets aéroport et les déplacements professionnels jusqu\'à 3 passagers.',
    pax: 3,
    bags: 3,
    featureLabel: 'Équipement',
    feature: 'Wi-Fi & USB',
    badge: 'Business',
    image: '/images/classe-e-provence.jpg',
    imageInterieur: '/images/classe-s-interieur.jpg',
  },
  {
    modele: 'Mercedes Classe S',
    classe: 'Premium',
    desc: 'Le summum du luxe automobile. Sièges massants, suspension pneumatique, isolation phonique totale. L\'expérience ultime pour vos clients VIP, vos événements prestigieux ou simplement parce que vous le méritez.',
    pax: 3,
    bags: 3,
    featureLabel: 'Confort',
    feature: 'Sièges massants',
    badge: 'Prestige',
    phare: true,
    image: '/images/classe-s-provence.jpg',
    imageInterieur: '/images/classe-s-interieur.jpg',
  },
  {
    modele: 'Mercedes Classe V',
    classe: 'Van premium',
    desc: 'L\'espace d\'un van, le confort d\'une limousine. Jusqu\'à 7 passagers avec leurs bagages. Parfaite pour les familles, les groupes d\'affaires ou les transferts événementiels.',
    pax: 7,
    bags: 7,
    featureLabel: 'Capacité',
    feature: '7 places + bagages',
    badge: 'Groupe',
    image: '/images/classe-v-provence.jpg',
    imageInterieur: '/images/classe-v-interieur.jpg',
  },
]

// ── ZONES (5 destinations avec contexte)
export const ZONES = [
  {
    destination: 'Aéroport Marseille',
    duree: '35 min',
    distance: '42 km',
    prix: 'dès 65€',
    detail: 'Terminal 1 & 2. Prise en charge niveau arrivées.',
  },
  {
    destination: 'Gare TGV Aix',
    duree: '15 min',
    distance: '12 km',
    prix: 'dès 25€',
    detail: 'Parvis de la gare, place dédiée VTC.',
  },
  {
    destination: 'Aéroport Nice',
    duree: '2h',
    distance: '180 km',
    prix: 'dès 220€',
    detail: 'Transfert direct sans arrêt. Wi-Fi à bord.',
  },
  {
    destination: 'Cassis / Calanques',
    duree: '45 min',
    distance: '50 km',
    prix: 'dès 75€',
    detail: 'Route des Crêtes et port de Cassis.',
  },
  {
    destination: 'Gordes / Luberon',
    duree: '1h',
    distance: '65 km',
    prix: 'dès 90€',
    detail: 'Villages perchés, marchés provençaux.',
  },
]

// ── AVIS (5 témoignages — citation featured + marquee)
export const AVIS = [
  {
    nom: 'Sophie L.',
    ville: 'Aix-en-Provence',
    note: 5,
    texte: 'Service impeccable pour mon transfert vers l\'aéroport de Marseille. Chauffeur ponctuel à 5h du matin, véhicule immaculé, suivi de vol activé. Aucune surprise sur le tarif. Je recommande vivement Provençal Coast pour tout déplacement en Provence.',
  },
  {
    nom: 'Marc D.',
    ville: 'Marseille',
    note: 5,
    texte: 'Mercedes V-Class pour une sortie en famille. Confort, espace et sécurité : tout était parfait. Un service vraiment haut de gamme que nous réservons désormais chaque week-end.',
  },
  {
    nom: 'Claire P.',
    ville: 'Avignon',
    note: 5,
    texte: 'Réservation en ligne simple et support 24/7 vraiment efficace. Nos trajets professionnels sont désormais beaucoup plus faciles. Tarifs transparents, chauffeurs toujours ponctuels.',
  },
  {
    nom: 'Thomas R.',
    ville: 'Paris',
    note: 5,
    texte: 'Transfert depuis la gare TGV vers notre hôtel à Gordes. Le chauffeur connaissait parfaitement la route et nous a même recommandé un restaurant exceptionnel. Service de conciergerie plus que de transport.',
  },
  {
    nom: 'Isabelle M.',
    ville: 'Lyon',
    note: 5,
    texte: 'Mariage organisé à Aix, 3 véhicules réservés pour nos invités. Coordination parfaite, chauffeurs en costume, véhicules décorés. Un sans-faute total pour le plus beau jour de notre vie.',
  },
]

// ── ATOUTS (4 compteurs animés)
export const ATOUTS = [
  { value: '4.9', titre: 'Note Google', desc: '+200 avis 5 étoiles vérifiés' },
  { value: '24/7', titre: 'Disponibilité', desc: 'Réservation à toute heure, 365j/an' },
  { value: '15min', titre: 'Temps de réponse', desc: 'Confirmation de réservation garantie' },
  { value: '0€', titre: 'Frais cachés', desc: 'Tarif fixe annoncé = tarif payé' },
]

// ── FAQ (5 questions — réponses enrichies 2-3 phrases pour SEO + conversion)
export const FAQS = [
  {
    q: 'Comment réserver ?',
    r: 'Par téléphone au 06 15 96 32 75 (24h/24), via notre formulaire en ligne ci-dessous, ou par email. Vous recevez une confirmation immédiate avec le détail du trajet, le véhicule attribué et le tarif fixe garanti. Modification ou annulation gratuite jusqu\'à 24h avant le départ.',
  },
  {
    q: 'Les tarifs sont-ils fixes ?',
    r: 'Absolument. Le prix est confirmé au moment de la réservation et ne change jamais, quelles que soient les conditions de circulation. Pas de supplément bagages, pas de frais de péage cachés, pas de majoration nocturne. Le tarif annoncé est le tarif payé.',
  },
  {
    q: 'Que se passe-t-il si mon vol est retardé ?',
    r: 'Nous suivons tous les vols en temps réel via FlightAware. En cas de retard, nous ajustons automatiquement l\'heure de prise en charge sans aucun surcoût. Votre chauffeur vous attend avec un panneau nominatif au niveau des arrivées, quelle que soit l\'heure d\'atterrissage.',
  },
  {
    q: 'Quels véhicules composent votre flotte ?',
    r: 'Exclusivement des Mercedes récentes : Classe E (berline business, 3 passagers), Classe S (berline prestige, sièges massants, 3 passagers) et Classe V (van premium, jusqu\'à 7 passagers). Tous nos véhicules sont assurés, climatisés, équipés Wi-Fi et entretenus quotidiennement.',
  },
  {
    q: 'Êtes-vous disponible la nuit ?',
    r: 'Oui, notre service fonctionne 24 heures sur 24, 7 jours sur 7, 365 jours par an. Les transferts tôt le matin ou tard le soir sont notre quotidien. Aucune majoration nocturne.',
  },
  {
    q: 'Comment est calculé le prix ?',
    r: 'Nos tarifs sont fixes et calculés à la réservation en fonction de la distance et du type de véhicule choisi. Pas de compteur, pas de surprise : le prix annoncé inclut les péages, le carburant et l\'attente raisonnable. Pour les longues distances, nous proposons un tarif kilométrique négocié.',
  },
  {
    q: 'Proposez-vous un service de conciergerie ?',
    r: 'Absolument. Au-delà du transport, nos chauffeurs sont de véritables ambassadeurs de la Provence. Recommandations de restaurants, réservations d\'hôtels, suggestions d\'itinéraires touristiques, organisation de journées sur mesure. Chaque trajet peut devenir une expérience complète.',
  },
  {
    q: 'Quels modes de paiement acceptez-vous ?',
    r: 'Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), les espèces et le virement bancaire. Pour les entreprises, nous proposons la facturation mensuelle avec paiement à 30 jours. Un reçu détaillé est systématiquement fourni.',
  },
]

// ── TEXTES D'INTRO PAR SECTION (paragraphes persuasifs)
export const SECTION_INTROS = {
  atouts: 'Depuis plus de 10 ans, nous accompagnons particuliers et professionnels dans tous leurs déplacements en Provence. Notre engagement : un service irréprochable, des véhicules haut de gamme et la sérénité d\'un tarif fixe garanti.',
  services: 'Du transfert aéroport quotidien à l\'escapade touristique sur mesure, nous adaptons notre service à chaque besoin. Cliquez sur un service pour découvrir les détails.',
  flotte: 'Tous nos véhicules sont des Mercedes récentes, entretenus quotidiennement et équipés pour votre confort : cuir, climatisation bi-zone, vitres surteintées, chargeurs USB. Chaque trajet est une expérience premium.',
  zones: 'Basés à Aix-en-Provence, nous desservons toute la Provence et au-delà. Chaque tarif est fixe et garanti — le prix annoncé à la réservation est le prix que vous payez, sans surprise.',
  avis: 'Plus de 200 clients nous font confiance avec une note moyenne de 4.9/5 sur Google. Voici ce qu\'ils disent de leur expérience.',
  contact: 'Réponse garantie en moins de 15 minutes. Confirmation immédiate, tarif fixe, annulation gratuite jusqu\'à 24h avant.',
}

// ── TRUST INDICATORS (bande de réassurance)
export const TRUST = [
  { icon: 'Shield', titre: 'Chauffeur professionnel', desc: 'Licencié VTC, formé et assuré' },
  { icon: 'CreditCard', titre: 'Paiement flexible', desc: 'CB, espèces, virement' },
  { icon: 'Clock', titre: 'Disponible 24h/24', desc: '7j/7, 365 jours par an' },
]

// ── IMAGES (mapping complet — aucune image ne doit rester inutilisée)
export const IMAGES = {
  heroFallback: '/images/mercedes-motion.jpeg',
  atoutsFond: '/images/flotte-hotel-luxe.jpg',
  contactFond: '/images/classe-v-bastide.jpg',
  footerFond: '/images/flotte-intercontinental.jpeg',
  zonesFond: '/images/vignes-provence.jpg',
  lavande: '/images/lavande-provence.jpg',
}

// ── À PROPOS (section dédiée)
export const ABOUT = {
  paragraphs: [
    'Provençal Coast Taxi est né d\'une conviction simple : le transport privé en Provence mérite le même niveau d\'exigence que l\'hôtellerie de luxe. Depuis plus de 10 ans, nous accompagnons particuliers et professionnels dans tous leurs déplacements, de l\'aéroport de Marseille aux villages perchés du Luberon.',
    'Notre flotte exclusivement composée de Mercedes récentes — Classe E, Classe S et Classe V — est entretenue quotidiennement. Cuir intégral, climatisation bi-zone, vitres surteintées, Wi-Fi et chargeurs USB : chaque détail est pensé pour votre confort.',
    'Nos chauffeurs expérimentés sont des spécialistes du transport sur mesure. Bilingues français-anglais, formés à l\'accueil VIP, ils connaissent chaque route, chaque raccourci et chaque adresse secrète de Provence. Un service de conciergerie est inclus : recommandations de restaurants, réservations d\'hôtels, itinéraires personnalisés.',
  ],
  zones: [
    'Gare d\'Aix-en-Provence TGV',
    'Aéroport Marseille Provence',
    'Centre historique d\'Aix',
    'Cours Mirabeau',
    'Principaux hôtels et résidences',
    'Quartiers résidentiels (Pont de l\'Arc, Les Milles)',
    'Villes PACA (Gardanne, Salon, Pertuis, Manosque)',
    'Parcs d\'activités (La Duranne, Les Milles)',
  ],
}

// ── ZONES EXTRA (villes additionnelles)
export const ZONES_EXTRA = [
  'Salon-de-Provence', 'Gardanne', 'Pertuis', 'Manosque',
  'Aubagne', 'La Ciotat', 'Bandol', 'Saint-Raphaël',
  'Martigues', 'Istres', 'Vitrolles', 'Les Pennes-Mirabeau',
]

// ── NAV
export const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#flotte', label: 'Flotte' },
  { href: '#zones', label: 'Zones' },
  { href: '#avis', label: 'Avis' },
  { href: '#contact', label: 'Contact' },
]
