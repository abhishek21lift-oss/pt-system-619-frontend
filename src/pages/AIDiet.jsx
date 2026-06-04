import { useState } from 'react'
import { T } from '../services/designTokens'
import Card from '../components/Card'
import SH from '../components/SH'
import { api } from '../services/api'

const actMul = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 }
const goalAdj = { fat_loss: -500, muscle_gain: 300, recomp: 0, strength: 200, powerlifting: 300 }
const goalL = { fat_loss: 'Fat Loss', muscle_gain: 'Muscle Gain', recomp: 'Recomposition', strength: 'Strength', powerlifting: 'Powerlifting Peak' }
const dietL = { veg: 'Vegetarian', egg: 'Eggetarian', non_veg: 'Non-Vegetarian', vegan: 'Vegan' }

function calcBase(form) {
  const { age, gender, weight, height, activity, goal } = form
  const bmr = gender === 'male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161
  const tdee = Math.round(bmr * actMul[activity])
  const kcal = tdee + goalAdj[goal]
  const protein = Math.round(weight * (goal === 'muscle_gain' || goal === 'powerlifting' ? 2.2 : 2.0))
  const fat = Math.round(kcal * 0.28 / 9)
  const carbs = Math.round((kcal - protein * 4 - fat * 9) / 4)
  const iscut = goal === 'fat_loss'
  const meals = (iscut ? [
    { time: '7:00 AM', name: 'Breakfast', kcal: Math.round(kcal * 0.25), foods: form.diet === 'veg' ? 'Oats 80g + Paneer Bhurji 100g + Milk 200ml' : 'Oats 80g + Egg Bhurji 3 eggs + Milk 200ml' },
    { time: '11:00 AM', name: 'Mid-Morning', kcal: Math.round(kcal * 0.10), foods: 'Seasonal fruit + 10g almonds' },
    { time: '1:00 PM', name: 'Lunch', kcal: Math.round(kcal * 0.30), foods: form.diet === 'veg' ? 'Rice 150g + Dal + Sabzi + Curd' : 'Rice 150g + Chicken 150g + Sabzi + Curd' },
    { time: '4:00 PM', name: 'Pre-Workout', kcal: Math.round(kcal * 0.10), foods: 'Banana + Black coffee / Green tea' },
    { time: '7:00 PM', name: 'Post-Workout', kcal: Math.round(kcal * 0.15), foods: form.diet === 'veg' ? 'Whey 30g + Banana' : 'Chicken 100g + Banana' },
    { time: '9:00 PM', name: 'Dinner', kcal: Math.round(kcal * 0.10), foods: form.diet === 'veg' ? 'Roti 2 + Dal + Salad' : 'Roti 2 + Fish/Eggs + Salad' },
  ] : [
    { time: '7:00 AM', name: 'Breakfast', kcal: Math.round(kcal * 0.22), foods: form.diet === 'veg' ? 'Oats 100g + Paneer 150g + Milk 300ml' : 'Oats 100g + Eggs 4 + Milk 250ml' },
    { time: '10:00 AM', name: 'Mid-Morning', kcal: Math.round(kcal * 0.12), foods: 'Banana 2 + Peanut Butter 30g + Milk 200ml' },
    { time: '1:00 PM', name: 'Lunch', kcal: Math.round(kcal * 0.28), foods: form.diet === 'veg' ? 'Rice 200g + Dal 2 bowl + Paneer 100g' : 'Rice 200g + Chicken 200g + Dal + Sabzi' },
    { time: '4:00 PM', name: 'Pre-Workout', kcal: Math.round(kcal * 0.12), foods: 'Rice 100g + Chicken 100g + Banana 2' },
    { time: '7:00 PM', name: 'Post-Workout', kcal: Math.round(kcal * 0.14), foods: 'Whey 40g + Banana 2 + Dextrose 30g' },
    { time: '9:30 PM', name: 'Dinner', kcal: Math.round(kcal * 0.12), foods: form.diet === 'veg' ? 'Roti 3 + Dal + Curd + Paneer' : 'Roti 3 + Chicken 200g + Salad + Curd' },
  ])
  return { bmr: Math.round(bmr), tdee, kcal, protein, fat, carbs, meals }
}

