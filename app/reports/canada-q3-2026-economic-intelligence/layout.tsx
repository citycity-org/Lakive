import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Canada Q3 2026 Economic Intelligence Report — Lakive',
  description: 'A structural analysis of Canada\'s post-pandemic economic reckoning: stalled GDP growth, a youth unemployment crisis, persistent housing unaffordability in Toronto and Vancouver, and policy recommendations for employers, investors, and policymakers.',
  alternates: { canonical: 'https://lakive.com/reports/canada-q3-2026-economic-intelligence' },
  openGraph: {
    title: 'Canada Q3 2026 Economic Intelligence Report — Lakive',
    description: 'GDP contraction, 12.9% youth unemployment, and a housing market that still requires 51% of income to service. A data-driven institutional analysis of where Canada stands and where it\'s heading.',
    url: 'https://lakive.com/reports/canada-q3-2026-economic-intelligence',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
