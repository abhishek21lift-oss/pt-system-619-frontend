import { T } from '../services/designTokens'

export default function Card({ children, style = {}, accent, nohover }) {
  return (
    <div className="card-hover"
      style={{
        background: T.surface, borderRadius: 16, border: `1px solid ${accent ? accent + '44' : T.border}`,
        transition: 'all 0.18s', ...style,
      }}>
      <style>{`.card-hover:hover{background:${T.surfaceH};box-shadow:0 8px 28px rgba(0,0,0,0.35);border-color:${accent ? accent + '44' : T.border}}`}</style>
      {children}
    </div>
  )
}
