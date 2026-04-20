import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, BookOpen, Plus, Trash2, Calculator, Info, Target, Brain, Coffee, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StudySession {
  id: string;
  subject: string;
  duration: number; // in minutes
}

export const StudyTimeCalculator = () => {
  const [totalHours, setTotalHours] = useState<string>('4');
  const [sessions, setSessions] = useState<StudySession[]>([
    { id: '1', subject: 'Mathematics', duration: 60 },
    { id: '2', subject: 'Physics', duration: 60 },
  ]);

  const addSession = () => {
    setSessions([...sessions, { id: Math.random().toString(36).substr(2, 9), subject: '', duration: 30 }]);
  };

  const removeSession = (id: string) => {
    if (sessions.length > 1) {
      setSessions(sessions.filter(s => s.id !== id));
    }
  };

  const updateSession = (id: string, field: keyof StudySession, value: any) => {
    setSessions(sessions.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const totalMinutesAllocated = sessions.reduce((acc, s) => acc + (parseInt(s.duration.toString()) || 0), 0);
  const totalMinutesAvailable = (parseFloat(totalHours) || 0) * 60;
  const remainingMinutes = totalMinutesAvailable - totalMinutesAllocated;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-2xl mb-4"
        >
          <Clock className="w-8 h-8 text-amber-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Study Time Calculator</h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
          Plan your study sessions effectively. Allocate time for each subject and manage your daily study goals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-200">
            <div className="mb-8">
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Total Study Hours Available Today</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={totalHours}
                  onChange={(e) => setTotalHours(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-amber-500 outline-none transition-all text-xl font-bold"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-400 font-medium">Hours</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-zinc-900">Subject Allocation</h2>
              <button
                onClick={addSession}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> Add Subject
              </button>
            </div>

            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="flex gap-4 items-end p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <div className="flex-grow">
                    <label className="block text-xs font-medium text-zinc-500 uppercase mb-2">Subject</label>
                    <input
                      type="text"
                      value={session.subject}
                      onChange={(e) => updateSession(session.id, 'subject', e.target.value)}
                      placeholder="e.g. Biology"
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div className="w-32">
                    <label className="block text-xs font-medium text-zinc-500 uppercase mb-2">Minutes</label>
                    <input
                      type="number"
                      value={session.duration}
                      onChange={(e) => updateSession(session.id, 'duration', e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <button
                    onClick={() => removeSession(session.id)}
                    className="p-2 text-zinc-400 hover:text-rose-500 transition-colors mb-1"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`rounded-3xl p-8 text-white shadow-xl transition-colors ${remainingMinutes < 0 ? 'bg-rose-600 shadow-rose-100' : 'bg-amber-600 shadow-amber-100'}`}>
            <h3 className="text-lg font-medium opacity-90 mb-2">Time Remaining</h3>
            <div className="text-5xl font-bold mb-2">
              {Math.floor(Math.abs(remainingMinutes) / 60)}h {Math.abs(remainingMinutes) % 60}m
            </div>
            <p className="text-white/80 text-sm">
              {remainingMinutes < 0 ? 'You have over-allocated your time!' : 'Available for more subjects or breaks.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
            <h3 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <Brain className="w-4 h-4 text-amber-500" /> Study Efficiency Tips
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Coffee className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <p className="text-sm text-zinc-600">Use the <strong>Pomodoro Technique</strong>: 25 mins study, 5 mins break.</p>
              </div>
              <div className="flex gap-3">
                <Target className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <p className="text-sm text-zinc-600">Start with your <strong>hardest subject</strong> when your energy is highest.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Blog Content */}
      <div className="mt-20 space-y-16">
        <section>
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">Mastering Your Study Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-amber-600">The Science of Effective Planning</h3>
              <p className="text-zinc-600 leading-relaxed mb-4">
                Research shows that students who plan their study sessions in advance perform 20% better on average. This tool helps you visualize your day and avoid the "cramming" trap by distributing your workload evenly.
              </p>
              <ul className="space-y-2 text-sm text-zinc-500 italic">
                <li>• "A goal without a plan is just a wish."</li>
                <li>• "Time management is life management."</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-amber-600">How to use this calculator</h3>
              <p className="text-zinc-600 leading-relaxed">
                1. Input your total available hours for the day.<br/>
                2. List all the subjects you need to cover.<br/>
                3. Assign minutes to each subject based on its difficulty.<br/>
                4. Ensure you leave at least 15-20% of your time for breaks and review.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-zinc-900">Expert Study Strategies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "The 80/20 Rule in Studying",
                desc: "How to identify the 20% of material that will give you 80% of your exam results.",
                tag: "Strategy"
              },
              {
                title: "Active Recall vs Passive Reading",
                desc: "Why reading your notes over and over is the least effective way to study.",
                tag: "Technique"
              },
              {
                title: "How to Study for 10 Hours a Day",
                desc: "A guide to maintaining focus and avoiding burnout during intense exam seasons.",
                tag: "Endurance"
              }
            ].map((post, i) => (
              <div key={i} className="group p-6 bg-zinc-50 border border-zinc-100 rounded-3xl hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3 block">{post.tag}</span>
                <h4 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-amber-600 transition-colors">{post.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{post.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
