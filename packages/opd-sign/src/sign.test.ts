import { describe, it, expect } from "vitest";
import { createManifest, signManifest, verifySignature } from "./sign";

describe("createManifest", () => {
  it("should create manifest with file hashes", async () => {
    const files = [
      { path: "index.html", data: new TextEncoder().encode("<html></html>") },
      { path: "styles.css", data: new TextEncoder().encode("body {}") },
    ];

    const manifest = await createManifest(files);

    expect(manifest.version).toBe("1.0");
    expect(manifest.files).toHaveLength(2);
    expect(manifest.files).toContain("index.html");
    expect(manifest.files).toContain("styles.css");
    expect(manifest.hashes["index.html"]).toBeDefined();
    expect(manifest.hashes["styles.css"]).toBeDefined();
    expect(typeof manifest.hashes["index.html"]).toBe("string");
    expect(typeof manifest.hashes["styles.css"]).toBe("string");
  });

  it("should generate different hashes for different content", async () => {
    const files1 = [
      { path: "test.txt", data: new TextEncoder().encode("content1") },
    ];
    const files2 = [
      { path: "test.txt", data: new TextEncoder().encode("content2") },
    ];

    const manifest1 = await createManifest(files1);
    const manifest2 = await createManifest(files2);

    expect(manifest1.hashes["test.txt"]).not.toBe(manifest2.hashes["test.txt"]);
  });

  it("should generate same hash for same content", async () => {
    const content = new TextEncoder().encode("same content");
    const files1 = [{ path: "test.txt", data: content }];
    const files2 = [{ path: "test.txt", data: content }];

    const manifest1 = await createManifest(files1);
    const manifest2 = await createManifest(files2);

    expect(manifest1.hashes["test.txt"]).toBe(manifest2.hashes["test.txt"]);
  });
});

describe("signManifest and verifySignature", () => {
  it("should sign and verify a manifest successfully", async () => {
    const files = [
      { path: "index.html", data: new TextEncoder().encode("<html></html>") },
    ];

    const manifest = await createManifest(files);
    const { signature, publicKey } = await signManifest(manifest);

    expect(signature).toBeDefined();
    expect(publicKey).toBeDefined();
    expect(typeof signature).toBe("string");
    expect(typeof publicKey).toBe("string");

    const result = await verifySignature(signature, publicKey);

    expect(result.valid).toBe(true);
  });

  it("should generate different signatures for different manifests", async () => {
    const files1 = [
      { path: "test1.txt", data: new TextEncoder().encode("content1") },
    ];
    const files2 = [
      { path: "test2.txt", data: new TextEncoder().encode("content2") },
    ];

    const manifest1 = await createManifest(files1);
    const manifest2 = await createManifest(files2);

    const { signature: sig1 } = await signManifest(manifest1);
    const { signature: sig2 } = await signManifest(manifest2);

    expect(sig1).not.toBe(sig2);
  });

  it("should handle empty file list", async () => {
    const manifest = await createManifest([]);

    expect(manifest.files).toHaveLength(0);

    const { signature, publicKey } = await signManifest(manifest);
    const result = await verifySignature(signature, publicKey);

    expect(result.valid).toBe(true);
  });

  it("should handle multiple files", async () => {
    const files = [
      { path: "file1.txt", data: new TextEncoder().encode("content1") },
      { path: "file2.txt", data: new TextEncoder().encode("content2") },
      { path: "file3.txt", data: new TextEncoder().encode("content3") },
    ];

    const manifest = await createManifest(files);
    const { signature, publicKey } = await signManifest(manifest);
    const result = await verifySignature(signature, publicKey);

    expect(manifest.files).toHaveLength(3);
    expect(result.valid).toBe(true);
  });
});

