import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Pages where URL query params represent UI state, not unique content.
// Google should not index parameterised variants like /ranking?occupation=nurse&city=toronto
// — those are identical in substance to /ranking, just with pre-filled filters.
const UI_STATE_PATHS = ['/ranking', '/calculate', '/compare', '/city', '/pulse', '/prices']

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

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
