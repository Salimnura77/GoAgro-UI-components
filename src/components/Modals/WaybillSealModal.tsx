import React from 'react';
import { HaulageShipment } from '../../types';

interface WaybillSealModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: HaulageShipment;
}

export const WaybillSealModal: React.FC<WaybillSealModalProps> = ({
  isOpen,
  onClose,
  shipment,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1c211e] p-6 rounded-2xl flex flex-col gap-4 border border-[#3b4a3d] shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e676] text-[22px]">
              description
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[#4edea3] font-bold">
                Digital Consignment Waybill
              </span>
              <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] text-[#dfe4e0] font-bold">
                {shipment.trackingNumber}
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

        <div className="p-3.5 rounded-xl bg-[#0a0f0d] border border-[#262b29] space-y-2.5 font-mono text-[12px]">
          <div className="flex justify-between pb-1 border-b border-[#262b29]">
            <span className="text-[#859585]">E-Seal Number</span>
            <span className="text-[#00e676] font-bold">{shipment.sealNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#859585]">Commodity Spec</span>
            <span className="text-[#dfe4e0]">{shipment.commodity} ({shipment.volume})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#859585]">Carrier Unit</span>
            <span className="text-[#dfe4e0]">{shipment.vehiclePlate} ({shipment.vehicleModel})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#859585]">Assigned Driver</span>
            <span className="text-[#dfe4e0]">{shipment.driverName} ★{shipment.driverRating}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#859585]">Origin Weighbridge</span>
            <span className="text-[#dfe4e0]">{shipment.origin}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#859585]">Target Terminal</span>
            <span className="text-[#dfe4e0]">{shipment.destination}</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-[#262b29]">
            <span className="text-[#859585]">Insurance Cover</span>
            <span className="text-[#4edea3]">Leadway GIT (₦{(shipment.cargoValueProtectedNaira / 1000000).toFixed(1)}M)</span>
          </div>
        </div>

        <div className="p-3 bg-[#181d1a] rounded-lg flex items-center gap-2 border border-[#262b29]">
          <span className="material-symbols-outlined text-[#00e676] text-[20px]">
            verified
          </span>
          <span className="text-[11px] text-[#bacbb9]">
            Cryptographically signed by Dawanau Market Union and Federal Inter-State Haulage Registry.
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#262b29] text-[#dfe4e0] font-semibold text-[14px] hover:bg-[#313633] transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
