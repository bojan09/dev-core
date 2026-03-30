"use client";

import React, { useState } from "react";

type Scene = "ownership" | "move" | "borrow" | "drop";

const SCENES: { id: Scene; label: string; color: string }[] = [
  { id: "ownership", label: "Ownership",  color: "#F97316" },
  { id: "move",      label: "Move",       color: "#EF4444" },
  { id: "borrow",    label: "Borrow",     color: "#F59E0B" },
  { id: "drop",      label: "Drop",       color: "#10B981" },
];

const SCENE_CONTENT: Record<Scene, { title: string; desc: string; code: string }> = {
  ownership: {
    title: "Each value has one owner",
    desc:  "s1 is the owner of the String data on the heap. The stack holds a pointer, length, and capacity. The heap holds the actual characters.",
    code:  'let s1 = String::from("hello");',
  },
  move: {
    title: "Assignment moves ownership",
    desc:  "When you assign s1 to s2, ownership transfers. s1 becomes invalid — the compiler enforces this. No double-free is possible.",
    code:  "let s2 = s1;\n// s1 is now INVALID",
  },
  borrow: {
    title: "References borrow without owning",
    desc:  "&s creates an immutable reference. s still owns the data. The reference cannot outlive the owner.",
    code:  "let len = calc(&s1);\n// s1 still owns data",
  },
  drop: {
    title: "Out of scope → memory freed",
    desc:  "When the owner goes out of scope (} brace), Rust calls drop() automatically. Memory freed. No GC, no manual free().",
    code:  "} // s1 dropped here\n  // heap memory freed",
  },
};

export function RustOwnershipInfographic() {
  const [scene, setScene] = useState<Scene>("ownership");
  const content = SCENE_CONTENT[scene];

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-elevated overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-surface-border flex items-center gap-3">
        <span className="text-xl">🦀</span>
        <div>
          <p className="text-sm font-semibold text-text-primary">Rust ownership model</p>
          <p className="text-xs text-text-muted">Stack, heap, moves, borrows, and drops</p>
        </div>
      </div>

      {/* Scene tabs */}
      <div className="flex border-b border-surface-border">
        {SCENES.map((s) => (
          <button
            key={s.id}
            onClick={() => setScene(s.id)}
            className="flex-1 px-3 py-2.5 text-xs font-semibold transition-all duration-150"
            style={{
              color:        scene === s.id ? s.color : "#4B5563",
              borderBottom: scene === s.id ? `2px solid ${s.color}` : "2px solid transparent",
              background:   scene === s.id ? `${s.color}08` : "transparent",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Memory diagram */}
      <div className="px-5 py-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Stack */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">Stack</p>
            <div className="rounded-xl border border-surface-border overflow-hidden">
              {[
                { label: "ptr",      value: "→ heap[0x…]", highlight: true },
                { label: "len",      value: "5",          highlight: false },
                { label: "capacity", value: "5",          highlight: false },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-3 py-2 text-xs border-b border-surface-border/50 last:border-0"
                  style={{ background: row.highlight ? "rgba(249,115,22,0.08)" : "transparent" }}
                >
                  <span className="font-mono text-text-muted">{row.label}</span>
                  <span
                    className="font-mono font-medium"
                    style={{ color: row.highlight ? "#F97316" : "#8B9BB4" }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            {/* Variable label */}
            <div className="mt-2 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#F97316]" />
              <span className="text-[10px] font-mono text-text-secondary">
                {scene === "move" ? "s2 (owner)" : "s1 (owner)"}
              </span>
            </div>
            {scene === "move" && (
              <div className="mt-1 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/30" />
                <span className="text-[10px] font-mono text-text-muted line-through">s1 (invalid)</span>
              </div>
            )}
            {scene === "borrow" && (
              <div className="mt-1 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span className="text-[10px] font-mono text-text-secondary">&s (reference)</span>
              </div>
            )}
          </div>

          {/* Heap */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">Heap</p>
            <div
              className="rounded-xl border overflow-hidden"
              style={{
                borderColor: scene === "drop" ? "rgba(16,185,129,0.4)" : "rgba(249,115,22,0.3)",
                background:  scene === "drop" ? "rgba(16,185,129,0.05)" : "rgba(249,115,22,0.05)",
              }}
            >
              {["h", "e", "l", "l", "o"].map((char, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs border-b border-surface-border/30 last:border-0"
                  style={{ opacity: scene === "drop" ? 0.3 : 1, transition: "opacity 0.3s" }}
                >
                  <span className="font-mono text-text-muted text-[10px]">0x{(i).toString(16).padStart(2, "0")}</span>
                  <span className="font-mono font-bold" style={{ color: "#F97316" }}>'{char}'</span>
                </div>
              ))}
            </div>
            {scene === "drop" && (
              <div className="mt-2 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-mono text-emerald-400">Memory freed</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div
          className="mt-4 rounded-xl p-3 border"
          style={{ background: "rgba(249,115,22,0.06)", borderColor: "rgba(249,115,22,0.2)" }}
        >
          <p className="text-xs font-semibold text-text-primary mb-1">{content.title}</p>
          <p className="text-xs text-text-secondary leading-relaxed mb-2">{content.desc}</p>
          <pre className="text-[11px] font-mono bg-[#0D1117] rounded-lg px-3 py-2 text-[#79C0FF] overflow-x-auto">
            {content.code}
          </pre>
        </div>
      </div>
    </div>
  );
}
