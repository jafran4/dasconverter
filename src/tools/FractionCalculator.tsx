import React, { useState } from 'react';
import { Calculator, ArrowLeft, Info, HelpCircle, ArrowRightLeft, Scale, Divide } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const FractionCalculator = () => {
  const [num1, setNum1] = useState<string>('');
  const [den1, setDen1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [den2, setDen2] = useState<string>('');
  const [op, setOp] = useState<'+' | '-' | '*' | '/'>('+');
  const [result, setResult] = useState<{ num: number; den: number; simplified: string; decimal: string } | null>(null);

  const gcd = (x: number, y: number): number => {
    return y === 0 ? x : gcd(y, x % y);
  };

  const calculateFraction = () => {
    const n1 = parseInt(num1);
    const d1 = parseInt(den1);
    const n2 = parseInt(num2);
    const d2 = parseInt(den2);
    
    if (d1 === 0 || d2 === 0) {
      alert("Denominator cannot be zero.");
      return;
    }

    if (!isNaN(n1) && !isNaN(d1) && !isNaN(n2) && !isNaN(d2)) {
      let resNum = 0;
      let resDen = 0;

      switch (op) {
        case '+':
          resNum = n1 * d2 + n2 * d1;
          resDen = d1 * d2;
          break;
        case '-':
          resNum = n1 * d2 - n2 * d1;
          resDen = d1 * d2;
          break;
        case '*':
          resNum = n1 * n2;
          resDen = d1 * d2;
          break;
        case '/':
          resNum = n1 * d2;
          resDen = d1 * n2;
          break;
      }

      const common = Math.abs(gcd(resNum, resDen));
      const finalNum = resNum / common;
      const finalDen = resDen / common;

      setResult({
        num: finalNum,
        den: finalDen,
        simplified: `${finalNum} / ${finalDen}`,
        decimal: (resNum / resDen).toFixed(4)
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center">
            <Divide className="w-6 h-6 text-rose-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Fraction Calculator</h1>
            <p className="text-zinc-500">Add, subtract, multiply, and divide fractions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-2 w-24">
                <input 
                  type="number" 
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  placeholder="Num"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all text-center"
                />
                <div className="h-0.5 bg-zinc-300 w-full" />
                <input 
                  type="number" 
                  value={den1}
                  onChange={(e) => setDen1(e.target.value)}
                  placeholder="Den"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all text-center"
                />
              </div>

              <select 
                value={op}
                onChange={(e) => setOp(e.target.value as any)}
                className="px-4 py-3 bg-zinc-100 border border-zinc-200 rounded-xl font-bold text-xl"
              >
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">×</option>
                <option value="/">÷</option>
              </select>

              <div className="flex flex-col gap-2 w-24">
                <input 
                  type="number" 
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  placeholder="Num"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all text-center"
                />
                <div className="h-0.5 bg-zinc-300 w-full" />
                <input 
                  type="number" 
                  value={den2}
                  onChange={(e) => setDen2(e.target.value)}
                  placeholder="Den"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all text-center"
                />
              </div>
            </div>

            <button 
              onClick={calculateFraction}
              className="w-full py-4 bg-rose-500 text-white font-bold rounded-2xl hover:bg-rose-600 transition-all active:scale-[0.98] shadow-lg shadow-rose-500/20"
            >
              Calculate Fraction
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
                <div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Result</p>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <h2 className="text-4xl font-black text-rose-500">{result.num}</h2>
                    <div className="h-1 bg-rose-500 w-24" />
                    <h2 className="text-4xl font-black text-rose-500">{result.den}</h2>
                  </div>
                </div>
                
                <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                  <p className="text-xs text-zinc-400 uppercase font-bold mb-1">Decimal Value</p>
                  <p className="text-xl font-bold text-zinc-900">{result.decimal}</p>
                </div>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <Divide className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter fractions to perform calculations</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">Fractions Made Simple: A Guide to Fraction Arithmetic</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Fractions are a way of representing parts of a whole. While they can be intimidating, understanding how to add, subtract, multiply, and divide fractions is a key part of mathematics.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-rose-500" />
              Adding & Subtracting
            </h3>
            <p className="text-zinc-600 text-sm">
              To add or subtract fractions, you must first find a common denominator. This is done by multiplying the denominators together or finding their least common multiple.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Divide className="w-5 h-5 text-rose-500" />
              Multiplying & Dividing
            </h3>
            <p className="text-zinc-600 text-sm">
              Multiplying fractions is straightforward: multiply the numerators together and the denominators together. To divide, multiply the first fraction by the reciprocal of the second.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Why Use a Fraction Calculator?</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Calculating fractions manually is time-consuming and prone to errors, especially when simplifying the final result. Our fraction calculator provides an instant and accurate way to perform arithmetic on fractions, automatically simplifying the result to its lowest terms.
        </p>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Practical Applications</h3>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Cooking & Baking:</strong> Adjust recipe measurements that use fractions (e.g., 1/2 cup, 3/4 teaspoon).</li>
          <li><strong>Construction & Carpentry:</strong> Work with measurements in inches and fractions of an inch.</li>
          <li><strong>Education:</strong> Check your homework or help your children with their math studies.</li>
          <li><strong>Financial Planning:</strong> Calculate fractional shares of stocks or portions of an investment portfolio.</li>
        </ul>
      </article>
    </div>
  );
};
