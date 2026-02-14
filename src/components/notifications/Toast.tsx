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
  xp: "border-warning/50 bg-warning/10",
  promotion: "border-primary/50 bg-primary/10",
  system: "border-primary/50 bg-primary/10",
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
