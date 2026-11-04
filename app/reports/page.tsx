import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'City Fit Reports',
  description: 'Data-driven reports on how cities fit real people — by occupation, income, housing goals, family situation, and long-term financial outcomes.',
  alternates: { canonical: 'https://lakive.com/reports' },
}

// ── Inline SVG thumbnails ─────────────────────────────────────────────────
function ThumbTax() {
  return (
    <svg width="140" height="88" viewBox="0 0 140 88" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
      <rect width="140" height="88" rx="6" fill="rgba(249,115,22,0.08)"/>
      {/* diverging bars: left = stays, right = moves */}
      {[
        { y: 14, leftW: 38, rightW: 72, leftC: 'rgba(249,115,22,0.35)', rightC: '#F97316', label: '$250K+' },
        { y: 32, leftW: 52, rightW: 48, leftC: 'rgba(249,115,22,0.35)', rightC: 'rgba(249,115,22,0.7)', label: '$100K' },
        { y: 50, leftW: 62, rightW: 30, leftC: '#F97316', rightC: 'rgba(249,115,22,0.35)', label: '$60K' },
        { y: 68, leftW: 70, rightW: 14, leftC: '#F97316', rightC: 'rgba(249,115,22,0.20)', label: '<$60K' },
      ].map((r, i) => (
        <g key={i}>
          <text x="4" y={r.y + 6} fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace">{r.label}</text>
          <rect x="42" y={r.y} height="10" width={r.leftW} fill={r.leftC} rx="2"/>
          <rect x={42 + r.leftW + 2} y={r.y} height="10" width={r.rightW} fill={r.rightC} rx="2"/>
        </g>
      ))}
      <text x="4" y="84" fill="rgba(249,115,22,0.7)" fontSize="7" fontFamily="monospace" fontWeight="bold">TAX → MIGRATION</text>
    </svg>
  )
}

function ThumbMonthly({ color = '#14B8A6' }: { color?: string }) {
  // mini sparkline chart
  const pts = [62, 58, 55, 52, 54, 50, 48, 44, 46, 42, 40, 38]
  const x = (i: number) => 10 + i * 11
  const y = (v: number) => 78 - v
  const path = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ')
  const area = path + ` L${x(pts.length - 1)},80 L${x(0)},80 Z`
  return (
    <svg width="140" height="88" viewBox="0 0 140 88" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
      <rect width="140" height="88" rx="6" fill={`${color}12`}/>
      <path d={area} fill={`${color}18`}/>
      <path d={path} stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <circle cx={x(pts.length - 1)} cy={y(pts[pts.length - 1])} r="3" fill={color}/>
      <text x="8" y="84" fill={`${color}99`} fontSize="7" fontFamily="monospace">RENT 23rd↓  BoC 2.25%</text>
    </svg>
  )
}

function ThumbMacro() {
  // stacked bar: GDP, employment, housing burden
  return (
    <svg width="140" height="88" viewBox="0 0 140 88" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
      <rect width="140" height="88" rx="6" fill="rgba(139,92,246,0.08)"/>
      {[
        { x: 14, h: 28, label: 'GDP\n1.1%', c: 'rgba(139,92,246,0.6)' },
        { x: 40, h: 46, label: 'Youth\nUnemp', c: 'rgba(139,92,246,0.75)' },
        { x: 66, h: 62, label: 'Mortgage\nBurden', c: '#8B5CF6' },
        { x: 92, h: 52, label: 'Home\nPrice', c: 'rgba(79,142,247,0.8)' },
        { x: 118, h: 36, label: 'BoC\nRate', c: 'rgba(79,142,247,0.55)' },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={76 - b.h} width="18" height={b.h} fill={b.c} rx="2"/>
        </g>
      ))}
      <text x="8" y="84" fill="rgba(139,92,246,0.7)" fontSize="7" fontFamily="monospace">Q3 2026 CANADA MACRO</text>
    </svg>
  )
}

