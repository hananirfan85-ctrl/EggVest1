import React, { useState } from 'react';
import { store } from '../services/store';
import { ArrowUpRight, Landmark, Smartphone, AlertCircle, Check, X } from 'lucide-react';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const user = store.getCurrentUser();
  const settings = store.getSettings();

  const [payoutMethod, setPayoutMethod] = useState<'bank_transfer' | 'easypaisa' | 'jazzcash'>('bank_transfer');
  const [amount, setAmount] = useState<number>(50);
  const [accountDetails, setAccountDetails] = useState<string>(
    user.bankDetails ? `${user.bankDetails.bankName} - A/C ${user.bankDetails.accountNumber}` : ''
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fee = (amount * settings.withdrawalFeePercent) / 100;
  const netPayout = Math.max(0, amount - fee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!accountDetails || accountDetails.trim().length < 5) {
      setErrorMsg("Please enter valid account title and account number details.");
      return;
    }

    const res = store.requestWithdrawal(amount, payoutMethod, accountDetails);
    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      setSuccessMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-100 overflow-hidden relative">
        <div className="bg-[#C62828] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFB300] text-slate-950 flex items-center justify-center font-black">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Request Cash Payout</h3>
              <p className="text-red-100 text-xs">Withdraw egg sales yields & referral earnings</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-red-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!successMsg ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Wallet Balance Indicator */}
              <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-emerald-800 font-semibold uppercase tracking-wider block">Available Balance</span>
                  <span className="text-xl font-extrabold text-emerald-950">${user.walletBalance.toFixed(2)}</span>
                </div>
                <div className="text-right text-[11px] text-emerald-700">
                  <span>Min Withdrawal: <strong>${settings.minWithdrawal}</strong></span>
                </div>
              </div>

              {/* Payout Channel */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Payout Channel
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPayoutMethod('bank_transfer');
                      if (user.bankDetails) setAccountDetails(`${user.bankDetails.bankName} - A/C ${user.bankDetails.accountNumber}`);
                    }}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition cursor-pointer ${
                      payoutMethod === 'bank_transfer'
                        ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Landmark className="w-5 h-5 text-amber-600" />
                    <span>Bank Transfer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPayoutMethod('easypaisa');
                      if (user.mobileWallet) setAccountDetails(`EasyPaisa: ${user.mobileWallet.accountTitle} (${user.mobileWallet.accountNumber})`);
                    }}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition cursor-pointer ${
                      payoutMethod === 'easypaisa'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-emerald-600" />
                    <span>EasyPaisa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPayoutMethod('jazzcash');
                      if (user.mobileWallet) setAccountDetails(`JazzCash: ${user.mobileWallet.accountTitle} (${user.mobileWallet.accountNumber})`);
                    }}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition cursor-pointer ${
                      payoutMethod === 'jazzcash'
                        ? 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-rose-600" />
                    <span>JazzCash</span>
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Withdrawal Amount ($ USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    min={settings.minWithdrawal}
                    max={user.walletBalance}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              {/* Account Details */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Destination Account Details
                </label>
                <textarea
                  required
                  rows={2}
                  value={accountDetails}
                  onChange={(e) => setAccountDetails(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="e.g. Bank Title, Account Number, IBAN or Mobile Wallet Number"
                />
              </div>

              {/* Breakdown */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between text-slate-600"><span>Requested Amount:</span><span>${amount.toFixed(2)}</span></div>
                <div className="flex justify-between text-slate-600"><span>Processing Fee ({settings.withdrawalFeePercent}%):</span><span>-${fee.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200">
                  <span>Net Payout Amount:</span>
                  <span className="text-emerald-600">${netPayout.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/20 transition cursor-pointer"
              >
                Request Withdrawal (${netPayout.toFixed(2)})
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Withdrawal Submitted!</h4>
              <p className="text-slate-600 text-xs leading-relaxed max-w-sm mx-auto">
                {successMsg}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-slate-800 transition cursor-pointer"
              >
                Back to Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
