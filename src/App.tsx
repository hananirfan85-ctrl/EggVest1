import React, { useState, useEffect } from 'react';
import { store } from './services/store';
import { User, PoultryPackage } from './types';
import { Home, Egg, LayoutDashboard, Wallet, User as UserIcon } from 'lucide-react';

// Shared Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { DepositModal } from './components/DepositModal';
import { WithdrawModal } from './components/WithdrawModal';
import { EggHarvestModal } from './components/EggHarvestModal';
import { RESTApiModal } from './components/RESTApiModal';

// Public Views
import { HomeView } from './views/public/HomeView';
import { AboutView } from './views/public/AboutView';
import { HowItWorksView } from './views/public/HowItWorksView';
import { PackagesMarketplaceView } from './views/public/PackagesMarketplaceView';
import { FAQView } from './views/public/FAQView';
import { BlogView } from './views/public/BlogView';
import { ContactView } from './views/public/ContactView';
import { LegalView } from './views/public/LegalView';

// User Views
import { UserDashboardView } from './views/user/UserDashboardView';
import { UserAssetsView } from './views/user/UserAssetsView';
import { UserRewardsView } from './views/user/UserRewardsView';
import { UserWalletView } from './views/user/UserWalletView';
import { UserReferralView } from './views/user/UserReferralView';
import { UserProfileView } from './views/user/UserProfileView';
import { UserSupportView } from './views/user/UserSupportView';

