"use client";

import { useState, useEffect } from "react";
import { getLogbook, addLogbookEntry, deleteLogbookEntry, type LogbookEntry, type LandingType } from "@/lib/logbook";
import { getFleet } from "@/lib/fleet";
import { calculateXP } from "@/lib/xp";
import { useToast } from "@/components/notifications/ToastProvider";
import { BookOpen, Plus, Trash2 } from "lucide-react";

const LANDING_LABELS: Record<LandingType, string> = {
  butter: "Butter",
  firm: "Firm",
  hard: "Hard",
};

export default function LogbookPage() {
  const [entries, setEntries] = useState<LogbookEntry[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    aircraft: "",
    fpm: -200,
    remarks: "",
  });
  const { addToast } = useToast();
  const fleet = typeof window !== "undefined" ? getFleet() : [];

  const load = () => setEntries(getLogbook());

  useEffect(() => {
    load();
  }, []);

  const handleAdd = () => {
    const result = calculateXP(form.fpm);
    const aircraftName = form.aircraft || "Unknown";
    addLogbookEntry({
      date: new Date().toISOString(),
      origin: form.origin || "—",
      destination: form.destination || "—",
      aircraft: aircraftName,
      landingType: result.type,
      fpm: form.fpm,
      xp: result.xp,
      remarks: form.remarks || undefined,
    });
    setEntries(getLogbook());
    addToast(`+${result.xp} XP — ${result.type}`, "xp");
    setForm({ origin: "", destination: "", aircraft: "", fpm: -200, remarks: "" });
    setShowAdd(false);
  };

  const handleDelete = (id: string) => {
    deleteLogbookEntry(id);
    load();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          Logbook
        </h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30"
        >
          <Plus className="w-4 h-4" />
          Add entry
        </button>
      </div>

      {showAdd && (
        <div className="glass-card rounded-xl p-6 border border-white/10 space-y-4">
          <h2 className="text-lg font-semibold text-white">New logbook entry</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              placeholder="Origin (ICAO)"
              value={form.origin}
              onChange={(e) => setForm((f) => ({ ...f, origin: e.target.value }))}
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-slate-500"
            />
            <input
              placeholder="Destination (ICAO)"
              value={form.destination}
              onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))}
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-slate-500"
            />
            <select
              value={form.aircraft}
              onChange={(e) => setForm((f) => ({ ...f, aircraft: e.target.value }))}
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
            >
              <option value="">Select aircraft</option>
              {fleet.map((a) => (
                <option key={a.id} value={a.name}>{a.name} ({a.icao})</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Landing fpm (e.g. -120)"
              value={form.fpm === -200 ? "" : form.fpm}
              onChange={(e) => setForm((f) => ({ ...f, fpm: parseInt(e.target.value, 10) || -200 }))}
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-slate-500"
            />
            <input
              placeholder="Remarks (optional)"
              value={form.remarks}
              onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))}
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-slate-500 sm:col-span-2"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="px-4 py-2 rounded-lg bg-primary text-slate-900 font-medium hover:bg-primary-hover"
            >
              Save entry
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 rounded-lg bg-white/10 text-slate-300 hover:bg-white/20"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="glass-card rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-4 py-3 text-slate-400 font-medium">Date</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Route</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Aircraft</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Landing</th>
                <th className="px-4 py-3 text-slate-400 font-medium">FPM</th>
                <th className="px-4 py-3 text-slate-400 font-medium">XP</th>
                <th className="px-4 py-3 text-slate-400 font-medium w-12" />
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                    No logbook entries yet. Add one above.
                  </td>
                </tr>
              )}
              {entries.map((e) => (
                <tr key={e.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 text-white whitespace-nowrap">
                    {new Date(e.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-300">{e.origin} → {e.destination}</td>
                  <td className="px-4 py-3 text-slate-300">{e.aircraft}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        e.landingType === "butter"
                          ? "bg-primary/20 text-primary"
                          : e.landingType === "firm"
                            ? "bg-warning/20 text-warning"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {LANDING_LABELS[e.landingType]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-300 font-mono">{e.fpm}</td>
                  <td className="px-4 py-3 text-primary font-mono">+{e.xp}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(e.id)}
                      className="p-1.5 rounded text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
