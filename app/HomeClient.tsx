'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { MarketPulse } from '@/components/MarketPulse'
import SituationAdvisor from '@/components/SituationAdvisor'

interface City {
  id: string
  name: string
  nameEn: string
  lat?: number
  lng?: number
  active: boolean
  country?: 'CA' | 'US'
  score?: number; tai?: number; eoi?: number; eqi?: number
  hpiYears?: number
  rpi?: number
  labelDx?: number
  labelDy?: number
  labelAlign?: string
  labelText?: string
}

const CITIES: City[] = [
  // ── Active cities — label offsets designed to eliminate cluster overlap ──────
  // Western cluster: Vancouver / Calgary / Seattle are tight on-screen
  { id: 'vancouver',     name: 'Vancouver',      nameEn: 'Vancouver',      lat: 49.25,  lng: -123.12, active: true,  score: 70, tai: 72, eoi: 80, eqi: 90, hpiYears: 10.2, rpi: 43.6, labelDx: -8, labelDy: -20, labelAlign: 'right'  },
  { id: 'calgary',       name: 'Calgary',         nameEn: 'Calgary',        lat: 51.05,  lng: -114.07, active: true,  score: 72, tai: 90, eoi: 65, eqi: 82, hpiYears: 3.9,  rpi: 24.1, labelDx:  8, labelDy: -20, labelAlign: 'left'   },
  { id: 'edmonton',      name: 'Edmonton',        nameEn: 'Edmonton',       lat: 53.55,  lng: -113.49, active: true,  score: 70, tai: 90, eoi: 62, eqi: 78, hpiYears: 5.0,  rpi: 25.0, labelDx:  8, labelDy: -20, labelAlign: 'left'   },
  { id: 'winnipeg',     name: 'Winnipeg',        nameEn: 'Winnipeg',       lat: 49.90,  lng: -97.14,  active: true,  score: 68, tai: 65, eoi: 58, eqi: 74, hpiYears: 4.2,  rpi: 23.0, labelDx:  8, labelDy: -20, labelAlign: 'left'   },
  { id: 'victoria',     name: 'Victoria',        nameEn: 'Victoria',       lat: 48.43,  lng: -123.37, active: true,  score: 64, tai: 72, eoi: 55, eqi: 90, hpiYears: 10.5, rpi: 37.0, labelDx: -8, labelDy:  24, labelAlign: 'right'  },
  { id: 'hamilton',     name: 'Hamilton',        nameEn: 'Hamilton',       lat: 43.25,  lng: -79.87,  active: true,  score: 68, tai: 68, eoi: 65, eqi: 72, hpiYears: 7.2,  rpi: 30.0, labelDx:  8, labelDy:  24, labelAlign: 'left'   },
  { id: 'kitchener-waterloo', name: 'Kitchener-Waterloo', nameEn: 'Kitchener-Waterloo', lat: 43.45, lng: -80.49, active: true, score: 72, tai: 68, eoi: 68, eqi: 76, hpiYears: 6.8, rpi: 28.0, labelDx: -8, labelDy: -20, labelAlign: 'right' },
  { id: 'halifax',      name: 'Halifax',         nameEn: 'Halifax',        lat: 44.65,  lng: -63.57,  active: true,  score: 65, tai: 55, eoi: 55, eqi: 82, hpiYears: 6.5,  rpi: 30.0, labelDx:  8, labelDy: -20, labelAlign: 'left'   },
  { id: 'quebec-city',  name: 'Québec City',     nameEn: 'Quebec City',    lat: 46.81,  lng: -71.21,  active: true,  score: 63, tai: 42, eoi: 55, eqi: 80, hpiYears: 4.5,  rpi: 23.0, labelDx:  8, labelDy:  24, labelAlign: 'left'   },
  { id: 'seattle',       name: 'Seattle',         nameEn: 'Seattle',        lat: 47.61,  lng: -122.33, active: true,  country: 'US', score: 75, tai: 95, eoi: 88, eqi: 78, hpiYears: 8.8,  rpi: 21.3, labelDx:  0, labelDy:  24, labelAlign: 'center' },
  // Eastern cluster: Ottawa / Montréal are nearly the same latitude; Toronto / Boston / NYC fan out below
  { id: 'ottawa',        name: 'Ottawa',          nameEn: 'Ottawa',         lat: 45.42,  lng: -75.69,  active: true,  score: 73, tai: 68, eoi: 75, eqi: 80, hpiYears: 6.8,  rpi: 28.4, labelDx: -8, labelDy: -20, labelAlign: 'right'  },
  { id: 'montreal',      name: 'Montréal',        nameEn: 'Montréal',       lat: 45.50,  lng: -73.57,  active: true,  score: 75, tai: 42, eoi: 72, eqi: 78, hpiYears: 5.5,  rpi: 30.2, labelDx:  8, labelDy: -20, labelAlign: 'left'   },
  { id: 'toronto',       name: 'Toronto',         nameEn: 'Toronto',        lat: 43.65,  lng: -79.38,  active: true,  score: 70, tai: 68, eoi: 92, eqi: 75, hpiYears: 9.6,  rpi: 41.2, labelDx: -8, labelDy:  24, labelAlign: 'right'  },
  { id: 'boston',        name: 'Boston',          nameEn: 'Boston',         lat: 42.36,  lng: -71.06,  active: true,  country: 'US', score: 72, tai: 60, eoi: 85, eqi: 75, hpiYears: 11.8, rpi: 24.4, labelDx: 10, labelDy:   4, labelAlign: 'left'   },
  { id: 'new-york',      name: 'New York City',   nameEn: 'New York City',  lat: 40.71,  lng: -74.01,  active: true,  country: 'US', score: 68, tai: 30, eoi: 92, eqi: 62, hpiYears: 14.8, rpi: 29.2, labelDx:  0, labelDy:  24, labelAlign: 'center', labelText: 'New York' },
  // Standalone — centred label is fine
  { id: 'san-francisco', name: 'San Francisco',   nameEn: 'San Francisco',  lat: 37.77,  lng: -122.42, active: true,  country: 'US', score: 65, tai: 35, eoi: 95, eqi: 70, hpiYears: 15.6, rpi: 27.6, labelDx:  0, labelDy: -20, labelAlign: 'center' },
  { id: 'london',    name: 'London',      nameEn: 'London',      lat: 51.51,  lng: -0.13,   active: false },
  { id: 'tokyo',     name: 'Tokyo',       nameEn: 'Tokyo',       lat: 35.68,  lng: 139.69,  active: false },
  { id: 'sydney',    name: 'Sydney',      nameEn: 'Sydney',      lat: -33.87, lng: 151.21,  active: false },
  { id: 'melbourne', name: 'Melbourne',   nameEn: 'Melbourne',   lat: -37.81, lng: 144.96,  active: false },
  { id: 'singapore', name: 'Singapore',   nameEn: 'Singapore',   lat: 1.35,   lng: 103.82,  active: false },
  { id: 'shanghai',  name: 'Shanghai',    nameEn: 'Shanghai',    lat: 31.23,  lng: 121.47,  active: false },
  { id: 'beijing',   name: 'Beijing',     nameEn: 'Beijing',     lat: 39.91,  lng: 116.39,  active: false },
  { id: 'paris',     name: 'Paris',       nameEn: 'Paris',       lat: 48.85,  lng: 2.35,    active: false },
  { id: 'berlin',    name: 'Berlin',      nameEn: 'Berlin',      lat: 52.52,  lng: 13.40,   active: false },
  { id: 'amsterdam', name: 'Amsterdam',   nameEn: 'Amsterdam',   lat: 52.37,  lng: 4.90,    active: false },
  { id: 'zurich',    name: 'Zürich',      nameEn: 'Zürich',      lat: 47.38,  lng: 8.54,    active: false },
  { id: 'dubai',     name: 'Dubai',       nameEn: 'Dubai',       lat: 25.20,  lng: 55.27,   active: false },
  { id: 'seoul',     name: 'Seoul',       nameEn: 'Seoul',       lat: 37.57,  lng: 126.98,  active: false },
  { id: 'hongkong',  name: 'Hong Kong',   nameEn: 'Hong Kong',   lat: 22.32,  lng: 114.16,  active: false },
  { id: 'taipei',    name: 'Taipei',      nameEn: 'Taipei',      lat: 25.05,  lng: 121.53,  active: false },
  { id: 'los-angeles',  name: 'Los Angeles',   nameEn: 'Los Angeles',   lat: 34.05,  lng: -118.24, active: true,  country: 'US', score: 62, tai: 32, eoi: 88, eqi: 68, hpiYears: 10.0, rpi: 34.0, labelDx:  0, labelDy:  24, labelAlign: 'center' },
  { id: 'chicago',     name: 'Chicago',       nameEn: 'Chicago',       lat: 41.88,  lng: -87.63,  active: true,  country: 'US', score: 70, tai: 55, eoi: 82, eqi: 68, hpiYears: 5.2,  rpi: 28.0, labelDx:  8, labelDy: -20, labelAlign: 'left'   },
  { id: 'miami',       name: 'Miami',         nameEn: 'Miami',         lat: 25.77,  lng: -80.19,  active: true,  country: 'US', score: 65, tai: 88, eoi: 72, eqi: 60, hpiYears: 7.2,  rpi: 34.0, labelDx:  8, labelDy:  24, labelAlign: 'left'   },
  { id: 'austin',      name: 'Austin',        nameEn: 'Austin',        lat: 30.27,  lng: -97.74,  active: true,  country: 'US', score: 74, tai: 88, eoi: 82, eqi: 72, hpiYears: 6.25, rpi: 26.0, labelDx:  8, labelDy: -20, labelAlign: 'left'   },
  { id: 'dallas',      name: 'Dallas',        nameEn: 'Dallas',        lat: 32.78,  lng: -96.80,  active: true,  country: 'US', score: 75, tai: 88, eoi: 80, eqi: 60, hpiYears: 5.0,  rpi: 24.0, labelDx: -8, labelDy:  24, labelAlign: 'right'  },
  { id: 'houston',     name: 'Houston',       nameEn: 'Houston',       lat: 29.76,  lng: -95.37,  active: true,  country: 'US', score: 72, tai: 88, eoi: 75, eqi: 52, hpiYears: 4.3,  rpi: 24.0, labelDx:  8, labelDy:  24, labelAlign: 'left'   },
  { id: 'atlanta',     name: 'Atlanta',       nameEn: 'Atlanta',       lat: 33.75,  lng: -84.39,  active: true,  country: 'US', score: 70, tai: 65, eoi: 78, eqi: 72, hpiYears: 4.9,  rpi: 28.0, labelDx:  8, labelDy: -20, labelAlign: 'left'   },
  { id: 'nashville',   name: 'Nashville',     nameEn: 'Nashville',     lat: 36.17,  lng: -86.78,  active: true,  country: 'US', score: 70, tai: 90, eoi: 68, eqi: 72, hpiYears: 6.5,  rpi: 28.0, labelDx: -8, labelDy: -20, labelAlign: 'right'  },
  { id: 'denver',      name: 'Denver',        nameEn: 'Denver',        lat: 39.74,  lng: -104.98, active: true,  country: 'US', score: 72, tai: 75, eoi: 72, eqi: 85, hpiYears: 7.0,  rpi: 28.0, labelDx:  8, labelDy: -20, labelAlign: 'left'   },
  { id: 'phoenix',     name: 'Phoenix',       nameEn: 'Phoenix',       lat: 33.45,  lng: -112.07, active: true,  country: 'US', score: 68, tai: 80, eoi: 70, eqi: 55, hpiYears: 5.8,  rpi: 28.0, labelDx: -8, labelDy:  24, labelAlign: 'right'  },
  { id: 'washington-dc', name: 'Washington DC', nameEn: 'Washington DC', lat: 38.91, lng: -77.04, active: true,  country: 'US', score: 68, tai: 48, eoi: 85, eqi: 72, hpiYears: 6.1,  rpi: 34.0, labelDx: 10, labelDy:  24, labelAlign: 'left', labelText: 'DC'   },
  { id: 'auckland',  name: 'Auckland',    nameEn: 'Auckland',    lat: -36.85, lng: 174.76,  active: false },
  { id: 'dublin',    name: 'Dublin',      nameEn: 'Dublin',      lat: 53.34,  lng: -6.27,   active: false },
  { id: 'stockholm', name: 'Stockholm',   nameEn: 'Stockholm',   lat: 59.33,  lng: 18.07,   active: false },
  { id: 'nairobi',   name: 'Nairobi',     nameEn: 'Nairobi',     lat: -1.29,  lng: 36.82,   active: false },
  { id: 'mexico',    name: 'Mexico City', nameEn: 'Mexico City', lat: 19.43,  lng: -99.13,  active: false },
  { id: 'saopaulo',  name: 'São Paulo',   nameEn: 'São Paulo',   lat: -23.55, lng: -46.63,  active: false },
]

