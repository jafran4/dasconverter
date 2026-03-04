import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MousePointerClick, ArrowLeft, RefreshCw, Mouse } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

interface ClickEvent {
  id: number;
  type: string;
  button: number;
  time: string;
}

export const MouseTester = () => {
  const [clicks, setClicks] = useState<ClickEvent[]>([]);
  const [lastButton, setLastButton] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const newClick: ClickEvent = {
      id: Date.now(),
      type: e.type,
      button: e.button,
      time: new Date().toLocaleTimeString(),
    };
    setClicks(prev => [newClick, ...prev].slice(0, 10));
    setLastButton(e.button);
  };

  const handleMouseUp = () => {
    setLastButton(null);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      setIsScrolling(true);
      setScrollCount(prev => prev + 1);
      const timeout = setTimeout(() => setIsScrolling(false), 500);
      return () => clearTimeout(timeout);
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const reset = () => {
    setClicks([]);
    setScrollCount(0);
    setLastButton(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <MousePointerClick className="w-8 h-8 text-rose-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Mouse Tester</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Test your mouse buttons, scroll wheel, and sensors. Check for double-clicks or unresponsive buttons.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div 
          className="bg-white p-12 rounded-3xl border-4 border-dashed border-zinc-200 flex flex-col items-center justify-center min-h-[400px] cursor-crosshair hover:border-rose-500/50 transition-colors relative overflow-hidden group"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onContextMenu={handleContextMenu}
        >
          <div className="relative z-10 text-center">
            <Mouse className={cn(
              "w-24 h-24 mb-6 transition-all duration-75",
              lastButton === 0 ? "text-rose-600 scale-95" : 
              lastButton === 2 ? "text-blue-600 scale-95" :
              lastButton === 1 ? "text-emerald-600 scale-95" :
              "text-zinc-300"
            )} />
            <p className="text-zinc-500 font-medium group-hover:text-zinc-900 transition-colors">
              Click anywhere in this area to test
            </p>
            <div className="mt-4 flex gap-4 justify-center">
              <span className={cn("px-3 py-1 rounded-full text-xs font-bold", lastButton === 0 ? "bg-rose-100 text-rose-700" : "bg-zinc-100 text-zinc-400")}>Left</span>
              <span className={cn("px-3 py-1 rounded-full text-xs font-bold", lastButton === 1 ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-400")}>Middle</span>
              <span className={cn("px-3 py-1 rounded-full text-xs font-bold", lastButton === 2 ? "bg-blue-100 text-blue-700" : "bg-zinc-100 text-zinc-400")}>Right</span>
            </div>
            {isScrolling && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-rose-600 font-bold text-sm"
              >
                Scrolling Detected!
              </motion.div>
            )}
          </div>
          
          <AnimatePresence>
            {clicks.map((click) => (
              <motion.div
                key={click.id}
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                className={cn(
                  "absolute w-12 h-12 rounded-full pointer-events-none",
                  click.button === 0 ? "bg-rose-500" : 
                  click.button === 2 ? "bg-blue-500" : "bg-emerald-500"
                )}
                style={{ left: '50%', top: '50%', marginLeft: '-24px', marginTop: '-24px' }}
              />
            ))}
          </AnimatePresence>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-zinc-900">Click Log</h2>
            <button onClick={reset} className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-500">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {clicks.length === 0 ? (
              <p className="text-zinc-400 text-center py-12 italic">No clicks detected yet...</p>
            ) : (
              clicks.map((click) => (
                <div key={click.id} className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      click.button === 0 ? "bg-rose-500" : 
                      click.button === 2 ? "bg-blue-500" : "bg-emerald-500"
                    )} />
                    <span className="font-bold text-zinc-700">
                      {click.button === 0 ? 'Left Click' : 
                       click.button === 2 ? 'Right Click' : 
                       click.button === 1 ? 'Middle Click' : `Button ${click.button}`}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400 font-mono">{click.time}</span>
                </div>
              ))
            )}
          </div>
          <div className="mt-6 pt-6 border-top border-zinc-100">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-500">Scroll Events:</span>
              <span className="font-bold text-zinc-900">{scrollCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">Why use a Mouse Tester?</h2>
        <p className="text-zinc-600 mb-4">
          A mouse tester is essential for diagnosing hardware issues like double-clicking, ghost clicks, or unresponsive buttons. It's particularly useful for gamers who need precise input and professionals who rely on their peripherals for productivity.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="p-4 bg-rose-50 rounded-2xl">
            <h3 className="font-bold text-rose-900 mb-2">Button Check</h3>
            <p className="text-sm text-rose-700">Verify left, right, and middle clicks are registering correctly.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl">
            <h3 className="font-bold text-blue-900 mb-2">Scroll Test</h3>
            <p className="text-sm text-blue-700">Ensure your scroll wheel is smooth and not skipping steps.</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-2xl">
            <h3 className="font-bold text-emerald-900 mb-2">Latency Info</h3>
            <p className="text-sm text-emerald-700">Check if there's any noticeable delay in button registration.</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">What is a "Ghost Click"?</h3>
            <p className="text-zinc-600">A ghost click occurs when a mouse button registers a click without being pressed, or registers multiple clicks for a single press. Our tester helps identify these patterns.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">Can I test side buttons?</h3>
            <p className="text-zinc-600">Yes, most modern browsers allow testing of side buttons (Button 3 and 4). They will appear in the click log as "Button X".</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">My right click opens a menu?</h3>
            <p className="text-zinc-600">We automatically disable the context menu in the test area so you can test your right-click button without interruptions.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">Is my mouse polling rate tested?</h3>
            <p className="text-zinc-600">This tool focuses on button functionality. For polling rate (Hz), you would need a specialized tool that tracks cursor movement frequency.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
