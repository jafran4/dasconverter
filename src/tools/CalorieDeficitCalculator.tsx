import React, { useState } from 'react';
import { TrendingUp, ArrowLeft, Info, HelpCircle, Target, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const CalorieDeficitCalculator = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [activity, setActivity] = useState<string>('1.2');
  const [goal, setGoal] = useState<string>('0.5'); // kg per week
  const [result, setResult] = useState<{ tdee: number; target: number; deficit: number } | null>(null);

  const calculateDeficit = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseFloat(age);
    const act = parseFloat(activity);
    const g = parseFloat(goal);
    
    if (h > 0 && w > 0 && a > 0) {
      // BMR (Mifflin-St Jeor)
      let bmr = (10 * w) + (6.25 * h) - (5 * a);
      if (gender === 'male') bmr += 5;
      else bmr -= 161;

      const tdee = Math.round(bmr * act);
      // 1kg fat approx 7700 calories. 0.5kg/week = 3850 calories / 7 days = 550 deficit
      const dailyDeficit = Math.round((g * 7700) / 7);
      const target = tdee - dailyDeficit;

      setResult({ tdee, target, deficit: dailyDeficit });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Calorie Deficit Calculator</h1>
            <p className="text-zinc-500">Calculate calories needed for weight loss</p>
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
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Height (cm)</label>
                <input 
                  type="number" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="cm"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Weight (kg)</label>
                <input 
                  type="number" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="kg"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Goal (kg/week)</label>
                <select 
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="0.25">0.25 kg / week</option>
                  <option value="0.5">0.5 kg / week</option>
                  <option value="0.75">0.75 kg / week</option>
                  <option value="1.0">1.0 kg / week</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Activity Level</label>
              <select 
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              >
                <option value="1.2">Sedentary (Little to no exercise)</option>
                <option value="1.375">Lightly Active (Exercise 1-3 times/week)</option>
                <option value="1.55">Moderately Active (Exercise 3-5 times/week)</option>
                <option value="1.725">Very Active (Exercise 6-7 times/week)</option>
                <option value="1.9">Extra Active (Intense daily exercise)</option>
              </select>
            </div>

            <button 
              onClick={calculateDeficit}
              className="w-full py-4 bg-indigo-500 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/20"
            >
              Calculate Target Calories
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Daily Target</p>
                <h2 className="text-6xl font-black mb-4 text-indigo-500">{result.target}</h2>
                <p className="text-zinc-900 font-bold text-lg mb-6 text-indigo-500">Calories / Day</p>
                
                <div className="space-y-4 text-sm text-zinc-500">
                  <div className="flex justify-between gap-8 border-b border-zinc-200 pb-2">
                    <span>Maintenance (TDEE)</span>
                    <span className="font-bold text-zinc-900">{result.tdee} kcal</span>
                  </div>
                  <div className="flex justify-between gap-8 border-b border-zinc-200 pb-2">
                    <span>Daily Deficit</span>
                    <span className="font-bold text-rose-500">-{result.deficit} kcal</span>
                  </div>
                </div>
                
                <p className="text-zinc-500 text-xs leading-relaxed mt-6 max-w-[240px]">
                  Losing weight too fast can lead to muscle loss. Aim for 0.5kg to 1kg per week for sustainable results.
                </p>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter your details to see your calorie target</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">The Science of Calorie Deficit for Weight Loss</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          A calorie deficit is the most fundamental principle of weight loss. It occurs when you consume fewer calories than your body burns through its daily functions and physical activity.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Flame className="w-5 h-5 text-indigo-500" />
              TDEE Explained
            </h3>
            <p className="text-zinc-600 text-sm">
              Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a day. It includes your BMR plus the calories burned through movement and exercise.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-500" />
              Setting a Goal
            </h3>
            <p className="text-zinc-600 text-sm">
              A safe and sustainable weight loss goal is 0.5kg to 1kg per week. This usually requires a daily deficit of 500 to 1000 calories.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">How to Create a Calorie Deficit</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          There are three main ways to create a calorie deficit:
        </p>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Diet:</strong> Consuming fewer calories through food and drinks.</li>
          <li><strong>Exercise:</strong> Increasing physical activity to burn more calories.</li>
          <li><strong>Combination:</strong> A mix of both is usually the most effective and sustainable approach.</li>
        </ul>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Calorie Deficit for Women</h3>
        <p className="text-zinc-600 leading-relaxed">
          Women generally have lower TDEEs than men, meaning their calorie targets for weight loss may be lower. It is important not to drop below 1200 calories per day without medical supervision to ensure you are still getting essential nutrients.
        </p>
      </article>
    </div>
  );
};
