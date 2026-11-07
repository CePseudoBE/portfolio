# CLAUDE.md - Portfolio

## Concept

Portfolio de développeur backend centré sur **SPARC**, le projet phare. Une seule page. Cible : postes Backend Engineer medior, full remote UE ; un recruteur passe 30 à 60 secondes sur le site, donc SPARC, le niveau et le contact doivent être visibles tout de suite.

Historique : la v1 ("Depth", serif, thème sombre, labels uppercase, glows) faisait généré par IA ; la v2 (texte brut) n'avait aucune identité. La v3 tire sa personnalité de **quelques choix de design fermes** et de **preuves réelles** : l'architecture dessinée depuis le code, une vraie capture de l'app, une démo de panne basée sur les vraies règles, un vrai extrait de code. Pas des effets.

### Structure de la page

| Composant                    | id      | Titre                          | Contenu                                                                                                 |
| ---------------------------- | ------- | ------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `Sidebar`                    | -       | h1 (nom)                       | Nom, rôle, "ULB, Brussels · since 2023", liens de contact, nav, disponibilité, "Rust, TypeScript, SQL." |
| lead (`index.astro`)         | -       | -                              | Phrase d'accroche SPARC                                                                                 |
| `Sparc`                      | `sparc` | h2 SPARC                       | Diagramme, datasheet + capture, problème, contraintes, décisions, infrastructure                        |
| `FailureDemo` (dans `Sparc`) | `demo`  | h3 When things go wrong        | Démo interactive de la write path, puis les cas de panne (`failureCases`)                               |
| `CodeExcerpt` (dans `Sparc`) | `code`  | h3 The export queue is a table | Extrait `claim_next` verbatim, Shiki                                                                    |
| `Notes` (dans `Sparc`)       | `notes` | h3 Notes                       | Rendu seulement si une note est publiée                                                                 |
| `OtherWork`                  | `other` | h2 Other work                  | Digital Twin (lignes de couches), Also shipped, ligne OKD/GitOps                                        |
| `About`                      | `about` | h2 About                       | Parcours, envie d'équipe, homelab, BELSPO, stack en une ligne                                           |
| footer (`index.astro`)       | -       | -                              | Liens de contact, "Built with Astro"                                                                    |

### Design system

- **Police** : Archivo variable (`@fontsource-variable/archivo`), uniquement le fichier latin `wdth`, importé en `?url` dans `Layout.astro` (preload + `@font-face` inline). Une seule famille partout.
  - Nom : `font-stretch: 68%`, 800, 56px (48px sous 900px), line-height 0.92. h2 : 72%, 750, 42px. h3 : 85%, 700, 22px.
  - Body 17px / 1.6. Lead 26px, 450, 32ch max. Paragraphes 68ch max.
  - Code : pile `ui-monospace`, seulement dans `<pre>` et `<code>`.
- **Couleurs** (`global.css`, clair par défaut, sombre via `prefers-color-scheme`) :
  - clair : `--ink #161616`, `--muted #5a5a5a`, `--rule #d9d9d9`, `--signal #c4471d`, `--bg #fff`, `--soft #f5f5f4`, `--rust #eef3fb`, `--rustline #1f5fbf`
  - sombre : `--ink #e8e8e8`, `--muted #a6a6a6`, `--rule #333`, `--signal #e9764c`, `--bg #141414`, `--soft #1c1c1c`, `--rust #17233a`, `--rustline #8ab4f8`
  - `--on-signal` : texte sur fond `--signal` (blanc en clair, `#141414` en sombre, car le blanc ne fait que 2.9:1 sur `#e9764c`).
  - `--signal` (orange) a deux usages seulement : soulignement des liens et état "down" de la démo. Jamais décoratif.
  - Bleu (`--rust`/`--rustline`) = "partie du backend Rust", dans le diagramme et la démo.