function ThumbDeepDive() {
  // bond acquisition vs household income line
  const bond = [20, 28, 35, 42, 61]
  const inc = [52, 51, 50, 49, 48]
  const xp = (i: number) => 12 + i * 24
  const bondPath = bond.map((v, i) => `${i === 0 ? 'M' : 'L'}${xp(i)},${78 - v}`).join(' ')
  const incPath = inc.map((v, i) => `${i === 0 ? 'M' : 'L'}${xp(i)},${78 - inc[i]}`).join(' ')
  return (
    <svg width="140" height="88" viewBox="0 0 140 88" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
      <rect width="140" height="88" rx="6" fill="rgba(79,142,247,0.08)"/>
      <path d={bondPath} stroke="#4F8EF7" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <path d={incPath} stroke="#EF4444" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeDasharray="3,2"/>
      <circle cx={xp(4)} cy={78 - 61} r="3.5" fill="#4F8EF7"/>
      <text x={xp(4) - 18} y={78 - 64} fill="#4F8EF7" fontSize="7" fontFamily="monospace">$61B</text>
      <text x="4" y="84" fill="rgba(79,142,247,0.65)" fontSize="7" fontFamily="monospace">BOND INFLOW ↑ vs INCOME ↓</text>
    </svg>
  )
}

function ThumbCity({ color = '#EF4444' }: { color?: string }) {
  // simple city comparison bars
  const cities = [
    { name: 'YVR', score: 72 },
    { name: 'YYZ', score: 65 },
    { name: 'YYC', score: 88 },
    { name: 'MTL', score: 80 },
    { name: 'OTT', score: 76 },
  ]
  return (
    <svg width="140" height="88" viewBox="0 0 140 88" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
      <rect width="140" height="88" rx="6" fill={`${color}0f`}/>
      {cities.map((c, i) => (
        <g key={i}>
          <rect x={8 + i * 26} y={76 - c.score * 0.62} width="18" height={c.score * 0.62} fill={c.name === 'YYC' ? color : `${color}55`} rx="2"/>
          <text x={8 + i * 26 + 2} y="83" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">{c.name}</text>
        </g>
      ))}
    </svg>
  )
}

function ThumbWorkcation() {
  return (
    <svg width="140" height="88" viewBox="0 0 140 88" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
      <rect width="140" height="88" rx="6" fill="rgba(24,95,165,0.10)"/>
      {/* IWG rank vs Lakive affordability — scatter */}
      {[
        { x: 30, y: 20, label: 'YVR', r: 5 },
        { x: 55, y: 35, label: 'YYZ', r: 4 },
        { x: 90, y: 55, label: 'MTL', r: 3.5 },
        { x: 105, y: 42, label: 'OTT', r: 3.5 },
        { x: 115, y: 65, label: 'YYC', r: 5 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={p.r} fill={p.label === 'YVR' ? '#185FA5' : 'rgba(79,142,247,0.55)'}/>
          <text x={p.x + p.r + 2} y={p.y + 3} fill="rgba(255,255,255,0.4)" fontSize="7">{p.label}</text>
        </g>
      ))}
      {/* trend line */}
      <line x1="20" y1="12" x2="128" y2="72" stroke="rgba(255,255,255,0.10)" strokeWidth="1" strokeDasharray="3,3"/>
      <text x="4" y="84" fill="rgba(24,95,165,0.8)" fontSize="7" fontFamily="monospace">LIVABILITY vs AFFORDABILITY</text>
    </svg>
  )
}

