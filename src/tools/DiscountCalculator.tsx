import React, { useState } from 'react';
import { Tag, ArrowLeft, Info, HelpCircle, Percent, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const DiscountCalculator = () => {
  const [price, setPrice] = useState<string>('');
  const [discount, setDiscount] = useState<string>('');
  const [tax, setTax] = useState<string>('0');
  const [result, setResult] = useState<{ savings: number; finalPrice: number; taxAmount: number } | null>(null);

  const calculateDiscount = () => {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    const t = parseFloat(tax) || 0;
    
    if (p > 0 && d >= 0) {
      const savings = p * (d / 100);
      const discountedPrice = p - savings;
      const taxAmount = discountedPrice * (t / 100);
      const finalPrice = discountedPrice + taxAmount;

      setResult({
        savings: parseFloat(savings.toFixed(2)),
        finalPrice: parseFloat(finalPrice.toFixed(2)),
        taxAmount: parseFloat(taxAmount.toFixed(2))
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
          <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center">
            <Tag className="w-6 h-6 text-rose-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Discount Calculator</h1>
            <p className="text-zinc-500">Calculate sale prices and total savings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Original Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Discount (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Tax (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={tax}
                    onChange={(e) => setTax(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">%</span>
                </div>
              </div>
            </div>

            <button 
              onClick={calculateDiscount}
              className="w-full py-4 bg-rose-500 text-white font-bold rounded-2xl hover:bg-rose-600 transition-all active:scale-[0.98] shadow-lg shadow-rose-500/20"
            >
              Calculate Savings
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
                <div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Final Price</p>
                  <h2 className="text-6xl font-black text-rose-500">${result.finalPrice}</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <p className="text-xs text-zinc-400 uppercase font-bold mb-1">You Save</p>
                    <p className="text-xl font-bold text-emerald-500">${result.savings}</p>
                  </div>
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <p className="text-xs text-zinc-400 uppercase font-bold mb-1">Tax Amount</p>
                    <p className="text-xl font-bold text-zinc-900">${result.taxAmount}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter price and discount to see your savings</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">Mastering Sales: How to Use a Discount Calculator</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Shopping during a sale can be exhilarating, but doing mental math to figure out the final price isn't always fun. A discount calculator is an essential tool for savvy shoppers and business owners alike.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Percent className="w-5 h-5 text-rose-500" />
              Percentage Off vs. Fixed Amount
            </h3>
            <p className="text-zinc-600 text-sm">
              Most sales use percentages (e.g., "30% off"). Our calculator handles these easily, showing you exactly how much you're saving in dollars and cents.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-500" />
              Don't Forget the Tax
            </h3>
            <p className="text-zinc-600 text-sm">
              The "sticker price" isn't always what you pay at the register. By including a tax percentage, you can see the true final cost of your purchase.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">How to Calculate Discounts Manually</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          If you don't have a calculator handy, here's the simple formula:
        </p>
        <div className="bg-zinc-900 text-zinc-100 p-6 rounded-2xl font-mono text-sm mb-8">
          Discount Amount = Original Price × (Discount % / 100)<br/>
          Final Price = Original Price - Discount Amount
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Shopping Tips for Maximum Savings</h3>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Stacking Discounts:</strong> Some stores allow you to use a coupon on top of a sale price. Calculate the first discount, then apply the second to the new total.</li>
          <li><strong>Compare Unit Prices:</strong> Sometimes a 50% discount on a small item is still more expensive than a full-priced bulk item.</li>
          <li><strong>Check the "Original" Price:</strong> Some retailers raise prices right before a sale to make the discount look bigger.</li>
        </ul>
      </article>
    </div>
  );
};
