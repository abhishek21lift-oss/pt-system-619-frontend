import { T } from '../services/designTokens'

export default function Badge({ label, color }) {
  return (
    <span style={{
      background: `${color || T.accent}14`, border: `1px solid ${color || T.accent}28`,
      color: color || T.accent, borderRadius: 20, padding: '3px 10px',
      fontSize: 11, fontWeight: 600, letterSpacing: -0.1, whiteSpace: 'nowrap',
    }}>{label}</span>
  )
}
