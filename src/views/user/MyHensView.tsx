import React, { useState, useEffect } from 'react';
import { User, UserPackage, DepositRequest } from '../../types';
import { store } from '../../services/store';
import { Clock, CheckCircle2, Egg, Footprints, Calendar, Sparkles, ChevronRight, ShoppingBag } from 'lucide-react';

interface MyHensViewProps {
  currentUser: User;
  onNavigate: (tab: string) => void;
}

export const MyHensView: React.FC<MyHensViewProps> = ({ currentUser, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'active'>('pending');
  const [userPackages, setUserPackages] = useState<UserPackage[]>([]);
  const [pendingDeposits, setPendingDeposits] = useState<DepositRequest[]>([]);

  useEffect(() => {
    const updateData = () => {
      const pkgs = store.getUserPackages(currentUser.id);
      setUserPackages(pkgs);
      const deps = store.getDeposits(currentUser.id).filter((d) => d.status === 'pending');
      setPendingDeposits(deps);
    };
    updateData();
    return store.subscribe(updateData);
  }, [currentUser.id]);

  const activePackages = userPackages.filter((p) => p.status === 'active');

  return (
    <div className="max-w-md mx-auto sm:max-w-xl pb-24 font-['Poppins',sans-serif]">
      {/* 1. CURVED RED TOP HEADER */}
      <div className="bg-gradient-to-b from-[#B71C1C] via-[#C62828] to-[#D32F2F] pt-6 pb-12 px-6 rounded-b-[2.5rem] text-white shadow-lg relative text-center">
        <div className="absolute right-5 top-5">
          <button
            onClick={() => onNavigate('buy-hens')}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs flex items-center justify-center text-white transition cursor-pointer"
            title="Add Hen Flock"
          >
            <Footprints className="w-5 h-5" />
          </button>
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight">My Hens</h1>
        <p className="text-xs text-red-100/90 font-medium mt-1">Your active hen flock</p>
      </div>

      {/* 2. OVERLAPPING STATS CARD */}
      <div className="px-4 -mt-7 relative z-10">
        <div className="bg-white rounded-3xl p-4 shadow-lg border border-slate-100/80 grid grid-cols-2 gap-4 divide-x divide-slate-100">
          {/* Left: Pending Stat */}
          <button
            onClick={() => setActiveTab('pending')}
            className="flex items-center gap-3 pl-2 transition cursor-pointer text-left"
          >
            <div className="w-11 h-11 rounded-2xl bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 leading-none block">
                {pendingDeposits.length}
              </span>
              <span className="text-xs font-extrabold text-slate-400 mt-0.5 block">Pending</span>
            </div>
          </button>

          {/* Right: Active Stat */}
          <button
            onClick={() => setActiveTab('active')}
            className="flex items-center gap-3 pl-4 transition cursor-pointer text-left"
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 leading-none block">
                {activePackages.length}
              </span>
              <span className="text-xs font-extrabold text-slate-400 mt-0.5 block">Active</span>
            </div>
          </button>
        </div>
      </div>

      {/* 3. FILTER TAB TOGGLES */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-2 gap-3 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-[#FF9800] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Pending ({pendingDeposits.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('active')}
            className={`py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'active'
                ? 'bg-[#2E7D32] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Active ({activePackages.length})</span>
          </button>
        </div>
      </div>

      {/* 4. MAIN CONTENT AREA */}
      <div className="px-4 mt-8">
        {/* PENDING TAB CONTENT */}
        {activeTab === 'pending' && (
          <div>
            {pendingDeposits.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                {/* Red Gradient Badge with Clock */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#D32F2F] to-[#880E4F] flex items-center justify-center text-white shadow-xl ring-8 ring-red-100/50">
                  <Clock className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-slate-900">No Pending Hens</h3>
                  <p className="text-xs font-medium text-slate-500">
                    Your pending purchases appear here
                  </p>
                </div>

                <button
                  onClick={() => onNavigate('buy-hens')}
                  className="mt-2 px-6 py-2.5 bg-[#C62828] hover:bg-[#B71C1C] text-white font-extrabold text-xs rounded-2xl shadow-md transition cursor-pointer"
                >
                  Buy Hen Package
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingDeposits.map((dep) => (
                  <div
                    key={dep.id}
                    className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold shrink-0">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-xs">
                            Hen Package Purchase (${dep.amount})
                          </h4>
                          <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                            Ref: {dep.transactionReference}
                          </p>
                        </div>
                      </div>

                      <span className="bg-amber-50 text-amber-700 text-[10px] font-extrabold px-3 py-1 rounded-full border border-amber-200">
                        Awaiting Verification
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                      <span>Method: {dep.paymentMethod.toUpperCase()}</span>
                      <span>Submitted: {new Date(dep.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ACTIVE TAB CONTENT */}
        {activeTab === 'active' && (
          <div>
            {activePackages.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                {/* Red Gradient Badge with Check */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#2E7D32] to-[#1B5E20] flex items-center justify-center text-white shadow-xl ring-8 ring-emerald-100/50">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-slate-900">No Active Hens</h3>
                  <p className="text-xs font-medium text-slate-500">
                    Your active hen flock appears here
                  </p>
                </div>

                <button
                  onClick={() => onNavigate('buy-hens')}
                  className="mt-2 px-6 py-2.5 bg-[#C62828] hover:bg-[#B71C1C] text-white font-extrabold text-xs rounded-2xl shadow-md transition cursor-pointer"
                >
                  Explore Marketplace
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {activePackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-3 hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#C62828] border border-amber-200 flex items-center justify-center shrink-0">
                          <Egg className="w-6 h-6 fill-[#C62828]" />
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C62828] bg-red-50 px-2 py-0.5 rounded-md">
                            {pkg.tier} Tier
                          </span>
                          <h3 className="font-extrabold text-slate-900 text-sm mt-0.5">{pkg.packageName}</h3>
                          <p className="text-[11px] text-slate-500">
                            Purchased: {new Date(pkg.purchaseDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <span className="bg-emerald-50 text-emerald-700 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Producing
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl text-center text-xs border border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Daily Yield</span>
                        <strong className="text-slate-900 font-extrabold">${pkg.dailyReward.toFixed(2)}/day</strong>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Daily Crates</span>
                        <strong className="text-[#C62828] font-extrabold">{pkg.eggCratesPerDay} Crates</strong>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Remaining</span>
                        <strong className="text-slate-900 font-extrabold">{pkg.remainingDays} Days</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Expires: {new Date(pkg.expiryDate).toLocaleDateString()}
                      </span>
                      <span className="font-bold text-slate-700">
                        Total Harvested: ${pkg.totalRewardCollected.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
