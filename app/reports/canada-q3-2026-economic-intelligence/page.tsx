'use client'
import Link from 'next/link'
import ShareBar from '@/components/ShareBar'

const NAVY  = '#0d1f44'
const TEAL  = '#14B8A6'
const BLUE  = '#4F8EF7'
const GRN   = '#059669'
const RED   = '#DC2626'
const AMBER = '#D97706'
const GREY  = '#64748B'
const ORG   = '#E86C2F'

function SectionHeading({ num, title }: { num: number; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '52px 0 18px' }}>
      <div style={{ width: 4, height: 30, borderRadius: 2, background: TEAL, flexShrink: 0 }} />
      <h2 style={{ fontSize: 22, fontWeight: 800, color: NAVY, margin: 0 }}>
        {num}. {title}
      </h2>
    </div>
  )
}

function SubHeading({ title }: { title: string }) {
  return <h3 style={{ fontSize: 17, fontWeight: 700, color: NAVY, margin: '28px 0 10px' }}>{title}</h3>
}

function Body({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, margin: '0 0 16px' }}>{children}</p>
}

function Callout({ label, text, color = TEAL, bg = '#F0FDFA' }: { label: string; text: string; color?: string; bg?: string }) {
  return (
    <div style={{ borderLeft: `4px solid ${color}`, background: bg, padding: '12px 18px', borderRadius: '0 8px 8px 0', margin: '18px 0' }}>
      <span style={{ fontWeight: 700, color, fontSize: 14 }}>{label} </span>
      <span style={{ fontSize: 14, color: '#1F2937', lineHeight: 1.7 }}>{text}</span>
    </div>
  )
}

function Source({ text }: { text: string }) {
  return <p style={{ fontSize: 12, color: GREY, fontStyle: 'italic', margin: '-8px 0 16px' }}>{text}</p>
}

