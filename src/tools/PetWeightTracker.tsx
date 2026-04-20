import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scale, Calculator, Info, BookOpen, Target, TrendingDown, TrendingUp, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PetWeightTracker = () => {
  const [currentWeight, setCurrentWeight] = useState<string>('12');
  const [goalWeight, setGoalWeight] = useState<string>('10');
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');

  const calculatePlan = () => {
    const current = parseFloat(currentWeight);
    const goal = parseFloat(goalWeight);

    if (isNaN(current) || isNaN(goal) || current <= 0 || goal <= 0) return null;

    const diff = current - goal;
    const isLosing = diff > 0;
    
    // Safe weight loss for pets is 1-2% of body weight per week
    // Safe weight gain is similar
    const safeRate = current * 0.015; // 1.5% per week
    const weeks = Math.abs(diff / safeRate);

    return {
      diff: Math.abs(diff).toFixed(1),
      isLosing,
      weeks: Math.ceil(weeks),
      weeklyChange: safeRate.toFixed(2)
    };
  };

  const plan = calculatePlan();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center p-3 bg-rose-100 rounded-2xl mb-4"
        >
          <Scale className="w-8 h-8 text-rose-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Pet Weight Tracker</h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
          Manage your pet's weight safely. Create a weekly plan to reach their ideal goal weight.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Current Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 outline-none transition-all text-xl font-bold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Goal Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={goalWeight}
                  onChange={(e) => setGoalWeight(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 outline-none transition-all text-xl font-bold"
                />
              </div>
            </div>
          </div>

          <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100 flex gap-4">
            <AlertCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-rose-900 font-bold mb-1">Safety First</h3>
              <p className="text-rose-800/80 text-sm leading-relaxed">
                Rapid weight loss can be dangerous for pets, especially cats (risk of hepatic lipidosis). Never reduce food intake drastically without consulting your veterinarian.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {plan && (
            <div className={`rounded-3xl p-8 text-white shadow-xl text-center ${plan.isLosing ? 'bg-rose-600 shadow-rose-100' : 'bg-emerald-600 shadow-emerald-100'}`}>
              <div className="flex justify-center mb-4">
                {plan.isLosing ? <TrendingDown className="w-10 h-10" /> : <TrendingUp className="w-10 h-10" />}
              </div>
              <h3 className="text-lg font-medium opacity-90 mb-2">Weekly Plan</h3>
              <div className="text-4xl font-bold mb-2">{plan.weeklyChange} kg</div>
              <p className="text-white/80 text-sm mb-4">Target change per week</p>
              <div className="pt-4 border-t border-white/20">
                <p className="text-sm opacity-90">Estimated Time: {plan.weeks} Weeks</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
            <h3 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-rose-500" /> Success Tips
            </h3>
            <ul className="space-y-3 text-sm text-zinc-600">
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                Measure food with a digital scale for accuracy.
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                Swap high-calorie treats for green beans or carrots.
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                Increase daily activity with interactive toys.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEO & Blog Content */}
      <div className="mt-20 space-y-16">
        <section>
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">Pet Weight Management Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-rose-600">The Body Condition Score (BCS)</h3>
              <p className="text-zinc-600 leading-relaxed">
                Vets use a 1-9 scale to assess body condition. A score of 4-5 is ideal. You should be able to feel your pet's ribs easily without a thick layer of fat, and they should have a visible waistline when viewed from above.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-rose-600">Why Weight Matters</h3>
              <p className="text-zinc-600 leading-relaxed">
                Obese pets are at much higher risk for arthritis, heart disease, diabetes, and certain cancers. Maintaining a healthy weight can extend your pet's life by up to 2 years.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-zinc-900">Pet Health Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Hidden Calories in Treats",
                desc: "Why that 'small' piece of cheese is actually a huge meal for your dog.",
                tag: "Nutrition"
              },
              {
                title: "Low-Impact Exercise for Overweight Pets",
                desc: "How to get your pet moving without stressing their joints.",
                tag: "Fitness"
              },
              {
                title: "When Weight Loss is a Concern",
                desc: "Unintentional weight loss can be a sign of illness. When to see the vet.",
                tag: "Health"
              }
            ].map((post, i) => (
              <div key={i} className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 hover:bg-white hover:shadow-md transition-all group">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 block">{post.tag}</span>
                <h4 className="text-xl font-bold text-zinc-900 mb-2">{post.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{post.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
