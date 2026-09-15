# Product Requirements Document (PRD) & Executive Project Brief
## Product Name: **AgriGo (GoAgro)**
### Tagline: *Trade smarter. Move better.*
**Platform**: Cross-Platform Mobile Application (iOS / Android) & Progressive Web App  
**Target Market**: Nigeria & Pan-African Agricultural Trade Corridors  
**Document Version**: 1.0 (Production Blueprint)

---

## 1. Executive Summary

### 1.1 The Vision
AgriGo (GoAgro) is Nigeria’s first institutional-grade, data-driven agricultural commerce infrastructure. It bridges the critical divide between upstream farm-gate aggregation and downstream industrial consumer terminals (feed millers, food processors, breweries, and maritime export terminals).

Rather than operating as a simplistic consumer marketplace or rustic farming app, AgriGo operates as the convergence of:
1. **Financial Terminal (Bloomberg for African Ag)**: Real-time physical spot prices, verified laboratory assays, and OHLC candlestick commodity price discovery across 36 states.
2. **Dynamic Arbitrage Engine ("Where Should I Sell?")**: Instant multi-market net realization models factoring in diesel tariffs, haulage rates, transit tolls, and union offloading dues.
3. **Institutional Escrow Banking Rail (Stripe for Bulk Trade)**: NIBSS-integrated custody wallets with automated escrow releases governed by tamper-evident digital weighbridge tickets and moisture certifications.
4. **Telemetric Freight & Fleet Network (Uber Freight + Telematics)**: GPS-tracked bulk grain haulage with Goods-In-Transit (GIT) cargo protection underwritten by Leadway Assurance.
5. **Editorial Intelligence & Macro Research (GoAgro Insights)**: In-depth macroeconomic analysis and corridor liquidity indices for institutional traders and risk analysts.

---

## 2. Problem Statement & Market Context

### 2.1 Key Market Inefficiencies in Nigeria's Ag Trade
1. **Severe Price Asymmetry & Arbitrage Blindness**: Upstream grain aggregators in Dawanau (Kano) or Gboko (Benue) lack real-time transparent spot prices across high-demand coastal consumption hubs (Lagos Mile 12/Ketu, Bodija Ibadan, Trans-Amadi Port Harcourt). Traders lose up to 35% margin to opportunistic middlemen.
2. **Payment Insecurity & Counterparty Default**: Agricultural commerce in Nigeria heavily relies on unsecured credit or cash-in-transit, creating massive payment default risks between distant counterparties.
3. **Logistics Friction & Roadway Cargo Risk**: Long-haul interstate agricultural transit along the A2 trunk arterial corridor faces cargo pilferage, unauthorized detours, moisture spoilage, and arbitrary interstate transit levies.
4. **Lack of Verified Quality Standards**: Disputed grain quality (aflatoxin levels, moisture content exceeding safe storage thresholds of 13%, and foreign matter) leads to shipment rejections at port/factory gates.

---

## 3. Product Architecture & User Personas

### 3.1 Core User Personas
* **The Commercial Aggregator / Trader (e.g., Yusuf in Kano)**: Aggregates 30–100 MT lots from local grain producers; needs instant price discovery, margin calculation, verified haulage, and swift escrow liquidation.
* **The Institutional Industrial Buyer (e.g., Poultry Feed Millers in Ogun/Oyo)**: Buys yellow maize and soybeans in 500+ MT batches; demands strict laboratory assay specs (NASC/SON certified, aflatoxin < 4 ppb) and insured delivery guarantees.
* **The Bulk Haulage Operator / Fleet Manager**: Manages flatbed and grain-tipper trucks; needs reliable backhaul loads and milestone-triggered toll/freight payouts.
* **The Exporter / Macro Analyst**: Requires macro intelligence on port demurrage, grain moisture benchmarks, and foreign exchange arbitrage for sesame seeds, cashew nuts, and soybeans.

---

## 4. Key Functional Modules & Technical Specifications

### Module 1: Personalized Trader Command Center (`Home Dashboard`)
* **Aggregate Liquidity HUD**: Real-time NIBSS interbank synced balance, allocated escrow collateral, and 24-hour settled transaction volume.
* **Live Spot Price Carousel**: Streaming spot quotes from primary aggregation hubs (Kano Dawanau Maize, Gboko Soybeans, Zaria Sorghum) with delta percentages and recency timestamps.
* **High-Conviction Arbitrage Flash Card**: Automated alert matching user inventory to the highest net profit destination corridor (e.g., Kano ➔ Abuja: ROI 22.4%, net profit ₦4.2M).
* **Active Haulage Status & Trending Batches**: Micro-telemetry widget tracking active consignments and vetted commercial listings.

### Module 2: Market Intelligence & OHLC Candlestick Terminal (`Market Intelligence`)
* **Interactive Financial Charts**: Timeframe controls (1D, 5D, 1W, 1M, 3M, 1Y) with OHLC (Open, High, Low, Close) metrics, transaction volume histograms, and moving averages.
* **Verified Benchmark Verification**: Explicit metadata tags indicating data source (e.g., *Kano Dawanau Market Hub*, 48 matched trades today) and confidence levels. Never present estimates as confirmed spot data.
* **Market Sentiment & Volatility HUD**: Real-time buy/sell pressure gauge (e.g., 68% Bullish Buy Pressure vs. 32% Sell Pressure), 24h High/Low bands, and National Average disparity.

