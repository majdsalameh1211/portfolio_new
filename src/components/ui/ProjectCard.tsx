'use client'
import type { Project } from '@/data/projects'

export default function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const statusBadge = project.status === 'live'
    ? <span className="badge-live">Live</span>
    : project.status === 'complete'
    ? <span className="badge-complete">Delivered</span>
    : <span style={{ display:'inline-flex',alignItems:'center',gap:5,padding:'3px 9px',background:'var(--amber-bg,#FFFBEB)',border:'1px solid var(--amber-border,#FDE68A)',borderRadius:20,fontSize:11,fontWeight:600,color:'var(--amber,#B45309)' }}>In Progress</span>

  return (
    <div
      className="card"
      onClick={onClick}
      style={{ padding: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        {statusBadge}
        <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--font-jetbrains)', fontWeight: 500, paddingTop: 2 }}>
          {project.type === 'freelance' ? 'Client work' : 'Personal'}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: 6 }}>{project.title}</h3>
        {project.subtitle && <p style={{ fontSize: 12, color: 'var(--text3)' }}>{project.subtitle}</p>}
      </div>

      {/* Short desc */}
      <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, flex: 1 }}>{project.shortDesc}</p>

      {/* Stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.stack.slice(0, 5).map(s => <span key={s} className="stack-pill">{s}</span>)}
        {project.stack.length > 5 && <span className="stack-pill">+{project.stack.length - 5}</span>}
      </div>

      {/* Footer hint */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--accent)', fontWeight: 600, paddingTop: 4, borderTop: '1px solid var(--border)' }}>
        View details
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    </div>
  )
}
