import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MousePointer2, ArrowLeft, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

interface ClickRecord {
  id: number;
  delay: number;
  isDouble: boolean;
}

export const DoubleClickTester = () => {
  const [records, setRecords] = useState<ClickRecord[]>([]);
  const [isDoubleIssue, setIsDoubleIssue] = useState(false);
  const lastClickTime = useRef<number>(0);

  const handleClick = () => {
    const now = Date.now();
    const delay = now - lastClickTime.current;
    
    // Most mice consider < 80ms as a potential hardware double-click fault
    // if the user didn't intend to double click.
    const isFaulty = delay > 5 && delay < 80;

    const newRecord: ClickRecord = {
      id: now,
      delay: lastClickTime.current === 0 ? 0 : delay,
      isDouble: isFaulty
    };

    if (isFaulty) setIsDoubleIssue(true);
    
    setRecords(prev => [newRecord, ...prev].slice(0, 15));
    lastClickTime.current = now;
  };

  const reset = () => {
    setRecords([]);
    setIsDoubleIssue(false);
    lastClickTime.current = 0;
  };

  const averageDelay = records.length > 1 
    ? Math.round(records.slice(0, -1).reduce((acc, r) => acc + r.delay, 0) / (records.length - 1))
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <MousePointer2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Double Click Tester</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Use our free <strong>double click test</strong> to check if your mouse is double-clicking unintentionally. This <strong>double clicker test</strong> is essential for diagnosing common hardware failures in gaming mice.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <button
            onClick={handleClick}
            className={cn(
              "w-full h-64 rounded-3xl border-4 border-dashed transition-all flex flex-col items-center justify-center gap-4 group relative overflow-hidden",
              isDoubleIssue ? "border-rose-200 bg-rose-50 hover:border-rose-400" : "border-zinc-200 bg-white hover:border-emerald-400"
            )}
          >
            <div className="relative z-10 text-center">
              <div className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-active:scale-90",
                isDoubleIssue ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"
              )}>
                <MousePointer2 className="w-10 h-10" />
              </div>
              <p className="text-xl font-bold text-zinc-900">Start Double Clicking Test</p>
              <p className="text-zinc-500">Test your mouse button for faults</p>
            </div>
          </button>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <p className="text-sm text-zinc-500 mb-1">Total Clicks</p>
              <p className="text-3xl font-bold text-zinc-900">{records.length}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <p className="text-sm text-zinc-500 mb-1">Avg. Delay</p>
              <p className="text-3xl font-bold text-zinc-900">{averageDelay}ms</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm h-fit">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-zinc-900">Status</h2>
            <button onClick={reset} className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-500">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="mb-8">
            {isDoubleIssue ? (
              <div className="flex items-center gap-3 p-4 bg-rose-50 text-rose-700 rounded-2xl border border-rose-100">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">Potential double-click fault detected!</p>
              </div>
            ) : records.length > 5 ? (
              <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">Mouse seems healthy.</p>
              </div>
            ) : (
              <div className="p-4 bg-zinc-50 text-zinc-500 rounded-2xl border border-zinc-100 text-sm text-center">
                Start clicking to analyze...
              </div>
            )}
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {records.map((record) => (
              <div 
                key={record.id} 
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border text-sm",
                  record.isDouble ? "bg-rose-50 border-rose-100 text-rose-700" : "bg-zinc-50 border-zinc-100 text-zinc-600"
                )}
              >
                <span className="font-medium">{record.isDouble ? 'FAULT' : 'OK'}</span>
                <span className="font-mono">{record.delay}ms</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose prose-zinc max-w-none bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">Comprehensive Mouse Double Click Test</h2>
        <p className="text-zinc-600">
          The "double-click bug" is a common hardware failure in computer mice, especially gaming models. If you are looking for a reliable <strong>mouse double click test</strong>, you've come to the right place. Our <strong>double click tester</strong> helps you identify when the internal copper leaf spring of the microswitch loses its tension or develops oxidation, causing it to vibrate and register two or more clicks when you only pressed it once.
        </p>
        <h3 className="text-xl font-bold text-zinc-900 mt-6 mb-3">How this double clicking test works</h3>
        <p className="text-zinc-600">
          Our tester measures the time between consecutive clicks. While humans can click fast, it's physically impossible for a person to click twice in less than 80 milliseconds consistently. If our tool detects a gap between 5ms and 80ms, it flags it as a potential hardware fault.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-8 not-prose">
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
            <h4 className="font-bold text-zinc-900 mb-2">Symptoms of a Bad Mouse</h4>
            <ul className="text-sm text-zinc-600 space-y-2">
              <li>• Single clicks registering as double</li>
              <li>• Drag-and-drop failing mid-way</li>
              <li>• Selecting text is difficult</li>
              <li>• Accidental closing of tabs</li>
            </ul>
          </div>
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
            <h4 className="font-bold text-zinc-900 mb-2">Common Causes</h4>
            <ul className="text-sm text-zinc-600 space-y-2">
              <li>• Worn out microswitches (Omron, Kailh, etc.)</li>
              <li>• Dust or debris inside the mouse</li>
              <li>• Static electricity buildup</li>
              <li>• High humidity affecting contacts</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">Is my mouse double clicking test?</h3>
            <p className="text-zinc-600">Yes, this tool is specifically designed to answer that. By clicking in the test area, you can see if your mouse registers multiple clicks for a single press, confirming if it's double-clicking.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">How to test if mouse is double clicking?</h3>
            <p className="text-zinc-600">Simply click the main button in the tester above multiple times. If the status changes to "Potential double-click fault detected," your mouse is likely experiencing hardware issues.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">How to test if my mouse is double clicking?</h3>
            <p className="text-zinc-600">Use our <strong>double click tester</strong>. It monitors the millisecond delay between clicks. A delay shorter than 80ms is usually a sign of a mechanical fault rather than a human action.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">How to test if your mouse is double clicking?</h3>
            <p className="text-zinc-600">Open this page on any browser, and start clicking the test button. The visual log will show "FAULT" in red if an unintentional double click is detected.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">How to test mouse double click problem?</h3>
            <p className="text-zinc-600">The best way is to use a specialized tool like this one. It provides a data-driven approach by measuring the exact time between signals sent by your mouse hardware.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">Can software fix a double-click issue?</h3>
            <p className="text-zinc-600">Yes, there are "de-bounce" software solutions that ignore clicks that happen too fast. However, this is a band-aid for a hardware problem that will likely get worse over time.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">What is a good de-bounce time?</h3>
            <p className="text-zinc-600">Most gaming mice use a de-bounce time of 4ms to 20ms. If your mouse is double-clicking, increasing this in your mouse software might help.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">Is it worth repairing a mouse?</h3>
            <p className="text-zinc-600">If you have an expensive mouse, soldering in new switches (like Kailh GM 8.0) is a popular and cost-effective way to make it better than new.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
