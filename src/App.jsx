import { useState } from 'react'
import { T } from './services/designTokens'
import { CLIENTS } from './data/seed'

import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import TrainersView from './pages/TrainersView'
import Payments from './pages/Payments'
import Analytics from './pages/Analytics'
import CRM from './pages/CRM'
import Programs from './pages/Programs'
import PowerliftingView from './pages/PowerliftingView'
import Attendance from './pages/Attendance'
import AIDiet from './pages/AIDiet'
import AIWorkout from './pages/AIWorkout'
import Settings from './pages/Settings'

const NAV = [
  {id:"dashboard",label:"Dashboard",   icon:"⬡", group:"core"},
  {id:"clients",  label:"Clients",     icon:"◎", group:"core"},
  {id:"trainers", label:"Trainers",    icon:"◈", group:"core"},
  {id:"payments", label:"Payments",    icon:"◇", group:"core"},
  {id:"analytics",label:"Analytics",   icon:"◈", group:"core"},
  {id:"crm",      label:"PT CRM",      icon:"◰", group:"sales"},
  {id:"programs", label:"Programs",    icon:"◫", group:"coaching"},
  {id:"powerlifting",label:"Powerlifting",icon:"🏋", group:"coaching"},
  {id:"attendance",label:"Attendance", icon:"◱", group:"ops"},
  {id:"diet",     label:"AI Diet",     icon:"⊕", group:"ai"},
  {id:"workout",  label:"AI Workout",  icon:"⊗", group:"ai"},
  {id:"settings", label:"Settings",    icon:"◯", group:"ops"},
]

const GROUPS = [
  {label:"CORE",    ids:["dashboard","clients","trainers","payments","analytics"]},
  {label:"SALES",   ids:["crm"]},
  {label:"COACHING",ids:["programs","powerlifting"]},
  {label:"AI",      ids:["diet","workout"]},
  {label:"OPS",     ids:["attendance","settings"]},
]

const TITLES = {
  dashboard:"Command Center",clients:"Client Management",trainers:"Trainer Hub",
  payments:"Payment Center",analytics:"Analytics",crm:"PT Sales CRM",
  programs:"Programs & Plans",powerlifting:"Powerlifting Engine",
  attendance:"Attendance",diet:"AI Diet Generator",workout:"AI Workout Generator",settings:"Settings",
}

const VIEWS = {
  dashboard:<Dashboard/>,clients:<Clients/>,trainers:<TrainersView/>,
  payments:<Payments/>,analytics:<Analytics/>,crm:<CRM/>,
  programs:<Programs/>,powerlifting:<PowerliftingView/>,
  attendance:<Attendance/>,diet:<AIDiet/>,workout:<AIWorkout/>,settings:<Settings/>,
}

