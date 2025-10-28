1️⃣ **Une architecture GitHub open source** → structure claire, modules indépendants, licences.
2️⃣ **Un PRD (Product Requirement Document)** complet pour la première version d’**OPD Core**.

---

# 🧭 1. Organisation GitHub open source

## 📂 Structure principale (monorepo ou multi-repo)

### Option 1 — *Monorepo (Turborepo / Nx)*

```
opd/
 ├── packages/
 │    ├── opd-spec/         → Spécification du format (Markdown + schémas JSON)
 │    ├── opd-pack/         → Outil CLI / lib pour packager et signer les docs
 │    ├── opd-bridge-docx/  → Conversion .docx → OPD (Mammoth.js)
 │    ├── opd-viewer/       → Visionneuse web (PWA)
 │    ├── opd-sign/         → Librairie signature WebCrypto (Ed25519)
 │    └── opd-tests/        → Suite de tests + golden files
 ├── apps/
 │    ├── opd-studio/       → Interface web (Next.js)
 │    └── opd-cloud/        → Version serveur (Node/Deno)
 ├── docs/                  → Documentation publique + guide contributeurs
 ├── .github/               → CI/CD (actions, tests, lint)
 └── LICENSE                → Apache-2.0
```

### Option 2 — *Multi-repo (pour fondation)*

* `opd-spec`
* `opd-pack`
* `opd-viewer`
* `opd-bridge-docx`
* `opd-tests`
* `opd-sign`
* `openopd.org` (site public)

💡 Pour démarrer vite → **monorepo**.
Quand la communauté grandit → migration vers multi-repo sous une **organisation GitHub “OpenOPD”**.

---

## ⚖️ Licences & gouvernance

| Module                           | Licence    | Justification               |
| -------------------------------- | ---------- | --------------------------- |
| opd-spec                         | CC-BY 4.0  | format ouvert               |
| opd-pack / opd-sign / opd-bridge | Apache-2.0 | compatible entreprise & OSS |
| opd-viewer / opd-studio          | MIT        | adoption maximale           |
| opd-cloud                        | AGPLv3     | protège la version hébergée |
| opd-tests                        | MIT        | libre réutilisation pour QA |

**Gouvernance initiale**

* 1 mainteneur principal (toi ou la fondation OpenOPD)
* 2 reviewers (core)
* Contributions via PR + DCO (Developer Certificate of Origin)
* Roadmap publique dans `docs/ROADMAP.md`

---

# 🧾 2. PRD.md — *OPD Core v1.0 (Open Portable Document)*

---

## 🏷️ Product Name

**OPD Core** — *Open Portable Document*

---

## 🎯 Mission

Créer un format ouvert, universel et interopérable pour les documents web, destiné à remplacer progressivement le PDF dans les usages numériques, bureautiques et institutionnels.

---

## 🌍 Vision

> “Un document OPD doit être lisible dans un navigateur, vérifiable, signé, accessible, et compréhensible par les humains comme par les IA.”

---

## 🧱 Core features (v1.0)

| Fonction                         | Description                                                                 | Statut |
| -------------------------------- | --------------------------------------------------------------------------- | ------ |
| 🔹 Conversion `.docx → OPD`      | Import d’un fichier Word, parsing via Mammoth.js (client-side)              | MVP    |
| 🔹 Génération HTML sémantique    | Recréation du contenu avec structure hiérarchique et ARIA                   | MVP    |
| 🔹 JSON-LD metadata              | Génération automatique du graphe sémantique (titre, auteur, sections, etc.) | MVP    |
| 🔹 Signature WebCrypto (Ed25519) | Hash + manifest + signature numérique locale                                | MVP    |
| 🔹 Export `.opd.zip`             | Contient `index.html`, `semantics.jsonld`, `manifest.json`, `signature.jws` | MVP    |
| 🔹 PWA viewer                    | Lecture web, vérification signature, offline cache                          | MVP    |
| 🔹 Accessibilité                 | Structure ARIA, landmarks, ordre de lecture                                 | MVP    |
| 🔹 Tests unitaires + golden docs | Jeux DOCX de référence → sorties attendues                                  | MVP    |

---

## 📦 Structure d’un document `.opd.zip`

