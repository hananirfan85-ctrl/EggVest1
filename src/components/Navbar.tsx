import React, { useState, useEffect } from 'react';
import { store } from '../services/store';
import {
  Egg,
  ShieldCheck,
  Wallet,
  Bell,
  User as UserIcon,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Layers,
  HelpCircle,
  PhoneCall,
  Menu,
  X,
  Code2,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenDeposit: () => void;
  onOpenHarvest: () => void;
  onOpenAPIDocs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenAuth,
  onOpenDeposit,
  onOpenHarvest,
  onOpenAPIDocs
}) => {
  const [currentUser, setCurrentUser] = useState(store.getCurrentUser());
  const [notifications, setNotifications] = useState(store.getNotifications());
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingHarvest, setPendingHarvest] = useState(store.getPendingRewardsForUser());

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setCurrentUser(store.getCurrentUser());
      setNotifications(store.getNotifications());
      setPendingHarvest(store.getPendingRewardsForUser());
    });
    return unsub;
  }, []);

  const unreadNotifs = notifications.filter(n => !n.isRead);

  const isAdmin = currentUser.role === 'admin';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100/80 shadow-xs">
      {/* Top Banner / Announcement bar */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 text-amber-50 text-xs py-1.5 px-4 font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-amber-600/60 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold text-amber-100">
              Live Farm Stats
            </span>
            <span>Grade-A Egg Crate Index: <strong className="text-amber-200">$4.50/crate</strong></span>
            <span className="hidden md:inline">• Today's Total Eggs Produced: <strong className="text-emerald-300">142,850 Eggs</strong></span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenAPIDocs}
              className="hover:text-amber-200 flex items-center gap-1 transition cursor-pointer font-mono text-[11px]"
            >
              <Code2 className="w-3.5 h-3.5 text-amber-300" />
              REST API Docs
            </button>
            <div className="h-3 w-[1px] bg-amber-600/60 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-amber-200 text-[11px]">Role:</span>
              <button
                onClick={() => store.switchRole(isAdmin ? 'investor' : 'admin')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                  isAdmin
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                Switch to {isAdmin ? 'User Mode' : 'Admin Panel'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition duration-200">
            <Egg className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-lg font-bold text-slate-900 tracking-tight block leading-none">
              Egg<span className="text-amber-600">Vest</span>
            </span>
            <span className="text-[10px] text-slate-500 tracking-wider uppercase font-semibold">
              Poultry Co-Investment
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-2 rounded-lg transition ${currentTab === 'home' ? 'text-amber-700 font-semibold bg-amber-50' : 'hover:text-slate-900 hover:bg-slate-50'}`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('marketplace')}
            className={`px-3 py-2 rounded-lg transition ${currentTab === 'marketplace' ? 'text-amber-700 font-semibold bg-amber-50' : 'hover:text-slate-900 hover:bg-slate-50'}`}
          >
            Packages
          </button>
          <button
            onClick={() => onNavigate('how-it-works')}
            className={`px-3 py-2 rounded-lg transition ${currentTab === 'how-it-works' ? 'text-amber-700 font-semibold bg-amber-50' : 'hover:text-slate-900 hover:bg-slate-50'}`}
          >
            How It Works
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`px-3 py-2 rounded-lg transition ${currentTab === 'about' ? 'text-amber-700 font-semibold bg-amber-50' : 'hover:text-slate-900 hover:bg-slate-50'}`}
          >
            About Farm
          </button>
          <button
            onClick={() => onNavigate('blog')}
            className={`px-3 py-2 rounded-lg transition ${currentTab === 'blog' ? 'text-amber-700 font-semibold bg-amber-50' : 'hover:text-slate-900 hover:bg-slate-50'}`}
          >
            Poultry News
          </button>
          <button
            onClick={() => onNavigate('faq')}
            className={`px-3 py-2 rounded-lg transition ${currentTab === 'faq' ? 'text-amber-700 font-semibold bg-amber-50' : 'hover:text-slate-900 hover:bg-slate-50'}`}
          >
            FAQ
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`px-3 py-2 rounded-lg transition ${currentTab === 'contact' ? 'text-amber-700 font-semibold bg-amber-50' : 'hover:text-slate-900 hover:bg-slate-50'}`}
          >
            Contact
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Harvest Button if pending rewards exist */}
          {pendingHarvest.totalAmount > 0 && (
            <button
              onClick={onOpenHarvest}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition animate-bounce cursor-pointer"
            >
              <Egg className="w-3.5 h-3.5 fill-current" />
              <span>Harvest ${pendingHarvest.totalAmount.toFixed(2)}</span>
            </button>
          )}

          {/* Wallet / Portal Quick Button */}
          {!isAdmin ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('user-dashboard')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Investor Portal</span>
              </button>
              <button
                onClick={onOpenDeposit}
                className="px-3 py-1.5 bg-amber-600 text-white text-xs font-semibold rounded-lg hover:bg-amber-700 transition flex items-center gap-1 cursor-pointer"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Deposit</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('admin-dashboard')}
              className="px-3 py-1.5 bg-purple-700 text-white text-xs font-semibold rounded-lg hover:bg-purple-800 transition flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 relative cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifs.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 text-xs">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between font-bold text-slate-800">
                  <span>Notifications ({unreadNotifs.length})</span>
                  <button
                    onClick={() => store.markAllNotificationsRead()}
                    className="text-amber-600 hover:underline font-normal text-[11px]"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-slate-400">No notifications</div>
                  ) : (
                    notifications.slice(0, 5).map(n => (
                      <div
                        key={n.id}
                        onClick={() => store.markNotificationRead(n.id)}
                        className={`p-3 hover:bg-slate-50 cursor-pointer ${!n.isRead ? 'bg-amber-50/40' : ''}`}
                      >
                        <div className="font-semibold text-slate-800 mb-0.5">{n.title}</div>
                        <div className="text-slate-600 leading-snug">{n.message}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <img
                src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-500/20"
              />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 text-xs">
                <div className="px-4 py-2 border-b border-slate-100">
                  <div className="font-bold text-slate-800">{currentUser.name}</div>
                  <div className="text-slate-500 truncate text-[11px]">{currentUser.email}</div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-emerald-600 font-bold">${currentUser.walletBalance.toFixed(2)}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold uppercase">{currentUser.kycStatus}</span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => { setShowUserDropdown(false); onNavigate('user-dashboard'); }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
                    Investor Dashboard
                  </button>
                  <button
                    onClick={() => { setShowUserDropdown(false); onNavigate('user-assets'); }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                  >
                    <Layers className="w-3.5 h-3.5 text-slate-500" />
                    My Flocks & Production
                  </button>
                  <button
                    onClick={() => { setShowUserDropdown(false); onNavigate('user-wallet'); }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                  >
                    <Wallet className="w-3.5 h-3.5 text-slate-500" />
                    Wallet & Payouts
                  </button>
                  <button
                    onClick={() => { setShowUserDropdown(false); onNavigate('user-profile'); }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                    Account & KYC
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => { setShowUserDropdown(false); onNavigate('admin-dashboard'); }}
                      className="w-full text-left px-4 py-2 hover:bg-purple-50 flex items-center gap-2 text-purple-700 font-semibold"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                      Admin Control Panel
                    </button>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => { setShowUserDropdown(false); onOpenAuth('login'); }}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-2 text-red-600"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Switch User / Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-4 space-y-2 text-sm">
          <button
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 font-medium"
          >
            Home
          </button>
          <button
            onClick={() => { onNavigate('marketplace'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 font-medium"
          >
            Investment Packages
          </button>
          <button
            onClick={() => { onNavigate('how-it-works'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 font-medium"
          >
            How It Works
          </button>
          <button
            onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 font-medium"
          >
            About Farm
          </button>
          <button
            onClick={() => { onNavigate('blog'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 font-medium"
          >
            Poultry News
          </button>
          <button
            onClick={() => { onNavigate('user-dashboard'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 px-3 rounded-lg bg-slate-900 text-white font-medium"
          >
            Investor Dashboard
          </button>
        </div>
      )}
    </header>
  );
};
