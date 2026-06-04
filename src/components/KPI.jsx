import { T } from '../services/designTokens'

export default function KPI({ label, value, sub, accent = T.accent, icon, delta }) {
  return (
    <div style={{
      background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`,
      padding: '18px 20px', position: 'relative', overflow: 'hidden',
      transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
    }}>
      <div style={{
        position: 'absolute', top: 0, right: 0, width: 120, height: 120,
        background: `radial-gradient(circle at 100% 0%, ${accent}12 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: T.textDim, fontSize: 11, letterSpacing: 0.3, margin: '0 0 6px', fontWeight: 500 }}>{label}</p>
          <p style={{ color: T.text, fontSize: 26, fontWeight: 700, lineHeight: 1.1, margin: 0, fontFamily: T.fontDisplay }}>{value}</p>
          {sub && <p style={{ color: accent, fontSize: 12, margin: '6px 0 0', fontWeight: 500 }}>{sub}</p>}
        </div>
        {icon && (
          <div style={{
            width: 36, height: 36, borderRadius: T.radiusXs, flexShrink: 0,
            background: `${accent}14`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 17,
          }}>{icon}</div>
        )}
      </div>
      {delta !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 10 }}>
          <span style={{ color: delta >= 0 ? T.green : T.red, fontSize: 12, fontWeight: 600 }}>
            {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}%
          </span>
          <span style={{ color: T.textDim, fontSize: 11 }}>vs last month</span>
        </div>
      )}
    </div>
  )
}