```
/mydocument.opd.zip
 ├── index.html
 ├── semantics.jsonld
 ├── manifest.json
 ├── signature.jws
 ├── styles.css
 └── assets/
      ├── image1.jpg
      └── graph1.svg
```

**manifest.json**

```json
{
  "version": "1.0",
  "files": [
    "index.html",
    "semantics.jsonld",
    "styles.css"
  ],
  "hashes": {
    "index.html": "sha256-abc123",
    "semantics.jsonld": "sha256-def456"
  },
  "signedBy": "ed25519:XYZ..."
}
```

---

## 🧩 Workflow utilisateur

**Mode 1 – Web PWA**

1. L’utilisateur glisse un `.docx` dans la zone.
2. Le document est lu localement via JSZip + Mammoth.js.
3. HTML + JSON-LD + manifest générés côté client.
4. Signature via WebCrypto → `signature.jws`.
5. Téléchargement `.opd.zip` ou affichage direct dans le viewer.

**Mode 2 – CLI (serveur / batch)**

```bash
opd-pack input.docx --out report.opd.zip --sign key.pem
```

---

## 🧠 Spécification sémantique minimale (v1)

* **Type principal :** `Document` ou `Report`
* **Champs requis :**

  * `name`
  * `author` (person/organization)
  * `datePublished`
  * `inLanguage`
* **Champs optionnels :**

  * `keywords`
  * `hasPart` (sections)
  * `citation` (liens)
  * `dataset` (si applicable)

---

## 🔐 Signature & sécurité

* Algorithme : **Ed25519 (WebCrypto / JOSE)**
* Format : JWS compact (`.jws`)
* Hash : SHA-256
* Vérification : intégrée au viewer (JS), hors ligne possible.

Objectif : garantir **intégrité et authenticité** sans serveur tiers.

---

## ⚙️ Stack technique

| Composant  | Techno                     | Justification                     |
| ---------- | -------------------------- | --------------------------------- |
| Conversion | JSZip + Mammoth.js         | 100 % client, pas d’API Microsoft |
| Packaging  | fflate / zip.js            | Compression portable              |
| Signature  | WebCrypto API              | Sans dépendance externe           |
| Viewer     | SvelteKit ou Next.js (PWA) | Web native, offline               |
| Tests      | Vitest + Playwright        | Rapidité + snapshots HTML         |

---

## 🧩 Open standards utilisés

* HTML5 + CSS3
* JSON-LD (Schema.org, Dublin Core)
* WAI-ARIA (accessibilité)
* WebCrypto API
* ZIP (ISO 21320)

---

## 🚀 Roadmap produit

| Phase | Objectif                        | Délai  | Livraison              |
| ----- | ------------------------------- | ------ | ---------------------- |
| v0.1  | Prototype PWA (DOCX → OPD)      | Mois 1 | Conversion + signature |
| v0.2  | CLI + tests                     | Mois 2 | opd-pack + opd-tests   |
| v0.3  | Viewer complet                  | Mois 3 | opd-viewer             |
| v0.4  | Accessibilité + JSON-LD enrichi | Mois 4 | WCAG + meta            |
| v1.0  | Release stable + doc publique   | Mois 5 | Spec v1, site officiel |

---

## 🧮 KPI & succès

| Indicateur                        | Objectif                       |
| --------------------------------- | ------------------------------ |
| Conversion DOCX → OPD sans erreur | ≥ 95 % des cas testés          |
| Vérification signature            | 100 % fiable                   |
| Taille fichier OPD                | ≤ 120 % du DOCX original       |
| Compatibilité navigateurs         | Chrome, Edge, Firefox, Safari  |
| Temps de conversion (client)      | < 3 s / 10 pages               |
| Adoption GitHub                   | 1K stars / 100 forks en 6 mois |

---

## 🏗️ Partenaires & ouverture future

* **LibreOffice** / The Document Foundation → interop `.odt`
* **W3C** → alignement WebBundles
* **AFNOR / DINUM / Etalab** → standardisation
* **Universités / BnF / INSEE** → tests d’usage réel

---

## 📜 Licence

* Core libs : **Apache 2.0**
* Spécification : **CC-BY 4.0**
* Cloud (future version) : **AGPLv3**

---

Souhaites-tu que je t’ajoute le **diagramme d’architecture technique** (front-end, core lib, CLI, viewer, tests) et la **structure de fichiers du monorepo** prête à copier-coller pour GitHub ?
