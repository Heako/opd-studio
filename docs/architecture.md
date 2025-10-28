Parfait — voici le **diagramme d’architecture** + la **structure de monorepo prête à copier-coller** (avec scripts de base). Tu peux créer ce repo tel quel et itérer.

---

# Diagrammes d’architecture

## 1) Vue globale (MVP Word/Docs → OPD)

```
[ User Browser (PWA) ]
   ├─ Drag&Drop .docx
   ├─ Parse (JSZip + Mammoth)
   ├─ Generate HTML + CSS
   ├─ Generate semantics.jsonld
   ├─ Generate manifest.json (hashes)
   ├─ Sign (WebCrypto Ed25519 → signature.jws)
   └─ Package (.opd.zip) + Preview (Viewer)

                   │ (optionnel: batch/CI)
                   ▼
            [ CLI / Server (Node) ]
               ├─ Pandoc/LibreOffice (fallback)
               ├─ Same pipeline (HTML/JSONLD/manifest/sign)
               └─ Returns .opd.zip + report
```

## 2) Modules (monorepo)

```
           ┌─────────────── Core libs ───────────────┐
opd-sign  ←┤  hashing/merkle + JWS (Ed25519)         │
opd-spec  ←┤  spec + JSON schemas                    │
opd-a11y  ←┤  reading-order + ARIA helpers           │
opd-semantic ← map styles→semantic (JSON-LD)         │
           └─────────────────────────────────────────┘

opd-bridge-docx  → .docx → HTML blocks + styles → (opd-semantic) → OPD
opd-pack (CLI)   → assemble files → manifest → sign → .opd.zip
opd-viewer (PWA) → render index.html + verify signature.jws
opd-studio (Web) → UI drop, preview, export
```

---

# Structure de monorepo (Turborepo/Nx-ready)

```
opd/
├─ apps/
│  ├─ opd-studio/           # UI web (Next.js/SvelteKit)
│  └─ opd-cloud/            # (optionnel) API/CLI server
├─ packages/
│  ├─ opd-spec/             # Spec + schémas JSON
│  ├─ opd-bridge-docx/      # .docx → HTML blocks + assets
│  ├─ opd-semantic/         # Génération JSON-LD (Schema.org)
│  ├─ opd-a11y/             # Landmarks, reading-order
│  ├─ opd-sign/             # Hash/Merkle + JWS (Ed25519)
│  ├─ opd-pack/             # CLI packager → .opd.zip
│  └─ opd-viewer/           # Visionneuse PWA + vérif signature
├─ tests/
│  ├─ golden/               # Entrées .docx + sorties attendues
│  └─ e2e/                  # Tests Playwright sur viewer
├─ .github/workflows/
│  └─ ci.yml
├─ turbo.json               # ou nx.json
├─ package.json
├─ pnpm-workspace.yaml      # ou npm/yarn workspaces
└─ README.md
```

---

# Fichiers initiaux (copier-coller)

## 1) `package.json` (racine)

```json
{
  "name": "opd",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "pack:cli": "pnpm --filter opd-pack build",
    "studio": "pnpm --filter opd-studio dev"
  },
  "devDependencies": {
    "turbo": "^2.1.0",
    "typescript": "^5.6.2"
  }
}
```

## 2) `packages/opd-pack/package.json`

```json
{
  "name": "@opd/opd-pack",
  "version": "0.1.0",
  "type": "module",
  "bin": {
    "opd-pack": "dist/cli.js"
  },
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "dev": "tsx src/cli.ts",
    "test": "vitest run"
  },
  "dependencies": {
    "fflate": "^0.8.1",
    "jose": "^5.9.2",
    "mime-types": "^2.1.35"
  },
  "devDependencies": {
    "tsx": "^4.19.1",
    "vitest": "^2.1.2"
  }
}
```

## 3) `packages/opd-pack/src/cli.ts` (squelette)

```ts
#!/usr/bin/env node
import { pack } from "./pack.js";

const input = process.argv[2];               // dossier source (HTML, JSON-LD, assets)
const out = process.argv[3] || "document.opd.zip";
const keyPath = process.argv[4];             // (optionnel) clé privée Ed25519

if (!input) {
  console.error("Usage: opd-pack <srcDir> [out.opd.zip] [ed25519.key]");
  process.exit(1);
}

await pack({ srcDir: input, outFile: out, keyPath });
console.log(`OK → ${out}`);
```

## 4) `packages/opd-pack/src/pack.ts` (squelette)

```ts
import { zip } from "fflate";
import { promises as fs } from "node:fs";
import { join } from "node:path";
import { createManifestAndSignature } from "@opd/opd-sign";

export async function pack(opts: { srcDir: string; outFile: string; keyPath?: string }) {
  const { srcDir, outFile, keyPath } = opts;
  // 1) lire tous les fichiers
  const files = await listFiles(srcDir); // -> {path, data}
  // 2) manifest + signature
  const { manifest, signature } = await createManifestAndSignature(files, keyPath);
  files.push({ path: "manifest.json", data: Buffer.from(JSON.stringify(manifest, null, 2)) });
  files.push({ path: "signature.jws", data: Buffer.from(signature) });
  // 3) zip
  const zipped = await zipAsync(files);
  await fs.writeFile(outFile, zipped);
}

async function listFiles(dir: string, base = ""): Promise<{path: string, data: Uint8Array}[]> {
  const out: any[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    const rel = join(base, e.name).replaceAll("\\", "/");
    if (e.isDirectory()) out.push(...await listFiles(p, rel));
    else out.push({ path: rel, data: await fs.readFile(p) });
  }
  return out;
}

function zipAsync(files: {path: string, data: Uint8Array}[]): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const obj: Record<string, Uint8Array> = {};
    for (const f of files) obj[f.path] = f.data;
    zip(obj, { level: 6 }, (err, data) => err ? reject(err) : resolve(data));
  });
}
```

