import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { WithdrawalRequest } from '../../types';
import { DollarSign, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export const AdminWithdrawalApprovalsView: React.FC = () => {
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(store.getWithdrawals());
  const [filter, setFilter] = useState<'pending' | 'completed' | 'rejected' | 'all'>('pending');

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setWithdrawals(store.getWithdrawals());
    });
    return unsub;
  }, []);

  const filtered = filter === 'all'
    ? withdrawals
    : withdrawals.filter(w => w.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Withdrawal Payout Approvals</h1>
          <p className="text-slate-500 text-xs mt-1">Process investor cash payout requests, verify net payout amounts, and update bank transfer status</p>
        </div>

        <div className="flex gap-2">
          {['pending', 'completed', 'rejected', 'all'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition cursor-pointer ${
                filter === status ? 'bg-purple-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Investor</th>
                <th className="p-3">Destination Details</th>
                <th className="p-3">Gross Amount</th>
                <th className="p-3">Fee (2.5%)</th>
                <th className="p-3">Net Payout</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-400">No withdrawal requests found in this queue.</td>
                </tr>
              ) : (
                filtered.map(wd => (
                  <tr key={wd.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{wd.userName}</td>
                    <td className="p-3 text-slate-600 font-mono text-[11px] max-w-xs truncate">{wd.accountDetails}</td>
                    <td className="p-3 font-bold text-slate-900">${wd.amount.toFixed(2)}</td>
                    <td className="p-3 text-rose-600 font-bold">-${wd.fee.toFixed(2)}</td>
                    <td className="p-3 font-bold text-emerald-600">${wd.netAmount.toFixed(2)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        wd.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : wd.status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {wd.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      {wd.status === 'pending' && (
                        <>
                          <button
                            onClick={() => store.approveWithdrawal(wd.id)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[10px] cursor-pointer"
                          >
                            Confirm Bank Transfer
                          </button>
                          <button
                            onClick={() => store.rejectWithdrawal(wd.id, "Incorrect account title")}
                            className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded text-[10px] cursor-pointer"
                          >
                            Reject & Refund Wallet
                          </button>
                        </>
                      )}
                    </td>
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
