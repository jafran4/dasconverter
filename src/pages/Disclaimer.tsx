import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Info, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const Disclaimer = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-6">Disclaimer</h1>
        <p className="text-xl text-zinc-600 leading-relaxed">
          The information and tools provided on Das Converters are for general informational purposes only.
        </p>
      </motion.div>

      <div className="space-y-12 mb-24">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-zinc-900" />
            <h2 className="text-2xl font-bold text-zinc-900">Accuracy of Information</h2>
          </div>
          <p className="text-zinc-600 leading-relaxed">
            While we strive to provide accurate results, Das Converters makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the tools or the information they generate. Any reliance you place on such information is strictly at your own risk.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="w-6 h-6 text-zinc-900" />
            <h2 className="text-2xl font-bold text-zinc-900">No Professional Advice</h2>
          </div>
          <p className="text-zinc-600 leading-relaxed">
            The tools provided (such as health calculators, finance tools, and math calculators) are not intended to be a substitute for professional advice. Always seek the advice of a qualified professional with any questions you may have regarding a medical condition, financial decision, or legal matter.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-6 h-6 text-zinc-900" />
            <h2 className="text-2xl font-bold text-zinc-900">External Links</h2>
          </div>
          <p className="text-zinc-600 leading-relaxed">
            Through this website, you may be able to link to other websites which are not under the control of Das Converters. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
          </p>
        </section>
      </div>

      <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-200">
        <h3 className="text-lg font-bold text-zinc-900 mb-2">Use at Your Own Risk</h3>
        <p className="text-zinc-600">
          In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
        </p>
      </div>
    </div>
  );
};
