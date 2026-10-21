# CLAUDE.md - Portfolio "Depth"

## Concept

Portfolio de développeur backend structuré comme une **descente en profondeur** à travers les couches d'un système : **SPARC**, le projet phare. Le visiteur scrolle et "perce" chaque couche de SPARC, de la surface (hero) jusqu'au core (autres projets, about, contact). La métaphore et le projet phare ne font qu'un : chaque couche raconte une seule histoire. Cible : postes Backend Engineer medior, full remote UE ; un recruteur passe 30 à 60 secondes sur le site, donc SPARC, le niveau et le contact doivent être visibles dès le hero.

### Les 6 couches

| Layer | ID | Label nav | Accent | Heading | Text | Background | Contenu |
|---|---|---|---|---|---|---|---|
| 0 - Surface | `surface` | Intro | `#8fa8c2` | `#c8d5e2` | `#a0aab8` | `#0c1018` | Hero : nom, titre, 3 ans à l'ULB, dispo remote UE, phrase SPARC, CTA (case study, email, CV), ~8 pills |
| 1 - Interface | `interface` | SPARC | `#5e8a8a` | `#a8ccc8` | `#7e9494` | `#0a0e12` | SPARC : problème, contraintes, chiffres, diagramme write/read path, comment les données entrent (LoRaWAN, MQTT, HTTP, accès) |
| 2 - Services | `services` | Architecture | `#4a7263` | `#8fbdaa` | `#7a9e8e` | `#080c0e` | Monolithe modulaire, décisions et trade-offs, fonctionnalités |
| 3 - Data | `data` | Pipeline | `#6b6243` | `#b5a87a` | `#8e8670` | `#0a0908` | Write path étape par étape, "When things go wrong" (fiabilité) |
| 4 - Infrastructure | `infra` | Infrastructure | `#5c4035` | `#a88072` | `#8a7068` | `#0a0807` | Comment SPARC tourne : backend sur VM (Podman, Traefik, GitLab CI, Prometheus/Grafana), front-end et autres services sur OKD + GitOps |
| 5 - Core | `core` | Work & contact | `#3d2828` | `#9a7070` | `#806464` | `#080606` | Digital Twin Framework, "Also shipped" (Tandem, IRIS, Infofin), about, stack complète, contact |

Les h2 décrivent le contenu ("How it runs"), le petit label mono garde la métaphore ("4 / Infrastructure").

### Système de couleurs dual-track

Chaque couche utilise **3 niveaux de couleur** pour garder la lisibilité en profondeur :

- **accent** : couleur identitaire de la couche. S'assombrit avec la profondeur. Utilisé pour les labels, pills, glows, indicateurs.
- **heading** : titres et éléments importants. Reste lisible même aux couches profondes.
- **text** : body text, descriptions. Gris teinté avec contraste suffisant (WCAG AA exigé pour heading+text sur leur bg respectif).

Le fond (`bg`) s'assombrit progressivement. L'accent aussi. Mais heading et text gardent un plancher de lisibilité. Les variables CSS reflètent ce système : `--layer-{id}-accent`, `--layer-{id}-heading`, `--layer-{id}-text`, `--layer-{id}-bg`.

### Direction artistique

- **Vibe** : dark, éditorial, atmosphérique. Pas "template dev dark mode". Penser Linear, pas Bootstrap.
- **Fond** : shift progressif inspiré des strates géologiques. Du bleu-ardoise en surface vers le brun-terre en profondeur. Pas de thème clair : le fond sombre fait partie du concept.
- **Typographie** : Instrument Serif (display, titres) + IBM Plex Mono (labels, code, annotations) + Manrope (body text). PAS de Inter, Roboto, Space Grotesk. Subsets latins uniquement.
- **Éléments récurrents** : indicateur de profondeur fixe (sidebar gauche, dots compacts sur mobile), readout "depth: XX%" en bas à droite, liens rapides fixes en haut à droite (SPARC, Contact, CV).
- **Rédaction** : 5 tirets cadratins (—) maximum dans tout le texte affiché (lu comme du texte généré par IA). Préférer deux-points, virgules, points. Labels de couche au format `0 / Surface`.

