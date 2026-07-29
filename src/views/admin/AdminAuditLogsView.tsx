import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { ShieldCheck, Clock } from 'lucide-react';

export const AdminAuditLogsView: React.FC = () => {
  const [logs, setLogs] = useState(store.getAuditLogs());

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setLogs(store.getAuditLogs());
    });
    return unsub;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">System Security Audit Logs</h1>
        <p className="text-slate-500 text-xs mt-1">Immutable administrative audit trail tracking deposit approvals, payouts, and user role modifications</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Action</th>
                <th className="p-3">Admin</th>
                <th className="p-3">Target Details</th>
                <th className="p-3">IP Address</th>
                <th className="p-3 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-400">No audit logs recorded yet.</td>
                </tr>
              ) : (
                logs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-purple-700 uppercase">{log.action}</td>
                    <td className="p-3 text-slate-800">{log.adminName}</td>
                    <td className="p-3 text-slate-600 max-w-xs truncate">{log.details}</td>
                    <td className="p-3 text-slate-400">{log.ipAddress}</td>
                    <td className="p-3 text-right text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
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