// ── Bi-weekly rotation helper ─────────────────────────────────────────────────
// Changes every 14 days automatically. No manual work needed.
// To force a specific set: override BIWEEK_OFFSET (0 = set A, 1 = set B)
const BIWEEK_MS = 14 * 24 * 60 * 60 * 1000
function getBiweeklySet<T>(pool: T[], size: number): T[] {
  const biweek = Math.floor(Date.now() / BIWEEK_MS)
  const numSets = Math.floor(pool.length / size)
  const setIndex = biweek % numSets
  return pool.slice(setIndex * size, setIndex * size + size)
}

// ── City Insights pool (6 items → 2 sets of 3, rotates every 2 weeks) ────────
const INSIGHTS_POOL = [
  // ── Set A ────────────────────────────────────────────────────────────────────
  {
    id: 1,
    tag: 'Housing',
    tagColor: '#EF4444',
    stat: '3.3x',
    title: 'Electricians buy homes 3.3x faster in Calgary than Vancouver',
    detail: 'Calgary: 3.9 income years vs Vancouver: 13.0 income years (2BR condo)',
    href: '/compare?cities=calgary,vancouver&occupation=electrician',
  },
  {
    id: 2,
    tag: 'Tax',
    tagColor: '#10B981',
    stat: '$22K',
    title: 'Engineers save $22K/yr in taxes by moving to Alberta',
    detail: 'At $120K salary, Alberta has no PST and only 5% GST — the lowest tax burden in Canada',
    href: '/city/calgary',
  },
  {
    id: 3,
    tag: 'Housing',
    tagColor: '#F59E0B',
    stat: '#2',
    title: 'Toronto software engineers face the 2nd highest housing pressure in Canada',
    detail: 'Highest salaries nationally, but price-to-income ratio second only to Vancouver',
    href: '/city/toronto',
  },
  // ── Set B ────────────────────────────────────────────────────────────────────
  {
    id: 4,
    tag: 'Housing',
    tagColor: '#EF4444',
    stat: '2.8x',
    title: 'Nurses reach homeownership 2.8x faster in Calgary than Vancouver',
    detail: 'Calgary: 4.5 income years vs Vancouver: 12.8 income years (2BR condo)',
    href: '/compare?cities=calgary,vancouver&occupation=nurse',
  },
  {
    id: 5,
    tag: 'Affordability',
    tagColor: '#10B981',
    stat: '2×',
    title: 'Ottawa teachers achieve homeownership twice as fast as Vancouver teachers',
    detail: 'Ottawa: 7.0 income years vs Vancouver: 14.0 income years — same profession, very different outcomes',
    href: '/compare?cities=ottawa,vancouver&occupation=teacher',
  },
  {
    id: 6,
    tag: 'Value',
    tagColor: '#8B5CF6',
    stat: '5.2 yrs',
    title: 'Montréal offers tech workers Canada\'s best salary-to-housing balance',
    detail: 'Software engineers reach homeownership in 5.2 income years — lower than Toronto (9.2) and Vancouver (9.5)',
    href: '/city/montreal',
  },
]

