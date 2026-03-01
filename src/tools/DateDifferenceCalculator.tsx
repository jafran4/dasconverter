import React, { useState } from 'react';
import { Calendar, ArrowLeft, Info, HelpCircle, Clock, ArrowRightLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const DateDifferenceCalculator = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [result, setResult] = useState<{ days: number; weeks: number; months: number; years: number } | null>(null);

  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365.25);
    const months = Math.floor(diffDays / 30.44);
    const weeks = Math.floor(diffDays / 7);

    setResult({
      days: diffDays,
      weeks,
      months,
      years
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
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
            <ArrowRightLeft className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Date Difference Calculator</h1>
            <p className="text-zinc-500">Calculate the exact time between two dates</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Start Date</label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">End Date</label>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>

            <button 
              onClick={calculateDifference}
              className="w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20"
            >
              Calculate Difference
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
                <div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Total Days</p>
                  <h2 className="text-6xl font-black text-emerald-500">{result.days.toLocaleString()}</h2>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <p className="text-xl font-bold text-zinc-900">{result.weeks.toLocaleString()}</p>
                    <p className="text-[10px] text-zinc-400 uppercase font-bold">Weeks</p>
                  </div>
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <p className="text-xl font-bold text-zinc-900">{result.months.toLocaleString()}</p>
                    <p className="text-[10px] text-zinc-400 uppercase font-bold">Months</p>
                  </div>
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <p className="text-xl font-bold text-zinc-900">{result.years.toLocaleString()}</p>
                    <p className="text-[10px] text-zinc-400 uppercase font-bold">Years</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Select two dates to see the time difference</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">Mastering Time: How to Use a Date Difference Calculator</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Whether you're planning a project, tracking a pregnancy, or counting down to a vacation, a date difference calculator is an essential tool for effective time management.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-500" />
              Project Management
            </h3>
            <p className="text-zinc-600 text-sm">
              Calculate the exact number of days between milestones to ensure your project stays on track. Perfect for freelancers and business owners.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-500" />
              Life Events
            </h3>
            <p className="text-zinc-600 text-sm">
              Tracking anniversaries, birthdays, or the age of a child? Our tool provides a quick and accurate way to see how much time has passed.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Why Use a Digital Tool?</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Calculating the difference between dates manually can be tricky due to leap years and months with different numbers of days. Our digital tool handles all these complexities for you, providing an accurate result in seconds.
        </p>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Practical Applications</h3>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Legal Deadlines:</strong> Calculate the exact number of days for contract expirations or legal filings.</li>
          <li><strong>Health Tracking:</strong> Monitor the time between medical appointments or the duration of a fitness program.</li>
          <li><strong>Financial Planning:</strong> Calculate the number of days for interest accrual on loans or investments.</li>
        </ul>
      </article>
    </div>
  );
};
