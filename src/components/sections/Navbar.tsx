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

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(247,248,251,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
      className="dark:[--nav-bg:rgba(13,17,23,0.9)]"
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <a href="#" style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.02em' }}>
          <span style={{ color: 'var(--accent)' }}>M</span>S
        </a>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0 }} className="hidden md:flex">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{ fontSize: 13, fontWeight: 500, color: 'var(--text2)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Theme toggle */}
          <button
            onClick={toggle}
            title="Toggle theme"
            style={{
              width: 36, height: 36, borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, transition: 'border-color 0.15s, background 0.15s',
              color: 'var(--text)',
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(p => !p)}
            style={{
              width: 36, height: 36, borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: 'var(--text)',
            }}
            className="md:hidden"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: 14, fontWeight: 500, color: 'var(--text2)', textDecoration: 'none' }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
