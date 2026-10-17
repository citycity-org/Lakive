# Lakive City Intelligence — Methodology Reference
**Model v4 · Platform v5.0 · October 2026**
*Questions or corrections → hello@lakive.com*

---

## Contents

1. Indicator Definitions
2. Data Sources
3. Scoring Formula
4. Update Schedule
5. Model Limitations
6. Version History
7. IP & Disclosure Policy

---

## 1. Indicator Definitions

### Housing Affordability Indicators

Lakive tracks two housing-affordability metrics. Both are occupation-specific and property-type-specific.

**HPI Years (Housing Price Index — Years)**
Reference property price ÷ gross annual occupational income. A comparative affordability ratio — *how many years of full pre-tax income equals the reference price?* This is not a purchase timeline; it does not model savings rate, down payment, or mortgage terms. It is used cross-city to show relative purchase burden for the same occupation.

- Lower = less burden
- Reference price: city-specific benchmark by property type (1BR · 2BR · 3BR · Townhouse · Detached). Canada: CMHC / CREA composite benchmark. US: Zillow ZHVI / local MLS median.
- Salary denominator: occupation median salary from Statistics Canada LFS (CA) or BLS OES (US). Fixed per city–occupation pair; does not reflect individual variation.
- CA calibration baseline: CAD $75,000 — the median salary used to calibrate each city's `benchmarkHpi`. HPI Years for a given occupation are derived by scaling the benchmark via `(benchmarkSalary ÷ occupationSalary)`. All 20 occupations carry explicit salary values; no occupation uses the $75K figure as a substitute.

**HPI Level bands:**

| Level | Threshold | Label |
|-------|-----------|-------|
| L1 | ≤ 5 yrs | Low Pressure |
| L2 | ≤ 8 yrs | Manageable |
| L3 | ≤ 12 yrs | Under Pressure |
| L4 | ≤ 18 yrs | High Pressure |
| L5 | > 18 yrs | Severe |

---

**RPI % (Rent Pressure Index)**
Selected property-type rent × 12 ÷ annual salary × 100. Answers: *what share of gross income goes to rent for the selected property type?* The 2BR is the base benchmark. Other types apply calibration multipliers derived from observed market relativities:

| Property type | Multiplier | Nature |
|--------------|------------|--------|
| 1BR | 0.78× | Estimate |
| 2BR | 1.00× | Base benchmark |
| 3BR | 1.35× | Estimate |
| Townhouse | 1.50× | Estimate |
| Detached | 1.65× | Estimate |

These multipliers are estimates, not sourced directly per city from public data — they reflect typical relative rent differentials across Canadian and US markets.

- Lower = less burden

**RPI Level bands:**

| Level | Threshold | Label |
|-------|-----------|-------|
| L1 | ≤ 25% | Low Pressure |
| L2 | ≤ 30% | Manageable |
| L3 | ≤ 38% | Under Pressure |
| L4 | ≤ 50% | High Pressure |
| L5 | > 50% | Severe |

---

**Housing Pressure Level**
`max(hpiLevel, rpiLevel)`. The overall housing pressure rating is driven by whichever of the two dimensions is worse — you cannot escape a Severe RPI with a Low HPI Years, and vice versa.

---

### City Quality Indices

Five of the six indices below are city-level constants — they do not vary by occupation. The exception is EOI.

**EOI — Employment Opportunity Index**
Qualitative assessment of how well the city's economic base generates demand for the specific occupation. Rated High / Mid / Low and converted to a numeric score for the composite calculation. EOI is the *only* index that varies by occupation — all other five are city-level constants. Updated annually; significant sector shifts may trigger interim updates.

**TAI — Tax Advantage Index**
Combined effective tax burden on median occupational income, including provincial/state income tax, sales tax, and property tax. Inverted — lower tax burden → higher TAI. Alberta's no-PST structure produces high TAI; Québec's combined QST + provincial income tax produces lower TAI.

**HAI — Healthcare Access Index**
Physician-to-population ratio, hospital bed density, and wait-time indicators. CA: CIHI. US: HRSA Area Health Resource Files.

**EQI — Environmental Quality Index**
Annual AQI average, green-space coverage, and extreme-weather event frequency. Sources: EPA AirNow (US), Environment Canada AQHI (CA), NASA MODIS land cover.

