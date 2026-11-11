'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Welcome back</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">Login</h1>

        {submitted ? (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-300">
            Login successful. Redirecting to your dashboard...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
              <input type="email" required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
              <input type="password" required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </div>
            <button type="submit" className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Sign in
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          New here?{' '}
          <Link href="/register" className="font-semibold text-blue-600 dark:text-blue-400">Create account</Link>
        </p>
      </div>
    </div>
  );
}
