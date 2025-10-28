/**
 * Options pour le packaging
 */
export interface PackOptions {
  /** HTML du document */
  html: string;
  /** JSON-LD sémantique */
  jsonLd: object;
  /** CSS optionnel */
  css?: string;
  /** Assets (images, etc.) */
  assets?: Array<{ filename: string; data: Uint8Array }>;
  /** Signer le document ? */
  sign?: boolean;
}

/**
 * Résultat du packaging
 */
export interface PackResult {
  /** Données du fichier .opd.zip */
  data: Uint8Array;
  /** Taille en octets */
  size: number;
  /** Signature (si signée) */
  signature?: string;
  /** Clé publique (si signée) */
  publicKey?: string;
}

/**
 * Résultat du dépackaging
 */
export interface UnpackResult {
  /** HTML du document */
  html: string;
  /** JSON-LD sémantique */
  jsonLd: object;
  /** CSS */
  css?: string;
  /** Manifest */
  manifest: object;
  /** Signature */
  signature?: string;
  /** Assets */
  assets: Map<string, Uint8Array>;
  /** La signature est-elle valide ? */
  signatureValid?: boolean;
}

