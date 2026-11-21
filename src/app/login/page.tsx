'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

const fieldClass = 'w-full border border-[#d9d1c2] bg-[#fbf9f3] px-3 py-3 text-sm text-[#211f1b] focus:border-[#9b422a] focus:outline-none';

export default function LoginPage() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };

  return (
    <div className="mx-auto max-w-lg px-5 py-12 sm:px-8 lg:py-16">
      <div className="border-t-2 border-[#9b422a] bg-[#fbf9f3] p-6 sm:p-8">
        <p className="text-sm text-[#9b422a]">Your account</p>
        <h1 className="mt-2 text-3xl font-medium tracking-tight text-[#211f1b]">Sign in</h1>
        {submitted ? (
          <div className="mt-6 border border-[#cdb3a4] bg-[#f4e9e2] p-4 text-sm leading-6 text-[#9b422a]">Sign in details received. Your dashboard is ready to review.</div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div><label className="mb-2 block text-sm text-[#5b564e]">Email</label><input type="email" required className={fieldClass} /></div>
            <div><label className="mb-2 block text-sm text-[#5b564e]">Password</label><input type="password" required className={fieldClass} /></div>
            <button type="submit" className="min-h-11 w-full bg-[#9b422a] px-4 text-sm font-medium text-white hover:bg-[#7d3423]">Sign in</button>
          </form>
        )}
        <p className="mt-6 text-sm text-[#5b564e]">New to JobBoard? <Link href="/register" className="font-medium text-[#9b422a] hover:underline">Create an account</Link></p>
      </div>
    </div>
  );
}
