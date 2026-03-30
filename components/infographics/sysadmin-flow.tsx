"use client";

import React, { useState } from "react";

const PIPELINE = [
  {
    id:      "trigger",
    icon:    "⏱",
    label:   "Trigger",
    detail:  "Script starts: cron job, systemd timer, manual run, or event (inotify watch, webhook).",
    color:   "#10B981",
    examples: ["*/5 * * * * python3 monitor.py", "systemctl start backup.service"],
  },
  {
    id:      "gather",
    icon:    "📡",
    label:   "Gather data",
    detail:  "Python reads system state via os, subprocess, psutil, socket, or log files.",
    color:   "#3B82F6",
    examples: ["psutil.cpu_percent()", "subprocess.run(['df', '-h'])"],
  },
  {
    id:      "parse",
    icon:    "🔍",
    label:   "Parse & filter",
    detail:  "Regex, string splits, or JSON parsing extracts the relevant data from raw output.",
    color:   "#6366F1",
    examples: ["re.findall(r'ERROR.*', log)", "json.loads(resp.text)"],
  },
  {
    id:      "decide",
    icon:    "🧠",
    label:   "Logic / decision",
    detail:  "Thresholds, conditions, comparisons. Does the metric exceed the alert level?",
    color:   "#F59E0B",
    examples: ["if cpu > 90: alert()", "if disk_free < 5GB: cleanup()"],
  },
  {
    id:      "act",
    icon:    "⚡",
    label:   "Take action",
    detail:  "Write files, restart services, send alerts (email, Slack, PagerDuty), modify configs.",
    color:   "#F97316",
    examples: ["os.rename(src, dst)", "requests.post(webhook_url, json=msg)"],
  },
  {
    id:      "log",
    icon:    "📝",
    label:   "Log result",
    detail:  "Write structured logs for auditability. The next trigger cycle reads these to detect trends.",
    color:   "#8B5CF6",
    examples: ["logging.info('CPU: %.1f%%', cpu)", "json.dump(result, logfile)"],
  },
];

export function SysAdminFlowInfographic() {
  const [active, setActive] = useState<number | null>(null);
  const step = active !== null ? PIPELINE[active] : null;

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-elevated overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-surface-border flex items-center gap-3">
        <span className="text-xl">⚙️</span>
        <div>
          <p className="text-sm font-semibold text-text-primary">SysAdmin automation pipeline</p>
          <p className="text-xs text-text-muted">Click any stage to see details and examples</p>
        </div>
      </div>

      {/* Pipeline */}
      <div className="p-5">
        {/* Vertical pipeline on mobile, horizontal on larger screens */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {PIPELINE.map((s, i) => (
            <React.Fragment key={s.id}>
              <button
                onClick={() => setActive(active === i ? null : i)}
                className="flex sm:flex-col items-center gap-3 sm:gap-2 px-3 sm:px-2 py-2.5 rounded-xl border-2 transition-all duration-200 text-left sm:text-center flex-1 sm:min-w-0"
                style={{
                  borderColor: active === i ? s.color : `${s.color}30`,
                  background:  active === i ? `${s.color}12` : `${s.color}06`,
                  transform:   active === i ? "scale(1.03)" : "scale(1)",
                }}
              >
                <span className="text-xl shrink-0">{s.icon}</span>
                <span
                  className="text-[11px] font-semibold leading-tight"
                  style={{ color: active === i ? s.color : "#8B9BB4" }}
                >
                  {s.label}
                </span>
              </button>

              {i < PIPELINE.length - 1 && (
                <div className="flex sm:flex-col items-center justify-center shrink-0">
                  <div
                    className="w-0.5 h-4 sm:h-0.5 sm:w-4"
                    style={{ background: "#2A3441" }}
                  />
                  <div
                    className="text-[#2A3441] text-xs leading-none"
                    style={{ writingMode: "horizontal-tb" }}
                  >
                    →
                  </div>
                  <div
                    className="w-0.5 h-4 sm:h-0.5 sm:w-4"
                    style={{ background: "#2A3441" }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Detail panel */}
        {step && (
          <div
            className="mt-4 rounded-xl p-4 border transition-all duration-300"
            style={{ background: `${step.color}08`, borderColor: `${step.color}30` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{step.icon}</span>
              <p className="text-sm font-semibold text-text-primary">{step.label}</p>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed mb-3">{step.detail}</p>
            <div className="space-y-1.5">
              {step.examples.map((ex, i) => (
                <pre
                  key={i}
                  className="text-[11px] font-mono px-3 py-2 rounded-lg overflow-x-auto"
                  style={{
                    background:  "#0D1117",
                    color:        "#A5D6FF",
                    border:      `1px solid ${step.color}20`,
                  }}
                >
                  {ex}
                </pre>
              ))}
            </div>
          </div>
        )}

        {!step && (
          <p className="mt-4 text-center text-xs text-text-muted">
            Click any stage above to explore details and code examples
          </p>
        )}
      </div>
    </div>
  );
}
