import React, { useState } from 'react';
import { store } from '../../services/store';
import { Users, Copy, Check, Share2, Award, ArrowUpRight } from 'lucide-react';

export const UserReferralView: React.FC = () => {
  const user = store.getCurrentUser();
  const settings = store.getSettings();
  const [copied, setCopied] = useState(false);

  const referralLink = `${window.location.origin}/?ref=${user.referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referralTx = store.getTransactions(user.id).filter(t => t.type === 'referral_commission');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-amber-950 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            Referral Program
          </span>
          <h1 className="text-3xl font-extrabold">Earn Up to {settings.referralL1Percent}% Commission</h1>
          <p className="text-slate-300 text-xs max-w-lg">
            Invite fellow investors to co-own poultry coops. Receive instant Level 1 ({settings.referralL1Percent}%) and Level 2 ({settings.referralL2Percent}%) cash commissions directly into your wallet.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center space-y-1 min-w-[200px]">
          <span className="text-[10px] text-amber-200 uppercase font-bold block">Total Referral Income</span>
          <div className="text-2xl font-extrabold text-amber-300">${user.totalReferralEarnings.toFixed(2)}</div>
        </div>
      </div>

      {/* Share Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Your Unique Referral Credentials</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Referral Code</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={user.referralCode}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-900"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(user.referralCode);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Copy Code
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Direct Referral Link</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800 truncate"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Commission Ledger */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Referral Commission Log</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3 rounded-l-lg">Description</th>
                <th className="p-3">Commission Earned</th>
                <th className="p-3">Status</th>
                <th className="p-3 rounded-r-lg">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {referralTx.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-slate-400">No referral commissions earned yet. Share your link to start earning!</td>
                </tr>
              ) : (
                referralTx.map(tx => (
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
