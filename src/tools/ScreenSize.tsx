import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Maximize, ArrowLeft, Smartphone, Monitor, Laptop } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export const ScreenSize = () => {
  const [screenInfo, setScreenInfo] = useState({
    width: window.screen.width,
    height: window.screen.height,
    pixelRatio: window.devicePixelRatio,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenInfo({
        width: window.screen.width,
        height: window.screen.height,
        pixelRatio: window.devicePixelRatio,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Estimate physical size based on resolution and common PPIs
  // This is just an estimate as browsers don't expose physical DPI
  const estimateDiagonal = () => {
    const ppi = 96 * screenInfo.pixelRatio; // Common base PPI
    const widthInches = screenInfo.width / ppi;
    const heightInches = screenInfo.height / ppi;
    return Math.sqrt(widthInches ** 2 + heightInches ** 2).toFixed(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Maximize className="w-8 h-8 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Screen Size Detector</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Detect your screen's physical dimensions and aspect ratio. Understand how your device reports its size.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 w-full">
            <div className="relative aspect-video bg-zinc-100 rounded-2xl border-4 border-zinc-200 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <Monitor className="w-48 h-48" />
              </div>
              <div className="relative z-10 text-center">
                <p className="text-sm font-bold text-zinc-400 uppercase mb-1">Aspect Ratio</p>
                <p className="text-4xl font-black text-zinc-900">
                  {(screenInfo.width / screenInfo.height).toFixed(2)}:1
                </p>
              </div>
              {/* Dimension labels */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-white rounded-full shadow-sm text-xs font-bold text-zinc-600 border border-zinc-100">
                {screenInfo.width}px Width
              </div>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-white rounded-full shadow-sm text-xs font-bold text-zinc-600 border border-zinc-100 -rotate-90">
                {screenInfo.height}px Height
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-sm font-bold text-zinc-400 uppercase mb-3">Device Classification</h2>
              <div className="flex gap-4">
                <div className={cn("flex-1 p-4 rounded-2xl border text-center transition-all", screenInfo.width < 768 ? "bg-emerald-50 border-emerald-200 text-emerald-700 scale-105 shadow-sm" : "bg-zinc-50 border-zinc-100 text-zinc-400")}>
                  <Smartphone className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-xs font-bold">Mobile</span>
                </div>
                <div className={cn("flex-1 p-4 rounded-2xl border text-center transition-all", screenInfo.width >= 768 && screenInfo.width < 1280 ? "bg-emerald-50 border-emerald-200 text-emerald-700 scale-105 shadow-sm" : "bg-zinc-50 border-zinc-100 text-zinc-400")}>
                  <Laptop className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-xs font-bold">Tablet/Laptop</span>
                </div>
                <div className={cn("flex-1 p-4 rounded-2xl border text-center transition-all", screenInfo.width >= 1280 ? "bg-emerald-50 border-emerald-200 text-emerald-700 scale-105 shadow-sm" : "bg-zinc-50 border-zinc-100 text-zinc-400")}>
                  <Monitor className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-xs font-bold">Desktop</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
              <p className="text-sm text-zinc-500 mb-1">Estimated Diagonal Size</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-zinc-900">~{estimateDiagonal()}"</span>
                <span className="text-zinc-400 font-medium">Inches</span>
              </div>
              <p className="text-[10px] text-zinc-400 mt-2 italic">
                *Estimated based on standard pixel density. Actual physical size may vary.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">How Screen Size is Measured</h2>
          <p className="text-zinc-600 mb-4">
            Screen size is typically measured diagonally from one corner to the opposite corner. In the digital world, we often talk about "Logical Size" vs "Physical Size".
          </p>
          <ul className="space-y-3 text-sm text-zinc-600">
            <li className="flex gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <strong>Logical Size:</strong> The dimensions used by the browser for layout (CSS pixels).
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <strong>Physical Size:</strong> The actual number of hardware pixels on the panel.
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <strong>Diagonal Size:</strong> The physical length of the screen in inches.
            </li>
          </ul>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">Why Accuracy Varies</h2>
          <p className="text-zinc-600 text-sm mb-4">
            Browsers do not have access to the physical dimensions of your monitor for privacy and security reasons. They only know the resolution and the scaling factor.
          </p>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-sm text-amber-800">
            <strong>Note:</strong> To get a 100% accurate physical measurement, you should use a physical ruler or check your device's manufacturer specifications.
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">What is Aspect Ratio?</h3>
            <p className="text-zinc-600">Aspect ratio is the proportional relationship between a screen's width and height. 16:9 is the standard for widescreen monitors and TVs, while 21:9 is common for ultrawide displays.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">How do I find my exact model?</h3>
            <p className="text-zinc-600">You can check your OS settings (Display settings) or look for a sticker on the back of your monitor. For laptops, the model name is usually on the bottom case.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">Does screen size affect resolution?</h3>
            <p className="text-zinc-600">Not directly. You can have a small 13-inch laptop with a 4K resolution, or a large 27-inch monitor with only 1080p. The combination determines the sharpness (PPI).</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">What is a "Retina" display?</h3>
            <p className="text-zinc-600">Retina is a brand name used by Apple for high-DPI displays where the human eye cannot distinguish individual pixels at a normal viewing distance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
