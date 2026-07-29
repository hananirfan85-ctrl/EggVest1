import React from 'react';
import { Home, Egg, ShoppingBag, FileText } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onNavigate }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'my-hens', label: 'My Hens', icon: Egg },
    { id: 'buy-hens', label: 'Buy Hens', icon: ShoppingBag },
    { id: 'logs', label: 'Logs', icon: FileText },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-3 py-2 shadow-lg flex items-center justify-around max-w-md mx-auto sm:max-w-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-2xl transition cursor-pointer ${
              isActive
                ? 'text-[#C62828] font-bold bg-red-50 scale-105'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5] text-[#C62828]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
