import {
  User,
  PoultryPackage,
  UserPackage,
  WalletTransaction,
  DepositRequest,
  WithdrawalRequest,
  SupportTicket,
  Notification,
  BlogPost,
  SystemSettings,
  AuditLog
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_PACKAGES,
  INITIAL_BLOGS,
  MOCK_USERS,
  MOCK_USER_PACKAGES,
  MOCK_TRANSACTIONS,
  MOCK_DEPOSITS,
  MOCK_WITHDRAWALS,
  MOCK_TICKETS,
  MOCK_NOTIFICATIONS,
  MOCK_AUDIT_LOGS
} from './initialData';

const STORAGE_KEYS = {
  USERS: 'ovum_users_v2',
  CURRENT_USER_ID: 'ovum_current_user_id_v2',
  PACKAGES: 'ovum_packages_v2',
  USER_PACKAGES: 'ovum_user_packages_v2',
  TRANSACTIONS: 'ovum_transactions_v2',
  DEPOSITS: 'ovum_deposits_v2',
  WITHDRAWALS: 'ovum_withdrawals_v2',
  TICKETS: 'ovum_tickets_v2',
  NOTIFICATIONS: 'ovum_notifications_v2',
  SETTINGS: 'ovum_settings_v2',
  LOGS: 'ovum_logs_v2',
  BLOGS: 'ovum_blogs_v2',
};

