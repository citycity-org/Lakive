import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'City Price Index · Lakive',
  description: 'Community-sourced cost of living data across Canadian and US cities. Compare groceries, transit, dining, and everyday expenses by city.',
  alternates: { canonical: 'https://lakive.com/prices' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
