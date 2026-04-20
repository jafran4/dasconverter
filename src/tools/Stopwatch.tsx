import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, ArrowLeft, Play, Pause, RotateCcw, List } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 100);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => setIsActive(!isActive);

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([time, ...laps]);
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
          className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Timer className="w-8 h-8 text-blue-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Stopwatch Online</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          A simple, accurate, and easy-to-use online stopwatch with lap functionality. Perfect for sports, cooking, and productivity.
        </p>
      </div>

      <div className="bg-white p-12 rounded-3xl border border-zinc-200 shadow-sm mb-12 text-center">
        <div className="text-7xl md:text-8xl font-mono font-bold text-zinc-900 mb-12 tracking-tighter">
          {formatTime(time)}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleStartPause}
            className={`px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 ${
              isActive 
                ? 'bg-rose-100 text-rose-600 hover:bg-rose-200' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={handleLap}
            disabled={time === 0}
            className="px-8 py-4 bg-zinc-100 text-zinc-900 rounded-2xl font-bold hover:bg-zinc-200 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <List className="w-5 h-5" />
            Lap
          </button>
          <button
            onClick={handleReset}
            className="px-8 py-4 bg-zinc-100 text-zinc-900 rounded-2xl font-bold hover:bg-zinc-200 transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>

      {laps.length > 0 && (
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden mb-12">
          <div className="p-6 border-bottom border-zinc-100 bg-zinc-50 flex items-center justify-between">
            <h2 className="font-bold text-zinc-900">Lap Times</h2>
            <span className="text-zinc-500 text-sm">{laps.length} laps recorded</span>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {laps.map((lapTime, index) => (
              <div key={index} className="p-4 border-t border-zinc-100 flex justify-between items-center hover:bg-zinc-50 transition-colors">
                <span className="font-medium text-zinc-500">Lap {laps.length - index}</span>
                <span className="font-mono font-bold text-zinc-900">{formatTime(lapTime)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Content Section */}
      <div className="prose prose-zinc max-w-none">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Why Use an Online Stopwatch?</h2>
        <p className="text-zinc-600 mb-8">
          An online stopwatch is a versatile tool that can be used for a wide range of activities. Whether you're timing your workouts, tracking your study sessions using the Pomodoro technique, or simply need to time how long it takes to complete a task, our stopwatch provides the precision and ease of use you need.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Productivity Tracking</h3>
            <p className="text-zinc-600 text-sm">Time your tasks to identify where you're spending the most time and improve your efficiency.</p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Fitness & Sports</h3>
            <p className="text-zinc-600 text-sm">Use the lap feature to track your split times during running, swimming, or other athletic activities.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Is this stopwatch accurate?</h3>
            <p className="text-zinc-600">Yes, our stopwatch uses the high-precision system clock of your device to ensure accurate timing down to the millisecond.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Can I use this on my mobile phone?</h3>
            <p className="text-zinc-600">Absolutely! Our stopwatch is fully responsive and works perfectly on smartphones, tablets, and desktop computers.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Will the stopwatch keep running if I switch tabs?</h3>
            <p className="text-zinc-600">Yes, the stopwatch will continue to run in the background as long as the tab remains open in your browser.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
