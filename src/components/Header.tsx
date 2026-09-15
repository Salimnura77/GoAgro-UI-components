import React from 'react';
import { LOGO_URL } from '../data/mockData';

interface HeaderProps {
  title: string;
  onProfileClick?: () => void;
  onNotificationClick?: () => void;
  onInsightsClick?: () => void;
  unreadCount?: number;
  showBack?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onProfileClick,
  onNotificationClick,
  onInsightsClick,
  unreadCount = 2,
  showBack = false,
  onBack,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0a0f0d]/85 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] pt-safe">
      <div className="max-w-md mx-auto h-20 px-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {showBack && (
            <button
              onClick={onBack}
              aria-label="Back"
              className="min-w-[40px] min-h-[40px] rounded-xl bg-[#181d1a]/80 flex items-center justify-center text-[#dfe4e0] hover:text-[#75ff9e] transition-colors flex-shrink-0"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
          )}

          <img
            alt="AgriGo Wordmark Logo"
            className="h-8 w-auto object-contain flex-shrink-0 cursor-pointer"
            src={LOGO_URL}
            onClick={onBack}
          />

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[18px] text-[#dfe4e0] truncate">
                {title}
              </span>
              <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#262b29]/90 text-[#00e475] flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse"></span>
                <span className="text-[10px] tracking-wider uppercase font-semibold">LIVE 234-NET</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[#4edea3] text-[13px]">verified</span>
              <span className="text-[10px] text-[#4edea3] font-semibold tracking-wider uppercase truncate">
                VERIFIED TRADER
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {onInsightsClick && (
            <button
              onClick={onInsightsClick}
              title="GoAgro Insights"
              aria-label="Insights"
              className="relative w-10 h-10 rounded-xl bg-[#181d1a]/80 flex items-center justify-center text-[#bacbb9] hover:text-[#75ff9e] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">auto_stories</span>
            </button>
          )}

          <button
            onClick={onNotificationClick}
            aria-label="Notifications"
            className="relative w-10 h-10 rounded-xl bg-[#181d1a]/80 flex items-center justify-center text-[#bacbb9] hover:text-[#dfe4e0] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00e676] ring-2 ring-[#0a0f0d]"></span>
            )}
          </button>

          <button
            onClick={onProfileClick}
            aria-label="User Profile"
            className="w-8 h-8 rounded-full bg-[#75ff9e] flex items-center justify-center text-[#003918] hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