// ── Dashboard KPI table ───────────────────────────────────────────────────────
function KpiDashboard() {
  const rows = [
    { label: 'Real GDP Growth (Q4 2025)', value: '−0.6%\nannualized', signal: 'Weaker-than-expected quarter driven by inventory drawdowns and residential investment decline', color: RED },
    { label: 'Real GDP Growth (Q1 2026)', value: '−0.1% initial\nrevised +0.3%', signal: 'Initially reported as a marginal contraction; Statistics Canada revision shifted Q1 to slight growth', color: AMBER },
    { label: 'Real GDP Growth (Q2 2026)', value: '+3.3%\nannualized', signal: 'Sharp rebound; strongest quarterly pace since early 2023; exports surge +15.1% q/q annualized', color: GRN },
    { label: 'GDP Forecast FY 2026', value: '~0.7–1.1%', signal: 'BoC July MPR: 0.7% / Private-sector consensus: ~1.1% — significant downward revision from pre-tariff projections', color: AMBER },
    { label: 'Unemployment Rate (Aug 2026)', value: '6.4%', signal: 'Down from 6.9% peak (April 2026) — remains above the ~5.0% pre-pandemic norm', color: AMBER },
    { label: 'Youth Unemployment (Aug 2026)', value: '12.9%', signal: 'Approximately 2× the national average; peaked at 13.8% in March 2026', color: RED },
    { label: 'BoC Policy Rate (Sep 2, 2026)', value: '2.25%', signal: 'Held for seventh consecutive decision; next announcement October 28, 2026', color: AMBER },
    { label: 'CPI Inflation (Jul 2026)', value: '3.0%', signal: 'Above 2% target; upward pressure from energy costs and import tariffs', color: RED },
    { label: 'CREA National Benchmark (Jul 2026)', value: 'CAD $710,000', signal: 'Down ~1.1% YoY — significant city-level dispersion; Toronto and Vancouver remain above $1M', color: GREY },
    { label: 'Mortgage Payment / Income (Q2 2026)', value: '51.1%', signal: '10th consecutive quarterly improvement; historical average ~35%; improvement pace remains slow', color: AMBER },
    { label: 'National Avg. Asking Rent (Jul 2026)', value: 'CAD $2,012', signal: 'Down 3.8% YoY — 22nd consecutive month of decline; vacancy rate rising', color: GRN },
    { label: 'Permanent Resident Target 2026', value: '380,000', signal: 'Per 2026–2028 Levels Plan; down from 2024 peak; composition shift toward economic categories', color: GREY },
  ]
  return (
    <div style={{ overflowX: 'auto', margin: '20px 0 32px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: NAVY }}>
            <th style={{ padding: '11px 14px', textAlign: 'left', color: '#fff', fontWeight: 700 }}>Indicator</th>
            <th style={{ padding: '11px 14px', textAlign: 'center', color: '#fff', fontWeight: 700, whiteSpace: 'nowrap' }}>Reading</th>
            <th style={{ padding: '11px 14px', textAlign: 'left', color: '#fff', fontWeight: 700 }}>Context</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.label} style={{ background: i % 2 === 0 ? '#F8FAFC' : '#fff' }}>
              <td style={{ padding: '9px 14px', color: '#374151', borderBottom: '1px solid #E5E7EB', fontWeight: 500 }}>{r.label}</td>
              <td style={{ padding: '9px 14px', textAlign: 'center', fontWeight: 800, color: NAVY, borderBottom: '1px solid #E5E7EB', whiteSpace: 'pre-line', fontSize: 13 }}>{r.value}</td>
              <td style={{ padding: '9px 14px', color: r.color, borderBottom: '1px solid #E5E7EB', fontSize: 13 }}>{r.signal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── City Intelligence Matrix (11 cities; HEY; RPI%) ───────────────────────────
function CityMatrix() {
  const rows = [
    { city: 'Calgary',    province: 'AB', gdp: '▲ Resilient', unemp: '5.8%', hey: '2.5–22 yrs', rpi: '24%', tai: 90, outlook: 'Among the more favourable combined scores in Lakive\'s assessment — no PST, energy sector support, relatively lower housing cost pressure', heyCol: GRN,   rpiCol: GRN   },
    { city: 'Edmonton',   province: 'AB', gdp: '▲ Resilient', unemp: '5.5%', hey: '2.8–23 yrs', rpi: '26%', tai: 90, outlook: 'Comparable TAI advantage to Calgary; lower average housing entry costs; relatively underweighted in institutional location discussions', heyCol: GRN,   rpiCol: GRN   },
    { city: 'Ottawa',     province: 'ON', gdp: '— Stable',    unemp: '5.6%', hey: '3.0–26 yrs', rpi: '28%', tai: 68, outlook: 'Federal sector provides relative insulation from private-sector cyclicality; labour market comparatively resilient to macro softening', heyCol: GRN,   rpiCol: GRN   },
    { city: 'Winnipeg',   province: 'MB', gdp: '— Stable',    unemp: '5.9%', hey: '2.2–20 yrs', rpi: '22%', tai: 65, outlook: 'Lowest housing cost pressure among tracked cities; limited upside but meaningful structural stability', heyCol: GRN,   rpiCol: GRN   },
    { city: 'Quebec City',province: 'QC', gdp: '— Stable',    unemp: '5.4%', hey: '2.0–18 yrs', rpi: '26%', tai: 38, outlook: 'Lowest HEY nationally; primarily francophone labour market limits cross-provincial talent mobility; lower TAI reflects QST structure', heyCol: GRN,   rpiCol: GRN   },
    { city: 'Montréal',   province: 'QC', gdp: '▼ Softening', unemp: '6.1%', hey: '2.6–23 yrs', rpi: '34%', tai: 42, outlook: 'More affordable than Toronto and Vancouver; QST burden reduces TAI; bilingual talent pool is a B2B structural consideration', heyCol: GRN,   rpiCol: GRN   },
    { city: 'Hamilton',   province: 'ON', gdp: '— Stable',    unemp: '6.3%', hey: '3.2–27 yrs', rpi: '31%', tai: 68, outlook: 'Lower entry costs than Toronto metro with partial access to GTA employment base; manufacturing-sector exposure adds cyclical risk', heyCol: AMBER, rpiCol: GRN   },
    { city: 'Kitchener-Waterloo', province: 'ON', gdp: '— Stable', unemp: '6.0%', hey: '3.5–28 yrs', rpi: '30%', tai: 68, outlook: 'Tech corridor anchored by University of Waterloo talent pipeline; growing employer base in AI and advanced manufacturing', heyCol: AMBER, rpiCol: GRN   },
    { city: 'Halifax',    province: 'NS', gdp: '— Stable',    unemp: '6.0%', hey: '3.2–28 yrs', rpi: '29%', tai: 55, outlook: 'Atlantic Canada\'s largest market; population growth stabilizing after post-pandemic in-migration surge', heyCol: AMBER, rpiCol: GRN   },
    { city: 'Toronto',    province: 'ON', gdp: '▼ Softening', unemp: '6.9%', hey: '4.5–39 yrs', rpi: '49%', tai: 68, outlook: 'High employment concentration (EOI 92 in Lakive model) alongside persistent housing pressure; talent attraction and retention remain structurally challenging', heyCol: AMBER, rpiCol: AMBER },
    { city: 'Vancouver',  province: 'BC', gdp: '▼ Softening', unemp: '6.2%', hey: '5.5–42 yrs', rpi: '52%', tai: 72, outlook: 'Highest HEY among tracked cities; rental costs declining but ownership remains structurally inaccessible for most income groups', heyCol: RED,   rpiCol: RED   },
  ]
  return (
    <div style={{ overflowX: 'auto', margin: '16px 0 8px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: NAVY }}>
            {['City', 'GDP Trend', 'Unemp.', 'HEY Range', 'RPI', 'Tax Index', 'Q3 Assessment'].map(h => (
              <th key={h} style={{ padding: '10px 12px', textAlign: h === 'City' || h === 'Q3 Assessment' ? 'left' : 'center', color: '#fff', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.city} style={{ background: i % 2 === 0 ? '#F8FAFC' : '#fff' }}>
              <td style={{ padding: '9px 12px', borderBottom: '1px solid #E5E7EB' }}>
                <span style={{ fontWeight: 700, color: NAVY }}>{r.city}</span>
                <br /><span style={{ fontSize: 11, color: GREY }}>{r.province}</span>
              </td>
              <td style={{ padding: '9px 12px', textAlign: 'center', color: r.gdp.startsWith('▲') ? GRN : r.gdp.startsWith('▼') ? RED : GREY, fontWeight: 600, borderBottom: '1px solid #E5E7EB', fontSize: 12 }}>{r.gdp}</td>
              <td style={{ padding: '9px 12px', textAlign: 'center', fontWeight: 700, color: NAVY, borderBottom: '1px solid #E5E7EB' }}>{r.unemp}</td>
              <td style={{ padding: '9px 12px', textAlign: 'center', color: r.heyCol, fontWeight: 600, borderBottom: '1px solid #E5E7EB' }}>{r.hey}</td>
              <td style={{ padding: '9px 12px', textAlign: 'center', fontWeight: 700, color: r.rpiCol, borderBottom: '1px solid #E5E7EB' }}>{r.rpi}</td>
              <td style={{ padding: '9px 12px', textAlign: 'center', fontWeight: 700, color: r.tai >= 80 ? GRN : r.tai >= 60 ? AMBER : RED, borderBottom: '1px solid #E5E7EB' }}>{r.tai}</td>
              <td style={{ padding: '9px 12px', color: '#374151', borderBottom: '1px solid #E5E7EB', fontSize: 12, lineHeight: 1.5 }}>{r.outlook}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 11, color: GREY, marginTop: 8 }}>
        HEY = Housing Entry Years — years of gross income required to purchase median property (range: lowest-pressure to highest-pressure occupation). RPI = rent as % of median monthly gross income. Tax Index = Lakive Tax Advantage Index (0–100). Victoria omitted this edition (limited Q3 institutional data coverage; to be included in Q4). Source: Lakive Methodology v4.0, Statistics Canada, CREA, Rentals.ca (Q3 2026).
      </p>
    </div>
  )
}

// ── Recommendations table ─────────────────────────────────────────────────────
function RecommendationsTable() {
  const rows = [
    { actor: 'Federal Government', rec: 'Housing supply targets are ambitious — achieving 500,000 starts annually within a decade would require significant construction workforce expansion. Evidence from current start rates (~239,000 annualized as of mid-2026) suggests the gap between target and trajectory is substantial; workforce and financing bottlenecks warrant dedicated policy attention.' },
    { actor: 'Federal Government', rec: 'The 2026–2028 immigration levels plan shifts toward skill-category targeting. Evidence from previous high-volume periods suggests mismatches between intake composition and available roles contributed to elevated youth unemployment; continued monitoring of occupation-level outcomes may inform future calibration.' },
    { actor: 'Provincial Governments', rec: 'Municipal zoning frameworks are widely cited as a primary constraint on housing supply growth in Vancouver and Toronto. Recent as-of-right zoning changes and secondary-suite reforms represent steps in a direction analysts have identified; pace and scope of adoption across municipalities vary considerably.' },
    { actor: 'Bank of Canada', rec: 'Business investment data through mid-2026 remains subdued. Some analysts note that forward guidance on rate paths, conditional on inflation progress, could reduce planning uncertainty for capital-intensive sectors — though the BoC has not signalled any imminent directional shift.' },
    { actor: 'Employers / HR Leaders', rec: 'Lakive data indicates meaningfully lower housing cost burdens and comparable talent availability in Calgary and Edmonton relative to Toronto for a range of professional roles. Location decisions involve trade-offs across talent pipeline depth, client proximity, and total compensation structure; these factors vary by sector and function.' },
    { actor: 'Institutional Investors', rec: 'Purpose-built rental has seen rising vacancy from historic lows and moderating asking rents in 2026; structural undersupply data from CMHC and PBO suggests longer-term demand remains intact in most major markets. Asset-class assessments should be evaluated in the context of local market fundamentals.' },
    { actor: 'Workforce / Talent', rec: 'Lakive\'s city fit analysis suggests that total-compensation-adjusted outcomes — accounting for housing costs, effective tax rates, and rent-to-income ratios — can differ substantially between cities even for similar roles. City selection increasingly warrants explicit financial modelling rather than salary comparison alone.' },
  ]
  return (
    <div style={{ overflowX: 'auto', margin: '16px 0 32px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: NAVY }}>
            <th style={{ padding: '10px 14px', textAlign: 'left', color: '#fff', fontWeight: 700, width: '20%' }}>Stakeholder</th>
            <th style={{ padding: '10px 14px', textAlign: 'left', color: '#fff', fontWeight: 700 }}>Consideration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#F0FDFA' : '#fff' }}>
              <td style={{ padding: '10px 14px', fontWeight: 700, color: TEAL, borderBottom: '1px solid #E5E7EB', verticalAlign: 'top' }}>{r.actor}</td>
              <td style={{ padding: '10px 14px', color: '#374151', borderBottom: '1px solid #E5E7EB', lineHeight: 1.7 }}>{r.rec}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Q3Report() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div style={{ background: NAVY, padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            <span style={{ background: 'rgba(20,184,166,0.18)', color: TEAL, fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20, letterSpacing: 1 }}>QUARTERLY INTELLIGENCE REPORT</span>
            <span style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20 }}>Q3 2026</span>
            <span style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20 }}>B2B / INSTITUTIONAL</span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', margin: '0 0 14px', lineHeight: 1.25 }}>
            Canada Economic Intelligence Report<br />
            <span style={{ color: TEAL }}>Q3 2026</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 680, margin: '0 0 28px' }}>
            A structural analysis of Canada&apos;s economic trajectory in 2026 — near-recessionary weakness, a Q2 rebound, persistent housing affordability challenges, an elevated youth unemployment rate, and the policy directions aimed at medium-term structural improvement.
          </p>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { label: 'GDP Forecast', val: '~0.7–1.1%', sub: 'FY 2026 — BoC / private sector' },
              { label: 'Unemployment', val: '6.4%', sub: 'Aug 2026 — above pre-pandemic norm' },
              { label: 'Youth Jobless', val: '12.9%', sub: 'Aug 2026 — approx. 2× national avg' },
              { label: 'Mortgage Burden', val: '51.1%', sub: 'of income — Q2 2026' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 28, fontWeight: 900, color: TEAL }}>{s.val}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 840, margin: '0 auto', padding: '40px 24px 80px' }}>

        <ShareBar
          url="https://lakive.com/reports/canada-q3-2026-economic-intelligence"
          title="Canada Q3 2026 Economic Intelligence Report — Lakive"
          lang="en"
        />

        {/* ── 1. Executive Summary ──────────────────────────────────────────── */}
        <SectionHeading num={1} title="Executive Summary" />
        <Body>
          Canada&apos;s economic performance in 2025–2026 has been shaped by a convergence of structural and cyclical pressures: a sharper-than-expected slowdown in Q4 2025 (−0.6% annualized), an initially reported Q1 2026 contraction that was subsequently revised to marginal growth by Statistics Canada, followed by a strong Q2 2026 rebound (+3.3% annualized). While the near-recessionary episode appears to have been relatively brief, underlying conditions — including persistent housing unaffordability, an elevated youth unemployment rate, and subdued business investment — remain areas of concern for the medium-term outlook.
        </Body>
        <Body>
          Under Prime Minister Mark Carney, the government has introduced a supply-oriented policy agenda: a target of 500,000 new homes annually over the next decade, an immigration levels plan that reduces intake from 2024 highs while shifting composition toward economic categories, and an initiative to catalyze $1 trillion in total investment — public, private, and institutional — over five years across energy, infrastructure, and defence. The trajectory and execution timelines of these initiatives involve significant uncertainty.
        </Body>
        <Body>
          For institutional stakeholders — employers, investors, policymakers, and talent-advisory firms — this report offers a structured reading of where Canada stands at the Q3 2026 inflection point: what the data shows, how analysts interpret the structural context, and where uncertainty remains highest.
        </Body>
        <Callout
          label="Analytical Note:"
          text="Canada's economic trajectory as of Q3 2026 is characterized by a more complex picture than a simple recession or recovery label captures. Evidence suggests structural pressures — in housing, youth employment, and productivity — are likely to resolve on a multi-year timeline, even as headline macro indicators have improved in recent quarters."
          color={ORG}
          bg="#FFF7ED"
        />

        {/* ── 2. Scorecard ─────────────────────────────────────────────────── */}
        <SectionHeading num={2} title="Q3 2026 Economic Scorecard" />
        <KpiDashboard />
        <Source>Sources: Statistics Canada GDP release (Aug 28, 2026); Statistics Canada LFS (Aug 2026); Bank of Canada MPR (Jul 2026) and rate decision (Sep 2, 2026); CREA MLS HPI; Rentals.ca / Urbanation National Rent Report; NBC Housing Affordability Monitor Q2 2026; IRCC 2026–2028 Immigration Levels Plan.</Source>

        {/* ── 3. Macro ─────────────────────────────────────────────────────── */}
        <SectionHeading num={3} title="Macroeconomic Conditions: Weakness, Rebound, and Uncertainty" />
        <Body>
          Canada&apos;s GDP growth trajectory in 2025–2026 has been volatile. Q4 2025 saw an annualized contraction of 0.6%, driven primarily by inventory drawdowns and a decline in residential investment — weaker than most forecasters had expected. Q1 2026 was initially reported as a slight contraction (−0.1% annualized), briefly fuelling technical-recession discussions, but was subsequently revised by Statistics Canada to marginal growth (+0.3% q/q). Q2 2026 then delivered a stronger-than-expected rebound at +3.3% annualized, driven by a significant export surge.
        </Body>
        <Body>
          The Bank of Canada&apos;s July 2026 Monetary Policy Report projects full-year 2026 GDP growth of approximately 0.7% — a significant downward revision from pre-tariff estimates — while private-sector consensus sits closer to 1.1%. The range reflects genuine uncertainty about the duration of trade-related headwinds and the pace of recovery in business investment.
        </Body>
        <SubHeading title="The Trade Policy Context" />
        <Body>
          CUSMA (Canada–US–Mexico Agreement) is undergoing its first formal review since ratification. The US has imposed targeted tariffs on Canadian goods including steel, aluminum, and softwood lumber; Canada has responded with counter-tariffs. The Bank of Canada estimates these trade-related disruptions may be subtracting 0.3–0.5 percentage points from 2026 GDP. The Carney government has pursued trade diversification across Gulf states, UK, and EU markets, and is positioning Canada as a critical minerals supplier — the impact of these initiatives is expected to be reflected more clearly in multi-year projections than near-term data.
        </Body>
        <Callout
          label="Context:"
          text="The near-recessionary period of late 2025 / early 2026 appears to have been relatively brief based on available data through Q2. Full-year growth forecasts remain modest (0.7–1.1%), and structural factors affecting long-term potential are not resolved by near-term headline improvement."
          color={BLUE}
          bg="#EFF6FF"
        />

        {/* ── 4. Labour ────────────────────────────────────────────────────── */}
        <SectionHeading num={4} title="Labour Market: Headline Recovery and Structural Divergence" />
        <Body>
          Canada&apos;s national unemployment rate peaked at 6.9% in April 2026 and has since partially recovered to 6.4% (August 2026), remaining above the ~5.0% pre-pandemic norm. The aggregate figure, however, is consistent with significant divergence across age and demographic groups.
        </Body>
        <SubHeading title="Youth Labour Market" />
        <Body>
          The unemployment rate for workers aged 15–24 was 12.9% in August 2026, approximately twice the national average, and peaked at 13.8% in March 2026. Among Black youth specifically, the rate reached 22.6% as of July 2026 (Statistics Canada LFS). These patterns are consistent with a labour market where demand recovery is concentrated among prime-age workers (25–54) while youth entry-level opportunities remain constrained.
        </Body>
        <Callout
          label="Structural Context:"
          text="Youth unemployment has risen substantially over a multi-year period. Analysis from Indeed Hiring Lab and Statistics Canada data suggests that a growing number of post-secondary graduates are entering a market where demand for degree-requiring roles has not kept pace with graduate supply — though the relative contribution of cyclical versus structural factors to this trend is a subject of ongoing analytical debate."
          color={RED}
          bg="#FEF2F2"
        />
        <SubHeading title="Income and City Mobility" />
        <Body>
          Wage growth data through 2025 indicates that workers under 35 have seen real income growth that has generally trailed inflation relative to older cohorts — a pattern consistent with slower career progression in a tighter entry-level market. Lakive&apos;s core analytical thesis is that these conditions are among the factors contributing to increased city-mobility consideration among younger professionals, particularly from Toronto and Vancouver toward lower-cost markets.
        </Body>

        {/* ── 5. Housing ───────────────────────────────────────────────────── */}
        <SectionHeading num={5} title="Housing: Gradual Affordability Improvement, Persistent Structural Gap" />
        <SubHeading title="Benchmark Prices" />
        <Body>
          The CREA national composite benchmark sits at approximately CAD $710,000 as of July 2026, down ~1.1% year-over-year. City-level dispersion remains substantial: Greater Vancouver&apos;s MLS HPI benchmark was approximately $1,101,700 (March 2026, down ~6.7% YoY); Toronto&apos;s composite average was near $1,020,000. At these levels, a standard 25-year amortization on a median-priced Toronto or Vancouver property requires mortgage payments representing a majority of median household income.
        </Body>
        <SubHeading title="Affordability Trend" />
        <Body>
          The NBC Housing Affordability Monitor recorded the 10th consecutive quarterly improvement in Q2 2026 — the longest improvement streak on record. The mortgage payment-to-income ratio fell to 51.1%, compared to a long-run historical average of approximately 35%. The improvement trajectory is real and measurable; the gap between current levels and historical norms remains large.
        </Body>
        <Callout
          label="BoC Rate Context:"
          text="The Bank of Canada held at 2.25% on September 2, 2026. The next decision is October 28. The BoC's stated rationale cites growth improvement alongside continued inflation concerns from energy costs and tariff effects. Rate path beyond 2026 involves meaningful uncertainty."
          color={AMBER}
          bg="#FFFBEB"
        />
        <SubHeading title="The Rental Market: A Notable Area of Relief" />
        <Body>
          National average asking rents have declined for 22 consecutive months year-over-year, reaching CAD $2,012/month (July 2026, Rentals.ca / Urbanation). The national vacancy rate for purpose-built rental apartments rose to 3.1% in late 2025 from 2.2% in 2024. In Toronto and Vancouver, landlord incentives including rent-free months have become more common — a meaningful reversal from 2022–2024 market conditions.
        </Body>
        <Body>
          The reduction in non-permanent resident intake is cited by analysts as a contributor to lower rental demand, particularly in dense urban markets. The Parliamentary Budget Office has projected that the immigration reduction could narrow Canada&apos;s 2030 housing shortfall by approximately 534,000 units, while also projecting a reduction in real GDP of approximately 1.7% by 2027 — illustrating the policy trade-off involved.
        </Body>

        {/* ── 6. Immigration ───────────────────────────────────────────────── */}
        <SectionHeading num={6} title="Immigration: The 2026–2028 Recalibration" />
        <Body>
          Canada&apos;s permanent resident intake rose substantially between 2020 and 2024, reaching levels well above pre-pandemic targets. The 2026–2028 Immigration Levels Plan sets a target of 380,000 permanent residents annually, with a shift in composition toward economic categories (64% of admissions by 2027–2028, up from earlier plans).
        </Body>
        <Body>
          Analysis of this period suggests the combination of elevated intake and constrained housing supply contributed to rental demand pressure — a view consistent with CMHC and PBO research, though precise attribution of price movements to specific policy variables involves methodological complexity. Canada was building approximately 200,000–220,000 units annually during a period of elevated population growth; the gap between construction pace and demand is broadly documented.
        </Body>
        <SubHeading title="The Recalibration" />
        <Body>
          The 2026–2028 plan also reduces non-permanent resident targets, aiming to bring this population to approximately 5% of Canada&apos;s total. Rental market data through mid-2026 is consistent with a reduction in demand-side pressure in urban rental markets.
        </Body>
        <Callout
          label="Policy Trade-off:"
          text="Reduced immigration intake has associated effects on labour supply, particularly in construction, healthcare, and trades — sectors where Canada faces documented workforce gaps. The PBO's projection of a ~1.7% GDP impact by 2027 reflects this trade-off. The net effect of intake recalibration across housing, labour, and fiscal variables is an active area of policy and research discussion."
          color={ORG}
          bg="#FFF7ED"
        />

        {/* ── 7. Middle Class ──────────────────────────────────────────────── */}
        <SectionHeading num={7} title="Middle-Class Household Pressures" />
        <Body>
          Statistics Canada defines middle-class households as those earning CAD $50,300 to $113,300 after tax. Within this range, housing cost share, transportation costs, and income polarisation dynamics are documented pressures on household financial stability — particularly in Vancouver and Toronto.
        </Body>
        <Body>
          <strong>Housing cost share:</strong> In Greater Vancouver and Greater Toronto, a dual-income household earning $160,000–$180,000 combined, allocating 30% to housing costs, can service a mortgage of approximately $540,000–$600,000. The median property in both markets exceeds $900,000. This gap is structural rather than addressable through short-term income acceleration for most households.
        </Body>
        <Body>
          <strong>Transportation costs:</strong> CPI data shows gasoline prices rose approximately 33% YoY in May 2026, while vehicle insurance increased approximately 8%. For suburban households with limited transit alternatives, these represent non-discretionary cost increases occurring alongside wage growth constraints.
        </Body>
        <Body>
          <strong>Income distribution:</strong> Available data indicates that median wage growth has trailed mean wage growth on a multi-year basis, consistent with a pattern where gains are more concentrated in higher-income cohorts. The precise extent and causes of income polarisation within the middle band involve ongoing measurement debate.
        </Body>

        {/* ── 8. Root Causes ───────────────────────────────────────────────── */}
        <SectionHeading num={8} title="Structural Context: How Canada Got Here" />
        <Body>
          The pressures described in this report have accumulated over multiple policy cycles. A structural reading involves at least three overlapping periods, each of which contributed to conditions the next period had to navigate.
        </Body>
        <SubHeading title="2010–2019: Business Investment and Productivity" />
        <Body>
          Canadian productivity growth relative to the United States declined on a sustained basis through the 2010s, with business investment per worker falling in real terms. Residential investment grew as a share of GDP while business capital formation stagnated — a shift that analysts associate with a growth model increasingly dependent on population expansion and real estate appreciation rather than productivity-led income growth.
        </Body>
        <SubHeading title="2020–2022: Pandemic-Period Policy" />
        <Body>
          Emergency rate cuts to 0.25% (maintained through early 2022) combined with substantial fiscal stimulus contributed to the most rapid housing price appreciation in Canada&apos;s modern data record — national benchmark prices rising approximately 50% over 24 months. The Bank of Canada has since acknowledged, implicitly, that the rate path was held lower for longer than the subsequent recovery phase warranted. Post-pandemic immigration acceleration — motivated by documented labour gaps — took place against a housing supply environment that had not expanded proportionally.
        </Body>
        <SubHeading title="2022–2025: Rate Tightening and Market Freeze" />
        <Body>
          The Bank of Canada raised the policy rate from 0.25% to 5.00% between March 2022 and July 2023. This successfully contributed to disinflation but also produced a credit environment that significantly reduced housing transaction volumes without proportionally reducing prices — as sellers deferred sales and buyers could not qualify at higher rates. New construction investment fell as developer financing tightened, a dynamic that arguably constrained supply during a period of continued demand pressure.
        </Body>
        <Callout
          label="Structural Assessment:"
          text="Evidence across the three periods above is consistent with a view that current conditions reflect accumulated policy and structural decisions rather than a single inflection point. The Carney government's policy agenda addresses identified structural gaps; the degree to which its initiatives will achieve stated targets within the projected timelines involves execution risk that current data cannot fully resolve."
          color={NAVY}
          bg="#F1F5F9"
        />

        {/* ── 9. Outlook ───────────────────────────────────────────────────── */}
        <SectionHeading num={9} title="Forward Outlook: Q4 2026 and Into 2027" />
        <Body>
          The Q2 2026 GDP rebound reduces the probability of a prolonged contractionary period relative to earlier-year projections. Energy sector conditions, partial labour market recovery, and federal infrastructure spending commitments are among the factors supporting a baseline scenario of modest positive growth through Q4 2026.
        </Body>
        <Body>
          Full-year 2026 growth is forecast at 0.7% (BoC) to approximately 1.1% (private-sector consensus), with 2027 expected to show modest improvement as tariff-related uncertainty potentially eases. These projections carry above-average uncertainty given the live status of US trade policy discussions and the unclear pace of housing construction ramp-up.
        </Body>
        <Body>
          The 500,000-homes annual target is operating against a mid-2026 construction pace of approximately 239,000 annualized starts. Achieving the target trajectory would require a near-doubling of starts within a construction labour market that has not yet demonstrated this capacity. Municipal zoning reform, financing availability, and trades workforce supply are the variables analysts identify as primary constraints.
        </Body>
        <Body>
          Youth unemployment is expected to improve alongside broader labour market recovery, but the extent to which this constitutes cyclical recovery versus structural improvement will depend on whether entry-level demand growth tracks GDP recovery or continues to lag. Current data does not provide a clear resolution.
        </Body>

        {/* ── 10. Recommendations ──────────────────────────────────────────── */}
        <SectionHeading num={10} title="Strategic Considerations by Stakeholder" />
        <Body>
          The following is structured by stakeholder group, summarizing considerations that Lakive&apos;s data and the available macro evidence suggest are relevant to Q3–Q4 2026 decision-making. These are analytical observations, not prescriptive advice.
        </Body>
        <RecommendationsTable />

        {/* ── 11. City Intelligence ─────────────────────────────────────────── */}
        <SectionHeading num={11} title="Lakive City Intelligence: Q3 2026 Matrix" />
        <Body>
          The matrix below covers 11 of the 12 cities tracked by the Lakive platform. Victoria is omitted in this edition due to limited Q3 2026 institutional data coverage and will be included in the Q4 edition. Hamilton and Kitchener-Waterloo are presented as separate markets, reflecting distinct economic structures and labour market dynamics.
        </Body>
        <Body>
          <strong>HEY (Housing Entry Years)</strong> reflects years of gross income required to purchase the composite median property, expressed as a range from lowest-pressure to highest-pressure occupation on the Lakive platform. <strong>RPI</strong> is median rent as a percentage of median monthly gross income. <strong>Tax Index</strong> is Lakive&apos;s Tax Advantage Index (0–100), reflecting after-tax take-home relative to the national baseline.
        </Body>
        <CityMatrix />
        <Callout
          label="Lakive Q3 2026 City Assessment:"
          text="In Lakive's modelling, Calgary and Edmonton show relatively favourable combined scores across HEY, RPI, and Tax Index. Ottawa's labour market shows relative resilience to cyclical softening given its federal sector concentration. Montréal and Quebec City offer among the lower HEY values nationally, with QST burden reflected in lower Tax Index scores. Toronto and Vancouver exhibit the highest employment opportunity indices (EOI) alongside the highest housing and rent cost burdens — a trade-off that varies in significance by career stage, household structure, and sector."
          color={TEAL}
          bg="#F0FDFA"
        />

        {/* ── 12. Methodology ──────────────────────────────────────────────── */}
        <SectionHeading num={12} title="Methodology & Data Sources" />
        <Body>
          This report synthesises publicly available macroeconomic data from Statistics Canada, Bank of Canada Monetary Policy Reports and rate decisions, CREA MLS HPI publications, Rentals.ca / Urbanation National Rent Reports, Parliamentary Budget Office economic and fiscal outlook publications, and research from TD Economics, RBC Economics, and NBC Economics. GDP figures from Statistics Canada releases dated August 28, 2026 (Q2 2026) and February 27, 2026 (Q4 2025). LFS data from August 8, 2026 release.
        </Body>
        <Body>
          City-level indices use Lakive&apos;s proprietary methodology (v4.0), which weights employment opportunity, tax environment, healthcare access, environment quality, transit, safety, and education factors alongside housing affordability metrics. HEY (Housing Entry Years) and RPI (Rent Pressure Index) are Lakive-calculated composite metrics; Tax Advantage Index reflects effective provincial and federal tax modelling at median income levels by province. All figures in Canadian dollars unless marked USD.
        </Body>
        <Body>
          This report is produced for informational purposes. It does not constitute financial, investment, legal, or immigration advice. Lakive is a decision intelligence platform — not a financial advisor, real estate brokerage, or immigration consultant. Projections and assessments reflect available data as of the publication date and are subject to revision as new data becomes available.
        </Body>

        {/* ── Footer nav ────────────────────────────────────────────────────── */}
        <div style={{ borderTop: '2px solid #E5E7EB', marginTop: 48, paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <Link href="/reports" style={{ color: TEAL, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>← All Reports</Link>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/ranking" style={{ background: NAVY, color: '#fff', padding: '10px 20px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Explore Rankings</Link>
            <Link href="/calculate" style={{ background: TEAL, color: '#fff', padding: '10px 20px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Run Your Numbers</Link>
          </div>
        </div>

      </div>
    </div>
  )
}
