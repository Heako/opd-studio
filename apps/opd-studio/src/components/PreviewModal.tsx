"use client";

import { XMarkIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  html: string;
  css: string;
  onDownload: () => void;
  filename: string;
}

export function PreviewModal({
  isOpen,
  onClose,
  html,
  css,
  onDownload,
  filename,
}: PreviewModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isOpen && iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

      if (iframeDoc) {
        // Inject HTML with CSS
        const fullHtml = html.replace(
          '<link rel="stylesheet" href="styles.css">',
          `<style>${css}</style>`
        );
        
        iframeDoc.open();
        iframeDoc.write(fullHtml);
        iframeDoc.close();
      }
    }
  }, [isOpen, html, css]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Document Preview</h2>
            <p className="text-sm text-gray-500">{filename}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onDownload}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              <span className="font-medium">Download OPD</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close preview"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-hidden bg-gray-100 p-4">
          <div className="h-full bg-white rounded shadow-sm overflow-auto">
            <iframe
              ref={iframeRef}
              className="w-full h-full border-0"
              title="Document Preview"
              sandbox="allow-same-origin"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span>✅ Conversion successful</span>
              <span>🔐 Cryptographically signed</span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Close preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

