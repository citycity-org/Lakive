'use client'
import Link from 'next/link'
import ShareBar from '@/components/ShareBar'

const NAVY  = '#0d1f44'
const TEAL  = '#14B8A6'
const ORG   = '#E86C2F'
const BLUE  = '#4F8EF7'
const GRN   = '#059669'
const RED   = '#DC2626'
const AMBER = '#D97706'
const GREY  = '#64748B'

// ── Shared components ─────────────────────────────────────────────────────────

function SectionHeading({ num, title }: { num: number; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '48px 0 16px' }}>
      <div style={{ width: 4, height: 28, borderRadius: 2, background: TEAL, flexShrink: 0 }} />
      <h2 style={{ fontSize: 22, fontWeight: 800, color: NAVY, margin: 0 }}>
        {num}. {title}
      </h2>
    </div>
  )
}

function Source({ text }: { text: string }) {
  return <p style={{ fontSize: 12, color: GREY, fontStyle: 'italic', margin: '0 0 14px' }}>{text}</p>
}

function Body({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.75, margin: '0 0 14px' }}>{children}</p>
}

function Callout({ label, text, color = TEAL, bg = '#F0FDFA' }: { label: string; text: string; color?: string; bg?: string }) {
  return (
    <div style={{
      borderLeft: `4px solid ${color}`, background: bg,
      padding: '12px 16px', borderRadius: '0 8px 8px 0', margin: '16px 0',
    }}>
      <span style={{ fontWeight: 700, color, fontSize: 14 }}>{label} </span>
      <span style={{ fontSize: 14, color: '#1F2937', lineHeight: 1.6 }}>{text}</span>
    </div>
  )
}

