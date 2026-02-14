"use client";

import { useState } from "react";
import { generateRoute, getMinRunwayForClass } from "@/lib/dispatcher";
import type { AircraftClass } from "@/types";
import { Send } from "lucide-react";

const CLASS_LABELS: Record<AircraftClass, string> = {
  A: "Bush",
  B: "Exec",
  C: "Med",
  D: "Heavy",
  E: "Military",
};

export default function DispatchPage() {
  const [classChoice, setClassChoice] = useState<AircraftClass>("C");
  const [route, setRoute] = useState<ReturnType<typeof generateRoute>>(null);

  const handleGenerate = () => {
    const r = generateRoute(classChoice);
    setRoute(r);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2">
        <Send className="w-6 h-6" />
        Dispatch
      </h1>
      <div className="glass-card rounded-xl p-6 border border-white/10 max-w-xl">
        <h2 className="text-lg font-semibold text-white mb-4">AI Dispatcher</h2>
        <p className="text-gray-400 text-sm mb-4">
          Select aircraft class. Min runway: {getMinRunwayForClass(classChoice)} m for class {classChoice}.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {(["A", "B", "C", "D", "E"] as AircraftClass[]).map((c) => (
            <button
              key={c}
              onClick={() => setClassChoice(c)}
              className={`px-4 py-2 rounded-lg border transition ${
                classChoice === c
                  ? "bg-white/20 border-white/40 text-white"
                  : "bg-white/5 border-white/20 text-gray-400 hover:text-white"
              }`}
            >
              {c}: {CLASS_LABELS[c]}
            </button>
          ))}
        </div>
        <button
          onClick={handleGenerate}
          className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white border border-white/30"
        >
          Generate route
        </button>
        {route && (
          <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-gray-500 text-sm">Origin</p>
            <p className="text-white font-mono">{route.origin.icao} — {route.origin.name}</p>
            <p className="text-gray-500 text-sm mt-2">Destination</p>
            <p className="text-white font-mono">{route.destination.icao} — {route.destination.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
