import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Calculator, Info, BookOpen, Dog, Cat, Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PetAgeCalculator = () => {
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [age, setAge] = useState<string>('3');
  const [size, setSize] = useState<'small' | 'medium' | 'large' | 'giant'>('medium');

  const calculateHumanAge = () => {
    const a = parseFloat(age);
    if (isNaN(a) || a < 0) return 0;

    if (petType === 'cat') {
      if (a === 0) return 0;
      if (a <= 1) return a * 15; // 1st year is 15 human years
      if (a <= 2) return 15 + 9; // 2nd year is 9 human years
      return 24 + (a - 2) * 4; // Each year after is 4 human years
    } else {
      // Dog calculation varies by size
      if (a === 0) return 0;
      if (a <= 1) return 15;
      if (a <= 2) return 24;
      
      let multiplier = 4;
      if (size === 'small') multiplier = 4;
      if (size === 'medium') multiplier = 5;
      if (size === 'large') multiplier = 6;
      if (size === 'giant') multiplier = 7;

      return 24 + (a - 2) * multiplier;
    }
  };

  const humanAge = calculateHumanAge();

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
          <Calendar className="w-8 h-8 text-blue-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Pet Age Calculator</h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
          Ever wondered how old your pet is in human years? Use this calculator to find out their human-equivalent age.
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
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' 
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-blue-200'
                    }`}
                  >
                    <Dog className="w-4 h-4" /> Dog
                  </button>
                  <button
                    onClick={() => setPetType('cat')}
                    className={`py-3 rounded-xl border flex items-center justify-center gap-2 transition-all font-medium ${
                      petType === 'cat' 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' 
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-blue-200'
                    }`}
                  >
                    <Cat className="w-4 h-4" /> Cat
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Pet's Age (Years)</label>
                <input
                  type="number"
                  step="0.1"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-xl font-bold"
                />
              </div>

              {petType === 'dog' && (
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Dog Size</label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value as any)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  >
                    <option value="small">Small (under 9kg)</option>
                    <option value="medium">Medium (9-22kg)</option>
                    <option value="large">Large (23-40kg)</option>
                    <option value="giant">Giant (over 40kg)</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
            <h3 className="text-blue-900 font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" /> The "7-Year Rule" is a Myth
            </h3>
            <p className="text-blue-800/80 leading-relaxed text-sm">
              The common belief that 1 dog year equals 7 human years is an oversimplification. Pets age much faster in their first two years. A 1-year-old dog is more like a 15-year-old teenager than a 7-year-old child.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-100 text-center">
            <h3 className="text-lg font-medium opacity-90 mb-2">Human Equivalent Age</h3>
            <div className="text-6xl font-bold mb-2">{Math.round(humanAge)}</div>
            <p className="text-blue-100 text-sm">Years Old</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
            <h3 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-500" /> Life Stage
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm py-2 border-b border-zinc-50">
                <span className="text-zinc-500">Kitten/Puppy</span>
                <span className="font-bold text-zinc-900">0 - 1 Year</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-zinc-50">
                <span className="text-zinc-500">Junior</span>
                <span className="font-bold text-zinc-900">1 - 2 Years</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-zinc-50">
                <span className="text-zinc-500">Adult</span>
                <span className="font-bold text-zinc-900">2 - 6 Years</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-zinc-500">Senior</span>
                <span className="font-bold text-zinc-900">7+ Years</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Blog Content */}
      <div className="mt-20 space-y-16">
        <section>
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">Understanding Pet Aging</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Why Size Matters for Dogs</h3>
              <p className="text-zinc-600 leading-relaxed">
                Interestingly, smaller dog breeds tend to live longer and age more slowly than larger breeds. A Great Dane is considered "senior" at 6 years old, while a Chihuahua might not reach that stage until 10 or 11.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Cat Aging Patterns</h3>
              <p className="text-zinc-600 leading-relaxed">
                Cats age very rapidly in their first two years of life, reaching the human equivalent of 24 by their second birthday. After that, their aging process slows down significantly to about 4 human years for every calendar year.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-zinc-900">Pet Health Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Caring for Your Senior Pet",
                desc: "How to adjust diet, exercise, and home environment for an aging companion.",
                tag: "Aging"
              },
              {
                title: "Signs of Aging in Dogs",
                desc: "Learn to distinguish between normal aging and potential health issues in your dog.",
                tag: "Health"
              },
              {
                title: "Extending Your Pet's Life",
                desc: "The impact of dental care, weight management, and regular vet checkups on longevity.",
                tag: "Tips"
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
