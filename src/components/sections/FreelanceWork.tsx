'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { freelanceProjects } from '@/data/projects'

export default function FreelanceWork() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="freelance" style={{ padding: '80px 0', position: 'relative' }}>
      <div ref={ref} className="fade-up" style={{ width: '90%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Header */}
        <div>
          <p className="section-label">Freelance Work</p>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 36px)',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginTop: 8,
          }}>
            Delivered to real clients —{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-muted))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              actively in production
            </span>
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text2)', marginTop: 10, lineHeight: 1.6 }}>
            Paid client work — full lifecycle ownership from requirements to deployment. No code shown to respect client confidentiality.
          </p>
        </div>

        {/* Project cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }} className="freelance-grid">
          {freelanceProjects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="about-card"
                style={{
                  padding: '24px 26px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-4px)'
                  el.style.borderColor = 'rgba(88,166,255,0.35)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(0)'
                  el.style.borderColor = 'rgba(88,166,255,0.18)'
                }}
              >
                {/* Top row — badge + type */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  {p.status === 'live'
                    ? <span className="badge-live">Live</span>
                    : <span className="badge-complete">Delivered</span>
                  }
                  <span style={{
                    fontSize: 10, color: 'var(--text3)',
                    fontFamily: 'var(--font-jetbrains), monospace',
                    padding: '3px 8px',
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    background: 'rgba(88,166,255,0.05)',
                  }}>
                    Client work
                  </span>
                </div>

                {/* Title + subtitle */}
                <h3 style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: 'var(--text)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.25,
                  marginBottom: 6,
                }}>{p.title}</h3>
                {p.subtitle && (
                  <p style={{ fontSize: 12, color: 'var(--accent)', marginBottom: 14, fontWeight: 500 }}>{p.subtitle}</p>
                )}

                {/* Short desc */}
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, flex: 1, marginBottom: 18 }}>
                  {p.shortDesc}
                </p>

                {/* Stack pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                  {p.stack.slice(0, 5).map(s => (
                    <span key={s} className="stack-pill">{s}</span>
                  ))}
                  {p.stack.length > 5 && (
                    <span className="stack-pill" style={{ color: 'var(--accent)', borderColor: 'var(--accent-border)', background: 'var(--accent-light)' }}>
                      +{p.stack.length - 5}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  paddingTop: 14,
                  borderTop: '1px solid rgba(88,166,255,0.1)',
                }}>
                  <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>
                    View details
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}