import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Footprints, 
  ArrowLeft, 
  Info, 
  HelpCircle, 
  ChevronRight, 
  RefreshCw,
  Ruler,
  MapPin,
  Flame,
  Clock,
  Heart,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const StepsToMilesCalculator = () => {
  const [steps, setSteps] = useState<string>('');
  const [strideLength, setStrideLength] = useState<string>('2.5'); // Default average 2.5 ft
  const [unit, setUnit] = useState<'ft' | 'cm'>('ft');
  const [result, setResult] = useState<any>(null);

  const calculateDistance = () => {
    const s = parseFloat(steps);
    const stride = parseFloat(strideLength);

    if (isNaN(s) || s <= 0) {
      alert("Please enter a valid number of steps.");
      return;
    }

    if (isNaN(stride) || stride <= 0) {
      alert("Please enter a valid stride length.");
      return;
    }

    // Convert stride to feet for miles calculation
    const strideInFeet = unit === 'ft' ? stride : stride / 30.48;
    const totalFeet = s * strideInFeet;
    const miles = totalFeet / 5280;
    const km = totalFeet / 3280.84;
    const calories = s * 0.04; // Very rough average: 0.04 calories per step

    setResult({
      miles: miles.toFixed(2),
      km: km.toFixed(2),
      calories: Math.round(calories),
      steps: s.toLocaleString()
    });
  };

  const reset = () => {
    setSteps('');
    setStrideLength('2.5');
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 font-sans">
      {/* Main Tool Section */}
      <section className="min-h-screen flex flex-col justify-center pt-24 pb-12">
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Tools
        </Link>

        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-100"
          >
            <Footprints className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Steps to Miles Calculator</h1>
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Convert your daily steps into miles and kilometers. Perfect for tracking walking goals and fitness progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white p-8 rounded-[32px] border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Number of Steps</label>
                <div className="relative">
                  <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300" />
                  <input
                    type="number"
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                    placeholder="e.g. 10000"
                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest">Stride Length</label>
                  <div className="flex bg-zinc-100 p-1 rounded-lg">
                    <button 
                      onClick={() => setUnit('ft')}
                      className={`px-3 py-1 text-[10px] font-black rounded-md transition-all ${unit === 'ft' ? 'bg-white text-orange-600 shadow-sm' : 'text-zinc-400'}`}
                    >
                      FT
                    </button>
                    <button 
                      onClick={() => setUnit('cm')}
                      className={`px-3 py-1 text-[10px] font-black rounded-md transition-all ${unit === 'cm' ? 'bg-white text-orange-600 shadow-sm' : 'text-zinc-400'}`}
                    >
                      CM
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300" />
                  <input
                    type="number"
                    step="0.1"
                    value={strideLength}
                    onChange={(e) => setStrideLength(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-xl font-bold"
                  />
                </div>
                <p className="mt-2 text-[10px] text-zinc-400 font-medium">Average stride: 2.2ft (Women), 2.5ft (Men)</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={calculateDistance}
                  className="flex-grow py-5 bg-orange-500 text-white rounded-2xl font-black hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-100 text-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                  Calculate Distance
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
            <div className="bg-zinc-900 p-8 rounded-[32px] text-white overflow-hidden relative min-h-[300px] flex flex-col justify-center">
              <div className="relative z-10">
                <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-8 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  Total Distance
                </h3>
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="text-6xl font-black text-orange-400 mb-2">
                        {result.miles}<span className="text-2xl ml-1 text-white opacity-40 italic">mi</span>
                      </div>
                      <div className="text-2xl font-bold text-white/60 mb-8 italic">
                        {result.km} km
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/10">
                        <div>
                          <span className="text-zinc-500 font-black uppercase tracking-widest text-[9px] block mb-1">Cals Burned</span>
                          <div className="font-black text-lg flex items-center gap-1">
                            <Flame className="w-4 h-4 text-orange-500" />
                            {result.calories}
                          </div>
                        </div>
                        <div>
                          <span className="text-zinc-500 font-black uppercase tracking-widest text-[9px] block mb-1">Steps</span>
                          <div className="font-black text-lg">{result.steps}</div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Activity className="w-8 h-8 text-zinc-600" />
                      </div>
                      <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Awaiting Input</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl" />
            </div>

            <div className="bg-orange-50 p-6 rounded-[32px] border border-orange-100">
              <h4 className="font-black text-orange-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Heart className="w-4 h-4" />
                Health Goal
              </h4>
              <p className="text-orange-700 text-sm leading-relaxed font-medium capitalize">
                Walking 10,000 steps covers roughly 5 miles and burns 400 calories for the average adult.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog & FAQ Section */}
      <div className="prose prose-zinc max-w-none border-t border-zinc-100 pt-16 pb-24 font-sans">
        <h2 className="text-4xl font-bold text-zinc-900 mb-8 tracking-tight">Understanding Your Gait: Steps to Miles Guide</h2>
        
        <p className="text-zinc-600 text-lg leading-relaxed mb-8">
          Whether you're training for a marathon or just trying to hit your 10,000 steps, knowing the exact distance you've traveled is essential. Our <strong>steps to miles calculator</strong> provides a precise conversion based on your personal stride length, turning those motion sensor numbers into meaningful geographical results.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 not-prose">
          <div className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-100">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3">
              <Ruler className="w-6 h-6 text-orange-500" />
              How to Measure Stride Length
            </h3>
            <p className="text-zinc-600 leading-relaxed font-medium">
              To get the most out of your <strong>miles to steps converter</strong>, you need your stride length. Walk 10 steps, measure the total distance, and divide by 10. For a quick estimate, men average 30 inches (2.5ft) while women average 26 inches (2.2ft).
            </p>
          </div>
          <div className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-100">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              Impact of Speed
            </h3>
            <p className="text-zinc-600 leading-relaxed font-medium">
              As you speed up into a run, your stride length increases. This <strong>steps to distance calculator</strong> is optimized for walking and light jogging. For running, increase your stride length input by 30-50% for accurate mileage.
            </p>
          </div>
        </div>

        <section className="bg-white border border-zinc-200 rounded-[2.5rem] p-10 shadow-sm mb-16 not-prose">
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 flex items-center gap-3 tracking-tight underline decoration-orange-400 decoration-4 underline-offset-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="font-black text-zinc-900 text-xs uppercase tracking-widest mb-3">How many steps is a mile?</h4>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">For the average adult, one mile is approximately 2,000 to 2,500 steps. This depends entirely on your height and leg length, which is why a custom <strong>steps in a mile calculator</strong> is useful.</p>
            </div>
            <div>
              <h4 className="font-black text-zinc-900 text-xs uppercase tracking-widest mb-3">Is 10,000 steps really 5 miles?</h4>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">Yes, for most people 10,000 steps equates to about 4.5 to 5 miles. It's a standard fitness benchmark because it represents a "healthy" amount of daily activity for urban dwellers.</p>
            </div>
            <div>
              <h4 className="font-black text-zinc-900 text-xs uppercase tracking-widest mb-3">Do steps to miles conversions change as I age?</h4>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">Gait patterns can shorten slightly with age or injury. Periodically re-measuring your stride ensures your <strong>walking calculator steps to miles</strong> results remain accurate over time.</p>
            </div>
            <div>
              <h4 className="font-black text-zinc-900 text-xs uppercase tracking-widest mb-3">Can this track hiking distance?</h4>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">On steep terrain, stride length decreases significantly. If you're using our <strong>converter steps to miles</strong> for hiking, decrease your stride length by 15-20% to account for uphill climbing.</p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3 opacity-40 font-sans italic">
          <span className="text-[9px] uppercase tracking-widest font-black text-zinc-400">Context:</span>
          {[
            'steps to miles calculator',
            'how many steps in a mile',
            'walking distance converter',
            'miles to steps calculator',
            'stride length estimation',
            'fitness progress tool'
          ].map((kw) => (
            <span key={kw} className="text-[9px] uppercase tracking-widest font-black text-zinc-400">{kw} •</span>
          ))}
        </div>
      </div>
    </div>
  );
};
