# MESSAGE CORRECTIF V2 — REFONTE COMPLÈTE
# Copie le bloc ``` ci-dessous dans Claude Code tel quel.

---

```
Lis DESIGN-SYSTEM.md, ANIMATIONS.md, HOMEPAGE-LAYOUT.md et MEMORY.md pour te remettre en contexte.

Le site actuel est un squelette : que des titres, presque pas de texte, des photos sous-utilisées, des animations basiques copier-coller. Il faut une refonte complète du CONTENU, des MEDIA et des EFFETS. Voici section par section exactement ce que tu dois faire.

RÈGLE ABSOLUE : chaque section doit avoir un vrai paragraphe de texte persuasif (2-3 phrases minimum), pas juste un label + titre.

---

## 1. HERO — Enrichir le contenu et fixer la vidéo

Le Hero actuel n'a qu'un sous-titre générique. Rends-le vendeur.

A) Contenu texte — remplacer le sous-titre actuel par :
"Votre chauffeur privé à Aix-en-Provence. Mercedes dernière génération, tarifs fixes sans surprise, disponible 24h/24 pour vos transferts aéroport, déplacements d'affaires et escapades en Provence."

B) Ajouter un 3ème CTA discret sous les 2 existants — une phrase de réassurance :
"✓ Confirmation immédiate  ·  ✓ Annulation gratuite  ·  ✓ Suivi de vol en temps réel"
(utiliser des spans stylés, pas des emojis — remplacer ✓ par des icônes Lucide Check de 12px)

C) Les métriques haut-droit sont statiques. Remplacer "10+ Ans d'expérience" par "15min Temps de réponse". C'est déjà corrigé dans le code, vérifie que c'est bien en place.

D) Video : s'assurer que le poster="/images/mercedes-motion.jpeg" est visible si la vidéo ne joue pas. Ajouter un fallback solide : si readyState === 0 après 3 secondes, afficher l'image poster en plein écran via un state.

---

## 2. ATOUTS — Ajouter un paragraphe intro + image de fond

Actuellement c'est juste un titre + 4 compteurs secs. Ajouter :

A) Sous le titre "Pourquoi nous choisir", ajouter un paragraphe :
"Depuis plus de 10 ans, nous accompagnons particuliers et professionnels dans tous leurs déplacements en Provence. Notre engagement : un service irréprochable, des véhicules haut de gamme et la sérénité d'un tarif fixe garanti."

Style : fontFamily Sora, fontSize 14px, color var(--texte-light), lineHeight 1.8, maxWidth 640px, margin 0 auto 48px, textAlign center.

B) Ajouter une image de confiance en fond léger de la section. Utiliser /images/flotte-hotel-luxe.jpg (2 Mercedes S-Class devant un hôtel de luxe à Marseille).
Position : absolute, inset 0, opacity 0.04, objectFit cover, zIndex 0.
Le contenu par-dessus en position relative zIndex 1.

C) Les compteurs : s'assurer que le countUp marche (correctif V1). Vérifier que les valeurs finales sont 4.9, 24/7, 15min, 0€.

---

## 3. SERVICES — Enrichir les descriptions dans chaque strip

Les descriptions actuelles font 10 mots. Pour un site de conversion, chaque service DOIT avoir un vrai texte vendeur.

Mettre à jour les descriptions dans le composant Services.jsx (données locales) ET dans content.js :

1. Transfert Aéroport :
   desc: "Prise en charge personnalisée dès votre atterrissage à Marseille-Provence ou Nice Côte d'Azur. Suivi de vol en temps réel, panneau nominatif à l'arrivée, assistance bagages. Tarif fixe garanti, pas de supplément en cas de retard de vol."

2. Déplacement Affaires :
   desc: "Ponctualité absolue et discrétion garantie pour vos rendez-vous professionnels. Mise à disposition à la demi-journée ou journée complète. Wi-Fi à bord, chargeurs, eau minérale. Votre bureau mobile en Mercedes Classe S."

3. Événements & Soirées :
   desc: "Mariages, galas, concerts, soirées privées. Aller-retour avec chauffeur dédié qui reste à votre disposition toute la soirée. Attente incluse, itinéraire flexible. Profitez de votre événement, on s'occupe du reste."

4. Longue Distance :
   desc: "Nice, Lyon, Monaco, Cannes et au-delà. Voyagez en tout confort sans les contraintes du train ou de l'avion. Véhicule privé, arrêts à la demande, tarif négocié pour les longs trajets."

5. Visite Touristique :
   desc: "Gordes, Roussillon, les Calanques, le Luberon, les champs de lavande. Itinéraires sur mesure à la demi-journée ou journée complète. Votre chauffeur connaît chaque route, chaque point de vue, chaque adresse secrète de Provence."

Aussi ajouter un paragraphe intro SOUS le titre "Une offre complète" :
"Du transfert aéroport quotidien à l'escapade touristique sur mesure, nous adaptons notre service à chaque besoin. Cliquez sur un service pour découvrir les détails."
Style : Sora 14px, texte-light, centered, maxWidth 560px, margin 0 auto 40px.

---

## 4. FLOTTE — Ajouter des vraies descriptions + photos intérieures

A) Ajouter un paragraphe intro sous "Mercedes haut de gamme" :
"Tous nos véhicules sont des Mercedes récentes, entretenus quotidiennement et équipés pour votre confort : cuir, climatisation bi-zone, vitres surteintées, chargeurs USB. Chaque trajet est une expérience premium."
Style : idem Services intro.

B) Remplacer les descriptions actuelles (génériques) par du vrai contenu :

Classe E :
desc: "Notre berline de référence pour les transferts quotidiens. Confort premium, coffre généreux et consommation raisonnée. Idéale pour les trajets aéroport et les déplacements professionnels jusqu'à 3 passagers."

Classe S :
desc: "Le summum du luxe automobile. Sièges massants, suspension pneumatique, isolation phonique totale. L'expérience ultime pour vos clients VIP, vos événements prestigieux ou simplement parce que vous le méritez."

Classe V :
desc: "L'espace d'un van, le confort d'une limousine. Jusqu'à 7 passagers avec leurs bagages. Parfaite pour les familles, les groupes d'affaires ou les transferts événementiels avec tout votre matériel."

C) Ajouter une 2ème image (intérieur) pour chaque véhicule au hover ou en dessous. Dans content.js, ajouter un champ imageInterieur :
- Classe E : '/images/classe-s-interieur.jpg' (on réutilise, pas de photo intérieur E spécifique)
- Classe S : '/images/classe-s-interieur.jpg'
- Classe V : '/images/classe-v-interieur.jpg'

Implémenter comme suit : au hover sur la photo, faire un crossfade CSS entre l'image extérieure et l'image intérieure. Transition opacity 0.5s ease. Cela donne de la vie et montre l'intérieur sans alourdir la page.

D) Le label "Feature" est trop générique. Renommer en la feature réelle :
- Classe E : label "Équipement" → value "Wi-Fi & USB"
- Classe S : label "Confort" → value "Sièges massants"
- Classe V : label "Capacité" → value "7 places + bagages"

---

## 5. ZONES — Enrichir avec contexte + plus de media

A) Ajouter un paragraphe intro :
"Basés à Aix-en-Provence, nous desservons toute la Provence et au-delà. Chaque tarif est fixe et garanti — le prix annoncé à la réservation est le prix que vous payez, sans surprise."

B) L'image de fond (vignes-provence.jpg) est à opacity 0.04, INVISIBLE. Augmenter à opacity 0.2 minimum pour qu'on voie vraiment les vignobles de Provence.

C) Dans la partie gauche (carte/image), remplacer le SVG SaintVictoire quasi invisible par une vraie mise en scène visuelle :
- Image de fond : /images/vignes-provence.jpg en opacity 0.3
- Par-dessus : les infos de la destination active avec un fond backdrop-filter blur(12px) semi-transparent
- Ajouter le nom de la destination en gros (Instrument Serif 40px), la distance et durée, et un CTA "Réserver ce trajet →"

D) Ajouter un texte sous chaque destination dans la liste droite. Par exemple :
- Aéroport Marseille : "Terminal 1 & 2. Prise en charge niveau arrivées."
- Gare TGV Aix : "Parvis de la gare, place dédiée VTC."
- Aéroport Nice : "Transfert direct sans arrêt. Wi-Fi à bord."
- Cassis / Calanques : "Route des Crêtes et port de Cassis."
- Gordes / Luberon : "Villages perchés, marchés provençaux."

---

## 6. AVIS — Ajouter contexte et crédibilité

A) Ajouter un paragraphe intro :
"Plus de 200 clients nous font confiance avec une note moyenne de 4.9/5 sur Google. Voici ce qu'ils disent de leur expérience."

B) Les témoignages actuels sont corrects mais enrichir le contenu du 1er (Sophie) pour mentionner le contexte :
"Service impeccable pour mon transfert vers l'aéroport de Marseille. Chauffeur ponctuel à 5h du matin, véhicule immaculé, suivi de vol activé. Aucune surprise sur le tarif. Je recommande vivement Provençal Coast pour tout déplacement en Provence."

C) Augmenter les témoignages à 5 pour enrichir le marquee. Ajouter dans content.js :
  { nom: 'Thomas R.', ville: 'Paris', note: 5, texte: 'Transfert depuis la gare TGV vers notre hôtel à Gordes. Le chauffeur connaissait parfaitement la route et nous a même recommandé un restaurant exceptionnel. Service de conciergerie plus que de transport.' },
  { nom: 'Isabelle M.', ville: 'Lyon', note: 5, texte: 'Mariages organisé à Aix, 3 véhicules réservés pour nos invités. Coordination parfaite, chauffeurs en costume, véhicules décorés. Un sans-faute total pour le plus beau jour de notre vie.' },

---

## 7. FAQ — Enrichir les réponses

Les réponses actuelles font 1 ligne. Pour le SEO et la conversion, chaque réponse doit faire 2-3 phrases :

1. Comment réserver ?
"Par téléphone au 06 15 96 32 75 (24h/24), via notre formulaire en ligne ci-dessous, ou par email. Vous recevez une confirmation immédiate avec le détail du trajet, le véhicule attribué et le tarif fixe garanti. Modification ou annulation gratuite jusqu'à 24h avant le départ."

2. Les tarifs sont-ils fixes ?
"Absolument. Le prix est confirmé au moment de la réservation et ne change jamais, quelles que soient les conditions de circulation. Pas de supplément bagages, pas de frais de péage cachés, pas de majoration nocturne. Le tarif annoncé est le tarif payé."

3. Que se passe-t-il si mon vol est retardé ?
"Nous suivons tous les vols en temps réel via FlightAware. En cas de retard, nous ajustons automatiquement l'heure de prise en charge sans aucun surcoût. Votre chauffeur vous attend avec un panneau nominatif au niveau des arrivées, quelle que soit l'heure d'atterrissage."

4. Quels véhicules composent votre flotte ?
"Exclusivement des Mercedes récentes : Classe E (berline business, 3 passagers), Classe S (berline prestige, sièges massants, 3 passagers) et Classe V (van premium, jusqu'à 7 passagers). Tous nos véhicules sont assurés, climatisés, équipés Wi-Fi et entretenus quotidiennement."

5. Êtes-vous disponible la nuit ?
"Oui, notre service fonctionne 24 heures sur 24, 7 jours sur 7, 365 jours par an. Les transferts tôt le matin (vols de 6h) ou tard le soir (retour de soirée) sont notre quotidien. Aucune majoration nocturne."

---

## 8. CONTACT — Ajouter de la réassurance

A) Dans le panel gauche (fond sombre), ajouter sous le titre "Réservez votre chauffeur" un paragraphe :
"Réponse garantie en moins de 15 minutes. Confirmation immédiate, tarif fixe, annulation gratuite jusqu'à 24h avant."
Style : Sora 13px, rgba(255,255,255,0.55), lineHeight 1.7, marginBottom 32px.

B) Ajouter une image de fond subtile dans le panel gauche. Utiliser /images/classe-v-bastide.jpg (V-Class devant bastide + cyprès).
Position absolute, inset 0, opacity 0.08, objectFit cover. Le contenu texte par-dessus.

C) Ajouter des trust indicators sous les infos de contact (avant le SIRET) :
- Lucide Shield → "Licence VTC officielle"
- Lucide Star → "4.9/5 — 200+ avis Google"
- Lucide Clock → "Disponible 24h/24"
Chaque en flex row, gap 8px, Sora 11px, rgba(255,255,255,0.45).

---

## 9. FOOTER — Refonte complète

Le footer actuel est basique (3 cols texte). En faire un vrai footer premium :

A) Ajouter une image de fond (toute la largeur du footer) :
/images/flotte-intercontinental.jpeg (flotte devant l'hôtel InterContinental)
Opacity 0.06, position absolute, inset 0, objectFit cover.

B) Passer à 4 colonnes :
- Col 1 : Logo + description enrichie : "Provençal Coast Taxi — votre chauffeur privé Mercedes à Aix-en-Provence. Plus de 10 ans d'expérience au service de l'excellence, disponible 24h/24 pour particuliers et professionnels."
- Col 2 : Liens rapides (inchangé)
- Col 3 : Services (liste des 5 services en liens vers #services)
- Col 4 : Contact (inchangé) + ajouter les horaires "Disponible 24h/24, 7j/7" et la mention "Licence VTC — SIRET N°013230073"

C) Ajouter une bande de réassurance AVANT le footer (entre Contact et Footer) :
3 colonnes, fond var(--surface), padding 40px, texte centré :
- Lucide Shield + "Chauffeur professionnel licencié"
- Lucide CreditCard + "Paiement CB, espèces, virement"
- Lucide Clock + "Disponible 24h/24, 7j/7"
Style : icônes Lucide 20px lavande, titre Sora 12px 600 texte, sous-titre Sora 11px texte-light.

D) Bottom bar : remplacer "Made with ♥ in Provence" par :
"Provençal Coast Taxi © 2024 — Licence VTC N°013230073 — Mentions légales — Politique de confidentialité"

---

## 10. ANIMATIONS & EFFETS — Plus de sophistication

A) IMAGE REVEAL : Remplacer les fade-in basiques des images par des clip-path reveals.
Pour chaque image de la Flotte et de la section Zones :
  gsap.from(imageEl, {
    clipPath: 'inset(100% 0% 0% 0%)',
    duration: 1.2,
    ease: 'power3.inOut',
    scrollTrigger: { trigger: imageEl, start: 'top 85%', once: true }
  })

B) PARALLAXE : S'assurer que les parallaxes suivants fonctionnent (ajoutés dans V1) :
- Flotte images : yPercent -8
- Zones image fond : yPercent -12
- Hero video : yPercent -10
Vérifier qu'ils sont connectés via le Lenis ticker.

C) SECTION DIVIDERS : Entre chaque section, ajouter une fine ligne animée qui se dessine au scroll :
  <div className="section-divider" style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>
    <div style={{ height:1, background:'var(--border)', transformOrigin:'left', transform:'scaleX(0)' }} />
  </div>
Animer chaque divider avec gsap.to scaleX:1 via ScrollTrigger.

D) HOVER CURSOR : Sur les strips Services, ajouter un cursor:none et un custom cursor circle qui suit la souris (cercle 48px, border 1px lavande, mix-blend-mode difference). C'est un élément Awwwards classique.

E) TEXTE SPLIT : Dans les titres de section (h2), animer chaque mot individuellement comme le Hero h1 (word-by-word reveal). Pas juste un fade-in global.

F) SMOOTH ANCHOR SCROLL : S'assurer que les liens de nav (#services, #flotte, etc.) utilisent Lenis.scrollTo() avec une durée de 1.2s et un offset de -80px (hauteur nav).

---

## 11. IMAGES SUPPLÉMENTAIRES — Utiliser TOUTES les photos disponibles

Photos actuellement NON UTILISÉES dans aucun composant :
- /images/flotte-hotel-luxe.jpg → Atouts section (fond)
- /images/flotte-intercontinental.jpeg → Footer (fond)
- /images/classe-v-bastide.jpg → Contact panel gauche (fond)
- /images/classe-v-interieur.jpg → Flotte Classe V (hover intérieur)
- /images/mercedes-motion.jpeg → Hero poster (déjà ajouté)

Chaque photo DOIT apparaître quelque part dans le site. Aucune image ne doit rester inutilisée.

---

Après toutes ces modifications :
1. npm run build (doit passer sans erreur)
2. npm run preview
3. Vérifie section par section que :
   - Chaque section a un vrai paragraphe de texte (pas juste titre)
   - Toutes les 14 images sont visibles quelque part
   - Les animations de reveal fonctionnent au scroll
   - Les parallaxes donnent de la profondeur
   - Le footer est riche (4 cols + image fond + trust bar)
   - Les compteurs Atouts affichent 4.9, 24/7, 15min, 0€
   - Les descriptions services sont longues et vendeuses (3 lignes minimum)
   - Les réponses FAQ font 2-3 phrases
```