// Helper for localStorage
function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn(`Error loading key ${key} from localStorage`, e);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error saving key ${key} to localStorage`, e);
  }
}

class AppStore {
  private users: User[];
  private currentUserId: string;
  private packages: PoultryPackage[];
  private userPackages: UserPackage[];
  private transactions: WalletTransaction[];
  private deposits: DepositRequest[];
  private withdrawals: WithdrawalRequest[];
  private tickets: SupportTicket[];
  private notifications: Notification[];
  private settings: SystemSettings;
  private auditLogs: AuditLog[];
  private blogs: BlogPost[];

  private listeners: Set<() => void> = new Set();

  constructor() {
    this.users = loadFromStorage(STORAGE_KEYS.USERS, MOCK_USERS);
    this.currentUserId = loadFromStorage(STORAGE_KEYS.CURRENT_USER_ID, "usr-demo");
    this.packages = loadFromStorage(STORAGE_KEYS.PACKAGES, INITIAL_PACKAGES);
    this.userPackages = loadFromStorage(STORAGE_KEYS.USER_PACKAGES, MOCK_USER_PACKAGES);
    this.transactions = loadFromStorage(STORAGE_KEYS.TRANSACTIONS, MOCK_TRANSACTIONS);
    this.deposits = loadFromStorage(STORAGE_KEYS.DEPOSITS, MOCK_DEPOSITS);
    this.withdrawals = loadFromStorage(STORAGE_KEYS.WITHDRAWALS, MOCK_WITHDRAWALS);
    this.tickets = loadFromStorage(STORAGE_KEYS.TICKETS, MOCK_TICKETS);
    this.notifications = loadFromStorage(STORAGE_KEYS.NOTIFICATIONS, MOCK_NOTIFICATIONS);
    this.settings = loadFromStorage(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    this.auditLogs = loadFromStorage(STORAGE_KEYS.LOGS, MOCK_AUDIT_LOGS);
    this.blogs = loadFromStorage(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    saveToStorage(STORAGE_KEYS.USERS, this.users);
    saveToStorage(STORAGE_KEYS.CURRENT_USER_ID, this.currentUserId);
    saveToStorage(STORAGE_KEYS.PACKAGES, this.packages);
    saveToStorage(STORAGE_KEYS.USER_PACKAGES, this.userPackages);
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, this.transactions);
    saveToStorage(STORAGE_KEYS.DEPOSITS, this.deposits);
    saveToStorage(STORAGE_KEYS.WITHDRAWALS, this.withdrawals);
    saveToStorage(STORAGE_KEYS.TICKETS, this.tickets);
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, this.notifications);
    saveToStorage(STORAGE_KEYS.SETTINGS, this.settings);
    saveToStorage(STORAGE_KEYS.LOGS, this.auditLogs);
    saveToStorage(STORAGE_KEYS.BLOGS, this.blogs);

    this.listeners.forEach((l) => l());
  }

  // --- AUTH & USER ---
  public getCurrentUser(): User {
    const found = this.users.find(u => u.id === this.currentUserId);
    return found || this.users[0];
  }

  public setCurrentUserId(id: string) {
    this.currentUserId = id;
    this.notify();
  }

  public logout() {
    this.currentUserId = MOCK_USERS[0].id;
    this.notify();
  }

  public switchRole(role: 'investor' | 'admin') {
    if (role === 'admin') {
      const admin = this.users.find(u => u.role === 'admin') || MOCK_USERS[1];
      this.currentUserId = admin.id;
    } else {
      const investor = this.users.find(u => u.role === 'investor') || MOCK_USERS[0];
      this.currentUserId = investor.id;
    }
    this.notify();
  }

  public registerUser(name: string, email: string, phone: string, referralCode?: string): User {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: 'investor',
      kycStatus: 'unverified',
      referralCode: `OVUM-${name.slice(0, 4).toUpperCase()}${Math.floor(Math.random() * 90 + 10)}`,
      referredBy: referralCode || undefined,
      walletBalance: 0,
      totalEarnings: 0,
      totalReferralEarnings: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    this.users.unshift(newUser);
    this.currentUserId = newUser.id;

    // Add welcoming notification
    this.addNotification(
      newUser.id,
      "Welcome to OvumYield!",
      "Your poultry investment account is ready. Deposit funds to start earning daily egg rewards.",
      "info"
    );

    this.addAuditLog(newUser.id, newUser.name, "USER_REGISTER", newUser.id, "New investor registered");

    this.notify();
    return newUser;
  }

  public updateProfile(userId: string, data: Partial<User>) {
    this.users = this.users.map(u => u.id === userId ? { ...u, ...data } : u);
    this.notify();
  }

  public submitKYC(userId: string, idNumber: string, docUrl: string) {
    this.users = this.users.map(u => u.id === userId ? { ...u, kycStatus: 'pending' } : u);
    this.addNotification(userId, "KYC Submitted", "Your identity verification documents are under review by our compliance team.", "info");
    this.addAuditLog(userId, this.getCurrentUser().name, "SUBMIT_KYC", userId, `Submitted ID #${idNumber}`);
    this.notify();
  }

  // --- PACKAGES ---
  public getPackages(): PoultryPackage[] {
    return this.packages;
  }

  public getUserPackages(userId?: string): UserPackage[] {
    const uid = userId || this.currentUserId;
    return this.userPackages.filter(p => p.userId === uid);
  }

  public purchasePackage(packageId: string): { success: boolean; message: string } {
    const currentUser = this.getCurrentUser();
    const pkg = this.packages.find(p => p.id === packageId);

    if (!pkg) {
      return { success: false, message: "Selected package was not found." };
    }

    if (pkg.status !== 'active' || pkg.availability <= 0) {
      return { success: false, message: "Package is currently sold out or unavailable." };
    }

    if (currentUser.walletBalance < pkg.price) {
      return { success: false, message: `Insufficient wallet balance ($${currentUser.walletBalance.toFixed(2)}). Please deposit at least $${(pkg.price - currentUser.walletBalance).toFixed(2)} more.` };
    }

    // Deduct balance
    const updatedBalance = currentUser.walletBalance - pkg.price;
    this.users = this.users.map(u => u.id === currentUser.id ? { ...u, walletBalance: updatedBalance } : u);

    // Update package availability
    this.packages = this.packages.map(p => p.id === pkg.id ? { ...p, availability: p.availability - 1 } : p);

    // Calculate dates
    const now = new Date();
    const expiry = new Date(now.getTime() + pkg.durationDays * 24 * 60 * 60 * 1000);

    // Create UserPackage
    const newUserPkg: UserPackage = {
      id: `upkg-${Date.now()}`,
      userId: currentUser.id,
      packageId: pkg.id,
      packageName: pkg.name,
      tier: pkg.tier,
      purchasePrice: pkg.price,
      dailyReward: pkg.dailyAmount,
      eggCratesPerDay: pkg.eggCratesPerDay,
      purchaseDate: now.toISOString().split('T')[0],
      activationDate: now.toISOString().split('T')[0],
      expiryDate: expiry.toISOString().split('T')[0],
      durationDays: pkg.durationDays,
      remainingDays: pkg.durationDays,
      status: 'active',
      totalRewardCollected: 0
    };

    this.userPackages.unshift(newUserPkg);

    // Record Transaction
    const tx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      type: 'package_purchase',
      amount: pkg.price,
      status: 'completed',
      description: `Purchased ${pkg.name} (${pkg.flockSize} Hens)`,
      createdAt: new Date().toISOString(),
      paymentMethod: 'internal_wallet'
    };
    this.transactions.unshift(tx);

    // Referral Commission Logic
    if (currentUser.referredBy) {
      const referrer = this.users.find(u => u.referralCode === currentUser.referredBy || u.id === currentUser.referredBy);
      if (referrer) {
        const commRate = this.settings.referralL1Percent / 100; // e.g. 8%
        const commission = pkg.price * commRate;

        // Credit referrer
        this.users = this.users.map(u => u.id === referrer.id ? {
          ...u,
          walletBalance: u.walletBalance + commission,
          totalReferralEarnings: u.totalReferralEarnings + commission
        } : u);

        // Record Referral Transaction
        this.transactions.unshift({
          id: `tx-ref-${Date.now()}`,
          userId: referrer.id,
          userName: referrer.name,
          type: 'referral_commission',
          amount: commission,
          status: 'completed',
          description: `Direct Referral Commission (${this.settings.referralL1Percent}%) from ${currentUser.name} (${pkg.name})`,
          createdAt: new Date().toISOString(),
          paymentMethod: 'internal_wallet'
        });

        this.addNotification(
          referrer.id,
          "Referral Commission Earned!",
          `You earned $${commission.toFixed(2)} from ${currentUser.name}'s purchase of ${pkg.name}.`,
          "success"
        );
      }
    }

    this.addNotification(
      currentUser.id,
      "Package Activated!",
      `Successfully purchased ${pkg.name}. Your flock of ${pkg.flockSize} hens is active and producing eggs daily.`,
      "success"
    );

    this.addAuditLog(currentUser.id, currentUser.name, "PURCHASE_PACKAGE", pkg.id, `Spent $${pkg.price}`);

    this.notify();
    return { success: true, message: `Successfully acquired ${pkg.name}! Your daily egg harvest has commenced.` };
  }

  // --- REWARD ENGINE ---
  public getPendingRewardsForUser(userId?: string): { totalAmount: number; totalCrates: number; packages: { upkgId: string; packageName: string; amount: number; crates: number }[] } {
    const uid = userId || this.currentUserId;
    const activePackages = this.userPackages.filter(p => p.userId === uid && p.status === 'active');
    const today = new Date().toISOString().split('T')[0];

    let totalAmount = 0;
    let totalCrates = 0;
    const list: { upkgId: string; packageName: string; amount: number; crates: number }[] = [];

    for (const upkg of activePackages) {
      if (upkg.lastClaimDate !== today) {
        totalAmount += upkg.dailyReward;
        totalCrates += upkg.eggCratesPerDay;
        list.push({
          upkgId: upkg.id,
          packageName: upkg.packageName,
          amount: upkg.dailyReward,
          crates: upkg.eggCratesPerDay
        });
      }
    }

    return { totalAmount, totalCrates, packages: list };
  }

  public claimDailyRewards(): { success: boolean; amountClaimed: number; cratesHarvested: number; message: string } {
    const currentUser = this.getCurrentUser();
    const pending = this.getPendingRewardsForUser(currentUser.id);

    if (pending.totalAmount <= 0) {
      return { success: false, amountClaimed: 0, cratesHarvested: 0, message: "You have already harvested today's egg yield for all active flocks!" };
    }

    const today = new Date().toISOString().split('T')[0];

    // Update user balance & earnings
    this.users = this.users.map(u => u.id === currentUser.id ? {
      ...u,
      walletBalance: u.walletBalance + pending.totalAmount,
      totalEarnings: u.totalEarnings + pending.totalAmount
    } : u);

    // Update UserPackages claim state
    const claimedIds = new Set(pending.packages.map(p => p.upkgId));
    this.userPackages = this.userPackages.map(upkg => {
      if (claimedIds.has(upkg.id)) {
        return {
          ...upkg,
          lastClaimDate: today,
          totalRewardCollected: upkg.totalRewardCollected + upkg.dailyReward,
          remainingDays: Math.max(0, upkg.remainingDays - 1),
          status: upkg.remainingDays - 1 <= 0 ? 'expired' : 'active'
        };
      }
      return upkg;
    });

    // Add Wallet Transaction
    this.transactions.unshift({
      id: `tx-reward-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      type: 'daily_reward',
      amount: pending.totalAmount,
      status: 'completed',
      description: `Daily Egg Yield Harvest (${pending.totalCrates.toFixed(1)} Crates @ $${this.settings.eggPricePerCrate}/crate)`,
      createdAt: new Date().toISOString(),
      paymentMethod: 'internal_wallet'
    });

    this.addNotification(
      currentUser.id,
      "Daily Egg Yield Harvested!",
      `Successfully claimed $${pending.totalAmount.toFixed(2)} from ${pending.totalCrates.toFixed(1)} egg crates today.`,
      "success"
    );

    this.addAuditLog(currentUser.id, currentUser.name, "CLAIM_REWARDS", currentUser.id, `Claimed $${pending.totalAmount.toFixed(2)}`);

    this.notify();
    return {
      success: true,
      amountClaimed: pending.totalAmount,
      cratesHarvested: pending.totalCrates,
      message: `Harvest Complete! $${pending.totalAmount.toFixed(2)} credited from ${pending.totalCrates.toFixed(1)} crates of Grade-A eggs.`
    };
  }

  // --- WALLET & PAYMENTS ---
  public requestDeposit(amount: number, paymentMethod: 'bank_transfer' | 'easypaisa' | 'jazzcash' | 'crypto', reference: string, proofUrl?: string): DepositRequest {
    const currentUser = this.getCurrentUser();

    const dep: DepositRequest = {
      id: `dep-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      amount,
      paymentMethod,
      transactionReference: reference,
      proofImageUrl: proofUrl || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80",
      status: 'pending',
      notes: `User submitted deposit request via ${paymentMethod}`,
      createdAt: new Date().toISOString()
    };

    this.deposits.unshift(dep);

    this.addNotification(
      currentUser.id,
      "Deposit Request Submitted",
      `Your $${amount.toFixed(2)} deposit via ${paymentMethod.replace('_', ' ')} is pending admin approval.`,
      "info"
    );

    this.addAuditLog(currentUser.id, currentUser.name, "REQUEST_DEPOSIT", dep.id, `Amount $${amount}`);

    this.notify();
    return dep;
  }

  public requestWithdrawal(amount: number, payoutMethod: 'bank_transfer' | 'easypaisa' | 'jazzcash' | 'crypto', accountDetails: string): { success: boolean; message: string; withdrawal?: WithdrawalRequest } {
    const currentUser = this.getCurrentUser();

    if (amount < this.settings.minWithdrawal) {
      return { success: false, message: `Minimum withdrawal amount is $${this.settings.minWithdrawal}.` };
    }

    if (currentUser.walletBalance < amount) {
      return { success: false, message: `Insufficient wallet balance ($${currentUser.walletBalance.toFixed(2)}).` };
    }

    const fee = (amount * this.settings.withdrawalFeePercent) / 100;
    const netAmount = amount - fee;

    // Deduct balance immediately into pending state
    this.users = this.users.map(u => u.id === currentUser.id ? { ...u, walletBalance: u.walletBalance - amount } : u);

    const wd: WithdrawalRequest = {
      id: `wd-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      amount,
      fee,
      netAmount,
      payoutMethod,
      accountDetails,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    this.withdrawals.unshift(wd);

    this.transactions.unshift({
      id: `tx-wd-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      type: 'withdrawal',
      amount: amount,
      fee: fee,
      status: 'pending',
      description: `Withdrawal request to ${accountDetails}`,
      createdAt: new Date().toISOString(),
      paymentMethod: payoutMethod
    });

    this.addNotification(
      currentUser.id,
      "Withdrawal Processing",
      `Your withdrawal request of $${amount.toFixed(2)} (Net: $${netAmount.toFixed(2)}) is being processed.`,
      "info"
    );

    this.addAuditLog(currentUser.id, currentUser.name, "REQUEST_WITHDRAWAL", wd.id, `Amount $${amount}`);

    this.notify();
    return { success: true, message: `Withdrawal request submitted for $${amount.toFixed(2)}. Net payout $${netAmount.toFixed(2)}.`, withdrawal: wd };
  }

  // --- ADMIN APPROVAL WORKFLOWS ---
  public approveDeposit(depositId: string, adminNote?: string) {
    const dep = this.deposits.find(d => d.id === depositId);
    if (!dep || dep.status !== 'pending') return;

    // Mark deposit approved
    this.deposits = this.deposits.map(d => d.id === depositId ? {
      ...d,
      status: 'approved',
      adminNote: adminNote || 'Approved by Administrator',
      updatedAt: new Date().toISOString()
    } : d);

    // Credit user balance
    this.users = this.users.map(u => u.id === dep.userId ? { ...u, walletBalance: u.walletBalance + dep.amount } : u);

    // Wallet Transaction Record
    this.transactions.unshift({
      id: `tx-dep-app-${Date.now()}`,
      userId: dep.userId,
      userName: dep.userName,
      type: 'deposit',
      amount: dep.amount,
      status: 'completed',
      description: `Deposit Approved via ${dep.paymentMethod.replace('_', ' ')} (Ref: ${dep.transactionReference})`,
      createdAt: new Date().toISOString(),
      paymentMethod: dep.paymentMethod
    });

    this.addNotification(
      dep.userId,
      "Deposit Approved!",
      `Your deposit of $${dep.amount.toFixed(2)} has been verified and added to your wallet balance.`,
      "success"
    );

    this.addAuditLog(this.currentUserId, "Admin", "APPROVE_DEPOSIT", dep.id, `Credited $${dep.amount} to User ${dep.userId}`);

    this.notify();
  }

  public rejectDeposit(depositId: string, adminNote: string) {
    const dep = this.deposits.find(d => d.id === depositId);
    if (!dep || dep.status !== 'pending') return;

    this.deposits = this.deposits.map(d => d.id === depositId ? {
      ...d,
      status: 'rejected',
      adminNote,
      updatedAt: new Date().toISOString()
    } : d);

    this.addNotification(
      dep.userId,
      "Deposit Declined",
      `Your deposit request of $${dep.amount.toFixed(2)} was declined. Reason: ${adminNote}`,
      "error"
    );

    this.addAuditLog(this.currentUserId, "Admin", "REJECT_DEPOSIT", dep.id, `Declined deposit: ${adminNote}`);

    this.notify();
  }

  public approveWithdrawal(withdrawalId: string, adminNote?: string) {
    const wd = this.withdrawals.find(w => w.id === withdrawalId);
    if (!wd || wd.status !== 'pending') return;

    this.withdrawals = this.withdrawals.map(w => w.id === withdrawalId ? {
      ...w,
      status: 'approved',
      adminNote: adminNote || 'Processed by Administrator',
      updatedAt: new Date().toISOString()
    } : w);

    // Update pending transaction status
    this.transactions = this.transactions.map(t => t.description.includes(wd.accountDetails) && t.status === 'pending' ? {
      ...t,
      status: 'completed'
    } : t);

    this.addNotification(
      wd.userId,
      "Withdrawal Completed!",
      `Your payout of $${wd.netAmount.toFixed(2)} has been sent to ${wd.accountDetails}.`,
      "success"
    );

    this.addAuditLog(this.currentUserId, "Admin", "APPROVE_WITHDRAWAL", wd.id, `Approved $${wd.amount} payout`);

    this.notify();
  }

  public rejectWithdrawal(withdrawalId: string, adminNote: string) {
    const wd = this.withdrawals.find(w => w.id === withdrawalId);
    if (!wd || wd.status !== 'pending') return;

    // Refund user balance
    this.users = this.users.map(u => u.id === wd.userId ? { ...u, walletBalance: u.walletBalance + wd.amount } : u);

    this.withdrawals = this.withdrawals.map(w => w.id === withdrawalId ? {
      ...w,
      status: 'rejected',
      adminNote,
      updatedAt: new Date().toISOString()
    } : w);

    this.transactions.unshift({
      id: `tx-wd-ref-${Date.now()}`,
      userId: wd.userId,
      userName: wd.userName,
      type: 'bonus',
      amount: wd.amount,
      status: 'completed',
      description: `Refunded rejected withdrawal of $${wd.amount.toFixed(2)}`,
      createdAt: new Date().toISOString(),
      paymentMethod: 'internal_wallet'
    });

    this.addNotification(
      wd.userId,
      "Withdrawal Rejected - Funds Refunded",
      `Your withdrawal request of $${wd.amount.toFixed(2)} was rejected (${adminNote}). Funds have been restored to your wallet.`,
      "warning"
    );

    this.addAuditLog(this.currentUserId, "Admin", "REJECT_WITHDRAWAL", wd.id, `Refunded $${wd.amount} to User ${wd.userId}`);

    this.notify();
  }

  // --- ADMIN SETTINGS & MANAGEMENT ---
  public updateSettings(newSettings: Partial<SystemSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    this.addAuditLog(this.currentUserId, "Admin", "UPDATE_SETTINGS", "SystemSettings", "Modified application settings");
    this.notify();
  }

  public savePackage(pkg: PoultryPackage) {
    const exists = this.packages.some(p => p.id === pkg.id);
    if (exists) {
      this.packages = this.packages.map(p => p.id === pkg.id ? pkg : p);
    } else {
      this.packages.push(pkg);
    }
    this.addAuditLog(this.currentUserId, "Admin", exists ? "UPDATE_PACKAGE" : "CREATE_PACKAGE", pkg.id, pkg.name);
    this.notify();
  }

  public deletePackage(packageId: string) {
    this.packages = this.packages.filter(p => p.id !== packageId);
    this.addAuditLog(this.currentUserId, "Admin", "DELETE_PACKAGE", packageId, "Deleted investment package");
    this.notify();
  }

  public approveKYC(userId: string) {
    this.users = this.users.map(u => u.id === userId ? { ...u, kycStatus: 'verified' } : u);
    this.addNotification(userId, "KYC Approved", "Your account identity is fully verified! You now enjoy uninhibited deposits & withdrawals.", "success");
    this.addAuditLog(this.currentUserId, "Admin", "APPROVE_KYC", userId, "Verified investor KYC identity");
    this.notify();
  }

  public rejectKYC(userId: string, reason: string) {
    this.users = this.users.map(u => u.id === userId ? { ...u, kycStatus: 'rejected' } : u);
    this.addNotification(userId, "KYC Needs Revision", `Your identity verification requires changes: ${reason}`, "error");
    this.notify();
  }

  // --- SUPPORT TICKETS ---
  public createSupportTicket(subject: string, category: 'deposit' | 'withdrawal' | 'reward' | 'package' | 'technical' | 'other', message: string, priority: 'low' | 'medium' | 'high' = 'medium') {
    const user = this.getCurrentUser();
    const newTicket: SupportTicket = {
      id: `tkt-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      subject,
      category,
      priority,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'user',
          senderName: user.name,
          message,
          createdAt: new Date().toISOString()
        }
      ]
    };

    this.tickets.unshift(newTicket);
    this.notify();
    return newTicket;
  }

  public replyToTicket(ticketId: string, message: string, sender: 'user' | 'support' | 'admin') {
    const user = this.getCurrentUser();
    this.tickets = this.tickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: sender === 'user' ? 'open' : 'in_progress',
          updatedAt: new Date().toISOString(),
          messages: [
            ...t.messages,
            {
              id: `msg-${Date.now()}`,
              sender,
              senderName: sender === 'user' ? user.name : 'OvumYield Support Team',
              message,
              createdAt: new Date().toISOString()
            }
          ]
        };
      }
      return t;
    });
    this.notify();
  }

  // --- NOTIFICATIONS ---
  private addNotification(userId: string, title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') {
    this.notifications.unshift({
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId,
      title,
      message,
      type,
      isRead: false,
      createdAt: new Date().toISOString()
    });
  }

  public markNotificationRead(id: string) {
    this.notifications = this.notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
    this.notify();
  }

  public markAllNotificationsRead(userId?: string) {
    const uid = userId || this.currentUserId;
    this.notifications = this.notifications.map(n => n.userId === uid ? { ...n, isRead: true } : n);
    this.notify();
  }

  private addAuditLog(actorId: string, actorName: string, action: string, target: string, details: string) {
    this.auditLogs.unshift({
      id: `log-${Date.now()}`,
      actorId,
      actorName,
      action,
      target,
      ipAddress: "127.0.0.1",
      timestamp: new Date().toISOString(),
      details
    });
  }

  // --- GETTERS ---
  public getTransactions(userId?: string): WalletTransaction[] {
    if (userId) return this.transactions.filter(t => t.userId === userId);
    return this.transactions;
  }

  public getDeposits(userId?: string): DepositRequest[] {
    if (userId) return this.deposits.filter(d => d.userId === userId);
    return this.deposits;
  }

  public getWithdrawals(userId?: string): WithdrawalRequest[] {
    if (userId) return this.withdrawals.filter(w => w.userId === userId);
    return this.withdrawals;
  }

  public getTickets(userId?: string): SupportTicket[] {
    if (userId) return this.tickets.filter(t => t.userId === userId);
    return this.tickets;
  }

  public getNotifications(userId?: string): Notification[] {
    const uid = userId || this.currentUserId;
    return this.notifications.filter(n => n.userId === uid);
  }

  public getSettings(): SystemSettings {
    return this.settings;
  }

  public getAllUsers(): User[] {
    return this.users;
  }

  public getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  public getBlogs(): BlogPost[] {
    return this.blogs;
  }
}

export const store = new AppStore();
