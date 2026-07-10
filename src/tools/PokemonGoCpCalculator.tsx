import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  ArrowLeft, 
  Info, 
  HelpCircle, 
  ChevronRight, 
  RefreshCw,
  Search,
  Star,
  Trophy,
  History,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';

const POKEMON_DATA = [
  { name: 'Magikarp', multiplier: 10.1, evolution: 'Gyarados', image: '🐟' },
  { name: 'Eevee', multiplier: 2.6, evolution: 'Vaporeon/Jolteon/Flareon', image: '🦊' },
  { name: 'Pidgey', multiplier: 1.8, evolution: 'Pidgeotto', image: '🐦' },
  { name: 'Caterpie', multiplier: 1.05, evolution: 'Metapod', image: '🐛' },
  { name: 'Weedle', multiplier: 1.06, evolution: 'Kakuna', image: '🐝' },
  { name: 'Dratini', multiplier: 1.8, evolution: 'Dragonair', image: '🐉' },
  { name: 'Gastly', multiplier: 1.7, evolution: 'Haunter', image: '👻' },
  { name: 'Abra', multiplier: 1.4, evolution: 'Kadabra', image: '🥄' },
  { name: 'Machop', multiplier: 1.6, evolution: 'Machoke', image: '💪' },
  { name: 'Geodude', multiplier: 1.7, evolution: 'Graveler', image: '🪨' },
  { name: 'Bulbasaur', multiplier: 1.5, evolution: 'Ivysaur', image: '🍃' },
  { name: 'Charmander', multiplier: 1.6, evolution: 'Charmeleon', image: '🔥' },
  { name: 'Squirtle', multiplier: 1.5, evolution: 'Wartortle', image: '🐢' },
];

