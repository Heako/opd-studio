import mammoth from "mammoth";
import JSZip from "jszip";
import type { DocxConversionResult, DocxMetadata, DocxAsset } from "./types.js";

/**
 * Convertit un fichier DOCX en HTML sémantique
 * @param buffer - Buffer du fichier DOCX
 * @returns Résultat de la conversion
 */
export async function docxToHtml(buffer: ArrayBuffer): Promise<DocxConversionResult> {
  const warnings: string[] = [];

  try {
    // Extraction des métadonnées
    const metadata = await extractMetadata(buffer);

    // Conversion HTML avec Mammoth - préserver la mise en forme
    const result = await mammoth.convertToHtml(
      { arrayBuffer: buffer },
      {
        styleMap: [
          // Mapping des styles Word vers HTML sémantique
          "p[style-name='Heading 1'] => h1:fresh",
          "p[style-name='Heading 2'] => h2:fresh",
          "p[style-name='Heading 3'] => h3:fresh",
          "p[style-name='Heading 4'] => h4:fresh",
          "p[style-name='Heading 5'] => h5:fresh",
          "p[style-name='Heading 6'] => h6:fresh",
          "p[style-name='Title'] => h1.title:fresh",
          "p[style-name='Subtitle'] => p.subtitle:fresh",
          "p[style-name='Quote'] => blockquote:fresh",
        ],
        // Convertir les images en base64 pour les inclure directement
        convertImage: mammoth.images.imgElement((image) => {
          return image.read("base64").then((imageBuffer) => {
            return {
              src: `data:${image.contentType};base64,${imageBuffer}`,
            };
          });
        }),
      }
    );

    // Extraction des assets (images)
    const assets = await extractAssets(buffer);

    // Collecter les warnings de Mammoth
    if (result.messages && result.messages.length > 0) {
      warnings.push(...result.messages.map((msg) => msg.message));
    }

    // Nettoyer et améliorer le HTML
    const cleanedHtml = cleanHtml(result.value);

    return {
      html: cleanedHtml,
      metadata,
      assets,
      warnings,
    };
  } catch (error) {
    throw new Error(
      `Erreur lors de la conversion DOCX: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Extrait les métadonnées du fichier DOCX
 */
async function extractMetadata(buffer: ArrayBuffer): Promise<DocxMetadata> {
  const zip = await JSZip.loadAsync(buffer);
  const metadata: DocxMetadata = {};

  try {
    // Lire core.xml pour les métadonnées principales
    const coreXml = await zip.file("docProps/core.xml")?.async("text");
    if (coreXml) {
      metadata.title = extractXmlValue(coreXml, "dc:title");
      metadata.author = extractXmlValue(coreXml, "dc:creator");
      metadata.subject = extractXmlValue(coreXml, "dc:subject");
      metadata.keywords = extractXmlValue(coreXml, "cp:keywords");

      const created = extractXmlValue(coreXml, "dcterms:created");
      if (created) metadata.created = new Date(created);

      const modified = extractXmlValue(coreXml, "dcterms:modified");
      if (modified) metadata.modified = new Date(modified);
    }

    // Lire app.xml pour des métadonnées supplémentaires
    const appXml = await zip.file("docProps/app.xml")?.async("text");
    if (appXml) {
      // Extraction de métadonnées supplémentaires si nécessaire
    }
  } catch (error) {
    console.warn("Impossible d'extraire les métadonnées:", error);
  }

  return metadata;
}

/**
 * Extrait les assets (images) du fichier DOCX
 */
async function extractAssets(buffer: ArrayBuffer): Promise<DocxAsset[]> {
  const zip = await JSZip.loadAsync(buffer);
  const assets: DocxAsset[] = [];

  // Parcourir le dossier word/media/
  const mediaFolder = zip.folder("word/media");
  if (!mediaFolder) return assets;

  const files = Object.keys(zip.files).filter((name) => name.startsWith("word/media/"));

  for (const filename of files) {
    const file = zip.file(filename);
    if (!file) continue;

    const data = await file.async("uint8array");
    const basename = filename.split("/").pop() || filename;

    assets.push({
      filename: basename,
      mimeType: getMimeType(basename),
      data,
      size: data.length,
    });
  }

  return assets;
}

/**
 * Extrait une valeur d'un XML simple
 */
function extractXmlValue(xml: string, tagName: string): string | undefined {
  const regex = new RegExp(`<${tagName}[^>]*>([^<]*)</${tagName}>`, "i");
  const match = xml.match(regex);
  return match ? match[1].trim() : undefined;
}

/**
 * Détermine le type MIME d'un fichier
 */
function getMimeType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    svg: "image/svg+xml",
    webp: "image/webp",
  };
  return mimeTypes[ext || ""] || "application/octet-stream";
}

/**
 * Nettoie et améliore le HTML généré
 */
function cleanHtml(html: string): string {
  // Ajouter des attributs sémantiques
  let cleaned = html;

  // Nettoyer les espaces multiples
  cleaned = cleaned.replace(/\s+/g, " ");

  // Ajouter des sauts de ligne pour la lisibilité
  cleaned = cleaned.replace(/<\/h([1-6])>/g, "</h$1>\n");
  cleaned = cleaned.replace(/<\/p>/g, "</p>\n");
  cleaned = cleaned.replace(/<\/blockquote>/g, "</blockquote>\n");

  // Wrapper dans une structure HTML complète
  cleaned = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OPD Document</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <article class="opd-document">
${cleaned}
  </article>
</body>
</html>`;

  return cleaned;
}

