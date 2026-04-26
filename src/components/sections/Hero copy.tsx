'use client'
import { useEffect, useRef } from 'react'
import { useTheme } from '@/components/ui/ThemeProvider'

const techPills = ['Node.js', 'Python', 'TypeScript', 'Socket.IO', 'MongoDB', 'Docker', 'PostgreSQL']

const CODE_LINES = [
  { t: "async function handleRequest(req, res) {", c: "#58A6FF" },
  { t: "  const token = req.headers.authorization;", c: "#E6EDF3" },
  { t: "  const user = await verifyJWT(token);", c: "#E6EDF3" },
  { t: "  if (!user) return res.status(401)", c: "#FF7B72" },
  { t: "    .json({ error: 'Unauthorized' });", c: "#FF7B72" },
  { t: "", c: "" },
  { t: "  const lead = await Lead.findById(", c: "#E6EDF3" },
  { t: "    req.params.id", c: "#79C0FF" },
  { t: "  ).populate('assignedTo');", c: "#E6EDF3" },
  { t: "", c: "" },
  { t: "  io.to(`lead_${lead._id}`)", c: "#F5C842" },
  { t: "    .emit('lead:updated', lead);", c: "#F5C842" },
  { t: "", c: "" },
  { t: "  res.json({ success: true, lead });", c: "#A3E8A3" },
  { t: "}", c: "#58A6FF" },
]

