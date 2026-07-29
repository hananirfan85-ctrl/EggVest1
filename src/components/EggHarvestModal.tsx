import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { store } from '../services/store';
import { Egg, CheckCircle2, Sparkles, AlertCircle, ArrowRight, X } from 'lucide-react';

interface EggHarvestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EggHarvestModal: React.FC<EggHarvestModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const pending = store.getPendingRewardsForUser();
  const [claiming, setClaiming] = useState(false);
  const [claimResult, setClaimResult] = useState<{ amount: number; crates: number } | null>(null);

  const handleHarvest = () => {
    setClaiming(true);
    setTimeout(() => {
      const res = store.claimDailyRewards();
      setClaiming(false);
      if (res.success) {
        setClaimResult({ amount: res.amountClaimed, crates: res.cratesHarvested });
        // Trigger celebratory confetti burst!
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          console.log(e);
        }
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-amber-100 overflow-hidden relative">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1.5 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Egg className="w-10 h-10 text-amber-100 fill-amber-300 animate-bounce" />
          </div>
          <h3 className="text-xl font-bold">Daily Egg Harvest Engine</h3>
          <p className="text-amber-100 text-xs mt-1">Collect cash yield from your active layer hen coops</p>
        </div>

        <div className="p-6">
          {!claimResult ? (
            <div>
              {pending.totalAmount > 0 ? (
                <div className="space-y-4">
                  <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
                      Ready to Harvest Today
                    </span>
                    <div className="text-3xl font-extrabold text-slate-900">
                      ${pending.totalAmount.toFixed(2)}
                    </div>
                    <div className="text-xs text-amber-800 font-semibold mt-1 flex items-center justify-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{pending.totalCrates.toFixed(1)} Crates of Grade-A Eggs</span>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Flock Yield Breakdown
                    </div>
                    {pending.packages.map((pkg, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-xs border border-slate-100"
                      >
                        <div>
                          <div className="font-semibold text-slate-800">{pkg.packageName}</div>
                          <div className="text-slate-500 text-[11px]">{pkg.crates.toFixed(1)} Crates Produced</div>
                        </div>
                        <div className="font-bold text-emerald-600">
                          +${pkg.amount.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleHarvest}
                    disabled={claiming}
                    className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50"
                  >
                    {claiming ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sorting & Selling Eggs...</span>
                      </>
                    ) : (
                      <>
                        <Egg className="w-4 h-4 fill-current" />
                        <span>Collect ${pending.totalAmount.toFixed(2)} Yield Now</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-base">All Flocks Harvested Today!</h4>
                  <p className="text-slate-500 text-xs max-w-xs mx-auto">
                    Your layer hens are actively laying for tomorrow's batch. Check back in 24 hours for the next egg crate collection.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-6 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
                  >
                    Close Engine
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Yield Credited!</h4>
                <p className="text-xs text-slate-500 mt-1">
                  ${claimResult.amount.toFixed(2)} from {claimResult.crates.toFixed(1)} egg crates has been deposited directly into your wallet balance.
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 font-semibold">
                Updated Wallet Balance Available Immediately
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
