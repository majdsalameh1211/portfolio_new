export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '20px 24px', textAlign: 'center' }}>
      <p style={{ fontSize: 12, color: 'var(--text3)' }}>
        Built by Majd Salameh · Next.js · {new Date().getFullYear()}
      </p>
    </footer>
  )
}
