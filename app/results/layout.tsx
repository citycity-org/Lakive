import type { Metadata } from 'next'

// This page is a pure client-side redirect to /calculate — no indexing value.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://lakive.com/calculate' },
}

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
