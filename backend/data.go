package main

type Category struct {
	ID          string `json:"id"`
	DisplayName string `json:"displayName"`
}

type Language struct {
	ID          string   `json:"id"`
	DisplayName string   `json:"displayName"`
	Aliases     []string `json:"aliases,omitempty"`
	Supported   []string `json:"supported"` // Category IDs
}

var Categories = []Category{
	{"basic", "Basic Application"},
	{"app", "Full Application"},
	{"web", "Web & Internet"},
	{"api", "API & Web Services"},
	{"mobile", "Mobile"},
	{"desktop", "Desktop"},
	{"game", "Games"},
	{"ai", "AI & Machine Learning"},
	{"data", "Data & Databases"},
	{"devops", "DevOps & Infrastructure"},
	{"network", "Networking"},
	{"security", "Security & Cryptography"},
	{"os", "Operating Systems"},
	{"embedded", "Embedded & IoT"},
	{"lang", "Languages & Compilers"},
	{"script", "Automation & Scripting"},
	{"cli", "Command Line Interface (CLI)"},
	{"math", "Mathematics & Simulation"},
	{"stats", "Statistics & Analysis"},
	{"monitor", "Observability & Monitoring"},
	{"stream", "Messaging & Streaming"},
	{"comm", "Communication"},
	{"web3", "Blockchain & Web3"},
	{"graphics", "AR / VR / Graphics"},
	{"edu", "Education & Productivity"},
	{"business", "Business & Enterprise"},
	{"package", "Package / Library"},
	{"gem", "Ruby Gem"},
	{"server", "Server Application"},
	{"service", "Service / Worker"},
	{"interactive", "Interactive / TUI"},
}

var Languages = []Language{
	{"go", "Go", []string{"golang"}, []string{"basic", "app", "cli", "web", "api", "devops", "network", "os", "data", "security", "monitor", "stream", "comm", "web3", "lang", "script"}},
	{"rust", "Rust", []string{"rs"}, []string{"basic", "app", "cli", "web", "api", "script", "game", "network", "os", "data", "security", "graphics", "web3", "lang"}},
	{"python", "Python", []string{"py"}, []string{"basic", "app", "cli", "web", "api", "desktop", "mobile", "game", "ai", "data", "math", "stats", "devops"}},
	{"bun", "JS/TS (Bun)", []string{"js", "ts", "node"}, []string{"basic", "app", "web", "api", "cli", "os", "network", "data"}},
	{"java", "Java", nil, []string{"basic", "app", "web", "api", "cli", "data", "desktop", "ai", "business"}},
	{"kotlin", "Kotlin", []string{"kt"}, []string{"basic", "app", "web", "api", "cli", "data", "desktop", "ai"}},
	{"c", "C", nil, []string{"basic", "app", "cli", "embedded", "os", "network", "data", "math"}},
	{"cpp", "C++", []string{"c++", "cxx"}, []string{"basic", "app", "cli", "embedded", "os", "network", "data", "math"}},
	{"csharp", "C#", []string{"cs", "c#", "dotnet"}, []string{"basic", "web", "db", "desktop", "ai"}},
	{"zig", "Zig", nil, []string{"basic", "app", "cli", "embedded", "web", "game", "data", "math"}},
	{"swift", "Swift", nil, []string{"basic", "cli", "server", "ios"}},
	{"php", "PHP", nil, []string{"basic", "app", "cli", "web", "api"}},
	{"ruby", "Ruby", []string{"rb"}, []string{"basic", "web", "cli", "gem"}},
	{"dart", "Dart", []string{"dr"}, []string{"basic", "app", "cli"}},
	{"flutter", "Flutter", []string{"fl"}, []string{"basic", "app", "package"}},
	{"elixir", "Elixir", []string{"ex", "exs"}, []string{"basic", "app", "web", "service"}},
	{"erlang", "Erlang", []string{"erl"}, []string{"basic", "app", "server"}},
	{"haskell", "Haskell", []string{"hs"}, []string{"basic", "cli", "web", "ai"}},
	{"lua", "Lua", nil, []string{"basic", "app", "cli", "game", "web"}},
	{"perl", "Perl", []string{"pl"}, []string{"basic", "app", "cli", "web", "data"}},
	{"nim", "Nim", nil, []string{"basic", "app", "api", "cli", "web", "data", "game", "embedded", "math"}},
	{"julia", "Julia", []string{"jl"}, []string{"basic", "app", "cli", "math", "data", "stats"}},
	{"r", "R", []string{"rlang"}, []string{"basic", "app", "cli", "math", "data", "stats"}},
	{"ocaml", "OCaml", []string{"ml"}, []string{"basic", "app", "cli", "web"}},
	{"clojure", "Clojure", []string{"clj"}, []string{"basic", "app", "web", "api", "cli", "data"}},
	{"d", "D", []string{"dlang"}, []string{"basic", "app", "cli", "web", "api", "game", "data"}},
	{"v", "V", []string{"vlang"}, []string{"basic", "app", "web", "api", "cli", "game", "data"}},
	{"crystal", "Crystal", []string{"cr"}, []string{"basic", "app", "web", "api", "cli", "data"}},
	{"fsharp", "F#", []string{"fs", "f#"}, []string{"basic", "web", "db", "ai"}},
	{"objc", "Objective-C", []string{"objective-c", "objectivec"}, []string{"basic", "app", "cli", "desktop", "mobile"}},
	{"groovy", "Groovy", nil, []string{"basic", "app", "web", "api", "cli", "data"}},
	{"pascal", "Pascal", nil, []string{"basic", "app", "cli", "desktop"}},
	{"ada", "Ada", nil, []string{"basic", "app", "cli", "embedded", "os"}},
	{"cobol", "COBOL", nil, []string{"basic", "app", "cli", "business", "data", "interactive"}},
	{"scala", "Scala", nil, []string{"basic", "cli", "web", "script"}},
	{"shell", "Shell", []string{"sh", "bash"}, []string{"basic", "app", "cli", "devops", "network", "os", "security", "script", "embedded"}},
	{"assembly", "Assembly", []string{"asm", "nasm"}, []string{"basic", "os", "embedded", "cli"}},
	{"fortran", "Fortran", []string{"f90", "f95", "f03"}, []string{"basic", "app", "cli", "data", "math", "stats"}},
}
