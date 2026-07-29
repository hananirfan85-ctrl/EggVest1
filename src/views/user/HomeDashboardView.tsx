import React, { useState, useEffect } from 'react';
import { User, UserPackage } from '../../types';
import { store } from '../../services/store';
import {
  Egg,
  TrendingUp,
  Sparkles,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  Check,
  Share2,
  ChevronRight,
  Award,
  Bell,
  Layers,
  Clock,
  ShieldAlert,
  Wallet
} from 'lucide-react';

interface HomeDashboardViewProps {
  currentUser: User;
  onNavigate: (tab: string) => void;
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
}

export const HomeDashboardView: React.FC<HomeDashboardViewProps> = ({
  currentUser,
  onNavigate,
  onOpenDeposit,
  onOpenWithdraw,
}) => {
  const [userPackages, setUserPackages] = useState<UserPackage[]>([]);
  const [pendingReward, setPendingReward] = useState({ totalAmount: 0, totalCrates: 0 });
  const [copiedCode, setCopiedCode] = useState(false);
  const [collectStatus, setCollectStatus] = useState<string | null>(null);

  useEffect(() => {
    const updateData = () => {
      const upkgs = store.getUserPackages(currentUser.id);
      setUserPackages(upkgs);
      setPendingReward(store.getPendingRewardsForUser(currentUser.id));
    };
    updateData();
    return store.subscribe(updateData);
  }, [currentUser.id]);

  // Statistics
  const totalHens = userPackages.reduce((acc, p) => acc + (p.eggCratesPerDay ? Math.round(p.eggCratesPerDay * 35) : 50), 0);
  const activeHensCount = userPackages.filter((p) => p.status === 'active').length;
  const pendingHensCount = store.getDeposits(currentUser.id).filter((d) => d.status === 'pending').length;

  // Collect daily eggs action
  const handleCollect = () => {
    const res = store.claimDailyRewards();
    if (res.success) {
      setCollectStatus(`Harvest Success! +$${res.amountClaimed.toFixed(2)} (${res.cratesHarvested.toFixed(1)} Crates)`);
    } else {
      setCollectStatus(res.message);
    }
    setTimeout(() => setCollectStatus(null), 4000);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(currentUser.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShareReferral = () => {
    const text = `Join EggVest Smart Poultry Investment Platform with my code: ${currentUser.referralCode}! Get automated daily egg yield payouts.`;
    if (navigator.share) {
      navigator.share({ title: 'EggVest Invitation', text, url: window.location.origin });
    } else {
      navigator.clipboard.writeText(text);
      alert('Referral invitation link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-md mx-auto sm:max-w-7xl px-4 py-5 space-y-5 pb-20">
      {/* Top Banner / Announcement Slider */}
      <div className="bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#B71C1C] rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-[#FFB300]/20 rounded-full blur-xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="bg-[#FFB300] text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Smart Yield Active
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Welcome to Egg<span className="text-[#FFB300]">Vest</span>
            </h1>
            <p className="text-xs text-red-100 max-w-lg leading-relaxed">
              Co-invest in automated bio-secure poultry flocks and earn guaranteed daily egg harvest returns credited directly to your wallet.
            </p>
          </div>
          <button
            onClick={() => onNavigate('buy-hens')}
            className="shrink-0 px-4 py-2.5 bg-[#FFB300] hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-2xl shadow-md transition cursor-pointer flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buy Hen Package</span>
          </button>
        </div>
      </div>

      {/* PORTFOLIO CARD */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-red-50 text-[#C62828] flex items-center justify-center font-bold">
              <Egg className="w-5 h-5 fill-[#C62828]" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Portfolio Balance
              </h3>
              <p className="text-lg font-extrabold text-slate-900 leading-none">
                ${currentUser.walletBalance.toFixed(2)}{' '}
                <span className="text-xs font-semibold text-slate-400">USD</span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-semibold block">Total Earnings</span>
            <span className="text-sm font-bold text-emerald-600">
              +${currentUser.totalEarnings.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Collect Daily Eggs Bar */}
        <div className="bg-amber-50/80 border border-[#FFB300]/50 rounded-2xl p-3.5 flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C62828] animate-pulse" />
              <span className="text-xs font-bold text-slate-900">
                Current Pending Harvest
              </span>
            </div>
            <p className="text-xs text-slate-600">
              <strong className="text-[#C62828] font-bold">
                {pendingReward.totalCrates.toFixed(1)} Crates
              </strong>{' '}
              (~${pendingReward.totalAmount.toFixed(2)} USD)
            </p>
          </div>

          <button
            onClick={handleCollect}
            disabled={pendingReward.totalAmount <= 0}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-md ${
              pendingReward.totalAmount > 0
                ? 'bg-[#C62828] hover:bg-[#B71C1C] text-white animate-bounce'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Egg className="w-4 h-4" />
            <span>Collect</span>
          </button>
        </div>

        {collectStatus && (
          <p className="text-xs font-bold text-center text-[#C62828] bg-red-50 p-2 rounded-xl">
            {collectStatus}
          </p>
        )}
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => onNavigate('buy-hens')}
          className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#C62828] transition flex flex-col items-center gap-1.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#C62828] flex items-center justify-center group-hover:scale-110 transition">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-800">Buy Hens</span>
        </button>

        <button
          onClick={onOpenDeposit}
          className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-500 transition flex flex-col items-center gap-1.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition">
            <ArrowDownLeft className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-800">Deposit</span>
        </button>

        <button
          onClick={onOpenWithdraw}
          className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-amber-500 transition flex flex-col items-center gap-1.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition">
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-800">Withdraw</span>
        </button>
      </div>

      {/* STATISTICS GRID */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Hens
          </span>
          <span className="text-lg font-extrabold text-slate-900 mt-0.5 block">
            {totalHens}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Active Flocks
          </span>
          <span className="text-lg font-extrabold text-emerald-600 mt-0.5 block">
            {activeHensCount}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Pending Approval
          </span>
          <span className="text-lg font-extrabold text-amber-600 mt-0.5 block">
            {pendingHensCount}
          </span>
        </div>
      </div>

      {/* REFERRAL CARD */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Referral Program</h3>
              <p className="text-[10px] text-slate-500">Earn 8% Level-1 commission on hen purchases</p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-xl">
            8% Bonus
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Code:</span>
            <span className="font-mono text-sm font-extrabold text-slate-900">
              {currentUser.referralCode}
            </span>
          </div>

          <button
            onClick={handleCopyReferral}
            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl transition cursor-pointer"
            title="Copy Referral Code"
          >
            {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleShareReferral}
            className="p-2.5 bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-2xl transition cursor-pointer"
            title="Share Referral Link"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* LATEST ANNOUNCEMENTS */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-[#C62828]" />
            <span>Latest Announcements</span>
          </h3>
          <button
            onClick={() => onNavigate('notifications')}
            className="text-[11px] text-[#C62828] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#C62828] shrink-0 mt-1.5" />
            <div>
              <h4 className="font-bold text-slate-900">EasyPaisa & JazzCash Instant Deposit Verification</h4>
              <p className="text-slate-500 text-[11px] mt-0.5">
                All manual payment deposits via EasyPaisa and JazzCash are now processed within 5 to 15 minutes.
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-2.5">
            <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
            <div>
              <h4 className="font-bold text-slate-900">Commercial Aviary Expansion Operational</h4>
              <p className="text-slate-500 text-[11px] mt-0.5">
                5,000 new Lohmann Brown layer hens have arrived at Shed Block C delivering stable egg crate yields.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
