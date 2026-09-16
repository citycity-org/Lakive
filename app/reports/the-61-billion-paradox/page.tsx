import type { Metadata } from 'next'
import ShareBar from '@/components/ShareBar'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The $61 Billion Paradox · Lakive Deep Dive 01',
  description: 'In Q2 2026, non-residents made a net C$61.3 billion acquisition of Canadian federal bonds — the largest on record. Yet many households still feel intense housing and cost-of-living pressure. Lakive examines why.',
  alternates: {
    canonical: 'https://lakive.com/reports/the-61-billion-paradox',
    languages: { 'zh-CN': 'https://lakive.com/reports/the-61-billion-paradox-cn' },
  },
  openGraph: {
    title: 'The $61 Billion Paradox — Canada Can Borrow. But Can Canadians Afford to Live Here?',
    description: 'In Q2 2026, foreign investors poured a record C$61.3B into Canadian federal bonds. Lakive traces why that capital hasn\'t reached ordinary households.',
    type: 'article',
    publishedTime: '2026-09-14',
  },
}

// ── Design tokens ────────────────────────────────────────────────────────────
const NAVY  = '#0d1f44'
const TEAL  = '#14B8A6'
const BLUE  = '#4F8EF7'
const AMBER = '#D97706'
const GREY  = '#64748B'
const BODY  = '#374151'
const BG    = '#F8FAFC'

// ── Shared primitives ─────────────────────────────────────────────────────────
function SectionHeading({ num, title }: { num: number; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, margin: '52px 0 18px' }}>
      <div style={{ width: 4, minHeight: 28, borderRadius: 2, background: `linear-gradient(to bottom,${TEAL},${BLUE})`, flexShrink: 0, marginTop: 3 }} />
      <h2 style={{ fontSize: 21, fontWeight: 800, color: NAVY, margin: 0, lineHeight: 1.3 }}>
        {num}. {title}
      </h2>
    </div>
  )
}

function Body({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 15, color: BODY, lineHeight: 1.8, margin: '0 0 16px' }}>{children}</p>
}

function Callout({ label, text, color = TEAL, bg = '#F0FDFA' }: { label: string; text: string; color?: string; bg?: string }) {
  return (
    <div style={{ borderLeft: `4px solid ${color}`, background: bg, padding: '12px 16px', borderRadius: '0 8px 8px 0', margin: '18px 0' }}>
      <span style={{ fontWeight: 700, color, fontSize: 14 }}>{label} </span>
      <span style={{ fontSize: 14, color: '#1F2937', lineHeight: 1.7 }}>{text}</span>
    </div>
  )
}

function FigureBlock({ num, title, source, children }: { num: number; title: string; source: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: '24px 28px', margin: '24px 0' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: GREY, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6 }}>
        Figure {num}
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 16 }}>{title}</div>
      {children}
      <div style={{ fontSize: 11, color: GREY, fontStyle: 'italic', marginTop: 14, paddingTop: 10, borderTop: '1px solid #F3F4F6' }}>
        {source}
      </div>
    </div>
  )
}

function StatRow({ label, value, sub, color = NAVY }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
      <span style={{ fontSize: 13, color: BODY }}>{label}</span>
      <div style={{ textAlign: 'right' }}>
        <span style={{ fontSize: 15, fontWeight: 800, color }}>{value}</span>
        {sub && <div style={{ fontSize: 11, color: GREY }}>{sub}</div>}
      </div>
    </div>
  )
}

