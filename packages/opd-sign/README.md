# @opd/opd-sign

Signature cryptographique pour les documents OPD utilisant Ed25519.

## Installation

```bash
pnpm add @opd/opd-sign
```

## Usage

### Créer un manifest et signer

```typescript
import { createManifest, signManifest } from "@opd/opd-sign";

const files = [
  { path: "index.html", data: new Uint8Array([...]) },
  { path: "semantics.jsonld", data: new Uint8Array([...]) },
];

// Créer le manifest
const manifest = await createManifest(files);

// Signer le manifest
const { signature, publicKey } = await signManifest(manifest);

console.log("Signature:", signature);
console.log("Clé publique:", publicKey);
```

### Vérifier une signature

```typescript
import { verifySignature } from "@opd/opd-sign";

const result = await verifySignature(signature, publicKey);

if (result.valid) {
  console.log("✅ Signature valide");
  console.log("Payload:", result.payload);
} else {
  console.error("❌ Signature invalide:", result.error);
}
```

## Fonctionnalités

- ✅ Hashing SHA-256 des fichiers
- ✅ Génération de manifest avec hashes
- ✅ Signature Ed25519 (JWS)
- ✅ Vérification de signature
- ✅ Compatible navigateur et Node.js (Web Crypto API)

## Sécurité

- Algorithme : **Ed25519** (courbe elliptique)
- Hash : **SHA-256**
- Format : **JWS** (JSON Web Signature)
- Validité : 10 ans par défaut

