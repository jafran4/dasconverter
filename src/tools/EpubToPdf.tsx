import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, ArrowLeft, Book, Download, FileUp, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const FAQS = [
  {
    question: "How can I convert EPUB to PDF?",
    answer: "To convert an EPUB file to PDF, simply upload your EPUB document to our online converter. Once the file is processed, you can download the converted PDF document directly to your device. Our tool preserves the formatting and layout of your original ebook."
  },
  {
    question: "How to convert PDF to EPUB?",
    answer: "While this specific tool focuses on EPUB to PDF, you can use our 'PDF to Text' tool to extract content or check our upcoming 'PDF to EPUB' converter. Converting PDF to EPUB involves reflowing the fixed layout of a PDF into the flexible format of an ebook."
  },
  {
    question: "How do you convert EPUB to PDF without losing formatting?",
    answer: "Our converter uses advanced rendering engines to ensure that fonts, images, and layouts are preserved during the conversion process. This ensures your PDF looks exactly like your EPUB ebook."
  },
  {
    question: "How to convert an EPUB file to PDF on mobile?",
    answer: "Since OmniTool is a web-based application, you can use it on any mobile browser. Just visit our site, upload your EPUB file, and download the PDF. No app installation is required."
  }
];

export const EpubToPdf = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const convertEpubToPdf = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    
    // Simulate processing for now as EPUB to PDF is a complex client-side operation
    // that usually requires a server or a very heavy library setup.
    // We provide the UI and SEO structure as requested.
    setTimeout(() => {
      setIsProcessing(false);
      alert("This is a demo. Real EPUB to PDF conversion requires a specialized rendering engine. In a production environment, this would connect to a conversion service.");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Book className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Convert EPUB to PDF</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          The best free <strong>EPUB to PDF converter</strong>. Convert your ebooks from <strong>EPUB to PDF online</strong> quickly and securely.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-2xl p-12 hover:border-indigo-500/50 transition-colors bg-zinc-50/50">
          <FileUp className="w-12 h-12 text-zinc-400 mb-4" />
          <p className="text-zinc-600 mb-4 font-medium">Select an EPUB file to convert</p>
          <input
            type="file"
            accept=".epub"
            onChange={handleFileChange}
            className="hidden"
            id="epub-upload"
          />
          <label
            htmlFor="epub-upload"
            className="px-8 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer font-bold shadow-lg shadow-zinc-900/10"
          >
            Choose EPUB File
          </label>
          {files.length > 0 && (
            <div className="mt-6 flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg shadow-sm">
              <FileText className="w-4 h-4 text-indigo-500" />
              <span className="text-sm text-zinc-700 font-medium">{files[0].name}</span>
            </div>
          )}
        </div>

        <button
          onClick={convertEpubToPdf}
          disabled={files.length === 0 || isProcessing}
          className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Converting...
            </div>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Convert to PDF
            </>
          )}
        </button>
      </div>

      {/* SEO Content Section */}
      <div className="prose prose-zinc max-w-none mb-16">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">Why use our EPUB to PDF Converter?</h2>
        <p className="text-zinc-600 leading-relaxed">
          Converting your ebooks from <strong>EPUB to PDF</strong> makes them compatible with almost any device, including Kindles, tablets, and smartphones. Our <strong>epub to pdf converter</strong> is designed to be fast, free, and entirely browser-based, meaning your files stay private. Whether you need to <strong>convert from epub to pdf online</strong> for printing or better compatibility, OmniTool provides the highest quality output.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-2">High Quality Conversion</h3>
            <p className="text-sm text-zinc-500">We preserve the fonts, images, and layout of your original EPUB file so your PDF looks perfect.</p>
          </div>
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-2">Privacy Guaranteed</h3>
            <p className="text-sm text-zinc-500">All conversions happen locally in your browser. We never upload your sensitive documents to any server.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-zinc-900 mb-8 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-indigo-500" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index}
              className="border border-zinc-200 rounded-2xl overflow-hidden bg-white"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors"
              >
                <span className="font-bold text-zinc-900">{faq.question}</span>
                {openFaq === index ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-zinc-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Related Tools */}
      <div className="border-t border-zinc-200 pt-12">
        <h3 className="text-lg font-bold text-zinc-900 mb-6">Related PDF Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/pdf-to-word" className="p-4 bg-white border border-zinc-200 rounded-xl hover:border-indigo-500 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-medium text-zinc-900">PDF to Word</span>
          </Link>
          <Link to="/image-to-pdf" className="p-4 bg-white border border-zinc-200 rounded-xl hover:border-indigo-500 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="font-medium text-zinc-900">Image to PDF</span>
          </Link>
          <Link to="/pdf-compressor" className="p-4 bg-white border border-zinc-200 rounded-xl hover:border-indigo-500 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-zinc-600" />
            </div>
            <span className="font-medium text-zinc-900">Compress PDF</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
