import React, { useState } from 'react';
import { Target, ArrowLeft, Info, HelpCircle, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const IdealWeightCalculator = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculateIdealWeight = () => {
    const h = parseFloat(height);
    
    if (h > 0) {
      // Convert cm to inches
      const inches = h / 2.54;
      const inchesOver5Feet = Math.max(0, inches - 60);
      
      let ibw = 0;
      if (gender === 'male') {
        // Robinson Formula (1983)
        ibw = 52 + (1.9 * inchesOver5Feet);
      } else {
        // Robinson Formula (1983)
        ibw = 49 + (1.7 * inchesOver5Feet);
      }
      
      setResult(Math.round(ibw));
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
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
            <Target className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Ideal Weight Calculator</h1>
            <p className="text-zinc-500">Based on Age & Height for Men & Women</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Gender</label>
              <div className="flex gap-3">
                <button 
                  onClick={() => setGender('male')}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-semibold transition-all border",
                    gender === 'male' ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100"
                  )}
                >
                  Male
                </button>
                <button 
                  onClick={() => setGender('female')}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-semibold transition-all border",
                    gender === 'female' ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100"
                  )}
                >
                  Female
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Age</label>
                <input 
                  type="number" 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Years"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Height (cm)</label>
                <input 
                  type="number" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="cm"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <button 
              onClick={calculateIdealWeight}
              className="w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20"
            >
              Calculate Ideal Weight
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Your Ideal Weight</p>
                <h2 className="text-6xl font-black mb-4 text-emerald-500">{result}</h2>
                <p className="text-zinc-900 font-bold text-lg mb-6">kg</p>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[240px]">
                  Estimated using the Robinson Formula. This is a general guideline for a healthy weight.
                </p>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter your details to see your ideal weight result</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">What is My Ideal Weight? A Guide for All Ages</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Ideal Body Weight (IBW) was originally introduced to estimate dosages for medical treatments. Today, it is commonly used as a target for people looking to improve their health and fitness.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-500" />
              The Robinson Formula
            </h3>
            <p className="text-zinc-600 text-sm">
              Our calculator uses the Robinson Formula, which is one of the most popular methods for calculating IBW. It provides a slightly more modern estimate than the older Devine formula.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-emerald-500" />
              Beyond the Number
            </h3>
            <p className="text-zinc-600 text-sm">
              Remember that "ideal weight" is just an estimate. Factors like muscle mass, bone density, and overall body composition play a huge role in what a healthy weight looks like for you.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Why Ideal Weight Matters</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Maintaining a weight close to your "ideal" range can reduce the risk of many health conditions, including:
        </p>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li>High blood pressure and heart disease</li>
          <li>Type 2 diabetes</li>
          <li>Joint pain and osteoarthritis</li>
          <li>Sleep apnea</li>
          <li>Certain types of cancer</li>
        </ul>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Ideal Weight for Teenagers</h3>
        <p className="text-zinc-600 leading-relaxed">
          For teenagers, ideal weight is much more variable due to growth spurts and hormonal changes. It is best to use BMI-for-age percentiles to track healthy growth rather than a single "ideal weight" number.
        </p>
      </article>
    </div>
  );
};
