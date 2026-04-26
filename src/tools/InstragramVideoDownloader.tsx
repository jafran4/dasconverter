import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, ArrowLeft, Download, Link as LinkIcon, AlertCircle, CheckCircle2, Loader2, Copy, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export const InstragramVideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`/api/igdl?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (response.ok && data.url) {
        setResult(data.url);
      } else {
        setError(data.error || 'Failed to fetch video. Please check the URL and try again.');
      }
    } catch (err) {
      setError('A connection error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
          className="w-20 h-20 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-100"
        >
          <Video className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Instragram Video Downloder</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto text-lg">
          Download videos, reels, and photos from Instragram instantly. High quality, fast, and free. No login required.
        </p>
      </div>

      <div className="bg-white p-8 rounded-[32px] border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-12 relative overflow-hidden">
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <LinkIcon className="h-5 w-5 text-zinc-400" />
              </div>
              <input
                type="text"
                placeholder="Paste Instragram link here (Reels, Video, Photo)..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="block w-full pl-12 pr-4 py-5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/5 focus:border-red-500/50 transition-all text-zinc-900 text-lg placeholder:text-zinc-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="w-full py-5 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-2xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-200 disabled:opacity-50 disabled:shadow-none h-16 text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Generating Download Link...
                </>
              ) : (
                <>
                  <Download className="w-6 h-6" />
                  Download Now
                </>
              )}
            </button>
          </div>
        </form>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-8 border-t border-zinc-100"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="p-4 bg-emerald-50 rounded-2xl flex items-center gap-3 text-emerald-700 mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="font-bold">Download link ready!</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <a
                    href={result}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-xl"
                  >
                    <Download className="w-5 h-5" />
                    Download Video / Photo
                  </a>
                  <button
                    onClick={copyToClipboard}
                    className="px-8 py-4 bg-zinc-100 text-zinc-900 rounded-2xl font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                  >
                    {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
                    {copied ? 'Copied URL!' : 'Copy URL'}
                  </button>
                </div>
                
                <p className="text-xs text-zinc-400 text-center">
                  If the download doesn't start, right-click the button and select "Save Link As..."
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SEO Content Section */}
      <div className="prose prose-zinc max-w-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-zinc-50 rounded-[28px] border border-zinc-100">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4">
              <Download className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">Fast & Free</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">Download any content from Instragram in seconds without spending a dime.</p>
          </div>
          <div className="p-6 bg-zinc-50 rounded-[28px] border border-zinc-100">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4">
              <Video className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">High Quality</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">Save videos and reels in their original high-definition resolution.</p>
          </div>
          <div className="p-6 bg-zinc-50 rounded-[28px] border border-zinc-100">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4">
              <Instagram className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">No Login</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">You don't need to provide your Instragram credentials to use our tool.</p>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 mb-6">How to Download Instragram Videos?</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center aspect-square font-bold shrink-0">1</div>
              <div>
                <h4 className="font-bold text-zinc-900 mb-1">Copy the URL</h4>
                <p className="text-zinc-600">Open Instragram and copy the link of the video, reel, or photo you want to download.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center aspect-square font-bold shrink-0">2</div>
              <div>
                <h4 className="font-bold text-zinc-900 mb-1">Paste into the Box</h4>
                <p className="text-zinc-600">Paste the copied link into the input field at the top of this page.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center aspect-square font-bold shrink-0">3</div>
              <div>
                <h4 className="font-bold text-zinc-900 mb-1">Download and Save</h4>
                <p className="text-zinc-600">Click the "Download Now" button. Once processed, click the final download link to save the file to your device.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 gap-4">
            <FAQItem 
              question="Is this Instragram Video Downloder really free?" 
              answer="Yes, our tool is 100% free to use. You can download as many videos and reels as you want without any hidden costs." 
            />
            <FAQItem 
              question="Can I download Reels with this tool?" 
              answer="Absolutely! Our tool fully supports Instragram Reels. Just paste the reel's link and we will handle the rest." 
            />
            <FAQItem 
              question="Is it safe to use this downloader?" 
              answer="Yes, your privacy and security are our priorities. We do not track your downloads or require you to log in with your social accounts." 
            />
            <FAQItem 
              question="Where are the downloaded videos saved?" 
              answer="By default, downloaded files are saved in your device's 'Downloads' folder, but this depends on your browser settings." 
            />
            <FAQItem 
              question="Does it work on mobile devices?" 
              answer="Yes, our Instragram Video Downloder is fully responsive and works perfectly on iPhones, Android phones, and tablets." 
            />
          </div>
        </section>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-zinc-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
      >
        <span className="font-bold text-zinc-900">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-zinc-400"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 text-zinc-600 leading-relaxed">
          {answer}
        </div>
      </motion.div>
    </div>
  );
};
