import React, { useState } from 'react';
import { Briefcase, ArrowLeft, Info, HelpCircle, Calculator, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const FreelanceProfitCalculator = () => {
  const [revenue, setRevenue] = useState<string>('');
  const [expenses, setExpenses] = useState<string>('');
  const [taxRate, setTaxRate] = useState<string>('20');
  const [platformFee, setPlatformFee] = useState<string>('0');
  const [result, setResult] = useState<{ grossProfit: number; netProfit: number; taxAmount: number; feeAmount: number } | null>(null);

  const calculateProfit = () => {
    const rev = parseFloat(revenue);
    const exp = parseFloat(expenses) || 0;
    const tax = parseFloat(taxRate) || 0;
    const fee = parseFloat(platformFee) || 0;
    
    if (rev > 0) {
      const feeAmount = rev * (fee / 100);
      const grossProfit = rev - exp - feeAmount;
      const taxAmount = grossProfit > 0 ? grossProfit * (tax / 100) : 0;
      const netProfit = grossProfit - taxAmount;

      setResult({
        grossProfit: parseFloat(grossProfit.toFixed(2)),
        netProfit: parseFloat(netProfit.toFixed(2)),
        taxAmount: parseFloat(taxAmount.toFixed(2)),
        feeAmount: parseFloat(feeAmount.toFixed(2))
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Freelance Profit Calculator</h1>
            <p className="text-zinc-500">Calculate net earnings after fees, expenses, and taxes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Total Revenue</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                <input 
                  type="number" 
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Expenses</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                  <input 
                    type="number" 
                    value={expenses}
                    onChange={(e) => setExpenses(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Platform Fee (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={platformFee}
                    onChange={(e) => setPlatformFee(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">%</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Estimated Tax Rate (%)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  placeholder="20"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">%</span>
              </div>
            </div>

            <button 
              onClick={calculateProfit}
              className="w-full py-4 bg-indigo-500 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/20"
            >
              Calculate Net Profit
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
                <div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Net Profit (Take-Home)</p>
                  <h2 className="text-6xl font-black text-indigo-500">${result.netProfit}</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <p className="text-xs text-zinc-400 uppercase font-bold mb-1">Gross Profit</p>
                    <p className="text-xl font-bold text-zinc-900">${result.grossProfit}</p>
                  </div>
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <p className="text-xs text-zinc-400 uppercase font-bold mb-1">Tax Amount</p>
                    <p className="text-xl font-bold text-rose-500">-${result.taxAmount}</p>
                  </div>
                </div>
                <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                  <p className="text-xs text-zinc-400 uppercase font-bold mb-1">Platform Fees</p>
                  <p className="text-xl font-bold text-amber-500">-${result.feeAmount}</p>
                </div>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter your revenue and costs to calculate profit</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">Freelance Finances: How to Calculate Your True Profit</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Freelancing offers freedom, but it also means you are responsible for your own finances. Many new freelancers make the mistake of confusing revenue with profit. Understanding your "take-home pay" is essential for long-term success.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-500" />
              Revenue vs. Profit
            </h3>
            <p className="text-zinc-600 text-sm">
              Revenue is the total amount of money you receive from clients. Profit is what's left after you pay for your software, hardware, internet, platform fees, and taxes.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              Setting Your Rates
            </h3>
            <p className="text-zinc-600 text-sm">
              When setting your rates, you must account for the fact that you don't get paid for holidays, sick days, or time spent finding new clients. A good rule of thumb is to aim for a rate that is at least 30-50% higher than your equivalent salaried rate.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Common Freelance Expenses</h3>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Software Subscriptions:</strong> Adobe Creative Cloud, Slack, Zoom, Project Management tools.</li>
          <li><strong>Hardware:</strong> Laptops, monitors, ergonomic chairs, cameras.</li>
          <li><strong>Marketing:</strong> Website hosting, LinkedIn Premium, paid ads.</li>
          <li><strong>Platform Fees:</strong> Upwork (10%), Fiverr (20%), or payment processing fees like Stripe (2.9% + $0.30).</li>
          <li><strong>Professional Services:</strong> Accountants, lawyers, or insurance.</li>
        </ul>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Tax Planning for Freelancers</h3>
        <p className="text-zinc-600 leading-relaxed">
          Unlike employees, freelancers usually don't have taxes withheld from their payments. It is critical to set aside a portion of every payment (usually 20-30%) in a separate savings account to cover your tax bill at the end of the year. Failing to do this can lead to significant financial stress when tax season arrives.
        </p>
      </article>
    </div>
  );
};
