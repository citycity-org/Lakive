import type { Metadata } from 'next'

const CITY_META: Record<string, { name: string; province: string; desc: string }> = {
  vancouver: {
    name: 'Vancouver',
    province: 'BC',
    desc: 'Vancouver city intelligence: housing affordability, salary by occupation, rent pressure, employment outlook, and quality of life scores for professionals and newcomers.',
  },
  toronto: {
    name: 'Toronto',
    province: 'ON',
    desc: 'Toronto city intelligence: housing affordability, salary by occupation, rent pressure, employment outlook, and quality of life scores for professionals and newcomers.',
  },
  calgary: {
    name: 'Calgary',
    province: 'AB',
    desc: 'Calgary city intelligence: housing affordability, no provincial sales tax (PST) advantage, salary by occupation, rent pressure, employment outlook, and quality of life scores.',
  },
  montreal: {
    name: 'Montréal',
    province: 'QC',
    desc: 'Montréal city intelligence: housing affordability, salary by occupation, rent pressure, employment outlook, and quality of life scores for professionals and newcomers.',
  },
  ottawa: {
    name: 'Ottawa',
    province: 'ON',
    desc: 'Ottawa city intelligence: housing affordability, public sector employment, salary by occupation, rent pressure, and quality of life scores for professionals and newcomers.',
  },
  edmonton: {
    name: 'Edmonton',
    province: 'AB',
    desc: 'Edmonton city intelligence: housing affordability, no provincial sales tax (PST) advantage, oil & gas industry salaries, rent pressure, and quality of life scores.',
  },
  winnipeg: {
    name: 'Winnipeg',
    province: 'MB',
    desc: 'Winnipeg city intelligence: housing affordability, salary by occupation, rent pressure, employment outlook, and quality of life scores for professionals and newcomers.',
  },
  halifax: {
    name: 'Halifax',
    province: 'NS',
    desc: 'Halifax city intelligence: housing affordability, Atlantic Canada employment, salary by occupation, rent pressure, and quality of life scores for professionals and newcomers.',
  },
  'quebec-city': {
    name: 'Québec City',
    province: 'QC',
    desc: 'Québec City city intelligence: housing affordability, government employment, salary by occupation, rent pressure, and quality of life scores for professionals and newcomers.',
  },
  hamilton: {
    name: 'Hamilton',
    province: 'ON',
    desc: 'Hamilton city intelligence: housing affordability, healthcare & manufacturing employment, salary by occupation, rent pressure, and quality of life scores.',
  },
  'kitchener-waterloo': {
    name: 'Kitchener-Waterloo',
    province: 'ON',
    desc: 'Kitchener-Waterloo city intelligence: tech corridor housing affordability, startup employment, salary by occupation, rent pressure, and quality of life scores.',
  },
  victoria: {
    name: 'Victoria',
    province: 'BC',
    desc: 'Victoria city intelligence: housing affordability, government & tech employment, salary by occupation, rent pressure, and quality of life scores for professionals and newcomers.',
  },
  seattle: {
    name: 'Seattle',
    province: 'WA',
    desc: 'Seattle city intelligence: housing affordability, tech sector salaries, no state income tax advantage, rent pressure, employment outlook, and quality of life scores.',
  },
  'san-francisco': {
    name: 'San Francisco',
    province: 'CA',
    desc: 'San Francisco city intelligence: housing affordability, tech sector salaries, rent pressure, employment outlook, and quality of life scores for professionals.',
  },
  'new-york': {
    name: 'New York City',
    province: 'NY',
    desc: 'New York City intelligence: housing affordability, finance & tech salaries, rent pressure, employment outlook, and quality of life scores for professionals.',
  },
  boston: {
    name: 'Boston',
    province: 'MA',
    desc: 'Boston city intelligence: housing affordability, biotech & education sector salaries, rent pressure, employment outlook, and quality of life scores for professionals.',
  },
  austin: {
    name: 'Austin',
    province: 'TX',
    desc: 'Austin city intelligence: housing affordability, tech sector salaries, no state income tax advantage, rent pressure, employment outlook, and quality of life scores.',
  },
  chicago: {
    name: 'Chicago',
    province: 'IL',
    desc: 'Chicago city intelligence: housing affordability, finance & tech salaries, rent pressure, employment outlook, and quality of life scores for professionals.',
  },
  'los-angeles': {
    name: 'Los Angeles',
    province: 'CA',
    desc: 'Los Angeles city intelligence: housing affordability, entertainment & tech salaries, rent pressure, employment outlook, and quality of life scores for professionals.',
  },
  denver: {
    name: 'Denver',
    province: 'CO',
    desc: 'Denver city intelligence: housing affordability, aerospace & tech salaries, flat income tax advantage, rent pressure, employment outlook, and quality of life scores.',
  },
  miami: {
    name: 'Miami',
    province: 'FL',
    desc: 'Miami city intelligence: housing affordability, finance & international business salaries, no state income tax advantage, rent pressure, employment outlook, and quality of life scores.',
  },
  dallas: {
    name: 'Dallas',
    province: 'TX',
    desc: 'Dallas city intelligence: housing affordability, corporate & tech salaries, no state income tax advantage, rent pressure, employment outlook, and quality of life scores.',
  },
  atlanta: {
    name: 'Atlanta',
    province: 'GA',
    desc: 'Atlanta city intelligence: housing affordability, corporate HQ & tech salaries, rent pressure, employment outlook, and quality of life scores for professionals.',
  },
  phoenix: {
    name: 'Phoenix',
    province: 'AZ',
    desc: 'Phoenix city intelligence: housing affordability, semiconductor & healthcare salaries, low income tax advantage, rent pressure, employment outlook, and quality of life scores.',
  },
  'washington-dc': {
    name: 'Washington DC',
    province: 'DC',
    desc: 'Washington DC city intelligence: housing affordability, government contracting & tech salaries, rent pressure, employment outlook, and quality of life scores for professionals.',
  },
  houston: {
    name: 'Houston',
    province: 'TX',
    desc: 'Houston city intelligence: housing affordability, energy & medical center salaries, no state income tax advantage, rent pressure, employment outlook, and quality of life scores.',
  },
  nashville: {
    name: 'Nashville',
    province: 'TN',
    desc: 'Nashville city intelligence: housing affordability, healthcare IT & entertainment salaries, no state income tax advantage, rent pressure, employment outlook, and quality of life scores.',
  },
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const city = CITY_META[slug]
  if (!city) return { title: 'City Intelligence · Lakive' }

  const title = `${city.name}, ${city.province} — City Intelligence`
  return {
    title,
    description: city.desc,
    alternates: { canonical: `https://lakive.com/city/${slug}` },
    openGraph: {
      title: `${title} · Lakive`,
      description: city.desc,
      url: `https://lakive.com/city/${slug}`,
    },
  }
}

export default function CityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