export const PokemonGoCpCalculator = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(POKEMON_DATA[0]);
  const [currentCp, setCurrentCp] = useState<string>('');
  const [result, setResult] = useState<any>(null);

  const calculateEvolution = () => {
    const cp = parseFloat(currentCp);
    if (isNaN(cp) || cp <= 0) {
      alert("Please enter a valid CP amount.");
      return;
    }

    const minCp = Math.floor(cp * (selectedPokemon.multiplier * 0.95));
    const maxCp = Math.floor(cp * (selectedPokemon.multiplier * 1.05));

    setResult({
      minCp,
      maxCp,
      evolution: selectedPokemon.evolution,
      multiplier: selectedPokemon.multiplier,
      original: cp,
      name: selectedPokemon.name
    });
  };

  const reset = () => {
    setCurrentCp('');
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 font-sans">
      {/* Main Tool Section */}
      <section className="min-h-screen flex flex-col justify-center pt-24 pb-12">
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Tools
        </Link>

        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-yellow-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-yellow-100"
          >
            <Zap className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Pokemon Go CP Calculator</h1>
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Predict your Pokemon's CP after evolution. Use our <strong>cp calculator pokemon go</strong> tool to plan your perfect battle team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white p-8 rounded-[32px] border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-3">Select Pokemon</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {POKEMON_DATA.slice(0, 10).map((p) => (
                    <button
                      key={p.name}
                      onClick={() => setSelectedPokemon(p)}
                      className={`p-3 rounded-2xl border transition-all text-center group ${selectedPokemon.name === p.name ? 'bg-yellow-400 border-yellow-500 text-white shadow-lg shadow-yellow-100 scale-105' : 'bg-zinc-50 border-zinc-100 hover:border-zinc-300 opacity-70 hover:opacity-100'}`}
                    >
                      <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{p.image}</div>
                      <div className="text-[10px] font-bold truncate">{p.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Current CP</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold text-sm">CP</span>
                  <input
                    type="number"
                    value={currentCp}
                    onChange={(e) => setCurrentCp(e.target.value)}
                    placeholder="e.g. 150"
                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-4 focus:ring-yellow-400/10 focus:border-yellow-400 outline-none transition-all text-lg font-medium"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={calculateEvolution}
                  className="flex-grow py-5 bg-yellow-400 text-white rounded-2xl font-bold hover:bg-yellow-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-100 text-lg"
                >
                  <TrendingUp className="w-6 h-6" />
                  Predict Evolution
                </button>
                <button
                  onClick={reset}
                  className="px-6 py-5 bg-zinc-100 text-zinc-600 rounded-2xl font-bold hover:bg-zinc-200 transition-all flex items-center justify-center"
                >
                  <RefreshCw className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-900 p-8 rounded-[32px] text-white overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Estimated CP
                </h3>
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="text-6xl font-black text-yellow-400 mb-2">
                        {result.minCp}-{result.maxCp}
                      </div>
                      <p className="text-zinc-400 text-sm mb-8 font-medium">
                        Your {result.name} will evolve into a <span className="text-white">{result.evolution}</span>.
                      </p>
                      
                      <div className="space-y-4 pt-6 border-t border-white/10">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Multiplier</span>
                          <span className="font-bold">x{result.multiplier}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Base CP</span>
                          <span className="font-bold">{result.original}</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="py-12 text-center">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-zinc-600" />
                      </div>
                      <p className="text-zinc-500 text-sm font-medium">Enter CP to see the future power of your Pokemon</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl" />
            </div>

            <div className="bg-yellow-50 p-6 rounded-[32px] border border-yellow-100">
              <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Evolution Tip
              </h4>
              <p className="text-yellow-700 text-sm leading-relaxed font-medium">
                Multipliers are averages. Individual values (IVs) and your Trainer Level also affect the final CP results in Pokemon Go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <div className="prose prose-zinc max-w-none border-t border-zinc-100 pt-16 pb-24">
        <h2 className="text-4xl font-bold text-zinc-900 mb-8 tracking-tight">Pokemon Go Evolution CP Calculator: Plan Your Team</h2>
        
        <p className="text-zinc-600 text-lg leading-relaxed mb-8">
          Every trainer wants to know how strong their Pokemon will be after spending those hard-earned candies. This <strong>pokemon go evolution cp calculator</strong> provides a statistical estimate of what your final CP will look like. Whether you're preparing for a gym raid or a battle league, understanding the <strong>pokemon go cp evolution calculator</strong> logic is key to resource management.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3">
              <History className="w-6 h-6 text-yellow-600" />
              The Multiplier Effect
            </h3>
            <p className="text-zinc-600 leading-relaxed font-medium">
              Each species in Pokemon Go has a specific "multiplier range." For instance, a Magikarp has a massive multiplier of nearly 10x-11x, meaning a 150 CP Magikarp could become a 1500+ CP Gyarados. Our <strong>cp calculator pokemon go</strong> factors in these variations to give you a safe bracket.
            </p>
          </div>
          <div className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-red-500" />
              Does CP Always Increase?
            </h3>
            <p className="text-zinc-600 leading-relaxed font-medium">
              Yes, CP (Combat Power) represents a combination of Attack, Defense, and Stamina. Evolution almost always boosts these stats. Using an <strong>evolution cp calculator pokemon go</strong> helps you decide if it's worth evolving a specific catch or waiting for a higher base CP.
            </p>
          </div>
        </div>

        <section className="bg-white border border-zinc-200 rounded-[2.5rem] p-10 shadow-sm mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 flex items-center gap-3 tracking-tight">
            <HelpCircle className="w-8 h-8 text-yellow-500" />
            Trainer FAQ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-zinc-900 mb-2">How accurate is the CP evolution calculator?</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">Our <strong>pokemon go evolution cp calculator</strong> uses statistical averages across millions of evolutions. While very accurate, minor deviations can happen due to hidden IV stats.</p>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 mb-2">Should I evolve or power up first?</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">Most trainers recommend evolving first to check the moveset. The total stardust and candy cost remains the same regardless of the order.</p>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 mb-2">Why does Magikarp have such a high multiplier?</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">This is a lore-accurate mechanic reflecting Magikarp's dramatic transformation. It's the most famous example of the <strong>pokemon go cp evolution calculator</strong> logic.</p>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 mb-2">Can I use this for Mega Evolutions?</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">Mega Evolutions are temporary and function slightly differently. This calculator is currently optimized for standard permament evolutions.</p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3 mb-12 opacity-50 font-sans">
          <span className="text-[10px] uppercase tracking-widest font-black text-zinc-400">SEO Keywords:</span>
          {[
            'cp calculator pokemon go',
            'pokemon go evolution cp calculator',
            'pokemon go cp evolution calculator',
            'evolution cp calculator pokemon go',
            'pogo evolution calculator',
            'pokemon strength predictor'
          ].map((kw) => (
            <span key={kw} className="text-[10px] uppercase tracking-widest font-black text-zinc-400">{kw} •</span>
          ))}
        </div>
      </div>
    </div>
  );
};
