import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { UserPackage } from '../../types';
import { Layers, Egg, Clock, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface UserAssetsProps {
  onNavigate: (tab: string) => void;
  onOpenHarvest: () => void;
}

export const UserAssetsView: React.FC<UserAssetsProps> = ({ onNavigate, onOpenHarvest }) => {
  const [userPackages, setUserPackages] = useState<UserPackage[]>(store.getUserPackages());
  const pending = store.getPendingRewardsForUser();

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setUserPackages(store.getUserPackages());
    });
    return unsub;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Layer Hen Assets & Coops</h1>
          <p className="text-slate-500 text-xs mt-1">Monitor active flocks, daily egg crate yields, and contract expiry</p>
        </div>

        <div className="flex items-center gap-3">
          {pending.totalAmount > 0 && (
            <button
              onClick={onOpenHarvest}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Egg className="w-4 h-4 fill-current" />
              <span>Harvest Today (${pending.totalAmount.toFixed(2)})</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('marketplace')}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
          >
            + Buy Additional Flock
          </button>
        </div>
      </div>

      {/* Package List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userPackages.length === 0 ? (
          <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-slate-200 space-y-3">
            <Layers className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800">No Poultry Packages Acquired Yet</h3>
            <p className="text-slate-500 text-xs max-w-sm mx-auto">
              Start earning daily passive returns from commercial egg sales by choosing a layer flock package.
            </p>
            <button onClick={() => onNavigate('marketplace')} className="px-5 py-2.5 bg-amber-600 text-white font-bold text-xs rounded-xl">
              Browse Marketplace
            </button>
          </div>
        ) : (
          userPackages.map(upkg => (
            <div key={upkg.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Tier: {upkg.tier}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{upkg.packageName}</h3>
                </div>
                <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${
                  upkg.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {upkg.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Purchase Price</span>
                  <strong className="text-slate-900">${upkg.purchasePrice}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Daily Cash Yield</span>
                  <strong className="text-emerald-600">${upkg.dailyReward.toFixed(2)}/day</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Egg Crates</span>
                  <strong className="text-slate-900">{upkg.eggCratesPerDay} Crates/day</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Cycle Remaining</span>
                  <strong className="text-amber-700">{upkg.remainingDays} / {upkg.durationDays} Days</strong>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-600 pt-2 border-t border-slate-100">
                <span>Total Yield Harvested: <strong className="text-emerald-600">${upkg.totalRewardCollected.toFixed(2)}</strong></span>
                <span className="text-slate-400 text-[11px]">Activated: {upkg.activationDate}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
