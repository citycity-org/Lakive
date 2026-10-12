import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Methodology · Lakive City Intelligence',
  description: 'How Lakive calculates housing affordability, occupation fit scores, and city indices — indicator definitions, data sources, update schedule, and model limitations.',
  alternates: { canonical: 'https://lakive.com/methodology' },
}

// ── Shared style tokens ────────────────────────────────────────────────────────
const S = {
  page:    { background: '#070d1f', minHeight: '100vh', color: 'white' } as React.CSSProperties,
  wrap:    { maxWidth: 760, margin: '0 auto', padding: '0 24px 80px' } as React.CSSProperties,
  h2:      { color: 'white', fontSize: 20, fontWeight: 800, margin: '0 0 6px' } as React.CSSProperties,
  h3:      { color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: 700, margin: '0 0 4px' } as React.CSSProperties,
  body:    { color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.85, margin: 0 } as React.CSSProperties,
  caption: { color: 'rgba(255,255,255,0.28)', fontSize: 12, lineHeight: 1.7, margin: 0 } as React.CSSProperties,
  divider: { borderTop: '1px solid rgba(255,255,255,0.07)', margin: '40px 0' } as React.CSSProperties,
  card:    { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '20px 24px' } as React.CSSProperties,
  teal:    { color: '#14B8A6' } as React.CSSProperties,
  blue:    { color: '#60A5FA' } as React.CSSProperties,
  amber:   { color: '#F59E0B' } as React.CSSProperties,
  red:     { color: '#EF4444' } as React.CSSProperties,
  tag:     { display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: '0.04em' } as React.CSSProperties,
}

function Section({ id, tag, title, children }: { id?: string; tag?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {tag && (
        <span style={{ color: '#14B8A6', fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' as const }}>{tag}</span>
      )}
      <h2 style={S.h2}>{title}</h2>
      {children}
    </section>
  )
}

function Row({ label, value, note }: { label: string; value: React.ReactNode; note?: string }) {
  return (
    <div style={{ display: 'flex', gap: 16, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'flex-start' }}>
      <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: 13, minWidth: 160, flexShrink: 0, paddingTop: 1 }}>{label}</span>
      <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, lineHeight: 1.65, flex: 1 }}>
        {value}
        {note && <span style={{ color: 'rgba(255,255,255,0.30)', fontSize: 12 }}> — {note}</span>}
      </span>
    </div>
  )
}

