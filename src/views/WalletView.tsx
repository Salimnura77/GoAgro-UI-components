import React, { useState } from 'react';
import { WALLET_TRANSACTIONS } from '../data/mockData';
import { WalletTransaction } from '../types';

interface WalletViewProps {
  onOpenAddFunds: () => void;
  onOpenTracking: (id: string) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const WalletView: React.FC<WalletViewProps> = ({
  onOpenAddFunds,
  onOpenTracking,
  onShowToast,
}) => {
  const [showBalance, setShowBalance] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [transactions, setTransactions] = useState<WalletTransaction[]>(WALLET_TRANSACTIONS);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('5000000');

  const filteredTx = transactions.filter((t) => {
    if (filterType === 'all') return true;
    if (filterType === 'escrow' && t.type === 'escrow') return true;
    if (filterType === 'payouts' && t.type === 'payouts') return true;
    if (filterType === 'tolls' && t.type === 'tolls') return true;
    return false;
  });

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(withdrawAmount) || 1000000;
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      title: 'NIBSS Instant Bank Payout',
      subtitle: 'Providus Bank • Ref: NIBSS-PAY-09',
      timestamp: 'Just now • Instant Clearing',
      amountNaira: -val,
      type: 'payouts',
      status: 'Completed',
      isCredit: false,
    };
    setTransactions([newTx, ...transactions]);
    setIsWithdrawing(false);
    onShowToast(`Payout of ₦${val.toLocaleString()} routed to bank account`, 'check_circle');
  };

  return (
    <div className="flex flex-col w-full space-y-4 pb-12">
      {/* Header Context */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="font-['Plus_Jakarta_Sans'] text-[20px] font-bold text-[#dfe4e0]">
            Escrow Treasury Wallet
          </h2>
          <span className="text-[10px] font-mono text-[#00e676] bg-[#262b29] px-2 py-0.5 rounded flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse"></span>
            NIBSS SYNCED
          </span>
        </div>
        <p className="text-[12px] text-[#bacbb9]">
          CBN-compliant institutional escrow vault and automated weighbridge settlement.
        </p>
      </div>

      {/* Main Liquidity Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#181d1a] via-[#1c211e] to-[#0f1412] p-5 space-y-4 border border-[#262b29] shadow-2xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#00e676]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] uppercase tracking-wider text-[#bacbb9] font-medium">
                Total Available Liquidity
              </span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-[#859585] hover:text-[#dfe4e0]"
                title="Toggle Visibility"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {showBalance ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
            <div className="font-['Plus_Jakarta_Sans'] text-[32px] font-bold tracking-tight text-[#dfe4e0]">
              {showBalance ? '₦18,450,000.00' : '₦••••••••'}
            </div>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#262b29] text-[#75ff9e] text-[10px] font-mono">
            <span>TIER-3 ACCOUNT</span>
          </div>
        </div>

        {/* Sub-Ledgers Breakdown */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="p-3 bg-[#0a0f0d]/80 rounded-xl border border-[#262b29]">
            <div className="flex items-center gap-1.5 text-[10px] uppercase text-[#859585]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e676]"></span>
              <span>Locked in Escrow</span>
            </div>
            <span className="font-mono text-[15px] font-bold text-[#dfe4e0] mt-1 block">
              {showBalance ? '₦2,450,000.00' : '₦••••••••'}
            </span>
            <span className="text-[10px] text-[#4edea3]">1 active trade</span>
          </div>

          <div className="p-3 bg-[#0a0f0d]/80 rounded-xl border border-[#262b29]">
            <div className="flex items-center gap-1.5 text-[10px] uppercase text-[#859585]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
              <span>24h Haulage Settle</span>
            </div>
            <span className="font-mono text-[15px] font-bold text-[#dfe4e0] mt-1 block">
              {showBalance ? '₦8,120,000.00' : '₦••••••••'}
            </span>
            <span className="text-[10px] text-[#4edea3]">9 cleared</span>
          </div>
        </div>

        {/* 4 Action Buttons */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          <button
            onClick={onOpenAddFunds}
            className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#262b29] hover:bg-[#313633] text-[#dfe4e0] transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-[#00e676] text-[#00210b] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">add</span>
            </div>
            <span className="text-[11px] font-medium">Add Funds</span>
          </button>

          <button
            onClick={() => onShowToast('Escrow lock protocol active. Select batch from Trade.')}
            className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#262b29] hover:bg-[#313633] text-[#dfe4e0] transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-[#181d1a] text-[#75ff9e] flex items-center justify-center border border-[#3b4a3d]">
              <span className="material-symbols-outlined text-[18px]">lock</span>
            </div>
            <span className="text-[11px] font-medium">Lock Escrow</span>
          </button>

          <button
            onClick={() => setIsWithdrawing(true)}
            className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#262b29] hover:bg-[#313633] text-[#dfe4e0] transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-[#181d1a] text-[#4edea3] flex items-center justify-center border border-[#3b4a3d]">
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
            </div>
            <span className="text-[11px] font-medium">Withdraw</span>
          </button>

          <button
            onClick={() => onShowToast('AFEX FX Hedging desk: USD/NGN corridor locked', 'currency_exchange')}
            className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#262b29] hover:bg-[#313633] text-[#dfe4e0] transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-[#181d1a] text-[#bacbb9] flex items-center justify-center border border-[#3b4a3d]">
              <span className="material-symbols-outlined text-[18px]">currency_exchange</span>
            </div>
            <span className="text-[11px] font-medium">FX Hedge</span>
          </button>
        </div>
      </div>

      {/* Active Trade Escrow In-Vault Card */}
      <div className="rounded-xl bg-[#181d1a] p-4 space-y-3 border border-[#00e676]/30 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e676] text-[20px]">
              shield_with_heart
            </span>
            <span className="text-[12px] font-bold text-[#dfe4e0]">
              Active Escrow Custody (#ESC-8841)
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#00e676]/20 text-[#00e676] text-[10px] font-bold uppercase">
            IN VAULT
          </span>
        </div>

        <div className="bg-[#0a0f0d] p-3 rounded-lg border border-[#262b29] space-y-1.5 text-[11px]">
          <div className="flex justify-between">
            <span className="text-[#859585]">Allocated Cargo:</span>
            <span className="text-[#dfe4e0] font-semibold">30 MT Yellow Maize (Dawanau Hub)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#859585]">Held Collateral:</span>
            <span className="text-[#75ff9e] font-mono font-bold text-[13px]">₦37,500,000.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#859585]">Release Condition:</span>
            <span className="text-[#4edea3]">Electronic Weighbridge Scan & QA Clearance</span>
          </div>
        </div>

        <button
          onClick={() => onOpenTracking('ship-20481')}
          className="w-full py-2 rounded-lg bg-[#262b29] hover:bg-[#313633] text-[#75ff9e] text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">radar</span>
          <span>Track Shipment Telemetry</span>
        </button>
      </div>

      {/* Ledger Activity & Filters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#dfe4e0]">Ledger Activity</span>
          <button
            onClick={() => onShowToast('Exported audit CSV statement', 'download')}
            className="text-[11px] text-[#4edea3] hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">download</span>
            <span>Export CSV</span>
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'all', label: 'All Logs' },
            { id: 'escrow', label: 'Escrow Vault' },
            { id: 'payouts', label: 'Bank Payouts' },
            { id: 'tolls', label: 'Haulage & Tolls' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setFilterType(pill.id)}
              className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                filterType === pill.id
                  ? 'bg-[#00e676] text-[#00210b]'
                  : 'bg-[#181d1a] text-[#bacbb9] border border-[#262b29]'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Transaction Rows */}
        <div className="space-y-2">
          {filteredTx.map((tx) => (
            <div
              key={tx.id}
              className="p-3 bg-[#181d1a] rounded-xl border border-[#262b29] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    tx.isCredit
                      ? 'bg-[#00e676]/20 text-[#00e676]'
                      : 'bg-[#262b29] text-[#dfe4e0]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {tx.isCredit ? 'arrow_downward' : 'arrow_upward'}
                  </span>
                </div>
                <div>
                  <span className="text-[13px] font-bold text-[#dfe4e0] block">{tx.title}</span>
                  <span className="text-[11px] text-[#bacbb9] block">{tx.subtitle}</span>
                  <span className="text-[10px] text-[#859585] font-mono">{tx.timestamp}</span>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`font-mono text-[14px] font-bold block ${
                    tx.isCredit ? 'text-[#75ff9e]' : 'text-[#dfe4e0]'
                  }`}
                >
                  {tx.isCredit ? '+' : ''}₦{Math.abs(tx.amountNaira).toLocaleString()}
                </span>
                <span className="text-[10px] text-[#4edea3] uppercase font-semibold">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdraw Modal */}
      {isWithdrawing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center p-0">
          <div className="w-full max-w-md bg-[#1c211e] p-6 rounded-t-2xl flex flex-col gap-4 border-t border-[#3b4a3d] shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00e676] text-[22px]">
                  account_balance
                </span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] text-[#dfe4e0] font-bold">
                  Instant Interbank Payout (NIBSS)
                </h3>
              </div>
              <button
                onClick={() => setIsWithdrawing(false)}
                className="w-8 h-8 rounded-full bg-[#262b29] flex items-center justify-center text-[#bacbb9]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-3">
              <div className="p-3 bg-[#0a0f0d] rounded-lg border border-[#262b29] text-[12px] space-y-1">
                <div className="flex justify-between text-[#859585]">
                  <span>Target Account:</span>
                  <span className="text-[#dfe4e0] font-semibold">Stanbic IBTC (0039201948)</span>
                </div>
                <div className="flex justify-between text-[#859585]">
                  <span>Account Name:</span>
                  <span className="text-[#dfe4e0]">Yusuf Dawanau Agro Enterprises</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#859585] uppercase">Withdrawal Amount (₦)</label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full p-2.5 bg-[#0a0f0d] rounded-lg text-[#dfe4e0] font-mono text-[15px] border border-[#262b29] focus:border-[#00e676] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWithdrawing(false)}
                  className="py-2.5 rounded-lg bg-[#262b29] text-[#dfe4e0] font-semibold text-[13px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 rounded-lg bg-[#00e676] text-[#00210b] font-bold text-[13px] shadow-[0_0_12px_rgba(0,230,118,0.3)] hover:brightness-105 active:scale-95 transition-all"
                >
                  Confirm Instant Payout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
