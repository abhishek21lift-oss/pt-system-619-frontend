import { T } from '../services/designTokens'

export default function Tip({active,payload,label}){
  if(!active||!payload?.length) return null
  return <div style={{background:"rgba(6,6,15,0.97)",border:`1px solid ${T.borderA}`,borderRadius:10,
    padding:"10px 14px",boxShadow:"0 8px 28px rgba(0,0,0,0.6)"}}>
    <p style={{color:T.gold,fontSize:11,margin:"0 0 6px",fontWeight:700,letterSpacing:1}}>{label}</p>
    {payload.map((p,i)=><p key={i} style={{color:p.color||"#fff",fontSize:12,margin:"2px 0"}}>{p.name}: {fmt(p.value)}</p>)}
  </div>
}

const fmt = v => v>=100000?`₹${(v/100000).toFixed(1)}L`:v>=1000?`₹${(v/1000).toFixed(0)}K`:`₹${v}`
