import React, { useState } from 'react';
import { WHOLESALE_HUBS } from '../data/mockData';
import { WholesaleHub } from '../types';

interface MarketViewProps {
  onOpenArbitrage: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const MarketView: React.FC<MarketViewProps> = ({ onOpenArbitrage, onShowToast }) => {
  const [selectedCommodity, setSelectedCommodity] = useState('Maize');
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1W' | '1M' | '3M' | '1Y'>('1W');
  const [marketSubTab, setMarketSubTab] = useState<'terminal' | 'hubs-map'>('terminal');
  const [selectedHub, setSelectedHub] = useState<WholesaleHub>(WHOLESALE_HUBS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const commodities = [
    { name: 'Maize', sub: 'Selected', price: '₦1,250/kg' },
    { name: 'Sorghum', sub: '₦920/kg', price: '₦920/kg' },
    { name: 'Soybeans', sub: '₦1,140/kg', price: '₦1,140/kg' },
    { name: 'Paddy Rice', sub: '₦890/kg', price: '₦890/kg' },
    { name: 'Sesame Seed', sub: '₦2,850/kg', price: '₦2,850/kg' },
    { name: 'Cowpea', sub: '₦1,650/kg', price: '₦1,650/kg' },
  ];

  return (
    <div className="flex flex-col w-full space-y-4 pb-6">
      {/* Title / Subtitle Context Block */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#62ff96] tracking-tight">
              Market Intelligence
            </span>
            <span className="px-1.5 py-0.5 rounded-full bg-[#262b29] text-[#75ff9e] text-[10px] uppercase font-mono">
              PRO-TERMINAL
            </span>
          </div>
          <span className="text-[11px] text-[#bacbb9] flex items-center gap-1 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#00e676] animate-ping"></span>
            SYNCED
          </span>
        </div>
        <p className="text-[12px] text-[#bacbb9]">
          Real-Time Commodity Exchange & Price Discovery across 36 States
        </p>
      </div>

      {/* Sub-view View Switcher (Terminal Chart vs Tactical Map) */}
      <div className="grid grid-cols-2 p-1 bg-[#181d1a] rounded-xl border border-[#262b29]">
        <button
          onClick={() => setMarketSubTab('terminal')}
          className={`py-2 rounded-lg text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
            marketSubTab === 'terminal'
              ? 'bg-[#262b29] text-[#00e676] shadow-sm'
              : 'text-[#bacbb9] hover:text-[#dfe4e0]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">candlestick_chart</span>
          <span>Terminal Candlesticks</span>
        </button>
        <button
          onClick={() => setMarketSubTab('hubs-map')}
          className={`py-2 rounded-lg text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
            marketSubTab === 'hubs-map'
              ? 'bg-[#262b29] text-[#00e676] shadow-sm'
              : 'text-[#bacbb9] hover:text-[#dfe4e0]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">travel_explore</span>
          <span>Wholesale Hubs Map</span>
        </button>
      </div>

      {/* Terminal Omnisearch Bar */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#75ff9e]">
          <span className="material-symbols-outlined text-[18px]">search</span>
        </div>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[#181d1a] text-[#dfe4e0] placeholder-[#859585] text-[13px] border border-[#262b29] focus:border-[#00e676] focus:outline-none"
          placeholder="Search 42 commodities across 36 states..."
          type="text"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <kbd className="px-1.5 py-0.5 text-[10px] text-[#bacbb9] bg-[#313633] rounded font-mono">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Horizontal Commodity Chips Scroller */}
      <div className="overflow-x-auto -mx-4 px-4 no-scrollbar py-0.5 flex space-x-2">
        {commodities.map((comm) => {
          const isSelected = selectedCommodity === comm.name;
          return (
            <button
              key={comm.name}
              onClick={() => {
                setSelectedCommodity(comm.name);
                onShowToast(`Loaded ${comm.name} Benchmarks (${comm.price})`);
              }}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-[12px] flex items-center space-x-1.5 transition-all ${
                isSelected
                  ? 'bg-[#00e676] text-[#00210b] font-bold shadow-[0_0_12px_rgba(0,230,118,0.3)]'
                  : 'bg-[#181d1a] text-[#bacbb9] hover:text-[#dfe4e0] border border-[#262b29]'
              }`}
            >
              <span>{comm.name}</span>
              {isSelected ? (
                <span className="material-symbols-outlined text-[14px]">verified</span>
              ) : (
                <span className="text-[10px] text-[#4edea3] font-mono">{comm.sub}</span>
              )}
            </button>
          );
        })}
      </div>

      {marketSubTab === 'terminal' ? (
        /* TERMINAL VIEW: CANDLESTICK & METRICS */
        <div className="space-y-4">
          {/* Bloomberg-Grade Financial Container */}
          <div className="rounded-xl bg-[#181d1a] p-4 flex flex-col space-y-3 shadow-xl border border-[#262b29]">
            {/* Header of Financial Widget */}
            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-[#4edea3] font-semibold">
                  {selectedCommodity} (Dawanau Kano Benchmarks)
                </span>
                {/* Timeframe Selector Tabs */}
                <div className="flex items-center space-x-1 bg-[#313633] p-0.5 rounded-lg text-[11px]">
                  {(['1D', '5D', '1W', '1M', '3M', '1Y'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-2 py-0.5 rounded transition-all ${
                        timeframe === tf
                          ? 'bg-[#00e676] text-[#00210b] font-bold shadow-sm'
                          : 'text-[#bacbb9] hover:text-[#dfe4e0]'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-baseline space-x-2.5">
                <span className="font-['Plus_Jakarta_Sans'] text-[26px] text-[#dfe4e0] font-bold">
                  ₦1,250.00
                </span>
                <span className="text-[12px] text-[#bacbb9]">/ kg</span>
                <div className="flex items-center text-[#00e676] space-x-0.5 text-[11px] font-semibold font-mono">
                  <span className="material-symbols-outlined text-[15px]">trending_up</span>
                  <span>+₦57.50 (+4.81%) Today</span>
                </div>
              </div>

              {/* OHLC + Volume Ticker Tape Strip */}
              <div className="flex items-center justify-between bg-[#262b29] px-2.5 py-1.5 rounded-lg text-[#bacbb9] text-[11px] font-mono overflow-x-auto no-scrollbar">
                <div className="flex space-x-2.5 whitespace-nowrap">
                  <span>
                    <span className="text-[#4edea3] opacity-70">O:</span> ₦1,192.50
                  </span>
                  <span>
                    <span className="text-[#4edea3] opacity-70">H:</span> ₦1,280.00
                  </span>
                  <span>
                    <span className="text-[#4edea3] opacity-70">L:</span> ₦1,180.00
                  </span>
                  <span>
                    <span className="text-[#75ff9e] font-semibold">C:</span> ₦1,250.00
                  </span>
                </div>
                <div className="pl-2 border-l border-[#313633] whitespace-nowrap text-[#dfe4e0] font-medium">
                  Vol: 42.8K MT
                </div>
              </div>
            </div>

            {/* Crisp High-Fidelity SVG Candlestick & Volume Chart */}
            <div className="relative w-full rounded-lg bg-[#0a0f0d] p-2 overflow-hidden border border-[#262b29]">
              <div className="absolute right-2 top-2 pointer-events-none opacity-5 flex items-center space-x-1">
                <span className="material-symbols-outlined text-[54px] text-[#75ff9e]">
                  candlestick_chart
                </span>
              </div>
              <svg
                className="w-full h-auto select-none overflow-visible"
                viewBox="0 0 360 210"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="glow-line" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow
                      dx="0"
                      dy="0"
                      stdDeviation="1.5"
                      floodColor="#64deaf"
                      floodOpacity="0.8"
                    />
                  </filter>
                </defs>
                {/* Horizontal Reference Gridlines & Price Labels */}
                <g stroke="#262b29" strokeDasharray="2,3" strokeWidth="0.8">
                  <line x1="10" x2="315" y1="20" y2="20" />
                  <line x1="10" x2="315" y1="60" y2="60" />
                  <line x1="10" x2="315" y1="100" y2="100" />
                  <line x1="10" x2="315" y1="140" y2="140" />
                </g>
                {/* Y-Axis Labels */}
                <g fill="#859585" fontFamily="Inter" fontSize="9" textAnchor="start">
                  <text x="320" y="23">₦1,300</text>
                  <text x="320" y="63" fill="#75ff9e" fontWeight="600">₦1,250</text>
                  <text x="320" y="103">₦1,200</text>
                  <text x="320" y="143">₦1,150</text>
                  <text x="320" y="195" fill="#4edea3">VOL (k)</text>
                </g>
                {/* Candlestick Wicks & Bodies */}
                {/* Candle 1: Bullish */}
                <line x1="28" x2="28" y1="110" y2="145" stroke="#00e676" strokeWidth="1.2" />
                <rect x="23" y="118" width="10" height="22" rx="1" fill="#00e676" />
                {/* Candle 2: Bullish */}
                <line x1="72" x2="72" y1="92" y2="130" stroke="#00e676" strokeWidth="1.2" />
                <rect x="67" y="100" width="10" height="24" rx="1" fill="#00e676" />
                {/* Candle 3: Bearish */}
                <line x1="116" x2="116" y1="78" y2="122" stroke="#ffb4ab" strokeWidth="1.2" />
                <rect x="111" y="86" width="10" height="20" rx="1" fill="#ffb4ab" />
                {/* Candle 4: Bearish */}
                <line x1="160" x2="160" y1="90" y2="135" stroke="#ffb4ab" strokeWidth="1.2" />
                <rect x="155" y="98" width="10" height="28" rx="1" fill="#ffb4ab" />
                {/* Candle 5: Bullish Rebound */}
                <line x1="204" x2="204" y1="65" y2="110" stroke="#00e676" strokeWidth="1.2" />
                <rect x="199" y="75" width="10" height="26" rx="1" fill="#00e676" />
                {/* Candle 6: Strong Bullish */}
                <line x1="248" x2="248" y1="42" y2="85" stroke="#00e676" strokeWidth="1.2" />
                <rect x="243" y="52" width="10" height="28" rx="1" fill="#00e676" />
                {/* Candle 7: Active Live Bullish (Today) */}
                <line x1="292" x2="292" y1="25" y2="72" stroke="#62ff96" strokeWidth="1.5" />
                <rect x="287" y="38" width="10" height="28" rx="1" fill="#00e676" />
                {/* Live pulse dot */}
                <circle cx="292" cy="38" r="3.5" fill="#62ff96" filter="url(#glow-line)" />
                <circle cx="292" cy="38" r="7" fill="none" stroke="#62ff96" strokeWidth="0.8" opacity="0.6">
                  <animate attributeName="r" values="3;9;3" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* MA-20 Trendline */}
                <path
                  d="M 28,135 Q 72,112 116,98 T 204,82 T 248,60 T 292,42"
                  fill="none"
                  stroke="#80f9c8"
                  strokeWidth="1.8"
                  strokeDasharray="3,2"
                  filter="url(#glow-line)"
                />
                {/* Volume Divider */}
                <line x1="10" x2="315" y1="156" y2="156" stroke="#262b29" strokeWidth="1" />
                {/* Volume Bars */}
                <rect x="23" y="175" width="10" height="25" rx="0.5" fill="#00e676" opacity="0.6" />
                <rect x="67" y="168" width="10" height="32" rx="0.5" fill="#00e676" opacity="0.6" />
                <rect x="111" y="180" width="10" height="20" rx="0.5" fill="#ffb4ab" opacity="0.5" />
                <rect x="155" y="185" width="10" height="15" rx="0.5" fill="#ffb4ab" opacity="0.5" />
                <rect x="199" y="164" width="10" height="36" rx="0.5" fill="#00e676" opacity="0.7" />
                <rect x="243" y="160" width="10" height="40" rx="0.5" fill="#00e676" opacity="0.85" />
                <rect x="287" y="157" width="10" height="43" rx="0.5" fill="#62ff96" opacity="0.95" />
                {/* X-Axis Timestamps */}
                <g fill="#859585" fontFamily="Inter" fontSize="8.5" textAnchor="middle">
                  <text x="28" y="208">04 MAY</text>
                  <text x="72" y="208">05 MAY</text>
                  <text x="116" y="208">06 MAY</text>
                  <text x="160" y="208">07 MAY</text>
                  <text x="204" y="208">08 MAY</text>
                  <text x="248" y="208">09 MAY</text>
                  <text x="292" y="208" fill="#75ff9e" fontWeight="600">TODAY</text>
                </g>
              </svg>
            </div>

            {/* Verified Spot Price Badge */}
            <div className="flex items-center space-x-2 bg-[#1c211e] px-3 py-2 rounded-lg border border-[#262b29]">
              <span className="material-symbols-outlined text-[#4edea3] text-[16px] flex-shrink-0 animate-pulse">
                verified_user
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-[#dfe4e0] truncate">
                  <span className="text-[#75ff9e] font-semibold">Verified Spot Price</span> • Kano Dawanau Market Hub
                </p>
                <p className="text-[10px] text-[#bacbb9] truncate">
                  High Confidence Index (48 matched trades today) • 3m ago
                </p>
              </div>
            </div>
          </div>

          {/* Market Key Statistics 2x2 Bento Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-[#181d1a] p-3 flex flex-col justify-between border border-[#262b29]">
              <div className="flex items-center justify-between text-[#bacbb9]">
                <span className="text-[10px] uppercase">24h High</span>
                <span className="material-symbols-outlined text-[#75ff9e] text-[16px]">north_east</span>
              </div>
              <div className="mt-1">
                <span className="font-['Plus_Jakarta_Sans'] text-[18px] text-[#dfe4e0] font-semibold">
                  ₦1,280
                </span>
                <span className="text-[11px] text-[#bacbb9]"> / kg</span>
              </div>
              <div className="w-full bg-[#313633] h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#00e676] h-full rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div className="rounded-xl bg-[#181d1a] p-3 flex flex-col justify-between border border-[#262b29]">
              <div className="flex items-center justify-between text-[#bacbb9]">
                <span className="text-[10px] uppercase">24h Low</span>
                <span className="material-symbols-outlined text-[#4edea3] text-[16px]">south_west</span>
              </div>
              <div className="mt-1">
                <span className="font-['Plus_Jakarta_Sans'] text-[18px] text-[#dfe4e0] font-semibold">
                  ₦1,180
                </span>
                <span className="text-[11px] text-[#bacbb9]"> / kg</span>
              </div>
              <div className="w-full bg-[#313633] h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#4edea3] h-full rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>

            <div className="rounded-xl bg-[#181d1a] p-3 flex flex-col justify-between border border-[#262b29]">
              <div className="flex items-center justify-between text-[#bacbb9]">
                <span className="text-[10px] uppercase">7-Day Volatility</span>
                <span className="material-symbols-outlined text-[#80f9c8] text-[16px]">show_chart</span>
              </div>
              <div className="mt-1 flex items-baseline space-x-1.5">
                <span className="font-['Plus_Jakarta_Sans'] text-[18px] text-[#dfe4e0] font-semibold">
                  3.4%
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#262b29] text-[#75ff9e] text-[10px] font-bold">
                  LOW
                </span>
              </div>
              <p className="text-[10px] text-[#bacbb9] mt-1.5 truncate">Favorable corridor spread</p>
            </div>

            <div className="rounded-xl bg-[#181d1a] p-3 flex flex-col justify-between border border-[#262b29]">
              <div className="flex items-center justify-between text-[#bacbb9]">
                <span className="text-[10px] uppercase">National Avg</span>
                <span className="material-symbols-outlined text-[#bacbb9] text-[16px]">public</span>
              </div>
              <div className="mt-1">
                <span className="font-['Plus_Jakarta_Sans'] text-[18px] text-[#dfe4e0] font-semibold">
                  ₦1,385
                </span>
                <span className="text-[11px] text-[#bacbb9]"> / kg</span>
              </div>
              <p className="text-[10px] text-[#00e676] mt-1.5 flex items-center font-mono">
                <span className="font-semibold">-₦135 (-9.7%)</span> vs Kano
              </p>
            </div>
          </div>

          {/* Market Sentiment Meter */}
          <div className="rounded-xl bg-[#181d1a] p-3.5 flex flex-col space-y-2 border border-[#262b29]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-[#00e676] text-[18px]">balance</span>
                <span className="text-[13px] font-semibold text-[#dfe4e0]">Market Sentiment Gauge</span>
              </div>
              <span className="text-[11px] text-[#75ff9e] font-semibold">Bullish Momentum</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#75ff9e] font-semibold">Strong Buyer Demand (68% Buy)</span>
              <span className="text-[#ffb4ab] font-medium">32% Sell</span>
            </div>
            <div className="w-full flex h-2.5 rounded-full overflow-hidden bg-[#313633] gap-0.5">
              <div className="bg-[#00e676] h-full rounded-l-full" style={{ width: '52%' }}></div>
              <div className="bg-[#4edea3] h-full" style={{ width: '16%' }}></div>
              <div className="bg-[#313633] h-full" style={{ width: '2%' }}></div>
              <div className="bg-[#93000a] h-full rounded-r-full" style={{ width: '30%' }}></div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-[#bacbb9] pt-0.5">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e676]"></span>
                Aggregators Hoarding Stock
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#93000a]"></span>
                Lagos Port Offload Pressure
              </span>
            </div>
          </div>

          {/* Arbitrage Corridor Micro-Card */}
          <div
            onClick={onOpenArbitrage}
            className="rounded-xl bg-[#1c211e] p-3 flex items-center justify-between border border-[#262b29] hover:border-[#4edea3] cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#262b29] flex items-center justify-center text-[#62ff96]">
                <span className="material-symbols-outlined text-[18px]">route</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-1">
                  <span className="text-[12px] text-[#dfe4e0] font-semibold truncate">
                    Kano ➔ Mile 12 Lagos
                  </span>
                  <span className="px-1 py-0.2 rounded bg-[#00a572] text-[#003824] text-[9px] uppercase font-bold">
                    ₦210/kg Delta
                  </span>
                </div>
                <p className="text-[11px] text-[#bacbb9] truncate">
                  Net Margin after diesel/haulage: ~₦142,000 / MT
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#bacbb9] text-[18px]">
              chevron_right
            </span>
          </div>

          {/* Action CTA Command Bar */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onShowToast('Price Alert set at ₦1,250/kg for Yellow Maize', 'add_alert')}
              className="w-full py-3 px-3 rounded-xl bg-[#262b29] hover:bg-[#313633] text-[#dfe4e0] text-[13px] font-semibold flex items-center justify-center space-x-1.5 transition-all shadow-md active:scale-[0.98] border border-[#3b4a3d]"
            >
              <span className="material-symbols-outlined text-[#75ff9e] text-[18px]">add_alert</span>
              <span>Set Price Alert</span>
            </button>
            <button
              onClick={onOpenArbitrage}
              className="w-full py-3 px-3 rounded-xl bg-[#00e676] hover:bg-[#75ff9e] text-[#00210b] text-[13px] font-bold flex items-center justify-center space-x-1.5 shadow-[0_0_16px_rgba(0,230,118,0.35)] transition-all active:scale-[0.98]"
            >
              <span>Arbitrage Compare</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      ) : (
        /* WHOLESALE HUBS TACTICAL MAP VIEW */
        <div className="space-y-4">
          {/* Main Map Cartographic Vector Engine */}
          <div className="relative w-full h-[320px] rounded-xl bg-[#181d1a] overflow-hidden select-none border border-[#262b29]">
            <div className="absolute inset-0 bg-[radial-gradient(#00e676_0.75px,transparent_0.75px)] [background-size:16px_16px] opacity-15 pointer-events-none"></div>

            {/* Top Left Corridor Telemetry Chip */}
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#0a0f0d]/90 backdrop-blur-md border border-[#262b29]">
                <span className="w-2 h-2 rounded-full bg-[#00e676] animate-ping"></span>
                <span className="text-[10px] text-[#75ff9e] uppercase font-bold tracking-wider">
                  A2 Trunk Corridor
                </span>
              </div>
              <div className="px-2 py-0.5 rounded bg-[#262b29]/80 backdrop-blur-sm self-start">
                <span className="text-[10px] text-[#bacbb9]">24 Freight Convoys Active</span>
              </div>
            </div>

            {/* Interactive SVG Vector Map Canvas */}
            <svg className="w-full h-full object-cover" viewBox="0 0 380 320">
              <defs>
                <linearGradient id="corridorGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00e676" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#4edea3" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#80f9c8" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Nigeria Geometries */}
              <g fill="#141a17" stroke="#1f2923" strokeWidth="0.75">
                <path d="M 120 28 L 205 18 L 265 42 L 275 95 L 180 110 L 115 85 Z" />
                <path d="M 95 86 L 180 110 L 275 95 L 305 150 L 245 185 L 175 195 L 85 155 Z" />
                <path d="M 85 155 L 175 195 L 245 185 L 295 215 L 210 240 L 130 230 L 75 200 Z" />
                <path d="M 50 190 L 105 198 L 115 260 L 55 272 L 40 230 Z" />
                <path d="M 125 240 L 205 235 L 225 285 L 155 305 L 110 278 Z" />
                <path d="M 265 42 L 350 48 L 365 130 L 305 150 L 275 95 Z" />
              </g>

              {/* Transit Arteries */}
              <g fill="none" stroke="url(#corridorGlow)" strokeLinecap="round" strokeWidth="2">
                <path d="M 215 62 L 185 105 L 172 152" strokeDasharray="4 4" />
                <path d="M 172 152 L 95 220 L 78 262" strokeDasharray="4 4" />
                <path d="M 172 152 L 165 245 L 178 288" strokeDasharray="3 3" opacity="0.6" />
                <path d="M 215 62 L 240 125" strokeDasharray="2 3" opacity="0.5" />
              </g>

              {/* Hub Nodes */}
              {WHOLESALE_HUBS.map((hub) => {
                const isSelected = selectedHub.id === hub.id;
                return (
                  <g
                    key={hub.id}
                    onClick={() => {
                      setSelectedHub(hub);
                      onShowToast(`Selected Hub: ${hub.name} (₦${hub.spotPrice}/kg)`);
                    }}
                    transform={`translate(${hub.coordinates.x}, ${hub.coordinates.y})`}
                    className="cursor-pointer group"
                  >
                    {isSelected && (
                      <circle cx="0" cy="0" r="14" fill="#00e676" opacity="0.25" className="animate-ping" />
                    )}
                    <circle cx="0" cy="0" r={isSelected ? 7 : 5} fill={isSelected ? '#00e676' : '#4edea3'} />
                    <circle cx="0" cy="0" r="2.5" fill="#0a0f0d" />
                    <g transform="translate(8, -12)">
                      <rect
                        width={hub.name.length * 5.8 + 20}
                        height="18"
                        rx="3"
                        fill="#0a0f0d"
                        opacity="0.9"
                      />
                      <text x="5" y="12" fill={isSelected ? '#75ff9e' : '#dfe4e0'} fontSize="8" fontFamily="Inter" fontWeight="600">
                        {hub.name.split(' ')[0]} ₦{hub.spotPrice}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>

            {/* Tap Tip */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none px-2.5 py-1 rounded-full bg-[#262b29]/90 backdrop-blur-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[#00e676] text-[13px]">touch_app</span>
              <span className="text-[10px] text-[#bacbb9]">Tap any node for depth telemetry</span>
            </div>
          </div>

          {/* Selected Hub Intel Panel */}
          <div className="w-full rounded-xl bg-[#1c211e] p-4 space-y-3 shadow-lg border border-[#262b29]">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h2 className="font-['Plus_Jakarta_Sans'] text-[17px] text-[#dfe4e0] font-bold truncate">
                    {selectedHub.name}
                  </h2>
                  <span className="px-2 py-0.5 rounded bg-[#00e676]/20 text-[#00e676] text-[10px] uppercase font-semibold">
                    {selectedHub.id === 'kano' ? 'PRIMARY EXPORT HUB' : 'REGIONAL AGRO HUB'}
                  </span>
                </div>
                <p className="text-[12px] text-[#bacbb9] flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[14px] text-[#4edea3]">pin_drop</span>
                  {selectedHub.state} • {selectedHub.tradesToday} Verified Trades Today
                </p>
              </div>
              <div className="flex-shrink-0 text-right">
                <span className="text-[10px] text-[#bacbb9] uppercase block">Volume</span>
                <span className="text-[14px] text-[#75ff9e] font-bold font-mono">
                  {selectedHub.volumeNaira}
                </span>
              </div>
            </div>

            {/* 4-Grid Metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#181d1a] p-2.5 rounded-lg flex flex-col justify-between border border-[#262b29]">
                <span className="text-[10px] text-[#bacbb9]">Benchmark Spot</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-['Plus_Jakarta_Sans'] text-[18px] text-[#dfe4e0] font-bold">
                    ₦{selectedHub.spotPrice}
                  </span>
                  <span className="text-[10px] text-[#bacbb9]">/ kg</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[#00e475]">
                  <span className="material-symbols-outlined text-[13px]">trending_up</span>
                  <span className="text-[10px] font-semibold">+{selectedHub.change24hPct}% (24h)</span>
                </div>
              </div>

              <div className="bg-[#181d1a] p-2.5 rounded-lg flex flex-col justify-between border border-[#262b29]">
                <span className="text-[10px] text-[#bacbb9]">Available Liquidity</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-['Plus_Jakarta_Sans'] text-[18px] text-[#dfe4e0] font-bold">
                    {selectedHub.liquidityMt.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#bacbb9]">MT</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[#4edea3]">
                  <span className="material-symbols-outlined text-[13px]">verified</span>
                  <span className="text-[10px]">Verified Stock</span>
                </div>
              </div>

              <div className="bg-[#181d1a] p-2.5 rounded-lg flex flex-col justify-between border border-[#262b29]">
                <span className="text-[10px] text-[#bacbb9]">Order Fill Rate</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-['Plus_Jakarta_Sans'] text-[18px] text-[#dfe4e0] font-bold">
                    {selectedHub.orderFillRatePct}%
                  </span>
                  <span className="text-[10px] text-[#75ff9e]">Very High</span>
                </div>
                <div className="w-full bg-[#313633] h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-[#00e676] h-full rounded-full"
                    style={{ width: `${selectedHub.orderFillRatePct}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-[#181d1a] p-2.5 rounded-lg flex flex-col justify-between border border-[#262b29]">
                <span className="text-[10px] text-[#bacbb9]">Haulage Readiness</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-['Plus_Jakarta_Sans'] text-[18px] text-[#dfe4e0] font-bold">
                    {selectedHub.haulageReadinessTrucks}
                  </span>
                  <span className="text-[10px] text-[#bacbb9]">Trucks Idle</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[#4edea3]">
                  <span className="material-symbols-outlined text-[13px]">local_shipping</span>
                  <span className="text-[10px]">30MT & 40MT Ready</span>
                </div>
              </div>
            </div>

            {/* Top Arbitrage Signal */}
            <div className="bg-[#262b29] p-3 rounded-lg flex items-start gap-2.5 border border-[#3b4a3d]/50">
              <div className="w-8 h-8 rounded-full bg-[#00e676]/20 text-[#00e676] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">currency_exchange</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#4edea3] font-bold uppercase tracking-wide">
                    Top Arbitrage Corridors
                  </span>
                  <span className="text-[10px] text-[#75ff9e] font-mono font-semibold">
                    +₦{selectedHub.grossSpreadNaira}/kg Gross
                  </span>
                </div>
                <p className="text-[12px] text-[#dfe4e0] mt-0.5">
                  Ship outbound to <span className="font-semibold text-[#75ff9e]">{selectedHub.topCorridorDestination}</span>. Net profit estimate: <span className="font-semibold text-[#00e475] font-mono">{selectedHub.netProfitEstNaira}</span> per 30MT.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={onOpenArbitrage}
                className="w-full h-11 rounded-xl bg-[#00e676] hover:bg-[#75ff9e] text-[#00210b] font-bold text-[13px] flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(0,230,118,0.35)] active:scale-[0.98] transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">alt_route</span>
                <span>Simulate Arbitrage Haulage Route</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