function NestBar({ label, value, pct, color }: { label: string; value: string; pct: number; color: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: BODY }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{value}</span>
      </div>
      <div style={{ height: 8, background: '#F3F4F6', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 4 }} />
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function DeepDivePage() {
  return (
    <main style={{ minHeight: '100vh', background: BG }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(160deg,#0d1117 0%,#0d1f44 50%,#0d2a3d 100%)', padding: '64px 24px 56px', color: 'white' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>

          {/* breadcrumb */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
            <Link href="/reports" style={{ color: 'rgba(255,255,255,0.40)', fontSize: 12, textDecoration: 'none' }}>Reports</Link>
            <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: 12 }}>›</span>
            <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: 12 }}>Deep Dive</span>
            <span style={{ marginLeft: 8 }}>
              <Link href="/reports/the-61-billion-paradox-cn" style={{ fontSize: 11, color: TEAL, textDecoration: 'none', border: `1px solid ${TEAL}50`, padding: '2px 10px', borderRadius: 12, fontWeight: 600 }}>
                中文版 →
              </Link>
            </span>
          </div>

          {/* label chips */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: TEAL, background: `${TEAL}18`, border: `1px solid ${TEAL}40`, padding: '4px 12px', borderRadius: 20 }}>DEEP DIVE 01</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#93C5FD', background: 'rgba(79,142,247,0.12)', border: '1px solid rgba(79,142,247,0.30)', padding: '4px 12px', borderRadius: 20 }}>Canada</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#FCD34D', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.30)', padding: '4px 12px', borderRadius: 20 }}>September 2026</span>
          </div>

          {/* stat callout */}
          <div style={{ display: 'inline-block', background: `${TEAL}18`, border: `1px solid ${TEAL}40`, borderRadius: 16, padding: '16px 24px', marginBottom: 32 }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: TEAL, letterSpacing: '-0.03em', lineHeight: 1 }}>C$61.3B</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>
              Net non-resident acquisition of federal bonds, Q2 2026 — largest on record
            </div>
          </div>

          <h1 style={{ fontSize: 'clamp(26px,4.5vw,42px)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 18px' }}>
            The $61 Billion Paradox<br />
            <span style={{ color: TEAL }}>Canada Can Borrow.</span>{' '}
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>But Can Canadians Afford to Live Here?</span>
          </h1>

          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 640, margin: '0 0 32px' }}>
            If global capital is this willing to lend to Canada, why do so many people living here
            still feel intense pressure from housing and the cost of everyday life?
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Published September 14, 2026</span>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>~15 min read</span>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Data: Statistics Canada, Bank of Canada</span>
          </div>
        </div>
      </section>

      {/* ── Article body ─────────────────────────────────────────────────── */}
      <article style={{ maxWidth: 780, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Intro summary */}
        <div style={{ background: '#fff', border: `1px solid ${BLUE}30`, borderLeft: `4px solid ${BLUE}`, borderRadius: '0 12px 12px 0', padding: '20px 24px', marginBottom: 40 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: BLUE, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>The paradox in one page</div>
          <Body>
            In Q2 2026, foreign investors — "non-residents" in Statistics Canada's terminology — made a net C$61.3 billion
            acquisition of federal government bonds. Net foreign purchases of government bonds across all levels exceeded C$81 billion.
            At the same time, foreign investment in Canadian debt securities reached a record C$110.2 billion, while foreign
            investors reduced their holdings of Canadian equities by C$9.6 billion.
          </Body>
          <Body>
            Yet the same quarter also produced positive macroeconomic signals: real GDP grew 0.8% quarter over quarter, the current
            account moved to a C$8.8 billion surplus, the household saving rate rose to 3.7%, and both household debt-to-income and
            the debt-service ratio improved.
          </Body>
          <p style={{ fontSize: 14, fontWeight: 700, color: NAVY, margin: 0 }}>
            This report asks a structural — and personal — question: how effectively can Canada's financial credibility be converted
            into productive capacity, wages, housing, public services and an affordable urban life for households?
          </p>
        </div>

        {/* Section 1 */}
        <SectionHeading num={1} title="What did foreign investors actually buy?" />
        <Body>
          They did not simply "invest C$61.3 billion in Canada." They made a net acquisition of Government of Canada federal bonds.
          In Q2, foreign investors added C$100.6 billion of Canadian securities overall. Investment in Canadian debt securities
          reached a record C$110.2 billion, including C$80.8 billion of government bonds, while Canadian equities saw a
          C$9.6 billion divestment.
        </Body>
        <Body>
          That distinction matters. Buying equity primarily means taking corporate earnings risk. Building a factory is a bet on
          future production. Buying sovereign debt is more directly a decision about creditworthiness, yield, liquidity, currency
          exposure and portfolio risk. The C$61.3 billion figure tells us about extraordinary demand for Canadian federal debt —
          not C$61.3 billion of foreign direct investment.
        </Body>
        <Callout
          label="Notable:"
          text="The C$61.3B acquisition was nearly twice the previous quarterly record, partly offset by the largest-ever divestment of government bonds by Canadian institutional investors — banks, pension funds and mutual funds."
          color={BLUE}
          bg="#EFF6FF"
        />

        <FigureBlock
          num={1}
          title="Q2 2026 foreign bond investment: a nested hierarchy"
          source="Sources: Statistics Canada [1][3] · Lakive visualization. C$61.3B in federal bonds is from the from-whom-to-whom data in [3]; C$80.8B government bonds and C$110.2B debt securities are from [1]."
        >
          <NestBar label="Canadian debt securities (total)" value="C$110.2B" pct={100} color="#4F8EF7" />
          <NestBar label="Government bonds (all levels)" value="C$80.8B" pct={73} color="#14B8A6" />
          <NestBar label="Federal bonds (non-residents)" value="C$61.3B" pct={56} color={TEAL} />
          <NestBar label="Canadian equities (net divestment)" value="−C$9.6B" pct={9} color="#EF4444" />
        </FigureBlock>

        {/* Section 2 */}
        <SectionHeading num={2} title="Are investors betting on Canadian strength — or Canadian weakness?" />
        <Body>
          The most defensible answer is that several motives may coexist. One is sovereign credit: Canada remains a large, liquid
          developed-market bond market that global institutions can hold at scale. Another is demand for relatively safe and liquid
          assets. A third is interest-rate and duration positioning.
        </Body>
        <Body>
          But the data do not support a simple claim that investors were making a clear bet on aggressive Canadian rate cuts.
          In the Bank of Canada's Q2 Market Participants Survey, the median forecast for the policy rate at the end of 2026 remained
          2.25%. Forty percent of respondents saw risks tilted toward a higher rate path, compared with 28% who saw risks tilted lower.
        </Body>
        <Callout
          label="Disciplined read:"
          text="The record inflow is strong evidence of demand for Canadian sovereign debt and confidence in its investability. It is not, by itself, evidence that global investors expect rapid Canadian economic growth."
          color={TEAL}
          bg="#F0FDFA"
        />

        <FigureBlock
          num={2}
          title="Non-resident ownership of outstanding federal government bonds: 27.0% → 44.6%"
          source="Source: Statistics Canada [2] · Lakive visualization. Only the two endpoints explicitly reported by Statistics Canada are shown; no linear path is assumed between them."
        >
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', padding: '8px 0' }}>
            {[{ year: 'Prior period', pct: 27.0, color: '#E5E7EB' }, { year: 'Q2 2026', pct: 44.6, color: TEAL }].map(d => (
              <div key={d.year} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: 140 * d.pct / 50, background: d.color, borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 8 }}>
                  <span style={{ fontSize: 18, fontWeight: 900, color: d.color === TEAL ? 'white' : NAVY }}>{d.pct}%</span>
                </div>
                <div style={{ fontSize: 12, color: GREY, marginTop: 6 }}>{d.year}</div>
              </div>
            ))}
          </div>
        </FigureBlock>

        {/* Section 3 */}
        <SectionHeading num={3} title="Why was Canadian money buying so much U.S. equity?" />
        <Body>
          Canadian investors acquired C$45.6 billion of foreign securities in Q2, including a net C$35.5 billion of foreign equities.
          Net purchases of U.S. equities alone reached C$37.8 billion — implying that Canadian investors were net sellers of
          non-U.S. foreign equities in aggregate. At the same time, Canadian investors reduced their holdings of U.S. government
          bonds by C$14.4 billion, marking a third consecutive quarter of divestment.
        </Body>
        <Body>
          The contrast is striking: foreign capital was buying Canadian government debt at record scale, while Canadian
          foreign-equity allocation was heavily concentrated in the United States. This does not mean Canadian investors have "lost
          confidence" in Canada — global diversification is normal. But it raises a question worth tracking: is Canada especially
          effective at attracting capital to finance stability, while being less effective at retaining risk capital for domestic growth?
        </Body>

        <FigureBlock
          num={3}
          title="A contrast in capital flows: Canadian debt and U.S. assets"
          source="Source: Statistics Canada [1] · Lakive visualization. All values are net investment/divestment flows."
        >
          <StatRow label="Non-residents → Canadian federal bonds" value="+C$61.3B" color={TEAL} />
          <StatRow label="Canadian investors → U.S. equities (net buy)" value="+C$37.8B" color={BLUE} />
          <StatRow label="Canadian investors → U.S. govt bonds (net sell)" value="−C$14.4B" color="#E86C2F" />
          <StatRow label="Foreign investors → Canadian equities (net sell)" value="−C$9.6B" color="#E86C2F" />
        </FigureBlock>

        {/* Section 4 */}
        <SectionHeading num={4} title="Is Canada's problem a shortage of capital — or an inability to convert capital into future living standards?" />
        <Body>
          Record bond inflows show that Canada's challenge cannot simply be described as a lack of money willing to enter the country.
          The deeper issue is what capital ultimately finances: electricity grids, transit, housing-enabling infrastructure, factories,
          equipment, technology and research — or a larger share of existing assets, current spending and financial transactions.
        </Body>
        <Body>
          Government borrowing also needs more than one metric. In Q2, government gross debt per capita reached C$105,455, while
          nominal GDP per capita was C$83,003. But gross debt is a stock and GDP is an annual flow — they should not be treated
          as like-for-like ratios. Federal net financial liabilities fell to 33.3% of GDP, other governments' net debt fell to
          14.7% of GDP, and the effective interest rate on federal financial liabilities was 3.00%.
        </Body>
        <Callout
          label="Better question:"
          text="Not whether Canada's debt is 'too high' — but whether the country is using its financial credibility to build enough future productive capacity, and whether that capacity ultimately improves living standards."
          color={AMBER}
          bg="#FFFBEB"
        />

        <FigureBlock
          num={4}
          title="Public debt: gross levels, net debt and financing cost all matter"
          source="Source: Statistics Canada [3] · Lakive visualization. Gross debt is a stock and GDP is an annual flow; shown together only to provide scale."
        >
          <StatRow label="Gross govt debt per capita" value="C$105,455" sub="stock measure" />
          <StatRow label="Nominal GDP per capita" value="C$83,003" sub="annual flow — not directly comparable" color={GREY} />
          <StatRow label="Federal net financial liabilities / GDP" value="33.3%" color={TEAL} />
          <StatRow label="Other governments' net debt / GDP" value="14.7%" color={TEAL} />
          <StatRow label="Effective interest rate on federal liabilities" value="3.00%" />
        </FigureBlock>

        {/* Section 5 */}
        <SectionHeading num={5} title="The counter-evidence matters: Q2 macro data were not broadly weak" />
        <Body>
          A report focused only on housing pressure, debt and capital allocation would risk selective storytelling. Canada's Q2
          macro data actually showed a meaningful rebound: real GDP rose 0.8% quarter over quarter, the current account posted a
          C$8.8 billion surplus — the largest since 2005 — and the household saving rate increased to 3.7%.
        </Body>
        <Body>
          Household leverage also improved. Credit-market debt as a share of disposable income fell from 178.6% to 176.4%, while
          the household debt-service ratio declined to 14.52%. The C$61.3 billion paradox is not a story about investors buying
          Canada during an obviously disastrous quarter.
        </Body>
        <Callout
          label="Lakive's question is longer-term:"
          text="Even when macro indicators improve and national balance sheets are strong, do households experience durable gains in purchasing power, housing access and public-service capacity?"
          color={BLUE}
          bg="#EFF6FF"
        />

        <FigureBlock
          num={5}
          title="Q2 2026 was not a quarter of across-the-board deterioration"
          source="Sources: Statistics Canada [1][3] · Lakive visualization. GDP is quarter-over-quarter growth; remaining figures are Q2 levels or ratios."
        >
          <StatRow label="Real GDP growth (Q/Q)" value="+0.8%" color={TEAL} />
          <StatRow label="Current account surplus" value="C$8.8B" sub="Largest since 2005" color={TEAL} />
          <StatRow label="Household saving rate" value="3.7%" color={TEAL} />
          <StatRow label="Household debt / disposable income" value="176.4%" sub="↓ from 178.6%" color={TEAL} />
          <StatRow label="Household debt-service ratio" value="14.52%" color={TEAL} />
        </FigureBlock>

        {/* Section 6 */}
        <SectionHeading num={6} title="How does national financial strength actually reach a household?" />
        <Body>
          Federal bonds can feel remote from a person's rent, mortgage renewal, paycheque, commute or access to a family doctor.
          But they sit inside the same economic system. Global capital affects government financing conditions; fiscal capacity
          shapes public investment and services; investment affects productive capacity and employment; and wages then interact with
          housing, taxes, transportation and other essential costs to determine how much financial room a household actually has.
        </Body>

        <FigureBlock
          num={6}
          title="Lakive's Capital → Life transmission framework"
          source="Conceptual framework: Lakive. Arrows represent possible channels of economic transmission, not simple one-to-one causal relationships."
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { step: 'Global capital', desc: 'Record C$61.3B bond inflow' },
              { step: 'Government financing', desc: 'Lower borrowing costs · fiscal capacity' },
              { step: 'Public investment', desc: 'Infrastructure · transit · housing-enabling' },
              { step: 'Productive capacity', desc: 'Employment · wages · services' },
              { step: 'Household budget', desc: 'Wages minus housing, taxes, transport, essentials' },
            ].map((r, i, arr) => (
              <div key={r.step}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: i === arr.length - 1 ? `${TEAL}12` : '#F8FAFC', border: i === arr.length - 1 ? `1px solid ${TEAL}40` : '1px solid #E5E7EB', borderRadius: 10, padding: '10px 16px' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: i === arr.length - 1 ? TEAL : BLUE, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{r.step}</div>
                    <div style={{ fontSize: 12, color: GREY }}>{r.desc}</div>
                  </div>
                </div>
                {i < arr.length - 1 && <div style={{ textAlign: 'center', color: GREY, fontSize: 14, margin: '2px 0' }}>↓</div>}
              </div>
            ))}
          </div>
        </FigureBlock>

        <Body>
          The task is to identify weak links in that transmission: Does capital reach high-productivity investment? Can infrastructure
          be delivered fast enough? Does housing supply respond to household formation and population change? Do wage gains outpace
          essential costs? Does higher public spending become services residents can actually use?
        </Body>

        {/* Section 7 */}
        <SectionHeading num={7} title="Canada is getting wealthier. But who owns the wealth?" />
        <Body>
          Canadian household net worth rose 2.9% in Q2, moving above C$19 trillion and adding roughly C$500 billion in a single
          quarter. Net worth per capita increased by C$13,785 to C$462,336. On aggregate, that is a very strong household
          balance-sheet result.
        </Body>
        <Body>
          But distribution determines how an "average" gain is experienced. Statistics Canada reported that households in the highest
          wealth quintile held 69.0% of all financial assets and 49.7% of non-financial assets. Market gains are therefore not
          shared evenly across Canadian households.
        </Body>
        <Callout
          label="Why this matters:"
          text="For people without large existing asset holdings and who rely mainly on labour income, the more relevant question is not Canada's average net worth. It is what their work can actually buy in the city where they live."
          color={TEAL}
          bg="#F0FDFA"
        />

        <FigureBlock
          num={7}
          title="Market gains are not shared evenly across households"
          source="Source: Statistics Canada [3] · Lakive visualization. Distribution figures from the latest household economic-account distribution data in the NBSFA release."
        >
          <StatRow label="Household net worth (Q2 2026)" value=">C$19T" sub="+2.9% in one quarter" color={TEAL} />
          <StatRow label="Net worth per capita" value="C$462,336" sub="+C$13,785 vs Q1" color={TEAL} />
          <StatRow label="Financial assets held by top wealth quintile" value="69.0%" color="#E86C2F" />
          <StatRow label="Non-financial assets held by top wealth quintile" value="49.7%" color="#E86C2F" />
        </FigureBlock>

        <FigureBlock
          num={8}
          title="Canada's NIIP rose C$619.2B in one quarter — driven mainly by asset revaluation"
          source="Source: Statistics Canada [2] · Lakive visualization. Only major components directly published by Statistics Canada are shown."
        >
          <StatRow label="Net International Investment Position change" value="+C$619.2B" sub="Q2 2026 single quarter" color={TEAL} />
          <StatRow label="Primary driver" value="Asset revaluation" sub="Not new capital inflows" color={AMBER} />
        </FigureBlock>

        {/* Section 8 */}
        <SectionHeading num={8} title="The title has to come back to housing: can Canadians actually afford to live here?" />
        <Body>
          Canadian household residential real estate increased 0.4% in Q2 to C$8.5233 trillion, but remained 0.3% lower than a
          year earlier. Residential investment rebounded 2.5% quarter over quarter and existing-home transactions also improved,
          yet this was still the second-weakest Q2 for resale activity since 2021.
        </Body>
        <Body>
          Mortgage borrowing declined for a second consecutive quarter to C$19.4 billion, the slowest pace since Q1 2024.
          These data do not support a simple "housing crash" or "housing recovery" narrative.
        </Body>
        <Body>
          More importantly, national financial conditions land in very different local markets. High-cost metropolitan areas can
          absorb strong salaries through housing. Lower-cost cities can provide more purchasing power but face different constraints
          in job depth, healthcare, transportation or infrastructure. There is therefore no single Canadian answer.
        </Body>

        <FigureBlock
          num={9}
          title='"Can Canadians afford to live here?" — Three Q2 housing signals'
          source="Source: Statistics Canada [3] · Lakive visualization."
        >
          <StatRow label="Household residential real estate (total)" value="C$8.52T" sub="+0.4% Q/Q · −0.3% YoY" />
          <StatRow label="Residential investment (Q/Q)" value="+2.5%" color={TEAL} />
          <StatRow label="Mortgage borrowing" value="C$19.4B" sub="2nd consecutive quarterly decline — slowest since Q1 2024" color={AMBER} />
        </FigureBlock>

        {/* Conclusion */}
        <div style={{ background: 'linear-gradient(135deg,#0d1f44,#0d2a3d)', borderRadius: 20, padding: '36px 36px 32px', margin: '48px 0 40px', color: 'white' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: TEAL, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Conclusion</div>
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 18px', lineHeight: 1.3 }}>The real C$61 billion paradox</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, margin: '0 0 16px' }}>
            The world is willing to lend to Canada. What will Canada do with that trust?
          </p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, margin: '0 0 16px' }}>
            The C$61.3 billion record demonstrates Canada's continued ability to attract international capital into its
            sovereign debt market. It does not, on its own, prove rapid future growth, rising household prosperity or
            improving housing affordability. Likewise, Q2's GDP rebound, current-account surplus and improving household
            leverage do not automatically erase longer-term questions about housing, wealth distribution and the cost of living.
            Both sets of facts can be true at the same time.
          </p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, margin: '0 0 24px' }}>
            The variable worth tracking is <strong style={{ color: TEAL }}>conversion efficiency</strong>: can Canada turn financial
            credibility into productive investment, investment into productivity and wages, and those gains into household living
            standards before housing and essential costs absorb them?
          </p>
          <p style={{ fontSize: 16, fontWeight: 700, color: 'white', fontStyle: 'italic', margin: 0 }}>
            For an ordinary household, the ultimate question is not how much Canada can borrow. It is: What can the life I build here actually afford?
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', margin: '0 0 56px' }}>
          <p style={{ fontSize: 15, color: BODY, lineHeight: 1.7, marginBottom: 20 }}>
            Use Lakive's City Fit Calculator to compare your income, occupation and housing choices
            against the real cost structure of Canadian cities — and see where your work can go further.
          </p>
          <Link
            href="/calculate"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 14, background: `linear-gradient(135deg,${TEAL},${BLUE})`, color: 'white', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}
          >
            Calculate my city fit →
          </Link>
        </div>

        {/* References */}
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: '24px 28px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: GREY, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 16 }}>References &amp; data notes</div>
          {[
            '[1] Statistics Canada (August 27, 2026), Canada\'s balance of international payments, second quarter 2026, The Daily.',
            '[2] Statistics Canada (September 10, 2026), Canada\'s international investment position, second quarter 2026, The Daily; Table 36-10-0485-01.',
            '[3] Statistics Canada (September 11, 2026), National balance sheet and financial flow accounts, second quarter 2026, The Daily.',
            '[4] Bank of Canada (July 27, 2026), Market Participants Survey — Second Quarter of 2026.',
            '[5] Bank of Canada (September 2, 2026), Bank of Canada maintains the policy rate at 2¼%.',
          ].map((ref, i) => (
            <p key={i} style={{ fontSize: 12, color: GREY, lineHeight: 1.7, margin: '0 0 8px' }}>{ref}</p>
          ))}
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #F3F4F6' }}>
            <p style={{ fontSize: 12, color: GREY, lineHeight: 1.7, margin: '0 0 6px' }}>
              <strong>Statistical terminology:</strong> "Foreign investors" corresponds to Statistics Canada's non-resident sector.
              The C$61.3B figure is a net acquisition of federal government bonds by non-residents — not foreign direct investment.
            </p>
            <p style={{ fontSize: 12, color: GREY, lineHeight: 1.7, margin: 0 }}>
              <strong>Interpretive boundary:</strong> The aggregate official data do not identify a single investor motive.
              Sovereign-credit confidence, safe-asset demand and interest-rate positioning are treated as potentially overlapping explanations, not a proven single cause.
            </p>
          </div>
        </div>

        {/* Share bar */}
        <ShareBar
          url="https://lakive.com/reports/the-61-billion-paradox"
          title="The $61 Billion Paradox — Why Are Foreigners Betting Big on Canada While Locals Can't Afford It?"
          lang="en"
        />

                {/* Language link */}
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link href="/reports/the-61-billion-paradox-cn" style={{ fontSize: 13, color: TEAL, textDecoration: 'none', fontWeight: 600 }}>
            阅读中文版 →
          </Link>
        </div>

      </article>
    </main>
  )
}
