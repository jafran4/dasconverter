import React from 'react';
import { motion } from 'motion/react';
import { LayoutGrid, ShieldCheck, Zap, Globe, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-zinc-200">
          <LayoutGrid className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-zinc-900 mb-6 tracking-tight">About Das Converters</h1>
        <p className="text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          We build simple, fast, and secure tools to help you get things done. No fluff, no tracking, just utility.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-8 bg-white rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-all"
        >
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-3">Privacy First</h3>
          <p className="text-zinc-600 leading-relaxed">
            Your data never leaves your browser. All our tools process files locally, ensuring your sensitive information stays private and secure.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="p-8 bg-white rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-all"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-3">Lightning Fast</h3>
          <p className="text-zinc-600 leading-relaxed">
            Built with modern web technologies, our tools are optimized for speed. No waiting for server uploads or processing queues.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="p-8 bg-white rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-all"
        >
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
            <Globe className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-3">Accessible Anywhere</h3>
          <p className="text-zinc-600 leading-relaxed">
            Whether you're on a desktop, tablet, or smartphone, Das Converters works seamlessly across all your devices.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="p-8 bg-white rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-all"
        >
          <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mb-6">
            <Heart className="w-6 h-6 text-rose-600" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-3">Free Forever</h3>
          <p className="text-zinc-600 leading-relaxed">
            We believe in providing high-quality tools for free. No subscriptions, no hidden fees, just pure utility for everyone.
          </p>
        </motion.div>
      </div>

      <div className="bg-zinc-900 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            Explore our collection of 50+ tools designed to make your digital life easier.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-8 py-4 bg-white text-zinc-900 rounded-2xl font-bold hover:bg-zinc-100 transition-colors"
          >
            Browse All Tools
          </Link>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};
