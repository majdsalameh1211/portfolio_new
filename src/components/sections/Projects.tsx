'use client'
import { useEffect, useRef, useState } from 'react'
import { personalProjects } from '@/data/projects'
import ProjectModal from '@/components/ui/ProjectModal'
import type { Project } from '@/data/projects'

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<Project | null>(null)

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

        {/* Cards — 2 columns, wider */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
        }} className="projects-grid">
          {personalProjects.map(p => (
            <div
              key={p.slug}
              className="about-card"
              onClick={() => setActive(p)}
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
              {/* Top row — type chip only, no status badge */}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {p.githubUrl && p.githubUrl !== '#' && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ color: 'var(--text3)', display: 'flex', alignItems: 'center' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
                    </a>
                  )}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  )
}