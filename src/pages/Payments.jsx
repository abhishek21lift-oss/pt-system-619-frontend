import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { T } from '../services/designTokens'
import { fmt, fmtFull } from '../services/helpers'
import { api } from '../services/api'
import Card from '../components/Card'
import KPI from '../components/KPI'
import SH from '../components/SH'
import Badge from '../components/Badge'
import Tip from '../components/Tip'

export default function Payments(){
  const [clients, setClients] = useState([])
  const [revenue, setRevenue] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.clients.list({ limit: 200 }),
      api.revenue.list({ limit: 60 }),
    ]).then(([cl, rv]) => {
      setClients(cl.data)
      setRevenue(rv.data)
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={{padding:40,color:T.textDim}}>Loading payments…</div>

  const dues = clients.filter(c=>c.bal>0)
  const totalDues = dues.reduce((a,c)=>a+c.bal,0)
  const totalCollected = revenue.reduce((a,r)=>a+r.total,0)
  const thisMonth = revenue.length>0 ? revenue[revenue.length-1] : null
  const commissionPool = Math.round(totalCollected * 0.5)

  return <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
      <KPI label="Total Collected" value={fmtFull(totalCollected)} sub="All time" accent={T.gold} icon="₹"/>
      <KPI label={thisMonth?.month||"This Month"} value={thisMonth?fmtFull(thisMonth.total):"—"} sub="Current month" accent={T.green} icon="📈" delta={0.6}/>
      <KPI label="Outstanding" value={fmt(totalDues)} sub={`${dues.length} clients`} accent={T.red} icon="⚠"/>
      <KPI label="Commission Pool" value={fmtFull(commissionPool)} sub="50% split" accent={T.purple} icon="◈"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:14}}>
      <Card style={{padding:22}}>
        <SH title="Outstanding Balances" sub="Clients with pending payments" action="Send All Reminders"/>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr>{["Client","ID","Trainer","Balance","Status","Action"].map(h=>(
              <th key={h} style={{color:T.textDim,fontSize:10,letterSpacing:1,textTransform:"uppercase",
                padding:"8px 0",textAlign:"left",borderBottom:`1px solid ${T.border}`}}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {dues.map((c,i)=>(
              <tr key={c.id||i}>
                <td style={{padding:"11px 0",borderBottom:`1px solid rgba(255,255,255,0.04)`}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:30,height:30,borderRadius:8,background:`${T.red}12`,border:`1px solid ${T.red}22`,
                      display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:T.red,fontWeight:800,flexShrink:0}}>
                      {c.name[0]}
                    </div>
                    <span style={{color:"#eee",fontSize:12,fontWeight:600}}>{c.name}</span>
                  </div>
                </td>
                <td style={{color:T.textDim,fontSize:11,padding:"11px 8px 11px 0",borderBottom:`1px solid rgba(255,255,255,0.04)`}}>{c.client_code||c.id?.slice(0,8)}</td>
                <td style={{color:T.textDim,fontSize:11,padding:"11px 8px 11px 0",borderBottom:`1px solid rgba(255,255,255,0.04)`}}>{c.trainer?.split(" ")[0]}</td>
                <td style={{color:T.red,fontSize:13,fontWeight:700,padding:"11px 8px 11px 0",borderBottom:`1px solid rgba(255,255,255,0.04)`}}>{fmtFull(c.bal)}</td>
                <td style={{padding:"11px 8px 11px 0",borderBottom:`1px solid rgba(255,255,255,0.04)`}}>
                  <Badge label={c.days_left>0?"Active":"Expired"} color={c.days_left>0?T.green:T.red}/>
                </td>
                <td style={{padding:"11px 0",borderBottom:`1px solid rgba(255,255,255,0.04)`}}>
                  <button style={{background:T.goldDim,border:`1px solid ${T.borderA}`,color:T.gold,
                    borderRadius:6,padding:"4px 10px",fontSize:10,cursor:"pointer",fontWeight:700}}>📱 Remind</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card style={{padding:"20px 20px 12px"}}>
        <SH title="Monthly Revenue" sub="Collected each month"/>
        <ResponsiveContainer width="100%" height={285}>
          <BarChart data={revenue.slice(1)}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
            <XAxis dataKey="month" tick={{fill:"#666",fontSize:9}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:"#666",fontSize:9}} axisLine={false} tickLine={false} tickFormatter={v=>fmt(v)}/>
            <Tooltip content={<Tip/>}/>
            <Bar dataKey="total" name="Revenue" radius={[5,5,0,0]} maxBarSize={26}>
              {revenue.slice(1).map((_,i)=>(
                <Cell key={i} fill={`rgba(201,168,76,${0.22+(i/12)*0.78})`}/>
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  </div>
}
