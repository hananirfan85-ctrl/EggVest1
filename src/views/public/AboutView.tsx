import React from 'react';
import { Egg, ShieldCheck, Cpu, Award, Users, CheckCircle2 } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
          About OvumYield Facilities
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Commercial Poultry Infrastructure Built For Yield & Longevity
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          OvumYield combines IoT environmental controls, automated egg handling conveyors, and veterinary protocols to operate zero-defect layer poultry facilities.
        </p>
      </div>

      {/* Facility Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            State-Of-The-Art Climate Sheds
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Our facilities house high-yield Lohmann Brown & Hy-Line W-36 layer hens in automated, climate-regulated environments. Automated lighting, cooling pads, and feeding troughs ensure maximum comfort and an average 96.2% daily laying rate.
          </p>

          <div className="space-y-2 pt-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>IoT Temperature Regulation maintained at strictly 22°C year-round</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Automated Moba Egg Sorting & Weight Grading Conveyors</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Full Veterinary PCR Screening & Bio-Security Double Air-Locks</span>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80"
            alt="Poultry Farm Shed"
            className="w-full h-80 object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-xs p-3 rounded-xl text-white text-xs flex justify-between">
            <span>Location: Farm Sector 4B, Agri-Zone</span>
            <span className="text-emerald-400 font-bold">Capacity: 250,000 Hens</span>
          </div>
        </div>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2 text-center">
          <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center mx-auto font-bold text-base">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Automated Sorting</h3>
          <p className="text-slate-500 text-xs">Laser sensors detect egg shell integrity and auto-sort into 30-egg Grade-A crates.</p>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2 text-center">
          <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center mx-auto font-bold text-base">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Bio-Security</h3>
          <p className="text-slate-500 text-xs">Strict sanitation showers, air filtration, and zero unauthorized human contact.</p>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2 text-center">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center mx-auto font-bold text-base">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Direct Distribution</h3>
          <p className="text-slate-500 text-xs">Pre-agreed off-take contracts with retail supermarket chains ensure instant cash liquidity.</p>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2 text-center">
          <div className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center mx-auto font-bold text-base">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Veterinary Oversight</h3>
          <p className="text-slate-500 text-xs">Dedicated resident avian veterinarians conduct daily flock health evaluations.</p>
        </div>
      </div>
    </div>
  );
};
