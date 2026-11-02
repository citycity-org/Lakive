'use client'

import Link from 'next/link'

// ── Styles ────────────────────────────────────────────────────────────────────
const s = {
  page:       { background: '#0A1930', minHeight: '100vh', fontFamily: 'Arial, sans-serif' } as React.CSSProperties,
  hero:       { background: 'linear-gradient(135deg, #0A1930 0%, #0f2847 100%)', padding: '64px 24px 48px', borderBottom: '1px solid rgba(45,212,191,0.2)' } as React.CSSProperties,
  heroInner:  { maxWidth: 860, margin: '0 auto' } as React.CSSProperties,
  tag:        { display: 'inline-block', background: 'rgba(45,212,191,0.12)', border: '1px solid rgba(45,212,191,0.35)', color: '#2DD4BF', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', padding: '4px 12px', borderRadius: 4, marginBottom: 20, textTransform: 'uppercase' as const },
  h1:         { color: '#F8FAFC', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 800, lineHeight: 1.15, marginBottom: 16 } as React.CSSProperties,
  subtitle:   { color: '#94A3B8', fontSize: 18, fontStyle: 'italic', marginBottom: 28, lineHeight: 1.5 } as React.CSSProperties,
  meta:       { color: '#64748B', fontSize: 13, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, display: 'flex', flexWrap: 'wrap' as const, gap: '8px 24px', alignItems: 'center' } as React.CSSProperties,
  body:       { maxWidth: 860, margin: '0 auto', padding: '0 24px 80px' } as React.CSSProperties,
  section:    { marginTop: 56 } as React.CSSProperties,
  h2:         { color: '#F1F5F9', fontSize: 22, fontWeight: 700, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid rgba(45,212,191,0.25)' } as React.CSSProperties,
  h3:         { color: '#2DD4BF', fontSize: 16, fontWeight: 700, marginBottom: 12, marginTop: 28, letterSpacing: '0.02em' } as React.CSSProperties,
  p:          { color: '#CBD5E1', fontSize: 15.5, lineHeight: 1.75, marginBottom: 16 } as React.CSSProperties,
  pSmall:     { color: '#64748B', fontSize: 13, lineHeight: 1.65, marginBottom: 10, fontStyle: 'italic' } as React.CSSProperties,
  scopeBox:   { background: 'rgba(45,212,191,0.06)', border: '1px solid rgba(45,212,191,0.25)', borderLeft: '4px solid #2DD4BF', borderRadius: 6, padding: '16px 20px', marginTop: 32, marginBottom: 0 } as React.CSSProperties,
  scopeLabel: { color: '#2DD4BF', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 6 } as React.CSSProperties,
  scopeText:  { color: '#94A3B8', fontSize: 14, lineHeight: 1.65, fontStyle: 'italic', margin: 0 } as React.CSSProperties,
  findBox:    { background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.3)', borderLeft: '5px solid #F97316', borderRadius: 6, padding: '20px 24px', margin: '32px 0' } as React.CSSProperties,
  findLabel:  { color: '#F97316', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 8 } as React.CSSProperties,
  findText:   { color: '#F1F5F9', fontSize: 17, fontWeight: 700, lineHeight: 1.5, margin: 0 } as React.CSSProperties,
  dl:         { download: { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.3)', color: '#2DD4BF', fontSize: 14, fontWeight: 600, padding: '10px 20px', borderRadius: 6, textDecoration: 'none', marginTop: 4, cursor: 'pointer' } } as { download: React.CSSProperties },
  back:       { color: '#64748B', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', marginTop: 32, marginBottom: 0 } as React.CSSProperties,
  bullet:     { color: '#CBD5E1', fontSize: 15.5, lineHeight: 1.75, marginBottom: 10, paddingLeft: 20, position: 'relative' as const },
  num:        { color: '#CBD5E1', fontSize: 15.5, lineHeight: 1.75, marginBottom: 10 } as React.CSSProperties,
}

// ── Evidence Table ────────────────────────────────────────────────────────────
function EvidenceTable() {
  const rows = [
    { study: 'Young et al. (2016)\nAmer. Sociol. Rev.', data: 'US federal tax returns; all million-dollar earners; 13-year panel', finding: 'Tax flight exists but is small; professional ties and networks strongly constrain mobility', applies: 'High-income earners with location-bound careers — not mobile star performers' },
    { study: 'Moretti & Wilson (2017)\nAmer. Econ. Rev.', data: 'US patent records 1976–2010; "star scientists" = top 5% inventors', finding: 'Large tax effects on location choices; corporate tax rates also matter significantly', applies: 'Highly mobile, high-skill knowledge workers — not typical wage earners' },
    { study: 'Kleven et al. (2014)\nQ. J. of Economics', data: 'Danish administrative data; high-earning foreign workers under preferential tax scheme', finding: 'Migration elasticity 1.5–2×; tax incentives can substantially grow inflows of foreign talent', applies: 'International talent relocation; inflow policy design' },
    { study: 'Lavecchia et al. (2026)\nIZA Working Paper *', data: 'Canadian tax-filer panel; 1998–2001 provincial tax reforms', finding: 'Effect runs mainly through retention, not attraction; younger, unmarried, high-income most responsive', applies: 'Interprovincial movers; policy levers for retaining existing high earners' },
    { study: 'Kleven et al. (2020)\nJ. of Econ. Perspectives', data: 'Synthesis of empirical studies across multiple countries', finding: 'Tax effects vary with jurisdiction size, coordination, and non-tax policies; no single universal elasticity', applies: 'Policy analysis — context-specific conclusions required' },
  ]
  const th: React.CSSProperties = { background: '#0A1930', color: '#2DD4BF', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '10px 12px', textAlign: 'left', whiteSpace: 'nowrap' }
  const td: React.CSSProperties = { color: '#CBD5E1', fontSize: 13.5, lineHeight: 1.6, padding: '10px 12px', verticalAlign: 'top', borderBottom: '1px solid rgba(255,255,255,0.06)' }
  const tdDark: React.CSSProperties = { ...td, background: 'rgba(255,255,255,0.02)' }
  return (
    <div style={{ overflowX: 'auto', marginTop: 16 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, overflow: 'hidden' }}>
        <thead>
          <tr>
            {['Study', 'Data', 'Core Finding', 'Applies To'].map(h => <th key={h} style={th}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
              <td style={{ ...td, fontWeight: 600, color: '#E2E8F0', whiteSpace: 'pre-line', minWidth: 160 }}>{r.study}</td>
              <td style={td}>{r.data}</td>
              <td style={td}>{r.finding}</td>
              <td style={td}>{r.applies}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ color: '#475569', fontSize: 12, marginTop: 8, fontStyle: 'italic' }}>
        * Working paper findings are preliminary pending peer-reviewed publication.
      </p>
    </div>
  )
}

// ── Case Study Table ──────────────────────────────────────────────────────────
function CaseTable() {
  const rows = [
    ['Annual income', '$180,000', '$2,500,000'],
    ['WA SB 6346 applies?', 'No — under $1M threshold', 'Yes — 9.9% on $1,500,000'],
    ['New tax liability (2028)', '$0', '$148,500/year'],
    ['Seattle median rent (2BR)', '$2,500/mo ($30,000/yr) ¹', '$2,500/mo ($30,000/yr) ¹'],
    ['Dallas median rent (2BR)', '$1,850/mo ($22,200/yr) ¹', '$1,850/mo ($22,200/yr) ¹'],
    ['Annual rent saving (Dallas)', '$7,800', '$7,800'],
    ['Total annual saving (Dallas)', '$7,800 (housing only)', '$156,300 (tax + housing)'],
    ['Typical salary shift in Dallas', '–5 to –10% vs. Seattle ²', 'Income structure differs — equity, advisory, and capital income are largely location-portable; standard salary benchmarks do not apply'],
    ['Net financial case for move', 'Weak to neutral: housing savings likely offset by salary reduction', 'Strong: tax savings dominate at this income level'],
    ['Non-financial factors', 'Professional network, Amazon/Microsoft ecosystem, family ties', 'Capital gains planning, business location, legal challenge outcome'],
    ['Research verdict', 'Migration effect small (Young et al. 2016 applies)', 'Migration effect larger (Moretti & Kleven findings apply)'],
  ]
  const th: React.CSSProperties = { background: '#0A1930', color: '#F1F5F9', fontSize: 12.5, fontWeight: 700, padding: '12px 14px', textAlign: 'left', lineHeight: 1.4 }
  const rowLabel: React.CSSProperties = { color: '#94A3B8', fontSize: 13, fontWeight: 600, padding: '10px 14px', verticalAlign: 'top', borderBottom: '1px solid rgba(255,255,255,0.06)', whiteSpace: 'nowrap', background: 'rgba(10,25,48,0.6)' }
  const td: React.CSSProperties = { color: '#CBD5E1', fontSize: 13.5, lineHeight: 1.6, padding: '10px 14px', verticalAlign: 'top', borderBottom: '1px solid rgba(255,255,255,0.06)' }
  return (
    <div style={{ overflowX: 'auto', marginTop: 16 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid rgba(255,255,255,0.1)' }}>
        <thead>
          <tr>
            <th style={{ ...th, width: '22%' }}></th>
            <th style={{ ...th, width: '39%', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
              Scenario A<br/><span style={{ color: '#94A3B8', fontWeight: 400 }}>Senior Software Engineer · $180K salary</span>
            </th>
            <th style={{ ...th, width: '39%', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
              Scenario B<br/><span style={{ color: '#94A3B8', fontWeight: 400 }}>Tech Founder / Executive · $2.5M income</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent' }}>
              <td style={rowLabel}>{r[0]}</td>
              <td style={{ ...td, borderLeft: '1px solid rgba(255,255,255,0.06)' }}>{r[1]}</td>
              <td style={{ ...td, borderLeft: '1px solid rgba(255,255,255,0.06)' }}>{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── References ────────────────────────────────────────────────────────────────
const REFS = [
  { n: 1, text: 'Young, Varner, Lurie & Prisinzano (2016). Millionaire Migration and Taxation of the Elite. American Sociological Review, 81(3). DOI: 10.1177/0003122416639625.', url: 'https://eml.berkeley.edu/~saez/course/Millionaire_Migration_and_the_Taxtion_of_the_Elite.pdf' },
  { n: 2, text: 'Moretti & Wilson (2017). The Effect of State Taxes on the Geographical Location of Top Earners. American Economic Review, 107(7): 1858–1903.', url: 'https://doi.org/10.1257/aer.20150508' },
  { n: 3, text: 'Kleven, Landais, Saez & Schultz (2014). Migration and Wage Effects of Taxing Top Earners. Quarterly Journal of Economics, 129(1): 333–378.', url: 'https://doi.org/10.1093/qje/qjt033' },
  { n: 4, text: 'Lavecchia, McKercher & Tazhitdinova (2026). Should I Stay or Should I Go? IZA Discussion Paper 18544.', url: 'https://www.iza.org/publications/dp/18544/should-i-stay-or-should-i-go-the-impact-of-taxation-on-canadian-inter-provincial-migration' },
  { n: 5, text: 'Kleven, Landais, Muñoz & Stantcheva (2020). Taxation and Migration: Evidence and Policy Implications. Journal of Economic Perspectives, 34(2): 119–142.', url: 'https://doi.org/10.1257/jep.34.2.119' },
  { n: 6, text: 'Washington Governor\'s Office (March 30, 2026). Governor Ferguson Signs Millionaires\' Tax into Law (SB 6346).', url: 'https://governor.wa.gov/node/103667' },
  { n: 7, text: 'U.S. Census Bureau. State-to-State Migration Flows (American Community Survey).', url: 'https://www.census.gov/data/tables/time-series/demo/geographic-mobility/state-to-state-migration.html' },
  { n: 8, text: 'IRS. State and County Migration Data (SOI Tax Stats).', url: 'https://www.irs.gov/statistics/soi-tax-stats-migration-data' },
]

// ── Page ──────────────────────────────────────────────────────────────────────
export default function TaxMigrationReport() {
  return (
    <div style={s.page}>

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroInner}>
          <Link href="/reports" style={s.back}>← All Reports</Link>
          <div style={{ height: 24 }} />
          <div style={s.tag}>Research Report · Migration & Economic Mobility</div>
          <h1 style={s.h1}>Tax Policy and Human Migration</h1>
          <p style={s.subtitle}>How Taxes Shape Where People Live, Work, and Build Wealth</p>
          <div style={s.meta}>
            <span>Lakive City Intelligence</span>
            <span style={{ color: '#334155' }}>·</span>
            <span>October 28, 2026</span>
            <span style={{ color: '#334155' }}>·</span>
            <span>United States &amp; Canada</span>
            <a
              href="/reports/pdf/Lakive_Tax_Policy_Migration_Report_2026.pdf"
              download
              style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.3)', color: '#2DD4BF', fontSize: 13, fontWeight: 600, padding: '8px 16px', borderRadius: 6, textDecoration: 'none' }}
            >
              ↓ Download PDF
            </a>
          </div>
          <div style={s.scopeBox}>
            <div style={s.scopeLabel}>Research Scope</div>
            <p style={s.scopeText}>
              This report examines how tax policy influences household migration decisions, drawing primarily on interstate migration evidence from the United States, with Canadian interprovincial migration as a complementary perspective. It synthesizes peer-reviewed academic studies and official policy sources. This is a thematic overview — it does not provide city-level causal estimates or personalized tax advice.
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={s.body}>

        {/* Executive Summary */}
        <div style={s.section}>
          <h2 style={s.h2}>Executive Summary</h2>
          <p style={s.p}>Taxes affect not only how much income households retain, but where they choose to live, work, buy homes, and accumulate wealth. Research shows that tax differences can influence migration — but the magnitude varies substantially. Effects are strongest among high earners with portable occupations, and far more limited for typical wage-earning households.</p>
          <p style={s.p}>Three findings from the academic literature stand out. First, migration responses to tax changes are real but neither universal nor proportional to the tax difference alone. Second, low-tax jurisdictions do not automatically offer greater net benefit: property taxes, service quality, and housing costs often offset income-tax savings. Third, occupational mobility is a critical moderator — professionals with portable skills respond to tax incentives more strongly than those whose careers are location-bound.</p>
          <p style={s.p}>This report organizes that evidence into four causal mechanisms, a review of five key studies with a comparative summary table, a focused case study on Washington State's 2026 millionaires' tax showing why the same policy affects two Seattle residents very differently, and a parallel analysis of Canadian interprovincial patterns.</p>
        </div>

        {/* Section 1 */}
        <div style={s.section}>
          <h2 style={s.h2}>1.  Four Mechanisms Linking Tax Policy and Migration</h2>

          <h3 style={s.h3}>After-Tax Earnings</h3>
          <p style={s.p}>Identical gross salaries generate different take-home incomes across jurisdictions. On a $150,000 salary, a five-percentage-point difference in effective income tax rate implies a $7,500 annual gap — meaningful, but erasable by a lower salary at the destination, higher housing costs, or reduced access to public services. Meaningful comparison requires occupation-specific after-tax income, not nominal tax rates in isolation.</p>

          <h3 style={s.h3}>Capital Gains and Wealth Accumulation</h3>
          <p style={s.p}>For entrepreneurs, equity holders, and high-net-worth households, capital gains treatment is often a primary migration consideration. Actual tax liabilities depend on residency timing, asset sourcing rules, and anti-avoidance provisions — relocating does not automatically extinguish obligations to the former jurisdiction.</p>

          <h3 style={s.h3}>The Total Cost of Homeownership</h3>
          <p style={s.p}>Jurisdictions without a state income tax may impose relatively high property taxes, insurance premiums, or local levies. For families with children and prospective homeowners, cumulative housing and service costs can outweigh near-term income-tax savings. The relevant comparison is total household cost of living, not the income tax rate alone.</p>

          <h3 style={s.h3}>The Exchange Between Taxes and Public Services</h3>
          <p style={s.p}>Tax revenue funds education, healthcare, transit, and public safety. Households evaluate the combination of after-tax income, service quality, and quality of life — not the lowest achievable rate. A city that delivers more in services for moderately higher taxes may produce a better household outcome than a low-tax city with degraded public infrastructure.</p>
        </div>

        {/* Section 2 */}
        <div style={s.section}>
          <h2 style={s.h2}>2.  Academic Evidence and Its Limits</h2>

          <h3 style={s.h3}>U.S. Millionaires: Tax-Related Migration Exists, but Is Constrained</h3>
          <p style={s.p}>Young, Varner, Lurie, and Prisinzano (2016) analyze federal tax returns covering all million-dollar earners over 13 years and find evidence of tax-related migration — but professional networks, client relationships, and family ties substantially limit mobility. Notably, when Florida (the dominant no-income-tax destination) is excluded, tax-rate differences between states show no significant migration effect. <em style={{ color: '#64748B' }}>American Sociological Review, 81(3).</em> [<a href="#ref-1" style={{ color: '#2DD4BF' }}>1</a>]</p>

          <h3 style={s.h3}>Top U.S. Scientists: Mobile Talent Responds More Strongly</h3>
          <p style={s.p}>Moretti and Wilson (2017) study U.S. patent records from 1976 to 2010 and document significant responses to both personal and corporate tax differences among "star scientists" — inventors in the top 5% by patent count. The migration elasticity is substantial for this group, but the authors caution these findings should not be generalized to electricians, physicians, or typical wage earners. <em style={{ color: '#64748B' }}>American Economic Review, 107(7): 1858–1903.</em> [<a href="#ref-2" style={{ color: '#2DD4BF' }}>2</a>]</p>

          <h3 style={s.h3}>High-Earning Foreign Workers in Denmark: Tax Incentives Drive Inflows</h3>
          <p style={s.p}>Kleven, Landais, Saez, and Schultz (2014) examine Denmark's preferential flat-rate tax scheme for new high-earning foreign workers and find a migration elasticity of 1.5 to 2 — a large effect. The study demonstrates that tax policy shapes inflows as well as outflows, and that well-designed incentive schemes can attract internationally mobile talent. <em style={{ color: '#64748B' }}>Quarterly Journal of Economics, 129(1): 333–378.</em> [<a href="#ref-3" style={{ color: '#2DD4BF' }}>3</a>]</p>

          <h3 style={s.h3}>Canadian Interprovincial Migration: Tax Changes Affect Retention More than Attraction</h3>
          <p style={s.p}>Lavecchia, McKercher, and Tazhitdinova (2026) use Canadian provincial tax reforms from 1998 to 2001 and find greater tax sensitivity among younger, unmarried, higher-income individuals. The estimated effect operates primarily through retention of existing residents rather than attraction of new ones — a distinction with direct implications for provincial policy design. <em style={{ color: '#64748B' }}>IZA Discussion Paper 18544 (working paper; pending peer review).</em> [<a href="#ref-4" style={{ color: '#2DD4BF' }}>4</a>]</p>

          <p style={s.p}>Taken together, the studies confirm that tax effects depend on income composition, relocation costs, occupational portability, and the quality of opportunities at the destination. Kleven, Landais, Muñoz, and Stantcheva (2020) synthesize this literature and conclude that no single universal elasticity exists: jurisdiction size, degree of policy coordination, and non-tax conditions all moderate the relationship. [<a href="#ref-5" style={{ color: '#2DD4BF' }}>5</a>]</p>

          <h3 style={s.h3}>Research Evidence at a Glance</h3>
          <EvidenceTable />
        </div>

        {/* Section 3 */}
        <div style={s.section}>
          <h2 style={s.h2}>3.  Case Study: Washington State and the Income-Level Divide</h2>
          <p style={s.p}>Washington State enacted SB 6346 in March 2026, signed by Governor Bob Ferguson on March 30. The law establishes a 9.9% personal income tax on household income above $1 million, effective January 1, 2028. A legal challenge was filed on the day of signing, with opponents arguing it constitutes an unconstitutional graduated income tax. Separately, Initiative 645 — a citizen initiative to repeal the tax before it takes effect — was certified for the ballot on July 15, 2026 and is scheduled for a statewide vote on November 3, 2026. <em style={{ color: '#64748B' }}>Status as of October 28, 2026. This report will be updated following the November 3 vote.</em> [<a href="#ref-6" style={{ color: '#2DD4BF' }}>6</a>]</p>
          <p style={s.p}>The Washington case illustrates a point the academic literature consistently makes: the same tax policy creates very different migration incentives depending on who you are. The table below compares two Seattle residents — a senior software engineer and a high-income tech founder — both considering a move to Dallas.</p>

          <CaseTable />

          <p style={{ ...s.pSmall, marginTop: 12 }}>¹ Approximate 2-bedroom median rents: Apartment List / Trulia, Q3–Q4 2026 estimates. ² Salary shift for Scenario A is an illustrative assumption for comparison purposes; actual outcomes vary by role and employer.</p>
          <p style={{ ...s.p, marginTop: 16 }}>The key insight: for the software engineer, SB 6346 is irrelevant — the $1M threshold is far above their income. The migration calculus turns entirely on housing costs versus salary differences, and the net financial case for moving is weak to neutral. For the tech founder, the tax liability is $148,500 per year — a figure that changes the calculation materially. At that income level, earnings are typically diversified across salary, equity, consulting, and capital gains; most are location-portable, so standard salary-reduction benchmarks do not apply.</p>
          <p style={s.p}>This is consistent with Young et al. (2016): at the median-to-high end of professional incomes, taxes rarely drive relocation decisions on their own. At the very top of the income distribution, Moretti & Wilson (2017) and Kleven et al. (2014) show the effect becomes meaningful. Policy analysis that treats these two populations as one will systematically overestimate migration response for most workers and underestimate it for a small, high-income segment.</p>
        </div>

        {/* Section 4 */}
        <div style={s.section}>
          <h2 style={s.h2}>4.  Canada: Taxation and Interprovincial Migration</h2>
          <p style={s.p}>Canadian provinces differ substantially in income taxes, sales taxes, housing costs, and employment conditions. Recent net migration toward Alberta reflects a combination of factors: wage levels in the energy sector, relatively affordable housing, the absence of a provincial sales tax, and family circumstances. (Statistics Canada, interprovincial migration estimates, 2023–2025.) Attributing migration flows to tax rates alone overstates what descriptive statistics can demonstrate.</p>
          <p style={s.p}>Rigorous analysis requires combining Statistics Canada interprovincial migration data with published provincial tax schedules, occupation-level wages, and housing cost benchmarks. For parallel U.S. research, the Census Bureau's American Community Survey state-to-state flows and the IRS State and County Migration Data provide the most granular publicly available evidence. [<a href="#ref-7" style={{ color: '#2DD4BF' }}>7</a>, <a href="#ref-8" style={{ color: '#2DD4BF' }}>8</a>]</p>
          <p style={s.pSmall}>Methodological note: changes to IRS statistical methodology in recent years limit direct comparisons across some periods. The Lavecchia et al. (2026) paper cited above is an IZA working paper; readers should treat its quantitative estimates as preliminary pending peer-reviewed publication.</p>
        </div>

        {/* Section 5 */}
        <div style={s.section}>
          <h2 style={s.h2}>5.  Limitations and What This Report Does Not Claim</h2>
          <p style={s.p}>This report does not estimate what share of observed migration in any city is caused by taxes, nor does it establish a city-level causal model. Four methodological boundaries deserve explicit acknowledgment:</p>
          {[
            'Correlation between low-tax environments and positive migration flows does not establish causation. Employment growth, housing supply, cost of living, and climate independently drive migration.',
            'Findings from top-earning scientists or millionaires are not transferable to median-wage households. The income segment studied is the primary determinant of the elasticity found.',
            'Tax comparisons require aligned reference years, consistent filing assumptions, and matched effective-rate definitions. Comparing nominal statutory rates across jurisdictions without these controls is methodologically unsound.',
            'For Washington State: as of publication (October 28, 2026), SB 6346 has not taken effect. A legal challenge has been filed and a repeal initiative (I-645) is on the November 3, 2026 ballot. Migration effects attributed to it in current media coverage reflect expectation, not observed behavior.',
          ].map((b, i) => (
            <p key={i} style={{ ...s.bullet, paddingLeft: 28 }}>
              <span style={{ position: 'absolute', left: 0, color: '#2DD4BF', fontWeight: 700 }}>·</span>
              {b}
            </p>
          ))}
        </div>

        {/* Section 6 */}
        <div style={s.section}>
          <h2 style={s.h2}>6.  Research Conclusions</h2>
          <p style={s.p}>Five findings emerge from this review:</p>
          {[
            'Taxes are a genuine economic driver of migration — not merely a rhetorical talking point.',
            'Effects differ markedly across income groups and occupations. Aggregate statistics obscure the variation that matters most for individual decisions.',
            'Tax policy can influence outflows, inflows, and the retention of existing residents — often simultaneously, and through different mechanisms.',
            'Low taxes do not guarantee greater net gains from relocating. Total household cost of living, including housing and public services, determines the real outcome.',
            'Migration is best understood as a reallocation of household opportunities and living conditions, not an optimization of a single tax line.',
          ].map((item, i) => (
            <p key={i} style={s.num}><span style={{ color: '#2DD4BF', fontWeight: 700 }}>{i + 1}.  </span>{item}</p>
          ))}

          <div style={s.findBox}>
            <div style={s.findLabel}>Core Finding</div>
            <p style={s.findText}>Tax policy can shape migration, but its influence depends on who is moving, what they earn, and what opportunities they leave behind.</p>
          </div>
        </div>

        {/* References */}
        <div style={{ ...s.section, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 40 }}>
          <h2 style={{ ...s.h2, borderBottom: 'none', paddingBottom: 0, marginBottom: 24 }}>References and Data Sources</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {REFS.map(r => (
              <div key={r.n} id={`ref-${r.n}`} style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: '#2DD4BF', fontWeight: 700, fontSize: 13, minWidth: 24, marginTop: 1 }}>[{r.n}]</span>
                <span style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>
                  {r.text}{' '}
                  <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: '#2DD4BF', wordBreak: 'break-all' }}>{r.url}</a>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <p style={{ color: '#475569', fontSize: 13, fontStyle: 'italic', margin: 0 }}>
            © 2026 Lakive City Intelligence. This report is for informational purposes only and does not constitute financial, tax, or legal advice.
          </p>
          <a
            href="/reports/pdf/Lakive_Tax_Policy_Migration_Report_2026.pdf"
            download
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.3)', color: '#2DD4BF', fontSize: 13, fontWeight: 600, padding: '8px 16px', borderRadius: 6, textDecoration: 'none' }}
          >
            ↓ Download Full Report (PDF)
          </a>
        </div>

      </div>
    </div>
  )
}
