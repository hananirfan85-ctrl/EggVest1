import React, { useEffect, useState } from 'react';
import { Egg } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        onFinish();
      }, 500);
    }, 2200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-gradient-to-b from-rose-50 via-white to-red-50 flex flex-col items-center justify-between py-10 px-6 transition-opacity duration-500 font-['Poppins',sans-serif] ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Tag */}
      <div className="w-full flex justify-start">
        <span className="bg-red-100/80 border border-red-200 text-[#C62828] text-xs font-mono font-bold px-3 py-1 rounded-full shadow-xs">
          v1.0.0
        </span>
      </div>

      {/* Main Center Hen Badge */}
      <div className="flex flex-col items-center space-y-8 my-auto text-center">
        <div className="relative">
          {/* Animated pulsing outer ring */}
          <div className="absolute -inset-4 rounded-full bg-red-400/20 animate-ping opacity-75" />
          
          {/* Dotted border ring */}
          <div className="w-48 h-48 rounded-full border-2 border-dashed border-[#C62828]/30 flex items-center justify-center p-3 relative bg-white/50 backdrop-blur-xs shadow-xl">
            {/* Center circular image container */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-white to-red-50 flex items-center justify-center border-4 border-white shadow-inner overflow-hidden">
              <img
                src="src/assets/images/eggvest_app_logo_1785351725406.jpg"
                alt="EggVest Logo"
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-[#C62828] tracking-tight">
            Egg<span className="text-[#FFB300]">Vest</span>
          </h1>
          <div className="flex items-center justify-center gap-2">
            <span className="h-[1px] w-6 bg-slate-300" />
            <span className="text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
              SMART POULTRY MANAGEMENT
            </span>
            <span className="h-[1px] w-6 bg-slate-300" />
          </div>
        </div>
      </div>

      {/* Bottom Loading Progress Indicator */}
      <div className="flex flex-col items-center space-y-3 pb-4">
        {/* Dash bar indicators */}
        <div className="flex items-center gap-1.5">
          <span className="w-6 h-1.5 rounded-full bg-[#C62828] animate-pulse" />
          <span className="w-6 h-1.5 rounded-full bg-[#C62828]/80 animate-pulse delay-75" />
          <span className="w-6 h-1.5 rounded-full bg-[#FFB300] animate-pulse delay-150" />
          <span className="w-6 h-1.5 rounded-full bg-slate-300" />
        </div>

        <p className="text-xs font-bold text-slate-500 tracking-wide animate-pulse">
          Counting the eggs...
        </p>
      </div>
    </div>
  );
};
