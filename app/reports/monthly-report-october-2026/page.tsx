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

function FourLayerCard({ observed, seasonal, interpretation, implications }: {
  observed: string; seasonal: string; interpretation: string; implications: string
}) {
  const layers = [
    { label: 'Observed', icon: '📊', text: observed, border: '#3B82F6', bg: '#EFF6FF' },
    { label: 'Seasonal Adjustment', icon: '📅', text: seasonal, border: GREY, bg: '#F8FAFC' },
    { label: 'Interpretation', icon: '🔍', text: interpretation, border: TEAL, bg: '#F0FDFA' },
    { label: 'Implications', icon: '→', text: implications, border: ORG, bg: '#FFF7ED' },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '16px 0' }}>
      {layers.map(l => (
        <div key={l.label} style={{ borderLeft: `3px solid ${l.border}`, background: l.bg, padding: '10px 14px', borderRadius: '0 8px 8px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: l.border, marginBottom: 5 }}>
            {l.icon} {l.label}
          </div>
          <p style={{ fontSize: 13, color: '#374151', margin: 0, lineHeight: 1.6 }}>{l.text}</p>
        </div>
      ))}
    </div>
  )
}

function DivergenceModule({ divergences }: { divergences: Array<{ signal: string; up: string; down: string; explanation: string }> }) {
  return (
    <div style={{ background: '#FFFBEB', border: `1px solid ${AMBER}`, borderRadius: 12, padding: '20px 24px', margin: '16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 18 }}>⚡</span>
        <div>
          <div style={{ fontWeight: 800, color: AMBER, fontSize: 15 }}>指标分歧 · Indicator Divergence</div>
          <div style={{ fontSize: 12, color: GREY, marginTop: 2 }}>Multiple indicators are moving in different directions this month. Here is why they don&apos;t contradict each other.</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {divergences.map((d, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #FDE68A', borderRadius: 8, padding: '12px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 12, alignItems: 'start' }}>
            <div>
              <span style={{ color: GRN, fontWeight: 700, fontSize: 13 }}>↑ {d.up}</span>
            </div>
            <div>
              <span style={{ color: RED, fontWeight: 700, fontSize: 13 }}>↓ {d.down}</span>
            </div>
            <div>
              <p style={{ fontSize: 13, color: '#374151', margin: 0, lineHeight: 1.6 }}>{d.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Callout({ label, text, color, bg }: { label: string; text: string; color: string; bg: string }) {
  return (
    <div style={{ background: bg, borderLeft: `4px solid ${color}`, borderRadius: '0 10px 10px 0', padding: '14px 18px', margin: '16px 0' }}>
      <span style={{ fontWeight: 800, color, fontSize: 13 }}>{label} </span>
      <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.65 }}>{text}</span>
    </div>
  )
}

// ── KPI summary table ─────────────────────────────────────────────────────────
function KpiTable() {
  const rows = [
    { label: 'BoC Overnight Rate', value: '2.50%', change: '+25 bps (Oct 28 hike)', dir: 'up', note: 'First hike after period of cuts and extended hold; next decision Dec 9' },
    { label: 'CPI Inflation', value: '3.1%', change: '+0.4 pp from Sep', dir: 'up', note: 'Core CPI 1.9% — tariff pass-through widening headline vs core gap' },
    { label: 'Net Employment (Oct LFS)', value: '−68,000', change: 'Unemployment 6.5%', dir: 'down', note: 'Public sector education −70K dominated decline; private sector flat' },
    { label: 'CREA National HPI', value: '−3.4% YoY', change: 'Avg price $666,538', dir: 'neutral', note: 'Slight deepening from Aug −3.0%; national benchmark prices stabilizing' },
    { label: 'Listing Rents (Rentals.ca)', value: '−4.2% YoY', change: '24th consecutive monthly decline', dir: 'down', note: 'What newcomers face; CPI rent component +2.8% (incumbent tenants)' },
  ]
  const dirColor = (d: string) => d === 'up' ? RED : d === 'down' ? GRN : AMBER
  const dirArrow = (d: string) => d === 'up' ? '▲' : d === 'down' ? '▼' : '→'
  return (
    <div style={{ overflowX: 'auto', margin: '16px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: NAVY }}>
            {['Indicator', 'Value', 'Change / Context', 'Lakive Note'].map(h => (
              <th key={h} style={{ padding: '9px 12px', textAlign: 'left', color: '#fff', fontWeight: 700 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.label} style={{ background: i % 2 === 0 ? '#F8FAFC' : '#fff' }}>
              <td style={{ padding: '9px 12px', fontWeight: 700, color: NAVY, borderBottom: '1px solid #E5E7EB' }}>{r.label}</td>
              <td style={{ padding: '9px 12px', fontWeight: 800, color: dirColor(r.dir), borderBottom: '1px solid #E5E7EB' }}>{dirArrow(r.dir)} {r.value}</td>
              <td style={{ padding: '9px 12px', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>{r.change}</td>
              <td style={{ padding: '9px 12px', color: GREY, fontSize: 13, borderBottom: '1px solid #E5E7EB' }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── What Changed table ────────────────────────────────────────────────────────
function ChangesTable() {
  const rows = [
    { area: 'BoC Rate', prev: '2.25% (hold)', now: '2.50% (+25 bps)', impact: 'Mortgage carrying costs rise; affordability tightens in high-HPI cities', dir: 'worse' },
    { area: 'CPI', prev: '2.7% (Sep)', now: '3.1% (Oct)', impact: 'Tariff pass-through accelerating; real-wage erosion continues', dir: 'worse' },
    { area: 'Employment', prev: '−42K (Aug LFS)', now: '−68K (Oct LFS)', impact: 'Public sector education dominated decline; private sector flat', dir: 'worse' },
    { area: 'CREA HPI', prev: '−3.0% YoY (Aug)', now: '−3.4% YoY (Oct)', impact: 'Slight deepening; average price $666,538', dir: 'neutral' },
    { area: 'Listing Rents', prev: '−4.8% YoY (23rd month)', now: '−4.2% YoY (24th month)', impact: 'Pace of decline moderating; CPI rent +2.8% (incumbent tenants)', dir: 'neutral' },
  ]
  const col = (d: string) => d === 'worse' ? RED : d === 'better' ? GRN : AMBER
  return (
    <div style={{ overflowX: 'auto', margin: '8px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: NAVY }}>
            {['Area', 'Last Month', 'This Month', 'Impact on City Fit'].map(h => (
              <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#fff', fontWeight: 700 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.area} style={{ background: i % 2 === 0 ? '#F8FAFC' : '#fff' }}>
              <td style={{ padding: '8px 12px', fontWeight: 700, color: NAVY, borderBottom: '1px solid #E5E7EB' }}>{r.area}</td>
              <td style={{ padding: '8px 12px', color: GREY, borderBottom: '1px solid #E5E7EB' }}>{r.prev}</td>
              <td style={{ padding: '8px 12px', fontWeight: 700, color: col(r.dir), borderBottom: '1px solid #E5E7EB' }}>{r.now}</td>
              <td style={{ padding: '8px 12px', color: '#374151', fontSize: 13, borderBottom: '1px solid #E5E7EB' }}>{r.impact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── City score table ──────────────────────────────────────────────────────────
function CityScoreTable() {
  const rows = [
    { city: 'Calgary', score: 76, eoi: 'High', tai: 82, hpi: 4.1, rpi: 31, rpiColor: GRN, signal: 'Cost advantage widens post-hike; no-PST buffer largest for high earners' },
    { city: 'Edmonton', score: 74, eoi: 'High', tai: 80, hpi: 4.0, rpi: 26, rpiColor: GRN, signal: 'Benchmark $428K; strongest affordability-to-wage ratio nationally' },
    { city: 'Winnipeg', score: 68, eoi: 'Mid', tai: 76, hpi: 3.7, rpi: 28, rpiColor: GRN, signal: 'Underrated affordability; steady trades and healthcare demand' },
    { city: 'Ottawa', score: 70, eoi: 'High', tai: 72, hpi: 5.6, rpi: 34, rpiColor: AMBER, signal: 'Federal employment floor; inflation-indexed wage contracts' },
    { city: 'Montréal', score: 62, eoi: 'Mid', tai: 68, hpi: 5.2, rpi: 36, rpiColor: AMBER, signal: 'Affordable relative to Toronto/Vancouver; tariff exposure via manufacturing' },
    { city: 'Halifax', score: 58, eoi: 'Mid', tai: 70, hpi: 7.2, rpi: 42, rpiColor: RED, signal: 'Rent-to-wage mismatch persists; monitor CREA benchmark trajectory' },
    { city: 'Toronto', score: 57, eoi: 'High', tai: 62, hpi: 10.9, rpi: 46, rpiColor: RED, signal: 'Rate hike adds pressure; jobs losses concentrated in public education' },
    { city: 'Vancouver', score: 54, eoi: 'High', tai: 60, hpi: 11.7, rpi: 52, rpiColor: RED, signal: 'Highest cost pressure nationally; RBC burden 83.9% of median income' },
  ]
  return (
    <div style={{ overflowX: 'auto', margin: '16px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: NAVY }}>
            {['City', 'Score', 'EOI / TAI', 'HPI (yrs)', 'RPI', 'Signal'].map(h => (
              <th key={h} style={{ padding: '9px 12px', textAlign: h === 'City' || h === 'Signal' ? 'left' : 'center', color: '#fff', fontWeight: 700 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.city} style={{ background: i % 2 === 0 ? '#F8FAFC' : '#fff' }}>
              <td style={{ padding: '9px 12px', fontWeight: 700, color: NAVY, borderBottom: '1px solid #E5E7EB' }}>{r.city}</td>
              <td style={{ padding: '9px 12px', textAlign: 'center', fontWeight: 800, color: r.score >= 70 ? GRN : r.score >= 60 ? AMBER : RED, borderBottom: '1px solid #E5E7EB' }}>{r.score}</td>
              <td style={{ padding: '9px 12px', textAlign: 'center', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>{r.eoi} / {r.tai}</td>
              <td style={{ padding: '9px 12px', textAlign: 'center', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>{r.hpi}</td>
              <td style={{ padding: '9px 12px', textAlign: 'center', fontWeight: 700, color: r.rpiColor, borderBottom: '1px solid #E5E7EB' }}>{r.rpi}</td>
              <td style={{ padding: '9px 12px', color: GREY, fontSize: 13, borderBottom: '1px solid #E5E7EB' }}>{r.signal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 12, color: GREY, fontStyle: 'italic', marginTop: 8 }}>
        Score = Lakive composite (0–100). EOI = Employment Opportunity Index. TAI = Tax Advantage Index. RPI = Rent Pressure Index (lower is better). HPI = years of median after-tax income to 20% down payment. Data version: Oct 2026 v2.
      </p>
    </div>
  )
}

// ── Occupation scores table ───────────────────────────────────────────────────
function OccTable() {
  const rows = [
    { occ: 'Electrician', city: 'Calgary', score: 91, hpi: 4.1, rpi: 24, eoi: 'High', note: '#1 trades city · 4.1 yrs to 20% down payment · no-PST advantage largest in high-income tier', sc: GRN, rc: GRN, ec: GRN },
    { occ: 'Electrician', city: 'Edmonton', score: 88, hpi: 4.0, rpi: 24, eoi: 'High', note: 'Rising primary alternative · benchmark $428K · strong in-migration from eastern Canada', sc: GRN, rc: GRN, ec: GRN },
    { occ: 'Electrician', city: 'Ottawa', score: 74, hpi: 5.6, rpi: 28, eoi: 'Mid', note: 'Federal infrastructure spending supports steady demand · government construction pipeline', sc: AMBER, rc: GRN, ec: AMBER },
    { occ: 'Electrician', city: 'Toronto', score: 72, hpi: 10.9, rpi: 40, eoi: 'High', note: 'High demand but rate hike extends ownership timeline · 2BR benchmark $920K', sc: AMBER, rc: RED, ec: GRN },
    { occ: 'Electrician', city: 'Vancouver', score: 70, hpi: 11.7, rpi: 42, eoi: 'High', note: 'Strong demand; $1,068K benchmark a structural ceiling · rent relief not reaching ownership', sc: AMBER, rc: RED, ec: GRN },
    { occ: 'Nurse', city: 'Calgary', score: 86, hpi: 4.5, rpi: 24, eoi: 'High', note: 'Best nurse city nationally · no-PST advantage adds most value at nurse salary band', sc: GRN, rc: GRN, ec: GRN },
    { occ: 'Nurse', city: 'Ottawa', score: 82, hpi: 6.5, rpi: 26, eoi: 'High', note: 'Federal healthcare stability · inflation-indexed wage contracts partially offset rate hike', sc: GRN, rc: GRN, ec: GRN },
    { occ: 'Nurse', city: 'Halifax', score: 72, hpi: 7.2, rpi: 36, eoi: 'Mid', note: 'Quality-of-life premium; monitor rent-to-wage gap before committing', sc: AMBER, rc: AMBER, ec: AMBER },
    { occ: 'Software Eng.', city: 'Toronto', score: 88, hpi: 9.0, rpi: 34, eoi: 'High', note: 'Highest tech EOI nationally · US firms maintaining Canadian ops through Q4', sc: GRN, rc: AMBER, ec: GRN },
    { occ: 'Software Eng.', city: 'Kitchener-Waterloo', score: 82, hpi: 7.4, rpi: 28, eoi: 'High', note: 'Strong tech cluster at fraction of Toronto cost · Waterloo corridor growing', sc: GRN, rc: GRN, ec: GRN },
    { occ: 'Software Eng.', city: 'Ottawa', score: 80, hpi: 7.0, rpi: 28, eoi: 'High', note: 'Government tech contracts provide recession-resistant demand floor', sc: GRN, rc: GRN, ec: GRN },
  ]
  return (
    <div style={{ overflowX: 'auto', margin: '16px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: NAVY }}>
            {['Occupation', 'City', 'Score', 'HPI (yrs)', 'RPI', 'EOI', 'Lakive Insight'].map(h => (
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
        HPI = Housing Years Index (years of after-tax income to 20% down payment on 2BR). Full rankings at{' '}
        <Link href="/ranking" style={{ color: BLUE }}>lakive.com/ranking</Link>
      </p>
    </div>
  )
}

// ── Looking Ahead table ───────────────────────────────────────────────────────
function LookingAheadTable() {
  const rows = [
    { date: 'Nov 6', release: 'Statistics Canada LFS — October employment', updates: 'Net jobs · unemployment rate · wage growth · City Pulse employment signal', urgent: true },
    { date: 'Nov 16', release: 'Statistics Canada CPI — October inflation', updates: 'CPI headline · core CPI · tariff pass-through tracking · housing costs component', urgent: false },
    { date: 'Dec 9', release: 'Bank of Canada rate decision', updates: 'BoC Rate in City Pulse · mortgage calculator · housing guide · key signal for Q1 2027 planning', urgent: true },
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
export default function MonthlyReportOctober2026() {
  return (
    <main style={{ background: '#F5F7FB', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{ background: NAVY, padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: TEAL, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Monthly Report</span>
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>·</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.40)', letterSpacing: '0.06em' }}>Oct 2026</span>
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>·</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.40)' }}>Data version Oct 2026 v2</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: '#fff', lineHeight: 1.15, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            Canada — October 2026
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.60)', margin: '0 0 32px', fontStyle: 'italic' }}>
            The October Tension: Rate Hike Meets a Weakening Labour Market
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Published November 5, 2026 · Lakive Research</span>
            <a
              href="/reports/pdf/Lakive_Monthly_October_2026_V2.pdf"
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
            October 2026 broke the pattern. The Bank of Canada hiked its overnight rate by 25 basis points to 2.50% on October 28 — ending a period of rate cuts followed by an extended hold — citing tariff-driven inflation that has pushed headline CPI to 3.1%, the highest reading since early 2025. That decision landed in the same month that Canada shed 68,000 net jobs, with October&apos;s Labour Force Survey dominated by a loss of 70,000 positions in public sector education.
          </Body>
          <Body>
            The result is a classic policy tension: a central bank tightening into a weakening labour market. The rate hike resolves nothing on affordability — it adds 20–30 basis points to variable mortgage costs at precisely the moment job security is declining. National listing rents fell for a 24th consecutive month, now −4.2% year-over-year. But that figure describes what a new renter sees; the CPI rent component, which tracks incumbent tenants, is up 2.8% — a distinction that matters for household cost planning.
          </Body>
          <Body>
            The Prairie and Atlantic cost advantage against Ontario and British Columbia has never been wider on a post-hike basis. An electrician in Calgary reaches 20% down payment in 4.1 years; the same worker in Toronto needs 10.9 years, and Vancouver 11.7 years. With the rate hike adding to carrying costs in high-HPI cities, the structural case for mid-market relocation is the strongest it has been in this cycle.
          </Body>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, margin: '20px 0 12px' }}>Key Numbers at a Glance</h3>
          <KpiTable />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, margin: '24px 0 12px' }}>5 Actionable Takeaways</h3>
          {[
            'Trades workers: Calgary (Electrician 91) and Edmonton (88) are the clearest national opportunities. The rate hike adds to mortgage carrying costs everywhere, but its impact in Calgary — where HPI is 4.1 years — is a fraction of its impact in Toronto (HPI 10.9 years) or Vancouver (HPI 11.7 years). For an electrician household, the post-hike affordability gap between Calgary and the two major metros has never been wider.',
            'Healthcare workers: Calgary (Nurse 86) and Ottawa (82) lead the national score table. Ottawa\'s federal healthcare employment base provides unusual insulation against the labour market weakness visible in October\'s LFS data. The inflation-indexed wage contract structure in federal health means real wages are not falling at the same rate as private-sector workers.',
            'Tech professionals: Toronto (Software Eng. 88) holds its national lead. The October jobs losses were concentrated in public sector education — private sector employment was flat, and professional services hiring has been resilient through Q3. Kitchener-Waterloo (82) is worth serious consideration for tech workers: the same corridor, at materially lower housing cost.',
            'Renters: The 24th consecutive monthly decline in listing rents (−4.2% YoY) means the window to lock in a below-peak lease remains open. The pace of decline is moderating, however, and CPI rent (+2.8%) shows incumbent tenants are not sharing in the discount. Lock in now rather than waiting for further drops.',
            'Buyers: The rate hike adds 20–30 bps to variable mortgage costs immediately. The December 9 BoC decision is the next critical signal. If November CPI (releasing Nov 16) shows the inflation gap between headline and core narrowing, the Bank may hold in December. That would define whether October\'s hike was a one-off or the start of a new tightening cycle — a distinction worth waiting three weeks to see before committing to a purchase.',
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, margin: '8px 0' }}>
              <span style={{ width: 24, height: 24, borderRadius: '50%', background: TEAL, color: '#fff', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.65, margin: 0 }}>{t}</p>
            </div>
          ))}
        </div>

        {/* National Overview */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={2} title="National Overview: A Hike Without Relief" />
          <Body>
            The Bank of Canada&apos;s October 28 decision to raise rates by 25 basis points was not unexpected — markets had been pricing approximately 60% probability of a hike heading into the meeting — but it marks a significant shift in the policy trajectory. The BoC cited tariff-driven cost pressure as the primary driver: headline CPI at 3.1% is now meaningfully above the 2% target, and the Bank characterized the gap between headline (3.1%) and core (1.9%) inflation as a signal of tariff pass-through rather than demand-driven inflation. That distinction matters: it means the Bank is hiking despite, not because of, strong economic conditions.
          </Body>
          <Body>
            The employment picture adds complexity. October&apos;s LFS reported a loss of 68,000 net jobs — dominated by a decline of 70,000 in public sector education, reflecting a timing anomaly in how education employment is counted in the fall. Private sector employment was essentially flat. The Bank will have November&apos;s LFS data (November 6) before the December 9 decision, which will clarify whether October&apos;s weakness is a one-month statistical pattern or the start of a broader deterioration.
          </Body>
          <Body>
            Population growth has stabilized at approximately 0.6% year-over-year — still below the 2024 pace but no longer decelerating sharply. This matters for the rental market: the demand deceleration that drove 24 consecutive months of listing rent declines may be approaching a floor, particularly in cities with active in-migration from other provinces.
          </Body>
          <Callout
            label="Lakive Interpretation:"
            text="The rate hike resolves nothing for affordability — it tightens the housing market in high-HPI cities at a moment of labour market uncertainty. For workers making city relocation decisions, October 2026 makes the structural case for mid-market cities (Calgary, Edmonton, Kitchener-Waterloo, Ottawa) stronger than at any point in the past two years. The hike does not change the long-term fundamentals; it amplifies the existing divergence between cities where housing costs represent a manageable share of occupational income and those where they represent an unsustainable one."
            color={TEAL} bg="#F0FDFA"
          />
        </div>

        {/* Rental */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={3} title="National Rental Market" />
          <Source text="Source: Rentals.ca × Urbanation National Rent Report, October 2026. CPI rent component: Statistics Canada, October 2026." />
          <Body>
            National average asking rents fell for a 24th consecutive month in October, now −4.2% year-over-year. The pace of decline has moderated from September&apos;s −4.8% — a pattern consistent with seasonal demand stabilization and an approaching floor as population growth stabilizes around 0.6% year-over-year.
          </Body>
          <Body>
            There is a critical distinction that the aggregate headline obscures: the Rentals.ca figure (−4.2%) represents what new renters face when signing a lease today. The Statistics Canada CPI rent component (+2.8%) represents what incumbent tenants are paying relative to a year ago, as their existing leases renew at higher rates. These two numbers are not contradictory — they describe different populations at different points in their rental tenure. For a household deciding whether to move, the −4.2% listing market is the operative figure. For a household budgeting annual cost increases, the +2.8% CPI component is the operative figure.
          </Body>
          <FourLayerCard
            observed="National avg asking rent declining for 24th consecutive month: −4.2% YoY. CPI rent component: +2.8% YoY. City range: Vancouver $2,680 · Toronto $2,540 · Calgary $1,840 · Edmonton $1,540."
            seasonal="October is the end of peak rental season. The moderation in the annual decline rate (from −4.8% in Sep to −4.2%) is partly seasonal — fall demand is firmer than summer. Seasonally adjusted, the structural downtrend in listing rents remains intact."
            interpretation="The divergence between listing rents (−4.2%) and CPI rent (+2.8%) reflects lease-lag dynamics: existing tenants are still seeing catch-up rent increases on renewals, while new leases are priced into a softer market. This gap will close over 12–18 months as more leases cycle through."
            implications="For renters: October is a strong window to lock in a new lease at below-peak rates before seasonal demand stabilizes further. For buyers: the listing rent decline reduces the urgency of exiting renting — but the rate hike has extended the case for waiting in high-HPI cities."
          />
          <Callout
            label="⚠ Rate hike impact:"
            text="The 25 bps rate hike adds directly to variable mortgage carrying costs — by approximately $80–120/month on a $500K mortgage — which maintains rental demand pressure in high-HPI cities where the buy vs. rent calculus has shifted further toward renting. In Calgary and Edmonton, where the rent-to-ownership ratio is narrower, the impact on rent demand is more muted."
            color={AMBER} bg="#FFFBEB"
          />
        </div>

        {/* Housing */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={4} title="Housing Market: Rate Hike Stalls the Recovery Signal" />
          <Source text="Source: CREA National Statistics, October 2026. Lakive Housing Years Index (HPI) reflects current model calculations, data version Oct 2026 v2." />
          <Body>
            CREA&apos;s October 2026 data shows a national benchmark HPI of −3.4% year-over-year — a slight deepening from August&apos;s −3.0% and a reversal of the stabilization signal that September&apos;s data appeared to offer. The national average sale price was $666,538. The rate hike on October 28 is not yet reflected in CREA transaction data, but its psychological impact — buyer hesitation ahead of a decision that many had expected to be a hold — is likely visible in October&apos;s volume figures.
          </Body>
          <Body>
            City benchmarks: Vancouver $1,068,000, Toronto $920,000, Calgary $575,000, Edmonton $428,000. The Prairie-to-major-metro gap has widened further on a carrying-cost basis post-hike: a $575,000 Calgary purchase at 2.50% (5-year variable) carries approximately $2,890/month on a 25-year amortization. The equivalent Toronto purchase at $920,000 carries approximately $4,620/month — a $1,730 monthly gap that has grown by approximately $200 since October&apos;s hike.
          </Body>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, margin: '20px 0 12px' }}>Lakive City Scores — October 2026</h3>
          <p style={{ fontSize: 11, color: GREY, margin: '-4px 0 10px', fontStyle: 'italic' }}>Scores reflect the Oct 2026 v2 data snapshot. Current values on <a href="/ranking" style={{ color: NAVY }}>lakive.com/ranking</a> may differ as data is updated.</p>
          <CityScoreTable />
          <Callout
            label="Lakive Interpretation:"
            text="The HPI deepening to −3.4% combined with the rate hike represents a setback for the tentative stabilization signal in the September data. The December 9 BoC decision will determine whether affordability conditions deteriorate further into 2027 or stabilize. For workers in high-HPI cities evaluating relocation, October 2026 is a natural recalibration point: the data has shifted the balance of evidence further toward mid-market cities."
            color={ORG} bg="#FFF7ED"
          />
        </div>

        {/* Employment */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={5} title="Employment Snapshot" />
          <Source text="Source: Statistics Canada LFS, October 2026 (released November 6, 2026). Next release: LFS November, releasing December 5." />
          <Body>
            Canada&apos;s labour market shed 68,000 net jobs in October. The headline number is dominated by a loss of 70,000 positions in public sector education — a statistical pattern reflecting how fall education employment is counted, and not representative of private sector conditions, which were essentially flat. The unemployment rate rose to 6.5%. Wage growth continued at approximately +2.1% year-over-year, still below headline CPI (3.1%), meaning real wages continue to erode.
          </Body>
          <div style={{ paddingLeft: 16 }}>
            {[
              'Net employment change: −68,000 — dominated by public sector education (−70K); private sector approximately flat',
              'Unemployment rate: 6.5% (▲ from 6.4% in September)',
              'Public sector: Education −70,000 (timing/classification effect); healthcare and public admin stable',
              'Private sector: Approximately flat overall; professional services holding; construction slightly negative',
              'Wages: average hourly earnings +2.1% YoY — below CPI 3.1% · real wages declining for third consecutive month',
              'Participation rate: Held approximately flat — unemployment rise reflects actual job losses, not participation changes',
            ].map(t => (
              <div key={t} style={{ display: 'flex', gap: 10, margin: '6px 0' }}>
                <span style={{ color: RED, fontWeight: 700, flexShrink: 0 }}>•</span>
                <p style={{ fontSize: 14, color: '#374151', margin: 0, lineHeight: 1.6 }}>{t}</p>
              </div>
            ))}
          </div>
          <Callout
            label="Lakive Interpretation:"
            text="October's −68K figure is likely worse-looking than the underlying trend: public sector education employment often shows sharp October changes due to classification timing. The November 6 LFS release, which arrives before the December 9 BoC decision, will provide the more reliable signal. If November shows a rebound in education employment and stable private sector conditions, the Bank will likely hold in December. If private sector weakness emerges, the December decision becomes more complex. Watch November LFS as the key indicator for Q1 2027 city score revisions."
            color={RED} bg="#FEF2F2"
          />
        </div>

        {/* Rates */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={6} title="Interest Rates & Tariff Exposure" />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, margin: '4px 0 10px' }}>Bank of Canada — 2.50% (+25 bps, October 28)</h3>
          <Body>
            The Bank of Canada raised its overnight rate by 25 basis points to 2.50% at its October 28 meeting — the first hike since the period of rate cuts ended. The decision was driven primarily by the gap between headline CPI (3.1%) and core CPI (1.9%): the Bank characterized the headline inflation as tariff-driven cost pressure rather than demand-driven, but concluded that allowing headline to run this far above target risked de-anchoring inflation expectations.
          </Body>
          <Body>
            The December 9 decision will depend heavily on two data releases: the November CPI (releasing November 16) and the November LFS (releasing December 5). If headline inflation shows signs of the tariff pass-through peaking — particularly if core CPI remains contained near 2% — the Bank may characterize October&apos;s hike as a one-time adjustment and hold in December. That scenario would limit the damage to affordability. If headline continues to accelerate, further tightening becomes possible.
          </Body>
          <Callout
            label="Lakive Interpretation:"
            text="The hike adds directly to variable mortgage carrying costs. For workers in high-HPI cities — Toronto, Vancouver — the monthly increase is $80–200 depending on mortgage size. For workers in low-HPI cities — Calgary, Edmonton — the same rate applies to a smaller principal, so the absolute impact is lower. The hike widens the already-significant cost gap between mid-market and high-cost cities. Workers currently undecided between Toronto and Calgary should run the carrying-cost comparison at 2.50% before making a commitment."
            color={TEAL} bg="#F0FDFA"
          />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, margin: '20px 0 10px' }}>Tariff Context</h3>
          <Body>
            The tariff-inflation dynamic continues to drive the monetary policy tension. The BoC&apos;s own models suggest the tariff contribution to headline CPI is approximately 0.8–1.2 percentage points — meaning underlying demand-driven inflation remains near target. The Bank has chosen to respond to the headline nonetheless, citing anchoring risk. This means the current hiking cycle, if it extends, would be driven by external cost pressure rather than domestic overheating — an unusual condition that makes the conventional rate-hike affordability analysis more pessimistic than typical: higher rates without demand-side strength mean the labour market bears the full cost of the adjustment without the wage growth that normally accompanies tightening cycles.
          </Body>
          <Callout
            label="City exposure note:"
            text="Vancouver and Toronto carry the highest combined exposure: high-HPI housing that is most sensitive to rate hikes, plus trade-dependent industries most exposed to tariff dynamics. Calgary and Ottawa remain the most insulated: Alberta's economy is not trade-manufactured, and Ottawa's federal employment base is not directly exposed to tariff dynamics. The October hike has reinforced this structural divergence."
            color={AMBER} bg="#FFFBEB"
          />
        </div>

        {/* Indicator Divergence */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={7} title="指标分歧解释 · Why the Data Looks Contradictory" />
          <Body>
            October 2026 presents an unusually complex set of diverging signals. Each apparent contradiction has a specific structural explanation.
          </Body>
          <DivergenceModule divergences={[
            {
              signal: 'Rate hike + Weak jobs (policy vs. reality)',
              up: 'BoC hikes (tightening)',
              down: 'Jobs −68K (weakening)',
              explanation: 'The hike was driven by tariff-induced headline inflation (3.1%), not by a strong economy. The Bank is tightening against external cost pressure rather than domestic overheating — an unusual combination that means higher rates without the wage growth that normally accompanies them. Workers and borrowers bear the cost; inflation relief is not guaranteed.',
            },
            {
              signal: 'Listing rents ↓ + CPI rent ↑ (two markets)',
              up: 'CPI rent +2.8% (incumbents)',
              down: 'Listing rents −4.2% (newcomers)',
              explanation: 'These measure different populations. Listing rents (−4.2%) reflect what a new renter signing today will pay. CPI rent (+2.8%) reflects what existing tenants are paying as leases renew at catch-up rates. Both are correct. The gap is a lease-lag effect that will close over 12–18 months as more leases cycle through the softer market.',
            },
            {
              signal: 'Education employment ↓ + Private sector flat (statistical)',
              up: 'Private sector flat',
              down: 'Public education −70K',
              explanation: 'Education employment shows a large October classification change each year due to how Statistics Canada counts term employment at the start of the academic year. The −70K in education is largely a timing effect — not a signal of actual job losses in the sector. The private sector flat reading is the more economically meaningful signal for city-level employment analysis.',
            },
          ]} />
        </div>

        {/* Insight of the Month */}
        <div style={{ background: NAVY, borderRadius: 14, padding: '28px 32px', marginBottom: 24, borderLeft: `5px solid ${AMBER}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 20 }}>📊</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: AMBER, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Insight of the Month</span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: AMBER, margin: '0 0 14px' }}>
            The October Tension
          </h2>
          <p style={{ fontSize: 15, color: '#CBD5E1', lineHeight: 1.75, margin: 0 }}>
            October 2026 is a month of genuine policy tension. The Bank of Canada hiked into a weakening labour market — not because the economy was overheating, but because tariff-driven inflation threatened to de-anchor expectations. The rate hike does not resolve affordability. It tightens it. National listing rents fell for a 24th month. But the CPI rent component is up 2.8% — incumbents are still paying more. Jobs fell 68,000 — but public sector education dominated, and private sector conditions were flat. The data contains contradictions that are not contradictions: they are different measurements of different populations at different points in time. What is not ambiguous is the direction of the city-level divergence. Calgary and Edmonton are more affordable relative to Toronto and Vancouver today than at any point in this cycle, and the October rate hike has widened that gap further. For workers making relocation decisions, October 2026 is not a month to wait and see. It is a month where the structural case for mid-market Canada became measurably stronger.
          </p>
        </div>

        {/* City Insights */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={8} title="Lakive City Opportunity Watch" />
          <Body>Scores are Lakive composite ratings (0–100) based on salary, housing affordability, tax burden, employment opportunity, and quality of life. These are Oct 2026 v2 data snapshots — current values may differ.</Body>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, margin: '20px 0 12px' }}>Cross-City Score: Key Occupations</h3>
          <OccTable />

          {[
            {
              city: 'Calgary / Edmonton',
              score: '76 / 74',
              label: 'Cost Advantage',
              labelColor: GRN,
              text: 'The Prairie cost advantage over Toronto and Vancouver has never been wider on a post-rate-hike carrying-cost basis. Calgary\'s CREA benchmark of $575,000 at 2.50% variable generates carrying costs approximately $1,730/month lower than Toronto\'s $920,000 benchmark — a gap that has grown by roughly $200 since the October hike. Edmonton at $428,000 is even more pronounced. For trades workers and healthcare professionals, where salary ranges are largely comparable across these markets, the Calgary/Edmonton scenario generates materially higher disposable income. The no-PST advantage adds an additional layer for higher-income earners.',
            },
            {
              city: 'Ottawa',
              score: '70',
              label: 'Stable',
              labelColor: TEAL,
              text: 'Ottawa holds its position as the most recession-resistant major city in the country. Federal employment — approximately 22% of the Ottawa CMA labour force — provides a floor that private-sector cities cannot replicate. October\'s labour market weakness was concentrated in public sector education and private sector construction; Ottawa\'s federal professional services and technology employment base was not materially affected. For healthcare workers and technology professionals, Ottawa\'s combination of employment stability, inflation-indexed wages, and sub-$600K housing benchmarks represents the strongest risk-adjusted profile in the country after the Prairies.',
            },
            {
              city: 'Toronto',
              score: '57',
              label: 'Mixed',
              labelColor: AMBER,
              text: 'Toronto\'s October picture is mixed at the headline but challenging at the household level. Tech employment (EOI: High) has held through Q3, with US-linked firms maintaining Canadian hiring plans. But the rate hike adds directly to carrying costs on a $920K benchmark — a household committed to Toronto homeownership is now servicing that at 2.50%, not 2.25%. The jobs loss in October was dominated by education, not tech, so the occupational outlook for the city\'s highest-scoring sectors remains intact. The watch for Q4 is whether November LFS shows private sector deterioration. If it does, Toronto\'s EOI signal will come under pressure.',
            },
            {
              city: 'Vancouver',
              score: '54',
              label: 'Cost Pressure',
              labelColor: RED,
              text: 'Vancouver carries the highest combined risk exposure of any covered city: a $1,068K CREA benchmark most sensitive to rate hikes, a trade-dependent economy most exposed to tariff dynamics, and RBC affordability at 83.9% of median income before the October hike. For high-income specialists — particularly in technology and medicine — Vancouver\'s quality-of-life premium and strong labour market continue to justify the cost premium. For most other occupations, October\'s data has pushed the carrying-cost math further beyond the range that standard financial planning supports. The HPI of 11.7 years for an electrician reflects a structural ceiling, not a cyclical condition.',
            },
          ].map(c => (
            <div key={c.city} style={{ margin: '20px 0' }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: NAVY, margin: '0 0 6px' }}>
                {c.city}{' '}
                <span style={{ background: `${c.labelColor}20`, color: c.labelColor, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, marginLeft: 4 }}>{c.label}</span>
                <span style={{ color: GREY, fontWeight: 500, fontSize: 14 }}> — Lakive Score {c.score}</span>
              </h3>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: 0 }}>{c.text}</p>
            </div>
          ))}

          <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/ranking" style={{ background: NAVY, color: '#fff', padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>View Full Rankings →</Link>
            <Link href="/compare" style={{ border: `1px solid ${NAVY}`, color: NAVY, padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Compare Cities →</Link>
          </div>
        </div>

        {/* Research Spotlight */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={9} title="Research Spotlight" />
          <div style={{ background: 'linear-gradient(135deg,rgba(249,115,22,0.07),rgba(45,212,191,0.04))', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: ORG, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Published October 28, 2026</div>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: NAVY, margin: '0 0 10px' }}>Tax Policy and Human Migration</h3>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: '0 0 14px' }}>
              Do taxes drive people to move? A review of five peer-reviewed studies — including Washington State&apos;s 2026 millionaires&apos; tax — shows the answer depends heavily on income level and occupation. High earners show measurable migration response to tax differentials; median-income workers prioritize employment stability and housing cost over tax jurisdiction. With evidence comparison table and Canada vs. U.S. case study.
            </p>
            <Link href="/reports/tax-policy-and-migration-2026" style={{ color: BLUE, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              Read the full report → lakive.com/reports/tax-policy-and-migration-2026
            </Link>
          </div>
        </div>

        {/* Looking Ahead */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={10} title="Looking Ahead" />
          <LookingAheadTable />
          <Callout
            label="Key watch:"
            text="November 6 Statistics Canada LFS (October employment) and November 16 CPI are the two releases that will define the December 9 BoC decision. If November LFS shows private sector stability and CPI shows the headline-core gap narrowing, the Bank will likely hold in December. That scenario would limit the damage to 2027 affordability. Lakive will publish updated city signals following both releases."
            color={RED} bg="#FEF2F2"
          />
        </div>

        {/* Data Sources */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', marginBottom: 40, border: '1px solid #E5E7EB' }}>
          <SectionHeading num={11} title="Data Sources" />
          <Body>
            Lakive&apos;s city scores (Score, HPI, RPI, EOI) are proprietary composites calculated from public government and industry data. Inputs include median occupational wages (Job Bank Canada), home benchmark prices (CREA), average asking rents (Rentals.ca × Urbanation), provincial tax schedules, and employment absorption rates (Statistics Canada). The composite weighting methodology is not disclosed. Scores are recalibrated with each major data release.
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
                  ['Employment', 'Statistics Canada LFS', 'Monthly (second Friday)'],
                  ['Home Prices', 'CREA National Statistics', 'Monthly (15–18th)'],
                  ['Inflation', 'Statistics Canada CPI', 'Monthly (~16th)'],
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
        url="https://lakive.com/reports/monthly-report-october-2026"
        title="Lakive Monthly Report — October 2026"
        lang="en"
      />

      </div>
    </main>
  )
}
