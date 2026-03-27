import type { TrackSlug } from "./constants";

/* ─── Types ──────────────────────────────────────────────────────────────── */
export interface LessonMeta {
  slug:         string;
  title:        string;
  description:  string;
  level:        "beginner" | "intermediate" | "advanced";
  order:        number;
  duration:     number; // minutes
  tags:         string[];
}

export interface LessonContent {
  slug:         string;
  trackSlug:    TrackSlug;
  title:        string;
  description:  string;
  level:        "beginner" | "intermediate" | "advanced";
  duration:     number;
  hero: {
    tagline:    string;
    summary:    string;
  };
  beginnerExplanation: string;
  deepExplanation:     string;
  codeExamples: {
    title:    string;
    language: string;
    filename: string;
    code:     string;
    notes?:   string;
  }[];
  realWorldExample: {
    title:   string;
    context: string;
    code:    string;
  };
  commonMistakes: {
    mistake:    string;
    why:        string;
    fix:        string;
  }[];
  summary:      string[];
  nextLesson?:  string;
  prevLesson?:  string;
}

/* ─── Track lesson lists ─────────────────────────────────────────────────── */
export const TRACK_LESSONS: Record<TrackSlug, LessonMeta[]> = {
  python: [
    { slug: "introduction",    title: "Introduction to Python",         description: "What Python is and why it matters",                    level: "beginner",     order: 1,  duration: 20, tags: ["basics", "setup"] },
    { slug: "variables",       title: "Variables & Data Types",         description: "Numbers, strings, booleans and dynamic typing",         level: "beginner",     order: 2,  duration: 25, tags: ["basics", "types"] },
    { slug: "control-flow",    title: "Control Flow",                   description: "if/elif/else, comparison operators, truthiness",        level: "beginner",     order: 3,  duration: 25, tags: ["logic", "flow"] },
    { slug: "loops",           title: "Loops & Iteration",              description: "for, while, range(), enumerate, list comprehensions",   level: "beginner",     order: 4,  duration: 30, tags: ["loops", "iteration"] },
    { slug: "functions",       title: "Functions",                      description: "def, return, args, kwargs, scope, closures",            level: "beginner",     order: 5,  duration: 35, tags: ["functions", "scope"] },
    { slug: "lists-dicts",     title: "Lists, Tuples & Dictionaries",   description: "Python's core data structures",                         level: "beginner",     order: 6,  duration: 30, tags: ["data-structures"] },
    { slug: "strings",         title: "String Manipulation",            description: "Slicing, formatting, methods, f-strings",               level: "beginner",     order: 7,  duration: 25, tags: ["strings"] },
    { slug: "file-handling",   title: "File Handling & I/O",            description: "Reading, writing, context managers",                    level: "intermediate", order: 8,  duration: 30, tags: ["files", "io"] },
    { slug: "oop-basics",      title: "OOP: Classes & Objects",         description: "Classes, instances, __init__, methods",                 level: "intermediate", order: 9,  duration: 40, tags: ["oop", "classes"] },
    { slug: "oop-advanced",    title: "OOP: Inheritance & Polymorphism",description: "Inheritance, super(), method overriding",               level: "intermediate", order: 10, duration: 35, tags: ["oop", "inheritance"] },
    { slug: "error-handling",  title: "Error Handling",                 description: "try/except, custom exceptions, finally",                level: "intermediate", order: 11, duration: 25, tags: ["errors"] },
    { slug: "modules",         title: "Modules & Packages",             description: "import, __name__, creating packages",                   level: "intermediate", order: 12, duration: 30, tags: ["modules"] },
    { slug: "decorators",      title: "Decorators",                     description: "Function decorators, @property, @staticmethod",         level: "advanced",     order: 13, duration: 35, tags: ["advanced", "decorators"] },
    { slug: "generators",      title: "Generators & Iterators",         description: "yield, generator expressions, lazy evaluation",         level: "advanced",     order: 14, duration: 30, tags: ["advanced", "generators"] },
    { slug: "async",           title: "Async Python",                   description: "asyncio, await, async/await patterns",                  level: "advanced",     order: 15, duration: 40, tags: ["async", "concurrency"] },
    { slug: "apis",            title: "Working with APIs",              description: "requests, REST APIs, JSON, authentication",             level: "intermediate", order: 16, duration: 35, tags: ["apis", "http"] },
    { slug: "automation",      title: "Automation Scripts",             description: "os, subprocess, shutil, pathlib automation",            level: "intermediate", order: 17, duration: 40, tags: ["automation"] },
    { slug: "project-cli",     title: "Real Project: CLI Tool",         description: "Build a complete command-line tool in Python",          level: "advanced",     order: 18, duration: 60, tags: ["project", "cli"] },
  ],
  sysadmin: [
    { slug: "python-for-linux",  title: "Python for Linux Admins",       description: "Why Python is essential for sysadmin work",             level: "intermediate", order: 1,  duration: 20, tags: ["intro", "linux"] },
    { slug: "os-module",         title: "The os & sys Modules",          description: "File system navigation, env vars, process info",        level: "intermediate", order: 2,  duration: 30, tags: ["os", "sys"] },
    { slug: "subprocess",        title: "Running Shell Commands",        description: "subprocess, Popen, pipes, shell=True dangers",          level: "intermediate", order: 3,  duration: 35, tags: ["subprocess", "shell"] },
    { slug: "file-automation",   title: "File System Automation",        description: "pathlib, glob, shutil, bulk file operations",           level: "intermediate", order: 4,  duration: 35, tags: ["files", "automation"] },
    { slug: "log-parsing",       title: "Log File Parsing",              description: "Parsing syslog, nginx, app logs with Python",           level: "intermediate", order: 5,  duration: 40, tags: ["logs", "parsing"] },
    { slug: "cron-jobs",         title: "Scheduling with Python",        description: "cron, schedule library, task automation",               level: "intermediate", order: 6,  duration: 30, tags: ["cron", "scheduling"] },
    { slug: "monitoring",        title: "Server Monitoring Scripts",     description: "psutil, CPU/RAM/disk monitoring, alerts",               level: "intermediate", order: 7,  duration: 45, tags: ["monitoring", "psutil"] },
    { slug: "ssh-automation",    title: "SSH Automation",                description: "paramiko, SSH connections, remote command execution",   level: "advanced",     order: 8,  duration: 45, tags: ["ssh", "paramiko"] },
    { slug: "networking",        title: "Network Automation",            description: "socket, ping, port scanning, network tools",            level: "advanced",     order: 9,  duration: 40, tags: ["networking", "sockets"] },
    { slug: "config-management", title: "Config File Management",        description: "configparser, YAML, TOML, env management",              level: "intermediate", order: 10, duration: 35, tags: ["config", "yaml"] },
  ],
  rust: [
    { slug: "introduction",    title: "Introduction to Rust",           description: "Why Rust? Safety, speed, the toolchain",                level: "beginner",     order: 1,  duration: 20, tags: ["intro", "toolchain"] },
    { slug: "variables",       title: "Variables & Mutability",         description: "let, mut, const, shadowing, type inference",            level: "beginner",     order: 2,  duration: 25, tags: ["variables", "types"] },
    { slug: "ownership",       title: "Ownership",                      description: "The ownership model — Rust's killer feature",           level: "beginner",     order: 3,  duration: 45, tags: ["ownership", "memory"] },
    { slug: "borrowing",       title: "Borrowing & References",         description: "& refs, &mut, the borrow checker rules",                level: "beginner",     order: 4,  duration: 40, tags: ["borrowing", "references"] },
    { slug: "slices",          title: "Slices & String Slices",         description: "str vs String, slice syntax, string literals",          level: "beginner",     order: 5,  duration: 30, tags: ["strings", "slices"] },
    { slug: "structs",         title: "Structs",                        description: "Defining structs, methods, associated functions",       level: "intermediate", order: 6,  duration: 35, tags: ["structs"] },
    { slug: "enums",           title: "Enums & Pattern Matching",       description: "enum, match, if let, Option<T>, Result<T,E>",           level: "intermediate", order: 7,  duration: 40, tags: ["enums", "pattern-matching"] },
    { slug: "error-handling",  title: "Error Handling",                 description: "Result, ?, panic!, custom error types",                 level: "intermediate", order: 8,  duration: 35, tags: ["errors", "result"] },
    { slug: "traits",          title: "Traits",                         description: "Defining and implementing traits, trait bounds",        level: "intermediate", order: 9,  duration: 40, tags: ["traits", "generics"] },
    { slug: "lifetimes",       title: "Lifetimes",                      description: "Lifetime annotations, the borrow checker in depth",     level: "advanced",     order: 10, duration: 45, tags: ["lifetimes", "advanced"] },
    { slug: "closures",        title: "Closures & Iterators",           description: "Fn/FnMut/FnOnce, iterator chains, map/filter",          level: "intermediate", order: 11, duration: 35, tags: ["closures", "iterators"] },
    { slug: "concurrency",     title: "Fearless Concurrency",           description: "threads, Arc, Mutex, message passing channels",         level: "advanced",     order: 12, duration: 50, tags: ["concurrency", "threads"] },
    { slug: "project-cli",     title: "Real Project: CLI Tool",         description: "Build a CLI file organiser with clap",                  level: "advanced",     order: 13, duration: 60, tags: ["project", "cli", "clap"] },
  ],
  lua: [
    { slug: "introduction",    title: "Introduction to Lua",            description: "What Lua is, where it's used, the interpreter",         level: "beginner",     order: 1,  duration: 15, tags: ["intro"] },
    { slug: "variables",       title: "Variables & Types",              description: "nil, boolean, number, string, dynamic typing",          level: "beginner",     order: 2,  duration: 20, tags: ["variables", "types"] },
    { slug: "control-flow",    title: "Control Flow",                   description: "if/then/elseif/end, while, repeat/until",               level: "beginner",     order: 3,  duration: 20, tags: ["flow"] },
    { slug: "functions",       title: "Functions",                      description: "function syntax, multiple returns, variadic args",      level: "beginner",     order: 4,  duration: 25, tags: ["functions"] },
    { slug: "tables",          title: "Tables — Lua's Power Feature",   description: "Arrays, maps, mixed tables, table methods",             level: "beginner",     order: 5,  duration: 35, tags: ["tables", "data-structures"] },
    { slug: "strings",         title: "String Library",                 description: "string.format, find, match, gsub, patterns",           level: "intermediate", order: 6,  duration: 25, tags: ["strings"] },
    { slug: "metatables",      title: "Metatables & Metamethods",       description: "__index, __newindex, operator overloading",             level: "intermediate", order: 7,  duration: 40, tags: ["metatables", "oop"] },
    { slug: "oop",             title: "OOP in Lua",                     description: "Implementing classes and inheritance with tables",      level: "intermediate", order: 8,  duration: 35, tags: ["oop", "classes"] },
    { slug: "coroutines",      title: "Coroutines",                     description: "coroutine.create, yield, resume, producers/consumers",  level: "advanced",     order: 9,  duration: 35, tags: ["coroutines", "concurrency"] },
    { slug: "game-scripting",  title: "Game Scripting with Lua",        description: "Lua in game engines, LÖVE2D basics, scripting patterns", level: "intermediate", order: 10, duration: 45, tags: ["games", "love2d"] },
    { slug: "embedding",       title: "Embedding Lua in C/C++",         description: "The Lua C API, loading scripts from host apps",         level: "advanced",     order: 11, duration: 50, tags: ["embedding", "c-api"] },
  ],
  go: [
    { slug: "introduction",    title: "Introduction to Go",             description: "Why Go? Toolchain, go run, go build",                  level: "beginner",     order: 1,  duration: 20, tags: ["intro", "toolchain"] },
    { slug: "variables",       title: "Variables & Types",              description: "var, :=, basic types, zero values",                    level: "beginner",     order: 2,  duration: 25, tags: ["variables", "types"] },
    { slug: "control-flow",    title: "Control Flow",                   description: "if/else, for (Go's only loop), switch",                level: "beginner",     order: 3,  duration: 25, tags: ["flow"] },
    { slug: "functions",       title: "Functions",                      description: "Multiple returns, named returns, variadic, defer",      level: "beginner",     order: 4,  duration: 30, tags: ["functions", "defer"] },
    { slug: "structs",         title: "Structs & Methods",              description: "struct, pointer receivers, value receivers",            level: "beginner",     order: 5,  duration: 35, tags: ["structs", "methods"] },
    { slug: "interfaces",      title: "Interfaces",                     description: "Implicit interfaces, duck typing, empty interface",     level: "intermediate", order: 6,  duration: 35, tags: ["interfaces"] },
    { slug: "error-handling",  title: "Error Handling",                 description: "error interface, errors.New, fmt.Errorf, wrapping",     level: "intermediate", order: 7,  duration: 30, tags: ["errors"] },
    { slug: "goroutines",      title: "Goroutines",                     description: "go keyword, the Go scheduler, lightweight threads",     level: "intermediate", order: 8,  duration: 40, tags: ["goroutines", "concurrency"] },
    { slug: "channels",        title: "Channels",                       description: "make(chan), send/receive, buffered, select",            level: "intermediate", order: 9,  duration: 40, tags: ["channels", "concurrency"] },
    { slug: "packages",        title: "Packages & Modules",             description: "go mod, package structure, imports, visibility",       level: "intermediate", order: 10, duration: 30, tags: ["modules", "packages"] },
    { slug: "http-server",     title: "Building HTTP Servers",          description: "net/http, handlers, middleware, JSON APIs",             level: "intermediate", order: 11, duration: 45, tags: ["http", "api"] },
    { slug: "concurrency-patterns", title: "Concurrency Patterns",     description: "Worker pools, fan-out/in, pipeline, context",          level: "advanced",     order: 12, duration: 50, tags: ["patterns", "advanced"] },
    { slug: "project-api",     title: "Real Project: REST API",        description: "Build a full REST API with Go from scratch",           level: "advanced",     order: 13, duration: 70, tags: ["project", "api"] },
  ],
};

