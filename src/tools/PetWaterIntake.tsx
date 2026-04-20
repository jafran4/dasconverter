import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Droplets, Calculator, Info, BookOpen, Dog, Cat, Activity, Scale, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PetWaterIntake = () => {
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [weight, setWeight] = useState<string>('10');
  const [activity, setActivity] = useState<string>('moderate'); // low, moderate, high
  const [diet, setDiet] = useState<string>('dry'); // dry, wet, mixed

  const calculateWater = () => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return 0;

    // Base requirement: 50-60ml per kg
    let baseMl = w * 55;
    
    // Activity adjustment
    if (activity === 'low') baseMl *= 0.8;
    if (activity === 'high') baseMl *= 1.5;

    // Diet adjustment (wet food contains ~75% water)
    if (diet === 'wet') baseMl *= 0.7;
    if (diet === 'mixed') baseMl *= 0.85;

    return Math.round(baseMl);
  };

  const ml = calculateWater();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center p-3 bg-cyan-100 rounded-2xl mb-4"
        >
          <Droplets className="w-8 h-8 text-cyan-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Pet Water Intake Calculator</h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
          Ensure your pet stays hydrated. Calculate the recommended daily water intake based on their weight and activity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Pet Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPetType('dog')}
                    className={`py-3 rounded-xl border flex items-center justify-center gap-2 transition-all font-medium ${
                      petType === 'dog' 
                      ? 'bg-cyan-600 border-cyan-600 text-white shadow-lg shadow-cyan-100' 
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-cyan-200'
                    }`}
                  >
                    <Dog className="w-4 h-4" /> Dog
                  </button>
                  <button
                    onClick={() => setPetType('cat')}
                    className={`py-3 rounded-xl border flex items-center justify-center gap-2 transition-all font-medium ${
                      petType === 'cat' 
                      ? 'bg-cyan-600 border-cyan-600 text-white shadow-lg shadow-cyan-100' 
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-cyan-200'
                    }`}
                  >
                    <Cat className="w-4 h-4" /> Cat
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2 flex items-center gap-2">
                  <Scale className="w-4 h-4" /> Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Activity Level
                </label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                >
                  <option value="low">Low (Sedentary)</option>
                  <option value="moderate">Moderate (Daily Exercise)</option>
                  <option value="high">High (Very Active)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Primary Diet</label>
                <div className="grid grid-cols-3 gap-4">
                  {['dry', 'mixed', 'wet'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setDiet(opt)}
                      className={`py-3 rounded-xl border transition-all font-medium capitalize ${
                        diet === opt 
                        ? 'bg-cyan-600 border-cyan-600 text-white shadow-lg shadow-cyan-100' 
                        : 'bg-white border-zinc-200 text-zinc-600 hover:border-cyan-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cyan-50 p-8 rounded-3xl border border-cyan-100">
            <h3 className="text-cyan-900 font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" /> Hydration Tip
            </h3>
            <p className="text-cyan-800/80 leading-relaxed text-sm">
              If your pet is panting heavily, has dry gums, or skin that doesn't snap back when gently pinched, they may be dehydrated. Always provide fresh, clean water at all times.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-cyan-600 rounded-3xl p-8 text-white shadow-xl shadow-cyan-100 text-center">
            <h3 className="text-lg font-medium opacity-90 mb-2">Recommended Intake</h3>
            <div className="text-5xl font-bold mb-2">{ml} ml</div>
            <p className="text-cyan-100 text-sm">Per Day</p>
            <div className="mt-4 pt-4 border-t border-white/20 text-xs opacity-80">
              ≈ {(ml / 250).toFixed(1)} Cups (250ml each)
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
            <h3 className="font-semibold text-zinc-900 mb-4">Encouraging Drinking</h3>
            <ul className="space-y-3 text-sm text-zinc-600">
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                Wash water bowls daily to prevent slime.
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                Try a pet fountain for cats who prefer running water.
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                Add a splash of tuna juice (no salt) to water for picky drinkers.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEO & Blog Content */}
      <div className="mt-20 space-y-16">
        <section>
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">Pet Hydration Science</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-cyan-600">The Role of Water in Pets</h3>
              <p className="text-zinc-600 leading-relaxed">
                Water accounts for 60-70% of a pet's body weight. It's essential for temperature regulation, digestion, joint lubrication, and flushing toxins through the kidneys. Even a 10% loss of body water can cause serious illness.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-cyan-600">Excessive Thirst (Polydipsia)</h3>
              <p className="text-zinc-600 leading-relaxed">
                While drinking enough is good, a sudden increase in thirst can be a sign of underlying health issues like diabetes, kidney disease, or hyperthyroidism. If your pet is drinking significantly more than the calculated amount, consult a vet.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-zinc-900">Pet Wellness Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Summer Safety: Preventing Heatstroke",
                desc: "How to keep your pet cool and hydrated during extreme heatwaves.",
                tag: "Safety"
              },
              {
                title: "The Best Water Bowls for Pets",
                desc: "Ceramic vs. Stainless Steel vs. Plastic: Which is the healthiest choice?",
                tag: "Gear"
              },
              {
                title: "Hydration for Active Dogs",
                desc: "Tips for carrying water and ensuring hydration during long hikes and runs.",
                tag: "Training"
              }
            ].map((post, i) => (
              <div key={i} className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 hover:bg-white hover:shadow-md transition-all group">
                <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3 block">{post.tag}</span>
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
