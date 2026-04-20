import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Calculator, Info, BookOpen, ArrowLeft, Sprout, TreePine, Mountain } from 'lucide-react';
import { Link } from 'react-router-dom';

const GROWTH_RATES: Record<string, { height: number, spread: number }> = {
  'Fast (Willow, Poplar, Empress)': { height: 4.5, spread: 3.0 },
  'Medium-Fast (Silver Maple, Birch)': { height: 2.5, spread: 2.0 },
  'Medium (Red Maple, Pin Oak)': { height: 1.5, spread: 1.2 },
  'Medium-Slow (White Oak, Beech)': { height: 0.8, spread: 0.6 },
  'Slow (Ginkgo, Japanese Maple)': { height: 0.4, spread: 0.3 }
};

export const TreeGrowthCalculator = () => {
  const [currentHeight, setCurrentHeight] = useState<string>('5');
  const [speciesType, setSpeciesType] = useState<string>('Medium (Red Maple, Pin Oak)');
  const [soilQuality, setSoilQuality] = useState<'poor' | 'average' | 'excellent'>('average');
  const [years, setYears] = useState<string>('10');

  const calculateGrowth = () => {
    const h = parseFloat(currentHeight);
    const y = parseFloat(years);
    if (isNaN(h) || isNaN(y) || h < 0 || y <= 0) return null;

    const baseRates = GROWTH_RATES[speciesType];
    
    const soilMultipliers = {
      poor: 0.6,
      average: 1.0,
      excellent: 1.4
    };
    
    const annualHeightGrowth = baseRates.height * soilMultipliers[soilQuality];
    const annualSpreadGrowth = baseRates.spread * soilMultipliers[soilQuality];
    
    const finalHeight = h + (annualHeightGrowth * y);
    const totalSpread = annualSpreadGrowth * y;

    return {
      annualHeight: annualHeightGrowth.toFixed(1),
      finalHeight: finalHeight.toFixed(1),
      totalSpread: totalSpread.toFixed(1)
    };
  };

  const results = calculateGrowth();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <TrendingUp className="w-8 h-8 text-emerald-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Tree Growth Rate Calculator</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Predict the future height and canopy spread of your tree based on its species growth characteristics and environmental factors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              Growth Factors
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Current Height (ft)
                </label>
                <input
                  type="number"
                  value={currentHeight}
                  onChange={(e) => setCurrentHeight(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder="Current height in feet"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Growth Category
                </label>
                <select
                  value={speciesType}
                  onChange={(e) => setSpeciesType(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
                >
                  {Object.keys(GROWTH_RATES).map(rate => (
                    <option key={rate} value={rate}>{rate}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Soil Quality
                </label>
                <select
                  value={soilQuality}
                  onChange={(e) => setSoilQuality(e.target.value as any)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
                >
                  <option value="poor">Poor / Compacted</option>
                  <option value="average">Average / Loam</option>
                  <option value="excellent">Excellent / Nutrient Rich</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Projection (years)
                </label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder="Years in the future"
                />
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
            <h3 className="text-emerald-900 font-semibold mb-2 flex items-center gap-2">
              <Sprout className="w-4 h-4" />
              Growth Tip
            </h3>
            <p className="text-emerald-700 text-sm leading-relaxed">
              Trees grow fastest in their juvenile years. As they reach maturity, height growth slows down while trunk diameter and canopy density increase.
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
                  <TreePine className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Future Height</div>
                <div className="text-4xl font-bold text-zinc-900 mb-2">{results.finalHeight} ft</div>
                <div className="text-sm text-zinc-400">In {years} years</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Annual Growth</div>
                <div className="text-4xl font-bold text-zinc-900 mb-2">+{results.annualHeight} ft/yr</div>
                <div className="text-sm text-zinc-400">Average yearly increase</div>
              </motion.div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200 p-12 text-zinc-400">
              Enter tree details to predict future growth
            </div>
          )}

          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-600" />
              Understanding Tree Growth
            </h2>
            
            <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">What Affects Growth Rate?</h3>
                <p>
                  A tree's growth is determined by its genetics (species) and its environment. <strong>Fast-growing trees</strong> like Willows can add 5 feet of height in a single year, but they often have weaker wood and shorter lifespans. <strong>Slow-growing trees</strong> like Oaks build dense, strong wood and can live for centuries.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">The Role of Soil and Water</h3>
                <p>
                  Soil quality is the primary environmental factor. Nutrient-rich, well-draining soil allows roots to expand quickly, providing the energy needed for rapid vertical growth. Compaction or poor drainage can stunt even the fastest-growing species.
                </p>
              </section>

              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 mt-8">
                <h4 className="font-semibold text-zinc-900 mb-4">Tree Growth FAQ</h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-zinc-900">How can I make my tree grow faster?</p>
                    <p>Provide consistent water, use organic mulch to improve soil quality, and ensure the tree is planted in the correct sun exposure for its species.</p>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900">Do trees ever stop growing?</p>
                    <p>Technically, no. Trees continue to grow as long as they are alive, but the rate of growth slows significantly once they reach their biological "mature height."</p>
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
