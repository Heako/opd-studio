/**
 * Generate default CSS styles for OPD documents
 */
export function generateDefaultCss(): string {
  return `
/* OPD Document Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #1f2937;
  background: #ffffff;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.opd-document {
  background: white;
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.3;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  color: #111827;
}

h1 {
  font-size: 2.25rem;
  margin-top: 0;
  padding-bottom: 0.3em;
  border-bottom: 2px solid #e5e7eb;
}

h2 {
  font-size: 1.875rem;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #e5e7eb;
}

h3 {
  font-size: 1.5rem;
}

h4 {
  font-size: 1.25rem;
}

h5 {
  font-size: 1.125rem;
}

h6 {
  font-size: 1rem;
  color: #4b5563;
}

/* Paragraphs */
p {
  margin-bottom: 1em;
}

p.subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 1.5em;
}

/* Lists */
ul, ol {
  margin-bottom: 1em;
  padding-left: 2em;
}

li {
  margin-bottom: 0.5em;
}

/* Blockquotes */
blockquote {
  margin: 1.5em 0;
  padding: 1em 1.5em;
  border-left: 4px solid #3b82f6;
  background: #eff6ff;
  font-style: italic;
  color: #1e40af;
}

/* Links */
a {
  color: #3b82f6;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Images */
img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1.5em auto;
  border-radius: 4px;
}

/* Tables */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em 0;
}

th, td {
  padding: 0.75em;
  text-align: left;
  border: 1px solid #e5e7eb;
}

th {
  background: #f9fafb;
  font-weight: 600;
  color: #111827;
}

tr:nth-child(even) {
  background: #f9fafb;
}

/* Code */
code {
  font-family: 'Courier New', Courier, monospace;
  background: #f3f4f6;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 0.9em;
}

pre {
  background: #1f2937;
  color: #f9fafb;
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
  margin: 1.5em 0;
}

pre code {
  background: none;
  padding: 0;
  color: inherit;
}

/* Strong and emphasis */
strong, b {
  font-weight: 700;
  color: #111827;
}

em, i {
  font-style: italic;
}

/* Horizontal rule */
hr {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin: 2em 0;
}

/* Print styles */
@media print {
  body {
    max-width: 100%;
    padding: 0;
  }
  
  h1, h2, h3, h4, h5, h6 {
    page-break-after: avoid;
  }
  
  img {
    page-break-inside: avoid;
  }
  
  table {
    page-break-inside: avoid;
  }
}

/* Responsive */
@media (max-width: 768px) {
  body {
    padding: 1rem;
    font-size: 14px;
  }
  
  h1 {
    font-size: 1.875rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  h3 {
    font-size: 1.25rem;
  }
}
`.trim();
}

