"use client";

import React from "react";
import type { MockupType } from "@/types/portfolio";

export function ProjectMockup({ type }: { type: MockupType }) {
  switch (type) {
    case "dretail-accounting":
      return <DRetailAccountingMockup />;
    case "dretail-web":
      return <DRetailWebsiteMockup />;
    case "combiphar-pwa":
      return <CombipharPwaMockup />;
    case "xauusd-smc":
      return <XauusdSmcMockup />;
  }
}

function DRetailAccountingMockup() {
  return (
    <div className="relative h-full w-full select-none overflow-hidden bg-[#f8fafc] text-slate-900 font-sans">
      <div className="grid h-full grid-cols-1 sm:grid-cols-[148px_1fr]">
        {/* Sidebar */}
        <div className="hidden flex-col justify-between border-r border-slate-200 bg-[#0b192c] p-3 text-slate-300 sm:flex">
          <div>
            <div className="mb-4 flex items-center gap-1.5">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-sky-500 text-[10px] font-extrabold text-white">
                dR
              </span>
              <span className="text-[11px] font-bold tracking-tight text-white">
                dRetail <span className="text-sky-400">ERP</span>
              </span>
            </div>
            <div className="space-y-1 text-[9.5px]">
              <div className="rounded px-2 py-1 text-slate-400">Dashboard POS</div>
              <div className="rounded px-2 py-1 text-slate-400">Inventory</div>
              <div className="rounded bg-sky-500/20 px-2 py-1 font-semibold text-sky-300 ring-1 ring-sky-400/30">
                General Ledger
              </div>
              <div className="rounded px-2 py-1 text-slate-400">Chart of Accounts</div>
              <div className="rounded px-2 py-1 text-slate-400">Posting Jurnal</div>
              <div className="rounded px-2 py-1 text-slate-400">Mutasi Kas/Bank</div>
              <div className="rounded px-2 py-1 text-slate-400">Cash Clearance</div>
            </div>
          </div>
          <div className="rounded bg-white/5 px-2 py-1.5 text-[8.5px] text-slate-400">
            <div className="font-semibold text-emerald-400">● Balanced</div>
            <div>FY 2026 · Multi-Outlet</div>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex min-w-0 flex-col gap-2 p-2.5 sm:gap-2.5 sm:p-4">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-[8.5px] font-semibold uppercase tracking-wider text-sky-600 sm:text-[9px]">
                Backoffice · Accounting Suite
              </div>
              <div className="truncate text-[11px] font-bold text-slate-900 sm:text-sm">
                Chart of Accounts &amp; General Ledger
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[8.5px] font-semibold text-emerald-700 ring-1 ring-emerald-200 sm:text-[9px]">
              Cleared · 100%
            </span>
          </div>

          {/* KPI Strip */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {[
              { label: "Kas & Bank", value: "Rp 482,6 Jt", delta: "+12.4%" },
              { label: "Jurnal", value: "1.284", delta: "Seimbang" },
              { label: "Laba MTD", value: "Rp 164,9 Jt", delta: "+8.2%" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="min-w-0 rounded-lg border border-slate-200 bg-white p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:p-2"
              >
                <div className="truncate text-[8px] text-slate-500 sm:text-[8.5px]">{kpi.label}</div>
                <div className="mt-0.5 truncate text-[10px] font-bold text-slate-900 sm:text-xs">
                  {kpi.value}
                </div>
                <div className="text-[7.5px] font-semibold text-emerald-600 sm:text-[8px]">
                  {kpi.delta}
                </div>
              </div>
            ))}
          </div>

          {/* Hierarchical COA / Ledger Table */}
          <div className="flex-1 overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="grid grid-cols-[44px_1fr_62px_62px] border-b border-slate-200 bg-slate-50 px-2 py-1 text-[8px] font-semibold uppercase tracking-wide text-slate-500 sm:grid-cols-[54px_1fr_72px_72px] sm:px-2.5 sm:py-1.5 sm:text-[8.5px]">
              <span>Kode</span>
              <span>Akun Hierarkis (COA)</span>
              <span className="text-right">Debit</span>
              <span className="text-right">Kredit</span>
            </div>
            <div className="divide-y divide-slate-100 text-[8.5px] sm:text-[9.5px]">
              {[
                { code: "1-1000", name: "Aset Lancar — Kas & Setara Kas", d: "148.500.000", c: "—", group: true },
                { code: "1-1101", name: "└ Kas Operasional POS Cabang", d: "42.300.000", c: "—", group: false },
                { code: "1-1102", name: "└ Bank BCA Settlement QRIS", d: "106.200.000", c: "—", group: false },
                { code: "4-1000", name: "Pendapatan Penjualan Ritel", d: "—", c: "148.500.000", group: true },
              ].map((row) => (
                <div
                  key={row.code}
                  className={`grid grid-cols-[44px_1fr_62px_62px] items-center px-2 py-1 sm:grid-cols-[54px_1fr_72px_72px] sm:px-2.5 sm:py-1.5 ${
                    row.group ? "bg-sky-50/40 font-semibold text-slate-900" : "text-slate-600"
                  }`}
                >
                  <span className="font-mono text-[8px] text-sky-700 sm:text-[8.5px]">{row.code}</span>
                  <span className="truncate pr-1.5">{row.name}</span>
                  <span className="truncate text-right font-mono text-[8px] text-slate-800 sm:text-[8.5px]">{row.d}</span>
                  <span className="truncate text-right font-mono text-[8px] text-slate-800 sm:text-[8.5px]">{row.c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DRetailWebsiteMockup() {
  return (
    <div className="relative flex h-full w-full select-none flex-col justify-between overflow-hidden bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe] p-4 text-slate-900 sm:p-5">
      {/* Top Navbar */}
      <div className="flex items-center justify-between border-b border-sky-100 pb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-black tracking-tight text-sky-500">dR</span>
          <span className="text-xs font-extrabold tracking-tight text-slate-800">dRetail</span>
          <span className="ml-1 rounded bg-sky-100 px-1.5 py-0.5 text-[8px] font-semibold text-sky-700">
            POS Ecosystem
          </span>
        </div>
        <div className="hidden items-center gap-3 text-[9px] font-medium text-slate-500 sm:flex">
          <span>Business Types</span>
          <span className="font-semibold text-sky-600">Modules</span>
          <span>Pricing</span>
          <span className="rounded-full bg-sky-500 px-2.5 py-0.5 text-[8.5px] font-semibold text-white">
            Mulai Gratis
          </span>
        </div>
      </div>

      {/* Hero Split */}
      <div className="my-auto grid grid-cols-1 gap-3 py-2 sm:grid-cols-[1.15fr_0.85fr] sm:items-center">
        <div>
          <div className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 px-2 py-0.5 text-[8.5px] font-semibold text-sky-700">
            ● Aplikasi Kasir Online &amp; Otomasi Bisnis
          </div>
          <h4 className="mt-1.5 text-sm font-extrabold leading-tight tracking-tight text-slate-900 sm:text-base">
            Satu Ekosistem POS untuk <span className="text-sky-600">F&amp;B, Ritel, Service &amp; Hotel.</span>
          </h4>
          <p className="mt-1 text-[9.5px] leading-relaxed text-slate-600">
            Terintegrasi penuh mulai dari Kasir Cloud, Digital Order, Inventaris, Akuntansi hingga ERP Multi-Cabang.
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {["F&B", "Retail", "Service", "Hotel"].map((v) => (
              <span
                key={v}
                className="rounded-md border border-sky-200 bg-white px-2 py-0.5 text-[8.5px] font-semibold text-slate-700 shadow-xs"
              >
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Module Grid Card */}
        <div className="rounded-xl border border-sky-200/80 bg-white/90 p-2.5 shadow-sm backdrop-blur-sm">
          <div className="mb-1.5 text-[8.5px] font-bold uppercase tracking-wider text-slate-400">
            8 Modul Terintegrasi
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[8.5px] font-semibold">
            {[
              { name: "Cloud POS", color: "bg-sky-50 text-sky-700 border-sky-200" },
              { name: "Inventory", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
              { name: "Accounting", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
              { name: "Digital Order", color: "bg-amber-50 text-amber-700 border-amber-200" },
              { name: "Payment QRIS", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
              { name: "ERP Suite", color: "bg-violet-50 text-violet-700 border-violet-200" },
            ].map((m) => (
              <div key={m.name} className={`rounded-md border px-2 py-1.5 ${m.color}`}>
                {m.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Metric Strip */}
      <div className="flex items-center justify-between border-t border-sky-100 pt-2 text-[8.5px] text-slate-500">
        <span>dretail.id · UI Specialist Showcase</span>
        <span className="font-semibold text-sky-600">Realtime Cloud Sync ↗</span>
      </div>
    </div>
  );
}

function CombipharPwaMockup() {
  return (
    <div className="relative flex h-full w-full select-none flex-col justify-between overflow-hidden bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#0f172a] p-4 text-white sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/20 text-xs font-extrabold text-emerald-300 ring-1 ring-emerald-400/40">
            C+
          </div>
          <div>
            <div className="text-[11px] font-bold tracking-tight">Combiphar R&amp;D Portal</div>
            <div className="text-[8.5px] text-emerald-200/80">Flutter Progressive Web App</div>
          </div>
        </div>
        <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 font-mono text-[8.5px] font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
          PWA · Installable
        </span>
      </div>

      {/* Main Content Split */}
      <div className="my-2 grid grid-cols-[1.1fr_0.9fr] gap-2.5">
        <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-md">
          <div className="flex items-center justify-between text-[8.5px] text-emerald-200">
            <span className="uppercase tracking-wider">Lab Formulation Pipeline</span>
            <span className="font-mono">v2.4</span>
          </div>
          <div className="mt-2.5 space-y-2">
            {[
              { batch: "RND-2025-041", stage: "Stability Assay", pct: 92 },
              { batch: "RND-2025-048", stage: "QC Dissolution", pct: 68 },
              { batch: "RND-2025-052", stage: "Formula Review", pct: 45 },
            ].map((b) => (
              <div key={b.batch} className="space-y-1">
                <div className="flex justify-between text-[9px]">
                  <span className="font-mono font-semibold text-white">{b.batch}</span>
                  <span className="text-emerald-200/90">{b.stage}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-black/30">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet/Mobile Quick Status */}
        <div className="flex flex-col justify-between gap-2 rounded-xl border border-white/10 bg-slate-950/60 p-3">
          <div>
            <div className="text-[8.5px] uppercase tracking-wider text-slate-400">
              Device Sync
            </div>
            <div className="mt-1 text-base font-extrabold text-emerald-300">99.8%</div>
            <div className="text-[8.5px] text-slate-300">Offline-Resilient Cache</div>
          </div>
          <div className="space-y-1 border-t border-white/10 pt-2 text-[8.5px] text-slate-300">
            <div className="flex items-center justify-between">
              <span>Flutter Web</span>
              <span className="text-emerald-400">● Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>REST Sync</span>
              <span className="font-mono text-sky-300">42ms</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[8.5px] text-emerald-200/70">
        <span>Research &amp; Development Operations</span>
        <span className="font-mono">Dart · Flutter PWA</span>
      </div>
    </div>
  );
}

function XauusdSmcMockup() {
  const candles = [
    { x: 18, o: 68, c: 62, h: 58, l: 74, bull: true },
    { x: 34, o: 62, c: 66, h: 60, l: 70, bull: false },
    { x: 50, o: 66, c: 73, h: 64, l: 78, bull: false },
    { x: 66, o: 73, c: 82, h: 71, l: 88, bull: false },
    { x: 82, o: 82, c: 71, h: 67, l: 91, bull: true }, // Sweep!
    { x: 98, o: 71, c: 56, h: 53, l: 73, bull: true }, // Displacement!
    { x: 114, o: 56, c: 62, h: 55, l: 65, bull: false }, // OB Retest
    { x: 130, o: 62, c: 49, h: 46, l: 64, bull: true },
    { x: 146, o: 49, c: 40, h: 36, l: 52, bull: true },
    { x: 162, o: 40, c: 34, h: 30, l: 43, bull: true },
  ];

  return (
    <div className="relative flex h-full w-full select-none flex-col justify-between overflow-hidden bg-[#090d16] p-3.5 text-slate-100 sm:p-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between text-[9px]">
        <div className="flex items-center gap-2">
          <span className="rounded bg-amber-500/20 px-1.5 py-0.5 font-mono font-bold text-amber-300 ring-1 ring-amber-400/30">
            XAUUSD · M15
          </span>
          <span className="font-mono text-slate-400">MT5 SMC Monitor</span>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[8.5px] font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
          ● CONFIRMED BUY
        </span>
      </div>

      {/* Main Chart + HUD */}
      <div className="relative my-1.5 flex-1 overflow-hidden rounded-lg border border-slate-800 bg-[#0d1321] p-2">
        <svg
          viewBox="0 0 320 115"
          className="h-full w-full"
          preserveAspectRatio="none"
        >
          {/* Subtle grid */}
          {[25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="320"
              y2={y}
              stroke="rgba(148,163,184,0.08)"
              strokeWidth="1"
            />
          ))}

          {/* Order Block Mitigation Zone */}
          <rect
            x="76"
            y="60"
            width="135"
            height="16"
            fill="rgba(56,189,248,0.12)"
            stroke="rgba(56,189,248,0.4)"
            strokeWidth="0.7"
            strokeDasharray="3 2"
          />
          <text x="168" y="71" fill="#38bdf8" fontSize="6.5" fontFamily="monospace">
            OB MITIGATION
          </text>

          {/* Orbital TP2 / TP1 / ENTRY / SL Lines */}
          <line x1="114" y1="22" x2="310" y2="22" stroke="#10b981" strokeWidth="1" strokeDasharray="4 3" />
          <text x="234" y="19" fill="#34d399" fontSize="6.8" fontFamily="monospace">
            TP2 2661.50 (+56p)
          </text>

          <line x1="114" y1="38" x2="310" y2="38" stroke="#4ade80" strokeWidth="1" strokeDasharray="4 3" />
          <text x="234" y="35" fill="#4ade80" fontSize="6.8" fontFamily="monospace">
            TP1 2655.40 (+34p)
          </text>

          <line x1="114" y1="62" x2="310" y2="62" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 2" />
          <text x="242" y="59" fill="#93c5fd" fontSize="6.8" fontFamily="monospace">
            ENTRY 2650.20
          </text>

          <line x1="114" y1="92" x2="310" y2="92" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4 3" />
          <text x="240" y="101" fill="#fb7185" fontSize="6.8" fontFamily="monospace">
            SL 2646.20 (-22p)
          </text>

          {/* Candlesticks */}
          {candles.map((c, idx) => {
            const top = Math.min(c.o, c.c);
            const height = Math.max(Math.abs(c.c - c.o), 3);
            const fill = c.bull ? "#22c55e" : "#ef4444";
            return (
              <g key={idx}>
                <line x1={c.x} y1={c.h} x2={c.x} y2={c.l} stroke={fill} strokeWidth="1.2" />
                <rect x={c.x - 4} y={top} width="8" height={height} rx="1" fill={fill} />
              </g>
            );
          })}

          {/* Liquidity Sweep Badge */}
          <text x="58" y="102" fill="#f59e0b" fontSize="6.5" fontFamily="monospace">
            ▲ LIQ SWEEP
          </text>
        </svg>

        {/* On-Chart HUD Overlay */}
        <div className="absolute right-2 top-2 rounded-md border border-slate-700/80 bg-[#090d16]/90 px-2.5 py-1.5 font-mono text-[8px] shadow-lg backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-400">Confluence</span>
            <span className="font-bold text-emerald-400">78% VALID</span>
          </div>
          <div className="mt-0.5 flex items-center justify-between gap-3">
            <span className="text-slate-400">False Risk</span>
            <span className="font-bold text-emerald-300">16.4% [LOW]</span>
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="flex items-center justify-between font-mono text-[8px] text-slate-400">
        <span>CHoCH + OB + ATR Displacement</span>
        <span className="text-amber-400">Dynamic Invalidation Engine</span>
      </div>
    </div>
  );
}
