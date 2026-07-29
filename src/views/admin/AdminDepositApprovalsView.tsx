import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { DepositRequest } from '../../types';
import { Wallet, CheckCircle2, XCircle, Eye, AlertCircle } from 'lucide-react';

export const AdminDepositApprovalsView: React.FC = () => {
  const [deposits, setDeposits] = useState<DepositRequest[]>(store.getDeposits());
  const [filter, setFilter] = useState<'pending' | 'completed' | 'rejected' | 'all'>('pending');
  const [selectedProof, setSelectedProof] = useState<string | null>(null);

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setDeposits(store.getDeposits());
    });
    return unsub;
  }, []);

  const filtered = filter === 'all'
    ? deposits
    : deposits.filter(d => d.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Deposit Proof Verification Queue</h1>
          <p className="text-slate-500 text-xs mt-1">Review bank wire receipts, EasyPaisa/JazzCash transaction references, and approve wallet credit</p>
        </div>

        <div className="flex gap-2">
          {['pending', 'completed', 'rejected', 'all'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition cursor-pointer ${
                filter === status ? 'bg-amber-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
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
                <th className="p-3">Method</th>
                <th className="p-3">Tx Reference</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Receipt Proof</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-400">No deposit requests found in this queue.</td>
                </tr>
              ) : (
                filtered.map(dep => (
                  <tr key={dep.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{dep.userName}</td>
                    <td className="p-3 uppercase text-slate-600 font-mono text-[11px]">{dep.paymentMethod.replace('_', ' ')}</td>
                    <td className="p-3 font-mono text-slate-800 font-bold">{dep.transactionReference}</td>
                    <td className="p-3 font-bold text-emerald-600">${dep.amount.toFixed(2)}</td>
                    <td className="p-3">
                      {(dep.proofImageUrl || (dep as any).proofImage) ? (
                        <button
                          onClick={() => setSelectedProof(dep.proofImageUrl || (dep as any).proofImage)}
                          className="text-amber-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Proof</span>
                        </button>
                      ) : (
                        <span className="text-slate-400">No Image</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        dep.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : dep.status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {dep.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      {dep.status === 'pending' && (
                        <>
                          <button
                            onClick={() => store.approveDeposit(dep.id)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[10px] cursor-pointer"
                          >
                            Approve Deposit
                          </button>
                          <button
                            onClick={() => store.rejectDeposit(dep.id, "Invalid transaction reference")}
                            className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded text-[10px] cursor-pointer"
                          >
                            Reject
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

      {/* Image Preview Modal */}
      {selectedProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
          <div className="bg-white p-4 rounded-2xl max-w-lg w-full space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-xs uppercase">Payment Receipt Proof</h3>
              <button onClick={() => setSelectedProof(null)} className="text-slate-400 font-bold text-xs cursor-pointer">Close</button>
            </div>
            <img src={selectedProof} alt="Deposit Proof" className="w-full max-h-96 object-contain rounded-xl border border-slate-200" />
          </div>
        </div>
      )}
    </div>
  );
};
