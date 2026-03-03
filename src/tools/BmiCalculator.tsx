import React, { useState } from 'react';
import { Activity, ArrowLeft, Info, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const BmiCalculator = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    
    if (h > 0 && w > 0) {
      const bmi = w / (h * h);
      let category = '';
      let color = '';

      if (bmi < 18.5) {
        category = 'Underweight';
        color = 'text-blue-500';
      } else if (bmi < 25) {
        category = 'Normal weight';
        color = 'text-emerald-500';
      } else if (bmi < 30) {
        category = 'Overweight';
        color = 'text-amber-500';
      } else {
        category = 'Obese';
        color = 'text-rose-500';
      }

      setResult({ bmi: parseFloat(bmi.toFixed(1)), category, color });
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
            <Activity className="w-6 h-6 text-rose-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">BMI Calculator</h1>
            <p className="text-zinc-500">For Men, Women & Teenagers</p>
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
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Height (cm)</label>
                <input 
                  type="number" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="cm"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
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
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
              />
            </div>

            <button 
              onClick={calculateBMI}
              className="w-full py-4 bg-rose-500 text-white font-bold rounded-2xl hover:bg-rose-600 transition-all active:scale-[0.98] shadow-lg shadow-rose-500/20"
            >
              Calculate BMI
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Your BMI</p>
                <h2 className={cn("text-6xl font-black mb-4", result.color)}>{result.bmi}</h2>
                <div className={cn("inline-block px-4 py-1 rounded-full font-bold text-sm mb-6 bg-white border border-zinc-200 shadow-sm", result.color)}>
                  {result.category}
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[240px]">
                  A healthy BMI range is between 18.5 and 24.9.
                </p>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter your details to see your BMI result</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">Understanding BMI for Men, Women, and Teenagers</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is BMI = kg/m², where kg is a person's weight in kilograms and m² is their height in metres squared.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-rose-500" />
              BMI for Adults (Men & Women)
            </h3>
            <p className="text-zinc-600 text-sm">
              For most adults, BMI is used to estimate a healthy body weight. While it doesn't measure body fat directly, it is a reliable indicator of body fatness for most people.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-rose-500" />
              BMI for Teenagers
            </h3>
            <p className="text-zinc-600 text-sm">
              For children and teenagers, BMI is age and sex-specific and is often referred to as BMI-for-age. It uses percentiles to show how a child's BMI compares to other children of the same age and sex.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">BMI Categories Table</h3>
        <div className="overflow-hidden border border-zinc-200 rounded-2xl mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50">
                <th className="p-4 font-bold text-zinc-900 border-b border-zinc-200">BMI Range</th>
                <th className="p-4 font-bold text-zinc-900 border-b border-zinc-200">Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-zinc-100">Less than 18.5</td>
                <td className="p-4 border-b border-zinc-100 text-blue-500 font-medium">Underweight</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-zinc-100">18.5 – 24.9</td>
                <td className="p-4 border-b border-zinc-100 text-emerald-500 font-medium">Normal weight</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-zinc-100">25.0 – 29.9</td>
                <td className="p-4 border-b border-zinc-100 text-amber-500 font-medium">Overweight</td>
              </tr>
              <tr>
                <td className="p-4">30.0 or more</td>
                <td className="p-4 text-rose-500 font-medium">Obese</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Limitations of BMI</h3>
        <p className="text-zinc-600 leading-relaxed">
          While BMI is a useful screening tool, it has limitations. It does not account for muscle mass, bone density, overall body composition, and racial and sex differences. For example, athletes may have a high BMI due to increased muscle mass rather than increased body fatness.
        </p>
      </article>

    </div>
  );
};
