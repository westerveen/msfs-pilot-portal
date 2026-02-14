"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/notifications/ToastProvider";
import { calculateXP, levelFromXP, getUnlockedClasses, XP_PER_LEVEL } from "@/lib/xp";

const STORAGE_KEY = "pilot-xp";

function getStoredXP(): number {
  if (typeof window === "undefined") return 0;
  try {
    return parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10);
  } catch {
    return 0;
  }
}

export function XPLevelCard() {
  const [xp, setXp] = useState(0);
  const [fpmInput, setFpmInput] = useState("");
  const { addToast } = useToast();

  useEffect(() => {
    setXp(getStoredXP());
  }, []);

  const level = levelFromXP(xp);
  const unlocked = getUnlockedClasses(level);
  const xpInLevel = xp % XP_PER_LEVEL;
  const progress = (xpInLevel / XP_PER_LEVEL) * 100;

  const handleLanding = () => {
    const fpm = parseInt(fpmInput, 10);
    if (Number.isNaN(fpm)) return;
    const result = calculateXP(fpm);
    const newXp = xp + result.xp;
    setXp(newXp);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, String(newXp));
    addToast(`+${result.xp} XP (${result.type})`, "xp");
    if (result.hardLandingAlert) addToast("Hard Landing!", "system");
    setFpmInput("");
  };

  const badges = [
    level >= 2 && { label: "Class B", color: "bg-primary/20 text-primary" },
    level >= 5 && { label: "Class C", color: "bg-primary/20 text-primary" },
    level >= 10 && { label: "Class D", color: "bg-warning/20 text-warning" },
    level >= 20 && { label: "Class E", color: "bg-warning/20 text-warning" },
  ].filter(Boolean) as { label: string; color: string }[];

  return (
    <div className="glass-card rounded-xl p-6 border border-white/10">
      <h2 className="text-lg font-semibold text-white mb-2">XP & leveling</h2>
      <p className="text-2xl font-mono text-primary mb-1">{xp.toLocaleString()} XP</p>
      <p className="text-sm text-slate-400 mb-2">Level {level}</p>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-slate-400 mb-2">Unlocked classes: {unlocked.join(", ") || "A"}</p>
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {badges.map((b) => (
            <span
              key={b.label}
              className={`px-2 py-0.5 rounded text-xs font-medium ${b.color}`}
            >
              {b.label}
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2 mt-4">
        <input
          type="number"
          placeholder="Landing fpm (e.g. -120)"
          value={fpmInput}
          onChange={(e) => setFpmInput(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-slate-500 text-sm"
        />
        <button
          onClick={handleLanding}
          className="px-4 py-2 rounded-lg bg-warning/20 text-warning border border-warning/40 hover:bg-warning/30"
        >
          Add landing
        </button>
      </div>
    </div>
  );
}
