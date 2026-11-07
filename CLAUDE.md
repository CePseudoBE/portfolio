# CLAUDE.md - Portfolio

## Concept

Portfolio de développeur backend centré sur **SPARC**, le projet phare. Une seule page, une seule colonne, du texte lisible. Cible : postes Backend Engineer medior, full remote UE ; un recruteur passe 30 à 60 secondes sur le site, donc SPARC, le niveau et le contact doivent être visibles en haut de page.

Le site doit avoir l'air construit à la main par un ingénieur backend, pas généré par une IA. Ne pas charger de skill de design frontend et ne pas chercher à le rendre "distinctif" ou "éditorial" de sa propre initiative : c'est cet instinct qui avait produit l'ancienne version (concept "Depth", abandonné). Voir **Banned patterns**.

### Sections (ordre fixe)

| Composant      | id               | Titre          | Contenu                                                                             |
| -------------- | ---------------- | -------------- | ----------------------------------------------------------------------------------- |
| Header         | -                | h1 (nom)       | Nom, une ligne de rôle, une ligne de liens de contact                               |
| Intro          | -                | -              | 3 ans à l'ULB, dispo remote UE, phrase SPARC, stack principale en une ligne         |
| Sparc          | `sparc`          | SPARC          | Problème, chiffres en une phrase, contraintes, write/read paths (figure), ingestion |
| Architecture   | `architecture`   | Architecture   | Monolithe modulaire, décisions et trade-offs, extrait de code Rust, fonctionnalités |
| Reliability    | `reliability`    | Reliability    | Write path étape par étape, "When things go wrong"                                  |
| Infrastructure | `infrastructure` | Infrastructure | Backend sur VM, capture Grafana, front-end et autres services sur OKD + GitOps      |
| OtherWork      | `other-work`     | Other work     | Digital Twin Framework, "Also shipped" (Tandem, IRIS, Infofin)                      |
| About          | `about`          | About          | Parcours, BELSPO, stack complète                                                    |
| Contact        | `contact`        | Contact        | Email, CV, GitHub, LinkedIn                                                         |

### Style visuel

- Une pile système pour tout le texte : `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`. `ui-monospace` uniquement dans `<code>`/`<pre>` et pour des noms d'outils inline dans une phrase.
- Hiérarchie par taille et graisse uniquement (400/600). h1 2.25rem, h2 1.5rem, h3 1.125rem. Body 1rem / line-height 1.6, mesure 70ch max. `text-wrap: balance` sur les titres, `text-wrap: pretty` sur les paragraphes.
- Fond `#ffffff`, texte `#1a1a1a`, secondaire `#555`. Un seul accent : `#1f5fbf`, pour les liens et le focus uniquement. Mode sombre via `prefers-color-scheme` : `#141414` / `#e6e6e6`, secondaire `#a6a6a6`, liens `#8ab4f8` (`#1f5fbf` ne fait que 3:1 sur `#141414`).
- Une colonne alignée à gauche dans un cadre centré de 60rem ; la prose est limitée à 44rem. Seuls les `<figure>` (diagramme, code, captures) vont jusqu'à 60rem : c'est la seule asymétrie voulue.
- Plus d'espace au-dessus des titres qu'en dessous.
- Listes de termes (décisions, scénarios de panne, infra, ingestion) en `<dl>` simples, étapes en `<ol>`, stack en phrases séparées par des virgules, CTA en liens soulignés.
- Le site ne charge aucun JavaScript ; le contenu est complet tel quel.

## Banned patterns

Ne jamais réintroduire, même "pour améliorer le design" :

