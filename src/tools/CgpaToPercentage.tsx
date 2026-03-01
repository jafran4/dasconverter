import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Percent, Calculator, Info, BookOpen, GraduationCap, ArrowRightLeft, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CgpaToPercentage = () => {
  const [cgpa, setCgpa] = useState<string>('3.5');
  const [scale, setScale] = useState<string>('4.0');
  const [multiplier, setMultiplier] = useState<string>('9.5');

  const calculatePercentage = () => {
    const c = parseFloat(cgpa);
    const s = parseFloat(scale);
    const m = parseFloat(multiplier);

    if (isNaN(c) || isNaN(s) || isNaN(m)) return 0;

    // Standard formula for many boards: (CGPA / Scale) * 100
    // Or the specific multiplier formula: CGPA * Multiplier
    if (multiplier === '10') {
        return ((c / s) * 100).toFixed(2);
    }
    return (c * m).toFixed(2);
  };

  const percentage = calculatePercentage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-2xl mb-4"
        >
          <ArrowRightLeft className="w-8 h-8 text-emerald-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">CGPA to Percentage Converter</h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
          Convert your Cumulative Grade Point Average (CGPA) to an equivalent percentage score instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Enter CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-xl font-bold"
                  placeholder="e.g. 3.85"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">CGPA Scale</label>
                <select
                  value={scale}
                  onChange={(e) => setScale(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-lg"
                >
                  <option value="4.0">4.0 Scale</option>
                  <option value="5.0">5.0 Scale</option>
                  <option value="10.0">10.0 Scale</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Conversion Multiplier</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Standard (9.5)', val: '9.5' },
                    { label: 'Direct (10)', val: '10' },
                    { label: 'Custom', val: multiplier }
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setMultiplier(opt.val)}
                      className={`py-3 rounded-xl border transition-all font-medium ${
                        multiplier === opt.val 
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100' 
                        : 'bg-white border-zinc-200 text-zinc-600 hover:border-emerald-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {multiplier !== '9.5' && multiplier !== '10' && (
                  <input
                    type="number"
                    step="0.1"
                    value={multiplier}
                    onChange={(e) => setMultiplier(e.target.value)}
                    className="mt-4 w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Enter custom multiplier"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
            <h3 className="text-emerald-900 font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" /> Why use 9.5?
            </h3>
            <p className="text-emerald-800/80 leading-relaxed text-sm">
              The 9.5 multiplier is a standard conversion factor used by many educational boards (like CBSE in India and several universities in Bangladesh) to convert CGPA to percentage. It accounts for the fact that even a perfect 10 CGPA doesn't always equate to 100% in terms of raw marks distribution.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-100 text-center">
            <h3 className="text-lg font-medium opacity-90 mb-2">Equivalent Percentage</h3>
            <div className="text-6xl font-bold mb-2">{percentage}%</div>
            <p className="text-emerald-100 text-sm">Based on {scale} scale</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
            <h3 className="font-semibold text-zinc-900 mb-4">Quick Reference</h3>
            <div className="space-y-3">
              {[
                { c: '4.0', p: '95%' },
                { c: '3.75', p: '89%' },
                { c: '3.5', p: '83%' },
                { c: '3.0', p: '71%' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-sm py-2 border-b border-zinc-50 last:border-0">
                  <span className="text-zinc-500">CGPA {item.c}</span>
                  <span className="font-bold text-zinc-900">{item.p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Blog Content */}
      <div className="mt-20 space-y-16">
        <section>
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">CGPA to Percentage: The Ultimate Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-emerald-600">Common Conversion Formulas</h3>
              <ul className="space-y-4 text-zinc-600">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                  <p><strong>Standard Multiplier:</strong> Percentage = CGPA × 9.5</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                  <p><strong>Direct Conversion:</strong> Percentage = (CGPA / Scale) × 100</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                  <p><strong>WES Evaluation:</strong> Often requires a more complex subject-by-subject mapping for international students.</p>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-emerald-600">When do you need this conversion?</h3>
              <p className="text-zinc-600 leading-relaxed mb-4">
                While many universities globally have moved to the CGPA system, many job applications, government exams, and scholarship forms still require your marks in percentage format.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Job Applications', 'Scholarships', 'Higher Education', 'Visa Processing'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full text-xs font-medium">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-zinc-900">Featured Articles for Students</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "CGPA vs Percentage: Which is Better?",
                desc: "Exploring the pros and cons of both systems and why the world is shifting towards CGPA.",
                icon: BookOpen
              },
              {
                title: "How to Maintain a 3.8+ CGPA",
                desc: "Proven study techniques and time management tips from top-performing university students.",
                icon: GraduationCap
              },
              {
                title: "International Grade Conversions",
                desc: "A guide for students applying to US, UK, and European universities with a CGPA.",
                icon: ArrowRightLeft
              }
            ].map((post, i) => (
              <div key={i} className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 hover:bg-white hover:shadow-md transition-all group">
                <post.icon className="w-10 h-10 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-bold text-zinc-900 mb-2">{post.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{post.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
