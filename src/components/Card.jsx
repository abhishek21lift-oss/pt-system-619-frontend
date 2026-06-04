import { useState } from 'react'
import { T } from '../services/designTokens'

export default function Card({children,style={},accent,nohover}){
  const [hov,setHov]=useState(false)
  return <div
    onMouseEnter={()=>!nohover&&setHov(true)} onMouseLeave={()=>setHov(false)}
    style={{background:hov?T.surfaceH:T.surface,border:`1px solid ${hov&&accent?accent+"44":T.border}`,
      borderRadius:16,transition:"all 0.18s",boxShadow:hov?"0 8px 28px rgba(0,0,0,0.35)":"none",...style}}>
    {children}
  </div>
}
