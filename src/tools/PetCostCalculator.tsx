import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wallet, Calculator, Info, BookOpen, ShoppingCart, Plus, Trash2, CreditCard, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Expense {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'annually';
}

export const PetCostCalculator = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', name: 'Premium Food', amount: 60, frequency: 'monthly' },
    { id: '2', name: 'Vet Visits', amount: 200, frequency: 'annually' },
    { id: '3', name: 'Toys & Treats', amount: 20, frequency: 'monthly' },
    { id: '4', name: 'Pet Insurance', amount: 35, frequency: 'monthly' },
  ]);

  const addExpense = () => {
    setExpenses([...expenses, { id: Math.random().toString(36).substr(2, 9), name: '', amount: 0, frequency: 'monthly' }]);
  };

  const removeExpense = (id: string) => {
    if (expenses.length > 1) {
      setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  const updateExpense = (id: string, field: keyof Expense, value: any) => {
    setExpenses(expenses.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const calculateTotals = () => {
    let monthly = 0;
    expenses.forEach(e => {
      const amt = parseFloat(e.amount.toString()) || 0;
      if (e.frequency === 'monthly') {
        monthly += amt;
      } else {
        monthly += amt / 12;
      }
    });

    return {
      monthly: Math.round(monthly),
      annually: Math.round(monthly * 12)
    };
  };

  const totals = calculateTotals();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-2xl mb-4"
        >
          <Wallet className="w-8 h-8 text-indigo-600" />
        </motion.div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Pet Cost Calculator</h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
          Budget for your furry friend. Calculate the total monthly and annual expenses of owning a pet.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-zinc-900">Expense List</h2>
              <button
                onClick={addExpense}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>

            <div className="space-y-4">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex flex-wrap md:flex-nowrap gap-4 items-end p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <div className="flex-grow">
                    <label className="block text-xs font-medium text-zinc-500 uppercase mb-2">Expense Name</label>
                    <input
                      type="text"
                      value={expense.name}
                      onChange={(e) => updateExpense(expense.id, 'name', e.target.value)}
                      placeholder="e.g. Grooming"
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div className="w-32">
                    <label className="block text-xs font-medium text-zinc-500 uppercase mb-2">Amount ($)</label>
                    <input
                      type="number"
                      value={expense.amount}
                      onChange={(e) => updateExpense(expense.id, 'amount', e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div className="w-32">
                    <label className="block text-xs font-medium text-zinc-500 uppercase mb-2">Frequency</label>
                    <select
                      value={expense.frequency}
                      onChange={(e) => updateExpense(expense.id, 'frequency', e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="annually">Annually</option>
                    </select>
                  </div>
                  <button
                    onClick={() => removeExpense(expense.id)}
                    className="p-2 text-zinc-400 hover:text-rose-500 transition-colors mb-1"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
            <h3 className="text-indigo-900 font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" /> Hidden Costs
            </h3>
            <p className="text-indigo-800/80 leading-relaxed text-sm">
              Don't forget to budget for emergency vet visits, boarding/pet sitting when you travel, and replacing items like beds or leashes. An emergency fund of $500-$1,000 is highly recommended.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100 text-center">
            <h3 className="text-lg font-medium opacity-90 mb-2">Monthly Total</h3>
            <div className="text-5xl font-bold mb-2">${totals.monthly}</div>
            <div className="pt-4 border-t border-white/20">
              <p className="text-sm opacity-90">Annual Total: ${totals.annually}</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
            <h3 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-500" /> Saving Tips
            </h3>
            <ul className="space-y-3 text-sm text-zinc-600">
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                Buy food in bulk for better unit pricing.
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                Preventative care (vaccines, flea/tick) saves money long-term.
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                Groom your pet at home for basic maintenance.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEO & Blog Content */}
      <div className="mt-20 space-y-16">
        <section>
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">Financial Planning for Pet Owners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-indigo-600">Is Pet Insurance Worth It?</h3>
              <p className="text-zinc-600 leading-relaxed">
                Pet insurance can be a lifesaver for unexpected injuries or chronic illnesses. While it's an added monthly cost, it can prevent you from having to make difficult financial decisions during a medical emergency.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-indigo-600">The First-Year Cost</h3>
              <p className="text-zinc-600 leading-relaxed">
                The first year of owning a pet is typically the most expensive. Initial costs include adoption fees, spay/neuter surgery, vaccinations, microchipping, and essential gear like crates and beds.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-zinc-900">Pet Finance Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Budgeting for a New Puppy",
                desc: "A breakdown of the essential costs for the first 12 months of puppy ownership.",
                tag: "Budget"
              },
              {
                title: "How to Save on Vet Bills",
                desc: "Tips for finding affordable care and the importance of preventative medicine.",
                tag: "Savings"
              },
              {
                title: "DIY Pet Toys and Treats",
                desc: "Creative and safe ways to entertain your pet without breaking the bank.",
                tag: "DIY"
              }
            ].map((post, i) => (
              <div key={i} className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 hover:bg-white hover:shadow-md transition-all group">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3 block">{post.tag}</span>
                <h4 className="text-xl font-bold text-zinc-900 mb-2">{post.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{post.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
