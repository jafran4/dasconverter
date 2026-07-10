import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  ArrowLeft, 
  Info, 
  HelpCircle, 
  ChevronRight, 
  DollarSign,
  RefreshCw,
  Building2,
  Calendar,
  Layers,
  PieChart,
  ShieldCheck,
  Landmark
} from 'lucide-react';
import { Link } from 'react-router-dom';

type FilingStatus = 'single' | 'married_joint' | 'married_separate' | 'head_household';

export const CapitalGainsTaxCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState<string>('');
  const [salePrice, setSalePrice] = useState<string>('');
  const [sellingCosts, setSellingCosts] = useState<string>('');
  const [annualIncome, setAnnualIncome] = useState<string>('');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [holdingPeriod, setHoldingPeriod] = useState<'short' | 'long'>('long');
  const [result, setResult] = useState<any>(null);

  const calculateTax = () => {
    const buy = parseFloat(purchasePrice) || 0;
    const sell = parseFloat(salePrice) || 0;
    const costs = parseFloat(sellingCosts) || 0;
    const income = parseFloat(annualIncome) || 0;

    const gain = sell - buy - costs;
    
    if (gain <= 0) {
      setResult({
        gain: Math.max(0, gain),
        tax: 0,
        net: sell - costs,
        isLoss: gain < 0,
        explanation: gain < 0 ? "You have a capital loss. You may be able to use this to offset other gains." : "No capital gain detected."
      });
      return;
    }

    let taxRate = 0;

    if (holdingPeriod === 'long') {
      // 2024 Long Term Capital Gains Brackets (Simplified)
      if (filingStatus === 'single') {
        if (income <= 47025) taxRate = 0;
        else if (income <= 518900) taxRate = 0.15;
        else taxRate = 0.20;
      } else if (filingStatus === 'married_joint') {
        if (income <= 94050) taxRate = 0;
        else if (income <= 583750) taxRate = 0.15;
        else taxRate = 0.20;
      } else {
        // Approximate for others
        if (income <= 40000) taxRate = 0;
        else if (income <= 450000) taxRate = 0.15;
        else taxRate = 0.20;
      }
    } else {
      // Short term is taxed at ordinary income rates (Simplified average brackets)
      if (income <= 11600) taxRate = 0.10;
      else if (income <= 47150) taxRate = 0.12;
      else if (income <= 100525) taxRate = 0.22;
      else if (income <= 191950) taxRate = 0.24;
      else if (income <= 243725) taxRate = 0.32;
      else if (income <= 609350) taxRate = 0.35;
      else taxRate = 0.37;
    }

    const taxAmount = gain * taxRate;
    const netProceeds = sell - costs - taxAmount;

    setResult({
      gain,
      tax: taxAmount,
      rate: taxRate * 100,
      net: netProceeds,
      isLoss: false,
      holdingPeriod: holdingPeriod === 'long' ? 'Long-term (> 1 year)' : 'Short-term (≤ 1 year)',
      explanation: `Based on your ${holdingPeriod === 'long' ? 'long-term' : 'short-term'} holding period and income, your estimated tax rate is ${ (taxRate * 100).toFixed(1) }%.`
    });
  };

  const reset = () => {
    setPurchasePrice('');
    setSalePrice('');
    setSellingCosts('');
    setAnnualIncome('');
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 font-sans">
      {/* Main Tool Section - Full Screen Height */}
      <section className="min-h-screen flex flex-col justify-center pt-24 pb-12">
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Tools
        </Link>

        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-100"
          >
            <TrendingUp className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Capital Gains Tax Calculator</h1>
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Estimate your taxes when selling assets. Specifically optimized as a <strong>capital gains tax calculator on sale of property</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white p-8 rounded-[32px] border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">
                    Purchase Price
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="number"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all text-zinc-900 text-lg font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">
                    Sale Price
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="number"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all text-zinc-900 text-lg font-medium"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">
                  Annual Household Income
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value)}
                    placeholder="Your total yearly income"
                    className="w-full pl-10 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all text-zinc-900 text-lg font-medium"
                  />
                </div>
                <p className="mt-2 text-xs text-zinc-400">Include all sources of income to determine your tax bracket.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">
                    Filing Status
                  </label>
                  <select
                    value={filingStatus}
                    onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
                    className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all text-zinc-900 font-medium"
                  >
                    <option value="single">Single</option>
                    <option value="married_joint">Married Filing Jointly</option>
                    <option value="married_separate">Married Filing Separately</option>
                    <option value="head_household">Head of Household</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">
                    Holding Period
                  </label>
                  <div className="flex bg-zinc-50 p-1 rounded-2xl border border-zinc-200">
                    <button
                      onClick={() => setHoldingPeriod('short')}
                      className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${holdingPeriod === 'short' ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100' : 'text-zinc-500 hover:text-zinc-700'}`}
                    >
                      Short Term
                    </button>
                    <button
                      onClick={() => setHoldingPeriod('long')}
                      className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${holdingPeriod === 'long' ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100' : 'text-zinc-500 hover:text-zinc-700'}`}
                    >
                      Long Term
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">
                  Sale Costs (Commissions, Legal)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="number"
                    value={sellingCosts}
                    onChange={(e) => setSellingCosts(e.target.value)}
                    placeholder="e.g. 15000"
                    className="w-full pl-10 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all text-zinc-900 text-lg font-medium"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={calculateTax}
                  className="flex-grow py-5 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100"
                >
                  <ChevronRight className="w-6 h-6" />
                  Calculate Tax
                </button>
                <button
                  onClick={reset}
                  className="px-6 py-5 bg-zinc-100 text-zinc-600 rounded-2xl font-bold hover:bg-zinc-200 transition-all flex items-center justify-center"
                >
                  <RefreshCw className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-900 p-8 rounded-[32px] text-white overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-emerald-400" />
                  Projection
                </h3>
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="space-y-6">
                        <div>
                          <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-1">Total Capital Gain</p>
                          <div className="text-3xl font-mono font-bold text-white">
                            ${result.gain.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </div>
                        </div>
                        
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                          <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-1">Estimated Tax</p>
                          <div className="text-2xl font-mono font-bold text-emerald-400">
                            ${result.tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </div>
                          {result.rate !== undefined && (
                            <div className="text-xs text-white/40 mt-1">Effective rate: {result.rate.toFixed(1)}%</div>
                          )}
                        </div>

                        <div>
                          <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-1">Net Proceeds</p>
                          <div className="text-xl font-mono font-bold text-white/90">
                            ${result.net.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                          <p className="text-white/60 text-xs leading-relaxed italic">{result.explanation}</p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-12 text-center"
                    >
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Layers className="w-6 h-6 text-zinc-500" />
                      </div>
                      <p className="text-zinc-500 text-sm">Enter transaction details to see your tax estimation</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl -mr-16 -mt-16 rounded-full" />
            </div>

            <div className="bg-emerald-50 p-6 rounded-[32px] border border-emerald-100">
              <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Tax Tip
              </h4>
              <p className="text-emerald-700 text-sm leading-relaxed">
                If this was your primary residence for at least 2 of the last 5 years, you might qualify for an exclusion of up to $250k ($500k married) on property sale gains.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog & FAQ Section - Below the Tool */}
      <div className="prose prose-zinc max-w-none border-t border-zinc-100 pt-16 pb-24 font-sans">
        <h2 className="text-4xl font-bold text-zinc-900 mb-8 tracking-tight">Expert Guide: Capital Gains Tax on Sale of Property</h2>
        
        <p className="text-zinc-600 text-lg leading-relaxed mb-8">
          Selling a home or investment property is one of the largest financial transactions you'll ever make. Understanding your tax liability is crucial for accurate profit projections. Our <strong>capital gains tax calculator on sale of property</strong> helps you navigate the complex world of IRS tax brackets and holding periods.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 font-sans">
          <div className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3">
              <Building2 className="w-6 h-6 text-emerald-600" />
              Property Sale Basis
            </h3>
            <p className="text-zinc-600 leading-relaxed font-sans">
              Your capital gain in a <strong>capital gains tax calculator on sale of property</strong> isn't just the sale price minus the purchase price. You must consider your "Adjusted Basis." This includes the original cost plus capital improvements (like a new roof or a kitchen remodel), which reduces your taxable gain.
            </p>
          </div>
          <div className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              Short-Term vs. Long-Term
            </h3>
            <p className="text-zinc-600 leading-relaxed font-sans">
              Holding an asset for more than one year qualifies you for long-term rates, which are significantly lower (0%, 15%, or 20%). Assets sold within a year are taxed at ordinary income rates, reaching up to 37%. Timing your property sale can save you thousands.
            </p>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 mb-6 tracking-tight">How to Use the Capital Gains Tax Calculator</h2>
          <p className="text-zinc-600 mb-8">Follow these steps for the most accurate <strong>capital gains tax calculator on sale of property</strong> estimation:</p>
          
          <div className="space-y-6">
            <div className="flex gap-6 p-6 rounded-2xl hover:bg-zinc-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">1</div>
              <div>
                <h4 className="font-bold text-zinc-900 mb-2">Determine Your Cost Basis</h4>
                <p className="text-zinc-600 leading-relaxed">Enter the original purchase price. Don't forget to include major renovations in your selling costs for a more favorable tax result.</p>
              </div>
            </div>
            <div className="flex gap-6 p-6 rounded-2xl hover:bg-zinc-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">2</div>
              <div>
                <h4 className="font-bold text-zinc-900 mb-2">Identify Your Net Sale Price</h4>
                <p className="text-zinc-600 leading-relaxed">This is your closing price minus agent commissions, transfer taxes, and legal fees. High selling costs actually reduce your tax burden.</p>
              </div>
            </div>
            <div className="flex gap-6 p-6 rounded-2xl hover:bg-zinc-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">3</div>
              <div>
                <h4 className="font-bold text-zinc-900 mb-2">Select Your Holding Period</h4>
                <p className="text-zinc-600 leading-relaxed">The difference between 364 days and 366 days could be a 15-20% difference in your tax rate. Long-term gains are always preferred for large assets.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-white border border-zinc-200 rounded-[2.5rem] p-10 shadow-sm mt-12 font-sans">
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 flex items-center gap-3 tracking-tight">
            <Landmark className="w-8 h-8 text-emerald-600" />
            Tax Exemptions for Property
          </h2>
          <p className="text-zinc-600 mb-6 leading-relaxed">
            While using a <strong>capital gains tax calculator on sale of property</strong>, remember Section 121 of the Internal Revenue Code. It allows individuals to exclude up to $250,000 ($500,000 for married couples) of gain from the sale of their primary residence if they meet specific ownership and use tests.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="p-6 bg-zinc-50 rounded-2xl">
              <h5 className="font-bold text-zinc-900 mb-2">Qualifications:</h5>
              <ul className="space-y-1 text-zinc-500 list-disc pl-4">
                <li>Must have owned the home for 2 years</li>
                <li>Must have lived in it for at least 2 years</li>
                <li>Applies only to primary residences</li>
                <li>Can be used every 2 years</li>
              </ul>
            </div>
            <div className="p-6 bg-zinc-50 rounded-2xl">
              <h5 className="font-bold text-zinc-900 mb-2">Common Deductions:</h5>
              <ul className="space-y-1 text-zinc-500 list-disc pl-4">
                <li>Real estate agent commissions</li>
                <li>Title insurance and legal costs</li>
                <li>Qualified home improvements</li>
                <li>Unused points paid on original mortgage</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3 mb-12 opacity-50">
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Keywords:</span>
          {[
            'capital gains tax calculator on sale of property',
            'property tax gain estimator',
            'real estate tax calculator',
            'short term capital gains property',
            'long term capital gains rates 2024',
            'tax on house sale calculator'
          ].map((kw) => (
            <span key={kw} className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">{kw} •</span>
          ))}
        </div>
      </div>
    </div>
  );
};
