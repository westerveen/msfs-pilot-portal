export type AircraftClass = "A" | "B" | "C" | "D" | "E";

export interface Aircraft {
  id: string;
  name: string;
  icao: string;
  class: AircraftClass;
  health: number; // 0-100
  status: "available" | "in_maintenance";
  minRunwayLengthM: number;
}

export interface DutyStatus {
  userId: string;
  clockedIn: boolean;
  startedAt: string | null;
  elapsedSeconds: number;
}

export interface SimBriefData {
  route: string;
  fuelLbs: number;
  etd: string; // ISO date
  origin: string;
  destination: string;
}

export type LandingType = "butter" | "firm" | "hard";
export interface XPResult {
  xp: number;
  type: LandingType;
  hardLandingAlert?: boolean;
}
