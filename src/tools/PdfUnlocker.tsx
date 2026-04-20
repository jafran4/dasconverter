import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowLeft, Unlock, Download, FileUp, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PdfUnlocker = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Unlock className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Unlock PDF</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Remove passwords and restrictions from your PDF documents.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-2xl p-12 hover:border-blue-500/50 transition-colors bg-zinc-50/50 mb-8">
          <FileUp className="w-12 h-12 text-zinc-400 mb-4" />
          <p className="text-zinc-600 mb-4">Select a PDF file to unlock</p>
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

        <div className="space-y-4">
          <label className="block text-sm font-medium text-zinc-700">Enter Current Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password to unlock"
              className="w-full pl-12 pr-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <button
          disabled={files.length === 0 || !password || isProcessing}
          className="w-full mt-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? 'Processing...' : (
            <>
              <Download className="w-5 h-5" />
              Unlock and Download
            </>
          )}
        </button>
      </div>
    </div>
  );
};
