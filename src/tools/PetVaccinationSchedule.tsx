import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Calculator, Info, BookOpen, Dog, Cat, Calendar, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PetVaccinationSchedule = () => {
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [ageWeeks, setAgeWeeks] = useState<string>('8');

  const getNextVaccinations = () => {
    const w = parseFloat(ageWeeks);
    if (isNaN(w) || w < 0) return [];

    if (petType === 'dog') {
      if (w < 8) return [{ name: 'DHPP (Distemper, Hepatitis, Parvo, Parainfluenza)', due: '8 weeks' }];
      if (w < 12) return [{ name: 'DHPP Booster, Bordetella', due: '12 weeks' }];
      if (w < 16) return [{ name: 'DHPP Booster, Rabies, Leptospirosis', due: '16 weeks' }];
      return [{ name: 'Annual DHPP Booster, Rabies (every 1-3 years)', due: 'Annually' }];
    } else {
      if (w < 8) return [{ name: 'FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia)', due: '8 weeks' }];
      if (w < 12) return [{ name: 'FVRCP Booster, FeLV (Feline Leukemia)', due: '12 weeks' }];
      if (w < 16) return [{ name: 'FVRCP Booster, Rabies', due: '16 weeks' }];
      return [{ name: 'Annual FVRCP Booster, Rabies (every 1-3 years)', due: 'Annually' }];
    }
  };

  const schedule = getNextVaccinations();

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
          <ShieldCheck className="w-8 h-8 text-rose-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Pet Vaccination Reminder</h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
          Keep your pet protected. Check the recommended vaccination schedule based on your pet's current age.
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
                      ? 'bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-100' 
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-rose-200'
                    }`}
                  >
                    <Dog className="w-4 h-4" /> Dog
                  </button>
                  <button
                    onClick={() => setPetType('cat')}
                    className={`py-3 rounded-xl border flex items-center justify-center gap-2 transition-all font-medium ${
                      petType === 'cat' 
                      ? 'bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-100' 
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-rose-200'
                    }`}
                  >
                    <Cat className="w-4 h-4" /> Cat
                  </button>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Pet's Current Age (Weeks)</label>
                <input
                  type="number"
                  value={ageWeeks}
                  onChange={(e) => setAgeWeeks(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 outline-none transition-all text-xl font-bold"
                />
                <p className="mt-2 text-xs text-zinc-400 italic">Note: 1 month ≈ 4.3 weeks</p>
              </div>
            </div>
          </div>

          <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100 flex gap-4">
            <AlertCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-rose-900 font-bold mb-1">Consult Your Vet</h3>
              <p className="text-rose-800/80 text-sm leading-relaxed">
                This schedule is a general guideline. Your veterinarian may recommend additional vaccines (like Lyme or Lepto) based on your local environment and your pet's lifestyle.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-200">
            <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-rose-500" /> Upcoming Vaccines
            </h3>
            <div className="space-y-6">
              {schedule.map((vax, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-rose-100">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-rose-500 border-2 border-white" />
                  <div className="font-bold text-zinc-900 mb-1">{vax.name}</div>
                  <div className="text-sm text-zinc-500">Due at {vax.due}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 text-white">
            <h4 className="font-bold mb-2">Core vs. Non-Core</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              <strong>Core vaccines</strong> are recommended for all pets regardless of lifestyle. <strong>Non-core vaccines</strong> are optional and based on specific risk factors.
            </p>
          </div>
        </div>
      </div>

      {/* SEO & Blog Content */}
      <div className="mt-20 space-y-16">
        <section>
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">The Importance of Vaccinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-rose-600">Building Immunity</h3>
              <p className="text-zinc-600 leading-relaxed">
                Puppies and kittens receive temporary immunity from their mother's milk. As this wears off, vaccinations are needed to stimulate their own immune systems to recognize and fight off dangerous pathogens.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-rose-600">Protecting the Community</h3>
              <p className="text-zinc-600 leading-relaxed">
                Vaccinating your pet doesn't just protect them—it helps prevent the spread of diseases like Rabies and Parvo within your local community, protecting other pets and even humans.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-zinc-900">Pet Health Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Common Vaccine Side Effects",
                desc: "What to expect after your pet's appointment and when you should call the vet.",
                tag: "Health"
              },
              {
                title: "Understanding Titer Testing",
                desc: "An alternative to annual boosters: Measuring existing antibody levels in your pet.",
                tag: "Science"
              },
              {
                title: "Rabies Laws by State",
                desc: "A guide to the legal requirements for rabies vaccinations in different regions.",
                tag: "Legal"
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
