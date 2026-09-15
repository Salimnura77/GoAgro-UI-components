import React, { useState } from 'react';

interface ListProduceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; volumeMt: number; pricePerKg: number; location: string }) => void;
}

export const ListProduceModal: React.FC<ListProduceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('White Maize (Grade-A Clean)');
  const [volumeMt, setVolumeMt] = useState(40);
  const [pricePerKg, setPricePerKg] = useState(1240);
  const [location, setLocation] = useState('Dawanau Grain Market, Kano');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, volumeMt, pricePerKg, location });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center p-0">
      <div className="w-full max-w-md bg-[#1c211e] p-6 rounded-t-2xl flex flex-col gap-4 border-t border-[#3b4a3d] shadow-2xl animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e676] text-[22px]">
              storefront
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[#4edea3] font-bold">
                Certified Aggregator Portal
              </span>
              <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] text-[#dfe4e0] font-bold">
                List Produce Batch in 60s
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-[#859585] uppercase tracking-wider">
              Commodity & Specification
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-[#0a0f0d] rounded-lg text-[#dfe4e0] text-[13px] border border-[#262b29] focus:border-[#00e676] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#859585] uppercase tracking-wider">
                Volume (MT)
              </label>
              <input
                type="number"
                min="5"
                max="200"
                value={volumeMt}
                onChange={(e) => setVolumeMt(Number(e.target.value))}
                className="w-full p-2.5 bg-[#0a0f0d] rounded-lg text-[#dfe4e0] font-mono text-[14px] border border-[#262b29] focus:border-[#00e676] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#859585] uppercase tracking-wider">
                Target Spot (₦/kg)
              </label>
              <input
                type="number"
                value={pricePerKg}
                onChange={(e) => setPricePerKg(Number(e.target.value))}
                className="w-full p-2.5 bg-[#0a0f0d] rounded-lg text-[#dfe4e0] font-mono text-[14px] border border-[#262b29] focus:border-[#00e676] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-[#859585] uppercase tracking-wider">
              Silo / Depot Hub Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2.5 bg-[#0a0f0d] rounded-lg text-[#dfe4e0] text-[13px] border border-[#262b29] focus:border-[#00e676] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-[#181d1a] rounded-lg flex items-center justify-between border border-[#262b29]">
            <span className="text-[11px] text-[#bacbb9]">Estimated Batch Valuation:</span>
            <span className="text-[15px] font-bold text-[#75ff9e] font-mono">
              ₦{(volumeMt * pricePerKg * 1000).toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 rounded-lg bg-[#262b29] text-[#dfe4e0] font-semibold text-[14px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 rounded-lg bg-[#00e676] text-[#00210b] font-bold text-[14px] shadow-[0_0_12px_rgba(0,230,118,0.3)] hover:brightness-105 active:scale-95 transition-all"
            >
              Publish Order Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
