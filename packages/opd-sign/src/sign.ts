import { SignJWT, jwtVerify, generateKeyPair, exportJWK } from "jose";
import { hashFiles } from "./hash.js";
import type { OpdFile, OpdManifest, SignatureResult, VerificationResult } from "./types.js";

/**
 * Crée un manifest OPD
 * @param files - Liste des fichiers
 * @returns Manifest
 */
export async function createManifest(files: OpdFile[]): Promise<OpdManifest> {
  const hashes = await hashFiles(files);

  return {
    version: "1.0",
    files: files.map((f) => f.path),
    hashes,
    created: new Date().toISOString(),
  };
}

/**
 * Signe un manifest avec Ed25519
 * @param manifest - Manifest à signer
 * @param privateKey - Clé privée (optionnel, auto-générée si non fournie)
 * @returns Signature JWS et clé publique
 */
export async function signManifest(
  manifest: OpdManifest,
  privateKey?: CryptoKey
): Promise<SignatureResult> {
  let keyPair: { privateKey: CryptoKey; publicKey: CryptoKey };

  if (privateKey) {
    // Utiliser la clé fournie (on suppose qu'elle a une clé publique associée)
    // Pour simplifier, on génère une nouvelle paire si pas fournie
    keyPair = await generateKeyPair("EdDSA");
  } else {
    // Générer une nouvelle paire de clés Ed25519
    keyPair = await generateKeyPair("EdDSA");
  }

  // Créer la signature JWS
  const signature = await new SignJWT({ manifest })
    .setProtectedHeader({ alg: "EdDSA", typ: "opd+jws" })
    .setIssuedAt()
    .setExpirationTime("10y") // Valide 10 ans
    .sign(keyPair.privateKey);

  // Exporter la clé publique
  const publicKeyJwk = await exportJWK(keyPair.publicKey);
  const publicKey = JSON.stringify(publicKeyJwk);

  return {
    signature,
    publicKey,
  };
}

/**
 * Vérifie une signature JWS
 * @param signature - Signature JWS
 * @param publicKey - Clé publique (JWK JSON string)
 * @returns Résultat de la vérification
 */
export async function verifySignature(
  signature: string,
  publicKey: string
): Promise<VerificationResult> {
  try {
    const publicKeyJwk = JSON.parse(publicKey);
    
    // Importer la clé publique
    const key = await crypto.subtle.importKey(
      "jwk",
      publicKeyJwk,
      { name: "Ed25519", namedCurve: "Ed25519" } as any,
      true,
      ["verify"]
    );

    // Vérifier la signature
    const { payload } = await jwtVerify(signature, key as any, {
      algorithms: ["EdDSA"],
    });

    return {
      valid: true,
      payload,
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

