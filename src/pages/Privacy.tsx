import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, EyeOff, ServerOff, FileCheck } from 'lucide-react';

export const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
          <ShieldCheck className="w-8 h-8 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-6">Privacy Policy</h1>
        <p className="text-xl text-zinc-600 leading-relaxed">
          At Das Converters, we take your privacy seriously. Our tools are designed with a "Privacy-First" approach, meaning your data stays where it belongs: with you.
        </p>
      </motion.div>

      <div className="space-y-12 mb-24">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <ServerOff className="w-6 h-6 text-zinc-900" />
            <h2 className="text-2xl font-bold text-zinc-900">No Server-Side Processing</h2>
          </div>
          <p className="text-zinc-600 leading-relaxed">
            Unlike many other online converters, we do not upload your files to our servers. All processing—whether it's merging PDFs, resizing images, or calculating data—happens locally in your web browser using JavaScript. This ensures that your sensitive documents never leave your device.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <EyeOff className="w-6 h-6 text-zinc-900" />
            <h2 className="text-2xl font-bold text-zinc-900">No Tracking or Data Collection</h2>
          </div>
          <p className="text-zinc-600 leading-relaxed">
            We do not use invasive tracking cookies or collect personal information. We don't store your IP address, your location, or any details about the files you process. Our goal is to provide utility, not to harvest data.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-6 h-6 text-zinc-900" />
            <h2 className="text-2xl font-bold text-zinc-900">Browser Security</h2>
          </div>
          <p className="text-zinc-600 leading-relaxed">
            Our application runs within the secure sandbox of your web browser. This provides an additional layer of security, preventing the application from accessing other parts of your system without your explicit permission.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <FileCheck className="w-6 h-6 text-zinc-900" />
            <h2 className="text-2xl font-bold text-zinc-900">Open & Transparent</h2>
          </div>
          <p className="text-zinc-600 leading-relaxed">
            We believe in transparency. Our tools use well-known, open-source libraries to perform their tasks. We don't hide our processes behind proprietary black boxes.
          </p>
        </section>
      </div>

      <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-200">
        <h3 className="text-lg font-bold text-zinc-900 mb-4">Questions?</h3>
        <p className="text-zinc-600">
          If you have any questions about our privacy practices or how our tools work, feel free to reach out to us. We're always happy to explain our commitment to user privacy.
        </p>
      </div>
    </div>
  );
};
