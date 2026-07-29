import React, { useState } from 'react';
import { store } from '../../services/store';
import { PoultryPackage } from '../../types';
import { Egg, CheckCircle2, ArrowRight, Filter, Sparkles, ShieldCheck } from 'lucide-react';

interface MarketplaceProps {
  onSelectPackage: (pkg: PoultryPackage) => void;
  onOpenDeposit: () => void;
}

export const PackagesMarketplaceView: React.FC<MarketplaceProps> = ({ onSelectPackage, onOpenDeposit }) => {
  const packages = store.getPackages();
  const [selectedTier, setSelectedTier] = useState<string>('all');

  const filtered = selectedTier === 'all'
    ? packages
    : packages.filter(p => p.tier.toLowerCase() === selectedTier.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
          Package Marketplace
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Commercial Poultry Investment Packages
        </h1>
        <p className="text-slate-600 text-sm">
          Select an investment package backed by live layer hen flocks producing Grade-A eggs daily.
        </p>
      </div>

      {/* Tier Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {['all', 'Starter', 'Bronze', 'Silver', 'Gold', 'Enterprise'].map((tier) => (
          <button
            key={tier}
            onClick={() => setSelectedTier(tier)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer capitalize ${
              selectedTier === tier
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tier === 'all' ? 'All Packages' : `${tier} Tier`}
          </button>
        ))}
      </div>

      {/* Package Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition duration-300 flex flex-col justify-between"
          >
            <div className="relative h-52 overflow-hidden">
              <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                Tier: {pkg.tier}
              </div>
              <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                {pkg.dailyRewardRate}% Daily ROI
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">{pkg.description}</p>
              </div>

              {/* Stats Box */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Flock Size</span>
                  <strong className="text-slate-900">{pkg.flockSize} Hens</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Daily Yield</span>
                  <strong className="text-emerald-600">${pkg.dailyAmount.toFixed(2)} / day</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Egg Crates</span>
                  <strong className="text-slate-900">{pkg.eggCratesPerDay} Crates/day</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Cycle Duration</span>
                  <strong className="text-slate-900">{pkg.durationDays} Days</strong>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                {pkg.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Price & Buy Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Price</span>
                  <span className="text-2xl font-extrabold text-slate-900">${pkg.price}</span>
                </div>
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                >
                  Acquire Package
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
