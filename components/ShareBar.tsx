'use client'
import { useState } from 'react'

interface ShareBarProps {
  url: string
  title: string
  lang?: 'en' | 'zh'
}

const TEAL = '#14B8A6'

export default function ShareBar({ url, title, lang = 'en' }: ShareBarProps) {
  const [copied, setCopied] = useState(false)

  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const links = [
    {
      label: 'X',
      href: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encoded}&via=lakiveofficiaal`,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.049 2.25H8.1l4.26 5.632 5.884-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'Threads',
      href: `https://www.threads.net/intent/post?text=${encodedTitle}%20${encoded}`,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.822-2.047 1.674-1.615 1.631-3.543 1.487-4.623-.19-1.4-.86-2.088-1.793-2.512-.194 1.58-.72 2.886-1.588 3.87-1.05 1.2-2.53 1.83-4.298 1.83-1.358 0-2.578-.41-3.437-1.152-.966-.83-1.477-2.033-1.447-3.48.045-2.143 1.34-3.68 3.588-4.316.945-.267 2.011-.385 3.185-.352.386.01.765.039 1.135.083-.174-1.117-.577-1.957-1.22-2.524-.703-.622-1.695-.935-2.948-.928h-.02c-1.084.008-2.065.274-2.754.752-.637.443-1.016 1.05-1.097 1.766l-2.03-.36c.14-1.285.74-2.402 1.74-3.156.94-.71 2.138-1.104 3.445-1.138h.03c1.783 0 3.267.506 4.3 1.463 1.052.973 1.65 2.387 1.87 4.172.23-.02.46-.03.69-.032 2.13.027 3.74.882 4.685 2.47.88 1.483 1.068 3.398.54 5.404-.648 2.438-2.164 4.086-4.34 4.764-.89.275-1.86.414-2.9.422zm-1.107-5.888c.982 0 1.85-.327 2.437-.917.638-.644.977-1.581 1.016-2.807a13.68 13.68 0 00-1.183-.084c-.99-.026-1.888.068-2.67.293-1.17.333-1.84 1.001-1.866 1.88-.021.572.167 1.017.558 1.354.437.376 1.063.581 1.77.581h-.062z" />
        </svg>
      ),
    },
  ]

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const label = lang === 'zh' ? '分享' : 'Share'
  const copyLabel = lang === 'zh' ? (copied ? '已复制！' : '复制链接') : (copied ? 'Copied!' : 'Copy link')

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
      padding: '16px 20px',
      background: '#fff',
      border: '1px solid #E5E7EB',
      borderRadius: 14,
      margin: '32px 0',
    }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0 }}>
        {label}
      </span>
      <div style={{ width: 1, height: 16, background: '#E5E7EB', flexShrink: 0 }} />

      {links.map(l => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${l.label}`}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 12px',
            borderRadius: 8,
            background: '#F3F4F6',
            color: '#374151',
            fontSize: 12,
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = `${TEAL}18`
            e.currentTarget.style.color = TEAL
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#F3F4F6'
            e.currentTarget.style.color = '#374151'
          }}
        >
          {l.icon}
          {l.label}
        </a>
      ))}

      <button
        onClick={handleCopy}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 12px',
          borderRadius: 8,
          background: copied ? `${TEAL}18` : '#F3F4F6',
          color: copied ? TEAL : '#374151',
          fontSize: 12,
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
          transition: 'background 0.15s, color 0.15s',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {copied
            ? <><polyline points="20 6 9 17 4 12" /></>
            : <><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></>
          }
        </svg>
        {copyLabel}
      </button>
    </div>
  )
}
