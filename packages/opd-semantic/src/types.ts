/**
 * Options pour la génération de JSON-LD
 */
export interface JsonLdOptions {
  /** Titre du document */
  title?: string;
  /** Auteur(s) */
  author?: string | string[];
  /** Langue du document (code ISO 639-1) */
  lang?: string;
  /** Sujet du document */
  subject?: string;
  /** Mots-clés */
  keywords?: string | string[];
  /** Date de publication */
  datePublished?: Date | string;
  /** Date de modification */
  dateModified?: Date | string;
  /** Description / résumé */
  description?: string;
  /** Type de document (Report, Article, etc.) */
  documentType?: "Report" | "Article" | "ScholarlyArticle" | "TechArticle" | "Document";
}

/**
 * Section du document
 */
export interface JsonLdSection {
  /** Identifiant unique de la section */
  id: string;
  /** Titre de la section */
  name?: string;
  /** Position dans le document */
  position: number;
}

/**
 * Document JSON-LD généré
 */
export interface JsonLdDocument {
  "@context": string | string[];
  "@type": string;
  name: string;
  inLanguage?: string;
  author?: unknown;
  datePublished?: string;
  dateModified?: string;
  description?: string;
  keywords?: string | string[];
  about?: string;
  hasPart?: unknown[];
}

