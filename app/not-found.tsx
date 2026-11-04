import Link from 'next/link'

export default function NotFound() {
  const links = [
    { href: '/ranking',   label: 'City Rankings',       desc: 'Compare 27 cities across Canada and the US',   color: '#14B8A6' },
    { href: '/calculate', label: 'Calculate My Fit',     desc: 'Enter your occupation and income to get a score', color: '#4F8EF7' },
    { href: '/compare',   label: 'Compare Two Cities',   desc: 'Side-by-side: rent, years to buy, fit score',  color: '#8B5CF6' },
    { href: '/reports',   label: 'Research Reports',     desc: 'Data-driven reports on city affordability',    color: '#F97316' },
    { href: '/guide',     label: 'Newcomer Guides',      desc: 'Practical city intelligence for your move',    color: '#14B8A6' },
    { href: '/pulse',     label: 'Market Pulse',         desc: 'Live Bank of Canada rate + housing data',      color: '#F59E0B' },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg,#0d1117 0%,#111827 60%,#0d1117 100%)',
      padding: '80px 24px 60px',
    }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* Error header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 14px', borderRadius: 20, marginBottom: 20,
            background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.25)',
          }}>
            <span style={{ color: '#EF4444', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em' }}>404 · NOT FOUND</span>
          </div>

          <h1 style={{ color: 'white', fontSize: 32, fontWeight: 900, lineHeight: 1.2, margin: '0 0 12px', letterSpacing: '-0.5px' }}>
            This page doesn&apos;t exist.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            The URL may have changed or the page was removed. Here&apos;s where to go instead:
          </p>
        </div>

        {/* Quick navigation */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 10, marginBottom: 36 }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              display: 'block', padding: '16px 20px', borderRadius: 14,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)',
              textDecoration: 'none', transition: 'border-color 0.15s',
            }}>
              <div style={{ color: l.color, fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                {l.label} →
              </div>
              <div style={{ color: 'rgba(255,255,255,0.52)', fontSize: 12, lineHeight: 1.5 }}>
                {l.desc}
              </div>
            </Link>
          ))}
        </div>

        {/* Back home */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '11px 22px', borderRadius: 10,
            background: 'linear-gradient(135deg,#4F8EF7,#5B5CF0)',
            color: 'white', fontSize: 14, fontWeight: 700, textDecoration: 'none',
          }}>
            ← Back to Lakive home
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>
            or use the navigation above
          </span>
        </div>

      </div>
    </div>
  )
}
