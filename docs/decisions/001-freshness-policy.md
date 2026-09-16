# Decision 001: Price and shipment freshness

Date: 2026-09-16  
Task: NYCT-001  
Status: Decision recorded for sprint implementation; thresholds are initial product risk limits, not measured supplier guarantees.  
Scope: Benchmark spot quotes, wholesale hub spot prices, shipment GPS samples, and treatment of trade listings across GoAgro.

## 1. Decision and evidence

Show the observation age wherever a covered value appears. Mark stale values; remove outdated values from current decision surfaces. The Route Engine **notifies and holds** a displayed comparison when a fresh price changes it. A user must explicitly recalculate before acting on the replacement comparison.

The supplied [PRD](../../src/agrigo_goagro_comprehensive_prd_project_brief.md), modules 1–6 and its Data Integrity Rule, establishes price discovery, spread comparisons, dispatch and tracking as decision surfaces. This note supplies the missing numeric boundaries; the PRD does not establish these limits.

Repository inspection shows presentation data in `src/data/mockData.ts`: `CommodityPrice` has a display string `timeAgo`, while `WholesaleHub` and `HaulageShipment` lack observation timestamps in `src/types.ts`. `ArbitrageView.tsx` contains a fixed origin price and simulated recalculation. These are not proof of live feeds. The Blacksmith site could not be inspected from this session; this decision is grounded in the task, supplied PRD and repository, not a claim about deployed behavior.

## 2. Clock and boundary contract

Age = evaluation time minus the source observation timestamp: the instant the price was observed or the GPS fix was sampled. Use elapsed wall-clock time, including nights, weekends and disconnected periods. Receipt, cache write, page load and successful polling times must never reset age. A re-observation of an unchanged price may reset age only when the source actually confirms it at a new observation time.

Evaluate with a trusted server clock, advancing elapsed time on the client between synchronizations. Reevaluate on foreground/resume and before any consequential action. Classify using unrounded elapsed time; change state at the exact boundary. Out-of-order samples must not replace a newer accepted observation.

| Source | Fresh | Stale | Outdated |
| --- | --- | --- | --- |
| Benchmark spot quotes | 0 ≤ age < 15 minutes | 15 ≤ age < 60 minutes | age ≥ 60 minutes |
| Wholesale hub spot prices | 0 ≤ age < 30 minutes | 30 ≤ age < 120 minutes | age ≥ 120 minutes |
| Shipment GPS samples | 0 ≤ age < 2 minutes | 2 ≤ age < 10 minutes | age ≥ 10 minutes |

A fresh state describes age alone: it does not guarantee execution price, available stock, GPS accuracy or verified provenance. Never convert “Fresh” into “Verified” or “Guaranteed”.

### Why these limits protect traders

- **Benchmark: 15 minutes.** Benchmarks anchor bids across markets. After 15 minutes without an observation, a trader needs an explicit warning before treating that anchor as a buying price; a small per-kilogram error multiplies across a truckload.
- **Benchmark: 60 minutes.** At one hour, an unobserved benchmark must not support a current margin claim. Mixing that leg with a newly observed selling price can manufacture a profitable spread and trigger an uneconomic purchase.
- **Wholesale hub: 30 minutes.** A local physical-market quote is indicative of a hub, grade and unit, rather than a continuously executable offer. We permit 30 minutes of unmarked age risk, then warn because competing buyers or depleted stock can change the obtainable price. This longer window is an explicit product assumption to challenge with hub observations.
- **Wholesale hub: 120 minutes.** After two hours, the hub quote cannot support dispatch or destination ranking: the trader may pay haulage for demand or supply that has already moved. Keep it only as dated history.
- **GPS: 2 minutes.** At an illustrative 60 km/h, a truck can move 2 km in two minutes. Beyond that point a position must visibly become a last-known fix so the trader does not coordinate loading, interception or arrival around a false position.
- **GPS: 10 minutes.** At that same illustrative speed, uncertainty spans 10 km. A precise current marker or ETA can conceal a detour or missed checkpoint; withdraw those claims and prompt contact with the driver.

These are risk-budget choices, not consequences of polling schedules or storage costs. Feed delivery below these standards must produce degraded states, not wider thresholds.

## 3. Exact presentation contract

Use the text below verbatim, substituting only brace-delimited values. State text must be visible beside the value, including on mobile; color or a tooltip alone is insufficient.

`{age}` is completed elapsed minutes below 60 minutes (for example, `4 min`); below one minute use `<1 min`; at 60 minutes and above use completed hours and remaining completed minutes (for example, `1 h 5 min`). Classification never uses the rounded display age.

