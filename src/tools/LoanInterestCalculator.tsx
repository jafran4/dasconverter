import React, { useState } from 'react';
import { Landmark, ArrowLeft, Info, HelpCircle, Calculator, TrendingUp } from 'lucide-react';
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
  { name: "Canada", currency: "$", code: "CAD" }
];

export const LoanInterestCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [tenure, setTenure] = useState<string>('');
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [result, setResult] = useState<{ totalInterest: number; totalPayment: number; monthlyPayment: number } | null>(null);

  const calculateInterest = () => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100;
    const t = tenureType === 'years' ? parseFloat(tenure) : parseFloat(tenure) / 12;
    
    if (p > 0 && r > 0 && t > 0) {
      // Simple Interest for basic comparison, but most loans use Compound Interest
      // We'll use the standard Amortized Loan formula (Compound)
      const monthlyRate = r / 12;
      const totalMonths = tenureType === 'years' ? parseFloat(tenure) * 12 : parseFloat(tenure);
      
      const emi = (p * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
      const totalPayment = emi * totalMonths;
      const totalInterest = totalPayment - p;

      setResult({
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(totalPayment),
        monthlyPayment: Math.round(emi)
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
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Loan Interest Calculator</h1>
            <p className="text-zinc-500">Calculate total interest and repayment cost</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Country / Currency</label>
              <select 
                value={country.name}
                onChange={(e) => setCountry(COUNTRIES.find(c => c.name === e.target.value) || COUNTRIES[0])}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              >
                {COUNTRIES.map(c => (
                  <option key={c.name} value={c.name}>{c.name} ({c.currency})</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Loan Principal</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">{country.currency}</span>
                <input 
                  type="number" 
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Annual Rate (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Loan Term</label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  />
                  <select 
                    value={tenureType}
                    onChange={(e) => setTenureType(e.target.value as any)}
                    className="px-2 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-xs font-bold"
                  >
                    <option value="years">Yrs</option>
                    <option value="months">Mo</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              onClick={calculateInterest}
              className="w-full py-4 bg-amber-600 text-white font-bold rounded-2xl hover:bg-amber-700 transition-all active:scale-[0.98] shadow-lg shadow-amber-600/20"
            >
              Calculate Interest
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
                <div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Total Interest Payable</p>
                  <h2 className="text-6xl font-black text-amber-600">{country.currency}{result.totalInterest.toLocaleString()}</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm flex justify-between items-center">
                    <p className="text-xs text-zinc-400 uppercase font-bold">Total Payment</p>
                    <p className="text-lg font-bold text-zinc-900">{country.currency}{result.totalPayment.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm flex justify-between items-center">
                    <p className="text-xs text-zinc-400 uppercase font-bold">Monthly Payment</p>
                    <p className="text-lg font-bold text-zinc-900">{country.currency}{result.monthlyPayment.toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter loan details to see total interest cost</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">Understanding Loan Interest: How to Save Money on Your Borrowing</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Interest is the cost of borrowing money. It is typically expressed as an annual percentage rate (APR). Understanding how interest is calculated can help you make better financial decisions and save thousands over the life of a loan.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-600" />
              Simple vs. Compound Interest
            </h3>
            <p className="text-zinc-600 text-sm">
              Simple interest is calculated only on the principal amount. Compound interest is calculated on the principal plus any accumulated interest. Most modern loans use compound interest.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              The Impact of Tenure
            </h3>
            <p className="text-zinc-600 text-sm">
              The longer your loan term, the more interest you will pay in total. Even if a longer term makes your monthly payments more affordable, it significantly increases the total cost of the loan.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">How to Get the Best Interest Rates</h3>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Improve Your Credit Score:</strong> Lenders offer the best rates to borrowers with high credit scores.</li>
          <li><strong>Shop Around:</strong> Interest rates can vary significantly between banks and online lenders.</li>
          <li><strong>Consider a Co-signer:</strong> If your credit is poor, a co-signer with good credit can help you secure a lower rate.</li>
          <li><strong>Opt for Automatic Payments:</strong> Some lenders offer a small interest rate discount if you sign up for auto-pay.</li>
        </ul>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Loan Interest for Men and Women</h3>
        <p className="text-zinc-600 leading-relaxed">
          While interest rates are legally required to be gender-neutral in many countries, financial literacy and negotiation play a huge role in the final rate you receive. Whether you are a man or a woman, being informed about the current market rates and understanding the math behind your loan is the best way to ensure you're getting a fair deal.
        </p>
      </article>
    </div>
  );
};
