// src/App.jsx
import React from "react";
import "./App.css";

import { supabase } from "./utils/supabaseClient";
import userAuth from "./hooks/userAuth";

import Navigation from "./components/ui/Navigation";
import SignIn from "./components/ui/SignIn";
import Tasks from "./pages/Tasks";

export default function App() {
  const { session, user, loading } = userAuth();

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-20 text-slate-500 text-lg">
        Loading…
      </div>
    );
  }

  // Not signed in
  if (!session) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-sm border border-slate-200 mt-20">
        <h2 className="text-xl font-semibold mb-2">Sign in</h2>
        <p className="text-slate-600 mb-4">
          SignIn or Else You Don't Get Nun!
        </p>
        <SignIn />
      </div>
    );
  }

  // Signed in — show full app
  return (
    <Navigation user={user} onSignOut={handleSignOut}>
      <Tasks />
    </Navigation>
  );
}
