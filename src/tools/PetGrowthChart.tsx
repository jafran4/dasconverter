import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Calculator, Info, BookOpen, Dog, Scale, Activity, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PetGrowthChart = () => {
  const [breedSize, setBreedSize] = useState<'small' | 'medium' | 'large' | 'giant'>('medium');
  const [ageMonths, setAgeMonths] = useState<string>('6');

  const calculateExpectedWeight = () => {
    const m = parseFloat(ageMonths);
    if (isNaN(m) || m < 0) return { min: 0, max: 0 };

    // Rough estimates for dog growth
    const growthData = {
      small: { adult: 8, curve: [0.1, 0.3, 0.5, 0.7, 0.85, 0.95, 1.0] },
      medium: { adult: 20, curve: [0.08, 0.25, 0.45, 0.65, 0.8, 0.9, 1.0] },
      large: { adult: 35, curve: [0.05, 0.2, 0.4, 0.6, 0.75, 0.85, 1.0] },
      giant: { adult: 60, curve: [0.04, 0.15, 0.35, 0.55, 0.7, 0.8, 1.0] }
    };

    const data = growthData[breedSize];
    const index = Math.min(Math.floor(m / 2), data.curve.length - 1);
    const percentage = data.curve[index];
    
    const baseWeight = data.adult * percentage;
    return {
      min: (baseWeight * 0.9).toFixed(1),
      max: (baseWeight * 1.1).toFixed(1)
    };
  };

  const result = calculateExpectedWeight();

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
          className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-2xl mb-4"
        >
          <TrendingUp className="w-8 h-8 text-emerald-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Pet Growth Chart Calculator</h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
          Track your puppy's growth and estimate their adult weight based on their current age and breed size.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Breed Size Category</label>
                <select
                  value={breedSize}
                  onChange={(e) => setBreedSize(e.target.value as any)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                >
                  <option value="small">Small (Adult under 10kg)</option>
                  <option value="medium">Medium (Adult 10-25kg)</option>
                  <option value="large">Large (Adult 25-45kg)</option>
                  <option value="giant">Giant (Adult over 45kg)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Current Age (Months)</label>
                <input
                  type="number"
                  value={ageMonths}
                  onChange={(e) => setAgeMonths(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-xl font-bold"
                />
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
            <h3 className="text-emerald-900 font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" /> Growth Milestones
            </h3>
            <p className="text-emerald-800/80 leading-relaxed text-sm">
              Most dogs reach 50% of their adult weight by 4-6 months. Giant breeds can continue growing until they are 18-24 months old, while small breeds often finish growing by 9-12 months.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-100 text-center">
            <h3 className="text-lg font-medium opacity-90 mb-2">Expected Weight Range</h3>
            <div className="text-4xl font-bold mb-2">{result.min} - {result.max} kg</div>
            <p className="text-emerald-100 text-sm">At {ageMonths} months old</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
            <h3 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-500" /> Adult Weight Est.
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm py-2 border-b border-zinc-50">
                <span className="text-zinc-500">Small Breed</span>
                <span className="font-bold text-zinc-900">~8 kg</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-zinc-50">
                <span className="text-zinc-500">Medium Breed</span>
                <span className="font-bold text-zinc-900">~20 kg</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-zinc-50">
                <span className="text-zinc-500">Large Breed</span>
                <span className="font-bold text-zinc-900">~35 kg</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-zinc-500">Giant Breed</span>
                <span className="font-bold text-zinc-900">~60 kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Blog Content */}
      <div className="mt-20 space-y-16">
        <section>
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">Puppy Growth & Development</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-emerald-600">The Growth Plate Factor</h3>
              <p className="text-zinc-600 leading-relaxed">
                Puppies have "growth plates" at the ends of their long bones. These plates are soft and vulnerable to injury. Over-exercising or high-impact activities before these plates close (usually between 12-18 months) can lead to permanent joint issues.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-emerald-600">Nutrition for Growth</h3>
              <p className="text-zinc-600 leading-relaxed">
                Large and giant breed puppies need special "Large Breed Puppy" food. These formulas have controlled calcium and phosphorus levels to prevent them from growing *too* fast, which can cause skeletal deformities.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-zinc-900">Puppy Care Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Predicting Your Puppy's Adult Size",
                desc: "Beyond the paws: Other physical indicators that hint at how big your puppy will get.",
                tag: "Growth"
              },
              {
                title: "Puppy Exercise Guidelines",
                desc: "How much activity is safe for a growing puppy? The 5-minute rule explained.",
                tag: "Health"
              },
              {
                title: "The Importance of Puppy Socialization",
                desc: "Why the first 16 weeks are critical for your pet's long-term behavior and confidence.",
                tag: "Behavior"
              }
            ].map((post, i) => (
              <div key={i} className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 hover:bg-white hover:shadow-md transition-all group">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3 block">{post.tag}</span>
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
