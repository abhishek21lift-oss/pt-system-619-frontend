import { T } from '../services/designTokens'
import Card from './Card'

export default function KPI({label,value,sub,accent=T.gold,icon,delta}){
  return <Card accent={accent} style={{padding:"20px 22px",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:-22,right:-22,width:88,height:88,borderRadius:"50%",
      background:`radial-gradient(circle,${accent}18 0%,transparent 70%)`,pointerEvents:"none"}}/>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div>
        <p style={{color:T.textDim,fontSize:10,letterSpacing:1.5,textTransform:"uppercase",margin:"0 0 8px",fontWeight:600}}>{label}</p>
        <p style={{color:T.text,fontSize:27,fontWeight:800,lineHeight:1,margin:0,fontFamily:"'Syne',sans-serif"}}>{value}</p>
        {sub&&<p style={{color:accent,fontSize:11,margin:"5px 0 0",fontWeight:500}}>{sub}</p>}
      </div>
      <div style={{width:42,height:42,borderRadius:12,background:`${accent}18`,border:`1px solid ${accent}28`,
        display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{icon}</div>
    </div>
    {delta!==undefined&&<div style={{display:"flex",alignItems:"center",gap:4,marginTop:12}}>
      <span style={{color:delta>=0?T.green:T.red,fontSize:12,fontWeight:700}}>{delta>=0?"▲":"▼"} {Math.abs(delta)}%</span>
      <span style={{color:"#555",fontSize:10}}>vs last month</span>
    </div>}
  </Card>
}
