import React, { useState, useEffect, useRef } from 'react';
import { Minimize, ArrowLeft, HelpCircle, ChevronDown, ChevronUp, Move, Maximize2, MousePointer2, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const FAQS = [
  {
    question: "How accurate is the online ruler?",
    answer: "The accuracy depends on your screen's PPI (Pixels Per Inch). This tool measures in pixels (px), which is the standard for web design and digital measurements."
  },
  {
    question: "Can I measure in inches or centimeters?",
    answer: "While we provide pixel measurements, you can estimate physical size if you know your screen's resolution. 96 pixels is approximately 1 inch on many standard displays."
  },
  {
    question: "How do I use the draggable ruler?",
    answer: "Click and drag the ruler handle to move it around your screen. Use the orientation toggle to switch between horizontal and vertical measurement."
  }
];

export const ScreenRuler = () => {
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [position, setPosition] = useState({ x: 100, y: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const rulerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const ticks = Array.from({ length: 101 }, (_, i) => i * 10);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12 relative overflow-hidden min-h-[600px]">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center">
            <Minimize className="w-6 h-6 text-zinc-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Screen Ruler</h1>
            <p className="text-zinc-500">Measure pixels and dimensions directly on your screen</p>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setOrientation(orientation === 'horizontal' ? 'vertical' : 'horizontal')}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/10"
          >
            <Maximize2 className={`w-4 h-4 transition-transform ${orientation === 'vertical' ? 'rotate-90' : ''}`} />
            Switch to {orientation === 'horizontal' ? 'Vertical' : 'Horizontal'}
          </button>
          <button
            onClick={() => setPosition({ x: 100, y: 200 })}
            className="px-6 py-3 bg-zinc-100 text-zinc-600 font-bold rounded-xl hover:bg-zinc-200 transition-all"
          >
            Reset Position
          </button>
        </div>

        <div className="p-8 bg-zinc-50 rounded-3xl border border-dashed border-zinc-200 text-center mb-8">
          <p className="text-zinc-500 text-sm">
            Drag the ruler below to measure elements on this page. 
            The ruler is calibrated in pixels (px).
          </p>
        </div>

        {/* The Ruler */}
        <div 
          ref={rulerRef}
          onMouseDown={handleMouseDown}
          style={{ 
            left: position.x, 
            top: position.y,
            width: orientation === 'horizontal' ? '800px' : '60px',
            height: orientation === 'horizontal' ? '60px' : '800px',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          className="absolute bg-amber-100 border-2 border-amber-300 rounded-lg shadow-xl z-10 select-none flex"
        >
          <div className="absolute top-0 left-0 p-1 flex items-center gap-1 opacity-50">
            <Move className="w-3 h-3" />
            <span className="text-[8px] font-bold uppercase">Drag</span>
          </div>

          <div className={`flex ${orientation === 'horizontal' ? 'flex-row w-full' : 'flex-col h-full'} items-start pt-4`}>
            {ticks.map((tick) => (
              <div 
                key={tick} 
                className={`relative flex ${orientation === 'horizontal' ? 'flex-col h-full' : 'flex-row w-full'} items-center`}
                style={{ 
                  [orientation === 'horizontal' ? 'marginLeft' : 'marginTop']: tick === 0 ? '0' : '0',
                  flex: '0 0 10px'
                }}
              >
                <div 
                  className={`bg-amber-400 ${
                    orientation === 'horizontal' 
                      ? `w-[1px] ${tick % 50 === 0 ? 'h-6' : tick % 10 === 0 ? 'h-4' : 'h-2'}` 
                      : `h-[1px] ${tick % 50 === 0 ? 'w-6' : tick % 10 === 0 ? 'w-4' : 'w-2'}`
                  }`} 
                />
                {tick % 50 === 0 && (
                  <span className={`absolute ${
                    orientation === 'horizontal' 
                      ? 'top-8 left-1/2 -translate-x-1/2' 
                      : 'left-8 top-1/2 -translate-y-1/2'
                  } text-[10px] font-bold text-amber-700`}>
                    {tick}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">Precision Screen Measurement: The Ultimate Online Ruler</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          In digital design and development, every pixel counts. Our <strong>online measurement tool</strong> features a versatile, draggable screen ruler designed for web designers, developers, and digital artists. Whether you're checking padding, measuring image dimensions, or aligning UI elements, this tool provides the precision you need.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <MousePointer2 className="w-5 h-5 text-zinc-600" />
              Interactive & Draggable
            </h3>
            <p className="text-zinc-600 text-sm">
              No need to install browser extensions. Simply drag our ruler anywhere on the screen to measure distances. It works directly in your browser, providing instant feedback in pixels (px).
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Maximize2 className="w-5 h-5 text-zinc-600" />
              Dual Orientation
            </h3>
            <p className="text-zinc-600 text-sm">
              Switch between horizontal and vertical modes with a single click. This allows you to measure both width and height of any element on your screen with the same high level of accuracy.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Why Use an Online Screen Ruler?</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Traditional physical rulers aren't suitable for modern high-resolution displays. An <strong>online ruler</strong> calibrated to your screen's pixels is the only way to get accurate digital measurements. It's an essential part of any web developer's toolkit for ensuring pixel-perfect layouts and responsive designs.
        </p>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Specialized Online Measurement Tool</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Beyond standard design, our <strong>online measuring tool</strong> is versatile enough for specialized tasks. Many users use it as an <strong>online pd measurement tool</strong> or an <strong>online pupil distance measurement tool</strong> to <strong>measure my pd online tool free</strong>. By using a standard reference on your screen, you can <strong>measure pd online tool</strong> or use it as a <strong>pd measurement online tool</strong> for ordering glasses.
        </p>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Additionally, it serves as an <strong>online ring measurement tool</strong>, a <strong>blueprint measuring tool online</strong>, and a <strong>free online image measurement tool</strong>. Whether you need an <strong>online photo measurement tool</strong> or an <strong>online pd measuring tool</strong>, our interface provides the flexibility required for any <strong>pd measurement tool online free</strong> or <strong>pd measurement tool online</strong>.
        </p>

        <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 mb-8">
          <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5" />
            How to Measure PD (Pupillary Distance) Online
          </h3>
          <ol className="text-blue-800 text-sm space-y-3 list-decimal pl-4">
            <li>Hold a standard magnetic stripe card (like a credit card) against your forehead, just above your eyebrows.</li>
            <li>Align the edge of the card with the center of one pupil using our <strong>online pd measuring tool</strong>.</li>
            <li>Measure the distance to the center of your other pupil.</li>
            <li>This <strong>pd measurement tool online free</strong> helps you get an estimate for your prescription glasses.</li>
          </ol>
        </div>

        <div className="mt-8 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Common Use Cases & Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Web Design Alignment', 'UI/UX Prototyping', 'Image Dimension Checking',
              'Pixel-Perfect Development', 'Screen Space Optimization', 'Digital Art Composition',
              'Browser Window Measurement', 'Element Padding Verification', 'online measuring tool',
              'online pd measurement tool', 'online pupil distance measurement tool', 'measure my pd online tool free',
              'measure pd online tool', 'online measurement tool', 'online ring measurement tool',
              'pd measurement online tool', 'free online image measurement tool', 'online image measurement tool',
              'blueprint measuring tool online', 'pd measurement tool online free', 'online pd measuring tool',
              'online photo measurement tool', 'pd measurement tool online', 'online measurement tool',
              'blueprint measuring tool online', 'pd measurement tool online free', 'online pd measuring tool',
              'online photo measurement tool', 'pd measurement tool online', 'online image measurement tool'
            ].map((keyword, i) => (
              <span key={`${keyword}-${i}`} className="text-xs text-zinc-400 bg-white px-2 py-1 rounded-md border border-zinc-200">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-zinc-900 mb-8 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-zinc-600" />
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
