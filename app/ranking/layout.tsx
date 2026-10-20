import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'City Rankings',
  description: 'Rank cities in Canada and the US by housing affordability, employment opportunity, tax advantage, and quality of life — filtered by occupation and property type. Compare Vancouver, Calgary, Toronto, Seattle, Austin, and more.',
  alternates: { canonical: 'https://lakive.com/ranking' },
  openGraph: {
    title: 'City Rankings by Occupation · Lakive',
    description: 'See which city ranks best for your profession. Filter by occupation, housing type, and region to find your ideal city across Canada and the US.',
    url: 'https://lakive.com/ranking',
  },
}

export default function RankingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
