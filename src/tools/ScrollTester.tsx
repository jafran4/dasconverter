import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDownUp, ArrowLeft, RefreshCw, Mouse, ArrowUp, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

interface ScrollEvent {
  id: number;
  direction: 'up' | 'down';
  delta: number;
  time: number;
}

export const ScrollTester = () => {
  const [events, setEvents] = useState<ScrollEvent[]>([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [lastDirection, setLastDirection] = useState<'up' | 'down' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 'down' : 'up';
      const newEvent: ScrollEvent = {
        id: Date.now(),
        direction,
        delta: Math.abs(e.deltaY),
        time: Date.now()
      };

      setEvents(prev => [newEvent, ...prev].slice(0, 20));
      setTotalDistance(prev => prev + Math.abs(e.deltaY));
      setLastDirection(direction);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const reset = () => {
    setEvents([]);
    setTotalDistance(0);
    setLastDirection(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ArrowDownUp className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Scroll Wheel Tester</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Test your mouse scroll wheel for smoothness, direction, and skipping. Check if your wheel is working as expected.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <div 
            ref={containerRef}
            className="w-full h-80 rounded-3xl border-4 border-dashed border-zinc-200 bg-white flex flex-col items-center justify-center gap-6 group relative overflow-hidden cursor-ns-resize hover:border-blue-400 transition-colors"
          >
            <div className="relative z-10 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Mouse className="w-24 h-24 text-zinc-200" />
                <motion.div 
                  animate={{ 
                    y: lastDirection === 'up' ? -10 : lastDirection === 'down' ? 10 : 0,
                    opacity: lastDirection ? 1 : 0.3
                  }}
                  className="absolute top-1/2 left-1/2 -ml-3 -mt-8 w-6 h-10 bg-blue-500 rounded-full border-2 border-white shadow-sm"
                />
              </div>
              <p className="text-xl font-bold text-zinc-900">Scroll inside this box</p>
              <p className="text-zinc-500">Test up and down scrolling</p>
            </div>

            <div className="flex gap-8 mt-4">
              <div className={cn(
                "flex flex-col items-center gap-2 transition-opacity",
                lastDirection === 'up' ? "opacity-100" : "opacity-20"
              )}>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <ArrowUp className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-blue-700">SCROLL UP</span>
              </div>
              <div className={cn(
                "flex flex-col items-center gap-2 transition-opacity",
                lastDirection === 'down' ? "opacity-100" : "opacity-20"
              )}>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <ArrowDown className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-blue-700">SCROLL DOWN</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <p className="text-sm text-zinc-500 mb-1">Total Scroll Delta</p>
              <p className="text-3xl font-bold text-zinc-900">{Math.round(totalDistance)}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <p className="text-sm text-zinc-500 mb-1">Last Delta</p>
              <p className="text-3xl font-bold text-zinc-900">{events[0]?.delta || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm h-fit">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-zinc-900">Scroll Log</h2>
            <button onClick={reset} className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-500">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {events.length === 0 ? (
              <p className="text-zinc-400 text-center py-12 italic">Start scrolling...</p>
            ) : (
              events.map((event) => (
                <div 
                  key={event.id + Math.random()} 
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl border text-sm",
                    event.direction === 'up' ? "bg-blue-50 border-blue-100 text-blue-700" : "bg-zinc-50 border-zinc-100 text-zinc-600"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {event.direction === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    <span className="font-medium uppercase">{event.direction}</span>
                  </div>
                  <span className="font-mono">+{Math.round(event.delta)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">How to Test Your Mouse Scroll Wheel</h2>
        <p className="text-zinc-600 mb-6">
          A malfunctioning scroll wheel can be incredibly frustrating, causing pages to jump or scroll in the wrong direction. This tool helps you visualize the raw data coming from your mouse to identify hardware or driver issues.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Common Scroll Wheel Problems</h3>
            <ul className="space-y-2 text-zinc-600 text-sm">
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <strong>Jumping:</strong> The page scrolls up slightly when you scroll down.
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <strong>Skipping:</strong> The wheel rotates but no scroll event is registered.
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <strong>Sensitivity:</strong> The scroll speed is too fast or too slow.
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <strong>Ghost Scrolling:</strong> The mouse scrolls by itself without being touched.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Maintenance Tips</h3>
            <p className="text-zinc-600 text-sm mb-4">
              Most scroll wheel issues are caused by dust or hair getting caught in the optical sensor or mechanical encoder.
            </p>
            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 text-sm italic text-zinc-500">
              "Try blowing compressed air into the gap around the scroll wheel while rotating it. This often clears minor debris without needing to open the mouse."
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">What is "Smooth Scrolling"?</h3>
            <p className="text-zinc-600">Smooth scrolling is a software feature that animates the transition between scroll steps. If you're testing for hardware precision, you might want to disable it in your browser settings temporarily.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">Why does my wheel scroll in reverse?</h3>
            <p className="text-zinc-600">This is often a setting called "Natural Scrolling" on macOS or "Reverse Scroll Direction" on Windows. If it's unintentional, it could be a failing rotary encoder.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">What does "Delta" mean?</h3>
            <p className="text-zinc-600">In our log, Delta represents the amount of movement reported by the browser for a single scroll "tick". Higher values mean faster or larger scrolls.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">Can I test horizontal scrolling?</h3>
            <p className="text-zinc-600">Currently, this tool focuses on vertical scrolling (the most common). Horizontal scrolling (tilt-wheel or side-thumb) uses different event properties.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
