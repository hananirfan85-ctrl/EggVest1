export type UserRole = 'investor' | 'admin' | 'support';

export type KYCStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  kycStatus: KYCStatus;
  referralCode: string;
  referredBy?: string;
  walletBalance: number;
  totalEarnings: number;
  totalReferralEarnings: number;
  bankDetails?: {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    iban?: string;
  };
  mobileWallet?: {
    provider: 'easypaisa' | 'jazzcash' | 'other';
    accountTitle: string;
    accountNumber: string;
  };
  createdAt: string;
}

export interface PoultryPackage {
  id: string;
  name: string;
  tagline: string;
  tier: 'Starter' | 'Bronze' | 'Silver' | 'Gold' | 'Enterprise';
  flockSize: number; // number of hens
  eggCratesPerDay: number; // egg crates produced daily
  price: number; // USD / PKR value
  dailyRewardRate: number; // percentage or fixed amount
  dailyAmount: number; // USD earned per day
  durationDays: number;
  totalReturn: number; // Total ROI percentage e.g. 150%
  totalAmount: number; // Price * Total Return
  availability: number; // remaining slots
  totalSlots: number;
  status: 'active' | 'sold_out' | 'coming_soon';
  image: string;
  description: string;
  features: string[];
}

export interface UserPackage {
  id: string;
  userId: string;
  packageId: string;
  packageName: string;
  tier: string;
  purchasePrice: number;
  dailyReward: number;
  eggCratesPerDay: number;
  purchaseDate: string;
  activationDate: string;
  expiryDate: string;
  durationDays: number;
  remainingDays: number;
  status: 'active' | 'expired' | 'paused';
  totalRewardCollected: number;
  lastClaimDate?: string;
}

export type TransactionType = 'deposit' | 'withdrawal' | 'daily_reward' | 'referral_commission' | 'package_purchase' | 'bonus';
export type TransactionStatus = 'completed' | 'pending' | 'rejected' | 'failed';

export interface WalletTransaction {
  id: string;
  userId: string;
  userName?: string;
  type: TransactionType;
  amount: number;
  fee?: number;
  status: TransactionStatus;
  description: string;
  referenceId?: string;
  createdAt: string;
  paymentMethod?: 'bank_transfer' | 'easypaisa' | 'jazzcash' | 'crypto' | 'internal_wallet';
}

export interface DepositRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  paymentMethod: 'bank_transfer' | 'easypaisa' | 'jazzcash' | 'crypto';
  transactionReference: string;
  proofImageUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  adminNote?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  fee: number;
  netAmount: number;
  payoutMethod: 'bank_transfer' | 'easypaisa' | 'jazzcash' | 'crypto';
  accountDetails: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNote?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface RewardLog {
  id: string;
  userId: string;
  userPackageId: string;
  packageName: string;
  amount: number;
  eggCrates: number;
  eggPricePerCrate: number;
  claimedAt: string;
  autoClaimed: boolean;
}

export interface ReferralRecord {
  id: string;
  referrerId: string;
  referredUserId: string;
  referredUserName: string;
  referredUserEmail: string;
  level: 1 | 2; // Level 1 (Direct 8%), Level 2 (Indirect 3%)
  commissionAmount: number;
  packageName?: string;
  packagePrice?: number;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  category: 'deposit' | 'withdrawal' | 'reward' | 'package' | 'technical' | 'other';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  messages: {
    id: string;
    sender: 'user' | 'support' | 'admin';
    senderName: string;
    message: string;
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  image: string;
  readTime: string;
}

export interface SystemSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  minDeposit: number;
  minWithdrawal: number;
  withdrawalFeePercent: number;
  referralL1Percent: number;
  referralL2Percent: number;
  eggPricePerCrate: number;
  autoRewardEngineEnabled: boolean;
  maintenanceMode: boolean;
  bankInfo: {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    iban: string;
  };
  easypaisaInfo: {
    title: string;
    number: string;
  };
  jazzcashInfo: {
    title: string;
    number: string;
  };
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  action: string;
  target: string;
  ipAddress: string;
  timestamp: string;
  details: string;
}
