# Production data integration gaps

The current product is a UI prototype. Values in `src/data/mockData.ts` and claims shown in the UI must **not** be treated as operational, verified, or current data.

The server exposes `GET /api/readiness` to list missing integration configuration without returning credential values. It deliberately does not implement simulated financial or verification APIs.

## Inputs required from the team

| Area | Real source needed | Required configuration | Must be verified before production |
| --- | --- | --- | --- |
| Market data | Contracted exchange, market operator, or verified trade feed | `MARKET_DATA_BASE_URL`, `MARKET_DATA_API_KEY` | Quote provenance, timestamps, units, confidence, and redistribution rights |
| Payments and escrow | Licensed payment/escrow provider with NIBSS connectivity | `PAYMENTS_BASE_URL`, `PAYMENTS_API_KEY`, `PAYMENTS_WEBHOOK_SECRET` | Account ownership, idempotency rules, signed webhooks, settlement state machine, reconciliation, and regulatory approval |
| Fleet telematics | Fleet GPS and cargo-sensor provider | `TELEMATICS_BASE_URL`, `TELEMATICS_API_KEY` | Device identity, freshness/SLA, coordinate accuracy, offline behavior, and consent/retention policy |
| Quality assurance | Accredited lab and NASC/SON certificate registry/provider | `QA_BASE_URL`, `QA_API_KEY` | Certificate authenticity, lab accreditation, sample chain of custody, units, and expiry |
| Cargo insurance | Bound insurer/broker API | `INSURANCE_BASE_URL`, `INSURANCE_API_KEY` | Policy status, coverage limits/exclusions, insured party, cargo identity, and claims workflow |

## UI data that remains illustrative

- Wallet balances, transactions, virtual account details, and all NIBSS/escrow success messages.
- Commodity prices, market changes, liquidity, trade counts, and arbitrage returns.
- Shipment positions, telemetry, ETAs, seal numbers, and waybill milestones.
- Laboratory values, certificate identifiers, seller verification, insurance policies, and coverage amounts.
- Named companies, banks, regulators, markets, people, and compliance claims.

Before connecting any provider, agree on canonical identifiers, money representation (integer minor units), event timestamps/time zones, idempotency keys, authentication, audit retention, and failure/retry behavior. Financial commands should only report success after a provider-confirmed, persisted state transition; browser timers must never represent transaction completion.
