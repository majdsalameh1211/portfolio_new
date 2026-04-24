'use client'
import { useEffect, useRef } from 'react'

const facts = [
  { icon: '🎓', label: 'B.Sc. Software Engineering', sub: 'Braude College, 2025' },
  { icon: '📍', label: 'Nazareth, Israel', sub: 'Open to remote & relocation' },
  { icon: '💼', label: 'Freelance since Sept 2025', sub: '3 clients · 2 live systems' },
  { icon: '🔍', label: 'Open to new roles', sub: 'Backend · Full-Stack · Systems' },
  { icon: '🏗️', label: 'Production-first mindset', sub: 'Real users, real constraints' },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" style={{ padding: '100px 24px', background: 'var(--surface)' }}>
      <div ref={ref} className="fade-up" style={{ maxWidth: 1100, margin: '0 auto' }}>

        <p className="section-label">About</p>
        <h2 className="section-title" style={{ marginBottom: 48 }}>Who I am</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48, alignItems: 'start' }}>

          {/* Paragraph */}
          <div>
            <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 20 }}>
              I'm a backend and full-stack software engineer who graduates with a B.Sc. in Software Engineering from Braude College in 2025. Since then I've been freelancing — building and shipping two full production systems that real clients use daily, and one from-scratch engineering project that I'm proud of.
            </p>
            <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 20 }}>
              My focus is backend architecture — REST APIs, real-time WebSocket systems, event-driven design, and the infrastructure decisions that make systems maintainable at scale. I care about the <em>why</em> behind architectural choices, not just the what.
            </p>
            <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.8 }}>
              I'm targeting backend, full-stack, and systems engineering roles at startups and mid-size companies where I can work on real problems, grow fast, and contribute from day one.
            </p>
          </div>

          {/* Quick facts card */}
          <div className="card" style={{ padding: '24px' }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: 20 }}>Quick facts</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {facts.map(f => (
                <div key={f.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{f.icon}</span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{f.label}</p>
                    <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
