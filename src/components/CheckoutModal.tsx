import React, { useState } from 'react';
import { PoultryPackage } from '../types';
import { store } from '../services/store';
import {
  X,
  Smartphone,
  Landmark,
  Globe2,
  Copy,
  Check,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Egg,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface CheckoutModalProps {
  pkg: PoultryPackage;
  onClose: () => void;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ pkg, onClose, onSuccess }) => {
  const settings = store.getSettings();
  const [method, setMethod] = useState<'easypaisa' | 'jazzcash' | 'bank_transfer' | 'crypto'>('easypaisa');
  const [transactionRef, setTransactionRef] = useState<string>('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionRef || transactionRef.trim().length < 3) {
      alert('Please enter a valid Transaction ID / TRX Reference Number.');
      return;
    }

    setIsSubmitting(true);

    const finalProof = screenshotPreview || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80';

    // Submit deposit / package purchase request
    store.requestDeposit(pkg.price, method, transactionRef, finalProof);

    setIsSubmitting(false);
    setSuccessMsg(
      `Package purchase request for "${pkg.name}" submitted successfully! Payment ref: ${transactionRef}. Admin approval required.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-100 overflow-hidden relative my-auto max-h-[90vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="bg-[#C62828] p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFB300] text-slate-950 flex items-center justify-center font-black">
              <Egg className="w-6 h-6 fill-slate-950" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">Hen Package Checkout</h3>
              <p className="text-red-100 text-xs">{pkg.name} (${pkg.price} USD)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-red-200 hover:text-white p-2 rounded-xl hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {!successMsg ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Package Summary Card */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex items-center gap-3">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C62828] bg-red-50 px-2 py-0.5 rounded-md">
                      {pkg.tier} Category
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">${pkg.price}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs truncate mt-0.5">{pkg.name}</h4>
                  <p className="text-[11px] text-slate-500">
                    {pkg.flockSize} Hens • ${pkg.dailyAmount}/day ({pkg.eggCratesPerDay} crates/day)
                  </p>
                </div>
              </div>

              {/* Step 1: Select Payment Method */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                  1. Select Payment Channel
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setMethod('easypaisa')}
                    className={`p-2.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition cursor-pointer ${
                      method === 'easypaisa'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>EasyPaisa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod('jazzcash')}
                    className={`p-2.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition cursor-pointer ${
                      method === 'jazzcash'
                        ? 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-rose-600" />
                    <span>JazzCash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod('bank_transfer')}
                    className={`p-2.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition cursor-pointer ${
                      method === 'bank_transfer'
                        ? 'border-[#C62828] bg-red-50 text-red-900 ring-2 ring-red-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Landmark className="w-4 h-4 text-[#C62828]" />
                    <span>Bank Transfer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod('crypto')}
                    className={`p-2.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition cursor-pointer ${
                      method === 'crypto'
                        ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Globe2 className="w-4 h-4 text-amber-600" />
                    <span>Crypto (USDT)</span>
                  </button>
                </div>
              </div>

              {/* Step 2: Account Details Box */}
              <div className="bg-amber-50/70 border border-[#FFB300]/60 rounded-2xl p-3.5 text-xs space-y-2">
                <div className="font-bold text-amber-950 flex items-center justify-between">
                  <span>Send ${pkg.price} USD Payment To:</span>
                  <span className="text-[10px] bg-[#FFB300] text-slate-950 px-2 py-0.5 rounded-md font-bold uppercase">
                    Official Receiver
                  </span>
                </div>

                {method === 'easypaisa' && (
                  <div className="space-y-1.5 text-slate-700 pt-1">
                    <div className="flex justify-between">
                      <span>Account Title:</span>
                      <strong className="text-slate-900">{settings.easypaisaInfo.title}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>EasyPaisa Number:</span>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-emerald-700 font-mono text-sm">
                          {settings.easypaisaInfo.number}
                        </strong>
                        <button
                          type="button"
                          onClick={() => handleCopy(settings.easypaisaInfo.number, 'ep')}
                          className="p-1 text-slate-500 hover:text-emerald-700 cursor-pointer"
                        >
                          {copiedKey === 'ep' ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {method === 'jazzcash' && (
                  <div className="space-y-1.5 text-slate-700 pt-1">
                    <div className="flex justify-between">
                      <span>Account Title:</span>
                      <strong className="text-slate-900">{settings.jazzcashInfo.title}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>JazzCash Number:</span>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-rose-700 font-mono text-sm">
                          {settings.jazzcashInfo.number}
                        </strong>
                        <button
                          type="button"
                          onClick={() => handleCopy(settings.jazzcashInfo.number, 'jc')}
                          className="p-1 text-slate-500 hover:text-rose-700 cursor-pointer"
                        >
                          {copiedKey === 'jc' ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {method === 'bank_transfer' && (
                  <div className="space-y-1 text-slate-700 pt-1">
                    <div className="flex justify-between">
                      <span>Bank Name:</span>
                      <strong className="text-slate-900">{settings.bankInfo.bankName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Account Title:</span>
                      <strong className="text-slate-900">{settings.bankInfo.accountTitle}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Account Number:</span>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-[#C62828] font-mono text-sm">
                          {settings.bankInfo.accountNumber}
                        </strong>
                        <button
                          type="button"
                          onClick={() => handleCopy(settings.bankInfo.accountNumber, 'acc')}
                          className="p-1 text-slate-500 hover:text-[#C62828] cursor-pointer"
                        >
                          {copiedKey === 'acc' ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {method === 'crypto' && (
                  <div className="space-y-1.5 text-slate-700 pt-1">
                    <div className="flex justify-between">
                      <span>Network:</span>
                      <strong className="text-slate-900">USDT (TRC-20)</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Wallet Address:</span>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-amber-800 font-mono text-[11px] truncate max-w-[180px]">
                          TY8zX2mL9vQ4kP7s1R5tN8aB3cC6dE9fG0
                        </strong>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy('TY8zX2mL9vQ4kP7s1R5tN8aB3cC6dE9fG0', 'crypto')
                          }
                          className="p-1 text-slate-500 hover:text-amber-800 cursor-pointer"
                        >
                          {copiedKey === 'crypto' ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Transaction ID Input */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1">
                  2. Transaction Ref / TID Number
                </label>
                <input
                  type="text"
                  required
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-2xl text-sm font-mono uppercase text-slate-900 focus:ring-2 focus:ring-[#C62828] focus:outline-none"
                  placeholder="e.g. TRX-99482103 or EasyPaisa TID"
                />
              </div>

              {/* Step 4: Screenshot Proof Upload */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1">
                  3. Upload Payment Screenshot Receipt
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-3 bg-slate-50 hover:bg-slate-100 transition text-center cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {screenshotPreview ? (
                    <div className="space-y-1.5">
                      <img
                        src={screenshotPreview}
                        alt="Screenshot Preview"
                        className="h-28 mx-auto object-contain rounded-xl border border-slate-200"
                      />
                      <span className="text-[11px] font-bold text-emerald-600 block">
                        ✓ Screenshot uploaded! Tap to change image.
                      </span>
                    </div>
                  ) : (
                    <div className="py-2 text-slate-500 space-y-1">
                      <ImageIcon className="w-6 h-6 mx-auto text-slate-400" />
                      <span className="text-xs font-bold text-slate-700 block">
                        Tap here to attach payment receipt screenshot
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        Supports PNG, JPG, JPEG from mobile photo library
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-[11px] text-amber-900 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#C62828] shrink-0 mt-0.5" />
                <span>
                  Admin approval required. Once submitted, our team verifies your receipt within 5-15 minutes to activate your hen flock.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#C62828] hover:bg-[#B71C1C] text-white font-bold text-sm rounded-2xl shadow-md transition cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting Purchase...' : `Submit Purchase ($${pkg.price})`}
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-extrabold text-slate-900">Purchase Submitted!</h4>
              <p className="text-slate-600 text-xs leading-relaxed max-w-sm mx-auto">
                {successMsg}
              </p>
              <button
                onClick={() => {
                  if (onSuccess) onSuccess();
                  onClose();
                }}
                className="px-6 py-2.5 bg-[#C62828] text-white font-bold text-xs rounded-2xl hover:bg-[#B71C1C] transition cursor-pointer"
              >
                View My Hens
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
