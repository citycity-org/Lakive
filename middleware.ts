import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Pages where URL query params represent UI state, not unique content.
// Google should not index parameterised variants like /ranking?occupation=nurse&city=toronto
// or /?occupation=pharmacist&city=montreal — those are just pre-filled filters,
// not unique pages. '/' is included because the homepage accepts occupation/city params
// from internal share links.
const UI_STATE_PATHS = ['/', '/ranking', '/calculate', '/compare', '/city', '/pulse', '/prices', '/guide']

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const host = request.headers.get('host') ?? ''

  // ── www → non-www canonical redirect ────────────────────────────────────────
  // next.config.ts redirects with has:[{type:'host'}] are unreliable on Vercel
  // when www is configured as a separate domain alias. Middleware runs earlier
  // and is guaranteed to fire regardless of how Vercel routes the request.
  if (host.startsWith('www.')) {
    const canonicalHost = host.slice(4) // strip 'www.'
    const url = request.nextUrl.clone()
    url.host = canonicalHost
    // Keep protocol from request (Vercel always HTTPS in prod)
    url.protocol = 'https:'
    return NextResponse.redirect(url, { status: 301 })
  }

  // ── noindex for UI-state query-param variants ────────────────────────────────
  // These pages render identical structure regardless of params — the params
  // just pre-fill filters. We don't want /calculate?occupation=nurse indexed
  // as a separate page from /calculate.
  const isUiStatePage = UI_STATE_PATHS.some(p =>
    pathname === p || pathname.startsWith(p + '/')
  )

  if (isUiStatePage && searchParams.toString()) {
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}
