import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Home, ArrowLeft, ShieldCheck, Zap, Info, Calculator, HelpCircle, CheckCircle2, Globe, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AffinityMortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState<string>('400000');
  const [downPayment, setDownPayment] = useState<string>('80000');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [estimate, setEstimate] = useState<{ monthly: number; totalInterest: number; totalPayment: number } | null>(null);

  const calculateMortgage = () => {
    const principal = parseFloat(homePrice) - parseFloat(downPayment);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseInt(loanTerm) * 12;

    const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalPayment = monthly * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setEstimate({
      monthly: Math.round(monthly),
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
          <Home className="w-6 h-6 text-emerald-600" />
        </motion.div>
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Affinity Mortgage Calculator</h1>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm">
          Calculate your monthly mortgage payments, interest, and total cost with our advanced estimator.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-600" />
            Loan Details
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Home Price ($)</label>
                <input
                  type="number"
                  value={homePrice}
                  onChange={(e) => setHomePrice(e.target.value)}
                  className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                  placeholder="400000"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Down Payment ($)</label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                  placeholder="80000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                  placeholder="6.5"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Term (Years)</label>
                <select 
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                >
                  <option value="10">10 Years</option>
                  <option value="15">15 Years</option>
                  <option value="20">20 Years</option>
                  <option value="30">30 Years</option>
                </select>
              </div>
            </div>

            <button
              onClick={calculateMortgage}
              className="w-full py-3.5 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98] text-sm mt-2"
            >
              Calculate Payment
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
              <span className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">Monthly Payment</span>
              <div className="text-5xl font-black mb-2">${estimate.monthly}</div>
              <div className="text-emerald-100 text-xs">Principal & Interest</div>
              <div className="mt-6 pt-6 border-t border-white/10 w-full grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-[10px] text-emerald-200 uppercase mb-0.5">Total Interest</div>
                  <div className="font-bold text-sm">${estimate.totalInterest.toLocaleString()}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-emerald-200 uppercase mb-0.5">Total Cost</div>
                  <div className="font-bold text-sm">${estimate.totalPayment.toLocaleString()}</div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-200 border-dashed flex flex-col items-center justify-center text-center h-full min-h-[180px]">
              <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center mb-3">
                <Info className="w-5 h-5 text-zinc-400" />
              </div>
              <p className="text-zinc-500 text-sm">Enter your loan details and click calculate to see your estimated monthly payment.</p>
            </div>
          )}

          <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-3 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Why use this calculator?
            </h3>
            <ul className="space-y-2">
              {[
                'Accurate principal and interest breakdown',
                'Compare different loan terms easily',
                'Plan your home buying budget'
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
        <h2 className="text-3xl font-bold text-zinc-900 mb-8">Comprehensive Guide to Mortgage Calculations</h2>
        
        <p className="text-zinc-600 text-lg leading-relaxed mb-8">
          Navigating the home buying process requires precise financial planning. Whether you are using an <strong>affinity mortgage calculator</strong> or searching for a <strong>landmark mortgage calculator</strong>, understanding your monthly obligations is crucial. Our tool provides a versatile platform that rivals the <strong>compass mortgage calculator</strong> and <strong>ascend mortgage calculator</strong> in accuracy and ease of use.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-4">International Real Estate Tools</h3>
            <p className="text-zinc-600 leading-relaxed">
              Buying property abroad? Our tool can be adapted for various markets. If you're looking for an <strong>italian mortgage calculator</strong> or need a <strong>mortgage calculator costa rica</strong>, the fundamental math remains the same. Even for complex regions like the Middle East, our logic supports <strong>mortgage calculation israel</strong> by providing a clear breakdown of principal and interest.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-4">Broker-Specific Estimators</h3>
            <p className="text-zinc-600 leading-relaxed">
              Many buyers start their journey with specific real estate firms. You might have encountered a <strong>coldwell banker mortgage calculator</strong> or a <strong>coldwell mortgage calculator</strong> during your search. Our <strong>affinity mortgage calculator</strong> offers a similar, high-quality experience without the need for registration or personal data.
            </p>
          </div>
        </div>

        <div className="bg-zinc-50 p-8 rounded-[2rem] mb-16 border border-zinc-100">
          <h3 className="text-2xl font-bold text-zinc-900 mb-6">Advanced Calculation: Blended Rates</h3>
          <p className="text-zinc-600 mb-6 leading-relaxed">
            For those with multiple loans or refinancing needs, a <strong>blended rate mortgage calculator</strong> is essential. A blended rate combines the interest rates of two or more loans into a single weighted average. While our primary tool focuses on single-loan scenarios, understanding your blended rate can help you decide between refinancing or keeping your current structure.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100">
              <h4 className="font-bold text-zinc-900 mb-1">Global Reach</h4>
              <p className="text-sm text-zinc-500">Supports calculations for Italy, Israel, Costa Rica, and more.</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100">
              <h4 className="font-bold text-zinc-900 mb-1">Broker Accuracy</h4>
              <p className="text-sm text-zinc-500">Matches the precision of Compass and Coldwell Banker tools.</p>
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
              q: "How does the affinity mortgage calculator differ from others?",
              a: "Our calculator is designed for speed and privacy. Unlike some bank-specific tools, we don't require personal info to give you a precise breakdown of your monthly costs."
            },
            {
              q: "Can I use this as an italian mortgage calculator?",
              a: "Yes! While the currency symbol is $, the mathematical formula for amortized loans is universal. Simply enter your home price and rate in Euro to get your result."
            },
            {
              q: "What is a blended rate mortgage calculator?",
              a: "It's a tool used to find the average interest rate when you have two different mortgages on the same property, helping you understand your total cost of debt."
            },
            {
              q: "Is this tool as accurate as a compass mortgage calculator?",
              a: "Yes, we use the standard amortization formula used by major financial institutions and real estate brokers like Compass and Coldwell Banker."
            },
            {
              q: "Does this support mortgage calculation israel?",
              a: "Absolutely. Whether you're calculating in Shekels or Dollars, the principal and interest logic remains consistent with Israeli banking standards."
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
