import React, { useState, useEffect } from 'react';
import { Landmark, ArrowLeft, Info, HelpCircle, Calculator, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const VAT_RATES: Record<string, number> = {
  "United Kingdom": 20,
  "Germany": 19,
  "France": 20,
  "Italy": 22,
  "Spain": 21,
  "Australia": 10,
  "Ireland": 23,
  "Netherlands": 21,
  "Belgium": 21,
  "Sweden": 25,
  "Norway": 25,
  "Denmark": 25,
  "Finland": 24,
  "Austria": 20,
  "Portugal": 23,
  "Greece": 24,
  "Poland": 23,
  "Czech Republic": 21,
  "Hungary": 27,
  "Slovakia": 20,
  "Romania": 19,
  "Bulgaria": 20,
  "Croatia": 25,
  "Slovenia": 22,
  "Estonia": 22,
  "Latvia": 21,
  "Lithuania": 21,
  "Luxembourg": 17,
  "Malta": 18,
  "Cyprus": 19,
  "India (GST)": 18,
  "Bangladesh": 15,
  "Pakistan": 17,
  "Custom": 0
};

export const VATCalculator = () => {
  const [amount, setAmount] = useState<string>('');
  const [country, setCountry] = useState<string>('United Kingdom');
  const [vatRate, setVatRate] = useState<string>('20');
  const [type, setType] = useState<'add' | 'remove'>('add');
  const [result, setResult] = useState<{ net: number; vat: number; total: number } | null>(null);

  useEffect(() => {
    if (country !== 'Custom') {
      setVatRate(VAT_RATES[country].toString());
    }
  }, [country]);

  const calculateVAT = () => {
    const amt = parseFloat(amount);
    const rate = parseFloat(vatRate);
    
    if (amt > 0 && rate >= 0) {
      let net, vat, total;

      if (type === 'add') {
        net = amt;
        vat = amt * (rate / 100);
        total = amt + vat;
      } else {
        total = amt;
        net = amt / (1 + rate / 100);
        vat = total - net;
      }

      setResult({
        net: parseFloat(net.toFixed(2)),
        vat: parseFloat(vat.toFixed(2)),
        total: parseFloat(total.toFixed(2))
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Landmark className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">VAT Calculator</h1>
            <p className="text-zinc-500">Value Added Tax calculation for multiple countries</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Calculation Type</label>
              <div className="flex gap-3">
                <button 
                  onClick={() => setType('add')}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-semibold transition-all border",
                    type === 'add' ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100"
                  )}
                >
                  Add VAT
                </button>
                <button 
                  onClick={() => setType('remove')}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-semibold transition-all border",
                    type === 'remove' ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100"
                  )}
                >
                  Remove VAT
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Amount</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Country</label>
                <select 
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  {Object.keys(VAT_RATES).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">VAT Rate (%)</label>
                <input 
                  type="number" 
                  value={vatRate}
                  onChange={(e) => setVatRate(e.target.value)}
                  disabled={country !== 'Custom'}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <button 
              onClick={calculateVAT}
              className="w-full py-4 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20"
            >
              Calculate VAT
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
                <div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Total Amount</p>
                  <h2 className="text-6xl font-black text-blue-500">${result.total}</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <p className="text-xs text-zinc-400 uppercase font-bold mb-1">Net Amount</p>
                    <p className="text-xl font-bold text-zinc-900">${result.net}</p>
                  </div>
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <p className="text-xs text-zinc-400 uppercase font-bold mb-1">VAT Amount</p>
                    <p className="text-xl font-bold text-zinc-900">${result.vat}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter an amount to calculate VAT</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">Understanding VAT: A Global Guide for Businesses and Consumers</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Value Added Tax (VAT) is a consumption tax placed on a product whenever value is added at each stage of the supply chain, from production to the point of sale. It is used by more than 160 countries around the world.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-500" />
              VAT Rates by Country
            </h3>
            <p className="text-zinc-600 text-sm">
              VAT rates vary significantly between nations. For example, the UK has a standard rate of 20%, while Hungary has the highest in the EU at 27%. Our calculator includes pre-set rates for over 30 countries.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-500" />
              Inclusive vs. Exclusive
            </h3>
            <p className="text-zinc-600 text-sm">
              Businesses often need to "add VAT" to their net prices, while consumers often need to "remove VAT" from a total price to see the base cost. Our tool handles both directions seamlessly.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">How to Calculate VAT Manually</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          To calculate VAT, you can use these simple formulas:
        </p>
        <div className="bg-zinc-900 text-zinc-100 p-6 rounded-2xl font-mono text-sm mb-8 space-y-2">
          <p><strong>To Add VAT:</strong> Total = Net Amount × (1 + VAT Rate / 100)</p>
          <p><strong>To Remove VAT:</strong> Net = Total Amount / (1 + VAT Rate / 100)</p>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Why VAT Matters for Freelancers and eCommerce</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          If you sell products or services internationally, understanding VAT is crucial. Many countries require you to register for VAT once you reach a certain sales threshold. Failing to account for VAT can lead to unexpected costs and legal issues.
        </p>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>VAT Registration:</strong> Know your local threshold (e.g., £90,000 in the UK).</li>
          <li><strong>Invoicing:</strong> Ensure your invoices clearly show the VAT amount and your VAT registration number.</li>
          <li><strong>Cross-Border Sales:</strong> Different rules apply when selling to businesses (B2B) versus consumers (B2C) in other countries.</li>
        </ul>
      </article>
    </div>
  );
};
