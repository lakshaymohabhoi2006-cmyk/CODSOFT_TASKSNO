'use client';

import { FormEvent, use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { JOBS } from '@/lib/constants';

export default function JobApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const job = JOBS.find((item) => item.id === id);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (!job) {
    return <div className="mx-auto max-w-3xl px-4 py-20 text-center text-slate-900 dark:text-white">Job not found.</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href={`/jobs/${job.id}`} className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
        <ArrowLeft size={16} /> Back to job
      </Link>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Application</p>
          <h1 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">Apply for {job.title}</h1>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6" />
              <p className="text-lg font-semibold">Application submitted successfully.</p>
            </div>
            <p className="mt-2 text-sm">The recruitment team will review your profile and contact you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Full name</label>
              <input type="text" required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Email address</label>
              <input type="email" required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Phone number</label>
              <input type="tel" required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Portfolio / LinkedIn</label>
              <input type="url" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Cover note</label>
              <textarea rows={5} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Resume upload</label>
              <input type="file" accept=".pdf" className="w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300" />
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button type="submit" className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                Submit application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
