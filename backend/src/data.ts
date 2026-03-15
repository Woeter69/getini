export interface Category {
  id: string;
  displayName: string;
}

export interface Language {
  id: string;
  displayName: string;
  aliases?: string[];
  supported: string[]; // Category IDs
}

export const Categories: Category[] = [
  { id: 'basic', displayName: 'Basic Application' },
  { id: 'app', displayName: 'Full Application' },
  { id: 'web', displayName: 'Web & Internet' },
  { id: 'api', displayName: 'API & Web Services' },
  { id: 'mobile', displayName: 'Mobile' },
  { id: 'desktop', displayName: 'Desktop' },
  { id: 'game', displayName: 'Games' },
  { id: 'ai', displayName: 'AI & Machine Learning' },
  { id: 'data', displayName: 'Data & Databases' },
  { id: 'devops', displayName: 'DevOps & Infrastructure' },
  { id: 'network', displayName: 'Networking' },
  { id: 'security', displayName: 'Security & Cryptography' },
  { id: 'os', displayName: 'Operating Systems' },
  { id: 'embedded', displayName: 'Embedded & IoT' },
  { id: 'lang', displayName: 'Languages & Compilers' },
  { id: 'script', displayName: 'Automation & Scripting' },
  { id: 'cli', displayName: 'Command Line Interface (CLI)' },
  { id: 'math', displayName: 'Mathematics & Simulation' },
  { id: 'stats', displayName: 'Statistics & Analysis' },
  { id: 'monitor', displayName: 'Observability & Monitoring' },
  { id: 'stream', displayName: 'Messaging & Streaming' },
  { id: 'comm', displayName: 'Communication' },
  { id: 'web3', displayName: 'Blockchain & Web3' },
  { id: 'graphics', displayName: 'AR / VR / Graphics' },
  { id: 'edu', displayName: 'Education & Productivity' },
  { id: 'business', displayName: 'Business & Enterprise' },
  { id: 'package', displayName: 'Package / Library' },
  { id: 'gem', displayName: 'Ruby Gem' },
  { id: 'server', displayName: 'Server Application' },
  { id: 'service', displayName: 'Service / Worker' },
  { id: 'interactive', displayName: 'Interactive / TUI' },
];

