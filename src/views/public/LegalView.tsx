import React from 'react';
import { Shield, Lock, FileText } from 'lucide-react';

interface LegalViewProps {
  type: 'privacy' | 'terms';
}

export const LegalView: React.FC<LegalViewProps> = ({ type }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Legal & Compliance
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">
          {type === 'privacy' ? 'Privacy Policy & Data Security' : 'Terms & Conditions of Investment'}
        </h1>
        <p className="text-slate-500 text-xs">Last updated: July 2026 • Version 2.4.0</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs text-slate-700 text-xs leading-relaxed space-y-6">
        {type === 'privacy' ? (
          <>
            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-sm">1. Data Collection Protocols</h2>
              <p>
                OvumYield respects your personal privacy. We collect personal identification information (Name, Email, Phone Number, Bank Account Details, and KYC Identity Documents) exclusively to manage your poultry co-investment contracts, process daily yield payouts, and comply with Anti-Money Laundering (AML) mandates.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-sm">2. Financial Data Encryption</h2>
              <p>
                All uploaded payment proof receipts, bank details, and identity documents are encrypted using 256-bit AES encryption at rest and TLS 1.3 in transit. Financial transaction logs are stored in immutable audit ledgers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-sm">3. Third-Party Sharing</h2>
              <p>
                We do not sell or lease investor personal information to third parties. Information is disclosed solely to authorized banking networks and veterinary compliance bodies when required by applicable agricultural laws.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-sm">1. Co-Investment Agreement</h2>
              <p>
                By acquiring a poultry package on OvumYield, you enter into a digital co-investment agreement backing live layer hen flock units. Daily rewards represent cash yield from real Grade-A egg crate sales to wholesale distribution partners.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-sm">2. Mortality Insurance & Biosecurity Guarantee</h2>
              <p>
                All layer hen coops are covered under comprehensive avian mortality insurance. In the event of unforeseen flock illness, insurance settlements cover replacement flock costs and guarantee projected daily payouts.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-sm">3. Withdrawal Terms</h2>
              <p>
                Investors may request cash withdrawals of accrued wallet balances anytime, subject to a minimum withdrawal amount of $20.00 and a 2.5% processing fee.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};
