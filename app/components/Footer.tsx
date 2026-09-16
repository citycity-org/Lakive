'use client'
import { LakiveLogo } from './LakiveLogo'

const SOCIALS = [
  {
    label: 'X',
    href: 'https://x.com/lakiveofficiaal',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.049 2.25H8.1l4.26 5.632 5.884-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/lakiveofficial',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/lakiveofficial',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Threads',
    href: 'https://www.threads.net/@lakiveofficial',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.822-2.047 1.674-1.615 1.631-3.543 1.487-4.623-.19-1.4-.86-2.088-1.793-2.512-.194 1.58-.72 2.886-1.588 3.87-1.05 1.2-2.53 1.83-4.298 1.83-1.358 0-2.578-.41-3.437-1.152-.966-.83-1.477-2.033-1.447-3.48.045-2.143 1.34-3.68 3.588-4.316.945-.267 2.011-.385 3.185-.352.386.01.765.039 1.135.083-.174-1.117-.577-1.957-1.22-2.524-.703-.622-1.695-.935-2.948-.928h-.02c-1.084.008-2.065.274-2.754.752-.637.443-1.016 1.05-1.097 1.766l-2.03-.36c.14-1.285.74-2.402 1.74-3.156.94-.71 2.138-1.104 3.445-1.138h.03c1.783 0 3.267.506 4.3 1.463 1.052.973 1.65 2.387 1.87 4.172.23-.02.46-.03.69-.032 2.13.027 3.74.882 4.685 2.47.88 1.483 1.068 3.398.54 5.404-.648 2.438-2.164 4.086-4.34 4.764-.89.275-1.86.414-2.9.422zm-1.107-5.888c.982 0 1.85-.327 2.437-.917.638-.644.977-1.581 1.016-2.807a13.68 13.68 0 00-1.183-.084c-.99-.026-1.888.068-2.67.293-1.17.333-1.84 1.001-1.866 1.88-.021.572.167 1.017.558 1.354.437.376 1.063.581 1.77.581h-.062z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@lakiveofficial',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    label: '小红书',
    href: 'https://www.xiaohongshu.com/user/profile/lakive_official',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 8.5h-3v7h-1.5v-7H9.5V7H17.5v1.5zM7 7h1.5v8.5H7V7z"/>
      </svg>
    ),
  },
]

const NAV = [
  {
    title: 'Product',
    links: [
      { label: 'Calculate Cost', href: '/calculate' },
      { label: 'Compare Cities', href: '/compare' },
      { label: 'City Rankings', href: '/ranking' },
      { label: 'Reports', href: '/reports' },
      { label: 'Newsletter', href: '/subscribe' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Lakive', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="lk-footer" style={{ background: '#070d1f', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '64px 32px 40px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>

        {/* Top row — 网格断点见 globals.css .lk-footer-grid */}
        <div className="lk-footer-grid">

          {/* Brand */}
          <div>
            <a href="/" style={{ display: 'inline-block', marginBottom: 20, textDecoration: 'none' }}>
              <LakiveLogo size={26} theme="dark" />
            </a>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.8, maxWidth: 280 }}>
              Find the city where your career, your family, and your life all fit.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, marginTop: 12, fontStyle: 'italic' }}>
              From Data to Belonging.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 34, height: 34, borderRadius: 8,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(20,184,166,0.15)'
                    e.currentTarget.style.color = '#14B8A6'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV.map(col => (
            <div key={col.title}>
              <div style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.02em',
                marginBottom: 20,
                paddingBottom: 12,
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}>
                {col.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map(link => (
                  <a key={link.href} href={link.href}
                    style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingTop: 28,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>
            © 2026 Lakive. All Rights Reserved.
          </span>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>
            Data: StatCan · CMHC · CREA · CRA · Job Bank · CIHI
          </span>
        </div>

      </div>
    </footer>
  )
}
