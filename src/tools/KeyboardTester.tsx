import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Keyboard, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const KEY_ROWS = [
  ['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
  ['ShiftLeft', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'MetaRight', 'ContextMenu', 'ControlRight']
];

const KEY_MAP: Record<string, string> = {
  ' ': 'Space',
  'Control': 'ControlLeft',
  'Alt': 'AltLeft',
  'Meta': 'MetaLeft',
  'Shift': 'ShiftLeft',
};

export const KeyboardTester = () => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      const key = e.code || e.key;
      setActiveKeys(prev => new Set(prev).add(key));
      setPressedKeys(prev => new Set(prev).add(key));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      const key = e.code || e.key;
      setActiveKeys(prev => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const reset = () => {
    setPressedKeys(new Set());
    setActiveKeys(new Set());
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Keyboard className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Keyboard Tester</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Test your keyboard keys online. Press any key to see if it's working correctly.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12 overflow-x-auto">
        <div className="min-w-[800px] flex flex-col gap-2">
          {KEY_ROWS.map((row, i) => (
            <div key={i} className="flex gap-2 justify-center">
              {row.map(key => {
                const isPressed = pressedKeys.has(key);
                const isActive = activeKeys.has(key);
                return (
                  <div
                    key={key}
                    className={cn(
                      "h-12 flex items-center justify-center rounded-lg border text-xs font-medium transition-all duration-75",
                      key === 'Space' ? "w-64" : 
                      ['Backspace', 'Tab', 'Enter', 'CapsLock', 'ShiftLeft', 'ShiftRight'].includes(key) ? "w-24" : "w-12",
                      isActive ? "bg-indigo-600 text-white border-indigo-600 scale-95" :
                      isPressed ? "bg-indigo-100 text-indigo-700 border-indigo-200" :
                      "bg-zinc-50 text-zinc-600 border-zinc-200"
                    )}
                  >
                    {key.replace('Left', '').replace('Right', '').replace('Key', '')}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-colors font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Tester
          </button>
        </div>
      </div>

      {/* SEO Content */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">About Keyboard Tester</h2>
          <p className="text-zinc-600 mb-4">
            Our online Keyboard Tester is a free utility designed to help you verify the functionality of every key on your keyboard. Whether you're a gamer checking for ghosting or a professional ensuring your equipment is in top shape, this tool provides instant visual feedback.
          </p>
          <p className="text-zinc-600">
            It works with all types of keyboards, including mechanical, membrane, laptop, and wireless keyboards. No software installation is required—it runs directly in your browser.
          </p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">How to Use</h2>
          <ul className="space-y-3 text-zinc-600">
            <li className="flex gap-3">
              <span className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</span>
              Open the Keyboard Tester page.
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
              Press any key on your physical keyboard.
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">3</span>
              The corresponding key on the screen will light up.
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">4</span>
              Tested keys will remain highlighted in a lighter color.
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">Why is my key not lighting up?</h3>
            <p className="text-zinc-600">If a key doesn't light up, it might be a hardware failure. Try cleaning the key or testing the keyboard on another device to confirm.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">Does it support Mac keyboards?</h3>
            <p className="text-zinc-600">Yes, it supports Windows, Mac, and Linux keyboard layouts. The "Meta" key represents the Command key on Mac and the Windows key on PC.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">Is this tool safe to use?</h3>
            <p className="text-zinc-600">Absolutely. We do not record or store any keystrokes. All testing happens locally in your browser for your privacy and security.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">What is N-Key Rollover?</h3>
            <p className="text-zinc-600">N-Key Rollover (NKRO) is the ability of a keyboard to correctly detect multiple simultaneous key presses. You can test this by pressing many keys at once.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
