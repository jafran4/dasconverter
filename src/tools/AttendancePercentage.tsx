import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserCheck, Calculator, Info, BookOpen, GraduationCap, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AttendancePercentage = () => {
  const [attended, setAttended] = useState<string>('45');
  const [total, setTotal] = useState<string>('60');
  const [required, setRequired] = useState<string>('75');

  const calculatePercentage = () => {
    const a = parseFloat(attended);
    const t = parseFloat(total);

    if (isNaN(a) || isNaN(t) || t === 0) return 0;

    return ((a / t) * 100).toFixed(2);
  };

  const percentage = calculatePercentage();
  const isShort = parseFloat(percentage.toString()) < parseFloat(required);

  const classesNeeded = () => {
    const a = parseFloat(attended);
    const t = parseFloat(total);
    const r = parseFloat(required) / 100;

    if (isNaN(a) || isNaN(t) || isNaN(r) || r >= 1) return 0;

    // Formula: (a + x) / (t + x) = r
    // a + x = r*t + r*x
    // x - r*x = r*t - a
    // x(1 - r) = r*t - a
    // x = (r*t - a) / (1 - r)
    
    const x = (r * t - a) / (1 - r);
    return Math.ceil(Math.max(0, x));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-4"
        >
          <UserCheck className="w-8 h-8 text-blue-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Attendance Percentage Calculator</h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
          Track your class attendance and calculate how many more classes you need to attend to meet your requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Classes Attended</label>
                <input
                  type="number"
                  value={attended}
                  onChange={(e) => setAttended(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-xl font-bold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Total Classes Held</label>
                <input
                  type="number"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-xl font-bold"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Required Attendance (%)</label>
                <input
                  type="number"
                  value={required}
                  onChange={(e) => setRequired(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg font-medium"
                />
              </div>
            </div>
          </div>

          {isShort && (
            <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100 flex gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-amber-900 font-bold mb-1">Attendance Shortage!</h3>
                <p className="text-amber-800/80 text-sm">
                  You need to attend <strong>{classesNeeded()}</strong> more consecutive classes to reach your {required}% target.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className={`rounded-3xl p-8 text-white shadow-xl transition-colors text-center ${isShort ? 'bg-rose-600 shadow-rose-100' : 'bg-blue-600 shadow-blue-100'}`}>
            <h3 className="text-lg font-medium opacity-90 mb-2">Current Attendance</h3>
            <div className="text-6xl font-bold mb-2">{percentage}%</div>
            <p className="text-white/80 text-sm">
              {isShort ? 'Below Requirement' : 'Meeting Requirement'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
            <h3 className="font-semibold text-zinc-900 mb-4">Pro Tips</h3>
            <ul className="space-y-3">
              <li className="flex gap-2 text-sm text-zinc-600">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                Always aim for 5% above the requirement.
              </li>
              <li className="flex gap-2 text-sm text-zinc-600">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                Keep track of medical certificates for excused absences.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEO & Blog Content */}
      <div className="mt-20 space-y-16">
        <section>
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">Why Attendance Matters in Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-blue-600">The Correlation with Grades</h3>
              <p className="text-zinc-600 leading-relaxed mb-4">
                Studies consistently show that students with higher attendance rates tend to achieve better grades. Being present in class allows for real-time interaction, immediate clarification of doubts, and participation in group discussions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Understanding "Shortage"</h3>
              <p className="text-zinc-600 leading-relaxed">
                Most educational institutions require a minimum of 75% attendance to be eligible for exams. This rule ensures that students have had sufficient exposure to the curriculum before being assessed.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-zinc-900">Student Life Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "How to Balance Fun and Attendance",
                desc: "Managing your social life without compromising your academic requirements.",
                tag: "Lifestyle"
              },
              {
                title: "What to do if you have low attendance",
                desc: "Steps to take if you find yourself below the required percentage mid-semester.",
                tag: "Advice"
              },
              {
                title: "The Benefits of 100% Attendance",
                desc: "Why some students strive for perfect attendance and the rewards they get.",
                tag: "Motivation"
              }
            ].map((post, i) => (
              <div key={i} className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 hover:bg-white hover:shadow-md transition-all group">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 block">{post.tag}</span>
                <h4 className="text-xl font-bold text-zinc-900 mb-2">{post.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{post.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
