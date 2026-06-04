import { useState, useEffect } from 'react'
import { T } from '../services/designTokens'
import { api } from '../services/api'
import Card from '../components/Card'
import KPI from '../components/KPI'
import Badge from '../components/Badge'

export default function Programs(){
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.programs.list({ limit: 50 })
      .then(res => setPrograms(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={{padding:40,color:T.textDim}}>Loading programs…</div>

  const phaseC = { Accumulation: T.blue, Volume: T.purple, Cutting: T.red, Base: T.green, Recomp: T.gold }

  return <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
      <KPI label="Active Programs" value={programs.length} sub="Running now"   accent={T.gold}   icon="◫"/>
      <KPI label="Avg Duration"    value={programs.length>0?`${Math.round(programs.reduce((a,p)=>a+p.weeks,0)/programs.length)} wk`:"—"} sub="Per program"   accent={T.blue}   icon="⏱"/>
      <KPI label="Clients w/ Plan" value={new Set(programs.map(p=>p.client)).size} sub="All active"    accent={T.green}  icon="◎"/>
      <KPI label="AI Generated"    value={programs.filter(p=>p.phase==='AI').length} sub="Auto plans"  accent={T.purple} icon="⊕"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginBottom:14}}>
      {programs.map((p,i)=>{
        const pc = phaseC[p.phase] || T.gold
        return <Card key={p.id||i} style={{padding:18}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div>
              <p style={{color:T.text,fontSize:14,fontWeight:700,margin:0}}>{p.name}</p>
              <p style={{color:T.textDim,fontSize:11,margin:"4px 0 0"}}>{p.client} · {p.trainer?.split(" ")[0]}</p>
            </div>
            <Badge label={p.phase} color={pc}/>
          </div>
          <div style={{display:"flex",gap:18,marginBottom:12}}>
            {[{l:"Duration",v:`${p.weeks}w`},{l:"Days/Wk",v:`${p.days}d`},{l:"Progress",v:`${p.progress}%`}].map((s,j)=>(
              <div key={j}>
                <p style={{color:T.textDim,fontSize:10,margin:0}}>{s.l}</p>
                <p style={{color:T.textMid,fontSize:12,fontWeight:700,margin:"3px 0 0"}}>{s.v}</p>
              </div>
            ))}
          </div>
          <div style={{height:5,background:"rgba(255,255,255,0.06)",borderRadius:3,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${p.progress}%`,borderRadius:3,
              background:`linear-gradient(90deg,${pc},${pc}88)`,transition:"width 1s ease"}}/>
          </div>
          <p style={{color:"#555",fontSize:10,margin:"5px 0 0",textAlign:"right"}}>{p.progress}% complete</p>
        </Card>
      ))}
    </div>
    <Card style={{padding:24,textAlign:"center",cursor:"pointer"}} nohover>
      <p style={{fontSize:28,margin:"0 0 8px"}}>⊕</p>
      <p style={{color:T.gold,fontSize:14,fontWeight:700,margin:0}}>Create New Program</p>
      <p style={{color:T.textDim,fontSize:12,margin:"6px 0 0"}}>Use AI to generate a personalized workout program for any client</p>
    </Card>
  </div>
}
