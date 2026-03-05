import React, { useState } from 'react';
import { Landmark, ArrowLeft, Info, HelpCircle, Calculator, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const COUNTRIES = [
  { name: "United States", currency: "$", code: "USD" },
  { name: "India", currency: "₹", code: "INR" },
  { name: "United Kingdom", currency: "£", code: "GBP" },
  { name: "European Union", currency: "€", code: "EUR" },
  { name: "Bangladesh", currency: "৳", code: "BDT" },
  { name: "Pakistan", currency: "₨", code: "PKR" },
  { name: "Australia", currency: "$", code: "AUD" },
  { name: "Canada", currency: "$", code: "CAD" },
  { name: "United Arab Emirates", currency: "د.إ", code: "AED" },
  { name: "Saudi Arabia", currency: "ر.س", code: "SAR" }
];

export const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [tenure, setTenure] = useState<string>('');
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [result, setResult] = useState<{ emi: number; totalInterest: number; totalPayment: number } | null>(null);

  const calculateEMI = () => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = tenureType === 'years' ? parseFloat(tenure) * 12 : parseFloat(tenure);
    
    if (p > 0 && r > 0 && n > 0) {
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      const totalInterest = totalPayment - p;

      setResult({
        emi: Math.round(emi),
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(totalPayment)
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
            <Landmark className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">EMI Calculator</h1>
            <p className="text-zinc-500">Equated Monthly Installment for Loans</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Country / Currency</label>
              <select 
                value={country.name}
                onChange={(e) => setCountry(COUNTRIES.find(c => c.name === e.target.value) || COUNTRIES[0])}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              >
                {COUNTRIES.map(c => (
                  <option key={c.name} value={c.name}>{c.name} ({c.currency})</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Loan Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">{country.currency}</span>
                <input 
                  type="number" 
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Interest Rate (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Tenure</label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                  <select 
                    value={tenureType}
                    onChange={(e) => setTenureType(e.target.value as any)}
                    className="px-2 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-xs font-bold"
                  >
                    <option value="years">Yrs</option>
                    <option value="months">Mo</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              onClick={calculateEMI}
              className="w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20"
            >
              Calculate EMI
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
                <div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Monthly EMI</p>
                  <h2 className="text-6xl font-black text-emerald-500">{country.currency}{result.emi.toLocaleString()}</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm flex justify-between items-center">
                    <p className="text-xs text-zinc-400 uppercase font-bold">Total Interest</p>
                    <p className="text-lg font-bold text-zinc-900">{country.currency}{result.totalInterest.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm flex justify-between items-center">
                    <p className="text-xs text-zinc-400 uppercase font-bold">Total Payment</p>
                    <p className="text-lg font-bold text-zinc-900">{country.currency}{result.totalPayment.toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter loan details to calculate your EMI</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">What is EMI? A Complete Guide to Loan Repayment</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are applied to both interest and principal each month, so that over a specified number of years, the loan is paid off in full.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-500" />
              How EMI is Calculated
            </h3>
            <p className="text-zinc-600 text-sm">
              The EMI formula is: [P x R x (1+R)^N]/[(1+R)^N-1], where P is the principal, R is the monthly interest rate, and N is the number of monthly installments.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-emerald-500" />
              Interest vs. Principal
            </h3>
            <p className="text-zinc-600 text-sm">
              In the early stages of a loan, a larger portion of your EMI goes toward paying interest. As the loan progresses, more of the payment goes toward the principal amount.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Tips for Reducing Your Loan Burden</h3>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Make Pre-payments:</strong> Even small extra payments toward the principal can significantly reduce your total interest and loan tenure.</li>
          <li><strong>Choose a Shorter Tenure:</strong> While a longer tenure reduces your monthly EMI, it greatly increases the total interest you pay.</li>
          <li><strong>Compare Interest Rates:</strong> A difference of even 0.5% in interest rate can save you thousands over the life of a home loan.</li>
        </ul>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">EMI Planning for Different Countries</h3>
        <p className="text-zinc-600 leading-relaxed">
          Whether you're taking a home loan in India (INR), a car loan in the US (USD), or a personal loan in the UK (GBP), the fundamental math of EMI remains the same. However, local banking regulations and processing fees can vary. Always check with your local bank for the most accurate final figures.
        </p>
      </article>
    </div>
  );
};
