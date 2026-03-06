import React from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Globe, MapPin } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-6">Contact Us</h1>
        <p className="text-xl text-zinc-600 leading-relaxed">
          Have questions, suggestions, or feedback? We'd love to hear from you. Our team is dedicated to making Das Converters the best tool suite for everyone.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="p-8 bg-white border border-zinc-200 rounded-3xl shadow-sm">
          <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center mb-6">
            <MessageSquare className="w-6 h-6 text-zinc-900" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">General Inquiries</h2>
          <p className="text-zinc-500 mb-4">For general questions or feedback about our tools.</p>
          <a href="mailto:support@dasconverters.com" className="text-blue-600 font-medium hover:underline">support@dasconverters.com</a>
        </div>

        <div className="p-8 bg-white border border-zinc-200 rounded-3xl shadow-sm">
          <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center mb-6">
            <Globe className="w-6 h-6 text-zinc-900" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">Partnerships</h2>
          <p className="text-zinc-500 mb-4">Interested in collaborating or business opportunities?</p>
          <a href="mailto:hello@dasconverters.com" className="text-blue-600 font-medium hover:underline">hello@dasconverters.com</a>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 md:p-12 text-white">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Stay Connected</h2>
            <p className="text-zinc-400">Follow us for updates on new tools and features.</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
              <Globe className="w-6 h-6" />
            </a>
            <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
              <MapPin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
