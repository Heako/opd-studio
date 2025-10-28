# Guide de contribution

Merci de votre intérêt pour contribuer à OPD Core ! 🎉

## 🚀 Démarrage

1. **Fork** le projet
2. **Clone** votre fork
3. **Installez** les dépendances : `pnpm install`
4. **Créez** une branche : `git checkout -b feature/ma-fonctionnalite`

## 📝 Conventions de code

### TypeScript

- Utilisez TypeScript pour tout nouveau code
- Activez le mode strict
- Documentez les fonctions publiques avec JSDoc

### Commits

Suivez la convention [Conventional Commits](https://www.conventionalcommits.org/) :

```
feat: ajoute la conversion DOCX
fix: corrige la signature Ed25519
docs: met à jour le README
test: ajoute tests pour opd-pack
chore: met à jour les dépendances
```

### Code Style

- Utilisez Prettier pour le formatage : `pnpm format`
- Respectez les règles ESLint : `pnpm lint`
- Pas de `console.log` dans le code de production

## 🧪 Tests

- Ajoutez des tests pour toute nouvelle fonctionnalité
- Assurez-vous que tous les tests passent : `pnpm test`
- Visez une couverture de code > 80%

## 📦 Structure des packages

Chaque package doit avoir :

```
packages/mon-package/
├── src/
│   ├── index.ts        # Point d'entrée
│   └── ...
├── tests/
│   └── index.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🔄 Workflow

1. Créez une **issue** pour discuter de votre idée
2. Attendez l'approbation d'un mainteneur
3. Développez votre fonctionnalité
4. Créez une **Pull Request**
5. Répondez aux commentaires de review
6. Une fois approuvée, votre PR sera mergée !

## 📋 Checklist PR

- [ ] Le code compile sans erreur
- [ ] Les tests passent
- [ ] Le linting passe
- [ ] La documentation est à jour
- [ ] Les commits suivent la convention
- [ ] La PR a une description claire

## 🤝 Code de conduite

Soyez respectueux, inclusif et constructif dans vos interactions.

## 📞 Questions ?

Ouvrez une issue ou contactez-nous sur Discord (à venir).

---

Merci pour votre contribution ! 🙏

