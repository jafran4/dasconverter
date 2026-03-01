import React, { useState } from 'react';
import { Calendar, ArrowLeft, Info, HelpCircle, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState<string>('');
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<{ years: number; months: number; days: number; nextBirthday: string } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (birth > target) {
      alert("Birth date cannot be in the future relative to the target date.");
      return;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Next Birthday calculation
    const nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday.setFullYear(target.getFullYear() + 1);
    }
    const diffTime = Math.abs(nextBday.getTime() - target.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const nextBdayMonths = Math.floor(diffDays / 30.44);
    const nextBdayRemainingDays = Math.floor(diffDays % 30.44);

    setResult({
      years,
      months,
      days,
      nextBirthday: `${nextBdayMonths} months and ${nextBdayRemainingDays} days`
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
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
            <User className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Age Calculator</h1>
            <p className="text-zinc-500">Calculate exact age in years, months, and days</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Date of Birth</label>
              <input 
                type="date" 
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Age at Date of</label>
              <input 
                type="date" 
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            <button 
              onClick={calculateAge}
              className="w-full py-4 bg-indigo-500 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/20"
            >
              Calculate Age
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <p className="text-3xl font-black text-indigo-500">{result.years}</p>
                    <p className="text-xs text-zinc-400 uppercase font-bold">Years</p>
                  </div>
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <p className="text-3xl font-black text-indigo-500">{result.months}</p>
                    <p className="text-xs text-zinc-400 uppercase font-bold">Months</p>
                  </div>
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <p className="text-3xl font-black text-indigo-500">{result.days}</p>
                    <p className="text-xs text-zinc-400 uppercase font-bold">Days</p>
                  </div>
                </div>
                
                <div className="p-6 bg-indigo-500 text-white rounded-2xl shadow-lg">
                  <p className="text-xs uppercase font-bold opacity-80 mb-1">Next Birthday In</p>
                  <p className="text-xl font-bold">{result.nextBirthday}</p>
                </div>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter your birth date to see your exact age</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">How Old Am I? The Importance of Knowing Your Exact Age</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Knowing your exact age in years, months, and days is more than just a fun fact. It's essential for legal documents, medical assessments, and tracking developmental milestones in children and teenagers.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              Precision Matters
            </h3>
            <p className="text-zinc-600 text-sm">
              Our age calculator accounts for leap years and the varying number of days in each month, providing a level of accuracy that mental math often misses.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500" />
              Birthday Countdown
            </h3>
            <p className="text-zinc-600 text-sm">
              Planning a party? Our tool also tells you exactly how much time is left until your next big celebration, helping you stay organized.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Age Calculation for Different Life Stages</h3>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>For Parents:</strong> Track your child's age in months and days to ensure they are meeting growth milestones.</li>
          <li><strong>For Teenagers:</strong> Know exactly when you reach legal milestones like driving or voting age.</li>
          <li><strong>For Seniors:</strong> Accurately calculate retirement eligibility and social security benefits.</li>
        </ul>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">How the Math Works</h3>
        <p className="text-zinc-600 leading-relaxed">
          The calculator subtracts the birth date from the current (or target) date. If the current day is less than the birth day, it "borrows" a month from the month count and adds the appropriate number of days from the previous month to the day count. This ensures a precise result every time.
        </p>
      </article>
    </div>
  );
};
