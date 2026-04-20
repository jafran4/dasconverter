import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Monitor, ArrowLeft, RefreshCw, Maximize, Layers, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ScreenResolution = () => {
  const [screenInfo, setScreenInfo] = useState({
    width: window.screen.width,
    height: window.screen.height,
    availWidth: window.screen.availWidth,
    availHeight: window.screen.availHeight,
    colorDepth: window.screen.colorDepth,
    pixelDepth: window.screen.pixelDepth,
    devicePixelRatio: window.devicePixelRatio,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenInfo({
        width: window.screen.width,
        height: window.screen.height,
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
        colorDepth: window.screen.colorDepth,
        pixelDepth: window.screen.pixelDepth,
        devicePixelRatio: window.devicePixelRatio,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const refresh = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Monitor className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Screen Resolution Checker</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Instantly detect your display resolution, available screen space, and pixel density.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm flex flex-col items-center justify-center text-center">
          <p className="text-zinc-500 font-medium mb-2 uppercase tracking-wider text-sm">Your Resolution</p>
          <div className="text-5xl md:text-6xl font-black text-zinc-900 mb-4">
            {screenInfo.width} <span className="text-zinc-300">×</span> {screenInfo.height}
          </div>
          <div className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-bold">
            {screenInfo.width >= 3840 ? '4K Ultra HD' : 
             screenInfo.width >= 2560 ? '2K / QHD' :
             screenInfo.width >= 1920 ? 'Full HD 1080p' :
             screenInfo.width >= 1280 ? 'HD 720p' : 'Standard Definition'}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2 text-zinc-500">
              <Maximize className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Available Space</span>
            </div>
            <p className="text-xl font-bold text-zinc-900">{screenInfo.availWidth} × {screenInfo.availHeight}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2 text-zinc-500">
              <Layers className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Pixel Ratio</span>
            </div>
            <p className="text-xl font-bold text-zinc-900">{screenInfo.devicePixelRatio.toFixed(2)}x</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2 text-zinc-500">
              <Palette className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Color Depth</span>
            </div>
            <p className="text-xl font-bold text-zinc-900">{screenInfo.colorDepth}-bit</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center justify-center">
            <button onClick={refresh} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors font-medium text-sm">
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </button>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Understanding Screen Resolution</h2>
        <div className="prose prose-zinc max-w-none">
          <p className="text-zinc-600">
            Screen resolution refers to the number of distinct pixels in each dimension that can be displayed on a screen. It is usually quoted as width × height, with the units in pixels. For example, "1920 × 1080" means the width is 1920 pixels and the height is 1080 pixels.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-8 not-prose">
            <div>
              <h3 className="font-bold text-zinc-900 mb-3">Physical vs. Logical Resolution</h3>
              <p className="text-sm text-zinc-600">
                Modern high-DPI displays (like Apple's Retina) have a high physical resolution but use a "Device Pixel Ratio" to scale the UI. This ensures text remains readable while looking incredibly sharp. Our tool shows both the logical resolution and the pixel density.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 mb-3">Available Screen Space</h3>
              <p className="text-sm text-zinc-600">
                The "Available" resolution is the total screen size minus the space taken up by system UI elements like the Windows Taskbar or the macOS Menu Bar and Dock. This is the actual space a maximized browser window can occupy.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">What is PPI?</h3>
            <p className="text-zinc-600">PPI stands for Pixels Per Inch. It measures the pixel density of a screen. Higher PPI means more detail and sharper images. It is calculated using the physical size and resolution.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">Why does my 4K screen show 1080p?</h3>
            <p className="text-zinc-600">This is due to OS scaling. If you have 200% scaling on a 4K monitor, the browser reports a logical resolution of 1920x1080 with a Device Pixel Ratio of 2.0.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">What is Color Depth?</h3>
            <p className="text-zinc-600">Color depth (or bit depth) is the number of bits used to indicate the color of a single pixel. 24-bit color is standard, providing over 16 million colors.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">Does resolution affect performance?</h3>
            <p className="text-zinc-600">Yes, higher resolutions require more GPU power to render. This is why gamers often play at lower resolutions than their monitor's native capability to get higher frame rates.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
