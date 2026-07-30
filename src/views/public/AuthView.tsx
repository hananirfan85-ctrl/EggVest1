import React, { useState } from 'react';
import { store } from '../../services/store';
import { Egg, ShieldCheck, Mail, Lock, User, Phone, Gift, ArrowRight, Sparkles, CheckCircle2, Footprints } from 'lucide-react';

interface AuthViewProps {
  onSuccess: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (mode === 'login') {
      const res = store.login(email);
      if (res.success) {
        setSuccessMsg('Logged in successfully! Redirecting...');
        setTimeout(() => onSuccess(), 600);
      } else {
        setError(res.message);
      }
    } else {
      if (!name.trim()) {
        setError('Please enter your full name');
        return;
      }
      const res = store.signUp(name, email, phone, referralCode);
      if (res.success) {
        setSuccessMsg('Account created successfully! Redirecting...');
        setTimeout(() => onSuccess(), 600);
      } else {
        setError(res.message);
      }
    }
  };

  const handleQuickAdmin = () => {
    setEmail('hananirfan85@gmail.com');
    setName('Hanan Irfan');
    setPassword('admin123');
    const res = store.login('hananirfan85@gmail.com');
    if (res.success) {
      setSuccessMsg('Logged in as Super Admin (hananirfan85@gmail.com)!');
      setTimeout(() => onSuccess(), 600);
    }
  };

  const handleQuickDemoUser = () => {
    setEmail('investor@ovumyield.com');
    setPassword('demo123');
    const res = store.login('investor@ovumyield.com');
    if (res.success) {
      setSuccessMsg('Logged in as Demo Investor!');
      setTimeout(() => onSuccess(), 600);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col justify-center items-center p-4 font-['Poppins',sans-serif]">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        {/* TOP BRANDING BANNER */}
        <div className="bg-gradient-to-b from-[#B71C1C] via-[#C62828] to-[#D32F2F] pt-8 pb-10 px-6 text-white text-center relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-white p-1 shadow-md border-2 border-[#FFB300] flex items-center justify-center">
              <img
                src="/src/assets/images/eggvest_farm_fresh_logo_1785388413796.jpg"
                alt="EggVest Logo"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">
                Egg<span className="text-[#FFB300]">Vest</span>
              </h1>
              <p className="text-xs text-red-100 font-medium mt-0.5">
                Smart Poultry Investment & Daily Egg Yield Platform
              </p>
            </div>
          </div>
        </div>

        {/* AUTH MODE TOGGLE TABS */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/60 text-xs font-extrabold">
            <button
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`py-3 rounded-xl transition cursor-pointer ${
                mode === 'login' ? 'bg-[#C62828] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setError(null);
              }}
              className={`py-3 rounded-xl transition cursor-pointer ${
                mode === 'signup' ? 'bg-[#C62828] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* MESSAGES */}
          {error && (
            <div className="bg-rose-50 text-rose-700 text-xs font-bold p-3 rounded-2xl border border-rose-200 text-center animate-in fade-in">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-50 text-emerald-700 text-xs font-bold p-3 rounded-2xl border border-emerald-200 text-center animate-in fade-in flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
            {mode === 'signup' && (
              <div>
                <label className="block text-slate-700 font-extrabold mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Hanan Irfan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#C62828] text-slate-900 font-bold"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-slate-700 font-extrabold mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#C62828] text-slate-900 font-bold"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-slate-700 font-extrabold mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#C62828] text-slate-900 font-bold"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-slate-700 font-extrabold mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#C62828] text-slate-900 font-bold"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-slate-700 font-extrabold mb-1">Referral Code (Optional)</label>
                <div className="relative">
                  <Gift className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="e.g. OVUM-ALEX7"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#C62828] text-slate-900 font-bold uppercase"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-[#C62828] hover:bg-[#B71C1C] text-white font-extrabold text-xs rounded-2xl shadow-lg transition cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <span>{mode === 'login' ? 'Log In to Account' : 'Create EggVest Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
