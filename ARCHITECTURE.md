# 🏗️ Architecture OPD Core

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                      OPD STUDIO (Web App)                   │
│                    Next.js 14 + React 18                    │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Drag & Drop │  │  Preview     │  │  Download    │     │
│  │  Interface   │  │  Document    │  │  .opd.zip    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    CONVERSION PIPELINE                       │
│                                                             │
│  1. DOCX Input                                              │
│     └─► @opd/opd-bridge-docx                               │
│         ├─ Mammoth.js (DOCX → HTML)                        │
│         ├─ Extract metadata                                 │
│         └─ Extract assets (images)                          │
│                                                             │
│  2. Semantic Layer                                          │
│     └─► @opd/opd-semantic                                  │
│         └─ Generate JSON-LD (Schema.org)                   │
│                                                             │
│  3. Signing                                                 │
│     └─► @opd/opd-sign                                      │
│         ├─ Hash files (SHA-256)                            │
│         ├─ Create manifest                                  │
│         └─ Sign with Ed25519 (JWS)                         │
│                                                             │
│  4. Packaging                                               │
│     └─► @opd/opd-pack                                      │
│         ├─ Assemble files                                   │
│         ├─ Compress (fflate)                               │
│         └─ Export .opd.zip                                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    OUTPUT: .opd.zip                         │
│                                                             │
│  ├── index.html          (Document content)                │
│  ├── semantics.jsonld    (Metadata)                        │
│  ├── styles.css          (Styling)                         │
│  ├── manifest.json       (File hashes)                     │
│  ├── signature.jws       (Cryptographic signature)         │
│  ├── publickey.json      (Public key)                      │
│  └── assets/             (Images, etc.)                    │
│      ├── image1.png                                         │
│      └── logo.svg                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Flux de données

```
┌──────────┐
│  User    │
│  Browser │
└────┬─────┘
     │
     │ 1. Upload .docx
     ▼
┌─────────────────┐
│  opd-studio     │
│  (Next.js App)  │
└────┬────────────┘
     │
     │ 2. Read file
     ▼
┌──────────────────────┐
│ opd-bridge-docx      │
│ ┌──────────────────┐ │
│ │ Mammoth.js       │ │
│ │ DOCX → HTML      │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │ Extract metadata │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │ Extract assets   │ │
│ └──────────────────┘ │
└────┬─────────────────┘
     │
     │ 3. HTML + metadata + assets
     ▼
┌──────────────────────┐
│ opd-semantic         │
│ ┌──────────────────┐ │
│ │ makeJsonLd()     │ │
│ │ Schema.org       │ │
│ └──────────────────┘ │
└────┬─────────────────┘
     │
     │ 4. JSON-LD
     ▼
┌──────────────────────┐
│ opd-sign             │
│ ┌──────────────────┐ │
│ │ hashFiles()      │ │
│ │ SHA-256          │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │ createManifest() │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │ signManifest()   │ │
│ │ Ed25519 / JWS    │ │
│ └──────────────────┘ │
└────┬─────────────────┘
     │
     │ 5. Manifest + signature
     ▼
┌──────────────────────┐
│ opd-pack             │
│ ┌──────────────────┐ │
│ │ packOpd()        │ │
│ │ Assemble files   │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │ fflate           │ │
│ │ Compress ZIP     │ │
│ └──────────────────┘ │
└────┬─────────────────┘
     │
     │ 6. .opd.zip (Uint8Array)
     ▼
┌─────────────────┐
│  opd-studio     │
│  Download file  │
└─────────────────┘
```

---

## Dépendances entre packages

```
opd-studio
    ├─► @opd/opd-bridge-docx
    │   ├─► mammoth
    │   └─► jszip
    │
    ├─► @opd/opd-semantic
    │   (no external deps)
    │
    ├─► @opd/opd-pack
    │   ├─► @opd/opd-sign
    │   │   └─► jose
    │   └─► fflate
    │
    └─► react, next, tailwindcss, heroicons
```

---

## Technologies par couche

