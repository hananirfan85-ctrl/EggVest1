import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { Egg, Sparkles, CheckCircle2, DollarSign, ArrowRight } from 'lucide-react';

interface UserRewardsProps {
  onOpenHarvest: () => void;
}

export const UserRewardsView: React.FC<UserRewardsProps> = ({ onOpenHarvest }) => {
  const [pending, setPending] = useState(store.getPendingRewardsForUser());
  const [transactions, setTransactions] = useState(store.getTransactions());

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setPending(store.getPendingRewardsForUser());
      setTransactions(store.getTransactions());
    });
    return unsub;
  }, []);

  const rewardTx = transactions.filter(t => t.type === 'daily_reward');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/30 rounded-full text-amber-100 text-xs font-bold border border-amber-400/30">
            <Egg className="w-4 h-4 fill-amber-300" />
            <span>Daily Harvest Hub</span>
          </div>
          <h1 className="text-3xl font-extrabold">Egg Production Yield Engine</h1>
          <p className="text-amber-100 text-xs max-w-lg">
            Every 24 hours, fresh egg crates harvested from your layer flocks are liquidated into platform cash rewards.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center space-y-3 min-w-[240px]">
          <span className="text-xs text-amber-200 uppercase font-bold block">Available Today</span>
          <div className="text-3xl font-extrabold text-white">${pending.totalAmount.toFixed(2)}</div>
          <button
            onClick={onOpenHarvest}
            disabled={pending.totalAmount <= 0}
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
          >
            {pending.totalAmount > 0 ? `Harvest ${pending.totalCrates.toFixed(1)} Crates Now` : 'Harvested for Today'}
          </button>
        </div>
      </div>

      {/* Reward History Ledger */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Daily Egg Yield Collection Logs</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3 rounded-l-lg">Description</th>
                <th className="p-3">Cash Yield</th>
                <th className="p-3">Status</th>
                <th className="p-3 rounded-r-lg">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rewardTx.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-slate-400">No daily claims yet.</td>
                </tr>
              ) : (
                rewardTx.map(tx => (
                  <tr key={tx.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-800">{tx.description}</td>
                    <td className="p-3 font-bold text-emerald-600">+${tx.amount.toFixed(2)}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{new Date(tx.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
