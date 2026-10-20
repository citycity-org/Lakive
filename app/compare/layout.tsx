import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Cities',
  description: 'Side-by-side comparison of cities in Canada and the US by housing affordability, salary, taxes, and quality of life. Compare Calgary vs Toronto, Vancouver vs Seattle, and more — by occupation.',
  alternates: { canonical: 'https://lakive.com/compare' },
  openGraph: {
    title: 'Compare Cities Side-by-Side · Lakive',
    description: 'Calgary vs Toronto, Vancouver vs Seattle — compare any two cities by housing costs, income, taxes, and career demand for your specific occupation.',
    url: 'https://lakive.com/compare',
  },
}

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
