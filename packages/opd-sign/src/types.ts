/**
 * Fichier dans le package OPD
 */
export interface OpdFile {
  /** Chemin du fichier */
  path: string;
  /** Données du fichier */
  data: Uint8Array;
}

/**
 * Manifest OPD
 */
export interface OpdManifest {
  /** Version du format OPD */
  version: string;
  /** Liste des fichiers */
  files: string[];
  /** Hashes SHA-256 des fichiers */
  hashes: Record<string, string>;
  /** Date de création */
  created?: string;
}

/**
 * Résultat de la signature
 */
export interface SignatureResult {
  /** Signature JWS */
  signature: string;
  /** Clé publique (base64url) */
  publicKey: string;
}

/**
 * Résultat de la vérification
 */
export interface VerificationResult {
  /** La signature est-elle valide ? */
  valid: boolean;
  /** Message d'erreur si invalide */
  error?: string;
  /** Payload décodé */
  payload?: unknown;
}

