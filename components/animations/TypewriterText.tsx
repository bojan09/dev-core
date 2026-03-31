"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TypewriterTextProps {
  texts:       string[];     // Cycles through multiple strings
  speed?:      number;       // ms per character
  pauseMs?:    number;       // ms to pause at end of each string
  deleteSpeed?: number;
  className?:  string;
  cursor?:     boolean;
}

export function TypewriterText({
  texts,
  speed       = 55,
  pauseMs     = 1800,
  deleteSpeed = 30,
  className,
  cursor      = true,
}: TypewriterTextProps) {
  const reduced = useReducedMotion();
  const [displayed, setDisplayed]   = useState(reduced ? texts[0] : "");
  const [textIndex, setTextIndex]   = useState(0);
  const [phase, setPhase]           = useState<"typing" | "pause" | "deleting">("typing");
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blink
  useEffect(() => {
    if (!cursor || reduced) return;
    const id = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, [cursor, reduced]);

  // Typing loop
  useEffect(() => {
    if (reduced) return;
    const target = texts[textIndex];

    if (phase === "typing") {
      if (displayed.length < target.length) {
        const id = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), speed);
        return () => clearTimeout(id);
      } else {
        const id = setTimeout(() => setPhase("pause"), pauseMs);
        return () => clearTimeout(id);
      }
    }

    if (phase === "pause") {
      setPhase("deleting");
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const id = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deleteSpeed);
        return () => clearTimeout(id);
      } else {
        setTextIndex((i) => (i + 1) % texts.length);
        setPhase("typing");
      }
    }
  }, [displayed, phase, textIndex, texts, speed, pauseMs, deleteSpeed, reduced]);

  return (
    <span className={className}>
      {displayed}
      {cursor && !reduced && (
        <span
          style={{
            display:    "inline-block",
            width:      "2px",
            height:     "1.1em",
            background: "currentColor",
            marginLeft: "2px",
            verticalAlign: "middle",
            opacity:    showCursor ? 1 : 0,
            transition: "opacity 0.1s",
          }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
