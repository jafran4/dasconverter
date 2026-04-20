import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Calculator, Info, BookOpen, Calendar, Baby, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PetBreedingCalculator = () => {
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');

  const calculateDates = () => {
    const start = new Date(startDate);
    if (isNaN(start.getTime())) return null;

    // Gestation period: Dogs & Cats are both ~63 days (range 58-68)
    const dueDate = new Date(start);
    dueDate.setDate(start.getDate() + 63);

    const scanDate = new Date(start);
    scanDate.setDate(start.getDate() + 28); // Best time for ultrasound

    return {
      due: dueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      scan: scanDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      daysLeft: Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    };
  };

  const dates = calculateDates();

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
          className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-2xl mb-4"
        >
          <Heart className="w-8 h-8 text-pink-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Pet Breeding & Gestation Calculator</h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
          Track your pet's pregnancy. Estimate the due date and key milestones for a healthy litter.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Pet Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPetType('dog')}
                    className={`py-3 rounded-xl border flex items-center justify-center gap-2 transition-all font-medium ${
                      petType === 'dog' 
                      ? 'bg-pink-600 border-pink-600 text-white shadow-lg shadow-pink-100' 
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-pink-200'
                    }`}
                  >
                    Dog
                  </button>
                  <button
                    onClick={() => setPetType('cat')}
                    className={`py-3 rounded-xl border flex items-center justify-center gap-2 transition-all font-medium ${
                      petType === 'cat' 
                      ? 'bg-pink-600 border-pink-600 text-white shadow-lg shadow-pink-100' 
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-pink-200'
                    }`}
                  >
                    Cat
                  </button>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Mating / Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-pink-500 outline-none transition-all text-xl font-bold"
                />
              </div>
            </div>
          </div>

          <div className="bg-pink-50 p-8 rounded-3xl border border-pink-100 flex gap-4">
            <AlertCircle className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-pink-900 font-bold mb-1">Responsible Breeding</h3>
              <p className="text-pink-800/80 text-sm leading-relaxed">
                Breeding should only be undertaken by those committed to the health and welfare of the animals. Ensure both parents have undergone relevant health screenings and genetic testing.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {dates && (
            <div className="bg-pink-600 rounded-3xl p-8 text-white shadow-xl shadow-pink-100">
              <h3 className="text-lg font-medium opacity-90 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5" /> Key Milestones
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="text-xs opacity-70 uppercase tracking-wider mb-1">Estimated Due Date</div>
                  <div className="text-2xl font-bold">{dates.due}</div>
                  <div className="text-sm opacity-80 mt-1">{dates.daysLeft} days remaining</div>
                </div>
                <div className="pt-4 border-t border-white/20">
                  <div className="text-xs opacity-70 uppercase tracking-wider mb-1">Ultrasound Scan Window</div>
                  <div className="text-xl font-bold">{dates.scan}</div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
            <h3 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <Baby className="w-4 h-4 text-pink-500" /> Whelping Prep
            </h3>
            <ul className="space-y-3 text-sm text-zinc-600">
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                Prepare a quiet, warm whelping box.
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                Have your vet's emergency number ready.
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                Monitor the mother's temperature daily.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEO & Blog Content */}
      <div className="mt-20 space-y-16">
        <section>
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">Gestation & Pregnancy Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-pink-600">Signs of Pregnancy</h3>
              <p className="text-zinc-600 leading-relaxed">
                Early signs include decreased appetite, sudden weight gain, and enlarged nipples. By day 28, a veterinarian can confirm pregnancy via ultrasound. X-rays are usually done in the final week to count the number of puppies/kittens.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-pink-600">Nutrition for the Mother</h3>
              <p className="text-zinc-600 leading-relaxed">
                During the final weeks of pregnancy, the mother's energy needs increase significantly. Many breeders switch to high-quality puppy/kitten food to provide the extra calories and calcium needed for milk production.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-zinc-900">Breeding Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "The Stages of Labor",
                desc: "Recognizing the signs of active labor and knowing when to intervene.",
                tag: "Health"
              },
              {
                title: "Caring for Newborn Litters",
                desc: "The first 48 hours: Ensuring all puppies/kittens are nursing and staying warm.",
                tag: "Care"
              },
              {
                title: "Post-Partum Care for the Mother",
                desc: "Monitoring for signs of eclampsia or mastitis after giving birth.",
                tag: "Recovery"
              }
            ].map((post, i) => (
              <div key={i} className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 hover:bg-white hover:shadow-md transition-all group">
                <span className="text-xs font-bold text-pink-600 uppercase tracking-widest mb-3 block">{post.tag}</span>
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
