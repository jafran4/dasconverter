import React, { useState } from 'react';
import { Briefcase, ArrowLeft, Info, HelpCircle, Calculator, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const FiverrFeeCalculator = () => {
  const [amount, setAmount] = useState<string>('');
  const [role, setRole] = useState<'seller' | 'buyer'>('seller');
  const [result, setResult] = useState<{ fee: number; net: number; total: number } | null>(null);

  const calculateFees = () => {
    const amt = parseFloat(amount);
    
    if (amt > 0) {
      if (role === 'seller') {
        // Fiverr takes 20% from sellers
        const fee = amt * 0.20;
        const net = amt - fee;
        setResult({ fee, net, total: amt });
      } else {
        // Fiverr charges buyers a service fee
        // Usually 5.5% + $2.50 for orders below $50, or 5.5% for orders above $50
        const serviceFeeRate = 0.055;
        const fixedFee = amt < 50 ? 2.50 : 0;
        const fee = (amt * serviceFeeRate) + fixedFee;
        const total = amt + fee;
        setResult({ fee, net: amt, total });
      }
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
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Fiverr Fee Calculator</h1>
            <p className="text-zinc-500">Calculate Fiverr seller earnings and buyer service fees</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">I am a...</label>
              <div className="flex gap-3">
                <button 
                  onClick={() => setRole('seller')}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-semibold transition-all border",
                    role === 'seller' ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100"
                  )}
                >
                  Seller
                </button>
                <button 
                  onClick={() => setRole('buyer')}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-semibold transition-all border",
                    role === 'buyer' ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100"
                  )}
                >
                  Buyer
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Order Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <button 
              onClick={calculateFees}
              className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-lg shadow-emerald-600/20"
            >
              Calculate Fiverr Fees
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
                <div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">
                    {role === 'seller' ? 'You will earn' : 'Total you pay'}
                  </p>
                  <h2 className="text-6xl font-black text-emerald-600">
                    ${role === 'seller' ? result.net.toFixed(2) : result.total.toFixed(2)}
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm flex justify-between items-center">
                    <p className="text-xs text-zinc-400 uppercase font-bold">Fiverr Fee</p>
                    <p className="text-lg font-bold text-rose-500">-${result.fee.toFixed(2)}</p>
                  </div>
                  {role === 'seller' && (
                    <div className="p-4 bg-emerald-600 text-white border border-emerald-700 rounded-2xl shadow-lg flex justify-between items-center">
                      <p className="text-xs uppercase font-bold opacity-80">To earn ${amount}, list at:</p>
                      <p className="text-lg font-bold">${(parseFloat(amount) / 0.8).toFixed(2)}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter an order amount to see the Fiverr fee breakdown</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">Fiverr Fees Explained: A Guide for Sellers and Buyers</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Fiverr is one of the world's largest freelance marketplaces, but its fee structure is often a point of confusion for new users. Whether you're a seller looking to price your services or a buyer budgeting for a project, knowing the exact fees is essential.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              The 20% Seller Fee
            </h3>
            <p className="text-zinc-600 text-sm">
              Fiverr takes a flat 20% commission from every order a seller completes. This includes the base gig price, any gig extras, and even tips.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Buyer Service Fees
            </h3>
            <p className="text-zinc-600 text-sm">
              Buyers pay a service fee to Fiverr at the time of purchase. This is currently 5.5% of the purchase amount. For orders under $50, an additional $2.50 small order fee is applied.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Tips for Fiverr Sellers</h3>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Price for Profit:</strong> Always remember that you only keep 80% of your listed price. If you want to take home $100, you should list your gig at $125.</li>
          <li><strong>Gig Extras:</strong> Use gig extras to increase your average order value and offset the 20% fee.</li>
          <li><strong>Withdrawal Fees:</strong> Don't forget that withdrawing your earnings to PayPal or a bank account may incur additional fees.</li>
        </ul>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Fiverr for Men and Women in the Gig Economy</h3>
        <p className="text-zinc-600 leading-relaxed">
          The gig economy has opened up incredible opportunities for people of all genders to work on their own terms. Whether you are a woman offering graphic design services or a man providing voice-over work, Fiverr provides a global platform to showcase your skills. By understanding the fee structure, you can better manage your freelance business and ensure you're being fairly compensated for your time and expertise.
        </p>
      </article>
    </div>
  );
};
