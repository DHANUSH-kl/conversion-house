"use client";

import { useCallback, useRef, useState } from "react";

export default function CompareVisual() {
  const [pos, setPos] = useState(52);
  const dragging = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-2xl border border-[var(--line)] bg-white overflow-hidden select-none shadow-[0_1px_0_rgba(0,0,0,0.02)]"
      onMouseMove={(e) => dragging.current && update(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={(e) => update(e.touches[0].clientX)}
    >
      {/* AFTER layer (full width, base) */}
      <div className="absolute inset-0">
        <MiniSite />
      </div>

      {/* BEFORE layer (clipped) */}
      <div
        className="absolute inset-0 border-r border-[var(--line)]"
        style={{ width: `${pos}%`, overflow: "hidden" }}
      >
        <div style={{ width: "auto", minWidth: "100%" }} className="h-full">
          <NoSite />
        </div>
      </div>

      {/* handle */}
      <div
        className="absolute top-0 bottom-0 flex items-center justify-center"
        style={{ left: `calc(${pos}% - 14px)`, width: 28, cursor: "ew-resize" }}
        onMouseDown={() => (dragging.current = true)}
        onTouchStart={() => (dragging.current = true)}
      >
        <div className="h-full w-px bg-[var(--ink)]/70" />
        <div className="absolute h-8 w-8 rounded-full bg-[var(--ink)] flex items-center justify-center text-white text-[11px] shadow-md">
          ↔
        </div>
      </div>

      <span className="absolute top-3 left-3 font-mono-label text-[10px] uppercase tracking-wider bg-white/90 border border-[var(--line)] rounded-full px-2 py-1 text-[var(--ink-soft)]">
        before
      </span>
      <span className="absolute top-3 right-3 font-mono-label text-[10px] uppercase tracking-wider bg-white/90 border border-[var(--line)] rounded-full px-2 py-1 text-[var(--accent-ink)]">
        after conversion house
      </span>
    </div>
  );
}

function NoSite() {
  return (
    <div className="h-full w-full bg-[#f2f2ef] flex flex-col items-center justify-center gap-3 px-8 text-center">
      <div className="h-10 w-10 rounded-full bg-[#e2e2dd]" />
      <div className="h-2 w-28 rounded-full bg-[#dcdcd6]" />
      <div className="h-2 w-20 rounded-full bg-[#dcdcd6]" />
      <p className="mt-2 text-[11px] text-[#8a8a80] font-mono-label">
        "just call or visit the shop"
      </p>
    </div>
  );
}

function MiniSite() {
  return (
    <div className="h-full w-full bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[var(--line)]">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="text-[11px] font-semibold">Studio Nine</span>
        </div>
        <div className="hidden sm:flex gap-3 text-[10px] text-[var(--ink-soft)]">
          <span>Menu</span>
          <span>Book</span>
          <span>Contact</span>
        </div>
        <span className="text-[9px] bg-[var(--accent)] text-white rounded-full px-2 py-1">
          Reserve
        </span>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-3 p-4 sm:p-6">
        <div className="col-span-1 flex flex-col justify-center gap-2">
          <div className="h-2.5 w-24 rounded-full bg-[var(--ink)]/85" />
          <div className="h-2.5 w-32 rounded-full bg-[var(--ink)]/85" />
          <div className="h-1.5 w-28 rounded-full bg-[var(--ink-soft)]/40 mt-1" />
          <div className="h-6 w-20 rounded-full bg-[var(--accent)] mt-2" />
        </div>
        <div className="col-span-1 rounded-lg bg-[var(--accent-tint)] border border-[var(--line)]" />
      </div>
    </div>
  );
}
