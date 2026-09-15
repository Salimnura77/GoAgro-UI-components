import React, { useState } from 'react';

interface ArbitrageViewProps {
  onBack: () => void;
  onBookTruck: (dest: string) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const ArbitrageView: React.FC<ArbitrageViewProps> = ({
  onBack,
  onBookTruck,
  onShowToast,
}) => {
  const [commodity, setCommodity] = useState('Yellow Maize (Grade A)');
  const [tonnes, setTonnes] = useState(30);
  const [origin, setOrigin] = useState('Dawanau Hub, Kano');
  const [isRecalculating, setIsRecalculating] = useState(false);

  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
      onShowToast('Corridor net margins synchronized with live fuel tariffs', 'bolt');
    }, 600);
  };

  const basePricePerKg = 1250;
  const rawBatchCost = tonnes * 1000 * basePricePerKg;

  return (
    <div className="flex flex-col w-full space-y-4 pb-8">
      {/* Top Bar Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] text-[#4edea3] hover:text-[#75ff9e] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back</span>
        </button>
        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#262b29] text-[#00e676] text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse"></span>
          <span>DIESEL @ ₦1,380/L CALIBRATED</span>
        </div>
      </div>

      <div className="space-y-1">
        <h2 className="font-['Plus_Jakarta_Sans'] text-[22px] font-bold text-[#dfe4e0] tracking-tight">
          Where Should I Sell?
        </h2>
        <p className="text-[12px] text-[#bacbb9] leading-relaxed">
          Dynamic multi-state arbitrage engine calculating real-time net realization after haulage, fuel tariffs, and checkpoint clearance.
        </p>
      </div>

      {/* Consignment Configurator Card */}
      <div className="rounded-xl bg-[#181d1a] p-4 space-y-3.5 shadow-xl border border-[#262b29]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#4edea3]">
            Consignment Configuration
          </span>
          <span className="text-[11px] text-[#bacbb9] font-mono">
            Origin Spot: ₦{basePricePerKg}/kg (₦{(rawBatchCost / 1000000).toFixed(2)}M)
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] text-[#859585] uppercase">Commodity</label>
            <select
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              className="p-2 rounded-lg bg-[#0a0f0d] text-[#dfe4e0] text-[12px] border border-[#262b29] focus:outline-none focus:border-[#00e676]"
            >
              <option value="Yellow Maize (Grade A)">Yellow Maize (Grade A)</option>
              <option value="Clean Soybeans (Grade 1)">Clean Soybeans (Grade 1)</option>
              <option value="White Sorghum Bulk">White Sorghum Bulk</option>
              <option value="Sesame Seeds Export">Sesame Seeds Export</option>
            </select>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-[10px] text-[#859585] uppercase">Tonnage (MT)</label>
            <div className="flex items-center space-x-1 bg-[#0a0f0d] p-1 rounded-lg border border-[#262b29]">
              {[15, 30, 50].map((t) => (
                <button
                  key={t}
                  onClick={() => setTonnes(t)}
                  className={`flex-1 py-1 rounded text-[11px] font-mono font-semibold transition-all ${
                    tonnes === t
                      ? 'bg-[#00e676] text-[#00210b]'
                      : 'text-[#bacbb9] hover:text-[#dfe4e0]'
                  }`}
                >
                  {t}T
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[10px] text-[#859585] uppercase">Origin Staging Terminal</label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="p-2 rounded-lg bg-[#0a0f0d] text-[#dfe4e0] text-[12px] border border-[#262b29] focus:outline-none focus:border-[#00e676]"
          >
            <option value="Dawanau Hub, Kano">Dawanau Hub, Kano State</option>
            <option value="Zaria Silos, Kaduna">Zaria Central Silos, Kaduna State</option>
            <option value="Gboko Silo Depot, Benue">Gboko Silo Depot, Benue State</option>
          </select>
        </div>

        <button
          onClick={handleRecalculate}
          disabled={isRecalculating}
          className="w-full py-2.5 rounded-lg bg-[#262b29] hover:bg-[#313633] text-[#75ff9e] font-semibold text-[13px] flex items-center justify-center space-x-1.5 transition-all active:scale-[0.98] border border-[#3b4a3d]"
        >
          <span className={`material-symbols-outlined text-[18px] ${isRecalculating ? 'animate-spin' : ''}`}>
            sync
          </span>
          <span>{isRecalculating ? 'Simulating Freight Rates...' : 'Recalculate Corridors'}</span>
        </button>
      </div>

      {/* Interactive Corridor Schematic Vector Visualizer */}
      <div className="rounded-xl bg-[#0a0f0d] p-3 border border-[#262b29] space-y-2">
        <div className="flex items-center justify-between text-[11px] text-[#bacbb9]">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#4edea3]">timeline</span>
            <span>A2 Highway Freight Arteries</span>
          </span>
          <span className="text-[#00e676] font-mono">Live Congestion Clear</span>
        </div>

        <div className="relative py-2 px-1 flex items-center justify-between">
          {/* Connecting line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-[#262b29]">
            <div className="h-full bg-gradient-to-r from-[#00e676] via-[#4edea3] to-[#80f9c8] w-[88%] rounded-full"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-[#00e676] text-[#00210b] flex items-center justify-center text-[10px] font-bold shadow-md">
              KN
            </div>
            <span className="text-[10px] text-[#dfe4e0] mt-1 font-medium">Kano</span>
            <span className="text-[9px] text-[#bacbb9]">Origin</span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-[#262b29] text-[#dfe4e0] border border-[#00e676] flex items-center justify-center text-[9px]">
              ABJ
            </div>
            <span className="text-[10px] text-[#dfe4e0] mt-1 font-medium">Abuja</span>
            <span className="text-[9px] text-[#75ff9e]">428km</span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-[#262b29] text-[#dfe4e0] border border-[#4edea3] flex items-center justify-center text-[9px]">
              IB
            </div>
            <span className="text-[10px] text-[#dfe4e0] mt-1 font-medium">Bodija</span>
            <span className="text-[9px] text-[#4edea3]">915km</span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-[#75ff9e] text-[#00210b] flex items-center justify-center text-[10px] font-bold shadow-lg">
              LOS
            </div>
            <span className="text-[10px] text-[#dfe4e0] mt-1 font-bold">Mile 12</span>
            <span className="text-[9px] text-[#00e676] font-semibold">1,040km</span>
          </div>
        </div>
      </div>

      {/* Ranked Corridors List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold text-[#dfe4e0] tracking-wide">
            Ranked Realization Yields ({tonnes} MT Consignment)
          </span>
          <span className="text-[10px] text-[#4edea3] uppercase font-semibold">Live Sort: Net ROI</span>
        </div>

        {/* 1. LAGOS - MILE 12 */}
        <div className="rounded-xl bg-[#181d1a] p-4 space-y-3 border border-[#00e676]/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-[#00e676] text-[#00210b] text-[10px] font-bold uppercase rounded-bl-lg">
            ⭐ HIGHEST NET PROFIT
          </div>

          <div className="flex items-start justify-between pr-24">
            <div className="space-y-0.5">
              <h3 className="font-['Plus_Jakarta_Sans'] text-[17px] font-bold text-[#dfe4e0]">
                Lagos (Mile 12 & Ketu Hub)
              </h3>
              <p className="text-[11px] text-[#bacbb9]">
                1,040 km via A2 Express • ~26 hrs transit
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-[#0a0f0d] p-3 rounded-lg border border-[#262b29] text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#859585]">Destination Spot:</span>
              <span className="text-[#dfe4e0] font-mono font-semibold">₦1,520 / kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#859585]">Gross Realization:</span>
              <span className="text-[#dfe4e0] font-mono font-semibold">
                ₦{(tonnes * 1000 * 1520).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#859585]">Haulage & Fuel:</span>
              <span className="text-[#ffb4ab] font-mono font-semibold">-₦1,850,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#859585]">Tolls & E-Pass:</span>
              <span className="text-[#ffb4ab] font-mono font-semibold">-₦90,000</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#859585] uppercase">Calculated Net Profit</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-['Plus_Jakarta_Sans'] text-[22px] font-bold text-[#75ff9e]">
                  ₦{(tonnes * 1000 * (1520 - basePricePerKg) - 1940000).toLocaleString()}
                </span>
                <span className="text-[11px] text-[#4edea3] font-bold">+18.2% ROI</span>
              </div>
            </div>
            <button
              onClick={() => onBookTruck('Mile 12 Terminal, Lagos')}
              className="px-4 py-2.5 rounded-lg bg-[#00e676] hover:bg-[#75ff9e] text-[#00210b] font-bold text-[12px] shadow-[0_0_12px_rgba(0,230,118,0.3)] active:scale-95 transition-all"
            >
              Book Truck & Lock
            </button>
          </div>
        </div>

        {/* 2. ABUJA - DEI-DEI */}
        <div className="rounded-xl bg-[#181d1a] p-4 space-y-3 border border-[#262b29] shadow-md">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold text-[#dfe4e0]">
                  Abuja (Dei-Dei Feed Hub)
                </h3>
                <span className="px-1.5 py-0.5 rounded bg-[#262b29] text-[#4edea3] text-[9px] font-bold uppercase">
                  ⚡ FASTEST TRANSIT
                </span>
              </div>
              <p className="text-[11px] text-[#bacbb9]">
                428 km via Zaria Express • ~7 hrs transit
              </p>
            </div>
            <span className="text-[12px] text-[#00e676] font-bold font-mono">
              ₦1,450 / kg
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-[#0a0f0d] p-3 rounded-lg border border-[#262b29] text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#859585]">Haulage & Fuel:</span>
              <span className="text-[#ffb4ab] font-mono font-semibold">-₦920,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#859585]">Tolls & Checkpoints:</span>
              <span className="text-[#ffb4ab] font-mono font-semibold">-₦40,000</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#859585] uppercase">Calculated Net Profit</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-['Plus_Jakarta_Sans'] text-[20px] font-bold text-[#dfe4e0]">
                  ₦{(tonnes * 1000 * (1450 - basePricePerKg) - 960000).toLocaleString()}
                </span>
                <span className="text-[11px] text-[#00e676] font-bold">+22.4% ROI</span>
              </div>
            </div>
            <button
              onClick={() => onBookTruck('Dei-Dei Regional Hub, Abuja')}
              className="px-4 py-2.5 rounded-lg bg-[#262b29] hover:bg-[#313633] text-[#dfe4e0] font-semibold text-[12px] active:scale-95 transition-all"
            >
              Route to Abuja
            </button>
          </div>
        </div>

        {/* 3. IBADAN - BODIJA */}
        <div className="rounded-xl bg-[#181d1a] p-4 space-y-3 border border-[#262b29] shadow-md">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold text-[#dfe4e0]">
                Ibadan (Bodija Wholesale Market)
              </h3>
              <p className="text-[11px] text-[#bacbb9]">
                915 km • ~22 hrs transit
              </p>
            </div>
            <span className="text-[12px] text-[#dfe4e0] font-bold font-mono">
              ₦1,480 / kg
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#859585] uppercase">Calculated Net Profit</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#dfe4e0]">
                  ₦{(tonnes * 1000 * (1480 - basePricePerKg) - 1730000).toLocaleString()}
                </span>
                <span className="text-[11px] text-[#bacbb9] font-medium">+16.5% ROI</span>
              </div>
            </div>
            <button
              onClick={() => onBookTruck('Bodija Wholesale Market, Ibadan')}
              className="px-4 py-2 rounded-lg bg-[#262b29] hover:bg-[#313633] text-[#dfe4e0] font-semibold text-[12px] active:scale-95 transition-all"
            >
              Route to Bodija
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
