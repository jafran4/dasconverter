import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cat, Calculator, Info, BookOpen, Utensils, Scale, Home, Sun, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CatFoodCalculator = () => {
  const [weight, setWeight] = useState<string>('4');
  const [age, setAge] = useState<string>('adult'); // kitten, adult, senior
  const [lifestyle, setLifestyle] = useState<string>('indoor'); // indoor, outdoor
  const [foodType, setFoodType] = useState<string>('dry'); // dry, wet

  const calculateFood = () => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return { grams: 0, calories: 0 };

    // Base RER (Resting Energy Requirement) = 70 * (weight_kg ^ 0.75)
    const rer = 70 * Math.pow(w, 0.75);
    
    let multiplier = 1.2; // Default adult neutered
    if (age === 'kitten') multiplier = 2.5;
    if (age === 'senior') multiplier = 1.1;
    
    if (lifestyle === 'outdoor') multiplier *= 1.2;
    if (lifestyle === 'indoor') multiplier *= 0.9;

    const dailyCalories = rer * multiplier;
    
    // Average calories: Dry food ~380 kcal/100g, Wet food ~85 kcal/100g
    const grams = foodType === 'dry' ? (dailyCalories / 3.8) : (dailyCalories / 0.85);

    return {
      grams: Math.round(grams),
      calories: Math.round(dailyCalories)
    };
  };

  const result = calculateFood();

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
          className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-2xl mb-4"
        >
          <Cat className="w-8 h-8 text-purple-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Cat Food Calculator</h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
          Calculate the ideal daily calorie intake and food portions for your cat based on their unique lifestyle.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 mb-2 flex items-center gap-2">
                  <Scale className="w-4 h-4" /> Cat's Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-xl font-bold"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Life Stage</label>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                >
                  <option value="kitten">Kitten (Growth)</option>
                  <option value="adult">Adult (Maintenance)</option>
                  <option value="senior">Senior (7+ Years)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4" /> Lifestyle
                </label>
                <select
                  value={lifestyle}
                  onChange={(e) => setLifestyle(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                >
                  <option value="indoor">Indoor (Less Active)</option>
                  <option value="outdoor">Outdoor (Active)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Food Type</label>
                <div className="grid grid-cols-2 gap-4">
                  {['dry', 'wet'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFoodType(type)}
                      className={`py-3 rounded-xl border transition-all font-medium capitalize ${
                        foodType === type 
                        ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-100' 
                        : 'bg-white border-zinc-200 text-zinc-600 hover:border-purple-200'
                      }`}
                    >
                      {type} Food
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-8 rounded-3xl border border-purple-100">
            <h3 className="text-purple-900 font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" /> Cat Feeding Tip
            </h3>
            <p className="text-purple-800/80 leading-relaxed text-sm">
              Cats are obligate carnivores and often prefer multiple small meals throughout the day. If feeding wet food, ensure it's not left out for more than 4 hours.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-purple-600 rounded-3xl p-8 text-white shadow-xl shadow-purple-100 text-center">
            <h3 className="text-lg font-medium opacity-90 mb-2">Daily Portion</h3>
            <div className="text-5xl font-bold mb-2">{result.grams}g</div>
            <p className="text-purple-100 text-sm mb-4">Total daily amount</p>
            <div className="pt-4 border-t border-white/20">
              <p className="text-sm opacity-90">Daily Calories: {result.calories} kcal</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
            <h3 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <Sun className="w-4 h-4 text-purple-500" /> Hydration Alert
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Cats have a low thirst drive. If you feed primarily dry food, consider a pet fountain to encourage drinking and prevent urinary issues.
            </p>
          </div>
        </div>
      </div>

      {/* SEO & Blog Content */}
      <div className="mt-20 space-y-16">
        <section>
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">Feline Nutrition Essentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-purple-600">Wet vs. Dry Food for Cats</h3>
              <p className="text-zinc-600 leading-relaxed">
                Wet food provides essential hydration and is often higher in protein. Dry food is convenient and can help with dental health. Many veterinarians recommend a "mixed feeding" approach to get the benefits of both.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-purple-600">The Danger of Obesity</h3>
              <p className="text-zinc-600 leading-relaxed">
                Over 50% of domestic cats are overweight. Even an extra 500g can put significant strain on a cat's joints and increase the risk of diabetes. Precise portion control is the best preventative measure.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-zinc-900">Cat Care Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Deciphering Cat Food Labels",
                desc: "Learn how to spot 'fillers' and identify high-quality animal proteins in commercial food.",
                tag: "Nutrition"
              },
              {
                title: "Feeding the Senior Cat",
                desc: "How nutritional needs change as your cat enters their golden years.",
                tag: "Aging"
              },
              {
                title: "Transitioning to a New Diet",
                desc: "A 7-day plan to switch your cat's food without causing digestive upset or 'food strikes'.",
                tag: "Tips"
              }
            ].map((post, i) => (
              <div key={i} className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 hover:bg-white hover:shadow-md transition-all group">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3 block">{post.tag}</span>
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
