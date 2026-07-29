import React from 'react';
import { Egg, Shield, Phone, Mail, MapPin, ExternalLink, Heart, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenAPIDocs: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAPIDocs }) => {
  return (
    <footer className="hidden sm:block bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 shadow-md">
                <Egg className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Egg<span className="text-amber-500">Vest</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Premier commercial poultry co-investment & egg production management platform. Modern bio-secure climate-controlled layer sheds delivering automated daily cash yields from inelastic global egg demand.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded text-[11px] text-emerald-400 font-medium">
                <Shield className="w-3.5 h-3.5" />
                <span>Bio-Security ISO 22000 Certified</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded text-[11px] text-amber-400 font-medium">
                <Lock className="w-3.5 h-3.5" />
                <span>256-bit SSL Encrypted</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Platform Navigation</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition cursor-pointer">Home</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-amber-400 transition cursor-pointer">Investment Packages</button></li>
              <li><button onClick={() => onNavigate('how-it-works')} className="hover:text-amber-400 transition cursor-pointer">How It Works</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition cursor-pointer">About Farm Facilities</button></li>
              <li><button onClick={() => onNavigate('blog')} className="hover:text-amber-400 transition cursor-pointer">Poultry Market News</button></li>
            </ul>
          </div>

          {/* Investor Portal Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Investor Services</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('user-dashboard')} className="hover:text-amber-400 transition cursor-pointer">User Dashboard</button></li>
              <li><button onClick={() => onNavigate('user-assets')} className="hover:text-amber-400 transition cursor-pointer">Active Flock Yields</button></li>
              <li><button onClick={() => onNavigate('user-wallet')} className="hover:text-amber-400 transition cursor-pointer">Wallet & Withdrawals</button></li>
              <li><button onClick={() => onNavigate('user-referral')} className="hover:text-amber-400 transition cursor-pointer">Referral Program</button></li>
              <li><button onClick={() => onNavigate('user-support')} className="hover:text-amber-400 transition cursor-pointer">24/7 Support Desk</button></li>
            </ul>
          </div>

          {/* Developers & Legal */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Developers & Legal</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenAPIDocs}
                  className="hover:text-amber-400 transition text-amber-400 font-mono text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" />
                  REST API Docs & OpenAPI
                </button>
              </li>
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-amber-400 transition cursor-pointer">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-amber-400 transition cursor-pointer">Terms & Conditions</button></li>
              <li><button onClick={() => onNavigate('faq')} className="hover:text-amber-400 transition cursor-pointer">Knowledge Base & FAQ</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} EggVest Commercial Poultry Operations Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with precision for commercial livestock investors
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
