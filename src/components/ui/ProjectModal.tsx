'use client'
import { useEffect } from 'react'
import type { Project } from '@/data/projects'

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-box">

        {/* Header */}
        <div style={{
          padding: '24px 28px 20px',
          borderBottom: '1px solid rgba(88,166,255,0.1)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              {project.status === 'live'
                ? <span className="badge-live">Live</span>
                : <span className="badge-complete">Delivered</span>
              }
              <span style={{
                fontSize: 10, color: 'var(--text3)',
                fontFamily: 'monospace',
                padding: '3px 8px',
                border: '1px solid rgba(88,166,255,0.15)',
                borderRadius: 6,
              }}>
                {project.type === 'freelance' ? 'Freelance · Client Work' : 'Personal Project'}
              </span>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
              {project.title}
            </h2>
            {project.subtitle && (
              <p style={{ fontSize: 13, color: 'var(--accent)', marginTop: 4, fontWeight: 500 }}>{project.subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              flexShrink: 0, width: 32, height: 32, borderRadius: 8,
              border: '1px solid rgba(88,166,255,0.15)',
              background: 'rgba(88,166,255,0.05)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text2)', fontSize: 14,
              transition: 'background 0.15s',
            }}
          >✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Stack */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.stack.map(s => <span key={s} className="stack-pill">{s}</span>)}
          </div>

          {/* Overview */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', marginBottom: 10 }}>
              Overview
            </p>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8 }}>{project.overview}</p>
          </div>

          {/* What I built */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', marginBottom: 12 }}>
              What I built
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {project.built.map((b, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '10px 14px',
                  background: 'rgba(88,166,255,0.04)',
                  border: '1px solid rgba(88,166,255,0.1)',
                  borderRadius: 10,
                }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0, marginTop: 1, fontSize: 12 }}>→</span>
                  <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>{b}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key decisions */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', marginBottom: 12 }}>
              Architectural decisions
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {project.decisions.map((d, i) => (
                <div key={i} style={{
                  borderLeft: '3px solid var(--accent)',
                  borderRadius: '0 10px 10px 0',
                  padding: '12px 16px',
                  background: 'rgba(88,166,255,0.04)',
                  border: '1px solid rgba(88,166,255,0.1)',
                  borderLeftColor: 'var(--accent)',
                  borderLeftWidth: 3,
                }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{d.q}</p>
                  <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>{d.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          {project.githubUrl && (
            <div style={{ display: 'flex', gap: 10, paddingTop: 4, borderTop: '1px solid rgba(88,166,255,0.1)' }}>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                GitHub
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}