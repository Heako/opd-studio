# @opd/opd-pack

Packaging et assemblage de documents OPD en fichiers `.opd.zip`.

## Installation

```bash
pnpm add @opd/opd-pack
```

## Usage

### Créer un document OPD

```typescript
import { packOpd } from "@opd/opd-pack";

const result = await packOpd({
  html: "<h1>Mon document</h1><p>Contenu...</p>",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Report",
    name: "Mon rapport",
  },
  css: "body { font-family: sans-serif; }",
  assets: [
    {
      filename: "logo.png",
      data: new Uint8Array([...]),
    },
  ],
  sign: true,
});

// Sauvegarder le fichier
await fs.writeFile("document.opd.zip", result.data);
```

### Lire un document OPD

```typescript
import { unpackOpd } from "@opd/opd-pack";

const data = await fs.readFile("document.opd.zip");
const document = await unpackOpd(data);

console.log(document.html);
console.log(document.jsonLd);
console.log(document.signatureValid);
```

## Fonctionnalités

- ✅ Assemblage de fichiers (HTML, JSON-LD, CSS, assets)
- ✅ Compression ZIP optimisée
- ✅ Signature cryptographique automatique
- ✅ Extraction et vérification
- ✅ Compatible navigateur et Node.js

## Structure du fichier .opd.zip

```
document.opd.zip
├── index.html
├── semantics.jsonld
├── styles.css
├── manifest.json
├── signature.jws
├── publickey.json
└── assets/
    ├── image1.png
    └── logo.svg
```

