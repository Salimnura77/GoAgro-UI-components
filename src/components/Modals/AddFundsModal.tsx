import React, { useState } from 'react';

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFundsAdded: (amount: number) => void;
}

export const AddFundsModal: React.FC<AddFundsModalProps> = ({
  isOpen,
  onClose,
  onFundsAdded,
}) => {
  const [copied, setCopied] = useState(false);
  const [customAmount, setCustomAmount] = useState('2500000');

  if (!isOpen) return null;

  const copyAccount = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateTopUp = () => {
    const val = Number(customAmount) || 1000000;
    onFundsAdded(val);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center p-0">
      <div className="w-full max-w-md bg-[#1c211e] p-6 rounded-t-2xl flex flex-col gap-4 border-t border-[#3b4a3d] shadow-2xl animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e676] text-[22px]">
              account_balance
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[#4edea3] font-bold">
                Direct Treasury Funding
              </span>
              <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] text-[#dfe4e0] font-bold">
                AgriGo Dynamic Virtual Account
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#262b29] flex items-center justify-center text-[#bacbb9] hover:text-[#dfe4e0]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 bg-[#0a0f0d] rounded-xl border border-[#262b29] space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-[#859585]">Settlement Partner</span>
            <span className="text-[12px] text-[#dfe4e0] font-semibold">Providus Bank / NIBSS</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[12px] text-[#859585]">Account Name</span>
            <span className="text-[13px] text-[#dfe4e0] font-medium">AgriGo Escrow / Yusuf Dawanau</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-[#181d1a] rounded-lg border border-[#262b29]">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#859585] uppercase">Account Number</span>
              <span className="text-[18px] font-bold text-[#75ff9e] font-mono tracking-wider">
                9940 8219 02
              </span>
            </div>
            <button
              onClick={() => copyAccount('9940821902')}
              className="px-3 py-1.5 rounded-lg bg-[#262b29] hover:bg-[#313633] text-[#dfe4e0] text-[12px] font-semibold flex items-center gap-1 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[15px]">
                {copied ? 'done' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] text-[#859585] uppercase tracking-wider">
            Simulate Instant Credit Top-Up (₦)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#4edea3] font-bold">₦</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-[#0a0f0d] rounded-lg text-[#dfe4e0] font-mono text-[14px] border border-[#262b29] focus:border-[#00e676] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={onClose}
            className="py-2.5 rounded-lg bg-[#262b29] text-[#dfe4e0] font-semibold text-[14px]"
          >
            Close
          </button>
          <button
            onClick={handleSimulateTopUp}
            className="py-2.5 rounded-lg bg-[#00e676] text-[#00210b] font-bold text-[14px] shadow-[0_0_12px_rgba(0,230,118,0.3)] hover:brightness-105 active:scale-95 transition-all"
          >
            Instant Deposit
          </button>
        </div>
      </div>
    </div>
  );
};
