import React, { useState, useEffect } from 'react';
import { User, UserPackage } from '../../types';
import { store } from '../../services/store';
import {
  Egg,
  Sparkles,
  ShoppingBag,
  ArrowUpRight,
  Copy,
  Check,
  Share2,
  ChevronRight,
  Bell,
  Eye,
  EyeOff,
  Info,
  Link,
  CheckCircle2,
  Clock,
  ChevronLeft,
  Award
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
  const [showBalance, setShowBalance] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const updateData = () => {
      const upkgs = store.getUserPackages(currentUser.id);
      setUserPackages(upkgs);
      setPendingReward(store.getPendingRewardsForUser(currentUser.id));
    };
    updateData();
    return store.subscribe(updateData);
  }, [currentUser.id]);

  // Calculated metrics
  const totalHens = userPackages.reduce((acc, p) => acc + (p.eggCratesPerDay ? Math.round(p.eggCratesPerDay * 35) : 50), 0);
  const activeHensCount = userPackages.filter((p) => p.status === 'active').length;
  const pendingHensCount = store.getDeposits(currentUser.id).filter((d) => d.status === 'pending').length;

  // Collect daily eggs action
  const handleCollect = () => {
    const res = store.claimDailyRewards();
    if (res.success) {
      setCollectStatus(`+${res.cratesHarvested.toFixed(1)} Eggs Claimed ($${res.amountClaimed.toFixed(2)})`);
    } else {
      setCollectStatus(res.message);
    }
    setTimeout(() => setCollectStatus(null), 3500);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(currentUser.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShareReferral = () => {
    const text = `Join EggVest Smart Poultry Investment Platform with my code: ${currentUser.referralCode}! Get automated daily egg yield payouts.`;
    if (navigator.share) {
      navigator.share({ title: 'EggVest Referral', text, url: window.location.origin });
    } else {
      navigator.clipboard.writeText(text);
      alert('Referral invitation link copied to clipboard!');
    }
  };

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'GOOD MORNING';
    if (hour < 18) return 'GOOD AFTERNOON';
    return 'GOOD EVENING';
  };

  const networkBanners = [
    {
      id: 1,
      title: 'REFER & EARN',
      subtitle: 'Share Happiness, Earn Rewards!',
      badge: 'Get 2 Eggs FREE!',
      desc: 'Invite friends, earn 8% commission on every hen package purchased.',
      bg: 'from-[#B71C1C] via-[#C62828] to-[#D32F2F]',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      title: 'EggVest Poultry',
      subtitle: 'Start Your Smart Farming Journey',
      badge: 'Smarter Farming, Better Yields',
      desc: 'Healthy Hens, Happy Life. Daily fresh eggs harvested automatically.',
      bg: 'from-[#880E4F] via-[#C62828] to-[#E53935]',
      image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="max-w-md mx-auto sm:max-w-xl px-4 py-4 space-y-5 pb-24 font-['Poppins',sans-serif]">
      {/* 1. TOP USER GREETING BAR */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('profile')}
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-xs p-0.5 flex items-center justify-center shrink-0">
            <img
              src={
                currentUser.avatar ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
              }
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div>
            <span className="text-[10px] font-extrabold tracking-widest text-slate-400 block uppercase leading-tight">
              {getGreeting()}
            </span>
            <h2 className="text-base font-extrabold text-slate-900 group-hover:text-[#C62828] transition">
              {currentUser.name}
            </h2>
          </div>
        </button>

        <button
          onClick={() => onNavigate('notifications')}
          className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-800 hover:bg-slate-50 transition cursor-pointer relative"
          title="Notifications"
        >
          <Bell className="w-5 h-5 text-slate-900" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#C62828] animate-pulse" />
        </button>
      </div>

      {/* 2. RED PORTFOLIO VALUE CARD WITH ATTACHED STAT PILLARS */}
      <div className="space-y-2">
        <div className="bg-gradient-to-r from-[#B71C1C] via-[#C62828] to-[#D32F2F] rounded-3xl p-5 text-white shadow-lg relative overflow-hidden space-y-4">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-100/90">
              PORTFOLIO VALUE
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer text-white/90"
              >
                {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => alert('Portfolio value shows your total collected and daily pending harvest eggs.')}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer text-white/90"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main metrics & Collect Button */}
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {showBalance ? Math.round(pendingReward.totalCrates * 30) : '••••'}
                </span>
                <span className="text-sm font-extrabold text-red-100 uppercase tracking-wider">
                  EGGS
                </span>
              </div>
              <p className="text-xs text-red-100/90 font-medium">
                ~~ ≈ Rs {showBalance ? (currentUser.walletBalance * 280).toLocaleString() : '••••'} estimated value
              </p>
            </div>

            {/* Circular Collect Button */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-4 border-white/90 bg-white/20 p-1 flex items-center justify-center shadow-lg">
                <button
                  onClick={handleCollect}
                  className="w-full h-full rounded-full bg-[#C62828] hover:bg-[#A71C1C] text-white flex flex-col items-center justify-center transition cursor-pointer active:scale-95 shadow-md group"
                >
                  <Egg className="w-5 h-5 fill-white group-hover:scale-110 transition" />
                  <span className="text-[11px] font-extrabold tracking-wide uppercase mt-0.5">
                    Collect
                  </span>
                </button>
              </div>
            </div>
          </div>

          {collectStatus && (
            <div className="bg-white/20 backdrop-blur-xs text-white text-xs font-bold p-2 rounded-xl text-center border border-white/30 animate-in fade-in">
              {collectStatus}
            </div>
          )}
        </div>

        {/* 3 Attached Bottom Stat Boxes */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Stat 1: Total Hens */}
          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex flex-col items-center text-center space-y-1">
            <div className="w-7 h-7 rounded-full bg-red-50 text-[#C62828] flex items-center justify-center font-bold">
              <Egg className="w-4 h-4 fill-[#C62828]" />
            </div>
            <span className="text-base font-extrabold text-slate-900 leading-none">
              {totalHens}
            </span>
            <span className="text-[10px] font-bold text-slate-400">Total Hens</span>
          </div>

          {/* Stat 2: Active */}
          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex flex-col items-center text-center space-y-1">
            <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-base font-extrabold text-slate-900 leading-none">
              {activeHensCount}
            </span>
            <span className="text-[10px] font-bold text-slate-400">Active</span>
          </div>

          {/* Stat 3: Pending */}
          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex flex-col items-center text-center space-y-1">
            <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-base font-extrabold text-slate-900 leading-none">
              {pendingHensCount}
            </span>
            <span className="text-[10px] font-bold text-slate-400">Pending</span>
          </div>
        </div>
      </div>

      {/* 3. INVITE & EARN CARD */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Link className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-extrabold text-slate-900 leading-tight">Invite & Earn</h3>
            <p className="text-xs font-mono font-bold text-slate-500 truncate mt-0.5">
              {currentUser.referralCode}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyReferral}
            className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition cursor-pointer"
            title="Copy Referral Code"
          >
            {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleShareReferral}
            className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition cursor-pointer"
            title="Share Referral Code"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. QUICK ACTIONS SECTION */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900">Quick Actions</h3>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {/* Action 1: Buy Hens */}
          <button
            onClick={() => onNavigate('buy-hens')}
            className="w-full p-4 hover:bg-slate-50/80 transition flex items-center justify-between cursor-pointer group text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-center shrink-0 p-2">
                <img
                  src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=120&q=80"
                  alt="Hen in Nest"
                  className="w-10 h-10 object-contain rounded-xl"
                />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-[#C62828] transition">
                  Buy Hens
                </h4>
                <p className="text-xs text-slate-500 font-medium">Browse the hen marketplace</p>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition" />
          </button>

          {/* Action 2: Withdraw */}
          <button
            onClick={onOpenWithdraw}
            className="w-full p-4 hover:bg-slate-50/80 transition flex items-center justify-between cursor-pointer group text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50/80 border border-emerald-100 flex items-center justify-center shrink-0 p-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold text-xs">
                  🥚 🥚
                </div>
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-700 transition">
                  Withdraw
                </h4>
                <p className="text-xs text-slate-500 font-medium">Cash out your earnings</p>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </div>

      {/* 5. OUR NETWORK CAROUSEL SECTION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900">Our Network</h3>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? networkBanners.length - 1 : prev - 1))}
              className="p-1 rounded-full text-slate-400 hover:text-slate-900 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev === networkBanners.length - 1 ? 0 : prev + 1))}
              className="p-1 rounded-full text-slate-400 hover:text-slate-900 transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Card */}
        <div className="relative overflow-hidden rounded-3xl shadow-md border border-slate-200 min-h-[160px]">
          {networkBanners.map((banner, index) => (
            <div
              key={banner.id}
              className={`transition-all duration-500 p-5 text-white bg-gradient-to-r ${banner.bg} ${
                index === currentSlide ? 'block opacity-100' : 'hidden opacity-0'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-[65%]">
                  <span className="bg-white/20 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs border border-white/30">
                    {banner.badge}
                  </span>
                  <h4 className="text-base font-extrabold leading-tight">{banner.title}</h4>
                  <p className="text-xs font-bold text-amber-200">{banner.subtitle}</p>
                  <p className="text-[11px] text-red-100/90 leading-relaxed line-clamp-2">
                    {banner.desc}
                  </p>
                </div>

                <div className="w-24 h-24 rounded-2xl bg-white/10 p-1 border border-white/20 shrink-0 overflow-hidden shadow-inner">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Dots Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {networkBanners.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === currentSlide ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
