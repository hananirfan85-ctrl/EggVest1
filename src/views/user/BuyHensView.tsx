import React, { useState, useEffect } from 'react';
import { PoultryPackage } from '../../types';
import { store } from '../../services/store';
import { CheckoutModal } from '../../components/CheckoutModal';
import { Search, Grid, TrendingUp, Zap, Clock, DollarSign, Wallet, Footprints, CheckCircle2, ShoppingBag } from 'lucide-react';

interface BuyHensViewProps {
  onNavigate: (tab: string) => void;
}

export const BuyHensView: React.FC<BuyHensViewProps> = ({ onNavigate }) => {
  const [packages, setPackages] = useState<PoultryPackage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Entry' | 'Advanced' | 'Elite'>('All');
  const [checkoutPkg, setCheckoutPkg] = useState<PoultryPackage | null>(null);

  useEffect(() => {
    const updateData = () => {
      setPackages(store.getPackages().filter((p) => p.status === 'active'));
    };
    updateData();
    return store.subscribe(updateData);
  }, []);

  // Filter packages
  const filteredPackages = packages.filter((pkg) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Entry') return pkg.tier === 'Starter' || pkg.tier === 'Bronze';
    if (selectedCategory === 'Advanced') return pkg.tier === 'Silver' || pkg.tier === 'Gold';
    if (selectedCategory === 'Elite') return pkg.tier === 'Enterprise';
    return true;
  });

  return (
    <div className="max-w-md mx-auto sm:max-w-xl px-4 py-4 space-y-5 pb-24 font-['Poppins',sans-serif]">
      {/* 1. TOP TITLE */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Hen Marketplace</h1>
      </div>

      {/* 2. RED GRADIENT MARKETPLACE BANNER WITH NETWORK CONSTELLATION PATTERN */}
      <div className="bg-gradient-to-r from-[#B71C1C] via-[#C62828] to-[#D32F2F] rounded-3xl p-5 text-white shadow-lg relative overflow-hidden space-y-5">
        {/* Constellation lines decorative overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="10%" y1="20%" x2="40%" y2="70%" stroke="#FFF" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="40%" y1="70%" x2="80%" y2="30%" stroke="#FFF" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="80%" y1="30%" x2="90%" y2="80%" stroke="#FFF" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="10%" cy="20%" r="3" fill="#FFF" />
            <circle cx="40%" cy="70%" r="4" fill="#FFF" />
            <circle cx="80%" cy="30%" r="3" fill="#FFF" />
            <circle cx="90%" cy="80%" r="4" fill="#FFF" />
          </svg>
        </div>

        <div className="relative z-10 space-y-1">
          <h2 className="text-2xl font-extrabold tracking-tight">Buy Golden Hens</h2>
          <p className="text-xs text-red-100/90 font-medium max-w-xs leading-relaxed">
            Pick a tier and let your hens lay eggs for you around the clock
          </p>
        </div>

        {/* 3 Metric Stats Columns */}
        <div className="relative z-10 grid grid-cols-3 gap-2 pt-1 border-t border-white/20 text-center">
          <div>
            <Grid className="w-4 h-4 text-red-200 mx-auto mb-1" />
            <span className="text-base font-extrabold text-white block leading-none">12</span>
            <span className="text-[10px] font-bold text-red-100/80 uppercase">Hen Tiers</span>
          </div>

          <div>
            <TrendingUp className="w-4 h-4 text-amber-200 mx-auto mb-1" />
            <span className="text-base font-extrabold text-white block leading-none">30.0%</span>
            <span className="text-[10px] font-bold text-red-100/80 uppercase">Daily Yield</span>
          </div>

          <div>
            <Zap className="w-4 h-4 text-amber-300 mx-auto mb-1" />
            <span className="text-base font-extrabold text-white block leading-none">3184x</span>
            <span className="text-[10px] font-bold text-red-100/80 uppercase">Max Power</span>
          </div>
        </div>
      </div>

      {/* 3. CATEGORY PILL SWITCHER */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(['All', 'Entry', 'Advanced', 'Elite'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition cursor-pointer shrink-0 ${
              selectedCategory === cat
                ? 'bg-[#C62828] text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4. PACKAGE CARDS LIST */}
      <div className="space-y-4">
        {filteredPackages.map((pkg, idx) => {
          const tierCode = `T${idx + 1}`;
          const pkrPrice = pkg.price * 280;
          const categoryTag = pkg.tier === 'Starter' || pkg.tier === 'Bronze' ? 'ENTRY' : pkg.tier === 'Enterprise' ? 'ELITE' : 'ADVANCED';

          return (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs relative space-y-4 hover:shadow-md transition"
            >
              {/* Header Info */}
              <div className="flex items-start gap-3">
                {/* Square Icon Container with Tier Tag */}
                <div className="relative shrink-0">
                  <span className="absolute -top-2 -left-1 text-[9px] font-extrabold text-[#C62828] bg-red-50 px-1.5 py-0.2 rounded-md border border-red-200">
                    {tierCode}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-[#C62828] text-white flex items-center justify-center shadow-md">
                    <Footprints className="w-7 h-7" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-sm leading-tight">
                    Lohman · {pkg.name}
                  </h3>
                  <span className="inline-block bg-[#C62828] text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {categoryTag}
                  </span>
                </div>
              </div>

              {/* 3 Metric Stats Columns */}
              <div className="grid grid-cols-3 gap-2 py-1 text-center border-y border-slate-100 text-xs">
                {/* Duration */}
                <div className="space-y-0.5">
                  <div className="flex items-center justify-center text-slate-400 gap-1">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 block">
                    {pkg.durationDays} d
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 block">Duration</span>
                </div>

                {/* Daily Earning */}
                <div className="space-y-0.5">
                  <div className="flex items-center justify-center text-slate-400 gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 block">
                    {pkg.eggCratesPerDay} Eggs
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 block">Daily Earning</span>
                </div>

                {/* Price */}
                <div className="space-y-0.5">
                  <div className="flex items-center justify-center text-slate-400 gap-1">
                    <Wallet className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 block">
                    Rs {pkrPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 block">Price (${pkg.price})</span>
                </div>
              </div>

              {/* BUY HEN BUTTON */}
              <button
                onClick={() => setCheckoutPkg(pkg)}
                className="w-full py-3.5 bg-[#C62828] hover:bg-[#B71C1C] text-white font-extrabold text-xs rounded-2xl shadow-md transition cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Footprints className="w-4 h-4" />
                <span>Buy Hen · Rs {pkrPrice.toLocaleString()} (${pkg.price})</span>
              </button>
            </div>
          );
        })}
      </div>

      {filteredPackages.length === 0 && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
          <p className="text-xs text-slate-500 font-bold">No hen packages match selected category.</p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl"
          >
            Show All Tiers
          </button>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {checkoutPkg && (
        <CheckoutModal
          pkg={checkoutPkg}
          onClose={() => setCheckoutPkg(null)}
          onSuccess={() => {
            setCheckoutPkg(null);
            onNavigate('my-hens');
          }}
        />
      )}
    </div>
  );
};
