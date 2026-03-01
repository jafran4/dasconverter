import React, { useState } from 'react';
import { Percent, ArrowLeft, Info, HelpCircle, Calculator, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const PercentageCalculator = () => {
  const [val1, setVal1] = useState<string>('');
  const [val2, setVal2] = useState<string>('');
  const [result, setResult] = useState<{ value: number; type: 'increase' | 'decrease' | 'none' } | null>(null);

  const calculatePercentage = () => {
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);
    
    if (v1 > 0 && v2 >= 0) {
      const diff = v2 - v1;
      const percent = (diff / v1) * 100;
      
      setResult({
        value: parseFloat(Math.abs(percent).toFixed(2)),
        type: percent > 0 ? 'increase' : percent < 0 ? 'decrease' : 'none'
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
          <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center">
            <Percent className="w-6 h-6 text-rose-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Percentage Change Calculator</h1>
            <p className="text-zinc-500">Calculate percentage increase or decrease</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Original Value</label>
              <input 
                type="number" 
                value={val1}
                onChange={(e) => setVal1(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">New Value</label>
              <input 
                type="number" 
                value={val2}
                onChange={(e) => setVal2(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
              />
            </div>

            <button 
              onClick={calculatePercentage}
              className="w-full py-4 bg-rose-500 text-white font-bold rounded-2xl hover:bg-rose-600 transition-all active:scale-[0.98] shadow-lg shadow-rose-500/20"
            >
              Calculate Percentage Change
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
                <div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Percentage Change</p>
                  <div className="flex items-center justify-center gap-3">
                    {result.type === 'increase' && <TrendingUp className="w-8 h-8 text-emerald-500" />}
                    {result.type === 'decrease' && <TrendingDown className="w-8 h-8 text-rose-500" />}
                    <h2 className={cn(
                      "text-6xl font-black",
                      result.type === 'increase' ? "text-emerald-500" : result.type === 'decrease' ? "text-rose-500" : "text-zinc-900"
                    )}>
                      {result.value}%
                    </h2>
                  </div>
                  <p className="mt-2 font-bold text-zinc-500 uppercase tracking-wider">
                    {result.type === 'increase' ? 'Increase' : result.type === 'decrease' ? 'Decrease' : 'No Change'}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <Percent className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter values to see the percentage difference</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">Percentage Change: A Key Metric for Success</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Whether you're tracking business growth, stock market performance, or your own personal fitness progress, understanding percentage change is a fundamental skill for data-driven decision-making.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Growth Tracking
            </h3>
            <p className="text-zinc-600 text-sm">
              Calculate the percentage increase in your revenue or website traffic to measure the effectiveness of your marketing strategies.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-rose-500" />
              Cost Reduction
            </h3>
            <p className="text-zinc-600 text-sm">
              Monitor the percentage decrease in your expenses to identify areas where you can save money and improve your bottom line.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">How to Calculate Percentage Change Manually</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          The formula for percentage change is simple:
        </p>
        <div className="bg-zinc-900 text-zinc-100 p-6 rounded-2xl font-mono text-sm mb-8">
          Percentage Change = ((New Value - Original Value) / Original Value) × 100
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Practical Applications</h3>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Financial Markets:</strong> Calculate the daily percentage change in stock prices or cryptocurrency values.</li>
          <li><strong>Retail & Sales:</strong> Determine the percentage discount on a product or the increase in sales during a promotion.</li>
          <li><strong>Health & Fitness:</strong> Track the percentage change in your weight, body fat, or strength over time.</li>
        </ul>
      </article>
    </div>
  );
};
