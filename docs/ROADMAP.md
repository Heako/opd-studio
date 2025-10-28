# 🗺️ ROADMAP — OPD Core (Open Portable Document)

> **Vision** : Créer un format ouvert, web-native, signé et accessible pour remplacer progressivement le PDF dans les usages numériques.

---

## 📅 Vue d'ensemble

| Phase   | Objectif principal                    | Durée estimée | Statut      |
|---------|---------------------------------------|---------------|-------------|
| **v0.1** | Prototype PWA (DOCX → OPD)           | Mois 1        | 🔵 Planifié |
| **v0.2** | CLI + Infrastructure de tests        | Mois 2        | 🔵 Planifié |
| **v0.3** | Viewer complet + Vérification        | Mois 3        | 🔵 Planifié |
| **v0.4** | Accessibilité + Métadonnées enrichies| Mois 4        | 🔵 Planifié |
| **v1.0** | Release stable + Documentation       | Mois 5        | 🔵 Planifié |
| **v1.x** | Évolutions & Intégrations            | Mois 6-12     | 🔵 Planifié |

---

## 🎯 Phase v0.1 — Prototype PWA (DOCX → OPD)
**Durée** : Mois 1  
**Objectif** : Démontrer la faisabilité de la conversion `.docx → .opd.zip` côté client

### 📦 Livrables
- [ ] **Monorepo initialisé** (Turborepo/pnpm workspaces)
- [ ] **Package `opd-bridge-docx`** : Conversion DOCX → HTML
- [ ] **Package `opd-semantic`** : Génération JSON-LD basique
- [ ] **Package `opd-sign`** : Signature Ed25519 (WebCrypto)
- [ ] **Package `opd-pack`** : Assemblage et packaging en `.opd.zip`
- [ ] **App `opd-studio`** : Interface web drag & drop (Next.js/SvelteKit)

### 🔧 Tâches techniques

#### 1.1 Infrastructure du monorepo
- [ ] Créer la structure de dossiers (`apps/`, `packages/`, `docs/`, `tests/`)
- [ ] Configurer `pnpm-workspace.yaml` ou `npm workspaces`
- [ ] Configurer `turbo.json` pour le build pipeline
- [ ] Ajouter TypeScript config partagée
- [ ] Configurer ESLint + Prettier

#### 1.2 Package `opd-bridge-docx`
- [ ] Installer Mammoth.js + JSZip
- [ ] Implémenter `docxToHtml(buffer: ArrayBuffer)` → `{ html, assets }`
- [ ] Mapper les styles Word vers HTML sémantique (h1, h2, p, etc.)
- [ ] Extraire les images embarquées
- [ ] Tests unitaires avec 3 fichiers DOCX de référence

#### 1.3 Package `opd-semantic`
- [ ] Implémenter `makeJsonLd({ title, author, lang }, sections[])`
- [ ] Générer JSON-LD conforme Schema.org (type: Report/Document)
- [ ] Extraire automatiquement titre/auteur depuis métadonnées DOCX
- [ ] Tests de validation JSON-LD

#### 1.4 Package `opd-sign`
- [ ] Implémenter hashing SHA-256 de tous les fichiers
- [ ] Créer `manifest.json` avec liste des fichiers + hashes
- [ ] Générer signature JWS (Ed25519) via WebCrypto API
- [ ] Support clé privée fournie ou auto-générée
- [ ] Tests de signature/vérification

#### 1.5 Package `opd-pack`
- [ ] Implémenter assemblage des fichiers (HTML, JSON-LD, manifest, signature)
- [ ] Compression ZIP via fflate
- [ ] Export `.opd.zip`
- [ ] Tests d'intégrité du package

#### 1.6 App `opd-studio` (PWA)
- [ ] Interface drag & drop pour fichiers DOCX
- [ ] Intégration pipeline complet (bridge → semantic → sign → pack)
- [ ] Prévisualisation du HTML généré
- [ ] Téléchargement du `.opd.zip`
- [ ] UI responsive (mobile-first)

### ✅ Critères de succès
- ✅ Conversion d'un DOCX simple (texte + titres) → OPD fonctionnel
- ✅ Signature vérifiable
- ✅ Package `.opd.zip` valide et extractible
- ✅ Interface web utilisable

---

