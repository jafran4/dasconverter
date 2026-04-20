import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sprout, Calculator, Info, BookOpen, ArrowLeft, Ruler, TreePine, TreeDeciduous } from 'lucide-react';
import { Link } from 'react-router-dom';

const TREE_SPREADS: Record<string, number> = {
  'Large Shade Tree (Oak, Maple)': 50,
  'Medium Shade Tree (Birch, Ash)': 35,
  'Small Ornamental (Dogwood, Redbud)': 20,
  'Columnar Tree (Poplar, Cypress)': 10,
  'Fruit Tree (Apple, Pear)': 25,
  'Large Evergreen (Spruce, Pine)': 30,
  'Small Evergreen (Arborvitae, Juniper)': 10
};

export const TreeSpacingCalculator = () => {
  const [matureSpread, setMatureSpread] = useState<string>('50');
  const [treeType, setTreeType] = useState<string>('Large Shade Tree (Oak, Maple)');
  const [density, setDensity] = useState<'dense' | 'standard' | 'open'>('standard');
  const [areaWidth, setAreaWidth] = useState<string>('100');
  const [areaLength, setAreaLength] = useState<string>('100');

  const calculateSpacing = () => {
    const spread = parseFloat(matureSpread);
    const width = parseFloat(areaWidth);
    const length = parseFloat(areaLength);
    
    if (isNaN(spread) || isNaN(width) || isNaN(length) || spread <= 0 || width <= 0 || length <= 0) return null;

    const densityMultipliers = {
      dense: 0.5,
      standard: 0.75,
      open: 1.0
    };

    const spacing = spread * densityMultipliers[density];
    
    // Calculate number of trees in a grid
    const treesWide = Math.floor(width / spacing) + 1;
    const treesLong = Math.floor(length / spacing) + 1;
    const totalTrees = treesWide * treesLong;

    return {
      spacing: spacing.toFixed(1),
      totalTrees,
      treesWide,
      treesLong
    };
  };

  const results = calculateSpacing();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Sprout className="w-8 h-8 text-amber-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Tree Planting Spacing Calculator</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Determine the optimal distance between trees to ensure healthy growth, proper airflow, and maximum visual impact.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-600" />
              Planting Plan
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Tree Type
                </label>
                <select
                  value={treeType}
                  onChange={(e) => {
                    setTreeType(e.target.value);
                    setMatureSpread(TREE_SPREADS[e.target.value].toString());
                  }}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all bg-white"
                >
                  {Object.keys(TREE_SPREADS).map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Mature Spread (ft)
                </label>
                <input
                  type="number"
                  value={matureSpread}
                  onChange={(e) => setMatureSpread(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  placeholder="Mature width in feet"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Planting Density
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => setDensity('dense')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all text-left flex justify-between items-center ${
                      density === 'dense' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    <span>Dense (Screening)</span>
                    <span className="text-xs opacity-70">50% Spread</span>
                  </button>
                  <button
                    onClick={() => setDensity('standard')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all text-left flex justify-between items-center ${
                      density === 'standard' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    <span>Standard (Orchard)</span>
                    <span className="text-xs opacity-70">75% Spread</span>
                  </button>
                  <button
                    onClick={() => setDensity('open')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all text-left flex justify-between items-center ${
                      density === 'open' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    <span>Open (Specimen)</span>
                    <span className="text-xs opacity-70">100% Spread</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-zinc-100">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase">Area Width (ft)</label>
                  <input
                    type="number"
                    value={areaWidth}
                    onChange={(e) => setAreaWidth(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase">Area Length (ft)</label>
                  <input
                    type="number"
                    value={areaLength}
                    onChange={(e) => setAreaLength(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-200 rounded-xl text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
            <h3 className="text-amber-900 font-semibold mb-2 flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              Spacing Tip
            </h3>
            <p className="text-amber-700 text-sm leading-relaxed">
              Always consider overhead power lines and underground utilities before choosing your planting spots.
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
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Ruler className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Recommended Spacing</div>
                <div className="text-4xl font-bold text-zinc-900 mb-2">{results.spacing} ft</div>
                <div className="text-sm text-zinc-400">Distance between trunks</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TreePine className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Total Trees Needed</div>
                <div className="text-4xl font-bold text-zinc-900 mb-2">{results.totalTrees}</div>
                <div className="text-sm text-zinc-400">For {areaWidth}x{areaLength} ft area</div>
              </motion.div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200 p-12 text-zinc-400">
              Enter tree spread and area dimensions to calculate spacing
            </div>
          )}

          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-600" />
              Tree Spacing Guide
            </h2>
            
            <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">Why Spacing Matters</h3>
                <p>
                  Proper spacing is critical for the long-term health of your trees. When trees are planted too close together, they compete for sunlight, water, and soil nutrients. This competition can lead to stunted growth, increased susceptibility to pests, and poor structural integrity.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">Choosing Your Density</h3>
                <p>
                  <strong>Dense planting</strong> is ideal for creating privacy screens or windbreaks. <strong>Standard spacing</strong> is best for orchards or woodlots where you want a balance between tree count and individual health. <strong>Open spacing</strong> is used for specimen trees in a landscape where you want to showcase the tree's natural form.
                </p>
              </section>

              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 mt-8">
                <h4 className="font-semibold text-zinc-900 mb-4">Planting Spacing FAQ</h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-zinc-900">How far should I plant a tree from my house?</p>
                    <p>As a general rule, plant large trees at least 15-20 feet away from your foundation to prevent root damage and branch interference.</p>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900">Can I plant different species together?</p>
                    <p>Yes, but use the mature spread of the larger species to determine the spacing between them to ensure neither is shaded out.</p>
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
