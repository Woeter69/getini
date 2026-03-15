import { useEffect } from 'react'
import './index.css'
import { Terminal } from './components/Terminal'
import { LanguageGrid } from './components/LanguageGrid'

function App() {
  useEffect(() => {
    // Force scroll to top on mount to prevent browser jumping to #languages
    window.scrollTo(0, 0);
    // Optional: Clear hash if you want to strictly start at the top
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return (
    <div className="container">
      <header style={{ padding: '2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          ⚡ <span className="gradient-text">ini</span>
        </div>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <a href="#features" style={{ color: 'var(--text)', textDecoration: 'none' }}>Features</a>
          <a href="#languages" style={{ color: 'var(--text)', textDecoration: 'none' }}>Languages</a>
          <a href="https://github.com/Woeter69/ini" style={{ color: 'var(--text)', textDecoration: 'none' }}>GitHub</a>
        </nav>
      </header>

      <section className="hero">
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          The Blazing Fast <br />
          <span className="gradient-text">Universal Initializer</span>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Scaffold any project in seconds with high-quality, domain-specific templates and a beautiful interactive TUI.
        </p>
        
        <div className="glass" style={{ display: 'inline-flex', padding: '0.75rem 1.5rem', gap: '1rem', alignItems: 'center', marginBottom: '4rem' }}>
          <code style={{ color: 'var(--secondary)' }}>go install github.com/Woeter69/ini@latest</code>
          <button 
            onClick={() => {
              navigator.clipboard.writeText('go install github.com/Woeter69/ini@latest');
              alert('Copied to clipboard!');
            }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex', alignItems: 'center' }}
            title="Copy to clipboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
            </svg>
          </button>
        </div>

        <Terminal />
      </section>

      <section id="features" style={{ padding: '4rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Zero Overhead</h3>
            <p style={{ color: 'var(--muted)' }}>Single portable binary. No heavy runtimes or complex configuration needed.</p>
          </div>
          <div className="glass" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Intelligent Templates</h3>
            <p style={{ color: 'var(--muted)' }}>Context-aware scaffolding for Web, AI, DevOps, and more across 39+ languages.</p>
          </div>
          <div className="glass" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Git Integrated</h3>
            <p style={{ color: 'var(--muted)' }}>Auto-initializes Git with professional .gitignore files tailored to your stack.</p>
          </div>
        </div>
      </section>

      <section id="languages">
        <LanguageGrid />
      </section>

      <footer style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--muted)', borderTop: '1px solid var(--border)' }}>
        <p>Built with ❤️ by <a href="https://github.com/Woeter69" style={{ color: 'var(--secondary)' }}>Woeter</a></p>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>MIT License &copy; 2026</p>
      </footer>
    </div>
  )
}

export default App
