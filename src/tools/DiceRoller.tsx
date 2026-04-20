import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Square, ArrowLeft, RefreshCw, History } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DiceRoller = () => {
  const [diceCount, setDiceCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useState<number[][]>([]);

  const rollDice = () => {
    setIsRolling(true);
    setResults([]);
    
    setTimeout(() => {
      const newResults = [];
      for (let i = 0; i < diceCount; i++) {
        newResults.push(Math.floor(Math.random() * 6) + 1);
      }
      setResults(newResults);
      setHistory([newResults, ...history].slice(0, 10));
      setIsRolling(false);
    }, 800);
  };

  const total = results.reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Square className="w-8 h-8 text-indigo-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Dice Roller</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Roll one or more six-sided dice for your board games, tabletop RPGs, or decision making. Fair, random, and fun.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <div className="flex justify-center gap-4 mb-12">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => setDiceCount(num)}
              className={`w-12 h-12 rounded-xl font-bold transition-all ${
                diceCount === num 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {num}
            </button>
          ))}
          <span className="flex items-center text-sm font-bold text-zinc-400 ml-2 uppercase tracking-wider">Dice</span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12 min-h-[120px] items-center">
          <AnimatePresence mode="popLayout">
            {results.length > 0 ? (
              results.map((val, i) => (
                <motion.div
                  key={`${val}-${i}`}
                  initial={{ rotate: -180, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 180, scale: 0, opacity: 0 }}
                  transition={{ delay: i * 0.1, type: 'spring' }}
                  className="w-24 h-24 bg-white border-4 border-indigo-100 rounded-3xl flex items-center justify-center text-4xl font-bold text-indigo-600 shadow-xl shadow-indigo-50"
                >
                  {val}
                </motion.div>
              ))
            ) : (
              <div className="text-zinc-400 font-medium italic">Your dice results will appear here</div>
            )}
          </AnimatePresence>
        </div>

        {results.length > 1 && (
          <div className="text-center mb-8">
            <span className="text-zinc-500 font-medium uppercase tracking-widest text-xs">Total Sum</span>
            <div className="text-3xl font-bold text-zinc-900">{total}</div>
          </div>
        )}

        <button
          onClick={rollDice}
          disabled={isRolling}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
        >
          <RefreshCw className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`} />
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </div>

      {history.length > 0 && (
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-8 mb-12">
          <div className="flex items-center gap-2 text-zinc-900 font-bold mb-6">
            <History className="w-5 h-5" />
            Recent Rolls
          </div>
          <div className="space-y-3">
            {history.map((roll, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                <span className="text-xs font-bold text-zinc-400 w-8">#{history.length - i}</span>
                <div className="flex gap-2 flex-1">
                  {roll.map((val, j) => (
                    <span key={j} className="w-8 h-8 bg-white border border-zinc-200 rounded-lg flex items-center justify-center text-sm font-bold text-zinc-700">
                      {val}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-bold text-zinc-900">Sum: {roll.reduce((a, b) => a + b, 0)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Content Section */}
      <div className="prose prose-zinc max-w-none">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Why Use an Online Dice Roller?</h2>
        <p className="text-zinc-600 mb-8">
          Whether you've lost your physical dice or simply prefer a digital solution, our online dice roller provides a fair and random way to generate results. Perfect for board games, tabletop RPGs like Dungeons & Dragons, or any situation where you need a random number between 1 and 6.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Board Game Night</h3>
            <p className="text-zinc-600 text-sm">Never let a missing die ruin your game night. Our simulator allows you to roll up to 5 dice at once with instant sum calculation.</p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Fair & Random</h3>
            <p className="text-zinc-600 text-sm">Our dice roller uses a high-quality random number generator to ensure that every roll is completely unbiased and fair.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Are the dice rolls truly random?</h3>
            <p className="text-zinc-600">Yes, our tool uses the standard JavaScript `Math.random()` function, which provides a high degree of pseudo-randomness suitable for gaming and decision making.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Can I roll different types of dice (e.g., D20)?</h3>
            <p className="text-zinc-600">Currently, our simulator focuses on the standard six-sided die (D6), which is the most common type used in board games.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">How many dice can I roll at once?</h3>
            <p className="text-zinc-600">You can roll between 1 and 5 dice simultaneously, and our tool will automatically calculate the total sum for you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