Every dated observation also exposes `Observed at {YYYY-MM-DD HH:mm:ss WAT}` in details. WAT means UTC+01:00; date and timezone must be explicit.

| Source/state | What remains visible | Exact label |
| --- | --- | --- |
| Benchmark or hub / Fresh | Numeric price and unit, marked with age | `Fresh · {age} ago` |
| Benchmark or hub / Stale | Last observed price and unit, visibly warning-marked; remove live animation | `Stale · {age} ago — Confirm before trading` |
| Benchmark or hub / Outdated | Replace current price and price-derived delta with an em dash; preserve source and age | `Outdated · {age} ago — Price unavailable` |
| GPS / Fresh | Sampled marker; sampled speed, GPS-derived ETA, progress bar/percentage (`progressPct`) and distance remaining (`distanceRemainingKm`) may be shown only when backed by the timestamped sample, with age | `Fresh · {age} ago` |
| GPS / Stale | Freeze and visually dim last-known marker, progress bar/percentage and distance remaining at the last timestamped sample; stop motion and progress animation; replace current speed and GPS-derived ETA with an em dash | `Stale · {age} ago — Last known location` |
| GPS / Outdated | Hide marker and progress bar from the current tracking layer; replace GPS-derived position, speed, ETA, progress percentage and distance remaining with an em dash | `Outdated · {age} ago — Location unavailable; contact driver` |

For the progress bar/percentage and distance remaining, use these exact adjacent labels: fresh: `Fresh · {age} ago`; stale: `Stale · {age} ago — Last known progress and distance`; outdated: `Outdated · {age} ago — Progress and distance unavailable; contact driver`. These supplement the location labels where the metrics appear separately. Progress and distance must derive from the same timestamped GPS sample and route; neither may advance, count down or animate based on elapsed time, even within the fresh window. If a metric cannot be traced to that sample, suppress its bar/value and use `Age unknown — Progress and distance unavailable; contact driver`. A zero-percent or empty bar must not stand in for unavailable progress. This prevents a trader from arranging unloading or assuming a checkpoint has been passed on the basis of movement the app has not observed.

At the fresh-to-stale boundary, apply the stale row immediately without waiting for another response. At the stale-to-outdated boundary, apply the replacement/hiding rule immediately. A valid fresh observation restores the fresh presentation, except that an open Route Engine comparison follows section 5.

Outdated observations may remain in an explicitly opened history panel labelled `Historical observation — Not for trading` or `Historical location — Not current position`, with the absolute observation time. Do not erase actual shipment milestones or completed transaction records because a feed has aged. Do not extrapolate a truck position across missing samples.

These rules apply to dashboard cards, market tables, hub maps, commodity detail, tracking summaries and full tracking views. Closed historical candles retain their period timestamps; a current-price overlay follows this policy and must not be filled forward to imply new observations.

## 4. Missing timestamps and derived values

A price or GPS sample with no source timestamp, an unparseable timestamp or a timestamp later than the trusted evaluation time has **unknown age**. Do not invent a time from receipt or parse a fixed “minutes ago” display string as observation evidence.

- Price: replace the current number with an em dash and show `Age unknown — Price unavailable`.
- GPS: hide the current marker and progress bar; replace GPS-derived speed, ETA, progress percentage and distance remaining with an em dash. Show `Age unknown — Location unavailable; contact driver` for location and `Age unknown — Progress and distance unavailable; contact driver` beside progress/distance placeholders.
- Unknown-age values have the same calculation and action restrictions as outdated values. Raw records may be inspected as history with `Observation time unavailable`.
- Static fixtures must be labelled `Demo data — Not for trading` and cannot qualify for a fresh state by assigning the current time on page load.

For spreads, profits, landed-cost estimates and route ranks, evaluate every price input by its own source threshold. A new destination price does not refresh the origin leg. Fresh calculations require all price legs to be fresh; show each input's source, unit, grade and observation time.

If any price leg is stale, retain an existing estimate only with `Stale inputs — Confirm prices before trading`; remove “best route” promotion and disable booking/purchase actions based on it. If any leg is outdated or unknown-age, replace the current derived number and ranking with an em dash and show `Comparison unavailable — Price update required`. Do not silently substitute a benchmark for a hub quote. Other unverified cost assumptions must remain identified as estimates; fresh prices alone do not certify the net margin.

## 5. Route Engine: notify and hold

**Chosen option:** notify-and-hold for an already displayed comparison. When an accepted fresh price changes any displayed comparison amount, profit sign or route ordering, keep the displayed numeric snapshot and ordering until the user selects `Recalculate comparison`. Background calculation may detect the change but must not silently publish it.

