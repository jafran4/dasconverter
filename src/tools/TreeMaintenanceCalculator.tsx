import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wallet, Calculator, Info, BookOpen, ArrowLeft, ShieldCheck, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TreeMaintenanceCalculator = () => {
  const [treeSize, setTreeSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [age, setAge] = useState<'young' | 'mature' | 'old'>('mature');
  const [maintenanceLevel, setMaintenanceLevel] = useState<'basic' | 'standard' | 'premium'>('standard');

  const calculateCost = () => {
    const baseCosts = {
      small: 75,
      medium: 250,
      large: 600
    };

    const ageMultipliers = {
      young: 0.8,
      mature: 1.0,
      old: 1.5
    };

    const levelMultipliers = {
      basic: 0.6,
      standard: 1.0,
      premium: 1.8
    };

    const annualCost = baseCosts[treeSize] * ageMultipliers[age] * levelMultipliers[maintenanceLevel];
    
    return {
      annual: annualCost.toFixed(0),
      monthly: (annualCost / 12).toFixed(0),
      pruningCycle: treeSize === 'large' ? 'Every 3-5 years' : 'Every 2-3 years'
    };
  };

  const results = calculateCost();

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
          className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Wallet className="w-8 h-8 text-zinc-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Tree Maintenance Cost Calculator</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Estimate the annual cost of professional tree care, including pruning, fertilization, and health inspections.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-zinc-600" />
              Service Plan
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Tree Size
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => setTreeSize('small')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all text-left flex justify-between items-center ${
                      treeSize === 'small' ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/20' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    <span>Small (under 15ft)</span>
                  </button>
                  <button
                    onClick={() => setTreeSize('medium')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all text-left flex justify-between items-center ${
                      treeSize === 'medium' ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/20' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    <span>Medium (15-35ft)</span>
                  </button>
                  <button
                    onClick={() => setTreeSize('large')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all text-left flex justify-between items-center ${
                      treeSize === 'large' ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/20' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    <span>Large (35ft+)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Tree Age
                </label>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value as any)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-500 transition-all bg-white"
                >
                  <option value="young">Young (Establishment)</option>
                  <option value="mature">Mature (Vigorous)</option>
                  <option value="old">Old (Declining/Heritage)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Maintenance Level
                </label>
                <select
                  value={maintenanceLevel}
                  onChange={(e) => setMaintenanceLevel(e.target.value as any)}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-500 transition-all bg-white"
                >
                  <option value="basic">Basic (Pruning only)</option>
                  <option value="standard">Standard (Pruning + Fert)</option>
                  <option value="premium">Premium (All-inclusive)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100">
            <h3 className="text-zinc-900 font-semibold mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Safety Tip
            </h3>
            <p className="text-zinc-700 text-sm leading-relaxed">
              Never attempt to prune large trees or branches near power lines yourself. Always hire a certified arborist for high-risk work.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center"
            >
              <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-6 h-6 text-zinc-600" />
              </div>
              <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Annual Maintenance</div>
              <div className="text-4xl font-bold text-zinc-900 mb-2">${results.annual}</div>
              <div className="text-sm text-zinc-400">Estimated yearly cost</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center"
            >
              <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-zinc-600" />
              </div>
              <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Pruning Cycle</div>
              <div className="text-2xl font-bold text-zinc-900 mb-2">{results.pruningCycle}</div>
              <div className="text-sm text-zinc-400">Recommended frequency</div>
            </motion.div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-zinc-600" />
              Tree Care Cost Guide
            </h2>
            
            <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">What's Included in Maintenance?</h3>
                <p>
                  Professional tree maintenance typically includes <strong>structural pruning</strong> (to remove dead or dangerous branches), <strong>deep-root fertilization</strong> (to provide essential nutrients), and <strong>pest/disease inspections</strong>. Regular care prevents expensive emergency removals and increases property value.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">Why Size and Age Matter</h3>
                <p>
                  <strong>Large trees</strong> require specialized equipment like bucket trucks and cranes, which significantly increases the cost of service. <strong>Older trees</strong> often need more careful pruning and more frequent health monitoring to manage decay and structural issues.
                </p>
              </section>

              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 mt-8">
                <h4 className="font-semibold text-zinc-900 mb-4">Maintenance FAQ</h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-zinc-900">Is tree maintenance tax-deductible?</p>
                    <p>Generally, no for residential properties unless it's part of a business expense or related to casualty loss. Check with a tax professional.</p>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900">How much does it cost to remove a tree?</p>
                    <p>Tree removal is a separate cost from maintenance and can range from $500 to $3,000+ depending on the size and complexity of the job.</p>
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
