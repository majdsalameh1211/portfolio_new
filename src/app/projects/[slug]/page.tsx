'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug)
  if (!project) notFound()

  const heroRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    requestAnimationFrame(() => el.classList.add('visible'))
  }, [])

  const statusBadge = project.status === 'live'
    ? <span className="badge-live">Live</span>
    : project.status === 'complete'
    ? <span className="badge-complete">Delivered</span>
    : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: 'var(--amber-bg)', border: '1px solid var(--amber-border)', borderRadius: 99, fontSize: 11, fontWeight: 600, color: 'var(--amber)' }}>In Progress</span>

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── NAV BACK ── */}
      <div style={{ width: '90%', maxWidth: 900, margin: '0 auto', paddingTop: 32 }}>
        <Link href="/#projects" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 13, fontWeight: 600, color: 'var(--text2)',
          textDecoration: 'none',
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      <div ref={heroRef} className="fade-up" style={{ width: '90%', maxWidth: 900, margin: '0 auto', padding: '40px 0 80px' }}>

        {/* ── HERO ── */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            {statusBadge}
            <span style={{
              fontSize: 10, color: 'var(--text3)',
              fontFamily: 'var(--font-jetbrains), JetBrains Mono, monospace',
              fontWeight: 500, padding: '3px 8px',
              background: 'var(--surface2)',
              borderRadius: 6, border: '1px solid var(--border)',
            }}>
              {project.type === 'freelance' ? 'Freelance · Client Work' : 'Personal Project'}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700, color: 'var(--text)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            marginBottom: 8,
          }}>
            {project.title}
          </h1>

          {project.subtitle && (
            <p style={{ fontSize: 15, color: 'var(--accent)', fontWeight: 500, marginBottom: 24 }}>
              {project.subtitle}
            </p>
          )}

          {/* Stack pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.stack.map(s => <span key={s} className="stack-pill">{s}</span>)}
          </div>
        </div>

        {/* ── DESCRIPTION ── */}
        <Section label="Overview">
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '28px 32px',
            marginBottom: 0,
          }}>
            <p style={{
              fontSize: 'clamp(17px, 2vw, 20px)',
              fontWeight: 700, color: 'var(--text)',
              letterSpacing: '-0.02em', lineHeight: 1.4,
              marginBottom: 20,
            }}>
              {project.descriptionHeadline}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {project.descriptionBullets.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'var(--accent)', flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.6 }}>{b}</span>
                </div>
              ))}
            </div>

            <div style={{
              borderTop: '1px solid var(--border)',
              paddingTop: 18,
              display: 'flex', alignItems: 'flex-start', gap: 10,
            }}>
              <span style={{ color: 'var(--accent)', fontSize: 16, flexShrink: 0, marginTop: 1 }}>→</span>
              <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, fontStyle: 'italic' }}>
                {project.descriptionImpact}
              </p>
            </div>
          </div>
        </Section>

        {/* ── WHAT IT DOES ── */}
        <Section label="What it does">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {project.whatItDoes.map((item, i) => (
              <div key={i} style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '16px 18px',
                display: 'flex', alignItems: 'flex-start', gap: 12,
              }}>
                <span style={{
                  width: 24, height: 24, borderRadius: 6,
                  background: 'var(--accent-light)',
                  border: '1px solid var(--accent-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: 11, fontWeight: 700,
                  color: 'var(--accent)',
                  fontFamily: 'JetBrains Mono, monospace',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>{item}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── PROBLEM → SOLUTION ── */}
        <Section label="Problem → Engineering Solution">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {project.problems.map((p, i) => (
              <div key={i} style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                overflow: 'hidden',
              }}>
                {/* Title bar */}
                <div style={{
                  padding: '14px 20px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'var(--surface2)',
                }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    fontFamily: 'JetBrains Mono, monospace',
                    color: 'var(--accent)',
                    background: 'var(--accent-light)',
                    border: '1px solid var(--accent-border)',
                    padding: '2px 7px', borderRadius: 6,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>
                    {p.title}
                  </span>
                </div>

                {/* Problem */}
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
                  <p style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'var(--text3)',
                    marginBottom: 8,
                  }}>Problem</p>
                  <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75 }}>{p.problem}</p>
                </div>

                {/* Solution */}
                <div style={{ padding: '16px 20px', borderLeft: '3px solid var(--accent)' }}>
                  <p style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'var(--accent)',
                    marginBottom: 8,
                  }}>Solution</p>
                  <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75 }}>{p.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── ARCHITECTURE ── */}
        {project.architectureUrl && project.architectureUrl !== '#' && (
          <Section label="Architecture">
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              overflow: 'hidden',
            }}>
              <img
                src={project.architectureUrl}
                alt="Architecture diagram"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </Section>
        )}

        {/* ── TECH STACK ── */}
        <Section label="Tech Stack">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.stack.map(s => (
              <span key={s} className="stack-pill" style={{ fontSize: 13, padding: '6px 14px' }}>{s}</span>
            ))}
          </div>
        </Section>

        {/* ── BUTTONS ── */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', paddingTop: 8 }}>
          {project.demoUrl && project.demoUrl !== '#' && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Live Demo
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
              GitHub
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          )}
        </div>

      </div>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <p className="section-label" style={{ marginBottom: 20 }}>{label}</p>
      {children}
    </div>
  )
}