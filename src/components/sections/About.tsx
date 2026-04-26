'use client'
import { useEffect, useRef } from 'react'

const facts = [
  { icon: '🎓', label: 'B.Sc. Software Engineering', sub: 'Braude College — 2025' },
  { icon: '📍', label: 'North Israel', sub: 'Remote & relocation open' },
  { icon: '💼', label: 'Freelance Engineer', sub: '2025 — Present' },
  { icon: '🎯', label: 'Backend & Systems', sub: 'Full-Stack considered' },
  { icon: '⚙️', label: 'Node.js · Python', sub: 'Docker · WebSockets' },
]

const focusAreas = [
  'Concurrent Systems',
  'Real-Time APIs',
  'Event-Driven Architecture',
  'Data Pipelines (ETL)',
]

const stats = [
  { num: '2', label: 'Production systems', sub: 'owned end-to-end' },
  { num: '3+', label: 'Clients delivered to', sub: 'real businesses' },
  { num: 'Daily', label: 'Systems in use', sub: 'by real users' },
]

export default function About() {
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
    <section id="about" style={{ padding: '80px 0', position: 'relative' }}>
      <div ref={ref} className="fade-up" style={{ width: '90%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Headline */}
        <div style={{ paddingBottom: 8 }}>
          <p className="section-label">About</p>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 36px)',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginTop: 8,
          }}>
            Backend Engineer —{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-muted))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Real-Time Systems & Scalable Infrastructure
            </span>
          </h2>
        </div>

        {/* Three column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '12% 66% 12%',
          gap: '0 5%',
          alignItems: 'stretch',
        }} className="about-main-grid">

          {/* Left — Focus Areas */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid rgba(88,166,255,0.18)',
            borderRadius: 14,
            padding: 10,
            gap: 8,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            background: 'rgba(88,166,255,0.04)',
          }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', padding: '2px 6px' }}>
              Focus Areas
            </p>
            {focusAreas.map(area => (
              <div key={area} className="about-card" style={{ padding: '10px 12px', flex: 1, display: 'flex', alignItems: 'center' }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', lineHeight: 1.35 }}>{area}</p>
              </div>
            ))}
          </div>

          {/* Center — story */}
          <div className="about-card" style={{ padding: '28px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18 }}>
            {[
              "I'm a backend software engineer focused on building and owning production systems end-to-end — from architecture and API design to deployment, real-time infrastructure, and long-term reliability.",
              "I've independently delivered and maintained multiple systems currently used by real businesses, handling everything from requirements and system design to implementation, deployment, and ongoing iteration.",
              "My work centers on solving backend challenges — concurrent systems, real-time data flows, event-driven architectures, and the infrastructure decisions required to keep systems stable under real usage.",
            ].map((text, i) => (
              <p key={i} style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.8 }}>{text}</p>
            ))}
          </div>

          {/* Right — Stats */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid rgba(88,166,255,0.18)',
            borderRadius: 14,
            padding: 10,
            gap: 8,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            background: 'rgba(88,166,255,0.04)',
          }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', padding: '2px 6px' }}>
              Stats
            </p>
            {stats.map(s => (
              <div key={s.num} className="about-card" style={{ padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{
                  fontSize: 'clamp(22px, 2.5vw, 32px)',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: 4,
                }}>{s.num}</p>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{s.label}</p>
                <p style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>{s.sub}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Facts row — bottom */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 10,
        }} className="facts-grid">
          {facts.map(f => (
            <div key={f.label} className="about-card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{f.icon}</span>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, marginBottom: 2 }}>{f.label}</p>
                <p style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.3 }}>{f.sub}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}