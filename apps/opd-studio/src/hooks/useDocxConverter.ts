import { useState } from "react";
import { docxToHtml, generateDefaultCss } from "@opd/opd-bridge-docx";
import { makeJsonLd } from "@opd/opd-semantic";
import { packOpd } from "@opd/opd-pack";

export interface ConversionResult {
  success: boolean;
  data?: Uint8Array;
  html?: string;
  css?: string;
  error?: string;
  metadata?: {
    title?: string;
    author?: string;
  };
}

export function useDocxConverter() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const convertDocx = async (file: File): Promise<ConversionResult> => {
    setIsProcessing(true);
    setProgress(0);

    try {
      // 1. Lire le fichier DOCX
      setProgress(10);
      const buffer = await file.arrayBuffer();

      // 2. Convertir DOCX → HTML
      setProgress(30);
      const { html, metadata, assets } = await docxToHtml(buffer);

      // 3. Générer JSON-LD
      setProgress(50);
      const jsonLd = makeJsonLd({
        title: metadata.title || file.name.replace(".docx", ""),
        author: metadata.author,
        lang: metadata.language || "fr",
        datePublished: metadata.created,
        dateModified: metadata.modified,
        documentType: "Document",
      });

      // 4. Générer le CSS
      setProgress(60);
      const css = generateDefaultCss();

      // 5. Packager en .opd.zip
      setProgress(70);
      const result = await packOpd({
        html,
        jsonLd,
        css,
        assets: assets.map((a) => ({ filename: a.filename, data: a.data })),
        sign: true,
      });

      setProgress(100);
      setIsProcessing(false);

      return {
        success: true,
        data: result.data,
        html,
        css,
        metadata: {
          title: metadata.title,
          author: metadata.author,
        },
      };
    } catch (error) {
      setIsProcessing(false);
      setProgress(0);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      };
    }
  };

  const downloadOpd = (data: Uint8Array, originalFilename: string) => {
    const blob = new Blob([data as BlobPart], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = originalFilename.replace(".docx", ".opd.zip");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    isProcessing,
    progress,
    convertDocx,
    downloadOpd,
  };
}

