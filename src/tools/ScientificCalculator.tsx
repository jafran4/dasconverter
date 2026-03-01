import React, { useState } from 'react';
import { Calculator, ArrowLeft, Info, HelpCircle, History, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const ScientificCalculator = () => {
  const [display, setDisplay] = useState<string>('0');
  const [history, setHistory] = useState<string[]>([]);

  const handleButtonClick = (value: string) => {
    if (display === '0' && !isNaN(Number(value))) {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
  };

  const calculateResult = () => {
    try {
      // Using Function constructor as a safer alternative to eval for simple math
      // In a production app, a math library like mathjs would be better
      const result = new Function(`return ${display.replace(/×/g, '*').replace(/÷/g, '/').replace(/π/g, Math.PI.toString()).replace(/e/g, Math.E.toString())}`)();
      setHistory([`${display} = ${result}`, ...history.slice(0, 4)]);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
      setTimeout(() => setDisplay('0'), 1500);
    }
  };

  const handleFunction = (func: string) => {
    try {
      const val = parseFloat(display);
      let result = 0;
      switch (func) {
        case 'sin': result = Math.sin(val); break;
        case 'cos': result = Math.cos(val); break;
        case 'tan': result = Math.tan(val); break;
        case 'log': result = Math.log10(val); break;
        case 'ln': result = Math.log(val); break;
        case 'sqrt': result = Math.sqrt(val); break;
        case 'sq': result = Math.pow(val, 2); break;
        case 'exp': result = Math.exp(val); break;
        default: return;
      }
      setHistory([`${func}(${display}) = ${result}`, ...history.slice(0, 4)]);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  const buttons = [
    ['sin', 'cos', 'tan', 'log', 'ln'],
    ['(', ')', 'sqrt', 'sq', 'exp'],
    ['7', '8', '9', '÷', 'C'],
    ['4', '5', '6', '×', 'π'],
    ['1', '2', '3', '-', 'e'],
    ['0', '.', '=', '+', 'ans']
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Scientific Calculator</h1>
            <p className="text-zinc-500">Advanced mathematical calculations in your browser</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-zinc-900 p-6 rounded-2xl text-right shadow-inner">
              <div className="text-zinc-500 text-xs font-mono mb-1 h-4 truncate">
                {history[0]?.split('=')[0]}
              </div>
              <div className="text-white text-4xl font-mono font-bold truncate">
                {display}
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {buttons.flat().map((btn) => (
                <button
                  key={btn}
                  onClick={() => {
                    if (btn === '=') calculateResult();
                    else if (btn === 'C') clearDisplay();
                    else if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'sq', 'exp'].includes(btn)) handleFunction(btn);
                    else if (btn === 'ans') setDisplay(history[0]?.split('=')[1]?.trim() || '0');
                    else handleButtonClick(btn);
                  }}
                  className={cn(
                    "p-4 rounded-xl font-bold transition-all active:scale-95",
                    btn === '=' ? "bg-indigo-500 text-white hover:bg-indigo-600 col-span-1" :
                    ['÷', '×', '-', '+'].includes(btn) ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200" :
                    ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'sq', 'exp'].includes(btn) ? "bg-zinc-800 text-white text-xs hover:bg-zinc-700" :
                    btn === 'C' ? "bg-rose-500 text-white hover:bg-rose-600" :
                    "bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
                  )}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
                <History className="w-4 h-4" />
                History
              </h3>
              <button onClick={() => setHistory([])} className="text-xs text-zinc-400 hover:text-rose-500 transition-colors">
                Clear
              </button>
            </div>
            <div className="space-y-2">
              {history.length > 0 ? history.map((item, i) => (
                <div key={i} className="p-3 bg-zinc-50 border border-zinc-100 rounded-xl text-sm font-mono text-zinc-600">
                  {item}
                </div>
              )) : (
                <div className="text-zinc-400 text-sm italic text-center py-8">
                  No recent calculations
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">The Power of Scientific Calculators in the Digital Age</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          A scientific calculator is an indispensable tool for students, engineers, and scientists. Unlike a standard calculator, it can handle complex functions like trigonometry, logarithms, and exponential growth.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-zinc-900" />
              Advanced Functions
            </h3>
            <p className="text-zinc-600 text-sm">
              Our online scientific calculator includes support for sine, cosine, tangent, square roots, and natural logarithms, making it perfect for high school and college-level math.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <RefreshCcw className="w-5 h-5 text-zinc-900" />
              History Tracking
            </h3>
            <p className="text-zinc-600 text-sm">
              Never lose track of your work again. Our tool keeps a history of your last five calculations, allowing you to quickly reference previous results.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Why Use an Online Scientific Calculator?</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Physical scientific calculators can be expensive and bulky. An online tool provides the same powerful features directly in your browser, accessible from any device. Whether you're at home, in the library, or on the go, you always have a professional-grade math tool at your fingertips.
        </p>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Common Uses</h3>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Trigonometry:</strong> Solve for angles and sides in triangles using sin, cos, and tan.</li>
          <li><strong>Algebra:</strong> Work with exponents, roots, and complex equations.</li>
          <li><strong>Physics & Engineering:</strong> Perform calculations involving constants like Pi (π) and Euler's number (e).</li>
          <li><strong>Statistics:</strong> Calculate logarithms and base-10 functions for data analysis.</li>
        </ul>
      </article>
    </div>
  );
};
