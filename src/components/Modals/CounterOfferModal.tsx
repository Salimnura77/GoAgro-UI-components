import React, { useState } from 'react';

interface CounterOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  commodityTitle: string;
  currentPrice: string;
  onSubmit: (price: string, qty: string) => void;
}

export const CounterOfferModal: React.FC<CounterOfferModalProps> = ({
  isOpen,
  onClose,
  commodityTitle,
  currentPrice,
  onSubmit,
}) => {
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(price || '1200', qty || '30');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end justify-center p-0">
      <div className="w-full max-w-md bg-[#1c211e] p-6 rounded-t-2xl flex flex-col gap-4 border-t border-[#3b4a3d] shadow-2xl animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#4edea3] uppercase font-semibold tracking-wider">
              Negotiate Contract
            </span>
            <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] text-[#dfe4e0] font-bold">
              {commodityTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#262b29] flex items-center justify-center text-[#bacbb9] hover:text-[#dfe4e0]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-[#859585] uppercase tracking-wider">
              Target Offer Price (₦ / kg)
            </label>
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#4edea3] font-semibold text-[15px]">
                ₦
              </span>
              <input
                className="w-full pl-8 pr-3 py-2.5 bg-[#0a0f0d] rounded-lg text-[#dfe4e0] font-mono text-[15px] border border-[#262b29] focus:border-[#00e676] focus:outline-none"
                placeholder={`Current: ${currentPrice}`}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-[#859585] uppercase tracking-wider">
              Order Volume (Metric Tonnes)
            </label>
            <div className="relative w-full">
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-[12px] text-[#859585] uppercase font-semibold">
                MT
              </span>
              <input
                className="w-full pl-3 pr-10 py-2.5 bg-[#0a0f0d] rounded-lg text-[#dfe4e0] font-mono text-[15px] border border-[#262b29] focus:border-[#00e676] focus:outline-none"
                placeholder="e.g. 30"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                type="number"
              />
            </div>
          </div>

          <div className="p-3 bg-[#181d1a] rounded-lg flex items-start gap-2 border border-[#262b29]">
            <span className="material-symbols-outlined text-[#00e676] text-[18px] flex-shrink-0 mt-0.5">
              verified_user
            </span>
            <span className="text-[12px] text-[#bacbb9] leading-relaxed">
              Funds are held safely in GoAgro Escrow until grain QA inspection clears at terminal weighbridge.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              className="py-2.5 rounded-lg bg-[#262b29] text-[#dfe4e0] font-semibold text-[14px] hover:bg-[#313633] transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 rounded-lg bg-[#00e676] text-[#00210b] font-bold text-[14px] shadow-[0_0_12px_rgba(0,230,118,0.3)] hover:brightness-105 active:scale-95 transition-all"
            >
              Transmit Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