export default function MethodologyPage() {
  return (
    <main style={S.page}>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(160deg,#070d1f 0%,#0f1726 55%,#0d1a2f 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '72px 24px 64px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 20, background: 'rgba(20,184,166,0.10)', border: '1px solid rgba(20,184,166,0.22)', marginBottom: 20 }}>
            <span style={{ color: '#14B8A6', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em' }}>MODEL TRANSPARENCY</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            How Lakive works
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.8, margin: '0 0 28px', maxWidth: 580 }}>
            Every number on this site comes from a defined formula applied to public data. This page explains what each indicator measures, where the data comes from, how often it is updated, and where the model falls short.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.30)', fontSize: 13, lineHeight: 1.7, margin: 0, borderLeft: '3px solid rgba(20,184,166,0.40)', paddingLeft: 16 }}>
            We do not publish the complete scoring weights. Releasing exact weights would allow actors to game the data — tuning listings or postings to score well rather than be genuinely affordable or in-demand. What we do publish is every indicator, its data source, and the direction of its effect on the score. That is enough to understand and challenge any result.
          </p>
        </div>
      </div>

      <div style={S.wrap}>

        {/* ── TOC ─────────────────────────────────────────────────────────── */}
        <nav style={{ padding: '28px 0 8px', display: 'flex', flexWrap: 'wrap' as const, gap: '8px 20px' }}>
          {[
            ['#indicators', 'Indicator Definitions'],
            ['#data-sources', 'Data Sources'],
            ['#scoring', 'Scoring Formula'],
            ['#updates', 'Update Schedule'],
            ['#limitations', 'Model Limitations'],
            ['#versions', 'Version History'],
          ].map(([href, label]) => (
            <a key={href} href={href} style={{ color: '#60A5FA', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>{label}</a>
          ))}
        </nav>

        <div style={S.divider} />

        {/* ── 1. Indicator Definitions ────────────────────────────────────── */}
        <Section id="indicators" tag="Section 1" title="Indicator Definitions">
          <p style={S.body}>
            Lakive tracks two housing-affordability metrics and six city-quality indices. The two affordability metrics are occupation-specific and property-type-specific. The six city indices are city-level — they do not vary by occupation.
          </p>

          {/* Housing */}
          <div style={{ ...S.card, marginTop: 8 }}>
            <h3 style={{ ...S.h3, color: '#14B8A6', marginBottom: 16 }}>Housing Affordability Indicators</h3>

            <div style={{ display: 'flex', flexDirection: 'column' as const }}>
              <Row
                label="HPI Years"
                value={<>Reference price ÷ gross annual salary. Answers: <em>how many years of full pre-tax income to buy this property type?</em></>}
                note="Lower = less burden"
              />
              <Row
                label="Reference price"
                value="City-specific benchmark by property type (1BR · 2BR · 3BR · Townhouse · Detached). Canada: CMHC / CREA composite benchmark. US: Zillow ZHVI / local MLS median."
              />
              <Row
                label="Salary denominator"
                value="Occupation median salary sourced from Statistics Canada LFS (CA) or BLS OES (US). Fixed per city–occupation pair; does not reflect individual variation."
              />
              <Row
                label="CA benchmark salary"
                value="CAD 75,000 — used when no occupation data is available for a city, as a conservative floor."
              />
              <Row
                label="HPI Level bands"
                value={
                  <span style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
                    <span style={{ ...S.tag, background: 'rgba(20,184,166,0.15)', color: '#14B8A6' }}>L1 ≤ 5 yrs</span>
                    <span style={{ ...S.tag, background: 'rgba(16,185,129,0.15)', color: '#10B981' }}>L2 ≤ 8 yrs</span>
                    <span style={{ ...S.tag, background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}>L3 ≤ 12 yrs</span>
                    <span style={{ ...S.tag, background: 'rgba(232,108,47,0.15)', color: '#E86C2F' }}>L4 ≤ 18 yrs</span>
                    <span style={{ ...S.tag, background: 'rgba(239,68,68,0.15)', color: '#EF4444' }}>L5 {'>'} 18 yrs</span>
                  </span>
                }
              />
              <Row
                label="RPI %"
                value={<>Average 2-bedroom rent × 12 ÷ annual salary × 100. Answers: <em>what share of gross income goes to rent in a standard 2BR?</em></>}
                note="Lower = less burden"
              />
              <Row
                label="RPI Level bands"
                value={
                  <span style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
                    <span style={{ ...S.tag, background: 'rgba(20,184,166,0.15)', color: '#14B8A6' }}>L1 ≤ 25%</span>
                    <span style={{ ...S.tag, background: 'rgba(16,185,129,0.15)', color: '#10B981' }}>L2 ≤ 30%</span>
                    <span style={{ ...S.tag, background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}>L3 ≤ 38%</span>
                    <span style={{ ...S.tag, background: 'rgba(232,108,47,0.15)', color: '#E86C2F' }}>L4 ≤ 50%</span>
                    <span style={{ ...S.tag, background: 'rgba(239,68,68,0.15)', color: '#EF4444' }}>L5 {'>'} 50%</span>
                  </span>
                }
              />
              <Row
                label="Pressure Level"
                value="max(hpiLevel, rpiLevel). The overall housing pressure rating is driven by whichever of the two dimensions is worse — you cannot escape a severe RPI with a good HPI."
              />
            </div>
          </div>

          {/* City Indices */}
          <div style={{ ...S.card, marginTop: 16 }}>
            <h3 style={{ ...S.h3, color: '#60A5FA', marginBottom: 16 }}>City Quality Indices (city-level, not occupation-specific)</h3>

            <div style={{ display: 'flex', flexDirection: 'column' as const }}>
              <Row
                label="EOI — Employment Opportunity Index"
                value="Qualitative assessment of how well the city's economic base generates demand for the specific occupation. Rated High / Mid / Low; converted to numeric (High = 78, Mid = 62, Low = 45) for scoring."
                note="Only manually-set index — updated annually"
              />
              <Row
                label="TAI — Transit & Access Index"
                value="Composite of transit mode share, commute times, walkability, and inter-city connectivity. Sources: GTFS feeds, Census journey-to-work, Walk Score API."
              />
              <Row
                label="HAI — Healthcare Access Index"
                value="Physician-to-population ratio, hospital bed density, and wait-time indicators. CA: CIHI. US: HRSA Area Health Resource Files."
              />
              <Row
                label="EQI — Environmental Quality Index"
                value="Annual AQI average, green-space coverage, and extreme-weather event frequency. Sources: EPA AirNow (US), Environment Canada AQHI (CA), NASA MODIS land cover."
              />
              <Row
                label="TCI — Tax & Cost Index"
                value="Combined effective tax rate on median income including provincial/state income tax, sales tax, and property tax. Inverted — lower tax burden → higher index."
              />
              <Row
                label="PSI — Public Safety Index"
                value="Violent crime rate and property crime rate per 100,000. Sources: Statistics Canada UCR Survey (CA), FBI UCR / NIBRS (US). Inverted — lower crime → higher index."
              />
            </div>
          </div>
        </Section>

        <div style={S.divider} />

        {/* ── 2. Data Sources ─────────────────────────────────────────────── */}
        <Section id="data-sources" tag="Section 2" title="Data Sources">
          <p style={S.body}>
            All source data is public or licensed from the issuing agency. No proprietary data is purchased from third-party vendors.
          </p>

          <div style={{ ...S.card, marginTop: 8 }}>
            <h3 style={{ ...S.h3, color: '#14B8A6', marginBottom: 12 }}>Canada</h3>
            <div style={{ display: 'flex', flexDirection: 'column' as const }}>
              <Row label="Housing prices" value="CMHC Housing Market Information Portal · CREA MLS HPI" />
              <Row label="Rental rates" value="Rentals.ca National Rent Report · CMHC SMAI" />
              <Row label="Salaries" value="Statistics Canada Labour Force Survey (LFS), Table 14-10-0064-01" />
              <Row label="Employment data" value="Statistics Canada LFS monthly release · Job Bank postings" />
              <Row label="Healthcare" value="CIHI Health System Use by LHIN/Zone · CMA physician registry" />
              <Row label="Environment" value="Environment Canada AQHI historical · ECCC weather normals" />
              <Row label="Tax rates" value="CRA tax brackets · provincial finance ministry schedules" />
              <Row label="Safety" value="Statistics Canada UCR Survey, Table 35-10-0177-01" />
            </div>
          </div>

          <div style={{ ...S.card, marginTop: 12 }}>
            <h3 style={{ ...S.h3, color: '#60A5FA', marginBottom: 12 }}>United States</h3>
            <div style={{ display: 'flex', flexDirection: 'column' as const }}>
              <Row label="Housing prices" value="Zillow Home Value Index (ZHVI) · local MLS median" />
              <Row label="Rental rates" value="HUD FMR · Apartment List National Rent Report" />
              <Row label="Salaries" value="BLS Occupational Employment and Wage Statistics (OEWS)" />
              <Row label="Employment data" value="BLS monthly CES release · CareerOneStop postings" />
              <Row label="Healthcare" value="HRSA Area Health Resource Files · CMS hospital compare" />
              <Row label="Environment" value="EPA AirNow annual AQI summary · NLCD land cover" />
              <Row label="Tax rates" value="Tax Foundation state-local tax burden estimates · IRS SOI" />
              <Row label="Safety" value="FBI UCR / NIBRS · city open-data crime portals" />
            </div>
          </div>

          <p style={{ ...S.caption, marginTop: 12 }}>
            City-level indices (TAI, HAI, EQI, TCI, PSI) are reviewed annually. Housing and salary data are updated on the schedule described in Section 4.
          </p>
        </Section>

        <div style={S.divider} />

        {/* ── 3. Scoring ──────────────────────────────────────────────────── */}
        <Section id="scoring" tag="Section 3" title="Scoring Formula">
          <p style={S.body}>
            The Lakive Fit Score is a composite of two sub-scores: Housing Affordability and City Quality. Both are computed at the occupation level and property-type level; the city indices apply city-wide.
          </p>

          <div style={{ ...S.card, marginTop: 8 }}>
            <h3 style={{ ...S.h3, marginBottom: 16 }}>Score structure (Model v4)</h3>

            {/* Visual formula blocks */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
              <div style={{ background: 'rgba(20,184,166,0.07)', border: '1px solid rgba(20,184,166,0.18)', borderRadius: 10, padding: '14px 18px' }}>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', marginBottom: 8 }}>HOUSING SCORE (52% of final score)</div>
                <div style={{ color: '#14B8A6', fontSize: 14, fontWeight: 700, fontFamily: 'monospace', marginBottom: 6 }}>
                  housingScore = hpiScore × 0.55 + rpiScore × 0.45
                </div>
                <div style={{ color: 'rgba(255,255,255,0.40)', fontSize: 12, lineHeight: 1.7 }}>
                  hpiScore: 92 (≤6 yrs) → 82 (≤8) → 70 (≤10) → 58 (≤12) → 45 (≤16) → 30 ({'>'} 16)<br />
                  rpiScore: 90 ({'<'}25%) → 82 ({'<'}30%) → 72 ({'<'}35%) → 60 ({'<'}40%) → 48 ({'<'}45%) → 35 (≥45%)
                </div>
              </div>

              <div style={{ background: 'rgba(96,165,250,0.07)', border: '1px solid rgba(96,165,250,0.18)', borderRadius: 10, padding: '14px 18px' }}>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', marginBottom: 8 }}>CITY SCORE (48% of final score)</div>
                <div style={{ color: '#60A5FA', fontSize: 14, fontWeight: 700, fontFamily: 'monospace', marginBottom: 6 }}>
                  cityScore = EOI×0.22 + TAI×0.20 + HAI×0.20 + EQI×0.14 + TCI×0.12 + PSI×0.12
                </div>
                <div style={{ color: 'rgba(255,255,255,0.40)', fontSize: 12, lineHeight: 1.7 }}>
                  EOI is the only index that varies by occupation — the others are city-wide constants.
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, padding: '14px 18px' }}>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', marginBottom: 8 }}>FINAL SCORE</div>
                <div style={{ color: 'white', fontSize: 14, fontWeight: 700, fontFamily: 'monospace', marginBottom: 6 }}>
                  fitScore = round(housingScore × 0.52 + cityScore × 0.48)
                </div>
                <div style={{ color: 'rgba(255,255,255,0.40)', fontSize: 12 }}>
                  Clamped to [10, 99]. A score of 10 indicates severe housing or city pressure; 99 indicates ideal conditions for that occupation in that city.
                </div>
              </div>
            </div>

            <p style={{ ...S.caption, marginTop: 16 }}>
              Score weights reflect the view that housing affordability is the primary reason people leave a city, while city quality determines whether they want to stay once they can afford to. We do not publish the precise sub-weights of the six city indices to avoid gaming. The direction of each index is unambiguous: higher EOI / TAI / HAI / EQI / TCI / PSI always improves the score.
            </p>
          </div>

          <div style={{ ...S.card, marginTop: 12 }}>
            <h3 style={{ ...S.h3, marginBottom: 8 }}>Score interpretation</h3>
            <div style={{ display: 'flex', flexDirection: 'column' as const }}>
              <Row label="85 – 99" value={<span style={S.teal}>Highly Recommended — strong affordability and city quality for this occupation</span>} />
              <Row label="70 – 84" value={<span style={{ color: '#10B981' }}>Recommended — good overall balance; may carry housing pressure caveat</span>} />
              <Row label="55 – 69" value={<span style={S.amber}>Moderate — viable but requires planning; likely elevated housing cost</span>} />
              <Row label="40 – 54" value={<span style={S.red}>Challenging — significant housing or city-quality constraints</span>} />
              <Row label="10 – 39" value={<span style={{ color: '#EF4444' }}>Not Recommended — severe affordability or opportunity mismatch</span>} />
            </div>
          </div>
        </Section>

        <div style={S.divider} />

        {/* ── 4. Update Schedule ──────────────────────────────────────────── */}
        <Section id="updates" tag="Section 4" title="Update Schedule">
          <p style={S.body}>
            Lakive follows official release calendars wherever possible. Scores are recalculated after each data update — there is no manual override of individual city scores between scheduled updates.
          </p>

          <div style={{ ...S.card, marginTop: 8 }}>
            <div style={{ display: 'flex', flexDirection: 'column' as const }}>
              <Row label="LFS / BLS monthly" value="Second Friday of each month (CA) · Third Friday of each month (US). Employment, unemployment rate, and labour force participation." />
              <Row label="Housing prices" value="CMHC: monthly, ~15th of following month. Zillow ZHVI: monthly, ~mid-month. CREA MLS HPI: monthly, ~15th of following month." />
              <Row label="Rental rates" value="Rentals.ca: monthly National Rent Report, ~end of following month. HUD FMR: annually, October. Apartment List: monthly." />
              <Row label="City indices" value="TAI, HAI, EQI, TCI, PSI: annually, Q1 of each year (January – March), incorporating prior-year data." />
              <Row label="EOI (Employment Opportunity)" value="Annually, reviewed with LFS Annual Survey data. Significant sector shifts may trigger interim updates." />
              <Row label="Fit scores" value="Recalculated automatically whenever an underlying data input changes. No scheduled cadence — always reflect the latest available data." />
            </div>
          </div>
        </Section>

        <div style={S.divider} />

        {/* ── 5. Limitations ──────────────────────────────────────────────── */}
        <Section id="limitations" tag="Section 5" title="Model Limitations">
          <p style={S.body}>
            No model captures everything. The following are known structural limitations of the current version. We prefer to be explicit about them rather than let users discover them accidentally.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, marginTop: 8 }}>
            {[
              {
                title: 'Single benchmark property type',
                body: 'HPI Years uses one property benchmark per city — a 2-bedroom condo composite in most Canadian cities, or ZHVI for a given tier in US cities. It does not reflect the full spread of prices within a city. Neighbourhoods vary widely.',
              },
              {
                title: 'Pre-tax salary denominator',
                body: 'RPI and HPI Years use gross annual salary. After-tax take-home varies by province / state and individual circumstances. The TCI index partially accounts for tax burden at the city level, but individual tax situations differ.',
              },
              {
                title: 'No household-size adjustment',
                body: 'All indicators assume a single earner. Dual-income households, families with dependants, and single parents face materially different affordability curves that the model does not capture.',
              },
              {
                title: 'EOI is qualitative and lagged',
                body: 'The Employment Opportunity Index is the only index not derived from a formula. It is based on sector analysis and reviewed annually. Sudden sector expansions or contractions (e.g. tech layoffs, new facility announcements) may not be reflected until the next annual update.',
              },
              {
                title: 'No personal circumstances',
                body: 'The model does not account for immigration status, prior local work experience, language proficiency, professional licensing portability, or personal credit history — all of which materially affect housing access and job placement.',
              },
              {
                title: 'City-level aggregation',
                body: 'All indices are city-level averages. Within a city, neighbourhood quality, micro-market rental rates, and local employer concentration vary substantially. The score should be read as a city-level signal, not a neighbourhood-level one.',
              },
              {
                title: 'Data lags',
                body: 'Official statistics are published with a lag of 4–8 weeks for monthly data and up to 12 months for annual data (crime, healthcare). Scores may not reflect very recent market shifts (e.g. a sudden rate change or economic shock).',
              },
            ].map(({ title, body }) => (
              <div key={title} style={S.card}>
                <h3 style={{ ...S.h3, marginBottom: 6 }}>⚠ {title}</h3>
                <p style={S.body}>{body}</p>
              </div>
            ))}
          </div>
        </Section>

        <div style={S.divider} />

        {/* ── 6. Version History ──────────────────────────────────────────── */}
        <Section id="versions" tag="Section 6" title="Version History">
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, marginTop: 4 }}>
            {[
              {
                version: 'Model v4 · Oct 2026',
                changes: 'Current version. Single Source of Truth refactor: all scores computed from lib/fit-engine.ts; FIT_MATRIX (hardcoded values) fully removed. Housing weight raised to 52% (from 50%). RPI score table re-anchored to 35% threshold.',
              },
              {
                version: 'Model v3 · Jul 2026',
                changes: 'Added US city coverage (11 cities). EOI_MATRIX extended to US markets. BLS OES substituted for LFS for US occupation salaries. Zillow ZHVI integrated as housing price source.',
              },
              {
                version: 'Model v2 · Mar 2026',
                changes: 'Split housing score into HPI Years (purchase) and RPI % (rental), weighted separately. Introduced property-type selector (1BR / 2BR / 3BR / Townhouse / Detached). Added price-adjustment scenario multipliers.',
              },
              {
                version: 'Model v1 · Jan 2026',
                changes: 'Initial launch. Single housing affordability metric (price-to-income ratio). Five Canadian cities. City score based on four indices (TAI, HAI, EQI, PSI only).',
              },
            ].map(({ version, changes }) => (
              <div key={version} style={{ display: 'flex', gap: 20, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: '#14B8A6', fontSize: 13, fontWeight: 700, minWidth: 160, flexShrink: 0 }}>{version}</span>
                <span style={{ color: 'rgba(255,255,255,0.50)', fontSize: 13, lineHeight: 1.7 }}>{changes}</span>
              </div>
            ))}
          </div>
        </Section>

        <div style={S.divider} />

        {/* ── Footer nav ──────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={S.caption}>
            Questions or corrections → <a href="mailto:hello@lakive.com" style={{ color: '#4F8EF7' }}>hello@lakive.com</a><br />
            Last updated: October 2026 · Lakive City Intelligence Platform v5.0
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/ranking" style={{ color: '#60A5FA', fontSize: 13, textDecoration: 'none' }}>Rankings →</Link>
            <Link href="/guide" style={{ color: '#60A5FA', fontSize: 13, textDecoration: 'none' }}>Career Guides →</Link>
          </div>
        </div>

      </div>
    </main>
  )
}
