import { zip, unzip } from "fflate";
import { createManifest, signManifest } from "@opd/opd-sign";
import type { PackOptions, PackResult, UnpackResult } from "./types.js";

/**
 * Package un document OPD
 * @param options - Options de packaging
 * @returns Fichier .opd.zip
 */
export async function packOpd(options: PackOptions): Promise<PackResult> {
  const { html, jsonLd, css, assets = [], sign: shouldSign = true } = options;

  // Préparer les fichiers
  const files: Array<{ path: string; data: Uint8Array }> = [];

  // index.html
  files.push({
    path: "index.html",
    data: new TextEncoder().encode(html),
  });

  // semantics.jsonld
  files.push({
    path: "semantics.jsonld",
    data: new TextEncoder().encode(JSON.stringify(jsonLd, null, 2)),
  });

  // styles.css (optionnel)
  if (css) {
    files.push({
      path: "styles.css",
      data: new TextEncoder().encode(css),
    });
  }

  // Assets
  for (const asset of assets) {
    files.push({
      path: `assets/${asset.filename}`,
      data: asset.data,
    });
  }

  // Créer le manifest
  const manifest = await createManifest(files);
  files.push({
    path: "manifest.json",
    data: new TextEncoder().encode(JSON.stringify(manifest, null, 2)),
  });

  // Signer si demandé
  let signature: string | undefined;
  let publicKey: string | undefined;

  if (shouldSign) {
    const signResult = await signManifest(manifest);
    signature = signResult.signature;
    publicKey = signResult.publicKey;

    files.push({
      path: "signature.jws",
      data: new TextEncoder().encode(signature),
    });

    files.push({
      path: "publickey.json",
      data: new TextEncoder().encode(publicKey),
    });
  }

  // Créer le ZIP
  const zipData = await createZip(files);

  return {
    data: zipData,
    size: zipData.length,
    signature,
    publicKey,
  };
}

/**
 * Dépackage un document OPD
 * @param data - Données du fichier .opd.zip
 * @returns Contenu du document
 */
export async function unpackOpd(data: Uint8Array): Promise<UnpackResult> {
  // Décompresser le ZIP
  const files = await extractZip(data);

  // Extraire les fichiers
  const html = new TextDecoder().decode(files.get("index.html"));
  const jsonLd = JSON.parse(new TextDecoder().decode(files.get("semantics.jsonld")!));
  const manifest = JSON.parse(new TextDecoder().decode(files.get("manifest.json")!));

  const css = files.has("styles.css")
    ? new TextDecoder().decode(files.get("styles.css"))
    : undefined;

  const signature = files.has("signature.jws")
    ? new TextDecoder().decode(files.get("signature.jws"))
    : undefined;

  // Extraire les assets
  const assets = new Map<string, Uint8Array>();
  for (const [path, content] of files.entries()) {
    if (path.startsWith("assets/")) {
      assets.set(path, content);
    }
  }

  // TODO: Vérifier la signature
  const signatureValid = signature ? undefined : undefined;

  return {
    html,
    jsonLd,
    css,
    manifest,
    signature,
    assets,
    signatureValid,
  };
}

/**
 * Crée un fichier ZIP
 */
function createZip(files: Array<{ path: string; data: Uint8Array }>): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const zipFiles: Record<string, Uint8Array> = {};

    for (const file of files) {
      zipFiles[file.path] = file.data;
    }

    zip(zipFiles, { level: 9 }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

/**
 * Extrait un fichier ZIP
 */
function extractZip(data: Uint8Array): Promise<Map<string, Uint8Array>> {
  return new Promise((resolve, reject) => {
    unzip(data, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const result = new Map<string, Uint8Array>();
        for (const [path, content] of Object.entries(files)) {
          result.set(path, content);
        }
        resolve(result);
      }
    });
  });
}