export default function AIDiet() {
  const [form, setForm] = useState({ age: 28, gender: 'male', weight: 80, height: 175, bf: 18, activity: 'moderate', goal: 'fat_loss', diet: 'non_veg' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  const generate = async () => {
    setLoading(true); setErr(''); setResult(null)
    try {
      const data = await api.ai.diet(form)
      setResult(data)
    } catch (e) {
      setResult(calcBase()); setErr('AI offline — showing calculated plan')
    }
    setLoading(false)
  }

  const iField = {
    background: 'rgba(255,255,255,0.04)', border: `1px solid ${T.border}`, borderRadius: 9,
    padding: '9px 12px', color: T.text, fontSize: 12, outline: 'none', width: '100%', boxSizing: 'border-box',
  }
  const selField = { ...iField, background: 'rgba(10,10,20,0.96)' }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '370px 1fr', gap: 16 }}>
        <Card style={{ padding: 22, height: 'fit-content', position: 'sticky', top: 0 }}>
          <SH title="⊕ AI Diet Generator" sub="Powered by Claude" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[{ l: 'Age', k: 'age', min: 15, max: 70 }, { l: 'Weight (kg)', k: 'weight', min: 40, max: 180 },
                { l: 'Height (cm)', k: 'height', min: 140, max: 220 }, { l: 'Body Fat %', k: 'bf', min: 5, max: 50 }].map(f => (
                  <div key={f.k}>
                    <label style={{ color: T.textDim, fontSize: 10, display: 'block', marginBottom: 3, letterSpacing: 0.5 }}>{f.l}</label>
                    <input type="number" min={f.min} max={f.max} value={form[f.k]}
                      onChange={e => setForm({ ...form, [f.k]: +e.target.value })} style={iField} />
                  </div>
                ))}
            </div>
            {[
              { l: 'Gender', k: 'gender', opts: [{ v: 'male', t: 'Male' }, { v: 'female', t: 'Female' }] },
              { l: 'Activity Level', k: 'activity', opts: [{ v: 'sedentary', t: 'Sedentary' }, { v: 'light', t: 'Light' }, { v: 'moderate', t: 'Moderate' }, { v: 'active', t: 'Active' }, { v: 'very_active', t: 'Very Active' }] },
              { l: 'Goal', k: 'goal', opts: [{ v: 'fat_loss', t: 'Fat Loss' }, { v: 'muscle_gain', t: 'Muscle Gain' }, { v: 'recomp', t: 'Recomposition' }, { v: 'strength', t: 'Strength' }, { v: 'powerlifting', t: 'Powerlifting' }] },
              { l: 'Diet Type', k: 'diet', opts: [{ v: 'veg', t: 'Vegetarian' }, { v: 'egg', t: 'Eggetarian' }, { v: 'non_veg', t: 'Non-Vegetarian' }, { v: 'vegan', t: 'Vegan' }] },
            ].map(f => (
              <div key={f.k}>
                <label style={{ color: T.textDim, fontSize: 10, display: 'block', marginBottom: 3, letterSpacing: 0.5 }}>{f.l}</label>
                <select value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })} style={selField}>
                  {f.opts.map(o => <option key={o.v} value={o.v}>{o.t}</option>)}
                </select>
              </div>
            ))}
            <button onClick={generate} disabled={loading}
              style={{
                background: `linear-gradient(135deg,${T.gold},#7a5a10)`, border: 'none', borderRadius: 10,
                padding: '12px', color: '#06060f', fontSize: 13, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: 0.5, marginTop: 4, opacity: loading ? 0.7 : 1,
              }}>
              {loading ? '⊕ Generating…' : '⊕ Generate AI Diet Plan'}
            </button>
          </div>
        </Card>
        <div>
          {!result && !loading && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 380, flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: 42, margin: 0 }}>⊕</p>
            <p style={{ color: T.textDim, fontSize: 14 }}>Configure client profile and generate a personalised Indian diet plan</p>
          </div>}
          {loading && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 380, flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', border: `3px solid ${T.gold}28`, borderTop: `3px solid ${T.gold}`, animation: 'spin 1s linear infinite' }} />
            <p style={{ color: T.gold, fontSize: 13, fontWeight: 700 }}>Claude is building your plan…</p>
          </div>}
          {result && <div>
            {err && <p style={{ color: T.orange, fontSize: 11, marginBottom: 12, background: `${T.orange}10`, border: `1px solid ${T.orange}20`, borderRadius: 8, padding: '6px 12px' }}>{err}</p>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 14 }}>
              {[{ l: 'Calories', v: `${result.kcal}`, u: 'kcal', c: T.gold },
                { l: 'Protein', v: `${result.protein}`, u: 'g', c: T.red },
                { l: 'Carbs', v: `${result.carbs}`, u: 'g', c: T.blue },
                { l: 'Fat', v: `${result.fat}`, u: 'g', c: T.green }].map((m, i) => (
                  <Card key={i} style={{ padding: 14, textAlign: 'center' }}>
                    <p style={{ color: T.textDim, fontSize: 10, margin: '0 0 6px', letterSpacing: 0.5 }}>{m.l}</p>
                    <p style={{ color: m.c, fontSize: 24, fontWeight: 800, margin: 0, fontFamily: "'Syne',sans-serif" }}>{m.v}</p>
                    <p style={{ color: '#555', fontSize: 11, margin: '2px 0 0' }}>{m.u}</p>
                  </Card>
                ))}
            </div>
            <Card style={{ padding: 20, marginBottom: 12 }}>
              <SH title="Meal Plan" sub="Daily schedule" />
              {result.meals.map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '11px 0', borderBottom: i < result.meals.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                  <p style={{ color: T.gold, fontSize: 11, fontWeight: 700, margin: 0, width: 68, flexShrink: 0 }}>{m.time}</p>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: T.text, fontSize: 13, fontWeight: 700, margin: '0 0 3px' }}>{m.name}</p>
                    <p style={{ color: T.textDim, fontSize: 11, margin: 0 }}>{m.foods}</p>
                  </div>
                  <p style={{ color: T.textMid, fontSize: 12, fontWeight: 700, margin: 0, flexShrink: 0, whiteSpace: 'nowrap' }}>{m.kcal} kcal</p>
                </div>
              ))}
            </Card>
            {result.tip && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { h: '💡 Coach Tip', body: result.tip, col: T.gold },
                { h: '✓ Best Foods', body: (result.foods || []).map((f, i) => `• ${f}`).join('\n'), col: T.green },
                { h: '✗ Avoid', body: (result.avoid || []).map((f, i) => `• ${f}`).join('\n'), col: T.red },
                { h: '💊 Supps & Hydration', body: `${result.supplement || ''}\n💧 ${result.hydration || ''}`, col: T.blue },
              ].map((c, i) => (
                <Card key={i} style={{ padding: 16 }}>
                  <p style={{ color: c.col, fontSize: 12, fontWeight: 700, margin: '0 0 8px' }}>{c.h}</p>
                  <p style={{ color: T.textMid, fontSize: 11, margin: 0, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{c.body}</p>
                </Card>
              ))}
            </div>}
          </div>}
        </div>
      </div>
    </div>
  )
}
