import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/s/',           // share short-links — dynamic, low value
          '/subscribe',    // subscription flow
          '/share',
          '/results',      // client-side redirect to /calculate — no content
          '/prices/submit', // form submission page — no SEO value
        ],
      },
    ],
    sitemap: 'https://lakive.com/sitemap.xml',
    host: 'https://lakive.com',
  }
}
