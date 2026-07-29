import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { User, UserPackage, WalletTransaction } from '../../types';
import {
  Wallet,
  Egg,
  TrendingUp,
  Users,
  Layers,
  ArrowDownRight,
  ArrowUpRight,
  PlusCircle,
  Clock,
  Sparkles,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface UserDashboardProps {
  onNavigate: (tab: string) => void;
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onOpenHarvest: () => void;
}

export const UserDashboardView: React.FC<UserDashboardProps> = ({
  onNavigate,
  onOpenDeposit,
  onOpenWithdraw,
  onOpenHarvest
}) => {
  const [user, setUser] = useState<User>(store.getCurrentUser());
  const [userPackages, setUserPackages] = useState<UserPackage[]>(store.getUserPackages());
  const [transactions, setTransactions] = useState<WalletTransaction[]>(store.getTransactions(user.id));
  const [pendingReward, setPendingReward] = useState(store.getPendingRewardsForUser(user.id));

  useEffect(() => {
    const unsub = store.subscribe(() => {
      const u = store.getCurrentUser();
      setUser(u);
      setUserPackages(store.getUserPackages(u.id));
      setTransactions(store.getTransactions(u.id));
      setPendingReward(store.getPendingRewardsForUser(u.id));
    });
    return unsub;
  }, []);

  const activePackages = userPackages.filter(p => p.status === 'active');
  const expiredPackages = userPackages.filter(p => p.status === 'expired');

  // Calculate daily yield potential across active packages
  const dailyYieldPotential = activePackages.reduce((acc, p) => acc + p.dailyReward, 0);
  const dailyEggCrates = activePackages.reduce((acc, p) => acc + p.eggCratesPerDay, 0);

  // Mock 7-day yield chart data
  const chartData = [
    { day: 'Mon', yield: (dailyYieldPotential * 0.95).toFixed(2), eggs: (dailyEggCrates * 28).toFixed(0) },
    { day: 'Tue', yield: (dailyYieldPotential * 1.0).toFixed(2), eggs: (dailyEggCrates * 30).toFixed(0) },
    { day: 'Wed', yield: (dailyYieldPotential * 1.02).toFixed(2), eggs: (dailyEggCrates * 31).toFixed(0) },
    { day: 'Thu', yield: (dailyYieldPotential * 0.98).toFixed(2), eggs: (dailyEggCrates * 29).toFixed(0) },
    { day: 'Fri', yield: (dailyYieldPotential * 1.05).toFixed(2), eggs: (dailyEggCrates * 32).toFixed(0) },
    { day: 'Sat', yield: (dailyYieldPotential * 1.0).toFixed(2), eggs: (dailyEggCrates * 30).toFixed(0) },
    { day: 'Sun', yield: dailyYieldPotential.toFixed(2), eggs: (dailyEggCrates * 30).toFixed(0) }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-amber-500/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase border border-amber-500/30">
                Investor Dashboard
              </span>
              {user.kycStatus === 'verified' && (
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase border border-emerald-500/30">
                  KYC Verified
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome Back, {user.name} 👋
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Your active poultry coops are yielding Grade-A egg crates daily.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            {pendingReward.totalAmount > 0 && (
              <button
                onClick={onOpenHarvest}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition cursor-pointer animate-pulse"
              >
                <Egg className="w-4 h-4 fill-current" />
                <span>Harvest ${pendingReward.totalAmount.toFixed(2)}</span>
              </button>
            )}

            <button
              onClick={onOpenDeposit}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-600/20 flex items-center gap-1.5 transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Deposit</span>
            </button>

            <button
              onClick={onOpenWithdraw}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition cursor-pointer"
            >
              <span>Withdraw</span>
            </button>
          </div>
        </div>
      </div>

      {/* DASHBOARD SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Wallet Balance */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Wallet Balance</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">${user.walletBalance.toFixed(2)}</div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Available for withdrawal or package purchase</span>
            </span>
          </div>
        </div>

        {/* Card 2: Today's Rewards */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Daily Potential Yield</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Egg className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-emerald-600">${dailyYieldPotential.toFixed(2)} <span className="text-xs font-normal text-slate-400">/day</span></div>
            <span className="text-[11px] text-slate-500 font-medium block mt-1">
              {dailyEggCrates.toFixed(1)} Grade-A Crates produced daily
            </span>
          </div>
        </div>

        {/* Card 3: Total Earnings */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Lifetime Earnings</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">${user.totalEarnings.toFixed(2)}</div>
            <span className="text-[11px] text-slate-500 font-medium block mt-1">
              From egg sales & claims
            </span>
          </div>
        </div>

        {/* Card 4: Referral Income */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Referral Earnings</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">${user.totalReferralEarnings.toFixed(2)}</div>
            <button onClick={() => onNavigate('user-referral')} className="text-[11px] text-amber-600 font-semibold hover:underline flex items-center gap-1 mt-1 cursor-pointer">
              <span>View Referral Network</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* CHART & ACTIVE FLOCKS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Yield Curve Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Weekly Production & Cash Yield</h3>
              <p className="text-slate-500 text-xs">Estimated daily returns based on active flock laying performance</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              100% Laying Efficiency
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="yield" stroke="#059669" strokeWidth={2} fillOpacity={1} fill="url(#colorYield)" name="Yield ($)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Packages Overview */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-base">Active Coops ({activePackages.length})</h3>
              <button onClick={() => onNavigate('marketplace')} className="text-xs text-amber-600 font-bold hover:underline cursor-pointer">
                + Buy More
              </button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {activePackages.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs space-y-2">
                  <Layers className="w-8 h-8 mx-auto text-slate-300" />
                  <p>No active poultry packages.</p>
                  <button onClick={() => onNavigate('marketplace')} className="px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-bold">
                    Acquire Flock
                  </button>
                </div>
              ) : (
                activePackages.map(upkg => (
                  <div key={upkg.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{upkg.packageName}</span>
                      <span className="text-emerald-600">+${upkg.dailyReward.toFixed(2)}/day</span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>{upkg.eggCratesPerDay} Crates/day</span>
                      <span>{upkg.remainingDays} days remaining</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            onClick={() => onNavigate('user-assets')}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition cursor-pointer text-center"
          >
            Manage All Flocks
          </button>
        </div>
      </div>

      {/* RECENT TRANSACTIONS TABLE */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Recent Ledger Activity</h3>
          <button onClick={() => onNavigate('user-wallet')} className="text-xs font-bold text-amber-600 hover:underline cursor-pointer">
            View Wallet History
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3 rounded-l-lg">Type</th>
                <th className="p-3">Description</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3 rounded-r-lg">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.slice(0, 5).map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50/80">
                  <td className="p-3 font-bold capitalize text-slate-800">
                    {tx.type.replace('_', ' ')}
                  </td>
                  <td className="p-3 text-slate-600 max-w-xs truncate">{tx.description}</td>
                  <td className={`p-3 font-bold ${tx.type === 'withdrawal' || tx.type === 'package_purchase' ? 'text-slate-900' : 'text-emerald-600'}`}>
                    {tx.type === 'withdrawal' || tx.type === 'package_purchase' ? '-' : '+'}${tx.amount.toFixed(2)}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      tx.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400 text-[11px]">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
