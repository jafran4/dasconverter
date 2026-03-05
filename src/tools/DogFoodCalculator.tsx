import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Dog, Calculator, Info, BookOpen, Utensils, Scale, Activity, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DogFoodCalculator = () => {
  const [weight, setWeight] = useState<string>('10');
  const [age, setAge] = useState<string>('adult'); // puppy, adult, senior
  const [activity, setActivity] = useState<string>('moderate'); // low, moderate, high
  const [foodType, setFoodType] = useState<string>('dry'); // dry, wet

  const calculateFood = () => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return { grams: 0, cups: 0, calories: 0 };

    // Base RER (Resting Energy Requirement) = 70 * (weight_kg ^ 0.75)
    // Simplified: RER ≈ 30 * weight_kg + 70
    const rer = 30 * w + 70;
    
    let multiplier = 1.6; // Default adult neutered
    if (age === 'puppy') multiplier = 3.0;
    if (age === 'senior') multiplier = 1.2;
    
    if (activity === 'low') multiplier *= 0.8;
    if (activity === 'high') multiplier *= 1.4;

    const dailyCalories = rer * multiplier;
    
    // Average calories: Dry food ~350 kcal/cup, Wet food ~100 kcal/100g
    const grams = foodType === 'dry' ? (dailyCalories / 3.5) : (dailyCalories / 1.0);
    const cups = grams / 120; // Approx 120g per cup for dry food

    return {
      grams: Math.round(grams),
      cups: cups.toFixed(1),
      calories: Math.round(dailyCalories)
    };
  };

  const result = calculateFood();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-2xl mb-4"
        >
          <Dog className="w-8 h-8 text-orange-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Dog Food Calculator</h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
          Determine the perfect portion size for your dog based on their weight, age, and activity level.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 mb-2 flex items-center gap-2">
                  <Scale className="w-4 h-4" /> Dog's Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-xl font-bold"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Life Stage</label>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                >
                  <option value="puppy">Puppy (Growth)</option>
                  <option value="adult">Adult (Maintenance)</option>
                  <option value="senior">Senior (Less Active)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Activity Level
                </label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                >
                  <option value="low">Low (Couch Potato)</option>
                  <option value="moderate">Moderate (Daily Walks)</option>
                  <option value="high">High (Working/Active)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Food Type</label>
                <div className="grid grid-cols-2 gap-4">
                  {['dry', 'wet'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFoodType(type)}
                      className={`py-3 rounded-xl border transition-all font-medium capitalize ${
                        foodType === type 
                        ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-100' 
                        : 'bg-white border-zinc-200 text-zinc-600 hover:border-orange-200'
                      }`}
                    >
                      {type} Food
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
            <h3 className="text-orange-900 font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" /> Feeding Tip
            </h3>
            <p className="text-orange-800/80 leading-relaxed text-sm">
              Portion sizes can vary significantly between brands. Always check the calorie content on your specific food bag. This calculator provides an estimate based on average metabolic rates.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-orange-600 rounded-3xl p-8 text-white shadow-xl shadow-orange-100 text-center">
            <h3 className="text-lg font-medium opacity-90 mb-2">Daily Amount</h3>
            <div className="text-5xl font-bold mb-2">{result.grams}g</div>
            <div className="text-xl opacity-80 mb-4">≈ {result.cups} Cups</div>
            <div className="pt-4 border-t border-white/20">
              <p className="text-sm opacity-90">Total Calories: {result.calories} kcal/day</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
            <h3 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-orange-500" /> Feeding Schedule
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm py-2 border-b border-zinc-50">
                <span className="text-zinc-500">Puppies</span>
                <span className="font-bold text-zinc-900">3-4 meals/day</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-zinc-50">
                <span className="text-zinc-500">Adults</span>
                <span className="font-bold text-zinc-900">2 meals/day</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-zinc-500">Seniors</span>
                <span className="font-bold text-zinc-900">2 small meals/day</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Blog Content */}
      <div className="mt-20 space-y-16">
        <section>
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">Dog Nutrition Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-orange-600">Understanding RER and DER</h3>
              <p className="text-zinc-600 leading-relaxed">
                Resting Energy Requirement (RER) is the energy used for basic body functions. Daily Energy Requirement (DER) adjusts this based on life stage and activity. A working dog needs significantly more calories than a senior dog of the same weight.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-orange-600">Signs of Overfeeding</h3>
              <ul className="space-y-2 text-zinc-600">
                <li>• Loss of visible waistline</li>
                <li>• Difficulty feeling the ribs</li>
                <li>• Reduced energy levels</li>
                <li>• Digestive issues or soft stools</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-zinc-900">Pet Care Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Choosing the Right Kibble",
                desc: "What to look for on the ingredient label to ensure high-quality protein.",
                tag: "Nutrition"
              },
              {
                title: "Raw vs. Dry Food",
                desc: "Exploring the benefits and risks of different feeding philosophies.",
                tag: "Health"
              },
              {
                title: "How to Switch Dog Foods",
                desc: "A step-by-step guide to transitioning your pet's diet without stomach upset.",
                tag: "Tips"
              }
            ].map((post, i) => (
              <div key={i} className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 hover:bg-white hover:shadow-md transition-all group">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 block">{post.tag}</span>
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
