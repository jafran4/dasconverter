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
            <Home className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Affinity Mortgage Calculator</h1>
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Calculate your monthly mortgage payments, interest, and total cost with our advanced estimator.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[32px] border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h2 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              Loan Details
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">Home Price ($)</label>
                  <input
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(e.target.value)}
                    className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all text-lg font-medium"
                    placeholder="400000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">Down Payment ($)</label>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all text-lg font-medium"
                    placeholder="80000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all text-lg font-medium"
                    placeholder="6.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">Term (Years)</label>
                  <select 
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all text-lg font-medium"
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
                className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-[0.98] text-lg mt-4"
              >
                Calculate Payment
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {estimate ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-900 rounded-[32px] p-8 text-white shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden"
              >
                <div className="relative z-10">
                  <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2 block">Estimated Monthly Payment</span>
                  <div className="text-6xl font-black text-emerald-400 mb-2">${estimate.monthly}</div>
                  <div className="text-zinc-400 text-sm">Principal & Interest Only</div>
                  <div className="mt-8 pt-8 border-t border-white/10 w-full grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Total Interest</div>
                      <div className="font-bold text-xl">${estimate.totalInterest.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Total Cost</div>
                      <div className="font-bold text-xl">${estimate.totalPayment.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl -mr-16 -mt-16 rounded-full" />
              </motion.div>
            ) : (
              <div className="bg-zinc-50 rounded-[32px] p-8 border border-zinc-200 border-dashed flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
                  <Info className="w-8 h-8 text-zinc-300" />
                </div>
                <p className="text-zinc-400 text-sm max-w-xs leading-relaxed font-medium">Enter your loan details and click calculate to see your estimated monthly payment.</p>
              </div>
            )}

            <div className="bg-emerald-50 p-8 rounded-[32px] border border-emerald-100">
              <h3 className="font-bold text-emerald-900 mb-4 text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Calculator Features
              </h3>
              <ul className="space-y-3">
                {[
                  'Accurate principal and interest breakdown',
                  'Compare different loan terms easily',
                  'Plan your home buying budget effectively',
                  'Calculate total interest over the life of the loan'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-emerald-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <div className="prose prose-zinc max-w-none border-t border-zinc-100 pt-16 pb-24 font-sans">
        <h2 className="text-3xl font-bold text-zinc-900 mb-8">Comprehensive Guide to Affinity Mortgage Calculations</h2>
        
        <p className="text-zinc-600 text-lg leading-relaxed mb-8">
          Navigating the home buying process requires precise financial planning. Whether you are using an <strong>affinity mortgage calculator</strong> or searching for a <strong>landmark mortgage calculator</strong>, understanding your monthly obligations is crucial. Our tool provides a versatile platform that rivals the <strong>compass mortgage calculator</strong> and <strong>ascend mortgage calculator</strong> in accuracy and ease of use. If you are looking for the latest <strong>affinity plus mortgage rates</strong> or need to calculate payments for an <strong>affinity mortgage</strong>, you've come to the right place.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-4">Affinity Plus and Credit Union Rates</h3>
            <p className="text-zinc-600 leading-relaxed mb-4">
              Many homebuyers prefer credit unions for their competitive rates. By checking <strong>affinity plus credit union mortgage rates</strong> and using our <strong>affinity plus mortgage calculator</strong>, you can compare different lending scenarios effectively. Whether you are interested in a standard <strong>affinity plus mortgage</strong> or specific <strong>affinity mortgage loans</strong>, our estimator is here to help.
            </p>
            <p className="text-zinc-600 leading-relaxed">
              In addition to credit unions, national lenders like <strong>affinity mortgage llc</strong> offer various products. Keeping an eye on current <strong>affinity mortgage rates</strong> can save you thousands over the life of your loan.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-4">Broker-Specific Estimators</h3>
            <p className="text-zinc-600 leading-relaxed mb-4">
              Many buyers start their journey with specific real estate firms. You might have encountered a <strong>coldwell banker mortgage calculator</strong> or a <strong>coldwell mortgage calculator</strong> during your search. Our tool offers a similar, high-quality experience for <strong>affinity mortgage kansas</strong> markets and beyond.
            </p>
            <p className="text-zinc-600 leading-relaxed">
              For professionals in the industry, staying updated with <strong>affinity mortgage training</strong> ensures you're providing the best advice to your clients based on the most current financial models.
            </p>
          </div>
        </div>

        <div className="bg-zinc-50 p-8 rounded-[2rem] mb-16 border border-zinc-100">
          <h3 className="text-2xl font-bold text-zinc-900 mb-6">International and Local Expertise</h3>
          <p className="text-zinc-600 mb-6 leading-relaxed">
            Buying property? Our tool can be adapted for various markets. If you're looking for an <strong>italian mortgage calculator</strong> or need a <strong>mortgage calculator costa rica</strong>, the fundamental math remains the same. We also cover local specialties like <strong>affinity mortgage kansas</strong> to ensure regional accuracy.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100">
              <h4 className="font-bold text-zinc-900 mb-1">Affinity Mortgage Loans</h4>
              <p className="text-sm text-zinc-500">Calculate payments for various <strong>affinity mortgage</strong> products accurately.</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100">
              <h4 className="font-bold text-zinc-900 mb-1">Global & Local</h4>
              <p className="text-sm text-zinc-500">From <strong>affinity mortgage kansas</strong> to Italy and Israel, we've got you covered.</p>
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
              q: "Where can I find current affinity plus mortgage rates?",
              a: "You can find the latest affinity plus mortgage rates on their official website or by contacting their loan officers. Once you have a rate, use our affinity plus mortgage calculator to estimate your payment."
            },
            {
              q: "Is this affinity plus credit union mortgage rates estimator accurate?",
              a: "Yes, our calculator uses the standard amortization formula. While affinity plus credit union mortgage rates vary by person, our tool gives you a precise mathematical estimate of your monthly obligation."
            },
            {
              q: "Does this tool support affinity mortgage loans in Kansas?",
              a: "Absolutely. Our estimator is perfect for affinity mortgage kansas buyers looking to understand their monthly costs for any affinity mortgage loans."
            },
            {
              q: "How often should I check affinity mortgage rates?",
              a: "Since affinity mortgage rates can change daily based on the market, it's a good idea to check them frequently using our affinity mortgage calculator as you near your closing date."
            },
            {
              q: "What is affinity mortgage training?",
              a: "Affinity mortgage training involves courses and certifications for loan officers to better understand the products and services offered by affinity mortgage llc."
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
