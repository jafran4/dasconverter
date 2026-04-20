import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CloudRain, Calculator, Info, BookOpen, ArrowLeft, Droplets, Sun, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TreeWaterCalculator = () => {
  const [diameter, setDiameter] = useState<string>('5');
  const [age, setAge] = useState<'young' | 'mature'>('young');
  const [climate, setClimate] = useState<'arid' | 'temperate' | 'humid'>('temperate');
  const [season, setSeason] = useState<'summer' | 'spring' | 'winter'>('summer');

  const calculateWater = () => {
    const d = parseFloat(diameter);
    if (isNaN(d) || d <= 0) return null;

    // Base rule: 10 gallons per inch of diameter per week
    let weeklyGallons = d * 10;

    // Adjust for age (young trees need ~50% more frequent/volume)
    if (age === 'young') {
      weeklyGallons *= 1.5;
    }

    // Adjust for climate
    const climateFactors = {
      arid: 1.8,
      temperate: 1.0,
      humid: 0.6
    };
    weeklyGallons *= climateFactors[climate];

    // Adjust for season
    const seasonFactors = {
      summer: 1.5,
      spring: 1.0,
      winter: 0.3
    };
    weeklyGallons *= seasonFactors[season];

    return {
      weekly: weeklyGallons.toFixed(1),
      daily: (weeklyGallons / 7).toFixed(1),
      frequency: age === 'young' ? '2-3 times per week' : 'Once per week'
    };
  };

  const results = calculateWater();

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
          className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <CloudRain className="w-8 h-8 text-blue-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Tree Water Requirement Calculator</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Calculate the optimal amount of water your tree needs based on its size, age, and local climate conditions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              Parameters
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Trunk Diameter (inches)
                </label>
                <input
                  type="number"
                  value={diameter}
                  onChange={(e) => setDiameter(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="Diameter in inches"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Tree Age
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAge('young')}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      age === 'young' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    Young (0-3 yrs)
                  </button>
                  <button
                    onClick={() => setAge('mature')}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      age === 'mature' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    Mature (3+ yrs)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Climate
                </label>
                <select
                  value={climate}
                  onChange={(e) => setClimate(e.target.value as any)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
                >
                  <option value="arid">Arid / Desert</option>
                  <option value="temperate">Temperate / Moderate</option>
                  <option value="humid">Humid / Tropical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Current Season
                </label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value as any)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
                >
                  <option value="summer">Summer (Hot)</option>
                  <option value="spring">Spring / Fall (Mild)</option>
                  <option value="winter">Winter (Cold/Dormant)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
            <h3 className="text-blue-900 font-semibold mb-2 flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              Watering Tip
            </h3>
            <p className="text-blue-700 text-sm leading-relaxed">
              Water deeply and slowly at the drip line (the edge of the canopy) rather than at the trunk to encourage deep root growth.
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
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Weekly Water Need</div>
                <div className="text-4xl font-bold text-zinc-900 mb-2">{results.weekly} Gallons</div>
                <div className="text-sm text-zinc-400">Total volume per week</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center"
              >
                <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Wind className="w-6 h-6 text-sky-600" />
                </div>
                <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Watering Frequency</div>
                <div className="text-2xl font-bold text-zinc-900 mb-2">{results.frequency}</div>
                <div className="text-sm text-zinc-400">Recommended schedule</div>
              </motion.div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200 p-12 text-zinc-400">
              Enter tree details to calculate water requirements
            </div>
          )}

          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Tree Watering Guide
            </h2>
            
            <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">The 10-Gallon Rule</h3>
                <p>
                  A standard rule of thumb for established trees is to provide <strong>10 gallons of water for every inch of trunk diameter</strong> per week. During extreme heat or drought, this may need to be doubled.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">Young vs. Mature Trees</h3>
                <p>
                  <strong>Young trees</strong> (planted within the last 3 years) have limited root systems and need frequent, shallow watering to stay hydrated. <strong>Mature trees</strong> have deep roots and prefer infrequent but deep watering that saturates the soil to a depth of 12-18 inches.
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <h4 className="font-semibold text-zinc-900 mb-2 flex items-center gap-2">
                    <Sun className="w-4 h-4 text-orange-500" />
                    Signs of Underwatering
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Wilting or curling leaves</li>
                    <li>• Premature fall color</li>
                    <li>• Brittle or dry twigs</li>
                    <li>• Cracked soil around the base</li>
                  </ul>
                </div>
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <h4 className="font-semibold text-zinc-900 mb-2 flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    Signs of Overwatering
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Yellowing inner leaves</li>
                    <li>• Soft, mushy bark at base</li>
                    <li>• Standing water for 24+ hours</li>
                    <li>• Fungal growth on soil</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
