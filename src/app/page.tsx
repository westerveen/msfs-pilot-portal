import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">MSFS Pilot Portal</h1>
      <p className="text-slate-400 mb-6">
        Welcome. Use the sidebar for Dashboard, Flight Preparation, Live Map, Logbook, Fleet Status, and Admin.
      </p>
      <Link
        href="/login"
        className="inline-block px-4 py-2 rounded-lg bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30 transition"
      >
        Login / Register
      </Link>
      <span className="mx-2 text-slate-500">|</span>
      <Link
        href="/dashboard"
        className="inline-block px-4 py-2 rounded-lg bg-primary text-slate-900 font-medium hover:bg-primary-hover transition"
      >
        Dashboard
      </Link>
    </div>
  );
}
