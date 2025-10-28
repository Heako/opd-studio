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

### Prérequis

- Node.js >= 18
- pnpm >= 8

### Installation

```bash
# Installer les dépendances
pnpm install

# Lancer le mode développement
pnpm dev

# Build tous les packages
pnpm build

# Tests
pnpm test
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

## 🛠️ Technologies

- **React 18** (compatible avec Heroicons)
- **Next.js 14** (App Router)
- **TypeScript 5**
- **Turborepo** (monorepo)
- **pnpm** (package manager)
- **Tailwind CSS** (styling)
- **Heroicons** (icônes)

## 📖 Documentation

Voir le dossier [`docs/`](./docs/) pour :
- [PRD](./docs/PRD.md) - Product Requirement Document
- [ROADMAP](./docs/ROADMAP.md) - Feuille de route détaillée
- [Architecture](./docs/architecture.md) - Architecture technique

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez [CONTRIBUTING.md](./CONTRIBUTING.md) pour commencer.

## 📜 Licence

- Core libs : **Apache 2.0**
- Spécification : **CC-BY 4.0**

## 🔗 Liens

- Site web : [openopd.org](https://openopd.org) (à venir)
- GitHub : [github.com/openopd/opd-core](https://github.com/openopd/opd-core)

---

**Version actuelle** : v0.1.0 (Prototype)  
**Statut** : 🚧 En développement actif

