import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  ArrowLeft, 
  Info, 
  HelpCircle, 
  ChevronRight, 
  Maximize2,
  RefreshCw,
  Zap,
  BookOpen,
  PieChart
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const IntervalOfConvergenceCalculator = () => {
  const [center, setCenter] = useState('0');
  const [radius, setRadius] = useState('');
  const [leftEndIncluded, setLeftEndIncluded] = useState<boolean | null>(null);
  const [rightEndIncluded, setRightEndIncluded] = useState<boolean | null>(null);
  const [result, setResult] = useState<any>(null);

  const calculateInterval = () => {
    const c = parseFloat(center);
    const r = parseFloat(radius);

    if (isNaN(c) || isNaN(r) || r < 0) {
      alert("Please enter valid numbers. Radius must be non-negative.");
      return;
    }

    if (r === 0) {
      setResult({
        type: 'point',
        interval: `{${c}}`,
        radius: 0,
        explanation: 'The series converges only at its center.'
      });
      return;
    }

    if (r === Infinity || radius.toLowerCase() === 'inf' || radius.toLowerCase() === 'infinity') {
      setResult({
        type: 'infinity',
        interval: '(-∞, ∞)',
        radius: '∞',
        explanation: 'The series converges for all real numbers.'
      });
      return;
    }

    const left = c - r;
    const right = c + r;

    let intervalStr = '';
    if (leftEndIncluded === null || rightEndIncluded === null) {
        // Just providing the open interval if endpoints aren't specified for the quick calculator
        intervalStr = `(${left}, ${right})`;
    } else {
        intervalStr = `${leftEndIncluded ? '[' : '('}${left}, ${right}${rightEndIncluded ? ']' : ')'}`;
    }

    setResult({
      type: 'range',
      left,
      right,
      radius: r,
      center: c,
      interval: intervalStr,
      explanation: `Calculated using the center (c = ${c}) and radius (R = ${r}).`
    });
  };

  const reset = () => {
    setCenter('0');
    setRadius('');
    setLeftEndIncluded(null);
    setRightEndIncluded(null);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-100"
        >
          <Calculator className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Interval of Convergence Calculator</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Find the radius and interval of convergence for any power series. Perfect for calculus students and math enthusiasts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2 bg-white p-8 rounded-[32px] border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">
                Series Center (c)
              </label>
              <input
                type="number"
                value={center}
                onChange={(e) => setCenter(e.target.value)}
                placeholder="e.g. 0"
                className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-zinc-900 text-lg font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">
                Radius of Convergence (R)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  placeholder="e.g. 5 or Infinity"
                  className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-zinc-900 text-lg font-medium pr-12"
                />
                <button 
                  onClick={() => setRadius('Infinity')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 font-bold hover:text-blue-700 p-1"
                  title="Set to Infinity"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">
                  Left Endpoint (c-R)
                </label>
                <div className="flex bg-zinc-50 p-1 rounded-xl border border-zinc-200">
                  <button
                    onClick={() => setLeftEndIncluded(true)}
                    className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${leftEndIncluded === true ? 'bg-white text-blue-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                  >
                    Included [
                  </button>
                  <button
                    onClick={() => setLeftEndIncluded(false)}
                    className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${leftEndIncluded === false ? 'bg-white text-blue-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                  >
                    Excluded (
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">
                  Right Endpoint (c+R)
                </label>
                <div className="flex bg-zinc-50 p-1 rounded-xl border border-zinc-200">
                  <button
                    onClick={() => setRightEndIncluded(true)}
                    className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${rightEndIncluded === true ? 'bg-white text-blue-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                  >
                    Included ]
                  </button>
                  <button
                    onClick={() => setRightEndIncluded(false)}
                    className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${rightEndIncluded === false ? 'bg-white text-blue-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                  >
                    Excluded )
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={calculateInterval}
                className="flex-grow py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
              >
                <ChevronRight className="w-6 h-6" />
                Calculate Interval
              </button>
              <button
                onClick={reset}
                className="px-6 py-5 bg-zinc-100 text-zinc-600 rounded-2xl font-bold hover:bg-zinc-200 transition-all flex items-center justify-center"
              >
                <RefreshCw className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 p-6 rounded-[32px] text-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-400" />
                Result
              </h3>
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="text-4xl font-mono font-bold text-blue-400 mb-2 truncate">
                      {result.interval}
                    </div>
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                      Radius R = <span className="text-white font-bold">{result.radius}</span>
                    </p>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-sm">
                      <p className="text-white/80">{result.explanation}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-6 h-6 text-zinc-500" />
                    </div>
                    <p className="text-zinc-500 text-sm">Enter the radius and center to see the interval</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-[32px] border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              Quick Tip
            </h4>
            <p className="text-blue-700 text-sm leading-relaxed">
              For a series <span className="font-mono">∑ aₙ(x-c)ⁿ</span>, the Ratio Test is often used to find the radius <span className="font-mono">R</span>.
            </p>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose prose-zinc max-w-none border-t border-zinc-100 pt-16">
        <h2 className="text-4xl font-bold text-zinc-900 mb-8 tracking-tight">Understanding Power Series: Radius and Interval of Convergence</h2>
        
        <p className="text-zinc-600 text-lg leading-relaxed mb-8">
          A power series is a function written in the form of an infinite sum. One of the most critical questions in calculus is: "For which values of x does this sum actually exist?" This is where our <strong>interval of convergence calculator</strong> becomes an essential companion for students and mathematicians alike.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3">
              <RefreshCw className="w-6 h-6 text-blue-600" />
              What is the Radius of Convergence?
            </h3>
            <p className="text-zinc-600 leading-relaxed">
              The radius of convergence, typically denoted as <em>R</em>, is the distance from the center of the series to the boundary where the series stops converging. Our <strong>radius of convergence and interval of convergence calculator</strong> helps you quickly determine this value. If the series converges only at the center, <em>R = 0</em>. If it converges everywhere, <em>R = ∞</em>.
            </p>
          </div>
          <div className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3">
              <PieChart className="w-6 h-6 text-green-600" />
              Interval of Convergence Explained
            </h3>
            <p className="text-zinc-600 leading-relaxed">
              The interval of convergence is the set of all real numbers for which the power series converges. While the radius tells you how "wide" the convergence is, <strong>intervals of convergence calculator</strong> checks the specific boundaries. Using a <strong>radius and interval of convergence calculator</strong> allows you to handle cases where endpoints might converge (bracketed) or diverge (parenthesized).
            </p>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 mb-6">How to Calculate Interval of Convergence?</h2>
          <p className="text-zinc-600 mb-6 font-medium">To <strong>find the interval of convergence calculator</strong> results manually, follow these standard mathematical steps:</p>
          
          <div className="space-y-6">
            <div className="flex gap-6 p-6 rounded-2xl hover:bg-zinc-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">1</div>
              <div>
                <h4 className="font-bold text-zinc-900 mb-2">Apply the Ratio Test</h4>
                <p className="text-zinc-600 leading-relaxed">Calculate the limit of |aₙ₊₁ / aₙ| as n approaches infinity. This <strong>interval of convergence power series calculator</strong> logic is based on ensuring the ratio is less than 1.</p>
              </div>
            </div>
            <div className="flex gap-6 p-6 rounded-2xl hover:bg-zinc-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">2</div>
              <div>
                <h4 className="font-bold text-zinc-900 mb-2">Solve for X</h4>
                <p className="text-zinc-600 leading-relaxed">Rearrange the inequality to find the range of x. This step is why people use a <strong>calculate interval of convergence</strong> tool—it automates the algebraic heavy lifting.</p>
              </div>
            </div>
            <div className="flex gap-6 p-6 rounded-2xl hover:bg-zinc-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">3</div>
              <div>
                <h4 className="font-bold text-zinc-900 mb-2">Check the Endpoints</h4>
                <p className="text-zinc-600 leading-relaxed">This is the most common place where errors occur. An <strong>interval of convergence calculator with steps</strong> will test the specific boundary values to see if the series converges or diverges at the ends.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-white border border-zinc-200 rounded-[2.5rem] p-10 shadow-sm mt-12">
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-zinc-900 mb-2">What is an interval of convergence calculator power series tool?</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">It's a specialized math utility that determines where a power series is valid. Our <strong>interval of convergence calculator power series</strong> provides high accuracy for standard calculus problems.</p>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 mb-2">How accurate is this math utility?</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">Our calculator uses standard power series formulas. However, for <strong>interval of convergence calculator with steps</strong>, students should always double-check endpoint convergence using series tests like the P-series or Alternating Series test.</p>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 mb-2">Can it handle complex power series?</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">Yes, whether you need to <strong>calculate interval of convergence</strong> for simple geometric series or more advanced Taylor series, this tool provides the fundamental range.</p>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 mb-2">Why do I need to find the interval of convergence?</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">In engineering and physics, power series are used to approximate functions. Knowing the interval ensures that your approximations are valid and stable within your specific operating range.</p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3 mb-12 opacity-50">
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Keywords:</span>
          {[
            'interval of convergence calculator',
            'radius of convergence and interval of convergence calculator',
            'radius and interval of convergence calculator',
            'intervals of convergence calculator',
            'find the interval of convergence calculator',
            'interval of convergence power series calculator',
            'interval of convergence calculator power series',
            'interval of convergence calculator with steps',
            'calculate interval of convergence'
          ].map((kw) => (
            <span key={kw} className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">{kw} •</span>
          ))}
        </div>
      </div>
    </div>
  );
};
