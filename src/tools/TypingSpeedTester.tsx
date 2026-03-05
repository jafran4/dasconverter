import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Keyboard, ArrowLeft, RotateCcw, Timer, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. This classic sentence contains every letter of the English alphabet, making it perfect for typing practice and testing keyboards.",
  "Programming is the art of telling another human what one wants the computer to do. It requires patience, logic, and a deep understanding of how systems interact with each other.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. In the world of technology, we must constantly adapt and learn new things to stay relevant.",
  "The best way to predict the future is to invent it. Innovation distinguishes between a leader and a follower. Stay hungry, stay foolish, and never stop exploring new possibilities."
];

export const TypingSpeedTester = () => {
  const [text, setText] = useState('');
  const [targetText, setTargetText] = useState(SAMPLE_TEXTS[0]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsFinished(true);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTest = () => {
    setText('');
    setStartTime(Date.now());
    setIsActive(true);
    setIsFinished(false);
    setTimeLeft(60);
    setWpm(0);
    setAccuracy(100);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (!isActive && !isFinished) {
      setIsActive(true);
      setStartTime(Date.now());
    }
    
    setText(value);

    // Calculate accuracy
    let correctChars = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === targetText[i]) {
        correctChars++;
      }
    }
    setAccuracy(Math.round((correctChars / value.length) * 100) || 100);

    // Calculate WPM
    const words = value.trim().split(/\s+/).length;
    const timeElapsed = (60 - timeLeft) / 60; // in minutes
    if (timeElapsed > 0) {
      setWpm(Math.round(words / timeElapsed));
    }

    if (value.length >= targetText.length) {
      setIsActive(false);
      setIsFinished(true);
    }
  };

  const resetTest = () => {
    setText('');
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(60);
    setWpm(0);
    setAccuracy(100);
    setTargetText(SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Keyboard className="w-8 h-8 text-indigo-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Typing Speed Tester</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Test your typing speed (WPM) and accuracy with our free online typing test. Improve your productivity and master the keyboard.
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
            <span className="text-sm font-medium uppercase tracking-wider">WPM</span>
          </div>
          <div className="text-3xl font-bold text-indigo-600">{wpm}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm text-center">
          <div className="flex items-center justify-center gap-2 text-zinc-500 mb-2">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">Accuracy</span>
          </div>
          <div className="text-3xl font-bold text-emerald-600">{accuracy}%</div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <div className="relative mb-8 p-6 bg-zinc-50 rounded-2xl border border-zinc-100 text-xl leading-relaxed font-mono select-none">
          {targetText.split('').map((char, i) => {
            let color = 'text-zinc-400';
            if (i < text.length) {
              color = text[i] === char ? 'text-emerald-600' : 'text-rose-600 bg-rose-50';
            }
            return (
              <span key={i} className={color}>
                {char}
              </span>
            );
          })}
        </div>

        <textarea
          ref={inputRef}
          value={text}
          onChange={handleInputChange}
          disabled={isFinished}
          placeholder="Start typing here..."
          className="w-full h-32 p-6 bg-white border-2 border-zinc-100 rounded-2xl focus:outline-none focus:border-indigo-500 transition-all text-lg font-mono resize-none"
        />

        <div className="mt-8 flex gap-4">
          <button
            onClick={resetTest}
            className="flex-1 py-4 bg-zinc-100 text-zinc-900 rounded-2xl font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset Test
          </button>
          {isFinished && (
            <button
              onClick={startTest}
              className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all"
            >
              Try Again
            </button>
          )}
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose prose-zinc max-w-none">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Why Test Your Typing Speed?</h2>
        <p className="text-zinc-600 mb-8">
          In today's digital age, typing is a fundamental skill. Whether you're a student, a professional, or a casual user, being able to type quickly and accurately can save you hours of time every week. Our typing speed tester helps you measure your current performance and identify areas for improvement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Improve Productivity</h3>
            <p className="text-zinc-600 text-sm">Increasing your WPM from 40 to 60 can reduce the time you spend writing emails and reports by 33%.</p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Reduce Fatigue</h3>
            <p className="text-zinc-600 text-sm">Touch typing allows you to type without looking at the keyboard, reducing neck strain and mental fatigue.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">What is a good typing speed?</h3>
            <p className="text-zinc-600">The average typing speed is around 40 WPM. Professional typists usually aim for 65-75 WPM, while elite typists can exceed 100 WPM.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">How is WPM calculated?</h3>
            <p className="text-zinc-600">WPM (Words Per Minute) is calculated by taking the total number of characters typed, dividing by 5 (the average word length), and then dividing by the time taken in minutes.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Does accuracy matter more than speed?</h3>
            <p className="text-zinc-600">Yes, especially when learning. It's better to type 30 WPM with 100% accuracy than 60 WPM with 80% accuracy, as correcting mistakes takes more time than typing slowly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
