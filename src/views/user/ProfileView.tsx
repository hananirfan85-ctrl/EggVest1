import React, { useState } from 'react';
import { User } from '../../types';
import { store } from '../../services/store';
import {
  User as UserIcon,
  Mail,
  Award,
  Wallet,
  ShieldCheck,
  LogOut,
  ArrowDownLeft,
  ArrowUpRight,
  Headphones,
  Lock,
  Edit2,
  Copy,
  Check,
  Egg,
  Key
} from 'lucide-react';

interface ProfileViewProps {
  currentUser: User;
  onNavigate: (tab: string) => void;
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onOpenAdmin: () => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  onNavigate,
  onOpenDeposit,
  onOpenWithdraw,
  onOpenAdmin,
  onLogout,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [avatar, setAvatar] = useState(currentUser.avatar || '');
  const [savedMsg, setSavedMsg] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentUser.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateProfile(currentUser.id, { name, phone, avatar });
    setIsEditing(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  return (
    <div className="max-w-md mx-auto sm:max-w-7xl px-4 py-5 space-y-5 pb-20">
      {/* Header Banner & User Avatar Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm relative overflow-hidden space-y-4">
        <div className="flex items-center gap-4">
          <img
            src={
              currentUser.avatar ||
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
            }
            alt={currentUser.name}
            className="w-16 h-16 rounded-full object-cover border-4 border-[#FFB300] shadow-md shrink-0"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 truncate">{currentUser.name}</h2>
              {currentUser.role === 'admin' && (
                <span className="bg-[#FFB300] text-slate-950 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 truncate mt-0.5">{currentUser.email}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Verified Account
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition cursor-pointer shrink-0"
            title="Edit Profile"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        {savedMsg && (
          <p className="text-xs font-bold text-emerald-600 bg-emerald-50 p-2 rounded-xl text-center">
            ✓ Profile details saved successfully!
          </p>
        )}

        {/* Edit Form Drawer */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="bg-slate-50 p-4 rounded-2xl space-y-3 text-xs border border-slate-200">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Edit Profile Details</h4>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C62828]"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Profile Image / Avatar URL</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C62828]"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Mobile Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C62828]"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 py-2 bg-[#C62828] text-white font-bold rounded-xl hover:bg-[#B71C1C]"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Key Metrics Summary */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Wallet Balance</span>
            <span className="text-base font-extrabold text-[#C62828]">
              ${currentUser.walletBalance.toFixed(2)} USD
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Referral Code</span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono font-extrabold text-slate-900">
                {currentUser.referralCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-1 text-slate-500 hover:text-[#C62828]"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS MENU */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-1">
        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-2 py-1">
          Account Operations
        </h3>

        <button
          onClick={onOpenDeposit}
          className="w-full p-3 rounded-2xl hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-between transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
            <span>Deposit Funds</span>
          </div>
          <span className="text-slate-400">→</span>
        </button>

        <button
          onClick={onOpenWithdraw}
          className="w-full p-3 rounded-2xl hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-between transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <span>Withdraw Funds</span>
          </div>
          <span className="text-slate-400">→</span>
        </button>

        <button
          onClick={() => onNavigate('home')}
          className="w-full p-3 rounded-2xl hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-between transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <span>Referral Program & Bonuses</span>
          </div>
          <span className="text-slate-400">→</span>
        </button>

        {currentUser.role === 'admin' && (
          <button
            onClick={onOpenAdmin}
            className="w-full p-3 rounded-2xl bg-red-50 hover:bg-red-100 text-[#C62828] text-xs font-bold flex items-center justify-between transition cursor-pointer border border-red-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>Admin Management Portal</span>
            </div>
            <span>→</span>
          </button>
        )}
      </div>

      {/* SECURITY & LOGOUT */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-1">
        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-2 py-1">
          Security & Account
        </h3>

        <button
          onClick={() => alert('Security settings & Password changes are protected by SMS / Email OTP.')}
          className="w-full p-3 rounded-2xl hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-between transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <span>Change Password</span>
          </div>
          <span className="text-slate-400">→</span>
        </button>

        <button
          onClick={onLogout}
          className="w-full p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-between transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-200 text-rose-800 flex items-center justify-center">
              <LogOut className="w-4 h-4" />
            </div>
            <span>Sign Out Account</span>
          </div>
          <span className="text-rose-400">→</span>
        </button>
      </div>
    </div>
  );
};
