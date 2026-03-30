"use client";

import React, { useState } from "react";

const STEPS = [
  {
    id: 0,
    label: "Source code",
    sublabel: "hello.py",
    detail: "You write Python in a .py file. Human-readable text — variables, functions, logic.",
    example: 'name = "Dev"\nprint(f"Hello, {name}")',
    color: "#3B82F6",
  },
  {
    id: 1,
    label: "Tokeniser & parser",
    sublabel: "AST generation",
    detail: "CPython reads your source and builds an Abstract Syntax Tree (AST) — a structured tree of the program's grammar.",
    example: "Module → Assign → Call\n  └─ Name('print')\n  └─ JoinedStr(…)",
    color: "#6366F1",
  },
  {
    id: 2,
    label: "Compiler",
    sublabel: ".pyc bytecode",
    detail: "The compiler walks the AST and emits bytecode — a compact, platform-neutral instruction set stored in __pycache__.",
    example: "LOAD_CONST   'Dev'\nSTORE_NAME   name\nLOAD_GLOBAL  print\nLOAD_NAME    name\nCALL_FUNCTION 1",
    color: "#8B5CF6",
  },
  {
    id: 3,
    label: "Python VM",
    sublabel: "CPython interpreter",
    detail: "The PVM is a loop that reads each bytecode instruction and executes it on your CPU. This is where your program actually runs.",
    example: "while bytecode:\n  op = next()\n  execute(op)\n  # ~90M ops/sec",
    color: "#A855F7",
  },
  {
    id: 4,
    label: "Output",
    sublabel: "Result / side-effects",
    detail: "Execution produces output, modifies files, calls APIs — whatever your program was designed to do.",
    example: "Hello, Dev",
    color: "#10B981",
  },
];

export function PythonFlowInfographic() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-elevated overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-surface-border flex items-center gap-3">
        <span className="text-xl">🐍</span>
        <div>
          <p className="text-sm font-semibold text-text-primary">Python execution flow</p>
          <p className="text-xs text-text-muted">How your .py file becomes a running program</p>
        </div>
      </div>

      {/* Step pipeline */}
      <div className="px-5 pt-5 pb-2">
        <div className="flex items-center gap-1">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <button
                onClick={() => setActive(i)}
                className="flex flex-col items-center gap-1.5 flex-1 min-w-0 group"
              >
                {/* Circle */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-200"
                  style={{
                    background:  active === i ? s.color : `${s.color}18`,
                    borderColor: active === i ? s.color : `${s.color}40`,
                    color:       active === i ? "#fff" : s.color,
                    transform:   active === i ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {i + 1}
                </div>
                {/* Label */}
                <span
                  className="text-[10px] font-medium text-center leading-tight hidden sm:block truncate w-full"
                  style={{ color: active === i ? s.color : "#4B5563" }}
                >
                  {s.label}
                </span>
              </button>

              {/* Connector */}
              {i < STEPS.length - 1 && (
                <div
                  className="h-0.5 flex-1 transition-all duration-300 min-w-[8px]"
                  style={{ background: i < active ? STEPS[i].color : "#2A3441" }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div className="px-5 pb-5 pt-3">
        <div
          className="rounded-xl p-4 border transition-all duration-300"
          style={{
            background:  `${step.color}10`,
            borderColor: `${step.color}30`,
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="shrink-0 w-2 h-2 rounded-full mt-1.5"
              style={{ background: step.color }}
            />
            <div className="flex-1 min-w-0 space-y-2">
              <div>
                <p className="text-sm font-semibold text-text-primary">{step.label}</p>
                <p className="text-[11px] font-medium" style={{ color: step.color }}>{step.sublabel}</p>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">{step.detail}</p>
              <pre
                className="text-[11px] font-mono p-3 rounded-lg leading-relaxed overflow-x-auto"
                style={{ background: "#0D1117", color: "#A5D6FF", border: `1px solid ${step.color}25` }}
              >
                {step.example}
              </pre>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => setActive(Math.max(0, active - 1))}
            disabled={active === 0}
            className="text-xs text-text-muted hover:text-text-secondary disabled:opacity-30 transition-colors px-2 py-1"
          >
            ← Previous
          </button>
          <span className="text-[10px] text-text-muted font-mono">{active + 1} / {STEPS.length}</span>
          <button
            onClick={() => setActive(Math.min(STEPS.length - 1, active + 1))}
            disabled={active === STEPS.length - 1}
            className="text-xs text-text-muted hover:text-text-secondary disabled:opacity-30 transition-colors px-2 py-1"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
