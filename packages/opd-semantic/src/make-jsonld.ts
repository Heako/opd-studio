import type { JsonLdDocument, JsonLdOptions, JsonLdSection } from "./types.js";

/**
 * Génère un document JSON-LD conforme à Schema.org
 * @param options - Options du document
 * @param sections - Sections du document (optionnel)
 * @returns Document JSON-LD
 */
export function makeJsonLd(
  options: JsonLdOptions,
  sections?: JsonLdSection[]
): JsonLdDocument {
  const {
    title = "Document",
    author,
    lang = "fr",
    subject,
    keywords,
    datePublished,
    dateModified,
    description,
    documentType = "Report",
  } = options;

  const jsonLd: JsonLdDocument = {
    "@context": "https://schema.org",
    "@type": documentType,
    name: title,
    inLanguage: lang,
  };

  // Auteur(s)
  if (author) {
    if (Array.isArray(author)) {
      jsonLd.author = author.map((name) => ({
        "@type": "Person",
        name,
      }));
    } else {
      jsonLd.author = {
        "@type": "Person",
        name: author,
      };
    }
  }

  // Dates
  if (datePublished) {
    jsonLd.datePublished = formatDate(datePublished);
  }

  if (dateModified) {
    jsonLd.dateModified = formatDate(dateModified);
  }

  // Description
  if (description) {
    jsonLd.description = description;
  }

  // Sujet
  if (subject) {
    jsonLd.about = subject;
  }

  // Mots-clés
  if (keywords) {
    jsonLd.keywords = Array.isArray(keywords) ? keywords : keywords;
  }

  // Sections
  if (sections && sections.length > 0) {
    jsonLd.hasPart = sections.map((section) => ({
      "@type": "WebPageElement",
      identifier: section.id,
      name: section.name,
      position: section.position,
    }));
  }

  return jsonLd;
}

/**
 * Formate une date en ISO 8601
 */
function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    return new Date(date).toISOString();
  }
  return date.toISOString();
}

