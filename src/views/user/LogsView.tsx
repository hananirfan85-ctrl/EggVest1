import React, { useState, useEffect } from 'react';
import { User, DepositRequest, WithdrawalRequest, WalletTransaction } from '../../types';
import { store } from '../../services/store';
import { FileText, ArrowDownLeft, ArrowUpRight, Award, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface LogsViewProps {
  currentUser: User;
}

export const LogsView: React.FC<LogsViewProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<'deposits' | 'withdrawals' | 'referrals'>('deposits');
  const [deposits, setDeposits] = useState<DepositRequest[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);

  useEffect(() => {
    const updateData = () => {
      setDeposits(store.getDeposits(currentUser.id));
      setWithdrawals(store.getWithdrawals(currentUser.id));
      setTransactions(store.getTransactions(currentUser.id));
    };
    updateData();
    return store.subscribe(updateData);
  }, [currentUser.id]);

  const referralTxs = transactions.filter((t) => t.type === 'referral_commission');

  return (
    <div className="max-w-md mx-auto sm:max-w-7xl px-4 py-5 space-y-5 pb-20">
      {/* Header Bar */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <FileText className="w-6 h-6 text-[#C62828]" />
          <span>Activity Logs</span>
        </h1>
        <p className="text-xs text-slate-500">
          History of all financial transactions, deposits, withdrawals, and referral bonuses
        </p>
      </div>

      {/* TAB NAVIGATION */}
      <div className="flex bg-slate-200/60 p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab('deposits')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'deposits'
              ? 'bg-white text-[#C62828] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
          <span>Deposits ({deposits.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('withdrawals')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'withdrawals'
              ? 'bg-white text-[#C62828] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowUpRight className="w-4 h-4 text-amber-600" />
          <span>Withdrawals ({withdrawals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('referrals')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'referrals'
              ? 'bg-white text-[#C62828] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4 text-[#C62828]" />
          <span>Referrals ({referralTxs.length})</span>
        </button>
      </div>

      {/* DEPOSITS LOG LIST */}
      {activeTab === 'deposits' && (
        <div className="space-y-3">
          {deposits.length > 0 ? (
            deposits.map((dep) => (
              <div
                key={dep.id}
                className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-2 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <ArrowDownLeft className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">${dep.amount.toFixed(2)} USD</h4>
                      <p className="text-[11px] font-mono text-slate-500">Ref: {dep.transactionReference}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full border flex items-center gap-1 ${
                      dep.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : dep.status === 'rejected'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {dep.status === 'approved' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {dep.status === 'rejected' && <XCircle className="w-3.5 h-3.5" />}
                    {dep.status === 'pending' && <Clock className="w-3.5 h-3.5" />}
                    <span className="capitalize">{dep.status}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <span>Method: {dep.paymentMethod.toUpperCase()}</span>
                  <span>{new Date(dep.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-2">
              <p className="text-xs text-slate-500 font-bold">No deposit logs recorded yet.</p>
            </div>
          )}
        </div>
      )}

      {/* WITHDRAWALS LOG LIST */}
      {activeTab === 'withdrawals' && (
        <div className="space-y-3">
          {withdrawals.length > 0 ? (
            withdrawals.map((w) => (
              <div
                key={w.id}
                className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-2 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">${w.amount.toFixed(2)} USD</h4>
                      <p className="text-[11px] text-slate-500">{w.accountDetails}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full border flex items-center gap-1 ${
                      w.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : w.status === 'rejected'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {w.status === 'approved' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {w.status === 'rejected' && <XCircle className="w-3.5 h-3.5" />}
                    {w.status === 'pending' && <Clock className="w-3.5 h-3.5" />}
                    <span className="capitalize">{w.status}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <span>Method: {w.payoutMethod.toUpperCase()}</span>
                  <span>{new Date(w.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-2">
              <p className="text-xs text-slate-500 font-bold">No withdrawal logs recorded yet.</p>
            </div>
          )}
        </div>
      )}

      {/* REFERRALS LOG LIST */}
      {activeTab === 'referrals' && (
        <div className="space-y-3">
          {referralTxs.length > 0 ? (
            referralTxs.map((ref) => (
              <div
                key={ref.id}
                className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-2 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">+${ref.amount.toFixed(2)} USD</h4>
                      <p className="text-[11px] text-slate-600">{ref.description}</p>
                    </div>
                  </div>

                  <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-200">
                    Credited
                  </span>
                </div>

                <div className="flex items-center justify-end text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <span>{new Date(ref.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-2">
              <p className="text-xs text-slate-500 font-bold">No referral commission bonuses earned yet.</p>
              <p className="text-[11px] text-slate-400">
                Share your referral code from the Home tab to start earning 8% commissions.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
