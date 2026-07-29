import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';

export const FAQView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "Investment & Returns",
      q: "How are daily rewards generated and calculated?",
      a: "Daily rewards are backed by real commercial egg sales. Each layer flock package represents a defined hen batch producing Grade-A egg crates daily. The harvested eggs are packaged and delivered to supermarket distribution partners at pre-agreed contract prices. The resulting cash yield is credited daily to your platform wallet."
    },
    {
      category: "Investment & Returns",
      q: "When can I claim my daily rewards?",
      a: "Daily egg harvest rewards accumulate every 24 hours. You can click the 'Harvest' button in your investor dashboard to claim rewards into your wallet balance anytime."
    },
    {
      category: "Wallet & Withdrawals",
      q: "What payment methods are supported for deposits and withdrawals?",
      a: "We support direct commercial bank wire transfers, EasyPaisa, JazzCash, and crypto payments. Withdrawals are processed within 1-24 hours upon submission."
    },
    {
      category: "Wallet & Withdrawals",
      q: "Is there a minimum withdrawal threshold or fee?",
      a: "The minimum withdrawal threshold is $20.00. Standard withdrawal processing fee is 2.5% to cover bank clearing and payment gateway charges."
    },
    {
      category: "Farm Security & Insurance",
      q: "What happens if hens get sick or mortality occurs?",
      a: "All OvumYield poultry coops operate under strict ISO-certified biosecurity double-airlock systems with 24/7 veterinary oversight. Additionally, all flocks carry comprehensive avian mortality insurance, ensuring investor capital and projected yields remain 100% protected."
    },
    {
      category: "Referral Program",
      q: "How does the referral commission system work?",
      a: "Our two-tier referral program rewards you with an 8% commission on Level 1 direct investor purchases and a 3% commission on Level 2 indirect referral purchases. Referral commissions are credited instantly to your wallet."
    }
  ];

  const filtered = faqs.filter(f =>
    f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
          Investor Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 text-sm">
          Everything you need to know about poultry co-investment, egg yield payouts, and farm operations.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-lg mx-auto">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search questions e.g. yields, deposits, insurance..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
        />
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filtered.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition shadow-xs"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>{faq.q}</span>
              </div>
              {openIndex === idx ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>

            {openIndex === idx && (
              <div className="px-5 pb-5 pt-1 text-slate-600 text-xs leading-relaxed border-t border-slate-100 bg-slate-50/50">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