- **Layout** : deux colonnes à partir de 900px (sidebar 260px en `position: sticky`, contenu à droite, max 1280px, gap 64px). En dessous : une colonne, sidebar en haut, pas sticky. `minmax(0, 1fr)` sur les pistes de grille pour éviter tout débordement à 390px.
- **Nav active** : gras + couleur ink uniquement (`aria-current`, posé par le script de `Sidebar`). Pas de barre colorée.
- **JavaScript** : deux petits scripts seulement, la nav active (`Sidebar`) et la démo (`FailureDemo`). La page se lit entièrement sans JS.

## Banned patterns

- Pas de police serif display ni de mot d'accent en italique. Pas d'Instrument Serif, Inter, Geist, Space Grotesk, Manrope, DM Sans, IBM Plex ni JetBrains Mono.
- Pas de `text-transform: uppercase` ni de letter-spacing large.
- Pas de dégradés, glows, ombres colorées, glassmorphism ni bordures latérales colorées sur des cartes.
- Pas d'animation d'apparition ou de révélation, pas de flèche qui rebondit, pas de contenu à `opacity: 0` avant que le JS tourne. La seule animation est la démo de panne, et elle respecte `prefers-reduced-motion`.
- Pas de grille de gros chiffres. Les faits vont dans la datasheet.
- Pas de petit label numéroté au-dessus des titres ("0 / Surface"). Pas de concept "depth".
- Au plus 3 tirets cadratins (—) dans tout le texte affiché.
- Aucun fait, chiffre, image ou code inventé. Tout ce qui est affiché vient du repo SPARC, du dashboard live ou d'Axel.

## Stack

- **Framework** : Astro (statique, single page)
- **Package manager** : pnpm (PAS npm ni yarn)
- **Styling** : CSS vanilla. Variables, base et éléments partagés dans `src/styles/global.css` ; styles propres à un composant dans son `<style>` scopé. PAS de Tailwind, PAS de CSS-in-JS.
- **Coloration du code** : `<Code>` d'Astro (Shiki), thèmes `github-light-high-contrast` / `github-dark-default` (le thème clair par défaut ne passe pas AA sur `--soft`), `defaultColor: false` ; le choix du thème se fait dans `global.css` via `prefers-color-scheme`.
- **Outillage** : `pnpm format` / `pnpm format:check` (Prettier + prettier-plugin-astro), `pnpm check` (`astro check`). Pas de linter à ce jour.
- **Déploiement** : `pnpm run deploy` — build + scp vers le VPS (axel-hoffmann.dev). Pas `pnpm deploy`, qui lance la commande intégrée de pnpm et non le script.

## Structure du projet

```
src/
  layouts/Layout.astro        # Meta, police, global.css
  pages/index.astro           # Page unique : sidebar, lead, sections, footer
  pages/404.astro             # Page 404 (servie par nginx via error_page)
  components/                 # Sidebar, ContactLinks, Sparc, FailureDemo, CodeExcerpt,
                              # Notes, OtherWork, About
  styles/global.css           # Variables de couleur, typographie, layout, tableaux, code
  data/                       # sparc.ts, projects.ts, skills.ts, contact.ts, notes.ts,
                              # claim-next.txt (extrait Rust verbatim)
```

## Contenu technique (EXACT — règle : AUCUNE donnée inventée)

Tout fait affiché doit être vérifiable. Pas de métriques non mesurées, pas d'endpoints inventés. Faits SPARC vérifiés le 7 novembre 2026 contre le repo (branche `develop`) et le dashboard live.

### Ce qu'on montre

