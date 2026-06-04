import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { T } from './services/designTokens'
import { api } from './services/api'

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '◻', group: 'core' },
  { id: 'clients', label: 'Clients', icon: '◉', group: 'core' },
  { id: 'trainers', label: 'Trainers', icon: '◆', group: 'core' },
  { id: 'payments', label: 'Payments', icon: '◇', group: 'core' },
  { id: 'analytics', label: 'Analytics', icon: '◈', group: 'core' },
  { id: 'crm', label: 'PT CRM', icon: '◰', group: 'sales' },
  { id: 'programs', label: 'Programs', icon: '◫', group: 'coaching' },
  { id: 'powerlifting', label: 'Powerlifting', icon: '⚡', group: 'coaching' },
  { id: 'attendance', label: 'Attendance', icon: '◱', group: 'ops' },
  { id: 'diet', label: 'AI Diet', icon: '◗', group: 'ai' },
  { id: 'workout', label: 'AI Workout', icon: '⊗', group: 'ai' },
  { id: 'settings', label: 'Settings', icon: '⚙', group: 'ops' },
]

const GROUPS = [
  { label: 'CORE', ids: ['dashboard', 'clients', 'trainers', 'payments', 'analytics'] },
  { label: 'SALES', ids: ['crm'] },
  { label: 'COACHING', ids: ['programs', 'powerlifting'] },
  { label: 'AI', ids: ['diet', 'workout'] },
  { label: 'SYSTEM', ids: ['attendance', 'settings'] },
]

