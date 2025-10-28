# Installation - OPD Core

## Option 1 : Avec pnpm (recommandé)

### Installer pnpm

```bash
npm install -g pnpm
```

### Installer les dépendances

```bash
pnpm install
```

## Option 2 : Avec npm

```bash
npm install
```

## Option 3 : Avec yarn

```bash
yarn install
```

## Vérification

Après l'installation, vérifiez que tout fonctionne :

```bash
# Avec pnpm
pnpm build

# Avec npm
npm run build

# Avec yarn
yarn build
```

## Problèmes courants

### pnpm non trouvé

Si vous obtenez `pnpm: command not found`, installez pnpm globalement :

```bash
npm install -g pnpm
```

### Erreur de workspace

Si vous utilisez npm et obtenez une erreur `EUNSUPPORTEDPROTOCOL`, assurez-vous d'utiliser npm >= 7 qui supporte les workspaces :

```bash
npm --version  # Doit être >= 7.0.0
npm install -g npm@latest
```

## Lancer l'application

```bash
# Avec pnpm
pnpm studio

# Avec npm
npm run studio

# Avec yarn
yarn studio
```

L'application sera accessible sur `http://localhost:3000`

