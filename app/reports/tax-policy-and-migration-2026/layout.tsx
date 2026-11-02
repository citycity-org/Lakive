import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Policy and Human Migration · Lakive Research',
  description: 'How taxes shape where people live, work, and build wealth. A review of academic evidence on tax policy and migration decisions, with a case study on Washington State\'s 2026 millionaires\' tax.',
  alternates: { canonical: 'https://lakive.com/reports/tax-policy-and-migration-2026' },
  openGraph: {
    title: 'Tax Policy and Human Migration · Lakive City Intelligence',
    description: 'Do taxes drive people to move? Academic evidence says: it depends on who you are and what you earn. A data-grounded research report.',
    type: 'article',
    publishedTime: '2026-10-28',
    authors: ['Lakive City Intelligence'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
