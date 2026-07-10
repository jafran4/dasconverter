import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  ArrowLeft, 
  Info, 
  HelpCircle, 
  ChevronRight, 
  RefreshCw,
  DollarSign,
  Calendar,
  ShieldCheck,
  TrendingDown,
  Coins,
  HandCoins,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ReverseMortgageCalculator = () => {
  const [homeValue, setHomeValue] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [mortgageBalance, setMortgageBalance] = useState<string>('0');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [result, setResult] = useState<any>(null);

  const calculateReverse = () => {
    const value = parseFloat(homeValue);
    const ownerAge = parseInt(age);
    const balance = parseFloat(mortgageBalance) || 0;
    const rate = parseFloat(interestRate) / 100;

    if (isNaN(value) || value <= 0) {
      alert("Please enter a valid home value.");
      return;
    }

    if (isNaN(ownerAge) || ownerAge < 62) {
      alert("Typically, you must be at least 62 years old for a reverse mortgage.");
      return;
    }

    // Simplified HECM (Home Equity Conversion Mortgage) calculation logic
    // Principle Limit Factor (PLF) varies by age and rate. 
    // This is a rough estimation based on common tables.
    let plf = 0;
    if (ownerAge >= 90) plf = 0.65;
    else if (ownerAge >= 85) plf = 0.60;
    else if (ownerAge >= 80) plf = 0.55;
    else if (ownerAge >= 75) plf = 0.50;
    else if (ownerAge >= 70) plf = 0.45;
    else if (ownerAge >= 65) plf = 0.40;
    else plf = 0.35;

    const principalLimit = value * plf;
    const cashAvailable = Math.max(0, principalLimit - balance);
    const monthlyPayment = (cashAvailable * (rate / 12)) / (1 - Math.pow(1 + rate / 12, -180)); // 15 year theoretical draw

    setResult({
      principalLimit: Math.round(principalLimit),
      cashAvailable: Math.round(cashAvailable),
      monthlyEstimate: Math.round(monthlyPayment),
      equityUsed: Math.round(plf * 100),
      balanceLeft: Math.round(value - principalLimit)
    });
  };

  const reset = () => {
    setHomeValue('');
    setAge('');
    setMortgageBalance('0');
    setInterestRate('6.5');
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 font-sans">
      {/* Main Tool Section */}
      <section className="min-h-screen flex flex-col justify-center pt-24 pb-12">
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Tools
        </Link>

        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-100"
          >
            <Home className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Reverse Mortgage Calculator</h1>
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Estimate how much tax-free cash you can receive from your home's equity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white p-8 rounded-[32px] border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Estimated Home Value</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="number"
                      value={homeValue}
                      onChange={(e) => setHomeValue(e.target.value)}
                      placeholder="e.g. 500000"
                      className="w-full pl-10 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all text-lg font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Youngest Owner's Age</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Min. 62"
                      className="w-full pl-10 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all text-lg font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Current Mortgage Balance</label>
                  <div className="relative">
                    <TrendingDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="number"
                      value={mortgageBalance}
                      onChange={(e) => setMortgageBalance(e.target.value)}
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all text-lg font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Expected Interest Rate (%)</label>
                  <div className="relative">
                    <BarChart3 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all text-lg font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={calculateReverse}
                  className="flex-grow py-5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 text-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                  Calculate Benefits
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
            <div className="bg-zinc-900 p-8 rounded-[32px] text-white overflow-hidden relative min-h-[300px] flex flex-col justify-center">
              <div className="relative z-10">
                <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-8 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-indigo-400" />
                  Estimated Cash 
                </h3>
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="text-5xl font-black text-indigo-400 mb-2">
                        ${result.cashAvailable.toLocaleString()}
                      </div>
                      <div className="text-zinc-400 text-sm font-medium mb-8">
                        Available as a lump sum or line of credit.
                      </div>
                      
                      <div className="space-y-4 pt-6 border-t border-white/10">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Monthly Payout</span>
                          <span className="font-bold text-emerald-400">${result.monthlyEstimate.toLocaleString()}*</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Equity Used</span>
                          <span className="font-bold">{result.equityUsed}%</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HandCoins className="w-8 h-8 text-zinc-600" />
                      </div>
                      <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Awaiting Input</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
              {/* Decorative Glow */}
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
            </div>

            <div className="bg-indigo-50 p-6 rounded-[32px] border border-indigo-100">
              <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2 text-sm">
                <ShieldCheck className="w-4 h-4" />
                Guaranteed Stay
              </h4>
              <p className="text-indigo-700 text-sm leading-relaxed font-medium">
                With a HECM, you continue to own your home and can live in it as long as you maintain property taxes and insurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog & FAQ Section */}
      <div className="prose prose-zinc max-w-none border-t border-zinc-100 pt-16 pb-24">
        <h2 className="text-4xl font-bold text-zinc-900 mb-8 tracking-tight">Understanding Reverse Mortgages: A Senior's Guide</h2>
        
        <p className="text-zinc-600 text-lg leading-relaxed mb-8">
          A reverse mortgage is a unique financial tool designed specifically for homeowners aged 62 and older. Unlike a traditional mortgage where you make monthly payments to a lender, a reverse mortgage pays <strong>you</strong>. Our <strong>reverse mortgage calculator</strong> helps you estimate how much of your home's equity can be converted into tax-free cash while you still live in the property.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 not-prose">
          <div className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-100">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3">
              <Coins className="w-6 h-6 text-indigo-600" />
              How It Works
            </h3>
            <p className="text-zinc-600 leading-relaxed font-medium">
              The lender pays you a portion of your home equity. The loan balance grows over time as interest and fees are added, but no monthly payments are required. The loan is typically repaid when the home is sold or the owner passes away. Most reverse mortgages are FHA-insured HECM loans.
            </p>
          </div>
          <div className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-100">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              Non-Recourse Protection
            </h3>
            <p className="text-zinc-600 leading-relaxed font-medium">
              HECM loans are "non-recourse," meaning you or your heirs will never owe more than the home is worth at the time of sale. If the loan balance exceeds the home value, the FHA insurance covers the difference, protecting your other assets.
            </p>
          </div>
        </div>

        <section className="bg-white border border-zinc-200 rounded-[2.5rem] p-10 shadow-sm mb-16 not-prose">
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 flex items-center gap-3 tracking-tight underline decoration-indigo-400 decoration-4 underline-offset-8">
            Reverse Mortgage FAQ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="font-black text-zinc-900 text-xs uppercase tracking-widest mb-3">What are the eligibility requirements?</h4>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">You must be 62+, own your home outright or have significant equity, live in the home as your primary residence, and pass a financial assessment regarding taxes and insurance.</p>
            </div>
            <div>
              <h4 className="font-black text-zinc-900 text-xs uppercase tracking-widest mb-3">How can I receive the money?</h4>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">You can choose a lump sum, monthly payments, a line of credit that grows over time, or a combination of these options. Our <strong>reverse mortgage estimator</strong> provides a glimpse into these values.</p>
            </div>
            <div>
              <h4 className="font-black text-zinc-900 text-xs uppercase tracking-widest mb-3">Does the bank own my home?</h4>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">No. You retain the title to your home. The lender simply holds a lien on the property, similar to a traditional mortgage or home equity loan.</p>
            </div>
            <div>
              <h4 className="font-black text-zinc-900 text-xs uppercase tracking-widest mb-3">What happens to my heirs?</h4>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">When you pass away, your heirs have the option to pay off the loan and keep the home, or sell the home to satisfy the debt. Any remaining equity after the sale belongs to the heirs.</p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3 opacity-40 font-sans">
          <span className="text-[9px] uppercase tracking-widest font-black text-zinc-400">Search Keywords:</span>
          {[
            'reverse mortgage calculator',
            'hecm loan estimator',
            'home equity conversion calculator',
            'senior home equity cash out',
            'mortgage payout for seniors',
            'estimate reverse mortgage benefits'
          ].map((kw) => (
            <span key={kw} className="text-[9px] uppercase tracking-widest font-black text-zinc-400">{kw} •</span>
          ))}
        </div>
      </div>
    </div>
  );
};
