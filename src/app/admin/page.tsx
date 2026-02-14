import { Settings } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2">
        <Settings className="w-6 h-6 text-primary" />
        Admin Panel
      </h1>
      <p className="text-slate-400 mt-4">Admin settings and system configuration.</p>
    </div>
  );
}
