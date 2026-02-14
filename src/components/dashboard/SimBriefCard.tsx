"use client";

import { useState } from "react";
import { fetchSimBrief, getDelayStatus } from "@/lib/simbrief";
import type { SimBriefData } from "@/types";
import { Plane } from "lucide-react";

export function SimBriefCard() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState<SimBriefData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setError("");
    try {
      const result = await fetchSimBrief(username.trim());
      setData(result ?? null);
      if (!result) setError("No data or invalid username.");
    } catch {
      setError("Failed to fetch SimBrief.");
    } finally {
      setLoading(false);
    }
  };

  const status = data ? getDelayStatus(data.etd) : null;

  return (
    <div className="glass-card rounded-xl p-6 border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <Plane className="w-5 h-5 text-gray-400" />
        <h2 className="text-lg font-semibold text-white">SimBrief</h2>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="SimBrief username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-500"
        />
        <button
          onClick={load}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-50"
        >
          {loading ? "Loading…" : "Fetch"}
        </button>
      </div>
      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
      {data && (
        <div className="space-y-2 text-sm">
          <p><span className="text-gray-500">Route:</span> <span className="text-white">{data.route || "—"}</span></p>
          <p><span className="text-gray-500">Fuel (lbs):</span> <span className="text-white">{data.fuelLbs}</span></p>
          <p><span className="text-gray-500">ETD:</span> <span className="text-white">{new Date(data.etd).toLocaleString()}</span></p>
          <p><span className="text-gray-500">Origin → Dest:</span> <span className="text-white">{data.origin} → {data.destination}</span></p>
          {status && (
            <p>
              <span className="text-gray-500">Status:</span>{" "}
              <span className={status === "on_time" ? "text-emerald-400" : "text-amber-400"}>
                {status === "on_time" ? "On-Time" : "Delayed"}
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
