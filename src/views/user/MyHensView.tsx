import React, { useState, useEffect } from 'react';
import { User, UserPackage, DepositRequest } from '../../types';
import { store } from '../../services/store';
import { Egg, Clock, CheckCircle2, AlertCircle, Calendar, Sparkles, ShoppingBag } from 'lucide-react';

interface MyHensViewProps {
  currentUser: User;
  onNavigate: (tab: string) => void;
}

export const MyHensView: React.FC<MyHensViewProps> = ({ currentUser, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'active' | 'pending'>('active');
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
  const expiredPackages = userPackages.filter((p) => p.status === 'expired');

  return (
    <div className="max-w-md mx-auto sm:max-w-7xl px-4 py-5 space-y-5 pb-20">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Egg className="w-6 h-6 text-[#C62828] fill-[#C62828]" />
            <span>My Hen Flocks</span>
          </h1>
          <p className="text-xs text-slate-500">
            Track active egg-producing flocks and pending package purchases
          </p>
        </div>

        <button
          onClick={() => onNavigate('buy-hens')}
          className="px-3.5 py-2 bg-[#C62828] hover:bg-[#B71C1C] text-white font-bold text-xs rounded-2xl shadow-sm transition flex items-center gap-1.5 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add Flock</span>
        </button>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-2 gap-3">
        <div
          onClick={() => setActiveTab('active')}
          className={`p-4 rounded-3xl border shadow-sm transition cursor-pointer flex items-center gap-3 ${
            activeTab === 'active'
              ? 'bg-[#C62828] text-white border-[#B71C1C]'
              : 'bg-white text-slate-900 border-slate-200'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
              activeTab === 'active' ? 'bg-white/20 text-white' : 'bg-red-50 text-[#C62828]'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span
              className={`text-[10px] uppercase font-extrabold tracking-wider block ${
                activeTab === 'active' ? 'text-red-100' : 'text-slate-400'
              }`}
            >
              Active Flocks
            </span>
            <span className="text-xl font-extrabold">{activePackages.length}</span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('pending')}
          className={`p-4 rounded-3xl border shadow-sm transition cursor-pointer flex items-center gap-3 ${
            activeTab === 'pending'
              ? 'bg-[#C62828] text-white border-[#B71C1C]'
              : 'bg-white text-slate-900 border-slate-200'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
              activeTab === 'pending' ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-600'
            }`}
          >
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span
              className={`text-[10px] uppercase font-extrabold tracking-wider block ${
                activeTab === 'pending' ? 'text-red-100' : 'text-slate-400'
              }`}
            >
              Pending Approval
            </span>
            <span className="text-xl font-extrabold">{pendingDeposits.length}</span>
          </div>
        </div>
      </div>

      {/* TAB SWITCHER */}
      <div className="flex bg-slate-200/60 p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
            activeTab === 'active'
              ? 'bg-white text-[#C62828] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Active Flocks ({activePackages.length})
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
            activeTab === 'pending'
              ? 'bg-white text-[#C62828] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Pending Requests ({pendingDeposits.length})
        </button>
      </div>

      {/* ACTIVE FLOCKS CONTENT */}
      {activeTab === 'active' && (
        <div className="space-y-3">
          {activePackages.length > 0 ? (
            activePackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#C62828] border border-amber-200 flex items-center justify-center shrink-0">
                      <Egg className="w-6 h-6 fill-[#C62828]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C62828] bg-red-50 px-2 py-0.5 rounded-md">
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

                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl text-center text-xs">
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
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Expires: {new Date(pkg.expiryDate).toLocaleDateString()}
                  </span>
                  <span className="font-bold text-slate-700">
                    Earned So Far: ${pkg.totalRewardCollected.toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-3 my-4">
              <div className="w-16 h-16 bg-red-50 text-[#C62828] rounded-3xl flex items-center justify-center mx-auto">
                <Egg className="w-8 h-8 fill-[#C62828]" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">No Active Flocks Yet</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                You do not own any active layer hen packages. Purchase a package to start receiving daily egg yield payouts.
              </p>
              <button
                onClick={() => onNavigate('buy-hens')}
                className="px-5 py-2.5 bg-[#C62828] hover:bg-[#B71C1C] text-white font-bold text-xs rounded-2xl transition cursor-pointer"
              >
                Buy Hen Package
              </button>
            </div>
          )}
        </div>
      )}

      {/* PENDING APPROVAL CONTENT */}
      {activeTab === 'pending' && (
        <div className="space-y-3">
          {pendingDeposits.length > 0 ? (
            pendingDeposits.map((dep) => (
              <div
                key={dep.id}
                className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">
                        Deposit / Purchase (${dep.amount})
                      </h4>
                      <p className="text-[11px] font-mono text-slate-500">
                        Ref: {dep.transactionReference}
                      </p>
                    </div>
                  </div>

                  <span className="bg-amber-50 text-amber-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-200">
                    Awaiting Verification
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <span>Method: {dep.paymentMethod.toUpperCase()}</span>
                  <span>Submitted: {new Date(dep.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-3 my-4">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">No Pending Purchases</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                You have no payment receipts currently waiting for admin verification.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
