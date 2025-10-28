# @opd/opd-semantic

Génération de métadonnées JSON-LD conformes à Schema.org pour le format OPD.

## Installation

```bash
pnpm add @opd/opd-semantic
```

## Usage

```typescript
import { makeJsonLd } from "@opd/opd-semantic";

const jsonLd = makeJsonLd({
  title: "Mon rapport annuel",
  author: "Jean Dupont",
  lang: "fr",
  subject: "Analyse financière",
  keywords: ["finance", "rapport", "2024"],
  datePublished: new Date("2024-01-15"),
  documentType: "Report",
});

console.log(JSON.stringify(jsonLd, null, 2));
```

### Avec sections

```typescript
const sections = [
  { id: "section-1", name: "Introduction", position: 1 },
  { id: "section-2", name: "Méthodologie", position: 2 },
  { id: "section-3", name: "Résultats", position: 3 },
];

const jsonLd = makeJsonLd(
  {
    title: "Étude scientifique",
    author: ["Dr. Marie Martin", "Dr. Pierre Durand"],
    documentType: "ScholarlyArticle",
  },
  sections
);
```

## Types de documents supportés

- `Report` - Rapport (par défaut)
- `Article` - Article générique
- `ScholarlyArticle` - Article scientifique
- `TechArticle` - Documentation technique
- `Document` - Document générique

## Conformité

- ✅ Schema.org
- ✅ JSON-LD 1.1
- ✅ Dublin Core (via Schema.org)

