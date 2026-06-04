import { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { T } from '../services/designTokens'
import { fmt, fmtFull } from '../services/helpers'
import { api } from '../services/api'
import Card from '../components/Card'
import KPI from '../components/KPI'
import SH from '../components/SH'
import Tip from '../components/Tip'

export default function Dashboard(){
  const [clients, setClients] = useState([])
  const [revenue, setRevenue] = useState([])
  const [trainers, setTrainers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.clients.list({ limit: 100 }),
      api.revenue.list({ limit: 60 }),
      api.trainers.list({ limit: 10 }),
    ]).then(([cl, rv, tr]) => {
      setClients(cl.data)
      setRevenue(rv.data)
      setTrainers(tr.data)
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={{padding:40,color:T.textDim}}>Loading dashboard…</div>

  const dues = clients.filter(c => c.bal > 0)
  const totalDues = dues.reduce((a,c) => a + c.bal, 0)
  const expiring = clients.filter(c => c.days_left <= 20).sort((a,b) => a.days_left - b.days_left)
  const totalRev = revenue.reduce((a,r) => a + r.total, 0)
  const thisMonth = revenue.length > 0 ? revenue[revenue.length - 1] : null

  const grow = clients.length > 0 ? [
    {m:"Jun",c:3},{m:"Jul",c:5},{m:"Aug",c:8},{m:"Sep",c:14},{m:"Oct",c:21},
    {m:"Nov",c:29},{m:"Dec",c:38},{m:"Jan",c:48},{m:"Feb",c:56},{m:"Mar",c:clients.length},
  ] : []

  const pkgDist = [
    {n:"1 Month",v:53,c:T.gold},{n:"3 Months",v:49,c:T.blue},
    {n:"2 Months",v:5,c:T.red},{n:"4 Months",v:5,c:T.green},{n:"12 Months",v:2,c:T.purple},
  ]

  const male = clients.filter(c => c.gender === 'M').length
  const female = clients.filter(c => c.gender === 'F').length

  return <div style={{paddingBottom:40}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:12}}>
      <KPI label="Total Revenue"   value={fmtFull(totalRev)} sub="All-time collected"   accent={T.gold}   icon="₹"  delta={3.4}/>
      <KPI label={thisMonth?.month||"This Month"} value={thisMonth ? fmtFull(thisMonth.total) : "—"} sub="Current month" accent={T.blue} icon="📈" delta={0.6}/>
      <KPI label="Active Clients"  value={clients.length} sub={`Across ${trainers.length} trainers`} accent={T.green} icon="◎" delta={4.5}/>
      <KPI label="Expiring ≤20d"   value={expiring.length} sub="Need renewal call" accent={T.orange} icon="⏳"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
      <KPI label="Outstanding Dues" value={fmt(totalDues)} sub={`${dues.length} clients`} accent={T.red}    icon="⚠"/>
      <KPI label="Total Clients"    value={clients.length} sub="All time" accent={T.purple} icon="◈"/>
      <KPI label="Trainers"         value={trainers.length} sub={trainers.map(t=>t.initials).join(' · ')} accent={T.blue} icon="◈"/>
      <KPI label="Retention"        value="78%"  sub="Renewal history"  accent={T.green}  icon="🔄" delta={2.1}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:14,marginBottom:14}}>
      <Card style={{padding:"20px 20px 12px"}}>
        <SH title="Monthly Revenue Trend" sub="All trainers" action="CSV"/>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={revenue}>
            <defs>
              <linearGradient id="gTot" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={T.gold} stopOpacity={0.28}/><stop offset="100%" stopColor={T.gold} stopOpacity={0}/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
            <XAxis dataKey="month" tick={{fill:"#666",fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:"#666",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>fmt(v)}/>
            <Tooltip content={<Tip/>}/>
            <Area type="monotone" dataKey="total"    name="Total"    stroke={T.gold}  fill="url(#gTot)" strokeWidth={2.5} dot={false}/>
            {trainers.map((t,i)=>{
              const cols=[T.blue,T.red,T.green,T.purple,T.orange]
              return <Area key={t.id} type="monotone" dataKey={t.name.toLowerCase().split(' ')[0]} name={t.name.split(' ')[0]} stroke={cols[i%5]} fill="none" strokeWidth={1.5} dot={false} strokeDasharray="5 3"/>
            })}
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      <Card style={{padding:20}}>
        <SH title="Client Growth" sub="Cumulative PT clients"/>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={grow}>
            <defs><linearGradient id="gGrow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={T.green} stopOpacity={0.22}/><stop offset="100%" stopColor={T.green} stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
            <XAxis dataKey="m" tick={{fill:"#666",fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:"#666",fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={{background:"rgba(6,6,15,0.97)",border:`1px solid ${T.green}44`,borderRadius:8,fontSize:12}}/>
            <Area type="monotone" dataKey="c" name="Clients" stroke={T.green} fill="url(#gGrow)" strokeWidth={2.5} dot={{fill:T.green,r:3}}/>
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
      <Card style={{padding:20}}>
        <SH title="⏳ Expiring Soon" sub="≤20 days remaining" action="Notify All"/>
        <div style={{maxHeight:270,overflowY:"auto"}}>
          {expiring.map((c,i)=>{
            const ug=c.days_left<=7?T.red:c.days_left<=14?T.orange:T.gold
            return <div key={c.id||i} style={{display:"flex",alignItems:"center",gap:10,
              padding:"9px 0",borderBottom:i<expiring.length-1?`1px solid ${T.border}`:"none"}}>
              <div style={{width:34,height:34,borderRadius:9,background:`${ug}18`,border:`1px solid ${ug}30`,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:ug,fontWeight:800,flexShrink:0}}>{c.name[0]}</div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{color:"#eee",fontSize:12,fontWeight:600,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</p>
                <p style={{color:T.textDim,fontSize:10,margin:"2px 0 0"}}>{c.trainer?.split(" ")[0]} · {c.pkg}</p>
              </div>
              <div style={{background:`${ug}18`,border:`1px solid ${ug}30`,borderRadius:6,padding:"3px 8px",flexShrink:0}}>
                <p style={{color:ug,fontSize:11,fontWeight:800,margin:0}}>{c.days_left}d</p>
              </div>
            </div>
          })}
        </div>
      </Card>
      <Card style={{padding:20}}>
        <SH title="⚠ Pending Dues" sub={`Total: ${fmtFull(totalDues)}`}/>
        <div style={{maxHeight:270,overflowY:"auto"}}>
          {dues.map((c,i)=>(
            <div key={c.id||i} style={{display:"flex",alignItems:"center",gap:10,
              padding:"9px 0",borderBottom:i<dues.length-1?`1px solid ${T.border}`:"none"}}>
              <div style={{width:34,height:34,borderRadius:9,background:`${T.red}12`,border:`1px solid ${T.red}28`,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:T.red,fontWeight:800,flexShrink:0}}>{c.name[0]}</div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{color:"#eee",fontSize:12,fontWeight:600,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</p>
                <p style={{color:T.textDim,fontSize:10,margin:"2px 0 0"}}>{c.trainer?.split(" ")[0]}</p>
              </div>
              <p style={{color:T.red,fontSize:12,fontWeight:700,margin:0,flexShrink:0}}>{fmt(c.bal)}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card style={{padding:20}}>
        <SH title="Package Split" sub={`${clients.length} total transactions`}/>
        {pkgDist.map((p,i)=>(
          <div key={i} style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{color:T.textMid,fontSize:11}}>{p.n}</span>
              <span style={{color:p.c,fontSize:11,fontWeight:700}}>{p.v}</span>
            </div>
            <div style={{height:4,background:"rgba(255,255,255,0.06)",borderRadius:2,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${(p.v/53)*100}%`,background:p.c,borderRadius:2}}/>
            </div>
          </div>
        ))}
        <div style={{marginTop:14,paddingTop:12,borderTop:`1px solid ${T.border}`}}>
          <p style={{color:T.textDim,fontSize:10,letterSpacing:1,textTransform:"uppercase",margin:"0 0 8px"}}>Gender Split</p>
          <div style={{display:"flex",gap:8}}>
            {[{n:"Male",v:male||88,c:T.blue},{n:"Female",v:female||26,c:T.red}].map((g,i)=>(
              <div key={i} style={{flex:1,padding:"10px",background:`${g.c}0e`,border:`1px solid ${g.c}22`,borderRadius:9,textAlign:"center"}}>
                <p style={{color:g.c,fontSize:22,fontWeight:800,margin:0}}>{g.v}</p>
                <p style={{color:T.textDim,fontSize:10,margin:"3px 0 0"}}>{g.n}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  </div>
}
