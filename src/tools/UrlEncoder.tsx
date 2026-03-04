import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ArrowLeft, Copy, Check, RefreshCw, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UrlEncoder = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (error) {
      setOutput('Error: Invalid URL component');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Globe className="w-8 h-8 text-blue-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">URL Encoder / Decoder</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Safely encode or decode URLs for web development and data transmission. Our tool ensures your URLs are correctly formatted and secure.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setMode('encode')}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${
              mode === 'encode' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${
              mode === 'decode' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            Decode
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Input URL / Text</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter URL to encode...' : 'Enter encoded URL to decode...'}
              className="w-full h-32 p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors resize-none font-mono text-sm"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleProcess}
              className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-100"
            >
              <RefreshCw className="w-5 h-5" />
              {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Output Result</label>
              {output && (
                <button
                  onClick={copyToClipboard}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied!' : 'Copy Result'}
                </button>
              )}
            </div>
            <div className="w-full min-h-[128px] p-4 bg-zinc-900 text-blue-400 rounded-2xl font-mono text-sm break-all">
              {output || <span className="text-zinc-600 italic">Your result will appear here...</span>}
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose prose-zinc max-w-none">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">What is URL Encoding?</h2>
        <p className="text-zinc-600 mb-8">
          URL encoding, also known as percent-encoding, is a mechanism for encoding information in a Uniform Resource Identifier (URI). It's used to convert characters that are not allowed in a URL into a format that can be safely transmitted over the internet.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Web Development</h3>
            <p className="text-zinc-600 text-sm">Correctly encoding query parameters is essential for building robust web applications and ensuring data integrity.</p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Data Transmission</h3>
            <p className="text-zinc-600 text-sm">URL encoding ensures that special characters like spaces, ampersands, and question marks don't break your URLs during transmission.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Why do I need to encode URLs?</h3>
            <p className="text-zinc-600">URLs can only contain a limited set of characters. Special characters like spaces, symbols, and non-ASCII characters must be encoded to be safely interpreted by web servers and browsers.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">What characters are encoded?</h3>
            <p className="text-zinc-600">Characters that have special meaning in a URL (like ?, &, =, #) or characters that are not allowed (like spaces and non-ASCII characters) are converted into a % followed by their hexadecimal value.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Is URL decoding safe?</h3>
            <p className="text-zinc-600">Yes, decoding simply reverses the encoding process. However, you should always be cautious when handling URLs from untrusted sources to avoid potential security risks like cross-site scripting (XSS).</p>
          </div>
        </div>
      </div>
    </div>
  );
};
