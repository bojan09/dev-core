import React from "react";
import { CheckCircle2, Circle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  trackName:   string;
  trackColor:  string;
  trackIcon:   string;
  lessonTitle: string;
  completed:   boolean;
  timeAgo:     string;
}

interface ActivityFeedProps {
  items:     ActivityItem[];
  className?: string;
}

export function ActivityFeed({ items, className }: ActivityFeedProps) {
  if (items.length === 0) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-10 text-center", className)}>
        <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-3">
          <BookOpen size={20} className="text-[#4B5563]" />
        </div>
        <p className="text-sm font-medium text-[#8B9BB4]">No activity yet</p>
        <p className="text-xs text-[#4B5563] mt-1">Start a lesson to see your progress here</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-1", className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center gap-3 p-3 rounded-xl",
            "hover:bg-white/[0.03] transition-colors duration-150 group"
          )}
        >
          {/* Status icon */}
          <div className="shrink-0">
            {item.completed
              ? <CheckCircle2 size={16} className="text-emerald-400" />
              : <Circle size={16} className="text-[#4B5563]" />
            }
          </div>

          {/* Track icon */}
          <span className="text-sm leading-none shrink-0">{item.trackIcon}</span>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#F0F6FF] truncate">
              {item.lessonTitle}
            </p>
            <p className="text-[10px] text-[#4B5563]">{item.trackName}</p>
          </div>

          {/* Time */}
          <span className="text-[10px] text-[#4B5563] shrink-0 tabular-nums">
            {item.timeAgo}
          </span>
        </div>
      ))}
    </div>
  );
}
