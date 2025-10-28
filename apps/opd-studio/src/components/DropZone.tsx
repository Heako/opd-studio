"use client";

import { useCallback, useState } from "react";
import { ArrowUpTrayIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  onFileDrop: (file: File) => void;
  isProcessing?: boolean;
}

export function DropZone({ onFileDrop, isProcessing = false }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const docxFile = files.find((file) => 
        file.name.endsWith(".docx") || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );

      if (docxFile) {
        onFileDrop(docxFile);
      } else {
        alert("Please drop a .docx file");
      }
    },
    [onFileDrop]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileDrop(file);
      }
    },
    [onFileDrop]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative border-2 border-dashed rounded-xl p-12 transition-all duration-200",
        isDragging
          ? "border-primary-500 bg-primary-50 scale-[1.02]"
          : "border-gray-300 bg-white hover:border-primary-400 hover:bg-gray-50",
        isProcessing && "opacity-50 pointer-events-none"
      )}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileInput}
        disabled={isProcessing}
      />

      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors",
          isDragging ? "bg-primary-100" : "bg-gray-100"
        )}>
          {isDragging ? (
            <ArrowUpTrayIcon className="w-8 h-8 text-primary-600" />
          ) : (
            <DocumentIcon className="w-8 h-8 text-gray-400" />
          )}
        </div>

        <p className="text-lg font-semibold text-gray-900 mb-2">
          {isDragging ? "Drop your file here" : "Drag and drop your DOCX file"}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          or click to browse your files
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <ArrowUpTrayIcon className="w-5 h-5" />
          <span className="font-medium">Select a file</span>
        </div>
      </label>

      <p className="text-xs text-gray-400 text-center mt-6">
        Accepted formats: .docx • Max size: 10 MB
      </p>
    </div>
  );
}