function ThumbVancouver() {
  // housing pressure gauge
  const workers = [
    { label: 'Nurse', yrs: 11, c: '#EF4444' },
    { label: 'Teacher', yrs: 13, c: '#F97316' },
    { label: 'Dev', yrs: 9, c: '#EAB308' },
    { label: 'Elec', yrs: 13, c: '#EF4444' },
  ]
  return (
    <svg width="140" height="88" viewBox="0 0 140 88" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
      <rect width="140" height="88" rx="6" fill="rgba(79,142,247,0.07)"/>
      {workers.map((w, i) => (
        <g key={i}>
          <rect x={8 + i * 32} y={76 - w.yrs * 4} width="22" height={w.yrs * 4} fill={w.c} rx="2" opacity="0.7"/>
          <text x={8 + i * 32 + 2} y="83" fill="rgba(255,255,255,0.4)" fontSize="6.5" fontFamily="monospace">{w.label}</text>
        </g>
      ))}
      <text x="4" y="10" fill="rgba(255,255,255,0.3)" fontSize="6.5">YRS TO BUY (2BR)</text>
    </svg>
  )
}

// ── Tag component ──────────────────────────────────────────────────────────
function Tag({ label, color = 'rgba(255,255,255,0.50)', bg = 'rgba(255,255,255,0.07)' }: { label: string; color?: string; bg?: string }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color, background: bg, border: `1px solid ${color}30`, padding: '3px 10px', borderRadius: 20, whiteSpace: 'nowrap' as const }}>
      {label}
    </span>
  )
}

// ── Button helpers ─────────────────────────────────────────────────────────
function ReadBtn({ href, label = 'Read report →' }: { href: string; label?: string }) {
  return (
    <Link href={href} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '9px 20px', borderRadius: 10,
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.20)',
      color: 'rgba(255,255,255,0.90)',
      fontSize: 13, fontWeight: 700, textDecoration: 'none',
    }}>
      {label}
    </Link>
  )
}

function PdfBtn({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '9px 16px', borderRadius: 10,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.10)',
      color: 'rgba(255,255,255,0.50)', fontSize: 13, fontWeight: 600, textDecoration: 'none',
    }}>
      ↓ PDF
    </a>
  )
}

// ── Published badge ────────────────────────────────────────────────────────
function PubDate({ date, color }: { date: string; color: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700,
      background: `${color}10`, border: `1px solid ${color}28`, color,
    }}>
      ✓ {date}
    </span>
  )
}

