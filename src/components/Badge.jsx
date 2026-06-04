import { T } from '../services/designTokens'

export default function Badge({label,color}){
  return <span style={{background:`${color}18`,border:`1px solid ${color}30`,color,
    borderRadius:5,padding:"2px 8px",fontSize:10,fontWeight:700,letterSpacing:0.5,whiteSpace:"nowrap"}}>{label}</span>
}