**TCI — Transit & Connectivity Index**
Composite of transit mode share, commute times, walkability, and inter-city connectivity. Sources: GTFS feeds, Census journey-to-work, Walk Score API. Higher TCI means shorter commutes and better multi-modal access.

**PSI — Public Safety Index**
Violent crime rate and property crime rate per 100,000. Sources: Statistics Canada UCR Survey (CA), FBI UCR / NIBRS (US). Inverted — lower crime → higher index.

---

## 2. Data Sources

All source data is public or licensed from the issuing agency. No proprietary data is purchased from third-party vendors.

### Canada

| Indicator | Source |
|-----------|--------|
| Housing prices | CMHC Housing Market Information Portal · CREA MLS HPI |
| Rental rates | Rentals.ca National Rent Report · CMHC SMAI |
| Salaries | Statistics Canada Labour Force Survey (LFS), Table 14-10-0064-01 |
| Employment data | Statistics Canada LFS monthly release · Job Bank postings |
| Healthcare | CIHI Health System Use by LHIN/Zone · CMA physician registry |
| Environment | Environment Canada AQHI historical · ECCC weather normals |
| Tax rates | CRA tax brackets · provincial finance ministry schedules |
| Safety | Statistics Canada UCR Survey, Table 35-10-0177-01 |

### United States

| Indicator | Source |
|-----------|--------|
| Housing prices | Zillow Home Value Index (ZHVI) · local MLS median |
| Rental rates | HUD FMR · Apartment List National Rent Report |
| Salaries | BLS Occupational Employment and Wage Statistics (OEWS) |
| Employment data | BLS monthly CES release · CareerOneStop postings |
| Healthcare | HRSA Area Health Resource Files · CMS hospital compare |
| Environment | EPA AirNow annual AQI summary · NLCD land cover |
| Tax rates | Tax Foundation state-local tax burden estimates · IRS SOI |
| Safety | FBI UCR / NIBRS · city open-data crime portals |

City-level indices (TAI, HAI, EQI, TCI, PSI) are reviewed annually. Housing and salary data are updated on the schedule described in Section 4.

---

## 3. Scoring Formula

The Lakive Fit Score is a composite of two sub-scores: Housing Score and City Score. Both are computed at the occupation level and property-type level; city indices apply city-wide.

### Score structure (Model v4 / Platform v5.0)

**Housing Score — primary component**
Derived from HPI Years and RPI %, with purchase burden weighted slightly more than rental burden. Both dimensions matter — a severe RPI cannot be offset by a low HPI Years, and vice versa. Housing pressure carries more weight in the final score than city quality.

**City Score — secondary component**
All six city indices (EOI, TAI, HAI, EQI, TCI, PSI) contribute positively — a higher value always improves the score. EOI is the only index that varies by occupation; the other five are city-wide constants. EOI, TAI (Tax Advantage), and HAI are the primary city-score drivers; EQI, TCI (Transit), and PSI contribute as secondary factors.

**What we do not publish**
The exact weights assigned to each component and sub-index are proprietary model parameters and are not published. They represent the core of our analytical methodology. The direction and ordering described above are sufficient to understand and challenge any result.

The final score is clamped to **[10, 99]**. A score below 40 indicates severe housing or city-quality constraints for this occupation in this city; above 85 indicates strong conditions on both dimensions.

---

### Housing Pressure Level (separate from Fit Score)

The Housing Pressure Level is derived independently from the Fit Score. It is set to `max(hpiLevel, rpiLevel)` — whichever of the two housing dimensions is worse. This rating appears alongside the Fit Score on city pages to flag cases where a high composite score still carries a housing burden warning.

| Level | Label | Meaning |
|-------|-------|---------|
| L1 | Low Pressure | Both HPI and RPI within comfortable range |
| L2 | Manageable | Affordable with standard financial planning |
| L3 | Under Pressure | Elevated housing cost; detailed budgeting required |
| L4 | High Pressure | Significant housing burden for this occupation |
| L5 | Severe | Housing cost is a dominant constraint |

---

### Fit Score interpretation (10–99)

| Range | Label | Meaning |
|-------|-------|---------|
| 85–99 | Strong | Affordability and city quality both favourable for this occupation |
| 70–84 | Good | Solid overall balance; minor housing or city caveat possible |
| 55–69 | Moderate | Viable but elevated housing cost or weaker city conditions |
| 40–54 | Challenging | Significant housing or city-quality constraints |
| 10–39 | Severe | Strong affordability or opportunity mismatch |

