import { useEffect, useState } from 'react'
import { Github, Zap, ChevronRight, Info, Terminal, Layout, Cpu, Database, Globe, Search, Code, GitBranch } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Docs() {
  const [search, setSearch] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'cli', title: 'Global Flags & CLI', icon: <Terminal size={20} /> },
    { id: 'taxonomy', title: 'Project Taxonomy', icon: <Layout size={20} /> },
    { id: 'handlers', title: 'Language Handlers', icon: <Cpu size={20} /> },
    { id: 'internal-logic', title: 'Internal Logic & Mappings', icon: <Code size={20} /> },
  ];

  const taxonomy = [
    { id: 'basic', name: 'Basic Application', desc: 'Standard entry point boilerplate.' },
    { id: 'app', name: 'Full Structure', desc: 'More comprehensive folder layout (src, include, etc).' },
    { id: 'web', name: 'Web & Internet', desc: 'Servers, Frontend frameworks, or HTML/CSS.' },
    { id: 'api', name: 'Web Services', desc: 'REST/JSON APIs (often maps to web).' },
    { id: 'cli', name: 'CLI Tool', desc: 'Argument parsing and terminal utilities.' },
    { id: 'data', name: 'Data & DB', desc: 'SQLite, Postgres, or Data analysis buffers.' },
    { id: 'ai', name: 'Machine Learning', desc: 'PyTorch, ML.NET, or simple AI mocks.' },
    { id: 'os', name: 'Low-level / Systems', desc: 'Kernel mocks, bootloaders, or system info.' },
    { id: 'embedded', name: 'Embedded / IoT', desc: 'Bare-metal loops or hardware abstraction layers.' },
    { id: 'game', name: 'Game Dev', desc: 'Pygame, Bevy, Raylib, or LÖVE templates.' },
    { id: 'devops', name: 'Infrastructure', desc: 'Docker clients, automation scripts.' },
    { id: 'network', name: 'Networking', desc: 'TCP/UDP servers and socket programming.' },
  ];

  const handlers = [
    { 
      name: 'Bun (JS/TS)', 
      id: 'bun', 
      flags: ['--framework', '--variant'],
      logic: 'The most complex handler. If type is "web", it triggers a 3-stage picker: Variant (JS/TS) -> Category (Frontend/Backend) -> Framework. "next" uses create-next-app --use-bun. "angular" uses @angular/cli. "express" adds the express package. CLI type redirects to "script" template. Data redirects to "db".' 
    },
    { 
      name: 'Go', 
      id: 'go', 
      logic: 'Uses module-based scaffolding. Automatically injects dependencies: "data" adds go-sqlite3, "devops" adds docker/client, "monitor" adds prometheus, "web3" adds go-ethereum, "cli" adds cobra, "math" adds gonum.' 
    },
    { 
      name: 'Python', 
      id: 'python', 
      logic: 'Powered by "uv". Extremely wide taxonomy support. Injects: "web" (fastapi, uvicorn), "ai" (torch), "game" (pygame), "data" (pandas, numpy), "devops" (boto3), "science" (numpy, scipy), "security" (cryptography), "os" (psutil).' 
    },
    { 
      name: 'Rust', 
      id: 'rust', 
      logic: 'Uses "cargo init". Injects dependencies with specific features: "web" (axum, tokio macros), "game" (bevy), "data" (rusqlite bundled), "cli" (clap derive), "os" (sysinfo), "web3" (ethers).' 
    },
    { 
      name: 'Assembly', 
      id: 'asm', 
      logic: 'Focuses on NASM. "os" type generates a 16-bit bootloader (boot.asm) with a boot signature. "embedded" is a bare-metal loop. Includes a robust Makefile for linking elf64.' 
    },
    { 
      name: 'C/C++', 
      id: 'cpp', 
      logic: 'Standardizes on Makefile + src/ + include/. "os" type includes <sys/utsname.h> for kernel info. "network" provides a socket-based HTTP server.' 
    },
    { 
      name: 'Swift', 
      id: 'swift', 
      logic: 'Uses "swift package init". "server" type adds Vapor. "ios" type changes init-type to "library". Overwrites Sources/main.swift with custom domain logic.' 
    },
    { 
      name: 'Kotlin/Java', 
      id: 'kotlin', 
      logic: 'Gradle-based. "desktop" type in Kotlin uses Compose Multiplatform. "web" type in Java uses Javalin. Automatically handles package naming based on project name.' 
    }
  ];

  const filteredHandlers = handlers.filter(h => 
    h.name.toLowerCase().includes(search.toLowerCase()) || 
    h.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container relative z-10 pb-20">
      <header className="flex justify-between items-center py-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg">
            <Zap size={24} className="text-black fill-black" />
          </div>
          <div className="text-3xl font-black tracking-tighter text-white">
            ini
          </div>
        </Link>
        <nav className="flex items-center gap-4">
          <a href="https://github.com/Woeter69/ini" target="_blank" rel="noopener noreferrer" className="nav-button">
            <Github size={18} />
            <span>GitHub</span>
          </a>
        </nav>
      </header>

      <main className="mt-12">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-black text-white mb-6 tracking-tighter">Documentation</h1>
          <p className="text-xl text-muted leading-relaxed mb-12">
            The complete guide to every argument, flag, and internal mapping in the <code className="text-secondary">ini</code> engine.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-12 space-y-1">
              {sections.map(s => (
                <a key={s.id} href={`#${s.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/10">
                  <span className="text-muted group-hover:text-primary transition-colors">{s.icon}</span>
                  <span className="text-white font-medium">{s.title}</span>
                </a>
              ))}
              
              <div className="pt-8 px-3">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search handlers..." 
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3 space-y-32">
            
            {/* CLI SECTION */}
            <section id="cli" className="scroll-mt-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-inner"><Terminal size={28} /></div>
                <h2 className="text-4xl font-extrabold text-white tracking-tight">Global Flags & CLI</h2>
              </div>
              
              <div className="space-y-8">
                <div className="glass-dark p-1 border border-white/5 rounded-2xl overflow-hidden">
                  <div className="bg-white/5 p-4 font-mono text-sm text-muted">
                    <span className="text-success">$</span> ini <span className="text-white">[language] [name]</span> <span className="text-secondary">[flags]</span>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  {[
                    { flag: '--git', desc: 'Enables Git initialization. Runs "git init -b main" and injects a curated .gitignore from internal/templates/gitignore.go.' },
                    { flag: '--type, -t', desc: 'Sets the taxonomy ID. If invalid, ini will fall back to "basic" or suggest alternatives. Resolves aliases (e.g., "db" -> "data").' },
                    { flag: '--framework, -f', desc: 'JS/TS/Bun specific. Bypasses the interactive framework selector. Required for headless scaffolding of web apps.' },
                    { flag: '--variant, -v', desc: 'JS/TS/Bun specific. Selects "js" or "ts" mode. Affects file extensions (.js vs .ts) and compiler configs.' },
                  ].map(f => (
                    <div key={f.flag} className="group glass-dark p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-3 mb-2">
                        <code className="text-lg font-bold text-secondary">{f.flag}</code>
                        <div className="h-px bg-white/5 flex-grow" />
                      </div>
                      <p className="text-muted leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* TAXONOMY SECTION */}
            <section id="taxonomy" className="scroll-mt-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary shadow-inner"><Layout size={28} /></div>
                <h2 className="text-4xl font-extrabold text-white tracking-tight">Project Taxonomy</h2>
              </div>
              
              <div className="space-y-8">
                <p className="text-lg text-muted">The <code className="text-white">ini</code> taxonomy ensures consistent scaffolding across 39+ languages. Below are the primary canonical IDs:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {taxonomy.map(t => (
                    <div key={t.id} className="glass-dark p-6 rounded-2xl border border-white/5 flex flex-col gap-2 hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-lg">{t.name}</span>
                        <code className="text-xs bg-white/5 px-2 py-1 rounded text-secondary">{t.id}</code>
                      </div>
                      <p className="text-sm text-muted">{t.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-primary/10 border border-primary/20 p-6 rounded-2xl">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <GitBranch size={18} className="text-primary" />
                    Alias Resolution
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { from: 'db', to: 'data' },
                      { from: 'iot', to: 'embedded' },
                      { from: 'ios', to: 'mobile' },
                      { from: 'mac', to: 'desktop' },
                      { from: 'stat', to: 'stats' },
                      { from: 'interactive', to: 'cli' },
                    ].map(a => (
                      <div key={a.from} className="text-xs">
                        <span className="text-muted">{a.from}</span>
                        <ChevronRight size={10} className="inline mx-1 text-muted" />
                        <span className="text-white font-mono">{a.to}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* HANDLERS SECTION */}
            <section id="handlers" className="scroll-mt-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-success/20 rounded-2xl flex items-center justify-center text-success shadow-inner"><Cpu size={28} /></div>
                <h2 className="text-4xl font-extrabold text-white tracking-tight">Language Handlers</h2>
              </div>
              
              <div className="space-y-16">
                {filteredHandlers.map(l => (
                  <div key={l.id} className="relative pl-8 border-l-2 border-white/5 hover:border-primary/50 transition-colors">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0F172A] border-2 border-primary" />
                    <h3 className="text-3xl font-black text-white mb-4">{l.name}</h3>
                    <div className="glass-dark p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                        <Cpu size={120} />
                      </div>
                      <div className="relative z-10">
                        <div className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Internal Logic & Conditional Flow</div>
                        <p className="text-muted text-lg leading-relaxed mb-6">
                          {l.logic}
                        </p>
                        {l.flags && (
                          <div className="flex gap-2">
                            {l.flags.map(f => (
                              <span key={f} className="text-[10px] font-mono bg-secondary/10 text-secondary border border-secondary/20 px-2 py-1 rounded-md">{f}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="glass-dark p-12 text-center border-dashed border-2 border-white/10 rounded-3xl">
                  <h4 className="text-2xl font-black text-white mb-4">30+ Specialized Handlers</h4>
                  <p className="text-muted max-w-xl mx-auto leading-relaxed">
                    Languages like <span className="text-white">Ada, COBOL, Fortran, Pascal, OCaml, Haskell, Clojure, Elixir, Erlang</span> follow a standardized template inheritance model. 
                    If a specific taxonomy type is missing, the engine intelligently falls back to the <code className="text-secondary">basic</code> template to ensure you never have a broken scaffold.
                  </p>
                </div>
              </div>
            </section>

            {/* INTERNAL MAPPINGS SECTION */}
            <section id="internal-logic" className="scroll-mt-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner"><Code size={28} /></div>
                <h2 className="text-4xl font-extrabold text-white tracking-tight">Implicit Mappings</h2>
              </div>
              
              <div className="glass-dark rounded-3xl overflow-hidden border border-white/5">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="p-4 text-xs font-bold text-muted uppercase tracking-widest border-b border-white/10">Requested Type</th>
                      <th className="p-4 text-xs font-bold text-muted uppercase tracking-widest border-b border-white/10">Internal Redirection</th>
                      <th className="p-4 text-xs font-bold text-muted uppercase tracking-widest border-b border-white/10">Affected Languages</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      { req: 'api', internal: 'web', langs: 'Python, Clojure, Crystal, D, Kotlin, V' },
                      { req: 'cli', internal: 'script / interactive', langs: 'Bun, Python, Julia, Cobol, R' },
                      { req: 'data', internal: 'db', langs: 'Bun, Go, Nim, Perl, Kotlin' },
                      { req: 'embedded', internal: 'os', langs: 'Shell, Assembly, Ada, Go' },
                      { req: 'math / stats', internal: 'science / basic', langs: 'Python, Go, Fortran, R' },
                      { req: 'ios', internal: 'mobile / library', langs: 'Swift, Objective-C' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 border-b border-white/5 font-mono text-secondary">{row.req}</td>
                        <td className="p-4 border-b border-white/5 font-mono text-white">{row.internal}</td>
                        <td className="p-4 border-b border-white/5 text-muted">{row.langs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-32 pt-12 border-t border-white/10 text-center text-muted">
        <p className="text-sm">Built with ❤️ by <a href="https://github.com/Woeter69" className="text-secondary hover:underline font-medium">Woeter</a></p>
        <p className="text-[10px] mt-2 uppercase tracking-[0.2em] opacity-30">Universal Project Initializer &copy; 2026</p>
      </footer>
    </div>
  )
}
