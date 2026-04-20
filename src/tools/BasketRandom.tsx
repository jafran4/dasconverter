import React, { useState } from 'react';
import { Trophy, Gamepad2, Info, Star, Share2, Maximize2, Play, Users, Zap, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export const BasketRandom: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const toggleFullScreen = () => {
    const iframe = document.getElementById('basket-random-iframe');
    if (iframe) {
      if (!isFullScreen) {
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullScreen(!isFullScreen);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-8 pb-8 px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-600 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-600 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-4"
            >
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group/back-btn"
              >
                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center group-hover/back-btn:bg-white/10 transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Back to Dashboard</span>
              </Link>

              <div>
                <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-3">
                  <Zap className="w-2.5 h-2.5" />
                  Trending Unblocked
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
                  Basket <span className="text-orange-500">Random</span>
                </h1>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-400 text-sm max-w-md font-medium leading-relaxed md:text-right"
            >
              Experience the most chaotic physics-based basketball game. 
              Play <span className="text-white font-bold">Basket Random Unblocked</span> anywhere.
            </motion.p>
          </div>

          {/* Game Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="relative aspect-video w-full max-w-5xl mx-auto bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[70vh]">
              {!gameStarted ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-black z-20">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-orange-500 blur-2xl opacity-20 animate-pulse" />
                    <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20 relative z-10">
                      <Gamepad2 className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <button 
                    onClick={() => setGameStarted(true)}
                    className="group relative px-12 py-4 bg-white text-black font-black text-xl uppercase tracking-tighter rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Play Now
                    <div className="absolute -inset-1 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <p className="mt-6 text-zinc-500 text-sm font-mono uppercase tracking-widest">
                    Press to start chaotic basketball
                  </p>
                </div>
              ) : (
                <iframe 
                  id="basket-random-iframe"
                  src="https://ubg98.github.io/BasketRandom/" 
                  className="w-full h-full border-0"
                  allowFullScreen
                  title="Basket Random Unblocked"
                />
              )}
            </div>

            {/* Game Controls Bar */}
            <div className="max-w-4xl mx-auto mt-6 flex items-center justify-between px-4 py-3 bg-zinc-900/50 backdrop-blur-md rounded-xl border border-white/5">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Live Server</span>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-zinc-400 hover:text-white transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="text-zinc-400 hover:text-white transition-colors">
                    <Star className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <button 
                onClick={toggleFullScreen}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-sm font-bold uppercase tracking-wider"
              >
                <Maximize2 className="w-4 h-4" />
                Fullscreen
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-4 bg-white text-black">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase italic">2-Player Mode</h3>
              <p className="text-zinc-600 leading-relaxed">
                Challenge your friends locally in the ultimate showdown. One button, infinite chaos.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase italic">Physics Based</h3>
              <p className="text-zinc-600 leading-relaxed">
                Ragdoll physics ensure that every jump, dunk, and block is completely unpredictable.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase italic">Random Levels</h3>
              <p className="text-zinc-600 leading-relaxed">
                From snowy courts to beach basketball, the environment changes every time you score.
              </p>
            </div>
          </div>

          <article className="prose prose-zinc max-w-none">
            <h2 className="text-4xl font-black tracking-tighter uppercase italic mb-8">
              What is <span className="text-orange-600">Basket Random Unblocked</span>?
            </h2>
            <p className="text-xl text-zinc-700 leading-relaxed mb-6">
              <strong>Basket Random Unblocked</strong> is a fun, physics-based basketball game for 2 players. 
              It’s part of the popular "Random" game series, known for its wacky ragdoll physics and 
              one-button control scheme. Whether you're playing <strong>basket random unblocked 76</strong> or 
              looking for <strong>unblocked games basket random</strong> at school, this game delivers 
              instant entertainment.
            </p>
            
            <div className="my-12 p-8 bg-zinc-50 rounded-3xl border border-zinc-200">
              <h3 className="text-2xl font-black uppercase italic mb-4">How to Play</h3>
              <ul className="space-y-4 text-zinc-700">
                <li className="flex gap-4">
                  <span className="font-bold text-orange-600">Player 1:</span>
                  <span>Press <strong>W</strong> to jump and throw.</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-blue-600">Player 2:</span>
                  <span>Press <strong>UP ARROW</strong> to jump and throw.</span>
                </li>
                <li className="flex gap-4 italic text-zinc-500">
                  Tip: You can play against the CPU if you're alone!
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-black tracking-tighter uppercase italic mb-6">
              Why Play <span className="text-orange-600">Basket Random Unblocked 66</span>?
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-6">
              The beauty of <strong>unblocked basket random</strong> lies in its simplicity. 
              You don't need to be a basketball pro to win. The game features different players, 
              varying court conditions, and changing balls—from classic basketballs to heavy 
              bowling balls. This unpredictability is what makes <strong>basket random unblocked</strong> 
              a staple on every unblocked games site.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="p-6 border-2 border-black rounded-2xl">
                <h4 className="font-black uppercase mb-2">Game Features</h4>
                <ul className="list-disc list-inside text-zinc-600 space-y-1">
                  <li>Wacky physics-based players</li>
                  <li>Changing fields and balls</li>
                  <li>One-key controls</li>
                  <li>2-player and CPU modes</li>
                  <li>Addictive gameplay</li>
                </ul>
              </div>
              <div className="p-6 border-2 border-black rounded-2xl bg-black text-white">
                <h4 className="font-black uppercase mb-2">SEO Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {['basket random unblocked', 'basket random unblocked 76', 'unblocked basket random', 'basket random unblocked 66', 'unblocked games basket random'].map(kw => (
                    <span key={kw} className="text-[10px] px-2 py-1 bg-white/10 rounded uppercase tracking-tighter">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black tracking-tighter uppercase italic mb-6">
              The Strategy Behind the Chaos
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-8">
              While it looks like pure luck, <strong>basket random unblocked</strong> does have a layer of strategy. 
              Timing your jumps is crucial. If you jump too early, you'll be out of position for the rebound. 
              If you jump too late, your opponent might dunk over you. Mastering the ragdoll movement 
              is the key to becoming a champion in <strong>unblocked games basket random</strong>.
            </p>
          </article>
        </div>
      </section>

      {/* Footer / Blog Link */}
      <footer className="py-12 px-4 border-t border-white/10 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest mb-4">
            Part of the Random Games Universe
          </p>
          <div className="flex justify-center gap-8">
            <a href="#" className="text-zinc-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Terms of Service</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
