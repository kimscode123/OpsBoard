// src/App.jsx
import React from "react";
import "./App.css";

import { supabase } from "./utils/supabaseClient";
import userAuth from "./hooks/userAuth";

import Navigation from "./components/ui/Navigation";
import SignIn from "./components/ui/SignIn";

export default function App() {
  const { session, user, loading } = userAuth();

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("signOut error", err);
    }
  }

  return (
    <Navigation user={user} onSignOut={handleSignOut}>
      {/* Loading State */}
      {loading && (
        <div className="text-center py-20 text-slate-500 text-lg">
          Loading…
        </div>
      )}

      {/* Not signed in */}
      {!loading && !session && (
        <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-2">Sign in</h2>
          <p className="text-slate-600 mb-4">
            Access your OpsBoard dashboard using an OAuth provider or email.
          </p>
          <SignIn />
        </div>
      )}

      {/* Signed in — Dashboard */}
      {!loading && session && (
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-2">Overview</h2>
            <p className="text-slate-600 mb-6">
              Welcome back, <span className="font-medium">{user?.email}</span>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-sm text-slate-500">Active</p>
                <p className="text-2xl font-bold">128</p>
              </div>

              <div className="bg-amber-50 rounded-lg p-4">
                <p className="text-sm text-slate-500">Errors</p>
                <p className="text-2xl font-bold">3</p>
              </div>

              <div className="bg-emerald-50 rounded-lg p-4">
                <p className="text-sm text-slate-500">Uptime</p>
                <p className="text-2xl font-bold">99.99%</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://vite.dev/"
                target="_blank"
                rel="noreferrer"
                className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:bg-slate-50 transition"
              >
                <h4 className="font-medium mb-1">Documentation</h4>
                <p className="text-sm text-slate-600">
                  Guides, API references, and examples.
                </p>
              </a>

              <a
                href="https://github.com/vitejs/vite"
                target="_blank"
                rel="noreferrer"
                className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:bg-slate-50 transition"
              >
                <h4 className="font-medium mb-1">Community</h4>
                <p className="text-sm text-slate-600">
                  Join the conversation on GitHub & Discord.
                </p>
              </a>
            </div>
          </section>
        </div>
      )}
    </Navigation>
  );
}
