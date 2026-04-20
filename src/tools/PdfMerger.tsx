import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Dropzone } from '@/src/components/Dropzone';
import { FileText, Download, Loader2, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const PdfMerger = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = (acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
    setError(null);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      setError('Please select at least two PDF files to merge.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `merged_${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError('An error occurred while merging the PDFs. Please make sure all files are valid PDF documents.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">PDF Merger</h1>
            <p className="text-zinc-500">Combine multiple PDF documents into one.</p>
          </div>
        </div>

        <Dropzone 
          accept={{ 'application/pdf': ['.pdf'] }}
          onDrop={handleFiles}
          files={files}
          onRemove={removeFile}
          label="Drop PDF files here"
          className="mb-8"
        />

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl mb-8 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setFiles([])}
            disabled={files.length === 0 || isProcessing}
            className="px-6 py-3 text-zinc-600 hover:text-zinc-900 font-medium transition-colors disabled:opacity-50"
          >
            Clear All
          </button>
          <button
            onClick={mergePdfs}
            disabled={files.length < 2 || isProcessing}
            className={cn(
              "px-8 py-3 bg-zinc-900 text-white font-semibold rounded-2xl transition-all flex items-center gap-2",
              "hover:bg-zinc-800 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            )}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Merging...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Merge & Download
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-zinc-50 rounded-2xl">
          <h3 className="font-semibold text-zinc-900 mb-2">Browser-based</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">Your files never leave your computer. All processing happens locally in your browser.</p>
        </div>
        <div className="p-6 bg-zinc-50 rounded-2xl">
          <h3 className="font-semibold text-zinc-900 mb-2">Secure & Private</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">No data is uploaded to any server. Your privacy is guaranteed by the browser's sandbox.</p>
        </div>
        <div className="p-6 bg-zinc-50 rounded-2xl">
          <h3 className="font-semibold text-zinc-900 mb-2">Fast & Free</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">Merge large PDF files in seconds without any limits or hidden costs.</p>
        </div>
      </div>
    </div>
  );
};
