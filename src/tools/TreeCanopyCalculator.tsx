import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TreePine, Calculator, Info, BookOpen, ArrowLeft, Ruler, Sun, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TreeCanopyCalculator = () => {
  const [diameter, setDiameter] = useState<string>('30');
  const [height, setHeight] = useState<string>('40');
  const [unit, setUnit] = useState<'ft' | 'm'>('ft');

  const calculateCanopy = () => {
    const d = parseFloat(diameter);
    const h = parseFloat(height);
    if (isNaN(d) || isNaN(h) || d <= 0 || h <= 0) return null;

    const radius = d / 2;
    const area = Math.PI * Math.pow(radius, 2);
    
    // Approximate volume as an ellipsoid: (4/3) * π * r1 * r2 * r3
    // Here r1 = r2 = radius, and r3 = height/2
    const volume = (4/3) * Math.PI * Math.pow(radius, 2) * (h / 2);

    return {
      area: area.toFixed(1),
      volume: volume.toFixed(1),
      shadeValue: (area * 0.8).toFixed(1) // 80% effective shade area
    };
  };

  const results = calculateCanopy();

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
          className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <TreePine className="w-8 h-8 text-emerald-700" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Tree Canopy Cover Calculator</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Calculate the ground area covered by your tree's shade and its total canopy volume to understand its environmental impact.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-700" />
              Measurements
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Unit System
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUnit('ft')}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      unit === 'ft' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    Feet (ft)
                  </button>
                  <button
                    onClick={() => setUnit('m')}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      unit === 'm' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    Meters (m)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Canopy Diameter (Spread)
                </label>
                <input
                  type="number"
                  value={diameter}
                  onChange={(e) => setDiameter(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder={`Diameter in ${unit}`}
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
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder={`Height in ${unit}`}
                />
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
            <h3 className="text-emerald-900 font-semibold mb-2 flex items-center gap-2">
              <Sun className="w-4 h-4" />
              Cooling Effect
            </h3>
            <p className="text-emerald-700 text-sm leading-relaxed">
              Urban trees can reduce local air temperatures by as much as 2-8°C, significantly lowering air conditioning costs for nearby buildings.
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
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Cloud className="w-6 h-6 text-emerald-700" />
                </div>
                <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Ground Area Covered</div>
                <div className="text-4xl font-bold text-zinc-900 mb-2">{results.area} {unit}²</div>
                <div className="text-sm text-zinc-400">Total footprint of the canopy</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TreePine className="w-6 h-6 text-emerald-700" />
                </div>
                <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Canopy Volume</div>
                <div className="text-4xl font-bold text-zinc-900 mb-2">{results.volume} {unit}³</div>
                <div className="text-sm text-zinc-400">Estimated three-dimensional space</div>
              </motion.div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200 p-12 text-zinc-400">
              Enter tree measurements to calculate canopy cover
            </div>
          )}

          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-700" />
              Canopy Cover Guide
            </h2>
            
            <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">The Importance of Canopy Cover</h3>
                <p>
                  <strong>Canopy cover</strong> is the percentage of a given area covered by tree crowns as seen from above. It is a critical metric for urban planners and environmentalists because it directly correlates with air quality, stormwater runoff reduction, and the "urban heat island" effect.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">Calculating Shade Area</h3>
                <p>
                  While the canopy area is a circle, the actual <strong>shade area</strong> changes throughout the day based on the sun's angle. Our calculator provides the "noon-day" shade area, which is the most intense and valuable for cooling buildings and pavement.
                </p>
              </section>

              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 mt-8">
                <h4 className="font-semibold text-zinc-900 mb-4">Canopy FAQ</h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-zinc-900">How does canopy volume affect air quality?</p>
                    <p>A larger canopy volume means more leaf surface area, which allows the tree to filter more particulate matter and absorb more gaseous pollutants from the air.</p>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900">What is the ideal canopy cover for a city?</p>
                    <p>Many urban forestry organizations recommend a goal of 40% canopy cover for temperate cities to maximize environmental and health benefits.</p>
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