// ── Popular Comparisons pool (6 items → 2 sets of 3, rotates every 2 weeks) ──
const HOT_COMPARISONS_POOL = [
  // ── Set A ────────────────────────────────────────────────────────────────────
  {
    occupation: 'Electrician',
    cityA: { name: 'Vancouver', id: 'vancouver', years: 13.0, color: '#EF4444' },
    cityB: { name: 'Calgary',   id: 'calgary',   years: 3.9,  color: '#10B981' },
  },
  {
    occupation: 'Registered Nurse',
    cityA: { name: 'Toronto', id: 'toronto', years: 12.0, color: '#EF4444' },
    cityB: { name: 'Ottawa',  id: 'ottawa',  years: 6.5,  color: '#F59E0B' },
  },
  {
    occupation: 'Software Engineer',
    cityA: { name: 'Vancouver', id: 'vancouver', years: 9.5, color: '#F59E0B' },
    cityB: { name: 'Calgary',   id: 'calgary',   years: 5.2, color: '#10B981' },
  },
  // ── Set B ────────────────────────────────────────────────────────────────────
  {
    occupation: 'Secondary School Teacher',
    cityA: { name: 'Vancouver', id: 'vancouver', years: 14.0, color: '#EF4444' },
    cityB: { name: 'Calgary',   id: 'calgary',   years: 5.8,  color: '#10B981' },
  },
  {
    occupation: 'Pharmacist',
    cityA: { name: 'Toronto',  id: 'toronto',  years: 9.4, color: '#F59E0B' },
    cityB: { name: 'Montréal', id: 'montreal', years: 5.5, color: '#10B981' },
  },
  {
    occupation: 'Accountant',
    cityA: { name: 'Toronto', id: 'toronto', years: 13.8, color: '#EF4444' },
    cityB: { name: 'Ottawa',  id: 'ottawa',  years: 7.8,  color: '#F59E0B' },
  },
]

