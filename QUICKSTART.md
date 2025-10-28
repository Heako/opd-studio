# 🚀 Démarrage rapide - OPD Core

## Installation

### 1. Installer les dépendances

```bash
pnpm install
```

### 2. Lancer l'application OPD Studio

```bash
pnpm studio
```

L'application sera accessible sur `http://localhost:3000`

### 3. Build tous les packages

```bash
pnpm build
```

## Structure du projet

```
opd-core/
├── apps/
│   └── opd-studio/          # Application web Next.js + React 18
├── packages/
│   ├── opd-bridge-docx/     # Conversion DOCX → HTML
│   ├── opd-semantic/        # Génération JSON-LD
│   ├── opd-sign/            # Signature Ed25519
│   └── opd-pack/            # Packaging ZIP
├── docs/                    # Documentation
└── tests/                   # Tests
```

## Commandes utiles

```bash
# Développement
pnpm dev              # Lance tous les apps en mode dev
pnpm studio           # Lance uniquement opd-studio

# Build
pnpm build            # Build tous les packages
pnpm pack:cli         # Build uniquement opd-pack

# Tests
pnpm test             # Lance tous les tests
pnpm lint             # Vérifie le code
pnpm format           # Formate le code
```

## Prochaines étapes

1. ✅ Infrastructure du monorepo
2. ✅ Packages core créés
3. 🚧 Intégration des packages dans opd-studio
4. 🚧 Tests unitaires
5. 🚧 Documentation complète

## Technologies

- **React 18** (compatible Heroicons)
- **Next.js 14**
- **TypeScript 5**
- **Turborepo**
- **pnpm**
- **Tailwind CSS**
- **Heroicons**

## Besoin d'aide ?

Consultez la [documentation](./docs/) ou ouvrez une issue sur GitHub.

