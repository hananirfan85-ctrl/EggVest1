import { PoultryPackage, BlogPost, SystemSettings, User, UserPackage, WalletTransaction, DepositRequest, WithdrawalRequest, SupportTicket, Notification, AuditLog } from '../types';

export const INITIAL_SETTINGS: SystemSettings = {
  siteName: "EggVest Commercial Poultry",
  contactEmail: "support@eggvest.com",
  contactPhone: "+92 300 1234567",
  minDeposit: 50,
  minWithdrawal: 20,
  withdrawalFeePercent: 2.5,
  referralL1Percent: 8,
  referralL2Percent: 3,
  eggPricePerCrate: 4.50, // USD per crate of 30 Grade-A Eggs
  autoRewardEngineEnabled: true,
  maintenanceMode: false,
  bankInfo: {
    bankName: "HBL (Habib Bank Limited)",
    accountTitle: "Hanan Irfan / EggVest Poultry Accounts",
    accountNumber: "00427901234501",
    iban: "PK36HABB0000427901234501"
  },
  easypaisaInfo: {
    title: "Hanan Irfan (EggVest Operations)",
    number: "0300-1234567"
  },
  jazzcashInfo: {
    title: "Hanan Irfan (EggVest Operations)",
    number: "0312-7654321"
  }
};

