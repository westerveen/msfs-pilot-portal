import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">MSFS Pilot Portal</h1>
      <p className="text-gray-400 mb-6">
        Welcome. Use the sidebar to navigate to Dashboard, Dispatch, Live Map, Fleet, or Admin.
      </p>
      <Link
        href="/login"
        className="inline-block px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition"
      >
        Login / Register
      </Link>
      <span className="mx-2 text-gray-500">|</span>
      <Link
        href="/dashboard"
        className="inline-block px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition"
      >
        Dashboard
      </Link>
    </div>
  );
}
