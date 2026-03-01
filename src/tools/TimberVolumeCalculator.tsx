import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scale, Calculator, Info, BookOpen, ArrowLeft, Ruler, TreePine, TreeDeciduous } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TimberVolumeCalculator = () => {
  const [diameter, setDiameter] = useState<string>('20');
  const [height, setHeight] = useState<string>('40');
  const [species, setSpecies] = useState<'hardwood' | 'softwood'>('hardwood');
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');

  const calculateVolume = () => {
    const d = parseFloat(diameter);
    const h = parseFloat(height);
    if (isNaN(d) || isNaN(h) || d <= 0 || h <= 0) return null;

    // Convert to imperial for Doyle Rule calculation
    const d_in = unit === 'metric' ? d / 2.54 : d;
    const h_ft = unit === 'metric' ? h / 0.3048 : h;

    // Doyle Rule: Board Feet = (D - 4)^2 * (L / 16)
    // D is diameter in inches, L is length in feet
    const boardFeet = Math.pow(d_in - 4, 2) * (h_ft / 16);
    
    // Cubic Feet (approx cylinder with 0.4 taper factor)
    // Volume = π * (D/2)^2 * H * 0.4
    const radius_ft = (d_in / 12) / 2;
    const cubicFeet = Math.PI * Math.pow(radius_ft, 2) * h_ft * 0.4;

    return {
      boardFeet: Math.max(0, boardFeet).toFixed(0),
      cubicFeet: cubicFeet.toFixed(1),
      cubicMeters: (cubicFeet * 0.0283168).toFixed(2)
    };
  };

  const results = calculateVolume();

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
          className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Scale className="w-8 h-8 text-stone-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Timber Volume Calculator</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Estimate the wood volume of a standing tree in board feet and cubic units for forestry and lumber planning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-stone-600" />
              Tree Measurements
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
                  Diameter at Breast Height (DBH)
                </label>
                <input
                  type="number"
                  value={diameter}
                  onChange={(e) => setDiameter(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-500/20 focus:border-stone-500 transition-all"
                  placeholder={unit === 'imperial' ? "Inches" : "Centimeters"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Merchantable Height
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-500/20 focus:border-stone-500 transition-all"
                  placeholder={unit === 'imperial' ? "Feet" : "Meters"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Wood Type
                </label>
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value as any)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-500/20 focus:border-stone-500 transition-all bg-white"
                >
                  <option value="hardwood">Hardwood (Oak, Maple)</option>
                  <option value="softwood">Softwood (Pine, Spruce)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
            <h3 className="text-stone-900 font-semibold mb-2 flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              Measurement Tip
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed">
              Merchantable height is the usable portion of the trunk, typically measured from the stump to a point where the diameter is too small for lumber.
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
                <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TreePine className="w-6 h-6 text-stone-600" />
                </div>
                <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Board Feet (Doyle)</div>
                <div className="text-4xl font-bold text-zinc-900 mb-2">{results.boardFeet} BF</div>
                <div className="text-sm text-zinc-400">Estimated lumber yield</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center"
              >
                <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TreeDeciduous className="w-6 h-6 text-stone-600" />
                </div>
                <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Total Cubic Volume</div>
                <div className="text-4xl font-bold text-zinc-900 mb-2">{results.cubicFeet} ft³</div>
                <div className="text-sm text-zinc-400">~{results.cubicMeters} m³</div>
              </motion.div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200 p-12 text-zinc-400">
              Enter tree measurements to calculate timber volume
            </div>
          )}

          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-stone-600" />
              Timber Volume Guide
            </h2>
            
            <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">What is a Board Foot?</h3>
                <p>
                  A <strong>board foot (BF)</strong> is a unit of volume for lumber in the United States and Canada. It is defined as a piece of wood that is 12 inches long, 12 inches wide, and 1 inch thick (144 cubic inches).
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">The Doyle Rule</h3>
                <p>
                  The <strong>Doyle Rule</strong> is one of the oldest and most common log scaling methods used in the eastern and southern United States. It is known for underestimating the volume of small logs and overestimating the volume of large logs, making it a standard for many timber buyers.
                </p>
              </section>

              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 mt-8">
                <h4 className="font-semibold text-zinc-900 mb-4">Timber Volume FAQ</h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-zinc-900">How do I measure tree height for timber?</p>
                    <p>Use a clinometer or a simple stick method to estimate the height from the stump to a 4-inch or 8-inch top diameter, depending on the desired lumber quality.</p>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900">What is the difference between BF and Cubic Feet?</p>
                    <p>Board feet measures the usable lumber after milling, while cubic feet measures the total volume of the wood in the trunk, including the portion that will become sawdust or scrap.</p>
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
