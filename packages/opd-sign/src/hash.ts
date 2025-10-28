/**
 * Calcule le hash SHA-256 d'un fichier
 * @param data - Données du fichier
 * @returns Hash au format "sha256-{base64url}"
 */
export async function hashFile(data: Uint8Array): Promise<string> {
  // Utiliser Web Crypto API (compatible navigateur et Node.js)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data as BufferSource);
  const hashArray = new Uint8Array(hashBuffer);
  const base64url = bufferToBase64Url(hashArray);
  return `sha256-${base64url}`;
}

/**
 * Calcule les hashes de plusieurs fichiers
 * @param files - Liste des fichiers
 * @returns Map des hashes par chemin
 */
export async function hashFiles(
  files: Array<{ path: string; data: Uint8Array }>
): Promise<Record<string, string>> {
  const hashes: Record<string, string> = {};

  for (const file of files) {
    hashes[file.path] = await hashFile(file.data);
  }

  return hashes;
}

/**
 * Convertit un buffer en base64url
 */
function bufferToBase64Url(buffer: Uint8Array): string {
  // Convertir en base64 standard
  const base64 = btoa(String.fromCharCode(...buffer));
  
  // Convertir en base64url (RFC 4648)
  return base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