- **Parcours** : backend engineer chez STARI (ULB & FARI), Bruxelles, depuis 2023. Premier emploi, après un bachelier en informatique (réseaux et télécoms) à la HEH. Contexte FARI = AI Institute for the Common Good. Ouvert aux postes remote dans l'UE.
- **SPARC** (Sensor Platform for Academic Research and Community) : https://sparc.ulb.be. Seul ingénieur sur SPARC, au sein de STARI : backend Rust, web app Nuxt 4, infra.
  - En production depuis janvier 2026 (d'autres campus prévus). Parc : "34 registered sensors, 3 LoRaWAN gateways, 2 campuses (November 2026)" (dashboard : 22 actifs sur 24 h). Toujours dater ce chiffre et le mettre à jour avec la date.
  - Utilisateurs : un centre de recherche (CIREM) et le département infrastructure de l'ULB.
  - Backend : un workspace Rust (8 crates, 673 tests automatisés), une image, trois binaires : `iot-ingestion`, `iot-processing`, `iot-api`. Hexagonal (ports & adapters), pipeline event-driven, CQRS léger garanti à la compilation (l'API ne peut pas écrire de télémétrie).
  - Ingestion :
    - MQTT 5.0 : les devices se connectent à Mosquitto en TLS 1.3 (port 8883), avec authentification et ACLs. Le saut Mosquitto → `iot-ingestion` est en TCP simple sur le réseau interne uniquement.
    - LoRaWAN : gateways existantes du campus, ChirpStack v4 sur une VM séparée, qui publie vers le Mosquitto de la plateforme en MQTT/TLS.
    - HTTP : via Traefik (`/ingest`, rate limité), une clé API par device (HMAC-SHA256, comparaison en temps constant).
    - L'hôte de Mosquitto n'est pas vérifié : ne pas écrire sur quelle VM il tourne.
  - `iot-processing` : valide contre le registre de métriques, stocke de façon idempotente (`ON CONFLICT … DO NOTHING`), évalue les seuils d'alerte. Lectures invalides → `DLQ_OBSERVATIONS`. Alertes par email via un relais SMTP. Pas d'ack JetStream tant que l'insert n'a pas réussi.
  - `iot-api` : Axum, OIDC (Authentik, RS256/JWKS, pas de secret partagé), RBAC multi-tenant fail-closed, workers d'export CSV (la table `export_jobs` est la file, avec `SKIP LOCKED`), gestion de flotte LoRaWAN via l'API gRPC de ChirpStack.
  - NATS JetStream : stream `OBSERVATIONS` (buffer durable), dead-letter `DLQ_OBSERVATIONS`.
  - TimescaleDB : hypertable compressée, agrégats continus (horaire → journalier). Grafana lit les agrégats directement ; Prometheus scrape les trois binaires.
  - Modèle de données : FIWARE Smart Data Models, ids NGSI-LD.
  - Statut des devices dérivé de la dernière lecture, jamais stocké.
  - Pourquoi Rust : construit seul, le compilateur est le premier filet de sécurité.
  - **Déploiement (version unique partout)** : le **backend** SPARC tourne avec Podman + Traefik sur une VM Proxmox, GitLab CI, Prometheus + Grafana. Certificat TLS de la PKI interne, rotation via une unit systemd.path qui redémarre Traefik. Le **front-end** Nuxt 4 (un BFF) tourne sur OKD via la chaîne GitOps (Tekton, Argo CD, Kustomize, Sealed Secrets), comme IRIS, Tandem et Infofin. Ne jamais écrire que tout SPARC tourne sur OKD, ni que SPARC n'y est pas du tout.
- **Digital Twin Framework** : framework TypeScript à composants (Collectors, Harvesters, Handlers, Assets Managers), développé pour FARI, NGSI-LD natif, alternative in-house à FIWARE/Orion, Redis + PostgreSQL + BullMQ, presigned upload OVH S3. Quatre couches de packages affichées en lignes (engine ; components, assets ; database, storage, auth ; shared), chaque couche ne dépend que des couches inférieures. Open source MIT : https://github.com/CePseudoBE/digitaltwin. En production comme gateway unifiant entités digital twin, capteurs IoT, mobilité et environnement pour une visualisation 3D Unity. PAS de nombre de packages, PAS de claim de performance.
- **Also shipped to production at ULB** (une ligne chacun) : **Tandem** (échange linguistique pour étudiants et personnel de trois universités : ULB, VUB, UAntwerp ; AdonisJS), **IRIS** (soumission de candidatures et documents pour post-doctorants, AdonisJS), **Infofin** (https://infofin.ulb.be, Laravel).
- **BELSPO** : formation d'une journée sur l'IA pour le bien commun, avec la FARI AI Academy.
- **Notes prévues** (`src/data/notes.ts`, `published: false`) : CQRS par le système de types, statut de device qui ne peut pas mentir, rotation de certificats PKI sans cron. Passer `published` à `true` seulement quand `/notes/{slug}/` existe.
- **Stack** : Rust, TypeScript, SQL, PHP. Axum, Tokio, AdonisJS, Laravel. PostgreSQL, TimescaleDB, NATS JetStream, MQTT, Redis, BullMQ, NGSI-LD. Kubernetes/OKD, GitOps (Argo CD, Tekton, Kustomize, Sealed Secrets), Podman, Docker, Traefik, Proxmox, GitLab CI. OIDC/OAuth2, Prometheus, Grafana. LoRaWAN, ChirpStack.

### Ce qu'on NE montre PAS

- **PAS de Python** dans la stack (utilisation rare, pas représentatif)
- **PAS de Java ni Spring Boot** (quasiment plus utilisés)
- **PAS d'Elemys** (projet Minecraft perso, pas pertinent pour le portfolio pro)
- **PAS de Lostgard** (ce n'est pas mon projet)
- **PAS de TaxCalc** sauf décision contraire explicite
- **PAS de claims non mesurées** (ex-"~60% overhead reduction" : supprimée définitivement)
- **PAS de nombre de packages** pour le Digital Twin (les sources divergent, la métrique ne veut rien dire)
- **PAS de messages/jour** pour SPARC tant que ce n'est pas mesuré
- **PAS d'app mobile** (Cordova/Vue) : hors cible backend
- **PAS de cartes génériques** (définitions de protocoles, liste de patterns) ni d'endpoints "illustratifs" : chaque élément doit parler d'un vrai projet

## Conventions de code

### Astro

- Un composant par fichier dans `src/components/`, props typées dans le frontmatter.
- Les données structurées (listes, chiffres, projets, liens, textes alternatifs) viennent de `src/data/`, pas hardcodées dans les composants.

### CSS

- Couleurs uniquement via les variables de `global.css`.
- Mobile-first, breakpoint unique à 900px.
- Pas de `!important`. Jamais.

### TypeScript

- Strict mode. Types définis à côté des données qu'ils décrivent (`src/data/*.ts`). Pas de `any`.

### Commits

- Axel relit et committe lui-même : ne pas committer ni pousser sans demande explicite.
- Atomiques : un commit = un changement logique, qui compile.
- Messages à l'impératif, en anglais, préfixés (content, fix, feat, refactor, chore, perf, style) avec scope si pertinent.

## Tests

- `pnpm format:check`, `pnpm check` et `pnpm build` doivent passer.
- Captures à 390, 768 et 1360px, clair et sombre, conformes à la maquette, sans scroll horizontal.
- La démo marche (DB down → le backlog monte puis se vide ; invalide → DLQ ; redelivery → pas de nouvelle ligne), aussi avec `prefers-reduced-motion`. La page se lit sans JS.
- Contrastes WCAG AA, un seul h1, niveaux de titres dans l'ordre, focus visible.
- `rg -i "uppercase|letter-spacing|gradient|box-shadow|backdrop-filter|opacity: ?0|Instrument" src public/*.svg` : justifier chaque résultat.

## Notes

- Le site est une single page. Pas de routing multi-pages (seule exception : `404.astro`, et les futures pages de notes).
- GitHub : https://github.com/CePseudoBE — LinkedIn : https://www.linkedin.com/in/axel-g-hoffmann/ — Email : axel.g.hoffmann@gmail.com (source : `src/data/contact.ts`).
- CV : `public/cv.pdf` (version EN sans photo), lié depuis la sidebar et le footer.
- Image sociale : `public/og-axel-hoffmann.png` (2400×1260). LinkedIn cache l'image par URL : tout nouveau rendu doit changer de nom de fichier.
- Diagramme : `public/sparc-architecture.svg` (clair/sombre via sa propre media query). Son `<desc>` et `sparcDiagramAlt` dans `src/data/sparc.ts` doivent rester identiques.
- Capture de l'app : `public/sparc-explorer.png` (vraie capture, mode clair).
- Le contenu est en anglais (portfolio pour des postes remote internationaux).
