import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { T } from '../services/designTokens'
import { api } from '../services/api'
import Card from '../components/Card'
import KPI from '../components/KPI'
import SH from '../components/SH'

export default function PowerliftingView(){
  const [plClients, setPlClients] = useState([])
  const [sel, setSel] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.powerlifting.list()
      .then(res => setPlClients(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={{padding:40,color:T.textDim}}>Loading powerlifting…</div>
  if (plClients.length === 0) return <div style={{padding:40,color:T.textDim}}>No powerlifting clients yet.</div>

  const index = Math.min(sel, plClients.length - 1)
  const c = plClients[index]
  const barD = [{lift:"Squat",kg:c.squat},{lift:"Bench",kg:c.bench},{lift:"Deadlift",kg:c.deadlift},{lift:"Total",kg:c.total}]
  const liftColors = [T.gold,T.blue,T.red,T.green]
  const bestTotal = plClients.reduce((a,b)=>a.total>b.total?a:b)
  const bestSquat = plClients.reduce((a,b)=>a.squat>b.squat?a:b)
  const bestDL = plClients.reduce((a,b)=>a.deadlift>b.deadlift?a:b)

  return <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
      <KPI label="PL Clients" value={plClients.length} sub="Coached"          accent={T.gold}  icon="🏋"/>
      <KPI label="Best Total"  value={`${bestTotal.total}kg`}  sub={bestTotal.name}      accent={T.red}   icon="◈"/>
      <KPI label="Best Squat"  value={`${bestSquat.squat}kg`}  sub={bestSquat.name}      accent={T.blue}  icon="◫"/>
      <KPI label="Best DL"     value={`${bestDL.deadlift}kg`}  sub={bestDL.name}      accent={T.green} icon="◫"/>
    </div>
    <div style={{display:"flex",gap:10,marginBottom:16}}>
      {plClients.map((cl,i)=>(
        <button key={cl.id||i} onClick={()=>setSel(i)} style={{
          background:sel===i?T.goldDim:T.surface,border:`1px solid ${sel===i?T.borderA:T.border}`,
          color:sel===i?T.gold:T.textDim,borderRadius:10,padding:"9px 20px",
          fontSize:12,fontWeight:700,cursor:"pointer"}}>
          {cl.name} · {cl.wc}
        </button>
      ))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <Card style={{padding:22}}>
        <SH title={`${c.name} — Lifts`} sub={`BW ${c.bw}kg · ${c.wc} · Meet: ${c.meet}`}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
          {[
            {l:"Squat",v:`${c.squat}kg`,col:T.gold},{l:"Bench",v:`${c.bench}kg`,col:T.blue},
            {l:"Deadlift",v:`${c.deadlift}kg`,col:T.red},{l:"Total",v:`${c.total}kg`,col:T.green},
            {l:"Wilks Est.",v:Math.round((c.total/c.bw)*100),col:T.purple},
            {l:"S/D Ratio",v:`${((c.squat/c.deadlift)*100).toFixed(0)}%`,col:T.orange},
          ].map((s,j)=>(
            <div key={j} style={{background:`${s.col}0e`,border:`1px solid ${s.col}22`,borderRadius:10,padding:12,textAlign:"center"}}>
              <p style={{color:T.textDim,fontSize:10,letterSpacing:0.5,margin:0}}>{s.l}</p>
              <p style={{color:s.col,fontSize:19,fontWeight:800,margin:"6px 0 0",fontFamily:T.fontDisplay}}>{s.v}</p>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={barD} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false}/>
            <XAxis type="number" tick={{fill:"#666",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}kg`}/>
            <YAxis type="category" dataKey="lift" tick={{fill:T.textMid,fontSize:11}} axisLine={false} tickLine={false} width={58}/>
            <Tooltip contentStyle={{background:"rgba(6,6,15,0.97)",border:`1px solid ${T.borderA}`,borderRadius:8,fontSize:12}} formatter={v=>`${v} kg`}/>
            <Bar dataKey="kg" radius={[0,6,6,0]} maxBarSize={22}>
              {barD.map((_,i)=><Cell key={i} fill={liftColors[i]}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card style={{padding:22}}>
        <SH title="Periodization Block" sub="5/3/1 Style — 12 Weeks"/>
        {[
          {week:"Wk 1–3",label:"Accumulation",pct:"65–75%",sets:"5×5",c:T.blue},
          {week:"Wk 4–6",label:"Intensification",pct:"75–85%",sets:"4×4",c:T.gold},
          {week:"Wk 7–9",label:"Realization",pct:"85–92.5%",sets:"3×3",c:T.orange},
          {week:"Wk 10–11",label:"Peaking",pct:"92.5–100%",sets:"2–1 RM",c:T.red},
          {week:"Wk 12",label:"Deload",pct:"50–60%",sets:"3×5",c:T.green},
        ].map((r,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:12,
            padding:"10px 0",borderBottom:i<4?`1px solid ${T.border}`:"none"}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:r.c,flexShrink:0}}/>
            <div style={{flex:1}}>
              <p style={{color:T.textMid,fontSize:12,fontWeight:600,margin:0}}>{r.week} — {r.label}</p>
            </div>
            <div style={{textAlign:"right"}}>
              <p style={{color:r.c,fontSize:12,fontWeight:700,margin:0}}>{r.pct}</p>
              <p style={{color:T.textDim,fontSize:10,margin:"2px 0 0"}}>{r.sets}</p>
            </div>
          </div>
        ))}
        <div style={{marginTop:16,padding:"12px 14px",background:`${T.gold}0a`,
          border:`1px solid ${T.borderA}`,borderRadius:10}}>
          <p style={{color:T.gold,fontSize:12,fontWeight:700,margin:"0 0 3px"}}>🏆 Meet Goal · {c.meet}</p>
          <p style={{color:T.textDim,fontSize:11,margin:0}}>Target Total: {c.total+30}kg · Class: {c.wc}</p>
        </div>
      </Card>
    </div>
  </div>
}
