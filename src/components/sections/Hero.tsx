'use client'
import { useEffect, useRef } from 'react'

const techPills = ['Node.js', 'MongoDB', 'Socket.IO', 'Docker', 'Python', 'React', 'PostgreSQL']

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    setTimeout(() => el.classList.add('visible'), 100)
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '100px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background dot grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        opacity: 0.6,
      }}/>
      {/* Gradient fade */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, var(--accent-light) 0%, transparent 70%)',
        opacity: 0.5,
      }}/>

      <div ref={ref} className="fade-up" style={{ maxWidth: 1100, margin: '0 auto', width: '100%', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48 }}>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
            Available for new roles
          </p>

          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>
            Hi, I'm<br/>
            <span style={{ color: 'var(--accent)' }}>Majd Salameh</span>
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: 500, color: 'var(--text2)', marginBottom: 20, lineHeight: 1.4 }}>
            Backend & Full-Stack Software Engineer
          </p>

          <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 520, marginBottom: 36 }}>
            I build production systems that real people use — real-time, event-driven, and shipped to actual clients.
            B.Sc. Software Engineering, specializing in backend architecture and scalable APIs.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
            <a href="#freelance" className="btn-primary">
              View My Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </a>
            <a href="/MajdSalamehCV.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline">
              Download CV
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            </a>
          </div>

          {/* Stack pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {techPills.map(t => (
              <span key={t} className="stack-pill">{t}</span>
            ))}
          </div>
        </div>

        {/* Photo placeholder */}
        <div style={{ flexShrink: 0 }}>
          <div style={{
            width: 'clamp(200px, 22vw, 280px)',
            height: 'clamp(200px, 22vw, 280px)',
            borderRadius: '50%',
            border: '3px solid var(--accent-border)',
            background: 'var(--accent-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(37,99,235,0.15)',
          }}>
            {/* Replace src below with your actual photo path e.g. /photo.jpg */}
            {/* <img src="/photo.jpg" alt="Majd Salameh" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
            <span style={{ fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.04em', fontFamily: 'var(--font-sora)' }}>MS</span>
          </div>
        </div>

      </div>
    </section>
  )
}
