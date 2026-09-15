export type TabType = 'home' | 'market' | 'trade' | 'logistics' | 'wallet';

export type SubViewType = 
  | 'none'
  | 'arbitrage-engine' 
  | 'haulage-tracking'
  | 'commodity-detail'
  | 'insights'
  | 'hubs-map';

export interface CommodityPrice {
  id: string;
  name: string;
  location: string;
  pricePerKg: number;
  unit: string;
  changePct: number;
  isPositive: boolean;
  timeAgo: string;
}

export interface TradeLot {
  id: string;
  title: string;
  lotCode: string;
  location: string;
  pricePerKg: number;
  pricePerMt: number;
  volumeMt: number;
  minOrderMt: number;
  availableMt: number;
  image: string;
  statusBadge: string;
  gradeBadge: string;
  sellerName: string;
  sellerRating: number;
  sellerTrades: number;
  sellerType: string;
  specs: {
    moisture?: string;
    aflatoxin?: string;
    purity?: string;
    foreignMatter?: string;
    oilContent?: string;
    sorting?: string;
    discoloration?: string;
    season?: string;
    botanicalSpec?: string;
    depotBay?: string;
  };
}

export interface HaulageShipment {
  id: string;
  trackingNumber: string;
  commodity: string;
  volume: string;
  status: 'IN TRANSIT' | 'WEIGHBRIDGE' | 'READY TO ROLL';
  origin: string;
  destination: string;
  distanceRemainingKm: number;
  eta: string;
  progressPct: number;
  speedKmh: number;
  heading: string;
  siloTempCelsius: number;
  driverName: string;
  driverRating: number;
  driverCompletedRuns: number;
  vehiclePlate: string;
  vehicleModel: string;
  driverPhone: string;
  insurancePolicy: string;
  cargoValueProtectedNaira: number;
  waypointCurrent: string;
  sealNumber: string;
  milestones: {
    title: string;
    time: string;
    description: string;
    status: 'completed' | 'current' | 'upcoming';
  }[];
}

export interface WholesaleHub {
  id: string;
  name: string;
  state: string;
  spotPrice: number;
  change24hPct: number;
  liquidityMt: number;
  orderFillRatePct: number;
  haulageReadinessTrucks: number;
  tradesToday: number;
  volumeNaira: string;
  topCorridorDestination: string;
  grossSpreadNaira: number;
  netProfitEstNaira: string;
  coordinates: { x: number; y: number };
}

export interface WalletTransaction {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
  amountNaira: number;
  type: 'payouts' | 'tolls' | 'escrow';
  status: 'Completed' | 'Dispatched' | 'In Vault' | 'Cleared';
  isCredit: boolean;
}

export interface Article {
  id: string;
  category: string;
  title: string;
  snippet: string;
  author: string;
  authorRole: string;
  authorInitials: string;
  readTime: string;
  timeAgo: string;
  image: string;
  spotSpread?: string;
  corridorVol?: string;
  supplyRisk?: string;
}
