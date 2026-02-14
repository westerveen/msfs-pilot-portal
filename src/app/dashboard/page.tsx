"use client";

import { useState, useEffect } from "react";
import { DutyClock } from "@/components/dashboard/DutyClock";
import { SimBriefCard } from "@/components/dashboard/SimBriefCard";
import { XPLevelCard } from "@/components/dashboard/XPLevelCard";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <DutyClock />
        <XPLevelCard />
      </div>
      <SimBriefCard />
    </div>
  );
}
