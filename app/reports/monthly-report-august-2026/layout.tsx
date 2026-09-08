import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'August 2026 Monthly Report · Lakive City Intelligence',
  description: 'Lakive monthly city intelligence report — August 2026. Canadian housing market, employment, interest rates, and city scores for Vancouver, Toronto, Calgary, Montréal, and Ottawa.',
  alternates: { canonical: 'https://lakive.com/reports/monthly-report-august-2026' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