---

## 4. Update Schedule

Lakive follows official release calendars wherever possible. Scores are recalculated after each data update — there is no manual override of individual city scores between scheduled updates.

| Data type | Cadence |
|-----------|---------|
| LFS monthly (CA) | Second Friday of each month |
| BLS monthly (US) | Third Friday of each month |
| Housing prices (CMHC / CREA) | Monthly, ~15th of following month |
| Housing prices (Zillow ZHVI) | Monthly, ~mid-month |
| Rental rates (Rentals.ca) | Monthly, ~end of following month |
| Rental rates (HUD FMR) | Annually, October |
| City indices (TAI, HAI, EQI, TCI, PSI) | Annually, Q1 (January–March), incorporating prior-year data |
| EOI (Employment Opportunity) | Annually, with LFS Annual Survey; significant sector shifts may trigger interim updates |
| Fit scores | Recalculated automatically whenever an underlying input changes; always reflect the latest available data |

---

## 5. Model Limitations

No model captures everything. The following are known structural limitations of the current version.

**Single benchmark property type**
HPI Years uses one property benchmark per city — a 2-bedroom condo composite in most Canadian cities, or ZHVI for a given tier in US cities. It does not reflect the full spread of prices within a city. Neighbourhoods vary widely.

**Pre-tax salary denominator**
RPI and HPI Years use gross annual salary. After-tax take-home varies by province/state and individual circumstances. The TAI index partially accounts for tax burden at the city level, but individual tax situations differ.

**No household-size adjustment**
All indicators assume a single earner. Dual-income households, families with dependants, and single parents face materially different affordability curves that the model does not capture.

**EOI is qualitative and lagged**
The Employment Opportunity Index is the only index not derived from a formula. It is based on sector analysis and reviewed annually. Sudden sector expansions or contractions (e.g. tech layoffs, new facility announcements) may not be reflected until the next annual update.

**No personal circumstances**
The model does not account for immigration status, prior local work experience, language proficiency, professional licensing portability, or personal credit history — all of which materially affect housing access and job placement.

**City-level aggregation**
All indices are city-level averages. Within a city, neighbourhood quality, micro-market rental rates, and local employer concentration vary substantially. The score should be read as a city-level signal, not a neighbourhood-level one.

**Data lags**
Official statistics are published with a lag of 4–8 weeks for monthly data and up to 12 months for annual data (crime, healthcare). Scores may not reflect very recent market shifts.

---

## 6. Version History

| Version | Date | Changes |
|---------|------|---------|
| Model v4 / Platform v5.0 | Oct 2026 | Current version. Single Source of Truth refactor: all occupation scores computed from a central engine (`lib/fit-engine.ts`); static hardcoded data eliminated. Housing affordability component weight increased relative to v3. RPI threshold re-calibrated. Occupation coverage expanded from 8 to 20. |
| Model v3 | Jul 2026 | Added US city coverage (11 cities). EOI extended to US markets. BLS OES integrated for US occupation salaries. Zillow ZHVI integrated as housing price source. |
| Model v2 | Mar 2026 | Split housing score into HPI Years (purchase burden) and RPI % (rental burden). Introduced property-type selector. Added price-adjustment scenario multipliers. |
| Model v1 | Jan 2026 | Initial launch. Single price-to-income ratio. Five Canadian cities. City score on four indices (TAI, HAI, EQI, PSI). |

---

## 7. IP & Disclosure Policy

**What we publish:** every indicator, its data source, its direction of effect on the score, and all level-band thresholds (HPI, RPI, Fit Score, Housing Pressure Level).

**What we do not publish:** the exact weight of each component and sub-index in the composite formula. These are proprietary analytical methodology — the core of how we translate public data into actionable city intelligence.

**What this means in practice:** anyone can verify whether a city's individual index values are correct (data is public), and can understand whether a change in any index would improve or worsen the score (direction is published). What cannot be reverse-engineered from published information alone is the precise magnitude of each factor's contribution.

RPI property-type multipliers (1BR 0.78×, 3BR 1.35×, Townhouse 1.50×, Detached 1.65×) are disclosed as estimates, not empirically sourced per-city figures.

---

*Lakive City Intelligence Platform · lakive.com · hello@lakive.com*
*Last updated: October 2026*
