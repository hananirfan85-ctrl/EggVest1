import React, { useState } from 'react';
import { store } from '../../services/store';
import { User, ShieldCheck, Upload, CheckCircle2, Lock, Landmark, Smartphone } from 'lucide-react';

export const UserProfileView: React.FC = () => {
  const user = store.getCurrentUser();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);

  // Bank Info
  const [bankName, setBankName] = useState(user.bankDetails?.bankName || '');
  const [accountTitle, setAccountTitle] = useState(user.bankDetails?.accountTitle || user.name);
  const [accountNumber, setAccountNumber] = useState(user.bankDetails?.accountNumber || '');
  const [iban, setIban] = useState(user.bankDetails?.iban || '');

  // KYC
  const [idNumber, setIdNumber] = useState('');
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateProfile(user.id, {
      name,
      phone,
      bankDetails: { bankName, accountTitle, accountNumber, iban }
    });
    setSavedMsg("Profile and payout account details updated successfully!");
    setTimeout(() => setSavedMsg(null), 3000);
  };

  const handleKYCSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.submitKYC(user.id, idNumber, "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80");
    setSavedMsg("KYC verification documents submitted for review!");
    setTimeout(() => setSavedMsg(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Account Settings & KYC Verification</h1>
          <p className="text-slate-500 text-xs mt-1">Manage profile information, payout bank accounts, and identity documents</p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
            user.kycStatus === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            KYC: {user.kycStatus}
          </span>
        </div>
      </div>

      {savedMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{savedMsg}</span>
        </div>
      )}

      {/* Personal & Bank Account Info Form */}
      <form onSubmit={handleSaveProfile} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
        <h3 className="font-bold text-slate-900 text-base">Personal Information & Payout Destination</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Bank Account Details (For Payouts)</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Bank Name</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                placeholder="e.g. Chase Bank / CitiBank"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Account Title</label>
              <input
                type="text"
                value={accountTitle}
                onChange={(e) => setAccountTitle(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                placeholder="Account Holder Title"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Account Number</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                placeholder="48201938221"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">IBAN Number (Optional)</label>
              <input
                type="text"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                placeholder="US91CHAS0048201938221"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
        >
          Save Profile & Bank Info
        </button>
      </form>

      {/* KYC Verification Form */}
      {user.kycStatus !== 'verified' && (
        <form onSubmit={handleKYCSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-slate-900 text-base">Submit KYC Identity Documents</h3>
          </div>

          <p className="text-slate-500 text-xs">
            To satisfy international regulatory compliance and enable high-volume withdrawals, please submit your National ID or Passport number.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">National ID / Passport Number</label>
              <input
                type="text"
                required
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                placeholder="A-882019382"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Submit For Compliance Review
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
