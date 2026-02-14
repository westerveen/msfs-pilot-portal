"use client";

import { useEffect } from "react";
import type { ToastType } from "./ToastProvider";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

const typeStyles: Record<ToastType, string> = {
  xp: "border-amber-500/50 bg-amber-500/10",
  promotion: "border-emerald-500/50 bg-emerald-500/10",
  system: "border-blue-500/50 bg-blue-500/10",
  default: "border-white/20 bg-white/5",
};

export function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);

  return (
    <div
      className={`glass-card px-4 py-3 rounded-lg border ${typeStyles[type]} animate-in slide-in-from-right-5`}
      role="alert"
    >
      <p className="text-sm text-white">{message}</p>
    </div>
  );
}
