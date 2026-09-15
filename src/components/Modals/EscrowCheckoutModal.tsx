import React, { useState } from 'react';

interface EscrowCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  lotCode: string;
  commodityName: string;
  volumeMt: number;
  totalNaira: string;
  onConfirm: () => void;
}

export const EscrowCheckoutModal: React.FC<EscrowCheckoutModalProps> = ({
  isOpen,
  onClose,
  lotCode,
  commodityName,
  volumeMt,
  totalNaira,
  onConfirm,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAuthorize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onConfirm();
        onClose();
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end p-0">
      <div className="w-full max-w-md mx-auto rounded-t-2xl bg-[#1c211e] p-6 space-y-4 shadow-2xl border-t border-[#3b4a3d] animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e676] text-[22px]">
              shield_with_heart
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-[16px] text-[#dfe4e0] font-bold">
              Escrow Checkout Lock
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#262b29] flex items-center justify-center text-[#bacbb9] hover:text-[#dfe4e0]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-3.5 rounded-lg bg-[#262b29] space-y-2 border border-[#3b4a3d]/50">
          <div className="flex justify-between text-[13px] text-[#bacbb9]">
            <span>Batch Assignment</span>
            <span className="text-[#dfe4e0] font-mono font-semibold">{lotCode}</span>
          </div>
          <div className="flex justify-between text-[13px] text-[#bacbb9]">
            <span>Selected Cargo</span>
            <span className="text-[#dfe4e0] font-medium">
              {volumeMt} MT ({commodityName})
            </span>
          </div>
          <div className="flex justify-between text-[13px] text-[#bacbb9]">
            <span>Underwriter</span>
            <span className="text-[#4edea3] font-medium">Leadway Cargo GIT Shield</span>
          </div>
          <div className="h-px bg-[#3b4a3d]/50 my-1"></div>
          <div className="flex justify-between text-[14px] font-semibold text-[#dfe4e0]">
            <span>Total Payable to Escrow</span>
            <span className="text-[#75ff9e] font-bold font-mono text-[16px]">{totalNaira}</span>
          </div>
        </div>

        <div className="p-3 bg-[#181d1a] rounded-lg flex items-center gap-2 text-[12px] text-[#bacbb9]">
          <span className="material-symbols-outlined text-[#00e676] text-[18px] flex-shrink-0">
            lock
          </span>
          <span>
            Funds are locked in CBN-licensed escrow vault and only disbursed upon electronic weighbridge scan confirmation.
          </span>
        </div>

        <div className="space-y-2 pt-1">
          <button
            onClick={handleAuthorize}
            disabled={isProcessing || isSuccess}
            className={`w-full h-12 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 transition-all shadow-[0_0_16px_rgba(0,230,118,0.35)] ${
              isSuccess
                ? 'bg-[#4edea3] text-[#003824]'
                : 'bg-[#00e676] text-[#00210b] hover:bg-[#75ff9e] active:scale-[0.98]'
            }`}
          >
            {isProcessing ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                <span>Locking Escrow Vault...</span>
              </>
            ) : isSuccess ? (
              <>
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Escrow Secured & Dispatched!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[19px]">account_balance</span>
                <span>Authorize Escrow Transfer</span>
              </>
            )}
          </button>
          <p className="text-[11px] text-center text-[#859585]">
            Instant CBN-settled vault lock • Automated dispatches within 4 hours
          </p>
        </div>
      </div>
    </div>
  );
};
