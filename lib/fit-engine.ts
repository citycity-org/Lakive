// ── Lakive Fit Engine ─────────────────────────────────────────────────────────
// Single Source of Truth for ALL housing-affordability and occupation-fit
// computations on the site.
//
// Every hpiYears, rpi, and composite score shown on any page is derived here.
// Pages must NEVER hardcode these values — always call computeOccFit() or
// buildCityMatrix() so that updating a single data field in _data.ts
// propagates correctly to all surfaces simultaneously.
//
// Data authority:  app/guide/_data.ts  (CITIES, OCCUPATIONS)
// Manual residual: EOI_MATRIX below    (qualitative job-demand per city/occ)
//
// ─────────────────────────────────────────────────────────────────────────────

import { calcHpiYears, calcRpi, hpiLevel, rpiLevel, calcLevel, LEVEL_META } from '@/app/guide/_data'

// ── Occupation ID bridge ──────────────────────────────────────────────────────
// Maps city-page short IDs  →  guide-page slug keys (OCCUPATIONS record)
export const OCC_SLUG: Record<string, string> = {
  electrician:  'electrician',
  software_eng: 'software-engineer',
  nurse:        'registered-nurse',
  teacher:      'secondary-teacher',
  truck_driver: 'truck-driver',
  accountant:   'accountant',
  police:       'police-officer',
  retail:       'retail-associate',
}

// ── Employment Opportunity Index ──────────────────────────────────────────────
// The one dataset that cannot be formula-derived from salary/rent/price.
// Reflects local labour-market demand alignment between the occupation and
// the city's dominant economic sectors.
//
//   High  — occupation is a primary demand driver in this city; clear pathways
//   Mid   — adequate but not a structural strength of the local economy
//   Low   — limited local demand; specialist roles, commuting, or remote work
//
export type Eoi = 'High' | 'Mid' | 'Low'

export const EOI_MATRIX: Record<string, Partial<Record<string, Eoi>>> = {
  // ── Canada ──────────────────────────────────────────────────────────────────
  vancouver:           { electrician:'High', software_eng:'High', nurse:'Mid',  teacher:'Mid',  truck_driver:'Mid',  accountant:'Mid',  police:'High', retail:'Mid' },
  toronto:             { electrician:'High', software_eng:'High', nurse:'High', teacher:'High', truck_driver:'Mid',  accountant:'High', police:'High', retail:'Mid' },
  calgary:             { electrician:'High', software_eng:'Mid',  nurse:'High', teacher:'Mid',  truck_driver:'High', accountant:'Mid',  police:'High', retail:'Mid' },
  montreal:            { electrician:'Mid',  software_eng:'Mid',  nurse:'Mid',  teacher:'Mid',  truck_driver:'Mid',  accountant:'Mid',  police:'Mid',  retail:'Low' },
  ottawa:              { electrician:'Mid',  software_eng:'High', nurse:'High', teacher:'High', truck_driver:'Mid',  accountant:'Mid',  police:'High', retail:'Low' },
  edmonton:            { electrician:'High', software_eng:'Mid',  nurse:'High', teacher:'Mid',  truck_driver:'High', accountant:'Mid',  police:'High', retail:'Mid' },
  winnipeg:            { electrician:'Mid',  software_eng:'Mid',  nurse:'High', teacher:'Mid',  truck_driver:'High', accountant:'Mid',  police:'Mid',  retail:'Low' },
  halifax:             { electrician:'Mid',  software_eng:'Mid',  nurse:'High', teacher:'Mid',  truck_driver:'Mid',  accountant:'Mid',  police:'Mid',  retail:'Low' },
  'quebec-city':       { electrician:'Mid',  software_eng:'Mid',  nurse:'Mid',  teacher:'Mid',  truck_driver:'Mid',  accountant:'Mid',  police:'Mid',  retail:'Low' },
  hamilton:            { electrician:'High', software_eng:'Mid',  nurse:'High', teacher:'Mid',  truck_driver:'High', accountant:'Mid',  police:'High', retail:'Low' },
  'kitchener-waterloo':{ electrician:'High', software_eng:'High', nurse:'High', teacher:'Mid',  truck_driver:'Mid',  accountant:'High', police:'Mid',  retail:'Low' },
  victoria:            { electrician:'Mid',  software_eng:'Mid',  nurse:'Mid',  teacher:'Mid',  truck_driver:'Low',  accountant:'Mid',  police:'Mid',  retail:'Low' },
  // ── United States ────────────────────────────────────────────────────────────
  seattle:             { electrician:'High', software_eng:'High', nurse:'High', teacher:'Mid',  truck_driver:'High', accountant:'High', police:'High', retail:'Mid' },
  'san-francisco':     { electrician:'High', software_eng:'High', nurse:'High', teacher:'Mid',  truck_driver:'Mid',  accountant:'High', police:'Mid',  retail:'Low' },
  'new-york':          { electrician:'High', software_eng:'High', nurse:'High', teacher:'High', truck_driver:'Mid',  accountant:'High', police:'High', retail:'Mid' },
  boston:              { electrician:'High', software_eng:'High', nurse:'High', teacher:'High', truck_driver:'Mid',  accountant:'High', police:'High', retail:'Mid' },
  austin:              { electrician:'High', software_eng:'High', nurse:'High', teacher:'Mid',  truck_driver:'Mid',  accountant:'Mid',  police:'High', retail:'Mid' },
  chicago:             { electrician:'High', software_eng:'High', nurse:'High', teacher:'High', truck_driver:'Mid',  accountant:'High', police:'Mid',  retail:'Low' },
  'los-angeles':       { electrician:'High', software_eng:'High', nurse:'High', teacher:'Mid',  truck_driver:'Mid',  accountant:'High', police:'Mid',  retail:'Low' },
  denver:              { electrician:'High', software_eng:'High', nurse:'High', teacher:'Mid',  truck_driver:'Mid',  accountant:'Mid',  police:'Mid',  retail:'Low' },
  miami:               { electrician:'High', software_eng:'High', nurse:'High', teacher:'Mid',  truck_driver:'Mid',  accountant:'Mid',  police:'Mid',  retail:'Low' },
  dallas:              { electrician:'High', software_eng:'High', nurse:'High', teacher:'Mid',  truck_driver:'High', accountant:'High', police:'High', retail:'Mid' },
  atlanta:             { electrician:'High', software_eng:'High', nurse:'High', teacher:'Mid',  truck_driver:'Mid',  accountant:'High', police:'Mid',  retail:'Low' },
  phoenix:             { electrician:'High', software_eng:'High', nurse:'High', teacher:'Mid',  truck_driver:'Mid',  accountant:'Mid',  police:'Mid',  retail:'Low' },
  'washington-dc':     { electrician:'High', software_eng:'High', nurse:'High', teacher:'High', truck_driver:'Mid',  accountant:'High', police:'High', retail:'Mid' },
  houston:             { electrician:'High', software_eng:'High', nurse:'High', teacher:'Mid',  truck_driver:'High', accountant:'Mid',  police:'High', retail:'Mid' },
  nashville:           { electrician:'High', software_eng:'High', nurse:'High', teacher:'Mid',  truck_driver:'Mid',  accountant:'Mid',  police:'Mid',  retail:'Low' },
}

