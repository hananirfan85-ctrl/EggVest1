import React, { useState } from 'react';
import { store } from '../../services/store';
import { PoultryPackage } from '../../types';
import {
  Egg,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Layers,
  Award,
  Sparkles,
  Users,
  DollarSign,
  PieChart,
  HelpCircle,
  Clock,
  Play
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onSelectPackage: (pkg: PoultryPackage) => void;
  onOpenDeposit: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectPackage, onOpenDeposit }) => {
  const packages = store.getPackages();
  const blogs = store.getBlogs();

  // ROI Calculator state
  const [calcAmount, setCalcAmount] = useState<number>(1000);
  const [calcDuration, setCalcDuration] = useState<number>(120);

  const calcDaily = (calcAmount * 0.015).toFixed(2);
  const calcTotalReturn = (calcAmount * 1.8).toFixed(2);
  const calcNetProfit = (calcAmount * 0.8).toFixed(2);

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-950 via-slate-900 to-slate-950 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>Commercial Poultry Investment & Daily Egg Yield Engine</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Invest in Automated <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-400">
                Poultry Farms & Egg Yields
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Co-own bio-secure layer hen flocks producing Grade-A eggs daily. Enjoy continuous cash payouts from guaranteed supermarket distribution contracts with full veterinary coverage.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => onNavigate('marketplace')}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Browse Investment Packages</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('how-it-works')}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>How It Works</span>
              </button>
            </div>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-center lg:text-left">
              <div>
                <div className="text-2xl font-extrabold text-amber-400">$2.4M+</div>
                <div className="text-xs text-slate-400 font-medium">Active Investor AUM</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-emerald-400">140K+</div>
                <div className="text-xs text-slate-400 font-medium">Daily Egg Crates</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-amber-200">100%</div>
                <div className="text-xs text-slate-400 font-medium">On-Time Payouts</div>
              </div>
            </div>
          </div>

          {/* Right Card / Interactive Preview */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-amber-500/20 rounded-2xl p-6 shadow-2xl space-y-5 relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Egg className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Live Coop Production Feed</h3>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Climate Shed #04 Active
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono bg-slate-800 text-amber-300 px-2.5 py-1 rounded-lg">
                  Tier: Gold
                </span>
              </div>

              {/* Stats Box */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium block">Active Hens</span>
                  <span className="text-xl font-extrabold text-white">1,500 Layers</span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium block">Daily Egg Crates</span>
                  <span className="text-xl font-extrabold text-emerald-400">42 Crates/Day</span>
                </div>
              </div>

              <div className="bg-amber-950/40 border border-amber-500/30 p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 block">Daily Expected Reward</span>
                  <span className="text-2xl font-extrabold text-white">$51.00 <span className="text-xs font-normal text-slate-400">/ day</span></span>
                </div>
                <button
                  onClick={() => onSelectPackage(packages[3] || packages[0])}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition cursor-pointer"
                >
                  Acquire Coop
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Fully insured against hen mortality & Newcastle Disease</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY POULTRY INVESTMENT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Backed By Tangible Assets
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Invest in Commercial Egg Production?
          </h2>
          <p className="text-slate-600 text-sm">
            Eggs represent one of the world's most resilient consumer commodities with stable, inflation-hedged daily cash flow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Daily Inelastic Demand</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Eggs are consumed daily in households, bakeries, and restaurants worldwide regardless of broader market fluctuations, providing steady revenue.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Automated Daily Cash Yields</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Egg production occurs every 24 hours. Daily sales payouts are automatically credited directly to your platform wallet balance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Bio-Secure & Insured Operations</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              All coops employ climate control, automated feeding, veterinary monitoring, and full mortality insurance to protect investor capital.
            </p>
          </div>
        </div>
      </section>

      {/* INVESTMENT PACKAGES MARKETPLACE FEATURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Featured Flocks
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Select Your Poultry Investment Package
            </h2>
          </div>
          <button
            onClick={() => onNavigate('marketplace')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.slice(0, 3).map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition duration-300 flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Tier: {pkg.tier}
                </div>
                <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                  {pkg.dailyRewardRate}% Daily ROI
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                  <p className="text-slate-500 text-xs mt-1 leading-snug">{pkg.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Flock Size</span>
                    <strong className="text-slate-800">{pkg.flockSize} Hens</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Daily Yield</span>
                    <strong className="text-emerald-600">${pkg.dailyAmount.toFixed(2)}/day</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Duration</span>
                    <strong className="text-slate-800">{pkg.durationDays} Days</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Total Return</span>
                    <strong className="text-amber-600">${pkg.totalAmount.toFixed(2)} ({pkg.totalReturn}%)</strong>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Price</span>
                    <span className="text-2xl font-extrabold text-slate-900">${pkg.price}</span>
                  </div>
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
                  >
                    Invest Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* YIELD CALCULATOR INTERACTIVE TOOL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950 rounded-3xl p-8 sm:p-12 text-white border border-amber-500/20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                Interactive ROI Tool
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Calculate Your Egg Production Returns
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Adjust your investment capital to project expected daily egg crate harvests, daily dollar yields, and total net profits over your flock cycle.
              </p>

              {/* Sliders */}
              <div className="space-y-4 pt-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Investment Capital ($):</span>
                    <strong className="text-amber-400 font-bold">${calcAmount}</strong>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={10000}
                    step={100}
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Cycle Duration:</span>
                    <strong className="text-amber-400 font-bold">{calcDuration} Days</strong>
                  </div>
                  <input
                    type="range"
                    min={60}
                    max={200}
                    step={20}
                    value={calcDuration}
                    onChange={(e) => setCalcDuration(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Result Box */}
            <div className="lg:col-span-6">
              <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-6 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Projected Yield Summary</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Daily Cash Payout</span>
                    <span className="text-2xl font-extrabold text-emerald-400">${calcDaily} <span className="text-xs font-normal text-slate-400">/day</span></span>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Estimated Return</span>
                    <span className="text-2xl font-extrabold text-amber-300">${calcTotalReturn}</span>
                  </div>
                </div>

                <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block">Est. Net Profit Above Principal</span>
                    <strong className="text-emerald-400 text-lg font-bold">+${calcNetProfit}</strong>
                  </div>
                  <button
                    onClick={() => onNavigate('marketplace')}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition cursor-pointer"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS 4 STEPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Simple 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How The OvumYield Platform Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center mx-auto text-base">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Choose Your Package</h3>
            <p className="text-slate-500 text-xs">
              Select an investment tier matching your capital and flock size preferences.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center mx-auto text-base">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Deposit & Activate</h3>
            <p className="text-slate-500 text-xs">
              Fund your wallet via bank wire, EasyPaisa, or JazzCash to activate flock unit.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center mx-auto text-base">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Daily Egg Production</h3>
            <p className="text-slate-500 text-xs">
              Hens lay Grade-A eggs daily. Automated conveyor lines package and deliver to supermarket buyers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center mx-auto text-base">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Claim Daily Rewards</h3>
            <p className="text-slate-500 text-xs">
              Collect daily cash payouts into your wallet or compound to buy additional flock units.
            </p>
          </div>
        </div>
      </section>

      {/* RECENT NEWS / BLOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Industry Insights
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Latest Poultry & Egg News</h2>
          </div>
          <button onClick={() => onNavigate('blog')} className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer">
            Read All Posts <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition">
              <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded">{post.category}</span>
                <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">{post.title}</h3>
                <p className="text-slate-500 text-xs line-clamp-2">{post.summary}</p>
                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 flex justify-between">
                  <span>{post.publishedAt}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
