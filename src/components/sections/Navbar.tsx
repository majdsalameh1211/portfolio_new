'use client'
import { useTheme } from '@/components/ui/ThemeProvider'
import { useEffect, useState } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#freelance' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrolledBg = theme === 'dark'
    ? 'rgba(12,10,9,0.92)'
    : 'rgba(240,238,233,0.92)'

  const dropdownBg = theme === 'dark'
    ? 'rgba(20,22,30,0.97)'
    : 'rgba(245,243,239,0.97)'

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled || menuOpen ? scrolledBg : 'transparent',
      backdropFilter: scrolled || menuOpen ? 'blur(16px) saturate(1.5)' : 'none',
      WebkitBackdropFilter: scrolled || menuOpen ? 'blur(16px) saturate(1.5)' : 'none',
      borderBottom: scrolled || menuOpen ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
    }}>

      {/* Main bar */}
      <div style={{
        width: '90%', margin: '0 auto',
        height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <a href="#" style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: 1 }}>
          <span style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent-muted))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>M</span>S
        </a>

        {/* Desktop nav links — hidden on mobile */}
        <ul className="md:flex hidden" style={{ gap: 4, listStyle: 'none', margin: 0, padding: 0 }}>
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  fontSize: 13, fontWeight: 500, color: 'var(--text2)',
                  textDecoration: 'none',
                  padding: '6px 12px',
                  borderRadius: 8,
                  transition: 'color 0.15s, background 0.15s',
                  display: 'block',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = 'var(--text)'
                  el.style.background = 'rgba(88,166,255,0.08)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = 'var(--text2)'
                  el.style.background = 'transparent'
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={toggle}
            title="Toggle theme"
            style={{
              width: 36, height: 36, borderRadius: 10,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15,
              transition: 'transform 0.15s',
              color: 'var(--text)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Hamburger — mobile only, hidden on md+ */}
          <button
            onClick={() => setMenuOpen(p => !p)}
            className="flex md:hidden"
            style={{
              width: 36, height: 36, borderRadius: 10,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              cursor: 'pointer',
              alignItems: 'center', justifyContent: 'center',
              color: 'var(--text)',
              fontSize: 16,
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

      </div>

      {/* Mobile dropdown — simple list */}
      {menuOpen && (
        <div style={{
          background: dropdownBg,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid var(--border)',
          padding: '8px 0',
        }}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 24px',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(88,166,255,0.06)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent'
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)' }}>{l.label}</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          ))}
        </div>
      )}

    </nav>
  )
}