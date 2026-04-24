'use client'
import { useEffect, useRef, useState } from 'react'
import { personalProjects } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard'
import ProjectModal from '@/components/ui/ProjectModal'
import type { Project } from '@/data/projects'

export default function Projects() {
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
    <section id="projects" style={{ padding: '100px 24px', background: 'var(--surface)' }}>
      <div ref={ref} className="fade-up" style={{ maxWidth: 1100, margin: '0 auto' }}>

        <p className="section-label">Personal Projects</p>
        <h2 className="section-title">Built to go deeper</h2>
        <p className="section-desc" style={{ marginBottom: 48 }}>
          Engineering projects built to explore systems thinking, infrastructure, and machine learning.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 20 }}>
          {personalProjects.map(p => (
            <ProjectCard key={p.slug} project={p} onClick={() => setActive(p)} />
          ))}
        </div>

      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  )
}
