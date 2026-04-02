/**
 * Expanded lesson content — Phase 10
 * Full lessons for the most-visited pages across all 5 tracks.
 * Imported by lib/lessons.ts and merged into LESSON_CONTENT.
 */
import type { LessonContent } from "./lessons";

export const EXPANDED_LESSONS: Partial<Record<string, LessonContent>> = {

  /* ═══════════════════════════════════════════════════════════════
     PYTHON TRACK
  ═══════════════════════════════════════════════════════════════ */

  "python:variables": {
    slug: "variables", trackSlug: "python",
    title: "Variables & Data Types",
    description: "Numbers, strings, booleans and Python's dynamic typing system.",
    level: "beginner", duration: 25,
    hero: {
      tagline: "In Python, variables are labels — not boxes.",
      summary: "Python uses dynamic typing — a variable's type is determined by the value assigned to it, not by a declaration. Understanding Python's core types is the foundation for everything that follows.",
    },
    beginnerExplanation: `A variable in Python is a name that points to a value. Unlike languages like Java or C, you don't declare the type — Python figures it out automatically.

Think of variables as sticky notes attached to values. The note has a name (the variable), and it sticks to whatever you assign. You can move the note to a completely different type of value at any time.

Python has five fundamental data types you'll use constantly: integers (whole numbers), floats (decimals), strings (text), booleans (True/False), and None (the absence of a value).`,
    deepExplanation: `Python's type system is dynamic and strongly typed. Dynamic means you don't declare types — they're inferred at runtime. Strong means Python won't silently coerce incompatible types (unlike JavaScript, "3" + 3 is a TypeError in Python).

Every value in Python is an object. Even the integer 5 is an instance of the int class, with methods like .bit_length(). This uniformity is powerful but means Python avoids stack-allocated primitives, contributing to its performance overhead.

Type checking: Python 3.5+ supports optional type annotations (x: int = 5) for tooling and documentation, but they're not enforced at runtime unless you use a type checker like mypy. The actual runtime type is always determined by the value.

Interning: Python caches small integers (-5 to 256) and short strings, so id(5) == id(5) is True. This is an implementation detail — never rely on it for identity checks.

Mutability: str, int, float, bool, and tuple are immutable — you can't change them in place. list, dict, and set are mutable. This distinction matters deeply for function arguments and data structures.`,
    codeExamples: [
      {
        title: "Core types and type checking",
        language: "python",
        filename: "variables.py",
        code: `# Integer — arbitrary precision in Python 3
age = 25
big = 10 ** 100  # a googol — no overflow!

# Float — IEEE 754 double precision
pi = 3.14159
ratio = 1 / 3       # 0.3333... (float division)
integer_div = 7 // 2  # 3 (floor division)

# String — immutable, Unicode by default
name = "CodeDev"
multi = """This spans
multiple lines"""
f_string = f"Hello, {name}! Pi is {pi:.2f}"

# Boolean — subclass of int!
active = True
print(int(True))   # 1
print(True + True) # 2 (yes, really)

# None — singleton null value
result = None

# Type checking
print(type(age))       # <class 'int'>
print(isinstance(age, int))  # True
print(type(name).__name__)   # 'str'`,
        notes: "bool is a subclass of int in Python — True == 1 and False == 0. This is intentional but often surprising to newcomers.",
      },
      {
        title: "Type conversion and common operations",
        language: "python",
        filename: "conversions.py",
        code: `# Explicit type conversion (casting)
n = int("42")        # "42" → 42
s = str(3.14)        # 3.14 → "3.14"
f = float("1.5")     # "1.5" → 1.5
b = bool(0)          # 0 → False

# Truthy / falsy values
falsy = [0, 0.0, "", [], {}, set(), None, False]
# Everything else is truthy

# Multiple assignment
x = y = z = 0         # All point to same 0
a, b, c = 1, 2, 3     # Tuple unpacking
first, *rest = [1, 2, 3, 4]  # first=1, rest=[2,3,4]

# Type annotations (Python 3.5+, optional)
score: int = 100
label: str = "beginner"
items: list[str] = ["rust", "go", "lua"]`,
      },
    ],
    realWorldExample: {
      title: "Configuration parser — types matter",
      context: "Reading config values from environment variables gives you strings. Forgetting to cast them causes subtle runtime bugs. This pattern is used in every production Python app.",
      code: `import os
from pathlib import Path

# Every os.getenv() returns str or None
# Cast immediately to the right type
PORT         = int(os.getenv("PORT", "8000"))
DEBUG        = os.getenv("DEBUG", "false").lower() == "true"
MAX_RETRIES  = float(os.getenv("MAX_RETRIES", "3"))
DB_URL       = os.getenv("DATABASE_URL")          # str | None
LOG_FILE     = Path(os.getenv("LOG_PATH", "/tmp/app.log"))

# Safe access with type guarantee
if DB_URL is None:
    raise ValueError("DATABASE_URL environment variable is required")

print(f"Starting on port {PORT} (debug={DEBUG})")
print(f"DB: {DB_URL}, retries: {MAX_RETRIES}")`,
    },
    commonMistakes: [
      {
        mistake: "Using == to check for None",
        why: "None is a singleton — there's exactly one None object in Python. Using == works but is not idiomatic.",
        fix: "Always use 'is None' or 'is not None'. This makes intent clear and avoids issues with custom __eq__ implementations.",
      },
      {
        mistake: "Mutable default arguments",
        why: "def f(x=[]) — the list is created once, not per call. Appending to it persists across calls.",
        fix: "Use None as default and create the mutable inside: def f(x=None): x = x or []",
      },
      {
        mistake: "Integer division returning floats",
        why: "In Python 3, 5/2 = 2.5 (always float). Many developers expect integer truncation.",
        fix: "Use // for floor division: 5//2 = 2. Use / only when you want a float result.",
      },
    ],
    summary: [
      "Variables are labels pointing to objects — not typed containers",
      "Python's 5 core types: int, float, str, bool, None",
      "Dynamic typing: type is determined by the value, not a declaration",
      "Strong typing: no silent coercion between incompatible types",
      "bool is a subclass of int — True == 1, False == 0",
      "All falsy values: 0, 0.0, \"\", [], {}, set(), None, False",
      "Use 'is None' not '== None' for None checks",
      "Type annotations are optional and not runtime-enforced",
    ],
    nextLesson: "control-flow",
    prevLesson: "introduction",
  },

  "python:functions": {
    slug: "functions", trackSlug: "python",
    title: "Functions",
    description: "def, return, args, kwargs, scope, and first-class functions.",
    level: "beginner", duration: 35,
    hero: {
      tagline: "Functions are first-class objects — store them, pass them, return them.",
      summary: "Python functions are not just reusable blocks of code — they're objects you can assign to variables, pass as arguments, and return from other functions. This makes Python exceptionally flexible.",
    },
    beginnerExplanation: `A function is a named, reusable block of code that performs a specific task. You define it once with def and call it as many times as you need.

Python functions can take inputs (parameters), do work, and return outputs. If you don't explicitly return something, Python returns None by default.

What makes Python functions special is that they're first-class objects — you can treat them exactly like any other value: store them in variables, put them in lists, pass them to other functions. This enables powerful patterns like callbacks, decorators, and higher-order functions.`,
    deepExplanation: `Python's function calling convention supports several argument types: positional args, keyword args, default values, *args (variable positional), and **kwargs (variable keyword). Understanding the order matters: (positional, *args, keyword-only, **kwargs).

Scope follows the LEGB rule: Local → Enclosing → Global → Built-in. Variables are looked up in this order. The global and nonlocal keywords let you modify variables in outer scopes.

Closures: when a nested function captures variables from its enclosing scope, it forms a closure. The captured variables live as long as the closure does — this enables factory functions and decorators.

First-class functions: since functions are objects, they have attributes (.__name__, .__doc__, .__code__), can be passed to map()/filter()/sorted(), and enable functional patterns.

Lambda expressions create anonymous single-expression functions. They're useful for short callbacks but shouldn't replace named functions — readability matters.`,
    codeExamples: [
      {
        title: "Function signatures — all argument types",
        language: "python",
        filename: "functions.py",
        code: `# Basic function
def greet(name: str) -> str:
    """Return a greeting string."""
    return f"Hello, {name}!"

# Default arguments
def connect(host: str, port: int = 5432, ssl: bool = True):
    print(f"Connecting to {host}:{port} (ssl={ssl})")

# *args — variable positional arguments
def total(*numbers: float) -> float:
    return sum(numbers)

print(total(1, 2, 3, 4))  # 10.0

# **kwargs — variable keyword arguments
def build_config(**settings):
    return {k: v for k, v in settings.items()}

cfg = build_config(debug=True, port=8000, workers=4)

# Keyword-only arguments (after *)
def save(data, *, overwrite: bool = False, backup: bool = True):
    pass  # overwrite and backup MUST be passed as keywords

save(data, overwrite=True)  # OK
# save(data, True)          # TypeError`,
        notes: "Arguments after * in the signature are keyword-only — callers must use the keyword name explicitly. This makes APIs clearer and more maintainable.",
      },
      {
        title: "First-class functions and closures",
        language: "python",
        filename: "first_class.py",
        code: `# Functions stored in variables
square = lambda x: x ** 2
cube   = lambda x: x ** 3

ops = {"square": square, "cube": cube}
print(ops["square"](5))  # 25

# Higher-order functions
def apply_twice(func, value):
    return func(func(value))

print(apply_twice(square, 3))  # 81

# Closure — inner function captures outer variable
def make_multiplier(factor: int):
    def multiply(x: int) -> int:
        return x * factor   # 'factor' is captured
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)
print(double(5))   # 10
print(triple(5))   # 15

# Functions as arguments (sorted, map, filter)
words = ["rust", "python", "go", "lua"]
by_length = sorted(words, key=len)
# ['go', 'lua', 'rust', 'python']

evens = list(filter(lambda x: x % 2 == 0, range(10)))
# [0, 2, 4, 6, 8]`,
      },
    ],
    realWorldExample: {
      title: "Retry decorator — production error handling",
      context: "This pattern is used everywhere in production Python. The retry decorator wraps any function and adds automatic retry logic with exponential backoff — without touching the original function.",
      code: `import time
import functools
from typing import Callable, TypeVar

T = TypeVar("T")

def retry(max_attempts: int = 3, delay: float = 1.0, backoff: float = 2.0):
    """Decorator: retry a function on exception with exponential backoff."""
    def decorator(func: Callable[..., T]) -> Callable[..., T]:
        @functools.wraps(func)  # Preserve __name__, __doc__ etc.
        def wrapper(*args, **kwargs) -> T:
            attempt = 0
            wait    = delay
            while attempt < max_attempts:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    attempt += 1
                    if attempt == max_attempts:
                        raise
                    print(f"Attempt {attempt} failed: {e}. Retrying in {wait}s...")
                    time.sleep(wait)
                    wait *= backoff
            raise RuntimeError("Should not reach here")
        return wrapper
    return decorator

# Usage — zero changes to the original function
@retry(max_attempts=3, delay=0.5)
def fetch_data(url: str) -> dict:
    import urllib.request, json
    with urllib.request.urlopen(url, timeout=5) as r:
        return json.loads(r.read())`,
    },
    commonMistakes: [
      {
        mistake: "Mutable default arguments (e.g. def f(x=[]))",
        why: "The default value is evaluated once at function definition, not on each call. Appending to a list default persists across calls.",
        fix: "Use None as default and initialize inside: def f(x=None): x = x if x is not None else []",
      },
      {
        mistake: "Ignoring the return value of pure functions",
        why: "Forgetting that string/list methods return new objects. e.g. name.upper() doesn't modify name.",
        fix: "Assign the result: name = name.upper(). Check the docs — mutable types (list) modify in-place and return None.",
      },
      {
        mistake: "Using global variables inside functions",
        why: "Functions that depend on globals are hard to test, debug, and reuse. Side effects are hidden.",
        fix: "Pass data as arguments and return results. Reserve globals for true constants (ALL_CAPS naming convention).",
      },
    ],
    summary: [
      "Functions are first-class objects — store, pass, and return them freely",
      "LEGB scope: Local → Enclosing → Global → Built-in lookup order",
      "Default args are evaluated once — never use mutable defaults",
      "*args collects extra positional args as a tuple",
      "**kwargs collects extra keyword args as a dict",
      "Keyword-only args (after *) must be passed by name",
      "Closures capture enclosing scope — power behind decorators",
      "@functools.wraps preserves metadata when writing decorators",
    ],
    nextLesson: "lists-dicts",
    prevLesson: "loops",
  },

  /* ═══════════════════════════════════════════════════════════════
     RUST TRACK
  ═══════════════════════════════════════════════════════════════ */

  "rust:variables": {
    slug: "variables", trackSlug: "rust",
    title: "Variables & Mutability",
    description: "let, mut, const, shadowing — and why immutability is the default.",
    level: "beginner", duration: 25,
    hero: {
      tagline: "Immutable by default — mutability is opt-in.",
      summary: "Rust makes all variables immutable by default. This isn't a limitation — it's a feature that prevents entire categories of bugs at compile time. You opt into mutability explicitly with mut.",
    },
    beginnerExplanation: `In most languages, variables are mutable by default — you can change their value at any time. Rust flips this: variables are immutable by default, meaning once you assign a value, you can't change it unless you explicitly say you want to.

This sounds restrictive at first, but it has a huge benefit: the compiler can catch entire classes of bugs at compile time — things like accidentally modifying data you didn't intend to change, or data races in concurrent code.

To make a variable mutable, you add the mut keyword. Simple, explicit, and clear to anyone reading your code that "this value will change."`,
    deepExplanation: `Rust has three binding mechanisms: let (runtime binding, stack or heap), const (compile-time constant, must have explicit type), and static (global lifetime, also must have explicit type).

Shadowing is a key Rust concept — you can redeclare a variable with the same name using let, creating a new binding. This differs from mutation: the original binding's type can change, and shadowing works even with immutable bindings. It's commonly used for type transformations (parsing a string to a number).

Type inference: Rust's type inference is powerful but has limits. For let bindings, the compiler infers the type from the value. For let without an initializer, or when inference is ambiguous, you must annotate. The turbofish syntax (collect::<Vec<_>>()) forces inference in generic contexts.

Stack vs heap: primitive types (integers, floats, bool, char) live on the stack — fast allocation and deallocation. String, Vec, Box<T>, and other heap types allocate on the heap and are managed by the ownership system.`,
    codeExamples: [
      {
        title: "Immutability, mut, const, and shadowing",
        language: "rust",
        filename: "variables.rs",
        code: `fn main() {
    // Immutable by default
    let x = 5;
    // x = 6; // ERROR: cannot assign twice to immutable variable

    // Mutable — explicit opt-in
    let mut count = 0;
    count += 1;
    count += 1;
    println!("count: {}", count); // 2

    // const — compile-time, must type-annotate, ALL_CAPS convention
    const MAX_POINTS: u32 = 100_000;
    println!("max: {}", MAX_POINTS);

    // Shadowing — redeclare with same name (different type allowed)
    let spaces = "   ";           // &str
    let spaces = spaces.len();    // usize — different type!
    println!("spaces: {}", spaces); // 3

    // Common shadowing pattern: parse string input
    let input = "42";
    let input: u32 = input.parse().expect("not a number");
    println!("parsed: {}", input); // 42

    // Destructuring
    let (a, b, c) = (1, 2.0, "three");
    println!("{} {} {}", a, b, c);
}`,
        notes: "Shadowing with let creates a completely new binding — even if the previous one was immutable, and even if the type changes. This is different from mut which modifies the existing binding.",
      },
      {
        title: "Scalar and compound types",
        language: "rust",
        filename: "types.rs",
        code: `fn main() {
    // Integer types — explicit sizes
    let small: i8  = 127;      // -128 to 127
    let byte:  u8  = 255;      // 0 to 255
    let num:   i32 = -50_000;  // default integer type
    let big:   i64 = 9_000_000_000;
    let arch:  usize = 42;     // pointer-sized (64-bit on 64-bit CPU)

    // Float types
    let x: f64 = 3.14;   // default float (double precision)
    let y: f32 = 2.71;   // single precision

    // Boolean
    let t: bool = true;
    let f: bool = !t;

    // Character — 4 bytes, Unicode scalar value
    let heart:  char = '♥';
    let emoji:  char = '🦀'; // This is valid Rust!

    // Tuple — fixed-length, mixed types
    let point: (i32, i32) = (10, 20);
    let (px, py) = point;     // destructuring
    let first = point.0;      // index access

    // Array — fixed-length, same type, stack-allocated
    let months: [&str; 3] = ["Jan", "Feb", "Mar"];
    let zeros  = [0u8; 100]; // 100 zeros — fast stack allocation

    println!("Heart: {heart}, x: {px}, y: {py}");
}`,
      },
    ],
    realWorldExample: {
      title: "Configuration with constants and computed values",
      context: "Real Rust applications use const for compile-time configuration and let with type inference for runtime values. The compiler eliminates const values completely at compile time.",
      code: `// Compile-time constants — zero runtime cost
const VERSION:     &str = "1.0.0";
const MAX_RETRIES: u32  = 3;
const TIMEOUT_MS:  u64  = 5_000;
const BUFFER_SIZE: usize = 8 * 1024; // 8KB

fn parse_config(raw: &str) -> (String, u16, bool) {
    // Shadowing for transformation chain
    let raw = raw.trim();
    let raw = raw.to_lowercase();

    // Destructure from split
    let parts: Vec<&str> = raw.split(':').collect();
    let host = parts[0].to_string();
    let port: u16 = parts.get(1)
        .and_then(|p| p.parse().ok())
        .unwrap_or(8080);
    let secure = port == 443;

    (host, port, secure)
}

fn main() {
    println!("CodeDev v{VERSION}, timeout: {TIMEOUT_MS}ms");

    let (host, port, secure) = parse_config("localhost:3000");
    let mut retries = 0u32;

    while retries < MAX_RETRIES {
        println!("Connecting to {host}:{port} (secure={secure})");
        retries += 1;
    }
}`,
    },
    commonMistakes: [
      {
        mistake: "Trying to mutate an immutable binding",
        why: "Rust's default immutability means reassignment to let x = ... causes a compile error.",
        fix: "Add mut: let mut x = 5; then x = 6; is fine. Only add mut when you actually need to mutate.",
      },
      {
        mistake: "Confusing shadowing with mutation",
        why: "let x = x + 1 creates a new binding. mut x; x = x + 1 modifies the existing binding. Both work but mean different things.",
        fix: "Use shadowing when transforming a value into a different type. Use mut when you need to modify a value in a loop or over time.",
      },
      {
        mistake: "Integer overflow in debug vs release builds",
        why: "In debug mode, integer overflow panics. In release mode (--release), it wraps silently.",
        fix: "Use checked_add(), saturating_add(), or wrapping_add() for explicit overflow handling in production-critical code.",
      },
    ],
    summary: [
      "Variables are immutable by default — add mut to opt into mutability",
      "const: compile-time constant, must be type-annotated, ALL_CAPS convention",
      "static: global variable with 'static lifetime",
      "Shadowing creates a new binding — the type can change, immutability is OK",
      "Type inference works for most let bindings — annotate when ambiguous",
      "Integer types: i8/u8 through i128/u128, plus isize/usize (pointer-sized)",
      "f64 is the default float type (double precision)",
      "Arrays are fixed-size and stack-allocated — [type; length]",
    ],
    nextLesson: "ownership",
    prevLesson: "introduction",
  },

  /* ═══════════════════════════════════════════════════════════════
     GO TRACK
  ═══════════════════════════════════════════════════════════════ */

  "go:variables": {
    slug: "variables", trackSlug: "go",
    title: "Variables & Types",
    description: "var, :=, basic types, zero values, and Go's type system.",
    level: "beginner", duration: 25,
    hero: {
      tagline: "Zero values — every variable has a safe default.",
      summary: "Go's type system is static but concise. The := short declaration removes boilerplate, and every type has a zero value — Go never gives you uninitialized memory.",
    },
    beginnerExplanation: `Go is statically typed — every variable has a fixed type that can't change. But unlike Java or C++, you rarely need to write the type explicitly. Go's type inference via := handles most cases.

The most important concept for Go beginners: every type has a zero value. When you declare a variable without initializing it, Go automatically gives it a safe, sensible default — 0 for numbers, false for bool, "" for strings, and nil for pointers/slices/maps. You'll never read garbage memory.

This is different from C (uninitialized = undefined behaviour) and different from Python (no declaration needed at all). Go sits between them — explicit but concise.`,
    deepExplanation: `Go has two declaration forms: var (explicit, can omit initializer) and := (short, requires initializer, infers type, only inside functions). At package level, only var and const are allowed.

Go's basic types: integers (int, int8/16/32/64, uint variants, byte=uint8, rune=int32), floats (float32, float64), complex (complex64, complex128), bool, and string. The int type is platform-sized (32-bit on 32-bit systems, 64-bit on 64-bit). String is an immutable sequence of bytes (UTF-8 encoded), not characters — a rune is the unit for Unicode code points.

Type conversions in Go are always explicit — T(value). Go never does implicit numeric conversion, unlike C. This prevents subtle bugs at the cost of more verbose code.

Constants in Go are computed at compile time and can be untyped (a numeric constant without an explicit type is given enough precision for any context where it's used). The iota identifier creates incrementing integer constants within a const block.`,
    codeExamples: [
      {
        title: "Declaration styles and zero values",
        language: "go",
        filename: "variables.go",
        code: `package main

import "fmt"

// Package-level — must use var or const
var globalPort int = 8080
const AppName = "CodeDev"

func main() {
    // var declaration — explicit type
    var name string = "Go Developer"
    var age  int    // zero value: 0
    var done bool   // zero value: false

    // Short declaration — type inferred, inside functions only
    port    := 3000
    version := "1.22"
    pi      := 3.14159

    // Multiple assignment
    x, y := 10, 20
    x, y  = y, x  // swap!

    // Blank identifier — discard a value
    result, _ := divide(10, 3)

    fmt.Println(name, age, done)  // Go Developer 0 false
    fmt.Println(port, version, pi)
    fmt.Println(x, y)              // 20 10
    fmt.Println(result)            // 3
}

func divide(a, b int) (int, int) {
    return a / b, a % b
}`,
        notes: "The blank identifier _ discards a value from multi-return functions. This is idiomatic Go — use it whenever you intentionally ignore a return value.",
      },
      {
        title: "Types, conversions, and constants",
        language: "go",
        filename: "types.go",
        code: `package main

import "fmt"

// iota for enumerated constants
type Direction int

const (
    North Direction = iota // 0
    East                   // 1
    South                  // 2
    West                   // 3
)

func main() {
    // Numeric types — must convert explicitly
    var x int32 = 100
    var y int64 = int64(x) // explicit conversion required
    var z float64 = float64(x) * 1.5

    // string ↔ []byte / []rune
    s := "Hello, 🌍"
    b := []byte(s)          // UTF-8 bytes
    r := []rune(s)          // Unicode code points
    fmt.Println(len(b))     // 11 (bytes)
    fmt.Println(len(r))     // 9  (rune/characters)

    // byte and rune are just aliases
    var ch byte = 'A'       // uint8
    var ru rune = '🦀'     // int32

    // Type inference with untyped constants
    const BigNum = 1 << 62  // fits int64 or uint64
    var big int64 = BigNum  // works — untyped constant adapts

    fmt.Println(y, z, ch, ru, North, South)
}`,
      },
    ],
    realWorldExample: {
      title: "Configuration struct with zero values",
      context: "Go's zero values mean you can define config structs with safe defaults without a constructor. This pattern is used in almost every Go library's Options struct.",
      code: `package main

import (
    "fmt"
    "time"
)

type ServerConfig struct {
    Host        string        // zero: ""
    Port        int           // zero: 0
    MaxConns    int           // zero: 0
    Timeout     time.Duration // zero: 0
    TLS         bool          // zero: false
    Debug       bool          // zero: false
}

// Option function pattern — idiomatic Go
type Option func(*ServerConfig)

func WithPort(port int) Option {
    return func(c *ServerConfig) { c.Port = port }
}

func WithTLS(enabled bool) Option {
    return func(c *ServerConfig) { c.TLS = enabled }
}

func NewServer(host string, opts ...Option) *ServerConfig {
    // Safe defaults — no magic nil pointer
    cfg := &ServerConfig{
        Host:     host,
        Port:     8080,           // sensible default
        MaxConns: 100,
        Timeout:  30 * time.Second,
    }
    for _, opt := range opts {
        opt(cfg)
    }
    return cfg
}

func main() {
    srv := NewServer("localhost",
        WithPort(3000),
        WithTLS(true),
    )
    fmt.Printf("Server: %s:%d (tls=%v)\n", srv.Host, srv.Port, srv.TLS)
}`,
    },
    commonMistakes: [
      {
        mistake: "Declaring a variable with := and never using it",
        why: "Go treats unused variables as compile errors. This is intentional — it forces clean code.",
        fix: "Use the blank identifier _ if you genuinely don't need a value: _, err := f(). Remove unused variables.",
      },
      {
        mistake: "Comparing string lengths for Unicode correctness",
        why: "len(s) returns bytes, not characters. '🦀' is 4 bytes but 1 rune.",
        fix: "Use len([]rune(s)) for character count, or the unicode/utf8 package: utf8.RuneCountInString(s).",
      },
      {
        mistake: "Using := at package level",
        why: "Short variable declarations are only allowed inside functions. Package-level code requires var.",
        fix: "Use var name = value at package level. Reserve := for inside functions.",
      },
    ],
    summary: [
      "Every type has a zero value — Go never gives you uninitialized memory",
      "var for explicit declarations, := for short inference inside functions",
      "Type conversions are always explicit — T(value), never implicit",
      "int is platform-sized — use int64/uint64 for explicit 64-bit",
      "string is immutable UTF-8 bytes — use []rune for Unicode character ops",
      "byte = uint8, rune = int32 (Unicode code point)",
      "const with iota creates auto-incrementing integer enumerations",
      "Unused variables are compile errors — keep code clean",
    ],
    nextLesson: "control-flow",
    prevLesson: "introduction",
  },

  /* ═══════════════════════════════════════════════════════════════
     LUA TRACK
  ═══════════════════════════════════════════════════════════════ */

  "lua:introduction": {
    slug: "introduction", trackSlug: "lua",
    title: "Introduction to Lua",
    description: "What Lua is, where it runs, and how to write your first script.",
    level: "beginner", duration: 15,
    hero: {
      tagline: "The fastest scripting language you've probably never written.",
      summary: "Lua is a lightweight, fast scripting language designed to be embedded in larger applications. It powers game engines (Roblox, LÖVE2D, World of Warcraft addons), configuration systems, and security tools — anywhere you need a sandboxed, fast scripting layer.",
    },
    beginnerExplanation: `Lua was created in 1993 at PUC-Rio in Brazil. The name means "moon" in Portuguese. It's designed around a single core idea: be small, fast, and easy to embed inside other programs.

Unlike Python or JavaScript, Lua is rarely the main language of an application. Instead, it's the scripting layer — you write the core engine in C or C++, then expose a Lua API so users (or you) can write game logic, configuration, or automation scripts without recompiling.

This design makes Lua uniquely portable. The entire runtime is about 300KB — smaller than most images on a webpage. It starts in microseconds. Game engines like Roblox use it for all game scripts because it's fast enough to run inside a game loop without dropping frames.`,
    deepExplanation: `Lua's implementation is a register-based VM (unlike Python's stack-based CPython). The Lua C API is first-class — embedding Lua in a C program is the primary use case, not an afterthought.

Tables are the single data structure in Lua — they serve as arrays (integer keys), hash maps (string/mixed keys), and objects (metatables). This unified approach keeps the language minimal while covering all data structure needs.

Dynamic typing with eight types: nil, boolean, number (double-precision float by default, integers in 5.3+), string, function, userdata, thread, and table. The number type being double by default means Lua handles both integers and floats in one type (with integer subtype in 5.3+).

LuaJIT is a Just-in-Time compiler for Lua that achieves C-level performance on many workloads. It's used in production at Cloudflare (nginx scripting), OpenResty, and game engines for performance-critical Lua.

The standard library is deliberately minimal: basic I/O, math, string, table, OS, and coroutine modules. Everything else is third-party via LuaRocks (the package manager).`,
    codeExamples: [
      {
        title: "Your first Lua script",
        language: "lua",
        filename: "hello.lua",
        code: `-- Comments start with two dashes
print("Hello, Lua!")

-- Variables are global by default
-- Use 'local' to limit scope (always do this!)
local name    = "Developer"
local version = 5.4
local active  = true
local nothing = nil

print(string.format("Lua %g says hi to %s", version, name))

-- String concatenation with ..
local greeting = "Hello, " .. name .. "!"
print(greeting)

-- Type function
print(type(name))     -- string
print(type(version))  -- number
print(type(active))   -- boolean
print(type(nothing))  -- nil
print(type(print))    -- function`,
        notes: "Always use 'local' for variables. Global variables in Lua are stored in a table (_G) and are slower to access than locals. They also pollute the global namespace.",
      },
      {
        title: "Running Lua",
        language: "bash",
        filename: "terminal",
        code: `# Install Lua
# macOS
brew install lua

# Ubuntu/Debian
sudo apt install lua5.4

# Check version
lua -v
# Lua 5.4.6

# Run a script
lua hello.lua
# Hello, Lua!

# Interactive REPL
lua
> print("hello")
hello
> 2 + 2
4
> os.exit()

# Run one-liner
lua -e 'print("one liner")'`,
      },
    ],
    realWorldExample: {
      title: "Nginx config script (OpenResty)",
      context: "Cloudflare, Kong API Gateway, and OpenResty all use Lua inside Nginx for request processing. This is one of Lua's most widespread production uses.",
      code: `-- nginx.conf calls this Lua script for each request
-- This pattern handles millions of requests per second

local function rate_limit(key, limit, window)
    local count = ngx.shared.limits:incr(key, 1, 0, window)
    if count > limit then
        ngx.status = 429
        ngx.header["Retry-After"] = window
        ngx.say('{"error":"rate_limit_exceeded"}')
        ngx.exit(ngx.HTTP_OK)
    end
end

-- Get client IP
local ip = ngx.var.remote_addr

-- 100 requests per 60 seconds per IP
rate_limit("rl:" .. ip, 100, 60)

-- Authenticate token
local auth = ngx.req.get_headers()["Authorization"]
if not auth or not auth:match("^Bearer ") then
    ngx.exit(ngx.HTTP_UNAUTHORIZED)
end

-- Pass to upstream
ngx.say("OK")`,
    },
    commonMistakes: [
      {
        mistake: "Forgetting 'local' keyword",
        why: "Variables without 'local' are global — they persist across function calls and pollute _G. This causes bugs that are hard to trace.",
        fix: "Always write 'local' before variable declarations. Use a linter like luacheck to catch missing locals.",
      },
      {
        mistake: "1-based array indexing",
        why: "Lua arrays start at index 1, not 0. table[0] is valid (it's just a hash key) but not part of the 'array' portion.",
        fix: "Remember: first element is table[1], last is table[#table]. The # length operator only works correctly on sequence tables (1..N contiguous integer keys).",
      },
      {
        mistake: "Using == to compare strings to nil",
        why: "In Lua, nil means absence of a value. A missing table key returns nil, not an error.",
        fix: "Check: if value == nil then. Or use 'not value' for a falsy check (nil and false are both falsy).",
      },
    ],
    summary: [
      "Lua is a lightweight scripting language designed for embedding in C/C++ applications",
      "Primary use cases: game engines, config systems, nginx scripting, security tools",
      "The entire runtime is ~300KB — starts in microseconds",
      "8 types: nil, boolean, number, string, function, userdata, thread, table",
      "Tables are the only data structure — they handle arrays, maps, and objects",
      "Always use 'local' — global variables are stored in _G and are slower",
      "Arrays are 1-indexed — table[1] is the first element",
      "LuaJIT achieves C-level performance with JIT compilation",
    ],
    nextLesson: "variables",
  },

  /* ═══════════════════════════════════════════════════════════════
     SYSADMIN TRACK
  ═══════════════════════════════════════════════════════════════ */

  "sysadmin:os-module": {
    slug: "os-module", trackSlug: "sysadmin",
    title: "The os & sys Modules",
    description: "Navigate the file system, read environment variables, and inspect the Python process.",
    level: "intermediate", duration: 30,
    hero: {
      tagline: "Your Python script's window into the operating system.",
      summary: "The os and sys modules give Python scripts direct access to the underlying operating system — file system navigation, environment variables, process information, and more. These are the building blocks of every sysadmin script.",
    },
    beginnerExplanation: `When you run a Python script as a sysadmin, you need to interact with the operating system: find files, read environment variables, check what user is running the script, or change directories. The os module is your interface to all of this.

Think of os as a translation layer between Python and whatever OS you're running on — Linux, macOS, or Windows. It abstracts the differences so your script can work cross-platform (mostly).

The sys module gives you information about the Python interpreter itself — what version is running, what arguments were passed to the script, and how to exit cleanly.`,
    deepExplanation: `os.path vs pathlib: Python 3.4+ introduced pathlib, which provides an object-oriented interface to file system paths. It's generally preferred over os.path for new code — paths become Path objects you can manipulate with / operators.

Environment variables: os.environ is a mapping of the current process's environment. Modifying it affects child processes (spawned via subprocess) but not the parent process or other Python processes. os.getenv() is safer than os.environ[] because it returns None (or a default) instead of raising KeyError.

os.walk() vs os.scandir(): scandir() is faster because it avoids extra stat() calls by returning DirEntry objects with cached metadata. Use scandir() in performance-sensitive code.

sys.path is the list Python searches when importing modules. Modifying it at runtime (sys.path.insert(0, '/my/modules')) lets you import from non-standard locations — useful for scripts that need adjacent utility modules.`,
    codeExamples: [
      {
        title: "os module — core operations",
        language: "python",
        filename: "os_basics.py",
        code: `import os
from pathlib import Path

# Current working directory
cwd = os.getcwd()
p_cwd = Path.cwd()  # pathlib equivalent
print(f"CWD: {cwd}")

# Environment variables
home    = os.environ.get("HOME", "/tmp")
user    = os.getenv("USER", "unknown")
path    = os.environ["PATH"]          # raises KeyError if missing
debug   = os.getenv("DEBUG", "false").lower() == "true"

# Process information
pid     = os.getpid()
uid     = os.getuid()   # Linux/macOS only
is_root = uid == 0

print(f"PID={pid}, UID={uid}, root={is_root}")

# File system — check existence
log_path = Path("/var/log/nginx/error.log")
if log_path.exists():
    stat = log_path.stat()
    print(f"Size: {stat.st_size} bytes")
    print(f"Modified: {stat.st_mtime}")

# List directory
for entry in os.scandir("/etc"):
    if entry.is_file() and entry.name.endswith(".conf"):
        print(f"{entry.name}: {entry.stat().st_size} bytes")`,
      },
      {
        title: "Walking directory trees and path manipulation",
        language: "python",
        filename: "walk_dirs.py",
        code: `import os
from pathlib import Path

# os.walk — top-down traversal
def find_large_logs(root: str, min_mb: float = 100) -> list[str]:
    """Find log files larger than min_mb megabytes."""
    large = []
    min_bytes = min_mb * 1024 * 1024

    for dirpath, dirnames, filenames in os.walk(root):
        # Modify dirnames in-place to skip hidden dirs
        dirnames[:] = [d for d in dirnames if not d.startswith(".")]

        for fname in filenames:
            if fname.endswith(".log"):
                fpath = os.path.join(dirpath, fname)
                if os.path.getsize(fpath) >= min_bytes:
                    large.append(fpath)
    return large

# pathlib equivalent — more readable
def find_configs(root: Path) -> list[Path]:
    """Recursively find all .conf files."""
    return list(root.rglob("*.conf"))

# Path manipulation
p = Path("/var/log/nginx/access.log")
print(p.parent)   # /var/log/nginx
print(p.stem)     # access
print(p.suffix)   # .log
print(p.name)     # access.log

# Build paths safely — handles OS separators
backup = p.parent / "backup" / f"{p.stem}_backup{p.suffix}"
print(backup)  # /var/log/nginx/backup/access_backup.log`,
      },
    ],
    realWorldExample: {
      title: "System health check script",
      context: "This is a real sysadmin script — checks disk space, memory, and running processes. Run it via cron every 5 minutes to catch issues before they become outages.",
      code: `#!/usr/bin/env python3
"""System health check — run every 5 mins via cron."""
import os
import sys
import json
import shutil
from datetime import datetime
from pathlib import Path

THRESHOLDS = {
    "disk_percent":   85.0,  # alert if disk > 85% full
    "load_1min":      4.0,   # alert if 1-min load > 4
}

def check_disk(path: str = "/") -> dict:
    total, used, free = shutil.disk_usage(path)
    percent = (used / total) * 100
    return {
        "path":    path,
        "total_gb": round(total / 1e9, 1),
        "free_gb":  round(free  / 1e9, 1),
        "percent":  round(percent, 1),
        "alert":   percent > THRESHOLDS["disk_percent"],
    }

def check_load() -> dict:
    load1, load5, load15 = os.getloadavg()  # Linux/macOS
    return {
        "1min":  round(load1,  2),
        "5min":  round(load5,  2),
        "15min": round(load15, 2),
        "alert": load1 > THRESHOLDS["load_1min"],
    }

def check_log_dir(path: str = "/var/log") -> dict:
    total_mb = sum(
        f.stat().st_size for f in Path(path).rglob("*.log")
        if f.is_file()
    ) / 1e6
    return {"path": path, "log_mb": round(total_mb, 1)}

def main():
    report = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "hostname":  os.uname().nodename,
        "disk":      check_disk("/"),
        "load":      check_load(),
        "logs":      check_log_dir(),
    }

    alerts = [k for k, v in report.items()
              if isinstance(v, dict) and v.get("alert")]

    if alerts:
        print(f"ALERT: issues detected in {alerts}", file=sys.stderr)
        sys.exit(1)

    print(json.dumps(report, indent=2))
    sys.exit(0)

if __name__ == "__main__":
    main()`,
    },
    commonMistakes: [
      {
        mistake: "Using os.path.join() manually in new code",
        why: "os.path.join is still correct but pathlib is more readable and Pythonic for Python 3.4+.",
        fix: "Use Path('/var/log') / 'nginx' / 'error.log'. The / operator builds paths safely across OSes.",
      },
      {
        mistake: "os.environ[] raising KeyError for missing variables",
        why: "os.environ['MISSING_VAR'] raises KeyError immediately.",
        fix: "Use os.getenv('VAR', 'default') or os.environ.get('VAR') to safely handle missing variables.",
      },
      {
        mistake: "Hardcoding path separators (/ or \\)",
        why: "Scripts with /path/to/file break on Windows. Scripts with \\path fail on Linux/macOS.",
        fix: "Use pathlib.Path for all path manipulation — it handles separators automatically on every platform.",
      },
    ],
    summary: [
      "os.getcwd() and Path.cwd() return the current working directory",
      "os.getenv('VAR', 'default') safely reads environment variables",
      "os.getpid(), os.getuid() give process and user information",
      "os.walk() recursively traverses directory trees top-down",
      "pathlib.Path is preferred over os.path for new Python 3 code",
      "Path objects use / operator to join paths safely cross-platform",
      "Path.rglob('*.log') recursively finds files matching a pattern",
      "shutil.disk_usage() returns (total, used, free) in bytes",
    ],
    nextLesson: "subprocess",
    prevLesson: "python-for-linux",
  },
};
