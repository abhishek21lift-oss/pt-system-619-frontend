import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { T } from '../services/designTokens'
import { fmt } from '../services/helpers'
import { TRAINERS, CLIENTS, MONTHLY_REVENUE } from '../data/seed'
import Card from '../components/Card'
import SH from '../components/SH'
import Tip from '../components/Tip'

export default function TrainersView(){
  return <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:20}}>
      {TRAINERS.map((t,i)=>(
        <Card key={i} accent={t.color} style={{padding:22}}>
          <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:18}}>
            <div style={{width:54,height:54,borderRadius:14,background:`linear-gradient(135deg,${t.color}30,${t.color}0e)`,
              border:`2px solid ${t.color}44`,display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:17,fontWeight:900,color:t.color,flexShrink:0}}>{t.initials}</div>
            <div>
              <p style={{color:T.text,fontSize:15,fontWeight:800,margin:0}}>{t.name}</p>
              <p style={{color:t.color,fontSize:10,margin:"3px 0 0",fontWeight:600}}>{t.specialty}</p>
              <div style={{display:"flex",gap:2,marginTop:4}}>
                {"★★★★★".split("").map((_,j)=>(
                  <span key={j} style={{color:j<Math.floor(t.rating)?T.gold:"#2a2a2a",fontSize:12}}>★</span>
                ))}
                <span style={{color:T.textDim,fontSize:10,marginLeft:3}}>{t.rating}</span>
              </div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
            {[
              {l:"Clients",v:t.clients},
              {l:"Revenue",v:fmt(t.revenue)},
              {l:"Commission",v:fmt(t.commission)},
              {l:"Avg/Client",v:fmt(Math.round(t.revenue/t.clients))},
            ].map((s,j)=>(
              <div key={j} style={{background:`${t.color}0a`,border:`1px solid ${t.color}1a`,borderRadius:9,padding:10}}>
                <p style={{color:T.textDim,fontSize:9,letterSpacing:0.5,margin:0}}>{s.l}</p>
                <p style={{color:t.color,fontSize:16,fontWeight:800,margin:"4px 0 0"}}>{s.v}</p>
              </div>
            ))}
          </div>
          <p style={{color:T.textDim,fontSize:10,letterSpacing:1,textTransform:"uppercase",margin:"0 0 8px"}}>Active Roster</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
            {CLIENTS.filter(c=>c.trainer===t.name).map((c,j)=>(
              <span key={j} style={{background:`${t.color}10`,border:`1px solid ${t.color}20`,
                borderRadius:5,padding:"3px 8px",color:T.textMid,fontSize:10}}>{c.name.split(" ")[0]}</span>
            ))}
          </div>
        </Card>
      ))}
    </div>
    <Card style={{padding:"20px 20px 12px"}}>
      <SH title="Monthly Revenue by Trainer" sub="Apr 2025 – Mar 2026"/>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={MONTHLY_REVENUE} barGap={3}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
          <XAxis dataKey="month" tick={{fill:"#666",fontSize:10}} axisLine={false} tickLine={false}/>
          <YAxis tick={{fill:"#666",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>fmt(v)}/>
          <Tooltip content={<Tip/>}/>
          <Bar dataKey="abhishek" name="Abhishek" fill={T.gold}  radius={[4,4,0,0]} maxBarSize={18}/>
          <Bar dataKey="riya"     name="Riya"     fill={T.red}   radius={[4,4,0,0]} maxBarSize={18}/>
          <Bar dataKey="rajat"    name="Rajat"    fill={T.blue}  radius={[4,4,0,0]} maxBarSize={18}/>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  </div>
}
