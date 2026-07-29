import React, { useState } from 'react';
import { store } from '../../services/store';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdminSettingsView: React.FC = () => {
  const currentSettings = store.getSettings();
  const [eggPricePerCrate, setEggPricePerCrate] = useState(currentSettings.eggPricePerCrate);
  const [minWithdrawal, setMinWithdrawal] = useState(currentSettings.minWithdrawal);
  const [withdrawalFeePercent, setWithdrawalFeePercent] = useState(currentSettings.withdrawalFeePercent);
  const [referralL1Percent, setReferralL1Percent] = useState(currentSettings.referralL1Percent);
  const [referralL2Percent, setReferralL2Percent] = useState(currentSettings.referralL2Percent);

  // Bank Info
  const [bankName, setBankName] = useState(currentSettings.bankInfo.bankName);
  const [accountTitle, setAccountTitle] = useState(currentSettings.bankInfo.accountTitle);
  const [accountNumber, setAccountNumber] = useState(currentSettings.bankInfo.accountNumber);
  const [iban, setIban] = useState(currentSettings.bankInfo.iban);

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateSettings({
      eggPricePerCrate: Number(eggPricePerCrate),
      minWithdrawal: Number(minWithdrawal),
      withdrawalFeePercent: Number(withdrawalFeePercent),
      referralL1Percent: Number(referralL1Percent),
      referralL2Percent: Number(referralL2Percent),
      bankInfo: {
        bankName,
        accountTitle,
        accountNumber,
        iban
      }
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Platform Operating Parameters</h1>
        <p className="text-slate-500 text-xs mt-1">Configure global egg market crate pricing, withdrawal parameters, and company deposit bank accounts</p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Global platform configuration parameters updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
        <h3 className="font-bold text-slate-900 text-base">Economic & Referral Commission Index</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Base Egg Price per Crate ($)</label>
            <input
              type="number"
              step="0.1"
              required
              value={eggPricePerCrate}
              onChange={(e) => setEggPricePerCrate(Number(e.target.value))}
              className="w-full px-3.5 py-2 border rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Min Withdrawal Amount ($)</label>
            <input
              type="number"
              required
              value={minWithdrawal}
              onChange={(e) => setMinWithdrawal(Number(e.target.value))}
              className="w-full px-3.5 py-2 border rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Withdrawal Fee (%)</label>
            <input
              type="number"
              step="0.1"
              required
              value={withdrawalFeePercent}
              onChange={(e) => setWithdrawalFeePercent(Number(e.target.value))}
              className="w-full px-3.5 py-2 border rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Level 1 Referral Commission (%)</label>
            <input
              type="number"
              step="0.1"
              required
              value={referralL1Percent}
              onChange={(e) => setReferralL1Percent(Number(e.target.value))}
              className="w-full px-3.5 py-2 border rounded-xl text-xs"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Company Deposit Destination Bank Account</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Bank Name</label>
              <input
                type="text"
                required
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-3.5 py-2 border rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Account Title</label>
              <input
                type="text"
                required
                value={accountTitle}
                onChange={(e) => setAccountTitle(e.target.value)}
                className="w-full px-3.5 py-2 border rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Account Number</label>
              <input
                type="text"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-3.5 py-2 border rounded-xl text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">IBAN Number</label>
              <input
                type="text"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                className="w-full px-3.5 py-2 border rounded-xl text-xs font-mono"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
        >
          Save Operating Parameters
        </button>
      </form>
    </div>
  );
};
