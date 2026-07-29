import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { PoultryPackage } from '../../types';
import { Layers, PlusCircle, Edit, CheckCircle2 } from 'lucide-react';

export const AdminPackageMgmtView: React.FC = () => {
  const [packages, setPackages] = useState<PoultryPackage[]>(store.getPackages());
  const [showModal, setShowModal] = useState(false);
  const [editingPkg, setEditingPkg] = useState<PoultryPackage | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [tier, setTier] = useState<PoultryPackage['tier']>('Starter');
  const [price, setPrice] = useState(100);
  const [dailyAmount, setDailyAmount] = useState(2.0);
  const [dailyRewardRate, setDailyRewardRate] = useState(2.0);
  const [flockSize, setFlockSize] = useState(50);
  const [eggCratesPerDay, setEggCratesPerDay] = useState(1.5);
  const [durationDays, setDurationDays] = useState(90);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setPackages(store.getPackages());
    });
    return unsub;
  }, []);

  const openNewModal = () => {
    setEditingPkg(null);
    setName('');
    setTier('Starter');
    setPrice(100);
    setDailyAmount(2.0);
    setDailyRewardRate(2.0);
    setFlockSize(50);
    setEggCratesPerDay(1.5);
    setDurationDays(90);
    setDescription('Standard layer flock package producing Grade-A crates daily.');
    setImage('https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80');
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const pPrice = Number(price);
    const dAmt = Number(dailyAmount);
    const dur = Number(durationDays);
    const totalEarnings = dAmt * dur;
    const roi = pPrice > 0 ? Math.round((totalEarnings / pPrice) * 100) : 150;

    store.savePackage({
      id: editingPkg ? editingPkg.id : `pkg-${Date.now()}`,
      name,
      tagline: `${flockSize} Commercial Hens Flock`,
      tier,
      price: pPrice,
      dailyAmount: dAmt,
      dailyRewardRate: Number(dailyRewardRate),
      flockSize: Number(flockSize),
      eggCratesPerDay: Number(eggCratesPerDay),
      durationDays: dur,
      totalReturn: roi,
      totalAmount: totalEarnings,
      availability: 20,
      totalSlots: 50,
      status: 'active',
      description,
      image,
      features: [
        `${flockSize} High-Yield Layer Hens`,
        `${eggCratesPerDay} Grade-A Egg Crates/day`,
        "24/7 Veterinary Oversight",
        "Avian Mortality Insurance Included"
      ]
    });
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Poultry Package Catalog Management</h1>
          <p className="text-slate-500 text-xs mt-1">Configure investment tiers, daily ROI rates, and flock size allocations</p>
        </div>

        <button
          onClick={openNewModal}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Package</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <div key={pkg.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {pkg.tier}
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-1">{pkg.name}</h3>
              </div>
              <span className="font-extrabold text-slate-900 text-lg">${pkg.price}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Daily Yield</span>
                <strong className="text-emerald-600">${pkg.dailyAmount.toFixed(2)}/day ({pkg.dailyRewardRate}%)</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Egg Crates</span>
                <strong className="text-slate-900">{pkg.eggCratesPerDay} Crates/day</strong>
              </div>
            </div>

            <p className="text-slate-500 text-xs line-clamp-2">{pkg.description}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Create Commercial Poultry Package</h3>

            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Package Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs"
                    placeholder="e.g. Broiler Mega Coop"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tier</label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-xl text-xs"
                  >
                    <option value="Starter">Starter</option>
                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Daily Reward ($)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={dailyAmount}
                    onChange={(e) => setDailyAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 bg-amber-600 text-white font-bold text-xs rounded-xl"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
