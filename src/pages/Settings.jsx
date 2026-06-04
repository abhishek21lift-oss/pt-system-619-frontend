import { useState, useEffect } from 'react'
import { T } from '../services/designTokens'
import Card from '../components/Card'
import SH from '../components/SH'

const STORAGE_KEY = '619_settings'

export default function Settings() {
  const [saved, setSaved] = useState(false)
  const [fields, setFields] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
    return {
      studioName: '619 Fitness Studio', owner: 'Abhishek Katiyar', location: 'Jaipur, Rajasthan, India',
      phone: '+91 98765 43210', gst: '08XXXXX1234Z1', commission: '50% Trainer / 50% Studio',
    }
  })
  const [toggles, setToggles] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY + '_toggles')
    if (stored) return JSON.parse(stored)
    return { whatsapp: true, birthday: true, missed: false, payment: true, report: true }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fields))
  }, [fields])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_toggles', JSON.stringify(toggles))
  }, [toggles])

  const fieldMeta = [
    { k: 'studioName', l: 'Studio Name' },
    { k: 'owner', l: 'Owner' },
    { k: 'location', l: 'Location' },
    { k: 'phone', l: 'Phone' },
    { k: 'gst', l: 'GST Number' },
    { k: 'commission', l: 'Commission Split' },
  ]

  return (
    <div style={{ maxWidth: 680 }}>
      <Card style={{ padding: 24, marginBottom: 14 }}>
        <SH title="Studio Profile" sub="619 Fitness Studio — Jaipur, Rajasthan" />
        {fieldMeta.map((f, i) => (
          <div key={i} style={{ marginBottom: 11 }}>
            <label style={{ color: T.textDim, fontSize: 10, display: 'block', marginBottom: 3, letterSpacing: 0.5 }}>{f.l}</label>
            <input value={fields[f.k]} onChange={e => setFields({ ...fields, [f.k]: e.target.value })}
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${T.border}`, borderRadius: 9, padding: '9px 12px', color: T.text, fontSize: 12, outline: 'none', boxSizing: 'border-box' }} />
          </div>
        ))}
      </Card>
      <Card style={{ padding: 24, marginBottom: 14 }}>
        <SH title="Notification Automations" />
        {[
          { k: 'whatsapp', l: 'WhatsApp Renewal Reminders', d: '7 days before expiry' },
          { k: 'birthday', l: 'Birthday Wishes', d: 'Auto-send at 9:00 AM' },
          { k: 'missed', l: 'Missed Workout Alerts', d: 'After 3 consecutive absences' },
          { k: 'payment', l: 'Payment Due Reminders', d: 'Every 3 days until cleared' },
          { k: 'report', l: 'Monthly Revenue Report', d: '1st of every month' },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 4 ? `1px solid ${T.border}` : 'none' }}>
            <div>
              <p style={{ color: T.textMid, fontSize: 13, fontWeight: 600, margin: 0 }}>{s.l}</p>
              <p style={{ color: T.textDim, fontSize: 11, margin: '3px 0 0' }}>{s.d}</p>
            </div>
            <div onClick={() => setToggles(t => ({ ...t, [s.k]: !t[s.k] }))}
              style={{ width: 46, height: 25, borderRadius: 13, cursor: 'pointer', background: toggles[s.k] ? T.gold : 'rgba(255,255,255,0.08)', border: `1px solid ${toggles[s.k] ? T.gold + '55' : T.border}`, position: 'relative', transition: 'all 0.22s', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: 4, left: toggles[s.k] ? 24 : 4, width: 15, height: 15, borderRadius: '50%', background: toggles[s.k] ? '#06060f' : '#666', transition: 'left 0.22s' }} />
            </div>
          </div>
        ))}
      </Card>
      <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500) }}
        style={{ background: `linear-gradient(135deg,${T.gold},#7a5a10)`, border: 'none', borderRadius: 10, padding: '12px 28px', color: '#06060f', fontSize: 13, fontWeight: 800, cursor: 'pointer', letterSpacing: 0.5 }}>
        {saved ? '✓ Saved!' : 'Save Settings'}
      </button>
    </div>
  )
}
