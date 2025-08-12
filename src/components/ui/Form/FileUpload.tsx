"use client";

import React, { useState, useRef } from "react";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept,
  multiple = false,
  label = "Clicca per caricare o trascina qui i file",
  className = ""
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gestisce il click sull'area di upload
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Gestisce la selezione file tramite input
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  // Gestisce il drag enter
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  // Gestisce il drag leave
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // Gestisce il drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Gestisce il drop dei file
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  // Rimuove il file selezionato
  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Formatta la dimensione del file
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Area di upload */}
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all duration-200 font-sans
          ${isDragging 
            ? 'bg-primary/5 border-primary' 
            : 'border-gray-300 hover:border-primary hover:bg-gray-50'
          }
        `}
      >
        {/* Input file nascosto */}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Upload file"
        />

        {!selectedFile ? (
          <>
            {/* Icona di upload */}
            <svg 
              className={`w-12 h-12 mb-4 transition-colors ${isDragging ? 'text-primary' : 'text-gray-400'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
              />
            </svg>

            {/* Testo label */}
            <p className={`text-sm mb-2 text-center transition-colors ${isDragging ? 'text-primary' : 'text-gray-600'}`}>
              {label}
            </p>

            {/* Informazioni sui tipi di file */}
            {accept && (
              <p className="text-xs text-gray-400 text-center">
                Formati supportati: {accept.split(',').map(type => type.trim()).join(', ')}
              </p>
            )}
          </>
        ) : (
          /* File selezionato */
          <div className="flex items-center gap-4 w-full max-w-md">
            {/* Icona file */}
            <div className="flex-shrink-0">
              {selectedFile.type.startsWith('image/') ? (
                <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
              )}
            </div>

            {/* Info file */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>

            {/* Pulsante rimuovi */}
            <button
              type="button"
              onClick={handleRemoveFile}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors rounded"
              aria-label="Rimuovi file"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;