import type { AircraftClass } from "@/types";

export interface AirportOption {
  icao: string;
  name: string;
  runwayLengthM: number;
  class: AircraftClass[];
}

// Minimal datasets: in production these would come from a DB or API
const AIRPORTS: AirportOption[] = [
  { icao: "KJFK", name: "New York JFK", runwayLengthM: 3682, class: ["C", "D", "E"] },
  { icao: "EGLL", name: "London Heathrow", runwayLengthM: 3902, class: ["C", "D", "E"] },
  { icao: "LFPG", name: "Paris CDG", runwayLengthM: 4215, class: ["C", "D", "E"] },
  { icao: "EDDF", name: "Frankfurt", runwayLengthM: 4000, class: ["C", "D", "E"] },
  { icao: "KLAX", name: "Los Angeles", runwayLengthM: 3718, class: ["C", "D", "E"] },
  { icao: "KORD", name: "Chicago O'Hare", runwayLengthM: 3962, class: ["C", "D", "E"] },
  { icao: "KMDW", name: "Chicago Midway", runwayLengthM: 1987, class: ["B", "C"] },
  { icao: "EGLC", name: "London City", runwayLengthM: 1508, class: ["B", "C"] },
  { icao: "PAJN", name: "Juneau", runwayLengthM: 2621, class: ["B", "C", "D"] },
  { icao: "PABR", name: "Barrow", runwayLengthM: 2042, class: ["A", "B", "C"] },
  { icao: "SKBO", name: "Bogotá", runwayLengthM: 3800, class: ["C", "D", "E"] },
  { icao: "NZWN", name: "Wellington", runwayLengthM: 1936, class: ["B", "C"] },
  { icao: "LOWI", name: "Innsbruck", runwayLengthM: 2000, class: ["B", "C"] },
  { icao: "NSTU", name: "Pago Pago", runwayLengthM: 3048, class: ["B", "C", "D"] },
  { icao: "FACT", name: "Cape Town", runwayLengthM: 3200, class: ["C", "D", "E"] },
  { icao: "FASK", name: "Skukuza", runwayLengthM: 1500, class: ["A", "B"] },
  { icao: "PAKN", name: "King Salmon", runwayLengthM: 2438, class: ["A", "B", "C"] },
  { icao: "PAVD", name: "Valdez", runwayLengthM: 1829, class: ["A", "B"] },
  { icao: "EGNX", name: "Nottingham", runwayLengthM: 2896, class: ["B", "C", "D"] },
  { icao: "KASE", name: "Aspen", runwayLengthM: 2012, class: ["B", "C"] },
];

const MIN_RUNWAY_BY_CLASS: Record<AircraftClass, number> = {
  A: 0,
  B: 900,
  C: 1500,
  D: 2500,
  E: 2000,
};

export function getMinRunwayForClass(c: AircraftClass): number {
  return MIN_RUNWAY_BY_CLASS[c] ?? 0;
}

export function generateRoute(aircraftClass: AircraftClass): { origin: AirportOption; destination: AirportOption } | null {
  const minRunway = getMinRunwayForClass(aircraftClass);
  const eligible = AIRPORTS.filter(
    (a) => a.runwayLengthM >= minRunway && a.class.includes(aircraftClass)
  );
  if (eligible.length < 2) return null;
  const [o, d] = shuffle([...eligible]).slice(0, 2);
  return { origin: o!, destination: d! };
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
