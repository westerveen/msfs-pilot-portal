import type { XPResult } from "@/types";

/**
 * Calculate XP based on landing rate (fpm = feet per minute, negative = descent).
 * 0 to -150 fpm: 500 XP ('Butter')
 * -151 to -450 fpm: 200 XP ('Firm')
 * > -451 fpm: 50 XP + 'Hard Landing' alert
 */
/** fpm: feet per minute (negative = descent). 0 to -150 = Butter, -151 to -450 = Firm, < -450 = Hard */
export function calculateXP(fpm: number): XPResult {
  if (fpm >= -150) {
    return { xp: 500, type: "butter" };
  }
  if (fpm >= -450) {
    return { xp: 200, type: "firm" };
  }
  return { xp: 50, type: "hard", hardLandingAlert: true };
}

export const XP_PER_LEVEL = 1000;
export const AIRCRAFT_CLASS_LEVELS: Record<string, number> = {
  A: 0,
  B: 2,
  C: 5,
  D: 10,
  E: 20,
};

export function getUnlockedClasses(level: number): string[] {
  return (["A", "B", "C", "D", "E"] as const).filter(
    (c) => level >= (AIRCRAFT_CLASS_LEVELS[c] ?? 0)
  );
}

export function levelFromXP(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL);
}