export default function ReportsPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#0d1117', color: 'white' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '56px 24px 48px', background: 'linear-gradient(160deg,#0d1117 0%,#111827 60%,#1a2035 100%)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 20, background: 'rgba(79,142,247,0.10)', border: '1px solid rgba(79,142,247,0.25)', marginBottom: 20 }}>
            <span style={{ fontSize: 12 }}>📑</span>
            <span style={{ color: '#93C5FD', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>LAKIVE CITY FIT REPORTS</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Data-driven reports on how<br />
            <span style={{ color: '#4F8EF7' }}>cities fit real people</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: 15, lineHeight: 1.8, maxWidth: 620, margin: '0 0 24px' }}>
            By occupation, income, housing goals, family situation, and long-term financial outcomes.
          </p>
          {/* Category navigation strip */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
            {[
              { label: '📊 Annual Index', color: '#4F8EF7' },
              { label: '📋 Issue Briefs', color: '#14B8A6' },
              { label: '📆 Monthly Reports', color: '#14B8A6' },
              { label: '🧭 Newcomer Guides', color: '#A78BFA' },
              { label: '🌐 Canada vs. U.S.', color: '#FB923C' },
              { label: '🔬 Deep Dives', color: '#4F8EF7' },
            ].map(c => (
              <span key={c.label} style={{
                fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
                padding: '5px 13px', borderRadius: 20,
              }}>{c.label}</span>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 32px' }}>

        {/* ── Latest Report (newest first: Oct 28) ──────────────────────── */}
        <section style={{ padding: '52px 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
              Latest Report
            </span>
            <span style={{ background: '#F97316', color: 'white', fontSize: 10, fontWeight: 800, letterSpacing: '0.07em', padding: '2px 8px', borderRadius: 4 }}>NEW</span>
          </div>

          {/* Tax Policy & Migration — Oct 28, 2026 */}
          <div style={{ background: 'linear-gradient(135deg,rgba(249,115,22,0.10),rgba(45,212,191,0.05))', border: '1px solid rgba(249,115,22,0.32)', borderRadius: 20, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 0 }}>
              <div style={{ width: 5, background: 'linear-gradient(to bottom,#F97316,#2DD4BF)', borderRadius: '4px 0 0 4px' }} />
              <div style={{ padding: '32px 36px 28px', display: 'flex', gap: 28, alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' as const, marginBottom: 16 }}>
                    <Tag label="Research Report" color="#F97316" bg="rgba(249,115,22,0.12)" />
                    <Tag label="USA · Canada" color="#93C5FD" bg="rgba(79,142,247,0.08)" />
                    <Tag label="Tax Policy · Migration" color="#FCD34D" bg="rgba(245,158,11,0.08)" />
                  </div>
                  <h2 style={{ fontSize: 'clamp(18px,2.8vw,24px)', fontWeight: 900, lineHeight: 1.25, margin: '0 0 12px', letterSpacing: '-0.01em' }}>
                    Tax Policy and Human Migration
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.50)', fontSize: 14, lineHeight: 1.75, maxWidth: 600, margin: '0 0 22px' }}>
                    Do taxes drive people to move? A review of five peer-reviewed studies — including Washington State&apos;s 2026 millionaires&apos; tax — shows the answer depends heavily on income level and occupation. With evidence comparison table and case study.
                  </p>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const, alignItems: 'center' }}>
                    <PubDate date="Oct 28, 2026" color="#F97316" />
                    <ReadBtn href="/reports/tax-policy-and-migration-2026" />
                    <PdfBtn href="/reports/pdf/Lakive_Tax_Policy_Migration_Report_2026.pdf" />
                  </div>
                </div>
                <div style={{ flexShrink: 0 }} className="lk-desktop-only">
                  <ThumbTax />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured (3 most recent after the latest) ─────────────────── */}
        <section style={{ padding: '40px 0 0' }}>
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 20 }}>
            Recently Published
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>

            {/* Monthly Report September 2026 — Oct 5 */}
            <div style={{ background: 'linear-gradient(135deg,rgba(20,184,166,0.10),rgba(245,158,11,0.04))', border: '1px solid rgba(20,184,166,0.30)', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column' as const }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', flex: 1 }}>
                <div style={{ width: 4, background: 'linear-gradient(to bottom,#14B8A6,#D97706)' }} />
                <div style={{ padding: '26px 26px 22px', display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
                  <ThumbMonthly color="#14B8A6" />
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                    <Tag label="Monthly Report" color="#14B8A6" bg="rgba(20,184,166,0.12)" />
                    <Tag label="7 Cities" color="#93C5FD" bg="rgba(79,142,247,0.10)" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.3, margin: 0 }}>
                    Canada — September 2026: Stability Without Relief
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.65, margin: 0 }}>
                    Six BoC holds at 2.25%, rents down for a 23rd month, CA$27.6B in new counter-tariffs. Lakive city scores for 7 cities + Oct 28 BoC preview.
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, alignItems: 'center', marginTop: 'auto' as const }}>
                    <PubDate date="Oct 5, 2026" color="#14B8A6" />
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                    <ReadBtn href="/reports/monthly-report-september-2026" />
                    <PdfBtn href="/reports/pdf/Lakive_Monthly_Report_September_2026.pdf" />
                  </div>
                </div>
              </div>
            </div>

            {/* Q3 2026 — Sep 19 */}
            <div style={{ background: 'linear-gradient(135deg,rgba(139,92,246,0.10),rgba(79,142,247,0.05))', border: '1px solid rgba(139,92,246,0.30)', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column' as const }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', flex: 1 }}>
                <div style={{ width: 4, background: 'linear-gradient(to bottom,#8B5CF6,#4F8EF7)' }} />
                <div style={{ padding: '26px 26px 22px', display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
                  <ThumbMacro />
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                    <Tag label="Quarterly Report" color="#8B5CF6" bg="rgba(139,92,246,0.12)" />
                    <Tag label="Canada" color="#93C5FD" bg="rgba(79,142,247,0.08)" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.3, margin: 0 }}>
                    Canada Q3 2026: Recession, Housing Crisis, and the Middle-Class Squeeze
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.65, margin: 0 }}>
                    GDP stalling at 1.1%, youth unemployment 12.9%, mortgage burden at 51% of median income. City intelligence matrix across 9 metros.
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, alignItems: 'center', marginTop: 'auto' as const }}>
                    <PubDate date="Sep 19, 2026" color="#8B5CF6" />
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                    <ReadBtn href="/reports/canada-q3-2026-economic-intelligence" />
                  </div>
                </div>
              </div>
            </div>

            {/* $61B Paradox — Sep 14 */}
            <div style={{ background: 'linear-gradient(135deg,rgba(79,142,247,0.10),rgba(20,184,166,0.05))', border: '1px solid rgba(79,142,247,0.28)', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column' as const }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', flex: 1 }}>
                <div style={{ width: 4, background: 'linear-gradient(to bottom,#4F8EF7,#14B8A6)' }} />
                <div style={{ padding: '26px 26px 22px', display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
                  <ThumbDeepDive />
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                    <Tag label="Deep Dive" color="#4F8EF7" bg="rgba(79,142,247,0.12)" />
                    <Tag label="Canada · Macro" color="#FCD34D" bg="rgba(245,158,11,0.08)" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.3, margin: 0 }}>
                    The $61 Billion Paradox: Canada Can Borrow, But Can Canadians Afford to Live Here?
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.65, margin: 0 }}>
                    In Q2 2026, non-residents made a record C$61.3B acquisition of Canadian bonds. Why hasn&apos;t that translated into housing access or wage gains?
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, alignItems: 'center', marginTop: 'auto' as const }}>
                    <PubDate date="Sep 14, 2026" color="#4F8EF7" />
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                    <ReadBtn href="/reports/the-61-billion-paradox" />
                    <ReadBtn href="/reports/the-61-billion-paradox-cn" label="阅读中文版 →" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── All Other Reports — 2-column grid ─────────────────────────── */}
        <section style={{ padding: '40px 0 0' }}>
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 20 }}>
            More Reports
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(420px,1fr))', gap: 12 }}>

            {/* Monthly August 2026 — Sep 5 */}
            <div style={{ background: 'rgba(20,184,166,0.06)', border: '1px solid rgba(20,184,166,0.18)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', height: '100%' }}>
                <div style={{ width: 4, background: '#14B8A6', opacity: 0.6 }} />
                <div style={{ padding: '22px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <ThumbMonthly color="#14B8A6" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 8 }}>
                      <Tag label="Monthly Report" color="#14B8A6" bg="rgba(20,184,166,0.10)" />
                      <Tag label="5 Cities" color="#93C5FD" bg="rgba(79,142,247,0.08)" />
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.35, margin: '0 0 6px' }}>
                      Canada Is Growing Again. But Is Life Getting More Affordable?
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: 12, lineHeight: 1.6, margin: '0 0 12px' }}>
                      August 2026: BoC first inflation warning, labour market shed 42K jobs, rents down 22nd month.
                    </p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, alignItems: 'center' }}>
                      <PubDate date="Sep 5, 2026" color="#14B8A6" />
                      <ReadBtn href="/reports/monthly-report-august-2026" />
                      <PdfBtn href="/reports/pdf/Lakive_Monthly_Report_August_2026_v1.pdf" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Workcation Mirage — Aug 15 */}
            <div style={{ background: 'rgba(24,95,165,0.07)', border: '1px solid rgba(24,95,165,0.22)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', height: '100%' }}>
                <div style={{ width: 4, background: '#185FA5', opacity: 0.7 }} />
                <div style={{ padding: '22px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <ThumbWorkcation />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 8 }}>
                      <Tag label="Issue Brief" color="#14B8A6" bg="rgba(20,184,166,0.10)" />
                      <Tag label="5 Cities" color="#93C5FD" bg="rgba(79,142,247,0.08)" />
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.35, margin: '0 0 6px' }}>
                      The Workcation Mirage — What Global City Rankings Miss About Settling in Canada
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: 12, lineHeight: 1.6, margin: '0 0 12px' }}>
                      IWG ranked Vancouver #5 workcation city. The Lakive City Matrix™ tells a different story for nurses, electricians, and teachers.
                    </p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, alignItems: 'center' }}>
                      <PubDate date="Aug 15, 2026" color="#185FA5" />
                      <ReadBtn href="/reports/workcation-mirage" />
                      <PdfBtn href="/reports/pdf/workcation-mirage.pdf" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly July 2026 — Aug 5 */}
            <div style={{ background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.15)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', height: '100%' }}>
                <div style={{ width: 4, background: '#14B8A6', opacity: 0.5 }} />
                <div style={{ padding: '22px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <ThumbMonthly color="#4F8EF7" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 8 }}>
                      <Tag label="Monthly Report" color="#14B8A6" bg="rgba(20,184,166,0.10)" />
                      <Tag label="5 Cities" color="#93C5FD" bg="rgba(79,142,247,0.08)" />
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.35, margin: '0 0 6px' }}>
                      Canada&apos;s Rental Market Continues to Stabilize — Housing, Jobs and the Economy at a Glance
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: 12, lineHeight: 1.6, margin: '0 0 12px' }}>
                      July 2026: 21st consecutive rent decline (CAD $2,033), unemployment 6.5%, BoC hold at 2.25%.
                    </p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, alignItems: 'center' }}>
                      <PubDate date="Aug 5, 2026" color="#14B8A6" />
                      <ReadBtn href="/reports/monthly-report-july-2026" />
                      <PdfBtn href="/reports/pdf/Lakive_Monthly_Report_July_2026_v2.pdf" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Canada Cities on the Rise — July 2026 */}
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', height: '100%' }}>
                <div style={{ width: 4, background: '#EF4444', opacity: 0.6 }} />
                <div style={{ padding: '22px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <ThumbCity color="#EF4444" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 8 }}>
                      <Tag label="National Report" color="#EF4444" bg="rgba(239,68,68,0.10)" />
                      <Tag label="5 Cities · 20 Occupations" color="#93C5FD" bg="rgba(79,142,247,0.08)" />
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.35, margin: '0 0 6px' }}>
                      Canada&apos;s Cities on the Rise 2026 — Beyond Job Growth: Where Can You Actually Build a Life?
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: 12, lineHeight: 1.6, margin: '0 0 12px' }}>
                      Employment Opportunity Index, housing affordability, and City Fit Score across 5 cities, broken down by occupation.
                    </p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, alignItems: 'center' }}>
                      <PubDate date="Jul 2026" color="#EF4444" />
                      <ReadBtn href="/reports/canada-cities-on-the-rise-2026" />
                      <PdfBtn href="/reports/pdf/Lakive_Canada_Cities_on_the_Rise_2026.pdf" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vancouver Livability — H1 2026 */}
            <div style={{ background: 'rgba(79,142,247,0.06)', border: '1px solid rgba(79,142,247,0.18)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', height: '100%' }}>
                <div style={{ width: 4, background: '#4F8EF7', opacity: 0.6 }} />
                <div style={{ padding: '22px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <ThumbVancouver />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 8 }}>
                      <Tag label="Issue Brief" color="#14B8A6" bg="rgba(20,184,166,0.10)" />
                      <Tag label="Vancouver" color="#93C5FD" bg="rgba(79,142,247,0.08)" />
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.35, margin: '0 0 6px' }}>
                      Vancouver Is a Top-10 Livable City — But Can Local Workers Afford to Stay?
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: 12, lineHeight: 1.6, margin: '0 0 12px' }}>
                      When EIU ranks Vancouver #9 in the world — what does that mean for a nurse earning $95K or a teacher on $72K?
                    </p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, alignItems: 'center' }}>
                      <PubDate date="H1 2026" color="#4F8EF7" />
                      <ReadBtn href="/reports/vancouver-livability-worker-affordability-2026" />
                      <PdfBtn href="/reports/pdf/Lakive_Vancouver_Worker_Affordability_Issue_Brief_H1_2026.pdf" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Newsletter CTA — inline form ──────────────────────────────── */}
        <section style={{ padding: '52px 0' }}>
          <div style={{ background: 'linear-gradient(135deg,rgba(79,142,247,0.12),rgba(91,92,240,0.08))', border: '1px solid rgba(79,142,247,0.25)', borderRadius: 20, padding: '44px 48px', display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' as const }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>📬</div>
              <h2 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 10px', letterSpacing: '-0.01em' }}>Get Future Reports</h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                Monthly City Fit Brief, new report releases, and Canada vs. U.S. city insights — free, no ads.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0, flexWrap: 'wrap' as const }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  padding: '12px 18px', borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.06)',
                  color: 'white', fontSize: 14, fontFamily: 'inherit',
                  width: 240, outline: 'none',
                }}
              />
              <Link href="/subscribe" style={{
                padding: '12px 22px', borderRadius: 10,
                background: 'linear-gradient(135deg,#4F8EF7,#5B5CF0)',
                color: 'white', fontSize: 14, fontWeight: 700,
                textDecoration: 'none', whiteSpace: 'nowrap' as const,
              }}>
                Subscribe free →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Data Sources ──────────────────────────────────────────────── */}
        <section style={{ padding: '0 0 72px' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '32px 36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>🔬</span>
              <span style={{ color: 'white', fontSize: 15, fontWeight: 800 }}>Data Sources &amp; Independence</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: 13, lineHeight: 1.8, margin: '0 0 24px', maxWidth: 680 }}>
              Lakive reports are built on public government data. No city, employer, or institution can{' '}
              <strong style={{ color: 'rgba(255,255,255,0.65)' }}>buy better scores</strong>, suppress unfavorable findings, or influence our analysis.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14 }}>
              {[
                { flag: '🇨🇦', country: 'Canada', sources: [
                  ['Statistics Canada', 'Labour Force Survey, income & housing data'],
                  ["Canada's Job Bank", 'Occupation demand & vacancy signals'],
                  ['CMHC', 'Housing starts, rental & ownership affordability'],
                  ['CRA / Provincial tax tables', 'After-tax income estimates by province'],
                ]},
                { flag: '🇺🇸', country: 'United States', sources: [
                  ['Bureau of Labor Statistics (BLS)', 'Occupation wages, employment projections'],
                  ['U.S. Census Bureau / ACS', 'Income, housing cost & demographic data'],
                  ['HUD', 'Fair market rents & housing affordability benchmarks'],
                  ['IRS / State tax schedules', 'Federal & state after-tax income estimates'],
                ]},
              ].map(region => (
                <div key={region.country} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <span style={{ fontSize: 16 }}>{region.flag}</span>
                    <span style={{ color: 'rgba(255,255,255,0.70)', fontSize: 13, fontWeight: 700 }}>{region.country}</span>
                  </div>
                  {region.sources.map(([source, desc]) => (
                    <div key={source} style={{ marginBottom: 10 }}>
                      <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: 700 }}>{source}</div>
                      <div style={{ color: 'rgba(255,255,255,0.32)', fontSize: 11, lineHeight: 1.5 }}>{desc}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}
