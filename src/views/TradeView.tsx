import React, { useState } from 'react';
import { TRADE_LOTS } from '../data/mockData';
import { TradeLot } from '../types';

interface TradeViewProps {
  onSelectLot: (lot: TradeLot) => void;
  onInstantBuy: (lot: TradeLot) => void;
  onCounterOffer: (lot: TradeLot) => void;
  onOpenListProduce: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const TradeView: React.FC<TradeViewProps> = ({
  onSelectLot,
  onInstantBuy,
  onCounterOffer,
  onOpenListProduce,
  onShowToast,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGradeAOnly, setFilterGradeAOnly] = useState(false);

  const categories = ['All', 'Grains & Cereals', 'Legumes', 'Cash Crops', 'Tubers'];

  const filteredLots = TRADE_LOTS.filter((lot) => {
    if (activeCategory === 'Grains & Cereals' && !lot.title.includes('Maize') && !lot.title.includes('Sorghum')) return false;
    if (activeCategory === 'Legumes' && !lot.title.includes('Soybean')) return false;
    if (activeCategory === 'Cash Crops' && !lot.title.includes('Sesame')) return false;
    if (searchQuery && !lot.title.toLowerCase().includes(searchQuery.toLowerCase()) && !lot.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filterGradeAOnly && !lot.gradeBadge.includes('GRADE-A') && !lot.gradeBadge.includes('PREMIUM')) return false;
    return true;
  });

  return (
    <div className="flex flex-col w-full space-y-4 pb-12">
      {/* Live AFEX Spot Ticker Tape */}
      <div className="bg-[#181d1a] -mx-4 px-4 py-2 flex items-center overflow-x-auto no-scrollbar gap-4 text-[11px] font-mono border-y border-[#262b29]">
        <span className="text-[#00e676] font-bold flex items-center gap-1 flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse"></span>
          AFEX SPOTS:
        </span>
        <span className="text-[#dfe4e0] flex-shrink-0">
          MAIZE ₦1,250/kg <span className="text-[#75ff9e]">▲ +4.8%</span>
        </span>
        <span className="text-[#dfe4e0] flex-shrink-0">
          SOYBEANS ₦1,820/kg <span className="text-[#75ff9e]">▲ +2.1%</span>
        </span>
        <span className="text-[#dfe4e0] flex-shrink-0">
          SORGHUM ₦920/kg <span className="text-[#ffb4ab]">▼ -0.6%</span>
        </span>
        <span className="text-[#dfe4e0] flex-shrink-0">
          SESAME ₦2,850/kg <span className="text-[#75ff9e]">▲ +3.5%</span>
        </span>
      </div>

      {/* Header Context Block */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="font-['Plus_Jakarta_Sans'] text-[20px] font-bold text-[#dfe4e0]">
            Commodity Marketplace
          </h2>
          <span className="text-[11px] font-mono text-[#4edea3] bg-[#262b29] px-2 py-0.5 rounded">
            {TRADE_LOTS.length} Certified Batches
          </span>
        </div>
        <p className="text-[12px] text-[#bacbb9]">
          NASC & SON accredited physical agro commodities with Leadway escrow protection.
        </p>
      </div>

      {/* Search & Filter bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#75ff9e]">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search produce, lot code, or depot..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#181d1a] text-[#dfe4e0] placeholder-[#859585] text-[13px] border border-[#262b29] focus:border-[#00e676] focus:outline-none"
          />
        </div>
        <button
          onClick={() => {
            setFilterGradeAOnly(!filterGradeAOnly);
            onShowToast(filterGradeAOnly ? 'Showing all grades' : 'Filtered: Grade-A Only');
          }}
          className={`min-h-[42px] px-3 rounded-xl text-[12px] font-semibold flex items-center gap-1 transition-all border ${
            filterGradeAOnly
              ? 'bg-[#00e676] text-[#00210b] border-[#00e676]'
              : 'bg-[#181d1a] text-[#bacbb9] border-[#262b29] hover:text-[#dfe4e0]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">tune</span>
          <span>Grade-A</span>
        </button>
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 py-0.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-[12px] whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-[#262b29] text-[#75ff9e] font-semibold shadow-sm border border-[#00e676]/40'
                : 'bg-[#181d1a] text-[#bacbb9] hover:text-[#dfe4e0] border border-[#262b29]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Produce Lots List */}
      <div className="space-y-4">
        {filteredLots.map((lot) => (
          <div
            key={lot.id}
            onClick={() => onSelectLot(lot)}
            className="rounded-2xl bg-[#181d1a] overflow-hidden border border-[#262b29] hover:border-[#4edea3]/50 transition-all shadow-xl cursor-pointer group"
          >
            {/* Image Header with Badges */}
            <div className="relative h-44 w-full bg-[#262b29]">
              <img
                src={lot.image}
                alt={lot.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181d1a] via-transparent to-black/40"></div>

              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className="px-2.5 py-1 rounded-md bg-[#0a0f0d]/90 backdrop-blur-md text-[#75ff9e] text-[10px] font-bold tracking-wide uppercase border border-[#262b29]">
                  {lot.gradeBadge}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#00e676] text-[#00210b] text-[10px] font-bold tracking-wide uppercase">
                  {lot.statusBadge}
                </span>
              </div>

              <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                <div>
                  <span className="text-[10px] text-[#bacbb9] uppercase block font-mono">
                    Batch Reference
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold text-[#dfe4e0]">
                    {lot.lotCode}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#bacbb9] uppercase block">Total Lot Value</span>
                  <span className="text-[16px] font-mono font-bold text-[#75ff9e]">
                    ₦{((lot.pricePerKg * lot.volumeMt * 1000) / 1000000).toFixed(2)}M
                  </span>
                </div>
              </div>
            </div>

            {/* Body Specs */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[17px] font-bold text-[#dfe4e0]">
                  {lot.title}
                </h3>
                <p className="text-[12px] text-[#bacbb9] flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[14px] text-[#4edea3]">location_on</span>
                  {lot.location}
                </p>
              </div>

              {/* Specs Bento Pill Grid */}
              <div className="grid grid-cols-3 gap-2 bg-[#0a0f0d] p-2.5 rounded-xl border border-[#262b29] text-[11px]">
                <div>
                  <span className="text-[#859585] block text-[10px] uppercase">Moisture</span>
                  <span className="text-[#dfe4e0] font-mono font-semibold">
                    {lot.specs.moisture || lot.specs.purity || 'Standard'}
                  </span>
                </div>
                <div>
                  <span className="text-[#859585] block text-[10px] uppercase">Lot Size</span>
                  <span className="text-[#75ff9e] font-mono font-bold">
                    {lot.volumeMt} MT
                  </span>
                </div>
                <div>
                  <span className="text-[#859585] block text-[10px] uppercase">Unit Spot</span>
                  <span className="text-[#dfe4e0] font-mono font-bold">
                    ₦{lot.pricePerKg.toLocaleString()}/kg
                  </span>
                </div>
              </div>

              {/* Seller Trust Bar */}
              <div className="flex items-center justify-between text-[11px] pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00e676]"></span>
                  <span className="text-[#dfe4e0] font-medium">{lot.sellerName}</span>
                  <span className="text-[#4edea3]">★{lot.sellerRating} ({lot.sellerTrades} trades)</span>
                </div>
                <span className="text-[10px] text-[#4edea3] uppercase font-semibold">
                  Verified Coop
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onCounterOffer(lot)}
                  className="py-2.5 rounded-xl bg-[#262b29] hover:bg-[#313633] text-[#dfe4e0] font-semibold text-[13px] flex items-center justify-center gap-1.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Counter Offer</span>
                </button>
                <button
                  onClick={() => onInstantBuy(lot)}
                  className="py-2.5 rounded-xl bg-[#00e676] hover:bg-[#75ff9e] text-[#00210b] font-bold text-[13px] flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(0,230,118,0.3)] active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span>Instant Buy</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky List Batch Promo Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#181d1a] to-[#1c211e] border border-[#00e676]/30 flex items-center justify-between gap-3 shadow-xl">
        <div className="space-y-0.5 min-w-0">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#00e676] block">
            Aggregator & Silo Program
          </span>
          <p className="text-[13px] text-[#dfe4e0] font-semibold truncate">
            Have produce to sell? List batch in 60s
          </p>
          <p className="text-[11px] text-[#bacbb9]">
            Direct institutional buyers across Lagos & Abuja
          </p>
        </div>
        <button
          onClick={onOpenListProduce}
          className="min-h-[42px] px-3.5 py-2 rounded-xl bg-[#00e676] hover:bg-[#75ff9e] text-[#00210b] text-[12px] font-bold whitespace-nowrap shadow-md active:scale-95 transition-all flex-shrink-0"
        >
          List Batch
        </button>
      </div>
    </div>
  );
};
