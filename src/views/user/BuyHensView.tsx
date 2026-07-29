import React, { useState, useEffect } from 'react';
import { PoultryPackage } from '../../types';
import { store } from '../../services/store';
import { CheckoutModal } from '../../components/CheckoutModal';
import { Search, Filter, ShoppingBag, Sparkles, CheckCircle2, Egg, Clock } from 'lucide-react';

interface BuyHensViewProps {
  onNavigate: (tab: string) => void;
}

export const BuyHensView: React.FC<BuyHensViewProps> = ({ onNavigate }) => {
  const [packages, setPackages] = useState<PoultryPackage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Entry' | 'Advanced' | 'Elite'>('All');
  const [checkoutPkg, setCheckoutPkg] = useState<PoultryPackage | null>(null);

  useEffect(() => {
    const updateData = () => {
      setPackages(store.getPackages().filter((p) => p.status === 'active'));
    };
    updateData();
    return store.subscribe(updateData);
  }, []);

  // Filtering
  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === 'All') return matchesSearch;
    if (selectedCategory === 'Entry') return matchesSearch && (pkg.tier === 'Starter' || pkg.tier === 'Bronze');
    if (selectedCategory === 'Advanced') return matchesSearch && (pkg.tier === 'Silver' || pkg.tier === 'Gold');
    if (selectedCategory === 'Elite') return matchesSearch && pkg.tier === 'Enterprise';

    return matchesSearch;
  });

  return (
    <div className="max-w-md mx-auto sm:max-w-7xl px-4 py-5 space-y-5 pb-20">
      {/* Header Bar */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-[#C62828]" />
          <span>Buy Hen Packages</span>
        </h1>
        <p className="text-xs text-slate-500">
          Co-invest in high-yield commercial layer hen flocks for daily egg payouts
        </p>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hen packages by name or size..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-[#C62828] focus:outline-none shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {(['All', 'Entry', 'Advanced', 'Elite'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#C62828] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'All' ? 'All Packages' : `${cat} Tier`}
            </button>
          ))}
        </div>
      </div>

      {/* PACKAGE CARDS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition group"
          >
            {/* Image Header */}
            <div className="relative h-44 overflow-hidden bg-slate-100">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="bg-[#C62828] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-xl shadow-xs uppercase tracking-wider">
                  {pkg.tier}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
                <div>
                  <h3 className="font-extrabold text-base leading-tight drop-shadow-sm">{pkg.name}</h3>
                  <p className="text-[11px] text-amber-200 font-semibold">{pkg.flockSize} Layer Hens</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-300 block">Price</span>
                  <span className="text-lg font-extrabold text-white">${pkg.price}</span>
                </div>
              </div>
            </div>

            {/* Body Info */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {pkg.description}
              </p>

              {/* Yield & Duration Metrics */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl text-center text-xs border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Daily Payout</span>
                  <strong className="text-slate-900 font-extrabold">${pkg.dailyAmount.toFixed(2)}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Daily Crates</span>
                  <strong className="text-[#C62828] font-extrabold">{pkg.eggCratesPerDay}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Duration</span>
                  <strong className="text-slate-900 font-extrabold">{pkg.durationDays} Days</strong>
                </div>
              </div>

              {/* Features bullets */}
              <ul className="space-y-1.5 text-xs text-slate-700">
                {pkg.features.slice(0, 3).map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Buy Action */}
              <button
                onClick={() => setCheckoutPkg(pkg)}
                className="w-full py-3 bg-[#C62828] hover:bg-[#B71C1C] text-white font-extrabold text-xs rounded-2xl shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buy Package (${pkg.price})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
          <p className="text-xs text-slate-500 font-bold">No packages match your search filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl"
          >
            Reset Search
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