// Admin Views
import { AdminDashboardView } from './views/admin/AdminDashboardView';
import { AdminUserMgmtView } from './views/admin/AdminUserMgmtView';
import { AdminPackageMgmtView } from './views/admin/AdminPackageMgmtView';
import { AdminDepositApprovalsView } from './views/admin/AdminDepositApprovalsView';
import { AdminWithdrawalApprovalsView } from './views/admin/AdminWithdrawalApprovalsView';
import { AdminSettingsView } from './views/admin/AdminSettingsView';
import { AdminAuditLogsView } from './views/admin/AdminAuditLogsView';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(store.getCurrentUser());
  const [activeTab, setActiveTab] = useState<string>('home');

  // Modals state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showHarvestModal, setShowHarvestModal] = useState(false);
  const [showAIDrawer, setShowAIDrawer] = useState(false);
  const [showAPIModal, setShowAPIModal] = useState(false);

  // Selected package for purchase modal/flow
  const [selectedPkgForPurchase, setSelectedPkgForPurchase] = useState<PoultryPackage | null>(null);

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setCurrentUser(store.getCurrentUser());
    });
    return unsub;
  }, []);

  const handleSelectPackage = (pkg: PoultryPackage) => {
    if (currentUser.walletBalance < pkg.price) {
      setSelectedPkgForPurchase(pkg);
      setShowDepositModal(true);
    } else {
      store.purchasePackage(pkg.id);
      setActiveTab('user-dashboard');
    }
  };

  const handleLogout = () => {
    store.logout();
    setActiveTab('home');
  };

  const renderCurrentView = () => {
    switch (activeTab) {
      // Public Tabs
      case 'home':
        return (
          <HomeView
            onNavigate={setActiveTab}
            onSelectPackage={handleSelectPackage}
            onOpenDeposit={() => setShowDepositModal(true)}
          />
        );
      case 'about':
        return <AboutView />;
      case 'how-it-works':
        return <HowItWorksView onNavigate={setActiveTab} />;
      case 'marketplace':
        return (
          <PackagesMarketplaceView
            onSelectPackage={handleSelectPackage}
            onOpenDeposit={() => setShowDepositModal(true)}
          />
        );
      case 'faq':
        return <FAQView />;
      case 'blog':
        return <BlogView />;
      case 'contact':
        return <ContactView />;
      case 'privacy':
        return <LegalView type="privacy" />;
      case 'terms':
        return <LegalView type="terms" />;

      // User Investor Tabs
      case 'user-dashboard':
        return (
          <UserDashboardView
            onNavigate={setActiveTab}
            onOpenDeposit={() => setShowDepositModal(true)}
            onOpenWithdraw={() => setShowWithdrawModal(true)}
            onOpenHarvest={() => setShowHarvestModal(true)}
          />
        );
      case 'user-assets':
        return (
          <UserAssetsView
            onNavigate={setActiveTab}
            onOpenHarvest={() => setShowHarvestModal(true)}
          />
        );
      case 'user-rewards':
        return <UserRewardsView onOpenHarvest={() => setShowHarvestModal(true)} />;
      case 'user-wallet':
        return (
          <UserWalletView
            onOpenDeposit={() => setShowDepositModal(true)}
            onOpenWithdraw={() => setShowWithdrawModal(true)}
          />
        );
      case 'user-referral':
        return <UserReferralView />;
      case 'user-profile':
        return <UserProfileView />;
      case 'user-support':
        return <UserSupportView />;

      // Admin Tabs
      case 'admin-dashboard':
        return <AdminDashboardView onNavigate={setActiveTab} />;
      case 'admin-users':
        return <AdminUserMgmtView />;
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
        return <HomeView onNavigate={setActiveTab} onSelectPackage={handleSelectPackage} onOpenDeposit={() => setShowDepositModal(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans antialiased text-slate-900 selection:bg-amber-500 selection:text-white pb-16 sm:pb-0">
      {/* Header Bar */}
      <Navbar
        currentTab={activeTab}
        onNavigate={setActiveTab}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenDeposit={() => setShowDepositModal(true)}
        onOpenHarvest={() => setShowHarvestModal(true)}
        onOpenAPIDocs={() => setShowAPIModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Mobile App Bottom Tab Bar (Visible on mobile screens) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 text-slate-400 border-t border-slate-800 px-2 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer transition ${
            activeTab === 'home' ? 'text-amber-400' : 'hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('marketplace')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer transition ${
            activeTab === 'marketplace' ? 'text-amber-400' : 'hover:text-white'
          }`}
        >
          <Egg className="w-5 h-5" />
          <span>Packages</span>
        </button>

        <button
          onClick={() => setActiveTab('user-dashboard')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer transition ${
            activeTab === 'user-dashboard' ? 'text-amber-400' : 'hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Portal</span>
        </button>

        <button
          onClick={() => setActiveTab('user-wallet')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer transition ${
            activeTab === 'user-wallet' ? 'text-amber-400' : 'hover:text-white'
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span>Wallet</span>
        </button>

        <button
          onClick={() => setActiveTab('user-profile')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer transition ${
            activeTab === 'user-profile' ? 'text-amber-400' : 'hover:text-white'
          }`}
        >
          <UserIcon className="w-5 h-5" />
          <span>Account</span>
        </button>
      </nav>

      {/* Footer (Hidden on mobile) */}
      <Footer onNavigate={setActiveTab} onOpenAPIDocs={() => setShowAPIModal(true)} />

      {/* Modals & Slide-over drawers */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
            const u = store.getCurrentUser();
            setActiveTab(u.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
          }}
        />
      )}

      {showDepositModal && (
        <DepositModal
          onClose={() => setShowDepositModal(false)}
          onSuccess={() => {
            setShowDepositModal(false);
            setActiveTab('user-wallet');
          }}
        />
      )}

      {showWithdrawModal && (
        <WithdrawModal
          onClose={() => setShowWithdrawModal(false)}
          onSuccess={() => {
            setShowWithdrawModal(false);
            setActiveTab('user-wallet');
          }}
        />
      )}

      {showHarvestModal && (
        <EggHarvestModal
          onClose={() => setShowHarvestModal(false)}
          onSuccess={() => {
            setShowHarvestModal(false);
            setActiveTab('user-wallet');
          }}
        />
      )}

      {showAPIModal && (
        <RESTApiModal onClose={() => setShowAPIModal(false)} />
      )}
    </div>
  );
}
