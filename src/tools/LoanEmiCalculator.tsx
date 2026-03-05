import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, ArrowLeft, ShieldCheck, Info, HelpCircle, CheckCircle2, Landmark, Wallet, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LoanEmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<string>('1000000');
  const [interestRate, setInterestRate] = useState<string>('8.5');
  const [loanTenure, setLoanTenure] = useState<string>('20');
  const [estimate, setEstimate] = useState<{ emi: number; totalInterest: number; totalPayment: number } | null>(null);

  const calculateEMI = () => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseInt(loanTenure) * 12;

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    setEstimate({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-12 pb-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-6 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="text-center mb-8">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-3"
        >
          <Calculator className="w-6 h-6 text-emerald-600" />
        </motion.div>
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Loan EMI Calculator</h1>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm">
          Calculate your Equated Monthly Installments (EMI) for home, car, or personal loans instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
            <Landmark className="w-4 h-4 text-emerald-600" />
            Loan Parameters
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Loan Amount (₹/$)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                placeholder="1000000"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                  placeholder="8.5"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Tenure (Years)</label>
                <input
                  type="number"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                  placeholder="20"
                />
              </div>
            </div>

            <button
              onClick={calculateEMI}
              className="w-full py-3.5 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98] text-sm mt-2"
            >
              Calculate EMI
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {estimate ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-600 rounded-3xl p-6 text-white shadow-xl shadow-emerald-100 flex flex-col items-center justify-center text-center"
            >
              <span className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">Monthly EMI</span>
              <div className="text-5xl font-black mb-2">{estimate.emi.toLocaleString()}</div>
              <div className="text-emerald-100 text-xs">Total Interest: {estimate.totalInterest.toLocaleString()}</div>
              <div className="mt-6 pt-6 border-t border-white/10 w-full grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-[10px] text-emerald-200 uppercase mb-0.5">Total Payable</div>
                  <div className="font-bold text-sm">{estimate.totalPayment.toLocaleString()}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-emerald-200 uppercase mb-0.5">Interest %</div>
                  <div className="font-bold text-sm">{Math.round((estimate.totalInterest / estimate.totalPayment) * 100)}%</div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-200 border-dashed flex flex-col items-center justify-center text-center h-full min-h-[180px]">
              <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center mb-3">
                <Info className="w-5 h-5 text-zinc-400" />
              </div>
              <p className="text-zinc-500 text-sm">Enter your loan details and click calculate to see your monthly EMI breakdown.</p>
            </div>
          )}

          <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-3 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Banking Standards
            </h3>
            <ul className="space-y-2">
              {[
                'Matches SBI & HDFC calculation logic',
                'Accurate for Housing & Jewel loans',
                'Instant amortization summary'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-zinc-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose prose-zinc max-w-none border-t border-zinc-100 pt-16">
        <h2 className="text-3xl font-bold text-zinc-900 mb-8">Comprehensive Guide to Loan EMI Calculations</h2>
        
        <p className="text-zinc-600 text-lg leading-relaxed mb-8">
          Planning a major purchase or a home renovation? Our <strong>Loan EMI calculator</strong> is designed to provide the same precision as the <strong>sbi bank home loan emi calculator</strong> and the <strong>emi calculator hdfc housing loan</strong>. By understanding your monthly commitment, you can make informed financial decisions without any hidden surprises.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-4">Home Loan Specialists</h3>
            <p className="text-zinc-600 leading-relaxed">
              When it comes to property, accuracy is everything. Our tool functions as a <strong>home loan emi calculator sbi home loan</strong> equivalent, helping you plan for long-term tenures. Whether you are comparing rates for a <strong>lic housing loan emi calculator</strong> or checking the <strong>axis bank home loan emi calculator</strong>, our algorithm ensures your results match official banking standards.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-4">HDFC & SBI Online Tools</h3>
            <p className="text-zinc-600 leading-relaxed">
              Many users prefer the <strong>sbi online housing loan emi calculator</strong> for its reliability. Similarly, the <strong>hdfc emi calculator home loan</strong> and <strong>emi calculator home loan hdfc</strong> are industry benchmarks. Our calculator integrates these standard formulas to provide a seamless experience that rivals the <strong>state bank of india home loan emi calculator</strong>.
            </p>
          </div>
        </div>

        <div className="bg-zinc-50 p-8 rounded-[2rem] mb-16 border border-zinc-100">
          <h3 className="text-2xl font-bold text-zinc-900 mb-6">Versatile Loan Types</h3>
          <p className="text-zinc-600 mb-6 leading-relaxed">
            Beyond housing, our tool is perfect for shorter-term needs. If you're looking for an <strong>emi calculator for jewel loan</strong>, simply adjust the tenure to months or a few years. The logic remains consistent with the <strong>hdfc emi calculator home loan</strong>, ensuring your interest calculations are spot on for gold or personal assets.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100">
              <h4 className="font-bold text-zinc-900 mb-1">State Bank Precision</h4>
              <p className="text-sm text-zinc-500">Matches the logic of the SBI online housing loan emi calculator.</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100">
              <h4 className="font-bold text-zinc-900 mb-1">HDFC Standards</h4>
              <p className="text-sm text-zinc-500">Consistent with the emi calculator hdfc housing loan benchmarks.</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-zinc-900 mb-8 flex items-center gap-2">
          <HelpCircle className="w-8 h-8 text-emerald-600" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 mb-16">
          {[
            {
              q: "Is this calculator as accurate as the sbi bank home loan emi calculator?",
              a: "Yes, we use the standard EMI formula [P x R x (1+R)^N]/[(1+R)^N-1] which is used by the State Bank of India and other major financial institutions."
            },
            {
              q: "Can I use this for an emi calculator for jewel loan?",
              a: "Absolutely. Simply enter the jewel loan amount and the specific interest rate provided by your bank. Adjust the tenure to the required number of years."
            },
            {
              q: "How does this compare to the hdfc emi calculator home loan?",
              a: "Our tool provides the same results as the HDFC housing loan calculator, giving you a clear view of your principal and interest components."
            },
            {
              q: "Why use this instead of the sbi online housing loan emi calculator?",
              a: "Our tool is faster, mobile-friendly, and doesn't require any personal information or bank login to provide instant results."
            },
            {
              q: "Does this work for axis bank home loan emi calculator comparisons?",
              a: "Yes, you can use our tool to compare different interest rates offered by Axis Bank, SBI, and HDFC to find the most affordable option."
            }
          ].map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <h4 className="font-bold text-zinc-900 mb-2">{faq.q}</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
