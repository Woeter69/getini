import React, { useState, useEffect, useRef } from 'react';

type StepType = 'command' | 'select' | 'input' | 'success' | 'text';

interface TerminalLine {
  type: StepType;
  content: string;
  options?: string[];
  selectedIndex?: number;
  label?: string;
  value?: string;
}

interface VFSNode {
  type: 'dir' | 'project';
  files: string[]; // List of names in this directory
  lang?: string;
}

const LANGUAGES = [
  'Go', 'Rust', 'Python', 'Bun', 'Java', 'Kotlin', 'C', 'C++', 'C#', 'Zig', 
  'Swift', 'PHP', 'Ruby', 'Dart', 'Flutter', 'Elixir', 'Erlang', 'Haskell', 
  'Lua', 'Perl', 'Nim', 'Julia', 'R', 'OCaml', 'Clojure', 'D', 'V', 
  'Crystal', 'F#', 'Objective-C', 'Groovy', 'Pascal', 'Ada', 'COBOL', 
  'Scala', 'Shell', 'Assembly', 'Fortran'
];

const TYPES: Record<string, string[]> = {
  'Go': ['Basic Application', 'Full Application', 'CLI Tool', 'Web & Internet', 'API & Web Services', 'DevOps & Infrastructure', 'Networking', 'Operating Systems', 'Data & Databases', 'Security & Cryptography', 'Observability & Monitoring', 'Messaging & Streaming', 'Communication', 'Blockchain & Web3', 'Languages & Compilers', 'Automation & Scripting'],
  'Rust': ['Basic Application', 'Full Application', 'CLI Tool', 'Web & Internet', 'API & Web Services', 'Automation & Scripting', 'Games', 'Networking', 'Operating Systems', 'Data & Databases', 'Security & Cryptography', 'AR / VR / Graphics', 'Blockchain & Web3', 'Languages & Compilers'],
  'Python': ['Basic Application', 'Full Application', 'CLI Tool', 'Web & Internet', 'API & Web Services', 'Desktop', 'Mobile', 'Games', 'AI & Machine Learning', 'Data & Databases', 'Mathematics & Simulation', 'Statistics & Analysis', 'DevOps & Infrastructure'],
  'Bun': ['Basic Application', 'Full Application', 'Web & Internet', 'API & Web Services', 'CLI Tool', 'Operating Systems', 'Networking', 'Data & Databases'],
  'Java': ['Basic Application', 'Full Application', 'Web & Internet', 'API & Web Services', 'CLI Tool', 'Data & Databases', 'Desktop', 'AI & Machine Learning', 'Business & Enterprise'],
  'Kotlin': ['Basic Application', 'Full Application', 'Web & Internet', 'API & Web Services', 'CLI Tool', 'Data & Databases', 'Desktop', 'AI & Machine Learning'],
  'C': ['Basic Application', 'Full Application', 'CLI Tool', 'Embedded & IoT', 'Operating Systems', 'Networking', 'Data & Databases', 'Mathematics & Simulation'],
  'C++': ['Basic Application', 'Full Application', 'CLI Tool', 'Embedded & IoT', 'Operating Systems', 'Networking', 'Data & Databases', 'Mathematics & Simulation'],
  'C#': ['Basic Application', 'Web & Internet', 'Data & Databases', 'Desktop', 'AI & Machine Learning'],
  'Zig': ['Basic Application', 'Full Application', 'CLI Tool', 'Embedded & IoT', 'Web & Internet', 'Games', 'Data & Databases', 'Mathematics & Simulation'],
  'Swift': ['Basic Application', 'CLI Tool', 'Server Application', 'Mobile'],
  'PHP': ['Basic Application', 'Full Application', 'CLI Tool', 'Web & Internet', 'API & Web Services'],
  'Ruby': ['Basic Application', 'Web & Internet', 'CLI Tool', 'Ruby Gem'],
  'Dart': ['Basic Application', 'Full Application', 'CLI Tool'],
  'Flutter': ['Basic Application', 'Full Application', 'Package / Library'],
  'Elixir': ['Basic Application', 'Full Application', 'Web & Internet', 'Service / Worker'],
  'Erlang': ['Basic Application', 'Full Application', 'Server Application'],
  'Haskell': ['Basic Application', 'CLI Tool', 'Web & Internet', 'AI & Machine Learning'],
  'Lua': ['Basic Application', 'Full Application', 'CLI Tool', 'Games', 'Web & Internet'],
  'Perl': ['Basic Application', 'Full Application', 'CLI Tool', 'Web & Internet', 'Data & Databases'],
  'Nim': ['Basic Application', 'Full Application', 'API & Web Services', 'CLI Tool', 'Web & Internet', 'Data & Databases', 'Games', 'Embedded & IoT', 'Mathematics & Simulation'],
  'Julia': ['Basic Application', 'Full Application', 'CLI Tool', 'Mathematics & Simulation', 'Data & Databases', 'Statistics & Analysis'],
  'R': ['Basic Application', 'Full Application', 'CLI Tool', 'Mathematics & Simulation', 'Data & Databases', 'Statistics & Analysis'],
  'OCaml': ['Basic Application', 'Full Application', 'CLI Tool', 'Web & Internet'],
  'Clojure': ['Basic Application', 'Full Application', 'Web & Internet', 'API & Web Services', 'CLI Tool', 'Data & Databases'],
  'D': ['Basic Application', 'Full Application', 'CLI Tool', 'Web & Internet', 'API & Web Services', 'Games', 'Data & Databases'],
  'V': ['Basic Application', 'Full Application', 'Web & Internet', 'API & Web Services', 'CLI Tool', 'Games', 'Data & Databases'],
  'Crystal': ['Basic Application', 'Full Application', 'Web & Internet', 'API & Web Services', 'CLI Tool', 'Data & Databases'],
  'F#': ['Basic Application', 'Web & Internet', 'Data & Databases', 'AI & Machine Learning'],
  'Objective-C': ['Basic Application', 'Full Application', 'CLI Tool', 'Desktop', 'Mobile'],
  'Groovy': ['Basic Application', 'Full Application', 'Web & Internet', 'API & Web Services', 'CLI Tool', 'Data & Databases'],
  'Pascal': ['Basic Application', 'Full Application', 'CLI Tool', 'Desktop'],
  'Ada': ['Basic Application', 'Full Application', 'CLI Tool', 'Embedded & IoT', 'Operating Systems'],
  'COBOL': ['Basic Application', 'Full Application', 'CLI Tool', 'Business & Enterprise', 'Data & Databases', 'Interactive / TUI'],
  'Scala': ['Basic Application', 'CLI Tool', 'Web & Internet', 'Automation & Scripting'],
  'Shell': ['Basic Application', 'Full Application', 'CLI Tool', 'DevOps & Infrastructure', 'Networking', 'Operating Systems', 'Security & Cryptography', 'Automation & Scripting', 'Embedded & IoT'],
  'Assembly': ['Basic Application', 'Operating Systems', 'Embedded & IoT', 'CLI Tool'],
  'Fortran': ['Basic Application', 'Full Application', 'CLI Tool', 'Data & Databases', 'Mathematics & Simulation', 'Statistics & Analysis']
};

