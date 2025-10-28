import {
  DocumentTextIcon,
  ShieldCheckIcon,
  CodeBracketIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              OPD Documentation
            </h1>
            <p className="text-xl text-gray-600">
              Learn how to use OPD Studio to convert and manage your documents
            </p>
          </div>

          {/* What is OPD */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <DocumentTextIcon className="w-7 h-7 text-primary-600" />
              What is OPD?
            </h2>
            <div className="bg-white rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                <strong>OPD (Open Portable Document)</strong> is an open, web-native, and cryptographically signed document format designed to progressively replace PDF in digital workflows.
              </p>
              <p className="text-gray-700 mb-4">
                Unlike PDF, OPD documents are:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Open</strong> - No patents, no restrictions, completely free</li>
                <li><strong>Web-native</strong> - Built with HTML, CSS, and JSON-LD</li>
                <li><strong>Signed</strong> - Cryptographically secured with Ed25519</li>
                <li><strong>Accessible</strong> - Semantic structure for screen readers</li>
                <li><strong>Portable</strong> - Single .opd.zip file containing everything</li>
              </ul>
            </div>
          </section>

          {/* How it works */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ArrowPathIcon className="w-7 h-7 text-primary-600" />
              How it works
            </h2>
            <div className="bg-white rounded-lg p-6">
              <div className="space-y-6">
                <Step
                  number={1}
                  title="Upload your DOCX file"
                  description="Drag and drop your Word document into OPD Studio. We support .docx files up to 10 MB."
                />
                <Step
                  number={2}
                  title="Automatic conversion"
                  description="Your document is converted to HTML while preserving formatting (bold, italic, colors, images). Metadata is extracted and JSON-LD is generated."
                />
                <Step
                  number={3}
                  title="Cryptographic signature"
                  description="The document is signed with Ed25519 algorithm, ensuring integrity and authenticity. A SHA-256 hash is computed for each file."
                />
                <Step
                  number={4}
                  title="Preview and download"
                  description="Preview your converted document before downloading. The final .opd.zip file contains HTML, CSS, metadata, signature, and assets."
                />
              </div>
            </div>
          </section>

          {/* File structure */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CodeBracketIcon className="w-7 h-7 text-primary-600" />
              OPD File Structure
            </h2>
            <div className="bg-white rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                An OPD file (.opd.zip) contains:
              </p>
              <div className="bg-gray-900 text-gray-100 rounded p-4 font-mono text-sm overflow-x-auto">
                <pre>{`document.opd.zip/
├── index.html          # Document content (HTML5)
├── styles.css          # Styling (responsive, print-ready)
├── semantics.jsonld    # Metadata (Schema.org)
├── manifest.json       # File hashes (SHA-256)
├── signature.jws       # Cryptographic signature (Ed25519)
├── publickey.json      # Public key for verification
└── assets/             # Images and media files
    ├── image1.png
    └── image2.jpg`}</pre>
              </div>
            </div>
          </section>

          {/* Verification */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldCheckIcon className="w-7 h-7 text-primary-600" />
              Signature Verification
            </h2>
            <div className="bg-white rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                Every OPD document is cryptographically signed. When you open a document in OPD Viewer, you&apos;ll see one of these statuses:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900">✓ Verified</p>
                    <p className="text-sm text-green-700">The document is authentic and hasn&apos;t been modified</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <CheckCircleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-900">⚠ Unverified</p>
                    <p className="text-sm text-yellow-700">The document is not signed (created without signature)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded">
                  <CheckCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-900">✗ Invalid</p>
                    <p className="text-sm text-red-700">The signature is invalid - the document may have been tampered with</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Open Source */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <LockOpenIcon className="w-7 h-7 text-primary-600" />
              Open Source
            </h2>
            <div className="bg-white rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                OPD Core is completely open source and free to use. The project is built with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li><strong>Next.js 14</strong> - React framework for web applications</li>
                <li><strong>Mammoth.js</strong> - DOCX to HTML conversion</li>
                <li><strong>Web Crypto API</strong> - Ed25519 signatures</li>
                <li><strong>fflate</strong> - ZIP compression/decompression</li>
                <li><strong>Schema.org</strong> - Semantic metadata</li>
              </ul>
              <p className="text-gray-700">
                Contribute on <a href="https://github.com/openopd/opd-core" className="text-primary-600 hover:underline">GitHub</a>
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="bg-white rounded-lg divide-y divide-gray-200">
              <FAQ
                question="Is my document uploaded to a server?"
                answer="No! All conversion happens in your browser. Your documents never leave your computer."
              />
              <FAQ
                question="Can I open OPD files in other applications?"
                answer="Yes! OPD files are ZIP archives. You can extract them and open index.html in any web browser."
              />
              <FAQ
                question="What happens to images in my document?"
                answer="Images are extracted and included in the assets/ folder. They're embedded as base64 in the HTML for convenience."
              />
              <FAQ
                question="Is the signature legally binding?"
                answer="The Ed25519 signature ensures document integrity and authenticity. Legal validity depends on your jurisdiction."
              />
              <FAQ
                question="Can I convert other formats besides DOCX?"
                answer="Currently only .docx is supported. Support for ODT, Markdown, and LaTeX is planned for future versions."
              />
            </div>
          </section>

          {/* CTA */}
          <div className="text-center py-8">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              <DocumentTextIcon className="w-5 h-5" />
              Start Converting Documents
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

function FAQ({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="p-6">
      <h3 className="font-semibold text-gray-900 mb-2">{question}</h3>
      <p className="text-gray-600 text-sm">{answer}</p>
    </div>
  );
}

