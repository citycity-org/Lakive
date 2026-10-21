// ── Lakive Market Config ────────────────────────────────────────────────────
// Manually update CA_CONFIG and US_CONFIG after each official data release.
// BoC overnight rate is fetched live from the Bank of Canada Valet API —
// no manual update needed for that one field.
//
// Update schedule:
//   CPI          → Statistics Canada, ~3rd week of each month (prev month data)
//   Unemployment → Statistics Canada LFS, ~2nd Friday of each month
//   Fed Rate     → FOMC meetings: Jan, Mar, May, Jun, Jul, Sep, Oct, Dec
//   US CPI       → BLS, ~2nd week of each month
//   US Unemp     → BLS, 1st Friday of each month

export type Indicator = {
  value: number        // current value
  prev: number         // previous period value
  date: string         // "Jun 2026"
  source: string
}

export type CountryConfig = {
  name: string
  flag: string
  currency: string
  centralBank: { name: string; shortName: string }
  rate: Indicator & { rangeHigh?: number }   // rangeHigh for US Fed target range
  cpi: Indicator
  cpiExGasoline?: Indicator   // CPI excl. gasoline YoY% (CA only)
  cpiRent?: Indicator         // CPI Rent component YoY% (CA only)
  unemployment: Indicator
  housingPricesHPI?: Indicator  // MLS HPI composite YoY% (CA only, CREA)
  housingStarts?: Indicator     // Housing starts SAAR (CA only, CMHC)
  rentalMarket?: Indicator      // National avg asking rent, YoY% (CA only, Rentals.ca × Urbanation)
  housingNote: string  // 1-line housing market summary for this month
  lastReviewed: string     // "2026-07-25"
  updatedAt: string        // "2026-07-25 10:30 PDT" — shown in source footer
  sources: string[]        // ordered list of data sources
}

// ── Canada ──────────────────────────────────────────────────────────────────
// BoC overnight rate is auto-fetched from the Valet API.
// The value here is the fallback used if the API call fails.
export const CA_CONFIG: CountryConfig = {
  name: 'Canada',
  flag: '🍁',
  currency: 'CAD',
  centralBank: { name: 'Bank of Canada', shortName: 'BoC' },
  rate: {
    value: 2.25,        // FALLBACK — live value fetched from BoC Valet API
    prev: 2.25,         // Sep 2 2026: unchanged (held at 2.25%)
    date: 'Sep 2, 2026',
    source: 'Bank of Canada',
  },
  cpi: {
    value: 3.1,              // Sep 2026 CPI released Oct 21 — StatsCan auto-fetch active
    prev: 3.0,               // Aug 2026 was 3.0% YoY
    date: 'Sep 2026',
    source: 'Statistics Canada',
  },
  cpiExGasoline: {
    value: 2.2,              // Sep 2026 CPI excl. gasoline YoY
    prev: 2.2,               // prev not disclosed in source; placeholder = same
    date: 'Sep 2026',
    source: 'Statistics Canada',
  },
  cpiRent: {
    value: 2.8,              // Sep 2026 CPI Rent component YoY
    prev: 2.8,               // prev not disclosed in source; placeholder = same
    date: 'Sep 2026',
    source: 'Statistics Canada',
  },
  unemployment: {
    value: 6.5,              // Sep 2026 LFS released Oct 9 — −68K jobs, rate rose 0.1pp to 6.5%, employment rate 60.6%, participation 64.8%
    prev: 6.4,               // Aug 2026 was 6.4%
    date: 'Sep 2026',
    source: 'Statistics Canada LFS',
  },
  housingPricesHPI: {
    value: -3.4,             // Sep 2026 MLS HPI composite YoY
    prev: -3.4,              // prev not disclosed in source; placeholder = same
    date: 'Sep 2026',
    source: 'CREA',
  },
  housingStarts: {
    value: 248896,           // Sep 2026 SAAR (seasonally adjusted annualized rate)
    prev: 248896,            // prev not disclosed in source; placeholder = same
    date: 'Sep 2026',
    source: 'CMHC',
  },
  rentalMarket: {
    value: 2034,             // Sep 2026 national avg asking rent (2BR), Rentals.ca × Urbanation
    prev: 2034,              // prev not disclosed in source; placeholder = same (YoY change: −4.2%)
    date: 'Sep 2026',
    source: 'Rentals.ca × Urbanation',
  },
  housingNote: 'Rents fell for a 24th consecutive month: $2,034 national avg asking rent, −4.2% YoY (Rentals.ca × Urbanation, Sep 2026). MLS HPI −3.4% YoY (CREA). BoC decision Oct 28 — next key signal.',
  lastReviewed: '2026-10-20',
  updatedAt: 'Oct 20, 2026',
  sources: ['Bank of Canada', 'Statistics Canada', 'CMHC', 'CREA', 'Rentals.ca × Urbanation'],
}

