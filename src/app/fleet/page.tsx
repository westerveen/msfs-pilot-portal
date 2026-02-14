"use client";

import { useState, useEffect } from "react";
import { getFleet, applyHardLanding } from "@/lib/fleet";
import type { Aircraft } from "@/types";
import { Plane, Wrench } from "lucide-react";

export default function FleetPage() {
  const [fleet, setFleet] = useState<Aircraft[]>([]);

  useEffect(() => {
    setFleet(getFleet());
  }, []);

  const handleSimulateHardLanding = (id: string) => {
    setFleet(applyHardLanding(id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2">
        <Plane className="w-6 h-6" />
        Fleet
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {fleet.map((a) => (
          <div
            key={a.id}
            className={`glass-card rounded-xl p-4 border ${
              a.status === "in_maintenance" ? "border-amber-500/40" : "border-white/10"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-white">{a.name}</p>
                <p className="text-sm text-gray-500 font-mono">{a.icao} — Class {a.class}</p>
              </div>
              {a.status === "in_maintenance" && (
                <span className="flex items-center gap-1 text-amber-400 text-sm">
                  <Wrench className="w-4 h-4" />
                  In Maintenance
                </span>
              )}
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Health</span>
                <span>{a.health}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    a.health < 20 ? "bg-amber-500" : a.health < 50 ? "bg-yellow-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${a.health}%` }}
                />
              </div>
            </div>
            {a.status === "available" && (
              <button
                onClick={() => handleSimulateHardLanding(a.id)}
                className="mt-3 w-full py-1.5 rounded-lg bg-red-500/20 text-red-400 text-sm border border-red-500/40 hover:bg-red-500/30"
              >
                Simulate hard landing
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
