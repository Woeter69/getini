import { useEffect, useState } from 'react'
import { Github, FileText, Zap, Copy, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Terminal } from '../components/Terminal'
import { LanguageGrid } from '../components/LanguageGrid'

export function Home() {
  const [copied, setCopied] = useState(false);
  const installCmd = 'curl -fsSL https://ini.woeter.online/install.sh | bash';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container relative z-10">
      <header className="flex justify-between items-center py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center transition-all duration-300 hover:rotate-12 hover:scale-110 cursor-pointer shadow-lg">
            <Zap size={24} className="text-black fill-black" />
          </div>
          <div className="text-3xl font-black tracking-tighter text-white">
            ini
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/docs" className="nav-button">
            <FileText size={18} />
            <span>Docs</span>
          </Link>
          <a href="https://github.com/Woeter69/ini" target="_blank" rel="noopener noreferrer" className="nav-button">
            <Github size={18} />
            <span>GitHub</span>
          </a>
        </nav>
      </header>

      <section className="hero pt-12">
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          The Blazing Fast <br />
          <span className="gradient-text">Universal Initializer</span>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Scaffold any project in seconds with high-quality, domain-specific templates and a beautiful interactive TUI.
        </p>
        
        <div className="glass-dark" style={{ display: 'inline-flex', padding: '0.75rem 1.5rem', gap: '1rem', alignItems: 'center', marginBottom: '4rem' }}>
          <code style={{ color: 'var(--secondary)' }}>{installCmd}</code>
          <button 
            onClick={handleCopy}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied ? 'var(--success)' : 'var(--muted)', display: 'flex', alignItems: 'center' }}
            title="Copy to clipboard"
          >
            {copied ? <Check size={18} className="text-success" /> : <Copy size={18} />}
          </button>
        </div>

        <Terminal />
      </section>

      <section id="features" style={{ padding: '4rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass-dark" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Zero Overhead</h3>
            <p style={{ color: 'var(--muted)' }}>Single portable binary. No heavy runtimes or complex configuration needed.</p>
          </div>
          <div className="glass-dark" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Intelligent Templates</h3>
            <p style={{ color: 'var(--muted)' }}>Context-aware scaffolding for Web, AI, DevOps, and more across 39+ languages.</p>
          </div>
          <div className="glass-dark" style={{ padding: '2rem' }}>
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
      </footer>
    </div>
  )
}
