import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'September 2026 Monthly Report · Lakive City Intelligence',
  description: 'Lakive monthly city intelligence report — September 2026. Stability Without Relief: six consecutive BoC holds, rents down 23 months, CA$27.6B counter-tariffs, and housing stabilization signals. City scores for 7 cities.',
  alternates: { canonical: 'https://lakive.com/reports/monthly-report-september-2026' },
  openGraph: {
    title: 'Canada September 2026 Monthly Report — Stability Without Relief · Lakive',
    description: 'Six consecutive BoC holds at 2.25%, rents down for a 23rd month, CREA showing the smallest price decline since October 2025 — and CA$27.6B in new counter-tariffs. City scores, HPI, RPI and EOI for 7 Canadian cities.',
    url: 'https://lakive.com/reports/monthly-report-september-2026',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
