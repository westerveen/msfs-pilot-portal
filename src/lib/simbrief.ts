import type { SimBriefData } from "@/types";

const SIMBRIEF_API = "https://www.simbrief.com/api/xml.fetcher.php";

export async function fetchSimBrief(username: string): Promise<SimBriefData | null> {
  try {
    const res = await fetch(`${SIMBRIEF_API}?username=${encodeURIComponent(username)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const text = await res.text();
    return parseSimBriefXml(text);
  } catch {
    return null;
  }
}

function parseSimBriefXml(xml: string): SimBriefData | null {
  try {
    const route = extractTag(xml, "general", "route") ?? "";
    const fuelLbs = parseInt(extractTag(xml, "fuel", "plan_ramp") ?? "0", 10);
    const etd = extractTag(xml, "times", "sched_dep") ?? new Date().toISOString();
    const origin = extractTag(xml, "origin", "icao_code") ?? "";
    const destination = extractTag(xml, "destination", "icao_code") ?? "";
    return { route, fuelLbs, etd, origin, destination };
  } catch {
    return null;
  }
}

function extractTag(xml: string, parent: string, tag: string): string | null {
  const open = `<${parent}>`;
  const close = `</${parent}>`;
  const start = xml.indexOf(open);
  const end = xml.indexOf(close);
  if (start === -1 || end === -1) return null;
  const block = xml.slice(start + open.length, end);
  const tagOpen = `<${tag}>`;
  const tagClose = `</${tag}>`;
  const tStart = block.indexOf(tagOpen);
  const tEnd = block.indexOf(tagClose);
  if (tStart === -1 || tEnd === -1) return null;
  return block.slice(tStart + tagOpen.length, tEnd).trim();
}

export function getDelayStatus(etdIso: string): "on_time" | "delayed" {
  const etd = new Date(etdIso).getTime();
  const now = Date.now();
  return now > etd ? "delayed" : "on_time";
}
