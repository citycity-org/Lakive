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
            We do not publish the complete scoring weights. The specific weights and calibration parameters are proprietary analytical methodology — the core of how we translate public data into actionable city intelligence. What we do publish is every indicator, its data source, and the direction of its effect on the score. That is enough to understand and challenge any result.
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
            Lakive tracks two housing-affordability metrics and six city-quality indices. The two affordability metrics are occupation-specific and property-type-specific. Five of the six city indices are city-level — they do not vary by occupation. The exception is EOI (Employment Opportunity Index), which is computed at the city × occupation level and produces a different value for each occupation in each city.
          </p>

          {/* Housing */}
          <div style={{ ...S.card, marginTop: 8 }}>
            <h3 style={{ ...S.h3, color: '#14B8A6', marginBottom: 16 }}>Housing Affordability Indicators</h3>

            <div style={{ display: 'flex', flexDirection: 'column' as const }}>
              <Row
                label="HEY — Housing Entry Years"
                value={<>Reference property price ÷ gross annual occupational income. A comparative affordability ratio — <em>how many years of full pre-tax income equals the reference price?</em> This is not a purchase timeline; it does not model savings rate, down payment, or mortgage terms. It is used cross-city to show relative purchase burden for the same occupation. (Named HPI in reports published before November 2026 — same metric, renamed for clarity.)</>}
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
                label="CA calibration baseline"
                value="CAD 75,000 — the median salary used to calibrate each city's reference HEY. Housing Entry Years for a given occupation are derived by scaling the benchmark via the ratio (benchmarkSalary ÷ occupationSalary). All 20 occupations carry explicit salary values; no occupation uses the $75K figure as a substitute."
              />
              <Row
                label="HEY Level bands"
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
                value={<>Selected property-type rent × 12 ÷ annual salary × 100. Answers: <em>what share of gross income goes to rent for the selected property type?</em> The 2BR is the base benchmark. Other types apply calibration multipliers derived from observed market relativities (1BR ≈ 0.78×, 3BR ≈ 1.35×, Townhouse ≈ 1.50×, Detached ≈ 1.65×). These multipliers are estimates, not sourced directly per city from public data — they reflect typical relative rent differentials across Canadian and US markets.</>}
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
                value="max(heyLevel, rpiLevel). The overall housing pressure rating is driven by whichever of the two dimensions is worse — you cannot escape a severe RPI with a low HEY."
              />
            </div>
          </div>

          {/* City Indices */}
          <div style={{ ...S.card, marginTop: 16 }}>
            <h3 style={{ ...S.h3, color: '#60A5FA', marginBottom: 16 }}>City Quality Indices (city-level, not occupation-specific)</h3>

            <div style={{ display: 'flex', flexDirection: 'column' as const }}>
              <Row
                label="EOI — Employment Opportunity Index"
                value="Qualitative assessment of how well the city's economic base generates demand for the specific occupation. Rated High / Mid / Low and converted to a numeric score for the composite calculation. EOI is the only index that varies by occupation — all other five are city-level constants."
                note="Only manually-set index — updated annually"
              />
              <Row
                label="TAI — Tax Advantage Index"
                value="Combined effective tax burden on median occupational income, including provincial/state income tax, sales tax, and property tax. Inverted — lower tax burden → higher TAI. Alberta's no-PST structure produces high TAI; Québec's combined QST+provincial income tax produces lower TAI."
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
                label="TCI — Transit & Connectivity Index"
                value="Composite of transit mode share, commute times, walkability, and inter-city connectivity. Sources: GTFS feeds, Census journey-to-work, Walk Score API. Higher TCI means shorter commutes and better multi-modal access."
              />
              <Row
                label="PSI — Public Safety Index"
                value="Violent crime rate and property crime rate per 100,000. Sources: Statistics Canada UCR Survey (CA), FBI UCR / NIBRS (US). Inverted — lower crime → higher index."
              />
              <Row
                label="EDI — Education Index"
                value="School quality ratings, post-secondary institution density, and literacy indicators. Displayed on city pages as a reference indicator for users evaluating family and long-term settlement decisions. EDI is informational only — it does not contribute to the composite Fit Score."
                note="Reference only · not in composite score"
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
            <h3 style={{ ...S.h3, marginBottom: 16 }}>Score structure (Model v4 / Platform v5.0)</h3>

            {/* Score structure — direction only, no exact weights */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
              <div style={{ background: 'rgba(20,184,166,0.07)', border: '1px solid rgba(20,184,166,0.18)', borderRadius: 10, padding: '14px 18px' }}>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', marginBottom: 8 }}>HOUSING SCORE — primary component</div>
                <div style={{ color: 'rgba(255,255,255,0.70)', fontSize: 13, lineHeight: 1.7 }}>
                  Derived from HEY (Housing Entry Years) and RPI %, with purchase burden weighted slightly more than rental burden. Both dimensions matter — a severe RPI cannot be offset by a low HEY, and vice versa. Housing pressure carries more weight in the final score than city quality.
                </div>
              </div>

              <div style={{ background: 'rgba(96,165,250,0.07)', border: '1px solid rgba(96,165,250,0.18)', borderRadius: 10, padding: '14px 18px' }}>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', marginBottom: 8 }}>CITY SCORE — secondary component</div>
                <div style={{ color: 'rgba(255,255,255,0.70)', fontSize: 13, lineHeight: 1.7 }}>
                  All six city indices (EOI, TAI, HAI, EQI, TCI, PSI) contribute positively — a higher value always improves the score. EOI is the only index that varies by occupation; the other five are city-wide constants. EOI, TAI (Tax Advantage), and HAI are the primary city-score drivers; EQI, TCI (Transit), and PSI contribute as secondary factors.
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, padding: '14px 18px' }}>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', marginBottom: 8 }}>WHAT WE DO NOT PUBLISH</div>
                <div style={{ color: 'rgba(255,255,255,0.70)', fontSize: 13, lineHeight: 1.7 }}>
                  The exact weights assigned to each component and sub-index are proprietary model parameters and are not published. They represent the core of our analytical methodology. The direction and ordering described above are sufficient to understand and challenge any result. For deeper questions, contact <a href="mailto:hello@lakive.com" style={{ color: '#60A5FA' }}>hello@lakive.com</a>.
                </div>
              </div>
            </div>

            <p style={{ ...S.caption, marginTop: 16 }}>
              The final score is clamped to [10, 99]. A score below 40 indicates severe housing or city-quality constraints for this occupation in this city; above 85 indicates strong conditions on both dimensions.
            </p>
          </div>

          <div style={{ ...S.card, marginTop: 12 }}>
            <h3 style={{ ...S.h3, marginBottom: 4 }}>Housing Pressure Level (separate from Fit Score)</h3>
            <p style={{ ...S.body, marginBottom: 12, fontSize: 13 }}>
              The Housing Pressure Level is derived independently from the Fit Score. It is set to <strong style={{ color: 'rgba(255,255,255,0.7)' }}>max(heyLevel, rpiLevel)</strong> — whichever of the two housing dimensions is worse. L1 means low pressure; L5 means severe. This rating appears alongside the Fit Score on city pages to flag cases where a high composite score still carries a housing burden warning.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' as const }}>
              <Row label="L1" value={<span style={S.teal}>Low Pressure — both HEY and RPI within comfortable range</span>} />
              <Row label="L2" value={<span style={{ color: '#10B981' }}>Manageable — affordable with standard financial planning</span>} />
              <Row label="L3" value={<span style={S.amber}>Under Pressure — elevated housing cost; detailed budgeting required</span>} />
              <Row label="L4" value={<span style={S.red}>High Pressure — significant housing burden for this occupation</span>} />
              <Row label="L5" value={<span style={{ color: '#EF4444' }}>Severe — housing cost is a dominant constraint</span>} />
            </div>
          </div>

          <div style={{ ...S.card, marginTop: 12 }}>
            <h3 style={{ ...S.h3, marginBottom: 4 }}>Fit Score interpretation (10 – 99)</h3>
            <p style={{ ...S.body, marginBottom: 12, fontSize: 13 }}>
              The Fit Score is the composite of Housing Score and City Score described above. It reflects both housing affordability and city-quality conditions for a given occupation.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' as const }}>
              <Row label="85 – 99" value={<span style={S.teal}>Strong — affordability and city quality both favourable for this occupation</span>} />
              <Row label="70 – 84" value={<span style={{ color: '#10B981' }}>Good — solid overall balance; minor housing or city caveat possible</span>} />
              <Row label="55 – 69" value={<span style={S.amber}>Moderate — viable but elevated housing cost or weaker city conditions</span>} />
              <Row label="40 – 54" value={<span style={S.red}>Challenging — significant housing or city-quality constraints</span>} />
              <Row label="10 – 39" value={<span style={{ color: '#EF4444' }}>Severe — strong affordability or opportunity mismatch</span>} />
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
              <Row label="City indices" value="TAI (Tax), HAI, EQI, TCI (Transit), PSI: annually, Q1 of each year (January – March), incorporating prior-year data." />
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
                body: 'HEY (Housing Entry Years) uses one property benchmark per city — a 2-bedroom condo composite in most Canadian cities, or ZHVI for a given tier in US cities. It does not reflect the full spread of prices within a city. Neighbourhoods vary widely.',
              },
              {
                title: 'Pre-tax salary denominator',
                body: 'RPI and HEY (Housing Entry Years) use gross annual salary. After-tax take-home varies by province / state and individual circumstances. The TAI index partially accounts for tax burden at the city level, but individual tax situations differ.',
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
                version: 'Model v4 / Platform v5.0 · Oct 2026',
                changes: 'Current version. Single Source of Truth refactor: all real-occupation scores computed from a central engine (lib/fit-engine.ts); static hardcoded data eliminated for all cities with live benchmark data. Housing affordability component weight increased relative to v3. RPI threshold re-calibrated. Expanded occupation coverage from 8 to 20 real occupation types.',
              },
              {
                version: 'Model v3 · Jul 2026',
                changes: 'Added US city coverage (11 cities). EOI_MATRIX extended to US markets. BLS OES substituted for LFS for US occupation salaries. Zillow ZHVI integrated as housing price source.',
              },
              {
                version: 'Model v2 · Mar 2026',
                changes: 'Split housing score into two dimensions: HEY/Housing Entry Years (purchase burden) and RPI % (rental burden). Introduced property-type selector (1BR / 2BR / 3BR / Townhouse / Detached). Added price-adjustment scenario multipliers. (Metric previously labelled HPI Years — same calculation, renamed Nov 2026.)',
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
