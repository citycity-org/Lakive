import type { NextConfig } from "next";

// ── HTTP Security Headers ──────────────────────────────────────────────────────
const securityHeaders = [
  // Force HTTPS for 2 years, include subdomains
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Prevent clickjacking — only allow same origin to iframe the site
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Prevent MIME type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Control referrer info sent to third parties
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Disable unused browser features
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  // Enable DNS prefetch for performance
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // Content Security Policy
  // - script-src: Next.js needs unsafe-eval in dev; cdn.jsdelivr.net for D3/TopoJSON
  // - connect-src: Supabase + Bank of Canada live API
  // - frame-ancestors: nobody can embed lakive.com in an iframe
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self'",
      "connect-src 'self' *.supabase.co https://www.bankofcanada.ca https://cdn.jsdelivr.net",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  async headers() {
    const rules = [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]

    // Block Vercel preview deployments from Google indexing.
    // VERCEL_ENV is 'production' on lakive.com, 'preview' on *.vercel.app branches.
    // Without this, each preview URL appears as a duplicate in Google Search Console.
    if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
      rules.push({
        source: '/(.*)',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      })
    }

    return rules
  },
}

export default nextConfig;
