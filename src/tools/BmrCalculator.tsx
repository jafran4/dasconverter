import React, { useState } from 'react';
import { Flame, ArrowLeft, Info, HelpCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const BmrCalculator = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculateBMR = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseFloat(age);
    
    if (h > 0 && w > 0 && a > 0) {
      // Mifflin-St Jeor Equation
      let bmr = (10 * w) + (6.25 * h) - (5 * a);
      if (gender === 'male') {
        bmr += 5;
      } else {
        bmr -= 161;
      }
      setResult(Math.round(bmr));
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
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">BMR Calculator</h1>
            <p className="text-zinc-500">Basal Metabolic Rate for Men & Women</p>
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
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Height (cm)</label>
                <input 
                  type="number" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="cm"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Weight (kg)</label>
              <input 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="kg"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
            </div>

            <button 
              onClick={calculateBMR}
              className="w-full py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20"
            >
              Calculate BMR
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Your BMR</p>
                <h2 className="text-6xl font-black mb-4 text-orange-500">{result}</h2>
                <p className="text-zinc-900 font-bold text-lg mb-6">Calories / Day</p>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[240px]">
                  This is the number of calories your body needs to function at rest.
                </p>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter your details to see your BMR result</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">What is BMR? A Guide for Men and Women</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Basal Metabolic Rate (BMR) is the total number of calories that your body needs to perform basic, life-sustaining functions. These basal functions include circulation, breathing, cell production, nutrient processing, protein synthesis, and ion transport.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              BMR vs. TDEE
            </h3>
            <p className="text-zinc-600 text-sm">
              While BMR is the calories burned at rest, TDEE (Total Daily Energy Expenditure) includes calories burned through physical activity. TDEE is always higher than BMR.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Why BMR Matters
            </h3>
            <p className="text-zinc-600 text-sm">
              Understanding your BMR helps you set a baseline for weight loss, maintenance, or muscle gain. It ensures you don't eat too few calories, which can slow your metabolism.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Factors Influencing BMR</h3>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Body Size:</strong> Larger bodies have more metabolizing tissue and a higher BMR.</li>
          <li><strong>Body Composition:</strong> Muscle burns more calories than fat, even at rest.</li>
          <li><strong>Gender:</strong> Men generally have more muscle mass and lower body fat, resulting in a higher BMR.</li>
          <li><strong>Age:</strong> BMR typically decreases as you get older due to loss of muscle tissue.</li>
          <li><strong>Genetics:</strong> Some people have a naturally faster or slower metabolism.</li>
        </ul>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">The Mifflin-St Jeor Equation</h3>
        <p className="text-zinc-600 leading-relaxed">
          Our calculator uses the Mifflin-St Jeor Equation, which is currently considered the most accurate way to estimate BMR without laboratory testing. It was developed in 1990 and has been validated in numerous studies.
        </p>
      </article>
    </div>
  );
};
