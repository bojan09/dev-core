"use client";

import React, { useState, useEffect, useRef } from "react";

interface Goroutine {
  id:     number;
  label:  string;
  state:  "running" | "waiting" | "done";
  thread: number;
}

const CHANNEL_STEPS = [
  { from: "Worker 1", to: "Channel",  msg: "result: 42",  color: "#06B6D4" },
  { from: "Worker 2", to: "Channel",  msg: "result: 17",  color: "#06B6D4" },
  { from: "Channel",  to: "Main",     msg: "42",          color: "#10B981" },
  { from: "Channel",  to: "Main",     msg: "17",          color: "#10B981" },
];

export function GoRoutinesInfographic() {
  const [tab, setTab]           = useState<"scheduler"|"channels">("scheduler");
  const [running, setRunning]   = useState(false);
  const [step, setStep]         = useState(0);
  const [goroutines, setGoroutines] = useState<Goroutine[]>([
    { id: 1, label: "main()",    state: "running", thread: 0 },
    { id: 2, label: "worker(1)", state: "waiting", thread: -1 },
    { id: 3, label: "worker(2)", state: "waiting", thread: -1 },
    { id: 4, label: "worker(3)", state: "waiting", thread: -1 },
  ]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const THREAD_COUNT = 2;

  const advance = () => {
    setGoroutines((prev) => {
      const next = [...prev.map((g) => ({ ...g }))];
      const waiting = next.filter((g) => g.state === "waiting");
      const running_ = next.filter((g) => g.state === "running");

      // Cycle: move a running → done, pick a waiting → running
      if (running_.length > 0) {
        const toFinish = running_[Math.floor(Math.random() * running_.length)];
        if (toFinish.label !== "main()") toFinish.state = "done";
      }
      if (waiting.length > 0) {
        const toRun = waiting[0];
        toRun.state   = "running";
        toRun.thread  = Math.floor(Math.random() * THREAD_COUNT);
      }
      return next;
    });
  };

  useEffect(() => {
    if (running) {
      timer.current = setInterval(advance, 900);
    } else {
      if (timer.current) clearInterval(timer.current);
    }
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [running]);

  const reset = () => {
    setRunning(false);
    setStep(0);
    setGoroutines([
      { id: 1, label: "main()",    state: "running", thread: 0 },
      { id: 2, label: "worker(1)", state: "waiting", thread: -1 },
      { id: 3, label: "worker(2)", state: "waiting", thread: -1 },
      { id: 4, label: "worker(3)", state: "waiting", thread: -1 },
    ]);
  };

  const stateColor: Record<string, string> = {
    running: "#06B6D4",
    waiting: "#F59E0B",
    done:    "#10B981",
  };

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-elevated overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-surface-border flex items-center gap-3">
        <span className="text-xl">🐹</span>
        <div>
          <p className="text-sm font-semibold text-text-primary">Go concurrency model</p>
          <p className="text-xs text-text-muted">Goroutines, the scheduler, and channels</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-surface-border">
        {(["scheduler", "channels"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 px-3 py-2.5 text-xs font-semibold capitalize transition-all duration-150"
            style={{
              color:        tab === t ? "#06B6D4" : "#4B5563",
              borderBottom: tab === t ? "2px solid #06B6D4" : "2px solid transparent",
              background:   tab === t ? "rgba(6,182,212,0.06)" : "transparent",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "scheduler" && (
        <div className="p-5 space-y-4">
          {/* OS Threads */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">
              OS threads (GOMAXPROCS = {THREAD_COUNT})
            </p>
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: THREAD_COUNT }).map((_, ti) => {
                const onThread = goroutines.find((g) => g.state === "running" && g.thread === ti);
                return (
                  <div
                    key={ti}
                    className="rounded-xl border p-3 min-h-[56px] flex flex-col justify-center"
                    style={{
                      borderColor: onThread ? "rgba(6,182,212,0.4)" : "#2A3441",
                      background:  onThread ? "rgba(6,182,212,0.06)" : "rgba(22,27,34,0.5)",
                    }}
                  >
                    <p className="text-[10px] font-mono text-text-muted mb-1">Thread {ti}</p>
                    {onThread ? (
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
                        <span className="text-xs font-mono font-medium text-[#06B6D4]">{onThread.label}</span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-text-muted">idle</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Run queue */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">
              Goroutine run queue
            </p>
            <div className="space-y-1.5">
              {goroutines.map((g) => (
                <div
                  key={g.id}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl border transition-all duration-300"
                  style={{
                    borderColor: `${stateColor[g.state]}40`,
                    background:  `${stateColor[g.state]}08`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: stateColor[g.state] }}
                  />
                  <span className="text-xs font-mono font-medium text-text-primary flex-1">{g.label}</span>
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      background:  `${stateColor[g.state]}18`,
                      color:        stateColor[g.state],
                    }}
                  >
                    {g.state}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setRunning((v) => !v)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all"
              style={{ background: running ? "#EF4444" : "#06B6D4" }}
            >
              {running ? "Pause" : "Simulate"}
            </button>
            <button
              onClick={reset}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted border border-surface-border hover:text-text-secondary transition-all"
            >
              Reset
            </button>
            <span className="text-[10px] text-text-muted ml-1">
              {running ? "Scheduler running…" : "Press Simulate to run"}
            </span>
          </div>
        </div>
      )}

      {tab === "channels" && (
        <div className="p-5 space-y-4">
          <p className="text-xs text-text-secondary leading-relaxed">
            Channels are typed pipes. Goroutines send values in, others receive values out. This is Go's "share memory by communicating" philosophy.
          </p>

          {/* Channel flow diagram */}
          <div className="space-y-2">
            {CHANNEL_STEPS.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-200"
                style={{
                  borderColor: step > i ? `${s.color}40` : "#2A3441",
                  background:  step > i ? `${s.color}08`  : "transparent",
                  opacity:     step > i ? 1 : 0.4,
                }}
              >
                <span className="text-xs font-mono font-medium text-text-secondary w-16 shrink-0">{s.from}</span>
                <div
                  className="flex-1 h-0.5 rounded-full relative"
                  style={{ background: step > i ? s.color : "#2A3441" }}
                >
                  {step > i && (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded-full"
                      style={{ background: s.color, color: "#fff", left: "50%", transform: "translate(-50%,-50%)" }}
                    >
                      {s.msg}
                    </div>
                  )}
                </div>
                <span className="text-xs font-mono font-medium text-text-secondary w-16 text-right shrink-0">{s.to}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setStep((v) => Math.min(CHANNEL_STEPS.length, v + 1))}
              disabled={step >= CHANNEL_STEPS.length}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all disabled:opacity-40"
              style={{ background: "#06B6D4" }}
            >
              Send next →
            </button>
            <button
              onClick={() => setStep(0)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted border border-surface-border hover:text-text-secondary transition-all"
            >
              Reset
            </button>
          </div>

          <pre className="text-[11px] font-mono bg-[#0D1117] rounded-xl p-4 text-[#A5D6FF] leading-relaxed overflow-x-auto border border-surface-border/50">
{`ch := make(chan int, 2)
go func() { ch <- 42 }()
go func() { ch <- 17 }()
fmt.Println(<-ch) // 42
fmt.Println(<-ch) // 17`}
          </pre>
        </div>
      )}
    </div>
  );
}
