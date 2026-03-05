import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MousePointer2, ArrowLeft, RotateCcw, Zap, Target, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ClickSpeedTest = () => {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [bestScore, setBestScore] = useState(0);
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
      setTimeLeft(10);
      setClicks(1);
    } else {
      setClicks((prev) => prev + 1);
    }
  };

  const resetTest = () => {
    if (clicks > bestScore) setBestScore(clicks);
    setClicks(0);
    setTimeLeft(10);
    setIsActive(false);
    setIsFinished(false);
    clearInterval(timerRef.current);
  };

  const cps = clicks > 0 ? (clicks / (10 - timeLeft || 0.1)).toFixed(2) : '0.00';

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <MousePointer2 className="w-8 h-8 text-rose-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Click Speed Test</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          How fast can you click in 10 seconds? Test your clicking speed, improve your CPS, and challenge your friends.
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
          <div className="text-3xl font-bold text-rose-600">{clicks}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm text-center">
          <div className="flex items-center justify-center gap-2 text-zinc-500 mb-2">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">CPS</span>
          </div>
          <div className="text-3xl font-bold text-emerald-600">{cps}</div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleClick}
          className={`w-full h-64 rounded-2xl border-4 border-dashed transition-all flex flex-col items-center justify-center gap-4 ${
            isActive 
              ? 'bg-rose-50 border-rose-200' 
              : isFinished 
                ? 'bg-zinc-50 border-zinc-200' 
                : 'bg-white border-zinc-100 hover:border-rose-500/50'
          }`}
        >
          <MousePointer2 className={`w-12 h-12 ${isActive ? 'text-rose-600 animate-bounce' : 'text-zinc-400'}`} />
          <span className="text-2xl font-bold text-zinc-900">
            {isActive ? 'CLICK! CLICK! CLICK!' : isFinished ? 'Time\'s Up!' : 'Click here to start!'}
          </span>
          {!isActive && !isFinished && (
            <span className="text-zinc-500">The timer starts on your first click</span>
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
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">What is Click Speed Test?</h2>
        <p className="text-zinc-600 mb-8">
          A click speed test (also known as a CPS test) measures how many times you can click your mouse button within a specific time frame. It's a popular tool among gamers, especially those who play Minecraft, Roblox, or competitive shooters where fast clicking can provide a significant advantage.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Gaming Performance</h3>
            <p className="text-zinc-600 text-sm">Many games require rapid clicking for combat or building. Testing your speed helps you track your improvement over time.</p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Clicking Techniques</h3>
            <p className="text-zinc-600 text-sm">Master techniques like Jitter Clicking, Butterfly Clicking, or Drag Clicking to significantly increase your CPS.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">What is a good CPS score?</h3>
            <p className="text-zinc-600">The average person clicks at 4-6 CPS. Competitive gamers often reach 8-12 CPS, and professional players using advanced techniques can hit 20+ CPS.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">How can I click faster?</h3>
            <p className="text-zinc-600">Practice is key. You can also try different clicking techniques like the "Butterfly Click" (using two fingers) or "Jitter Clicking" (vibrating your arm muscles).</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Does my mouse affect my CPS?</h3>
            <p className="text-zinc-600">Yes, high-quality gaming mice often have better switches and lower latency, which can help you achieve higher clicking speeds.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
