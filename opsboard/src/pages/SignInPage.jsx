// src/pages/SignInPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SignIn from '../components/ui/SignIn';

export default function SignInPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
        <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
        <p className="text-slate-600 mb-6">
          Sign in with an OAuth provider or email to access the dashboard.
        </p>

        <SignIn />

        <div className="mt-6 text-sm text-slate-500">
          <Link to="/" className="text-indigo-600 hover:underline">Back to home</Link>
        </div>
      </div>
    </main>
  );
}
