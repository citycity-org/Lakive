// ── ChartAttribution — Tier 1 图表归因组件 ───────────────────────────────────
// Renders a compact, always-visible attribution footer below any major data
// display surface. When users screenshot a card or table, the attribution
// travels with the image automatically — no download or embed needed.
//
// Usage:
//   <ChartAttribution context="Electrician × Calgary · 2BR" country="CA" />
//
// Tier 2 (downloadable PNG) and Tier 3 (embeddable iframe) are future work.
// ─────────────────────────────────────────────────────────────────────────────

const DATA_MONTH = 'Oct 2026'

const SOURCES: Record<'CA' | 'US', string> = {
  CA: 'CMHC · CREA · StatCan · Job Bank',
  US: 'BLS · Zillow · CareerOneStop',
}

interface ChartAttributionProps {
  /** Short description of what is displayed, e.g. "Electrician × Calgary · 2BR" */
  context: string
  /** Drives which data sources are listed. Defaults to CA. */
  country?: 'CA' | 'US'
  /** Override the default margin-top (default 8px). */
  mt?: number
}

export function ChartAttribution({ context, country = 'CA', mt = 8 }: ChartAttributionProps) {
  return (
    <div style={{
      marginTop: mt,
      paddingTop: 7,
      borderTop: '1px solid rgba(255,255,255,0.07)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      flexWrap: 'wrap',
    }}>
      <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: 10, lineHeight: 1.5, flexShrink: 1 }}>
        Lakive City Intelligence&ensp;·&ensp;{context}&ensp;·&ensp;{DATA_MONTH}&ensp;·&ensp;Data: {SOURCES[country]}
      </span>
      <a
        href="/methodology"
        style={{ color: 'rgba(255,255,255,0.18)', fontSize: 10, textDecoration: 'none', flexShrink: 0, whiteSpace: 'nowrap' }}
      >
        lakive.com/methodology
      </a>
    </div>
  )
}
