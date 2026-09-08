import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Canada Cities on the Rise 2026 · Lakive',
  description: 'Which Canadian cities are gaining ground for workers, families, and newcomers in 2026? Lakive ranks cities by employment opportunity, housing affordability, and quality of life.',
  alternates: { canonical: 'https://lakive.com/reports/canada-cities-on-the-rise-2026' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
