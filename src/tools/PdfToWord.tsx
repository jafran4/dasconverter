import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowLeft, FileOutput, Download, FileUp, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as pdfjs from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun } from 'docx';

// Set worker path for PDF.js using a reliable CDN link
const PDFJS_VERSION = '5.4.624';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

export const PdfToWord = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
      setError(null);
    }
  };

  const convertToWord = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setError(null);

    try {
      const file = files[0];
      const arrayBuffer = await file.arrayBuffer();
      
      // Load PDF with additional config for better compatibility
      const loadingTask = pdfjs.getDocument({ 
        data: arrayBuffer,
        cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/cmaps/`,
        cMapPacked: true,
        standardFontDataUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/standard_fonts/`,
      });
      
      const pdf = await loadingTask.promise;
      
      const docSections = [];
      
      // Extract text from each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Group text items by their vertical position (y-coordinate) to maintain some structure
        const items = textContent.items as any[];
        const lines: { [key: number]: string[] } = {};
        
        items.forEach((item) => {
          // Some items might not have str property if they are not text
          if (typeof item.str !== 'string') return;
          
          const y = Math.round(item.transform[5]);
          if (!lines[y]) lines[y] = [];
          lines[y].push(item.str);
        });

        // Sort lines by y-coordinate (descending) and join items in each line
        const sortedY = Object.keys(lines).map(Number).sort((a, b) => b - a);
        
        // If no text found on page, add a placeholder or skip
        if (sortedY.length === 0) {
          docSections.push({
            properties: {},
            children: [new Paragraph({ children: [new TextRun(" ")] })],
          });
          continue;
        }

        const pageParagraphs = sortedY.map((y) => {
          return new Paragraph({
            children: [new TextRun(lines[y].join(' '))],
          });
        });

        docSections.push({
          properties: {},
          children: pageParagraphs,
        });
      }

      // Create Word document
      const doc = new Document({
        sections: docSections,
      });

      // Generate and download file
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name.replace(/\.pdf$/i, '') + '.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (err: any) {
      console.error('Conversion error:', err);
      setError(`Failed to convert PDF: ${err.message || 'Unknown error'}. Please make sure it is a valid, non-encrypted PDF file.`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileOutput className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">PDF to Word</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Convert your PDF documents into editable Word files (.docx).
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-2xl p-12 hover:border-blue-500/50 transition-colors bg-zinc-50/50">
          <FileUp className="w-12 h-12 text-zinc-400 mb-4" />
          <p className="text-zinc-600 mb-4">Select a PDF file to convert</p>
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

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <button
          onClick={convertToWord}
          disabled={files.length === 0 || isProcessing}
          className="w-full mt-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Convert and Download
            </>
          )}
        </button>
      </div>
    </div>
  );
};