export const INITIAL_PACKAGES: PoultryPackage[] = [
  {
    id: "pkg-starter",
    name: "Layer Flock Starter",
    tagline: "Ideal for entry-level poultry investors",
    tier: "Starter",
    flockSize: 50,
    eggCratesPerDay: 1.2,
    price: 100,
    dailyRewardRate: 1.2, // 1.2% daily
    dailyAmount: 1.20,
    durationDays: 120,
    totalReturn: 144, // 144% total ($144 return)
    totalAmount: 144,
    availability: 85,
    totalSlots: 100,
    status: "active",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80",
    description: "Co-own a modern bio-secure flock of 50 High-Yield Lohmann Brown layers producing premium Grade-A eggs daily.",
    features: [
      "50 Premium Layer Hens",
      "Daily Egg Yield Harvested & Sold",
      "Automated Climate Control Coop",
      "Comprehensive Veterinary Cover",
      "Daily Payouts to Wallet"
    ]
  },
  {
    id: "pkg-bronze",
    name: "Coop Batch Bronze",
    tagline: "Steady daily passive yield from organic egg sales",
    tier: "Bronze",
    flockSize: 150,
    eggCratesPerDay: 3.8,
    price: 300,
    dailyRewardRate: 1.35,
    dailyAmount: 4.05,
    durationDays: 120,
    totalReturn: 162,
    totalAmount: 486,
    availability: 42,
    totalSlots: 75,
    status: "active",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80",
    description: "Expanded flock unit with automated feeding troughs, automated egg sorting conveyor lines, and guaranteed retail buyer contracts.",
    features: [
      "150 Automated Layer Hens",
      "Direct Retail Distribution Contract",
      "Biweekly Veterinary Inspection",
      "1.35% Daily Fixed Yield",
      "Instant Wallet Claims"
    ]
  },
  {
    id: "pkg-silver",
    name: "Commercial Flock Silver",
    tagline: "High-volume commercial layer coop with compound option",
    tier: "Silver",
    flockSize: 500,
    eggCratesPerDay: 13.5,
    price: 1000,
    dailyRewardRate: 1.5,
    dailyAmount: 15.00,
    durationDays: 150,
    totalReturn: 225,
    totalAmount: 2250,
    availability: 18,
    totalSlots: 50,
    status: "active",
    image: "https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&w=800&q=80",
    description: "Commercial tier coop partnership in automated climate-controlled poultry barn with priority buyer allocation and high daily returns.",
    features: [
      "500 High-Productivity Hens",
      "Solar Powered Climate Sheds",
      "Automated Egg Packaging Line",
      "1.50% Daily Yield Payout",
      "Priority Withdrawal Processing"
    ]
  },
  {
    id: "pkg-gold",
    name: "Industrial Aviary Gold",
    tagline: "Enterprise poultry production for serious asset growth",
    tier: "Gold",
    flockSize: 1500,
    eggCratesPerDay: 42.0,
    price: 3000,
    dailyRewardRate: 1.7,
    dailyAmount: 51.00,
    durationDays: 180,
    totalReturn: 306,
    totalAmount: 9180,
    availability: 7,
    totalSlots: 20,
    status: "active",
    image: "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?auto=format&fit=crop&w=800&q=80",
    description: "Industrial scale aviary housing 1,500 organic layer hens. Includes feed mill profit share, egg liquid processing rights, and dedicated account manager.",
    features: [
      "1,500 Certified Organic Layers",
      "Feed Production Profit Bonus",
      "Dedicated Account Manager",
      "1.70% Daily Yield Payout",
      "Zero Withdrawal Fees"
    ]
  },
  {
    id: "pkg-enterprise",
    name: "Mega Farm Institutional",
    tagline: "Turnkey commercial poultry farm division",
    tier: "Enterprise",
    flockSize: 5000,
    eggCratesPerDay: 145.0,
    price: 10000,
    dailyRewardRate: 2.0,
    dailyAmount: 200.00,
    durationDays: 200,
    totalReturn: 400,
    totalAmount: 40000,
    availability: 2,
    totalSlots: 5,
    status: "active",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80",
    description: "Institutional partnership unit backing an entire automated shed block. Full mortality insurance, organic fertilizer export revenue share, and VIP support.",
    features: [
      "5,000 Layer Hens Division",
      "Full Mortality & Disease Insurance",
      "Organic Fertilizer Revenue Share",
      "2.00% Daily Yield Payout",
      "Quarterly On-Site Farm Visits"
    ]
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "post-1",
    title: "How Automated Egg Sorting & Climate Control Boost Daily Yields by 28%",
    slug: "automated-egg-sorting-yield-boost",
    summary: "Discover how smart sensors and automated temperature modulation reduce hen stress and keep egg production peak all year long.",
    content: "Modern poultry farming has evolved beyond manual feeding and traditional coops. At OvumYield, our state-of-the-art sheds utilize IoT temperature, humidity, and airflow sensors to maintain an ideal 22°C microclimate year-round. This minimizes hen heat stress, leading to a consistent 96%+ laying rate and superior Grade-A egg quality.",
    category: "Technology",
    author: "Dr. Jonathan Vance, Chief Aviary Officer",
    publishedAt: "2026-07-15",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80",
    readTime: "4 min read"
  },
  {
    id: "post-2",
    title: "Understanding Poultry Investment: How Daily Egg Sales Generate Real Asset Yields",
    slug: "understanding-poultry-investment-daily-yields",
    summary: "Unlike speculative assets, egg production is backed by continuous, inelastic global consumer demand.",
    content: "Eggs remain the world's most accessible, high-protein food staple. By investing in live layer hen batches, co-investors gain direct exposure to daily cash flows from commercial egg sales to supermarket chains, bakeries, and industrial food processors.",
    category: "Investment Guide",
    author: "Sarah Lin, Senior Financial Analyst",
    publishedAt: "2026-07-20",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80",
    readTime: "6 min read"
  },
  {
    id: "post-3",
    title: "Biosecurity Standards: Protecting Our Flocks Against Avian Risks",
    slug: "biosecurity-standards-protecting-flocks",
    summary: "A deep dive into our multi-layered quarantine, sanitation, and vaccination protocols that guarantee 99.4% flock survival.",
    content: "Biosecurity is the cornerstone of sustainable commercial egg production. Learn how OvumYield enforces air filtration, strict vehicle decontamination, bio-lock entry points, and routine veterinary PCR screening.",
    category: "Farm Operations",
    author: "Dr. Maria Santos, DVM",
    publishedAt: "2026-07-25",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80",
    readTime: "5 min read"
  }
];

export const INITIAL_NETWORK_BANNERS = [
  {
    id: "banner-1",
    title: "REFER & EARN",
    subtitle: "Share Happiness, Earn Rewards!",
    badge: "Get 2 Eggs FREE!",
    desc: "Invite friends, earn 8% commission on every hen package purchased.",
    bg: "from-[#B71C1C] via-[#C62828] to-[#D32F2F]",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "banner-2",
    title: "EggVest Poultry",
    subtitle: "Start Your Smart Farming Journey",
    badge: "Smarter Farming, Better Yields",
    desc: "Healthy Hens, Happy Life. Daily fresh eggs harvested automatically.",
    bg: "from-[#880E4F] via-[#C62828] to-[#E53935]",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "banner-3",
    title: "Lohman Layer Flocks",
    subtitle: "High Density Bio-Secure Poultry Units",
    badge: "Grade-A Certified",
    desc: "24/7 automated climate control and guaranteed daily egg crate distribution.",
    bg: "from-[#1B5E20] via-[#2E7D32] to-[#43A047]",
    image: "https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&w=600&q=80"
  }
];

