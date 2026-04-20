import React, { useState } from 'react';
import { CreditCard, ArrowLeft, Info, HelpCircle, Calculator, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const PAYPAL_RATES = [
  { name: "Standard (US)", rate: 2.9, fixed: 0.30 },
  { name: "International", rate: 4.4, fixed: 0.30 },
  { name: "QR Code (>$10)", rate: 1.9, fixed: 0.10 },
  { name: "QR Code (<$10)", rate: 2.4, fixed: 0.05 },
  { name: "Micropayments", rate: 5.0, fixed: 0.05 }
];

export const PaypalFeeCalculator = () => {
  const [amount, setAmount] = useState<string>('');
  const [rateType, setRateType] = useState(PAYPAL_RATES[0]);
  const [result, setResult] = useState<{ fee: number; net: number; receive: number } | null>(null);

  const calculateFees = () => {
    const amt = parseFloat(amount);
    
    if (amt > 0) {
      // If I want to receive X, how much should I ask for?
      // Net = (Gross - Fixed) / (1 + Rate)
      const fee = (amt * (rateType.rate / 100)) + rateType.fixed;
      const net = amt - fee;
      
      // If I want to receive 'amt' net, I must ask for 'receive'
      const receive = (amt + rateType.fixed) / (1 - (rateType.rate / 100));

      setResult({
        fee: parseFloat(fee.toFixed(2)),
        net: parseFloat(net.toFixed(2)),
        receive: parseFloat(receive.toFixed(2))
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">PayPal Fee Calculator</h1>
            <p className="text-zinc-500">Calculate PayPal transaction fees and net earnings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Transaction Type</label>
              <select 
                value={rateType.name}
                onChange={(e) => setRateType(PAYPAL_RATES.find(r => r.name === e.target.value) || PAYPAL_RATES[0])}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                {PAYPAL_RATES.map(r => (
                  <option key={r.name} value={r.name}>{r.name} ({r.rate}% + ${r.fixed})</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Amount to Receive / Send</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <button 
              onClick={calculateFees}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20"
            >
              Calculate PayPal Fees
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
                <div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">You will receive</p>
                  <h2 className="text-6xl font-black text-blue-600">${result.net}</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm flex justify-between items-center">
                    <p className="text-xs text-zinc-400 uppercase font-bold">PayPal Fee</p>
                    <p className="text-lg font-bold text-rose-500">-${result.fee}</p>
                  </div>
                  <div className="p-4 bg-blue-600 text-white border border-blue-700 rounded-2xl shadow-lg flex justify-between items-center">
                    <p className="text-xs uppercase font-bold opacity-80">To receive ${amount}, ask for:</p>
                    <p className="text-lg font-bold">${result.receive}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter an amount to see the PayPal fee breakdown</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">PayPal Fees Decoded: How to Keep More of Your Money</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          PayPal is one of the most widely used payment processors in the world, but its fee structure can be confusing. Whether you're a freelancer, an eCommerce seller, or just sending money to a friend, knowing exactly how much PayPal will take is crucial.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              The Standard Fee
            </h3>
            <p className="text-zinc-600 text-sm">
              For most domestic transactions in the US, PayPal charges 2.9% of the total amount plus a fixed fee of $0.30. International transactions are higher, usually around 4.4% plus a fixed fee.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              Seller Protection
            </h3>
            <p className="text-zinc-600 text-sm">
              While the fees might seem high, they include services like Seller Protection, which can help protect you from fraudulent claims and chargebacks.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">How to Avoid High PayPal Fees</h3>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Friends and Family:</strong> If you're sending money to someone you trust, use the "Friends and Family" option to avoid fees (but note you lose buyer/seller protection).</li>
          <li><strong>Invoice in Your Own Currency:</strong> Avoid PayPal's currency conversion fees by invoicing in your local currency when possible.</li>
          <li><strong>Withdraw to a Local Bank:</strong> Transferring funds to your bank is usually free, but "Instant Transfers" to a debit card incur a fee.</li>
          <li><strong>Include Fees in Your Pricing:</strong> If you're a freelancer, use our "Ask For" feature to ensure your client covers the transaction cost.</li>
        </ul>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">PayPal Fees for Men and Women in Business</h3>
        <p className="text-zinc-600 leading-relaxed">
          In the global digital economy, PayPal is a vital tool for entrepreneurs of all genders. Whether you are a woman running a boutique Etsy shop or a man offering freelance coding services, understanding transaction costs is a fundamental part of business literacy. By using a fee calculator, you can ensure your pricing is accurate and your business remains profitable.
        </p>
      </article>
    </div>
  );
};
