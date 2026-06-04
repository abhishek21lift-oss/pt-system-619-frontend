import { T } from '../services/designTokens'

export default function Card({ children, style = {}, accent, nohover }) {
  return (
    <div style={{
      background: T.surface, borderRadius: T.radius, border: `1px solid ${accent ? accent + '55' : T.border}`,
      transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
      ...(nohover ? {} : {
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
      }),
      cursor: nohover ? undefined : 'default',
      ...style,
    }}
      onMouseEnter={e => { if (!nohover) { e.currentTarget.style.borderColor = accent ? accent + '77' : 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)' } }}
      onMouseLeave={e => { if (!nohover) { e.currentTarget.style.borderColor = accent ? accent + '55' : T.border; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3)' } }}>
      {children}
    </div>
  )
}
