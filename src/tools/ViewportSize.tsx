import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Smartphone, ArrowLeft, RefreshCw, Maximize2, Minimize2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ViewportSize = () => {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Smartphone className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Viewport Size Checker</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Check the current size of your browser window. Essential for responsive design and debugging layout issues.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />
          <p className="text-zinc-500 font-medium mb-2 uppercase tracking-wider text-sm">Inner Viewport (CSS Pixels)</p>
          <div className="text-5xl md:text-6xl font-black text-zinc-900 mb-4">
            {viewport.width} <span className="text-zinc-300">×</span> {viewport.height}
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold">
              {viewport.width < 640 ? 'Mobile' : viewport.width < 1024 ? 'Tablet' : 'Desktop'}
            </span>
            <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full text-xs font-bold">
              {viewport.width < 768 ? 'sm' : viewport.width < 1024 ? 'md' : viewport.width < 1280 ? 'lg' : 'xl'}
            </span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm flex flex-col items-center justify-center text-center">
          <p className="text-zinc-500 font-medium mb-2 uppercase tracking-wider text-sm">Outer Window Size</p>
          <div className="text-4xl font-bold text-zinc-900 mb-4">
            {viewport.outerWidth} <span className="text-zinc-300">×</span> {viewport.outerHeight}
          </div>
          <p className="text-xs text-zinc-400">Includes browser toolbars and borders</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Why Viewport Size Matters</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
              <Maximize2 className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-bold text-zinc-900 mb-2">Responsive Design</h3>
            <p className="text-sm text-zinc-600">Ensure your website looks great on all screen sizes by testing different breakpoints.</p>
          </div>
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
              <Minimize2 className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-bold text-zinc-900 mb-2">Debugging</h3>
            <p className="text-sm text-zinc-600">Identify why elements are overflowing or why media queries aren't triggering as expected.</p>
          </div>
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
              <RefreshCw className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-bold text-zinc-900 mb-2">Live Updates</h3>
            <p className="text-sm text-zinc-600">Resize your browser window and watch the numbers update in real-time to find exact breakpoints.</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">What is the difference between Screen and Viewport?</h3>
            <p className="text-zinc-600">Screen size is the total resolution of your monitor. Viewport size is the area inside the browser window where the website is actually rendered.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">How do I test mobile viewports on Desktop?</h3>
            <p className="text-zinc-600">You can use Browser DevTools (F12) and click the "Toggle Device Toolbar" icon to simulate various mobile devices and their specific viewport sizes.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">What are CSS Pixels?</h3>
            <p className="text-zinc-600">CSS pixels are a unit of measurement used in web design. On high-density displays, one CSS pixel may actually consist of multiple physical hardware pixels.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">Does the scrollbar affect viewport width?</h3>
            <p className="text-zinc-600">Yes, usually `window.innerWidth` includes the width of the vertical scrollbar if it is visible. This can vary slightly between different browsers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
