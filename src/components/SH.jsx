import { T } from '../services/designTokens'

export default function SH({ title, sub, action, onAction }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
      <div>
        <h3 style={{ color: T.text, fontSize: 16, fontWeight: 600, margin: 0, letterSpacing: -0.2 }}>{title}</h3>
        {sub && <p style={{ color: T.textDim, fontSize: 12, margin: '4px 0 0', fontWeight: 400 }}>{sub}</p>}
      </div>
      {action && (
        <button onClick={onAction} style={{
          background: 'transparent', border: `1px solid ${T.border}`,
          color: T.accent, borderRadius: 20, padding: '5px 14px',
          fontSize: 12, cursor: 'pointer', fontWeight: 500, transition: 'all 0.15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = T.accentDim }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
          {action}
        </button>
      )}
    </div>
  )
}
