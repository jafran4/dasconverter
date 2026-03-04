import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hash, ArrowLeft, RefreshCw, Settings, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RandomNumberPicker = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateNumbers = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newNumbers = [];
      for (let i = 0; i < count; i++) {
        newNumbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
      setNumbers(newNumbers);
      setIsGenerating(false);
    }, 500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(numbers.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Hash className="w-8 h-8 text-emerald-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Random Number Picker</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Generate random numbers within your specified range. Perfect for giveaways, games, and decision making.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Minimum</label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(parseInt(e.target.value) || 0)}
            className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors font-bold"
          />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Maximum</label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(parseInt(e.target.value) || 0)}
            className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors font-bold"
          />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">How Many?</label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors font-bold"
          />
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <div className="flex flex-wrap justify-center gap-4 mb-8 min-h-[120px] items-center">
          <AnimatePresence mode="popLayout">
            {numbers.length > 0 ? (
              numbers.map((num, i) => (
                <motion.div
                  key={`${num}-${i}`}
                  initial={{ scale: 0, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: i * 0.05, type: 'spring' }}
                  className="w-20 h-20 bg-emerald-50 rounded-2xl border-2 border-emerald-100 flex items-center justify-center text-3xl font-bold text-emerald-700 shadow-sm"
                >
                  {num}
                </motion.div>
              ))
            ) : (
              <div className="text-zinc-400 font-medium italic">Your random numbers will appear here</div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-4">
          <button
            onClick={generateNumbers}
            disabled={isGenerating}
            className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100"
          >
            <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : 'Generate Numbers'}
          </button>
          {numbers.length > 0 && (
            <button
              onClick={copyToClipboard}
              className="px-6 py-4 bg-zinc-100 text-zinc-900 rounded-2xl font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose prose-zinc max-w-none">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">How to Use Our Random Number Picker?</h2>
        <p className="text-zinc-600 mb-8">
          Our random number generator is designed to be simple and effective. Whether you need a single number for a quick decision or a list of numbers for a complex giveaway, we've got you covered. Simply set your minimum and maximum values, choose how many numbers you need, and click generate.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Fair Giveaways</h3>
            <p className="text-zinc-600 text-sm">Ensure transparency and fairness in your contests by using a truly random number generator to pick winners.</p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Educational Tool</h3>
            <p className="text-zinc-600 text-sm">Teachers can use this tool to randomly select students for participation or to generate data for math problems.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Is this generator truly random?</h3>
            <p className="text-zinc-600">Our tool uses the standard JavaScript `Math.random()` function, which provides a high degree of pseudo-randomness suitable for most everyday needs.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Can I generate duplicate numbers?</h3>
            <p className="text-zinc-600">Yes, since each number is generated independently, duplicates are possible, especially if the range is small compared to the count.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">What is the maximum range?</h3>
            <p className="text-zinc-600">You can set almost any range you need, from negative numbers to very large integers, as long as they fit within standard computer memory limits.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