## 🎯 Phase v0.2 — CLI + Infrastructure de tests
**Durée** : Mois 2  
**Objectif** : Outillage CLI pour batch processing + suite de tests robuste

### 📦 Livrables
- [ ] **CLI `opd-pack`** : Outil en ligne de commande
- [ ] **Package `opd-spec`** : Spécification formelle + schémas JSON
- [ ] **Suite de tests golden** : 10+ fichiers DOCX de référence
- [ ] **Tests E2E** : Playwright sur le viewer
- [ ] **CI/CD** : GitHub Actions

### 🔧 Tâches techniques

#### 2.1 CLI `opd-pack`
- [ ] Créer CLI avec arguments (`input.docx`, `--out`, `--sign`)
- [ ] Support conversion batch (dossier entier)
- [ ] Logs détaillés + rapport d'erreurs
- [ ] Support Node.js + Deno
- [ ] Documentation CLI (`--help`)

#### 2.2 Package `opd-spec`
- [ ] Rédiger `SPEC.md` (format OPD v1.0)
- [ ] Créer schémas JSON Schema pour :
  - `manifest.json`
  - `semantics.jsonld`
  - `signature.jws`
- [ ] Validateurs automatiques
- [ ] Exemples de documents conformes

#### 2.3 Tests golden
- [ ] Créer 10 fichiers DOCX de test :
  - Document simple (texte + titres)
  - Document avec images
  - Document avec tableaux
  - Document avec notes de bas de page
  - Document avec styles complexes
  - Document multilingue
  - Document avec formules mathématiques
  - Document avec listes numérotées/à puces
  - Document avec en-têtes/pieds de page
  - Document avec table des matières
- [ ] Snapshots des sorties attendues (HTML, JSON-LD)
- [ ] Tests de régression automatiques

#### 2.4 Tests E2E
- [ ] Configurer Playwright
- [ ] Tests de conversion complète (DOCX → OPD)
- [ ] Tests de vérification de signature
- [ ] Tests d'affichage dans le viewer
- [ ] Tests de compatibilité navigateurs (Chrome, Firefox, Safari, Edge)

#### 2.5 CI/CD
- [ ] GitHub Actions : build + test sur chaque PR
- [ ] Linting automatique
- [ ] Tests de couverture (>80%)
- [ ] Publication automatique des packages (npm)
- [ ] Génération de changelog

### ✅ Critères de succès
- ✅ CLI fonctionnel et documenté
- ✅ 10 tests golden passent à 100%
- ✅ CI verte sur toutes les branches
- ✅ Spécification v1.0 publiée

---

## 🎯 Phase v0.3 — Viewer complet + Vérification
**Durée** : Mois 3  
**Objectif** : Visionneuse PWA complète avec vérification de signature

### 📦 Livrables
- [ ] **Package `opd-viewer`** : PWA de lecture OPD
- [ ] **Vérification de signature** : Intégrité + authenticité
- [ ] **Mode offline** : Service Worker + cache
- [ ] **Partage de documents** : URL sharing

### 🔧 Tâches techniques

#### 3.1 Package `opd-viewer` (PWA)
- [ ] Interface de lecture (route `/open`)
- [ ] Upload/drop de fichiers `.opd.zip`
- [ ] Décompression en mémoire (fflate)
- [ ] Affichage `index.html` dans sandbox sécurisé
- [ ] Navigation entre sections
- [ ] Mode plein écran
- [ ] Impression

#### 3.2 Vérification de signature
- [ ] Recalcul des hashes SHA-256 de tous les fichiers
- [ ] Comparaison avec `manifest.json`
- [ ] Vérification JWS (Ed25519)
- [ ] Affichage du statut de vérification (✅ Vérifié / ⚠️ Non vérifié / ❌ Altéré)
- [ ] Détails de la signature (émetteur, date, clé publique)

#### 3.3 Mode offline (PWA)
- [ ] Service Worker pour cache des assets
- [ ] Manifest PWA (`manifest.json`)
- [ ] Installation sur mobile/desktop
- [ ] Synchronisation en arrière-plan
- [ ] Gestion du cache (taille, expiration)

#### 3.4 Partage de documents
- [ ] Génération d'URL de partage (hash du document)
- [ ] Stockage temporaire (IndexedDB)
- [ ] Partage via Web Share API
- [ ] QR code pour partage mobile

