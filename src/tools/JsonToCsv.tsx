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
    answer: "Yes! Das Converters provides a completely free, browser-based JSON to CSV converter. Your data never leaves your computer, ensuring total privacy and security."
  },
  {
    question: "Can json be converted to csv?",
    answer: "Yes, JSON can be converted to CSV easily using our online tool. It takes your structured JSON data and transforms it into a comma-separated values format suitable for spreadsheets."
  },
  {
    question: "Can we convert json to csv?",
    answer: "Absolutely! We can convert json to csv instantly. Just paste your code or upload your file to get started."
  },
  {
    question: "Can you convert csv to json?",
    answer: "Yes, our tool is bi-directional. You can convert csv to json just as easily as converting json to csv."
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
          When working with data, you often need to <strong>convert json to csv</strong> to analyze it in spreadsheet software like Excel or Google Sheets. Our <strong>json to csv converter</strong> is designed to be fast, secure, and easy to use. Whether you are a developer needing to export API data or a data analyst working with <strong>json format to csv</strong>, Das Converters provides a reliable solution. We also support the reverse process, allowing you to <strong>convert csv to json</strong> with a single click.
        </p>
        <p className="text-zinc-600 leading-relaxed mt-4">
          Our tool is a great alternative to writing complex scripts. Instead of searching for how to <strong>python convert json to csv</strong> or <strong>convert json to csv python</strong>, you can simply use our web interface. It's the easiest way to <strong>convert .json to csv</strong>, <strong>convert a json file to csv</strong>, or <strong>convert from json to csv</strong> without any coding knowledge.
        </p>
        <div className="mt-8 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Common Search Terms</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'python convert json to csv', 'convert json to csv python', 'convert .json to csv',
              'convert a json file to csv', 'convert from json to csv', 'python to convert json to csv',
              'convert json file to csv', 'convert json to csv excel', 'convert json to csv in excel',
              'convert json to csv online'
            ].map(keyword => (
              <span key={keyword} className="text-xs text-zinc-400 bg-white px-2 py-1 rounded-md border border-zinc-200">
                {keyword}
              </span>
            ))}
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

      {/* Blog / SEO Section */}
      <div className="mt-16 bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-zinc-900 mb-6">Mastering Data Conversion: JSON to CSV and Beyond</h2>
          <div className="prose prose-zinc prose-lg max-w-none">
            <p>
              In today's data-driven world, the ability to seamlessly move information between different formats is crucial. 
              Our <strong>JSON to CSV Converter</strong> is designed to bridge the gap between developer-friendly JSON 
              and analyst-preferred CSV formats.
            </p>
            
            <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-4">Why Convert JSON to CSV?</h3>
            <p>
              While JSON (JavaScript Object Notation) is the standard for web APIs and modern applications, 
              CSV (Comma-Separated Values) remains the king of data analysis. Tools like Microsoft Excel, 
              Google Sheets, and various BI platforms are optimized for tabular data. Converting your JSON 
              to CSV allows you to:
            </p>
            <ul>
              <li>Perform complex statistical analysis in spreadsheets.</li>
              <li>Import data into legacy systems that don't support JSON.</li>
              <li>Create quick visualizations and charts.</li>
              <li>Share data with non-technical team members in a familiar format.</li>
            </ul>

            <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-4">How Our Converter Works</h3>
            <p>
              Our tool uses advanced flattening algorithms to handle nested JSON structures. When you paste 
              your JSON, we automatically detect the schema and map it to a tabular format. If your JSON 
              contains arrays of objects, each object becomes a row, and its properties become columns.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
