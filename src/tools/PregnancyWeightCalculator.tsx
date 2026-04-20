import React, { useState } from 'react';
import { Baby, ArrowLeft, Info, HelpCircle, Heart, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const PregnancyWeightCalculator = () => {
  const [preWeight, setPreWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [week, setWeek] = useState<string>('12');
  const [result, setResult] = useState<{ range: string; current: string; status: string; color: string } | null>(null);

  const calculateWeightGain = () => {
    const w = parseFloat(preWeight);
    const h = parseFloat(height) / 100;
    const wk = parseFloat(week);
    
    if (w > 0 && h > 0) {
      const bmi = w / (h * h);
      let minGain = 0;
      let maxGain = 0;

      if (bmi < 18.5) { minGain = 12.5; maxGain = 18; }
      else if (bmi < 25) { minGain = 11.5; maxGain = 16; }
      else if (bmi < 30) { minGain = 7; maxGain = 11.5; }
      else { minGain = 5; maxGain = 9; }

      // Rough estimate of gain per week after 1st trimester
      // 1st trimester gain is usually 1-2kg total
      const firstTrimesterGain = 1.5;
      const weeksLeft = Math.max(0, wk - 12);
      const rate = (maxGain - firstTrimesterGain) / 28; // average rate for the rest of 40 weeks
      
      const currentMin = wk <= 12 ? (wk/12) * 1.5 : 1.5 + (weeksLeft * (minGain-1.5)/28);
      const currentMax = wk <= 12 ? (wk/12) * 2.0 : 2.0 + (weeksLeft * (maxGain-2.0)/28);

      setResult({
        range: `${minGain} - ${maxGain} kg`,
        current: `${currentMin.toFixed(1)} - ${currentMax.toFixed(1)} kg`,
        status: `For week ${wk}, your recommended gain is between ${currentMin.toFixed(1)} and ${currentMax.toFixed(1)} kg.`,
        color: 'text-pink-500'
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
          <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center">
            <Baby className="w-6 h-6 text-pink-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Pregnancy Weight Calculator</h1>
            <p className="text-zinc-500">Healthy weight gain tracker for Women</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Pre-pregnancy Weight (kg)</label>
              <input 
                type="number" 
                value={preWeight}
                onChange={(e) => setPreWeight(e.target.value)}
                placeholder="kg"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Height (cm)</label>
              <input 
                type="number" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="cm"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Current Week of Pregnancy</label>
              <input 
                type="number" 
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                min="1"
                max="42"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
              />
            </div>

            <button 
              onClick={calculateWeightGain}
              className="w-full py-4 bg-pink-500 text-white font-bold rounded-2xl hover:bg-pink-600 transition-all active:scale-[0.98] shadow-lg shadow-pink-500/20"
            >
              Calculate Recommended Gain
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Total Recommended Gain</p>
                <h2 className="text-5xl font-black mb-4 text-pink-500">{result.range}</h2>
                <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm mb-6">
                  <p className="text-xs text-zinc-400 uppercase font-bold mb-1">Target for Week {week}</p>
                  <p className="text-xl font-bold text-zinc-900">+{result.current}</p>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[240px]">
                  {result.status}
                </p>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter your details to see recommended weight gain</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">Healthy Pregnancy Weight Gain: A Guide for Women</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Gaining a healthy amount of weight during pregnancy is important for the health of both the mother and the baby. The amount of weight you should gain depends on your Body Mass Index (BMI) before you became pregnant.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" />
              Why Gain Matters
            </h3>
            <p className="text-zinc-600 text-sm">
              Gaining too little weight can lead to a low birth weight baby, while gaining too much can increase the risk of gestational diabetes, high blood pressure, and a difficult delivery.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-pink-500" />
              Trimester Breakdown
            </h3>
            <p className="text-zinc-600 text-sm">
              Most women gain only 1-2kg in the first trimester. The majority of weight gain happens in the second and third trimesters, usually about 0.5kg per week.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Recommended Weight Gain by BMI</h3>
        <div className="overflow-hidden border border-zinc-200 rounded-2xl mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50">
                <th className="p-4 font-bold text-zinc-900 border-b border-zinc-200">Pre-Pregnancy BMI</th>
                <th className="p-4 font-bold text-zinc-900 border-b border-zinc-200">Recommended Gain</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-zinc-100">Underweight (&lt; 18.5)</td>
                <td className="p-4 border-b border-zinc-100">12.5 – 18 kg</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-zinc-100">Normal (18.5 – 24.9)</td>
                <td className="p-4 border-b border-zinc-100">11.5 – 16 kg</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-zinc-100">Overweight (25.0 – 29.9)</td>
                <td className="p-4 border-b border-zinc-100">7 – 11.5 kg</td>
              </tr>
              <tr>
                <td className="p-4">Obese (&gt; 30.0)</td>
                <td className="p-4">5 – 9 kg</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Where Does the Weight Go?</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          It's not all fat! The weight you gain is distributed across several areas:
        </p>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li>Baby: ~3.5 kg</li>
          <li>Placenta: ~0.7 kg</li>
          <li>Amniotic Fluid: ~0.9 kg</li>
          <li>Uterus growth: ~0.9 kg</li>
          <li>Breast tissue: ~0.9 kg</li>
          <li>Blood volume: ~1.8 kg</li>
          <li>Fat stores for delivery/breastfeeding: ~3 kg</li>
        </ul>
      </article>
    </div>
  );
};