#### 3.5 UI/UX
- [ ] Design system (Tailwind/Shadcn)
- [ ] Mode sombre/clair
- [ ] Responsive design
- [ ] Accessibilité clavier
- [ ] Animations fluides

### ✅ Critères de succès
- ✅ Viewer fonctionne offline
- ✅ Vérification de signature à 100% fiable
- ✅ Installable comme PWA
- ✅ Compatible mobile + desktop

---

## 🎯 Phase v0.4 — Accessibilité + Métadonnées enrichies
**Durée** : Mois 4  
**Objectif** : Conformité WCAG 2.1 AA + métadonnées sémantiques avancées

### 📦 Livrables
- [ ] **Package `opd-a11y`** : Helpers d'accessibilité
- [ ] **Conformité WCAG 2.1 AA**
- [ ] **Métadonnées enrichies** : JSON-LD avancé
- [ ] **Ordre de lecture** : `reading-order.json`

### 🔧 Tâches techniques

#### 4.1 Package `opd-a11y`
- [ ] Génération automatique de landmarks ARIA
- [ ] Ordre de lecture logique (`reading-order.json`)
- [ ] Attributs `alt` pour images
- [ ] Descriptions longues pour graphiques complexes
- [ ] Navigation au clavier optimisée
- [ ] Support lecteurs d'écran (NVDA, JAWS, VoiceOver)

#### 4.2 Conformité WCAG 2.1 AA
- [ ] Audit automatique (axe-core, Lighthouse)
- [ ] Contraste des couleurs (ratio 4.5:1)
- [ ] Taille de texte ajustable
- [ ] Focus visible
- [ ] Pas de contenu clignotant
- [ ] Formulaires accessibles (si applicable)
- [ ] Tests avec utilisateurs en situation de handicap

#### 4.3 Métadonnées enrichies (JSON-LD)
- [ ] Support Schema.org avancé :
  - `ScholarlyArticle` (articles scientifiques)
  - `LegalDocument` (documents juridiques)
  - `TechArticle` (documentation technique)
  - `NewsArticle` (articles de presse)
- [ ] Extraction automatique de :
  - Citations (`citation`)
  - Mots-clés (`keywords`)
  - Résumé (`abstract`)
  - Références bibliographiques
  - Auteurs multiples + affiliations
- [ ] Support Dublin Core (interopérabilité bibliothèques)

#### 4.4 Ordre de lecture
- [ ] Génération `reading-order.json` (ordre logique des sections)
- [ ] Support multi-colonnes
- [ ] Support tableaux complexes
- [ ] Support notes de bas de page
- [ ] Support encadrés/sidebars

### ✅ Critères de succès
- ✅ Score Lighthouse Accessibility = 100
- ✅ Conformité WCAG 2.1 AA validée par audit externe
- ✅ Métadonnées JSON-LD validées par Google Rich Results Test
- ✅ Ordre de lecture testé avec lecteurs d'écran

---

## 🎯 Phase v1.0 — Release stable + Documentation
**Durée** : Mois 5  
**Objectif** : Version production-ready + documentation complète

### 📦 Livrables
- [ ] **Spécification OPD v1.0** (finalisée)
- [ ] **Documentation complète** (utilisateurs + développeurs)
- [ ] **Site web officiel** (`openopd.org`)
- [ ] **Packages npm publiés**
- [ ] **Annonce publique**

### 🔧 Tâches techniques

#### 5.1 Spécification finale
- [ ] Finaliser `SPEC.md` (format OPD v1.0)
- [ ] Schémas JSON validés
- [ ] Exemples de référence
- [ ] Guide de migration (PDF → OPD)
- [ ] FAQ technique

#### 5.2 Documentation
- [ ] **Guide utilisateur** :
  - Installation
  - Conversion de documents
  - Lecture de documents
  - Vérification de signatures
- [ ] **Guide développeur** :
  - Architecture du projet
  - Contribution (CONTRIBUTING.md)
  - API de chaque package
  - Exemples de code
- [ ] **Tutoriels vidéo** :
  - Conversion DOCX → OPD
  - Utilisation du viewer
  - Signature de documents

