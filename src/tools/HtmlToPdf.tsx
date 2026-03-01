import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowLeft, Globe, Download, FileUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HtmlToPdf = () => {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Globe className="w-8 h-8 text-cyan-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">HTML to PDF</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Convert webpages or HTML files into PDF documents.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-zinc-700">Enter Website URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
          />
        </div>

        <button
          disabled={!url || isProcessing}
          className="w-full mt-8 py-4 bg-cyan-600 text-white rounded-2xl font-bold hover:bg-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
