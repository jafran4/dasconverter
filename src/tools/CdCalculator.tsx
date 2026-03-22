import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calculator, Info, TrendingUp, Landmark, Calendar, Wallet } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const CdCalculator = ({ isWidget = false }: { isWidget?: boolean }) => {
  const navigate = useNavigate();
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(5);
  const [term, setTerm] = useState<number>(12);
  const [termUnit, setTermUnit] = useState<'months' | 'years'>('months');
  const [compounding, setCompounding] = useState<number>(12); // 12 = monthly, 365 = daily, 4 = quarterly, 1 = annually

  const [result, setResult] = useState<{
    endingBalance: number;
    totalInterest: number;
    apy: number;
  } | null>(null);

  const calculateCD = () => {
    const p = principal;
    const r = rate / 100;
    const n = compounding;
    const t = termUnit === 'years' ? term : term / 12;

    // A = P * (1 + r/n)^(n*t)
    const endingBalance = p * Math.pow(1 + r / n, n * t);
    const totalInterest = endingBalance - p;

    setResult({
      endingBalance,
      totalInterest,
      apy: (Math.pow(1 + r / n, n) - 1) * 100
    });
  };

  useEffect(() => {
    calculateCD();
  }, [principal, rate, term, termUnit, compounding]);

  return (
    <div className={cn("max-w-6xl mx-auto px-4", !isWidget && "py-12")}>
      {/* FAQ Schema */}
      {!isWidget && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How accurate is this CD calculator?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our calculator uses standard financial formulas to provide highly accurate estimates. However, actual bank results may vary slightly due to specific compounding methods or leap year adjustments."
                }
              },
              {
                "@type": "Question",
                "name": "What is a good APY for a CD in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A 'good' rate depends on the current economic climate. Generally, anything above the national average (often found at online banks) is considered competitive. Use our tool to compare how a 1% difference can impact your final balance."
                }
              },
              {
                "@type": "Question",
                "name": "Can I add money to a CD after it's opened?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most standard CDs do not allow additional deposits. You would typically need to open a new CD for additional funds. Some 'Add-On CDs' exist, but they are less common."
                }
              },
              {
                "@type": "Question",
                "name": "Is interest on a CD compounded daily or monthly?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It depends on the bank. Daily compounding is the most beneficial for the saver, as it generates interest on interest more frequently. Our calculator lets you toggle between these options."
                }
              },
              {
                "@type": "Question",
                "name": "What happens when my CD matures?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You usually have a 'grace period' (often 7-10 days) to withdraw the money or change the term. If you do nothing, many banks will automatically renew the CD for the same term at the current rate."
                }
              },
              {
                "@type": "Question",
                "name": "Are online banks safe for CDs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, as long as they are FDIC insured. Online banks often offer significantly higher rates than traditional brick-and-mortar banks because they have lower overhead costs."
                }
              },
              {
                "@type": "Question",
                "name": "How does inflation affect my CD returns?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Inflation reduces the purchasing power of your money. If inflation is 3% and your CD earns 4%, your 'real' return is only 1%. It's important to choose a rate that outpaces inflation."
                }
              },
              {
                "@type": "Question",
                "name": "Can I lose money in a CD?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In a standard, FDIC-insured CD, your principal is safe. The only way to 'lose' money is if the early withdrawal penalty exceeds the interest earned, or if the bank is not insured."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between interest rate and APY?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The interest rate is the base rate, while APY (Annual Percentage Yield) includes the effect of compounding. APY is the more accurate number to look at when comparing CDs."
                }
              },
              {
                "@type": "Question",
                "name": "Should I choose a long-term or short-term CD?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "If you think rates will rise, go short-term. If you think rates will fall, lock in a long-term rate now. Use our CD rates calculator to see the difference in total earnings over various timelines."
                }
              }
            ]
          })}
        </script>
      )}
      {!isWidget && (
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">CD Calculator</h1>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Calculate how much your Certificate of Deposit will grow over time. 
            Plan your savings with precision.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-zinc-700">Initial Deposit ($)</label>
              <div className="relative">
                <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="e.g. 10000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-zinc-700">Interest Rate (APY %)</label>
                <div className="relative">
                  <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="number"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="e.g. 5.0"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-zinc-700">Term</label>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                      type="number"
                      value={term}
                      onChange={(e) => setTerm(Number(e.target.value))}
                      className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <select
                    value={termUnit}
                    onChange={(e) => setTermUnit(e.target.value as 'months' | 'years')}
                    className="px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-zinc-700">Compounding Frequency</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { label: 'Daily', value: 365 },
                  { label: 'Monthly', value: 12 },
                  { label: 'Quarterly', value: 4 },
                  { label: 'Annually', value: 1 },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setCompounding(option.value)}
                    className={cn(
                      "py-2 px-4 rounded-xl text-sm font-medium border transition-all",
                      compounding === option.value
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200"
                        : "bg-white border-zinc-200 text-zinc-600 hover:border-emerald-200"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 p-5 rounded-3xl border border-emerald-100 flex items-start gap-4">
            <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-800 leading-relaxed">
              <strong>How it works:</strong> A Certificate of Deposit (CD) is a savings account with a fixed interest rate and fixed date of withdrawal. This calculator uses the compound interest formula to estimate your earnings.
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-900 p-6 md:p-8 rounded-3xl text-white shadow-xl space-y-6"
            >
              <div>
                <p className="text-zinc-400 text-xs mb-1 uppercase tracking-wider font-semibold">Ending Balance</p>
                <h2 className="text-3xl font-bold text-emerald-400">
                  ${result.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-zinc-400 text-[10px] mb-1 uppercase tracking-wider">Total Interest</p>
                  <p className="text-lg font-bold text-white">
                    +${result.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-zinc-400 text-[10px] mb-1 uppercase tracking-wider">Effective APY</p>
                  <p className="text-lg font-bold text-white">
                    {result.apy.toFixed(3)}%
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Initial Deposit</span>
                  <span>${principal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Term</span>
                  <span>{term} {termUnit}</span>
                </div>
              </div>
            </motion.div>
          )}

          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-sm text-zinc-900 mb-3 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-emerald-600" />
              Quick Tips
            </h3>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Higher compounding frequency leads to slightly higher returns.
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Longer terms usually offer better interest rates.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {!isWidget && (
        <div className="mt-24 space-y-20 max-w-4xl mx-auto">
          {/* SEO Content Section */}
          <section className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
                CD Calculator: Maximize Your Savings with Precision
              </h2>
              <p className="text-zinc-600 leading-relaxed text-xl">
                Are you tired of watching your hard-earned money sit idle in a low-interest account? Our advanced <strong>CD Calculator</strong> is designed to help you take control of your financial future. Whether you're a seasoned investor or just starting to save, this <strong>certificate of deposit calculator</strong> provides the clarity you need to make informed decisions and watch your wealth grow.
              </p>
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl">
                <p className="text-emerald-900 font-medium">
                  "The best time to start saving was yesterday. The second best time is today. Use our free <strong>CD interest calculator</strong> to see how much your money can earn."
                </p>
              </div>
            </div>

            {/* Featured Snippet Optimization */}
            <div className="bg-white p-8 rounded-[2.5rem] border-2 border-emerald-100 shadow-sm space-y-4">
              <h3 className="text-2xl font-bold text-zinc-900">Quick Summary: How Much Will My CD Earn?</h3>
              <p className="text-zinc-600">
                A <strong>CD earnings calculator</strong> estimates your final balance by applying compound interest to your initial deposit over a fixed term. To get an accurate result, you need:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-zinc-700 font-medium">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  Initial Deposit (Principal)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  Annual Percentage Yield (APY)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  Term Length (Months or Years)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  Compounding Frequency
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-zinc-900">💡 What Is a CD Calculator and Why Do You Need One?</h3>
              <p className="text-zinc-600 leading-relaxed">
                A <strong>CD rates calculator</strong> is more than just a simple math tool; it's a strategic asset for your financial planning. It allows you to simulate different scenarios, helping you understand the long-term impact of interest rates and compounding frequencies. 
              </p>
              <p className="text-zinc-600 leading-relaxed">
                By using our <strong>CD interest calculator</strong>, you can avoid the guesswork and see exactly how much interest you'll accrue by the time your certificate of deposit reaches maturity. This is essential for planning large purchases, retirement, or building an emergency fund.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-zinc-900">🏦 Understanding Certificates of Deposit (CDs)</h3>
              <p className="text-zinc-600 leading-relaxed">
                A Certificate of Deposit (CD) is a type of savings account offered by banks and credit unions. Unlike a regular savings account, a CD requires you to leave your money untouched for a specific period, known as the "term." In exchange for this commitment, banks typically offer a higher interest rate than standard savings or money market accounts.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
                  <h4 className="font-bold text-zinc-900 mb-2">Fixed Term</h4>
                  <p className="text-zinc-500 text-sm text-balance">Terms range from 3 months to 10 years, allowing you to choose a timeline that fits your goals.</p>
                </div>
                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
                  <h4 className="font-bold text-zinc-900 mb-2">Guaranteed Returns</h4>
                  <p className="text-zinc-500 text-sm text-balance">The interest rate is locked in, protecting you from market fluctuations.</p>
                </div>
                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
                  <h4 className="font-bold text-zinc-900 mb-2">Safety</h4>
                  <p className="text-zinc-500 text-sm text-balance">Most CDs are FDIC or NCUA insured up to $250,000 per depositor.</p>
                </div>
              </div>
            </div>

            {/* Comparison Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-zinc-900">CD vs. High-Yield Savings Account: Which is Better?</h3>
              <p className="text-zinc-600">Choosing between a CD and a savings account depends on your liquidity needs and the current interest rate environment.</p>
              <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-zinc-50">
                    <tr>
                      <th className="p-4 font-bold text-zinc-900 border-b border-zinc-200">Feature</th>
                      <th className="p-4 font-bold text-zinc-900 border-b border-zinc-200">Certificate of Deposit (CD)</th>
                      <th className="p-4 font-bold text-zinc-900 border-b border-zinc-200">Savings Account</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    <tr>
                      <td className="p-4 text-zinc-700 font-medium">Interest Rate</td>
                      <td className="p-4 text-zinc-600">Fixed (Usually Higher)</td>
                      <td className="p-4 text-zinc-600">Variable (Changes with Market)</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-zinc-700 font-medium">Liquidity</td>
                      <td className="p-4 text-zinc-600">Locked until Maturity</td>
                      <td className="p-4 text-zinc-600">High (Withdraw Anytime)</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-zinc-700 font-medium">Risk</td>
                      <td className="p-4 text-zinc-600">Very Low (Insured)</td>
                      <td className="p-4 text-zinc-600">Very Low (Insured)</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-zinc-700 font-medium">Best For</td>
                      <td className="p-4 text-zinc-600">Long-term Savings Goals</td>
                      <td className="p-4 text-zinc-600">Emergency Funds</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-zinc-900 p-10 rounded-[3rem] text-white space-y-8">
              <h3 className="text-3xl font-bold">🧠 Expert Strategy: The CD Ladder</h3>
              <p className="text-zinc-400 leading-relaxed">
                One of the most effective ways to use a <strong>CD calculator</strong> is to plan a "CD Ladder." This strategy involves splitting your total investment into multiple CDs with different maturity dates.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-emerald-400 font-bold">How it works:</h4>
                  <p className="text-sm text-zinc-300">
                    Instead of putting $50,000 into a single 5-year CD, you might put $10,000 into a 1-year, 2-year, 3-year, 4-year, and 5-year CD. As each one matures, you reinvest it into a new 5-year CD.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-emerald-400 font-bold">The Benefits:</h4>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li className="flex items-center gap-2">✅ Regular access to cash</li>
                    <li className="flex items-center gap-2">✅ Protection against rising rates</li>
                    <li className="flex items-center gap-2">✅ Higher average APY</li>
                  </ul>
                </div>
              </div>
              <div className="pt-6 border-t border-white/10 text-center">
                <p className="text-emerald-400 font-bold">Ready to start? Use our free CD Calculator now to plan your ladder!</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-zinc-900">📊 The Math Behind Your Earnings</h3>
              <p className="text-zinc-600 leading-relaxed">
                Understanding the formula behind our <strong>CD earnings calculator</strong> can help you appreciate the power of compounding. The standard formula for compound interest is:
              </p>
              <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-200 text-center">
                <code className="text-2xl font-mono text-emerald-700">A = P(1 + r/n)^(nt)</code>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-zinc-600">
                <div className="space-y-2">
                  <p><strong>A</strong> = The amount of money accumulated after n years, including interest.</p>
                  <p><strong>P</strong> = The principal investment amount (initial deposit).</p>
                  <p><strong>r</strong> = The annual interest rate (decimal).</p>
                </div>
                <div className="space-y-2">
                  <p><strong>n</strong> = The number of times that interest is compounded per unit t.</p>
                  <p><strong>t</strong> = The time the money is invested for (years).</p>
                </div>
              </div>
              <p className="text-zinc-500 italic text-sm">
                Pro Tip: Most banks compound interest daily or monthly. Our <strong>certificate of deposit calculator</strong> allows you to adjust this frequency to see the difference it makes.
              </p>
            </div>

            {/* Internal Linking Suggestions */}
            <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100 space-y-4">
              <h4 className="font-bold text-emerald-900">Explore More Financial Tools:</h4>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => navigate('/compound-interest-calculator')}
                  className="px-4 py-2 bg-white border border-emerald-200 rounded-full text-sm text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  Compound Interest Calculator
                </button>
                <button 
                  onClick={() => navigate('/savings-goal-calculator')}
                  className="px-4 py-2 bg-white border border-emerald-200 rounded-full text-sm text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  Savings Goal Calculator
                </button>
                <button 
                  onClick={() => navigate('/loan-amortization-tool')}
                  className="px-4 py-2 bg-white border border-emerald-200 rounded-full text-sm text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  Loan Amortization Tool
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-zinc-900">⚠️ Important Considerations: Penalties and Taxes</h3>
              <p className="text-zinc-600 leading-relaxed">
                While CDs are safe, they aren't without caveats. Two major factors can eat into your returns: early withdrawal penalties and taxes.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 p-6 bg-red-50 rounded-2xl border border-red-100">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-red-600 font-bold">!</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-900">Early Withdrawal Penalties</h4>
                    <p className="text-red-800/80 text-sm">If you need your money before the term ends, banks will charge a penalty, often equal to 3-12 months of interest. Always ensure you have an emergency fund separate from your CDs.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-amber-600 font-bold">$</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900">Taxation on Interest</h4>
                    <p className="text-amber-800/80 text-sm">Interest earned on a CD is generally considered taxable income in the year it's earned, even if you haven't withdrawn it yet. Consult a tax professional for your specific situation.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-12 pb-20">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-zinc-900">Frequently Asked Questions (FAQ)</h2>
              <p className="text-zinc-500">Everything you need to know about using a <strong>CD calculator</strong> and investing in CDs.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  q: "How accurate is this CD calculator?",
                  a: "Our calculator uses standard financial formulas to provide highly accurate estimates. However, actual bank results may vary slightly due to specific compounding methods or leap year adjustments."
                },
                {
                  q: "What is a good APY for a CD in 2026?",
                  a: "A 'good' rate depends on the current economic climate. Generally, anything above the national average (often found at online banks) is considered competitive. Use our tool to compare how a 1% difference can impact your final balance."
                },
                {
                  q: "Can I add money to a CD after it's opened?",
                  a: "Most standard CDs do not allow additional deposits. You would typically need to open a new CD for additional funds. Some 'Add-On CDs' exist, but they are less common."
                },
                {
                  q: "Is interest on a CD compounded daily or monthly?",
                  a: "It depends on the bank. Daily compounding is the most beneficial for the saver, as it generates interest on interest more frequently. Our calculator lets you toggle between these options."
                },
                {
                  q: "What happens when my CD matures?",
                  a: "You usually have a 'grace period' (often 7-10 days) to withdraw the money or change the term. If you do nothing, many banks will automatically renew the CD for the same term at the current rate."
                },
                {
                  q: "Are online banks safe for CDs?",
                  a: "Yes, as long as they are FDIC insured. Online banks often offer significantly higher rates than traditional brick-and-mortar banks because they have lower overhead costs."
                },
                {
                  q: "How does inflation affect my CD returns?",
                  a: "Inflation reduces the purchasing power of your money. If inflation is 3% and your CD earns 4%, your 'real' return is only 1%. It's important to choose a rate that outpaces inflation."
                },
                {
                  q: "Can I lose money in a CD?",
                  a: "In a standard, FDIC-insured CD, your principal is safe. The only way to 'lose' money is if the early withdrawal penalty exceeds the interest earned, or if the bank is not insured."
                },
                {
                  q: "What is the difference between interest rate and APY?",
                  a: "The interest rate is the base rate, while APY (Annual Percentage Yield) includes the effect of compounding. APY is the more accurate number to look at when comparing CDs."
                },
                {
                  q: "Should I choose a long-term or short-term CD?",
                  a: "If you think rates will rise, go short-term. If you think rates will fall, lock in a long-term rate now. Use our <strong>CD rates calculator</strong> to see the difference in total earnings over various timelines."
                }
              ].map((faq, i) => (
                <div key={i} className="p-8 bg-white rounded-[2rem] border border-zinc-200 shadow-sm hover:border-emerald-200 transition-all group">
                  <h4 className="font-bold text-zinc-900 mb-3 text-lg group-hover:text-emerald-700 transition-colors flex items-center gap-3">
                    <span className="text-emerald-500">Q:</span>
                    {faq.q}
                  </h4>
                  <p className="text-zinc-600 leading-relaxed pl-8 border-l-2 border-emerald-100">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center pt-12 border-t border-zinc-100">
            <p className="text-zinc-400 text-sm italic max-w-2xl mx-auto">
              Disclaimer: This <strong>CD calculator</strong> is for informational purposes only and does not constitute financial advice. Always consult with a qualified financial advisor before making investment decisions.
            </p>
            <div className="mt-8">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95"
              >
                Use Our Free CD Calculator Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
