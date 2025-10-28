# @opd/opd-bridge-docx

Conversion de fichiers DOCX vers HTML sémantique pour le format OPD.

## Installation

```bash
pnpm add @opd/opd-bridge-docx
```

## Usage

```typescript
import { docxToHtml } from "@opd/opd-bridge-docx";

// Lire un fichier DOCX
const buffer = await file.arrayBuffer();

// Convertir en HTML
const result = await docxToHtml(buffer);

console.log(result.html);        // HTML généré
console.log(result.metadata);    // Métadonnées (titre, auteur, etc.)
console.log(result.assets);      // Images et autres assets
console.log(result.warnings);    // Avertissements éventuels
```

## Fonctionnalités

- ✅ Conversion DOCX → HTML sémantique
- ✅ Extraction des métadonnées (titre, auteur, date, etc.)
- ✅ Extraction des images embarquées
- ✅ Mapping des styles Word vers HTML (h1-h6, blockquote, etc.)
- ✅ Support des tableaux, listes, liens

## Technologies

- **Mammoth.js** - Conversion DOCX → HTML
- **JSZip** - Extraction des métadonnées et assets

## Limitations

- Les formules mathématiques complexes peuvent ne pas être parfaitement converties
- Les macros VBA ne sont pas supportées
- Certains styles avancés peuvent être simplifiés

