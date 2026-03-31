# GUIDE DE PILOTAGE — Copier-coller et suivre les étapes
> Pour Sonia. Chaque bloc = un copier-coller dans Claude Code.

---

## AVANT DE COMMENCER — Générer la vidéo Hero

### Étape 0 : Prompt Gemini Video (Google Veo / Gemini)

Copier-coller ce prompt dans Gemini pour générer la vidéo Hero :

```
Modern luxury car commercial aesthetic. Shot on RED V-Raptor, 8K downscaled.

A glossy black Mercedes S-Class glides along a smooth Provençal road at sunset, driving on the right side of the road (French driving rules). The car is shot low-angle, close to the ground — like a Mercedes-AMG or Tesla ad. Sharp reflections on the bodywork, motion blur on the wheels, environment reflected in the dark paint.

Behind the car: the iconic Montagne Sainte-Victoire, golden hour light, warm amber sky with soft lavender and pink tones. The landscape is photorealistic: lavender fields, a row of cypress trees, distant stone bastide — but framed with a modern cinematic composition. Clean, minimal, high contrast.

Camera: slow tracking shot alongside the car, slightly rising with a gentle parallax effect. Shallow depth of field — the car is razor sharp, the background softly blurred. Anamorphic lens flares catch the low sun.

Color grading: modern editorial look — deep shadows, lifted blacks, warm highlights, desaturated midtones. Think Apple product video meets Provence. No vintage filter, no sepia, no film grain.

No text, no people visible, no license plate text. Pure visual luxury. Clean, contemporary, aspirational.
```

**Si le résultat est trop "carte postale" :** ajoute `"Close-up detail shots intercut: Mercedes star emblem reflecting sunlight, wheel spinning on asphalt, rear tail lights glowing at dusk"`

**Si tu veux un plan fixe plutôt que tracking :** remplace par `"Static wide shot, car enters from the left and crosses the frame slowly, Sainte-Victoire centered in background"`

> Enregistre la vidéo dans `Projets_Web/provencalcoasttaxi-v2/public/hero-video.mp4`
> Si le résultat ne te plaît pas, relance avec des variations (matin au lieu de coucher de soleil, vue de face, etc.)

---

## CONVERSATION 1 — Setup + Nav + Hero

### Message 1 : Lecture du projet

```
Lis ces fichiers dans l'ordre, ne code rien encore :
1. README.md       → vision, stack technique, architecture
2. MEMORY.md       → contenu client, design tokens, palette de couleurs, typographie
3. DESIGN-SYSTEM.md → couleurs exactes, composants, règles Awwwards, interdictions
4. ANIMATIONS.md   → stack GSAP + Lenis, code exact des animations
5. TASKS.md        → liste des 12 tâches à exécuter dans l'ordre

Points clés à retenir avant de coder :
- Stack : React 18 + Vite + Tailwind CSS v4 + GSAP 3 + Lenis
- Thème : dark premium, inspiration Provence / Montagne Sainte-Victoire
- Couleur signature : #C9A84C (or provençal)
- Typo : Playfair Display (titres) + Inter (corps)
- Fond : #0A0806 (noir chaud, jamais noir pur)
- Vidéo hero disponible dans public/hero-video.mp4

Dis-moi ce que tu as compris du projet, du design et confirme que tu es prêt.
```

**Attends sa réponse. S'il a bien compris, continue :**

### Message 2 : Tâche 0 (nettoyage)

```
Exécute la TÂCHE 0 de TASKS.md : nettoie les placeholders.
Supprime App.css et les assets Vite par défaut.
Vérifie que npm run dev fonctionne sans erreur.
Montre-moi le résultat de npm run build.
```

**Attends le build propre, puis :**

### Message 3 : Nav

```
Lis DESIGN-SYSTEM.md et ANIMATIONS.md pour les specs.
Puis exécute la TÂCHE 1 : code le composant Nav.jsx.
Respecte exactement les specs de TASKS.md pour ce composant.
Lance npm run build après.
```

**Attends le build, puis :**

### Message 4 : Hero

```
Lis COPY-MARKETING.md section HERO et RESPONSIVE.md section typographie.
Exécute la TÂCHE 2 : code Hero.jsx avec la Sainte-Victoire SVG, la timeline GSAP complète, le parallax.

IMPORTANT : dans le Hero, intègre une balise vidéo en arrière-plan :
<video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
  <source src="/hero-video.mp4" type="video/mp4" />
</video>
La vidéo est une prise de vue cinématique d'une Mercedes devant la Sainte-Victoire. Elle passe en arrière-plan derrière un overlay sombre semi-transparent pour que le texte reste lisible.

La silhouette SVG SaintVictoire reste en plus au-dessus de la vidéo comme accent décoratif.

Lance npm run build après.
```

