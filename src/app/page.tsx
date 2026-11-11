import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, Search, ShieldCheck, Star } from 'lucide-react';
import { JOBS } from '@/lib/constants';
import JobCard from '@/components/JobCard';

export default function HomePage() {
  const featuredJobs = JOBS.filter((job) => job.featured);

  return (
    <div>
      <section className="bg-gradient-to-b from-white via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <span className="mb-4 w-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">
              Career platform
            </span>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Find work that matches your ambition.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-300">
              Discover roles, connect with top employers, and manage your job search in one streamlined place.
            </p>

            <form action="/jobs" className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/50 sm:flex-row dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                <Search className="h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  name="search"
                  placeholder="Search jobs, companies or locations"
                  className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none dark:text-slate-100"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Search Jobs
              </button>
            </form>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500" /> 20k+ active candidates</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-500" /> Verified employers</div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Popular roles</p>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">This week</h2>
              </div>
              <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                120+ jobs
              </div>
            </div>

            <div className="space-y-4">
              {featuredJobs.map((job) => (
                <div key={job.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{job.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{job.company}</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      {job.jobType}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>{job.location}</span>
                    <span>{job.salary}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Featured openings</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">Top jobs for your next move</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
            <BriefcaseBusiness className="mb-4 h-9 w-9 text-blue-400" />
            <h3 className="text-xl font-semibold">Smart hiring</h3>
            <p className="mt-3 text-slate-300">Streamlined hiring workflows with faster screening and better candidate matching.</p>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
            <ShieldCheck className="mb-4 h-9 w-9 text-emerald-400" />
            <h3 className="text-xl font-semibold">Trusted platform</h3>
            <p className="mt-3 text-slate-300">Verified employers and secure applicant data for every stage of the hiring journey.</p>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
            <ArrowRight className="mb-4 h-9 w-9 text-cyan-400" />
            <h3 className="text-xl font-semibold">Actionable results</h3>
            <p className="mt-3 text-slate-300">Track applications, shortlist talent, and keep the hiring process transparent.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Ready to take the next step?</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">Whether you are hiring or job hunting, the JobBoard platform keeps everything simple, fast and effective.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/jobs" className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
            Explore jobs
          </Link>
          <Link href="/register" className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
            Create account
          </Link>
        </div>
      </section>
    </div>
  );
}
