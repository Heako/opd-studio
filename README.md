# OPD Core — Open Portable Document

> Format ouvert, web-native, signé et accessible pour remplacer progressivement le PDF dans les usages numériques.

## 🎯 Vision

Créer un format de document :
- **Ouvert** : Spécification publique, pas de brevets
- **Web-native** : HTML/CSS/JS, fonctionne dans tous les navigateurs
- **Signé** : Intégrité cryptographique (Ed25519)
- **Accessible** : Conforme WCAG 2.1 AA, lisible par les IA
- **Portable** : Un seul fichier `.opd.zip` auto-contenu

## 🚀 Démarrage rapide

### 🌐 Essayer en ligne

**OPD Studio** (Convertisseur DOCX → OPD) : https://opd-core-6ojjizaow-heakos-projects.vercel.app

### 💻 Installation locale

#### Prérequis

- Node.js >= 18
- npm >= 10

#### Installation

```bash
# Cloner le repository
git clone https://github.com/Heako/opd-studio.git
cd opd-studio

# Installer les dépendances
npm install

# Lancer opd-studio en développement
npm run studio

# Lancer opd-viewer en développement
npm run viewer

# Build tous les packages
npm run build

# Tests
npm test
```

## 📦 Structure du monorepo

```
opd-core/
├── apps/
│   ├── opd-studio/       # Interface web (Next.js + React 18)
│   └── opd-viewer/       # Visionneuse PWA
├── packages/
│   ├── opd-spec/         # Spécification du format
│   ├── opd-bridge-docx/  # Conversion DOCX → OPD
│   ├── opd-semantic/     # Génération JSON-LD
│   ├── opd-sign/         # Signature cryptographique
│   └── opd-pack/         # CLI de packaging
├── tests/
│   ├── golden/           # Fichiers de test de référence
│   └── e2e/              # Tests end-to-end
└── docs/                 # Documentation
```

## ✨ Fonctionnalités actuelles (v0.1)

- ✅ **Conversion DOCX → OPD** avec préservation du style
- ✅ **Génération CSS automatique** pour le rendu
- ✅ **Signature cryptographique Ed25519** pour l'intégrité
- ✅ **Métadonnées JSON-LD** (Schema.org)
- ✅ **Prévisualisation** avant téléchargement
- ✅ **Viewer avec vérification** de signature
- ✅ **Interface drag & drop** responsive
- ✅ **Documentation intégrée**

## 🛠️ Technologies

- **React 18.2** + **Next.js 14** (App Router)
- **TypeScript 5.6**
- **Turborepo 2.5** (monorepo build system)
- **npm workspaces** (package manager)
- **Tailwind CSS** (styling)
- **Heroicons** (icons)
- **Mammoth.js** (DOCX parsing)
- **jose** (Ed25519 signatures)
- **fflate** (ZIP compression)

## 📖 Documentation

Voir le dossier [`docs/`](./docs/) pour :
- [PRD](./docs/PRD.md) - Product Requirement Document
- [ROADMAP](./docs/ROADMAP.md) - Feuille de route détaillée
- [Architecture](./docs/architecture.md) - Architecture technique

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez [CONTRIBUTING.md](./CONTRIBUTING.md) pour commencer.

## 📜 Licence

**MIT License** - Voir [LICENSE](./LICENSE) pour plus de détails.

## 🔗 Liens

- **Demo live** : https://opd-core-6ojjizaow-heakos-projects.vercel.app
- **GitHub** : https://github.com/Heako/opd-studio
- **Documentation** : [docs/](./docs/)
- Site web : [openopd.org](https://openopd.org) (à venir)

---

**Version actuelle** : v0.1.0 ✅ (Phase v0.1 terminée)
**Statut** : 🟢 Prototype fonctionnel en production
**Prochaine phase** : v0.3 - Viewer complet + Mode offline

