import Link from 'next/link';
import { ArrowLeft, Briefcase, Building2, CheckCircle2, Globe, MapPin, Wallet } from 'lucide-react';
import { JOBS } from '@/lib/constants';

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = JOBS.find((item) => item.id === id);

  if (!job) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-semibold text-slate-900 dark:text-white">Job not found.</p>
        <Link href="/jobs" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white">
          <ArrowLeft size={16} /> Back to jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/jobs" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
        <ArrowLeft size={16} /> Back to jobs
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{job.company}</p>
              <h1 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">{job.title}</h1>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              {job.jobType}
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500"><MapPin size={12} /> Location</div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{job.location}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500"><Wallet size={12} /> Salary</div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{job.salary}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500"><Building2 size={12} /> Posted</div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{job.postedOn}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Job description</h2>
            <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">{job.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Requirements</h2>
            <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
              {job.requirements.map((requirement) => (
                <li key={requirement} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Quick apply</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Apply for this role and submit your resume within minutes.</p>
            <Link href={`/jobs/${job.id}/apply`} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Apply now <ArrowLeft className="rotate-180" size={16} />
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">About the company</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-3"><Building2 size={16} className="text-blue-500" /> {job.company}</div>
              <div className="flex items-center gap-3"><Globe size={16} className="text-blue-500" /> Global hiring team</div>
              <div className="flex items-center gap-3"><Briefcase size={16} className="text-blue-500" /> {job.jobType} role</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
