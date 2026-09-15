import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'dashboard' },
    { id: 'market', label: 'Market', icon: 'candlestick_chart' },
    { id: 'trade', label: 'Trade', icon: 'storefront' },
    { id: 'logistics', label: 'Logistics', icon: 'local_shipping' },
    { id: 'wallet', label: 'Wallet', icon: 'account_balance_wallet' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#0a0f0d]/90 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,230,118,0.06)] border-t border-[#1c211e]">
      <div className="max-w-md mx-auto h-16 px-1 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`min-h-[44px] min-w-[56px] px-2 py-1.5 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
                isActive
                  ? 'bg-[#262b29] text-[#00e676] shadow-[0_0_12px_rgba(0,230,118,0.35)] font-semibold'
                  : 'text-[#bacbb9] hover:text-[#dfe4e0]'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">{tab.icon}</span>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
