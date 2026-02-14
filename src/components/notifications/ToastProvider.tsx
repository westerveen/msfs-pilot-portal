"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Toast } from "./Toast";

export type ToastType = "xp" | "promotion" | "system" | "default";
export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

const ToastContext = createContext<{
  addToast: (message: string, type?: ToastType) => void;
} | null>(null);

const DING_SRC = "/sounds/ding.mp3";

function playDing() {
  if (typeof window === "undefined") return;
  try {
    const audio = new Audio(DING_SRC);
    audio.volume = 0.3;
    audio.play().catch(() => {});
  } catch {}
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "default") => {
    playDing();
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type, duration: 4000 }]);
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            onClose={() => remove(t.id)}
            duration={t.duration}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
