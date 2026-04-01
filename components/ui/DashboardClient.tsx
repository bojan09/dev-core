"use client";

import React from "react";
import { useAuth }      from "@/hooks/useAuth";
import { useUserStats } from "@/hooks/useProgress";
import { DashboardStats } from "./stats-bar";
import { Skeleton }    from "./skeleton";

export function DashboardStatsLive() {
  const { user }                     = useAuth();
  const { stats, streak, loading }   = useUserStats(user?.id);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-surface-border bg-surface-elevated/40 p-4 space-y-2">
            <Skeleton height={14} width="60%" />
            <Skeleton height={24} width="40%" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <DashboardStats
      totalLessons={168}
      completedLessons={stats?.total_completed ?? 0}
      hoursLearned={stats?.hours_learned ?? 0}
      streak={streak}
    />
  );
}
