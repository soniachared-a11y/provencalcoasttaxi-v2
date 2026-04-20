// Pages longue-traîne : une URL dédiée par requête business importante.
// Chaque page vise un mot-clé précis avec contenu unique, FAQ spécifique, tarif,
// Schema.org Service dédié et liens internes vers les autres pages du site.
//
// Slugs (doivent matcher les routes dans App.jsx, vercel.json, sitemap.xml
// et scripts/prerender.mjs) :
//   /taxi-aeroport-marseille-aix-en-provence
//   /taxi-gare-tgv-aix-en-provence
//   /vtc-luberon-gordes-cassis
//   /chauffeur-prive-mariage-aix

export const LONGTAIL = {
  'taxi-aeroport-marseille-aix-en-provence': {
    slug: 'taxi-aeroport-marseille-aix-en-provence',
    // SEO
    title: 'Taxi aéroport Marseille ↔ Aix-en-Provence | 65 € fixe 24h/24 — Taxis Provençale Aix',
    description: 'Taxi et VTC Aix-en-Provence → aéroport Marseille-Provence (Marignane) à 65 € fixe, 42 km en 35 min. Suivi de vol, panneau nominatif, disponible 24h/24. Réservez au 06 15 96 32 75.',
    // Hero
    label: 'Transfert aéroport',
    h1: 'Taxi Aix-en-Provence → aéroport Marseille-Provence',
    heroBaseline: '65 € fixe, 35 minutes, 42 km. Suivi de vol, panneau nominatif, aucun supplément retard.',
    heroImage: '/images/mercedes-motion.jpeg',
    heroImageAlt: 'Mercedes sur autoroute entre Aix-en-Provence et l\'aéroport Marseille-Provence',
    // Tarif mis en avant
    priceBox: {
      label: 'Tarif fixe garanti',
      price: '65 €',
      details: 'Aix-en-Provence centre → Aéroport Marseille-Provence (MRS / Marignane). Tarif de jour et de nuit identique. Péages et bagages inclus.',
      duration: '35 min',
      distance: '42 km',
    },
    // Sections de contenu (3 sections riches avec H2, paragraphes, liste de bénéfices)
    sections: [
      {
        heading: 'Un transfert aéroport conçu pour les voyageurs exigeants',
        paragraphs: [
          'Le trajet entre Aix-en-Provence et l\'aéroport Marseille-Provence (code MRS, dit Marignane) est le plus demandé de notre flotte : plus de 40 courses par semaine. Nous le réalisons depuis 10 ans avec un taux de ponctualité de 99,2 % mesuré sur 2 000 transferts.',
          'Le tarif est fixe à 65 €, quel que soit le jour, l\'heure, le trafic ou la météo. Il inclut les 4,30 € de péage, la prise en charge jusqu\'à 4 valises, et l\'attente raisonnable en cas de retard du vol. Aucun supplément caché.',
          'Nous intervenons depuis n\'importe quelle adresse d\'Aix-en-Provence (centre-ville, Pont-de-l\'Arc, Luynes, Les Milles, Jas de Bouffan) ainsi que depuis les hôtels partenaires. Départ possible 24h/24, y compris pour les vols tôt le matin (4h-6h) ou les arrivées tardives.',
        ],
        bullets: [
          { title: 'Suivi de vol automatique', desc: 'Nous surveillons votre vol en temps réel via FlightAware. Si votre avion est retardé, l\'heure de prise en charge est ajustée sans frais.' },
          { title: 'Panneau nominatif aux arrivées', desc: 'Votre chauffeur vous attend au niveau des arrivées internationales (T1) ou nationales (T2) avec un panneau à votre nom.' },
          { title: 'Paiement facile', desc: 'Espèces, Visa, Mastercard, American Express ou facturation entreprise à 30 jours.' },
          { title: 'Annulation gratuite', desc: 'Jusqu\'à 24h avant le départ, sans frais, remboursement immédiat.' },
        ],
      },
      {
        heading: 'Quel véhicule choisir pour votre transfert aéroport ?',
        paragraphs: [
          'Notre flotte Mercedes couvre tous les formats de transfert, du voyageur solo au groupe familial avec bagages.',
        ],
        bullets: [
          { title: 'Mercedes Classe E — 65 €', desc: 'Berline business 1 à 3 passagers, 3 valises + 2 bagages à main. Idéale pour les déplacements pro.' },
          { title: 'Mercedes Classe S — 90 €', desc: 'Berline prestige 1 à 3 passagers, sièges massants, cuir Nappa, eau offerte. Pour les clients VIP et dirigeants.' },
          { title: 'Mercedes Classe V — 95 €', desc: 'Van 7 places avec espace bagages XL. Indispensable pour les familles et les groupes avec valises.' },
        ],
      },
      {
        heading: 'Pourquoi réserver à l\'avance plutôt que prendre un taxi sur place ?',
        paragraphs: [
          'À votre arrivée à Marseille-Provence, la file d\'attente aux taxis dépasse régulièrement 25-30 minutes en pleine saison (juillet-août, Pâques, salons professionnels). Les taxis classiques n\'affichent pas le prix à l\'avance et appliquent un tarif compteur majoré en soirée (+15 %) et le dimanche (+17 %).',
          'En réservant Taxis Provençale Aix à l\'avance : aucune attente à l\'arrivée, tarif fixe garanti écrit noir sur blanc, véhicule Mercedes récent avec Wi-Fi et chargeurs, chauffeur bilingue français/anglais habitué aux voyageurs d\'affaires et internationaux.',
        ],
      },
    ],
    // FAQ spécifique
    faqs: [
      {
        q: 'Combien de temps faut-il prévoir pour aller d\'Aix-en-Provence à l\'aéroport Marseille ?',
        r: '35 minutes en conditions normales via l\'A51 puis l\'A7. Nous conseillons de partir 2h30 avant le décollage pour un vol domestique et 3h pour un vol international, en tenant compte de l\'enregistrement et de la sécurité.',
      },
      {
        q: 'Le tarif de 65 € est-il valable aussi la nuit et le dimanche ?',
        r: 'Oui, 65 € fixe 7j/7, 24h/24, 365 jours par an, y compris jours fériés. Aucune majoration nocturne, aucune majoration dominicale, contrairement aux taxis classiques avec compteur.',
      },
      {
        q: 'Combien de bagages puis-je emporter ?',
        r: 'Mercedes Classe E : 3 valises + 3 bagages à main. Classe S : 2 valises + 2 bagages à main (coffre plus petit car moteur hybride). Classe V : jusqu\'à 7 valises + 7 bagages à main. Ski, planche de surf, vélo pliant acceptés sur demande.',
      },
      {
        q: 'Le chauffeur parle-t-il anglais ?',
        r: 'Oui, tous nos chauffeurs sont bilingues français-anglais. Italien et espagnol disponibles sur demande à la réservation.',
      },
      {
        q: 'Proposez-vous l\'aller-retour à un tarif préférentiel ?',
        r: 'Oui. L\'aller-retour Aix ↔ Marseille-Provence est à 130 € au lieu de 2 × 65 €. Attente gratuite jusqu\'à 1 semaine entre les deux trajets.',
      },
    ],
    // CTA final
    ctaTitle: 'Réservez votre taxi aéroport à 65 €',
    ctaDesc: 'Confirmation en 15 minutes, tarif fixe garanti par SMS.',
    // Schema.org Service
    schemaName: 'Transfert taxi Aix-en-Provence → aéroport Marseille-Provence',
    schemaPrice: 65,
    schemaDescription: 'Transfert privé Mercedes entre Aix-en-Provence et l\'aéroport Marseille-Provence Marignane. Tarif fixe 65 €, 42 km en 35 minutes, disponible 24h/24 avec suivi de vol en temps réel.',
  },

  'taxi-gare-tgv-aix-en-provence': {
    slug: 'taxi-gare-tgv-aix-en-provence',
    title: 'Taxi gare TGV Aix-en-Provence | 25 € fixe 24h/24 — Taxis Provençale Aix',
    description: 'Taxi et VTC entre Aix-en-Provence centre et la gare TGV d\'Aix à 25 € fixe. 12 km en 15 min. Disponible 24h/24, panneau nominatif à l\'arrivée du train. Réservation au 06 15 96 32 75.',
    label: 'Taxi gare TGV',
    h1: 'Taxi gare TGV Aix-en-Provence ↔ centre-ville',
    heroBaseline: '25 € fixe, 15 minutes, 12 km. Panneau nominatif sur quai, disponible pour tous les trains.',
    heroImage: '/images/provence-image.jpg',
    heroImageAlt: 'Taxi Mercedes à la gare TGV d\'Aix-en-Provence',
    priceBox: {
      label: 'Tarif fixe centre-ville ↔ gare TGV',
      price: '25 €',
      details: 'Aix-en-Provence centre (Cours Mirabeau, La Rotonde, Vieil Aix) → Gare Aix-en-Provence TGV. Même tarif toute l\'année, jour et nuit.',
      duration: '15 min',
      distance: '12 km',
    },
    sections: [
      {
        heading: 'Le transfert le plus rapide entre Aix centre et la gare TGV',
        paragraphs: [
          'La gare Aix-en-Provence TGV est située à 12 km au sud-ouest de la ville, à L\'Arbois, à l\'écart du centre historique. Aucune ligne de métro ne la dessert, le bus n\'y passe que toutes les 30 minutes avec 25 minutes de trajet. Le taxi est de loin la solution la plus rapide et la plus confortable.',
          'Notre tarif est fixe à 25 € quelle que soit l\'adresse de départ dans Aix centre (Cours Mirabeau, La Rotonde, Vieil Aix, Mazarin, Sextius, Bellevue). Nous ajustons automatiquement l\'heure de prise en charge selon votre heure de train, en tenant compte du trafic et du temps d\'enregistrement.',
          'À l\'arrivée, votre chauffeur vous attend sur le quai de descente avec un panneau à votre nom. Il prend en charge vos bagages jusqu\'au véhicule stationné à 30 mètres. Les trains retardés sont suivis en temps réel via SNCF Connect, aucun supplément n\'est facturé.',
        ],
        bullets: [
          { title: 'Panneau nominatif sur quai', desc: 'Votre chauffeur vous repère immédiatement à la sortie du train, pas besoin de chercher.' },
          { title: 'Suivi SNCF en temps réel', desc: 'Train en retard ? L\'heure de prise en charge est ajustée automatiquement.' },
          { title: 'Vehicule premium', desc: 'Mercedes Classe E, S ou V au choix. Wi-Fi, chargeurs USB, eau offerte.' },
          { title: 'Aller + retour optimisé', desc: 'Réservez les deux trajets en même temps et bénéficiez d\'un tarif préférentiel.' },
        ],
      },
      {
        heading: 'Partez serein vers Paris, Lyon, Marseille, Nice',
        paragraphs: [
          'La gare TGV Aix-en-Provence dessert directement Paris Gare de Lyon (3h10), Lyon Part-Dieu (1h15), Marseille Saint-Charles (15 min), Nice-Ville (2h30), Montpellier (1h). Elle est également reliée à Bruxelles, Francfort et Barcelone via des correspondances directes.',
          'Pour les voyageurs professionnels pressés, notre service garantit une arrivée 20 minutes avant l\'heure de départ du train — temps nécessaire pour passer le contrôle billets et rejoindre le quai. Pour les familles avec enfants et bagages, nous conseillons 30 minutes.',
        ],
      },
      {
        heading: 'Transfert gare TGV + aéroport : la solution combinée',
        paragraphs: [
          'De nombreux voyageurs arrivent en TGV à Aix-en-Provence pour ensuite rejoindre l\'aéroport Marseille-Provence en véhicule. Nous proposons un transfert direct gare TGV Aix → aéroport à 35 € (au lieu de 25 € + 65 €), soit une économie de 55 €.',
          'Cette solution est idéale pour les voyages multimodaux TGV + avion, fréquents chez les voyageurs d\'affaires Paris-Marseille et pour les touristes combinant Provence et autre destination.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Le taxi attend-il automatiquement si mon train est en retard ?',
        r: 'Oui. Nous suivons votre train en temps réel via SNCF Connect. En cas de retard, votre chauffeur reste sur place sans surcoût. Seuls les trains annulés nécessitent une nouvelle réservation.',
      },
      {
        q: 'Où le chauffeur m\'attend-il à la gare TGV ?',
        r: 'À la descente du train, sur le quai, avec un panneau à votre nom. Si vous préférez, il peut vous attendre en zone d\'accueil à l\'intérieur de la gare, juste après les escalators.',
      },
      {
        q: 'Proposez-vous le trajet gare TGV → aéroport Marseille ?',
        r: 'Oui, tarif fixe 35 €, 30 minutes de trajet direct. Très utilisé par les voyageurs Paris → Aix-TGV → avion Marseille. Réservation possible à J-1 minimum.',
      },
      {
        q: 'Peut-on partager le taxi avec d\'autres voyageurs pour réduire le coût ?',
        r: 'Nous pratiquons le tarif véhicule, pas par personne. Donc 25 € que vous soyez 1 ou 3 personnes en Classe E, ou 1 à 7 personnes en Classe V (à 35 €). Plus vous êtes, moins c\'est cher par personne.',
      },
      {
        q: 'Y a-t-il un tarif de nuit différent ?',
        r: 'Non, tarif unique 25 € 24h/24, 7j/7. Nous opérons aussi pour les trains de nuit (arrivée 6h30, départ 22h15) sans majoration.',
      },
    ],
    ctaTitle: 'Réservez votre taxi gare TGV à 25 €',
    ctaDesc: 'Réservation en 1 minute, confirmation immédiate par SMS.',
    schemaName: 'Transfert taxi Aix-en-Provence centre ↔ gare TGV',
    schemaPrice: 25,
    schemaDescription: 'Taxi privé Mercedes entre Aix-en-Provence centre-ville et la gare TGV. Tarif fixe 25 €, 12 km en 15 minutes, panneau nominatif à l\'arrivée.',
  },

  'vtc-luberon-gordes-cassis': {
    slug: 'vtc-luberon-gordes-cassis',
    title: 'VTC Luberon, Gordes, Cassis | Chauffeur privé Provence — Taxis Provençale Aix',
    description: 'VTC privé au départ d\'Aix-en-Provence pour le Luberon (Gordes, Roussillon, Ménerbes), Cassis et les Calanques. Mercedes avec chauffeur bilingue, journée sur mesure dès 450 €.',
    label: 'Tourisme Provence',
    h1: 'VTC Luberon, Gordes, Cassis — chauffeur privé Provence',
    heroBaseline: 'Journée complète Mercedes avec chauffeur bilingue dès 450 €. Itinéraire sur mesure.',
    heroImage: '/images/lavande-soleil.jpg',
    heroImageAlt: 'Champs de lavande dans le Luberon avec Mercedes de Taxis Provençale Aix',
    priceBox: {
      label: 'Journée complète 8h',
      price: 'dès 450 €',
      details: 'Mercedes Classe E, S ou V avec chauffeur bilingue. Itinéraire adapté à vos envies : Luberon, Gordes, Roussillon, Cassis, Calanques, Baux-de-Provence.',
      duration: '8 h',
      distance: '200 km inclus',
    },
    sections: [
      {
        heading: 'Découvrez la Provence avec un chauffeur qui la connaît par cœur',
        paragraphs: [
          'Nos chauffeurs sont de véritables ambassadeurs de la Provence. Nés dans la région, ils parlent français, anglais et partagent avec vous les meilleurs points de vue, les restaurants cachés, les marchés de producteurs, les caves viticoles et les villages perchés hors des sentiers battus.',
          'Contrairement aux circuits en autocar groupés, vous avez le contrôle total de votre journée : pauses à la demande, temps libre dans les villages, photos quand vous voulez. Votre Mercedes vous attend pendant que vous visitez, sans stress de stationnement ni d\'horaires.',
          'Nos itinéraires les plus demandés incluent le triangle Luberon (Gordes, Roussillon, Ménerbes), le duo Cassis–Calanques, les Baux-de-Provence + Saint-Rémy, et la route des vignobles AOC Côtes-de-Provence.',
        ],
        bullets: [
          { title: 'Chauffeur-guide bilingue', desc: 'Anecdotes historiques, recommandations restaurants, négociation avec les producteurs : un vrai local avec vous.' },
          { title: 'Itinéraire flexible', desc: 'Modifiez le parcours en route selon vos envies, vos pauses, votre rythme. Aucun groupe à attendre.' },
          { title: 'Mercedes confort', desc: 'Classe E, S ou V selon le nombre de passagers. Wi-Fi, climatisation, eau fraîche, parasols et couvertures pour l\'hiver.' },
          { title: 'Tarif tout compris', desc: 'Essence, péages, parkings et attente pendant vos visites inclus. Aucun supplément kilométrique jusqu\'à 200 km.' },
        ],
      },
      {
        heading: 'Nos 5 itinéraires préférés au départ d\'Aix-en-Provence',
        paragraphs: [
          'Nous adaptons chaque journée à vos centres d\'intérêt, mais voici les combinaisons qui fonctionnent le mieux selon la saison et la durée disponible.',
        ],
        bullets: [
          { title: '1. Triangle du Luberon — Gordes, Roussillon, Ménerbes', desc: 'Les 3 plus beaux villages classés. 100 km, 7h avec déjeuner. Parfait en mai-octobre.' },
          { title: '2. Cassis & les Calanques', desc: 'Port de pêche, vignoble AOC Cassis et bateau pour les Calanques. 80 km, 7h. Idéal été.' },
          { title: '3. Les Baux + Saint-Rémy + Carrières de Lumières', desc: 'Patrimoine romain, ruelles médiévales, expo art numérique. 120 km, 8h.' },
          { title: '4. Route des Côtes-de-Provence', desc: 'Dégustation dans 2 à 3 domaines viticoles AOC. 150 km, 7h. Service vin possible à bord pour le conducteur.' },
          { title: '5. Champs de lavande (juin–juillet)', desc: 'Plateau de Valensole, abbaye de Sénanque, distillerie. 180 km, 9h. Saison limitée 15 juin–15 juillet.' },
        ],
      },
      {
        heading: 'Pour qui ? Clientèle haut de gamme, voyages d\'affaires et mariages',
        paragraphs: [
          'Nos clients sont majoritairement des touristes internationaux haut de gamme (Américains, Britanniques, Asiatiques) logeant dans les hôtels 5 étoiles de la région (Villa Gallici, Villa La Coste, Pierres d\'Aurèle, Coquillade Provence), des clients d\'agences de voyages premium (Abercrombie & Kent, Tauck Tours) et des voyageurs d\'affaires souhaitant prolonger un déplacement professionnel.',
          'Nous proposons aussi des journées découvertes pour les mariages (accompagnement des invités étrangers), les séminaires d\'entreprise et les team-buildings. Devis sur mesure en 24h.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Combien coûte une journée VTC dans le Luberon au départ d\'Aix ?',
        r: 'À partir de 450 € en Mercedes Classe E (1-3 personnes), 550 € en Classe V (4-7 personnes). Tarif tout compris : chauffeur, essence, péages, parkings, attente pendant vos visites, 200 km inclus (supplément 1,20 €/km au-delà).',
      },
      {
        q: 'Peut-on modifier l\'itinéraire en cours de journée ?',
        r: 'Absolument. Contrairement à un circuit en groupe, vous avez le contrôle total. Votre chauffeur vous suggère des alternatives selon la météo, l\'affluence et vos envies. Si vous souhaitez rester 2h dans un village au lieu de 45 min, aucun problème.',
      },
      {
        q: 'Le chauffeur peut-il boire aux dégustations viticoles ?',
        r: 'Non, pour des raisons légales et de sécurité. En revanche, il vous accompagne dans la cave, vous présente au propriétaire, aide à la traduction et gère les achats que vous souhaitez rapporter. Service vin à bord pour vos propres dégustations après la cave.',
      },
      {
        q: 'Faites-vous aussi Cassis et les Calanques ?',
        r: 'Oui. Journée Cassis depuis Aix : 450 € (Classe E). Inclut la descente à Cassis, le tour du port, le parking pour la balade bateau Calanques (billets non inclus, ~25 €/personne), le déjeuner en terrasse et le retour en fin de journée.',
      },
      {
        q: 'La lavande, c\'est quand et c\'est où le mieux ?',
        r: 'Pleine floraison du 15 juin au 15 juillet. Le plateau de Valensole (Manosque) offre les plus beaux champs, suivi de l\'abbaye de Sénanque (Gordes). Journée complète avec distillerie et photo-stop : 550 € au départ d\'Aix-en-Provence.',
      },
    ],
    ctaTitle: 'Composez votre journée en Provence sur mesure',
    ctaDesc: 'Devis personnalisé en 24 h. Tarifs tout compris, sans surprise.',
    schemaName: 'VTC journée Provence — Luberon, Gordes, Cassis, Calanques',
    schemaPrice: 450,
    schemaDescription: 'Chauffeur privé Mercedes à la journée pour découvrir le Luberon (Gordes, Roussillon, Ménerbes), Cassis, les Calanques ou les Baux-de-Provence au départ d\'Aix-en-Provence. Chauffeur bilingue, tarif tout compris dès 450 €.',
  },

  'chauffeur-prive-mariage-aix': {
    slug: 'chauffeur-prive-mariage-aix',
    title: 'Chauffeur privé mariage Aix-en-Provence | Mercedes cérémonie — Taxis Provençale Aix',
    description: 'Chauffeur privé pour mariage à Aix-en-Provence et alentours. Mercedes Classe S avec rubans, navettes invités, transferts aéroport et hôtel. Devis personnalisé, équipes dédiées.',
    label: 'Événements & mariage',
    h1: 'Chauffeur privé mariage à Aix-en-Provence',
    heroBaseline: 'Mariés en Mercedes Classe S, navettes pour les invités, transferts aéroport : une logistique transport sans accroc pour votre grand jour.',
    heroImage: '/images/classe-s-provence.jpg',
    heroImageAlt: 'Mercedes Classe S décorée pour un mariage en Provence',
    priceBox: {
      label: 'Prestation mariage',
      price: 'dès 350 €',
      details: 'Demi-journée mariés (arrivée cérémonie + vin d\'honneur + photos). Navettes invités et transferts aéroport sur devis personnalisé selon logistique.',
      duration: '4h',
      distance: 'inclus 80 km',
    },
    sections: [
      {
        heading: 'Une logistique mariage sur mesure, du premier invité au dernier',
        paragraphs: [
          'Le transport est l\'un des points les plus stressants à organiser pour un mariage en Provence : entre les invités venus de loin à aller chercher à l\'aéroport, les navettes entre l\'église et le lieu de réception, et l\'arrivée des mariés elle-même, tout doit être orchestré à la minute près.',
          'Nous intervenons à toutes les étapes : transferts aéroport les jours précédents pour les invités étrangers (Marseille, Nice, Avignon), navettes hôtel ↔ lieu de cérémonie le jour J, arrivée des mariés en Classe S avec ou sans rubans, retour en fin de soirée pour les invités fatigués.',
          'Notre équipe dédiée est composée de 3 à 8 chauffeurs selon la taille de votre mariage (de 20 à 200 invités), tous en costume, formés aux prestations événementielles, coordonnés via WhatsApp avec votre wedding-planner ou directement avec vous.',
        ],
        bullets: [
          { title: 'Mercedes Classe S pour les mariés', desc: 'Berline prestige noire, cuir Nappa, rubans optionnels (blancs, ivoire ou couleur thème). Photos pendant l\'attente incluses.' },
          { title: 'Navettes Classe V 7 places', desc: 'Pour les invités : hôtel → cérémonie, cérémonie → réception, réception → hôtel fin de soirée. Rotation coordonnée.' },
          { title: 'Transferts aéroport en amont', desc: 'Accueil des invités internationaux aux aéroports Marseille, Nice, Avignon. Panneau nominatif.' },
          { title: 'Coordination wedding-planner', desc: 'Nous travaillons avec les principales WP d\'Aix et du Luberon : Meet Sofia, Margaux Wedding, Lovely Instants, etc.' },
        ],
      },
      {
        heading: 'Les lieux de mariage que nous desservons régulièrement',
        paragraphs: [
          'Nous connaissons les routes, les accès, les parkings et les contraintes de tous les grands domaines et lieux de cérémonie de la région. Cela fait gagner un temps précieux le jour J.',
        ],
        bullets: [
          { title: 'Domaines viticoles', desc: 'Château La Coste, Villa Gallici, Château de Fonscolombe, Mas de Fauchon, Domaine de la Mignarde.' },
          { title: 'Bastides et mas provençaux', desc: 'Mas de Peint, Bastide de Marie, Couvent des Minimes, Château Grand Boise, Les Lodges Sainte-Victoire.' },
          { title: 'Villages perchés', desc: 'Gordes, Les Baux-de-Provence, Lourmarin, Ansouis, Bonnieux.' },
          { title: 'Bord de mer', desc: 'Hôtel Les Roches Blanches Cassis, Les Calanques, Château de la Messardière Saint-Tropez.' },
        ],
      },
      {
        heading: 'Nos 3 formules les plus demandées',
        paragraphs: [
          'Nous adaptons chaque prestation à votre budget et à votre logistique, mais voici les formules qui correspondent à 80 % des demandes.',
        ],
        bullets: [
          { title: 'Formule Essentielle — dès 350 €', desc: 'Mercedes Classe S avec chauffeur pour les mariés sur 4 heures (arrivée cérémonie + vin d\'honneur + photos). Rubans offerts.' },
          { title: 'Formule Invités — dès 1 200 €', desc: 'Formule Essentielle + 2 Mercedes Classe V (14 places) pour la rotation hôtel ↔ domaine, 3 rotations.' },
          { title: 'Formule Complète — dès 2 800 €', desc: '3 véhicules dédiés 2 jours : transferts aéroport J-1, coordination jour J, retour aéroport J+1. Jusqu\'à 80 invités internationaux.' },
        ],
      },
    ],
    faqs: [
      {
        q: 'Combien coûte un chauffeur privé pour un mariage à Aix-en-Provence ?',
        r: 'Mercedes Classe S pour les mariés sur une demi-journée : à partir de 350 €. Navettes invités (Classe V 7 places, 4 heures) : 280 € par véhicule. Formule complète sur 2 jours avec 3 véhicules : à partir de 2 800 €.',
      },
      {
        q: 'Pouvez-vous mettre des rubans sur la voiture des mariés ?',
        r: 'Oui, rubans blancs, ivoire ou couleur thème fournis gratuitement. Nous pouvons également ajouter une décoration florale coordonnée avec votre fleuriste (supplément 40 à 80 € selon la composition).',
      },
      {
        q: 'Gérez-vous les transferts aéroport des invités étrangers ?',
        r: 'Oui. Nous organisons les accueils aéroport Marseille, Nice et Avignon les jours précédents le mariage. Accueil nominatif, Wi-Fi dans les véhicules, tarifs dégressifs à partir de 10 transferts.',
      },
      {
        q: 'Combien de véhicules faut-il pour 100 invités ?',
        r: 'Généralement 3 à 4 Mercedes Classe V (7 places chacune) avec 3 rotations, soit 63 à 84 invités transportés à chaque phase. Nous faisons un plan logistique précis avec horaires selon votre lieu et le nombre d\'invités.',
      },
      {
        q: 'Travaillez-vous avec des wedding-planners ?',
        r: 'Oui, nous collaborons régulièrement avec les principales wedding-planners d\'Aix et du Luberon. Nous pouvons aussi coordonner seuls si vous n\'avez pas de WP, via un planning détaillé que nous validons avec vous.',
      },
    ],
    ctaTitle: 'Demandez votre devis mariage personnalisé',
    ctaDesc: 'Réponse en 24h avec plan logistique détaillé. 10 ans d\'expérience événementielle.',
    schemaName: 'Chauffeur privé mariage — Aix-en-Provence et Provence',
    schemaPrice: 350,
    schemaDescription: 'Service de chauffeur privé Mercedes pour mariages à Aix-en-Provence, Luberon, Provence : arrivée des mariés, navettes invités, transferts aéroport. Équipe dédiée, coordination wedding-planner, 10 ans d\'expérience.',
  },
}

// Liste des slugs pour faciliter l'itération (sitemap, prerender, routes)
export const LONGTAIL_SLUGS = Object.keys(LONGTAIL)
