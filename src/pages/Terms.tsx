import React from 'react';
import { motion } from 'motion/react';
import { FileText, CheckCircle, AlertCircle, Scale } from 'lucide-react';

export const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mb-6">
          <Scale className="w-8 h-8 text-zinc-900" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-6">Terms & Conditions</h1>
        <p className="text-xl text-zinc-600 leading-relaxed">
          By using Das Converters, you agree to the following terms and conditions. Please read them carefully.
        </p>
      </motion.div>

      <div className="space-y-12 mb-24">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-zinc-900" />
            <h2 className="text-2xl font-bold text-zinc-900">Acceptance of Terms</h2>
          </div>
          <p className="text-zinc-600 leading-relaxed">
            Das Converters provides its services to you subject to the following Terms and Conditions. By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by these terms.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-zinc-900" />
            <h2 className="text-2xl font-bold text-zinc-900">Use of Services</h2>
          </div>
          <p className="text-zinc-600 leading-relaxed">
            Our tools are provided for personal and professional use. You agree not to use the services for any illegal or unauthorized purpose. You are solely responsible for the content you process through our tools.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-zinc-900" />
            <h2 className="text-2xl font-bold text-zinc-900">Intellectual Property</h2>
          </div>
          <p className="text-zinc-600 leading-relaxed">
            All content on this website, including text, graphics, logos, and software, is the property of Das Converters or its content suppliers and is protected by international copyright laws.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-6 h-6 text-zinc-900" />
            <h2 className="text-2xl font-bold text-zinc-900">Limitation of Liability</h2>
          </div>
          <p className="text-zinc-600 leading-relaxed">
            Das Converters shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.
          </p>
        </section>
      </div>

      <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-200">
        <h3 className="text-lg font-bold text-zinc-900 mb-2">Updates to Terms</h3>
        <p className="text-zinc-600">
          We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Your continued use of the website after any changes constitutes your acceptance of the new terms.
        </p>
      </div>
    </div>
  );
};
