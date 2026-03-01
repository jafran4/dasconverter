import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowLeft, Table, Download, FileUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PdfToExcel = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Table className="w-8 h-8 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">PDF to Excel</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Convert your PDF tables into Excel spreadsheets (.xlsx).
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-2xl p-12 hover:border-emerald-500/50 transition-colors bg-zinc-50/50">
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

        <button
          disabled={files.length === 0 || isProcessing}
          className="w-full mt-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? 'Processing...' : (
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
