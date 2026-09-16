import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ACTIVE_SHIPMENTS, COMMODITY_PRICES, WHOLESALE_HUBS } from '../data/mockData';
import { findNextCrossedBoundary, FreshnessState, getFreshness } from './freshness';

export interface DemoPrice {
  id: string;
  sourceType: 'benchmark' | 'wholesale-hub';
  source: string;
  name: string;
  location: string;
  value: number;
  unit: string;
  observedAt: number | null;
  receivedAt: number;
}

export interface DemoShipment {
  id: string;
  sourceType: 'gps';
  name: string;
  observedAt: number | null;
  receivedAt: number;
  sample: (typeof ACTIVE_SHIPMENTS)[number];
}

export interface TransitionEntry {
  id: number;
  at: number;
  summary: string;
}

interface DemoDataContextValue {
  now: number;
  speed: number;
  feedPaused: boolean;
  prices: DemoPrice[];
  shipments: DemoShipment[];
  history: TransitionEntry[];
  setSpeed: (speed: number) => void;
  pauseFeed: () => void;
  resumeFeed: () => void;
  pushPrice: (id: string, value: number) => boolean;
  demonstrateAging: () => void;
}

const DemoDataContext = createContext<DemoDataContextValue | null>(null);
export const AUTO_ARRIVAL_CADENCE_MS = 10 * 60_000;
const BOUNDARY_HOLD_REAL_MS = 1000;

export function refreshPriceObservations(records: readonly DemoPrice[], at: number): DemoPrice[] {
  return records.map((record) => ({ ...record, observedAt: at, receivedAt: at }));
}

export function updateOnePrice(
  records: readonly DemoPrice[],
  id: string,
  value: number,
  at: number,
): DemoPrice[] | null {
  if (!Number.isFinite(value) || value <= 0 || !records.some((record) => record.id === id)) return null;
  return records.map((record) =>
    record.id === id ? { ...record, value, observedAt: at, receivedAt: at } : record,
  );
}

function createInitialData(now: number) {
  const prices: DemoPrice[] = [
    ...COMMODITY_PRICES.map((price, index) => ({
      id: price.id,
      sourceType: 'benchmark' as const,
      source: 'Benchmark',
      name: price.name,
      location: price.location,
      value: price.pricePerKg,
      unit: price.unit,
      observedAt: now - (index + 2) * 60_000,
      receivedAt: now - (index + 2) * 60_000 + 2_000,
    })),
    ...WHOLESALE_HUBS.map((hub, index) => ({
      id: hub.id,
      sourceType: 'wholesale-hub' as const,
      source: 'Wholesale hub',
      name: hub.name,
      location: hub.state,
      value: hub.spotPrice,
      unit: '/kg',
      observedAt: now - (index + 5) * 60_000,
      receivedAt: now - (index + 5) * 60_000 + 3_000,
    })),
  ];
  const shipments: DemoShipment[] = ACTIVE_SHIPMENTS.map((sample, index) => ({
    id: sample.id,
    sourceType: 'gps',
    name: `${sample.trackingNumber} · ${sample.commodity}`,
    observedAt: now - index * 30_000,
    receivedAt: now - index * 30_000 + 1_000,
    sample,
  }));
  return { prices, shipments };
}