### Module 3: Dynamic Arbitrage & Route Simulator (`"Where Should I Sell?"`)
* **Consignment Parameter Inputs**: Commodity type (Yellow Maize, Soybeans, Sorghum, Sesame), batch volume in metric tonnes (MT), and terminal origin.
* **Corridor Comparison Matrix**: Ranked destination yields comparing gross market value against:
  * Verified Haulage fees (e.g., Kano to Lagos Mile 12: -₦430,000)
  * Interstate state checkpoints & toll levies (-₦70,000)
  * Terminal union offloading dues (-₦110,000)
* **Action Gate**: One-tap direct booking to lock haulage contract and dispatch vetted fleet.

### Module 4: Nigeria Cartographic Market Map (`Nigeria Market Map`)
* **Tactical Dark-Map View**: Visualizing geographic market hubs (Kano, Kaduna, Jos, Abuja, Bodija, Lagos, Onitsha) connected via trunk road corridors (A2 Axis).
* **Telemetry Markers**: Active freight convoy counts, glowing hub liquidity status, and node-level tap details (fill rate, available idle haulage capacity, and wholesale volume).

### Module 5: B2B Agricultural Commodity Marketplace (`Marketplace & Product Detail`)
* **Commercial Batch Listings**: High-volume lots (10–100 MT) classified under Grains & Cereals, Legumes, Vegetables, and Cash Crops.
* **Laboratory Assay & Quality Assurance**: Verification of physical quality attributes:
  * Moisture Content (tolerance limit < 13.0%)
  * Foreign Matter / Destoned percentage (< 0.8%)
  * Aflatoxin level (< 4 ppb EU export compliance)
  * Certification tags (NASC, SON, Export Accredited)
* **Landed Cost Calculator**: Interactive volume slider recalculating gross commodity price, haulage freight, transit levies, and net landed unit cost.

### Module 6: Logistics & Telemetric Dispatch (`Logistics Dashboard & Live Tracking`)
* **Full-Screen GPS Haulage Tracking**: Real-time vehicle telematics tracing corridor waypoints (e.g., Kano ➔ Zaria ➔ Kaduna Bypass ➔ Abuja Dei-Dei).
* **Cargo Protection & Telemetry HUD**: Speed monitoring (km/h), heading, grain silo internal temperature (monitoring for heat-induced fermentation), and Leadway Goods-In-Transit policy coverage.
* **Checkpoint Milestones**: Audit-logged departures, weighbridge digital gross/tare tare scans, and destination offloading alerts.

### Module 7: Trade Escrow & Multi-Currency Wallet (`Wallet & Escrow`)
* **Escrow Vault Protocol**: Automated smart contract locking buyer funds upon order placement, releasing payout exclusively upon destination electronic weighbridge QR confirmation.
* **Audited Settlement Framework**: Fully compliant with Central Bank of Nigeria (CBN) Escrow Regulations and NDIC insurance protections.
* **Categorized Ledger Activity**: Distinct transaction classification for Inbound Trade Settlements, Freight & Toll Deductions, and Interstate Produce Levies.

### Module 8: Editorial Research & Market Economics (`GoAgro Insights`)
* **Actionable Ag Journalism**: Deep dives on haulage fuel tariffs, port congestion demurrage, and regional planting cycle forecasts.
* **AgriGo Corridor Realization Index**: Normalized N/MT basis benchmarks comparing net price capture across coastal vs. inland terminals.

---

## 5. Design System & UX Principles (`Agro-Terminal Precision`)

| Attribute | Specification | Rationale |
| :--- | :--- | :--- |
| **Color Palette** | Surface Dark: `#0a0f0d`, Container Low: `#181d1a`, Container High: `#262b29`<br>Accent Green: `#00e676`, Emerald Secondary: `#10b981`<br>Warning: `#f59e0b`, Error/Danger: `#ef4444` | Futuristic dark fintech aesthetic reminiscent of Bloomberg terminals while keeping African agricultural roots. |
| **Typography** | Primary Font: **Plus Jakarta Sans**<br>Tabular Numerics: Monospace/Semi-bold weights for currency and volume metrics | Ensures rapid legibility under bright sunlight and high data-density conditions. |
| **Data Integrity Rule** | Explicit distinction between **Confirmed / Live**, **Verified Historic**, and **Estimated / Projected** metrics. | Eliminates user mistrust caused by unsubstantiated profit calculations. |
| **Bandwidth Optimization** | Progressive image loading, SVG geometric icons, lightweight DOM tree | Optimized for 2G/3G/4G connectivity across rural Nigerian trade transit corridors. |

---

## 6. Success Metrics & Roadmap

### 6.1 North Star Metric
* **Total Gross Merchandise Value (GMV) locked and safely cleared via AgriGo Escrow.**

### 6.2 Key Performance Indicators (KPIs)
1. **Arbitrage Adoption Rate**: Percentage of listed batches routed through the "Where Should I Sell?" recommendation engine.
2. **Haulage Fulfillment SLA**: Transit delivery on-time rate (> 98.0%) with zero unverified in-transit shrinkage.
3. **Escrow Dispute Rate**: Claims submitted under Leadway GIT protection (< 0.2% of all dispatches).

### 6.3 Product Roadmap
* **Phase 1 (Current)**: Mobile core experience — Home Dashboard, Market Intelligence, Marketplace, Arbitrage Simulator, Logistics Fleet Dashboard, Live Tracking, Escrow Wallet, and Insights Blog.
* **Phase 2 (Q3 2026)**: Driver Offline Mode with SMS/USSD fallback telemetry for cellular dead zones along the Niger/Kaduna interstate routes.
* **Phase 3 (Q4 2026)**: Web-based Enterprise Ag-Commodity Trader Terminal for multi-depot agribusinesses and commodity exchange desks.
