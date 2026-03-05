import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowLeft, ShieldCheck, Zap, Info, Calculator, HelpCircle, CheckCircle2, TrendingUp, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TermLifeInsuranceCalculator = () => {
  const [coverageAmount, setCoverageAmount] = useState<string>('500000');
  const [termYears, setTermYears] = useState<string>('20');
  const [age, setAge] = useState<string>('30');
  const [isSmoker, setIsSmoker] = useState<boolean>(false);
  const [healthStatus, setHealthStatus] = useState<string>('excellent');
  const [estimate, setEstimate] = useState<{ monthly: number; yearly: number } | null>(null);

  const calculateEstimate = () => {
    const baseRatePer1000 = 0.15;
    const amountFactor = parseFloat(coverageAmount) / 1000;
    const ageFactor = Math.pow(1.07, (parseInt(age) - 20));
    const termFactor = 1 + (parseInt(termYears) - 10) * 0.02;
    const smokerFactor = isSmoker ? 2.5 : 1.0;
    const healthFactor = healthStatus === 'excellent' ? 0.8 : (healthStatus === 'good' ? 1.0 : 1.5);

    const monthly = baseRatePer1000 * amountFactor * ageFactor * termFactor * smokerFactor * healthFactor;
    setEstimate({
      monthly: Math.round(monthly),
      yearly: Math.round(monthly * 12)
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mx-auto mb-3"
        >
          <Heart className="w-6 h-6 text-rose-600" />
        </motion.div>
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Term Life Insurance Calculator</h1>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm">
          Estimate your monthly premiums for term life insurance based on coverage, age, and health.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-rose-600" />
            Policy Details
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Coverage ($)</label>
                <input
                  type="number"
                  value={coverageAmount}
                  onChange={(e) => setCoverageAmount(e.target.value)}
                  className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all text-sm"
                  placeholder="500000"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Term (Years)</label>
                <select 
                  value={termYears}
                  onChange={(e) => setTermYears(e.target.value)}
                  className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all text-sm"
                >
                  <option value="10">10 Years</option>
                  <option value="15">15 Years</option>
                  <option value="20">20 Years</option>
                  <option value="25">25 Years</option>
                  <option value="30">30 Years</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Your Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all text-sm"
                  placeholder="30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Smoker Status</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsSmoker(false)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${!isSmoker ? 'bg-rose-600 text-white shadow-md' : 'bg-zinc-100 text-zinc-600'}`}
                  >
                    No
                  </button>
                  <button
                    onClick={() => setIsSmoker(true)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${isSmoker ? 'bg-rose-600 text-white shadow-md' : 'bg-zinc-100 text-zinc-600'}`}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Health Status</label>
              <select 
                value={healthStatus}
                onChange={(e) => setHealthStatus(e.target.value)}
                className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all text-sm"
              >
                <option value="excellent">Excellent (No conditions)</option>
                <option value="good">Good (Minor conditions)</option>
                <option value="fair">Fair (Existing conditions)</option>
              </select>
            </div>

            <button
              onClick={calculateEstimate}
              className="w-full py-3.5 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98] text-sm mt-2"
            >
              Calculate Rate
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {estimate ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-rose-600 rounded-3xl p-6 text-white shadow-xl shadow-rose-100 flex flex-col items-center justify-center text-center"
            >
              <span className="text-rose-100 text-xs font-bold uppercase tracking-wider mb-1">Estimated Monthly Rate</span>
              <div className="text-5xl font-black mb-2">${estimate.monthly}</div>
              <div className="text-rose-100 text-xs">Approx. ${estimate.yearly} per year</div>
              <div className="mt-6 pt-6 border-t border-white/10 w-full grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-[10px] text-rose-200 uppercase mb-0.5">Term</div>
                  <div className="font-bold text-sm">{termYears} Years</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-rose-200 uppercase mb-0.5">Coverage</div>
                  <div className="font-bold text-sm">${parseInt(coverageAmount).toLocaleString()}</div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-200 border-dashed flex flex-col items-center justify-center text-center h-full min-h-[180px]">
              <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center mb-3">
                <Info className="w-5 h-5 text-zinc-400" />
              </div>
              <p className="text-zinc-500 text-sm">Enter your details and click calculate to see your estimated term life insurance rate.</p>
            </div>
          )}

          <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-3 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Why use this calculator?
            </h3>
            <ul className="space-y-2">
              {[
                'Compare rates across different terms',
                'Understand how age affects premiums',
                'Plan for your family\'s financial future'
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
        <h2 className="text-3xl font-bold text-zinc-900 mb-8">Ultimate Guide to Term Life Insurance Calculations</h2>
        
        <p className="text-zinc-600 text-lg leading-relaxed mb-8">
          Understanding your potential premiums is the first step in securing your family's future. Our <strong>term life insurance rate calculator</strong> provides instant estimates based on industry-standard underwriting factors. Whether you're looking for a <strong>prudential term life insurance calculator</strong> or a <strong>max life term insurance calculator</strong>, our tool offers a neutral baseline to help you compare.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-4">Term vs Whole Life Insurance Calculator</h3>
            <p className="text-zinc-600 leading-relaxed">
              One of the most common questions is the difference in cost between policy types. A <strong>term vs whole life insurance calculator</strong> will show that term insurance is significantly more affordable for high coverage amounts. While whole life builds cash value, term insurance focuses purely on protection for a specific period, making it the preferred choice for many young families.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-4">Rates by Age and Health</h3>
            <p className="text-zinc-600 leading-relaxed">
              Age is the single biggest factor in your premium. Using a <strong>term life insurance rates by age calculator</strong> demonstrates how much you can save by locking in a rate while you're young. Additionally, if you're looking for specialized coverage, a <strong>life insurance with long term care rider cost calculator</strong> can help you understand the added expense of combining these two essential protections.
            </p>
          </div>
        </div>

        <div className="bg-zinc-50 p-8 rounded-[2rem] mb-16 border border-zinc-100">
          <h3 className="text-2xl font-bold text-zinc-900 mb-6">Advanced Policy Options</h3>
          <p className="text-zinc-600 mb-6 leading-relaxed">
            Not all term policies are the same. A <strong>decreasing term life insurance calculator</strong> is useful for those matching their coverage to a mortgage balance that goes down over time. For employees, a <strong>group term life insurance tax calculator</strong> is vital for understanding the taxable benefit of employer-provided coverage exceeding $50,000.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100">
              <h4 className="font-bold text-zinc-900 mb-1">Decreasing Term</h4>
              <p className="text-sm text-zinc-500">Ideal for covering specific debts like mortgages that decrease over time.</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100">
              <h4 className="font-bold text-zinc-900 mb-1">Group Term Tax</h4>
              <p className="text-sm text-zinc-500">Calculates the "imputed income" for employer-paid life insurance premiums.</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-6">Selling Your Policy</h3>
        <p className="text-zinc-600 mb-12 leading-relaxed">
          Sometimes, your insurance needs change. If you no longer need your coverage, you might wonder about its market value. A <strong>sell term life insurance policy calculator</strong> or a <strong>sell term life insurance policy calculator free</strong> can provide an estimate of what a life settlement company might pay for your existing policy, which is often more than the cash surrender value.
        </p>

        <h2 className="text-3xl font-bold text-zinc-900 mb-8 flex items-center gap-2">
          <HelpCircle className="w-8 h-8 text-rose-600" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 mb-16">
          {[
            {
              q: "How does a term life insurance rate calculator work?",
              a: "It uses your age, coverage amount, term length, and health factors to estimate the risk to the insurer and calculate a corresponding monthly premium."
            },
            {
              q: "Why should I use a term vs whole life insurance calculator?",
              a: "To see the dramatic difference in cost. Term insurance is often 5-10 times cheaper than whole life for the same death benefit, allowing you to invest the difference elsewhere."
            },
            {
              q: "What is a decreasing term life insurance calculator used for?",
              a: "It's specifically designed for policies where the death benefit reduces over time, usually to match a decreasing liability like a home mortgage."
            },
            {
              q: "Is a group term life insurance tax calculator necessary for everyone?",
              a: "Only if your employer provides more than $50,000 in life insurance coverage. The IRS considers the premium for coverage above this amount as taxable 'imputed income'."
            },
            {
              q: "Can I really sell my term policy?",
              a: "Yes, through a process called a life settlement. A sell term life insurance policy calculator can help you estimate if your policy has market value to third-party investors."
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
