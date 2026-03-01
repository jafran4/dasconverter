import React, { useState } from 'react';
import { Ruler, ArrowLeft, Info, HelpCircle, Users, Baby } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const ChildHeightPredictor = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [fatherHeight, setFatherHeight] = useState<string>('');
  const [motherHeight, setMotherHeight] = useState<string>('');
  const [result, setResult] = useState<{ height: number; range: string } | null>(null);

  const predictHeight = () => {
    const f = parseFloat(fatherHeight);
    const m = parseFloat(motherHeight);
    
    if (f > 0 && m > 0) {
      let predicted = 0;
      if (gender === 'male') {
        // Mid-parental height for boys
        predicted = (f + m + 13) / 2;
      } else {
        // Mid-parental height for girls
        predicted = (f + m - 13) / 2;
      }

      setResult({
        height: Math.round(predicted),
        range: `${Math.round(predicted - 5)} - ${Math.round(predicted + 5)} cm`
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
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
            <Baby className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Child Height Predictor</h1>
            <p className="text-zinc-500">Estimate future adult height for children</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Child's Gender</label>
              <div className="flex gap-3">
                <button 
                  onClick={() => setGender('male')}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-semibold transition-all border",
                    gender === 'male' ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100"
                  )}
                >
                  Boy
                </button>
                <button 
                  onClick={() => setGender('female')}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-semibold transition-all border",
                    gender === 'female' ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100"
                  )}
                >
                  Girl
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Father's Height (cm)</label>
              <input 
                type="number" 
                value={fatherHeight}
                onChange={(e) => setFatherHeight(e.target.value)}
                placeholder="cm"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Mother's Height (cm)</label>
              <input 
                type="number" 
                value={motherHeight}
                onChange={(e) => setMotherHeight(e.target.value)}
                placeholder="cm"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>

            <button 
              onClick={predictHeight}
              className="w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20"
            >
              Predict Adult Height
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Predicted Adult Height</p>
                <h2 className="text-6xl font-black mb-4 text-emerald-500">{result.height}</h2>
                <p className="text-zinc-900 font-bold text-lg mb-6">cm</p>
                <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                  <p className="text-xs text-zinc-400 uppercase font-bold mb-1">Expected Range</p>
                  <p className="text-lg font-bold text-zinc-900">{result.range}</p>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed mt-6 max-w-[240px]">
                  Estimated using the Mid-Parental Height method. Actual height may vary due to nutrition and environment.
                </p>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter parents' heights to see the prediction</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">How Tall Will My Child Be? A Guide to Height Prediction</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          One of the most common questions parents ask is how tall their child will grow up to be. While genetics play the biggest role, nutrition, health, and environment also influence a child's final adult height.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-500" />
              The Mid-Parental Method
            </h3>
            <p className="text-zinc-600 text-sm">
              Our calculator uses the Mid-Parental Height method, also known as the Tanner method. It's a simple formula that uses the heights of both biological parents to estimate the child's genetic potential.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-emerald-500" />
              Other Prediction Methods
            </h3>
            <p className="text-zinc-600 text-sm">
              Other methods include the "Two-Times-Two" rule (doubling a child's height at age 2) and the Khamis-Roche method, which is more complex and requires the child's current height and weight.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Factors That Influence Height</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          While genetics account for about 60% to 80% of a person's final height, other factors are also important:
        </p>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Nutrition:</strong> A balanced diet rich in vitamins and minerals (especially calcium and Vitamin D) is essential for bone growth.</li>
          <li><strong>Sleep:</strong> Growth hormone is primarily released during deep sleep.</li>
          <li><strong>Physical Activity:</strong> Regular exercise supports healthy bone and muscle development.</li>
          <li><strong>Overall Health:</strong> Chronic illnesses or hormonal imbalances can sometimes stunt growth.</li>
        </ul>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">When to See a Doctor</h3>
        <p className="text-zinc-600 leading-relaxed">
          If you are concerned about your child's growth, it's always best to consult a pediatrician. They can track your child's growth on a standardized growth chart and determine if any further investigation is needed.
        </p>
      </article>
    </div>
  );
};
