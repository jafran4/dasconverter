import { useState } from 'react';
import { Type, Copy, Check, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const TextConverter = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const convertToUpperCase = () => setText(text.toUpperCase());
  const convertToLowerCase = () => setText(text.toLowerCase());
  const convertToTitleCase = () => {
    setText(text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
  };
  const convertToSentenceCase = () => {
    setText(text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase()));
  };
  const convertToSnakeCase = () => {
    setText(text.toLowerCase().replace(/\s+/g, '_'));
  };
  const convertToKebabCase = () => {
    setText(text.toLowerCase().replace(/\s+/g, '-'));
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
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
            <Type className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Text Case Converter</h1>
            <p className="text-zinc-500">Easily transform your text between different cases.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="w-full h-64 p-6 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all resize-none font-sans text-lg"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleCopy}
                disabled={!text}
                className="p-2 bg-white border border-zinc-200 rounded-xl shadow-sm hover:bg-zinc-50 transition-colors disabled:opacity-50"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5 text-zinc-400" />}
              </button>
              <button
                onClick={() => setText('')}
                disabled={!text}
                className="p-2 bg-white border border-zinc-200 rounded-xl shadow-sm hover:bg-zinc-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <button onClick={convertToUpperCase} className="px-4 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-medium rounded-xl transition-colors text-sm">UPPERCASE</button>
            <button onClick={convertToLowerCase} className="px-4 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-medium rounded-xl transition-colors text-sm">lowercase</button>
            <button onClick={convertToTitleCase} className="px-4 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-medium rounded-xl transition-colors text-sm">Title Case</button>
            <button onClick={convertToSentenceCase} className="px-4 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-medium rounded-xl transition-colors text-sm">Sentence case</button>
            <button onClick={convertToSnakeCase} className="px-4 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-medium rounded-xl transition-colors text-sm">snake_case</button>
            <button onClick={convertToKebabCase} className="px-4 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-medium rounded-xl transition-colors text-sm">kebab-case</button>
          </div>
        </div>
      </div>
    </div>
  );
};
