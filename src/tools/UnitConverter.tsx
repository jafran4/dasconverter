import React, { useState, useEffect } from 'react';
import { Ruler, ArrowLeft, HelpCircle, ChevronDown, ChevronUp, ArrowRightLeft, Scale, Thermometer, Box, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const UNIT_TYPES = {
  length: {
    name: 'Length',
    icon: Ruler,
    units: {
      millimeter: 0.001,
      centimeter: 0.01,
      meter: 1,
      kilometer: 1000,
      inch: 0.0254,
      foot: 0.3048,
      yard: 0.9144,
      mile: 1609.344
    }
  },
  weight: {
    name: 'Weight',
    icon: Scale,
    units: {
      milligram: 0.001,
      gram: 1,
      kilogram: 1000,
      ounce: 28.3495,
      pound: 453.592,
      stone: 6350.29,
      ton: 1000000
    }
  },
  temperature: {
    name: 'Temperature',
    icon: Thermometer,
    units: {
      celsius: 'C',
      fahrenheit: 'F',
      kelvin: 'K'
    }
  },
  area: {
    name: 'Area',
    icon: Square,
    units: {
      'square millimeter': 0.000001,
      'square centimeter': 0.0001,
      'square meter': 1,
      'square kilometer': 1000000,
      'square inch': 0.00064516,
      'square foot': 0.092903,
      'square yard': 0.836127,
      acre: 4046.86,
      hectare: 10000
    }
  },
  volume: {
    name: 'Volume',
    icon: Box,
    units: {
      milliliter: 0.001,
      liter: 1,
      'cubic meter': 1000,
      'fluid ounce': 0.0295735,
      cup: 0.24,
      pint: 0.473176,
      quart: 0.946353,
      gallon: 3.78541
    }
  }
};

const FAQS = [
  {
    question: "How to convert Celsius to Fahrenheit?",
    answer: "To convert Celsius to Fahrenheit, multiply by 1.8 and add 32. Example: (20°C × 1.8) + 32 = 68°F."
  },
  {
    question: "How many inches are in a meter?",
    answer: "There are approximately 39.37 inches in one meter."
  },
  {
    question: "What is the formula for converting pounds to kilograms?",
    answer: "Divide the weight in pounds by 2.2046 to get kilograms. Example: 10 lbs ÷ 2.2046 ≈ 4.54 kg."
  },
  {
    question: "How to calculate area conversion?",
    answer: "Area conversion involves squaring the linear conversion factor. For example, since 1m = 100cm, 1m² = 100² cm² = 10,000 cm²."
  }
];

export const UnitConverter = () => {
  const [type, setType] = useState<keyof typeof UNIT_TYPES>('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [value, setValue] = useState<string>('1');
  const [result, setResult] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const units = Object.keys(UNIT_TYPES[type].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
  }, [type]);

  useEffect(() => {
    convert();
  }, [fromUnit, toUnit, value, type]);

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult(null);
      return;
    }

    if (type === 'temperature') {
      let celsius = val;
      if (fromUnit === 'fahrenheit') celsius = (val - 32) / 1.8;
      if (fromUnit === 'kelvin') celsius = val - 273.15;

      let final = celsius;
      if (toUnit === 'fahrenheit') final = (celsius * 1.8) + 32;
      if (toUnit === 'kelvin') final = celsius + 273.15;
      
      setResult(final);
    } else {
      const units = UNIT_TYPES[type].units as Record<string, number>;
      const baseValue = val * units[fromUnit];
      const finalValue = baseValue / units[toUnit];
      setResult(finalValue);
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center">
            <Ruler className="w-6 h-6 text-sky-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Unit Converter</h1>
            <p className="text-zinc-500">Convert between different units of measurement</p>
          </div>
        </div>

        {/* Type Selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(Object.keys(UNIT_TYPES) as Array<keyof typeof UNIT_TYPES>).map((key) => {
            const Icon = UNIT_TYPES[key].icon;
            return (
              <button
                key={key}
                onClick={() => setType(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                  type === key 
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' 
                    : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {UNIT_TYPES[key].name}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Value</label>
              <input 
                type="number" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all font-mono text-lg"
                placeholder="Enter value..."
              />
            </div>

            <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">From</label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all capitalize"
                >
                  {Object.keys(UNIT_TYPES[type].units).map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={swapUnits}
                className="p-3 bg-zinc-100 rounded-xl hover:bg-zinc-200 transition-all mb-0.5"
                title="Swap Units"
              >
                <ArrowRightLeft className="w-5 h-5 text-zinc-600" />
              </button>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">To</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all capitalize"
                >
                  {Object.keys(UNIT_TYPES[type].units).map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center min-h-[200px]">
            {result !== null ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-2">
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Result</p>
                <h2 className="text-4xl font-black text-sky-600 break-all">
                  {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </h2>
                <p className="text-zinc-500 font-medium capitalize">{toUnit}</p>
                
                <div className="pt-4 mt-4 border-t border-zinc-200">
                  <p className="text-xs text-zinc-400">
                    {value} {fromUnit} = {result.toLocaleString(undefined, { maximumFractionDigits: 10 })} {toUnit}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <ArrowRightLeft className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter a value to see conversion</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">The Ultimate Online Measurement & Unit Conversion Tool</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Whether you're working on a DIY project, studying for an exam, or cooking a new recipe, accurate measurements are crucial. Our <strong>online measurement tool</strong> provides a fast, reliable, and easy-to-use interface for converting between hundreds of different units across multiple categories.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-sky-600" />
              Length & Distance
            </h3>
            <p className="text-zinc-600 text-sm">
              Convert between metric and imperial systems effortlessly. From millimeters to miles, our tool handles everything including inches, feet, yards, and kilometers. Perfect for construction, tailoring, and travel planning.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Scale className="w-5 h-5 text-sky-600" />
              Weight & Mass
            </h3>
            <p className="text-zinc-600 text-sm">
              Need to convert grams to ounces or kilograms to pounds? Our weight converter is precise and covers everything from milligrams to tons, making it ideal for shipping, cooking, and fitness tracking.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Why Accuracy Matters in Conversion</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          In science, engineering, and daily life, a small error in conversion can lead to significant problems. That's why we use high-precision conversion factors for all our calculations. Whether you're <strong>converting area</strong> for a new floor or <strong>measuring volume</strong> for a liquid mixture, you can trust our results.
        </p>

        <div className="mt-8 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Supported Conversion Categories</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Length (m, in, ft, km, mi)', 'Weight (kg, lb, oz, g)', 'Temperature (C, F, K)',
              'Area (sq m, acre, hectare)', 'Volume (L, gal, cup, ml)', 'Metric to Imperial',
              'Imperial to Metric', 'Scientific Units', 'Cooking Measurements'
            ].map(keyword => (
              <span key={keyword} className="text-xs text-zinc-400 bg-white px-2 py-1 rounded-md border border-zinc-200">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-zinc-900 mb-8 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-sky-600" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index}
              className="border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors"
              >
                <span className="font-bold text-zinc-900">{faq.question}</span>
                {openFaq === index ? <ChevronDown className="w-5 h-5 text-zinc-400" /> : <ChevronUp className="w-5 h-5 text-zinc-400" />}
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-zinc-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