- **Polices** : tout paquet `@fontsource` ou police web. Instrument Serif, toute serif display, tout mot d'accent en italique, Inter, Geist, Space Grotesk, Manrope, DM Sans, Plus Jakarta, Syne, Outfit, Fraunces, Playfair, IBM Plex, JetBrains Mono.
- **Typographie** : `text-transform: uppercase` (nulle part), `letter-spacing` autre que la valeur par défaut, monospace hors `<code>`/`<pre>`/noms d'outils inline, graisses autres que 400/600, h1 plein écran.
- **Couleur** : fond crème/beige, palettes par section ou par "couche", dégradés (`gradient`), glows, `box-shadow` colorées, glassmorphism (`backdrop-filter`, fonds translucides), bandes d'accent en `border-left`, toute couleur d'accent autre que le bleu des liens, mode sombre bleu marine.
- **Layout** : hero centré ou plein écran, sections en `min-height: 100vh`, petit label au-dessus des titres, numérotation "N / Layer", grilles de cartes, cartes imbriquées, icônes au-dessus des titres, grilles de stats ("By the numbers"), pills/tags de technos, boutons, badge dans le hero, indicateur "scroll", navigation fixe.
- **Mouvement** : révélation au scroll (`opacity: 0` initial), compteurs animés, lignes animées, indicateur de profondeur, readout "depth: XX%", tracker de scroll, `scroll-behavior: smooth`, `@keyframes`, effets hover en `transform`. Seules les transitions de couleur au hover/focus sont permises.
- **Concept** : la métaphore "Depth" (couches, surface, core, descente) dans le texte, les ids, les classes ou les noms de fichiers.
- **Preuves** : images générées, captures, diagrammes ou extraits de code factices. Les `<figure>` de preuve (diagramme d'architecture, extrait de code Rust, capture Grafana) ne contiennent que des fichiers fournis par Axel. En attendant : un placeholder `TODO` rendu uniquement en dev (`import.meta.env.DEV`), pour que `pnpm deploy` ne le publie jamais.
- **Rédaction** : plus de 3 tirets cadratins (—) dans tout le texte affiché, slogans, contrastes forcés. Ne pas réécrire la copie d'Axel sans demande : signaler les lignes problématiques.

## Stack

- **Framework** : Astro (statique, single page)
- **Package manager** : pnpm (PAS npm ni yarn)
- **Styling** : CSS vanilla, tout dans `src/styles/global.css`. PAS de Tailwind, PAS de CSS-in-JS.
- **JavaScript client** : aucun.
- **Outillage** : `pnpm format` / `pnpm format:check` (Prettier + prettier-plugin-astro), `pnpm check` (`astro check`, types). Pas de linter à ce jour.
- **Déploiement** : `pnpm deploy` — build + scp vers le VPS (axel-hoffmann.dev).

## Structure du projet

```
src/
  layouts/Layout.astro        # Layout principal, meta
  pages/index.astro           # Page unique, assemble les sections
  pages/404.astro             # Page 404 (servie par nginx via error_page)
  components/sections/        # Header, Intro, Sparc, Architecture, Reliability,
                              # Infrastructure, OtherWork, About, Contact
  styles/global.css           # Variables de couleur, typographie, listes, figures
  data/                       # sparc.ts, pipeline.ts, projects.ts, skills.ts, contact.ts
```

## Contenu technique (EXACT — règle : AUCUNE donnée inventée)

Tout fait affiché doit être vérifiable. Pas de métriques non mesurées, pas d'endpoints inventés.

### Ce qu'on montre

- **Parcours** : backend engineer chez STARI (ULB & FARI), Bruxelles, depuis 2023 (3 ans). Contexte FARI = AI Institute for the Common Good. Ouvert aux postes remote dans l'UE.
- **SPARC** (Sensor Platform for Academic Research and Community) : https://sparc.ulb.be. Seul ingénieur sur SPARC, au sein de STARI : backend Rust, web app Nuxt 4, infra.
  - En production depuis janvier 2026, 2 campus ULB (d'autres prévus), ~50 devices, 3 gateways LoRaWAN.
  - Utilisateurs : un centre de recherche (CIREM) et le département infrastructure de l'ULB.
  - Ingestion : LoRaWAN (ChirpStack v4, gateways existantes du campus, TLS gateway → network server), MQTT 5.0 (Mosquitto, TLS), HTTP (une clé API par device).
  - Rust (Axum, Tokio), 8 crates, 673 tests automatisés. Monolithe modulaire, hexagonal (ports & adapters), pipeline event-driven, CQRS léger garanti à la compilation (l'API ne peut pas écrire de télémétrie).
  - NATS JetStream (buffer, consumers idempotents, dead-letter queue), TimescaleDB (hypertables, agrégats continus, compression).
  - OIDC via Authentik (RS256/JWKS, pas de secret partagé), RBAC multi-tenant fail-closed.
  - Fonctionnalités : alertes de seuil par email, exports CSV asynchrones, statut des devices dérivé de la dernière activité, gestion de flotte LoRaWAN via l'API.
  - Pourquoi Rust : construit seul, le compilateur est le premier filet de sécurité.
  - **Déploiement (version unique partout)** : le **backend** SPARC tourne avec Podman + Traefik sur une VM Proxmox, GitLab CI, Prometheus + Grafana. Certificat TLS de la PKI interne, rotation via une unit systemd.path qui redémarre Traefik. Le **front-end** Nuxt 4 de SPARC tourne sur OKD via la chaîne GitOps (Tekton, Argo CD, Kustomize, Sealed Secrets), comme IRIS, Tandem et Infofin. Ne jamais écrire que tout SPARC tourne sur OKD, ni que SPARC n'y est pas du tout.
- **Digital Twin Framework** : framework TypeScript à composants (Collectors, Harvesters, Handlers, Assets Managers), développé pour FARI, NGSI-LD natif, alternative in-house à FIWARE/Orion, Redis + PostgreSQL + BullMQ (4 queues), presigned upload OVH S3. Open source MIT : https://github.com/CePseudoBE/digitaltwin. En production comme gateway unifiant entités digital twin, capteurs IoT, mobilité et environnement pour une visualisation 3D Unity (l'ancienne carte "API Gateway" est fusionnée ici). PAS de nombre de packages, PAS de claim de performance.
- **Also shipped to production at ULB** (une ligne chacun) : **Tandem** (échange linguistique, trois universités, AdonisJS), **IRIS** (soumission de candidatures et pièces justificatives, AdonisJS), **Infofin** (https://infofin.ulb.be, Laravel : "ULB's platform listing research funding opportunities (calls for projects, grants, mobility, events)").
- **BELSPO** : formation d'une journée sur l'IA pour le bien commun, avec la FARI AI Academy.
- **Stack** : Rust, TypeScript, SQL, PHP. Axum, Tokio, AdonisJS, Laravel. PostgreSQL, TimescaleDB, NATS JetStream, MQTT, Redis, BullMQ, NGSI-LD. Kubernetes/OKD, GitOps (Argo CD, Tekton, Kustomize, Sealed Secrets), Podman, Docker, Traefik, Proxmox, GitLab CI. OIDC/OAuth2, Prometheus, Grafana. LoRaWAN, ChirpStack.

### Ce qu'on NE montre PAS

- **PAS de Python** dans la stack (utilisation rare, pas représentatif)
- **PAS de Java ni Spring Boot** (quasiment plus utilisés)
- **PAS d'Elemys** (projet Minecraft perso, pas pertinent pour le portfolio pro)
- **PAS de Lostgard** (ce n'est pas mon projet)
- **PAS de TaxCalc** sauf décision contraire explicite
- **PAS de claims non mesurées** (ex-"~60% overhead reduction" : supprimée définitivement)
- **PAS de comptes de packages/layers** pour le Digital Twin (les sources divergent, la métrique ne veut rien dire)
- **PAS de messages/jour** pour SPARC tant que ce n'est pas mesuré
- **PAS d'app mobile** (Cordova/Vue) : hors cible backend
- **PAS de cartes génériques** (définitions de protocoles, liste de patterns) ni d'endpoints "illustratifs" : chaque élément doit parler d'un vrai projet

## Conventions de code

### Astro

- Un composant par section (un h2 = un fichier dans `components/sections/`).
- Props typées avec TypeScript dans le frontmatter.
- Les données structurées (listes, chiffres, projets, liens) viennent de `src/data/`, pas hardcodées dans les composants.

### CSS

- Couleurs uniquement via les variables de `global.css` : `--bg`, `--text`, `--text-secondary`, `--link`.
- Styler les éléments HTML (`h2`, `dl`, `figure`...) plutôt que d'inventer des classes. Classes existantes : `.secondary`, `.todo`, `.skip-link`.
- Pas de `!important`. Jamais.

### TypeScript

- Strict mode. Types définis à côté des données qu'ils décrivent (`src/data/*.ts`). Pas de `any`.

### Commits

- Atomiques : un commit = un changement logique, qui compile.
- Messages à l'impératif, en anglais, préfixés (content, fix, feat, refactor, chore, perf, style) avec scope si pertinent.

## Tests

- `pnpm format:check`, `pnpm check` et `pnpm build` doivent passer.
- Vérifier en clair et en sombre, sur mobile et desktop, et sans JavaScript.
- `rg -i "uppercase|letter-spacing|gradient|box-shadow|backdrop-filter|@fontsource|opacity: 0" src` ne doit rien renvoyer.
- Lighthouse : viser 95+ en performance. Contrastes : WCAG AA minimum.

## Notes

- Le site est une single page. Pas de routing multi-pages (seule exception : `404.astro`).
- GitHub : https://github.com/CePseudoBE — LinkedIn : https://www.linkedin.com/in/axel-g-hoffmann/ — Email : axel.g.hoffmann@gmail.com (source : `src/data/contact.ts`).
- CV : `public/cv.pdf` (version EN sans photo), lié depuis le header et Contact.
- Image sociale : `public/og-sparc.png` (2400×1260). LinkedIn cache l'image par URL : tout nouveau rendu doit changer de nom de fichier. L'image actuelle et `public/favicon.svg` portent encore l'ancien design "Depth" : à refaire.
- Le contenu est en anglais (portfolio pour des postes remote internationaux).
