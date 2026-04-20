import React, { useState } from 'react';
import { Droplets, ArrowLeft, Info, HelpCircle, GlassWater } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const WaterIntakeCalculator = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>('');
  const [activity, setActivity] = useState<'sedentary' | 'moderate' | 'active'>('moderate');
  const [climate, setClimate] = useState<'cool' | 'hot'>('cool');
  const [result, setResult] = useState<number | null>(null);

  const calculateWaterIntake = () => {
    const w = parseFloat(weight);
    
    if (w > 0) {
      // Base: 35ml per kg
      let intake = w * 35;
      
      // Activity adjustment
      if (activity === 'moderate') intake += 500;
      else if (activity === 'active') intake += 1000;
      
      // Climate adjustment
      if (climate === 'hot') intake += 500;
      
      // Gender adjustment (men generally need slightly more)
      if (gender === 'male') intake += 200;

      setResult(Math.round(intake));
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
          <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center">
            <Droplets className="w-6 h-6 text-sky-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Water Intake Calculator</h1>
            <p className="text-zinc-500">Daily hydration needs for Men & Women</p>
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

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Weight (kg)</label>
              <input 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="kg"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Activity Level</label>
              <select 
                value={activity}
                onChange={(e) => setActivity(e.target.value as any)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
              >
                <option value="sedentary">Sedentary (Little to no exercise)</option>
                <option value="moderate">Moderate (Exercise 3-4 times/week)</option>
                <option value="active">Active (Daily intense exercise)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Climate</label>
              <div className="flex gap-3">
                <button 
                  onClick={() => setClimate('cool')}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-semibold transition-all border",
                    climate === 'cool' ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100"
                  )}
                >
                  Cool / Normal
                </button>
                <button 
                  onClick={() => setClimate('hot')}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-semibold transition-all border",
                    climate === 'hot' ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100"
                  )}
                >
                  Hot / Humid
                </button>
              </div>
            </div>

            <button 
              onClick={calculateWaterIntake}
              className="w-full py-4 bg-sky-500 text-white font-bold rounded-2xl hover:bg-sky-600 transition-all active:scale-[0.98] shadow-lg shadow-sky-500/20"
            >
              Calculate Water Intake
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Your Daily Goal</p>
                <h2 className="text-6xl font-black mb-4 text-sky-500">{result}</h2>
                <p className="text-zinc-900 font-bold text-lg mb-6">ml / Day</p>
                <div className="flex items-center justify-center gap-2 text-zinc-500 mb-6">
                  <GlassWater className="w-5 h-5" />
                  <span>≈ {Math.round(result / 250)} glasses (250ml each)</span>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[240px]">
                  Proper hydration improves energy, skin health, and physical performance.
                </p>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter your details to see your hydration goal</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">The Ultimate Hydration Guide for Men and Women</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Water is essential for every single cell in your body. It regulates temperature, lubricates joints, and helps flush out waste. But how much do you actually need?
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-sky-500" />
              Why 8 Glasses Isn't Enough
            </h3>
            <p className="text-zinc-600 text-sm">
              The "8 glasses a day" rule is a simple guideline, but your actual needs depend on your body weight, activity level, and the climate you live in.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-sky-500" />
              Signs of Dehydration
            </h3>
            <p className="text-zinc-600 text-sm">
              Common signs include dark urine, fatigue, dizziness, and dry skin. If you feel thirsty, you're likely already slightly dehydrated.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Hydration for Athletes</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          If you exercise intensely, you lose significant amounts of water through sweat. For every hour of intense exercise, you should aim to drink an additional 500ml to 1000ml of water, potentially with electrolytes.
        </p>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Hydration for Women</h3>
        <p className="text-zinc-600 leading-relaxed">
          Women's hydration needs can change during pregnancy and breastfeeding. It is generally recommended that pregnant women drink about 2.3 liters (10 cups) of fluids daily, and breastfeeding women drink about 3.1 liters (13 cups) daily.
        </p>
      </article>
    </div>
  );
};
