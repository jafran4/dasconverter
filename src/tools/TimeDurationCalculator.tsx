import React, { useState } from 'react';
import { Clock, ArrowLeft, Info, HelpCircle, Calculator, History, Timer, ChevronDown, ChevronUp, BookOpen, FileSpreadsheet, ArrowRightLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const FAQS = [
  {
    question: "How to calculate time duration in excel?",
    answer: "To calculate time duration in Excel, subtract the start time from the end time (e.g., =B2-A2). Ensure the cells are formatted as 'Time' or '[h]:mm' for durations exceeding 24 hours. This is the most common way to calculate duration between two times in excel."
  },
  {
    question: "How to calculate duration of time in excel?",
    answer: "You can use the TEXT function for specific formats: =TEXT(B2-A2, \"h:mm\"). For calculating duration of time in excel across different days, include the date in your cells."
  },
  {
    question: "How to calculate time duration?",
    answer: "To calculate time duration, subtract the start time from the end time. If the end time is on the next day, add 24 hours to the end time before subtracting. Our duration calculator time tool handles this automatically for you."
  },
  {
    question: "How do i calculate time duration in excel for work hours?",
    answer: "For work hours, subtract start time from end time and subtract any break time. Example: =(End_Time - Start_Time) - Break_Time. This is a standard military time duration calculator approach used in many workplaces."
  },
  {
    question: "How do you calculate time duration manually?",
    answer: "Convert both times to a 24-hour format, subtract the minutes first (borrowing 60 from hours if needed), then subtract the hours. This manual method is what our time duration calculator hours tool automates."
  },
  {
    question: "How to calculate average of time duration in excel?",
    answer: "Use the AVERAGE function on a range of duration cells: =AVERAGE(C2:C10). Ensure the result cell is formatted as 'Time'."
  },
  {
    question: "How to calculate duration between two times?",
    answer: "Simply use our online calculator duration between two times. Enter your start and end times, and it will instantly give you the hours and minutes."
  }
];

export const TimeDurationCalculator = () => {
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('17:00');
  const [result, setResult] = useState<{ hours: number; minutes: number; totalMinutes: number; decimalHours: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">Mastering Time: The Ultimate Guide to Calculating Duration of Time</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          In our fast-paced world, time is our most valuable resource. Whether you're a freelancer tracking billable hours, a student managing study sessions, or an athlete timing workouts, a reliable <strong>time calculator duration</strong> tool is essential. Understanding how to accurately measure the time between two points is a fundamental skill for productivity and success. Our <strong>military time duration calculator</strong> ensures you never miss a second of your hard work.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <History className="w-5 h-5 text-amber-500" />
              Why Use a Time and Duration Calculator?
            </h3>
            <p className="text-zinc-600 text-sm">
              Manual time calculation is prone to errors, especially when dealing with overnight shifts or complex schedules. Using a <strong>calculator time duration</strong> tool ensures precision and saves you from the frustration of mental math. It's much faster than a <strong>time duration calculator easy surf</strong> search every time you need a quick answer.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Timer className="w-5 h-5 text-amber-500" />
              Efficiency in Every Second
            </h3>
            <p className="text-zinc-600 text-sm">
              A <strong>time and duration calculator</strong> helps you identify where your time goes. By <strong>calculating duration of time</strong> for specific tasks, you can optimize your schedule and focus on what truly matters. This is especially useful when you need to <strong>calculate time duration in excel</strong> for large datasets.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">How to Calculate Time Duration in Excel</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Many professionals need to <strong>excel calculate duration between two times</strong> for payroll or project management. The simplest formula is <code>=End_Time - Start_Time</code>. However, if you want to <strong>calculate duration between two times in excel</strong> that span across midnight, you might need a more complex formula like <code>=IF(B2&lt;A2, B2+1-A2, B2-A2)</code>. Our <strong>duration calculator time</strong> tool simplifies this entire process with a single click.
        </p>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Practical Uses for a Time Duration Calculator</h3>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Freelancers & Contractors:</strong> Accurately track work hours for invoicing clients. Use our <strong>time duration calculator hours</strong> feature to get decimal values for easy billing.</li>
          <li><strong>Students & Educators:</strong> Manage study blocks and classroom activities with ease.</li>
          <li><strong>Fitness Enthusiasts:</strong> Track the duration of your workouts, runs, or meditation sessions using our <strong>calculator duration between two times</strong>.</li>
          <li><strong>Travelers:</strong> Calculate travel times between different time zones or flight durations using a <strong>time duration calculator between dates</strong>.</li>
        </ul>

        <div className="mt-8 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Common Search Terms</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'military time duration calculator', 'time duration calculator easy surf', 'calculate time duration in excel',
              'excel calculate duration between two times', 'how to calculate duration of time in excel', 'how to calculate time duration in excel',
              'time duration calculator hours', 'time duration calculator between dates', 'calculator duration between two times',
              'duration calculator time'
            ].map(keyword => (
              <span key={keyword} className="text-xs text-zinc-400 bg-white px-2 py-1 rounded-md border border-zinc-200">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-zinc-900 mb-8 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-amber-500" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index}
              className="border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors"
              >
                <span className="font-bold text-zinc-900">{faq.question}</span>
                {openFaq === index ? <ChevronDown className="w-5 h-5 text-zinc-400" /> : <ChevronUp className="w-5 h-5 text-zinc-400" />}
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-zinc-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-zinc-900 mb-8 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-amber-500" />
          Time Management Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white border border-zinc-200 rounded-3xl shadow-sm hover:border-amber-500 transition-colors">
            <h3 className="text-xl font-bold text-zinc-900 mb-3">How to Calculate Duration of Time in Excel Like a Pro</h3>
            <p className="text-zinc-600 text-sm mb-4">
              Learn the advanced formulas to <strong>calculate duration of time in excel</strong>, including handling negative results and formatting for hours over 24.
            </p>
            <a href="#" className="text-amber-600 font-bold text-sm hover:underline">Read Article →</a>
          </div>
          <div className="p-6 bg-white border border-zinc-200 rounded-3xl shadow-sm hover:border-amber-500 transition-colors">
            <h3 className="text-xl font-bold text-zinc-900 mb-3">Military Time vs. Standard Time: Which is Better?</h3>
            <p className="text-zinc-600 text-sm mb-4">
              Discover why many professionals prefer a <strong>military time duration calculator</strong> for accuracy and how it eliminates AM/PM confusion.
            </p>
            <a href="#" className="text-amber-600 font-bold text-sm hover:underline">Read Article →</a>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      <div className="border-t border-zinc-200 pt-12">
        <h3 className="text-lg font-bold text-zinc-900 mb-6">Related Time Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/age-calculator" className="p-4 bg-white border border-zinc-200 rounded-xl hover:border-amber-500 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <span className="font-medium text-zinc-900">Age Calculator</span>
          </Link>
          <Link to="/date-difference" className="p-4 bg-white border border-zinc-200 rounded-xl hover:border-amber-500 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-50 rounded-lg flex items-center justify-center">
              <ArrowRightLeft className="w-5 h-5 text-zinc-600" />
            </div>
            <span className="font-medium text-zinc-900">Date Difference</span>
          </Link>
          <Link to="/study-time" className="p-4 bg-white border border-zinc-200 rounded-xl hover:border-amber-500 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="font-medium text-zinc-900">Study Planner</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
