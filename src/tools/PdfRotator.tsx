import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowLeft, RotateCw, Download, FileUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PDFDocument, degrees } from 'pdf-lib';

export const PdfRotator = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const rotatePdf = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const file = files[0];
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      
      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees((currentRotation + 90) % 360));
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `rotated_${file.name}`;
      link.click();
    } catch (error) {
      console.error('Error rotating PDF:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <RotateCw className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Rotate PDF</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Rotate PDF pages sideways or upside-down.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-2xl p-12 hover:border-indigo-500/50 transition-colors bg-zinc-50/50">
          <FileUp className="w-12 h-12 text-zinc-400 mb-4" />
          <p className="text-zinc-600 mb-4">Select a PDF file to rotate</p>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-upload"
          />
          <label
            htmlFor="pdf-upload"
            className="px-6 py-2 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer font-medium"
          >
            Choose File
          </label>
          {files.length > 0 && (
            <p className="mt-4 text-sm text-zinc-500 font-medium">{files[0].name}</p>
          )}
        </div>

        <button
          onClick={rotatePdf}
          disabled={files.length === 0 || isProcessing}
          className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? 'Processing...' : (
            <>
              <Download className="w-5 h-5" />
              Rotate and Download
            </>
          )}
        </button>
      </div>
    </div>
  );
};
