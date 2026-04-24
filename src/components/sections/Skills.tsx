'use client'
import { useEffect, useRef } from 'react'

const skillGroups = [
  {
    label: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express', 'NestJS', 'REST APIs', 'WebSockets', 'Socket.IO', 'Flask'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TanStack Query', 'Tailwind CSS'],
  },
  {
    label: 'Databases',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Supabase'],
  },
  {
    label: 'Cloud & DevOps',
    items: ['Docker', 'Railway', 'Vercel', 'GCP', 'Git', 'CI/CD'],
  },
  {
    label: 'AI & ML',
    items: ['PyTorch', 'TensorFlow', 'MediaPipe', 'OpenCV', 'pandas', 'NumPy'],
  },
]

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" style={{ padding: '100px 24px', background: 'var(--bg)' }}>
      <div ref={ref} className="fade-up" style={{ maxWidth: 1100, margin: '0 auto' }}>

        <p className="section-label">Skills</p>
        <h2 className="section-title">What I work with</h2>
        <p className="section-desc" style={{ marginBottom: 48 }}>
          Technologies I've used in real projects — not a checklist, but tools I've shipped with.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {skillGroups.map(group => (
            <div key={group.label} className="card" style={{ padding: '20px 22px' }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 14 }}>
                {group.label}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {group.items.map(item => (
                  <span key={item} className="stack-pill" style={{ fontSize: 12 }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
