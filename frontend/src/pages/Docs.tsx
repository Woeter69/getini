import { useEffect, useState } from 'react'
import { Github, Zap, ChevronRight, Terminal, Layout, Cpu, Code, GitBranch, Search, BookOpen, Download, Layers, Settings, Workflow, Package, ArrowRight, ExternalLink, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

/* ── Data ─────────────────────────────────────────────────────────── */

const SECTIONS = [
  { id: 'installation', title: 'Installation', icon: <Download size={18} /> },
  { id: 'quickstart', title: 'Quick Start', icon: <Sparkles size={18} /> },
  { id: 'cli', title: 'CLI Flags', icon: <Terminal size={18} /> },
  { id: 'interactive', title: 'Interactive Mode', icon: <Workflow size={18} /> },
  { id: 'taxonomy', title: 'Project Taxonomy', icon: <Layout size={18} /> },
  { id: 'config', title: 'ProjectConfig', icon: <Settings size={18} /> },
  { id: 'handlers', title: 'Language Handlers', icon: <Cpu size={18} /> },
  { id: 'scaffold', title: 'Scaffold Utilities', icon: <Package size={18} /> },
  { id: 'mappings', title: 'Internal Mappings', icon: <Code size={18} /> },
  { id: 'architecture', title: 'Architecture', icon: <Layers size={18} /> },
]

const FLAGS = [
  { flag: '--git', short: '', desc: 'Initialize a git repo with branch "main" and inject a curated .gitignore from the embedded template store.' },
  { flag: '--type', short: '-t', desc: 'Set the project taxonomy ID (e.g. web, game, ai). Resolves aliases automatically (e.g. "db" → "data", "iot" → "embedded"). Falls back to "basic" if invalid.' },
  { flag: '--framework', short: '-f', desc: 'JS/TS only. Bypass the interactive framework selector. Values: next, react, vue, svelte, solid, angular, express, vanilla.' },
  { flag: '--variant', short: '-v', desc: 'JS/TS only. Select "js" or "ts" mode. Controls file extensions (.js/.jsx vs .ts/.tsx) and compiler configs.' },
  { flag: '--version', short: '', desc: 'Print the current version of ini (v1.0.0).' },
  { flag: '--help', short: '-h', desc: 'Show help text for any command or subcommand.' },
]

const TAXONOMY = [
  { id: 'basic', name: 'Basic / Standard Application', desc: 'Standard entry point boilerplate (hello world).' },
  { id: 'app', name: 'Full Application Structure', desc: 'Comprehensive folder layout with src/, lib/, etc.' },
  { id: 'web', name: 'Web & Internet', desc: 'Servers, frontend frameworks, HTML/CSS apps.' },
  { id: 'api', name: 'API & Web Services', desc: 'REST/JSON APIs — often maps to web template internally.' },
  { id: 'mobile', name: 'Mobile', desc: 'Mobile app scaffolds (Kivy, Flutter, Swift iOS).' },
  { id: 'desktop', name: 'Desktop', desc: 'Native desktop apps (tkinter, Compose, macOS).' },
  { id: 'game', name: 'Games', desc: 'Game dev templates (Pygame, Bevy, Raylib, LÖVE).' },
  { id: 'ai', name: 'AI & Machine Learning', desc: 'PyTorch, ML.NET, or simple AI scaffolds.' },
  { id: 'data', name: 'Data & Databases', desc: 'SQLite, Postgres, pandas, data pipelines.' },
  { id: 'devops', name: 'DevOps & Infrastructure', desc: 'Docker clients, automation, boto3 scripts.' },
  { id: 'network', name: 'Networking', desc: 'TCP/UDP servers, socket programming.' },
  { id: 'security', name: 'Security & Cryptography', desc: 'Encryption, hashing, audit tools.' },
  { id: 'os', name: 'Operating Systems & Low-level', desc: 'Kernel mocks, bootloaders, sysinfo.' },
  { id: 'embedded', name: 'Embedded & IoT', desc: 'Bare-metal loops, HALs, microcontroller stubs.' },
  { id: 'lang', name: 'Languages & Compilers', desc: 'Interpreter/compiler scaffolds, AST modules.' },
  { id: 'finance', name: 'Finance & Trading', desc: 'Stock data, yfinance, trading bots.' },
  { id: 'comm', name: 'Communication', desc: 'Email, SMTP, chat scaffolds.' },
  { id: 'script', name: 'Automation & Scripting', desc: 'CLI scripts with arg parsing.' },
  { id: 'monitor', name: 'Observability & Monitoring', desc: 'Prometheus, psutil monitors.' },
  { id: 'stream', name: 'Messaging & Streaming', desc: 'Queue/threading message pipelines.' },
  { id: 'science', name: 'Science & Research', desc: 'NumPy, SciPy, research scaffolds.' },
  { id: 'media', name: 'Media & Content', desc: 'Image/video processing (Pillow).' },
  { id: 'web3', name: 'Blockchain & Web3', desc: 'Ethereum, go-ethereum, ethers.' },
  { id: 'graphics', name: 'AR / VR / Graphics', desc: 'Graphics rendering, AR/VR stubs.' },
  { id: 'edu', name: 'Education & Productivity', desc: 'Learning tools, planners.' },
  { id: 'business', name: 'Business & Enterprise', desc: 'Enterprise app scaffolds.' },
  { id: 'cli', name: 'Command Line Interface', desc: 'Argument parsing (Cobra, Clap, Typer).' },
  { id: 'math', name: 'Mathematics & Simulation', desc: 'Gonum, ndarray, matrix ops.' },
  { id: 'stats', name: 'Statistics & Analysis', desc: 'Statsmodels, pandas, R analysis.' },
]

const ALIASES = [
  { from: 'db', to: 'data' },
  { from: 'storage', to: 'data' },
  { from: 'iot', to: 'embedded' },
  { from: 'interactive', to: 'cli' },
  { from: 'stat', to: 'stats' },
  { from: 'mac', to: 'desktop' },
  { from: 'ios', to: 'mobile' },
]

const CONFIG_FIELDS = [
  { field: 'Name', type: 'string', desc: 'Project name — used for directory name and module init.' },
  { field: 'Path', type: 'string', desc: 'Resolved absolute filesystem path where the project is created.' },
  { field: 'Language', type: 'string', desc: 'Handler registry key (e.g. "python", "rust", "bun").' },
  { field: 'Type', type: 'string', desc: 'Taxonomy category ID (e.g. "web", "game"). Defaults to "basic".' },
  { field: 'Framework', type: 'string', desc: 'Sub-framework for JS/TS web projects (e.g. "next", "react", "express").' },
  { field: 'Variant', type: 'string', desc: 'Language variant — "js" or "ts" for Bun handler.' },
  { field: 'Git', type: 'bool', desc: 'Whether to initialize a git repo with branch "main".' },
]

interface HandlerInfo {
  name: string
  id: string
  aliases?: string[]
  toolchain: string
  supportedTypes: string[]
  deps: { type: string; packages: string }[]
  logic: string
}

const HANDLERS: HandlerInfo[] = [
  {
    name: 'Go', id: 'go', aliases: ['golang'], toolchain: 'go mod init',
    supportedTypes: ['basic','app','cli','web','api','devops','network','os','data','security','monitor','stream','comm','web3','lang','script','embedded','math','stats'],
    deps: [
      { type: 'data', packages: 'go-sqlite3' },
      { type: 'devops', packages: 'docker/client' },
      { type: 'monitor', packages: 'prometheus/client_golang' },
      { type: 'web3', packages: 'go-ethereum/ethclient' },
      { type: 'cli', packages: 'spf13/cobra' },
      { type: 'math/stats', packages: 'gonum/mat' },
    ],
    logic: 'Module-based scaffolding with go mod init. Template redirects: api→web, cli→script, data→db, embedded→os. Deps injected via go get.'
  },
  {
    name: 'Rust', id: 'rust', aliases: ['rs'], toolchain: 'cargo init',
    supportedTypes: ['basic','app','cli','web','api','script','game','network','os','data','security','graphics','web3','lang','embedded','math','stats'],
    deps: [
      { type: 'web', packages: 'axum, tokio (macros,rt-multi-thread)' },
      { type: 'game', packages: 'bevy' },
      { type: 'data', packages: 'rusqlite (bundled)' },
      { type: 'cli/script', packages: 'clap (derive)' },
      { type: 'os', packages: 'sysinfo' },
      { type: 'network', packages: 'tokio (full)' },
      { type: 'math/stats', packages: 'ndarray' },
    ],
    logic: 'Uses cargo init. Template redirects: api→web, cli→script, embedded→os. Removes auto-created .git dir unless --git is set. Deps added via cargo add with feature flags.'
  },
  {
    name: 'Python', id: 'python', aliases: ['py'], toolchain: 'uv init --app',
    supportedTypes: ['basic','app','cli','web','api','desktop','mobile','game','ai','data','math','stats','devops','network','security','os','lang','finance','comm','script','monitor','stream','science','media','embedded','web3','graphics','edu'],
    deps: [
      { type: 'web/api', packages: 'fastapi, uvicorn' },
      { type: 'ai', packages: 'torch' },
      { type: 'game', packages: 'pygame' },
      { type: 'data', packages: 'pandas, numpy' },
      { type: 'devops', packages: 'boto3' },
      { type: 'security', packages: 'cryptography' },
      { type: 'os/monitor', packages: 'psutil' },
      { type: 'science/math', packages: 'numpy, scipy' },
      { type: 'stats', packages: 'pandas, statsmodels' },
      { type: 'finance', packages: 'yfinance, pandas' },
      { type: 'media', packages: 'pillow' },
      { type: 'mobile', packages: 'kivy' },
      { type: 'cli', packages: 'typer' },
      { type: 'db', packages: 'sqlalchemy' },
    ],
    logic: 'Powered by uv — the fastest Python package manager. Widest taxonomy support (27 types). Removes auto-generated hello.py. Deps added via uv add.'
  },
  {
    name: 'JS/TS (Bun)', id: 'bun', aliases: ['js','ts','node','javascript','typescript'], toolchain: 'bun init -y',
    supportedTypes: ['basic','app','web','api','cli','os','network','data'],
    deps: [
      { type: 'web/next', packages: 'create-next-app (--use-bun)' },
      { type: 'web/express', packages: 'express' },
      { type: 'web/angular', packages: '@angular/cli' },
    ],
    logic: 'Most complex handler. Web type triggers 3-stage picker: Variant (JS/TS) → Category (Frontend/Backend) → Framework (Next/React/Vue/Svelte/Solid/Angular/Vanilla). cli→script, data→db redirects. Variant-aware file filtering: .ts files skipped in JS mode and vice versa.'
  },
  {
    name: 'Assembly', id: 'assembly', aliases: ['asm','nasm'], toolchain: 'NASM + Makefile',
    supportedTypes: ['basic','os','embedded','cli'],
    deps: [],
    logic: 'Focuses on x86-64 NASM. "os" type generates boot.asm (16-bit bootloader with boot signature, runnable via qemu). "embedded" generates bare-metal loop. Robust Makefile for elf64 linking. cli/basic fallback to main.asm.'
  },
  {
    name: 'C', id: 'c', toolchain: 'gcc + Makefile',
    supportedTypes: ['basic','app','cli','embedded','os','network','data','math'],
    deps: [],
    logic: 'Standardizes on Makefile + src/ + include/. "os" type includes <sys/utsname.h> for kernel info. "network" scaffolds a socket-based HTTP server.'
  },
  {
    name: 'C++', id: 'cpp', aliases: ['c++','cxx'], toolchain: 'g++ + Makefile',
    supportedTypes: ['basic','app','cli','embedded','os','network','data','math'],
    deps: [],
    logic: 'Same structure as C handler (Makefile + src/ + include/). Parallel template set for C++ idioms.'
  },
  {
    name: 'Java', id: 'java', toolchain: 'Gradle',
    supportedTypes: ['basic','app','web','api','cli','data','desktop','ai','business'],
    deps: [{ type: 'web', packages: 'Javalin' }],
    logic: 'Gradle-based with auto-generated build.gradle. "web" type uses Javalin. Package naming derived from project name.'
  },
  {
    name: 'Kotlin', id: 'kotlin', aliases: ['kt'], toolchain: 'Gradle (KTS)',
    supportedTypes: ['basic','app','web','api','cli','data','desktop','ai'],
    deps: [{ type: 'desktop', packages: 'Compose Multiplatform' }],
    logic: 'Gradle Kotlin DSL. "desktop" type scaffolds Compose Multiplatform. Package naming from project name.'
  },
  {
    name: 'Swift', id: 'swift', toolchain: 'swift package init',
    supportedTypes: ['basic','cli','server','ios'],
    deps: [{ type: 'server', packages: 'Vapor' }],
    logic: '"server" type adds Vapor. "ios" changes init-type to "library". Overwrites Sources/main.swift with domain-specific logic.'
  },
  {
    name: 'C#', id: 'csharp', aliases: ['cs','c#','dotnet'], toolchain: 'dotnet CLI',
    supportedTypes: ['basic','web','db','desktop','ai'],
    deps: [],
    logic: 'Uses dotnet new console. Template redirects for each taxonomy type.'
  },
  {
    name: 'F#', id: 'fsharp', aliases: ['fs','f#'], toolchain: 'dotnet new',
    supportedTypes: ['basic','web','db','ai'],
    deps: [],
    logic: 'Uses dotnet new console for F#. Similar structure to C# handler.'
  },
  {
    name: 'Zig', id: 'zig', toolchain: 'zig init',
    supportedTypes: ['basic','app','cli','embedded','web','game','data','math'],
    deps: [],
    logic: 'Uses zig init for project setup. Template-based scaffolding with build.zig.'
  },
  {
    name: 'Ruby', id: 'ruby', aliases: ['rb'], toolchain: 'Gemfile + main.rb',
    supportedTypes: ['basic','web','cli','gem'],
    deps: [],
    logic: 'Creates main.rb, Gemfile, lib/ structure. "gem" type scaffolds a proper gem layout.'
  },
  {
    name: 'PHP', id: 'php', toolchain: 'Composer',
    supportedTypes: ['basic','app','cli','web','api'],
    deps: [],
    logic: 'Sets up composer.json, src/ directory. Requires PHP 8.2+.'
  },
  {
    name: 'Dart', id: 'dart', aliases: ['dr'], toolchain: 'dart create',
    supportedTypes: ['basic','app','cli'],
    deps: [],
    logic: 'Uses dart create for scaffolding.'
  },
  {
    name: 'Flutter', id: 'flutter', aliases: ['fl'], toolchain: 'flutter create',
    supportedTypes: ['basic','app','package'],
    deps: [],
    logic: 'Uses flutter create. "package" type scaffolds a Flutter package/library.'
  },
  {
    name: 'Elixir', id: 'elixir', aliases: ['ex','exs'], toolchain: 'mix new',
    supportedTypes: ['basic','app','web','service'],
    deps: [],
    logic: 'Uses mix new for OTP-style scaffolding.'
  },
  {
    name: 'Erlang', id: 'erlang', aliases: ['erl'], toolchain: 'rebar3',
    supportedTypes: ['basic','app','server'],
    deps: [],
    logic: 'Creates OTP application using rebar3.'
  },
  {
    name: 'Haskell', id: 'haskell', aliases: ['hs'], toolchain: 'Cabal',
    supportedTypes: ['basic','cli','web','ai'],
    deps: [],
    logic: 'Cabal-based project with proper module structure.'
  },
  {
    name: 'Lua', id: 'lua', toolchain: 'Lua runtime',
    supportedTypes: ['basic','app','cli','game','web'],
    deps: [],
    logic: 'Simple Lua scaffolding with main.lua entry point.'
  },
  {
    name: 'Perl', id: 'perl', aliases: ['pl'], toolchain: 'cpanfile',
    supportedTypes: ['basic','app','cli','web','data'],
    deps: [],
    logic: 'Creates main.pl, cpanfile, lib/ directory structure.'
  },
  {
    name: 'Nim', id: 'nim', toolchain: 'nimble',
    supportedTypes: ['basic','app','api','cli','web','data','game','embedded','math'],
    deps: [],
    logic: 'Uses nimble for package management and project structure.'
  },
  {
    name: 'Julia', id: 'julia', aliases: ['jl'], toolchain: 'Julia Pkg',
    supportedTypes: ['basic','app','cli','math','data','stats'],
    deps: [],
    logic: 'Julia project with Project.toml and src/ structure.'
  },
  {
    name: 'R', id: 'r', aliases: ['rlang'], toolchain: 'Rprofile',
    supportedTypes: ['basic','app','cli','math','data','stats'],
    deps: [],
    logic: 'R project with main.R, R/ directory, .Rprofile setup.'
  },
  {
    name: 'OCaml', id: 'ocaml', aliases: ['ml'], toolchain: 'dune',
    supportedTypes: ['basic','app','cli','web'],
    deps: [],
    logic: 'Uses dune for build system. Creates bin/, lib/, dune-project.'
  },
  {
    name: 'Clojure', id: 'clojure', aliases: ['clj'], toolchain: 'tools.deps',
    supportedTypes: ['basic','app','web','api','cli','data'],
    deps: [],
    logic: 'Clojure project with deps.edn (tools.deps).'
  },
  {
    name: 'D', id: 'd', aliases: ['dlang'], toolchain: 'dub',
    supportedTypes: ['basic','app','cli','web','api','game','data'],
    deps: [],
    logic: 'Uses dub package manager with source/ directory.'
  },
  {
    name: 'V', id: 'v', aliases: ['vlang'], toolchain: 'v init',
    supportedTypes: ['basic','app','web','api','cli','game','data'],
    deps: [],
    logic: 'Uses v init. Creates main.v and v.mod.'
  },
  {
    name: 'Crystal', id: 'crystal', aliases: ['cr'], toolchain: 'crystal init',
    supportedTypes: ['basic','app','web','api','cli','data'],
    deps: [],
    logic: 'Uses crystal init. Creates src/, shard.yml.'
  },
  {
    name: 'Scala', id: 'scala', toolchain: 'scala-cli',
    supportedTypes: ['basic','cli','web','script'],
    deps: [],
    logic: 'Scala 3 project using scala-cli.'
  },
  {
    name: 'Shell', id: 'shell', aliases: ['sh','bash'], toolchain: 'Bash strict mode',
    supportedTypes: ['basic','app','cli','devops','network','os','security','script','embedded'],
    deps: [],
    logic: 'Creates shell scripts with strict mode (set -euo pipefail). lib/ for shared functions.'
  },
  {
    name: 'Fortran', id: 'fortran', aliases: ['f90','f95','f03'], toolchain: 'fpm',
    supportedTypes: ['basic','app','cli','data','math','stats'],
    deps: [],
    logic: 'Uses Fortran Package Manager (fpm) with app/ directory and fpm.toml.'
  },
  {
    name: 'Objective-C', id: 'objc', aliases: ['objective-c','objectivec'], toolchain: 'Makefile',
    supportedTypes: ['basic','app','cli','desktop','mobile'],
    deps: [],
    logic: 'Objective-C project with Makefile-based build.'
  },
  {
    name: 'Groovy', id: 'groovy', toolchain: 'Gradle',
    supportedTypes: ['basic','app','web','api','cli','data'],
    deps: [],
    logic: 'Gradle-based Groovy project.'
  },
  {
    name: 'Pascal', id: 'pascal', toolchain: 'Free Pascal',
    supportedTypes: ['basic','app','cli','desktop'],
    deps: [],
    logic: 'Free Pascal compiler project structure.'
  },
  {
    name: 'Ada', id: 'ada', toolchain: 'GNAT/gprbuild',
    supportedTypes: ['basic','app','cli','embedded','os'],
    deps: [],
    logic: 'Ada project with gprbuild configuration.'
  },
  {
    name: 'COBOL', id: 'cobol', toolchain: 'GnuCOBOL',
    supportedTypes: ['basic','app','cli','business','data','interactive'],
    deps: [],
    logic: 'GnuCOBOL project. "interactive" maps to TUI/ACCEPT-based COBOL programs.'
  },
]

const INTERNAL_MAPPINGS = [
  { req: 'api', internal: 'web', langs: 'Go, Rust, Python, Bun, Clojure, Crystal, D, Kotlin, V' },
  { req: 'cli', internal: 'script', langs: 'Go, Rust, Bun, Python' },
  { req: 'data', internal: 'db', langs: 'Go, Rust, Bun, Nim, Perl, Kotlin, Python' },
  { req: 'embedded', internal: 'os', langs: 'Go, Rust, Assembly, Shell, Ada' },
  { req: 'math / stats', internal: 'science / basic', langs: 'Python, Go, Rust, Fortran, R, Julia' },
  { req: 'ios', internal: 'mobile / library', langs: 'Swift, Objective-C' },
  { req: 'app', internal: 'basic / script', langs: 'Go, Rust, Python, Bun' },
  { req: 'desktop', internal: 'basic', langs: 'Go, Python (tkinter built-in)' },
]

/* ── Component ────────────────────────────────────────────────────── */

export function Docs() {
  const [search, setSearch] = useState('')
  const [activeSection, setActiveSection] = useState('installation')

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveSection(e.target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const filteredHandlers = HANDLERS.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.id.toLowerCase().includes(search.toLowerCase()) ||
    (h.aliases || []).some(a => a.includes(search.toLowerCase()))
  )

  return (
    <div className="container relative z-10 pb-32">
      {/* Header */}
      <header className="flex justify-between items-center py-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-white/10">
            <Zap size={24} className="text-black fill-black" />
          </div>
          <div className="text-3xl font-black tracking-tighter text-white">ini</div>
        </Link>
        <nav className="flex items-center gap-3">
          <Link to="/" className="nav-button"><BookOpen size={16} /><span>Home</span></Link>
          <a href="https://github.com/Woeter69/ini" target="_blank" rel="noopener noreferrer" className="nav-button">
            <Github size={16} /><span>GitHub</span>
          </a>
        </nav>
      </header>

      {/* Title */}
      <main className="mt-16">
        <div className="max-w-3xl mb-20">
          <p className="text-sm font-semibold tracking-widest uppercase text-[var(--primary)] mb-4">Reference Guide</p>
          <h1 className="text-7xl font-black text-white mb-6 tracking-tighter leading-[0.9]">Docu&shy;mentation</h1>
          <p className="text-lg text-[var(--muted)] leading-relaxed max-w-2xl">
            The complete reference for every flag, taxonomy category, handler, and internal mapping — covering all <span className="text-white font-semibold">39 languages</span> and <span className="text-white font-semibold">29 project types</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-16">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-0.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] mb-4 px-3">On this page</p>
              {SECTIONS.map(s => (
                <a key={s.id} href={`#${s.id}`}
                  className={`sidebar-link ${activeSection === s.id ? 'active' : ''}`}>
                  <span className={`sidebar-icon transition-colors duration-200 ${activeSection === s.id ? 'text-[var(--primary)]' : 'text-[var(--muted)]'}`}>{s.icon}</span>
                  <span className="font-medium">{s.title}</span>
                </a>
              ))}
              <div className="pt-8 px-1">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] opacity-60" />
                  <input type="text" placeholder="Filter handlers..."
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)] focus:bg-white/[0.05] transition-all duration-300"
                    value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-36 min-w-0">
            {/* ─── INSTALLATION ─── */}
            <section id="installation" className="doc-section scroll-mt-20">
              <SectionHeader icon={<Download size={26} />} title="Installation" color="primary" />
              <div className="space-y-8">
                <p className="text-[var(--muted)] text-lg leading-relaxed">Install ini with a single command:</p>
                <div className="code-block" data-lang="bash">
                  <span className="text-[var(--success)]">$</span> <span className="text-white">curl -fsSL https://ini.woeter.online/install.sh | bash</span>
                </div>
                <p className="text-[var(--muted)] text-base">Or build from source:</p>
                <div className="code-block" data-lang="bash">
                  <span className="text-[var(--success)]">$</span> <span className="text-white">go install github.com/Woeter69/ini@latest</span>
                </div>
                <div className="doc-card">
                  <h4 className="text-white font-bold mb-3 text-sm tracking-wide">Prerequisites</h4>
                  <ul className="text-[var(--muted)] text-sm space-y-2">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] flex-shrink-0" /><a href="https://go.dev/dl/" className="text-[var(--secondary)] hover:underline">Go 1.21+</a> (for building from source)</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] flex-shrink-0" />Language-specific toolchains as needed (e.g. <code className="text-[var(--secondary)]">uv</code>, <code className="text-[var(--secondary)]">cargo</code>, <code className="text-[var(--secondary)]">bun</code>, <code className="text-[var(--secondary)]">nasm</code>)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ─── QUICK START ─── */}
            <section id="quickstart" className="doc-section scroll-mt-20">
              <SectionHeader icon={<Sparkles size={26} />} title="Quick Start" color="secondary" />
              <div className="space-y-8">
                <p className="text-[var(--muted)] text-lg leading-relaxed">Three ways to use ini:</p>
                <div className="grid gap-5">
                  {[
                    { title: 'Interactive Mode', cmd: 'ini', desc: 'Opens the universal language picker TUI — browse and select from all 39 languages.' },
                    { title: 'Direct Scaffolding', cmd: 'ini go my-app', desc: 'Specify language and project name inline. Type selection becomes interactive if the handler supports multiple types.' },
                    { title: 'Fully Non-Interactive', cmd: 'ini bun web-app --type web --framework next --variant ts', desc: 'Pass all flags to skip every prompt. Perfect for CI/CD pipelines.' },
                  ].map(ex => (
                    <div key={ex.title} className="doc-card">
                      <div className="relative z-10">
                        <h4 className="text-white font-bold mb-3 text-base">{ex.title}</h4>
                        <div className="code-block mb-4" data-lang="bash">
                          <span className="text-[var(--success)]">$</span> <span className="text-white">{ex.cmd}</span>
                        </div>
                        <p className="text-[var(--muted)] text-sm leading-relaxed">{ex.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── CLI FLAGS ─── */}
            <section id="cli" className="doc-section scroll-mt-20">
              <SectionHeader icon={<Terminal size={26} />} title="CLI Flags" color="primary" />
              <div className="space-y-8">
                <div className="code-block" data-lang="usage">
                  <span className="text-[var(--success)]">$</span> ini <span className="text-white">[language] [project-name]</span> <span className="text-[var(--secondary)]">[flags]</span>
                </div>
                <div className="grid gap-4">
                  {FLAGS.map(f => (
                    <div key={f.flag} className="doc-card">
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <code className="text-base font-bold text-[var(--secondary)]">{f.flag}</code>
                          {f.short && <code className="text-xs bg-white/[0.04] px-2 py-0.5 rounded text-[var(--muted)]">{f.short}</code>}
                          <div className="h-px bg-white/[0.04] flex-grow" />
                        </div>
                        <p className="text-[var(--muted)] text-sm leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── INTERACTIVE MODE ─── */}
            <section id="interactive" className="doc-section scroll-mt-20">
              <SectionHeader icon={<Workflow size={26} />} title="Interactive Mode" color="secondary" />
              <div className="space-y-8">
                <p className="text-[var(--muted)] text-lg leading-relaxed">When run without sufficient arguments, ini enters an interactive TUI powered by <a href="https://charm.sh" className="text-[var(--secondary)] hover:underline font-medium">Charm.sh</a> libraries (<code className="text-[var(--secondary)]">huh</code>, <code className="text-[var(--secondary)]">lipgloss</code>).</p>
                <div className="space-y-5">
                  {[
                    { step: '1', title: 'Language Selection', desc: 'All 39 registered subcommands are shown in an alphabetically sorted select list (height: 15 items visible).', cond: 'No language argument provided' },
                    { step: '2', title: 'Project Name', desc: 'Text input with validation — rejects empty names and special characters ( /\\:*?"<>|).', cond: 'No name argument provided' },
                    { step: '3', title: 'Project Type', desc: 'Select from the handler\'s supported taxonomy types.', cond: '--type not set AND handler supports multiple types' },
                    { step: '4', title: 'Variant (JS/TS)', desc: 'Choose TypeScript (TSX/TS) or JavaScript (JSX/JS). Auto-detected from alias (e.g. "ini ts" → ts).', cond: 'Bun handler AND --variant not set' },
                    { step: '5', title: 'Category (Frontend/Backend)', desc: 'Frontend (framework selector) or Backend (auto-selects Express).', cond: 'Bun + type "web" AND --framework not set' },
                    { step: '6', title: 'Framework', desc: 'Choose from Next.js, React, Vue, Svelte, Solid, Angular, or Vanilla.', cond: 'Category is "frontend"' },
                  ].map(s => (
                    <div key={s.step} className="flow-step">
                      <div className="flow-number">{s.step}</div>
                      <div className="flex-1 doc-card">
                        <div className="relative z-10">
                          <h4 className="text-white font-bold mb-2">{s.title}</h4>
                          <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">{s.desc}</p>
                          <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--primary)] bg-[var(--primary)]/[0.08] px-3 py-1 rounded-full border border-[var(--primary)]/20">
                            <Sparkles size={10} />
                            {s.cond}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── TAXONOMY ─── */}
            <section id="taxonomy" className="doc-section scroll-mt-20">
              <SectionHeader icon={<Layout size={26} />} title="Project Taxonomy" color="secondary" />
              <div className="space-y-10">
                <p className="text-lg text-[var(--muted)] leading-relaxed">
                  The global taxonomy defines <span className="text-white font-semibold">29 canonical project categories</span>. Each language handler declares which subset it supports.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TAXONOMY.map(t => (
                    <div key={t.id} className="taxonomy-card">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{t.name}</span>
                        <code className="text-[10px] bg-white/[0.04] px-2.5 py-1 rounded-md text-[var(--secondary)] font-semibold">{t.id}</code>
                      </div>
                      <p className="text-xs text-[var(--muted)] leading-relaxed">{t.desc}</p>
                    </div>
                  ))}
                </div>
                {/* Aliases */}
                <div className="doc-card" style={{ background: 'rgba(139, 92, 246, 0.06)' }}>
                  <div className="relative z-10">
                    <h4 className="text-white font-bold mb-5 flex items-center gap-2.5 text-base">
                      <GitBranch size={18} className="text-[var(--primary)]" /> Alias Resolution
                    </h4>
                    <p className="text-[var(--muted)] text-sm mb-5 leading-relaxed">These aliases are resolved automatically before handler lookup:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {ALIASES.map(a => (
                        <div key={a.from} className="alias-arrow">
                          <code className="text-[var(--muted)] text-sm">{a.from}</code>
                          <ArrowRight size={12} className="text-[var(--primary)] opacity-60" />
                          <code className="text-white font-mono font-bold text-sm">{a.to}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── PROJECT CONFIG ─── */}
            <section id="config" className="doc-section scroll-mt-20">
              <SectionHeader icon={<Settings size={26} />} title="ProjectConfig Struct" color="primary" />
              <div className="space-y-8">
                <p className="text-[var(--muted)] text-lg leading-relaxed">The central data structure passed to every handler's <code className="text-[var(--secondary)]">Init()</code> method:</p>
                <div className="doc-card !p-0 overflow-hidden">
                  <table className="doc-table">
                    <thead>
                      <tr>
                        <th>Field</th>
                        <th>Type</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CONFIG_FIELDS.map(f => (
                        <tr key={f.field}>
                          <td className="font-mono text-[var(--secondary)] font-bold text-sm">{f.field}</td>
                          <td className="font-mono text-[var(--muted)] text-xs">{f.type}</td>
                          <td className="text-[var(--muted)] text-sm leading-relaxed">{f.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ─── HANDLERS ─── */}
            <section id="handlers" className="doc-section scroll-mt-20">
              <SectionHeader icon={<Cpu size={26} />} title="Language Handlers" color="success" subtitle={`${filteredHandlers.length} of ${HANDLERS.length} handlers`} />
              <div className="space-y-12">
                {filteredHandlers.map(h => (
                  <div key={h.id} className="handler-timeline">
                    <div className="handler-dot" />
                    <div className="flex items-baseline gap-3 mb-4 flex-wrap">
                      <h3 className="text-2xl font-black text-white">{h.name}</h3>
                      <code className="text-xs text-[var(--muted)] bg-white/[0.03] px-2 py-0.5 rounded">ini {h.id}</code>
                      {h.aliases && <div className="flex gap-1.5 flex-wrap">{h.aliases.map(a => <span key={a} className="lang-badge">{a}</span>)}</div>}
                    </div>
                    <div className="doc-card">
                      <div className="relative z-10">
                        <div className="flex flex-wrap gap-4 mb-5 text-xs">
                          <div className="flex items-center gap-2"><span className="text-[var(--muted)]">Toolchain</span> <span className="text-white font-bold bg-white/[0.04] px-2.5 py-0.5 rounded">{h.toolchain}</span></div>
                          <div className="flex items-center gap-2"><span className="text-[var(--muted)]">Types</span> <span className="text-white font-bold bg-white/[0.04] px-2 py-0.5 rounded">{h.supportedTypes.length}</span></div>
                        </div>
                        <p className="text-[var(--muted)] text-sm leading-[1.8] mb-5">{h.logic}</p>
                        {/* Supported types */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {h.supportedTypes.map(t => <span key={t} className="lang-badge">{t}</span>)}
                        </div>
                        {/* Dependencies */}
                        {h.deps.length > 0 && (
                          <div className="mt-5 pt-5 border-t border-white/[0.04]">
                            <div className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-[0.2em] mb-4">Auto-injected Dependencies</div>
                            <div className="grid gap-3">
                              {h.deps.map((d, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm">
                                  <code className="text-[var(--secondary)] text-xs min-w-[90px] font-semibold">{d.type}</code>
                                  <ChevronRight size={12} className="text-[var(--muted)] opacity-40" />
                                  <span className="dep-chip">{d.packages}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── SCAFFOLD UTILITIES ─── */}
            <section id="scaffold" className="doc-section scroll-mt-20">
              <SectionHeader icon={<Package size={26} />} title="Scaffold Utilities" color="secondary" />
              <div className="space-y-5">
                <p className="text-[var(--muted)] text-lg leading-relaxed mb-3">Shared helper functions used by all 39 handlers:</p>
                {[
                  { fn: 'scaffold.CreateDir(path)', desc: 'Creates the project directory with os.MkdirAll (0755 permissions).' },
                  { fn: 'scaffold.WriteGitignore(dir, lang)', desc: 'Writes a language-specific .gitignore from the embedded gitignore.go template store.' },
                  { fn: 'scaffold.WriteReadme(dir, name, lang)', desc: 'Generates a README.md with project name, language badge, and quickstart commands.' },
                  { fn: 'scaffold.InitGit(dir)', desc: 'Runs "git init -b main" if git is available. Skips gracefully if git is not found.' },
                ].map(u => (
                  <div key={u.fn} className="doc-card">
                    <div className="relative z-10">
                      <code className="text-[var(--secondary)] font-bold text-sm">{u.fn}</code>
                      <p className="text-[var(--muted)] text-sm mt-3 leading-relaxed">{u.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── INTERNAL MAPPINGS ─── */}
            <section id="mappings" className="doc-section scroll-mt-20">
              <SectionHeader icon={<Code size={26} />} title="Internal Mappings" color="amber" />
              <div className="doc-card !p-0 overflow-hidden">
                <table className="doc-table">
                  <thead>
                    <tr>
                      <th>Requested Type</th>
                      <th>Internal Redirect</th>
                      <th>Affected Languages</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INTERNAL_MAPPINGS.map((row, i) => (
                      <tr key={i}>
                        <td className="font-mono text-[var(--secondary)] font-semibold">{row.req}</td>
                        <td className="font-mono text-white font-medium">{row.internal}</td>
                        <td className="text-[var(--muted)] text-sm">{row.langs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ─── ARCHITECTURE ─── */}
            <section id="architecture" className="doc-section scroll-mt-20">
              <SectionHeader icon={<Layers size={26} />} title="Architecture" color="primary" />
              <div className="space-y-8">
                <p className="text-[var(--muted)] text-lg leading-relaxed">ini is built with a clean, modular Go architecture:</p>
                <div className="grid gap-4">
                  {[
                    { pkg: 'cmd/', desc: 'Cobra command tree — root.go (interactive picker), lang_cmd.go (subcommand factory), langs.go (39 registrations).' },
                    { pkg: 'internal/handler/', desc: '39 handler files implementing the Handler interface. TypedHandler for multi-type support. Global registry via Register().' },
                    { pkg: 'internal/taxonomy/', desc: 'Global project categories (29) with alias resolution. Canonical(), GetName(), IsValid() functions.' },
                    { pkg: 'internal/scaffold/', desc: 'Shared utilities: CreateDir, WriteGitignore, WriteReadme, InitGit.' },
                    { pkg: 'internal/templates/', desc: 'Embedded filesystem (go:embed) with per-language template directories. Go text/template engine with [[ ]] delimiters for Bun.' },
                    { pkg: 'internal/ui/', desc: 'Brand colors, lipgloss styles, ASCII banner, CheckMark/CrossMark/Arrow constants.' },
                  ].map(p => (
                    <div key={p.pkg} className="doc-card flex gap-5 items-start">
                      <div className="relative z-10 flex gap-5 items-start">
                        <code className="text-[var(--secondary)] font-bold text-sm whitespace-nowrap mt-0.5">{p.pkg}</code>
                        <p className="text-[var(--muted)] text-sm leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="doc-card">
                  <div className="relative z-10">
                    <h4 className="text-white font-bold mb-5 flex items-center gap-2.5 text-base">
                      <ExternalLink size={16} className="text-[var(--primary)]" /> Key Interfaces
                    </h4>
                    <div className="code-block" data-lang="go">
                      <div className="text-[var(--muted)]">
                        <span className="text-[var(--primary)]">type</span> <span className="text-white">Handler</span> interface {'{'}<br />
                        {'  '}<span className="text-[var(--secondary)]">Name</span>() string<br />
                        {'  '}<span className="text-[var(--secondary)]">Validate</span>() error<br />
                        {'  '}<span className="text-[var(--secondary)]">Init</span>(config ProjectConfig) error<br />
                        {'}'}<br /><br />
                        <span className="text-[var(--primary)]">type</span> <span className="text-white">TypedHandler</span> interface {'{'}<br />
                        {'  '}<span className="text-[var(--secondary)]">SupportedTypes</span>() []string<br />
                        {'}'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="mt-40 pt-16 border-t border-white/[0.06] text-center">
        <p className="text-sm text-[var(--muted)]">Built with ❤️ by <a href="https://github.com/Woeter69" className="text-[var(--secondary)] hover:underline font-medium">Woeter</a></p>
        <p className="text-[10px] mt-3 uppercase tracking-[0.25em] text-[var(--muted)] opacity-25">Universal Project Initializer &copy; 2026</p>
      </footer>
    </div>
  )
}

/* ── Helpers ──────────────────────────────────────────────────────── */

function SectionHeader({ icon, title, color, subtitle }: { icon: React.ReactNode; title: string; color: string; subtitle?: string }) {
  const colorMap: Record<string, string> = {
    primary: 'bg-[var(--primary)]/15 text-[var(--primary)]',
    secondary: 'bg-[var(--secondary)]/15 text-[var(--secondary)]',
    success: 'bg-[var(--success)]/15 text-[var(--success)]',
    amber: 'bg-amber-500/15 text-amber-500',
  }
  return (
    <div className="flex items-center gap-5 mb-10">
      <div className={`section-icon ${colorMap[color]}`}>{icon}</div>
      <div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-[var(--muted)] mt-1.5 font-medium">{subtitle}</p>}
      </div>
    </div>
  )
}
