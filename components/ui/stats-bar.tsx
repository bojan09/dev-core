import React from "react";
import { TrendingUp, BookOpen, Clock, Flame } from "lucide-react";
import { AnimatedCounter } from "@/components/animations";
import { cn } from "@/lib/utils";

interface StatItem {
  label:   string;
  value:   string | number;
  sub?:    string;
  icon:    React.ReactNode;
  color?:  string;
}

interface StatsBarProps {
  stats:     StatItem[];
  className?: string;
}

export function StatsBar({ stats, className }: StatsBarProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 lg:grid-cols-4 gap-3",
        className
      )}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center gap-3 p-4 rounded-2xl",
            "bg-gradient-to-b from-white/[0.05] to-white/[0.02]",
            "border border-white/[0.07]",
            "transition-all duration-200 hover:border-white/[0.12]"
          )}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: stat.color ? `${stat.color}18` : "rgba(123,97,255,0.15)",
              color: stat.color ?? "#A895FF",
            }}
          >
            {stat.icon}
          </div>
          <div className="min-w-0">
            <p className="text-lg font-semibold text-[#F0F6FF] leading-none mb-0.5">
              {stat.value}
            </p>
            <p className="text-[11px] text-[#4B5563] truncate">{stat.label}</p>
            {stat.sub && (
              <p className="text-[10px] text-[#4B5563]/70 truncate">{stat.sub}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Pre-built dashboard stats */
export function DashboardStats({
  totalLessons = 0,
  completedLessons = 0,
  hoursLearned = 0,
  streak = 0,
}: {
  totalLessons?: number;
  completedLessons?: number;
  hoursLearned?: number;
  streak?: number;
}) {
  const stats: StatItem[] = [
    {
      label: "Lessons completed",
      value: completedLessons,
      sub:   `of ${totalLessons} total`,
      icon:  <BookOpen size={16} />,
      color: "#7B61FF",
    },
    {
      label: "Overall progress",
      value: totalLessons > 0
        ? `${Math.round((completedLessons / totalLessons) * 100)}%`
        : "0%",
      icon:  <TrendingUp size={16} />,
      color: "#00C2FF",
    },
    {
      label: "Hours learned",
      value: `${hoursLearned}h`,
      icon:  <Clock size={16} />,
      color: "#10B981",
    },
    {
      label: "Day streak",
      value: streak,
      sub:   streak > 0 ? "Keep it up!" : "Start today",
      icon:  <Flame size={16} />,
      color: "#F97316",
    },
  ];

  return <StatsBar stats={stats} />;
}
