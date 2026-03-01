import React, { useState } from 'react';
import { Clock, ArrowLeft, Info, HelpCircle, Calculator, History, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const TimeDurationCalculator = () => {
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('17:00');
  const [result, setResult] = useState<{ hours: number; minutes: number; totalMinutes: number; decimalHours: string } | null>(null);

  const calculateDuration = () => {
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    let diffMinutes = (endH * 60 + endM) - (startH * 60 + startM);

    if (diffMinutes < 0) {
      // Handle overnight duration
      diffMinutes += 24 * 60;
    }

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    const decimalHours = (diffMinutes / 60).toFixed(2);

    setResult({
      hours,
      minutes,
      totalMinutes: diffMinutes,
      decimalHours
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
            <Timer className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Time Duration Calculator</h1>
            <p className="text-zinc-500">Calculate the exact duration between two times</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Start Time</label>
              <input 
                type="time" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">End Time</label>
              <input 
                type="time" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
            </div>

            <button 
              onClick={calculateDuration}
              className="w-full py-4 bg-amber-500 text-white font-bold rounded-2xl hover:bg-amber-600 transition-all active:scale-[0.98] shadow-lg shadow-amber-500/20"
            >
              Calculate Duration
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
                <div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Total Duration</p>
                  <h2 className="text-6xl font-black text-amber-500">{result.hours}h {result.minutes}m</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <p className="text-xl font-bold text-zinc-900">{result.totalMinutes}</p>
                    <p className="text-[10px] text-zinc-400 uppercase font-bold">Total Minutes</p>
                  </div>
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <p className="text-xl font-bold text-zinc-900">{result.decimalHours}</p>
                    <p className="text-[10px] text-zinc-400 uppercase font-bold">Decimal Hours</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Select start and end times to calculate duration</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">Mastering Time: The Ultimate Guide to Calculating Duration of Time</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          In our fast-paced world, time is our most valuable resource. Whether you're a freelancer tracking billable hours, a student managing study sessions, or an athlete timing workouts, a reliable <strong>time calculator duration</strong> tool is essential. Understanding how to accurately measure the time between two points is a fundamental skill for productivity and success.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <History className="w-5 h-5 text-amber-500" />
              Why Use a Time and Duration Calculator?
            </h3>
            <p className="text-zinc-600 text-sm">
              Manual time calculation is prone to errors, especially when dealing with overnight shifts or complex schedules. Using a <strong>calculator time duration</strong> tool ensures precision and saves you from the frustration of mental math.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Timer className="w-5 h-5 text-amber-500" />
              Efficiency in Every Second
            </h3>
            <p className="text-zinc-600 text-sm">
              A <strong>time and duration calculator</strong> helps you identify where your time goes. By <strong>calculating duration of time</strong> for specific tasks, you can optimize your schedule and focus on what truly matters.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Practical Uses for a Time Duration Calculator</h3>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Freelancers & Contractors:</strong> Accurately track work hours for invoicing clients. Our tool provides decimal hours, making billing a breeze.</li>
          <li><strong>Students & Educators:</strong> Manage study blocks and classroom activities with ease.</li>
          <li><strong>Fitness Enthusiasts:</strong> Track the duration of your workouts, runs, or meditation sessions.</li>
          <li><strong>Travelers:</strong> Calculate travel times between different time zones or flight durations.</li>
        </ul>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">How to Calculate Time Duration Manually</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          If you don't have access to a <strong>time calculator duration</strong> tool, here's the basic method:
        </p>
        <div className="bg-zinc-900 text-zinc-100 p-6 rounded-2xl font-mono text-sm mb-8">
          1. Convert both times to a 24-hour format.<br/>
          2. Subtract the start time from the end time.<br/>
          3. If the minutes are negative, borrow 60 minutes from the hours.<br/>
          4. If the hours are negative, add 24 hours (for overnight durations).
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Optimizing Your Schedule</h3>
        <p className="text-zinc-600 leading-relaxed">
          Once you start <strong>calculating duration of time</strong> for your daily activities, you'll be surprised at how much time is lost to "micro-tasks." Use our <strong>calculator time duration</strong> tool to audit your day and reclaim your most precious asset. Whether you are a man or a woman, a professional or a student, mastering your time is the first step toward achieving your goals.
        </p>
      </article>
    </div>
  );
};
