import type { Aircraft } from "@/types";

const STORAGE_KEY = "msfs-fleet";

const DEFAULT_FLEET: Aircraft[] = [
  { id: "1", name: "Cessna 172", icao: "C172", class: "A", health: 100, status: "available", minRunwayLengthM: 0 },
  { id: "2", name: "King Air 350", icao: "B350", class: "B", health: 100, status: "available", minRunwayLengthM: 900 },
  { id: "3", name: "A320 Neo", icao: "A20N", class: "C", health: 100, status: "available", minRunwayLengthM: 1500 },
  { id: "4", name: "Boeing 747", icao: "B748", class: "D", health: 100, status: "available", minRunwayLengthM: 2500 },
  { id: "5", name: "F-18", icao: "F18", class: "E", health: 100, status: "available", minRunwayLengthM: 2000 },
];

export function getFleet(): Aircraft[] {
  if (typeof window === "undefined") return DEFAULT_FLEET;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_FLEET;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_FLEET;
  } catch {
    return DEFAULT_FLEET;
  }
}

export function saveFleet(fleet: Aircraft[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fleet));
}

export function applyHardLanding(aircraftId: string, damage = 15): Aircraft[] {
  const fleet = getFleet().map((a) => {
    if (a.id !== aircraftId) return a;
    const health = Math.max(0, a.health - damage);
    const status = health < 20 ? "in_maintenance" : "available";
    return { ...a, health, status };
  });
  saveFleet(fleet);
  return fleet;
}

export function getAvailableForClass(aircraftClass: string): Aircraft[] {
  return getFleet().filter(
    (a) => a.class === aircraftClass && a.status === "available" && a.health >= 20
  );
}
