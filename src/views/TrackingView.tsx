import React, { useState } from 'react';
import { ACTIVE_SHIPMENTS } from '../data/mockData';
import { HaulageShipment } from '../types';

interface TrackingViewProps {
  shipmentId?: string;
  onBack: () => void;
  onInspectSeal: (shipment: HaulageShipment) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const TrackingView: React.FC<TrackingViewProps> = ({
  shipmentId = 'ship-20481',
  onBack,
  onInspectSeal,
  onShowToast,
}) => {
  const [activeShipmentId, setActiveShipmentId] = useState(shipmentId);
  const shipment = ACTIVE_SHIPMENTS.find((s) => s.id === activeShipmentId) || ACTIVE_SHIPMENTS[0];

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
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#181d1a] border border-[#262b29] text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse"></span>
          <span className="text-[#00e676] font-semibold">SATLINK 5.2 ACTIVE</span>
        </div>
      </div>

      {/* Shipment Switcher Pills if more than one shipment exists */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
        {ACTIVE_SHIPMENTS.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setActiveShipmentId(s.id);
              onShowToast(`Tracking ${s.trackingNumber} (${s.commodity})`, 'radar');
            }}
            className={`px-3 py-1.5 rounded-xl text-[12px] flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              activeShipmentId === s.id
                ? 'bg-[#00e676] text-[#00210b] font-bold shadow-[0_0_12px_rgba(0,230,118,0.3)]'
                : 'bg-[#181d1a] text-[#bacbb9] hover:text-[#dfe4e0] border border-[#262b29]'
            }`}
          >
            <span>{s.trackingNumber}</span>
            <span className="text-[10px] opacity-80">({s.status})</span>
          </button>
        ))}
      </div>

      {/* Headline & Specs */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-['Plus_Jakarta_Sans'] text-[20px] font-bold text-[#dfe4e0]">
              Shipment #{shipment.trackingNumber}
            </h2>
            <span className="px-2 py-0.5 rounded bg-[#262b29] text-[#75ff9e] text-[10px] font-bold uppercase tracking-wider">
              {shipment.status}
            </span>
          </div>
          <span className="text-[12px] font-mono text-[#00e676] font-semibold">
            {shipment.progressPct}%
          </span>
        </div>
        <p className="text-[12px] text-[#bacbb9]">
          {shipment.commodity} ({shipment.volume}) • {shipment.origin} ➔ {shipment.destination}
        </p>
      </div>

      {/* GPS Radar Map Canvas with HUD */}
      <div className="relative w-full h-[280px] rounded-xl bg-[#181d1a] overflow-hidden select-none border border-[#262b29] shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#00e676_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-15 pointer-events-none"></div>

        {/* Top HUD Telemetry Ribbon */}
        <div className="absolute top-2 inset-x-2 z-20 grid grid-cols-3 gap-1.5 pointer-events-none">
          <div className="bg-[#0a0f0d]/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-[#262b29] flex flex-col">
            <span className="text-[9px] text-[#859585] uppercase">Speed</span>
            <span className="text-[13px] font-mono font-bold text-[#75ff9e]">
              {shipment.speedKmh} km/h
            </span>
          </div>
          <div className="bg-[#0a0f0d]/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-[#262b29] flex flex-col">
            <span className="text-[9px] text-[#859585] uppercase">Heading</span>
            <span className="text-[13px] font-mono font-bold text-[#dfe4e0]">
              {shipment.heading}
            </span>
          </div>
          <div className="bg-[#0a0f0d]/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-[#262b29] flex flex-col">
            <span className="text-[9px] text-[#859585] uppercase">Silo Cargo Temp</span>
            <span className="text-[13px] font-mono font-bold text-[#4edea3]">
              {shipment.siloTempCelsius}°C Safe
            </span>
          </div>
        </div>

        {/* Vector SVG Route Overlay */}
        <svg className="w-full h-full object-cover" viewBox="0 0 360 280">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00e676" />
              <stop offset="70%" stopColor="#4edea3" />
              <stop offset="100%" stopColor="#859585" />
            </linearGradient>
          </defs>

          {/* Road Corridors */}
          <path
            d="M 180 50 L 175 105 L 165 160 L 155 240"
            fill="none"
            stroke="#262b29"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 180 50 L 175 105 L 165 160"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 165 160 L 155 240"
            fill="none"
            stroke="#4edea3"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />

          {/* Origin: Kano */}
          <circle cx="180" cy="50" r="5" fill="#00e676" />
          <text x="195" y="54" fill="#dfe4e0" fontSize="10" fontFamily="Inter" fontWeight="600">
            Kano (Dawanau)
          </text>

          {/* Intermediate: Zaria */}
          <circle cx="175" cy="105" r="4" fill="#4edea3" />
          <text x="190" y="108" fill="#bacbb9" fontSize="9" fontFamily="Inter">
            Zaria Gate (Passed)
          </text>

          {/* CURRENT VEHICLE POSITION: Kaduna Eastern Bypass */}
          <g transform="translate(165, 160)">
            <circle cx="0" cy="0" r="16" fill="#00e676" opacity="0.3" className="animate-ping" />
            <circle cx="0" cy="0" r="8" fill="#00e676" />
            <circle cx="0" cy="0" r="3" fill="#00210b" />
            <g transform="translate(14, -8)">
              <rect width="115" height="24" rx="4" fill="#0a0f0d" opacity="0.95" stroke="#3b4a3d" strokeWidth="0.8" />
              <text x="8" y="12" fill="#75ff9e" fontSize="9" fontFamily="Inter" fontWeight="bold">
                ● {shipment.waypointCurrent}
              </text>
              <text x="8" y="21" fill="#bacbb9" fontSize="8" fontFamily="Inter">
                Live GPS • 64 km/h
              </text>
            </g>
          </g>

          {/* Destination: Dei-Dei Abuja */}
          <circle cx="155" cy="240" r="6" fill="#262b29" stroke="#75ff9e" strokeWidth="2" />
          <text x="172" y="244" fill="#dfe4e0" fontSize="10" fontFamily="Inter" fontWeight="600">
            Abuja (Dei-Dei Hub)
          </text>
        </svg>

        {/* Bottom Banner */}
        <div className="absolute bottom-2 inset-x-2 z-20 bg-[#0a0f0d]/90 backdrop-blur-md px-3 py-2 rounded-lg border border-[#262b29] flex items-center justify-between text-[11px]">
          <span className="text-[#dfe4e0] font-medium">
            Est. Arrival: <span className="text-[#75ff9e] font-bold">{shipment.eta}</span>
          </span>
          <span className="text-[#bacbb9] font-mono">
            {shipment.distanceRemainingKm} km remaining
          </span>
        </div>
      </div>

      {/* Driver Card & Direct Actions */}
      <div className="rounded-xl bg-[#181d1a] p-4 space-y-3.5 border border-[#262b29] shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              className="w-12 h-12 rounded-full object-cover bg-[#262b29] border-2 border-[#00e676]"
              alt="Assigned Driver"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI3kXJ9yhOYH7N3rnGl7ZQXpef7EkaZMeFvrqD0-of6s43e6kx15M-zwGUp1d28dVvBy7-sJzkldtKxxXCxkRlgEVZCBHzafMD8izNYogiv_NgP6xgu4BjPmzy8sKksaV-ncxwMgPW8nPSy3uBV46imk7dGZsqr6b_G_E0P6KCq-YFpDklnEi-_JBGUwyhSW5Im-5gmOMxdcLBLTUKO7jih9GOPR98nwV_W2Hw3z-_DhiOKi4FNfct"
            />
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#dfe4e0]">{shipment.driverName}</span>
              <span className="text-[11px] text-[#4edea3]">
                ★ {shipment.driverRating} ({shipment.driverCompletedRuns} verified runs)
              </span>
              <span className="text-[10px] text-[#859585] font-mono mt-0.5">
                {shipment.vehicleModel} • {shipment.vehiclePlate}
              </span>
            </div>
          </div>
        </div>

        {/* 3 Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            onClick={() => onShowToast(`Calling driver at ${shipment.driverPhone}...`, 'call')}
            className="py-2 px-2 rounded-lg bg-[#262b29] hover:bg-[#313633] text-[#dfe4e0] text-[11px] font-semibold flex items-center justify-center space-x-1 transition-all"
          >
            <span className="material-symbols-outlined text-[16px] text-[#75ff9e]">call</span>
            <span>Call Driver</span>
          </button>
          <button
            onClick={() => onInspectSeal(shipment)}
            className="py-2 px-2 rounded-lg bg-[#262b29] hover:bg-[#313633] text-[#dfe4e0] text-[11px] font-semibold flex items-center justify-center space-x-1 transition-all"
          >
            <span className="material-symbols-outlined text-[16px] text-[#4edea3]">qr_code_2</span>
            <span>Waybill & Seal</span>
          </button>
          <button
            onClick={() => onShowToast('Incident telemetry logged. Operations escort alerted.', 'warning')}
            className="py-2 px-2 rounded-lg bg-[#262b29] hover:bg-[#313633] text-[#ffb4ab] text-[11px] font-semibold flex items-center justify-center space-x-1 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">report_problem</span>
            <span>Report Delay</span>
          </button>
        </div>
      </div>

      {/* Cargo Insurance Guarantee Badge */}
      <div className="rounded-xl bg-[#1c211e] p-3.5 flex items-center justify-between border border-[#262b29]">
        <div className="flex items-center space-x-2.5">
          <span className="material-symbols-outlined text-[#00e676] text-[24px]">verified_user</span>
          <div>
            <span className="text-[12px] font-bold text-[#dfe4e0] block">
              Leadway Cargo Value Protection
            </span>
            <span className="text-[10px] text-[#bacbb9]">
              Policy #{shipment.insurancePolicy} • 100% Goods-In-Transit Underwriting
            </span>
          </div>
        </div>
        <span className="text-[13px] font-mono font-bold text-[#75ff9e]">
          ₦{(shipment.cargoValueProtectedNaira / 1000000).toFixed(1)}M
        </span>
      </div>

      {/* Corridor Milestone Timeline */}
      <div className="rounded-xl bg-[#181d1a] p-4 space-y-3 border border-[#262b29]">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#4edea3]">
          Transit Milestones & Checkpoint Logs
        </span>

        <div className="space-y-4 pt-1">
          {shipment.milestones.map((ms, index) => {
            const isDone = ms.status === 'completed';
            const isCurrent = ms.status === 'current';
            return (
              <div key={index} className="flex items-start space-x-3 text-[12px]">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      isDone
                        ? 'bg-[#00e676] text-[#00210b]'
                        : isCurrent
                        ? 'bg-[#4edea3] ring-4 ring-[#4edea3]/20 animate-pulse'
                        : 'bg-[#313633]'
                    }`}
                  >
                    {isDone && <span className="material-symbols-outlined text-[10px]">done</span>}
                  </div>
                  {index < shipment.milestones.length - 1 && (
                    <div className={`w-0.5 h-10 ${isDone ? 'bg-[#00e676]' : 'bg-[#313633]'}`}></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${isCurrent ? 'text-[#75ff9e]' : 'text-[#dfe4e0]'}`}>
                      {ms.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#bacbb9]">{ms.time}</span>
                  </div>
                  <p className="text-[11px] text-[#bacbb9] mt-0.5">{ms.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
