import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, Calculator, Info, BookOpen, ArrowLeft, Wind, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TreeCarbonCalculator = () => {
  const [diameter, setDiameter] = useState<string>('15');
  const [height, setHeight] = useState<string>('30');
  const [treeType, setTreeType] = useState<'hardwood' | 'softwood'>('hardwood');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('imperial');

  const calculateCarbon = () => {
    const d = parseFloat(diameter);
    const h = parseFloat(height);
    if (isNaN(d) || isNaN(h) || d <= 0 || h <= 0) return null;

    // Convert to metric if imperial
    const d_cm = unit === 'imperial' ? d * 2.54 : d;
    const h_m = unit === 'imperial' ? h * 0.3048 : h;

    // Simplified biomass formula (W = 0.25 * D^2 * H for hardwood, 0.15 for softwood)
    // This is a very rough estimation for educational purposes
    const coefficient = treeType === 'hardwood' ? 0.25 : 0.15;
    const biomass_kg = coefficient * Math.pow(d_cm, 2) * h_m;
    
    // Carbon is roughly 50% of dry biomass
    const carbon_kg = biomass_kg * 0.5;
    
    // CO2 is 3.67 times the weight of carbon
    const co2_kg = carbon_kg * 3.67;
    
    // Annual sequestration (assuming average tree life of 50 years for simple rate)
    const annual_co2 = co2_kg / 50;

    return {
      total: co2_kg.toFixed(1),
      annual: annual_co2.toFixed(1)
    };
  };

  const results = calculateCarbon();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Leaf className="w-8 h-8 text-green-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Tree Carbon Sequestration Calculator</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Calculate how much carbon dioxide (CO₂) your tree has absorbed over its lifetime and its estimated annual sequestration rate.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-green-600" />
              Measurements
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Unit System
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUnit('imperial')}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      unit === 'imperial' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    Imperial (in/ft)
                  </button>
                  <button
                    onClick={() => setUnit('metric')}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      unit === 'metric' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    Metric (cm/m)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Trunk Diameter (DBH)
                </label>
                <input
                  type="number"
                  value={diameter}
                  onChange={(e) => setDiameter(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  placeholder={unit === 'imperial' ? "Inches" : "Centimeters"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Tree Height
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  placeholder={unit === 'imperial' ? "Feet" : "Meters"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Tree Type
                </label>
                <select
                  value={treeType}
                  onChange={(e) => setTreeType(e.target.value as 'hardwood' | 'softwood')}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-white"
                >
                  <option value="hardwood">Hardwood (Oak, Maple, etc.)</option>
                  <option value="softwood">Softwood (Pine, Spruce, etc.)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-3xl border border-green-100">
            <h3 className="text-green-900 font-semibold mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Climate Impact
            </h3>
            <p className="text-green-700 text-sm leading-relaxed">
              A single mature tree can absorb more than 48 pounds of CO2 per year, making trees our most effective natural tool against climate change.
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
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Wind className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Total CO₂ Sequestered</div>
                <div className="text-4xl font-bold text-zinc-900 mb-2">{results.total} kg</div>
                <div className="text-sm text-zinc-400">Lifetime absorption estimate</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Annual CO₂ Rate</div>
                <div className="text-4xl font-bold text-zinc-900 mb-2">{results.annual} kg/yr</div>
                <div className="text-sm text-zinc-400">Average yearly absorption</div>
              </motion.div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200 p-12 text-zinc-400">
              Enter tree measurements to calculate carbon sequestration
            </div>
          )}

          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-green-600" />
              Understanding Carbon Sequestration
            </h2>
            
            <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">How Trees Store Carbon</h3>
                <p>
                  Through photosynthesis, trees absorb CO₂ from the atmosphere and use the carbon to build their trunks, branches, and roots. This process is called <strong>carbon sequestration</strong>. About 50% of a tree's dry weight is pure carbon.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">Hardwood vs. Softwood</h3>
                <p>
                  Hardwood trees (like Oak and Maple) are generally denser than softwoods (like Pine). This higher density means they can store more carbon in the same volume of wood. However, softwoods often grow faster, allowing them to sequester carbon more quickly in their early years.
                </p>
              </section>

              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 mt-8">
                <h4 className="font-semibold text-zinc-900 mb-4">Tree Carbon FAQ</h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-zinc-900">Which trees absorb the most CO₂?</p>
                    <p>Large, long-lived hardwoods like Oaks and Beeches are excellent long-term carbon sinks. Fast-growing species like Poplars are great for rapid sequestration.</p>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900">What happens to the carbon when a tree dies?</p>
                    <p>When a tree decays or is burned, the stored carbon is released back into the atmosphere as CO₂. This is why preserving old-growth forests is critical.</p>
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
