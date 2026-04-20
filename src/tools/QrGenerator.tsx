import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, ArrowLeft, Download, RefreshCw, Settings, Palette, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

export const QrGenerator = () => {
  const [text, setText] = useState('https://dasconverters.com');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [includeMargin, setIncludeMargin] = useState(true);
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `qrcode_${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <QrCode className="w-8 h-8 text-emerald-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Simple QR Code Generator</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Create high-quality QR codes for URLs, text, or contact information. Customize colors and download your QR code instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <label className="block text-sm font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Layout className="w-4 h-4 text-zinc-400" />
              Content (URL or Text)
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL or text here..."
              className="w-full h-32 p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-emerald-500 focus:outline-none transition-colors resize-none font-medium"
            />
          </div>

          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <label className="block text-sm font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <Palette className="w-4 h-4 text-zinc-400" />
              Customization
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Foreground Color</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="flex-1 p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Background Color</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div ref={qrRef} className="p-4 bg-white rounded-2xl border border-zinc-100 shadow-inner mb-8">
            <QRCodeCanvas
              value={text}
              size={size}
              fgColor={fgColor}
              bgColor={bgColor}
              level="H"
              includeMargin={includeMargin}
            />
          </div>

          <button
            onClick={downloadQR}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100"
          >
            <Download className="w-5 h-5" />
            Download QR Code (PNG)
          </button>
          <p className="mt-4 text-xs text-zinc-400 font-medium">High-resolution PNG format</p>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose prose-zinc max-w-none">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">What is a QR Code?</h2>
        <p className="text-zinc-600 mb-8">
          A QR code (Quick Response code) is a type of matrix barcode that can be scanned by smartphones and dedicated QR readers. It's an incredibly efficient way to share URLs, contact details, Wi-Fi passwords, and other text-based information without the need for manual typing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Marketing & Business</h3>
            <p className="text-zinc-600 text-sm">Add QR codes to your business cards, flyers, and posters to direct potential customers to your website or social media profiles.</p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Contactless Sharing</h3>
            <p className="text-zinc-600 text-sm">Share your contact information or Wi-Fi credentials easily with friends and colleagues by generating a custom QR code.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Are QR codes free to use?</h3>
            <p className="text-zinc-600">Yes, QR codes are an open standard. Our generator allows you to create and download them for free without any hidden costs or limitations.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">How long do QR codes last?</h3>
            <p className="text-zinc-600">QR codes themselves do not expire. However, if the URL or information contained within the QR code changes or becomes invalid, the QR code will no longer work as intended.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-2">Can I customize the colors?</h3>
            <p className="text-zinc-600">Absolutely! Our generator allows you to choose custom foreground and background colors to match your brand or personal style.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
