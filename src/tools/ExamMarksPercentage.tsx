import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Percent, Calculator, Info, BookOpen, GraduationCap, Target, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ExamMarksPercentage = () => {
  const [obtainedMarks, setObtainedMarks] = useState<string>('85');
  const [totalMarks, setTotalMarks] = useState<string>('100');

  const calculatePercentage = () => {
    const o = parseFloat(obtainedMarks);
    const t = parseFloat(totalMarks);

    if (isNaN(o) || isNaN(t) || t === 0) return 0;

    return ((o / t) * 100).toFixed(2);
  };

  const percentage = calculatePercentage();

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
          className="inline-flex items-center justify-center p-3 bg-rose-100 rounded-2xl mb-4"
        >
          <Target className="w-8 h-8 text-rose-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Exam Marks Percentage Calculator</h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
          Quickly calculate your exam score percentage and see how you performed relative to the total marks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Obtained Marks</label>
                <input
                  type="number"
                  value={obtainedMarks}
                  onChange={(e) => setObtainedMarks(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 outline-none transition-all text-xl font-bold"
                  placeholder="e.g. 85"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Total Marks</label>
                <input
                  type="number"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 outline-none transition-all text-xl font-bold"
                  placeholder="e.g. 100"
                />
              </div>
            </div>
          </div>

          <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100">
            <h3 className="text-rose-900 font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" /> Quick Formula
            </h3>
            <p className="text-rose-800/80 leading-relaxed text-sm">
              Percentage = (Obtained Marks ÷ Total Marks) × 100. This simple calculation helps you understand your performance across different subjects with varying total marks.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-rose-600 rounded-3xl p-8 text-white shadow-xl shadow-rose-100 text-center">
            <h3 className="text-lg font-medium opacity-90 mb-2">Your Score</h3>
            <div className="text-6xl font-bold mb-2">{percentage}%</div>
            <p className="text-rose-100 text-sm">
              {parseFloat(percentage.toString()) >= 80 ? 'Excellent Performance!' : 
               parseFloat(percentage.toString()) >= 60 ? 'Good Job!' : 
               parseFloat(percentage.toString()) >= 40 ? 'Keep Working Hard!' : 'Needs Improvement'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
            <h3 className="font-semibold text-zinc-900 mb-4">Grading Reference</h3>
            <div className="space-y-3">
              {[
                { range: '80-100%', grade: 'A+', color: 'text-emerald-600' },
                { range: '70-79%', grade: 'A', color: 'text-emerald-500' },
                { range: '60-69%', grade: 'A-', color: 'text-blue-500' },
                { range: '50-59%', grade: 'B', color: 'text-amber-500' },
                { range: 'Below 40%', grade: 'F', color: 'text-rose-500' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-sm py-2 border-b border-zinc-50 last:border-0">
                  <span className="text-zinc-500">{item.range}</span>
                  <span className={`font-bold ${item.color}`}>{item.grade}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Blog Content */}
      <div className="mt-20 space-y-16">
        <section>
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">How to Calculate Exam Percentages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-rose-600">Step-by-Step Calculation</h3>
              <ul className="space-y-4 text-zinc-600">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  <p>Divide your <strong>obtained marks</strong> by the <strong>total marks</strong> of the exam.</p>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  <p>Multiply the resulting decimal by <strong>100</strong> to get the percentage.</p>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  <p>Round to two decimal places for better precision.</p>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-rose-600">Why Percentages Matter</h3>
              <p className="text-zinc-600 leading-relaxed">
                Percentages provide a universal standard for comparing performance. Whether an exam is out of 50, 100, or 500, the percentage tells you exactly how much of the material you've mastered.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-zinc-900">Student Success Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "How to Improve Your Exam Scores",
                desc: "10 actionable tips to boost your marks in the next semester.",
                tag: "Improvement"
              },
              {
                title: "Dealing with Exam Anxiety",
                desc: "Techniques to stay calm and perform your best under pressure.",
                tag: "Wellness"
              },
              {
                title: "The Importance of Mock Tests",
                desc: "Why practicing with time limits is the key to high percentages.",
                tag: "Preparation"
              }
            ].map((post, i) => (
              <div key={i} className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 hover:bg-white hover:shadow-md transition-all group">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 block">{post.tag}</span>
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
