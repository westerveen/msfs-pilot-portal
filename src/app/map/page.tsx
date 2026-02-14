"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Map as MapIcon, AlertTriangle } from "lucide-react";

const LiveMap = dynamic(() => import("@/components/map/LiveMap").then((m) => m.LiveMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-white/5 rounded-xl flex items-center justify-center text-gray-400">
      Loading map…
    </div>
  ),
});

export default function MapPage() {
  const [panic, setPanic] = useState(false);

  const triggerPanic = useCallback(() => {
    setPanic(true);
    try {
      const audio = new Audio("/sounds/mayday.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch {}
    const t = setTimeout(() => setPanic(false), 10000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="p-6 h-[calc(100vh-0px)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <MapIcon className="w-6 h-6" />
          Live Map
        </h1>
        <button
          onClick={triggerPanic}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 font-medium"
          aria-label="Squawk 7700 Panic"
        >
          <AlertTriangle className="w-4 h-4" />
          Squawk 7700 / Panic
        </button>
      </div>
      <div className={`flex-1 rounded-xl overflow-hidden border border-white/10 transition ${panic ? "ring-4 ring-red-500/60 animate-pulse" : ""}`}>
        <LiveMap panic={panic} />
      </div>
    </div>
  );
}