### Présentation (opd-studio)
- **Next.js 14** : Framework React avec App Router
- **React 18** : UI library (compatible Heroicons)
- **Tailwind CSS** : Utility-first CSS
- **Heroicons** : Icônes React

### Conversion (opd-bridge-docx)
- **Mammoth.js** : Conversion DOCX → HTML
- **JSZip** : Manipulation de fichiers ZIP

### Sémantique (opd-semantic)
- **Pure TypeScript** : Pas de dépendances externes
- **Schema.org** : Vocabulaire JSON-LD

### Signature (opd-sign)
- **jose** : Signature JWS et gestion clés
- **Web Crypto API** : Hashing SHA-256

### Packaging (opd-pack)
- **fflate** : Compression ZIP optimisée
- **@opd/opd-sign** : Signature des fichiers

---

## Format du fichier .opd.zip

```
document.opd.zip
│
├── index.html              # Document principal (HTML sémantique)
│   └─ Structure:
│       <article class="opd-document">
│         <h1>Titre</h1>
│         <p>Contenu...</p>
│       </article>
│
├── semantics.jsonld        # Métadonnées JSON-LD
│   └─ Schema:
│       {
│         "@context": "https://schema.org",
│         "@type": "Report",
│         "name": "...",
│         "author": {...},
│         "datePublished": "...",
│         ...
│       }
│
├── styles.css              # Styles CSS (optionnel)
│
├── manifest.json           # Liste des fichiers + hashes
│   └─ Schema:
│       {
│         "version": "1.0",
│         "files": ["index.html", ...],
│         "hashes": {
│           "index.html": "sha256-...",
│           ...
│         },
│         "created": "2024-01-15T10:00:00Z"
│       }
│
├── signature.jws           # Signature cryptographique
│   └─ Format: JWS (JSON Web Signature)
│       Header: { "alg": "EdDSA", "typ": "opd+jws" }
│       Payload: { "manifest": {...} }
│
├── publickey.json          # Clé publique Ed25519
│   └─ Format: JWK (JSON Web Key)
│
└── assets/                 # Ressources (images, etc.)
    ├── image1.png
    ├── logo.svg
    └── ...
```

---

## Sécurité

### Hashing
- **Algorithme** : SHA-256
- **Format** : `sha256-{base64url}`
- **Usage** : Intégrité des fichiers

### Signature
- **Algorithme** : Ed25519 (courbe elliptique)
- **Format** : JWS (JSON Web Signature)
- **Validité** : 10 ans par défaut
- **Clé publique** : Incluse dans le package

### Vérification
1. Recalculer les hashes de tous les fichiers
2. Comparer avec `manifest.json`
3. Vérifier la signature JWS avec la clé publique
4. Statut : ✅ Vérifié / ⚠️ Non vérifié / ❌ Altéré

---

## Performance

### Optimisations
- **Compression** : fflate (plus rapide que JSZip)
- **Streaming** : Traitement par chunks pour gros fichiers
- **Web Workers** : Conversion en arrière-plan (à implémenter)
- **Cache** : Service Worker pour mode offline (à implémenter)

### Métriques cibles
- Conversion DOCX (10 pages) : < 3s
- Taille .opd.zip vs .docx : ≤ 120%
- Score Lighthouse : ≥ 90

---

## Extensibilité

### Nouveaux formats d'entrée
```typescript
// Exemple: Support ODT
import { odtToHtml } from "@opd/opd-bridge-odt";

const result = await odtToHtml(buffer);
// Même interface que opd-bridge-docx
```

### Nouveaux types de documents
```typescript
// Exemple: Article scientifique
const jsonLd = makeJsonLd({
  documentType: "ScholarlyArticle",
  // ...
});
```

### Plugins
```typescript
// Exemple: Plugin de validation
import { validateOpd } from "@opd/opd-validator";

const isValid = await validateOpd(opdZip);
```

---

## Prochaines évolutions

1. **opd-viewer** : Visionneuse PWA
2. **opd-cli** : Outil en ligne de commande
3. **opd-validator** : Validation de conformité
4. **opd-bridge-odt** : Support LibreOffice
5. **opd-bridge-md** : Support Markdown

---

**Dernière mise à jour** : 2025-10-28

