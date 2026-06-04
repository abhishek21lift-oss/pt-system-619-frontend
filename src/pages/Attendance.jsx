import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { T } from '../services/designTokens'
import { CLIENTS, ATT_DATA, TODAY_PRESENT } from '../data/seed'
import Card from '../components/Card'
import KPI from '../components/KPI'
import SH from '../components/SH'

export default function Attendance(){
  return <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
      <KPI label="Present Today"  value={TODAY_PRESENT.length} sub="of 23 active"   accent={T.green}  icon="✓" delta={5}/>
      <KPI label="Absent Today"   value={23-TODAY_PRESENT.length} sub="Follow up"  accent={T.red}    icon="✗"/>
      <KPI label="Week Average"   value="89%"                sub="This week"       accent={T.gold}   icon="◈"/>
      <KPI label="Best Day"       value="Sat"                sub="100% attendance" accent={T.blue}   icon="★"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:14}}>
      <Card style={{padding:22}}>
        <SH title="Weekly Attendance" sub="Present vs Absent — this week"/>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={ATT_DATA}>
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
        <SH title="Today's Check-ins" sub={`${TODAY_PRESENT.length} present · ${new Date().toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"})}`}/>
        <div style={{maxHeight:295,overflowY:"auto"}}>
          {CLIENTS.map((c,i)=>{
            const here=TODAY_PRESENT.includes(c.id)
            const fakeTime=here?`${6+Math.floor(i%3)}:${(i*7%60).toString().padStart(2,"0")} AM`:null
            return <div key={i} style={{display:"flex",alignItems:"center",gap:10,
              padding:"8px 0",borderBottom:i<CLIENTS.length-1?`1px solid ${T.border}`:"none"}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:here?T.green:T.red,flexShrink:0}}/>
              <div style={{flex:1,minWidth:0}}>
                <p style={{color:here?"#eee":"#555",fontSize:12,fontWeight:here?600:400,
                  margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</p>
              </div>
              <span style={{color:T.textDim,fontSize:10,flexShrink:0}}>{c.trainer.split(" ")[0]}</span>
              {here&&<span style={{color:T.green,fontSize:9,fontWeight:700,flexShrink:0}}>{fakeTime}</span>}
            </div>
          })}
        </div>
      </Card>
    </div>
  </div>
}
