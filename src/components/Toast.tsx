import React from 'react';

interface ToastProps {
  message: string | null;
  icon?: string;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle' }) => {
  if (!message) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-[#313633] text-[#dfe4e0] shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-[#3b4a3d] flex items-center gap-2.5 transition-all animate-bounce">
      <span className="material-symbols-outlined text-[#00e676] text-[20px]">{icon}</span>
      <span className="text-[13px] font-medium leading-none">{message}</span>
    </div>
  );
};
