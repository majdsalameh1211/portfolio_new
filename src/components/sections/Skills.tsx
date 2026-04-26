'use client'
import { useEffect, useRef } from 'react'

const skillGroups = [
  {
    label: 'Languages',
    icon: '{ }',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C'],
  },
  {
    label: 'Backend',
    icon: '⚙',
    items: ['Node.js', 'Express', 'REST APIs', 'WebSockets', 'Socket.IO', 'Microservices', 'Event-Driven Architecture'],
  },
  {
    label: 'Databases',
    icon: '◈',
    items: ['MongoDB', 'PostgreSQL'],
  },
  {
    label: 'Cloud & DevOps',
    icon: '☁',
    items: ['Docker', 'Railway', 'GCP', 'Git', 'CI/CD'],
  },
  {
    label: 'Data & Pipelines',
    icon: '⇄',
    items: ['pandas', 'NumPy', 'ETL'],
  },
  {
    label: 'Security',
    icon: '◉',
    items: ['JWT', 'RBAC', 'Rate Limiting'],
  },
  {
    label: 'Frontend',
    icon: '◻',
    items: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    label: 'AI & ML',
    icon: '∿',
    items: ['PyTorch', 'TensorFlow', 'MediaPipe', 'OpenCV'],
  },
]

export default function Skills() {
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
    <section id="skills" style={{ padding: '80px 0', position: 'relative' }}>
      <div ref={ref} className="fade-up" style={{ width: '90%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Header */}
        <div>
          <p className="section-label">Skills</p>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 36px)',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginTop: 8,
          }}>
            What I{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-muted))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              work with
            </span>
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text2)', marginTop: 10, lineHeight: 1.6 }}>
            Technologies I've shipped with in real projects — not a checklist.
          </p>
        </div>

        {/* Skills grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
        }} className="skills-grid">
          {skillGroups.map(group => (
            <div key={group.label} className="about-card" style={{ padding: '18px 20px' }}>

              {/* Label row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: 'var(--accent-light)',
                  border: '1px solid var(--accent-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, color: 'var(--accent)', fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {group.icon}
                </div>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)' }}>
                  {group.label}
                </p>
              </div>

              {/* Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {group.items.map(item => (
                  <span key={item} className="stack-pill">{item}</span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}