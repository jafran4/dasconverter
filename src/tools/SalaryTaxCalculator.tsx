import React, { useState } from 'react';
import { Wallet, ArrowLeft, Info, HelpCircle, Calculator, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const COUNTRIES = [
  { name: "United States", currency: "$", code: "USD" },
  { name: "United Kingdom", currency: "£", code: "GBP" },
  { name: "India", currency: "₹", code: "INR" },
  { name: "Bangladesh", currency: "৳", code: "BDT" },
  { name: "Pakistan", currency: "₨", code: "PKR" },
  { name: "Canada", currency: "$", code: "CAD" },
  { name: "Australia", currency: "$", code: "AUD" }
];

export const SalaryTaxCalculator = () => {
  const [salary, setSalary] = useState<string>('');
  const [period, setPeriod] = useState<'yearly' | 'monthly'>('yearly');
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [result, setResult] = useState<{ gross: number; tax: number; net: number; rate: number } | null>(null);

  const calculateTax = () => {
    const s = parseFloat(salary);
    if (!(s > 0)) return;

    const yearlySalary = period === 'yearly' ? s : s * 12;
    let tax = 0;

    // Simplified Tax Logic for demonstration (Actual tax laws are much more complex)
    if (country.name === "United States") {
      // Very simplified US Federal brackets (Single filer)
      if (yearlySalary <= 11600) tax = yearlySalary * 0.10;
      else if (yearlySalary <= 47150) tax = 1160 + (yearlySalary - 11600) * 0.12;
      else if (yearlySalary <= 100525) tax = 5426 + (yearlySalary - 47150) * 0.22;
      else tax = 17168 + (yearlySalary - 100525) * 0.24;
    } else if (country.name === "United Kingdom") {
      // UK 2024/25 brackets
      const personalAllowance = 12570;
      if (yearlySalary > personalAllowance) {
        const taxable = yearlySalary - personalAllowance;
        if (taxable <= 37700) tax = taxable * 0.20;
        else if (taxable <= 125140) tax = 7540 + (taxable - 37700) * 0.40;
        else tax = 42516 + (taxable - 125140) * 0.45;
      }
    } else if (country.name === "India") {
      // India New Tax Regime (Simplified)
      if (yearlySalary <= 300000) tax = 0;
      else if (yearlySalary <= 600000) tax = (yearlySalary - 300000) * 0.05;
      else if (yearlySalary <= 900000) tax = 15000 + (yearlySalary - 600000) * 0.10;
      else if (yearlySalary <= 1200000) tax = 45000 + (yearlySalary - 900000) * 0.15;
      else tax = 90000 + (yearlySalary - 1200000) * 0.20;
    } else {
      // Default fallback: 20% flat tax for other countries in this demo
      tax = yearlySalary * 0.20;
    }

    const net = yearlySalary - tax;
    const rate = (tax / yearlySalary) * 100;

    setResult({
      gross: Math.round(yearlySalary),
      tax: Math.round(tax),
      net: Math.round(net),
      rate: parseFloat(rate.toFixed(1))
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Salary Tax Calculator</h1>
            <p className="text-zinc-500">Calculate take-home pay after income tax</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Country</label>
              <select 
                value={country.name}
                onChange={(e) => setCountry(COUNTRIES.find(c => c.name === e.target.value) || COUNTRIES[0])}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all"
              >
                {COUNTRIES.map(c => (
                  <option key={c.name} value={c.name}>{c.name} ({c.currency})</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Gross Salary</label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">{country.currency}</span>
                  <input 
                    type="number" 
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all"
                  />
                </div>
                <select 
                  value={period}
                  onChange={(e) => setPeriod(e.target.value as any)}
                  className="px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all font-bold text-sm"
                >
                  <option value="yearly">Yearly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <button 
              onClick={calculateTax}
              className="w-full py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-lg shadow-zinc-900/20"
            >
              Calculate Take-Home Pay
            </button>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
                <div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Yearly Take-Home</p>
                  <h2 className="text-6xl font-black text-zinc-900">{country.currency}{result.net.toLocaleString()}</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm flex justify-between items-center">
                    <p className="text-xs text-zinc-400 uppercase font-bold">Monthly Net</p>
                    <p className="text-lg font-bold text-zinc-900">{country.currency}{Math.round(result.net / 12).toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm flex justify-between items-center">
                    <p className="text-xs text-zinc-400 uppercase font-bold">Total Tax ({result.rate}%)</p>
                    <p className="text-lg font-bold text-rose-500">-{country.currency}{result.tax.toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-zinc-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Enter your salary to see your take-home pay</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Blog Section */}
      <article className="prose prose-zinc max-w-none bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">Income Tax Guide: Understanding Your Salary and Take-Home Pay</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">
          Income tax is a type of tax that governments impose on income generated by businesses and individuals within their jurisdiction. By law, taxpayers must file an income tax return annually to determine their tax obligations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-zinc-900" />
              Progressive Tax Systems
            </h3>
            <p className="text-zinc-600 text-sm">
              Most countries use a progressive tax system, where higher income earners pay a higher percentage of their income in tax. This is achieved through "tax brackets."
            </p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-zinc-900" />
              Gross vs. Net Salary
            </h3>
            <p className="text-zinc-600 text-sm">
              Gross salary is the total amount you earn before any deductions. Net salary, also known as take-home pay, is the amount you actually receive in your bank account after taxes and other deductions.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">How to Reduce Your Taxable Income</h3>
        <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-8">
          <li><strong>Retirement Contributions:</strong> Contributing to a 401(k) or Pension can reduce your taxable income.</li>
          <li><strong>Charitable Donations:</strong> Many countries allow you to deduct donations to registered charities.</li>
          <li><strong>Business Expenses:</strong> If you are self-employed, you can deduct legitimate business expenses.</li>
          <li><strong>Tax Credits:</strong> Look for credits related to children, education, or energy-efficient home improvements.</li>
        </ul>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4">Salary Tax for Men and Women</h3>
        <p className="text-zinc-600 leading-relaxed">
          While tax laws are gender-neutral, the "gender pay gap" often means that men and women fall into different tax brackets on average. Understanding your tax obligations is a key part of financial independence. Whether you are a man or a woman, knowing how much of your hard-earned money you get to keep is essential for budgeting and long-term financial planning.
        </p>
      </article>
    </div>
  );
};
