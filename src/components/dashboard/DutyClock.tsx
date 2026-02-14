"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const USER_ID = "user-1"; // TODO: from auth

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((n) => n.toString().padStart(2, "0")).join(":");
}

export function DutyClock() {
  const [clockedIn, setClockedIn] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("duty");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.userId === USER_ID && data.clockedIn && data.startedAt) {
          setClockedIn(true);
          setStartedAt(data.startedAt);
          setElapsed(data.elapsedSeconds ?? 0);
        }
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (!clockedIn) return;
    const start = startedAt ?? Date.now();
    const interval = setInterval(() => {
      const now = Date.now();
      const total = Math.floor((now - start) / 1000) + elapsed;
      setElapsed(total);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "duty",
          JSON.stringify({
            userId: USER_ID,
            clockedIn: true,
            startedAt: start,
            elapsedSeconds: total,
          })
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [clockedIn, startedAt, elapsed]);

  const handleToggle = () => {
    if (clockedIn) {
      setClockedIn(false);
      setStartedAt(null);
      setElapsed(0);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "duty",
          JSON.stringify({ userId: USER_ID, clockedIn: false, startedAt: null, elapsedSeconds: 0 })
        );
      }
    } else {
      const now = Date.now();
      setClockedIn(true);
      setStartedAt(now);
      setElapsed(0);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "duty",
          JSON.stringify({ userId: USER_ID, clockedIn: true, startedAt: now, elapsedSeconds: 0 })
        );
      }
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-gray-400" />
        <h2 className="text-lg font-semibold text-white">Duty</h2>
      </div>
      <div className="text-3xl font-mono text-white mb-4">
        {formatTime(elapsed)}
      </div>
      <button
        onClick={handleToggle}
        className={`px-4 py-2 rounded-lg font-medium transition ${
          clockedIn
            ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/40"
            : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/40"
        }`}
      >
        {clockedIn ? "Klok uit" : "Klok in"}
      </button>
    </div>
  );
}
