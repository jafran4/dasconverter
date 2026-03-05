import React, { useState } from 'react';
import { ShoppingCart, ArrowLeft, Info, HelpCircle, Calculator, TrendingUp, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const PLATFORMS = [
  { name: "Shopify", fee: 2.9, fixed: 0.30 },
  { name: "Amazon (FBA)", fee: 15, fixed: 0 },
  { name: "Etsy", fee: 6.5, fixed: 0.20 },
  { name: "eBay", fee: 13.25, fixed: 0.30 },
  { name: "Custom", fee: 0, fixed: 0 }
];

export const EcommerceProfitCalculator = () => {
  const [sellingPrice, setSellingPrice] = useState<string>('');
  const [cogs, setCogs] = useState<string>('');
  const [shippingCost, setShippingCost] = useState<string>('');
  const [marketingCost, setMarketingCost] = useState<string>('');
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [customFee, setCustomFee] = useState<string>('0');
  const [result, setResult] = useState<{ profit: number; margin: number; roi: number; totalFees: number } | null>(null);

  const calculateProfit = () => {
    const price = parseFloat(sellingPrice);
    const cost = parseFloat(cogs) || 0;
    const shipping = parseFloat(shippingCost) || 0;
    const marketing = parseFloat(marketingCost) || 0;
    const feeRate = platform.name === 'Custom' ? parseFloat(customFee) : platform.fee;
    
    if (price > 0) {
      const totalFees = (price * (feeRate / 100)) + platform.fixed;
      const totalCost = cost + shipping + marketing + totalFees;
      const profit = price - totalCost;
      const margin = (profit / price) * 100;
      const roi = (profit / cost) * 100;

      setResult({
        profit: parseFloat(profit.toFixed(2)),
        margin: parseFloat(margin.toFixed(1)),
        roi: parseFloat(roi.toFixed(1)),
        totalFees: parseFloat(totalFees.toFixed(2))
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">eCommerce Profit Calculator</h1>
            <p className="text-zinc-500">Calculate net profit and margins for online selling</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Selling Platform</label>
              <select 
                value={platform.name}
                onChange={(e) => setPlatform(PLATFORMS.find(p => p.name === e.target.value) || PLATFORMS[0])}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              >
                {PLATFORMS.map(p => (
                  <option key={p.name} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Selling Price</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                  <input 
                    type="number" 
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Product Cost (COGS)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                  <input 
                    type="number" 
                    value={cogs}
                    onChange={(e) => setCogs(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Shipping Cost</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                  <input 
                    type="number" 
                    value={shippingCost}
                    onChange={(e) => setShippingCost(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Marketing / Ad Spend</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                  <input 
                    type="number" 
                    value={marketingCost}
                    onChange={(e) => setMarketingCost(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {platform.name === 'Custom' && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Custom Fee Rate (%)</label>
                <input 
                  type="number" 
                  value={customFee}
                  onChange={(e) => setCustomFee(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
              </div>
            )}

            <button 
              onClick={calculateProfit}
              className="w-full py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20"
            >
              Calculate Profit
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
                <div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Net Profit</p>
                  <h2 className="text-6xl font-black text-orange-500">${result.profit}</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <p className="text-xs text-zinc-400 uppercase font-bold mb-1">Profit Margin</p>
                    <p className="text-xl font-bold text-emerald-500">{result.margin}%</p>
                  </div>
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <p className="text-xs text-zinc-400 uppercase font-bold mb-1">ROI</p>
                    <p className="text-xl font-bold text-zinc-900">{result.roi}%</p>
                  </div>
                </div>
                <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                  <p className="text-xs text-zinc-400 uppercase font-bold mb-1">Total Fees</p>
                  <p className="text-xl font-bold text-rose-500">-${result.totalFees}</p>
                </div>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter your selling details to calculate profit</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">eCommerce Profitability: How to Scale Your Online Store</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Running an eCommerce business is more than just selling products; it's about managing margins. Many store owners focus on revenue, but profit is the only metric that truly matters for sustainability.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-500" />
              Understanding COGS
            </h3>
            <p className="text-zinc-600 text-sm">
              Cost of Goods Sold (COGS) includes the direct costs of producing or purchasing the goods you sell. This includes manufacturing, materials, and inbound shipping from your supplier.
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              Margin vs. ROI
            </h3>
            <p className="text-zinc-600 text-sm">
              Profit Margin tells you how much of every dollar in sales you keep. ROI (Return on Investment) tells you how much profit you made relative to the cost of the product. Both are critical for growth.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Hidden Costs in eCommerce</h3>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Returns and Refunds:</strong> Always factor in a return rate (usually 5-15% depending on the niche).</li>
          <li><strong>Payment Processing Fees:</strong> Most gateways charge 2.9% + $0.30 per transaction.</li>
          <li><strong>Packaging Materials:</strong> Boxes, tape, and inserts can add up to $0.50 - $2.00 per order.</li>
          <li><strong>Storage Fees:</strong> If you use Amazon FBA or a 3PL, you'll pay monthly storage costs.</li>
        </ul>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">eCommerce for Men and Women</h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          The eCommerce landscape is incredibly diverse. Whether you are selling fashion for women, tech gadgets for men, or baby products for families, the fundamental math of profitability remains the same. Successful sellers, regardless of gender, are those who obsess over their numbers and optimize their supply chain and marketing spend.
        </p>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Global eCommerce Considerations</h3>
        <p className="text-zinc-600 leading-relaxed">
          Selling internationally? Don't forget to account for customs duties, international shipping surcharges, and currency conversion fees. Our calculator provides a solid baseline, but always double-check your local tax and duty requirements when expanding into new countries.
        </p>
      </article>
    </div>
  );
};
