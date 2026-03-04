import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MousePointer2, ArrowLeft, RotateCcw, Zap, Target, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CpsCounter = () => {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0.1) {
            clearInterval(timerRef.current);
            setIsActive(false);
            setIsFinished(true);
            return 0;
          }
          return Number((prev - 0.1).toFixed(1));
        });
      }, 100);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const handleClick = () => {
    if (isFinished) return;
    if (!isActive) {
      setIsActive(true);
      setTimeLeft(5);
      setClicks(1);
    } else {
      setClicks((prev) => prev + 1);
    }
  };

  const resetTest = () => {
    setClicks(0);
    setTimeLeft(5);
    setIsActive(false);
    setIsFinished(false);
    clearInterval(timerRef.current);
  };

  const cps = clicks > 0 ? (clicks / (5 - timeLeft || 0.1)).toFixed(2) : '0.00';

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
          className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Zap className="w-8 h-8 text-emerald-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">CPS Counter</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Test your clicks per second (CPS) in a 5-second burst. Perfect for competitive gamers and speed clickers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm text-center">
          <div className="flex items-center justify-center gap-2 text-zinc-500 mb-2">
            <Timer className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">Time Left</span>
          </div>
          <div className="text-3xl font-bold text-zinc-900">{timeLeft}s</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm text-center">
          <div className="flex items-center justify-center gap-2 text-zinc-500 mb-2">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">Total Clicks</span>
          </div>
          <div className="text-3xl font-bold text-emerald-600">{clicks}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm text-center">
          <div className="flex items-center justify-center gap-2 text-zinc-500 mb-2">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">CPS</span>
          </div>
          <div className="text-3xl font-bold text-indigo-600">{cps}</div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleClick}
          className={`w-full h-64 rounded-2xl border-4 border-dashed transition-all flex flex-col items-center justify-center gap-4 ${
            isActive 
              ? 'bg-emerald-50 border-emerald-200' 
              : isFinished 
                ? 'bg-zinc-50 border-zinc-200' 
                : 'bg-white border-zinc-100 hover:border-emerald-500/50'
          }`}
        >
          <MousePointer2 className={`w-12 h-12 ${isActive ? 'text-emerald-600 animate-pulse' : 'text-zinc-400'}`} />
          <span className="text-2xl font-bold text-zinc-900">
            {isActive ? 'CLICK! CLICK! CLICK!' : isFinished ? 'Time\'s Up!' : 'Click here to start!'}
          </span>
          {!isActive && !isFinished && (
            <span className="text-zinc-500">The 5-second timer starts on your first click</span>
          )}
        </motion.button>

        <div className="mt-8 flex gap-4">
          <button
            onClick={resetTest}
            className="flex-1 py-4 bg-zinc-100 text-zinc-900 rounded-2xl font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose prose-zinc max-w-none">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">What is CPS?</h2>
        <p className="text-zinc-600 mb-8">
          CPS stands for Clicks Per Second. It's a metric used to measure the speed at which you can click your mouse or tap your screen. In competitive gaming, especially in titles like Minecraft (for PvP combat), a high CPS is often crucial for success.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Competitive Advantage</h3>
            <p className="text-zinc-600 text-sm">A higher CPS allows you to register more hits in games, giving you a significant edge in combat scenarios.</p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Skill Tracking</h3>
            <p className="text-zinc-600 text-sm">Use our CPS counter to track your progress as you practice different clicking techniques.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">How do I calculate CPS?</h3>
            <p className="text-zinc-600">CPS is calculated by dividing the total number of clicks by the time taken in seconds. For example, if you click 50 times in 5 seconds, your CPS is 10.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">What is the world record for CPS?</h3>
            <p className="text-zinc-600">While unofficial, some players have reached over 20 CPS using advanced techniques like drag clicking or butterfly clicking.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Is a high CPS always better?</h3>
            <p className="text-zinc-600">In many games, yes. However, accuracy and timing are also important. A high CPS without precision may not be effective.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