## Stack

- **Framework** : Astro (statique, single page)
- **Package manager** : pnpm (PAS npm ni yarn)
- **Animations** : CSS + IntersectionObserver (Reveal, compteurs, lignes de pipeline). Pas de GSAP à ce jour. Toutes les animations respectent `prefers-reduced-motion` et le contenu doit rester complet sans JS (valeurs finales dans le HTML statique).
- **Styling** : CSS vanilla, PAS de Tailwind, PAS de CSS-in-JS. Variables CSS pour les couleurs par couche.
- **Déploiement** : `pnpm deploy` — build + scp vers le VPS (axel-hoffmann.dev).

## Structure du projet

```
src/
  layouts/Layout.astro        # Layout principal, fonts, meta
  pages/index.astro           # Page unique, assemble les couches
  pages/404.astro             # Page 404 (servie par nginx via error_page)
  components/
    layers/                   # Surface, Interface, Services, Data, Infra, Core
    ui/                       # DepthIndicator, DepthReadout, QuickLinks, Reveal,
                              # TechPill, MetricBlock, ProjectCard, PatternCard,
                              # PipelineStep, ArchitectureDiagram
  styles/                     # global.css (reset, variables, .button), layers.css
  data/                       # sparc.ts, pipeline.ts, projects.ts, skills.ts, contact.ts
  scripts/depth-tracker.ts    # Logique scroll -> depth percentage
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

- Un composant = un fichier. Pas de composants géants multi-sections.
- Props typées avec TypeScript dans le frontmatter.
- Les données viennent de `src/data/`, pas hardcodées dans les composants.

### CSS

- Variables CSS pour TOUTES les couleurs de couche. Nommage : `--layer-{id}-accent`, `--layer-{id}-heading`, `--layer-{id}-text`, `--layer-{id}-bg`.
- Mobile-first. Les layouts grid passent en single column sous 768px.
- Pas de `!important`. Jamais.
- `clamp()` pour les tailles de police et les paddings responsifs.

### Animations

- Les transitions CSS simples (hover, reveal) restent en CSS pur.
- Toutes les animations respectent `prefers-reduced-motion`.
- Le HTML statique contient toujours l'état final (pas de compteurs à 0 sans JS).
- Performance : pas de layout thrashing, `transform` et `opacity` uniquement pour les animations fréquentes.

### TypeScript

- Strict mode. Types partagés dans `src/types.ts`. Pas de `any`.

### Commits

- Atomiques : un commit = un changement logique, qui compile.
- Messages à l'impératif, en anglais, préfixés (content, fix, feat, refactor, chore, perf) avec scope si pertinent.

## Tests

- `astro build` doit passer sans erreur.
- Vérifier le depth tracker sur mobile et desktop.
- Tester avec `prefers-reduced-motion: reduce` et sans JavaScript.
- Lighthouse : viser 95+ en performance. Contrastes : WCAG AA minimum.

## Notes

- Le site est une single page. Pas de routing multi-pages (seule exception : `404.astro`).
- GitHub : https://github.com/CePseudoBE — LinkedIn : https://www.linkedin.com/in/axel-g-hoffmann/ — Email : axel.g.hoffmann@gmail.com (source : `src/data/contact.ts`).
- CV : `public/cv.pdf` (version EN sans photo), lié depuis le hero, les liens rapides et Core.
- Image sociale : `public/og-sparc.png` (2400×1260). LinkedIn cache l'image par URL : tout nouveau rendu doit changer de nom de fichier.
- Le contenu est en anglais (portfolio pour des postes remote internationaux).
- Le "depth: XX%" readout et l'indicateur latéral sont des éléments signature du design, ne pas les retirer.
