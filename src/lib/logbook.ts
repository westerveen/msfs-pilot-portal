export type LandingType = "butter" | "firm" | "hard";

export interface LogbookEntry {
  id: string;
  date: string; // ISO
  origin: string;
  destination: string;
  aircraft: string;
  landingType: LandingType;
  fpm: number;
  xp: number;
  remarks?: string;
}

const STORAGE_KEY = "msfs-logbook";

export function getLogbook(): LogbookEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addLogbookEntry(entry: Omit<LogbookEntry, "id">): LogbookEntry[] {
  const list = getLogbook();
  const newEntry: LogbookEntry = {
    ...entry,
    id: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
  };
  const next = [newEntry, ...list];
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function deleteLogbookEntry(id: string): LogbookEntry[] {
  const next = getLogbook().filter((e) => e.id !== id);
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