#### 5.3 Site web officiel
- [ ] Domaine `openopd.org`
- [ ] Landing page (présentation du projet)
- [ ] Documentation en ligne (Docusaurus/VitePress)
- [ ] Démo interactive
- [ ] Blog (annonces, tutoriels)
- [ ] Téléchargements (CLI, viewer)

#### 5.4 Publication
- [ ] Packages npm :
  - `@opd/opd-pack`
  - `@opd/opd-bridge-docx`
  - `@opd/opd-sign`
  - `@opd/opd-semantic`
  - `@opd/opd-a11y`
  - `@opd/opd-viewer`
- [ ] Releases GitHub (binaires CLI)
- [ ] Docker images (optionnel)

#### 5.5 Communication
- [ ] Annonce sur Hacker News, Reddit, Twitter/X
- [ ] Article de blog technique
- [ ] Présentation dans conférences (FOSDEM, etc.)
- [ ] Outreach vers partenaires potentiels (LibreOffice, W3C, etc.)

### ✅ Critères de succès
- ✅ Spécification v1.0 publiée et stable
- ✅ Documentation complète et accessible
- ✅ Site web en ligne
- ✅ 1000+ stars GitHub
- ✅ 100+ forks

---

## 🎯 Phase v1.x — Évolutions & Intégrations
**Durée** : Mois 6-12  
**Objectif** : Adoption, intégrations, nouvelles fonctionnalités

### 📦 Fonctionnalités futures

#### 6.1 Nouveaux formats d'entrée
- [ ] Support `.odt` (LibreOffice) via `opd-bridge-odt`
- [ ] Support Google Docs (export HTML)
- [ ] Support Markdown (via Pandoc)
- [ ] Support LaTeX (via Pandoc)
- [ ] Support PDF (extraction texte + OCR)

#### 6.2 Fonctionnalités avancées
- [ ] Annotations collaboratives
- [ ] Versioning de documents
- [ ] Diff entre versions
- [ ] Recherche full-text
- [ ] Export vers autres formats (PDF, EPUB)
- [ ] Compression avancée (Brotli)
- [ ] Chiffrement (optionnel)

#### 6.3 Intégrations
- [ ] Plugin LibreOffice
- [ ] Extension Google Docs
- [ ] Extension VS Code
- [ ] API REST (opd-cloud)
- [ ] Intégration Nextcloud/ownCloud
- [ ] Intégration Zotero (gestion bibliographique)

#### 6.4 Standardisation
- [ ] Soumission W3C (WebBundles alignment)
- [ ] Soumission AFNOR/ISO
- [ ] Collaboration avec DINUM/Etalab (France)
- [ ] Adoption par institutions (universités, bibliothèques)

#### 6.5 Communauté
- [ ] Programme de contributeurs
- [ ] Hackathons
- [ ] Bounties pour fonctionnalités
- [ ] Gouvernance ouverte (OpenOPD Foundation)

---

## 📊 KPI & Métriques de succès

### Métriques techniques
| Métrique                          | Objectif v1.0      | Objectif v1.x      |
|-----------------------------------|--------------------|--------------------|
| Taux de conversion sans erreur    | ≥ 95%              | ≥ 99%              |
| Taille fichier OPD vs DOCX        | ≤ 120%             | ≤ 100%             |
| Temps de conversion (10 pages)    | < 3s               | < 1s               |
| Score Lighthouse (Performance)    | ≥ 90               | ≥ 95               |
| Score Lighthouse (Accessibility)  | 100                | 100                |
| Couverture de tests               | ≥ 80%              | ≥ 90%              |

### Métriques d'adoption
| Métrique                          | Objectif 6 mois    | Objectif 12 mois   |
|-----------------------------------|--------------------|--------------------|
| GitHub stars                      | 1 000              | 5 000              |
| GitHub forks                      | 100                | 500                |
| Téléchargements npm (mensuel)     | 1 000              | 10 000             |
| Contributeurs actifs              | 10                 | 50                 |
| Documents OPD créés (estimé)      | 10 000             | 100 000            |

---

## 🤝 Partenaires & Collaborations

### Partenaires techniques
- **The Document Foundation** (LibreOffice) → Interopérabilité `.odt`
- **W3C** → Alignement WebBundles, standardisation
- **Mozilla** → Support Firefox, PWA

