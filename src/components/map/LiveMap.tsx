"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function PanicOverlay({ active }: { active: boolean }) {
  const map = useMap();
  if (!active) return null;
  return (
    <div
      className="absolute inset-0 z-[1000] pointer-events-none flex items-center justify-center"
      style={{ background: "rgba(220,38,38,0.15)" }}
    >
      <span className="text-red-500 font-bold text-2xl animate-pulse">MAYDAY 7700</span>
    </div>
  );
}

export function LiveMap({ panic }: { panic: boolean }) {
  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[52, 4]}
        zoom={4}
        className="leaflet-container w-full h-full rounded-xl"
        style={{ minHeight: 400 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <PanicOverlay active={panic} />
      </MapContainer>
    </div>
  );
}
