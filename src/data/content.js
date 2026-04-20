// ── Données statiques — Taxis Provençale Aix
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
    texte: 'Service impeccable pour mon transfert vers l\'aéroport de Marseille. Chauffeur ponctuel à 5h du matin, véhicule immaculé, suivi de vol activé. Aucune surprise sur le tarif. Je recommande vivement Taxis Provençale Aix pour tout déplacement en Provence.',
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

// ── FAQ — Format question naturelle + réponse directe (optimisé pour IA génératives :
// ChatGPT, Perplexity, Claude, Gemini extraient les premières phrases comme réponses).
export const FAQS = [
  {
    q: 'Combien coûte un taxi entre Aix-en-Provence et l\'aéroport Marseille-Provence ?',
    r: 'Le tarif est de 65 € fixe, tout compris, pour le trajet Aix-en-Provence → aéroport Marseille-Provence (Marignane). Distance 42 km, durée 35 minutes. Aucun supplément bagages, péages inclus, tarif identique jour et nuit. Pour un aller-retour, comptez 130 € avec attente gratuite à l\'aéroport.',
  },
  {
    q: 'Combien coûte un taxi Aix-en-Provence → gare TGV d\'Aix ?',
    r: 'Tarif fixe de 25 €, trajet de 12 km en 15 minutes depuis le centre-ville d\'Aix-en-Provence. Disponible 24h/24, même pour les trains de nuit. Panneau nominatif sur quai pour les arrivées.',
  },
  {
    q: 'Quel est le numéro pour réserver un taxi à Aix-en-Provence ?',
    r: 'Appelez le +33 6 15 96 32 75 (disponible 24h/24, 7j/7, 365 jours par an). Vous pouvez aussi réserver en ligne sur taxisprovencaleaix.fr/contact, confirmation sous 15 minutes.',
  },
  {
    q: 'Proposez-vous des sièges enfants ou rehausseurs ?',
    r: 'Oui, sièges bébé (0-18 mois), sièges enfant (9 mois-4 ans) et rehausseurs (4-10 ans) disponibles gratuitement sur simple demande à la réservation. Homologués ISOFIX, installés par le chauffeur avant la prise en charge.',
  },
  {
    q: 'Comment réserver un taxi Taxis Provençale Aix ?',
    r: 'Trois options : (1) appel direct au 06 15 96 32 75, (2) formulaire en ligne sur taxisprovencaleaix.fr/contact, (3) email à provencalcoastdriver@gmail.com. Confirmation immédiate avec détail du trajet, véhicule attribué et tarif fixe. Modification ou annulation gratuite jusqu\'à 24 h avant le départ.',
  },
  {
    q: 'Les tarifs sont-ils vraiment fixes ?',
    r: 'Oui. Le prix est confirmé à la réservation et ne change jamais, quelles que soient les conditions de circulation. Pas de supplément bagages, pas de péage caché, pas de majoration nocturne. Le tarif annoncé est le tarif payé.',
  },
  {
    q: 'Que se passe-t-il si mon vol est retardé ?',
    r: 'Nous suivons tous les vols en temps réel via FlightAware. En cas de retard, l\'heure de prise en charge est ajustée automatiquement sans surcoût. Votre chauffeur vous attend avec un panneau nominatif au niveau des arrivées, quelle que soit l\'heure d\'atterrissage.',
  },
  {
    q: 'Quels véhicules composent votre flotte ?',
    r: 'Exclusivement des Mercedes récentes : Classe E (berline business, 1-3 passagers, 3 valises), Classe S (berline prestige, sièges massants, cuir Nappa, 1-3 passagers), Classe V (van premium, jusqu\'à 7 passagers avec bagages). Tous climatisés, équipés Wi-Fi, chargeurs USB et eau offerte.',
  },
  {
    q: 'Êtes-vous disponible la nuit et le dimanche ?',
    r: 'Oui, service 24h/24, 7j/7, 365 jours par an, y compris jours fériés. Tarif nuit (22h-6h) identique aux autres services sauf longue distance. Les transferts tôt le matin et tard le soir sont notre quotidien.',
  },
  {
    q: 'Quelles zones desservez-vous depuis Aix-en-Provence ?',
    r: 'Aix-en-Provence et toute la région PACA : Marseille, aéroport Marignane, Cassis, Luberon, Gordes, Avignon, Salon-de-Provence, Pertuis, Manosque, Gardanne. Longue distance vers Nice, Monaco, Cannes, Toulon, Lyon et Paris possible sur devis.',
  },
  {
    q: 'Quels modes de paiement acceptez-vous ?',
    r: 'Cartes bancaires (Visa, Mastercard, American Express), espèces et virement bancaire. Pour les entreprises, facturation mensuelle avec paiement à 30 jours possible. Un reçu détaillé est systématiquement fourni.',
  },
  {
    q: 'Proposez-vous un service de conciergerie et tourisme ?',
    r: 'Oui. Au-delà du transport, nos chauffeurs bilingues sont de véritables ambassadeurs de la Provence : recommandations de restaurants, réservations d\'hôtels, itinéraires sur mesure dans le Luberon, Gordes, Cassis, Calanques. Journée complète à partir de 450 €.',
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
    'Taxis Provençale Aix est né d\'une conviction simple : le transport privé en Provence mérite le même niveau d\'exigence que l\'hôtellerie de luxe. Depuis plus de 10 ans, nous accompagnons particuliers et professionnels dans tous leurs déplacements, de l\'aéroport de Marseille aux villages perchés du Luberon.',
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
  { href: '/services', label: 'Services' },
  { href: '/flotte', label: 'Flotte' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
]

export const PARTNERS = [
  { name: 'Pays d\'Aix', subtitle: 'Communauté' },
  { name: 'SNCF', subtitle: 'Gare TGV' },
  { name: 'Aéroport MRS', subtitle: 'Marseille Provence' },
  { name: 'Conventionné', subtitle: 'Transport médical' },
  { name: 'Hôtels 5★', subtitle: 'Partenaire officiel' },
]

export const EXPERIENCE_FEATURES = [
  { icon: 'Shield', title: 'Sécurité & confiance', desc: 'Chauffeur licencié VTC, assurance tous risques, véhicules contrôlés chaque semaine. Votre sécurité est notre priorité absolue.' },
  { icon: 'Clock', title: 'Ponctualité absolue', desc: 'Suivi de vol en temps réel, anticipation du trafic, jamais en retard. Nous arrivons toujours 10 minutes avant l\'heure.' },
  { icon: 'Crown', title: 'Service conciergerie', desc: 'Recommandations restaurants, réservations hôtels, itinéraires sur mesure. Un service premium au-delà du simple transport.' },
]

export const CHIFFRES = [
  { value: 15000, suffix: '+', label: 'Trajets réalisés', desc: 'Depuis notre création' },
  { value: 10, suffix: ' ans', label: 'D\'expérience', desc: 'Au service de la Provence' },
  { value: 98, suffix: '%', label: 'Satisfaction client', desc: 'Note moyenne sur 200+ avis' },
  { value: 24, suffix: '/7', label: 'Disponibilité', desc: '365 jours par an' },
]
