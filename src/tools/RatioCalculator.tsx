import React, { useState } from 'react';
import { Calculator, ArrowLeft, Info, HelpCircle, ArrowRightLeft, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const RatioCalculator = () => {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [d, setD] = useState<string>('');
  const [result, setResult] = useState<{ simplified: string; solved: string | null } | null>(null);

  const gcd = (x: number, y: number): number => {
    return y === 0 ? x : gcd(y, x % y);
  };

  const calculateRatio = () => {
    const valA = parseFloat(a);
    const valB = parseFloat(b);
    
    if (valA > 0 && valB > 0) {
      const common = gcd(valA, valB);
      const simplified = `${valA / common} : ${valB / common}`;
      
      let solved = null;
      if (c && !d) {
        const valC = parseFloat(c);
        solved = `d = ${(valB * valC) / valA}`;
      } else if (!c && d) {
        const valD = parseFloat(d);
        solved = `c = ${(valA * valD) / valB}`;
      }

      setResult({
        simplified,
        solved
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Scale className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Ratio Calculator</h1>
            <p className="text-zinc-500">Simplify and solve ratios and proportions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Simplify Ratio (A : B)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  placeholder="A"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <span className="font-bold text-zinc-400">:</span>
                <input 
                  type="number" 
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  placeholder="B"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Solve Proportion (A : B = C : D)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                  placeholder="C"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <span className="font-bold text-zinc-400">:</span>
                <input 
                  type="number" 
                  value={d}
                  onChange={(e) => setD(e.target.value)}
                  placeholder="D"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <p className="text-xs text-zinc-400 italic">Leave one blank to solve for it</p>
            </div>

            <button 
              onClick={calculateRatio}
              className="w-full py-4 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20"
            >
              Calculate Ratio
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
                <div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Simplified Ratio</p>
                  <h2 className="text-6xl font-black text-blue-500">{result.simplified}</h2>
                </div>
                
                {result.solved && (
                  <div className="p-6 bg-blue-500 text-white rounded-2xl shadow-lg">
                    <p className="text-xs uppercase font-bold opacity-80 mb-1">Solved Proportion</p>
                    <p className="text-xl font-bold">{result.solved}</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <Scale className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter values to simplify or solve ratios</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">Ratios and Proportions: A Practical Guide</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Ratios are a fundamental part of mathematics, science, and everyday life. From mixing paint to scaling a recipe, understanding how to simplify and solve ratios is an essential skill.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-500" />
              Simplifying Ratios
            </h3>
            <p className="text-zinc-600 text-sm">
              Simplifying a ratio means finding the smallest whole numbers that represent the same relationship. This is done by dividing both numbers by their greatest common divisor (GCD).
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-blue-500" />
              Solving Proportions
            </h3>
            <p className="text-zinc-600 text-sm">
              A proportion is an equation that states two ratios are equal. If you know three of the four values in a proportion, you can easily solve for the fourth using cross-multiplication.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Practical Applications</h3>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Cooking & Baking:</strong> Scale a recipe up or down while keeping the ingredient proportions the same.</li>
          <li><strong>Photography & Video:</strong> Calculate aspect ratios for different screen sizes and formats.</li>
          <li><strong>Architecture & Design:</strong> Scale blueprints and models to represent real-world dimensions accurately.</li>
          <li><strong>Financial Analysis:</strong> Calculate debt-to-equity ratios or other financial metrics to assess business health.</li>
        </ul>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Why Use a Ratio Calculator?</h3>
        <p className="text-zinc-600 leading-relaxed">
          While the math behind ratios is straightforward, it's easy to make mistakes, especially with large numbers or complex proportions. Our ratio calculator provides an instant and accurate way to simplify and solve ratios, saving you time and ensuring your results are always correct.
        </p>
      </article>
    </div>
  );
};
