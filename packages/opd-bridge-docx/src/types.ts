/**
 * Résultat de la conversion DOCX → HTML
 */
export interface DocxConversionResult {
  /** HTML généré */
  html: string;
  /** Métadonnées extraites du document */
  metadata: DocxMetadata;
  /** Assets (images, etc.) */
  assets: DocxAsset[];
  /** Messages d'avertissement */
  warnings: string[];
}

/**
 * Métadonnées du document DOCX
 */
export interface DocxMetadata {
  /** Titre du document */
  title?: string;
  /** Auteur(s) */
  author?: string;
  /** Sujet */
  subject?: string;
  /** Mots-clés */
  keywords?: string;
  /** Date de création */
  created?: Date;
  /** Date de modification */
  modified?: Date;
  /** Langue du document */
  language?: string;
}

/**
 * Asset extrait du document (image, etc.)
 */
export interface DocxAsset {
  /** Nom du fichier */
  filename: string;
  /** Type MIME */
  mimeType: string;
  /** Données binaires */
  data: Uint8Array;
  /** Taille en octets */
  size: number;
}

