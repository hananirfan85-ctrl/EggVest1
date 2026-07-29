import React from 'react';
import { Egg, ArrowRight, Wallet, CheckCircle2, RefreshCw, BarChart3 } from 'lucide-react';

interface HowItWorksProps {
  onNavigate: (tab: string) => void;
}

export const HowItWorksView: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
          Step-By-Step Investment Cycle
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          How Egg Yield Co-Investment Works
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          From coop package selection to daily egg collection and wallet payouts, experience a transparent, asset-backed investment lifecycle.
        </p>
      </div>

      <div className="space-y-12">
        {/* Step 1 */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-1 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-2xl flex items-center justify-center">
              01
            </div>
          </div>
          <div className="md:col-span-7 space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Select Investment Tier</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Browse our verified layer flock packages ranging from 50-hen Starter units to 5,000-hen Mega Industrial Divisions. Each package outlines exact daily egg crate production and daily dollar rewards.
            </p>
          </div>
          <div className="md:col-span-4 text-center">
            <button onClick={() => onNavigate('marketplace')} className="px-5 py-2.5 bg-amber-600 text-white font-bold text-xs rounded-xl hover:bg-amber-700 transition cursor-pointer">
              Explore Packages
            </button>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-1 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-2xl flex items-center justify-center">
              02
            </div>
          </div>
          <div className="md:col-span-7 space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Fund Wallet & Batch Deployment</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Deposit funds using direct bank transfer, EasyPaisa, or JazzCash. Upon admin verification, your flock batch is assigned to an active bio-secure climate shed.
            </p>
          </div>
          <div className="md:col-span-4 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>Instant Batch Allocation</span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-1 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-2xl flex items-center justify-center">
              03
            </div>
          </div>
          <div className="md:col-span-7 space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Daily Egg Harvest & Sales</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Every 24 hours, eggs are gathered via automated conveyor lines, graded, and distributed to commercial supermarket partners at fixed contract rates.
            </p>
          </div>
          <div className="md:col-span-4 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-200">
              <Egg className="w-4 h-4" />
              <span>Grade-A Egg Crates</span>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-1 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-2xl flex items-center justify-center">
              04
            </div>
          </div>
          <div className="md:col-span-7 space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Claim Daily Payouts or Compound</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Collect cash yields daily into your wallet balance. Withdraw to your bank account anytime or compound your earnings to buy additional flock Starter units.
            </p>
          </div>
          <div className="md:col-span-4 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-200">
              <Wallet className="w-4 h-4" />
              <span>Withdraw / Compound</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
