// src/components/ui/Navigation.jsx
import React, { useState } from "react";
import {
  Menu,
  X,
  Bell,
  Search,
  LayoutDashboard,
  ClipboardList,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

export default function Navigation({ user, onSignOut, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "#dashboard" },
    { label: "Tasks", icon: ClipboardList, href: "#tasks" },
    { label: "Incidents", icon: AlertTriangle, href: "#incidents" },
    { label: "Analytics", icon: BarChart3, href: "#analytics" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white/90 backdrop-blur-xl
          border-r border-slate-200 shadow-sm
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}
          md:translate-x-0 md:static
        `}
      >
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold tracking-tight">OpsBoard</h2>
        </div>

        <nav className="p-4 space-y-1 text-sm">
          {navItems.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 transition"
            >
              <Icon size={18} className="text-slate-500" />
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl border-b border-slate-200">
          <div className="px-4 py-3 flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded hover:bg-slate-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Search (desktop) */}
            <div className="relative flex-1 max-w-md mx-4 hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search…"
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <button className="p-2 rounded hover:bg-slate-100">
                <Bell size={20} className="text-slate-600" />
              </button>

              {/* Avatar */}
              <div className="relative group">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer shadow-sm">
                  {user?.email?.[0]?.toUpperCase() ?? "?"}
                </div>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
                  <div className="px-4 py-2 text-xs text-slate-500 border-b border-slate-100">
                    {user?.email}
                  </div>
                  <button
                    onClick={onSignOut}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile search */}
          <div className="px-4 pb-3 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search…"
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
