import { useState, useEffect } from 'react'
import { T } from '../services/designTokens'
import { fmt } from '../services/helpers'
import { api } from '../services/api'
import Card from '../components/Card'
import KPI from '../components/KPI'

const CRM_STAGES = ['Lead', 'Contacted', 'Trial Session', 'Consultation', 'Proposal Sent', 'Converted']

export default function CRM(){
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [dragging, setDragging] = useState(null)
  const [hoverCol, setHoverCol] = useState(null)

  useEffect(() => {
    api.crm.list({ limit: 100 })
      .then(res => setLeads(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleDrop = async (stage) => {
    if (!dragging) return
    const prev = leads
    setLeads(ls => ls.map(l => l.id === dragging.id ? { ...l, stage } : l))
    setDragging(null)
    setHoverCol(null)
    try {
      await api.crm.updateStage(dragging.id, stage)
    } catch {
      setLeads(prev)
    }
  }

  const sColor = s => {
    const m = { Lead: T.textDim, Contacted: T.blue, 'Trial Session': T.purple,
      Consultation: T.gold, 'Proposal Sent': T.orange, Converted: T.green }
    return m[s] || T.textDim
  }

  if (loading) return <div style={{padding:40,color:T.textDim}}>Loading CRM…</div>

  const convRate = leads.length > 0
    ? ((leads.filter(l => l.stage === 'Converted').length / leads.length) * 100).toFixed(0)
    : '0'
  const totalPipe = leads.reduce((a, l) => a + l.value, 0)

  return <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
      <KPI label="Pipeline Leads"  value={leads.length}         sub="Total active"      accent={T.blue}   icon="◰"/>
      <KPI label="Pipeline Value"  value={fmt(totalPipe)}        sub="Potential revenue"  accent={T.gold}   icon="₹"/>
      <KPI label="Conversion Rate" value={`${convRate}%`}        sub="Lead to client"    accent={T.green}  icon="✓"/>
      <KPI label="Avg Lead Value"  value={leads.length>0?fmt(Math.round(totalPipe/leads.length)):'—'} sub="Per lead" accent={T.purple} icon="◈"/>
    </div>
    <div style={{overflowX:"auto"}}>
      <div style={{display:"flex",gap:10,minWidth:860,paddingBottom:8}}>
        {CRM_STAGES.map(stage => {
          const sc = sColor(stage)
          const stageLeads = leads.filter(l => l.stage === stage)
          const stageVal = stageLeads.reduce((a, l) => a + l.value, 0)
          return <div key={stage} style={{flex:1,minWidth:138}}
            onDragOver={e => { e.preventDefault(); setHoverCol(stage) }}
            onDrop={() => handleDrop(stage)}
            onDragLeave={() => setHoverCol(null)}>
            <div style={{padding:"10px 12px",borderRadius:"10px 10px 0 0",
              background: hoverCol === stage ? `${sc}18` : T.surface,
              border: `1px solid ${hoverCol === stage ? sc + '44' : T.border}`, borderBottom: "none"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:sc}}/>
                  <span style={{color:T.textMid,fontSize:11,fontWeight:700}}>{stage}</span>
                </div>
                <span style={{background:`${sc}18`,border:`1px solid ${sc}28`,color:sc,
                  borderRadius:5,padding:"1px 6px",fontSize:10,fontWeight:800}}>{stageLeads.length}</span>
              </div>
              {stageLeads.length > 0 && <p style={{color:"#555",fontSize:9,margin:0}}>{fmt(stageVal)} potential</p>}
            </div>
            <div style={{background: hoverCol === stage ? `${sc}06` : T.surface,
              border: `1px solid ${hoverCol === stage ? sc + '33' : T.border}`,
              borderTop: "none", borderRadius: "0 0 10px 10px", padding: 8, minHeight: 190, transition: "all 0.15s"}}>
              {stageLeads.map((l, i) => (
                <div key={l.id || i} draggable onDragStart={() => setDragging(l)}
                  style={{background:"rgba(255,255,255,0.04)",border:`1px solid ${T.border}`,
                    borderRadius:10,padding:"10px 12px",marginBottom:8,cursor:"grab"}}
                  onMouseEnter={e => e.currentTarget.style.border = `1px solid ${sc}44`}
                  onMouseLeave={e => e.currentTarget.style.border = `1px solid ${T.border}`}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
                    <p style={{color:"#eee",fontSize:12,fontWeight:700,margin:0,lineHeight:1.2}}>{l.name}</p>
                    <span style={{color:sc,fontSize:9,fontWeight:700,background:`${sc}18`,
                      borderRadius:4,padding:"2px 5px",letterSpacing:0.4,whiteSpace:"nowrap",marginLeft:4}}>{fmt(l.value)}</span>
                  </div>
                  <p style={{color:T.textDim,fontSize:10,margin:"0 0 5px"}}>{l.trainer?.split(" ")[0]} · {l.source}</p>
                  {l.days > 0 && <p style={{color:l.days >= 10 ? T.red : T.orange,fontSize:9,margin:0,fontWeight:600}}>⏱ {l.days}d no contact</p>}
                  {l.stage === "Converted" && <p style={{color:T.green,fontSize:9,margin:0,fontWeight:700}}>✓ Active PT Client</p>}
                </div>
              ))}
            </div>
          </div>
        })}
      </div>
    </div>
    <p style={{color:"#444",fontSize:11,textAlign:"center",marginTop:8}}>Drag cards to update pipeline stage</p>
  </div>
}
