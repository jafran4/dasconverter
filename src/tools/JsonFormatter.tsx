import { useState } from 'react';
import { Code, Copy, Check, ArrowLeft, RefreshCw, FileJson, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    if (!input.trim()) return;
    setError(null);
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (err: any) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
    }
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    setError(null);
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (err: any) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
            <Code className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">JSON Formatter</h1>
            <p className="text-zinc-500">Prettify, validate, and minify your JSON data.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-zinc-900 uppercase tracking-wider">Input</label>
              <button 
                onClick={() => setInput('')}
                className="text-xs font-medium text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className="w-full h-[500px] p-6 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all resize-none font-mono text-sm"
            />
            <div className="flex gap-3">
              <button 
                onClick={handleFormat}
                className="flex-1 px-6 py-3 bg-zinc-900 text-white font-semibold rounded-xl hover:bg-zinc-800 transition-all active:scale-95"
              >
                Format JSON
              </button>
              <button 
                onClick={handleMinify}
                className="px-6 py-3 bg-zinc-100 text-zinc-900 font-semibold rounded-xl hover:bg-zinc-200 transition-all active:scale-95"
              >
                Minify
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-zinc-900 uppercase tracking-wider">Output</label>
              <button 
                onClick={handleCopy}
                disabled={!output}
                className="flex items-center gap-2 text-xs font-medium text-purple-600 hover:text-purple-700 disabled:opacity-50"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Output'}
              </button>
            </div>
            <div className="relative">
              <textarea
                readOnly
                value={output}
                placeholder="Formatted output will appear here..."
                className="w-full h-[500px] p-6 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-2xl font-mono text-sm resize-none"
              />
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-4 left-4 right-4 p-4 bg-red-500/10 border border-red-500/20 backdrop-blur-md rounded-xl flex items-center gap-3 text-red-400 text-sm"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
