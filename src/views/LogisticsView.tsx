import React, { useState } from 'react';
import { ACTIVE_SHIPMENTS } from '../data/mockData';
import { HaulageShipment } from '../types';

interface LogisticsViewProps {
  onOpenTracking: (shipmentId: string) => void;
  onInspectSeal: (shipment: HaulageShipment) => void;
  onBookHaulage: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const LogisticsView: React.FC<LogisticsViewProps> = ({
  onOpenTracking,
  onInspectSeal,
  onBookHaulage,
  onShowToast,
}) => {
  const [subTab, setSubTab] = useState<'dispatches' | 'trucks' | 'waybills'>('dispatches');

  return (
    <div className="flex flex-col w-full space-y-4 pb-8">
      {/* Header Context */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="font-['Plus_Jakarta_Sans'] text-[20px] font-bold text-[#dfe4e0]">
            Logistics & Transit Control
          </h2>
          <span className="text-[10px] font-mono text-[#00e676] bg-[#262b29] px-2.5 py-1 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse"></span>
            3 FLEETS ACTIVE
          </span>
        </div>
        <p className="text-[12px] text-[#bacbb9]">
          Real-time GPS telematics, tamper-evident digital seals, and Leadway cargo protection.
        </p>
      </div>

      {/* KPI Ticker Deck */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-[#181d1a] p-3 flex flex-col justify-between border border-[#262b29]">
          <span className="text-[10px] text-[#859585] uppercase">Active Fleet</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#dfe4e0] mt-1">
            03 Units
          </span>
          <span className="text-[10px] text-[#00e676] font-medium">105 MT En Route</span>
        </div>

        <div className="rounded-xl bg-[#181d1a] p-3 flex flex-col justify-between border border-[#262b29]">
          <span className="text-[10px] text-[#859585] uppercase">SLA Reliability</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#dfe4e0] mt-1">
            98.6%
          </span>
          <span className="text-[10px] text-[#4edea3] font-medium">Zero Seal Breaches</span>
        </div>

        <div className="rounded-xl bg-[#181d1a] p-3 flex flex-col justify-between border border-[#262b29]">
          <span className="text-[10px] text-[#859585] uppercase">Under Cover</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#75ff9e] mt-1">
            ₦173.3M
          </span>
          <span className="text-[10px] text-[#bacbb9]">GIT Underwritten</span>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="grid grid-cols-3 p-1 bg-[#181d1a] rounded-xl border border-[#262b29] text-[12px]">
        <button
          onClick={() => setSubTab('dispatches')}
          className={`py-1.5 rounded-lg font-semibold transition-all ${
            subTab === 'dispatches' ? 'bg-[#262b29] text-[#00e676] shadow-sm' : 'text-[#bacbb9]'
          }`}
        >
          Dispatches (3)
        </button>
        <button
          onClick={() => setSubTab('trucks')}
          className={`py-1.5 rounded-lg font-semibold transition-all ${
            subTab === 'trucks' ? 'bg-[#262b29] text-[#00e676] shadow-sm' : 'text-[#bacbb9]'
          }`}
        >
          Available Trucks (18)
        </button>
        <button
          onClick={() => setSubTab('waybills')}
          className={`py-1.5 rounded-lg font-semibold transition-all ${
            subTab === 'waybills' ? 'bg-[#262b29] text-[#00e676] shadow-sm' : 'text-[#bacbb9]'
          }`}
        >
          Waybills
        </button>
      </div>

      {subTab === 'dispatches' && (
        <div className="space-y-3">
          {ACTIVE_SHIPMENTS.map((s) => (
            <div
              key={s.id}
              className="rounded-xl bg-[#181d1a] p-4 space-y-3 border border-[#262b29] shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold text-[#dfe4e0]">
                      #{s.trackingNumber}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                        s.status === 'IN TRANSIT'
                          ? 'bg-[#262b29] text-[#00e676]'
                          : s.status === 'WEIGHBRIDGE'
                          ? 'bg-[#262b29] text-[#4edea3]'
                          : 'bg-[#262b29] text-[#bacbb9]'
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#bacbb9] mt-0.5">
                    {s.commodity} • {s.origin} ➔ {s.destination}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#859585] uppercase block">ETA</span>
                  <span className="text-[12px] font-bold text-[#dfe4e0]">{s.eta}</span>
                </div>
              </div>

              {/* Progress Track */}
              <div className="space-y-1.5 bg-[#0a0f0d] p-2.5 rounded-lg border border-[#262b29]">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#dfe4e0] font-medium">{s.waypointCurrent}</span>
                  <span className="text-[#00e676] font-mono">{s.progressPct}%</span>
                </div>
                <div className="w-full bg-[#262b29] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#00a572] to-[#00e676] h-full rounded-full"
                    style={{ width: `${s.progressPct}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-[#bacbb9] pt-0.5 font-mono">
                  <span>Driver: {s.driverName} ★{s.driverRating}</span>
                  <span>{s.vehiclePlate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => onInspectSeal(s)}
                  className="py-2 rounded-lg bg-[#262b29] hover:bg-[#313633] text-[#dfe4e0] text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#4edea3]">qr_code_2</span>
                  <span>Inspect Seal</span>
                </button>
                <button
                  onClick={() => onOpenTracking(s.id)}
                  className="py-2 rounded-lg bg-[#00e676] hover:bg-[#75ff9e] text-[#00210b] text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(0,230,118,0.25)] active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">radar</span>
                  <span>Track Live GPS</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {subTab === 'trucks' && (
        <div className="space-y-2.5">
          <div className="p-3 bg-[#181d1a] rounded-xl border border-[#262b29] space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#dfe4e0] text-[14px]">
                  Dawanau Staging Depot (Kano)
                </span>
                <span className="text-[11px] text-[#4edea3] block">
                  8 Articulated Flatbeds Ready (30MT - 45MT)
                </span>
              </div>
              <button
                onClick={onBookHaulage}
                className="px-3 py-1.5 rounded-lg bg-[#00e676] text-[#00210b] font-bold text-[11px]"
              >
                Dispatch
              </button>
            </div>
          </div>

          <div className="p-3 bg-[#181d1a] rounded-xl border border-[#262b29] space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#dfe4e0] text-[14px]">
                  Gboko Agro Yard (Benue)
                </span>
                <span className="text-[11px] text-[#4edea3] block">
                  6 Heavy Sided Trailers Ready (Soybean certified)
                </span>
              </div>
              <button
                onClick={onBookHaulage}
                className="px-3 py-1.5 rounded-lg bg-[#00e676] text-[#00210b] font-bold text-[11px]"
              >
                Dispatch
              </button>
            </div>
          </div>

          <div className="p-3 bg-[#181d1a] rounded-xl border border-[#262b29] space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#dfe4e0] text-[14px]">
                  Bodija Logistics Staging (Ibadan)
                </span>
                <span className="text-[11px] text-[#4edea3] block">
                  4 Rapid 15MT Rigid Flatbeds
                </span>
              </div>
              <button
                onClick={onBookHaulage}
                className="px-3 py-1.5 rounded-lg bg-[#00e676] text-[#00210b] font-bold text-[11px]"
              >
                Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

      {subTab === 'waybills' && (
        <div className="space-y-2.5">
          {ACTIVE_SHIPMENTS.map((s) => (
            <div
              key={s.id}
              onClick={() => onInspectSeal(s)}
              className="p-3.5 bg-[#181d1a] rounded-xl border border-[#262b29] flex items-center justify-between cursor-pointer hover:bg-[#1c211e] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#00e676] text-[24px]">
                  description
                </span>
                <div>
                  <span className="text-[13px] font-bold text-[#dfe4e0] block">
                    Waybill #{s.trackingNumber}
                  </span>
                  <span className="text-[11px] text-[#bacbb9]">
                    {s.sealNumber} • {s.commodity} ({s.volume})
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#859585] text-[18px]">
                arrow_forward_ios
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Book Instant Haulage Action CTA */}
      <button
        onClick={onBookHaulage}
        className="w-full h-12 rounded-xl bg-[#00e676] hover:bg-[#75ff9e] text-[#00210b] font-bold text-[14px] flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(0,230,118,0.35)] active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-[20px]">rv_hookup</span>
        <span>Book Instant Agro-Haulage</span>
      </button>
    </div>
  );
};
