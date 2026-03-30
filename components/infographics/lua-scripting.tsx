"use client";

import React, { useState } from "react";

const CONCEPTS = [
  {
    id:    "tables",
    label: "Tables",
    icon:  "📦",
    color: "#8B5CF6",
    desc:  "Tables are Lua's only data structure — they serve as arrays, maps, objects, and modules all at once.",
    code:  `-- Array
local arr = {10, 20, 30}

-- Map (dictionary)
local person = {
  name = "Dev",
  age  = 25,
}

-- Mixed
local mixed = {
  "first",
  key = "value",
  [10] = "ten",
}`,
  },
  {
    id:    "functions",
    label: "Functions",
    icon:  "⚡",
    color: "#6366F1",
    desc:  "Functions are first-class values in Lua. They can be stored in tables, passed as arguments, and returned from other functions.",
    code:  `-- Multiple return values
local function divmod(a, b)
  return math.floor(a/b), a % b
end

local q, r = divmod(17, 5)
-- q=3, r=2

-- Functions in tables (methods)
local obj = {}
function obj:greet()
  print("Hello from " .. tostring(self))
end`,
  },
  {
    id:    "metatables",
    label: "Metatables",
    icon:  "🔮",
    color: "#A855F7",
    desc:  "Metatables let you override operators and behaviour for tables. __index enables OOP-style inheritance.",
    code:  `local Animal = {}
Animal.__index = Animal

function Animal.new(name)
  return setmetatable(
    {name = name},
    Animal
  )
end

function Animal:speak()
  print(self.name .. " speaks!")
end

local cat = Animal.new("Cat")
cat:speak() -- Cat speaks!`,
  },
  {
    id:    "coroutines",
    label: "Coroutines",
    icon:  "🔄",
    color: "#EC4899",
    desc:  "Coroutines are cooperative threads. They yield control voluntarily and can be resumed — perfect for game loops and async patterns.",
    code:  `local co = coroutine.create(
  function()
    for i = 1, 3 do
      print("step", i)
      coroutine.yield()
    end
  end
)

coroutine.resume(co) -- step 1
coroutine.resume(co) -- step 2
coroutine.resume(co) -- step 3`,
  },
];

export function LuaScriptingInfographic() {
  const [active, setActive] = useState(0);
  const concept = CONCEPTS[active];

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-elevated overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-surface-border flex items-center gap-3">
        <span className="text-xl">🌙</span>
        <div>
          <p className="text-sm font-semibold text-text-primary">Lua core concepts</p>
          <p className="text-xs text-text-muted">Tables, functions, metatables, and coroutines</p>
        </div>
      </div>

      {/* Concept selector */}
      <div className="grid grid-cols-4 border-b border-surface-border">
        {CONCEPTS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setActive(i)}
            className="flex flex-col items-center gap-1 py-3 px-2 transition-all duration-150"
            style={{
              borderBottom: active === i ? `2px solid ${c.color}` : "2px solid transparent",
              background:   active === i ? `${c.color}08` : "transparent",
            }}
          >
            <span className="text-base">{c.icon}</span>
            <span
              className="text-[10px] font-semibold"
              style={{ color: active === i ? c.color : "#4B5563" }}
            >
              {c.label}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Description */}
        <div
          className="rounded-xl p-3 border"
          style={{ background: `${concept.color}08`, borderColor: `${concept.color}25` }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-base">{concept.icon}</span>
            <span className="text-sm font-semibold text-text-primary">{concept.label}</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">{concept.desc}</p>
        </div>

        {/* Code */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">Example</p>
          <div className="rounded-xl overflow-hidden border border-surface-border">
            {/* Code header */}
            <div className="flex items-center gap-2 px-3 py-2 bg-surface-overlay border-b border-surface-border">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
              </div>
              <span className="text-[10px] font-mono text-text-muted flex-1">{concept.id}.lua</span>
              <span
                className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                style={{ background: `${concept.color}15`, color: concept.color, borderColor: `${concept.color}30` }}
              >
                Lua
              </span>
            </div>
            <pre className="text-[11.5px] font-mono p-4 text-[#E6EDF3] bg-[#0D1117] overflow-x-auto leading-relaxed">
              {concept.code}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
