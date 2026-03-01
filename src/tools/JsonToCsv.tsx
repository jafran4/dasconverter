import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileJson, ArrowLeft, Download, FileUp, HelpCircle, ChevronDown, ChevronUp, FileSpreadsheet, ArrowRightLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const FAQS = [
  {
    question: "How to convert JSON to CSV?",
    answer: "To convert JSON to CSV, paste your JSON data into the input field or upload a .json file. Our tool will automatically parse the JSON structure and generate a downloadable CSV file. This is perfect for importing data into Excel or Google Sheets."
  },
  {
    question: "How to convert a JSON to CSV with nested objects?",
    answer: "Our JSON to CSV converter handles flat JSON arrays best. For nested objects, the tool will attempt to flatten the structure by using dot notation for keys (e.g., 'user.name')."
  },
  {
    question: "How to convert CSV to JSON?",
    answer: "You can also use this tool to convert CSV to JSON. Simply upload your .csv file, and the tool will convert each row into a JSON object, using the first row as the keys for the properties."
  },
  {
    question: "How to convert JSON into CSV for Excel?",
    answer: "Excel works best with CSV files. By using our json format to csv converter, you can easily transform your web data into a format that Excel can open directly, preserving the tabular structure."
  },
  {
    question: "Can I convert a JSON file to CSV online for free?",
    answer: "Yes! OmniTool provides a completely free, browser-based JSON to CSV converter. Your data never leaves your computer, ensuring total privacy and security."
  }
];

export const JsonToCsv = () => {
  const [inputData, setInputData] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mode, setMode] = useState<'json-to-csv' | 'csv-to-json'>('json-to-csv');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setInputData(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const convertData = () => {
    if (!inputData.trim()) return;
    setIsProcessing(true);

    try {
      if (mode === 'json-to-csv') {
        const json = JSON.parse(inputData);
        const array = Array.isArray(json) ? json : [json];
        
        if (array.length === 0) throw new Error('Empty JSON array');

        const headers = Object.keys(array[0]);
        const csvRows = [
          headers.join(','),
          ...array.map(row => 
            headers.map(fieldName => JSON.stringify(row[fieldName] || '')).join(',')
          )
        ];

        const csvContent = csvRows.join('\n');
        downloadFile(csvContent, 'converted_data.csv', 'text/csv');
      } else {
        const lines = inputData.split('\n');
        const headers = lines[0].split(',');
        const result = lines.slice(1).map(line => {
          const data = line.split(',');
          return headers.reduce((obj: any, header, i) => {
            obj[header.trim()] = data[i]?.trim();
            return obj;
          }, {});
        });

        downloadFile(JSON.stringify(result, null, 2), 'converted_data.json', 'application/json');
      }
    } catch (error) {
      alert('Error processing data. Please check your input format.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileSpreadsheet className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">JSON to CSV Converter</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Convert <strong>JSON to CSV</strong> or <strong>CSV to JSON</strong> instantly. The fastest way to transform your <strong>json format to csv</strong> online for free.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setMode('json-to-csv')}
            className={cn(
              "px-6 py-2 rounded-xl font-medium transition-all",
              mode === 'json-to-csv' ? "bg-zinc-900 text-white shadow-lg" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            )}
          >
            JSON to CSV
          </button>
          <ArrowRightLeft className="w-5 h-5 text-zinc-300" />
          <button
            onClick={() => setMode('csv-to-json')}
            className={cn(
              "px-6 py-2 rounded-xl font-medium transition-all",
              mode === 'csv-to-json' ? "bg-zinc-900 text-white shadow-lg" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            )}
          >
            CSV to JSON
          </button>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <textarea
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder={mode === 'json-to-csv' ? "Paste your JSON here..." : "Paste your CSV here..."}
              className="w-full h-64 p-6 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-mono text-sm"
            />
            <div className="absolute top-4 right-4">
              <input
                type="file"
                accept={mode === 'json-to-csv' ? ".json" : ".csv"}
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-50 cursor-pointer transition-colors shadow-sm"
              >
                <FileUp className="w-4 h-4" />
                Upload File
              </label>
            </div>
          </div>

          <button
            onClick={convertData}
            disabled={!inputData.trim() || isProcessing}
            className="w-full py-4 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20"
          >
            {isProcessing ? 'Processing...' : (
              <>
                <Download className="w-5 h-5" />
                {mode === 'json-to-csv' ? 'Convert JSON to CSV' : 'Convert CSV to JSON'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose prose-zinc max-w-none mb-16">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">Why use our JSON to CSV Converter?</h2>
        <p className="text-zinc-600 leading-relaxed">
          When working with data, you often need to <strong>convert json to csv</strong> to analyze it in spreadsheet software like Excel or Google Sheets. Our <strong>json to csv converter</strong> is designed to be fast, secure, and easy to use. Whether you are a developer needing to export API data or a data analyst working with <strong>json format to csv</strong>, OmniTool provides a reliable solution. We also support the reverse process, allowing you to <strong>convert csv to json</strong> with a single click.
        </p>
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
        <h3 className="text-lg font-bold text-zinc-900 mb-6">Related Data Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/json-formatter" className="p-4 bg-white border border-zinc-200 rounded-xl hover:border-amber-500 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <FileJson className="w-5 h-5 text-amber-600" />
            </div>
            <span className="font-medium text-zinc-900">JSON Formatter</span>
          </Link>
          <Link to="/pdf-to-text" className="p-4 bg-white border border-zinc-200 rounded-xl hover:border-amber-500 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-zinc-600" />
            </div>
            <span className="font-medium text-zinc-900">PDF to Text</span>
          </Link>
          <Link to="/text-converter" className="p-4 bg-white border border-zinc-200 rounded-xl hover:border-amber-500 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <ArrowRightLeft className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="font-medium text-zinc-900">Text Converter</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
