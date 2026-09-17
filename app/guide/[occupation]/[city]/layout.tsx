import type { Metadata } from 'next'

const CITY_NAMES: Record<string, string> = {
  // Canada
  vancouver: 'Vancouver', toronto: 'Toronto', calgary: 'Calgary',
  montreal: 'Montréal', ottawa: 'Ottawa', edmonton: 'Edmonton',
  winnipeg: 'Winnipeg', halifax: 'Halifax', 'quebec-city': 'Québec City',
  hamilton: 'Hamilton', 'kitchener-waterloo': 'Kitchener-Waterloo', victoria: 'Victoria',
  // United States
  seattle: 'Seattle', 'san-francisco': 'San Francisco',
  'new-york': 'New York City', boston: 'Boston',
}

function formatOccupation(slug: string): string {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export async function generateMetadata(
  { params }: { params: Promise<{ occupation: string; city: string }> }
): Promise<Metadata> {
  const { occupation, city } = await params
  const occName  = formatOccupation(occupation)
  const cityName = CITY_NAMES[city] ?? city.charAt(0).toUpperCase() + city.slice(1)

  const title = `${occName} in ${cityName} — Housing, Salary & City Fit`
  const desc  = `How many years of income does a ${occName} need to buy a home in ${cityName}? Housing affordability, rent pressure, employment outlook, and city fit score.`

  return {
    title,
    description: desc,
    alternates: { canonical: `https://lakive.com/guide/${occupation}/${city}` },
    openGraph: {
      title: `${title} · Lakive`,
      description: desc,
      url: `https://lakive.com/guide/${occupation}/${city}`,
    },
  }
}

export default function GuideOccCityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
