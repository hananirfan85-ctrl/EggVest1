import React, { useState, useEffect } from 'react';
import { store } from './services/store';
import { User } from './types';

// Top Bar & Bottom Nav Components
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';

// Modals
import { DepositModal } from './components/DepositModal';
import { WithdrawModal } from './components/WithdrawModal';

// User Tab Views
import { HomeDashboardView } from './views/user/HomeDashboardView';
import { MyHensView } from './views/user/MyHensView';
import { BuyHensView } from './views/user/BuyHensView';
import { LogsView } from './views/user/LogsView';
import { ProfileView } from './views/user/ProfileView';
import { NotificationsView } from './views/user/NotificationsView';

// Admin Views
import { AdminDashboardView } from './views/admin/AdminDashboardView';
import { AdminUserMgmtView } from './views/admin/AdminUserMgmtView';
import { AdminPackageMgmtView } from './views/admin/AdminPackageMgmtView';
import { AdminDepositApprovalsView } from './views/admin/AdminDepositApprovalsView';
import { AdminWithdrawalApprovalsView } from './views/admin/AdminWithdrawalApprovalsView';
import { AdminSettingsView } from './views/admin/AdminSettingsView';
import { AdminAuditLogsView } from './views/admin/AdminAuditLogsView';

import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(store.getCurrentUser());
  const [activeTab, setActiveTab] = useState<string>('home');
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Modals state
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  useEffect(() => {
    const update = () => {
      const u = store.getCurrentUser();
      setCurrentUser(u);
      const notifications = store.getNotifications(u.id);
      setUnreadCount(notifications.filter((n) => !n.isRead).length);
    };
    update();
    return store.subscribe(update);
  }, []);

  const handleLogout = () => {
    store.logout();
    setActiveTab('home');
  };

  const isAdminView = activeTab.startsWith('admin-');

  const renderCurrentView = () => {
    switch (activeTab) {
      // 4 Main Bottom Navigation Views
      case 'home':
        return (
          <HomeDashboardView
            currentUser={currentUser}
            onNavigate={setActiveTab}
            onOpenDeposit={() => setShowDepositModal(true)}
            onOpenWithdraw={() => setShowWithdrawModal(true)}
          />
        );

      case 'my-hens':
        return <MyHensView currentUser={currentUser} onNavigate={setActiveTab} />;

      case 'buy-hens':
        return <BuyHensView onNavigate={setActiveTab} />;

      case 'logs':
        return <LogsView currentUser={currentUser} />;

      // Header Navigation Views
      case 'profile':
        return (
          <ProfileView
            currentUser={currentUser}
            onNavigate={setActiveTab}
            onOpenDeposit={() => setShowDepositModal(true)}
            onOpenWithdraw={() => setShowWithdrawModal(true)}
            onOpenAdmin={() => setActiveTab('admin-dashboard')}
            onLogout={handleLogout}
          />
        );

      case 'notifications':
        return <NotificationsView currentUser={currentUser} />;

      // Admin Views
      case 'admin-dashboard':
        return <AdminDashboardView onNavigate={setActiveTab} />;
      case 'admin-users':
        return <AdminUserMgmtView />;
      case 'admin-[#C62828]':
      case 'admin-packages':
        return <AdminPackageMgmtView />;
      case 'admin-deposits':
        return <AdminDepositApprovalsView />;
      case 'admin-withdrawals':
        return <AdminWithdrawalApprovalsView />;
      case 'admin-settings':
        return <AdminSettingsView />;
      case 'admin-audit':
        return <AdminAuditLogsView />;

      default:
        return (
          <HomeDashboardView
            currentUser={currentUser}
            onNavigate={setActiveTab}
            onOpenDeposit={() => setShowDepositModal(true)}
            onOpenWithdraw={() => setShowWithdrawModal(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-['Poppins',sans-serif] text-slate-900 flex flex-col antialiased selection:bg-[#C62828] selection:text-white">
      {/* Top Header Bar */}
      <TopBar
        currentUser={currentUser}
        unreadCount={unreadCount}
        onOpenProfile={() => setActiveTab('profile')}
        onOpenNotifications={() => setActiveTab('notifications')}
        onOpenAdmin={
          currentUser.role === 'admin'
            ? () => setActiveTab(isAdminView ? 'home' : 'admin-dashboard')
            : undefined
        }
      />

      {/* Admin Panel Sub-Header (if inside Admin Panel) */}
      {isAdminView && (
        <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FFB300]" />
            <span className="font-extrabold uppercase tracking-wider text-[#FFB300]">
              Admin Control Mode
            </span>
          </div>

          <button
            onClick={() => setActiveTab('home')}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold flex items-center gap-1 transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to App</span>
          </button>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 pb-20">{renderCurrentView()}</main>

      {/* Strict Bottom Navigation Bar (ONLY 4 TABS - Hidden when in Admin Mode) */}
      {!isAdminView && (
        <BottomNav activeTab={activeTab} onNavigate={setActiveTab} />
      )}

      {/* Modals */}
      {showDepositModal && (
        <DepositModal
          onClose={() => setShowDepositModal(false)}
          onSuccess={() => {
            setShowDepositModal(false);
            setActiveTab('logs');
          }}
        />
      )}

      {showWithdrawModal && (
        <WithdrawModal
          isOpen={showWithdrawModal}
          onClose={() => setShowWithdrawModal(false)}
        />
      )}
    </div>
  );
}
