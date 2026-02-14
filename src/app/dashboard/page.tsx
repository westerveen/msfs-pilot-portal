"use client";

import { DutyClock } from "@/components/dashboard/DutyClock";
import { SimBriefCard } from "@/components/dashboard/SimBriefCard";
import { XPLevelCard } from "@/components/dashboard/XPLevelCard";
import { StatusWidget } from "@/components/dashboard/StatusWidget";
import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2">
        <LayoutDashboard className="w-6 h-6 text-primary" />
        Dashboard
      </h1>

      <StatusWidget />

      <div className="grid gap-6 md:grid-cols-2">
        <DutyClock />
        <XPLevelCard />
      </div>

      <SimBriefCard />
    </div>
  );
}
