'use client'
import { useEffect, useRef, useState } from 'react'
import { freelanceProjects } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard'
import ProjectModal from '@/components/ui/ProjectModal'
import type { Project } from '@/data/projects'

export default function FreelanceWork() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<Project | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="freelance" style={{ padding: '100px 24px', background: 'var(--bg)' }}>
      <div ref={ref} className="fade-up" style={{ maxWidth: 1100, margin: '0 auto' }}>

        <p className="section-label">Freelance Work</p>
        <h2 className="section-title">Delivered to real clients</h2>
        <p className="section-desc" style={{ marginBottom: 48 }}>
          Paid client work — actively used in production. No code shown to respect client confidentiality.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {freelanceProjects.map(p => (
            <ProjectCard key={p.slug} project={p} onClick={() => setActive(p)} />
          ))}
        </div>

      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  )
}
