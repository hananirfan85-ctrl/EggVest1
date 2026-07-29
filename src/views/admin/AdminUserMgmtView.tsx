import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { User } from '../../types';
import { Users, CheckCircle2, XCircle, Search, ShieldCheck } from 'lucide-react';

export const AdminUserMgmtView: React.FC = () => {
  const [users, setUsers] = useState<User[]>(store.getAllUsers());
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setUsers(store.getAllUsers());
    });
    return unsub;
  }, []);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.referralCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Investor User Management</h1>
          <p className="text-slate-500 text-xs mt-1">Review investor profiles, wallet balances, and KYC identity verification status</p>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, referral..."
          className="px-3.5 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none w-64"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Investor</th>
                <th className="p-3">Role</th>
                <th className="p-3">Wallet Balance</th>
                <th className="p-3">Total Earnings</th>
                <th className="p-3">KYC Identity</th>
                <th className="p-3">Referral Code</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">
                    <div>{u.name}</div>
                    <div className="text-[11px] text-slate-400 font-normal">{u.email}</div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-emerald-600">${u.walletBalance.toFixed(2)}</td>
                  <td className="p-3 font-bold text-slate-800">${u.totalEarnings.toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      u.kycStatus === 'verified' ? 'bg-emerald-100 text-emerald-800' : u.kycStatus === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {u.kycStatus}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-[11px] text-slate-600">{u.referralCode}</td>
                  <td className="p-3 text-right space-x-1">
                    {u.kycStatus === 'pending' && (
                      <>
                        <button
                          onClick={() => store.approveKYC(u.id)}
                          className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded text-[10px] hover:bg-emerald-700 cursor-pointer"
                        >
                          Approve KYC
                        </button>
                        <button
                          onClick={() => store.rejectKYC(u.id, "ID document image blurry")}
                          className="px-2.5 py-1 bg-rose-600 text-white font-bold rounded text-[10px] hover:bg-rose-700 cursor-pointer"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
