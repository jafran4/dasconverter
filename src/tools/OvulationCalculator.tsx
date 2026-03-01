import React, { useState } from 'react';
import { CalendarDays, ArrowLeft, Info, HelpCircle, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const OvulationCalculator = () => {
  const [lastPeriod, setLastPeriod] = useState<string>('');
  const [cycleLength, setCycleLength] = useState<string>('28');
  const [result, setResult] = useState<{ ovulation: string; fertileStart: string; fertileEnd: string; nextPeriod: string } | null>(null);

  const calculateOvulation = () => {
    if (!lastPeriod) return;

    const lastDate = new Date(lastPeriod);
    const cycle = parseInt(cycleLength);
    
    // Ovulation is typically 14 days before the next period
    const nextPeriodDate = new Date(lastDate);
    nextPeriodDate.setDate(lastDate.getDate() + cycle);

    const ovulationDate = new Date(nextPeriodDate);
    ovulationDate.setDate(nextPeriodDate.getDate() - 14);

    const fertileStartDate = new Date(ovulationDate);
    fertileStartDate.setDate(ovulationDate.getDate() - 5);

    const fertileEndDate = new Date(ovulationDate);
    fertileEndDate.setDate(ovulationDate.getDate() + 1);

    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };

    setResult({
      ovulation: ovulationDate.toLocaleDateString(undefined, options),
      fertileStart: fertileStartDate.toLocaleDateString(undefined, options),
      fertileEnd: fertileEndDate.toLocaleDateString(undefined, options),
      nextPeriod: nextPeriodDate.toLocaleDateString(undefined, options)
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
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
            <CalendarDays className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Ovulation Calculator</h1>
            <p className="text-zinc-500">Predict fertile days & ovulation for Women</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">First Day of Last Period</label>
              <input 
                type="date" 
                value={lastPeriod}
                onChange={(e) => setLastPeriod(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Average Cycle Length (Days)</label>
              <input 
                type="number" 
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                min="20"
                max="45"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
              <p className="text-xs text-zinc-400">Usually between 21 and 35 days.</p>
            </div>

            <button 
              onClick={calculateOvulation}
              className="w-full py-4 bg-purple-500 text-white font-bold rounded-2xl hover:bg-purple-600 transition-all active:scale-[0.98] shadow-lg shadow-purple-500/20"
            >
              Predict Fertile Days
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
                <div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Next Ovulation</p>
                  <h2 className="text-4xl font-black text-purple-500">{result.ovulation}</h2>
                </div>
                
                <div className="p-6 bg-white border border-zinc-200 rounded-3xl shadow-sm">
                  <div className="flex items-center justify-center gap-2 text-emerald-500 font-bold mb-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Fertile Window</span>
                  </div>
                  <p className="text-lg font-bold text-zinc-900">{result.fertileStart} - {result.fertileEnd}</p>
                  <p className="text-xs text-zinc-400 mt-2">The best time to conceive.</p>
                </div>

                <div className="text-sm text-zinc-500">
                  Next period expected around <span className="font-bold text-zinc-900">{result.nextPeriod}</span>
                </div>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Select your last period date to see predictions</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">Understanding Your Cycle and Ovulation: A Guide for Women</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Knowing when you ovulate is key to understanding your reproductive health, whether you're trying to conceive or simply tracking your cycle. Ovulation is the process where an egg is released from the ovary.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              The Fertile Window
            </h3>
            <p className="text-zinc-600 text-sm">
              The fertile window is the time in your cycle when pregnancy is possible. It includes the day of ovulation and the five days leading up to it, as sperm can live inside the female body for up to five days.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-purple-500" />
              Cycle Variability
            </h3>
            <p className="text-zinc-600 text-sm">
              While 28 days is the average, cycles can range from 21 to 35 days. Stress, illness, and travel can all affect the timing of your ovulation.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Signs of Ovulation</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          In addition to tracking your dates, you can look for physical signs of ovulation:
        </p>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Cervical Mucus:</strong> Becomes clear, thin, and stretchy (like raw egg whites).</li>
          <li><strong>Basal Body Temperature:</strong> A slight increase in temperature after ovulation.</li>
          <li><strong>Ovulation Pain:</strong> Some women feel a slight twinge or cramp in their lower abdomen.</li>
          <li><strong>Increased Libido:</strong> Many women feel an increased sex drive around ovulation.</li>
        </ul>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">How the Calculator Works</h3>
        <p className="text-zinc-600 leading-relaxed">
          Our ovulation calculator uses the "Calendar Method." It estimates your next ovulation date by subtracting 14 days (the average length of the luteal phase) from the date of your next expected period. For more precision, consider using ovulation predictor kits (OPKs) or tracking your basal body temperature.
        </p>
      </article>
    </div>
  );
};
