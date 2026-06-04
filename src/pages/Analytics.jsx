import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { T } from '../services/designTokens'
import { fmtFull } from '../services/helpers'
import { TRAINERS } from '../data/seed'
import Card from '../components/Card'
import KPI from '../components/KPI'
import SH from '../components/SH'

export default function Analytics(){
  const radarData=[
    {s:"Revenue",AK:100,RS:45,RK:33},{s:"Clients",AK:90,RS:80,RK:60},
    {s:"Retention",AK:85,RS:78,RK:80},{s:"Avg Value",AK:88,RS:60,RK:65},
    {s:"Growth",AK:70,RS:82,RK:90},
  ]
  return <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
      <KPI label="Avg Package Value" value="₹21,600" sub="Per transaction"   accent={T.gold}  icon="₹"/>
      <KPI label="Avg Client LTV"    value="₹27,300" sub="Lifetime value"    accent={T.green} icon="★"/>
      <KPI label="Renewal Rate"      value="78%"     sub="Historical"        accent={T.blue}  icon="🔄" delta={2.1}/>
      <KPI label="Total Discounts"   value="₹3.1L"   sub="Given on deals"    accent={T.red}   icon="⊖"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
      <Card style={{padding:"20px 20px 12px"}}>
        <SH title="Trainer Performance Radar" sub="Comparative KPIs"/>
        <ResponsiveContainer width="100%" height={240}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.07)"/>
            <PolarAngleAxis dataKey="s" tick={{fill:"#888",fontSize:11}}/>
            <Radar name="Abhishek" dataKey="AK" stroke={T.gold}  fill={T.gold}  fillOpacity={0.14}/>
            <Radar name="Riya"     dataKey="RS" stroke={T.red}   fill={T.red}   fillOpacity={0.09}/>
            <Radar name="Rajat"    dataKey="RK" stroke={T.blue}  fill={T.blue}  fillOpacity={0.09}/>
          </RadarChart>
        </ResponsiveContainer>
      </Card>
      <Card style={{padding:22}}>
        <SH title="Revenue Distribution" sub="All-time by trainer"/>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <ResponsiveContainer width="44%" height={180}>
            <PieChart>
              <Pie data={TRAINERS} cx="50%" cy="50%" innerRadius={44} outerRadius={66}
                dataKey="revenue" stroke="none" paddingAngle={4}>
                {TRAINERS.map((t,i)=><Cell key={i} fill={t.color}/>)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{flex:1}}>
            {TRAINERS.map((t,i)=>(
              <div key={i} style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{color:T.textMid,fontSize:12,fontWeight:600}}>{t.name.split(" ")[0]}</span>
                  <span style={{color:t.color,fontSize:12,fontWeight:700}}>{((t.revenue/1828667)*100).toFixed(0)}%</span>
                </div>
                <div style={{height:4,background:"rgba(255,255,255,0.06)",borderRadius:2}}>
                  <div style={{height:"100%",width:`${(t.revenue/1023667)*100}%`,background:t.color,borderRadius:2}}/>
                </div>
                <p style={{color:"#555",fontSize:10,margin:"4px 0 0"}}>{fmtFull(t.revenue)}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
      {[
        {l:"3-Month Pack",v:"43%",s:"Most popular",c:T.gold},
        {l:"Male:Female",v:"77:23",s:"88 M · 26 F",c:T.blue},
        {l:"Avg Days Left",v:"54d",s:"Active clients",c:T.green},
        {l:"Transactions",v:"114",s:"Packages sold",c:T.purple},
        {l:"Peak Month",v:"Mar '26",s:"₹2.1L revenue",c:T.gold},
        {l:"Fastest Growth",v:"Rajat",s:"+90% last 6mo",c:T.blue},
        {l:"Top Client",v:"₹65K",s:"Rashi & Vipul Bhatia",c:T.green},
        {l:"Avg Commission",v:"₹3,750",s:"Per trainer/month",c:T.red},
      ].map((s,i)=>(
        <Card key={i} style={{padding:16}}>
          <p style={{color:T.textDim,fontSize:10,letterSpacing:1,textTransform:"uppercase",margin:"0 0 8px"}}>{s.l}</p>
          <p style={{color:s.c,fontSize:22,fontWeight:800,margin:0,fontFamily:"'Syne',sans-serif"}}>{s.v}</p>
          <p style={{color:"#555",fontSize:10,margin:"4px 0 0"}}>{s.s}</p>
        </Card>
      ))}
    </div>
  </div>
}