export const MOCK_USERS: User[] = [
  {
    id: "usr-hanan",
    name: "Hanan Irfan",
    email: "hananirfan85@gmail.com",
    phone: "+92 300 1234567",
    role: "admin",
    avatar: "/src/assets/images/eggvest_app_logo_1785351725406.jpg",
    kycStatus: "verified",
    referralCode: "OVUM-HANAN1",
    walletBalance: 50000.00,
    totalEarnings: 12500.00,
    totalReferralEarnings: 3200.00,
    createdAt: "2026-01-01"
  },
  {
    id: "usr-demo",
    name: "Alex Sterling",
    email: "investor@ovumyield.com",
    phone: "+1 555-019-2834",
    role: "investor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    kycStatus: "verified",
    referralCode: "OVUM-ALEX7",
    walletBalance: 485.50,
    totalEarnings: 312.00,
    totalReferralEarnings: 64.00,
    bankDetails: {
      bankName: "Chase Bank",
      accountTitle: "Alex Sterling",
      accountNumber: "48201938221",
      iban: "US91CHAS0048201938221"
    },
    createdAt: "2026-06-01"
  },
  {
    id: "usr-admin",
    name: "Chief Admin",
    email: "admin@ovumyield.com",
    phone: "+1 555-000-8888",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    kycStatus: "verified",
    referralCode: "OVUM-BOSS1",
    walletBalance: 25000.00,
    totalEarnings: 0,
    totalReferralEarnings: 0,
    createdAt: "2026-01-01"
  }
];


export const MOCK_USER_PACKAGES: UserPackage[] = [
  {
    id: "upkg-101",
    userId: "usr-demo",
    packageId: "pkg-bronze",
    packageName: "Coop Batch Bronze",
    tier: "Bronze",
    purchasePrice: 300,
    dailyReward: 4.05,
    eggCratesPerDay: 3.8,
    purchaseDate: "2026-06-10",
    activationDate: "2026-06-10",
    expiryDate: "2026-10-08",
    durationDays: 120,
    remainingDays: 71,
    status: "active",
    totalRewardCollected: 198.45,
    lastClaimDate: "2026-07-28"
  },
  {
    id: "upkg-102",
    userId: "usr-demo",
    packageId: "pkg-starter",
    packageName: "Layer Flock Starter",
    tier: "Starter",
    purchasePrice: 100,
    dailyReward: 1.20,
    eggCratesPerDay: 1.2,
    purchaseDate: "2026-07-01",
    activationDate: "2026-07-01",
    expiryDate: "2026-10-29",
    durationDays: 120,
    remainingDays: 92,
    status: "active",
    totalRewardCollected: 33.60,
    lastClaimDate: "2026-07-28"
  }
];

export const MOCK_TRANSACTIONS: WalletTransaction[] = [
  {
    id: "tx-901",
    userId: "usr-demo",
    userName: "Alex Sterling",
    type: "deposit",
    amount: 500,
    status: "completed",
    description: "Deposit via Bank Transfer - Approved",
    createdAt: "2026-06-09T14:22:00Z",
    paymentMethod: "bank_transfer"
  },
  {
    id: "tx-902",
    userId: "usr-demo",
    userName: "Alex Sterling",
    type: "package_purchase",
    amount: 300,
    status: "completed",
    description: "Purchased Coop Batch Bronze Package",
    createdAt: "2026-06-10T09:15:00Z",
    paymentMethod: "internal_wallet"
  },
  {
    id: "tx-903",
    userId: "usr-demo",
    userName: "Alex Sterling",
    type: "referral_commission",
    amount: 24.00,
    status: "completed",
    description: "Level 1 Referral bonus from Marcus Vance (Silver Package)",
    createdAt: "2026-07-12T11:05:00Z",
    paymentMethod: "internal_wallet"
  },
  {
    id: "tx-904",
    userId: "usr-demo",
    userName: "Alex Sterling",
    type: "daily_reward",
    amount: 5.25,
    status: "completed",
    description: "Daily Egg Yield harvest payout (4.50 crates)",
    createdAt: "2026-07-28T08:00:00Z",
    paymentMethod: "internal_wallet"
  }
];

