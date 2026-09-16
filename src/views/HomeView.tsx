import React from 'react';
import { TRADE_LOTS } from '../data/mockData';
import { TradeLot } from '../types';
import { useDemoData } from '../demo/DemoDataProvider';
import { getFreshness, getFreshnessLabel } from '../demo/freshness';

interface HomeViewProps {
  onOpenArbitrage: () => void;
  onOpenTracking: (trackingId?: string) => void;
  onOpenTrade: () => void;
  onSelectLot: (lot: TradeLot) => void;
  onInstantBuy: (lot: TradeLot) => void;
  onOpenAddFunds: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onOpenArbitrage,
  onOpenTracking,
  onOpenTrade,
  onSelectLot,
  onInstantBuy,
  onOpenAddFunds,
  onShowToast,
}) => {
  const { prices, now } = useDemoData();
  const benchmarkPrices = prices.filter((price) => price.sourceType === 'benchmark');
  return (
    <div className="flex flex-col w-full gap-5 pb-6">
      {/* TOP TRADER GREETING & STATUS BANNER */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="font-['Plus_Jakarta_Sans'] text-[18px] font-semibold text-[#dfe4e0]">
              Good morning, Yusuf
            </h2>
            <span className="text-base select-none">👋</span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5 text-[10px]">
            <span className="text-[#4edea3] font-semibold uppercase tracking-wider">
              Tier-3 Verified Trader
            </span>
            <span className="text-[#3b4a3d]">•</span>
            <span className="text-[#bacbb9]">Dawanau Hub</span>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#262b29] text-[#4edea3]">
          <span className="material-symbols-outlined text-[14px]">shield</span>
          <span className="text-[10px] tracking-widest font-bold uppercase">SECURED</span>
        </div>
      </div>

      {/* PORTFOLIO & ESCROW METRIC MATRIX */}
      <div className="relative overflow-hidden rounded-xl bg-[#181d1a] shadow-xl p-3.5 flex flex-col gap-3 border border-[#262b29]">
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-[#00e676]/10 blur-3xl pointer-events-none"></div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#bacbb9] font-medium">
                Aggregate Liquidity
              </span>
              <span className="material-symbols-outlined text-[13px] text-[#bacbb9]">info</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-['Plus_Jakarta_Sans'] text-[28px] font-bold tracking-tight text-[#dfe4e0]">
                ₦18,450,000
              </span>
              <span className="inline-flex items-center text-[12px] text-[#75ff9e] font-semibold">
                <span className="material-symbols-outlined text-[14px]">arrow_drop_up</span>+3.2%
              </span>
            </div>
          </div>
          <button
            onClick={onOpenAddFunds}
            aria-label="Quick Deposit"
            title="Add Liquidity"
            className="w-9 h-9 rounded-xl bg-[#262b29] hover:bg-[#313633] flex items-center justify-center text-[#00e676] active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </div>

        {/* Escrow Breakdown & Micro-Stat Deck */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="rounded-lg bg-[#1c211e] p-2.5 flex flex-col justify-between border border-[#262b29]/50">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e676]"></span>
              <span className="text-[10px] uppercase tracking-wider text-[#bacbb9]">
                Escrow Collateral
              </span>
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-[14px] font-semibold text-[#dfe4e0] font-mono">₦2,450,000</span>
              <span className="text-[10px] text-[#75ff9e] font-medium">Allocated</span>
            </div>
          </div>
          <div className="rounded-lg bg-[#1c211e] p-2.5 flex flex-col justify-between border border-[#262b29]/50">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
              <span className="text-[10px] uppercase tracking-wider text-[#bacbb9]">
                Settled (24h)
              </span>
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-[14px] font-semibold text-[#dfe4e0] font-mono">₦8,120,000</span>
              <span className="text-[10px] text-[#4edea3] font-medium">9 trades</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: LIVE COMMODITY SPOT BOARD (TICKER CAROUSEL) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00e676] animate-ping"></div>
            <span className="text-[14px] font-bold text-[#dfe4e0] tracking-wide">
              Live Commodity Spot Board
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-[#4edea3] tracking-wider font-semibold uppercase font-mono">
              234-STREAM
            </span>
            <span className="material-symbols-outlined text-[13px] text-[#4edea3]">wifi_tethering</span>
          </div>
        </div>

        {/* Horizontal Scrollable Matrix Strip */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scroll-smooth select-none no-scrollbar">
          {benchmarkPrices.map((item) => {
            const unavailable = ['outdated', 'unknown'].includes(getFreshness(item.sourceType, item.observedAt, now));
            return (
            <div
              key={item.id}
              onClick={() => onShowToast(`${item.name}: ${getFreshnessLabel(item.sourceType, item.observedAt, now)}`)}
              className="min-w-[185px] flex-shrink-0 rounded-xl bg-[#181d1a] p-3 flex flex-col justify-between shadow-md border border-[#262b29] hover:border-[#4edea3]/40 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between gap-1">
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-bold text-[#dfe4e0] leading-snug truncate">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-[#bacbb9] truncate">{item.location}</span>
                </div>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap ${
                    'bg-[#262b29] text-[#75ff9e]'
                  }`}
                >
                  DEMO
                </span>
              </div>
              <div className="mt-2.5 flex items-baseline justify-between">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-['Plus_Jakarta_Sans'] text-[17px] font-bold text-[#dfe4e0]">
                    {unavailable ? '—' : `₦${item.value.toLocaleString()}`}
                  </span>
                  <span className="text-[10px] text-[#bacbb9]">{item.unit}</span>
                </div>
                <span className="max-w-[92px] text-right text-[9px] leading-tight text-[#ffcf70]">{getFreshnessLabel(item.sourceType, item.observedAt, now)}</span>
              </div>
            </div>
          )})}
        </div>
      </div>

      {/* FEATURE: ARBITRAGE OPPORTUNITY RADAR */}
      <div className="relative rounded-xl bg-[#181d1a] overflow-hidden shadow-2xl p-4 flex flex-col gap-3.5 border border-[#262b29]">
        {/* Neon Top Indicator Bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#00e676] via-[#4edea3] to-[#62ff96]"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00e676] text-[18px]">bolt</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#00e676]">
              Arbitrage Opportunity Detected
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#262b29] text-[10px] font-bold text-[#75ff9e]">
            ROI 22.4%
          </span>
        </div>

        {/* Route Matrix */}
        <div className="rounded-lg bg-[#1c211e] p-3 flex flex-col gap-2 border border-[#262b29]">
          <div className="flex items-center justify-between text-[#dfe4e0]">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#bacbb9] uppercase">Source Origin</span>
              <span className="text-[14px] font-bold text-[#dfe4e0]">Kano (Dawanau)</span>
              <span className="text-[11px] text-[#4edea3] font-medium">Buy @ ₦1,250/kg</span>
            </div>
            <div className="flex flex-col items-center px-2">
              <span className="material-symbols-outlined text-[#00e676] text-[20px]">trending_flat</span>
              <span className="text-[10px] text-[#bacbb9] font-mono">428 km</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-[#bacbb9] uppercase">Target Terminal</span>
              <span className="text-[14px] font-bold text-[#dfe4e0]">Abuja (Dei-Dei)</span>
              <span className="text-[11px] text-[#75ff9e] font-medium">Sell @ ₦1,450/kg</span>
            </div>
          </div>
          <div className="h-px bg-[#262b29] my-0.5"></div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#bacbb9]">
              Commodity: <strong className="text-[#dfe4e0] font-semibold">Yellow Maize (Grade A, 30 tonnes)</strong>
            </span>
            <span className="text-[#4edea3] font-semibold font-mono">Spread: +₦200/kg</span>
          </div>
        </div>

        {/* Financial Breakdown Table */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-[#1c211e] p-2 flex flex-col">
            <span className="text-[10px] text-[#bacbb9] truncate">Gross Margin</span>
            <span className="text-[13px] font-bold text-[#dfe4e0] font-mono mt-0.5">₦6,000,000</span>
          </div>
          <div className="rounded-lg bg-[#1c211e] p-2 flex flex-col">
            <span className="text-[10px] text-[#bacbb9] truncate">Haulage & Tolls</span>
            <span className="text-[13px] font-bold text-[#ffb4ab] font-mono mt-0.5">-₦1,800,000</span>
          </div>
          <div className="rounded-lg bg-[#262b29] p-2 flex flex-col">
            <span className="text-[10px] text-[#75ff9e] truncate font-medium">Net Profit</span>
            <span className="text-[13px] font-bold text-[#00e676] font-mono mt-0.5">₦4,200,000</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-0.5">
          <button
            onClick={onOpenArbitrage}
            className="flex-1 min-h-[44px] py-2 px-3 rounded-lg bg-[#00e676] hover:bg-[#75ff9e] text-[#00210b] font-bold text-[13px] flex items-center justify-center gap-1.5 shadow-[0_0_14px_rgba(0,230,118,0.3)] active:scale-[0.98] transition-all"
          >
            <span>Analyze Opportunity</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
          <button
            onClick={() => onShowToast('Price threshold alert locked at +₦200/kg spread', 'notifications_active')}
            aria-label="Lock Price Alert"
            className="min-h-[44px] px-3.5 rounded-lg bg-[#1c211e] hover:bg-[#262b29] text-[#dfe4e0] hover:text-[#75ff9e] active:scale-95 transition-all flex items-center justify-center border border-[#262b29]"
          >
            <span className="material-symbols-outlined text-[20px]">notifications_active</span>
          </button>
        </div>
      </div>

      {/* ACTIVE HAULAGE TELEMETRY */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[18px]">local_shipping</span>
            <span className="text-[14px] font-bold text-[#dfe4e0]">Active Haulage Fleet</span>
          </div>
          <span className="text-[10px] text-[#75ff9e] font-semibold uppercase tracking-wider font-mono">
            1 UNIT EN-ROUTE
          </span>
        </div>

        <div className="rounded-xl bg-[#181d1a] p-3.5 shadow-lg flex flex-col gap-3 border border-[#262b29]">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-bold text-[#dfe4e0]">Shipment #AG-20481</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#262b29] text-[#75ff9e]">
                  IN TRANSIT
                </span>
              </div>
              <span className="text-[11px] text-[#bacbb9] truncate mt-0.5">
                30 Tonnes Maize • Driver Abdul (Toyota Dyna)
              </span>
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
              <span className="text-[10px] text-[#bacbb9] uppercase">Est. Arrival</span>
              <span className="text-[13px] font-bold text-[#4edea3]">Today, 4:35 PM</span>
            </div>
          </div>

          {/* Real-time GPS Vector Trail Graphic */}
          <div className="rounded-lg bg-[#1c211e] p-3 flex flex-col gap-2 border border-[#262b29]">
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-[#dfe4e0] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
                <span>Kano Hub</span>
              </div>
              <span className="font-mono text-[#75ff9e] font-bold text-[11px]">182 km remaining</span>
              <div className="flex items-center gap-1.5 text-[#bacbb9]">
                <span>Abuja Dei-Dei</span>
                <span className="w-2 h-2 rounded-full bg-[#313633]"></span>
              </div>
            </div>

            {/* Custom Telemetry Progress Track */}
            <div className="relative w-full h-2 rounded-full bg-[#313633] overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[58%] bg-gradient-to-r from-[#00a572] to-[#00e676] rounded-full"></div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#bacbb9] pt-0.5">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#75ff9e]">speed</span>
                64 km/h • Zaria-Kaduna Expwy
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#4edea3]">verified_user</span>
                E-Seal Intact
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full object-cover bg-[#262b29] flex-shrink-0"
                alt="Nigerian driver Abdulrazak M."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI3kXJ9yhOYH7N3rnGl7ZQXpef7EkaZMeFvrqD0-of6s43e6kx15M-zwGUp1d28dVvBy7-sJzkldtKxxXCxkRlgEVZCBHzafMD8izNYogiv_NgP6xgu4BjPmzy8sKksaV-ncxwMgPW8nPSy3uBV46imk7dGZsqr6b_G_E0P6KCq-YFpDklnEi-_JBGUwyhSW5Im-5gmOMxdcLBLTUKO7jih9GOPR98nwV_W2Hw3z-_DhiOKi4FNfct"
              />
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-[#dfe4e0] leading-tight">
                  Abdulrazak M.
                </span>
                <span className="text-[10px] text-[#bacbb9]">★ 4.9 (124 runs)</span>
              </div>
            </div>
            <button
              onClick={() => onOpenTracking('ship-20481')}
              className="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-[#262b29] text-[#75ff9e] hover:bg-[#353a38] active:scale-95 transition-all text-[13px] font-semibold flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">map</span>
              <span>Track Live</span>
            </button>
          </div>
        </div>
      </div>

      {/* TRENDING MARKETPLACE DEALS */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e676] text-[18px]">storefront</span>
            <span className="text-[14px] font-bold text-[#dfe4e0]">Trending Certified Batches</span>
          </div>
          <button
            onClick={onOpenTrade}
            className="text-[11px] text-[#4edea3] font-semibold uppercase hover:underline"
          >
            View All
          </button>
        </div>

        {/* Marketplace Deal Stack */}
        <div className="flex flex-col gap-2.5">
          {TRADE_LOTS.slice(0, 2).map((lot) => (
            <div
              key={lot.id}
              className="rounded-xl bg-[#181d1a] p-3 flex items-center gap-3 shadow-md hover:bg-[#1c211e] transition-colors border border-[#262b29] cursor-pointer"
              onClick={() => onSelectLot(lot)}
            >
              <img
                className="w-20 h-20 rounded-lg object-cover bg-[#262b29] flex-shrink-0"
                alt={lot.title}
                src={lot.image}
              />
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[13px] font-bold text-[#dfe4e0] truncate">{lot.title}</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#262b29] text-[#75ff9e] text-[10px] font-semibold flex-shrink-0">
                    {lot.volumeMt}t Avail
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold text-[#dfe4e0]">
                    ₦{lot.pricePerKg.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#bacbb9]">/kg</span>
                </div>
                <div className="flex items-center justify-between gap-1 mt-2">
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] flex-shrink-0"></span>
                    <span className="text-[10px] text-[#bacbb9] truncate font-medium">
                      {lot.sellerName}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onInstantBuy(lot);
                    }}
                    className="px-2.5 py-1 rounded bg-[#00e676] hover:bg-[#75ff9e] text-[#00210b] text-[11px] font-bold active:scale-95 transition-transform flex-shrink-0"
                  >
                    Buy Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