const TITLES = {
  dashboard: 'Dashboard', clients: 'Clients', trainers: 'Trainers',
  payments: 'Payments', analytics: 'Analytics', crm: 'Sales CRM',
  programs: 'Programs', powerlifting: 'Powerlifting',
  attendance: 'Attendance', diet: 'AI Diet Generator', workout: 'AI Workout Generator', settings: 'Settings',
}

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const nav = location.pathname === '/' ? 'dashboard' : location.pathname.slice(1)
  const [sideOpen, setSideOpen] = useState(false)
  const [activeCount, setActiveCount] = useState(23)
  const [expiringCount, setExpiringCount] = useState(0)

  useEffect(() => {
    api.clients.list({ limit: 1 }).then(r => {
      if (r.count) setActiveCount(r.count)
    }).catch(() => { })
  }, [])

  useEffect(() => {
    api.clients.list({ limit: 200 }).then(r => {
      if (r.data) setExpiringCount(r.data.filter(c => c.days_left <= 14).length)
    }).catch(() => { })
  }, [nav])

  return (
    <div style={{
      display: 'flex', minHeight: '100vh', height: '100vh',
      background: T.bg, color: T.text, overflow: 'hidden',
      fontFamily: T.font,
    }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
        ::-webkit-scrollbar{width:3px;height:3px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}
        input,select,button,textarea{font-family:inherit}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      <div style={{
        width: sideOpen ? 220 : 62, minWidth: sideOpen ? 220 : 62,
        background: '#0d0d0f', borderRight: `1px solid ${T.border}`,
        display: 'flex', flexDirection: 'column', padding: '0 0 16px',
        position: 'relative', zIndex: 20, flexShrink: 0, userSelect: 'none',
        transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1),min-width 0.25s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
      }}
        onMouseEnter={() => setSideOpen(true)}
        onMouseLeave={() => setSideOpen(false)}>

        <div style={{
          padding: sideOpen ? '16px 14px 14px' : '16px 10px 14px',
          borderBottom: `1px solid ${T.border}`, marginBottom: 8, flexShrink: 0,
          display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden',
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: 7.5, flexShrink: 0,
            background: 'linear-gradient(135deg,#ffd60a,#f5a623)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 800, color: '#000',
          }}>6</div>
          {sideOpen && (
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <p style={{ color: T.text, fontSize: 14, fontWeight: 700, margin: 0, letterSpacing: -0.2 }}>619 Fitness</p>
              <p style={{ color: T.textDim, fontSize: 10, margin: 0 }}>Enterprise OS</p>
            </div>
          )}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0 6px' }}>
          {GROUPS.map((g, gi) => (
            <div key={gi} style={{ marginBottom: 4 }}>
              {sideOpen && (
                <p style={{
                  color: T.textDim, fontSize: 10, fontWeight: 600, letterSpacing: 0.8,
                  padding: '6px 8px 4px', margin: 0, textTransform: 'uppercase',
                }}>{g.label}</p>
              )}
              {g.ids.map(id => {
                const item = NAV.find(n => n.id === id)
                if (!item) return null
                const active = nav === id
                return (
                  <button key={id} onClick={() => navigate(`/${id === 'dashboard' ? '/' : id}`)} style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: sideOpen ? '8px 10px' : '8px 0',
                    justifyContent: sideOpen ? 'flex-start' : 'center',
                    borderRadius: T.radiusXs, marginBottom: 1,
                    background: active ? T.accentDim : 'transparent',
                    border: 'none',
                    color: active ? T.accent : T.textDim, cursor: 'pointer',
                    textAlign: 'left', transition: 'all 0.12s',
                    overflow: 'hidden', whiteSpace: 'nowrap', outline: 'none',
                  }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.background = T.surface; e.currentTarget.style.color = T.textMid } }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = T.textDim } }}>
                    <span style={{
                      fontSize: 16, flexShrink: 0, width: sideOpen ? 18 : 20,
                      textAlign: 'center', lineHeight: 1, opacity: active ? 1 : 0.5,
                    }}>{item.icon}</span>
                    {sideOpen && (
                      <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, letterSpacing: -0.1, flex: 1 }}>
                        {item.label}
                      </span>
                    )}
                    {sideOpen && (id === 'diet' || id === 'workout') && (
                      <span style={{
                        background: `${T.purple}18`, color: T.purple,
                        borderRadius: 4, padding: '1px 5px', fontSize: 9, fontWeight: 600,
                      }}>AI</span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {sideOpen && (
          <div style={{
            margin: '8px 8px 0', padding: '10px 12px',
            background: T.surface, borderRadius: T.radiusXs, whiteSpace: 'nowrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                background: `${T.accent}18`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 12, fontWeight: 700, color: T.accent,
              }}>AK</div>
              <div>
                <p style={{ color: T.text, fontSize: 12, fontWeight: 600, margin: 0 }}>Abhishek K.</p>
                <p style={{ color: T.textDim, fontSize: 10, margin: 0 }}>Admin</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 24px', borderBottom: `1px solid ${T.border}`,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)', flexShrink: 0,
        }}>
          <div>
            <h1 style={{
              color: T.text, fontSize: 20, fontWeight: 700, margin: 0,
              letterSpacing: -0.5, fontFamily: T.fontDisplay,
            }}>{TITLES[nav] || 'Dashboard'}</h1>
            <p style={{ color: T.textDim, fontSize: 12, margin: '2px 0 0', fontWeight: 400 }}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: `${T.green}10`, border: `1px solid ${T.green}20`,
              borderRadius: 20, padding: '4px 12px',
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.green, display: 'inline-block' }} />
              <span style={{ color: T.green, fontSize: 12, fontWeight: 600 }}>{activeCount} Active</span>
            </div>
            <button style={{
              background: T.surface, border: `1px solid ${T.border}`,
              borderRadius: 20, padding: '4px 12px', color: T.textDim, fontSize: 12,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, outline: 'none',
            }}>
              🔔
              {expiringCount > 0 && (
                <span style={{
                  background: T.red, borderRadius: '50%', width: 16, height: 16,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, fontWeight: 700, color: '#fff',
                }}>{expiringCount}</span>
              )}
            </button>
            <div style={{
              background: T.surface, border: `1px solid ${T.border}`,
              borderRadius: 20, padding: '4px 12px', color: T.textDim, fontSize: 12,
              letterSpacing: -0.1,
            }}>
              ⌘K
            </div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/trainers" element={<TrainersView />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/powerlifting" element={<PowerliftingView />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/diet" element={<AIDiet />} />
            <Route path="/workout" element={<AIWorkout />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
