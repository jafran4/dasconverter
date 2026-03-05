import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mountain, Calculator, Info, BookOpen, ArrowLeft, Globe, Car, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ForestCarbonOffset = () => {
  const [treeCount, setTreeCount] = useState<string>('100');
  const [avgRate, setAvgRate] = useState<string>('22'); // 22kg is a common average for mature trees
  const [years, setYears] = useState<string>('25');

  const calculateOffset = () => {
    const count = parseFloat(treeCount);
    const rate = parseFloat(avgRate);
    const y = parseFloat(years);
    
    if (isNaN(count) || isNaN(rate) || isNaN(y) || count <= 0 || rate <= 0 || y <= 0) return null;

    const totalOffsetKg = count * rate * y;
    const totalOffsetTons = totalOffsetKg / 1000;

    // Equivalents
    // 1 car = ~4,600 kg CO2/year
    const carsOffRoad = totalOffsetKg / (4600 * y);
    // 1 smartphone charge = ~0.008 kg CO2
    const phoneCharges = totalOffsetKg / 0.008;

    return {
      totalTons: totalOffsetTons.toFixed(1),
      annualTons: (totalOffsetTons / y).toFixed(2),
      carsOffRoad: carsOffRoad.toFixed(1),
      phoneCharges: Math.round(phoneCharges).toLocaleString()
    };
  };

  const results = calculateOffset();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Mountain className="w-8 h-8 text-emerald-800" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Forest CO₂ Offset Calculator</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Calculate the total carbon sequestration potential of a forest or tree-planting project and see its real-world environmental impact.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-800" />
              Project Scope
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Number of Trees
                </label>
                <input
                  type="number"
                  value={treeCount}
                  onChange={(e) => setTreeCount(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder="Total trees planted"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Avg. Sequestration Rate (kg/yr)
                </label>
                <input
                  type="number"
                  value={avgRate}
                  onChange={(e) => setAvgRate(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder="Average kg per tree per year"
                />
                <p className="text-[10px] text-zinc-400 mt-1">Mature trees average 20-25kg/year.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Project Duration (years)
                </label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder="Years to track"
                />
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
            <h3 className="text-emerald-900 font-semibold mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Global Goal
            </h3>
            <p className="text-emerald-700 text-sm leading-relaxed">
              Restoring forests is one of the most effective ways to remove CO2 from the atmosphere and protect biodiversity.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {results ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center"
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6 text-emerald-800" />
                  </div>
                  <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Total Carbon Offset</div>
                  <div className="text-4xl font-bold text-zinc-900 mb-2">{results.totalTons} Tons</div>
                  <div className="text-sm text-zinc-400">Over {years} years</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center"
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mountain className="w-6 h-6 text-emerald-800" />
                  </div>
                  <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Annual Offset</div>
                  <div className="text-4xl font-bold text-zinc-900 mb-2">{results.annualTons} Tons/yr</div>
                  <div className="text-sm text-zinc-400">Average yearly sequestration</div>
                </motion.div>
              </div>

              <div className="bg-zinc-900 text-white p-8 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Car className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{results.carsOffRoad} Cars</div>
                    <div className="text-zinc-400 text-sm">Equivalent to removing cars from the road for {years} years.</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{results.phoneCharges}</div>
                    <div className="text-zinc-400 text-sm">Equivalent smartphone charges offset.</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200 p-12 text-zinc-400">
              Enter project details to calculate carbon offsets
            </div>
          )}

          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-800" />
              Carbon Offset Guide
            </h2>
            
            <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">What is a Carbon Offset?</h3>
                <p>
                  A <strong>carbon offset</strong> is a reduction in emissions of carbon dioxide or other greenhouse gases made in order to compensate for emissions made elsewhere. Planting trees is one of the most popular and effective ways to create offsets because trees naturally absorb CO₂ as they grow.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">Calculating Forest Impact</h3>
                <p>
                  The impact of a forest depends on the species planted, the climate, and the age of the trees. <strong>Young forests</strong> sequester carbon rapidly as they build biomass. <strong>Old-growth forests</strong> act as massive carbon reservoirs, storing centuries worth of carbon in their trunks and soil.
                </p>
              </section>

              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 mt-8">
                <h4 className="font-semibold text-zinc-900 mb-4">Carbon Offset FAQ</h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-zinc-900">How many trees does it take to offset a flight?</p>
                    <p>A round-trip flight from NYC to London emits about 1.6 tons of CO2. It would take approximately 75 mature trees one full year to offset that single flight.</p>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900">Is planting trees enough to stop climate change?</p>
                    <p>While critical, tree planting must be combined with rapid reductions in fossil fuel use to effectively combat global warming.</p>
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
