import React, { useEffect, useRef, useState } from 'react';
import { TabType, SubViewType, TradeLot, HaulageShipment } from './types';
import { TRADE_LOTS, ACTIVE_SHIPMENTS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';

// Views
import { HomeView } from './views/HomeView';
import { MarketView } from './views/MarketView';
import { TradeView } from './views/TradeView';
import { LogisticsView } from './views/LogisticsView';
import { WalletView } from './views/WalletView';
import { ArbitrageView } from './views/ArbitrageView';
import { TrackingView } from './views/TrackingView';
import { CommodityDetailView } from './views/CommodityDetailView';
import { InsightsView } from './views/InsightsView';

// Modals
import { CounterOfferModal } from './components/Modals/CounterOfferModal';
import { EscrowCheckoutModal } from './components/Modals/EscrowCheckoutModal';
import { WaybillSealModal } from './components/Modals/WaybillSealModal';
import { HaulageBookingModal } from './components/Modals/HaulageBookingModal';
import { AddFundsModal } from './components/Modals/AddFundsModal';
import { ListProduceModal } from './components/Modals/ListProduceModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [subView, setSubView] = useState<SubViewType>('none');
  const [selectedLot, setSelectedLot] = useState<TradeLot>(TRADE_LOTS[0]);
  const [trackingShipmentId, setTrackingShipmentId] = useState<string>('ship-20481');

  // Modals state
  const [activeWaybillShipment, setActiveWaybillShipment] = useState<HaulageShipment | null>(null);
  const [counterOfferLot, setCounterOfferLot] = useState<TradeLot | null>(null);
  const [escrowCheckoutLot, setEscrowCheckoutLot] = useState<{ lot: TradeLot; volumeMt: number } | null>(null);
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [isListProduceOpen, setIsListProduceOpen] = useState(false);
  const [isHaulageBookingOpen, setIsHaulageBookingOpen] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState<string>('check_circle');
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const showToast = (msg: string, icon = 'check_circle') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    setToastIcon(icon);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimeoutRef.current = null;
    }, 3200);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSubView('none');
  };

  const handleBack = () => {
    if (subView !== 'none') {
      setSubView('none');
    }
  };

  const getHeaderTitle = () => {
    if (subView === 'arbitrage-engine') return 'Route Engine';
    if (subView === 'haulage-tracking') return 'Live Haulage';
    if (subView === 'commodity-detail') return 'Lot Specifications';
    if (subView === 'insights') return 'GoAgro Insights';

    switch (activeTab) {
      case 'home':
        return 'AgriGo';
      case 'market':
        return 'Market Terminal';
      case 'trade':
        return 'Trade Exchange';
      case 'logistics':
        return 'Transit Control';
      case 'wallet':
        return 'Escrow Treasury';
      default:
        return 'AgriGo';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-[#dfe4e0] font-sans select-none antialiased flex flex-col justify-between">
      {/* Dynamic Header */}
      <Header
        title={getHeaderTitle()}
        showBack={subView !== 'none'}
        onBack={handleBack}
        onProfileClick={() => showToast('Trader Profile: Yusuf Dawanau (Tier-3 Verified)', 'verified')}
        onNotificationClick={() => showToast('2 Unread Alerts: Rate change on Dawanau Maize', 'notifications')}
        onInsightsClick={() => setSubView('insights')}
      />

      {/* Main Content Area */}
      <main className="max-w-md mx-auto w-full pt-20 pb-20 px-4 min-h-[calc(100vh-80px)] flex flex-col flex-1">
        {/* Render SubView or Tab */}
        {subView === 'arbitrage-engine' ? (
          <ArbitrageView
            onBack={() => setSubView('none')}
            onBookTruck={() => setIsHaulageBookingOpen(true)}
            onShowToast={showToast}
          />
        ) : subView === 'haulage-tracking' ? (
          <TrackingView
            shipmentId={trackingShipmentId}
            onBack={() => setSubView('none')}
            onInspectSeal={(shipment) => setActiveWaybillShipment(shipment)}
            onShowToast={showToast}
          />
        ) : subView === 'commodity-detail' ? (
          <CommodityDetailView
            lot={selectedLot}
            onBack={() => setSubView('none')}
            onInstantBuy={(lot, volumeMt) => setEscrowCheckoutLot({ lot, volumeMt })}
            onCounterOffer={(lot) => setCounterOfferLot(lot)}
            onOpenArbitrage={() => setSubView('arbitrage-engine')}
            onShowToast={showToast}
          />
        ) : subView === 'insights' ? (
          <InsightsView
            onBack={() => setSubView('none')}
            onOpenArbitrage={() => setSubView('arbitrage-engine')}
            onShowToast={showToast}
          />
        ) : (
          /* Normal Tab Navigation */
          <>
            {activeTab === 'home' && (
              <HomeView
                onOpenArbitrage={() => setSubView('arbitrage-engine')}
                onOpenTracking={(id) => {
                  if (id) setTrackingShipmentId(id);
                  setSubView('haulage-tracking');
                }}
                onOpenTrade={() => setActiveTab('trade')}
                onSelectLot={(lot) => {
                  setSelectedLot(lot);
                  setSubView('commodity-detail');
                }}
                onInstantBuy={(lot) => setEscrowCheckoutLot({ lot, volumeMt: 30 })}
                onOpenAddFunds={() => setIsAddFundsOpen(true)}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'market' && (
              <MarketView
                onOpenArbitrage={() => setSubView('arbitrage-engine')}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'trade' && (
              <TradeView
                onSelectLot={(lot) => {
                  setSelectedLot(lot);
                  setSubView('commodity-detail');
                }}
                onInstantBuy={(lot) => setEscrowCheckoutLot({ lot, volumeMt: 30 })}
                onCounterOffer={(lot) => setCounterOfferLot(lot)}
                onOpenListProduce={() => setIsListProduceOpen(true)}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'logistics' && (
              <LogisticsView
                onOpenTracking={(id) => {
                  setTrackingShipmentId(id);
                  setSubView('haulage-tracking');
                }}
                onInspectSeal={(shipment) => setActiveWaybillShipment(shipment)}
                onBookHaulage={() => setIsHaulageBookingOpen(true)}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'wallet' && (
              <WalletView
                onOpenAddFunds={() => setIsAddFundsOpen(true)}
                onOpenTracking={(id) => {
                  setTrackingShipmentId(id);
                  setSubView('haulage-tracking');
                }}
                onShowToast={showToast}
              />
            )}
          </>
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} icon={toastIcon} />

      {/* MODALS */}
      <CounterOfferModal
        isOpen={!!counterOfferLot}
        onClose={() => setCounterOfferLot(null)}
        commodityTitle={counterOfferLot?.title || ''}
        currentPrice={`₦${counterOfferLot?.pricePerKg.toLocaleString()} / kg`}
        onSubmit={(price, qty) => {
          showToast(`Counter-offer submitted: ₦${price}/kg for ${qty} MT`, 'mark_chat_read');
        }}
      />

      {escrowCheckoutLot && (
        <EscrowCheckoutModal
          isOpen={!!escrowCheckoutLot}
          onClose={() => setEscrowCheckoutLot(null)}
          lotCode={escrowCheckoutLot.lot.lotCode}
          commodityName={escrowCheckoutLot.lot.title}
          volumeMt={escrowCheckoutLot.volumeMt}
          totalNaira={`₦${(
            (escrowCheckoutLot.volumeMt * 1000 * escrowCheckoutLot.lot.pricePerKg) /
            1000000
          ).toFixed(2)}M`}
          onConfirm={() => {
            showToast('Escrow transfer locked in vault! Haulage dispatch notified.', 'verified_user');
          }}
        />
      )}

      {activeWaybillShipment && (
        <WaybillSealModal
          isOpen={!!activeWaybillShipment}
          onClose={() => setActiveWaybillShipment(null)}
          shipment={activeWaybillShipment}
        />
      )}

      <HaulageBookingModal
        isOpen={isHaulageBookingOpen}
        onClose={() => setIsHaulageBookingOpen(false)}
        onSubmit={(details) => {
          showToast(
            `Truck locked: ${details.tonnes}MT from ${details.pickup.split(',')[0]} to ${details.destination.split(' ')[0]}`,
            'local_shipping'
          );
        }}
      />

      <AddFundsModal
        isOpen={isAddFundsOpen}
        onClose={() => setIsAddFundsOpen(false)}
        onFundsAdded={(amount) => {
          showToast(`Direct credit of ₦${amount.toLocaleString()} received via NIBSS!`, 'account_balance');
        }}
      />

      <ListProduceModal
        isOpen={isListProduceOpen}
        onClose={() => setIsListProduceOpen(false)}
        onSubmit={(data) => {
          showToast(
            `Batch listed: ${data.volumeMt}MT of ${data.name} @ ₦${data.pricePerKg}/kg`,
            'storefront'
          );
        }}
      />
    </div>
  );
}
