"use client";

import { useState } from "react";
import { generateRoute, getMinRunwayForClass } from "@/lib/dispatcher";
import type { AircraftClass } from "@/types";
import { SimBriefCard } from "@/components/dashboard/SimBriefCard";
import { ClipboardList, Plane } from "lucide-react";

const CLASS_LABELS: Record<AircraftClass, string> = {
  A: "Bush",
  B: "Exec",
  C: "Med",
  D: "Heavy",
  E: "Military",
};

export default function FlightPrepPage() {
  const [classChoice, setClassChoice] = useState<AircraftClass>("C");
  const [route, setRoute] = useState<ReturnType<typeof generateRoute>>(null);

  const handleGenerate = () => {
    setRoute(generateRoute(classChoice));
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2">
        <ClipboardList className="w-6 h-6 text-primary" />
        Flight Preparation
      </h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* SimBrief import */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Plane className="w-5 h-5 text-primary" />
            SimBrief – Import flight plan
          </h2>
          <SimBriefCard />
        </section>

        {/* AI flight generator */}
        <section className="glass-card rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            Smart flight generator
          </h2>
          <p className="text-slate-400 text-sm mb-4">
            Min runway: <span className="text-primary font-mono">{getMinRunwayForClass(classChoice)} m</span> for class {classChoice}.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {(["A", "B", "C", "D", "E"] as AircraftClass[]).map((c) => (
              <button
                key={c}
                onClick={() => setClassChoice(c)}
                className={`px-4 py-2 rounded-lg border transition ${
                  classChoice === c
                    ? "bg-primary/20 border-primary/50 text-primary"
                    : "bg-white/5 border-white/20 text-slate-400 hover:text-white hover:border-white/30"
                }`}
              >
                {c}: {CLASS_LABELS[c]}
              </button>
            ))}
          </div>
          <button
            onClick={handleGenerate}
            className="px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 font-medium"
          >
            Generate route
          </button>
          {route && (
            <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-slate-500 text-sm">Origin</p>
              <p className="text-white font-mono">{route.origin.icao} — {route.origin.name}</p>
              <p className="text-slate-500 text-sm mt-2">Destination</p>
              <p className="text-white font-mono">{route.destination.icao} — {route.destination.name}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
