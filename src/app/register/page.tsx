'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

const fieldClass = 'w-full border border-[#d9d1c2] bg-[#fbf9f3] px-3 py-3 text-sm text-[#211f1b] focus:border-[#9b422a] focus:outline-none';

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8 lg:py-16">
      <div className="border-t-2 border-[#9b422a] bg-[#fbf9f3] p-6 sm:p-8">
        <p className="text-sm text-[#9b422a]">Join JobBoard</p>
        <h1 className="mt-2 text-3xl font-medium tracking-tight text-[#211f1b]">Create an account</h1>
        {submitted ? (
          <div className="mt-6 border border-[#cdb3a4] bg-[#f4e9e2] p-4 text-sm leading-6 text-[#9b422a]">Account details received. You can continue to your dashboard.</div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 grid gap-5 md:grid-cols-2">
            <div><label className="mb-2 block text-sm text-[#5b564e]">Full name</label><input type="text" required className={fieldClass} /></div>
            <div><label className="mb-2 block text-sm text-[#5b564e]">I’m joining as</label><select className={fieldClass}><option>Candidate</option><option>Employer</option></select></div>
            <div className="md:col-span-2"><label className="mb-2 block text-sm text-[#5b564e]">Email</label><input type="email" required className={fieldClass} /></div>
            <div className="md:col-span-2"><label className="mb-2 block text-sm text-[#5b564e]">Password</label><input type="password" required className={fieldClass} /></div>
            <div className="md:col-span-2"><button type="submit" className="min-h-11 w-full bg-[#9b422a] px-4 text-sm font-medium text-white hover:bg-[#7d3423]">Create account</button></div>
          </form>
        )}
        <p className="mt-6 text-sm text-[#5b564e]">Already registered? <Link href="/login" className="font-medium text-[#9b422a] hover:underline">Sign in</Link></p>
      </div>
    </div>
  );
}
