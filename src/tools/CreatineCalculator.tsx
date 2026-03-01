import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Calculator, Info, BookOpen, Droplets, Scale, Zap, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CreatineCalculator = () => {
  const [weight, setWeight] = useState<string>('75');
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg');
  const [goal, setGoal] = useState<'maintenance' | 'loading'>('maintenance');

  const calculateIntake = () => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return null;

    const weightInKg = unit === 'lb' ? w * 0.453592 : w;
    
    let dailyCreatine = 0;
    let extraWater = 0;

    if (goal === 'loading') {
      // Loading phase: 0.3g per kg
      dailyCreatine = weightInKg * 0.3;
      // Water: ~1L extra per 10g
      extraWater = (dailyCreatine / 5) * 0.5; // 0.5L per 5g
    } else {
      // Maintenance: 0.03g per kg (or standard 3-5g)
      dailyCreatine = Math.max(3, weightInKg * 0.03);
      extraWater = (dailyCreatine / 5) * 0.5;
    }

    return {
      creatine: dailyCreatine.toFixed(1),
      water: extraWater.toFixed(1),
      doses: goal === 'loading' ? 4 : 1
    };
  };

  const results = calculateIntake();

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
          className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Zap className="w-8 h-8 text-rose-500" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Creatine Intake Calculator</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Calculate your optimal daily creatine dosage and required water intake based on your body weight and fitness goals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-rose-500" />
              Parameters
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Body Weight
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="flex-grow px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                    placeholder="Enter weight"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as 'kg' | 'lb')}
                    className="px-3 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all bg-white"
                  >
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Phase / Goal
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setGoal('maintenance')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      goal === 'maintenance'
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    Maintenance
                  </button>
                  <button
                    onClick={() => setGoal('loading')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      goal === 'loading'
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    Loading
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100">
            <h3 className="text-rose-900 font-semibold mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Quick Tip
            </h3>
            <p className="text-rose-700 text-sm leading-relaxed">
              Creatine monohydrate is the most researched and effective form. Consistency is more important than the exact timing of your dose.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {results ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center"
              >
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-rose-500" />
                </div>
                <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Daily Creatine</div>
                <div className="text-4xl font-bold text-zinc-900 mb-2">{results.creatine}g</div>
                <div className="text-sm text-zinc-400">
                  {goal === 'loading' 
                    ? `Split into ${results.doses} doses of ~5g` 
                    : 'Single daily dose'}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center"
              >
                <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-6 h-6 text-sky-500" />
                </div>
                <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Extra Water</div>
                <div className="text-4xl font-bold text-zinc-900 mb-2">+{results.water}L</div>
                <div className="text-sm text-zinc-400">Additional to your base intake</div>
              </motion.div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200 p-12 text-zinc-400">
              Enter your weight to see recommendations
            </div>
          )}

          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-rose-500" />
              How to Calculate Creatine Intake
            </h2>
            
            <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">1. The Maintenance Phase</h3>
                <p>
                  For most people, a daily dose of <strong>3-5 grams</strong> is sufficient to maintain muscle creatine saturation. A more precise way to calculate daily creatine intake is to use the formula: 
                  <code className="mx-1 px-1 bg-zinc-100 rounded text-rose-600 font-mono">0.03g x Body Weight (kg)</code>.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">2. The Loading Phase (Optional)</h3>
                <p>
                  To saturate your muscles faster, you can start with a "loading phase." This involves taking <strong>20-25 grams</strong> per day for 5-7 days. The precise calculation is 
                  <code className="mx-1 px-1 bg-zinc-100 rounded text-rose-600 font-mono">0.3g x Body Weight (kg)</code>. 
                  It is best to split this into 4-5 doses throughout the day to avoid stomach upset.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">3. Creatine Water Intake Calculator</h3>
                <p>
                  Creatine is osmotic, meaning it draws water into your muscle cells. This is why hydration is critical. A good rule of thumb is to drink an additional <strong>500ml (16oz)</strong> of water for every 5g of creatine you consume.
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <h4 className="font-semibold text-zinc-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Benefits
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Increased strength & power</li>
                    <li>• Faster muscle recovery</li>
                    <li>• Improved brain function</li>
                    <li>• Enhanced cell hydration</li>
                  </ul>
                </div>
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <h4 className="font-semibold text-zinc-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500" />
                    Common Myths
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• It does NOT cause hair loss</li>
                    <li>• It is NOT a steroid</li>
                    <li>• It does NOT damage healthy kidneys</li>
                    <li>• You don't HAVE to "cycle" it</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="mt-12 space-y-12 border-t border-zinc-100 pt-12">
        <section>
          <h2 className="text-3xl font-bold text-zinc-900 mb-6">Daily Creatine Intake Calculator: Why It Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-600 leading-relaxed">
            <p>
              Using a <strong>daily creatine intake calculator</strong> ensures you aren't wasting supplement powder or missing out on potential gains. While the "standard 5g" is a safe bet for most, larger athletes or those in a loading phase require specific adjustments. Our tool uses your exact body weight to provide a personalized recommendation that aligns with clinical research.
            </p>
            <p>
              When you <strong>calculate creatine intake</strong>, you also need to consider your hydration levels. Creatine increases the water content within muscle cells, which is beneficial for protein synthesis but requires you to increase your overall fluid intake to prevent dehydration in other tissues.
            </p>
          </div>
        </section>

        <section className="bg-zinc-900 text-white p-12 rounded-[3rem]">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-rose-400">When is the best time to take creatine?</h3>
              <p className="text-zinc-400">
                Research suggests that taking creatine close to your workout (either before or after) may be slightly more effective, but the most important factor is daily consistency to keep your muscles saturated.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-rose-400">Do I need to load creatine?</h3>
              <p className="text-zinc-400">
                No. Loading (20g/day) just gets you to saturation faster (about 1 week). Taking 3-5g/day will get you to the same level of saturation in about 3-4 weeks.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-rose-400">Should I take creatine on rest days?</h3>
              <p className="text-zinc-400">
                Yes. Creatine works by maintaining high levels of phosphocreatine in your muscles. If you skip rest days, your levels will slowly decline.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-rose-400">Can I mix creatine with coffee?</h3>
              <p className="text-zinc-400">
                Yes, creatine is stable in hot liquids. However, ensure you are drinking enough water as both caffeine and creatine can impact your hydration needs.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
