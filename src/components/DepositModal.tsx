import React, { useState } from 'react';
import { store } from '../services/store';
import { Wallet, Landmark, Smartphone, Copy, Check, Upload, ArrowRight, X, Image as ImageIcon } from 'lucide-react';

interface DepositModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({ onClose, onSuccess }) => {
  const settings = store.getSettings();
  const [method, setMethod] = useState<'bank_transfer' | 'easypaisa' | 'jazzcash'>('easypaisa');
  const [amount, setAmount] = useState<number>(100);
  const [reference, setReference] = useState<string>('');
  const [proofUrl, setProofUrl] = useState<string>('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
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
        const result = reader.result as string;
        setScreenshotPreview(result);
        setProofUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference || reference.length < 3) {
      alert("Please provide a valid transaction ID / reference number.");
      return;
    }
    if (amount < settings.minDeposit) {
      alert(`Minimum deposit amount is $${settings.minDeposit}.`);
      return;
    }

    const finalProof = proofUrl || screenshotPreview || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80";

    store.requestDeposit(amount, method, reference, finalProof);
    setSuccessMsg(`Deposit request of $${amount.toFixed(2)} submitted successfully! Our verification team will credit your wallet within 5-15 minutes.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-100 overflow-hidden relative my-auto max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-slate-950 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Deposit Funds to Wallet</h3>
              <p className="text-slate-400 text-xs">Fund your EggVest account via EasyPaisa, JazzCash, or Bank</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto">
          {!successMsg ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Select Payment Channel */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Choose Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setMethod('easypaisa')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition cursor-pointer ${
                      method === 'easypaisa'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-emerald-600" />
                    <span>EasyPaisa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod('jazzcash')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition cursor-pointer ${
                      method === 'jazzcash'
                        ? 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-rose-600" />
                    <span>JazzCash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod('bank_transfer')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition cursor-pointer ${
                      method === 'bank_transfer'
                        ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Landmark className="w-5 h-5 text-amber-600" />
                    <span>Bank Transfer</span>
                  </button>
                </div>
              </div>

              {/* Destination Account Credentials */}
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3.5 text-xs space-y-2">
                <div className="font-bold text-amber-900 flex items-center justify-between">
                  <span>Send Payment To:</span>
                  <span className="text-[10px] bg-amber-200/80 text-amber-950 px-2 py-0.5 rounded font-bold uppercase">
                    Official Receiver
                  </span>
                </div>

                {method === 'easypaisa' && (
                  <div className="space-y-1 text-slate-700 pt-1">
                    <div className="flex justify-between"><span>Account Name:</span><strong className="text-slate-900">{settings.easypaisaInfo.title}</strong></div>
                    <div className="flex justify-between items-center">
                      <span>EasyPaisa Number:</span>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-emerald-700 font-mono text-sm">{settings.easypaisaInfo.number}</strong>
                        <button type="button" onClick={() => handleCopy(settings.easypaisaInfo.number, 'ep')} className="p-1 text-slate-500 hover:text-emerald-700 cursor-pointer">
                          {copiedKey === 'ep' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {method === 'jazzcash' && (
                  <div className="space-y-1 text-slate-700 pt-1">
                    <div className="flex justify-between"><span>Account Name:</span><strong className="text-slate-900">{settings.jazzcashInfo.title}</strong></div>
                    <div className="flex justify-between items-center">
                      <span>JazzCash Number:</span>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-rose-700 font-mono text-sm">{settings.jazzcashInfo.number}</strong>
                        <button type="button" onClick={() => handleCopy(settings.jazzcashInfo.number, 'jc')} className="p-1 text-slate-500 hover:text-rose-700 cursor-pointer">
                          {copiedKey === 'jc' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {method === 'bank_transfer' && (
                  <div className="space-y-1 text-slate-700 pt-1">
                    <div className="flex justify-between"><span>Bank Name:</span><strong className="text-slate-900">{settings.bankInfo.bankName}</strong></div>
                    <div className="flex justify-between"><span>Account Title:</span><strong className="text-slate-900">{settings.bankInfo.accountTitle}</strong></div>
                    <div className="flex justify-between items-center">
                      <span>Account Number:</span>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-amber-800 font-mono text-sm">{settings.bankInfo.accountNumber}</strong>
                        <button type="button" onClick={() => handleCopy(settings.bankInfo.accountNumber, 'acc')} className="p-1 text-slate-500 hover:text-amber-700 cursor-pointer">
                          {copiedKey === 'acc' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>IBAN:</span>
                      <strong className="text-slate-900 font-mono text-[11px]">{settings.bankInfo.iban}</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  2. Deposit Amount ($ USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    min={settings.minDeposit}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="Enter deposit amount"
                  />
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">Minimum deposit threshold: ${settings.minDeposit}</span>
              </div>

              {/* Transaction Reference / TRX ID */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  3. Transaction ID / Ref TRX Number
                </label>
                <input
                  type="text"
                  required
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-mono uppercase text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  placeholder="e.g. TRX-99482103 or EasyPaisa TID"
                />
              </div>

              {/* Client Screenshot Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  4. Upload Payment Receipt Screenshot
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-3 bg-slate-50 hover:bg-slate-100 transition text-center cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {screenshotPreview ? (
                    <div className="space-y-2">
                      <img
                        src={screenshotPreview}
                        alt="Screenshot Preview"
                        className="h-28 mx-auto object-contain rounded-lg border border-slate-200"
                      />
                      <span className="text-[11px] font-semibold text-emerald-600 block">✓ Screenshot attached successfully! Tap to change.</span>
                    </div>
                  ) : (
                    <div className="py-2 text-slate-500 space-y-1">
                      <ImageIcon className="w-6 h-6 mx-auto text-slate-400" />
                      <span className="text-xs font-bold text-slate-700 block">Tap to upload receipt screenshot</span>
                      <span className="text-[10px] text-slate-400 block">Supports PNG, JPG, JPEG from your phone gallery or computer</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Submit Deposit Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Deposit Submitted!</h4>
              <p className="text-slate-600 text-xs leading-relaxed max-w-sm mx-auto">
                {successMsg}
              </p>
              <button
                onClick={() => {
                  if (onSuccess) onSuccess();
                  onClose();
                }}
                className="px-6 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-slate-800 transition cursor-pointer"
              >
                Go to Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