export const Languages: Language[] = [
  {
    id: 'go',
    displayName: 'Go',
    aliases: ['golang'],
    supported: [
      'basic', 'app', 'cli', 'web', 'api', 'devops', 'network', 'os', 'data',
      'security', 'monitor', 'stream', 'comm', 'web3', 'lang', 'script',
    ],
  },
  {
    id: 'rust',
    displayName: 'Rust',
    aliases: ['rs'],
    supported: [
      'basic', 'app', 'cli', 'web', 'api', 'script', 'game', 'network', 'os',
      'data', 'security', 'graphics', 'web3', 'lang',
    ],
  },
  {
    id: 'python',
    displayName: 'Python',
    aliases: ['py'],
    supported: [
      'basic', 'app', 'cli', 'web', 'api', 'desktop', 'mobile', 'game', 'ai',
      'data', 'math', 'stats', 'devops',
    ],
  },
  {
    id: 'bun',
    displayName: 'JS/TS (Bun)',
    aliases: ['js', 'ts', 'node'],
    supported: ['basic', 'app', 'web', 'api', 'cli', 'os', 'network', 'data'],
  },
  {
    id: 'java',
    displayName: 'Java',
    supported: ['basic', 'app', 'web', 'api', 'cli', 'data', 'desktop', 'ai', 'business'],
  },
  {
    id: 'kotlin',
    displayName: 'Kotlin',
    aliases: ['kt'],
    supported: ['basic', 'app', 'web', 'api', 'cli', 'data', 'desktop', 'ai'],
  },
  {
    id: 'c',
    displayName: 'C',
    supported: ['basic', 'app', 'cli', 'embedded', 'os', 'network', 'data', 'math'],
  },
  {
    id: 'cpp',
    displayName: 'C++',
    aliases: ['c++', 'cxx'],
    supported: ['basic', 'app', 'cli', 'embedded', 'os', 'network', 'data', 'math'],
  },
  {
    id: 'csharp',
    displayName: 'C#',
    aliases: ['cs', 'c#', 'dotnet'],
    supported: ['basic', 'web', 'db', 'desktop', 'ai'],
  },
  {
    id: 'zig',
    displayName: 'Zig',
    supported: ['basic', 'app', 'cli', 'embedded', 'web', 'game', 'data', 'math'],
  },
  { id: 'swift', displayName: 'Swift', supported: ['basic', 'cli', 'server', 'ios'] },
  { id: 'php', displayName: 'PHP', supported: ['basic', 'app', 'cli', 'web', 'api'] },
  { id: 'ruby', displayName: 'Ruby', aliases: ['rb'], supported: ['basic', 'web', 'cli', 'gem'] },
  { id: 'dart', displayName: 'Dart', aliases: ['dr'], supported: ['basic', 'app', 'cli'] },
  { id: 'flutter', displayName: 'Flutter', aliases: ['fl'], supported: ['basic', 'app', 'package'] },
  { id: 'elixir', displayName: 'Elixir', aliases: ['ex', 'exs'], supported: ['basic', 'app', 'web', 'service'] },
  { id: 'erlang', displayName: 'Erlang', aliases: ['erl'], supported: ['basic', 'app', 'server'] },
  { id: 'haskell', displayName: 'Haskell', aliases: ['hs'], supported: ['basic', 'cli', 'web', 'ai'] },
  { id: 'lua', displayName: 'Lua', supported: ['basic', 'app', 'cli', 'game', 'web'] },
  { id: 'perl', displayName: 'Perl', aliases: ['pl'], supported: ['basic', 'app', 'cli', 'web', 'data'] },
  {
    id: 'nim',
    displayName: 'Nim',
    supported: ['basic', 'app', 'api', 'cli', 'web', 'data', 'game', 'embedded', 'math'],
  },
  { id: 'julia', displayName: 'Julia', aliases: ['jl'], supported: ['basic', 'app', 'cli', 'math', 'data', 'stats'] },
  { id: 'r', displayName: 'R', aliases: ['rlang'], supported: ['basic', 'app', 'cli', 'math', 'data', 'stats'] },
  { id: 'ocaml', displayName: 'OCaml', aliases: ['ml'], supported: ['basic', 'app', 'cli', 'web'] },
  { id: 'clojure', displayName: 'Clojure', aliases: ['clj'], supported: ['basic', 'app', 'web', 'api', 'cli', 'data'] },
  { id: 'd', displayName: 'D', aliases: ['dlang'], supported: ['basic', 'app', 'cli', 'web', 'api', 'game', 'data'] },
  { id: 'v', displayName: 'V', aliases: ['vlang'], supported: ['basic', 'app', 'web', 'api', 'cli', 'game', 'data'] },
  { id: 'crystal', displayName: 'Crystal', aliases: ['cr'], supported: ['basic', 'app', 'web', 'api', 'cli', 'data'] },
  { id: 'fsharp', displayName: 'F#', aliases: ['fs', 'f#'], supported: ['basic', 'web', 'db', 'ai'] },
  {
    id: 'objc',
    displayName: 'Objective-C',
    aliases: ['objective-c', 'objectivec'],
    supported: ['basic', 'app', 'cli', 'desktop', 'mobile'],
  },
  { id: 'groovy', displayName: 'Groovy', supported: ['basic', 'app', 'web', 'api', 'cli', 'data'] },
  { id: 'pascal', displayName: 'Pascal', supported: ['basic', 'app', 'cli', 'desktop'] },
  { id: 'ada', displayName: 'Ada', supported: ['basic', 'app', 'cli', 'embedded', 'os'] },
  { id: 'cobol', displayName: 'COBOL', supported: ['basic', 'app', 'cli', 'business', 'data', 'interactive'] },
  { id: 'scala', displayName: 'Scala', supported: ['basic', 'cli', 'web', 'script'] },
  {
    id: 'shell',
    displayName: 'Shell',
    aliases: ['sh', 'bash'],
    supported: ['basic', 'app', 'cli', 'devops', 'network', 'os', 'security', 'script', 'embedded'],
  },
  { id: 'assembly', displayName: 'Assembly', aliases: ['asm', 'nasm'], supported: ['basic', 'os', 'embedded', 'cli'] },
  {
    id: 'fortran',
    displayName: 'Fortran',
    aliases: ['f90', 'f95', 'f03'],
    supported: ['basic', 'app', 'cli', 'data', 'math', 'stats'],
  },
];
