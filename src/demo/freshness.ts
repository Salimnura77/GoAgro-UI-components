export type DataSourceType = 'benchmark' | 'wholesale-hub' | 'gps';
export type FreshnessState = 'fresh' | 'stale' | 'outdated' | 'unknown';

export const FRESHNESS_THRESHOLDS_MS: Record<
  DataSourceType,
  { stale: number; outdated: number }
> = {
  benchmark: { stale: 15 * 60_000, outdated: 60 * 60_000 },
  'wholesale-hub': { stale: 30 * 60_000, outdated: 120 * 60_000 },
  gps: { stale: 2 * 60_000, outdated: 10 * 60_000 },
};

export interface TimestampedRecord {
  sourceType: DataSourceType;
  observedAt: number | null;
}

export function getAgeMs(now: number, observedAt: number | null): number | null {
  if (!Number.isFinite(now) || observedAt === null || !Number.isFinite(observedAt) || observedAt > now) {
    return null;
  }
  return now - observedAt;
}

export function getFreshness(
  sourceType: DataSourceType,
  observedAt: number | null,
  now: number,
): FreshnessState {
  const age = getAgeMs(now, observedAt);
  if (age === null) return 'unknown';
  const thresholds = FRESHNESS_THRESHOLDS_MS[sourceType];
  if (age < thresholds.stale) return 'fresh';
  if (age < thresholds.outdated) return 'stale';
  return 'outdated';
}

export function formatAge(ageMs: number | null): string {
  if (ageMs === null) return 'unknown';
  if (ageMs < 60_000) return `${Math.floor(ageMs / 1000)}s`;
  if (ageMs < 60 * 60_000) return `${Math.floor(ageMs / 60_000)}m`;
  return `${Math.floor(ageMs / (60 * 60_000))}h`;
}

export function getFreshnessLabel(
  sourceType: DataSourceType,
  observedAt: number | null,
  now: number,
): string {
  const age = getAgeMs(now, observedAt);
  const formattedAge = formatAge(age);
  switch (getFreshness(sourceType, observedAt, now)) {
    case 'fresh':
      return `Fresh · ${formattedAge} ago`;
    case 'stale':
      return `Stale · ${formattedAge} ago — Confirm before trading`;
    case 'outdated':
      return `Outdated · ${formattedAge} ago — Price unavailable`;
    default:
      return 'Age unknown — Price unavailable';
  }
}

export function findNextCrossedBoundary(
  now: number,
  target: number,
  records: readonly TimestampedRecord[],
): number | null {
  let next: number | null = null;
  for (const record of records) {
    if (record.observedAt === null || !Number.isFinite(record.observedAt)) continue;
    const thresholds = FRESHNESS_THRESHOLDS_MS[record.sourceType];
    for (const threshold of [thresholds.stale, thresholds.outdated]) {
      const boundary = record.observedAt + threshold;
      if (boundary > now && boundary <= target && (next === null || boundary < next)) next = boundary;
    }
  }
  return next;
}

export function validatePriceInput(value: string): number | null {
  if (value.trim() === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}
