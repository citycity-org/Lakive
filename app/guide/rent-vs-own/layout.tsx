import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rent vs Own — Canadian City Breakeven Calculator',
  description: 'How many years until buying beats renting in Vancouver, Toronto, Calgary, Ottawa and more? Lakive\'s rent-vs-own breakeven calculator by occupation and city.',
  alternates: { canonical: 'https://lakive.com/guide/rent-vs-own' },
  openGraph: {
    title: 'Rent vs Own in Canadian Cities · Lakive',
    description: 'Find your breakeven year: compare renting vs owning across Canadian cities by occupation, income, and local home prices.',
    url: 'https://lakive.com/guide/rent-vs-own',
  },
}

export default function RentVsOwnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
