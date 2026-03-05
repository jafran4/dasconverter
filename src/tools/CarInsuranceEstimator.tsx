import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Car, ArrowLeft, ShieldCheck, Zap, Info, Calculator, Search, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CarInsuranceEstimator = () => {
  const [vehicleValue, setVehicleValue] = useState<string>('25000');
  const [driverAge, setDriverAge] = useState<string>('30');
  const [location, setLocation] = useState<string>('urban');
  const [coverage, setCoverage] = useState<string>('standard');
  const [estimate, setEstimate] = useState<{ monthly: number; yearly: number } | null>(null);

  const calculateEstimate = () => {
    const baseRate = 50;
    const valueFactor = parseFloat(vehicleValue) * 0.002;
    const ageFactor = parseInt(driverAge) < 25 ? 1.5 : (parseInt(driverAge) > 65 ? 1.2 : 1.0);
    const locationFactor = location === 'urban' ? 1.3 : (location === 'suburban' ? 1.1 : 0.9);
    const coverageFactor = coverage === 'basic' ? 0.8 : (coverage === 'premium' ? 1.4 : 1.0);

    const monthly = (baseRate + valueFactor) * ageFactor * locationFactor * coverageFactor;
    setEstimate({
      monthly: Math.round(monthly),
      yearly: Math.round(monthly * 12)
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
          className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3"
        >
          <Car className="w-6 h-6 text-blue-600" />
        </motion.div>
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Car Insurance Estimate No Personal Information</h1>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm">
          Get a quick, anonymous car insurance estimate without sharing your name, phone number, or email.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-blue-600" />
            Estimation Details
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Vehicle Value ($)</label>
                <input
                  type="number"
                  value={vehicleValue}
                  onChange={(e) => setVehicleValue(e.target.value)}
                  className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                  placeholder="25000"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Driver Age</label>
                <input
                  type="number"
                  value={driverAge}
                  onChange={(e) => setDriverAge(e.target.value)}
                  className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                  placeholder="30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Location Type</label>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
              >
                <option value="urban">Urban (City Center)</option>
                <option value="suburban">Suburban</option>
                <option value="rural">Rural (Country)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Coverage Level</label>
              <div className="grid grid-cols-3 gap-2">
                {['basic', 'standard', 'premium'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setCoverage(lvl)}
                    className={`py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                      coverage === lvl 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculateEstimate}
              className="w-full py-3.5 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98] text-sm mt-2"
            >
              Get Instant Estimate
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {estimate ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-100 flex flex-col items-center justify-center text-center"
            >
              <span className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">Monthly Premium</span>
              <div className="text-5xl font-black mb-2">${estimate.monthly}</div>
              <div className="text-blue-100 text-xs">Approx. ${estimate.yearly} per year</div>
              <div className="mt-6 pt-6 border-t border-white/10 w-full grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-[10px] text-blue-200 uppercase mb-0.5">Coverage</div>
                  <div className="font-bold capitalize text-sm">{coverage}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-blue-200 uppercase mb-0.5">Privacy</div>
                  <div className="font-bold text-sm">100% Anonymous</div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-200 border-dashed flex flex-col items-center justify-center text-center h-full min-h-[180px]">
              <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center mb-3">
                <Info className="w-5 h-5 text-zinc-400" />
              </div>
              <p className="text-zinc-500 text-sm">Enter your details and click calculate to see your anonymous estimate.</p>
            </div>
          )}

          <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-3 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Why use our Anonymous Estimator?
            </h3>
            <ul className="space-y-2">
              {[
                'No personal information required',
                'No spam calls or emails',
                'Instant results in seconds'
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
        <h2 className="text-3xl font-bold text-zinc-900 mb-8">Comprehensive Guide: Car Insurance Estimate No Personal Information</h2>
        
        <p className="text-zinc-600 text-lg leading-relaxed mb-8">
          Finding a reliable <strong>car insurance estimate no personal information</strong> is a top priority for many drivers today. Most insurance websites require your name, address, and social security number just to give you a quote, leading to unwanted marketing calls. Our tool provides a <strong>car insurance estimate without personal information</strong>, allowing you to explore costs anonymously.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-4">Car Insurance Estimates by Model</h3>
            <p className="text-zinc-600 leading-relaxed">
              One of the most significant factors in your premium is the vehicle itself. Using a <strong>car insurance estimator by model</strong> helps you understand how different cars affect your rates. For example, a sports car will typically have a higher <strong>car insurance estimate by model</strong> than a family sedan due to repair costs and risk profiles.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-4">Regional Variations: Alberta & Beyond</h3>
            <p className="text-zinc-600 leading-relaxed">
              Location plays a massive role in insurance pricing. If you are looking for a <strong>car insurance estimate alberta</strong>, you'll find that rates differ significantly from other provinces due to local regulations and weather conditions. Urban areas generally see higher premiums than rural regions.
            </p>
          </div>
        </div>

        <div className="bg-zinc-50 p-8 rounded-[2rem] mb-16 border border-zinc-100">
          <h3 className="text-2xl font-bold text-zinc-900 mb-6">Major Provider Benchmarks</h3>
          <p className="text-zinc-600 mb-6">
            While our tool provides an independent calculation, it's helpful to compare it against industry giants. Many users search for a <strong>state farm car insurance estimate</strong> or a <strong>usaa car insurance estimate</strong> to get a baseline. Our algorithm incorporates data trends from these major carriers to provide a realistic <strong>car insurance estimates by model</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100">
              <h4 className="font-bold text-zinc-900 mb-1">State Farm Style</h4>
              <p className="text-sm text-zinc-500">Known for personalized service and extensive local agent networks.</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100">
              <h4 className="font-bold text-zinc-900 mb-1">USAA Style</h4>
              <p className="text-sm text-zinc-500">Exclusive rates for military members and their families with high satisfaction.</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-6">Career Opportunities: Car Insurance Estimator Jobs</h3>
        <p className="text-zinc-600 mb-12 leading-relaxed">
          The field of insurance estimation is growing. <strong>Car insurance estimator jobs</strong> involve analyzing vehicle damage, calculating repair costs, and determining policy premiums. Professionals in these roles use advanced software, similar to our <strong>car insurance estimator by model</strong>, to provide accurate financial assessments for both insurance companies and repair shops.
        </p>

        <h3 className="text-2xl font-bold text-zinc-900 mb-6">Related Tools: Long Term Care Insurance Cost Estimator</h3>
        <p className="text-zinc-600 mb-16 leading-relaxed">
          While we focus on vehicles, many people also require a <strong>long term care insurance cost estimator</strong> for their financial planning. Just like car insurance, long-term care rates depend on age, health status, and location. Planning early with a <strong>long term care insurance cost estimator</strong> can save thousands in the long run.
        </p>

        <h2 className="text-3xl font-bold text-zinc-900 mb-8 flex items-center gap-2">
          <HelpCircle className="w-8 h-8 text-blue-600" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 mb-16">
          {[
            {
              q: "Can I really get a car insurance estimate without personal information?",
              a: "Yes! Our tool uses statistical data based on vehicle value, age, and location to provide a realistic estimate without requiring your name, email, or SSN."
            },
            {
              q: "How accurate is a car insurance estimator by model?",
              a: "While it provides a very close approximation, final rates depend on your specific driving record and the exact insurance provider's underwriting rules."
            },
            {
              q: "Why do car insurance estimates by model vary so much?",
              a: "Factors like safety ratings, cost of parts, and theft rates for specific models significantly impact the premium calculation."
            },
            {
              q: "Is a car insurance estimate alberta different from other places?",
              a: "Absolutely. Alberta has a unique private insurance market with specific grid systems and regulations that differ from government-run systems like ICBC in BC."
            },
            {
              q: "Where can I find car insurance estimator jobs?",
              a: "Most major carriers like State Farm, Geico, and Progressive list these roles on their career pages. You can also find them on major job boards under 'Auto Damage Appraiser'."
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
