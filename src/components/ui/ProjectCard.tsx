'use client'
import type { Project } from '@/data/projects'

export default function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const statusBadge = project.status === 'live'
    ? <span className="badge-live">Live</span>
    : project.status === 'complete'
    ? <span className="badge-complete">Delivered</span>
    : <span style={{ display:'inline-flex',alignItems:'center',gap:5,padding:'4px 10px',background:'var(--amber-bg)',border:'1px solid var(--amber-border)',borderRadius:99,fontSize:11,fontWeight:600,color:'var(--amber)' }}>In Progress</span>

  return (
    <div
      className="card"
      onClick={onClick}
      style={{ padding: '26px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 18, height: '100%' }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        {statusBadge}
        <span style={{
          fontSize: 10, color: 'var(--text3)',
          fontFamily: 'var(--font-jetbrains), JetBrains Mono, monospace',
          fontWeight: 500,
          padding: '3px 8px',
          background: 'var(--surface2)',
          borderRadius: 6,
          border: '1px solid var(--border)',
        }}>
          {project.type === 'freelance' ? 'Client work' : 'Personal'}
        </span>
      </div>

      {/* Title + subtitle */}
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.25, marginBottom: 6 }}>
          {project.title}
        </h3>
        {project.subtitle && (
          <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 12 }}>{project.subtitle}</p>
        )}
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75 }}>{project.shortDesc}</p>
      </div>

      {/* Stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.stack.slice(0, 5).map(s => <span key={s} className="stack-pill">{s}</span>)}
        {project.stack.length > 5 && (
          <span className="stack-pill" style={{ color: 'var(--accent)', borderColor: 'var(--accent-border)', background: 'var(--accent-light)' }}>
            +{project.stack.length - 5}
          </span>
        )}
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 12, color: 'var(--accent)', fontWeight: 600,
        paddingTop: 14, borderTop: '1px solid var(--border)',
      }}>
        View details
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    </div>
  )
}