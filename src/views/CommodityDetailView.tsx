import React, { useState } from 'react';
import { TradeLot } from '../types';

interface CommodityDetailViewProps {
  lot: TradeLot;
  onBack: () => void;
  onInstantBuy: (lot: TradeLot, volumeMt: number) => void;
  onCounterOffer: (lot: TradeLot) => void;
  onOpenArbitrage: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const CommodityDetailView: React.FC<CommodityDetailViewProps> = ({
  lot,
  onBack,
  onInstantBuy,
  onCounterOffer,
  onOpenArbitrage,
  onShowToast,
}) => {
  const [selectedTonnage, setSelectedTonnage] = useState<number>(30);
  const [targetCity, setTargetCity] = useState<'lagos' | 'abuja'>('lagos');

  const baseRatePerKg = lot.pricePerKg;
  const commodityCost = selectedTonnage * 1000 * baseRatePerKg;
  const haulageRate = targetCity === 'lagos' ? selectedTonnage * 38000 : selectedTonnage * 22000;
  const tollsCost = targetCity === 'lagos' ? 90000 : 40000;
  const totalLandedCost = commodityCost + haulageRate + tollsCost;

  return (
    <div className="flex flex-col w-full space-y-4 pb-16">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] text-[#4edea3] hover:text-[#75ff9e] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Market</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onShowToast('Lot link copied to clipboard', 'link')}
            className="w-8 h-8 rounded-lg bg-[#262b29] flex items-center justify-center text-[#bacbb9] hover:text-[#dfe4e0]"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>
          <button
            onClick={() => onShowToast('Lot added to watchlist', 'bookmark')}
            className="w-8 h-8 rounded-lg bg-[#262b29] flex items-center justify-center text-[#bacbb9] hover:text-[#00e676]"
          >
            <span className="material-symbols-outlined text-[18px]">bookmark</span>
          </button>
        </div>
      </div>

      {/* Hero Photo & Verification Badges */}
      <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-[#262b29] border border-[#262b29] shadow-2xl">
        <img
          src={lot.image}
          alt={lot.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-black/30 to-transparent"></div>

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-md bg-[#00e676] text-[#00210b] text-[10px] font-bold uppercase tracking-wider">
            NASC & SON CERTIFIED
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#0a0f0d]/90 backdrop-blur-md text-[#75ff9e] text-[10px] font-bold uppercase border border-[#262b29]">
            EXPORT PASSED
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <span className="text-[11px] text-[#4edea3] uppercase font-bold tracking-wider">
              {lot.gradeBadge} • LOT {lot.lotCode}
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-[20px] font-bold text-[#dfe4e0] leading-tight">
              {lot.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Financial Valuation Summary Card */}
      <div className="rounded-xl bg-[#181d1a] p-4 space-y-3 border border-[#262b29] shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] text-[#859585] uppercase">Certified Spot Rate</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-['Plus_Jakarta_Sans'] text-[26px] font-bold text-[#dfe4e0]">
                ₦{lot.pricePerKg.toLocaleString()}
              </span>
              <span className="text-[12px] text-[#bacbb9]">/ kg</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#859585] uppercase">Total Lot Valuation</span>
            <div className="text-[18px] font-mono font-bold text-[#75ff9e] mt-0.5">
              ₦{((lot.pricePerKg * lot.volumeMt * 1000) / 1000000).toFixed(2)}M
            </div>
            <span className="text-[10px] text-[#bacbb9]">{lot.volumeMt} MT Available</span>
          </div>
        </div>

        {/* Arbitrage Alert Banner */}
        <div
          onClick={onOpenArbitrage}
          className="p-3 bg-[#1c211e] rounded-lg border border-[#00e676]/40 flex items-center justify-between gap-2 cursor-pointer hover:bg-[#262b29] transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e676] text-[20px]">trending_up</span>
            <div className="text-[11px]">
              <span className="text-[#dfe4e0] font-semibold block">
                Arbitrage Signal: +₦2.46M Net Profit to Mile 12
              </span>
              <span className="text-[#bacbb9]">Spread +18.4% above local Kano spot</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#75ff9e] text-[18px]">arrow_forward</span>
        </div>
      </div>

      {/* Laboratory Assay & Quality Specifications */}
      <div className="rounded-xl bg-[#181d1a] p-4 space-y-3 border border-[#262b29] shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#4edea3]">
            Laboratory Assay & Specifications
          </span>
          <span className="text-[10px] font-mono text-[#75ff9e] bg-[#262b29] px-2 py-0.5 rounded">
            QA CERT #2026-NASC-88
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 text-[12px]">
          <div className="bg-[#0a0f0d] p-2.5 rounded-lg border border-[#262b29]">
            <span className="text-[#859585] text-[10px] uppercase block">Moisture Content</span>
            <span className="text-[#dfe4e0] font-mono font-bold text-[14px]">
              {lot.specs.moisture || '11.2%'}
            </span>
            <span className="text-[10px] text-[#00e676] block mt-0.5">Optimal (&lt;13% Safe)</span>
          </div>

          <div className="bg-[#0a0f0d] p-2.5 rounded-lg border border-[#262b29]">
            <span className="text-[#859585] text-[10px] uppercase block">Aflatoxin Level</span>
            <span className="text-[#dfe4e0] font-mono font-bold text-[14px]">
              {lot.specs.aflatoxin || '&lt; 4.0 ppb'}
            </span>
            <span className="text-[10px] text-[#00e676] block mt-0.5">EU/US Export Clean</span>
          </div>

          <div className="bg-[#0a0f0d] p-2.5 rounded-lg border border-[#262b29]">
            <span className="text-[#859585] text-[10px] uppercase block">Foreign Matter</span>
            <span className="text-[#dfe4e0] font-mono font-bold text-[14px]">
              {lot.specs.foreignMatter || '&lt; 0.8%'}
            </span>
            <span className="text-[10px] text-[#bacbb9] block mt-0.5">Machine Cleaned</span>
          </div>

          <div className="bg-[#0a0f0d] p-2.5 rounded-lg border border-[#262b29]">
            <span className="text-[#859585] text-[10px] uppercase block">Packaging</span>
            <span className="text-[#dfe4e0] font-medium text-[12px] block mt-0.5">
              50kg UV Poly Sacks
            </span>
            <span className="text-[10px] text-[#4edea3] block mt-0.5">Leadway Seal Tagged</span>
          </div>
        </div>
      </div>

      {/* Interactive Landed Cost Simulator */}
      <div className="rounded-xl bg-[#181d1a] p-4 space-y-3 border border-[#262b29] shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00e676] text-[18px]">calculate</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#dfe4e0]">
              Landed Cost Simulator
            </span>
          </div>
          <div className="flex bg-[#0a0f0d] p-0.5 rounded-lg text-[10px]">
            <button
              onClick={() => setTargetCity('lagos')}
              className={`px-2 py-0.5 rounded font-semibold transition-all ${
                targetCity === 'lagos' ? 'bg-[#00e676] text-[#00210b]' : 'text-[#bacbb9]'
              }`}
            >
              To Lagos
            </button>
            <button
              onClick={() => setTargetCity('abuja')}
              className={`px-2 py-0.5 rounded font-semibold transition-all ${
                targetCity === 'abuja' ? 'bg-[#00e676] text-[#00210b]' : 'text-[#bacbb9]'
              }`}
            >
              To Abuja
            </button>
          </div>
        </div>

        {/* Tonnage Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-[#859585]">Simulated Order Volume:</span>
            <span className="text-[#75ff9e] font-mono font-bold">{selectedTonnage} MT</span>
          </div>
          <input
            type="range"
            min={lot.minOrderMt || 10}
            max={lot.volumeMt}
            step={5}
            value={selectedTonnage}
            onChange={(e) => setSelectedTonnage(Number(e.target.value))}
            className="w-full accent-[#00e676] bg-[#262b29] h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Cost Breakdown Sheet */}
        <div className="bg-[#0a0f0d] p-3 rounded-lg border border-[#262b29] space-y-1.5 text-[11px] font-mono">
          <div className="flex justify-between text-[#bacbb9]">
            <span>Gross Commodity:</span>
            <span className="text-[#dfe4e0]">₦{commodityCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[#bacbb9]">
            <span>Freight & Haulage:</span>
            <span className="text-[#dfe4e0]">₦{haulageRate.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[#bacbb9]">
            <span>State Interstate Tolls:</span>
            <span className="text-[#dfe4e0]">₦{tollsCost.toLocaleString()}</span>
          </div>
          <div className="h-px bg-[#262b29] my-1"></div>
          <div className="flex justify-between text-[13px] font-bold text-[#dfe4e0]">
            <span>Total Landed Cost:</span>
            <span className="text-[#75ff9e]">₦{totalLandedCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[10px] text-[#4edea3]">
            <span>Landed Cost per Tonne:</span>
            <span>₦{Math.round(totalLandedCost / selectedTonnage).toLocaleString()}/MT</span>
          </div>
        </div>
      </div>

      {/* Seller Credibility */}
      <div className="rounded-xl bg-[#1c211e] p-3.5 flex items-center justify-between border border-[#262b29]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#00e676]/20 text-[#00e676] flex items-center justify-center font-bold font-['Plus_Jakarta_Sans']">
            {lot.sellerName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <span className="text-[13px] font-bold text-[#dfe4e0] block">{lot.sellerName}</span>
            <span className="text-[11px] text-[#4edea3]">
              ★ {lot.sellerRating} ({lot.sellerTrades} orders fulfilled • 99.4% SLA)
            </span>
          </div>
        </div>
        <span className="material-symbols-outlined text-[#00e676] text-[20px]">verified</span>
      </div>

      {/* Sticky Bottom Order Bar */}
      <div className="fixed bottom-16 inset-x-0 z-40 bg-[#0a0f0d]/95 backdrop-blur-xl border-t border-[#1c211e] p-3">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
          <button
            onClick={() => onCounterOffer(lot)}
            className="py-3 rounded-xl bg-[#262b29] hover:bg-[#313633] text-[#dfe4e0] font-semibold text-[13px] flex items-center justify-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Make Offer</span>
          </button>
          <button
            onClick={() => onInstantBuy(lot, selectedTonnage)}
            className="py-3 rounded-xl bg-[#00e676] hover:bg-[#75ff9e] text-[#00210b] font-bold text-[13px] flex items-center justify-center gap-1.5 shadow-[0_0_16px_rgba(0,230,118,0.35)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <span>Buy via Escrow</span>
          </button>
        </div>
      </div>
    </div>
  );
};
