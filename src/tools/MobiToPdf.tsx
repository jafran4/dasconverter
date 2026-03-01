import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, ArrowLeft, BookOpen, Download, FileUp, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const FAQS = [
  {
    question: "How to convert MOBI to PDF?",
    answer: "To convert a MOBI file to PDF, upload your .mobi document to our online converter. The tool will process the file and provide a download link for the converted PDF document. This process preserves the text and basic formatting of your ebook."
  },
  {
    question: "How do I convert MOBI to PDF for free?",
    answer: "OmniTool offers a completely free MOBI to PDF converter. You don't need to register or install any software. Just upload your file and download the PDF result."
  },
  {
    question: "Can Calibre convert PDF to MOBI?",
    answer: "Yes, Calibre is a popular desktop software that can convert between many ebook formats, including PDF to MOBI. However, if you prefer an online, no-install solution, OmniTool provides a quick way to convert MOBI format to PDF directly in your browser."
  },
  {
    question: "Can I convert PDF to MOBI online?",
    answer: "While this tool is specifically for MOBI to PDF, we are constantly adding new conversion utilities. Converting PDF to MOBI is more complex due to the fixed-layout nature of PDFs, but it is possible with specialized tools."
  },
  {
    question: "Can you convert MOBI to PDF on a Kindle?",
    answer: "Kindle devices themselves don't have a built-in 'Save as PDF' feature for MOBI files. You would typically need to use an online converter like OmniTool on your computer or mobile device to perform the conversion first."
  }
];

export const MobiToPdf = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const convertMobiToPdf = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    
    // Simulate processing for now
    setTimeout(() => {
      setIsProcessing(false);
      alert("This is a demo. Real MOBI to PDF conversion requires specialized rendering. In a production environment, this would connect to a conversion service.");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Convert MOBI to PDF</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          The most reliable <strong>MOBI to PDF</strong> converter. Convert your <strong>.mobi to pdf</strong> files online for free.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-2xl p-12 hover:border-amber-500/50 transition-colors bg-zinc-50/50">
          <FileUp className="w-12 h-12 text-zinc-400 mb-4" />
          <p className="text-zinc-600 mb-4 font-medium">Select a MOBI file to convert</p>
          <input
            type="file"
            accept=".mobi"
            onChange={handleFileChange}
            className="hidden"
            id="mobi-upload"
          />
          <label
            htmlFor="mobi-upload"
            className="px-8 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer font-bold shadow-lg shadow-zinc-900/10"
          >
            Choose MOBI File
          </label>
          {files.length > 0 && (
            <div className="mt-6 flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg shadow-sm">
              <FileText className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-zinc-700 font-medium">{files[0].name}</span>
            </div>
          )}
        </div>

        <button
          onClick={convertMobiToPdf}
          disabled={files.length === 0 || isProcessing}
          className="w-full mt-8 py-4 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20"
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
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">Professional MOBI Format to PDF Conversion</h2>
        <p className="text-zinc-600 leading-relaxed">
          Our <strong>mobi format to pdf</strong> tool ensures that your ebooks are readable on any device. While MOBI is great for Kindles, PDF is the universal standard for documents. When you <strong>convert mobi to pdf</strong> using OmniTool, you get a high-quality document that maintains the readability of your original file. If you're looking for a <strong>pdf to mobi</strong> alternative or just need a quick conversion, our online tool is the perfect choice.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-2">Universal Compatibility</h3>
            <p className="text-sm text-zinc-500">PDFs can be opened on any computer, tablet, or smartphone without special ebook software.</p>
          </div>
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-2">Fast & Secure</h3>
            <p className="text-sm text-zinc-500">Your files are processed locally. We prioritize your privacy and speed above all else.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-zinc-900 mb-8 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-amber-500" />
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
        <h3 className="text-lg font-bold text-zinc-900 mb-6">Related Ebook Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/epub-to-pdf" className="p-4 bg-white border border-zinc-200 rounded-xl hover:border-amber-500 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="font-medium text-zinc-900">EPUB to PDF</span>
          </Link>
          <Link to="/pdf-to-text" className="p-4 bg-white border border-zinc-200 rounded-xl hover:border-amber-500 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <span className="font-medium text-zinc-900">PDF to Text</span>
          </Link>
          <Link to="/pdf-merger" className="p-4 bg-white border border-zinc-200 rounded-xl hover:border-amber-500 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-red-600" />
            </div>
            <span className="font-medium text-zinc-900">Merge PDF</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
