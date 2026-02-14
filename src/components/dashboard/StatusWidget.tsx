"use client";

import { useState, useEffect } from "react";
import { Activity, Clock } from "lucide-react";

const USER_ID = "user-1";

function getDutyState() {
  if (typeof window === "undefined") return { clockedIn: false, elapsedSeconds: 0 };
  try {
    const raw = localStorage.getItem("duty");
    if (!raw) return { clockedIn: false, elapsedSeconds: 0 };
    const data = JSON.parse(raw);
    if (data.userId !== USER_ID) return { clockedIn: false, elapsedSeconds: 0 };
    const elapsed = data.clockedIn && data.startedAt
      ? Math.floor((Date.now() - data.startedAt) / 1000) + (data.elapsedSeconds ?? 0)
      : data.elapsedSeconds ?? 0;
    return { clockedIn: !!data.clockedIn, elapsedSeconds: elapsed };
  } catch {
    return { clockedIn: false, elapsedSeconds: 0 };
  }
}

function formatHours(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
}

export function StatusWidget() {
  const [state, setState] = useState({ clockedIn: false, elapsedSeconds: 0, totalXp: 0 });

  useEffect(() => {
    const update = () => {
      const duty = getDutyState();
      const xp = parseInt(localStorage.getItem("pilot-xp") ?? "0", 10) || 0;
      setState((s) => ({ ...s, ...duty, totalXp: xp }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="glass-card rounded-xl p-4 border border-white/10 flex items-center gap-4">
        <div className={`p-2 rounded-lg ${state.clockedIn ? "bg-primary/20" : "bg-slate-500/20"}`}>
          <Activity className={`w-5 h-5 ${state.clockedIn ? "text-primary" : "text-slate-400"}`} />
        </div>
        <div>
          <p className="text-slate-400 text-sm">Duty status</p>
          <p className="text-white font-medium">
            {state.clockedIn ? "On duty" : "Off duty"}
          </p>
        </div>
      </div>
      <div className="glass-card rounded-xl p-4 border border-white/10 flex items-center gap-4">
        <div className="p-2 rounded-lg bg-primary/20">
          <Clock className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-slate-400 text-sm">Session time</p>
          <p className="text-white font-mono font-medium">
            {formatHours(state.elapsedSeconds)}
          </p>
        </div>
      </div>
      <div className="glass-card rounded-xl p-4 border border-white/10 flex items-center gap-4 sm:col-span-2 lg:col-span-1">
        <div className="p-2 rounded-lg bg-warning/20">
          <span className="text-warning text-lg font-bold">XP</span>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Total XP</p>
          <p className="text-white font-mono font-medium">
            {state.totalXp.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