### Partenaires institutionnels
- **DINUM / Etalab** (France) → Adoption administration publique
- **AFNOR** → Normalisation française
- **BnF** (Bibliothèque nationale de France) → Archivage long terme
- **Universités** → Recherche, publications scientifiques

### Partenaires industriels
- **Nextcloud** → Intégration cloud
- **Zotero** → Gestion bibliographique
- **Collabora** → Suite bureautique en ligne

---

## 📜 Licences & Gouvernance

### Licences par module
| Module                           | Licence    | Justification               |
|----------------------------------|------------|-----------------------------|
| `opd-spec`                       | CC-BY 4.0  | Format ouvert               |
| `opd-pack`, `opd-sign`, `opd-bridge-*` | Apache-2.0 | Compatible entreprise & OSS |
| `opd-viewer`, `opd-studio`       | MIT        | Adoption maximale           |
| `opd-cloud` (futur)              | AGPLv3     | Protège la version hébergée |
| `opd-tests`                      | MIT        | Libre réutilisation pour QA |

### Gouvernance
- **Mainteneur principal** : Équipe core (2-3 personnes)
- **Reviewers** : 5+ contributeurs actifs
- **Contributions** : PR + DCO (Developer Certificate of Origin)
- **Décisions** : Consensus lazy (objections motivées)
- **Roadmap** : Publique, mise à jour trimestrielle

---

## 🚀 Prochaines étapes immédiates

### Phase 0 — Site opd-foundation (Semaines 1-2)
**Objectif** : Créer le site de ressources et base de connaissances avant de développer l'application

#### Livrables
- [ ] **Repo opd-foundation** : Site web avec Docusaurus
- [ ] **Landing page** : Présentation du projet OPD
- [ ] **Documentation** : Migration de PRD, ROADMAP, architecture
- [ ] **Guide de contribution** : CONTRIBUTING.md
- [ ] **Déploiement** : Site en ligne (Vercel/GitHub Pages)

#### Tâches
1. [ ] Cloner et initialiser le repo opd-foundation
2. [ ] Installer et configurer Docusaurus
3. [ ] Créer la structure de navigation (docs, blog, pages)
4. [ ] Créer la landing page avec sections :
   - Hero (titre, description, CTA)
   - Features (6 avantages clés)
   - Démo interactive (placeholder)
   - Showcase (exemples)
   - Community (GitHub, Discord)
5. [ ] Migrer la documentation depuis opd-core/docs :
   - PRD.md → docs/concepts/
   - ROADMAP.md → docs/roadmap.md
   - architecture.md → docs/developers/architecture.md
6. [ ] Créer les pages de documentation :
   - Getting Started
   - Concepts (Why OPD, vs PDF, Format Spec)
   - Developers Guide
   - Specification
7. [ ] Créer CONTRIBUTING.md
8. [ ] Configurer le déploiement automatique
9. [ ] Ajouter le premier article de blog (annonce du projet)

#### Critères de succès
- ✅ Site accessible en ligne
- ✅ Documentation complète et navigable
- ✅ Landing page attractive
- ✅ Guide de contribution clair
- ✅ Déploiement automatique configuré

---

### Sprint 1 (Semaines 3-4) — Prototype opd-core
1. [ ] Initialiser le monorepo opd-core (structure + config)
2. [ ] Implémenter `opd-bridge-docx` (conversion basique)
3. [ ] Implémenter `opd-semantic` (JSON-LD minimal)
4. [ ] Tests unitaires (3 fichiers DOCX)

### Sprint 2 (Semaines 5-6)
1. [ ] Implémenter `opd-sign` (signature Ed25519)
2. [ ] Implémenter `opd-pack` (packaging ZIP)
3. [ ] Créer `opd-studio` (interface web basique)
4. [ ] Tests d'intégration (pipeline complet)

---

## 📞 Contact & Contribution

- **GitHub** : [github.com/openopd/opd-core](https://github.com/openopd/opd-core)
- **Site web** : [openopd.org](https://openopd.org) (à venir)
- **Email** : contact@openopd.org (à configurer)
- **Discord** : [discord.gg/openopd](https://discord.gg/openopd) (à créer)

---

**Dernière mise à jour** : 2025-10-27  
**Version** : 1.0  
**Statut** : 🔵 Planification initiale

