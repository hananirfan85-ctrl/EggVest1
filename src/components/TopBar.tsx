import React from 'react';
import { User } from '../types';
import { Bell, ShieldCheck, Egg, User as UserIcon } from 'lucide-react';

interface TopBarProps {
  currentUser: User;
  unreadCount: number;
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
  onOpenAdmin?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentUser,
  unreadCount,
  onOpenProfile,
  onOpenNotifications,
  onOpenAdmin,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#C62828] text-white shadow-md border-b border-[#B71C1C] px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: User Avatar + Greeting + Name */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-3 text-left hover:opacity-90 transition cursor-pointer group"
        >
          <div className="relative">
            <img
              src={
                currentUser.avatar ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
              }
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#FFB300] shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 bg-[#FFB300] text-slate-950 p-0.5 rounded-full border border-white">
              <Egg className="w-2.5 h-2.5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-red-100 font-medium">Hello, 👋</span>
              {currentUser.role === 'admin' && (
                <span className="bg-[#FFB300] text-slate-950 text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wider">
                  Admin
                </span>
              )}
            </div>
            <h2 className="text-sm font-bold text-white leading-tight group-hover:underline decoration-[#FFB300]">
              {currentUser.name}
            </h2>
          </div>
        </button>

        {/* Center Logo on Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <img
            src="/src/assets/images/eggvest_app_logo_1785351725406.jpg"
            alt="EggVest Logo"
            className="w-9 h-9 rounded-xl object-cover border-2 border-[#FFB300] shadow-sm"
          />
          <div>
            <span className="text-lg font-extrabold tracking-tight text-white leading-none block">
              Egg<span className="text-[#FFB300]">Vest</span>
            </span>
            <span className="text-[9px] text-red-200 tracking-wider uppercase font-semibold">
              Smart Poultry Investment
            </span>
          </div>
        </div>

        {/* Right: Admin toggle & Notification bell */}
        <div className="flex items-center gap-2">
          {currentUser.role === 'admin' && onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="px-2.5 py-1.5 bg-red-900/60 hover:bg-red-950 text-white rounded-xl text-xs font-bold flex items-center gap-1 border border-red-400/30 transition cursor-pointer"
              title="Open Admin Control Panel"
            >
              <ShieldCheck className="w-4 h-4 text-[#FFB300]" />
              <span className="hidden sm:inline">Admin Panel</span>
            </button>
          )}

          <button
            onClick={onOpenNotifications}
            className="relative p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FFB300] text-slate-950 text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#C62828] animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
