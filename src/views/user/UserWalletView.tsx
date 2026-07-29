import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { WalletTransaction, DepositRequest, WithdrawalRequest } from '../../types';
import { Wallet, PlusCircle, ArrowUpRight, ArrowDownRight, Filter, Landmark, Smartphone, RefreshCw } from 'lucide-react';

interface UserWalletProps {
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
}

export const UserWalletView: React.FC<UserWalletProps> = ({ onOpenDeposit, onOpenWithdraw }) => {
  const user = store.getCurrentUser();
  const [transactions, setTransactions] = useState<WalletTransaction[]>(store.getTransactions(user.id));
  const [deposits, setDeposits] = useState<DepositRequest[]>(store.getDeposits(user.id));
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(store.getWithdrawals(user.id));
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    const unsub = store.subscribe(() => {
      const u = store.getCurrentUser();
      setTransactions(store.getTransactions(u.id));
      setDeposits(store.getDeposits(u.id));
      setWithdrawals(store.getWithdrawals(u.id));
    });
    return unsub;
  }, []);

  const filteredTx = filterType === 'all'
    ? transactions
    : transactions.filter(t => t.type === filterType);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Wallet Overview Banner */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl border border-amber-500/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            Platform Wallet
          </span>
          <h1 className="text-3xl font-extrabold">${user.walletBalance.toFixed(2)}</h1>
          <p className="text-slate-400 text-xs">Available for direct withdrawal or package acquisition</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDeposit}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-600/20 flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Deposit Funds</span>
          </button>

          <button
            onClick={onOpenWithdraw}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-2 cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Withdraw Payout</span>
          </button>
        </div>
      </div>

      {/* Pending Approval Requests */}
      {(deposits.some(d => d.status === 'pending') || withdrawals.some(w => w.status === 'pending')) && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs space-y-2">
          <h4 className="font-bold text-amber-900 uppercase tracking-wider">Pending Accounting Approvals</h4>
          {deposits.filter(d => d.status === 'pending').map(dep => (
            <div key={dep.id} className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-amber-200 text-slate-800">
              <div>Deposit Request via <strong>{dep.paymentMethod.replace('_', ' ')}</strong> (Ref: {dep.transactionReference})</div>
              <div className="font-bold text-amber-700">+${dep.amount.toFixed(2)} [PENDING]</div>
            </div>
          ))}
          {withdrawals.filter(w => w.status === 'pending').map(wd => (
            <div key={wd.id} className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-amber-200 text-slate-800">
              <div>Withdrawal Request to <strong>{wd.accountDetails}</strong></div>
              <div className="font-bold text-slate-900">-${wd.amount.toFixed(2)} (Net: ${wd.netAmount.toFixed(2)}) [PROCESSING]</div>
            </div>
          ))}
        </div>
      )}

      {/* Ledger Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="font-bold text-slate-900 text-base">Full Wallet Ledger</h3>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {['all', 'deposit', 'withdrawal', 'daily_reward', 'package_purchase', 'referral_commission'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-lg font-bold capitalize transition cursor-pointer ${
                  filterType === type ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3 rounded-l-lg">Type</th>
                <th className="p-3">Description</th>
                <th className="p-3">Method</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3 rounded-r-lg">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTx.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-400">No ledger activity matching selection.</td>
                </tr>
              ) : (
                filteredTx.map(tx => (
                  <tr key={tx.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold capitalize text-slate-800">{tx.type.replace('_', ' ')}</td>
                    <td className="p-3 text-slate-600">{tx.description}</td>
                    <td className="p-3 text-slate-500 uppercase font-mono text-[11px]">{tx.paymentMethod?.replace('_', ' ') || 'INTERNAL'}</td>
                    <td className={`p-3 font-bold ${tx.type === 'withdrawal' || tx.type === 'package_purchase' ? 'text-slate-900' : 'text-emerald-600'}`}>
                      {tx.type === 'withdrawal' || tx.type === 'package_purchase' ? '-' : '+'}${tx.amount.toFixed(2)}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        tx.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
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
