import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TreeDeciduous, Calculator, Info, BookOpen, ArrowLeft, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';

const SPECIES_FACTORS: Record<string, number> = {
  'White Oak': 5.0,
  'Red Oak': 4.0,
  'Pin Oak': 3.0,
  'Linden': 3.0,
  'Sugar Maple': 5.5,
  'Silver Maple': 3.0,
  'Red Maple': 4.5,
  'White Pine': 2.5,
  'Norway Spruce': 5.0,
  'Birch': 2.0,
  'Aspen': 2.0,
  'Beech': 6.0,
  'Hickory': 7.5,
  'Walnut': 4.5,
  'Other (Average)': 4.0
};

export const TreeAgeEstimator = () => {
  const [diameter, setDiameter] = useState<string>('20');
  const [unit, setUnit] = useState<'cm' | 'inch'>('inch');
  const [species, setSpecies] = useState<string>('White Oak');

  const calculateAge = () => {
    const d = parseFloat(diameter);
    if (isNaN(d) || d <= 0) return null;

    const diameterInInches = unit === 'cm' ? d / 2.54 : d;
    const factor = SPECIES_FACTORS[species] || 4.0;
    const age = diameterInInches * factor;

    return Math.round(age);
  };

  const age = calculateAge();

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
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
          <TreeDeciduous className="w-8 h-8 text-emerald-600" />
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">Tree Age Estimator</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto text-sm sm:text-base">
          Estimate the age of a living tree without cutting it down using the ISA growth factor method.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              Tree Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Trunk Diameter (at 4.5ft height)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <input
                    type="number"
                    value={diameter}
                    onChange={(e) => setDiameter(e.target.value)}
                    className="sm:col-span-3 px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    placeholder="Enter diameter"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as 'cm' | 'inch')}
                    className="sm:col-span-1 px-3 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
                  >
                    <option value="inch">in</option>
                    <option value="cm">cm</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Tree Species
                </label>
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
                >
                  {Object.keys(SPECIES_FACTORS).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
            <h3 className="text-emerald-900 font-semibold mb-2 flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              Measurement Guide
            </h3>
            <p className="text-emerald-700 text-sm leading-relaxed">
              Measure the circumference of the tree at 4.5 feet (1.4 meters) above the ground. Divide the circumference by 3.14 (π) to get the diameter.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {age !== null ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center"
            >
              <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Estimated Tree Age</div>
              <div className="text-6xl font-bold text-emerald-600 mb-4">{age} Years</div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                Based on {species} growth factor
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200 p-12 text-zinc-400">
              Enter tree measurements to estimate age
            </div>
          )}

          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-600" />
              How to Estimate Tree Age
            </h2>
            
            <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">The Growth Factor Method</h3>
                <p>
                  Since we cannot count the rings of a living tree, arborists use "growth factors." Each species has a specific rate at which it grows in diameter. By multiplying the diameter (DBH - Diameter at Breast Height) by the species' growth factor, we can arrive at a reliable estimate of its age.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">Why DBH Matters</h3>
                <p>
                  DBH stands for <strong>Diameter at Breast Height</strong>. This is the standard measurement point for trees, exactly 4.5 feet above the ground. Measuring at this height avoids the flare of the roots and provides a consistent data point for all species.
                </p>
              </section>

              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
                <h4 className="font-semibold text-zinc-900 mb-4">Common Growth Factors</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>• White Oak: 5.0</div>
                  <div>• Red Oak: 4.0</div>
                  <div>• Sugar Maple: 5.5</div>
                  <div>• Silver Maple: 3.0</div>
                  <div>• White Pine: 2.5</div>
                  <div>• Beech: 6.0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-12 border-t border-zinc-100 pt-12">
        <section>
          <h2 className="text-3xl font-bold text-zinc-900 mb-6">Tree Age Calculator: Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-emerald-700">How accurate is this estimation?</h3>
              <p className="text-zinc-600">
                While growth factors provide a good baseline, factors like soil quality, water availability, and competition can significantly impact a tree's actual growth. This tool provides a scientific estimate, but the only 100% accurate method is ring counting or carbon dating.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-emerald-700">What if my tree species isn't listed?</h3>
              <p className="text-zinc-600">
                You can use the "Other (Average)" option which uses a factor of 4.0, or research your specific species' growth factor and use the "Other" option if you know the value.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
