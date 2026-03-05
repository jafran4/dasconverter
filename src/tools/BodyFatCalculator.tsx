import React, { useState } from 'react';
import { Scale, ArrowLeft, Info, HelpCircle, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const BodyFatCalculator = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState<string>('');
  const [neck, setNeck] = useState<string>('');
  const [waist, setWaist] = useState<string>('');
  const [hip, setHip] = useState<string>('');
  const [result, setResult] = useState<{ percentage: number; category: string; color: string } | null>(null);

  const calculateBodyFat = () => {
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const w = parseFloat(waist);
    const hp = parseFloat(hip);
    
    if (h > 0 && n > 0 && w > 0) {
      let bodyFat = 0;
      if (gender === 'male') {
        // US Navy Formula for Men
        bodyFat = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
      } else if (hp > 0) {
        // US Navy Formula for Women
        bodyFat = 163.205 * Math.log10(w + hp - n) - 97.684 * Math.log10(h) - 78.387;
      } else {
        return;
      }

      let category = '';
      let color = '';

      if (gender === 'male') {
        if (bodyFat < 6) { category = 'Essential Fat'; color = 'text-blue-500'; }
        else if (bodyFat < 14) { category = 'Athletes'; color = 'text-emerald-500'; }
        else if (bodyFat < 18) { category = 'Fitness'; color = 'text-emerald-600'; }
        else if (bodyFat < 25) { category = 'Average'; color = 'text-amber-500'; }
        else { category = 'Obese'; color = 'text-rose-500'; }
      } else {
        if (bodyFat < 14) { category = 'Essential Fat'; color = 'text-blue-500'; }
        else if (bodyFat < 21) { category = 'Athletes'; color = 'text-emerald-500'; }
        else if (bodyFat < 25) { category = 'Fitness'; color = 'text-emerald-600'; }
        else if (bodyFat < 32) { category = 'Average'; color = 'text-amber-500'; }
        else { category = 'Obese'; color = 'text-rose-500'; }
      }

      setResult({ percentage: parseFloat(bodyFat.toFixed(1)), category, color });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Scale className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Body Fat Calculator</h1>
            <p className="text-zinc-500">Estimate body fat percentage for Men & Women</p>
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
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Height (cm)</label>
                <input 
                  type="number" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="cm"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Neck (cm)</label>
                <input 
                  type="number" 
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                  placeholder="cm"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Waist (cm)</label>
                <input 
                  type="number" 
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  placeholder="cm"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              {gender === 'female' && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Hip (cm)</label>
                  <input 
                    type="number" 
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                    placeholder="cm"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              )}
            </div>

            <button 
              onClick={calculateBodyFat}
              className="w-full py-4 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20"
            >
              Calculate Body Fat
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Your Body Fat</p>
                <h2 className={cn("text-6xl font-black mb-4", result.color)}>{result.percentage}%</h2>
                <div className={cn("inline-block px-4 py-1 rounded-full font-bold text-sm mb-6 bg-white border border-zinc-200 shadow-sm", result.color)}>
                  {result.category}
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[240px]">
                  Estimated using the US Navy Method. For more accurate results, consider a DEXA scan.
                </p>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter your measurements to see your body fat result</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">How to Measure Body Fat for Men and Women</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Body fat percentage is a better indicator of health and fitness than weight or BMI alone. It tells you how much of your body weight is fat versus lean mass (muscle, bone, organs).
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-blue-500" />
              How to Measure
            </h3>
            <p className="text-zinc-600 text-sm">
              Use a flexible tape measure. Measure your neck just below the larynx, your waist at the narrowest point (usually just above the navel), and for women, your hips at the widest point.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              The US Navy Method
            </h3>
            <p className="text-zinc-600 text-sm">
              This method is a widely used and reliable way to estimate body fat using simple body measurements. It has been validated against more expensive clinical methods.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Healthy Body Fat Ranges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-zinc-900 mb-3">Men</h4>
            <ul className="text-sm text-zinc-600 space-y-1">
              <li>Essential Fat: 2-5%</li>
              <li>Athletes: 6-13%</li>
              <li>Fitness: 14-17%</li>
              <li>Average: 18-24%</li>
              <li>Obese: 25%+</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 mb-3">Women</h4>
            <ul className="text-sm text-zinc-600 space-y-1">
              <li>Essential Fat: 10-13%</li>
              <li>Athletes: 14-20%</li>
              <li>Fitness: 21-24%</li>
              <li>Average: 25-31%</li>
              <li>Obese: 32%+</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Why Body Fat Matters</h3>
        <p className="text-zinc-600 leading-relaxed">
          Excess body fat, especially visceral fat (fat stored around the organs), is linked to various health issues, including heart disease, type 2 diabetes, and certain cancers. Maintaining a healthy body fat percentage is key to long-term health and longevity.
        </p>
      </article>
    </div>
  );
};
