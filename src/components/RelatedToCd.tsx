import React from 'react';
import { Calculator, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

interface RelatedToCdProps {
  toolName: string;
  category: 'Finance' | 'Health' | 'Time' | 'Student' | 'Utility' | 'Pet' | 'Nature' | 'Math' | 'PDF';
}

const RelatedToCd = ({ toolName, category }: RelatedToCdProps) => {
  const getCategoryInfo = () => {
    switch (category) {
      case 'Finance':
        return {
          reason: `Financial planning is a holistic process. While the ${toolName} helps you manage specific financial aspects, a CD (Certificate of Deposit) is a cornerstone of a balanced investment portfolio, offering guaranteed returns that complement your other financial strategies.`,
          iconColor: 'text-emerald-600',
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-100'
        };
      case 'Health':
        return {
          reason: `Maintaining good health is your greatest long-term investment. Just as you use the ${toolName} to track your physical well-being, a CD Calculator helps you plan for the financial stability needed to support a healthy lifestyle and future medical needs.`,
          iconColor: 'text-rose-600',
          bgColor: 'bg-rose-50',
          borderColor: 'border-rose-100'
        };
      case 'Time':
        return {
          reason: `Time is the most critical factor in both scheduling and compound interest. The ${toolName} helps you manage your daily moments, while our CD Calculator demonstrates how those same moments can work for you financially through the power of time and guaranteed growth.`,
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-100'
        };
      case 'Student':
        return {
          reason: `Education is an investment in your future. While the ${toolName} helps you track your academic progress, understanding financial tools like CDs early on can help you manage student loans or save for your post-graduation goals more effectively.`,
          iconColor: 'text-indigo-600',
          bgColor: 'bg-indigo-50',
          borderColor: 'border-indigo-100'
        };
      case 'Pet':
        return {
          reason: `Responsible pet ownership involves both emotional and financial commitment. While the ${toolName} helps you care for your furry friends, a CD Calculator helps you build the emergency fund or long-term savings needed to ensure their lifelong health and happiness.`,
          iconColor: 'text-amber-600',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-100'
        };
      case 'Nature':
        return {
          reason: `Just as a tree grows steadily over decades, your wealth grows through the power of compounding. While the ${toolName} helps you understand the natural world, our CD Calculator helps you plan for a future where your financial resources are as robust and enduring as a mature forest.`,
          iconColor: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-100'
        };
      case 'Math':
        return {
          reason: `Mathematics is the language of finance. The principles of calculation you use in the ${toolName} are the same ones that drive compound interest in a CD. Understanding these mathematical relationships empowers you to make smarter financial decisions.`,
          iconColor: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-100'
        };
      case 'PDF':
      case 'Utility':
        return {
          reason: `Every tool in your digital kit serves a purpose in bettering your life. While the ${toolName} solves an immediate need, the CD Calculator helps you solve the long-term need for financial security and wealth preservation.`,
          iconColor: 'text-zinc-600',
          bgColor: 'bg-zinc-50',
          borderColor: 'border-zinc-100'
        };
      default:
        return {
          reason: `Every tool in your digital kit serves a purpose in bettering your life. While the ${toolName} solves an immediate need, the CD Calculator helps you solve the long-term need for financial security and wealth preservation.`,
          iconColor: 'text-zinc-600',
          bgColor: 'bg-zinc-50',
          borderColor: 'border-zinc-100'
        };
    }
  };

  const info = getCategoryInfo();

  return (
    <section className={cn("mt-12 rounded-3xl p-8 md:p-12 shadow-sm border", info.bgColor, info.borderColor)}>
      <div className="flex items-center gap-4 mb-6">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", info.bgColor.replace('50', '100'))}>
          <Calculator className={cn("w-6 h-6", info.iconColor)} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Why {toolName} is Related to CD Calculator</h2>
          <p className={cn("font-medium", info.iconColor.replace('600', '700'))}>Financial Synergy & Long-term Planning</p>
        </div>
      </div>
      
      <div className="prose prose-zinc max-w-none">
        <p className="text-zinc-700 leading-relaxed mb-6">
          {info.reason}
        </p>
        
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center shrink-0 mt-1">
              <Info className="w-5 h-5 text-zinc-400" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900">Ready to grow your savings?</h4>
              <p className="text-sm text-zinc-500">Use our primary tool to calculate your guaranteed returns.</p>
            </div>
          </div>
          <Link 
            to="/cd-calculator"
            className="px-6 py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200 whitespace-nowrap"
          >
            Go to CD Calculator
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedToCd;
