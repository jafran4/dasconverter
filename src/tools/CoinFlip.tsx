import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Circle, ArrowLeft, RefreshCw, History } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CoinFlip = () => {
  const [result, setResult] = useState<'Heads' | 'Tails' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [history, setHistory] = useState<('Heads' | 'Tails')[]>([]);

  const flipCoin = () => {
    setIsFlipping(true);
    setResult(null);
    
    setTimeout(() => {
      const newResult = Math.random() < 0.5 ? 'Heads' : 'Tails';
      setResult(newResult);
      setHistory([newResult, ...history].slice(0, 10));
      setIsFlipping(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Circle className="w-8 h-8 text-amber-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Coin Flip Simulator</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Flip a virtual coin to make quick decisions. Heads or Tails? Let fate decide with our fair and random coin flipper.
        </p>
      </div>

      <div className="bg-white p-12 rounded-3xl border border-zinc-200 shadow-sm mb-12 text-center">
        <div className="relative w-48 h-48 mx-auto mb-12 perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={isFlipping ? 'flipping' : result || 'initial'}
              initial={{ rotateY: 0, scale: 0.8, opacity: 0 }}
              animate={{ 
                rotateY: isFlipping ? 1800 : 0, 
                scale: 1, 
                opacity: 1 
              }}
              transition={{ 
                duration: isFlipping ? 1 : 0.5,
                ease: isFlipping ? "easeInOut" : "backOut"
              }}
              className={`w-full h-full rounded-full border-8 flex items-center justify-center text-4xl font-bold shadow-xl ${
                result === 'Heads' 
                  ? 'bg-amber-100 border-amber-400 text-amber-700' 
                  : result === 'Tails'
                    ? 'bg-zinc-100 border-zinc-400 text-zinc-700'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-400'
              }`}
            >
              {isFlipping ? '?' : result || 'Flip'}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={flipCoin}
          disabled={isFlipping}
          className="px-12 py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 mx-auto shadow-lg"
        >
          <RefreshCw className={`w-5 h-5 ${isFlipping ? 'animate-spin' : ''}`} />
          {isFlipping ? 'Flipping...' : 'Flip Coin'}
        </button>
      </div>

      {history.length > 0 && (
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-8 mb-12">
          <div className="flex items-center gap-2 text-zinc-900 font-bold mb-6">
            <History className="w-5 h-5" />
            Recent Flips
          </div>
          <div className="flex flex-wrap gap-3">
            {history.map((res, i) => (
              <div 
                key={i} 
                className={`px-4 py-2 rounded-xl text-sm font-bold border ${
                  res === 'Heads' ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-zinc-50 border-zinc-100 text-zinc-600'
                }`}
              >
                {res}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Content Section */}
      <div className="prose prose-zinc max-w-none">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Why Use a Coin Flip Simulator?</h2>
        <p className="text-zinc-600 mb-8">
          A coin flip is one of the oldest and simplest ways to make a decision between two choices. Our virtual coin flipper provides a fair, unbiased, and convenient way to settle disputes, choose between options, or simply have fun.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Quick Decisions</h3>
            <p className="text-zinc-600 text-sm">Can't decide where to eat or what movie to watch? A quick coin flip can help you move forward instantly.</p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Fair & Random</h3>
            <p className="text-zinc-600 text-sm">Our simulator uses a random number generator to ensure that every flip has an exactly 50/50 chance of landing on Heads or Tails.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Is the coin flip really 50/50?</h3>
            <p className="text-zinc-600">Yes, our algorithm uses a high-quality random number generator to ensure that both Heads and Tails have an equal probability of appearing.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Can I flip more than one coin?</h3>
            <p className="text-zinc-600">Currently, our simulator flips one coin at a time, which is the most common way to make a binary decision.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Where did coin flipping originate?</h3>
            <p className="text-zinc-600">Coin flipping, or "heads or tails," has been used for centuries, with origins dating back to the Roman Empire, where it was known as "navia aut caput" (ship or head).</p>
          </div>
        </div>
      </div>
    </div>
  );
};
