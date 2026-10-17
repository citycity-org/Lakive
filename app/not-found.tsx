import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#04091A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: 400,
      }}>
        <div style={{
          fontSize: 72,
          fontWeight: 800,
          color: 'rgba(79,142,247,0.25)',
          letterSpacing: '-4px',
          lineHeight: 1,
          marginBottom: 16,
          fontFamily: 'monospace',
        }}>
          404
        </div>
        <h1 style={{
          fontSize: 22,
          fontWeight: 700,
          color: '#fff',
          marginBottom: 10,
        }}>
          Page not found
        </h1>
        <p style={{
          fontSize: 14,
          color: 'rgba(255,255,255,0.50)',
          lineHeight: 1.6,
          marginBottom: 28,
        }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '11px 24px',
            borderRadius: 10,
            background: 'linear-gradient(135deg,#4F8EF7,#5B5CF0)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
