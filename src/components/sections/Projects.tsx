'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { personalProjects } from '@/data/projects'

export default function Projects() {
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
    <section id="projects" style={{ padding: '80px 0', position: 'relative' }}>
      <div ref={ref} className="fade-up" style={{ width: '90%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Header */}
        <div>
          <p className="section-label">Personal Projects</p>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 36px)',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginTop: 8,
          }}>
            Built to go{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-muted))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              deeper
            </span>
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text2)', marginTop: 10, lineHeight: 1.6 }}>
            Engineering projects built to explore systems thinking, infrastructure, and machine learning.
          </p>
        </div>

        {/* Cards — 2 columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
        }} className="projects-grid">
          {personalProjects.map(p => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="about-card"
                style={{
                  padding: '28px 30px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
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
                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 18 }}>
                  <span style={{
                    fontSize: 10, color: 'var(--text3)',
                    fontFamily: 'monospace',
                    padding: '3px 8px',
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    background: 'rgba(88,166,255,0.05)',
                  }}>
                    Personal
                  </span>
                </div>

                {/* Title + subtitle */}
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: 'var(--text)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.25,
                  marginBottom: 6,
                }}>{p.title}</h3>
                {p.subtitle && (
                  <p style={{ fontSize: 12, color: 'var(--accent)', marginBottom: 16, fontWeight: 500 }}>{p.subtitle}</p>
                )}

                {/* Short desc */}
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.75, flex: 1, marginBottom: 20 }}>
                  {p.shortDesc}
                </p>

                {/* What was built — preview first 2 items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                  {p.built.slice(0, 2).map((b, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      padding: '8px 12px',
                      background: 'rgba(88,166,255,0.04)',
                      border: '1px solid rgba(88,166,255,0.1)',
                      borderRadius: 8,
                    }}>
                      <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0, fontSize: 11, marginTop: 1 }}>→</span>
                      <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{b}</p>
                    </div>
                  ))}
                  {p.built.length > 2 && (
                    <p style={{ fontSize: 11, color: 'var(--text3)', paddingLeft: 4 }}>
                      +{p.built.length - 2} more in details
                    </p>
                  )}
                </div>

                {/* Stack pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                  {p.stack.slice(0, 6).map(s => (
                    <span key={s} className="stack-pill">{s}</span>
                  ))}
                  {p.stack.length > 6 && (
                    <span className="stack-pill" style={{ color: 'var(--accent)', borderColor: 'var(--accent-border)', background: 'var(--accent-light)' }}>
                      +{p.stack.length - 6}
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