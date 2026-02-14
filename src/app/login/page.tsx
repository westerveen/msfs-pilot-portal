"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage: "url(/images/cockpit-bg.jpg)",
        backgroundColor: "#0a0a0a",
      }}
    >
      <div className="absolute inset-0 bg-aviation-dark/80" />
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-card rounded-2xl p-8 border border-white/10">
          <h1 className="text-2xl font-bold text-white text-center mb-6">
            {isRegister ? "Register" : "Login"}
          </h1>
          <form
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium transition"
            >
              {isRegister ? "Create account" : "Sign in"}
            </button>
          </form>
          <p className="text-center text-gray-400 text-sm mt-4">
            {isRegister ? "Already have an account?" : "No account yet?"}{" "}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-white underline hover:no-underline"
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </p>
          <Link
            href="/"
            className="block text-center text-gray-500 text-sm mt-4 hover:text-gray-300"
          >
            ← Back
          </Link>
        </div>
      </div>
    </div>
  );
}