// ── United States ────────────────────────────────────────────────────────────
// All values manual. Update after each FOMC meeting (rate) and BLS release.
// Next FOMC: Sep 2026. Next BLS CPI: ~Aug 13 2026.
export const US_CONFIG: CountryConfig = {
  name: 'United States',
  flag: '🇺🇸',
  currency: 'USD',
  centralBank: { name: 'Federal Reserve', shortName: 'Fed' },
  rate: {
    value: 4.25,
    rangeHigh: 4.50,    // Fed uses a target range (e.g. 4.25–4.50%)
    prev: 4.50,
    date: 'Jun 2026',
    source: 'Federal Reserve (FOMC)',
  },
  cpi: {
    value: 2.7,
    prev: 3.0,
    date: 'Jun 2026',
    source: 'Bureau of Labor Statistics',
  },
  unemployment: {
    value: 4.2,
    prev: 4.1,
    date: 'Jun 2026',
    source: 'Bureau of Labor Statistics',
  },
  housingNote: 'Sales activity subdued vs 2021–2022 peak. Inventory gradually improving.',
  lastReviewed: '2026-07-25',
  updatedAt: '2026-07-25 10:30 PDT',
  sources: ['Federal Reserve', 'U.S. Bureau of Labor Statistics', 'FHFA', 'Freddie Mac'],
}

// ── Lakive analysis templates ────────────────────────────────────────────────
// These generate the short insight line shown under each indicator.

export function rateInsight(country: 'CA' | 'US', rate: number, prev: number): string {
  const changed = rate !== prev
  const dir = rate < prev ? 'cut' : rate > prev ? 'raised' : 'held'
  if (country === 'CA') {
    const mortgageRange = rate <= 2.0 ? '4.4–4.8%' : rate <= 2.5 ? '4.7–5.1%' : rate <= 3.0 ? '5.0–5.5%' : '5.5–6.0%'
    return changed
      ? `BoC ${dir} to ${rate}%. 5-yr fixed mortgages now ~${mortgageRange}.`
      : `BoC held at ${rate}%. 5-yr fixed mortgages ~${mortgageRange}. Stable for buyers.`
  } else {
    const mortgageRange = rate <= 3.5 ? '5.5–6.2%' : rate <= 4.5 ? '6.2–6.8%' : '6.8–7.5%'
    return changed
      ? `Fed ${dir} target to ${rate}–${(rate + 0.25).toFixed(2)}%. 30-yr fixed ~${mortgageRange}.`
      : `Fed held at ${rate}–${(rate + 0.25).toFixed(2)}%. 30-yr mortgages ~${mortgageRange}.`
  }
}

export function cpiInsight(country: 'CA' | 'US', value: number, prev: number): string {
  const dir = value < prev ? 'Easing' : value > prev ? 'Rising' : 'Stable'
  if (value < 2.0) return `${dir} — at ${value}%, inflation is below central bank target. Cost pressure minimal.`
  if (value < 2.5) return `${dir} — at ${value}%, inflation near target. Cost of living pressure moderate.`
  if (value < 3.0) return `${dir} — at ${value}%, inflation above target but declining. Everyday costs still elevated.`
  if (value < 4.0) return `${dir} — at ${value}%, inflation remains high. Rent and food costs a key concern for workers.`
  return `Elevated at ${value}%. Real income erosion is a significant factor in housing affordability decisions.`
}

export function unemploymentInsight(country: 'CA' | 'US', value: number, prev: number): string {
  const falling = value < prev
  const rising  = value > prev
  if (value < 4.5) {
    const trend = rising ? 'Slight uptick but still healthy' : falling ? 'Tightening' : 'Stable'
    return `${trend} — at ${value}%, the labour market remains broadly tight. Income stability supports housing demand.`
  }
  if (value < 6.0) {
    const trend = falling ? 'Improving' : rising ? 'Edging up' : 'Stable'
    return `${trend} — ${value}% is within a healthy range. Job security provides a reasonable base for housing commitments.`
  }
  if (value < 7.0) {
    const trend = falling ? 'Improving' : rising ? 'Softening' : 'Stable'
    return `${trend} — at ${value}%, the market has some slack. New immigrants and job-changers should factor in landing time.`
  }
  return `Elevated at ${value}%. Income continuity risk is high; factor this into buy vs. rent decisions.`
}
