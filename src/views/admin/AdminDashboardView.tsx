import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { ShieldCheck, Users, Wallet, Layers, DollarSign, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [users, setUsers] = useState(store.getAllUsers());
  const [deposits, setDeposits] = useState(store.getDeposits());
  const [withdrawals, setWithdrawals] = useState(store.getWithdrawals());
  const [packages, setPackages] = useState(store.getPackages());
  const settings = store.getSettings();

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setUsers(store.getAllUsers());
      setDeposits(store.getDeposits());
      setWithdrawals(store.getWithdrawals());
      setPackages(store.getPackages());
    });
    return unsub;
  }, []);

  const pendingDeposits = deposits.filter(d => d.status === 'pending');
  const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending');
  const pendingKYC = users.filter(u => u.kycStatus === 'pending');

  const totalAUM = users.reduce((acc, u) => acc + u.walletBalance, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 p-8 rounded-3xl text-white shadow-xl border border-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/30 rounded-full text-purple-200 text-xs font-bold border border-purple-400/30">
            <ShieldCheck className="w-4 h-4" />
            <span>Master Admin Panel</span>
          </div>
          <h1 className="text-3xl font-extrabold">Executive Platform Management</h1>
          <p className="text-slate-300 text-xs">
            Review deposit approvals, withdrawal payouts, package settings, and investor KYC identity compliance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('admin-deposits')}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
          >
            Pending Deposits ({pendingDeposits.length})
          </button>
          <button
            onClick={() => onNavigate('admin-withdrawals')}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
          >
            Pending Payouts ({pendingWithdrawals.length})
          </button>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Total User Wallet Capital</span>
          <div className="text-2xl font-extrabold text-slate-900">${totalAUM.toFixed(2)}</div>
          <span className="text-[11px] text-slate-400">Across {users.length} registered investors</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Pending Deposit Queue</span>
          <div className="text-2xl font-extrabold text-amber-600">{pendingDeposits.length} Requests</div>
          <button onClick={() => onNavigate('admin-deposits')} className="text-[11px] text-amber-600 font-bold hover:underline cursor-pointer">
            Review Receipts →
          </button>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Pending Withdrawal Queue</span>
          <div className="text-2xl font-extrabold text-purple-600">{pendingWithdrawals.length} Requests</div>
          <button onClick={() => onNavigate('admin-withdrawals')} className="text-[11px] text-purple-600 font-bold hover:underline cursor-pointer">
            Review Payouts →
          </button>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Grade-A Egg Crate Index</span>
          <div className="text-2xl font-extrabold text-emerald-600">${settings.eggPricePerCrate.toFixed(2)} / crate</div>
          <button onClick={() => onNavigate('admin-settings')} className="text-[11px] text-slate-500 hover:underline cursor-pointer">
            Adjust Price Index
          </button>
        </div>
      </div>

      {/* Management Navigation Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          onClick={() => onNavigate('admin-users')}
          className="p-4 bg-white border border-slate-200 hover:border-purple-500 rounded-2xl text-center space-y-1 transition cursor-pointer"
        >
          <Users className="w-5 h-5 mx-auto text-purple-600" />
          <span className="font-bold text-xs text-slate-900 block">User Mgmt</span>
        </button>

        <button
          onClick={() => onNavigate('admin-packages')}
          className="p-4 bg-white border border-slate-200 hover:border-purple-500 rounded-2xl text-center space-y-1 transition cursor-pointer"
        >
          <Layers className="w-5 h-5 mx-auto text-amber-600" />
          <span className="font-bold text-xs text-slate-900 block">Packages</span>
        </button>

        <button
          onClick={() => onNavigate('admin-deposits')}
          className="p-4 bg-white border border-slate-200 hover:border-purple-500 rounded-2xl text-center space-y-1 transition cursor-pointer"
        >
          <Wallet className="w-5 h-5 mx-auto text-emerald-600" />
          <span className="font-bold text-xs text-slate-900 block">Deposits</span>
        </button>

        <button
          onClick={() => onNavigate('admin-withdrawals')}
          className="p-4 bg-white border border-slate-200 hover:border-purple-500 rounded-2xl text-center space-y-1 transition cursor-pointer"
        >
          <DollarSign className="w-5 h-5 mx-auto text-rose-600" />
          <span className="font-bold text-xs text-slate-900 block">Withdrawals</span>
        </button>

        <button
          onClick={() => onNavigate('admin-settings')}
          className="p-4 bg-white border border-slate-200 hover:border-purple-500 rounded-2xl text-center space-y-1 transition cursor-pointer"
        >
          <ShieldCheck className="w-5 h-5 mx-auto text-blue-600" />
          <span className="font-bold text-xs text-slate-900 block">Settings</span>
        </button>

        <button
          onClick={() => onNavigate('admin-audit')}
          className="p-4 bg-white border border-slate-200 hover:border-purple-500 rounded-2xl text-center space-y-1 transition cursor-pointer"
        >
          <Clock className="w-5 h-5 mx-auto text-slate-600" />
          <span className="font-bold text-xs text-slate-900 block">Audit Logs</span>
        </button>
      </div>
    </div>
  );
};