**Vérifie que le Hero s'affiche bien. Si pas de vidéo encore, pas grave — elle sera ajoutée manuellement.**

---

## CONVERSATION 2 — Atouts + Services + Flotte

### Message 1 : Contexte

```
Lis README.md et MEMORY.md. On en est à la TÂCHE 3. Les tâches 0, 1 et 2 sont terminées.
```

### Message 2 : Atouts

```
Lis DESIGN-SYSTEM.md et ANIMATIONS.md.
Exécute la TÂCHE 3 : code Atouts.jsx.
npm run build après.
```

### Message 3 : Services

```
Lis COPY-MARKETING.md section SERVICES.
Exécute la TÂCHE 4 : code Services.jsx.
npm run build après.
```

### Message 4 : Flotte

```
Exécute la TÂCHE 5 : code Flotte.jsx.
npm run build après.
```

---

## CONVERSATION 3 — Zones + Avis + FAQ

### Message 1 : Contexte

```
Lis README.md et MEMORY.md. On en est à la TÂCHE 6. Les tâches 0 à 5 sont terminées.
```

### Message 2 : Zones

```
Exécute la TÂCHE 6 : code Zones.jsx.
npm run build après.
```

### Message 3 : Avis

```
Lis COPY-MARKETING.md section AVIS.
Exécute la TÂCHE 7 : code Avis.jsx.
npm run build après.
```

### Message 4 : FAQ

```
Lis ANIMATIONS.md section FAQ pour la technique accordéon GSAP.
Exécute la TÂCHE 8 : code FAQ.jsx.
npm run build après.
```

---

## CONVERSATION 4 — Contact + Footer + SEO

### Message 1 : Contexte

```
Lis README.md et MEMORY.md. On en est à la TÂCHE 9. Les tâches 0 à 8 sont terminées.
```

### Message 2 : Contact

```
Lis COPY-MARKETING.md section CONTACT et RESPONSIVE.md section contact.
Exécute la TÂCHE 9 : code Contact.jsx.
npm run build après.
```

### Message 3 : Footer

```
Exécute la TÂCHE 10 : code Footer.jsx.
npm run build après.
```

### Message 4 : SEO

```
Lis SEO-GEO.md en entier.
Exécute la TÂCHE 11 :
- Mets à jour index.html avec tous les meta tags
- Crée public/llms.txt
- Crée public/sitemap.xml
- Vérifie que SchemaOrg.jsx est complet
npm run build après.
```

---

## CONVERSATION 5 — Build final + vérifications

### Message 1 :

```
Lis README.md et MEMORY.md. Toutes les tâches 0 à 11 sont terminées.
Exécute la TÂCHE 12 : vérifications finales.

1. npm run build — zéro erreur
2. Vérifie tous les liens (tel:, mailto:, wa.me)
3. Vérifie le responsive : ajoute les classes manquantes pour 375px, 768px, 1440px
4. Vérifie que GSAP + Lenis ne crashent pas
5. Vérifie le CTA sticky mobile
6. npm run preview — confirme que tout fonctionne

Lis aussi RESPONSIVE.md checklist finale et corrige tout ce qui manque.
```

---

## CONVERSATION 6 — Déploiement Vercel

> Avant ça : Yassine doit avoir créé son compte sur vercel.com

### Message 1 :

```
Le projet est dans provencalcoasttaxi-v2.
Je veux déployer sur Vercel.
Le domaine cible est provencalcoasttaxi.fr.
Aide-moi à faire le déploiement.
```

---

## RAPPELS

| Situation | Quoi faire |
|-----------|-----------|
| Claude Code perd le fil | "Lis README.md et MEMORY.md. On en est à la TÂCHE X." |
| Le build échoue | "Corrige l'erreur et relance npm run build." |
| Le design ne te plaît pas | "Stop. Change [X] dans cette section. Relis DESIGN-SYSTEM.md." |
| Tu veux un ajustement | "Ne touche pas au reste. Modifie uniquement [X] dans [fichier]." |
| Contexte coupé | Ouvre une nouvelle conversation avec le message de contexte |
