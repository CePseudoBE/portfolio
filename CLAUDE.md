# CLAUDE.md - Portfolio "Depth"

## Concept

Portfolio de développeur backend structuré comme une **descente en profondeur** à travers les couches d'un système. Le visiteur scrolle et "perce" chaque couche, de la surface (API) jusqu'au core (valeurs, contact). La métaphore fonctionne à deux niveaux : un non-technique comprend intuitivement "ce mec travaille sur les fondations", un technique reconnaît le modèle en couches.

### Les 6 couches

| Layer | ID | Accent | Heading | Text | Background | Contenu |
|---|---|---|---|---|---|---|
| 0 - Surface | `surface` | `#8fa8c2` | `#c8d5e2` | `#a0aab8` | `#0c1018` | Hero, nom, rôle STARI, tagline, stack |
| 1 - Interface | `interface` | `#5e8a8a` | `#a8ccc8` | `#7e9494` | `#0a0e12` | API Gateway (projet phare), endpoints illustratifs, protocoles |
| 2 - Services | `services` | `#4a7263` | `#8fbdaa` | `#7a9e8e` | `#080c0e` | Digital Twin (projet phare), Infofin/Tandem/IRIS, patterns |
| 3 - Data | `data` | `#6b6243` | `#b5a87a` | `#8e8670` | `#0a0908` | Pipeline, TimescaleDB, NATS JetStream, PostgreSQL, Redis, BullMQ |
| 4 - Infrastructure | `infra` | `#5c4035` | `#a88072` | `#8a7068` | `#0a0807` | SPARC (projet phare), GitOps chain, Kubernetes/OKD, Proxmox, LoRaWAN |
| 5 - Core | `core` | `#3d2828` | `#9a7070` | `#806464` | `#080606` | Valeurs, about, BELSPO/FARI Academy, contact, CV |

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
- **Éléments récurrents** : indicateur de profondeur fixe (sidebar gauche, dots compacts sur mobile), readout "depth: XX%" en bas à droite.

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
  components/
    layers/                   # Surface, Interface, Services, Data, Infra, Core
    ui/                       # DepthIndicator, DepthReadout, Reveal, TechPill,
                              # EndpointRow, MetricBlock, ProjectCard, PatternCard,
                              # PipelineStep
  styles/                     # global.css (reset, variables), layers.css
  data/                       # projects.ts, skills.ts, endpoints.ts, pipeline.ts
  scripts/depth-tracker.ts    # Logique scroll -> depth percentage
```

## Contenu technique (EXACT — règle : AUCUNE donnée inventée)

Tout fait affiché doit être vérifiable. Pas de métriques non mesurées, pas de faux endpoints présentés comme réels (les endpoints de la layer Interface sont marqués "illustrative").

### Ce qu'on montre

- **Parcours** : backend engineer chez STARI (ULB & FARI), Bruxelles, depuis 2023. Contexte FARI = AI Institute for the Common Good.
- **SPARC** (Sensor Platform for Academic Research and Community) : en production sur les campus ULB (https://sparc.ulb.be). Porté seul de bout en bout : backend Rust, web app Nuxt 4, infra OKD. Faits : 8 crates, 673 tests automatisés, ingestion idempotente multi-protocole (LoRaWAN/ChirpStack, MQTT 5.0, HTTP) sur NATS JetStream + dead-letter queue, TimescaleDB (hypertables, agrégats continus, compression), hexagonale + CQRS garanti à la compilation, OIDC (Authentik, RS256/JWKS), RBAC multi-tenant fail-closed.
- **Digital Twin Framework** : framework TypeScript à composants (Collectors, Harvesters, Handlers, Assets Managers), NGSI-LD natif, remplacement in-house de FIWARE/Orion, Redis + PostgreSQL + BullMQ (4 queues), presigned upload OVH S3. Open source MIT : https://github.com/CePseudoBE/digitaltwin. PAS de nombre de packages, PAS de claim de performance.
- **API Gateway** : unifie digital twin, capteurs IoT, mobilité, environnement pour une visualisation 3D urbaine sous Unity. Stack non affichée tant que non confirmée.
- **Infofin** (https://infofin.ulb.be, Laravel, en production), **Tandem** (échange linguistique, AdonisJS), **IRIS** (soumission de candidatures, AdonisJS).
- **BELSPO** : formation d'une journée sur l'IA pour le bien commun, avec la FARI AI Academy.
- **Patterns** : DI/IoC, event-driven (BullMQ workers), CQRS, monorepo (sans chiffres).
- **Stack** : Rust, TypeScript, PHP, SQL. Axum, Tokio, AdonisJS, Laravel. PostgreSQL, TimescaleDB, NATS JetStream, MQTT, Redis, NGSI-LD. Kubernetes/OKD, GitOps (Argo CD, Tekton, Kustomize, Sealed Secrets), Docker, Proxmox, LoRaWAN. OIDC/OAuth2.

### Ce qu'on NE montre PAS

- **PAS de Python** dans la stack (utilisation rare, pas représentatif)
- **PAS de Java ni Spring Boot** (quasiment plus utilisés)
- **PAS d'Elemys** (projet Minecraft perso, pas pertinent pour le portfolio pro)
- **PAS de Lostgard** (ce n'est pas mon projet)
- **PAS de TaxCalc** sauf décision contraire explicite
- **PAS de claims non mesurées** (ex-"~60% overhead reduction" : supprimée définitivement)
- **PAS de comptes de packages/layers** pour le Digital Twin (les sources divergent, la métrique ne veut rien dire)

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

- Le site est une single page. Pas de routing multi-pages.
- GitHub : https://github.com/CePseudoBE — LinkedIn : https://www.linkedin.com/in/axel-g-hoffmann/ — Email : axel.g.hoffmann@gmail.com
- CV : `public/cv.pdf` (version EN sans photo), lié depuis Core.
- Le contenu est en anglais (portfolio pour des postes remote internationaux).
- Le "depth: XX%" readout et l'indicateur latéral sont des éléments signature du design, ne pas les retirer.
