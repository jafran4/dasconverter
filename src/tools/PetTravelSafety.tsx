import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plane, Calculator, Info, BookOpen, Car, MapPin, ShieldAlert, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PetTravelSafety = () => {
  const [distance, setDistance] = useState<string>('300');
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [travelMode, setTravelMode] = useState<'car' | 'plane'>('car');

  const calculateTravelNeeds = () => {
    const d = parseFloat(distance);
    if (isNaN(d) || d <= 0) return null;

    // Average speed 80km/h for car
    const hours = d / 80;
    const breaks = Math.floor(hours / 2); // Break every 2 hours

    return {
      hours: hours.toFixed(1),
      breaks,
      waterMl: (petType === 'dog' ? 50 : 30) * (hours / 4) // Rough water estimate
    };
  };

  const needs = calculateTravelNeeds();

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
          <Car className="w-8 h-8 text-blue-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Pet Travel Safety Calculator</h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
          Plan your journey with your pet. Calculate necessary breaks and get essential safety tips for a stress-free trip.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Travel Mode</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setTravelMode('car')}
                    className={`py-3 rounded-xl border flex items-center justify-center gap-2 transition-all font-medium ${
                      travelMode === 'car' 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' 
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-blue-200'
                    }`}
                  >
                    <Car className="w-4 h-4" /> Car
                  </button>
                  <button
                    onClick={() => setTravelMode('plane')}
                    className={`py-3 rounded-xl border flex items-center justify-center gap-2 transition-all font-medium ${
                      travelMode === 'plane' 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' 
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-blue-200'
                    }`}
                  >
                    <Plane className="w-4 h-4" /> Plane
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Distance (km)</label>
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Pet Type</label>
                <select
                  value={petType}
                  onChange={(e) => setPetType(e.target.value as any)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 flex gap-4">
            <ShieldAlert className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-blue-900 font-bold mb-1">Never Leave Pets in Hot Cars</h3>
              <p className="text-blue-800/80 text-sm leading-relaxed">
                Even with windows cracked, the temperature inside a car can rise to dangerous levels in minutes. If you need to stop, ensure someone stays with the pet or take them with you.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {needs && (
            <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-100">
              <h3 className="text-lg font-medium opacity-90 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Trip Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="opacity-80 text-sm">Est. Travel Time</span>
                  <span className="font-bold">{needs.hours} Hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-80 text-sm">Required Breaks</span>
                  <span className="font-bold">{needs.breaks} Stops</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-80 text-sm">Water Needed</span>
                  <span className="font-bold">{Math.round(needs.waterMl)} ml</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
            <h3 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" /> Travel Checklist
            </h3>
            <ul className="space-y-3 text-sm text-zinc-600">
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                Secure crate or pet seatbelt.
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                Copy of vaccination records.
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                Familiar blanket or toy for comfort.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEO & Blog Content */}
      <div className="mt-20 space-y-16">
        <section>
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">Safe Travels with Pets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Car Travel Safety</h3>
              <p className="text-zinc-600 leading-relaxed">
                Pets should never be allowed to roam free in a moving vehicle. In the event of a sudden stop or accident, an unrestrained pet can become a dangerous projectile. Use a crash-tested crate or a high-quality pet seatbelt harness.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Air Travel Considerations</h3>
              <p className="text-zinc-600 leading-relaxed">
                Flying can be extremely stressful for pets. If your pet is small enough, many airlines allow them in the cabin under the seat. For larger pets traveling in cargo, ensure the crate is IATA-approved and well-ventilated.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-zinc-900">Pet Travel Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Dealing with Motion Sickness",
                desc: "Natural remedies and medications to help your pet enjoy the ride.",
                tag: "Health"
              },
              {
                title: "Finding Pet-Friendly Hotels",
                desc: "The best apps and websites for planning your overnight stays with a pet.",
                tag: "Planning"
              },
              {
                title: "International Pet Travel Guide",
                desc: "Understanding passports, microchips, and quarantine rules for overseas trips.",
                tag: "Global"
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
