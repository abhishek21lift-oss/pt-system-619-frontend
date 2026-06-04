import { T } from '../services/designTokens'

export default function SH({title,sub,action,onAction}){
  return <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16}}>
    <div>
      <h3 style={{color:T.text,fontSize:15,fontWeight:700,margin:0}}>{title}</h3>
      {sub&&<p style={{color:T.textDim,fontSize:11,margin:"3px 0 0"}}>{sub}</p>}
    </div>
    {action&&<button onClick={onAction} style={{background:T.goldDim,border:`1px solid ${T.borderA}`,
      color:T.gold,borderRadius:8,padding:"5px 12px",fontSize:11,cursor:"pointer",fontWeight:700}}>{action}</button>}
  </div>
}
