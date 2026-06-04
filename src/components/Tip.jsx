import { T } from '../services/designTokens'

export default function Tip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 12, padding: '12px 16px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
      backdropFilter: 'blur(20px)',
    }}>
      <p style={{ color: T.textDim, fontSize: 11, margin: '0 0 6px', fontWeight: 500, letterSpacing: 0.2 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || '#fff', fontSize: 13, margin: '3px 0', fontWeight: 500 }}>
          {p.name}: {fmt(p.value)}
        </p>
      ))}
    </div>
  )
}

const fmt = v => v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` : v >= 1000 ? `₹${(v / 1000).toFixed(0)}K` : `₹${v}`