// Active sets (auto-rotated every 2 weeks)
const INSIGHTS      = getBiweeklySet(INSIGHTS_POOL, 3)
const HOT_COMPARISONS = getBiweeklySet(HOT_COMPARISONS_POOL, 3)

// ── Occupations for hero selector ────────────────────────────────────────────
const OCCUPATIONS = [
  // Healthcare
  { id: 'nurse',            name: 'Registered Nurse' },
  { id: 'doctor',           name: 'Family Physician' },
  { id: 'pharmacist',       name: 'Pharmacist' },
  { id: 'dentist',          name: 'Dentist' },
  { id: 'social_worker',    name: 'Social Worker' },
  // Tech
  { id: 'software_eng',     name: 'Software Engineer' },
  { id: 'data_analyst',     name: 'Data Analyst' },
  { id: 'it_support',       name: 'IT Support' },
  // Trades
  { id: 'electrician',      name: 'Electrician' },
  { id: 'plumber',          name: 'Plumber' },
  { id: 'carpenter',        name: 'Carpenter' },
  { id: 'welder',           name: 'Welder' },
  { id: 'mechanic',         name: 'Auto Mechanic' },
  { id: 'construction_worker', name: 'Construction Worker' },
  // Professional
  { id: 'engineer',         name: 'Civil Engineer' },
  { id: 'lawyer',           name: 'Lawyer' },
  { id: 'accountant',       name: 'Accountant' },
  { id: 'financial_advisor',name: 'Financial Advisor' },
  { id: 'real_estate',      name: 'Real Estate Agent' },
  { id: 'marketing',        name: 'Marketing Specialist' },
  { id: 'hr',               name: 'HR Specialist' },
  // Public Service
  { id: 'teacher',          name: 'Secondary Teacher' },
  { id: 'firefighter',      name: 'Firefighter' },
  { id: 'police',           name: 'Police Officer' },
  // Transport & Logistics
  { id: 'truck_driver',     name: 'Truck Driver' },
  { id: 'pilot',            name: 'Commercial Pilot' },
  // Service
  { id: 'chef',             name: 'Chef' },
  { id: 'retail',           name: 'Retail Associate' },
  { id: 'security',         name: 'Security Guard' },
  { id: 'cleaner',          name: 'Cleaner' },
]