export const DemoDataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const initialNow = useRef(Date.now()).current;
  const initialData = useRef(createInitialData(initialNow)).current;
  const [now, setNow] = useState(initialNow);
  const [speed, setSpeedState] = useState(1);
  const [feedPaused, setFeedPaused] = useState(false);
  const [prices, setPrices] = useState(initialData.prices);
  const [shipments, setShipments] = useState(initialData.shipments);
  const [history, setHistory] = useState<TransitionEntry[]>([]);
  const stateRef = useRef({ now, speed, feedPaused, prices, shipments });
  const holdUntilRef = useRef(0);
  const backlogTargetRef = useRef<number | null>(null);
  const lastRealTimeRef = useRef(Date.now());
  const nextArrivalRef = useRef(now + AUTO_ARRIVAL_CADENCE_MS);
  const historyIdRef = useRef(0);

  useEffect(() => {
    stateRef.current = { now, speed, feedPaused, prices, shipments };
  }, [now, speed, feedPaused, prices, shipments]);

  const addHistory = useCallback((at: number, summary: string) => {
    setHistory((entries) => [{ id: ++historyIdRef.current, at, summary }, ...entries].slice(0, 12));
  }, []);

  const emitArrival = useCallback((at: number, reason: string) => {
    setPrices((records) => refreshPriceObservations(records, at));
    addHistory(at, `${reason}: refreshed all simulated price observations`);
    nextArrivalRef.current = at + AUTO_ARRIVAL_CADENCE_MS;
  }, [addHistory]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const realNow = Date.now();
      const elapsed = Math.max(0, realNow - lastRealTimeRef.current);
      lastRealTimeRef.current = realNow;
      const current = stateRef.current;
      if (realNow < holdUntilRef.current) return;

      const requestedTarget = backlogTargetRef.current ?? current.now + elapsed * current.speed;
      const records = [...current.prices, ...current.shipments];
      const boundary = findNextCrossedBoundary(current.now, requestedTarget, records);
      const nextNow = boundary ?? requestedTarget;
      backlogTargetRef.current = boundary ? requestedTarget : null;

      if (boundary) {
        const transitions = records.filter((record) => {
          const before = getFreshness(record.sourceType, record.observedAt, boundary - 1);
          return before !== getFreshness(record.sourceType, record.observedAt, boundary);
        });
        const nextState: FreshnessState | undefined = transitions[0]
          ? getFreshness(transitions[0].sourceType, transitions[0].observedAt, boundary)
          : undefined;
        addHistory(boundary, `${transitions.length} record${transitions.length === 1 ? '' : 's'} became ${nextState}`);
        holdUntilRef.current = realNow + BOUNDARY_HOLD_REAL_MS;
      }

      setNow(nextNow);
      if (!current.feedPaused && nextNow >= nextArrivalRef.current) emitArrival(nextNow, 'Automatic arrival');
    }, 200);
    return () => window.clearInterval(timer);
  }, [addHistory, emitArrival]);

  const setSpeed = useCallback((value: number) => {
    if (![1, 60, 600].includes(value)) return;
    backlogTargetRef.current = null;
    setSpeedState(value);
  }, []);

  const pauseFeed = useCallback(() => {
    setFeedPaused(true);
    addHistory(stateRef.current.now, 'Automatic arrivals paused; aging continues');
  }, [addHistory]);

  const resumeFeed = useCallback(() => {
    const at = stateRef.current.now;
    setFeedPaused(false);
    emitArrival(at, 'Feed resumed');
  }, [emitArrival]);

  const pushPrice = useCallback((id: string, value: number) => {
    const at = stateRef.current.now;
    const updated = updateOnePrice(stateRef.current.prices, id, value, at);
    if (!updated) return false;
    setPrices(updated);
    addHistory(at, `Manual update pushed to ${id}`);
    return true;
  }, [addHistory]);

  const demonstrateAging = useCallback(() => {
    const at = stateRef.current.now;
    setFeedPaused(true);
    setSpeedState(600);
    setPrices((records) => records.map((record) => ({ ...record, observedAt: at, receivedAt: at })));
    setShipments((records) => records.map((record) => ({ ...record, observedAt: at, receivedAt: at })));
    backlogTargetRef.current = null;
    addHistory(at, 'Samples reset; aging demonstration started at 600× with arrivals paused');
  }, [addHistory]);

  const value = useMemo(() => ({ now, speed, feedPaused, prices, shipments, history, setSpeed, pauseFeed, resumeFeed, pushPrice, demonstrateAging }),
    [now, speed, feedPaused, prices, shipments, history, setSpeed, pauseFeed, resumeFeed, pushPrice, demonstrateAging]);
  return <DemoDataContext.Provider value={value}>{children}</DemoDataContext.Provider>;
};

export function useDemoData(): DemoDataContextValue {
  const context = useContext(DemoDataContext);
  if (!context) throw new Error('useDemoData must be used inside DemoDataProvider');
  return context;
}
