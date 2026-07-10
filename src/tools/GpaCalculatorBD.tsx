import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Plus, Trash2, Calculator, BookOpen, Info, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Subject {
  id: string;
  name: string;
  grade: string;
  isFourthSubject: boolean;
}

const GRADE_POINTS: Record<string, number> = {
  'A+': 5.0,
  'A': 4.0,
  'A-': 3.5,
  'B': 3.0,
  'C': 2.0,
  'D': 1.0,
  'F': 0.0,
};

export const GpaCalculatorBD = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Bangla', grade: 'A+', isFourthSubject: false },
    { id: '2', name: 'English', grade: 'A+', isFourthSubject: false },
    { id: '3', name: 'Mathematics', grade: 'A+', isFourthSubject: false },
    { id: '4', name: 'Optional Subject', grade: 'A+', isFourthSubject: true },
  ]);

  const addSubject = () => {
    setSubjects([...subjects, { id: Math.random().toString(36).substr(2, 9), name: '', grade: 'A+', isFourthSubject: false }]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  const updateSubject = (id: string, field: keyof Subject, value: any) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let mainSubjectsCount = 0;
    let fourthSubjectBonus = 0;
    let hasFailed = false;

    subjects.forEach(s => {
      const points = GRADE_POINTS[s.grade];
      if (s.grade === 'F') hasFailed = true;

      if (s.isFourthSubject) {
        // In BD system, points above 2.0 in 4th subject are added to total
        fourthSubjectBonus = Math.max(0, points - 2.0);
      } else {
        totalPoints += points;
        mainSubjectsCount++;
      }
    });

    if (hasFailed) return 0;

    const gpa = (totalPoints + fourthSubjectBonus) / mainSubjectsCount;
    return Math.min(5.0, gpa).toFixed(2);
  };

  const gpaResult = calculateGPA();

  return (
    <div className="max-w-4xl mx-auto px-4 font-sans">
      {/* Main Tool Section - Full Screen Height */}
      <section className="min-h-screen flex flex-col justify-center pt-24 pb-12">
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Tools
        </Link>

        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6"
          >
            <GraduationCap className="w-10 h-10 text-indigo-600" />
          </motion.div>
          <h1 className="text-4xl font-bold text-zinc-900 mb-4 tracking-tight">High School GPA Calculator</h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Calculate your high school GPA accurately based on the standard 5.0 grading system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-200">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-zinc-900">Subjects & Grades</h2>
                <button
                  onClick={addSubject}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-bold text-sm shadow-lg shadow-indigo-100"
                >
                  <Plus className="w-4 h-4" /> Add Subject
                </button>
              </div>

              <div className="space-y-4">
                {subjects.map((subject) => (
                  <div key={subject.id} className="flex flex-wrap md:flex-nowrap gap-4 items-end p-5 bg-zinc-50 rounded-2xl border border-zinc-100 transition-all hover:bg-white hover:shadow-sm">
                    <div className="flex-grow">
                      <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Subject Name</label>
                      <input
                        type="text"
                        value={subject.name}
                        onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                        placeholder="e.g. Physics"
                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-medium"
                      />
                    </div>
                    <div className="w-32">
                      <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Grade</label>
                      <select
                        value={subject.grade}
                        onChange={(e) => updateSubject(subject.id, 'grade', e.target.value)}
                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-medium appearance-none"
                      >
                        {Object.keys(GRADE_POINTS).map(grade => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-3 mb-4 bg-white px-3 py-2 rounded-xl border border-zinc-100">
                      <input
                        type="checkbox"
                        id={`fourth-${subject.id}`}
                        checked={subject.isFourthSubject}
                        onChange={(e) => updateSubject(subject.id, 'isFourthSubject', e.target.checked)}
                        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 transition-all"
                      />
                      <label htmlFor={`fourth-${subject.id}`} className="text-[10px] font-black text-zinc-500 uppercase tracking-widest cursor-pointer">4th</label>
                    </div>
                    <button
                      onClick={() => removeSubject(subject.id)}
                      className="p-3 text-zinc-300 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-900 rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-2">Your Calculated GPA</h3>
                <div className="text-7xl font-black text-indigo-400 mb-6">{gpaResult}</div>
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Grading System</span>
                    <span className="font-bold">5.0 Scale</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Total Subjects</span>
                    <span className="font-bold">{subjects.length}</span>
                  </div>
                </div>
              </div>
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -mr-16 -mt-16 rounded-full" />
            </div>

            <div className="bg-indigo-50 rounded-[32px] p-8 border border-indigo-100">
              <h3 className="font-bold text-indigo-900 mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-indigo-500" /> 
                Grading Scale
              </h3>
              <div className="space-y-3">
                {Object.entries(GRADE_POINTS).map(([grade, points]) => (
                  <div key={grade} className="flex justify-between items-center py-2 border-b border-indigo-100/50 last:border-0">
                    <span className="font-black text-indigo-900 text-sm tracking-widest">{grade}</span>
                    <span className="text-indigo-600 font-bold text-sm bg-white px-2 py-1 rounded-lg border border-indigo-100">{points.toFixed(2)} Points</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog & FAQ Section - Below the Tool */}
      <div className="mt-24 space-y-24 pb-24">
        <section>
          <h2 className="text-3xl font-bold text-zinc-900 mb-8">Understanding the High School GPA System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-indigo-600">
                <BookOpen className="w-5 h-5" /> How High School GPA is Calculated
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                The Secondary School Certificate (SSC) and Higher Secondary Certificate (HSC) exams often use a 5.0 grade point average system. Each subject is assigned a grade from A+ to F. The GPA is calculated by averaging the points of all main subjects and adding the "bonus points" from the optional subjects.
              </p>
            </div>
            <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-emerald-600">
                <CheckCircle2 className="w-5 h-5" /> The 4th Subject Rule
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                The 4th subject (Optional Subject) has a unique role. Points earned above 2.0 (Grade C) are considered "bonus points." For example, if you get an A+ (5.0) in your 4th subject, 3.0 points (5.0 - 2.0) are added to your total points before dividing by the number of main subjects.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-zinc-900">Student Success Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Top 5 Tips for High School Students",
                desc: "How to balance your main subjects and maximize your optional subject bonus points.",
                tag: "Academic Tips"
              },
              {
                title: "High School GPA Strategy",
                desc: "A comparison of subject difficulty and how it impacts your final grade results.",
                tag: "Study Guide"
              },
              {
                title: "Why GPA 5.0 Matters",
                desc: "Exploring the importance of a perfect GPA for university admission in Bangladesh.",
                tag: "Career"
              }
            ].map((post, i) => (
              <div key={i} className="group p-6 bg-white border border-zinc-200 rounded-3xl hover:border-indigo-500 transition-all cursor-pointer shadow-sm">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3 block">{post.tag}</span>
                <h4 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-indigo-600 transition-colors">{post.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{post.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-indigo-50 p-10 rounded-[40px]">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-indigo-900 mb-2">What happens if I fail in one subject?</h4>
              <p className="text-indigo-700/80">In many high school systems, if you fail (Grade F) in any main subject, it significantly impacts your total GPA and may require a retake.</p>
            </div>
            <div>
              <h4 className="font-bold text-indigo-900 mb-2">How accurate is this calculator?</h4>
              <p className="text-indigo-700/80">This calculator uses the standard 5.0 scale. However, always verify your final results with your school or education board for official transcripts.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
