import { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

class ErrorBoundary extends Component {
  state = { hasError: false, error: null }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: 60, textAlign: 'center', color: '#fff',
          background: '#000', minHeight: '100vh', display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Inter', -apple-system, sans-serif",
        }}>
          <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>⚠</div>
          <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, letterSpacing: -0.3 }}>Something went wrong</h1>
          <pre style={{ color: '#8e8e93', fontSize: 13, marginBottom: 24, maxWidth: 400 }}>{this.state.error?.message}</pre>
          <button onClick={() => window.location.reload()} style={{
            background: '#0a84ff', color: '#fff', border: 'none', borderRadius: 20,
            padding: '10px 24px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>
            Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </BrowserRouter>,
)
