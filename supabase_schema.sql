-- =========================================================
-- EggVest Smart Poultry Platform - Complete Supabase Schema & Initial Data
-- Copy and paste this ENTIRE script into your Supabase SQL Editor
-- (https://supabase.com/dashboard/project/_/sql) and click "Run".
-- =========================================================

-- 1. CLEAN DROP OF EXISTING TABLES TO PREVENT SCHEMA CONFLICTS
DROP TABLE IF EXISTS public.transactions CASCADE;
DROP TABLE IF EXISTS public.deposits CASCADE;
DROP TABLE IF EXISTS public.withdrawals CASCADE;
DROP TABLE IF EXISTS public.audit_logs CASCADE;
DROP TABLE IF EXISTS public.network_banners CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- 2. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role TEXT DEFAULT 'investor',
  avatar TEXT,
  kyc_status TEXT DEFAULT 'unverified',
  referral_code TEXT UNIQUE,
  referred_by TEXT,
  wallet_balance NUMERIC(12,2) DEFAULT 0.00,
  total_earnings NUMERIC(12,2) DEFAULT 0.00,
  total_referral_earnings NUMERIC(12,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id TEXT PRIMARY KEY,
  actor_id TEXT,
  actor_name TEXT,
  action TEXT NOT NULL,
  target TEXT,
  ip_address TEXT,
  details TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS public.transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  user_name TEXT,
  type TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  status TEXT DEFAULT 'completed',
  description TEXT,
  payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. DEPOSITS TABLE
CREATE TABLE IF NOT EXISTS public.deposits (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  user_name TEXT,
  user_email TEXT,
  amount NUMERIC(12,2) NOT NULL,
  payment_method TEXT,
  transaction_reference TEXT,
  proof_image_url TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  admin_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- 6. WITHDRAWALS TABLE
CREATE TABLE IF NOT EXISTS public.withdrawals (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  user_name TEXT,
  user_email TEXT,
  amount NUMERIC(12,2) NOT NULL,
  net_amount NUMERIC(12,2) NOT NULL,
  fee NUMERIC(12,2) DEFAULT 0.00,
  payment_method TEXT,
  account_details TEXT,
  status TEXT DEFAULT 'pending',
  admin_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- 7. NETWORK BANNERS TABLE
CREATE TABLE IF NOT EXISTS public.network_banners (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  badge TEXT,
  description_text TEXT,
  bg TEXT,
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. DISABLE RLS (ROW LEVEL SECURITY) FOR ANONYMOUS/CLIENT-SIDE ACCESS
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.deposits DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.network_banners DISABLE ROW LEVEL SECURITY;

-- 9. INITIAL SEED DATA (POPULATES SUPABASE INSTANTLY)

-- Insert Admin User & Sample Investors
INSERT INTO public.users (id, name, email, phone, role, avatar, kyc_status, referral_code, wallet_balance, total_earnings, total_referral_earnings, created_at)
VALUES 
  ('usr-admin-01', 'Hanan Irfan', 'hananirfan85@gmail.com', '+923001234567', 'admin', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'verified', 'EGGADMIN1', 5000.00, 1250.00, 450.00, NOW() - INTERVAL '30 days'),
  ('usr-inv-01', 'Zainab Ahmed', 'zainab.investor@gmail.com', '+923019876543', 'investor', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'verified', 'EGGZAINAB', 1200.00, 320.00, 100.00, NOW() - INTERVAL '20 days'),
  ('usr-inv-02', 'Tariq Mahmood', 'tariq.poultry@gmail.com', '+923215554433', 'investor', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'pending', 'EGGTARIQ', 450.00, 80.00, 0.00, NOW() - INTERVAL '10 days')
ON CONFLICT (id) DO UPDATE SET 
  role = EXCLUDED.role,
  name = EXCLUDED.name,
  kyc_status = EXCLUDED.kyc_status;

-- Insert Initial Audit Logs
INSERT INTO public.audit_logs (id, actor_id, actor_name, action, target, ip_address, details, timestamp)
VALUES 
  ('log-001', 'usr-admin-01', 'Hanan Irfan', 'SYSTEM_INITIALIZATION', 'Database', '127.0.0.1', 'EggVest Supabase database schema initialized successfully', NOW() - INTERVAL '5 days'),
  ('log-002', 'usr-admin-01', 'Hanan Irfan', 'USER_LOGIN', 'usr-admin-01', '127.0.0.1', 'Logged in to EggVest Smart Poultry platform', NOW() - INTERVAL '2 days')
ON CONFLICT (id) DO NOTHING;

-- Insert Sample Deposits
INSERT INTO public.deposits (id, user_id, user_name, user_email, amount, payment_method, transaction_reference, proof_image_url, status, notes, created_at)
VALUES 
  ('dep-001', 'usr-inv-01', 'Zainab Ahmed', 'zainab.investor@gmail.com', 1000.00, 'Bank Transfer', 'TRX-998811', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400', 'approved', 'Initial investment deposit', NOW() - INTERVAL '15 days'),
  ('dep-002', 'usr-inv-02', 'Tariq Mahmood', 'tariq.poultry@gmail.com', 500.00, 'EasyPaisa', 'EP-443322', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400', 'pending', 'Broiler package deposit', NOW() - INTERVAL '2 days')
ON CONFLICT (id) DO NOTHING;

-- Insert Sample Withdrawals
INSERT INTO public.withdrawals (id, user_id, user_name, user_email, amount, net_amount, fee, payment_method, account_details, status, created_at)
VALUES 
  ('wd-001', 'usr-inv-01', 'Zainab Ahmed', 'zainab.investor@gmail.com', 200.00, 190.00, 10.00, 'JazzCash', 'JazzCash Account: 03019876543 (Zainab Ahmed)', 'approved', NOW() - INTERVAL '7 days')
ON CONFLICT (id) DO NOTHING;

-- Insert Sample Transactions
INSERT INTO public.transactions (id, user_id, user_name, type, amount, status, description, payment_method, created_at)
VALUES 
  ('tx-001', 'usr-inv-01', 'Zainab Ahmed', 'deposit', 1000.00, 'completed', 'Deposit approved via Bank Transfer', 'Bank Transfer', NOW() - INTERVAL '15 days'),
  ('tx-002', 'usr-inv-01', 'Zainab Ahmed', 'investment', 800.00, 'completed', 'Invested in Layer Hen Unit Plan', 'Wallet', NOW() - INTERVAL '14 days'),
  ('tx-003', 'usr-inv-01', 'Zainab Ahmed', 'profit', 120.00, 'completed', 'Daily profit payout from Layer Hen Unit', 'System', NOW() - INTERVAL '7 days')
ON CONFLICT (id) DO NOTHING;
