import { useState, useEffect } from 'react'
import { T } from '../services/designTokens'
import { fmtFull } from '../services/helpers'
import { api } from '../services/api'

export default function Clients() {
  const [clients, setClients] = useState([])
  const [search, setSearch] = useState('')
  const [filt, setFilt] = useState('all')
  const [sel, setSel] = useState(null)

  useEffect(() => {
    api.clients.list({ limit: 200 }).then(r => {
      if (r.data) setClients(r.data)
    }).catch(() => {})
  }, [])

  const filtered = clients.filter(c => {
    const ms = c.name.toLowerCase().includes(search.toLowerCase()) || (c.client_code || c.id || '').toLowerCase().includes(search.toLowerCase())
    if (filt === 'AK') return ms && c.trainer?.includes('Abhishek')
    if (filt === 'RS') return ms && c.trainer?.includes('Riya')
    if (filt === 'RK') return ms && c.trainer?.includes('Rajat')
    if (filt === 'exp') return ms && c.days_left <= 20
    if (filt === 'dues') return ms && c.bal > 0
    return ms
  })
  const selC = sel ? clients.find(c => c.id === sel || c.client_code === sel) : null
  const tc = t => t?.includes('Abhishek') ? T.gold : t?.includes('Riya') ? T.red : T.blue

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search by name or ID…"
          style={{
            background: 'rgba(255,255,255,0.04)', border: `1px solid ${T.border}`, borderRadius: 10,
            padding: '8px 14px', color: T.textMid, fontSize: 13, outline: 'none', flex: 1, minWidth: 180,
          }} />
        {[{ k: 'all', l: `All (${clients.length})` }, { k: 'AK', l: 'Abhishek' }, { k: 'RS', l: 'Riya' }, { k: 'RK', l: 'Rajat' },
          { k: 'exp', l: '⏳ Expiring' }, { k: 'dues', l: '⚠ Dues' }].map(f => (
            <button key={f.k} onClick={() => setFilt(f.k)} style={{
              background: filt === f.k ? T.goldDim : 'rgba(255,255,255,0.04)',
              border: `1px solid ${filt === f.k ? T.borderA : T.border}`,
              color: filt === f.k ? T.gold : T.textDim,
              borderRadius: 8, padding: '7px 14px', fontSize: 11, cursor: 'pointer', fontWeight: 700,
            }}>
              {f.l}
            </button>
          ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: selC ? '1fr 355px' : '1fr', gap: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(255px,1fr))', gap: 10 }}>
          {filtered.map((c, i) => {
            const tCol = tc(c.trainer)
            const ug = c.days_left <= 7 ? T.red : c.days_left <= 14 ? T.orange : c.days_left <= 30 ? T.gold : T.green
            const cid = c.client_code || c.id
            return (
              <div key={cid || i} onClick={() => setSel(sel === cid ? null : cid)}
                style={{
                  background: sel === cid ? `${T.gold}0d` : T.surface,
                  border: `1px solid ${sel === cid ? T.borderA : T.border}`, borderRadius: 14,
                  padding: 16, cursor: 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (sel !== cid) e.currentTarget.style.border = '1px solid rgba(255,255,255,0.14)' }}
                onMouseLeave={e => { if (sel !== cid) e.currentTarget.style.border = `1px solid ${T.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 11, background: `${tCol}18`, border: `1px solid ${tCol}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: tCol, flexShrink: 0 }}>
                      {c.name[0]}
                    </div>
                    <div>
                      <p style={{ color: '#eee', fontSize: 13, fontWeight: 700, margin: 0 }}>{c.name}</p>
                      <p style={{ color: T.textDim, fontSize: 10, margin: '2px 0 0' }}>{cid}</p>
                    </div>
                  </div>
                  <div style={{ background: `${ug}18`, border: `1px solid ${ug}30`, borderRadius: 6, padding: '3px 8px', flexShrink: 0 }}>
                    <p style={{ color: ug, fontSize: 11, fontWeight: 800, margin: 0 }}>{c.days_left}d</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div><p style={{ color: T.textDim, fontSize: 10, margin: 0 }}>Trainer</p><p style={{ color: tCol, fontSize: 11, fontWeight: 700, margin: '2px 0 0' }}>{c.trainer?.split(' ')[0]}</p></div>
                  <div><p style={{ color: T.textDim, fontSize: 10, margin: 0 }}>Package</p><p style={{ color: T.textMid, fontSize: 11, fontWeight: 600, margin: '2px 0 0' }}>{c.pkg}</p></div>
                  <div><p style={{ color: T.textDim, fontSize: 10, margin: 0 }}>Goal</p><p style={{ color: T.textMid, fontSize: 11, fontWeight: 600, margin: '2px 0 0' }}>{c.goal}</p></div>
                </div>
                {c.bal > 0 && <div style={{ marginTop: 10, padding: '6px 10px', background: `${T.red}0a`, border: `1px solid ${T.red}18`, borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: T.red, fontSize: 10, fontWeight: 700 }}>⚠ Balance</span>
                  <span style={{ color: T.red, fontSize: 11, fontWeight: 700 }}>{fmtFull(c.bal)}</span>
                </div>}
              </div>
            )
          })}
        </div>
        {selC && <div style={{ background: `rgba(201,168,76,0.06)`, border: `1px solid ${T.borderA}`, borderRadius: 16, padding: 24, height: 'fit-content', position: 'sticky', top: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ color: T.text, fontSize: 15, fontWeight: 800, margin: 0 }}>Client Profile</h3>
            <button onClick={() => setSel(null)} style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${T.border}`, color: '#888', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', fontSize: 14 }}>×</button>
          </div>
          <div style={{ width: 64, height: 64, borderRadius: 16, margin: '0 auto 14px', background: `linear-gradient(135deg,${T.gold}44,${T.gold}18)`, border: `2px solid ${T.borderA}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 900, color: T.gold }}>
            {selC.name[0]}
          </div>
          <p style={{ color: T.text, fontSize: 17, fontWeight: 800, textAlign: 'center', margin: '0 0 3px' }}>{selC.name}</p>
          <p style={{ color: T.textDim, fontSize: 11, textAlign: 'center', margin: '0 0 20px' }}>{selC.client_code || selC.id}</p>
          {[
            { l: 'Trainer', v: selC.trainer, col: tc(selC.trainer) },
            { l: 'Package', v: selC.pkg, col: T.textMid },
            { l: 'Days Left', v: `${selC.days_left} days`, col: selC.days_left <= 14 ? T.orange : T.green },
            { l: 'Gender', v: selC.gender === 'M' ? 'Male' : selC.gender === 'F' ? 'Female' : selC.gender, col: T.textMid },
            { l: 'Goal', v: selC.goal, col: T.gold },
            { l: 'Paid', v: fmtFull(selC.paid), col: T.green },
            { l: 'Balance', v: fmtFull(selC.bal), col: selC.bal > 0 ? T.red : T.green },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
              <span style={{ color: '#888', fontSize: 12 }}>{r.l}</span>
              <span style={{ color: r.col, fontSize: 12, fontWeight: 600 }}>{r.v}</span>
            </div>
          ))}
        </div>}
      </div>
    </div>
  )
}
