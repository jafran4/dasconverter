import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, ArrowLeft, Play, Pause, RotateCcw, Bell, BellOff } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CountdownTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsActive(false);
            setIsFinished(true);
            if (soundEnabled) {
              // Simple beep sound using Web Audio API
              const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
              const oscillator = audioCtx.createOscillator();
              const gainNode = audioCtx.createGain();
              oscillator.connect(gainNode);
              gainNode.connect(audioCtx.destination);
              oscillator.type = 'sine';
              oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
              gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
              oscillator.start();
              oscillator.stop(audioCtx.currentTime + 1);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft, soundEnabled]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (timeLeft === 0) {
      const total = hours * 3600 + minutes * 60 + seconds;
      if (total === 0) return;
      setTimeLeft(total);
    }
    setIsActive(true);
    setIsFinished(false);
  };

  const handlePause = () => setIsActive(false);

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(0);
    setIsFinished(false);
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
          className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Timer className="w-8 h-8 text-amber-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Countdown Timer</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Set a countdown timer for your tasks, cooking, or study sessions. Simple, reliable, and easy to use.
        </p>
      </div>

      <div className="bg-white p-12 rounded-3xl border border-zinc-200 shadow-sm mb-12 text-center">
        {timeLeft > 0 || isActive || isFinished ? (
          <div className={`text-7xl md:text-8xl font-mono font-bold mb-12 tracking-tighter ${isFinished ? 'text-rose-600 animate-pulse' : 'text-zinc-900'}`}>
            {formatTime(timeLeft)}
          </div>
        ) : (
          <div className="flex justify-center gap-4 mb-12">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Hours</label>
              <input
                type="number"
                min="0"
                max="99"
                value={hours}
                onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-24 h-24 text-4xl font-bold text-center bg-zinc-50 border-2 border-zinc-100 rounded-2xl focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Minutes</label>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                className="w-24 h-24 text-4xl font-bold text-center bg-zinc-50 border-2 border-zinc-100 rounded-2xl focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Seconds</label>
              <input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                className="w-24 h-24 text-4xl font-bold text-center bg-zinc-50 border-2 border-zinc-100 rounded-2xl focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          {!isActive ? (
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 transition-all flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              {timeLeft > 0 ? 'Resume' : 'Start Timer'}
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-8 py-4 bg-rose-100 text-rose-600 rounded-2xl font-bold hover:bg-rose-200 transition-all flex items-center gap-2"
            >
              <Pause className="w-5 h-5" />
              Pause
            </button>
          )}
          <button
            onClick={handleReset}
            className="px-8 py-4 bg-zinc-100 text-zinc-900 rounded-2xl font-bold hover:bg-zinc-200 transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 ${
              soundEnabled ? 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200' : 'bg-rose-50 text-rose-500'
            }`}
          >
            {soundEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
            {soundEnabled ? 'Sound On' : 'Sound Off'}
          </button>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose prose-zinc max-w-none">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Why Use a Countdown Timer?</h2>
        <p className="text-zinc-600 mb-8">
          A countdown timer is an essential tool for time management and productivity. Whether you're following the Pomodoro technique for focused work, timing your cooking to perfection, or setting limits for your exercise routines, our countdown timer provides a simple and effective way to stay on track.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Time Boxing</h3>
            <p className="text-zinc-600 text-sm">Allocate specific time slots for tasks to prevent them from taking up more time than necessary.</p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Kitchen Companion</h3>
            <p className="text-zinc-600 text-sm">Never overcook your meals again. Set a timer for your baking, boiling, or roasting needs.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Will the timer alert me when it's done?</h3>
            <p className="text-zinc-600">Yes, our timer features an optional sound alert that will play once the countdown reaches zero, provided your sound is enabled.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Can I set a timer for more than 24 hours?</h3>
            <p className="text-zinc-600">Our timer currently supports up to 99 hours, 59 minutes, and 59 seconds, which is more than enough for most daily tasks.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Does the timer work offline?</h3>
            <p className="text-zinc-600">Once the page is loaded, the timer logic runs entirely in your browser, so it will continue to work even if you lose your internet connection.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
