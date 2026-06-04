import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { T } from '../services/designTokens'
import { api } from '../services/api'
import Card from '../components/Card'
import KPI from '../components/KPI'
import SH from '../components/SH'

export default function Attendance(){
  const [attData, setAttData] = useState([])
  const [clients, setClients] = useState([])
  const [presentIds, setPresentIds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.attendance.list({ limit: 50 }),
      api.clients.list({ limit: 200 }),
    ]).then(([att, cl]) => {
      setAttData(att.data)
      setClients(cl.data)
      const todayAtt = att.data.find(a => {
        const d = new Date()
        const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        return a.day === dayNames[d.getDay()]
      })
      setPresentIds(todayAtt ? Array.from({ length: todayAtt.present }, (_, i) => i) : [])
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={{padding:40,color:T.textDim}}>Loading attendance…</div>

  const totalActive = clients.length
  const weekAvg = attData.length > 0
    ? Math.round(attData.reduce((a,d)=>a+d.present,0) / attData.length / totalActive * 100)
    : 0
  const bestDay = attData.length > 0
    ? attData.reduce((a,b)=>a.present>b.present?a:b)
    : null

  return <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
      <KPI label="Present Today"  value={presentIds.length} sub={`of ${totalActive} active`}   accent={T.green}  icon="✓" delta={5}/>
      <KPI label="Absent Today"   value={totalActive - presentIds.length} sub="Follow up"  accent={T.red}    icon="✗"/>
      <KPI label="Week Average"   value={`${weekAvg}%`} sub="This week"       accent={T.gold}   icon="◈"/>
      <KPI label="Best Day"       value={bestDay?.day||"—"} sub={bestDay?`${bestDay.present} present`:""} accent={T.blue} icon="★"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:14}}>
      <Card style={{padding:22}}>
        <SH title="Weekly Attendance" sub="Present vs Absent — this week"/>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={attData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
            <XAxis dataKey="day" tick={{fill:"#888",fontSize:11}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:"#666",fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={{background:"rgba(6,6,15,0.97)",border:`1px solid ${T.borderA}`,borderRadius:8,fontSize:12}}/>
            <Bar dataKey="present" name="Present" fill={T.green}        radius={[5,5,0,0]} maxBarSize={30} stackId="a"/>
            <Bar dataKey="absent"  name="Absent"  fill={`${T.red}44`}   radius={[5,5,0,0]} maxBarSize={30} stackId="a"/>
          </BarChart>
        </ResponsiveContainer>
        <div style={{display:"flex",gap:16,marginTop:10,justifyContent:"center"}}>
          {[{c:T.green,l:"Present"},{c:`${T.red}88`,l:"Absent"}].map((g,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:5}}>
              <div style={{width:8,height:8,borderRadius:2,background:g.c}}/>
              <span style={{color:T.textDim,fontSize:11}}>{g.l}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card style={{padding:22}}>
        <SH title="Today's Check-ins" sub={`${presentIds.length} present · ${new Date().toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"})}`}/>
        <div style={{maxHeight:295,overflowY:"auto"}}>
          {clients.map((c,i)=>{
            const here = presentIds.includes(i)
            const fakeTime = here ? `${6+Math.floor(i%3)}:${(i*7%60).toString().padStart(2,"0")} AM` : null
            return <div key={c.id||i} style={{display:"flex",alignItems:"center",gap:10,
              padding:"8px 0",borderBottom:i<clients.length-1?`1px solid ${T.border}`:"none"}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:here?T.green:T.red,flexShrink:0}}/>
              <div style={{flex:1,minWidth:0}}>
                <p style={{color:here?"#eee":"#555",fontSize:12,fontWeight:here?600:400,
                  margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</p>
              </div>
              <span style={{color:T.textDim,fontSize:10,flexShrink:0}}>{c.trainer?.split(" ")[0]}</span>
              {here&&<span style={{color:T.green,fontSize:9,fontWeight:700,flexShrink:0}}>{fakeTime}</span>}
            </div>
          })}
        </div>
      </Card>
    </div>
  </div>
}