export const MOCK_DEPOSITS: DepositRequest[] = [
  {
    id: "dep-101",
    userId: "usr-demo",
    userName: "Alex Sterling",
    userEmail: "investor@ovumyield.com",
    amount: 500,
    paymentMethod: "bank_transfer",
    transactionReference: "AGRI-TX-8829104",
    proofImageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80",
    status: "approved",
    notes: "Wire transfer confirmed by accounting",
    adminNote: "Verified with bank statement #4821",
    createdAt: "2026-06-09T12:00:00Z",
    updatedAt: "2026-06-09T14:22:00Z"
  },
  {
    id: "dep-102",
    userId: "usr-demo",
    userName: "Alex Sterling",
    userEmail: "investor@ovumyield.com",
    amount: 250,
    paymentMethod: "easypaisa",
    transactionReference: "EP-8823019",
    proofImageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80",
    status: "pending",
    notes: "EasyPaisa transaction proof attached",
    createdAt: "2026-07-29T10:15:00Z"
  }
];

export const MOCK_WITHDRAWALS: WithdrawalRequest[] = [
  {
    id: "wd-201",
    userId: "usr-demo",
    userName: "Alex Sterling",
    userEmail: "investor@ovumyield.com",
    amount: 100,
    fee: 2.50,
    netAmount: 97.50,
    payoutMethod: "bank_transfer",
    accountDetails: "Chase Bank - A/C 48201938221",
    status: "approved",
    adminNote: "Processed via ACH transfer #99210",
    createdAt: "2026-07-15T16:00:00Z",
    updatedAt: "2026-07-16T10:00:00Z"
  }
];

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: "tkt-301",
    userId: "usr-demo",
    userName: "Alex Sterling",
    userEmail: "investor@ovumyield.com",
    subject: "Inquiry about compound reward options for Silver Package",
    category: "reward",
    priority: "medium",
    status: "in_progress",
    createdAt: "2026-07-22T09:30:00Z",
    updatedAt: "2026-07-22T11:00:00Z",
    messages: [
      {
        id: "msg-1",
        sender: "user",
        senderName: "Alex Sterling",
        message: "Hello team, if I upgrade to Silver package, can I automatically re-invest daily egg yield to buy additional hen slots?",
        createdAt: "2026-07-22T09:30:00Z"
      },
      {
        id: "msg-2",
        sender: "support",
        senderName: "OvumYield Care",
        message: "Hi Alex! Yes, you can enable 'Auto-Compound' in your Assets panel or manually use wallet balance to purchase additional flock starter packages.",
        createdAt: "2026-07-22T11:00:00Z"
      }
    ]
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    userId: "usr-demo",
    title: "Daily Egg Harvest Claimed!",
    message: "You claimed $5.25 from your Bronze & Starter flocks today.",
    type: "success",
    isRead: false,
    createdAt: "2026-07-28T08:00:00Z"
  },
  {
    id: "notif-2",
    userId: "usr-demo",
    title: "Referral Bonus Credited",
    message: "You earned $24.00 referral commission from Marcus Vance.",
    type: "info",
    isRead: true,
    createdAt: "2026-07-12T11:05:00Z"
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: "log-1",
    actorId: "usr-admin",
    actorName: "Chief Admin",
    action: "APPROVE_DEPOSIT",
    target: "Deposit #dep-101 ($500)",
    ipAddress: "192.168.1.100",
    timestamp: "2026-06-09T14:22:00Z",
    details: "Approved bank transfer deposit for Alex Sterling."
  },
  {
    id: "log-2",
    actorId: "usr-admin",
    actorName: "Chief Admin",
    action: "UPDATE_PACKAGE",
    target: "Layer Flock Starter",
    ipAddress: "192.168.1.100",
    timestamp: "2026-07-01T10:00:00Z",
    details: "Adjusted package duration to 120 days."
  }
];