export default function App(){
  const [nav,setNav]=useState("dashboard")
  const [sideOpen,setSideOpen]=useState(false)
  const expiringCount=CLIENTS.filter(c=>c.daysLeft<=14).length

  return (
    <div style={{display:"flex",minHeight:"100vh",height:"100vh",background:T.bg,
      fontFamily:"'DM Sans','Syne',system-ui,sans-serif",color:T.text,overflow:"hidden"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px;height:3px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(201,168,76,0.22);border-radius:2px}
        input,select,button{font-family:inherit}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,
        backgroundImage:`linear-gradient(rgba(201,168,76,0.016) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.016) 1px,transparent 1px)`,
        backgroundSize:"44px 44px"}}/>
      <div style={{position:"fixed",top:-220,right:-220,width:700,height:700,
        borderRadius:"50%",background:"radial-gradient(circle,rgba(201,168,76,0.04) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",bottom:-200,left:-200,width:500,height:500,
        borderRadius:"50%",background:"radial-gradient(circle,rgba(92,125,224,0.03) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>

      <div onMouseEnter={()=>setSideOpen(true)} onMouseLeave={()=>setSideOpen(false)}
        style={{width:sideOpen?218:64,minWidth:sideOpen?218:64,
          background:"rgba(255,255,255,0.02)",borderRight:`1px solid ${T.border}`,
          display:"flex",flexDirection:"column",padding:"0 0 20px",
          position:"relative",zIndex:20,
          transition:"width 0.22s cubic-bezier(0.4,0,0.2,1),min-width 0.22s cubic-bezier(0.4,0,0.2,1)",
          overflow:"hidden",backdropFilter:"blur(20px)",flexShrink:0}}>
        <div style={{padding:"18px 12px 16px",borderBottom:`1px solid ${T.border}`,marginBottom:10,
          display:"flex",alignItems:"center",gap:10,overflow:"hidden",flexShrink:0}}>
          <div style={{width:40,height:40,borderRadius:11,flexShrink:0,
            background:"linear-gradient(135deg,#c9a84c,#7a5210)",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:17,fontWeight:900,color:"#06060f",
            boxShadow:"0 4px 18px rgba(201,168,76,0.42)",fontFamily:"'Syne',sans-serif"}}>6</div>
          {sideOpen&&<div style={{overflow:"hidden",whiteSpace:"nowrap"}}>
            <p style={{color:T.text,fontSize:13,fontWeight:800,margin:0,letterSpacing:0.4,fontFamily:"'Syne',sans-serif"}}>619 FITNESS</p>
            <p style={{color:T.gold,fontSize:9,margin:0,letterSpacing:2,fontWeight:700}}>ENTERPRISE OS</p>
          </div>}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"0 8px"}}>
          {GROUPS.map((g,gi)=>(
            <div key={gi} style={{marginBottom:4}}>
              {sideOpen&&<p style={{color:"#2e2e2e",fontSize:9,letterSpacing:2,fontWeight:700,
                padding:"8px 8px 4px",margin:0,textTransform:"uppercase"}}>{g.label}</p>}
              {g.ids.map(id=>{
                const item=NAV.find(n=>n.id===id)
                if(!item) return null
                return <button key={id} onClick={()=>setNav(id)} style={{
                  width:"100%",display:"flex",alignItems:"center",gap:10,
                  padding:"9px 10px",borderRadius:9,marginBottom:2,
                  background:nav===id?T.goldDim:"transparent",
                  border:`1px solid ${nav===id?T.borderA:"transparent"}`,
                  color:nav===id?T.gold:T.textDim,cursor:"pointer",
                  textAlign:"left",transition:"all 0.12s",overflow:"hidden",whiteSpace:"nowrap"}}
                  onMouseEnter={e=>{if(nav!==id){e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.color=T.textMid}}}
                  onMouseLeave={e=>{if(nav!==id){e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.textDim}}}>
                  <span style={{fontSize:16,flexShrink:0,width:20,textAlign:"center",lineHeight:1}}>{item.icon}</span>
                  {sideOpen&&<span style={{fontSize:12,fontWeight:nav===id?700:500,letterSpacing:0.2,flex:1}}>{item.label}</span>}
                  {sideOpen&&(id==="diet"||id==="workout")&&
                    <span style={{background:`${T.purple}20`,border:`1px solid ${T.purple}30`,color:T.purple,
                      borderRadius:4,padding:"1px 5px",fontSize:9,fontWeight:800,letterSpacing:0.5}}>AI</span>}
                  {nav===id&&sideOpen&&<span style={{width:5,height:5,borderRadius:"50%",background:T.gold,flexShrink:0}}/>}
                </button>
              })}
            </div>
          ))}
        </div>
        {sideOpen&&<div style={{margin:"10px 8px 0",padding:"12px 14px",
          background:T.goldDim,border:`1px solid ${T.borderA}`,borderRadius:11,whiteSpace:"nowrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:30,height:30,borderRadius:7,flexShrink:0,
              background:"linear-gradient(135deg,rgba(201,168,76,0.4),rgba(201,168,76,0.14))",
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:T.gold}}>A</div>
            <div>
              <p style={{color:T.text,fontSize:11,fontWeight:700,margin:0}}>Abhishek Katiyar</p>
              <p style={{color:T.gold,fontSize:9,margin:0,letterSpacing:0.8}}>ADMIN · HEAD TRAINER</p>
            </div>
          </div>
        </div>}
      </div>

      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",position:"relative",zIndex:1}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",
          padding:"14px 26px",borderBottom:`1px solid ${T.border}`,
          background:"rgba(6,6,15,0.88)",backdropFilter:"blur(20px)",flexShrink:0}}>
          <div>
            <h1 style={{color:T.text,fontSize:19,fontWeight:800,margin:0,fontFamily:"'Syne',sans-serif"}}>{TITLES[nav]}</h1>
            <p style={{color:"#3a3a3a",fontSize:10,margin:"3px 0 0",letterSpacing:0.4}}>
              619 Fitness Studio · Jaipur, Rajasthan ·{" "}
              {new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}
            </p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:5,background:`${T.green}10`,
              border:`1px solid ${T.green}24`,borderRadius:8,padding:"5px 12px"}}>
              <span style={{width:5,height:5,borderRadius:"50%",background:T.green,display:"inline-block"}}/>
              <span style={{color:T.green,fontSize:11,fontWeight:700}}>23 Active</span>
            </div>
            <div style={{background:"rgba(255,255,255,0.04)",border:`1px solid ${T.border}`,
              borderRadius:8,padding:"5px 12px",color:T.textDim,fontSize:11,cursor:"pointer",
              display:"flex",alignItems:"center",gap:6}}>
              <span>🔔</span>
              {expiringCount>0&&<span style={{background:T.red,borderRadius:"50%",width:17,height:17,
                display:"inline-flex",alignItems:"center",justifyContent:"center",
                fontSize:9,fontWeight:800,color:"#fff"}}>{expiringCount}</span>}
            </div>
            <div style={{background:"rgba(255,255,255,0.04)",border:`1px solid ${T.border}`,
              borderRadius:8,padding:"5px 12px",color:T.textDim,fontSize:11,cursor:"pointer"}}>⌘ Search</div>
            <div style={{width:34,height:34,borderRadius:9,background:T.goldDim,border:`1px solid ${T.borderA}`,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:13,fontWeight:900,color:T.gold,cursor:"pointer",flexShrink:0}}>A</div>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"22px 26px"}}>{VIEWS[nav]||null}</div>
      </div>
    </div>
  )
}
