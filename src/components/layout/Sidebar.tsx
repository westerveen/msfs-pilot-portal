"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Map,
  BookOpen,
  Plane,
  Settings,
} from "lucide-react";

const nav = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/flight-prep", icon: ClipboardList, label: "Flight Preparation" },
  { href: "/map", icon: Map, label: "Live Map" },
  { href: "/logbook", icon: BookOpen, label: "Logbook" },
  { href: "/fleet", icon: Plane, label: "Fleet Status" },
  { href: "/admin", icon: Settings, label: "Admin" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside
      className="w-16 min-h-screen bg-white border-r border-slate-200 flex flex-col items-center py-4 shrink-0"
      style={{ width: "var(--sidebar-width, 4rem)" }}
    >
      {nav.map(({ href, icon: Icon, label }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className={`p-3 rounded-lg transition mb-1 ${
              active
                ? "bg-primary/10 text-primary"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
            title={label}
            aria-label={label}
          >
            <Icon className="w-6 h-6" />
          </Link>
        );
      })}
    </aside>
  );
}
