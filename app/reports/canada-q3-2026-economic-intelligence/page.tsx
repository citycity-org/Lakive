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
    { label: 'Real GDP Growth (Q1 2026)', value: '−0.1%', signal: 'Technical recession: 2nd consecutive quarter of contraction', color: RED },
    { label: 'GDP Forecast FY 2026', value: '1.1–1.5%', signal: 'Bank of Canada / IMF consensus — weakest non-recession pace in a decade', color: AMBER },
    { label: 'Unemployment Rate (Aug 2026)', value: '6.4%', signal: '▼ from 6.9% peak (April) · still elevated vs. 5.0% pre-pandemic norm', color: AMBER },
    { label: 'Youth Unemployment (Aug 2026)', value: '12.9%', signal: '2.0× the national average · teen rate hit 20.2% in Q1 — recession-level', color: RED },
    { label: 'BoC Policy Rate', value: '2.25%', signal: 'Held 7th consecutive decision · no cuts expected before 2027', color: AMBER },
    { label: 'CPI Inflation (Jul 2026)', value: '3.0%', signal: '▲ above target · tariff & energy pressure · BoC inflation warning issued', color: RED },
    { label: 'CREA National Benchmark (Jul 2026)', value: 'CAD $710,000', signal: '▼ 1.1% YoY · no broad recovery · Toronto & Vancouver still above $1M', color: GREY },
    { label: 'Mortgage Payment / Income (Q2 2026)', value: '51.1%', signal: '10th consecutive quarterly improvement · still far above healthy 30% threshold', color: AMBER },
    { label: 'National Avg. Asking Rent (Jul 2026)', value: 'CAD $2,012', signal: '▼ 3.8% YoY · 22nd consecutive month of decline · vacancy rising', color: GRN },
    { label: 'Permanent Resident Target 2026', value: '380,000', signal: '▼ from 464,265 (2024 peak) · largest intake correction in 30 years', color: GREY },
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
              <td style={{ padding: '9px 14px', textAlign: 'center', fontWeight: 800, color: NAVY, borderBottom: '1px solid #E5E7EB', whiteSpace: 'nowrap' }}>{r.value}</td>
              <td style={{ padding: '9px 14px', color: r.color, borderBottom: '1px solid #E5E7EB', fontSize: 13 }}>{r.signal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── City Intelligence Matrix ───────────────────────────────────────────────────
function CityMatrix() {
  const rows = [
    { city: 'Calgary', province: 'AB', gdp: '▲ Resilient', unemp: '5.8%', hpi: '2.5–22 yrs', rpi: 24, tai: 90, outlook: 'Strongest structural position — no PST, energy sector recovery, lowest housing pressure', scoreCol: GRN, rpiCol: GRN },
    { city: 'Edmonton', province: 'AB', gdp: '▲ Resilient', unemp: '5.5%', hpi: '2.8–23 yrs', rpi: 26, tai: 90, outlook: 'Underrated value — equivalent TAI advantage to Calgary, lower housing entry point', scoreCol: GRN, rpiCol: GRN },
    { city: 'Ottawa', province: 'ON', gdp: '— Stable', unemp: '5.6%', hpi: '3.0–26 yrs', rpi: 28, tai: 68, outlook: 'Federal sector insulates from private-sector volatility — most recession-resistant labour market', scoreCol: GRN, rpiCol: GRN },
    { city: 'Winnipeg', province: 'MB', gdp: '— Stable', unemp: '5.9%', hpi: '2.2–20 yrs', rpi: 22, tai: 65, outlook: 'Lowest housing pressure nationally — limited upside but strong floor', scoreCol: GRN, rpiCol: GRN },
    { city: 'Montréal', province: 'QC', gdp: '▼ Softening', unemp: '6.1%', hpi: '2.6–23 yrs', rpi: 34, tai: 42, outlook: 'Affordable but high QST burden — bilingual talent pool is a structural advantage for B2B', scoreCol: AMBER, rpiCol: GRN },
    { city: 'Hamilton / KW', province: 'ON', gdp: '— Stable', unemp: '6.2%', hpi: '3.5–28 yrs', rpi: 30, tai: 68, outlook: 'Tech corridor with lower entry costs than Toronto — University of Waterloo talent pipeline intact', scoreCol: AMBER, rpiCol: GRN },
    { city: 'Halifax', province: 'NS', gdp: '— Stable', unemp: '6.0%', hpi: '3.2–28 yrs', rpi: 29, tai: 55, outlook: 'Atlantic Canada recovery story — population growth stabilizing after post-pandemic surge', scoreCol: AMBER, rpiCol: GRN },
    { city: 'Toronto', province: 'ON', gdp: '▼ Softening', unemp: '6.9%', hpi: '4.5–39 yrs', rpi: 49, tai: 68, outlook: 'Highest employment density nationally (EOI 92) — persistent housing pressure limits talent retention', scoreCol: AMBER, rpiCol: AMBER },
    { city: 'Vancouver', province: 'BC', gdp: '▼ Softening', unemp: '6.2%', hpi: '5.5–42 yrs', rpi: 52, tai: 72, outlook: 'Most housing-stressed major city — rent declining but ownership remains structurally inaccessible', scoreCol: RED, rpiCol: RED },
  ]
  return (
    <div style={{ overflowX: 'auto', margin: '16px 0 32px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: NAVY }}>
            {['City', 'GDP Trend', 'Unemp.', 'HPI Range', 'RPI', 'Tax Index', 'Q3 Assessment'].map(h => (
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
              <td style={{ padding: '9px 12px', textAlign: 'center', color: NAVY, borderBottom: '1px solid #E5E7EB' }}>{r.hpi}</td>
              <td style={{ padding: '9px 12px', textAlign: 'center', fontWeight: 700, color: r.rpiCol, borderBottom: '1px solid #E5E7EB' }}>{r.rpi}</td>
              <td style={{ padding: '9px 12px', textAlign: 'center', fontWeight: 700, color: r.tai >= 80 ? GRN : r.tai >= 60 ? AMBER : RED, borderBottom: '1px solid #E5E7EB' }}>{r.tai}</td>
              <td style={{ padding: '9px 12px', color: '#374151', borderBottom: '1px solid #E5E7EB', fontSize: 12, lineHeight: 1.5 }}>{r.outlook}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 11, color: GREY, marginTop: 8 }}>HPI = years of gross income required to purchase median property (range: lowest-pressure occupation to highest-pressure). RPI = rent as % of median monthly income. TAI = Tax Advantage Index (0–100). Source: Lakive Methodology v4.0, Statistics Canada, CREA, Rentals.ca (Q3 2026).</p>
    </div>
  )
}

// ── Recommendations table ─────────────────────────────────────────────────────
function RecommendationsTable() {
  const rows = [
    { actor: 'Federal Government', rec: 'Accelerate housing supply targets — the 500,000 homes/year goal requires construction workforce investment now. Current trades capacity supports roughly 240,000 starts annually.' },
    { actor: 'Federal Government', rec: 'Rebalance immigration intake toward trades, healthcare, and STEM — not population volume alone. Skill-matching reduces structural unemployment and addresses supply bottlenecks simultaneously.' },
    { actor: 'Provincial Governments', rec: 'Fast-track municipal zoning reform. Vancouver and Toronto\'s housing crises are principally supply-side failures driven by local zoning restrictions that federal targets cannot override.' },
    { actor: 'Bank of Canada', rec: 'Signal a conditional 2027 rate path. Business investment has stalled under rate uncertainty. A credible disinflation roadmap would unlock deferred capital spending more effectively than any rate cut alone.' },
    { actor: 'Employers / HR Leaders', rec: 'Recalibrate talent location strategy. Calgary and Edmonton offer equivalent labour pools to Toronto for most professional roles at 30–40% lower total compensation cost. Hybrid work makes geography a choice, not a constraint.' },
    { actor: 'Institutional Investors', rec: 'Purpose-built rental remains the most defensible asset class in 2026. Vacancy rates rising from historic lows, rent moderation ongoing — but structural undersupply persists in 8 of 12 major cities.' },
    { actor: 'Workforce / Talent', rec: 'City selection is now a financial decision of comparable magnitude to salary negotiation. A $15,000 raise in Vancouver is worth less than a $0 raise with a move to Calgary in year 3, when housing savings compound.' },
  ]
  return (
    <div style={{ overflowX: 'auto', margin: '16px 0 32px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: NAVY }}>
            <th style={{ padding: '10px 14px', textAlign: 'left', color: '#fff', fontWeight: 700, width: '20%' }}>Stakeholder</th>
            <th style={{ padding: '10px 14px', textAlign: 'left', color: '#fff', fontWeight: 700 }}>Recommendation</th>
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
            A structural analysis of Canada's post-pandemic economic reckoning — stalled growth, persistent housing unaffordability, a youth labour market in crisis, and the policy choices that will determine trajectory through 2027.
          </p>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { label: 'GDP Growth', val: '1.1%', sub: 'FY 2026 Forecast' },
              { label: 'Unemployment', val: '6.4%', sub: 'Aug 2026 · 6-yr high' },
              { label: 'Youth Jobless', val: '12.9%', sub: 'Aug 2026 · near-recession' },
              { label: 'Mortgage Burden', val: '51.1%', sub: 'of income · Q2 2026' },
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

        {/* ── Executive Summary ──────────────────────────────────────────────── */}
        <SectionHeading num={1} title="Executive Summary" />
        <Body>
          Canada entered 2026 in a technical recession — a state that official data confirms but policymakers are reluctant to name. Two consecutive quarters of GDP contraction (−1.0% annualized in Q4 2025; −0.1% in Q1 2026) bookend a decade of structurally declining productivity growth, a housing market that expanded far beyond wage fundamentals, and an immigration policy that added demand without the supply infrastructure to absorb it.
        </Body>
        <Body>
          Under Prime Minister Mark Carney — the former Governor of both the Bank of Canada and the Bank of England — the government has pivoted to supply-side investment: $1 trillion in planned infrastructure and energy spending over five years, an ambitious target of 500,000 new homes annually, and a sharp reduction in immigration intake from the 2024 peak of 464,265 permanent residents to a 2026 target of 380,000. These are the right directions. The execution risk is significant.
        </Body>
        <Body>
          For institutional stakeholders — employers, investors, policymakers, and talent-advisory firms — this report offers a structured reading of where Canada stands at the Q3 2026 inflection point: what broke, why it broke, and where evidence of recovery is real versus premature.
        </Body>
        <Callout
          label="Core Finding:"
          text="Canada is not in free fall — but it is not recovering either. The structural pressures that produced this recession (housing unaffordability, youth labour market failure, productivity stagnation) require decade-long solutions. Near-term macro indicators will improve modestly before 2027; the structural problems will not."
          color={ORG}
          bg="#FFF7ED"
        />

        {/* ── Economic Scorecard ─────────────────────────────────────────────── */}
        <SectionHeading num={2} title="Q3 2026 Economic Scorecard" />
        <KpiDashboard />
        <Source>Sources: Statistics Canada LFS (Aug 2026), Bank of Canada Monetary Policy Report, CREA MLS HPI, Rentals.ca / Urbanation National Rent Report, NBC Housing Affordability Monitor Q2 2026.</Source>

        {/* ── Macro ─────────────────────────────────────────────────────────── */}
        <SectionHeading num={3} title="Macroeconomic Conditions: Stalled, Not Broken" />
        <Body>
          Canada's 2025–2026 contraction was precipitated by a convergence of forces that individually were manageable but collectively were not. Real GDP fell at a 1.0% annualized pace in Q4 2025 before a further 0.1% decline in Q1 2026. The Bank of Canada currently forecasts full-year 2026 growth of 1.1% — the weakest non-recessionary pace in a decade — constrained by flagging business investment, trade policy uncertainty, and the lingering demand-destruction effects of 2022–2024's aggressive rate tightening cycle.
        </Body>
        <SubHeading title="The Trade Policy Overhang" />
        <Body>
          The CUSMA (Canada–US–Mexico Agreement) is under active review in 2026, its first formal evaluation since ratification. US trade policy under the current administration has imposed targeted tariffs on Canadian goods, most critically steel, aluminum, and softwood lumber. For a country where 75% of exports flow to the United States, this is not a peripheral risk — it is the central variable in every growth forecast. The Bank of Canada estimates trade disruption is subtracting 0.3–0.5 percentage points from 2026 GDP growth directly.
        </Body>
        <Body>
          Carney's government has responded with a trade diversification agenda — diplomatic engagement in the Gulf states, enhanced UK and EU trade corridors, and positioning Canada as a critical minerals supplier to both US and non-US markets. These are strategically sound moves on a timeline measured in years, not quarters.
        </Body>
        <Callout
          label="Bottom Line:"
          text="The recession is shallow and the economy is more stalled than broken. The risk is not collapse — it is prolonged anaemia. Canada is likely to grow at 1.1–1.5% through 2026 and a modestly better 1.6% in 2027, assuming no escalation in US trade tensions."
          color={BLUE}
          bg="#EFF6FF"
        />

        {/* ── Labour Market ─────────────────────────────────────────────────── */}
        <SectionHeading num={4} title="Labour Market: The Youth Crisis Nobody Named" />
        <Body>
          Canada's headline unemployment rate of 6.4% (August 2026) is elevated but, in isolation, not alarming. Strip away the headline and the picture darkens considerably. The 2026 labour market is bifurcating in ways that have structural, not cyclical, origins.
        </Body>
        <SubHeading title="The Headline vs. the Reality" />
        <Body>
          Canada's unemployment rate swung from a 16-month low in January 2026 to a yearly peak of 6.9% in April before a partial recovery through summer. The recovery is concentrated in prime-age workers (25–54) whose unemployment rate is 5.6%. For workers aged 15–24, the rate is 12.9% — more than double the national average. Among teenagers specifically, the Q1 2026 rate hit 20.2%, a level historically seen only during recessions.
        </Body>
        <Callout
          label="Structural Signal:"
          text="Youth unemployment in Canada jumped 57% in three years, reaching levels previously unseen outside a recession. Over the same period, university graduates increased 63% while demand for degree-requiring jobs rose only 16%. The mismatch is not cyclical — it is an education-to-labour-market alignment failure that rates cuts will not fix."
          color={RED}
          bg="#FEF2F2"
        />
        <SubHeading title="Income Divergence" />
        <Body>
          Workers under 35 are the only age cohort whose real income growth has trailed inflation over the 2020–2025 period — falling roughly 8 percentage points below the national average. This matters for Lakive's core thesis: the decision to migrate cities is now economically rational for young professionals at a rate not seen since the 1990s. A structural labour market failure in Toronto and Vancouver creates outflow pressure toward Calgary, Edmonton, and Ottawa that will persist regardless of short-term rate decisions.
        </Body>

        {/* ── Housing ───────────────────────────────────────────────────────── */}
        <SectionHeading num={5} title="Housing: The Long Unwind Has Begun — But Don't Call It Recovery" />
        <SubHeading title="Where Prices Stand" />
        <Body>
          Canada's CREA national composite benchmark sits at approximately CAD $710,000 as of July 2026, roughly flat year-over-year (−1.1%). This national average conceals enormous geographic dispersion. Greater Vancouver's MLS HPI benchmark was $1,101,700 in March 2026 — down 6.7% from a year earlier but still requiring a median-income household to dedicate 51%+ of gross income to mortgage payments on a standard 25-year amortization. Toronto's average hovers near $1,020,000, down from 2022 peaks but still inaccessible to the majority of working households without substantial prior equity.
        </Body>
        <SubHeading title="Ten Quarters of Improvement — Still at Crisis Levels" />
        <Body>
          The NBC Housing Affordability Monitor recorded the 10th consecutive quarterly improvement in Q2 2026 — the longest streak on record. The mortgage payment-to-income ratio fell to 51.1%. This sounds encouraging until one notes that the long-run historical average is approximately 35%, and the 51.1% figure means a household earning Canada's median after-tax household income ($82,000) is spending $41,900 annually — $3,492 per month — to service a mortgage on a median-priced property before maintenance, insurance, or property tax.
        </Body>
        <Body>
          The improvement is real. The crisis is also real. Both statements are simultaneously true.
        </Body>
        <Callout
          label="Bank of Canada:"
          text="The BoC held its policy rate at 2.25% for the seventh consecutive decision in September 2026. No rate cuts are expected before 2027 — and consensus projections show rate increases beginning in Q2 2027 as inflation pressures from tariffs and energy persist. Housing recovery has been delayed accordingly. RBC projects a modest national rebound in 2027, not 2026."
          color={AMBER}
          bg="#FFFBEB"
        />
        <SubHeading title="The Rental Market: The One Area of Genuine Relief" />
        <Body>
          For renters, 2026 has delivered meaningful relief. National average asking rents fell to CAD $2,012 per month in July 2026 — down 3.8% year-over-year, representing the 22nd consecutive month of year-over-year decline. The national vacancy rate for purpose-built rental apartments rose to 3.1% in late 2025 (from 2.2% in 2024). In Toronto and Vancouver, landlords are offering incentives — months of free rent, reduced deposits — that would have been unimaginable 18 months ago.
        </Body>
        <Body>
          The primary driver is immigration intake reduction. Fewer non-permanent residents means lower rental demand, particularly in the urban cores. The Parliamentary Budget Office projects that Canada's 2030 housing shortfall will narrow by 534,000 units (45%) as a direct result of the immigration cuts — though it simultaneously projects a 1.7% reduction in real GDP by 2027 from the same policy.
        </Body>

        {/* ── Immigration ───────────────────────────────────────────────────── */}
        <SectionHeading num={6} title="Immigration: The Double-Edged Correction" />
        <Body>
          Between 2020 and 2024, Canada pursued one of the most aggressive immigration expansion programs in its modern history — peaking at 464,265 permanent residents in 2024, against a pre-pandemic target of approximately 340,000 annually. The policy was predicated on labour shortage arguments that, in retrospect, reflected pandemic-period distortion rather than structural demand.
        </Body>
        <Body>
          The result was textbook demand-side stimulus applied to a supply-constrained housing market. Every new permanent resident requires housing. Canada was already building roughly 200,000–220,000 new units annually — far below the 500,000 needed to serve even baseline demographic growth. Adding 120,000+ above-target arrivals annually for four consecutive years produced a structural housing deficit that will take a decade to close under the most optimistic construction scenarios.
        </Body>
        <SubHeading title="The Correction" />
        <Body>
          The 2025–2027 Immigration Levels Plan targets 380,000 permanent residents in 2026, declining to 365,000 in 2027. Non-permanent resident targets are set to reduce this population to 5% of Canada's total by end-2026. These are significant corrections — and the rental market data confirms they are working at the demand-reduction level.
        </Body>
        <Callout
          label="The Trade-off:"
          text="Fewer newcomers means fewer construction workers, fewer consumers, and fewer homebuyers — weighing on both supply and demand simultaneously. The PBO projects the immigration cuts reduce real GDP by ~1.7% by 2027. Calibrating this trade-off correctly — reducing rental demand without gutting labour supply in construction and healthcare — is arguably the most consequential economic policy variable in Canada right now."
          color={ORG}
          bg="#FFF7ED"
        />

        {/* ── Middle Class ──────────────────────────────────────────────────── */}
        <SectionHeading num={7} title="The Middle-Class Compression" />
        <Body>
          Canada's middle class — households earning CAD $50,300 to $113,300 after tax — is technically defined as such, but many within this band no longer experience economic security consistent with the label. The compression is structural, not cyclical, and is most acute in three dimensions.
        </Body>
        <Body>
          <strong>Housing cost share:</strong> In Greater Vancouver and Greater Toronto, a dual-income middle-class household ($160,000–$180,000 combined) allocating 30% of gross income to housing can afford approximately $540,000–$600,000 on a mortgage basis. The median property in both markets exceeds $900,000. The gap is not closable through savings acceleration — it is structural.
        </Body>
        <Body>
          <strong>Transportation cost surge:</strong> Gasoline prices rose 33.2% year-over-year in May 2026, while vehicle insurance increased 8.2%. For suburban households — the majority of the Canadian middle class — transportation is a non-discretionary cost with limited substitution. These increases are hitting at the same moment that wage growth has stalled.
        </Body>
        <Body>
          <strong>Income polarisation:</strong> The gap between Canada's highest and lowest-income households reached an all-time high in 2025. Median wage growth has consistently trailed mean wage growth for the past decade — a statistical signature of a labour market where gains concentrate at the top. For the professional class in particular, rising housing costs have functionally consumed what should have been the wealth accumulation years of their 30s and 40s.
        </Body>

        {/* ── Root Causes ───────────────────────────────────────────────────── */}
        <SectionHeading num={8} title="Root Cause Analysis: How Canada Got Here" />
        <Body>
          The current pressures did not emerge from a single policy failure. They are the compounding product of decisions made across three distinct periods, each of which created conditions that the next period had to absorb.
        </Body>
        <SubHeading title="2010–2019: The Productivity Decade Canada Lost" />
        <Body>
          Canada's productivity growth relative to the United States declined consistently throughout the 2010s. Business investment per worker — the most reliable leading indicator of future wage capacity — fell in real terms. Canada became a commodity-and-housing economy at the expense of innovation-led growth, leaving per-capita income increasingly dependent on population growth rather than productivity gains. The housing market filled the investment vacuum — residential investment ballooned as a share of GDP while business capital formation stagnated.
        </Body>
        <SubHeading title="2020–2022: Pandemic-Era Policy Amplification" />
        <Body>
          The Bank of Canada's emergency rate cuts to 0.25% (maintained through early 2022) combined with unprecedented fiscal stimulus produced the most acute housing price acceleration in Canadian history. National benchmark prices rose 50% in 24 months. The policy was appropriate for the moment of crisis in March 2020; maintaining near-zero rates through a post-vaccine reopening boom was not. The Bank of Canada has since acknowledged this timing error implicitly, though not explicitly.
        </Body>
        <Body>
          Simultaneously, the federal government's post-pandemic immigration ramp-up — motivated by legitimate labour shortage concerns and long-term demographic planning — exceeded the absorption capacity of housing supply, health infrastructure, and labour market integration systems. The pace was too fast.
        </Body>
        <SubHeading title="2022–2025: The Tightening that Froze the Market" />
        <Body>
          The Bank of Canada's subsequent tightening — raising the policy rate from 0.25% to 5.00% between March 2022 and July 2023 — successfully reduced inflation but produced a credit constraint that froze the housing market without lowering prices proportionally. Sellers refused to crystallise losses; buyers could not qualify. Transaction volumes collapsed. New construction slowed as developer financing dried up. The housing shortage paradoxically worsened during the period of highest rates because supply investment requires long lead times and fell sharply.
        </Body>
        <Callout
          label="Structural Verdict:"
          text="Canada's current challenges are not the result of bad luck or a single bad policy. They are the compounded consequence of a decade of underinvestment in productive capacity, a pandemic policy overcorrection, and an immigration expansion that outpaced infrastructure. The Carney government has diagnosed the problem correctly. The solutions require 5–10 years to bear fruit."
          color={NAVY}
          bg="#F1F5F9"
        />

        {/* ── Outlook ───────────────────────────────────────────────────────── */}
        <SectionHeading num={9} title="Forward Outlook: Q4 2026 and Into 2027" />
        <Body>
          Canada is unlikely to re-enter formal GDP contraction in Q3–Q4 2026. Energy sector tailwinds, a partial labour market recovery, and fiscal stimulus from planned federal infrastructure spending should generate positive but weak growth of 0.3–0.5% per quarter through year-end.
        </Body>
        <Body>
          The more consequential question is whether the structural problems — housing supply, youth unemployment, middle-class compression — are on a credible improvement trajectory. On this measure, the outlook is mixed: directionally correct, but moving far too slowly relative to the magnitude of the problem.
        </Body>
        <Body>
          Housing construction has not yet reached the pace required. The 500,000-homes target assumes a 50%+ increase in annual starts against a labour force and regulatory environment that has consistently underdelivered. Zoning reform at the municipal level — which is where the actual constraint sits — has advanced in some jurisdictions (Vancouver secondary suites, Toronto as-of-right zoning changes) but remains incomplete.
        </Body>
        <Body>
          Youth unemployment is likely to improve modestly through 2027 as demand recovers, but the structural education-labour mismatch will persist until either curriculum alignment improves or the economy generates more degree-requiring roles than its current trajectory implies.
        </Body>

        {/* ── Recommendations ───────────────────────────────────────────────── */}
        <SectionHeading num={10} title="Strategic Recommendations" />
        <Body>
          The following recommendations are addressed to distinct stakeholder groups, each of whom faces different decision frameworks given the Q3 2026 economic environment.
        </Body>
        <RecommendationsTable />

        {/* ── City Intelligence ─────────────────────────────────────────────── */}
        <SectionHeading num={11} title="Lakive City Intelligence: Q3 2026 Assessment" />
        <Body>
          The following matrix presents Lakive's Q3 2026 snapshot across nine major Canadian cities. The Housing Pressure Index (HPI) reflects years of gross income required to purchase the composite median property; the Rent Pressure Index (RPI) reflects median rent as a percentage of median monthly gross income; and the Tax Advantage Index (TAI) reflects after-tax take-home advantage relative to the national baseline.
        </Body>
        <CityMatrix />
        <Callout
          label="Lakive's Q3 2026 City Outlook:"
          text="Calgary and Edmonton maintain the strongest risk-adjusted position for professional talent and employer location strategy. Ottawa is the most recession-resistant labour market. Montréal offers the best affordability-access trade-off in the east. Toronto and Vancouver remain the highest opportunity and highest risk markets simultaneously — suitable for career-maximising moves, not financial security moves."
          color={TEAL}
          bg="#F0FDFA"
        />

        {/* ── Methodology ───────────────────────────────────────────────────── */}
        <SectionHeading num={12} title="Methodology & Data Sources" />
        <Body>
          This report synthesises publicly available macroeconomic data from Statistics Canada, the Bank of Canada, CREA, Rentals.ca / Urbanation, the Parliamentary Budget Office, and TD, RBC, and NBC Economics research publications. City-level indices use Lakive's proprietary methodology (v4.0), which weights employment opportunity, tax environment, healthcare, environment quality, transit, safety, and education factors alongside housing affordability metrics. All housing data reflects the two-bedroom composite benchmark unless otherwise specified. All figures are in Canadian dollars unless marked USD.
        </Body>
        <Body>
          This report is produced for informational purposes. It does not constitute financial, investment, legal, or immigration advice. Lakive is a decision intelligence platform — not a financial advisor, real estate brokerage, or immigration consultant.
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
