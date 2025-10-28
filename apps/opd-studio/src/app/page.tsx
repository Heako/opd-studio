"use client";

import { useState } from "react";
import {
  DocumentArrowUpIcon,
  DocumentTextIcon,
  LockOpenIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  EyeIcon
} from "@heroicons/react/24/outline";
import { DropZone } from "@/components/DropZone";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PreviewModal } from "@/components/PreviewModal";
import { useDocxConverter, ConversionResult } from "@/hooks/useDocxConverter";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [conversionStatus, setConversionStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);
  const { isProcessing, progress, convertDocx, downloadOpd } = useDocxConverter();

  const handleFileDrop = async (droppedFile: File) => {
    setFile(droppedFile);
    setConversionStatus("idle");
    setErrorMessage("");
    setShowPreview(false);

    const result = await convertDocx(droppedFile);
    setConversionResult(result);

    if (result.success && result.data) {
      setConversionStatus("success");
      // Show preview instead of auto-download
      setShowPreview(true);
    } else {
      setConversionStatus("error");
      setErrorMessage(result.error || "Conversion error");
    }
  };

  const handleDownload = () => {
    if (conversionResult?.data && file) {
      downloadOpd(conversionResult.data, file.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <DocumentTextIcon className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              OPD Studio
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Convert your DOCX documents to open, signed, and accessible OPD format
            </p>
          </div>

          {/* Drop Zone */}
          <DropZone onFileDrop={handleFileDrop} isProcessing={isProcessing} />

          {/* File Info */}
          {file && (
            <div className="mt-8 p-6 bg-white rounded-lg">
              <div className="flex items-start gap-4">
                <DocumentArrowUpIcon className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Selected file
                  </h3>
                  <p className="text-sm text-gray-600">{file.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>

                  {/* Progress Bar */}
                  {isProcessing && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Converting...</span>
                        <span className="text-sm font-medium text-primary-600">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Success Message */}
                  {conversionStatus === "success" && !isProcessing && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircleIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">Conversion successful!</span>
                      </div>
                      <button
                        onClick={() => setShowPreview(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                      >
                        <EyeIcon className="w-4 h-4" />
                        Preview Document
                      </button>
                    </div>
                  )}

                  {/* Error Message */}
                  {conversionStatus === "error" && !isProcessing && (
                    <div className="mt-4 flex items-start gap-2 text-red-600">
                      <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Conversion error</p>
                        <p className="text-xs mt-1">{errorMessage}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<LockOpenIcon className="w-10 h-10" />}
              title="Open"
              description="Free format, no patents or restrictions"
            />
            <FeatureCard
              icon={<GlobeAltIcon className="w-10 h-10" />}
              title="Web-native"
              description="Works in all modern browsers"
            />
            <FeatureCard
              icon={<ShieldCheckIcon className="w-10 h-10" />}
              title="Signed"
              description="Guaranteed cryptographic integrity"
            />
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      {conversionResult?.html && conversionResult?.css && file && (
        <PreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          html={conversionResult.html}
          css={conversionResult.css}
          onDownload={handleDownload}
          filename={file.name}
        />
      )}

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center p-6 bg-white rounded-lg">
      <div className="flex justify-center items-center mb-4 text-primary-600">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

