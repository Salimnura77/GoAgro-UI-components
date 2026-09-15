import React, { useState } from 'react';

interface HaulageBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: { pickup: string; destination: string; cargo: string; tonnes: number }) => void;
}

export const HaulageBookingModal: React.FC<HaulageBookingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [pickup, setPickup] = useState('Dawanau Grain Market, Kano');
  const [destination, setDestination] = useState('Mile 12 Terminal, Lagos');
  const [cargo, setCargo] = useState('Yellow Maize (Grade A)');
  const [tonnes, setTonnes] = useState(30);

  if (!isOpen) return null;

  const estimatedCost = Math.round(tonnes * 38333);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ pickup, destination, cargo, tonnes });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center p-0">
      <div className="w-full max-w-md bg-[#1c211e] p-6 rounded-t-2xl flex flex-col gap-4 border-t border-[#3b4a3d] shadow-2xl animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e676] text-[22px]">
              rv_hookup
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[#4edea3] font-bold">
                Direct Dispatch Wizard
              </span>
              <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] text-[#dfe4e0] font-bold">
                Book Instant Agro-Haulage
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
              Pickup Hub Location
            </label>
            <select
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full p-2.5 bg-[#0a0f0d] rounded-lg text-[#dfe4e0] text-[14px] border border-[#262b29] focus:border-[#00e676] focus:outline-none"
            >
              <option value="Dawanau Grain Market, Kano">Dawanau Grain Market, Kano</option>
              <option value="Gboko Silo Depot, Benue">Gboko Silo Depot, Benue</option>
              <option value="Central Grain Silos, Zaria">Central Grain Silos, Zaria</option>
              <option value="Bodija Wholesale Market, Ibadan">Bodija Wholesale Market, Ibadan</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-[#859585] uppercase tracking-wider">
              Destination Terminal
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-2.5 bg-[#0a0f0d] rounded-lg text-[#dfe4e0] text-[14px] border border-[#262b29] focus:border-[#00e676] focus:outline-none"
            >
              <option value="Mile 12 Terminal, Lagos">Mile 12 Terminal, Lagos</option>
              <option value="Dei-Dei Regional Hub, Abuja">Dei-Dei Regional Hub, Abuja</option>
              <option value="Apapa Port Agro-Terminal, Lagos">Apapa Port Agro-Terminal, Lagos</option>
              <option value="Trans-Amadi Feed Port, Port Harcourt">Trans-Amadi Feed Port, Port Harcourt</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#859585] uppercase tracking-wider">
                Cargo Spec
              </label>
              <input
                type="text"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                className="w-full p-2.5 bg-[#0a0f0d] rounded-lg text-[#dfe4e0] text-[13px] border border-[#262b29] focus:border-[#00e676] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#859585] uppercase tracking-wider">
                Tonnage (MT)
              </label>
              <input
                type="number"
                min="10"
                max="60"
                value={tonnes}
                onChange={(e) => setTonnes(Number(e.target.value))}
                className="w-full p-2.5 bg-[#0a0f0d] rounded-lg text-[#dfe4e0] text-[13px] border border-[#262b29] focus:border-[#00e676] focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="p-3 bg-[#181d1a] rounded-lg flex items-center justify-between border border-[#262b29]">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#859585] uppercase">Standard Haul Rate</span>
              <span className="text-[16px] font-bold text-[#75ff9e] font-mono">
                ₦{estimatedCost.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#4edea3]">
              <span className="material-symbols-outlined text-[14px]">shield</span>
              <span>Leadway Covered</span>
            </div>
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
              Lock Truck & Route
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