const ACTIVE_CITIES    = CITIES.filter(c => c.active)
const ACTIVE_CITIES_CA = CITIES.filter(c => c.active && c.country !== 'US')

// ── Video sources — place files in /public/videos/ ───────────────────────────
// Swap these paths for your own city footage (MP4, H.264 recommended)
const VIDEO_SRCS = [
  '/videos/hero-1.mp4',
  '/videos/hero-2.mp4',
  '/videos/hero-3.mp4',
]

export default function Home() {
  const router = useRouter()

  // ── Video cycling state ─────────────────────────────────────────────────────
  const videoRef              = useRef<HTMLVideoElement>(null)
  const [vidIdx,   setVidIdx]   = useState(0)
  const [isFading, setIsFading] = useState(false)

  // ── Hero selector state ─────────────────────────────────────────────────────
  const [heroOccupation, setHeroOccupation] = useState('')
  const [heroCity,       setHeroCity]       = useState('')

  const handleHeroGo = useCallback(() => {
    router.push(`/calculate?city=${heroCity}&occupation=${heroOccupation}`)
  }, [heroCity, heroOccupation, router])

  // ── Cycle to next video every 10 s with a cross-fade ───────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true)
      setTimeout(() => {
        setVidIdx(i => (i + 1) % VIDEO_SRCS.length)
        setIsFading(false)
      }, 800)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  // ── Select styles (shared) ─────────────────────────────────────────────────
  const selectStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px',
    color: 'white',
    padding: '10px 14px',
    width: '100%',
    fontSize: '14px',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23ffffff60' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: '36px',
    cursor: 'pointer',
  }

  return (
    <div style={{ background: '#04091a' }}>

      {/* ── SECTION 1: Video Hero ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ height: 'calc(100vh - 56px)' }}
      >
        {/* Fallback gradient background (visible when no video file is present) */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 25% 35%, rgba(79,142,247,0.18) 0%, transparent 55%), radial-gradient(ellipse at 75% 65%, rgba(20,184,166,0.12) 0%, transparent 50%), linear-gradient(160deg, #060c20 0%, #080f26 55%, #04091a 100%)',
        }} />

        {/* Background video — fades between clips every 10 s */}
        <video
          ref={videoRef}
          key={vidIdx}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: isFading ? 0 : 1,
            transition: 'opacity 0.8s ease',
          }}
        >
          <source src={VIDEO_SRCS[vidIdx]} type="video/mp4" />
        </video>

        {/* Dark overlay — keeps text legible over any footage */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(4,9,26,0.72) 0%, rgba(4,9,26,0.52) 45%, rgba(4,9,26,0.78) 100%)',
        }} />

        {/* Hero content — centred */}
        <div style={{
          position: 'relative', zIndex: 10,
          height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 24px',
        }}>
          <div style={{ width: '100%', maxWidth: '440px' }}>

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 mb-5 px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: 'rgba(79,142,247,0.15)', border: '1px solid rgba(79,142,247,0.3)', color: '#93C5FD' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#4F8EF7] animate-pulse" />
              27 Cities · Canada &amp; USA
            </div>

            {/* H1 */}
            <h1 className="text-4xl font-bold leading-snug mb-3" style={{ color: '#fff' }}>
              From data<br />
              to <span style={{ color: '#14B8A6' }}>belonging.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.65)' }}>
              City intelligence for your next chapter — built on career, tax, housing, and opportunity.
            </p>

            {/* Feature chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
              {[
                { icon: '🏠', label: 'Years to own' },
                { icon: '💰', label: 'Tax advantage' },
                { icon: '📊', label: 'Employment score' },
              ].map(({ icon, label }) => (
                <span key={label} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.13)',
                  borderRadius: 20, padding: '4px 10px',
                }}>
                  {icon} {label}
                </span>
              ))}
            </div>

            {/* Selectors */}
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>Your Occupation</label>
                <select
                  value={heroOccupation}
                  onChange={e => setHeroOccupation(e.target.value)}
                  style={selectStyle}
                >
                  <option value="" style={{ background: '#0d1f44', color: 'rgba(255,255,255,0.4)' }}>Select occupation...</option>
                  {OCCUPATIONS.map(o => (
                    <option key={o.id} value={o.id} style={{ background: '#0d1f44', color: 'white' }}>{o.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>City you&apos;re considering</label>
                <select
                  value={heroCity}
                  onChange={e => setHeroCity(e.target.value)}
                  style={selectStyle}
                >
                  <option value="" style={{ background: '#0d1f44', color: 'rgba(255,255,255,0.4)' }}>Select city...</option>
                  <optgroup label="🇨🇦 Canada" style={{ background: '#0d1f44' }}>
                    {ACTIVE_CITIES_CA.map(c => (
                      <option key={c.id} value={c.id} style={{ background: '#0d1f44', color: 'white' }}>{c.nameEn}</option>
                    ))}
                  </optgroup>
                  <optgroup label="🇺🇸 United States" style={{ background: '#0d1f44' }}>
                    {ACTIVE_CITIES.filter(c => c.country === 'US').map(c => (
                      <option key={c.id} value={c.id} style={{ background: '#0d1f44', color: 'white' }}>{c.nameEn}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            {/* CTA button */}
            <button
              onClick={handleHeroGo}
              disabled={!heroOccupation || !heroCity}
              className="w-full py-3 rounded-xl text-sm font-bold text-white transition-opacity active:opacity-75"
              style={{
                background: 'linear-gradient(135deg, #4F8EF7, #5B5CF0)',
                opacity: heroOccupation && heroCity ? 1 : 0.45,
                cursor: heroOccupation && heroCity ? 'pointer' : 'default',
              }}
            >
              {heroOccupation && heroCity ? 'View My City Fit Score →' : 'Select occupation & city above'}
            </button>

            {/* Quick links */}
            <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { href: '/ranking',   label: 'Rankings',  icon: '📊' },
                { href: '/compare',   label: 'Compare',   icon: '⚖️' },
                { href: '/calculate', label: 'Calculate', icon: '🧮' },
              ].map(link => (
                <a key={link.href} href={link.href} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.60)',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.13)',
                  borderRadius: 8, padding: '6px 12px',
                  textDecoration: 'none',
                }}>
                  {link.icon} {link.label}
                </a>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: City Pulse ────────────────────────────────────────── */}
      <MarketPulse compact />

      {/* ── SECTION: Start with Your Situation ───────────────────────────── */}
      <section style={{ background: '#04091a', padding: '56px 24px 16px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 rounded-full" style={{ background: '#14B8A6' }} />
            <h2 className="text-xl font-bold text-white">Start with your situation</h2>
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>Where are you in your journey?</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Card 1 — Moving to Canada */}
            <a href="/ranking"
              className="group block rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1"
              style={{ background: 'rgba(20,184,166,0.06)', border: '1px solid rgba(20,184,166,0.18)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black"
                  style={{ background: 'rgba(20,184,166,0.15)', color: '#14B8A6' }}>01</div>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#14B8A6' }}>New to Canada</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 leading-snug">Moving to Canada</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.48)' }}>
                Choosing where to land. Compare cities by career fit, housing affordability, and quality of life — before you commit.
              </p>
              <div className="flex items-center gap-1.5 text-xs font-semibold transition-all group-hover:gap-2.5"
                style={{ color: '#14B8A6' }}>
                Find your city <span>→</span>
              </div>
            </a>

            {/* Card 2 — Relocating within Canada */}
            <a href="/compare"
              className="group block rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1"
              style={{ background: 'rgba(79,142,247,0.06)', border: '1px solid rgba(79,142,247,0.18)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black"
                  style={{ background: 'rgba(79,142,247,0.15)', color: '#4F8EF7' }}>02</div>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#4F8EF7' }}>Already in Canada</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 leading-snug">Considering a Move</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.48)' }}>
                Already settled but wondering if another city offers more. See what changes — and what it costs — to make the switch.
              </p>
              <div className="flex items-center gap-1.5 text-xs font-semibold transition-all group-hover:gap-2.5"
                style={{ color: '#4F8EF7' }}>
                Compare cities <span>→</span>
              </div>
            </a>

            {/* Card 3 — Career & Income Planning */}
            <a href="/calculate"
              className="group block rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1"
              style={{ background: 'rgba(253,224,71,0.06)', border: '1px solid rgba(253,224,71,0.18)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black"
                  style={{ background: 'rgba(253,224,71,0.15)', color: '#FDE047' }}>03</div>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#FDE047' }}>Career Planning</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 leading-snug">Planning My Career Path</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.48)' }}>
                Where does your occupation lead furthest? Model your income, taxes, and path to homeownership across cities.
              </p>
              <div className="flex items-center gap-1.5 text-xs font-semibold transition-all group-hover:gap-2.5"
                style={{ color: '#FDE047' }}>
                Run the numbers <span>→</span>
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* ── SECTION: Situation Advisor ────────────────────────────────────── */}
      <section style={{ background: '#04091a', padding: '16px 24px 56px' }}>
        <SituationAdvisor />
      </section>

      {/* ── SECTION 3: City Insights ──────────────────────────────────────── */}
      <section style={{ background: '#070d1f', padding: '64px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          {/* Section header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 rounded-full" style={{ background: '#4F8EF7' }} />
            <h2 className="text-xl font-bold text-white">City Insights</h2>
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>Data-driven urban intelligence</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {INSIGHTS.map(ins => (
              <a key={ins.id} href={ins.href}
                className="group block rounded-2xl p-5 transition-all hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>

                {/* Tag */}
                <div className="inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ background: `${ins.tagColor}18`, color: ins.tagColor, border: `1px solid ${ins.tagColor}30` }}>
                  {ins.tag}
                </div>

                {/* Stat */}
                <div className="text-4xl font-black mb-2 font-mono" style={{ color: ins.tagColor }}>
                  {ins.stat}
                </div>

                {/* Title */}
                <p className="text-sm font-semibold mb-2 text-white leading-snug">{ins.title}</p>

                {/* Detail */}
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{ins.detail}</p>

                {/* Arrow */}
                <div className="mt-4 flex items-center gap-1 text-xs font-medium transition-all group-hover:gap-2"
                  style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Learn more <span>→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Popular Comparisons ───────────────────────────────── */}
      <section style={{ background: '#04091a', padding: '64px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          {/* Section header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-6 rounded-full" style={{ background: '#FDE047' }} />
            <h2 className="text-xl font-bold text-white">Popular Comparisons</h2>
          </div>
          <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.30)', paddingLeft: '16px' }}>
            Your career shapes your city experience — measured in years to own a home
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HOT_COMPARISONS.map((cmp, i) => (
              <a key={i}
                href={`/compare?cities=${cmp.cityA.id},${cmp.cityB.id}`}
                className="group block rounded-2xl p-5 transition-all hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>

                {/* Occupation tag */}
                <div className="inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(253,224,71,0.12)', color: '#FDE047', border: '1px solid rgba(253,224,71,0.25)' }}>
                  {cmp.occupation}
                </div>

                {/* Cities comparison */}
                <div className="space-y-3 mb-4">
                  {[cmp.cityA, cmp.cityB].map(city => (
                    <div key={city.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: city.color }} />
                        <span className="text-sm font-medium text-white">{city.name}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black font-mono" style={{ color: city.color }}>{city.years}</span>
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>yrs income</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Diff bar */}
                <div className="relative h-1.5 rounded-full mb-3" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div className="absolute left-0 top-0 h-full rounded-full" style={{
                    width: `${(cmp.cityB.years / cmp.cityA.years) * 100}%`,
                    background: `linear-gradient(to right, ${cmp.cityB.color}, ${cmp.cityA.color})`,
                  }} />
                </div>

                <div className="text-xs group-hover:opacity-80" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {cmp.cityA.name} takes <strong style={{ color: 'rgba(255,255,255,0.6)' }}>{(cmp.cityA.years / cmp.cityB.years).toFixed(1)}x</strong> longer than {cmp.cityB.name}
                </div>

                <div className="mt-3 flex items-center gap-1 text-xs font-medium transition-all group-hover:gap-2"
                  style={{ color: 'rgba(255,255,255,0.3)' }}>
                  View full comparison <span>→</span>
                </div>
              </a>
            ))}
          </div>

          {/* CTA row */}
          <div className="mt-8 flex justify-center">
            <a href="/ranking"
              className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
              style={{ background: 'rgba(79,142,247,0.12)', border: '1px solid rgba(79,142,247,0.3)', color: '#93C5FD' }}>
              View full rankings →
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Reports ───────────────────────────────────────────── */}
      <section style={{ background: '#04091a', padding: '64px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="flex items-center gap-3 mb-8" style={{ justifyContent: 'space-between' }}>
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full" style={{ background: '#14B8A6' }} />
              <h2 className="text-xl font-bold text-white">Published Reports</h2>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>Lakive Research</span>
            </div>
            <a href="/reports" style={{ padding: '7px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              All reports →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Canada Cities */}
            <a href="/reports/canada-cities-on-the-rise-2026"
              className="group block rounded-2xl p-5 transition-all hover:-translate-y-0.5"
              style={{ textDecoration: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.25)' }}>
                National Report
              </div>
              <div className="text-sm font-semibold mb-2 text-white leading-snug">
                Canada&apos;s Cities on the Rise 2026
              </div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.50)' }}>
                5 cities · 20 occupations · Beyond job growth: where can you actually build a life?
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <span className="text-xs font-semibold" style={{ color: '#EF4444' }}>Read report →</span>
                <a href="/reports/pdf/Lakive_Canada_Cities_on_the_Rise_2026.pdf" download onClick={e => e.stopPropagation()}
                  className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.30)', textDecoration: 'none' }}>↓ PDF</a>
              </div>
            </a>

            {/* Vancouver */}
            <a href="/reports/vancouver-livability-worker-affordability-2026"
              className="group block rounded-2xl p-5 transition-all hover:-translate-y-0.5"
              style={{ textDecoration: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(20,184,166,0.12)', color: '#14B8A6', border: '1px solid rgba(20,184,166,0.25)' }}>
                Issue Brief
              </div>
              <div className="text-sm font-semibold mb-2 text-white leading-snug">
                Vancouver: Top-10 Livable — But Can Workers Afford to Stay?
              </div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.50)' }}>
                When the EIU ranks Vancouver #9 in the world, what does that mean for a nurse on $95K?
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <span className="text-xs font-semibold" style={{ color: '#4F8EF7' }}>Read report →</span>
                <a href="/reports/pdf/Lakive_Vancouver_Worker_Affordability_Issue_Brief_H1_2026.pdf" download onClick={e => e.stopPropagation()}
                  className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.30)', textDecoration: 'none' }}>↓ PDF</a>
              </div>
            </a>

            {/* Newsletter CTA card */}
            <a href="/newsletter"
              className="group block rounded-2xl p-5 transition-all hover:-translate-y-0.5"
              style={{ textDecoration: 'none', background: 'rgba(79,142,247,0.06)', border: '1px solid rgba(79,142,247,0.18)' }}>
              <div className="inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(79,142,247,0.12)', color: '#93C5FD', border: '1px solid rgba(79,142,247,0.25)' }}>
                Coming Next
              </div>
              <div className="text-sm font-semibold mb-2 text-white leading-snug">
                More reports in Q3 & Q4 2026
              </div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.50)' }}>
                Newcomer&apos;s Guide, Remote Worker Arbitrage, Calgary&apos;s Tax Advantage — subscribe to get notified.
              </p>
              <div className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
                style={{ color: '#93C5FD' }}>
                Subscribe free →
              </div>
            </a>
          </div>
        </div>
      </section>


    </div>
  )
}
