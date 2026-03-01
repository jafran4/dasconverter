import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Calculator, Info, BookOpen, ArrowLeft, ShoppingCart, Apple, TreeDeciduous } from 'lucide-react';
import { Link } from 'react-router-dom';

const FRUIT_YIELDS: Record<string, { dwarf: number, semi: number, standard: number }> = {
  'Apple': { dwarf: 2, semi: 6, standard: 15 },
  'Pear': { dwarf: 1.5, semi: 5, standard: 12 },
  'Peach': { dwarf: 1, semi: 4, standard: 8 },
  'Plum': { dwarf: 1, semi: 3, standard: 6 },
  'Cherry': { dwarf: 0.5, semi: 2, standard: 5 },
  'Citrus': { dwarf: 1, semi: 3, standard: 7 }
};

export const FruitYieldEstimator = () => {
  const [treeType, setTreeType] = useState<string>('Apple');
  const [treeSize, setTreeSize] = useState<'dwarf' | 'semi' | 'standard'>('standard');
  const [age, setAge] = useState<string>('10');
  const [health, setHealth] = useState<'poor' | 'average' | 'excellent'>('average');

  const calculateYield = () => {
    const a = parseFloat(age);
    if (isNaN(a) || a <= 0) return null;

    const baseYields = FRUIT_YIELDS[treeType];
    let maxYield = baseYields[treeSize];
    
    // Yield curve: 0 at age 0-3, peaks at age 10-15
    let ageFactor = 0;
    if (a < 3) ageFactor = 0;
    else if (a < 10) ageFactor = (a - 3) / 7;
    else ageFactor = 1.0;

    const healthMultipliers = {
      poor: 0.5,
      average: 1.0,
      excellent: 1.3
    };

    const yieldBushels = maxYield * ageFactor * healthMultipliers[health];
    const yieldLbs = yieldBushels * 42; // 1 bushel ~ 42 lbs for apples/pears

    return {
      bushels: yieldBushels.toFixed(1),
      lbs: yieldLbs.toFixed(0),
      isMature: a >= 10
    };
  };

  const results = calculateYield();

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
          className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Sun className="w-8 h-8 text-orange-500" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Fruit Yield Estimator</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Estimate the seasonal fruit production of your orchard based on tree species, age, and overall health.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-500" />
              Tree Profile
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Fruit Type
                </label>
                <select
                  value={treeType}
                  onChange={(e) => setTreeType(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-white"
                >
                  {Object.keys(FRUIT_YIELDS).map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Tree Size
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => setTreeSize('dwarf')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all text-left flex justify-between items-center ${
                      treeSize === 'dwarf' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    <span>Dwarf (6-8 ft)</span>
                  </button>
                  <button
                    onClick={() => setTreeSize('semi')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all text-left flex justify-between items-center ${
                      treeSize === 'semi' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    <span>Semi-Dwarf (12-15 ft)</span>
                  </button>
                  <button
                    onClick={() => setTreeSize('standard')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all text-left flex justify-between items-center ${
                      treeSize === 'standard' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    <span>Standard (20+ ft)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Tree Age (years)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  placeholder="Years since planting"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Tree Health
                </label>
                <select
                  value={health}
                  onChange={(e) => setHealth(e.target.value as any)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-white"
                >
                  <option value="poor">Poor / Unpruned</option>
                  <option value="average">Average / Healthy</option>
                  <option value="excellent">Excellent / Well-Managed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
            <h3 className="text-orange-900 font-semibold mb-2 flex items-center gap-2">
              <Apple className="w-4 h-4" />
              Harvest Tip
            </h3>
            <p className="text-orange-700 text-sm leading-relaxed">
              Thinning out excess fruit in early summer can lead to larger, higher-quality fruit and prevent branch breakage.
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
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Estimated Yield</div>
                <div className="text-4xl font-bold text-zinc-900 mb-2">{results.bushels} Bushels</div>
                <div className="text-sm text-zinc-400">Per season</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center"
              >
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Apple className="w-6 h-6 text-rose-600" />
                </div>
                <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Total Weight</div>
                <div className="text-4xl font-bold text-zinc-900 mb-2">~{results.lbs} lbs</div>
                <div className="text-sm text-zinc-400">Approximate harvest weight</div>
              </motion.div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200 p-12 text-zinc-400">
              Enter tree details to estimate seasonal fruit yield
            </div>
          )}

          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-orange-600" />
              Fruit Yield Guide
            </h2>
            
            <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">Factors Influencing Yield</h3>
                <p>
                  A fruit tree's yield is primarily determined by its <strong>size class</strong> (Dwarf, Semi-Dwarf, or Standard) and its <strong>age</strong>. Dwarf trees produce fruit sooner (2-3 years) but have a lower total capacity. Standard trees take longer to bear fruit (6-10 years) but can produce massive harvests once mature.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">The Importance of Pruning</h3>
                <p>
                  Proper pruning increases the amount of sunlight that reaches the inner branches, which is essential for fruit bud development. An unpruned tree might have a large canopy but will produce smaller, less flavorful fruit and may have "off-years" where it produces very little.
                </p>
              </section>

              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 mt-8">
                <h4 className="font-semibold text-zinc-900 mb-4">Fruit Yield FAQ</h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-zinc-900">Why did my tree not produce fruit this year?</p>
                    <p>Common reasons include late spring frosts killing blossoms, poor pollination due to lack of bees, or the tree being in a "biennial bearing" cycle.</p>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900">How many pounds are in a bushel?</p>
                    <p>A standard bushel of apples or pears weighs approximately 42-48 pounds. Peaches and plums are slightly heavier at 50 pounds per bushel.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
