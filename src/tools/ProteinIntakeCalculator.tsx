import React, { useState } from 'react';
import { Beef, ArrowLeft, Info, HelpCircle, Dumbbell, Apple } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const ProteinIntakeCalculator = () => {
  const [weight, setWeight] = useState<string>('');
  const [goal, setGoal] = useState<string>('maintenance');
  const [activity, setActivity] = useState<string>('moderate');
  const [result, setResult] = useState<{ grams: number; range: string } | null>(null);

  const calculateProtein = () => {
    const w = parseFloat(weight);
    
    if (w > 0) {
      let multiplier = 0.8; // Base for sedentary

      if (goal === 'muscle-gain') {
        if (activity === 'sedentary') multiplier = 1.2;
        else if (activity === 'moderate') multiplier = 1.8;
        else multiplier = 2.2;
      } else if (goal === 'fat-loss') {
        multiplier = 1.6; // High protein helps preserve muscle during fat loss
      } else {
        if (activity === 'sedentary') multiplier = 0.8;
        else if (activity === 'moderate') multiplier = 1.2;
        else multiplier = 1.6;
      }

      const grams = Math.round(w * multiplier);
      setResult({ 
        grams, 
        range: `${Math.round(grams * 0.9)}g - ${Math.round(grams * 1.1)}g` 
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
            <Beef className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Protein Intake Calculator</h1>
            <p className="text-zinc-500">Daily protein needs for Men, Women & Athletes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Weight (kg)</label>
              <input 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="kg"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Primary Goal</label>
              <select 
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              >
                <option value="maintenance">Maintenance / General Health</option>
                <option value="muscle-gain">Muscle Gain / Bodybuilding</option>
                <option value="fat-loss">Fat Loss / Cutting</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Activity Level</label>
              <select 
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              >
                <option value="sedentary">Sedentary (Little to no exercise)</option>
                <option value="moderate">Moderate (Exercise 3-4 times/week)</option>
                <option value="active">Active (Daily intense exercise)</option>
              </select>
            </div>

            <button 
              onClick={calculateProtein}
              className="w-full py-4 bg-amber-600 text-white font-bold rounded-2xl hover:bg-amber-700 transition-all active:scale-[0.98] shadow-lg shadow-amber-600/20"
            >
              Calculate Protein Needs
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Daily Target</p>
                <h2 className="text-6xl font-black mb-4 text-amber-600">{result.grams}</h2>
                <p className="text-zinc-900 font-bold text-lg mb-6">Grams / Day</p>
                <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                  <p className="text-xs text-zinc-400 uppercase font-bold mb-1">Recommended Range</p>
                  <p className="text-lg font-bold text-zinc-900">{result.range}</p>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed mt-6 max-w-[240px]">
                  Spread your protein intake across 3-5 meals for optimal absorption.
                </p>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter your details to see your protein target</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">Why Protein is Essential for Men, Women, and Athletes</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Protein is the building block of your body. It is essential for muscle repair, hormone production, and immune function. Whether you're an athlete or just looking to stay healthy, getting enough protein is crucial.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-amber-600" />
              Muscle Maintenance
            </h3>
            <p className="text-zinc-600 text-sm">
              Protein provides the amino acids needed to repair and build muscle tissue after exercise. High protein intake is especially important when you're in a calorie deficit to prevent muscle loss.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Apple className="w-5 h-5 text-amber-600" />
              Satiety and Weight Loss
            </h3>
            <p className="text-zinc-600 text-sm">
              Protein is the most satiating macronutrient, meaning it keeps you full for longer. This can help reduce overall calorie intake and support weight loss goals.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Protein for Women</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Many women worry that eating high protein will make them "bulky." In reality, protein supports a lean and toned physique by helping to build and maintain muscle mass while supporting metabolic health.
        </p>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Best Sources of Protein</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-zinc-900 mb-3">Animal-Based</h4>
            <ul className="text-sm text-zinc-600 space-y-1">
              <li>Chicken Breast (31g per 100g)</li>
              <li>Lean Beef (26g per 100g)</li>
              <li>Eggs (6g per large egg)</li>
              <li>Greek Yogurt (10g per 100g)</li>
              <li>Whey Protein (20-25g per scoop)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 mb-3">Plant-Based</h4>
            <ul className="text-sm text-zinc-600 space-y-1">
              <li>Lentils (9g per 100g cooked)</li>
              <li>Tofu (8g per 100g)</li>
              <li>Quinoa (4g per 100g cooked)</li>
              <li>Almonds (21g per 100g)</li>
              <li>Peas (5g per 100g)</li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
};