const PROJECT_STRUCTURES: Record<string, string[]> = {
  'Go': ['main.go', 'go.mod', 'go.sum', 'README.md', '.gitignore'],
  'Rust': ['src/', 'Cargo.toml', 'README.md', '.gitignore'],
  'Python': ['main.py', 'pyproject.toml', 'uv.lock', 'README.md', '.gitignore'],
  'Bun': ['index.ts', 'package.json', 'bun.lock', 'README.md', '.gitignore'],
  'C': ['src/', 'include/', 'Makefile', 'README.md', '.gitignore'],
  'C++': ['src/', 'include/', 'Makefile', 'README.md', '.gitignore'],
  'Java': ['app/', 'gradle/', 'build.gradle', 'gradlew', 'README.md', '.gitignore'],
  'Kotlin': ['app/', 'gradle/', 'build.gradle.kts', 'gradlew', 'README.md', '.gitignore'],
  'Zig': ['src/', 'build.zig', 'README.md', '.gitignore'],
  'Swift': ['Sources/', 'Package.swift', 'README.md', '.gitignore'],
  'Assembly': ['src/', 'Makefile', 'README.md', '.gitignore'],
  'Shell': ['main.sh', 'lib/', 'README.md', '.gitignore'],
  'C#': ['Program.cs', 'project.csproj', 'README.md', '.gitignore'],
  'Flutter': ['lib/', 'pubspec.yaml', 'android/', 'ios/', 'README.md', '.gitignore'],
  'PHP': ['src/', 'composer.json', 'README.md', '.gitignore'],
  'Nim': ['src/', 'project.nimble', 'README.md', '.gitignore'],
  'Crystal': ['src/', 'shard.yml', 'README.md', '.gitignore'],
  'D': ['source/', 'dub.json', 'README.md', '.gitignore'],
  'V': ['main.v', 'v.mod', 'README.md', '.gitignore'],
  'Fortran': ['app/', 'fpm.toml', 'README.md', '.gitignore'],
  'OCaml': ['bin/', 'lib/', 'dune-project', 'README.md', '.gitignore'],
};