// ── KPI summary table ─────────────────────────────────────────────────────────
function KpiTable() {
  const rows = [
    { label: 'National Avg. Asking Rent (Sep 2026)', value: 'CAD $2,035', signal: '▼ 4.8% YoY · 23rd consecutive month of decline', color: GRN },
    { label: 'Unemployment Rate (Aug 2026)', value: '6.4%', signal: '— Held · employment rate 60.8% · participation declined', color: AMBER },
    { label: 'Net Jobs (Aug 2026)', value: '−42,000', signal: 'Reversal after 4 months of growth · services & construction fell', color: RED },
    { label: 'BoC Policy Rate', value: '2.25%', signal: '— Held · 6th consecutive hold · next decision Oct 28 · ~95% hold probability', color: GRN },
    { label: 'CREA Benchmark HPI (Aug 2026)', value: '▼ 3.0% YoY', signal: 'Smallest YoY decline since Oct 2025 · avg sale price $668,219 · sales ▼ 6.9% YoY', color: AMBER },
    { label: 'Counter-Tariffs (Sep 8, 2026)', value: 'CA$27.6B', signal: 'New Canadian counter-tariffs effective September 8 · trade uncertainty elevated', color: AMBER },
  ]
  return (
    <div style={{ overflowX: 'auto', margin: '16px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: NAVY }}>
            <th style={{ padding: '10px 14px', textAlign: 'left', color: '#fff', fontWeight: 700 }}>Indicator</th>
            <th style={{ padding: '10px 14px', textAlign: 'center', color: '#fff', fontWeight: 700 }}>Reading</th>
            <th style={{ padding: '10px 14px', textAlign: 'left', color: '#fff', fontWeight: 700 }}>Signal</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.label} style={{ background: i % 2 === 0 ? '#F8FAFC' : '#fff' }}>
              <td style={{ padding: '9px 14px', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>{r.label}</td>
              <td style={{ padding: '9px 14px', textAlign: 'center', fontWeight: 700, color: NAVY, borderBottom: '1px solid #E5E7EB' }}>{r.value}</td>
              <td style={{ padding: '9px 14px', color: r.color, borderBottom: '1px solid #E5E7EB' }}>{r.signal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── What Changed This Month ────────────────────────────────────────────────────
function ChangesTable() {
  const rows = [
    { dir: '⚠', label: 'Counter-Tariffs', prev: 'CA$26.3B (prior)', now: 'CA$27.6B effective Sep 8 · trade war escalation continues', good: false },
    { dir: '▼', label: 'CREA HPI (YoY)', prev: '▼ 1.1% YoY (Jul)', now: '▼ 3.0% YoY (Aug) · smallest decline since Oct 2025', good: true },
    { dir: '▼', label: 'National avg. asking rent', prev: 'CAD $2,012 (Aug)', now: 'CAD $2,035 (Sep) · ▼ 4.8% YoY · 23rd consecutive month', good: true },
    { dir: '—', label: 'BoC Policy Rate', prev: '2.25%', now: '2.25% · 6th consecutive hold · Oct 28 next · ~95% hold probability', good: false },
    { dir: '—', label: 'Unemployment rate', prev: '6.4% (Aug)', now: '6.4% (Aug) · employment rate 60.8% · Oct 9 LFS is next update', good: false },
    { dir: '▼', label: 'Population growth (YoY)', prev: '~1.1% (2025)', now: '0.5% YoY · sharp slowdown · reduced rental demand pressure', good: false },
  ]
  return (
    <div style={{ overflowX: 'auto', margin: '16px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: NAVY }}>
            <th style={{ padding: '9px 12px', color: '#fff', width: 36 }} />
            <th style={{ padding: '9px 12px', textAlign: 'left', color: '#fff', fontWeight: 700 }}>Indicator</th>
            <th style={{ padding: '9px 12px', textAlign: 'center', color: '#fff', fontWeight: 700 }}>Previous</th>
            <th style={{ padding: '9px 12px', textAlign: 'center', color: '#fff', fontWeight: 700 }}>Now</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.label} style={{ background: i % 2 === 0 ? '#F0FDF4' : '#fff' }}>
              <td style={{ padding: '9px 12px', textAlign: 'center', fontWeight: 700, color: r.good ? GRN : (r.dir === '⚠' ? AMBER : (r.dir === '—' ? GREY : RED)), borderBottom: '1px solid #E5E7EB' }}>{r.dir}</td>
              <td style={{ padding: '9px 12px', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>{r.label}</td>
              <td style={{ padding: '9px 12px', textAlign: 'center', color: GREY, borderBottom: '1px solid #E5E7EB' }}>{r.prev}</td>
              <td style={{ padding: '9px 12px', textAlign: 'center', fontWeight: 700, color: r.good ? GRN : (r.dir === '⚠' ? AMBER : (r.dir === '—' ? GREY : RED)), borderBottom: '1px solid #E5E7EB' }}>{r.now}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── City scores table ─────────────────────────────────────────────────────────
function CityScoreTable() {
  const rows = [
    { city: 'Calgary', score: 74, eoi: 65, tai: 90, hpi: '2.5–22 yrs', rpi: 33, signal: 'Strongest overall · no PST · housing stabilization extends ownership window', scoreColor: GRN, rpiColor: GRN },
    { city: 'Ottawa', score: 68, eoi: 75, tai: 68, hpi: '3.0–26 yrs', rpi: 36, signal: 'Federal employment floor · inflation-resilient wage structure', scoreColor: GRN, rpiColor: GRN },
    { city: 'Toronto', score: 60, eoi: 92, tai: 68, hpi: '4.5–39 yrs', rpi: 48, signal: 'Highest tech EOI · housing cost pressure persists · HPI -3.0% a tentative signal', scoreColor: AMBER, rpiColor: AMBER },
    { city: 'Montréal', score: 60, eoi: 72, tai: 42, hpi: '2.6–23 yrs', rpi: 33, signal: 'Strongest affordability-adjusted quality of life · tariff risk moderate', scoreColor: AMBER, rpiColor: GRN },
    { city: 'Vancouver', score: 58, eoi: 80, tai: 72, hpi: '5.5–42 yrs', rpi: 52, signal: 'Highest RPI nationally · trade-exposed economy · benchmark $1,081,900', scoreColor: AMBER, rpiColor: RED },
    { city: 'Edmonton', score: 66, eoi: 62, tai: 88, hpi: '2.0–18 yrs', rpi: 28, signal: 'Rising in affordability rankings · benchmark $426,900 · rent $1,520', scoreColor: GRN, rpiColor: GRN },
    { city: 'Halifax', score: 58, eoi: 58, tai: 65, hpi: '3.5–28 yrs', rpi: 40, signal: 'Atlantic Canada anchor · rent $2,356 · warrants close monitoring', scoreColor: AMBER, rpiColor: AMBER },
  ]
  return (
    <div style={{ overflowX: 'auto', margin: '16px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: NAVY }}>
            {['City','Lakive City Score','EOI / TAI','HPI (yrs to buy)','Avg RPI','Key Signal'].map(h => (
              <th key={h} style={{ padding: '9px 12px', textAlign: h === 'City' || h === 'Key Signal' ? 'left' : 'center', color: '#fff', fontWeight: 700 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.city} style={{ background: i % 2 === 0 ? '#F8FAFC' : '#fff' }}>
              <td style={{ padding: '9px 12px', fontWeight: 700, color: NAVY, borderBottom: '1px solid #E5E7EB' }}>{r.city}</td>
              <td style={{ padding: '9px 12px', textAlign: 'center', fontWeight: 800, color: r.scoreColor, borderBottom: '1px solid #E5E7EB' }}>{r.score}</td>
              <td style={{ padding: '9px 12px', textAlign: 'center', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>{r.eoi} / {r.tai}</td>
              <td style={{ padding: '9px 12px', textAlign: 'center', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>{r.hpi}</td>
              <td style={{ padding: '9px 12px', textAlign: 'center', fontWeight: 700, color: r.rpiColor, borderBottom: '1px solid #E5E7EB' }}>{r.rpi}</td>
              <td style={{ padding: '9px 12px', color: GREY, fontSize: 13, borderBottom: '1px solid #E5E7EB' }}>{r.signal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 12, color: GREY, fontStyle: 'italic', marginTop: 8 }}>
        Score = Lakive composite (0–100). EOI = Employment Opportunity Index. TAI = Tax Advantage Index. RPI = Rent Pressure Index (lower is better). HPI = years of median income to purchase. Data version: Oct 2026 v1.
      </p>
    </div>
  )
}

// ── Occupation scores table ───────────────────────────────────────────────────
function OccTable() {
  const rows = [
    { occ: 'Nurse', city: 'Calgary', score: 86, hpi: 4.5, rpi: 24, eoi: 'High', note: 'Best nurse city nationally · housing stabilization extends 5-yr ownership window', sc: GRN, rc: GRN, ec: GRN },
    { occ: 'Nurse', city: 'Ottawa', score: 82, hpi: 6.5, rpi: 26, eoi: 'High', note: 'Federal healthcare stability · inflation-resilient wage contracts', sc: GRN, rc: GRN, ec: GRN },
    { occ: 'Nurse', city: 'Toronto', score: 72, hpi: 12.0, rpi: 40, eoi: 'High', note: 'High demand, high cost · CREA HPI improvement a long-term signal, not immediate relief', sc: AMBER, rc: AMBER, ec: GRN },
    { occ: 'Electrician', city: 'Calgary', score: 91, hpi: 3.9, rpi: 23, eoi: 'High', note: '#1 trades city · home ownership in <4 yrs · demand steady against tariff headwinds', sc: GRN, rc: GRN, ec: GRN },
    { occ: 'Electrician', city: 'Edmonton', score: 79, hpi: 3.2, rpi: 20, eoi: 'Mid', note: 'Rising trades alternative · benchmark $426,900 · strong in-migration from eastern Canada', sc: GRN, rc: GRN, ec: AMBER },
    { occ: 'Software Eng.', city: 'Toronto', score: 88, hpi: 9.2, rpi: 33, eoi: 'High', note: 'Highest tech EOI in Canada · CREA improvement tentative · monitor Q4 tech hiring', sc: GRN, rc: GRN, ec: GRN },
    { occ: 'Software Eng.', city: 'Vancouver', score: 83, hpi: 9.5, rpi: 35, eoi: 'High', note: 'Strong ecosystem · benchmark $1,081,900 · tariff exposure via US-adjacent firms', sc: GRN, rc: GRN, ec: GRN },
    { occ: 'Doctor', city: 'Calgary', score: 92, hpi: 2.5, rpi: 10, eoi: 'High', note: 'Top national score · ownership in 2.5 yrs · no PST advantage largest for high earners', sc: GRN, rc: GRN, ec: GRN },
    { occ: 'Doctor', city: 'Ottawa', score: 88, hpi: 3.0, rpi: 11, eoi: 'High', note: 'Strong second · federal health networks · wage inflation protection', sc: GRN, rc: GRN, ec: GRN },
  ]
  return (
    <div style={{ overflowX: 'auto', margin: '16px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: NAVY }}>
            {['Occupation','City','Score','HPI (yrs)','RPI','EOI','Lakive Insight'].map(h => (
              <th key={h} style={{ padding: '9px 10px', textAlign: h === 'Occupation' || h === 'City' || h === 'Lakive Insight' ? 'left' : 'center', color: '#fff', fontWeight: 700 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r.occ}-${r.city}`} style={{ background: i % 2 === 0 ? '#F8FAFC' : '#fff' }}>
              <td style={{ padding: '8px 10px', fontWeight: 700, color: NAVY, borderBottom: '1px solid #E5E7EB' }}>{r.occ}</td>
              <td style={{ padding: '8px 10px', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>{r.city}</td>
              <td style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 800, color: r.sc, borderBottom: '1px solid #E5E7EB' }}>{r.score}</td>
              <td style={{ padding: '8px 10px', textAlign: 'center', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>{r.hpi}</td>
              <td style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 700, color: r.rc, borderBottom: '1px solid #E5E7EB' }}>{r.rpi}</td>
              <td style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600, color: r.ec, borderBottom: '1px solid #E5E7EB' }}>{r.eoi}</td>
              <td style={{ padding: '8px 10px', color: GREY, borderBottom: '1px solid #E5E7EB' }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 12, color: GREY, fontStyle: 'italic', marginTop: 8 }}>
        HPI = Housing Years Index (years of after-tax income to 20% down payment). Full rankings at{' '}
        <Link href="/ranking" style={{ color: BLUE }}>lakive.com/ranking</Link>
      </p>
    </div>
  )
}

// ── Looking Ahead table ───────────────────────────────────────────────────────
function LookingAheadTable() {
  const rows = [
    { date: 'Oct 9', release: 'Statistics Canada LFS — September employment', updates: 'Net jobs · unemployment rate · wage growth · City Pulse employment signal', urgent: true },
    { date: 'Oct 16', release: 'CREA September home prices', updates: 'HPI (Housing Years Index) · city benchmark prices · ranking · compare · housing guide', urgent: false },
    { date: 'Oct 28', release: 'Bank of Canada rate decision', updates: 'BoC Rate in City Pulse · mortgage calculator · housing guide · ~95% hold expected', urgent: true },
  ]
  return (
    <div style={{ overflowX: 'auto', margin: '16px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: NAVY }}>
            <th style={{ padding: '9px 12px', textAlign: 'left', color: '#fff', fontWeight: 700, width: 120 }}>Date</th>
            <th style={{ padding: '9px 12px', textAlign: 'left', color: '#fff', fontWeight: 700 }}>Release</th>
            <th style={{ padding: '9px 12px', textAlign: 'left', color: '#fff', fontWeight: 700 }}>Lakive Will Update</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.date} style={{ background: i % 2 === 0 ? '#F8FAFC' : '#fff' }}>
              <td style={{ padding: '9px 12px', fontWeight: 700, color: r.urgent ? RED : AMBER, borderBottom: '1px solid #E5E7EB' }}>{r.date}</td>
              <td style={{ padding: '9px 12px', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>{r.release}</td>
              <td style={{ padding: '9px 12px', color: GREY, fontSize: 13, borderBottom: '1px solid #E5E7EB' }}>{r.updates}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function MonthlyReportSeptember2026() {
  return (
    <main style={{ background: '#F5F7FB', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{ background: NAVY, padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: TEAL, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Monthly Report</span>
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>·</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.40)', letterSpacing: '0.06em' }}>September 2026</span>
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>·</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.40)' }}>Data version Oct 2026 v1</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: '#fff', lineHeight: 1.15, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            Canada — September 2026
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.60)', margin: '0 0 32px', fontStyle: 'italic' }}>
            Stability Without Relief
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Published October 5, 2026 · Lakive Research</span>
            <a
              href="/reports/pdf/Lakive_Monthly_Report_September_2026.pdf"
              target="_blank"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: TEAL, color: '#fff', fontSize: 13, fontWeight: 700,
                padding: '8px 16px', borderRadius: 8, textDecoration: 'none',
              }}
            >
              ↓ Download PDF
            </a>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* What Changed */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: NAVY, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            📋 What Changed This Month
          </h2>
          <ChangesTable />
        </div>

        {/* Executive Summary */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={1} title="Executive Summary" />
          <Body>
            September 2026 is a month of surface stability and underlying strain. The Bank of Canada held its overnight rate at 2.25% for a sixth consecutive meeting — a streak that has kept mortgage conditions broadly steady since late 2025. National asking rents fell for a 23rd consecutive month, now down 4.8% year-over-year. CREA data shows the sharpest improvement in housing price decline since October 2025. By the headline metrics, Canada looks like a market finding its footing.
          </Body>
          <Body>
            But the same month brought CA$27.6 billion in new Canadian counter-tariffs effective September 8, an August labour market that shed 42,000 net jobs, and a population growth rate that has slowed to 0.5% year-over-year — well below the levels that sustained rental demand through 2023 and 2024. The stability is real. The relief is not. Households are absorbing costs, not recovering from them.
          </Body>
          <Body>
            Lakive city scores reflect this divergence. Calgary and Ottawa continue to lead on structural affordability fundamentals. The widening gap between cities that absorb macro shocks and those that amplify them is the defining pattern of this data version. The October 28 Bank of Canada decision — currently pricing ~95% probability of a hold — will confirm or complicate that picture for Q4.
          </Body>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, margin: '20px 0 12px' }}>Key Numbers at a Glance</h3>
          <KpiTable />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, margin: '24px 0 12px' }}>5 Actionable Takeaways</h3>
          {[
            'Trades workers: Calgary remains the clearest opportunity — an electrician reaches home ownership in under 4 years (HPI: 3.9 yrs). The sixth consecutive BoC hold keeps mortgage conditions stable. Edmonton is emerging as a secondary option: benchmark $426,900 and rising in-migration make it worth evaluating against your specific household circumstances.',
            'Healthcare workers: Ottawa and Calgary both score 80+ for nurses. With October 28 pricing ~95% hold probability, the current mortgage window is expected to persist into Q4. Calgary\'s no-PST structure provides the largest buffer against any cost-of-living increase driven by tariff pass-through.',
            'Tech professionals: Toronto\'s EOI of 92 holds. The city\'s tech labour market continues to absorb tariff-related uncertainty — US firms with Canadian operations have largely maintained hiring plans through Q3. Housing cost improvement is tentative; CREA\'s HPI narrowing to -3.0% YoY is a signal to monitor, not act on immediately.',
            'Renters: National rents are down 4.8% YoY but population growth has slowed to 0.5% YoY — the demand tailwind that pressured rents in 2023–24 has moderated. If October LFS data shows further employment weakness, rental softness may persist into Q1 2027. Current conditions favour locking in a lease at a discount rather than waiting.',
            'Buyers: The October 28 BoC decision is the clearest near-term signal. A hold at 2.25% sustains the current affordability environment. CREA\'s August data — the smallest HPI decline since October 2025 — suggests the pace of price decline is moderating, particularly in lower-cost cities. Mid-tier markets (Calgary at $569,800, Edmonton at $426,900) offer the widest margin of safety regardless of Q4 rate outcome.',
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, margin: '8px 0' }}>
              <span style={{ width: 24, height: 24, borderRadius: '50%', background: TEAL, color: '#fff', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.65, margin: 0 }}>{t}</p>
            </div>
          ))}
        </div>

        {/* National Overview */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={2} title="National Overview: Six Holds and a Demand Shock" />
          <Body>
            The Bank of Canada has now held its overnight rate at 2.25% through six consecutive meetings — a period of policy stability that began after the easing cycle concluded. The October 28 decision is approaching with markets pricing approximately 95% probability of another hold. That consensus reflects a labour market that is weakening but not collapsing, and inflation that has so far remained within a range the Bank can characterize as manageable.
          </Body>
          <Body>
            Against that backdrop, September 8 brought CA$27.6 billion in new Canadian counter-tariffs — an escalation of the Canada-US trade dispute that has been building since early 2026. The tariff exposure is not uniform across cities or sectors. Trade-intensive industries concentrated in Ontario and British Columbia face the most direct impact. Federal employment in Ottawa, and Alberta's domestic-demand economy, are relatively more insulated.
          </Body>
          <Body>
            Population growth has slowed to 0.5% year-over-year — a sharp deceleration from the 1.1% recorded in 2025. This matters for housing and rental markets: the supply-demand pressure that characterized 2023 and 2024 has eased materially. The slowdown is consistent with reduced international student arrivals and a moderation in permanent resident intake. Tariff exposure and rental softness are moving together, which reflects the same structural demand deceleration rather than independent trends.
          </Body>
          <Callout
            label="Lakive Interpretation:"
            text="Six consecutive holds have created a stable rate environment, but stability at 2.25% is not the same as relief. Wages grew 2.0% YoY in August — below CPI — meaning real purchasing power has not recovered. The macro picture is one of deceleration, not rebound. Workers evaluating relocation decisions should model scenarios where conditions persist at current levels into mid-2027, not scenarios of near-term improvement."
            color={TEAL} bg="#F0FDFA"
          />
        </div>

        {/* Rental */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={3} title="National Rental Market" />
          <Source text="Source: Rentals.ca × Urbanation National Rent Report, September 2026" />
          <Body>
            National average asking rent reached CAD $2,035 in September — the 23rd consecutive month of year-over-year decline. At ▼4.8% YoY, the rate of decline has deepened slightly from August's ▼3.8%, though month-over-month rent ticked up from $2,012. This combination — deeper annual decline alongside a modest seasonal uptick — reflects the pull of two forces: structural softening driven by elevated supply completions and slower population growth, and seasonal demand from students and new arrivals that provides a partial floor in late summer.
          </Body>
          <Body>
            City-level variation is significant. Vancouver leads with $2,704 average asking rent, followed by Toronto at $2,570. Both remain well above pre-pandemic levels on a real basis. Halifax, at $2,356, continues to carry rent pressure disproportionate to its wage base — a pattern that has emerged consistently since Atlantic Canada's in-migration surge peaked in 2022. Calgary ($1,825) and Edmonton ($1,520) remain the most accessible rental markets among major cities, supported by a no-PST cost structure and active purpose-built supply pipelines.
          </Body>
          <Callout
            label="Lakive Interpretation:"
            text="The 23rd month of rent decline is an important structural fact — but the population growth slowdown to 0.5% YoY is the driver that matters more for forward-looking assessment. When demand deceleration is the mechanism, the trajectory is likely to persist rather than reverse quickly. Renters who locked in leases in Q3 2026 are on the right side of the market. Those still searching should expect continued softness in major cities through Q1 2027, absent a significant immigration policy shift."
            color={TEAL} bg="#F0FDFA"
          />
          <Callout
            label="⚠ Tariff risk:"
            text="CA$27.6B in counter-tariffs effective September 8 introduces construction material cost pressure that could slow new housing starts in the medium term — particularly in condo and purpose-built rental. If completions slow in 2027, the current rental softness may reverse. This is a lagged risk, not an immediate one."
            color={AMBER} bg="#FFFBEB"
          />
        </div>

        {/* Housing */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={4} title="Housing Market: Signs of Stabilization" />
          <Source text="Source: CREA National Statistics, August 2026 (released mid-September). Lakive Housing Years Index (HPI) reflects current model calculations." />
          <Body>
            CREA's August 2026 data shows a national benchmark HPI of ▼3.0% year-over-year — the smallest annual decline since October 2025. The average sale price was $668,219 and sales fell 6.9% year-over-year, suggesting the volume contraction that has characterized the 2025–26 cycle is moderating alongside price declines. This is not recovery — it is stabilization. City-level benchmarks reflect a wide range: Vancouver at $1,081,900, Toronto at $925,900, Calgary at $569,800, and Edmonton at $426,900.
          </Body>
          <Body>
            RBC affordability data for Q2 2026 shows nationally at 52.8% of median pre-tax household income — a reading that reflects mortgage costs, property taxes, and utilities relative to household earnings. Vancouver carries the highest burden at 83.9%, followed by Toronto at 64.1%. Calgary (41.3%) and Edmonton (36.8%) remain below the national average, with affordability conditions consistent with productive homeownership for households with stable employment.
          </Body>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, margin: '20px 0 12px' }}>Lakive City Scores — September 2026</h3>
          <CityScoreTable />
          <Callout
            label="Lakive Interpretation:"
            text="The HPI improvement to -3.0% YoY suggests the pace of price decline is moderating. This is a directional signal, not a turning point — buyer confidence remains fragile ahead of October 28, and volume is still down 6.9% YoY. For workers evaluating a purchase, the data suggests that waiting for further price drops may not yield the gains it did in 2024–25. Affordability in mid-tier cities has improved structurally; the October 28 BoC decision will determine whether that window remains open into 2027."
            color={ORG} bg="#FFF7ED"
          />
        </div>

        {/* Employment */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={5} title="Employment Snapshot" />
          <Source text="Source: Statistics Canada LFS, August 2026 (released September 5, 2026). September LFS releases October 9." />
          <Body>
            Canada's labour market shed 42,000 net jobs in August — the most recent data available at publication. The unemployment rate held at 6.4%, but only because the participation rate fell. The employment rate sits at 60.8%. Wage growth continues at +2.0% YoY — below the rate of inflation, meaning real wages have been declining for two consecutive months.
          </Body>
          <div style={{ paddingLeft: 16 }}>
            {[
              'Net employment change: −42,000 — largest single-month decline since Q1 2025',
              'Unemployment rate: 6.4% (held) — masked by participation rate falling, not by job gains',
              'Employment rate: 60.8% (▼ from 61.1% in July)',
              'Weakest sectors: construction (−9,200), professional services (−6,800), manufacturing (−4,100)',
              'Relative resilience: healthcare and public administration held steady',
              'Wages: average hourly earnings +2.0% YoY — below CPI · real wages declining',
            ].map(t => (
              <div key={t} style={{ display: 'flex', gap: 10, margin: '6px 0' }}>
                <span style={{ color: RED, fontWeight: 700, flexShrink: 0 }}>•</span>
                <p style={{ fontSize: 14, color: '#374151', margin: 0, lineHeight: 1.6 }}>{t}</p>
              </div>
            ))}
          </div>
          <Callout
            label="Lakive Interpretation:"
            text="The September LFS data, releasing October 9, is the single most important data point before the October 28 BoC decision. If September shows continued job losses, the Bank will face a difficult choice between supporting a weakening labour market and managing tariff-driven inflation risk. The employment trajectory is the leading indicator for Q4 city score revisions. Lakive will publish an updated signal immediately following the October 9 release."
            color={RED} bg="#FEF2F2"
          />
        </div>

        {/* Rates */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={6} title="Interest Rates & Tariff Exposure" />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, margin: '4px 0 10px' }}>Bank of Canada — 2.25% (Held, sixth consecutive)</h3>
          <Body>
            The Bank of Canada held its overnight rate at 2.25% for a sixth consecutive meeting. The October 28 decision — the last of 2026 — is currently pricing approximately 95% probability of another hold. That consensus reflects a labour market that, while weakening, has not deteriorated to the point that forces an emergency cut; and inflation that, while above 2%, is not clearly accelerating in a way that demands a hike.
          </Body>
          <Body>
            The Bank's September statement acknowledged both the labour market softness and the tariff-related cost pressure. The language was balanced — neither signalling easing nor tightening — which is consistent with the current conditions: a central bank watching to see whether the tariff pass-through into consumer prices is transient or persistent.
          </Body>
          <Callout
            label="Lakive Interpretation:"
            text="A hold on October 28 would be the seventh consecutive decision at 2.25% — extending the most stable rate environment Canada has had since 2022. Workers and buyers who have been waiting for certainty before committing to a city relocation or purchase have a clearer window now than at any point in the past four years. The ~95% hold probability means the risk-adjusted case for acting in Q4 2026 is stronger than in Q1 or Q2."
            color={TEAL} bg="#F0FDFA"
          />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, margin: '20px 0 10px' }}>Counter-Tariffs — CA$27.6B (Effective September 8)</h3>
          <Body>
            Canada's CA$27.6 billion in counter-tariffs, effective September 8, 2026, represent an escalation of the retaliatory trade measures that have been building through the year. The direct pass-through to consumer prices is uneven: goods-intensive sectors (construction materials, food processing) face more immediate cost pressure, while services-heavy industries are more insulated. For household budgets, the tariff impact is most visible in grocery prices and new housing construction costs.
          </Body>
          <Callout
            label="City exposure note:"
            text="Vancouver and Toronto carry the highest tariff exposure among covered cities — both due to trade-dependent industries and their roles as gateway cities for US-bound goods and services. Calgary and Ottawa are relatively more insulated: Alberta's economy is commodity-weighted rather than trade-manufactured, and Ottawa's federal employment base is not directly exposed to tariff dynamics."
            color={AMBER} bg="#FFFBEB"
          />
        </div>

        {/* Insight of the Month */}
        <div style={{ background: NAVY, borderRadius: 14, padding: '28px 32px', marginBottom: 24, borderLeft: `5px solid ${AMBER}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 20 }}>📊</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: AMBER, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Insight of the Month</span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: AMBER, margin: '0 0 14px' }}>
            Stability Without Relief
          </h2>
          <p style={{ fontSize: 15, color: '#CBD5E1', lineHeight: 1.75, margin: 0 }}>
            Six consecutive Bank of Canada holds. Twenty-three months of rent decline. The CREA price drop narrowing to its smallest since October 2025. By these measures, September 2026 looks like stabilization. What it is not is relief. Wages at +2.0% YoY are below inflation. Forty-two thousand jobs were lost in August. A population growth rate of 0.5% — less than half of 2025 — means the demand that sustained housing and rental markets through the pandemic cycle has materially receded. The stability is structural: it reflects a market absorbing shocks rather than one recovering from them. For workers making location decisions, that distinction matters. Stability is a condition you can plan around. It is not the same as conditions improving.
          </p>
        </div>

        {/* City Insights */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={7} title="Lakive City Insights" />
          <Body>Scores below are Lakive composite ratings (0–100) based on salary, housing affordability, tax burden, employment opportunity, and quality of life. Data version: Oct 2026 v1.</Body>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, margin: '20px 0 12px' }}>Cross-City Score: Key Occupations</h3>
          <OccTable />

          {[
            {
              city: 'Calgary',
              score: 74,
              rpi: 33,
              text: 'Calgary holds its position as top-scoring city for a sixth consecutive data version. The CREA benchmark at $569,800 and a no-PST cost structure continue to offer relatively favourable housing economics for households with stable employment. In the context of September\'s counter-tariff escalation, Alberta\'s economy — weighted toward domestic demand, energy, and agriculture — carries less direct tariff exposure than Ontario or BC. Workers evaluating a Calgary relocation should model the no-PST advantage against your specific household circumstances, particularly for higher-income occupations where the tax differential is largest.',
            },
            {
              city: 'Halifax',
              score: 58,
              rpi: 40,
              text: 'Halifax warrants closer monitoring for anyone evaluating Atlantic Canada options. Average asking rent at $2,356 — above Calgary and Edmonton — reflects a structural mismatch between the in-migration-driven demand peak of 2022–23 and the wage base that supports it. The CREA benchmark has softened, but at a slower pace than Montreal or Ottawa. For healthcare workers and government employees, Halifax offers genuine employment opportunities with a quality-of-life premium. For trades and tech workers, the wage-to-rent ratio requires careful analysis before committing. Lakive will publish a dedicated Halifax deep-dive in Q4.',
            },
            {
              city: 'Toronto',
              score: 60,
              rpi: 48,
              text: 'Toronto holds at 60 with CREA\'s August data providing the first tentative housing signal of the cycle: the -3.0% YoY decline is the smallest in over a year. That is a data point, not a trend — but it is the data point the Toronto market has been waiting for. Tech employment (EOI: 92) continues to absorb tariff-related uncertainty, with US firms maintaining Canadian hiring plans through Q3. The critical watch for Q4 is whether the October 9 LFS data shows continued jobs losses in professional services — the sector most exposed to discretionary spending cuts.',
            },
            {
              city: 'Ottawa',
              score: 68,
              rpi: 36,
              text: 'Ottawa ranks second nationally and offers the most recession-resistant employment profile of any covered city. Federal employment, representing roughly 22% of the Ottawa CMA labour force, provides a structural floor that private-sector cities lack. Wage growth in federal contracts tends to track CPI adjustments — offering partial real-wage protection at a time when private-sector wages are falling behind inflation. For workers in healthcare, technology, and public administration, Ottawa\'s profile is stronger in Q4 2026 than at any point since the easing cycle began.',
            },
            {
              city: 'Vancouver',
              score: 58,
              rpi: 52,
              text: 'Vancouver carries the highest risk-adjusted affordability pressure of any covered city. RPI of 52, CREA benchmark at $1,081,900, RBC affordability at 83.9% — these are structural constraints, not cyclical ones. The city\'s trade-exposed economy adds a tariff headwind that is more direct here than elsewhere. For high-income specialists in tech and medicine, Vancouver\'s quality-of-life premium and strong labour market justify the cost premium. For most other occupations, the math requires careful household-specific modelling.',
            },
          ].map(c => (
            <div key={c.city} style={{ margin: '20px 0' }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: NAVY, margin: '0 0 6px' }}>
                {c.city} <span style={{ color: GREY, fontWeight: 500 }}>— Lakive City Score {c.score} · RPI {c.rpi}</span>
              </h3>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: 0 }}>{c.text}</p>
            </div>
          ))}

          <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/ranking" style={{ background: NAVY, color: '#fff', padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>View Full Rankings →</Link>
            <Link href="/compare" style={{ border: `1px solid ${NAVY}`, color: NAVY, padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Compare Cities →</Link>
          </div>
        </div>

        {/* Looking Ahead */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={8} title="Looking Ahead" />
          <LookingAheadTable />
          <Callout
            label="Key watch:"
            text="October 9 Statistics Canada LFS (September employment) and October 28 Bank of Canada decision are the two events that will define Q4 2026. LFS data feeds directly into the BoC's October deliberations. Lakive will publish updated city signals following both releases. Subscribe to the newsletter for same-day coverage."
            color={RED} bg="#FEF2F2"
          />
        </div>

        {/* Data Sources */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 40, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={9} title="Data Sources" />
          <Body>
            Lakive's city scores (Score, HPI, RPI, EOI) are proprietary composites calculated from public government and industry data. Inputs include median occupational wages (Job Bank Canada), home benchmark prices (CREA), average asking rents (Rentals.ca × Urbanation), provincial tax schedules, and employment absorption rates (Statistics Canada). The composite weighting methodology is not disclosed. Scores are recalibrated with each major data release.
          </Body>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, marginTop: 12 }}>
              <thead>
                <tr style={{ background: NAVY }}>
                  <th style={{ padding: '9px 12px', textAlign: 'left', color: '#fff', fontWeight: 700 }}>Category</th>
                  <th style={{ padding: '9px 12px', textAlign: 'left', color: '#fff', fontWeight: 700 }}>Source</th>
                  <th style={{ padding: '9px 12px', textAlign: 'left', color: '#fff', fontWeight: 700 }}>Frequency</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Rental Market', 'Rentals.ca × Urbanation', 'Monthly (~8th)'],
                  ['Employment', 'Statistics Canada LFS', 'Monthly (first Friday)'],
                  ['Home Prices', 'CREA National Statistics', 'Monthly (15–18th)'],
                  ['Affordability', 'RBC Housing Affordability Report', 'Quarterly'],
                  ['Interest Rate', 'Bank of Canada', '8× per year'],
                  ['City Scores (HPI/RPI/EOI)', 'Lakive proprietary model', 'Updated each data release'],
                ].map(([cat, src, freq], i) => (
                  <tr key={cat} style={{ background: i % 2 === 0 ? '#F8FAFC' : '#fff' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600, color: NAVY, borderBottom: '1px solid #E5E7EB' }}>{cat}</td>
                    <td style={{ padding: '8px 12px', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>{src}</td>
                    <td style={{ padding: '8px 12px', color: GREY, borderBottom: '1px solid #E5E7EB' }}>{freq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: GREY, fontStyle: 'italic', marginTop: 16, lineHeight: 1.6 }}>
            © 2026 Lakive. All rights reserved. This report is for informational purposes only and does not constitute financial or investment advice. · <Link href="/reports" style={{ color: BLUE }}>All Reports</Link>
          </p>
        </div>

      <ShareBar
        url="https://lakive.com/reports/monthly-report-september-2026"
        title="Lakive Monthly Report — September 2026"
        lang="en"
      />

      </div>
    </main>
  )
}
