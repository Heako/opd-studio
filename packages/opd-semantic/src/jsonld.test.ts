import { describe, it, expect } from "vitest";
import { makeJsonLd } from "./make-jsonld";

describe("makeJsonLd", () => {
  it("should generate basic JSON-LD with required fields", () => {
    const result = makeJsonLd({
      title: "Test Document",
      author: "John Doe",
      lang: "en",
      documentType: "Document",
    });

    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("Document");
    expect(result.name).toBe("Test Document");
    expect(result.author).toEqual({
      "@type": "Person",
      name: "John Doe",
    });
    expect(result.inLanguage).toBe("en");
  });

  it("should include optional dates when provided", () => {
    const publishedDate = new Date("2024-01-01");
    const modifiedDate = new Date("2024-01-15");

    const result = makeJsonLd({
      title: "Test Document",
      lang: "en",
      documentType: "Document",
      datePublished: publishedDate,
      dateModified: modifiedDate,
    });

    expect(result.datePublished).toBe(publishedDate.toISOString());
    expect(result.dateModified).toBe(modifiedDate.toISOString());
  });

  it("should handle different document types", () => {
    const types = ["Document", "Report", "Article", "ScholarlyArticle"];

    types.forEach((type) => {
      const result = makeJsonLd({
        title: "Test",
        lang: "en",
        documentType: type as any,
      });

      expect(result["@type"]).toBe(type);
    });
  });

  it("should include description when provided", () => {
    const result = makeJsonLd({
      title: "Test Document",
      lang: "en",
      documentType: "Document",
      description: "This is a test document",
    });

    expect(result.description).toBe("This is a test document");
  });

  it("should include keywords when provided", () => {
    const result = makeJsonLd({
      title: "Test Document",
      lang: "en",
      documentType: "Document",
      keywords: ["test", "document", "opd"],
    });

    expect(result.keywords).toEqual(["test", "document", "opd"]);
  });

  it("should handle missing optional author", () => {
    const result = makeJsonLd({
      title: "Test Document",
      lang: "en",
      documentType: "Document",
    });

    expect(result.author).toBeUndefined();
  });

  it("should use default language if not provided", () => {
    const result = makeJsonLd({
      title: "Test Document",
      documentType: "Document",
    });

    expect(result.inLanguage).toBe("fr");
  });

  it("should generate valid Schema.org structure", () => {
    const result = makeJsonLd({
      title: "Complete Document",
      author: "Jane Smith",
      lang: "fr",
      documentType: "Report",
      description: "A comprehensive report",
      keywords: ["report", "analysis"],
      datePublished: new Date("2024-01-01"),
      dateModified: new Date("2024-01-15"),
    });

    // Verify all expected fields are present
    expect(result).toHaveProperty("@context");
    expect(result).toHaveProperty("@type");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("author");
    expect(result).toHaveProperty("inLanguage");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("keywords");
    expect(result).toHaveProperty("datePublished");
    expect(result).toHaveProperty("dateModified");

    // Verify structure
    expect(typeof result["@context"]).toBe("string");
    expect(typeof result["@type"]).toBe("string");
    expect(typeof result.name).toBe("string");
    expect(typeof result.author).toBe("object");
    expect(result.author["@type"]).toBe("Person");
  });
});