const BANNER = `
  ___       ___
 |_ _|_ __ |_ _|
  | || '_ \\ | |
  | || | | || |
 |___|_| |_|___| v1.0.0
  Blazing fast project initializer
`;

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'text', content: BANNER } as TerminalLine,
    { type: 'text', content: 'Type "ini" to start or "help" for commands.' } as TerminalLine
  ]);
  
  const [vfs, setVfs] = useState<Record<string, VFSNode>>({
    '~': { type: 'dir', files: ['blog', 'docs', 'README.md', 'LICENSE'] },
    '~/blog': { type: 'dir', files: ['welcome.md', 'scaffolding-fast.md'] },
    '~/docs': { type: 'dir', files: ['usage.md', 'api.md'] },
  });

  const [cwd, setCwd] = useState('~');
  const [input, setInput] = useState('');
  const [mode, setStateMode] = useState<'shell' | 'init_lang' | 'init_name' | 'init_type'>('shell');
  const [selectionIndex, setSelectionIndex] = useState(0);
  const [currentLang, setCurrentLang] = useState('');
  const [projectName, setProjectName] = useState('');
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, mode, selectionIndex]);

  useEffect(() => {
    if (mode === 'init_lang' || mode === 'init_type') {
      activeItemRef.current?.scrollIntoView({ block: 'nearest', behavior: 'auto' });
    }
  }, [selectionIndex, mode]);

  const handleCommand = (fullCmd: string) => {
    const args = fullCmd.trim().split(/\s+/);
    const cmd = args[0].toLowerCase();
    const newHistory: TerminalLine[] = [...history, { type: 'command', content: fullCmd }];
    
    if (cmd === 'ini') {
      setHistory(newHistory);
      setStateMode('init_lang');
      setSelectionIndex(0);
    } else if (cmd === 'ls') {
      const node = vfs[cwd];
      if (node) {
        setHistory([...newHistory, { type: 'text', content: node.files.join('  ') } as TerminalLine]);
      }
    } else if (cmd === 'cd') {
      const target = args[1];
      if (!target || target === '~' || target === '/') {
        setCwd('~');
        setHistory(newHistory);
      } else if (target === '..') {
        if (cwd !== '~') {
          const parts = cwd.split('/');
          parts.pop();
          const targetPath = parts.join('/');
          setCwd(targetPath || '~');
          setHistory(newHistory);
        } else {
          setHistory(newHistory);
        }
      } else {
        const targetPath = cwd === '~' ? `~/${target}` : `${cwd}/${target}`;
        if (vfs[targetPath]) {
          setCwd(targetPath);
          setHistory(newHistory);
        } else {
          setHistory([...newHistory, { type: 'text', content: `cd: no such directory: ${target}` } as TerminalLine]);
        }
      }
    } else if (cmd === 'pwd') {
      setHistory([...newHistory, { type: 'text', content: cwd.replace('~', '/home/user') } as TerminalLine]);
    } else if (cmd === 'whoami') {
      setHistory([...newHistory, { type: 'text', content: 'developer' } as TerminalLine]);
    } else if (cmd === 'help') {
      setHistory([...newHistory, { type: 'text', content: 'Available commands: ini, ls, cd, pwd, whoami, clear, version, help' } as TerminalLine]);
    } else if (cmd === 'clear') {
      setHistory([]);
    } else if (cmd === 'version') {
      setHistory([...newHistory, { type: 'text', content: 'ini v1.0.0' } as TerminalLine]);
    } else if (cmd !== '') {
      setHistory([...newHistory, { type: 'text', content: `command not found: ${cmd}` } as TerminalLine]);
    } else {
      setHistory(newHistory);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (mode === 'shell') {
      if (e.key === 'Enter') {
        handleCommand(input);
        setInput('');
      }
    } else if (mode === 'init_lang') {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectionIndex(prev => (prev + 1) % LANGUAGES.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectionIndex(prev => (prev - 1 + LANGUAGES.length) % LANGUAGES.length);
      } else if (e.key === 'Enter') {
        const selected = LANGUAGES[selectionIndex];
        setCurrentLang(selected);
        setHistory([...history, { 
          type: 'text', 
          content: '? Choose your project\'s primary language: ' + selected,
          label: 'done' 
        } as TerminalLine]);
        setStateMode('init_name');
      }
    } else if (mode === 'init_type') {
      const types = TYPES[currentLang] || ['Basic Application'];
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectionIndex(prev => (prev + 1) % types.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectionIndex(prev => (prev - 1 + types.length) % types.length);
      } else if (e.key === 'Enter') {
        const finalType = types[selectionIndex];
        const projectPath = cwd === '~' ? `~/${projectName}` : `${cwd}/${projectName}`;
        const projectFiles = PROJECT_STRUCTURES[currentLang] || ['main.ext', 'README.md', '.gitignore'];
        
        // Update VFS with new project and its internal files/dirs
        setVfs(prev => {
          const updated = { ...prev };
          // Add project to current dir listing
          updated[cwd] = { ...updated[cwd], files: Array.from(new Set([...updated[cwd].files, projectName])) };
          // Create project directory node
          updated[projectPath] = { type: 'project', lang: currentLang, files: projectFiles };
          // Create nodes for project subdirectories
          projectFiles.forEach(f => {
            if (f.endsWith('/')) {
              const subPath = `${projectPath}/${f.slice(0, -1)}`;
              updated[subPath] = { type: 'dir', files: ['sample.ext'] };
            }
          });
          return updated;
        });

        setHistory([...history, { 
          type: 'text', 
          content: '? What kind of ' + currentLang + ' project are you building?: ' + finalType,
          label: 'done'
        } as TerminalLine, {
          type: 'success',
          content: `🚀 Successfully initialized ${currentLang} ${finalType} project in ./${projectName}`
        } as TerminalLine]);
        
        setStateMode('shell');
        setProjectName('');
        setCurrentLang('');
      }
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'init_name' && input.trim() !== '') {
      const name = input.trim();
      setProjectName(name);
      setHistory([...history, { type: 'text', content: '? Project name: ' + name } as TerminalLine]);
      setInput('');
      setStateMode('init_type');
      setSelectionIndex(0);
    }
  };

  return (
    <div 
      className="glass-dark" 
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
      style={{ 
        width: '100%', 
        maxWidth: '800px', 
        margin: '2rem auto', 
        height: '450px', 
        overflow: 'hidden',
        textAlign: 'left',
        cursor: 'text',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.9rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Fixed Header */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        padding: '1rem 1.5rem', 
        background: 'rgba(15, 23, 42, 0.95)', 
        borderBottom: '1px solid var(--border)',
        zIndex: 10 
      }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
      </div>
      
      {/* Scrollable Content */}
      <div 
        ref={terminalRef}
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '1rem 1.5rem',
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none'
        }}
      >
        {history.map((line, i) => (
          <div key={i} style={{ marginBottom: '0.5rem', whiteSpace: 'pre-wrap' }}>
            {line.type === 'command' && (
              <div>
                <span style={{ color: 'var(--success)' }}>developer@getini</span>
                <span style={{ color: 'var(--text)' }}>:</span>
                <span style={{ color: 'var(--secondary)' }}>{cwd}</span>
                <span style={{ color: 'var(--text)' }}>$</span> {line.content}
              </div>
            )}
            {line.type === 'text' && (
              <div style={{ color: line.label === 'done' ? 'var(--text)' : 'var(--muted)' }}>
                {line.content.startsWith('?') ? (
                  <>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>?</span> {line.content.substring(2)}
                  </>
                ) : line.content}
              </div>
            )}
            {line.type === 'success' && (
              <div style={{ color: 'var(--success)', fontWeight: 'bold', marginTop: '0.5rem' }}>{line.content}</div>
            )}
          </div>
        ))}

        {mode === 'init_lang' && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '0.5rem' }}>? Choose your project's primary language</div>
            {LANGUAGES.map((lang, i) => (
              <div 
                key={lang} 
                ref={i === selectionIndex ? activeItemRef : null}
                style={{ 
                  paddingLeft: '1rem', 
                  color: i === selectionIndex ? 'var(--secondary)' : 'var(--muted)',
                  background: i === selectionIndex ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                  borderRadius: '4px'
                }}
              >
                {i === selectionIndex ? '❯ ●' : '  ○'} {lang}
              </div>
            ))}
          </div>
        )}

        {mode === 'init_type' && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '0.5rem' }}>? What kind of {currentLang} project are you building?</div>
            {(TYPES[currentLang] || ['Basic Application']).map((type, i) => (
              <div 
                key={type} 
                ref={i === selectionIndex ? activeItemRef : null}
                style={{ 
                  paddingLeft: '1rem', 
                  color: i === selectionIndex ? 'var(--secondary)' : 'var(--muted)',
                  background: i === selectionIndex ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                  borderRadius: '4px'
                }}
              >
                {i === selectionIndex ? '❯ ●' : '  ○'} {type}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', opacity: (mode === 'shell' || mode === 'init_name') ? 1 : 0, height: (mode === 'shell' || mode === 'init_name') ? 'auto' : 0, overflow: 'hidden' }}>
          {mode === 'shell' && (
            <div style={{ display: 'flex', gap: '4px', marginRight: '0.5rem' }}>
              <span style={{ color: 'var(--success)' }}>developer@getini</span>
              <span style={{ color: 'var(--text)' }}>:</span>
              <span style={{ color: 'var(--secondary)' }}>{cwd}</span>
              <span style={{ color: 'var(--text)' }}>$</span>
            </div>
          )}
          {mode === 'init_name' && <span style={{ color: 'var(--primary)', fontWeight: 'bold', marginRight: '0.5rem' }}>? Project name</span>}
          
          <form onSubmit={handleNameSubmit} style={{ flex: 1, display: 'flex' }}>
            <input
              ref={inputRef}
              type="text"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                color: 'var(--text)',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                width: '100%'
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