## 5) `packages/opd-sign/src/index.ts` (squelette)

```ts
import { SignJWT, importPKCS8, generateKeyPair } from "jose";
import { createHash } from "node:crypto";

export async function createManifestAndSignature(
  files: { path: string; data: Uint8Array }[],
  keyPath?: string
) {
  const hashes: Record<string, string> = {};
  for (const f of files) {
    const h = createHash("sha256").update(f.data).digest("base64url");
    hashes[f.path] = `sha256-${h}`;
  }
  const manifest = { version: "1.0", files: Object.keys(hashes), hashes };

  // clé Ed25519 (PKCS8) fournie ou auto-générée (démo)
  let privateKey;
  if (keyPath) {
    const pkcs8 = await (await import("node:fs/promises")).readFile(keyPath, "utf8");
    privateKey = await importPKCS8(pkcs8, "EdDSA");
  } else {
    const { privateKey: pk } = await generateKeyPair("EdDSA");
    privateKey = pk;
  }

  const signature = await new SignJWT({ manifest })
    .setProtectedHeader({ alg: "EdDSA", typ: "opd+jws" })
    .setIssuedAt()
    .sign(privateKey);

  return { manifest, signature };
}
```

## 6) `packages/opd-bridge-docx/package.json`

```json
{
  "name": "@opd/opd-bridge-docx",
  "version": "0.1.0",
  "type": "module",
  "scripts": { "build": "tsc -p tsconfig.json", "dev": "tsx src/dev.ts" },
  "dependencies": {
    "mammoth": "^1.6.0",
    "jszip": "^3.10.1"
  },
  "devDependencies": { "tsx": "^4.19.1", "typescript": "^5.6.2" }
}
```

## 7) `packages/opd-bridge-docx/src/convert.ts` (squelette)

```ts
import mammoth from "mammoth";

// input: ArrayBuffer (.docx), output: { html, assets[] }
export async function docxToHtml(buf: ArrayBuffer) {
  const { value: html, messages } = await mammoth.convertToHtml({ arrayBuffer: buf }, {
    styleMap: [
      "p[style-name='Heading 1'] => h1:fresh",
      "p[style-name='Heading 2'] => h2:fresh"
    ]
  });
  // assets: mammoth inline, pour MVP on exporte les images plus tard si besoin
  return { html, messages };
}
```

## 8) `packages/opd-semantic/src/makeJsonLd.ts` (squelette)

```ts
export function makeJsonLd({ title, author, lang = "fr" }: any, sections: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Report",
    "name": title || "Document",
    "inLanguage": lang,
    "author": author ? { "@type": "Person", "name": author } : undefined,
    "hasPart": sections.map((id, i) => ({
      "@type": "WebPageElement",
      "identifier": id,
      "position": i + 1
    }))
  };
}
```

## 9) `packages/opd-viewer` (PWA minimal)

* Route `/open` accepte un `.opd.zip`, dézippe en mémoire, vérifie `manifest.json` + `signature.jws`, affiche `index.html` dans un sandbox.
* Scripts :

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "playwright test"
  }
}
```

---

# Spec de base (dans `packages/opd-spec/`)

## `SPEC.md` (extrait)

* **Contenu minimum d’un OPD** :

  * `index.html` (HTML5 sémantique)
  * `semantics.jsonld` (JSON-LD)
  * `manifest.json` (hashes SHA-256 de tous les fichiers inclus)
  * `signature.jws` (JWS EdDSA sur `{manifest}`)
* **Accessibilité** : `lang` sur `<html>`, landmarks (`<header>`, `<main>`, `<footer>`), ordre de lecture conseillé via `reading-order.json` (optionnel v1).
* **Intégrité** : le viewer recalcule les SHA-256 et compare au manifest; puis vérifie la JWS.

## `schemas/manifest.schema.json` (extrait)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["version", "files", "hashes"],
  "properties": {
    "version": { "type": "string" },
    "files": { "type": "array", "items": { "type": "string" } },
    "hashes": {
      "type": "object",
      "additionalProperties": { "type": "string", "pattern": "^sha256-[A-Za-z0-9_-]+$" }
    }
  }
}
```

---

# CI de base (GitHub Actions)

`.github/workflows/ci.yml`

```yaml
name: ci
on: [push, pull_request]
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test
```

---

# README (racine) — extrait

```md
# OPD — Open Portable Document

Format ouvert, web-native, signé et lisible par les IA.
MVP : convertir `.docx` → `.opd.zip` 100% côté client (sans API Microsoft/Google).

## Démarrer
pnpm i
pnpm dev    # lance les apps en mode dev (studio/viewer)

## Convertir (CLI)
pnpm --filter @opd/opd-pack build
opd-pack ./examples/doc-src --out ./out/document.opd.zip
```

---

# Prochaines étapes (pratiques)

1. **Init repo** avec cette arborescence + scripts.
2. Implémente `opd-bridge-docx` → renvoie `index.html`.
3. Ajoute `opd-semantic` → génère `semantics.jsonld` minimal.
4. Ajoute `opd-sign` + `opd-pack` → produit `.opd.zip`.
5. `opd-viewer` → ouvre `.opd.zip`, vérifie `signature.jws`, affiche.
6. **Golden tests** : 5 `.docx` réels (titres, tableaux, images, notes) + snapshots.

Si tu veux, je peux te générer une **To-Do par sprint (2 semaines)** avec issues prêtes à coller dans GitHub Projects.
