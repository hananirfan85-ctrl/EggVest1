import React, { useState, useEffect } from 'react';
import { User, Notification } from '../../types';
import { store } from '../../services/store';
import { Bell, Check, CheckCheck, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface NotificationsViewProps {
  currentUser: User;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({ currentUser }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const updateData = () => {
      setNotifications(store.getNotifications(currentUser.id));
    };
    updateData();
    return store.subscribe(updateData);
  }, [currentUser.id]);

  const handleMarkAllRead = () => {
    store.markAllNotificationsRead(currentUser.id);
  };

  return (
    <div className="max-w-md mx-auto sm:max-w-7xl px-4 py-5 space-y-5 pb-20">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#C62828]" />
            <span>Notifications & Updates</span>
          </h1>
          <p className="text-xs text-slate-500">
            System announcements, reward credits, and account deposit/withdrawal status
          </p>
        </div>

        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={handleMarkAllRead}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer transition"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark All Read</span>
          </button>
        )}
      </div>

      {/* NOTIFICATION LIST */}
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`bg-white rounded-3xl p-4 border shadow-sm space-y-1.5 transition ${
                n.isRead ? 'border-slate-200 opacity-90' : 'border-[#C62828]/40 ring-2 ring-red-500/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      n.type === 'success'
                        ? 'bg-emerald-100 text-emerald-700'
                        : n.type === 'warning'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-[#C62828]'
                    }`}
                  >
                    {n.type === 'success' && <CheckCircle2 className="w-4 h-4" />}
                    {n.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
                    {n.type !== 'success' && n.type !== 'warning' && <Info className="w-4 h-4" />}
                  </div>

                  <h3 className="font-extrabold text-xs text-slate-900">{n.title}</h3>
                </div>

                {!n.isRead && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C62828] animate-pulse" />
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pl-10">{n.message}</p>

              <div className="flex items-center justify-end text-[10px] text-slate-400 font-semibold pt-1">
                <span>{new Date(n.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-2">
            <Bell className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="font-extrabold text-slate-900 text-sm">No Notifications</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              You are all caught up! Account alerts and daily harvest updates will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
