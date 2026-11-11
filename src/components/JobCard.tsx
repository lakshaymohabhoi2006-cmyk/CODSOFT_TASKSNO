'use client';

import Link from 'next/link';
import { ArrowRight, Briefcase, MapPin, Wallet } from 'lucide-react';
import { Job } from '@/types';

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{job.company}</p>
          <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{job.title}</h3>
        </div>
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
          {job.jobType}
        </span>
      </div>

      <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2"><MapPin size={14} className="text-slate-400" /> {job.location}</div>
        <div className="flex items-center gap-2"><Wallet size={14} className="text-slate-400" /> {job.salary}</div>
        <div className="flex items-center gap-2"><Briefcase size={14} className="text-slate-400" /> Posted {job.postedOn}</div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{job.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {job.requirements.slice(0, 3).map((item) => (
          <span key={item} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Open role</span>
        <Link href={`/jobs/${job.id}`} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
          View details <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
