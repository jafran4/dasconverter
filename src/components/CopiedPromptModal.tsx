import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ExternalLink, Sparkles, Copy } from 'lucide-react';

const ChatGptIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.535-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4997 4.4997 0 0 1-6.1408-1.6464zM2.3401 8.587a4.4708 4.4708 0 0 1 2.3655-1.9728V12.15a.7665.7665 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.5045 4.5045 0 0 1 2.34 8.587zm16.5963 3.8558L13.0938 9.0744l2.0201-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.5258a.79.79 0 0 0-.3927-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.4086 9.9206V7.5882a.071.071 0 0 1 .0331-.0615l4.8303-2.7913a4.5045 4.5045 0 0 1 6.6802 4.6602zM8.3061 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.06a4.4997 4.4997 0 0 1 7.3757-3.4537l-.142.0805-4.7783 2.7582a.7948.7948 0 0 0-.3927.6813v6.7369zm1.093-2.3655l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.5045-2.6117-1.5045z"/>
  </svg>
);

const GeminiIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24Z" fill="url(#gemini_copied_grad)" />
    <defs>
      <linearGradient id="gemini_copied_grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1A73E8" />
        <stop offset="0.5" stopColor="#8AB4F8" />
        <stop offset="1" stopColor="#A142F4" />
      </linearGradient>
    </defs>
  </svg>
);

export const CopiedPromptModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState<string>('');
  const [reCopied, setReCopied] = useState(false);

  useEffect(() => {
    const handlePromptCopied = (e: Event) => {
      const customEvent = e as CustomEvent<{ prompt: string }>;
      if (customEvent.detail && customEvent.detail.prompt) {
        setCopiedPrompt(customEvent.detail.prompt);
        setIsOpen(true);
        setReCopied(false);
      }
    };

    window.addEventListener('prompt-copied', handlePromptCopied);
    return () => {
      window.removeEventListener('prompt-copied', handlePromptCopied);
    };
  }, []);

  const handleCopyAgain = () => {
    if (copiedPrompt) {
      navigator.clipboard.writeText(copiedPrompt);
      setReCopied(true);
      setTimeout(() => setReCopied(false), 2000);
    }
  };

  const handleOpenChatGPT = () => {
    window.open('https://chatgpt.com', '_blank', 'noopener,noreferrer');
  };

  const handleOpenGemini = () => {
    window.open('https://gemini.google.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-zinc-950/75 backdrop-blur-md"
          />

          {/* Animated Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { type: "spring", damping: 25, stiffness: 300 }
            }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            className="relative w-full max-w-xl bg-white border border-zinc-200/90 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8"
          >
            {/* Header Badge & Title */}
            <div className="text-center mb-6">
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.05 }}
                className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner"
              >
                <Check className="w-8 h-8 stroke-[3]" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  Copied to Clipboard
                </span>
                <h3 className="text-2xl font-extrabold text-zinc-950 tracking-tight">
                  Prompt Ready for AI Generation!
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-md mx-auto">
                  Launch ChatGPT or Google Gemini below to test or generate your prompt instantly:
                </p>
              </motion.div>
            </div>

            {/* Truncated Prompt Preview Card */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 mb-6 relative group"
            >
              <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                <span>Copied Prompt</span>
                <button
                  onClick={handleCopyAgain}
                  className="text-purple-600 hover:text-purple-800 flex items-center gap-1 font-bold lowercase normal-case text-xs transition-colors"
                >
                  {reCopied ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Re-copied!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3.5 h-3.5" /> Copy again
                    </span>
                  )}
                </button>
              </div>
              <p className="text-zinc-800 text-xs sm:text-sm font-mono leading-relaxed line-clamp-3 italic">
                "{copiedPrompt}"
              </p>
            </motion.div>

            {/* AI Platform Launch Buttons with Entrance Animation */}
            <div className="space-y-3 mb-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-400 block text-center mb-2">
                Open in AI Workspace
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* ChatGPT Button */}
                <motion.button
                  type="button"
                  onClick={handleOpenChatGPT}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative overflow-hidden bg-zinc-950 hover:bg-zinc-900 text-white rounded-2xl p-4 border border-zinc-800 flex items-center justify-between shadow-lg shadow-zinc-950/20 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    {/* ChatGPT Animated Logo Badge */}
                    <motion.div 
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="w-11 h-11 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-emerald-500 group-hover:text-white transition-colors"
                    >
                      <ChatGptIcon className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                        ChatGPT
                      </h4>
                      <p className="text-[11px] text-zinc-400 group-hover:text-zinc-300">chatgpt.com</p>
                    </div>
                  </div>

                  <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </motion.button>

                {/* Google Gemini Button */}
                <motion.button
                  type="button"
                  onClick={handleOpenGemini}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.28 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 hover:from-blue-900 hover:to-purple-900 text-white rounded-2xl p-4 border border-indigo-500/30 flex items-center justify-between shadow-lg shadow-purple-950/20 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    {/* Gemini Animated Logo Badge */}
                    <motion.div 
                      animate={{ scale: [1, 1.12, 1] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className="w-11 h-11 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-indigo-600 transition-colors"
                    >
                      <GeminiIcon className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                        Google Gemini
                      </h4>
                      <p className="text-[11px] text-indigo-200/80 group-hover:text-white">gemini.google.com</p>
                    </div>
                  </div>

                  <ExternalLink className="w-4 h-4 text-indigo-300 group-hover:text-purple-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </motion.button>
              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-auto px-6 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs rounded-xl transition-all"
              >
                Close & Continue
              </button>
            </div>

            {/* Top Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-all font-bold text-xs"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