// ── EOI → numeric for composite score ────────────────────────────────────────
export function eoiNum(eoi: Eoi): number {
  return eoi === 'High' ? 78 : eoi === 'Mid' ? 62 : 45
}

// ── Core scoring formula (Model v4) ──────────────────────────────────────────
// Used by city page (per-occupation) and any scenario-adjustment calculator.
//
// eoiScore: pass eoiNum(fit.eoi)  for occupation-specific calculation
//           pass city.eoi         for city-level (scenario) calculation
//
// tai, hai, eqi, tci, psi: city-level indices from CITY_BASE (not occ-specific)
//
export function computeScore(
  hpiYears: number, rpi: number,
  tai: number, eoiScore: number, hai: number, eqi: number, tci: number, psi: number
): number {
  const hpiScore     = hpiYears < 6  ? 92
                     : hpiYears < 8  ? 82
                     : hpiYears < 10 ? 70
                     : hpiYears < 12 ? 58
                     : hpiYears < 16 ? 45 : 30
  const rpiScore     = rpi < 25 ? 90
                     : rpi < 30 ? 82
                     : rpi < 35 ? 72
                     : rpi < 40 ? 60
                     : rpi < 45 ? 48 : 35
  const housingScore = hpiScore * 0.55 + rpiScore * 0.45
  const cityScore    = eoiScore * 0.22 + tai * 0.20 + hai * 0.20
                     + eqi * 0.14 + tci * 0.12 + psi * 0.12
  return Math.max(10, Math.min(99, Math.round(housingScore * 0.52 + cityScore * 0.48)))
}

// ── Per-occupation fit entry ──────────────────────────────────────────────────
export type OccFit = { hpiYears: number; rpi: number; eoi: Eoi; score: number }

// City page passes its own CITY_BASE indices here.
export function computeOccFit(
  citySlug: string,
  occId: string,
  cityBase: { tai: number; hai: number; eqi: number; tci: number; psi: number },
): OccFit {
  const guideSlug = OCC_SLUG[occId] ?? occId
  const hpiYears  = calcHpiYears(guideSlug, citySlug)
  const rpi       = calcRpi(guideSlug, citySlug)
  const eoi: Eoi  = EOI_MATRIX[citySlug]?.[occId] ?? 'Mid'
  const score     = computeScore(hpiYears, rpi, cityBase.tai, eoiNum(eoi), cityBase.hai, cityBase.eqi, cityBase.tci, cityBase.psi)
  return { hpiYears, rpi, eoi, score }
}

// ── Full city matrix builder ──────────────────────────────────────────────────
// Drop-in replacement for the old static FIT_MATRIX[slug].
// Returns the same Record<occId, OccFit> shape — no hardcoded numbers.
const OCC_IDS = ['electrician', 'software_eng', 'nurse', 'teacher', 'truck_driver', 'accountant', 'police', 'retail']

export function buildCityMatrix(
  citySlug: string,
  cityBase: { tai: number; hai: number; eqi: number; tci: number; psi: number },
): Record<string, OccFit> {
  return Object.fromEntries(
    OCC_IDS.map(id => [id, computeOccFit(citySlug, id, cityBase)])
  )
}

// ── Re-exports from _data.ts ──────────────────────────────────────────────────
// Import these from fit-engine (not _data.ts directly) for consistent sourcing.
export { calcHpiYears, calcRpi, hpiLevel, rpiLevel, calcLevel, LEVEL_META }
