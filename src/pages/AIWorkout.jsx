import { useState } from 'react'
import { T } from '../services/designTokens'
import Card from '../components/Card'
import Badge from '../components/Badge'
import SH from '../components/SH'
import { api } from '../services/api'

export default function AIWorkout() {
  const [form, setForm] = useState({ goal: 'strength', experience: 'intermediate', days: 4, equipment: 'full', injuries: 'none', style: 'powerbuilding' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    setLoading(true); setResult(null)
    try {
      const data = await api.ai.workout(form)
      setResult(data)
    } catch {
      const s = form.style.charAt(0).toUpperCase() + form.style.slice(1)
      setResult({
        program_name: `${form.days}-Day ${s} Program`,
        overview: `${form.experience.charAt(0).toUpperCase() + form.experience.slice(1)}-level ${form.style} program. ${form.days} training days per week, optimised for ${form.goal.replace('_', ' ')}.`,
        days: Array.from({ length: form.days }, (_, i) => ({
          day: `Day ${i + 1}`,
          focus: ['Lower — Squat Focus', 'Upper — Push Focus', 'Lower — Hinge Focus', 'Upper — Pull Focus', 'Full Body', 'Active Recovery'][i % 6],
          exercises: [
            { name: 'Barbell Back Squat', sets: '4', reps: '5', rest: '3 min', notes: 'Belt on last sets' },
            { name: 'Romanian Deadlift', sets: '3', reps: '8', rest: '2 min', notes: 'Slow eccentric' },
            { name: 'Leg Press', sets: '3', reps: '10-12', rest: '90s', notes: 'Full ROM' },
          ],
        })),
        progression: 'Add 2.5kg/week on primary lifts. Deload if 2 consecutive sessions fail.',
        deload: 'Week 4: drop volume by 40%, keep intensity. Focus on technique.',
      })
    }
    setLoading(false)
  }

  const focusColor = f => {
    if (!f) return T.gold
    const fl = f.toLowerCase()
    if (fl.includes('squat') || fl.includes('lower') || fl.includes('leg')) return T.red
    if (fl.includes('push') || fl.includes('chest') || fl.includes('bench')) return T.blue
    if (fl.includes('pull') || fl.includes('back') || fl.includes('hinge') || fl.includes('dead')) return T.green
    return T.gold
  }

  const selStyle = {
    background: 'rgba(10,10,20,0.96)', border: `1px solid ${T.border}`, borderRadius: 9,
    padding: '9px 12px', color: T.text, fontSize: 12, outline: 'none', width: '100%',
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '310px 1fr', gap: 16 }}>
        <Card style={{ padding: 22, height: 'fit-content', position: 'sticky', top: 0 }}>
          <SH title="⊗ AI Workout Generator" sub="Powered by Claude" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {[
              { l: 'Goal', k: 'goal', opts: [{ v: 'fat_loss', t: 'Fat Loss' }, { v: 'muscle_gain', t: 'Muscle Gain' }, { v: 'strength', t: 'Strength' }, { v: 'powerlifting', t: 'Powerlifting' }, { v: 'athletic', t: 'Athletic' }] },
              { l: 'Experience', k: 'experience', opts: [{ v: 'beginner', t: 'Beginner (0–1yr)' }, { v: 'intermediate', t: 'Intermediate (1–3yr)' }, { v: 'advanced', t: 'Advanced (3+yr)' }] },
              { l: 'Days per Week', k: 'days', opts: [{ v: 3, t: '3 days' }, { v: 4, t: '4 days' }, { v: 5, t: '5 days' }, { v: 6, t: '6 days' }] },
              { l: 'Equipment', k: 'equipment', opts: [{ v: 'full', t: 'Full Gym' }, { v: 'barbell', t: 'Barbell Only' }, { v: 'dumbbells', t: 'Dumbbells' }, { v: 'bodyweight', t: 'Bodyweight' }] },
              { l: 'Training Style', k: 'style', opts: [{ v: 'powerbuilding', t: 'Powerbuilding' }, { v: 'bodybuilding', t: 'Bodybuilding' }, { v: 'strength', t: 'Pure Strength' }, { v: 'hiit', t: 'HIIT/Circuit' }, { v: 'athletic', t: 'Athletic' }] },
            ].map(f => (
              <div key={f.k}>
                <label style={{ color: T.textDim, fontSize: 10, display: 'block', marginBottom: 3, letterSpacing: 0.5 }}>{f.l}</label>
                <select value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: f.k === 'days' ? +e.target.value : e.target.value })} style={selStyle}>
                  {f.opts.map(o => <option key={o.v} value={o.v}>{o.t}</option>)}
                </select>
              </div>
            ))}
            <div>
              <label style={{ color: T.textDim, fontSize: 10, display: 'block', marginBottom: 3, letterSpacing: 0.5 }}>Injuries / Limitations</label>
              <input value={form.injuries} onChange={e => setForm({ ...form, injuries: e.target.value })} placeholder="e.g. lower back, knee"
                style={{ ...selStyle, background: 'rgba(255,255,255,0.04)' }} />
            </div>
            <button onClick={generate} disabled={loading}
              style={{
                background: `linear-gradient(135deg,${T.blue},#2040a0)`, border: 'none', borderRadius: 10,
                padding: '12px', color: '#fff', fontSize: 13, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: 0.5, marginTop: 4, opacity: loading ? 0.7 : 1,
              }}>
              {loading ? '⊗ Generating…' : '⊗ Generate Workout Program'}
            </button>
          </div>
        </Card>
        <div>
          {!result && !loading && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 380, flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: 42, margin: 0 }}>⊗</p>
            <p style={{ color: T.textDim, fontSize: 14 }}>Set training parameters and generate a personalised workout program</p>
          </div>}
          {loading && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 380, flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', border: `3px solid ${T.blue}28`, borderTop: `3px solid ${T.blue}`, animation: 'spin 1s linear infinite' }} />
            <p style={{ color: T.blue, fontSize: 13, fontWeight: 700 }}>Building your program…</p>
          </div>}
          {result && <div>
            <Card style={{ padding: 20, marginBottom: 14 }}>
              <h2 style={{ color: T.text, fontSize: 18, fontWeight: 800, margin: '0 0 6px', fontFamily: "'Syne',sans-serif" }}>{result.program_name}</h2>
              <p style={{ color: T.textDim, fontSize: 12, margin: 0, lineHeight: 1.7 }}>{result.overview}</p>
            </Card>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(272px,1fr))', gap: 12, marginBottom: 12 }}>
              {(result.days || []).map((d, i) => {
                const fc = focusColor(d.focus || '')
                return (
                  <Card key={i} style={{ padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <p style={{ color: T.text, fontSize: 13, fontWeight: 700, margin: 0 }}>{d.day}</p>
                      <Badge label={d.focus || 'Training'} color={fc} />
                    </div>
                    {(d.exercises || []).map((ex, j) => (
                      <div key={j} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: j < (d.exercises || []).length - 1 ? `1px solid ${T.border}` : 'none', alignItems: 'flex-start' }}>
                        <div style={{ width: 20, height: 20, borderRadius: 5, background: `${fc}18`, border: `1px solid ${fc}26`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: fc, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>{j + 1}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ color: '#ddd', fontSize: 11, fontWeight: 600, margin: 0 }}>{ex.name}</p>
                          <p style={{ color: T.textDim, fontSize: 10, margin: '2px 0 0' }}>{ex.sets}×{ex.reps} · Rest {ex.rest}</p>
                          {ex.notes && <p style={{ color: '#444', fontSize: 9, margin: '2px 0 0', fontStyle: 'italic' }}>{ex.notes}</p>}
                        </div>
                      </div>
                    ))}
                  </Card>
                )
              })}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <Card style={{ padding: 16 }}>
                <p style={{ color: T.green, fontSize: 12, fontWeight: 700, margin: '0 0 8px' }}>📈 Progression</p>
                <p style={{ color: T.textMid, fontSize: 12, margin: 0, lineHeight: 1.7 }}>{result.progression}</p>
              </Card>
              <Card style={{ padding: 16 }}>
                <p style={{ color: T.blue, fontSize: 12, fontWeight: 700, margin: '0 0 8px' }}>😴 Deload Protocol</p>
                <p style={{ color: T.textMid, fontSize: 12, margin: 0, lineHeight: 1.7 }}>{result.deload}</p>
              </Card>
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}
