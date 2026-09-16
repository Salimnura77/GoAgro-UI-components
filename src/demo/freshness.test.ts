import assert from 'node:assert/strict';
import test from 'node:test';
import { findNextCrossedBoundary, getFreshness, getFreshnessLabel, validatePriceInput } from './freshness';
import { DemoPrice, refreshPriceObservations, updateOnePrice } from './DemoDataProvider';

const minute = 60_000;

test('classifies exact benchmark boundaries', () => {
  assert.equal(getFreshness('benchmark', 0, 15 * minute - 1), 'fresh');
  assert.equal(getFreshness('benchmark', 0, 15 * minute), 'stale');
  assert.equal(getFreshness('benchmark', 0, 60 * minute - 1), 'stale');
  assert.equal(getFreshness('benchmark', 0, 60 * minute), 'outdated');
});

test('classifies exact wholesale hub and GPS boundaries', () => {
  assert.equal(getFreshness('wholesale-hub', 0, 30 * minute - 1), 'fresh');
  assert.equal(getFreshness('wholesale-hub', 0, 30 * minute), 'stale');
  assert.equal(getFreshness('wholesale-hub', 0, 120 * minute), 'outdated');
  assert.equal(getFreshness('gps', 0, 2 * minute - 1), 'fresh');
  assert.equal(getFreshness('gps', 0, 2 * minute), 'stale');
  assert.equal(getFreshness('gps', 0, 10 * minute), 'outdated');
});

test('treats missing, invalid, and future observation timestamps as unknown', () => {
  assert.equal(getFreshness('benchmark', null, minute), 'unknown');
  assert.equal(getFreshness('benchmark', Number.NaN, minute), 'unknown');
  assert.equal(getFreshness('benchmark', minute + 1, minute), 'unknown');
  assert.equal(getFreshnessLabel('benchmark', null, minute), 'Age unknown — Price unavailable');
});

test('returns crossed boundaries chronologically for mixed sources and ages', () => {
  const records = [
    { sourceType: 'benchmark' as const, observedAt: 0 },
    { sourceType: 'wholesale-hub' as const, observedAt: 5 * minute },
    { sourceType: 'gps' as const, observedAt: 14 * minute },
  ];
  assert.equal(findNextCrossedBoundary(0, 200 * minute, records), 15 * minute);
  assert.equal(findNextCrossedBoundary(15 * minute, 200 * minute, records), 16 * minute);
  assert.equal(findNextCrossedBoundary(16 * minute, 200 * minute, records), 24 * minute);
  assert.equal(findNextCrossedBoundary(24 * minute, 200 * minute, records), 35 * minute);
});

test('accelerated advancement cannot skip stale on the way to outdated', () => {
  const record = { sourceType: 'benchmark' as const, observedAt: 0 };
  const firstStop = findNextCrossedBoundary(0, 70 * minute, [record]);
  assert.equal(firstStop, 15 * minute);
  assert.equal(getFreshness(record.sourceType, record.observedAt, firstStop!), 'stale');
  const secondStop = findNextCrossedBoundary(firstStop!, 70 * minute, [record]);
  assert.equal(secondStop, 60 * minute);
  assert.equal(getFreshness(record.sourceType, record.observedAt, secondStop!), 'outdated');
});

test('validates manual update values', () => {
  assert.equal(validatePriceInput('1250.5'), 1250.5);
  for (const invalid of ['', ' ', '0', '-1', 'NaN', 'Infinity']) {
    assert.equal(validatePriceInput(invalid), null);
  }
});

const samplePrices: DemoPrice[] = [
  { id: 'one', sourceType: 'benchmark', source: 'Benchmark', name: 'One', location: 'A', value: 10, unit: '/kg', observedAt: 0, receivedAt: 1 },
  { id: 'two', sourceType: 'wholesale-hub', source: 'Wholesale hub', name: 'Two', location: 'B', value: 20, unit: '/kg', observedAt: 0, receivedAt: 1 },
];

test('paused records keep their observations while their clock age changes', () => {
  const pausedRecords = samplePrices;
  assert.equal(pausedRecords[0].observedAt, 0);
  assert.equal(getFreshness(pausedRecords[0].sourceType, pausedRecords[0].observedAt, 15 * minute), 'stale');
  assert.equal(pausedRecords[0].observedAt, 0);
});

test('resume arrival refreshes timestamps without reverting values', () => {
  const manuallyUpdated = updateOnePrice(samplePrices, 'one', 99, 5 * minute)!;
  const resumed = refreshPriceObservations(manuallyUpdated, 10 * minute);
  assert.equal(resumed[0].value, 99);
  assert.equal(resumed[0].observedAt, 10 * minute);
  assert.equal(resumed[1].value, 20);
});

test('manual update changes exactly one record and rejects invalid input', () => {
  const updated = updateOnePrice(samplePrices, 'two', 42, minute)!;
  assert.deepEqual(updated[0], samplePrices[0]);
  assert.equal(updated[1].value, 42);
  assert.equal(updated[1].observedAt, minute);
  assert.equal(updateOnePrice(samplePrices, 'missing', 42, minute), null);
  assert.equal(updateOnePrice(samplePrices, 'one', 0, minute), null);
});