/* ─── Full lesson content (one per track as example — rest use template) ── */
export const LESSON_CONTENT: Partial<Record<string, LessonContent>> = {

  "python:introduction": {
    slug: "introduction", trackSlug: "python",
    title: "Introduction to Python", description: "What Python is, why it matters, and how to write your first program.",
    level: "beginner", duration: 20,
    hero: {
      tagline: "The most readable programming language ever designed.",
      summary: "Python is a high-level, interpreted language known for its clean syntax and readability. Used everywhere from web backends to machine learning, it's the ideal first language — and a powerful last one.",
    },
    beginnerExplanation: `Python was created by Guido van Rossum in 1991, named after Monty Python (not the snake). The core philosophy is simple: code should be readable like English. You won't find curly braces or semicolons everywhere — Python uses indentation to structure code blocks, which forces you to write clean code from day one.

Think of Python as a very smart calculator that can also read files, talk to the internet, automate your computer, and train AI models. The same language runs a 5-line automation script and powers Instagram's backend.`,
    deepExplanation: `Python is an interpreted language — your source code is not compiled directly to machine code. Instead, the CPython interpreter reads your .py file, compiles it to bytecode (.pyc), and executes that bytecode on the Python Virtual Machine (PVM).

This makes Python slower than compiled languages like C or Rust, but the tradeoff is massive productivity. The Global Interpreter Lock (GIL) in CPython means only one thread runs Python bytecode at a time — important to understand for concurrency work.

Python's dynamic typing means variables are just labels pointing to objects. Everything is an object in Python — integers, functions, classes. This enables powerful patterns like first-class functions and decorators.

The Python ecosystem (PyPI) has over 500,000 packages. The standard library alone covers networking, file I/O, JSON, regex, databases, and more — "batteries included" is the motto.`,
    codeExamples: [
      {
        title: "Your first Python program",
        language: "python",
        filename: "hello.py",
        code: `# Comments start with a hash symbol
print("Hello, World!")

# Variables — no type declaration needed
name = "Developer"
age = 25
is_learning = True

print(f"Hello, {name}! You are {age} years old.")
print(f"Learning Python: {is_learning}")`,
        notes: "Python uses f-strings (formatted string literals) for clean string interpolation. The f prefix before the quote enables {variable} syntax.",
      },
      {
        title: "Python is interpreted — run it directly",
        language: "bash",
        filename: "terminal",
        code: `# Install Python (if not installed)
# https://python.org/downloads

# Check your version
python3 --version
# Python 3.12.0

# Run a script
python3 hello.py
# Hello, World!
# Hello, Developer! You are 25 years old.

# Interactive REPL
python3
>>> 2 + 2
4
>>> "hello".upper()
'HELLO'`,
      },
    ],
    realWorldExample: {
      title: "Automate a boring task in 10 lines",
      context: "This is a real sysadmin script — rename 500 files by adding a timestamp prefix. In Python this is 8 lines. In Bash it would be 30+.",
      code: `import os
from datetime import datetime

folder = "./reports"
timestamp = datetime.now().strftime("%Y%m%d")

for filename in os.listdir(folder):
    if filename.endswith(".csv"):
        old_path = os.path.join(folder, filename)
        new_path = os.path.join(folder, f"{timestamp}_{filename}")
        os.rename(old_path, new_path)
        print(f"Renamed: {filename} → {timestamp}_{filename}")`,
    },
    commonMistakes: [
      {
        mistake: "Using Python 2 syntax",
        why: "Python 2 reached end-of-life in 2020. print 'hello' without parentheses is Python 2.",
        fix: "Always use Python 3. print('hello') with parentheses.",
      },
      {
        mistake: "Mixing tabs and spaces",
        why: "Python uses indentation for structure. Mixing tabs and spaces causes IndentationError.",
        fix: "Use 4 spaces per indent level. Configure your editor to show whitespace.",
      },
      {
        mistake: "Not using virtual environments",
        why: "Installing packages globally pollutes your system Python and causes version conflicts.",
        fix: "Always create a venv: python3 -m venv .venv && source .venv/bin/activate",
      },
    ],
    summary: [
      "Python is interpreted — source → bytecode → PVM execution",
      "Dynamic typing: variables are labels pointing to objects",
      "Everything is an object: integers, functions, classes",
      "Indentation defines code blocks (4 spaces is standard)",
      "The standard library is massive — check it before installing a package",
      "Use Python 3 — Python 2 is dead",
      "Virtual environments keep dependencies isolated per project",
    ],
    nextLesson: "variables",
  },

  "rust:ownership": {
    slug: "ownership", trackSlug: "rust",
    title: "Ownership", description: "Rust's revolutionary memory model — no GC, no manual malloc, no use-after-free bugs.",
    level: "beginner", duration: 45,
    hero: {
      tagline: "Memory safety without a garbage collector.",
      summary: "Ownership is Rust's most unique feature. It's a set of rules enforced at compile time that guarantee memory safety — no dangling pointers, no double frees, no data races. Once you understand it, you understand why Rust is different.",
    },
    beginnerExplanation: `In most languages you have two options for memory management: manual (C/C++ — you call malloc/free, easy to mess up) or garbage collected (Python/Go/Java — GC does it for you, but adds overhead and pauses).

Rust takes a third path: ownership. The compiler tracks who "owns" every piece of memory at compile time. When the owner goes out of scope, the memory is automatically freed. No GC, no manual free. Zero cost.

Think of it like borrowing a library book. Only one person can own a book at a time. When they're done (go out of scope), the book goes back. If they want to lend it to a friend, they either give it away permanently (move) or lend it temporarily (borrow).`,
    deepExplanation: `The ownership rules are enforced entirely by the borrow checker at compile time:

1. Each value has exactly one owner
2. When the owner goes out of scope, the value is dropped (memory freed)
3. A value can be moved (ownership transferred) — the original variable becomes invalid
4. A value can be borrowed via references (&T for immutable, &mut T for mutable)
5. At any time, you can have either ONE mutable reference OR multiple immutable references

This system prevents the two biggest classes of memory bugs: use-after-free (the owner is gone, memory freed, but you still have a pointer) and data races (two threads mutating the same data simultaneously).

The tradeoff: the borrow checker is strict. Code that would be fine at runtime gets rejected at compile time. This is intentional — Rust moves the cost from runtime to compile time.

Stack vs Heap: Rust knows which data lives on the stack (fixed size, fast) vs heap (dynamic size, Box<T>, Vec<T>, String). Ownership rules apply to heap-allocated data primarily, since stack data is cheap to copy.`,
    codeExamples: [
      {
        title: "Ownership and moves",
        language: "rust",
        filename: "ownership.rs",
        code: `fn main() {
    // s1 owns the String on the heap
    let s1 = String::from("hello");

    // Move: ownership transfers to s2
    // s1 is now INVALID — the compiler enforces this
    let s2 = s1;

    // println!("{}", s1); // ERROR: value moved
    println!("{}", s2); // OK: s2 is the owner

    // Clone: explicit deep copy (expensive)
    let s3 = s2.clone();
    println!("{} and {}", s2, s3); // Both valid

    // Stack types are copied automatically (cheap)
    let x = 5;
    let y = x; // Copy — not a move
    println!("{} and {}", x, y); // Both valid
}`,
        notes: "String is heap-allocated so it moves. i32 implements Copy (stack-only, cheap to duplicate) so it copies instead.",
      },
      {
        title: "Borrowing with references",
        language: "rust",
        filename: "borrowing.rs",
        code: `fn main() {
    let s = String::from("hello world");

    // Borrow immutably — s still owns the data
    let length = calculate_length(&s);
    println!("'{}' has {} characters", s, length);

    // Mutable borrow
    let mut greeting = String::from("hello");
    change(&mut greeting);
    println!("{}", greeting); // "hello world"
}

// & means "borrow" — no ownership transfer
fn calculate_length(s: &String) -> usize {
    s.len()
} // s goes out of scope, but nothing is dropped (we didn't own it)

fn change(s: &mut String) {
    s.push_str(" world");
}`,
        notes: "References allow you to use a value without taking ownership. &T is an immutable borrow, &mut T is a mutable borrow.",
      },
    ],
    realWorldExample: {
      title: "Why this prevents real bugs",
      context: "This is the class of bug that caused the Heartbleed vulnerability (C) — reading memory after it's freed. Rust makes this impossible at compile time.",
      code: `// In C, this compiles and CRASHES at runtime:
// char* get_string() {
//     char buf[50] = "dangling pointer";
//     return buf; // BUG: buf freed when function returns
// }

// In Rust, this FAILS TO COMPILE:
fn get_string_bad() -> &str {
    let s = String::from("dangling");
    &s // ERROR: s is dropped at end of function!
       // Rust catches this at compile time, not runtime
}

// The correct way: return owned data
fn get_string_good() -> String {
    let s = String::from("owned");
    s // Transfer ownership to the caller
}

fn main() {
    let s = get_string_good();
    println!("{}", s); // Safe — we own it
}`,
    },
    commonMistakes: [
      {
        mistake: "Trying to use a value after moving it",
        why: "When you assign a heap-allocated value to another variable, ownership moves. The original variable is invalid.",
        fix: "Either clone() the data (expensive), use references (&), or restructure to avoid needing both.",
      },
      {
        mistake: "Multiple mutable references",
        why: "You cannot have two &mut references to the same data — this prevents data races.",
        fix: "Refactor so only one mutable reference exists at a time, or use interior mutability (RefCell).",
      },
      {
        mistake: "Returning references to local variables",
        why: "The local variable is dropped when the function returns, making the reference dangling.",
        fix: "Return owned data (String instead of &str) or take the data as a parameter and return a reference to it.",
      },
    ],
    summary: [
      "Every value has exactly one owner at any point in time",
      "When the owner goes out of scope, the value is dropped (memory freed)",
      "Assignment of heap data = move; the original is invalidated",
      "Clone() deep-copies heap data — use sparingly, it's expensive",
      "Stack-only types (i32, bool, f64) implement Copy — no move semantics",
      "References (&T, &mut T) let you borrow without taking ownership",
      "One mutable reference OR many immutable references — never both",
    ],
    nextLesson: "borrowing",
    prevLesson: "variables",
  },

  "go:goroutines": {
    slug: "goroutines", trackSlug: "go",
    title: "Goroutines", description: "Go's lightweight concurrency primitive — thousands of goroutines with a single keyword.",
    level: "intermediate", duration: 40,
    hero: {
      tagline: "Concurrency so easy it's just one keyword.",
      summary: "Goroutines are Go's answer to concurrency. They're lightweight, managed by the Go runtime, and started with a single 'go' keyword. You can run thousands simultaneously — they're not OS threads.",
    },
    beginnerExplanation: `A goroutine is a function that runs concurrently with other functions. Think of it like a lightweight thread that Go manages for you. Starting one is free — just write "go" before a function call.

Unlike OS threads (which cost about 1MB of stack space each), goroutines start with just ~2KB. The Go runtime's scheduler multiplexes thousands of goroutines onto a handful of OS threads using an M:N scheduler.

The classic analogy: goroutines are workers, channels (next lesson) are the conveyor belts between them. You spin up workers with "go", they do their job, and communicate via channels.`,
    deepExplanation: `The Go scheduler uses GOMAXPROCS OS threads (defaults to number of CPU cores). Each thread has a local run queue of goroutines. The scheduler uses work-stealing — if one thread's queue is empty, it steals goroutines from busy threads.

Goroutines are preemptively scheduled since Go 1.14 — long-running goroutines are interrupted at safe points (function calls, loops). Before 1.14 they were cooperative, which could cause starvation.

The sync package provides synchronisation primitives: sync.WaitGroup (wait for goroutines to finish), sync.Mutex (mutual exclusion), sync.RWMutex (read/write lock), sync.Once (run something exactly once).

Context (context.Context) is Go's mechanism for cancellation and deadlines. Pass a context as the first argument to functions that do I/O or spawn goroutines — it lets you cancel work trees cleanly.`,
    codeExamples: [
      {
        title: "Your first goroutine",
        language: "go",
        filename: "goroutines.go",
        code: `package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done() // Signal completion when function returns

    fmt.Printf("Worker %d starting\\n", id)
    time.Sleep(time.Second) // Simulate work
    fmt.Printf("Worker %d done\\n", id)
}

func main() {
    var wg sync.WaitGroup

    // Spin up 5 concurrent workers
    for i := 1; i <= 5; i++ {
        wg.Add(1)
        go worker(i, &wg) // "go" starts a goroutine
    }

    wg.Wait() // Block until all workers are done
    fmt.Println("All workers finished")
}
// Total runtime: ~1 second (not 5) — they ran concurrently`,
        notes: "sync.WaitGroup is the standard way to wait for a group of goroutines. Always call wg.Add() before starting the goroutine, not inside it.",
      },
      {
        title: "Anonymous goroutines & closures",
        language: "go",
        filename: "goroutine_closure.go",
        code: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    results := make([]int, 5)

    for i := 0; i < 5; i++ {
        wg.Add(1)
        i := i // IMPORTANT: capture loop variable (shadowing)
        go func() {
            defer wg.Done()
            results[i] = i * i // Each goroutine writes its own slot
        }()
    }

    wg.Wait()
    fmt.Println(results) // [0 1 4 9 16]
}`,
        notes: "The 'i := i' shadowing is a classic Go pattern. Without it, all goroutines capture the same loop variable and you get unexpected results.",
      },
    ],
    realWorldExample: {
      title: "Parallel HTTP requests",
      context: "Fetch 10 URLs concurrently — a common real-world pattern. Sequential would take 10× longer.",
      code: `package main

import (
    "fmt"
    "net/http"
    "sync"
    "time"
)

func checkURL(url string, wg *sync.WaitGroup, results chan<- string) {
    defer wg.Done()
    start := time.Now()
    resp, err := http.Get(url)
    elapsed := time.Since(start)

    if err != nil {
        results <- fmt.Sprintf("ERROR  %s (%v)", url, err)
        return
    }
    defer resp.Body.Close()
    results <- fmt.Sprintf("%d    %s (%dms)", resp.StatusCode, url, elapsed.Milliseconds())
}

func main() {
    urls := []string{
        "https://go.dev",
        "https://github.com",
        "https://cloudflare.com",
    }

    var wg sync.WaitGroup
    results := make(chan string, len(urls))

    for _, url := range urls {
        wg.Add(1)
        go checkURL(url, &wg, results)
    }

    // Close channel when all goroutines finish
    go func() {
        wg.Wait()
        close(results)
    }()

    for result := range results {
        fmt.Println(result)
    }
}`,
    },
    commonMistakes: [
      {
        mistake: "Starting a goroutine and immediately returning from main",
        why: "When main() returns, ALL goroutines are killed — even if they haven't finished.",
        fix: "Use sync.WaitGroup, channels, or time.Sleep (only for demos) to keep main alive.",
      },
      {
        mistake: "Capturing loop variables in goroutine closures",
        why: "All goroutines share the same loop variable pointer. By the time they run, the loop may have ended.",
        fix: "Shadow the variable: 'i := i' inside the loop, before the goroutine starts.",
      },
      {
        mistake: "Goroutine leaks — goroutines that never terminate",
        why: "Goroutines waiting on a channel that's never closed, or blocking on I/O with no timeout, leak forever.",
        fix: "Always use context.Context with deadlines for goroutines that do I/O. Cancel contexts when done.",
      },
    ],
    summary: [
      "Goroutines start with 'go funcName()' — that's it",
      "~2KB initial stack — you can run thousands simultaneously",
      "The Go runtime scheduler handles OS thread management (M:N model)",
      "sync.WaitGroup: wait for multiple goroutines to finish",
      "Always shadow loop variables when using them in goroutine closures",
      "main() exit kills all goroutines — keep main alive until work is done",
      "Use context.Context to cancel goroutine trees and prevent leaks",
    ],
    nextLesson: "channels",
    prevLesson: "interfaces",
  },
};

/* ─── Helper: get lesson content with fallback ───────────────────────────── */
export function getLessonContent(
  trackSlug: TrackSlug,
  lessonSlug: string
): LessonContent | null {
  const key = `${trackSlug}:${lessonSlug}`;
  const content = LESSON_CONTENT[key];
  if (content) return content;

  // Fallback: build from meta
  const meta = TRACK_LESSONS[trackSlug]?.find((l) => l.slug === lessonSlug);
  if (!meta) return null;

  const lessons = TRACK_LESSONS[trackSlug];
  const idx = lessons.findIndex((l) => l.slug === lessonSlug);

  return {
    slug:        meta.slug,
    trackSlug,
    title:       meta.title,
    description: meta.description,
    level:       meta.level,
    duration:    meta.duration,
    hero: {
      tagline: meta.description,
      summary: `This lesson covers ${meta.title.toLowerCase()} as part of the ${trackSlug} track.`,
    },
    beginnerExplanation: `This lesson will cover ${meta.title}. Content for this lesson is being prepared.`,
    deepExplanation: `A deeper technical explanation of ${meta.title} will be available soon.`,
    codeExamples: [],
    realWorldExample: {
      title:   "Coming soon",
      context: "Real-world examples for this lesson are being written.",
      code:    `// Example for ${meta.title} coming soon`,
    },
    commonMistakes: [],
    summary: [`${meta.title} is part of the ${trackSlug} track.`],
    nextLesson: lessons[idx + 1]?.slug,
    prevLesson: lessons[idx - 1]?.slug,
  };
}

export function getTrackLessons(trackSlug: TrackSlug): LessonMeta[] {
  return TRACK_LESSONS[trackSlug] ?? [];
}