Show a persistent banner:

> Prices changed — Comparison held. Recalculate before booking.

Mark the snapshot `Held comparison · Calculated at {YYYY-MM-DD HH:mm:ss WAT}`. Show the input observation times separately: calculation time is not observation time. Disable booking from the held comparison while an update is pending.

On `Recalculate comparison`, reevaluate input ages and replace the entire comparison atomically using a consistent set of eligible prices. All price inputs must be fresh. Then show `Comparison updated — Review before booking` and require a separate booking action. Never let recalculation itself book a truck or accept a trade. If inputs are not eligible, keep the degraded-state labels from section 4 and leave booking disabled.

Additional arrivals update the pending candidate, not the visible amounts. Before booking, recheck the input versions and ages against the reviewed comparison; a change returns to the held state. An identical price with a new valid observation time may update its age without a banner if no comparison output changes.

**Holding does not freeze freshness.** The displayed snapshot's original inputs continue to age. Apply stale labels when they cross their stale limits, and replace amounts when they cross outdated limits. Retain the update banner and recalculation control. The user cannot keep an invalid number actionable by ignoring a notification.

**Rejected option:** automatically recalculate and reorder the open view whenever a fresh price changes the comparison. A trader could be reading one margin or selecting one destination while the interface replaces it with another. That disconnect makes the action differ from the comparison the trader understood.

**Reversal condition:** switch to automatic recalculation only when booking is bound to an immutable comparison version and a mandatory confirmation screen shows the exact prices, margin and destination being accepted, with usability validation demonstrating that traders recognize changed comparisons before committing. This removes the specific risk of silently changing the basis of consent. Record that evidence and supersede this decision before changing behavior.

## 6. Trade listing prices

Listing prices are **exempt from the spot freshness thresholds** because they are seller asking prices for a specific lot, not observations of the market-clearing price. Age alone cannot establish whether the seller still offers that quantity at that amount.

Every listing price must display `Seller asking price — Confirm price and availability`. Where an actual listing update time exists, show `Listing updated at {YYYY-MM-DD HH:mm:ss WAT}`; otherwise show `Listing update time unavailable`. Never badge listings “Fresh” or “Live”, treat a listing edit as spot verification, or use an unconfirmed asking price as a fresh Route Engine input.

Require seller confirmation of price, quantity and availability before purchase commitment. A listing-based calculator must show `Estimate based on seller asking price`; the estimate is not an executable offer. Agreed order prices remain contractual records, not aging market quotes. This exemption prevents a time badge from falsely suggesting that an old asking price is executable or that a newly posted ask represents the whole market.

## 7. Review checks and change control

| Check | Required outcome |
| --- | --- |
| Benchmark at 14:59 / 15:00 / 60:00 elapsed | Fresh / Stale / Outdated |
| Hub at 29:59 / 30:00 / 120:00 elapsed | Fresh / Stale / Outdated |
| GPS at 1:59 / 2:00 / 10:00 elapsed | Fresh / Stale / Outdated; progress and distance follow the same boundaries |
| GPS feed silent for 6 minutes | Marker, progress bar/percentage and distance freeze and dim; progress/distance label is `Stale · 6 min ago — Last known progress and distance`; speed and ETA are em dashes |
| GPS sample reaches 10 minutes | Hide progress bar; progress percentage and distance are em dashes with `Outdated · 10 min ago — Progress and distance unavailable; contact driver` |
| Progress/distance lack a supporting timestamped sample | No progress bar; numeric placeholders are em dashes with `Age unknown — Progress and distance unavailable; contact driver` |
| Fresh GPS sample arrives after a gap | Restore only metrics backed by that sample, including progress/distance and their fresh labels; no elapsed-time extrapolation |
| Fresh sell leg, outdated buy leg | No current spread or route ranking; comparison unavailable |
| Timestamp absent or in the future | Unknown-age label; no current decision value |
| Fresh arrival changes ranking while trader reads | Persistent held banner; unchanged order; booking disabled |
| Held input ages past its outdated boundary | Amount replaced even if banner is ignored |
| Seller listing has no update timestamp | Asking-price warning plus listing-time-unavailable label; confirmation required |

The PM owns threshold changes with trader-risk evidence from observed price revisions, spread reversals and GPS gaps. Engineering and design must use this note's single boundary and label contract. Tighten limits if recorded losses or near misses occur within the fresh window. Widen limits only with evidence addressing the affected trader risk, not to improve a freshness metric. Record changed limits, evidence and rationale in a superseding decision.

This task records policy only. Implementing timestamps, labels, timers, calculation gates and booking protections belongs to the dependent sprint tasks.