export default function Hero() {
  const { theme } = useTheme()
  const particleCanvas = useRef<HTMLCanvasElement>(null)
  const laptopCanvas = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)

  // ── Particle background ──────────────────────────────────────
  useEffect(() => {
    const canvas = particleCanvas.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number

    const isDark = theme === 'dark'
    const particleColor = isDark ? 'rgba(129,140,248,' : 'rgba(79,70,229,'
    const lineColor1 = isDark ? '99,102,241' : '79,70,229'
    const lineColor2 = isDark ? '88,166,255' : '99,102,241'
    const bgColor = isDark ? '13,17,23' : '240,238,233'

    const el = canvas

    function makePts() {
      return Array.from({ length: 70 }, () => ({
        x: Math.random() * el.width,
        y: Math.random() * el.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: (0.8 + Math.random() * 1.2) * devicePixelRatio,
      }))
    }

    function resize() {
      el.width = window.innerWidth * devicePixelRatio
      el.height = window.innerHeight * devicePixelRatio
      pts.length = 0
      makePts().forEach(p => pts.push(p))
    }

    const pts: { x: number; y: number; vx: number; vy: number; r: number }[] = makePts()
    resize()
    window.addEventListener('resize', resize)

    function frame() {
      const W = el.width, H = el.height
      ctx.fillStyle = `rgba(${bgColor},0.85)`
      ctx.fillRect(0, 0, W, H)

      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
      })

      const CONNECT = W * 0.18
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < CONNECT) {
            const a = (1 - d / CONNECT) * (isDark ? 0.5 : 0.35)
            const g = ctx.createLinearGradient(pts[i].x, pts[i].y, pts[j].x, pts[j].y)
            g.addColorStop(0, `rgba(${lineColor1},${a})`)
            g.addColorStop(1, `rgba(${lineColor2},${a * 0.5})`)
            ctx.strokeStyle = g
            ctx.lineWidth = 0.7 * devicePixelRatio
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      pts.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = particleColor + (isDark ? '0.8' : '0.6') + ')'
        ctx.fill()
      })

      raf = requestAnimationFrame(frame)
    }
    frame()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [theme])

  // ── Laptop animation ─────────────────────────────────────────
  useEffect(() => {
    const canvas = laptopCanvas.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    const dpr = devicePixelRatio
    const el2 = canvas

    function resize() {
      el2.width = el2.offsetWidth * dpr
      el2.height = el2.offsetHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)

    // Laptop open animation state
    let openAngle = 0          // 0 = closed, 1 = fully open
    const OPEN_SPEED = 0.018
    let openDone = false

    // Typing state
    let visLine = 0, visChar = 0, tick = 0
    let typingStarted = false

    function getLaptopDims() {
      const W = el2.width, H = el2.height
      const LW = Math.min(W * 0.82, H * 1.3)
      const LH = LW * 0.63
      const LX = (W - LW) / 2
      const LY = (H - LH) / 2 + H * 0.02
      const SP = LW * 0.038
      const SX = LX + SP, SY = LY + SP
      const SW = LW - SP * 2, SH = LH - SP * 1.5
      const baseH = LH * 0.055
      const baseW = LW * 1.06
      const baseX = LX - (baseW - LW) / 2
      const baseY = LY + LH
      return { W, H, LW, LH, LX, LY, SP, SX, SY, SW, SH, baseH, baseW, baseX, baseY }
    }

    function rr(x: number, y: number, w: number, h: number, r: number) {
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.lineTo(x + w - r, y)
      ctx.quadraticCurveTo(x + w, y, x + w, y + r)
      ctx.lineTo(x + w, y + h - r)
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
      ctx.lineTo(x + r, y + h)
      ctx.quadraticCurveTo(x, y + h, x, y + h - r)
      ctx.lineTo(x, y + r)
      ctx.quadraticCurveTo(x, y, x + r, y)
      ctx.closePath()
    }

    function drawBase(d: ReturnType<typeof getLaptopDims>) {
      ctx.fillStyle = '#1C2128'
      rr(d.baseX, d.baseY, d.baseW, d.baseH, 3 * dpr)
      ctx.fill()
      ctx.strokeStyle = 'rgba(48,54,61,0.9)'
      ctx.lineWidth = dpr * 0.8
      ctx.stroke()
      const tpW = d.baseW * 0.2, tpH = d.baseH * 0.52
      ctx.fillStyle = '#232A33'
      ctx.strokeStyle = 'rgba(48,54,61,0.6)'
      rr(d.baseX + (d.baseW - tpW) / 2, d.baseY + (d.baseH - tpH) / 2, tpW, tpH, 2 * dpr)
      ctx.fill(); ctx.stroke()
    }

    function drawLid(d: ReturnType<typeof getLaptopDims>, angle: number) {
      // angle: 0=closed(flat), 1=fully open
      // Simulate perspective open: lid pivots from base hinge
      const eased = 1 - Math.pow(1 - angle, 3) // ease out cubic
      const scaleY = eased // vertical scale of lid (0=flat, 1=full)
      const hingeY = d.baseY

      ctx.save()
      ctx.translate(d.LX + d.LW / 2, hingeY)
      ctx.scale(1, scaleY)
      ctx.translate(-(d.LX + d.LW / 2), -hingeY)

      // Lid body
      ctx.fillStyle = '#1C2128'
      rr(d.LX, d.LY, d.LW, d.LH, 7 * dpr)
      ctx.fill()
      ctx.strokeStyle = 'rgba(48,54,61,0.9)'
      ctx.lineWidth = dpr
      ctx.stroke()

      // Screen bezel
      ctx.fillStyle = '#080C10'
      rr(d.SX - 3, d.SY - 3, d.SW + 6, d.SH + 6, 4 * dpr)
      ctx.fill()

      // Screen content only when open enough
      if (angle > 0.6) {
        const screenAlpha = Math.min(1, (angle - 0.6) / 0.4)
        ctx.globalAlpha = screenAlpha
        drawEditor(d)
        ctx.globalAlpha = 1
      }

      ctx.restore()
    }

    function drawEditor(d: ReturnType<typeof getLaptopDims>) {
      const { SX, SY, SW, SH } = d
      const lineH = SH * 0.061
      const fs = lineH * 0.72
      const padX = SW * 0.05

      ctx.fillStyle = '#0D1117'
      ctx.fillRect(SX, SY, SW, SH)

      // Glow
      const glow = ctx.createRadialGradient(SX + SW/2, SY + SH*0.45, 0, SX + SW/2, SY + SH*0.45, SW * 0.55)
      glow.addColorStop(0, 'rgba(88,166,255,0.05)')
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow
      ctx.fillRect(SX, SY, SW, SH)

      // Tab bar
      ctx.fillStyle = 'rgba(22,27,34,0.98)'
      ctx.fillRect(SX, SY, SW, lineH * 1.15)
      ctx.fillStyle = '#0D1117'
      ctx.fillRect(SX, SY, SW * 0.32, lineH * 1.15)
      ctx.fillStyle = 'rgba(99,102,241,0.9)'
      ctx.fillRect(SX, SY, SW * 0.32, 1.5 * dpr)

      ctx.font = `${fs * 0.8}px monospace`
      ctx.textAlign = 'left'
      ctx.fillStyle = 'rgba(200,210,220,0.75)'
      ctx.fillText('leadController.js', SX + SW * 0.02, SY + lineH * 0.82)

      // Dots
      ;['rgba(255,95,87,0.85)', 'rgba(255,189,46,0.85)', 'rgba(39,201,63,0.85)'].forEach((c, i) => {
        ctx.beginPath()
        ctx.arc(SX + SW * (0.73 + i * 0.055), SY + lineH * 0.58, 2.8 * dpr, 0, Math.PI * 2)
        ctx.fillStyle = c; ctx.fill()
      })

      // Code
      ctx.font = `${fs}px monospace`
      const codeY = SY + lineH * 1.55
      for (let i = 0; i < visLine && i < CODE_LINES.length; i++) {
        const y = codeY + i * lineH
        if (y + lineH > SY + SH - lineH) break
        ctx.fillStyle = 'rgba(139,148,158,0.3)'
        ctx.textAlign = 'right'
        ctx.fillText(String(i + 1), SX + padX * 1.9, y)
        if (CODE_LINES[i].t) {
          ctx.textAlign = 'left'
          ctx.fillStyle = CODE_LINES[i].c
          ctx.fillText(CODE_LINES[i].t, SX + padX * 2.2, y)
        }
      }

      // Current typing line
      if (visLine < CODE_LINES.length) {
        const y = codeY + visLine * lineH
        if (y < SY + SH - lineH) {
          ctx.fillStyle = 'rgba(139,148,158,0.3)'
          ctx.textAlign = 'right'
          ctx.fillText(String(visLine + 1), SX + padX * 1.9, y)
          const partial = CODE_LINES[visLine].t.slice(0, visChar)
          ctx.textAlign = 'left'
          ctx.fillStyle = CODE_LINES[visLine].c || '#E6EDF3'
          ctx.fillText(partial, SX + padX * 2.2, y)
          if (Math.floor(tick / 16) % 2 === 0) {
            const tw = ctx.measureText(partial).width
            ctx.fillStyle = 'rgba(88,166,255,0.95)'
            ctx.fillRect(SX + padX * 2.2 + tw, y - fs + 1, 1.5 * dpr, fs * 1.1)
          }
        }
      }

      // Status bar
      const sbY = SY + SH - lineH * 0.9
      ctx.fillStyle = 'rgba(16,20,26,0.97)'
      ctx.fillRect(SX, sbY, SW, lineH * 0.9)
      ctx.font = `${fs * 0.72}px monospace`
      ctx.textAlign = 'left'
      ctx.fillStyle = 'rgba(88,166,255,0.55)'
      ctx.fillText('  Node.js  ·  JavaScript  ·  UTF-8', SX + 4, sbY + lineH * 0.62)
      ctx.textAlign = 'right'
      ctx.fillStyle = 'rgba(139,148,158,0.45)'
      ctx.fillText(`Ln ${Math.min(visLine + 1, CODE_LINES.length)}  `, SX + SW - 4, sbY + lineH * 0.62)
    }

    function advance() {
      if (!typingStarted) return
      if (visLine < CODE_LINES.length) {
        visChar += 2
        if (visChar >= CODE_LINES[visLine].t.length) { visLine++; visChar = 0 }
      } else {
        if (tick % 240 === 0) { visLine = 0; visChar = 0 }
      }
    }

    function frame() {
      tick++
      const d = getLaptopDims()
      ctx.clearRect(0, 0, d.W, d.H)

      // Open animation
      if (!openDone) {
        openAngle = Math.min(1, openAngle + OPEN_SPEED)
        if (openAngle >= 1) { openDone = true; typingStarted = true }
      }

      drawBase(d)
      drawLid(d, openAngle)

      // Screen edge glow on lid
      if (openAngle > 0.8) {
        const gl = ctx.createRadialGradient(d.SX + d.SW/2, d.SY + d.SH/2, d.SW*0.3, d.SX + d.SW/2, d.SY + d.SH/2, d.SW*0.75)
        gl.addColorStop(0, 'rgba(88,166,255,0)')
        gl.addColorStop(1, 'rgba(88,166,255,0.025)')
        ctx.fillStyle = gl
        ctx.fillRect(d.LX, d.LY, d.LW, d.LH)
      }

      if (tick % 2 === 0) advance()
      raf = requestAnimationFrame(frame)
    }
    frame()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '80px 0 60px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Particle canvas — fixed full viewport background */}
      <canvas ref={particleCanvas} style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 0, pointerEvents: 'none',
      }}/>

      {/* Main content — 5% margin all sides */}
      <div style={{
        width: '90%',
        margin: '0 auto',
        zIndex: 2,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '5%',
        alignItems: 'stretch',
      }} className="hero-grid">

        {/* ── LEFT: text content ── */}
        <div ref={leftRef} style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 0,
        }}>

          {/* Photo */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              width: 120, height: 120,
              borderRadius: '50%',
              border: '2px solid var(--accent-border)',
              background: 'var(--accent-light)',
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Replace with: <img src="/photo.jpg" alt="Majd" style={{width:'100%',height:'100%',objectFit:'cover'}}/> */}
              <span style={{ fontSize: 34, fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.03em' }}>MS</span>
            </div>
          </div>

          {/* Name + title */}
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            marginBottom: 12,
          }}>
            Hi, I'm<br/>
            <span style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-muted) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Majd Salameh</span>
          </h1>

          <p style={{ fontSize: 'clamp(15px, 1.8vw, 19px)', fontWeight: 500, color: 'var(--text2)', marginBottom: 14, letterSpacing: '-0.01em' }}>
            Backend & Full-Stack Software Engineer
          </p>

          <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 28, maxWidth: 480 }}>
            Specializing in real-time systems, APIs, and data pipelines. Built and deployed production systems for real clients — handling concurrent workloads and scalable data processing using Node.js, Python, and WebSockets.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
            <a href="#freelance" className="btn-primary">
              View My Work
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </a>
            <a href="/MajdSalamehCV.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline">
              Download CV
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            </a>
          </div>

          {/* Tech pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {techPills.map(t => <span key={t} className="stack-pill">{t}</span>)}
          </div>
        </div>

        {/* ── RIGHT: laptop canvas ── */}
        <div style={{ position: 'relative', minHeight: 340 }}>
          <canvas ref={laptopCanvas} style={{
            width: '100%', height: '100%',
            display: 'block',
            position: 'absolute', inset: 0,
          }}/>
        </div>

      </div>


    </section>
  )
}