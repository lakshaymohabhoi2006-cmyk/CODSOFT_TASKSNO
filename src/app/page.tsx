import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { JOBS } from '@/lib/constants';

export default function HomePage() {
  const featuredJobs = JOBS.filter((job) => job.featured);
  const previewJobs = featuredJobs.slice(0, 2);

  return (
    <div>
      <section className="border-b border-[#d9d1c2] bg-[#f4f0e7]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.88fr_1.12fr] lg:px-10 lg:py-20">
          <div className="max-w-xl">
            <p className="mb-5 font-mono text-xs text-[#9b422a]">Job listings <span className="px-1 text-[#b3a995]">/</span> Search by the details</p>
            <h1 className="max-w-lg font-serif text-5xl font-normal leading-[1.04] tracking-[-0.035em] text-[#211f1b] sm:text-6xl lg:text-[64px]">
              Find work by the role, the place, and the pay
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#5b564e]">
              Browse current openings with salary, location, and requirements shown up front.
            </p>

            <form action="/jobs" className="mt-9 flex flex-col gap-3 sm:flex-row">
              <label className="flex min-h-12 flex-1 items-center gap-3 border border-[#b3a995] bg-[#fbf9f3] px-4">
                <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-[#777064]" />
                <input
                  type="text"
                  name="search"
                  aria-label="Search jobs, companies or locations"
                  placeholder="Title, company, or location"
                  className="w-full bg-transparent text-sm text-[#211f1b] placeholder:text-[#777064] focus:outline-none"
                />
              </label>
              <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#9b422a] px-5 text-sm font-medium text-white hover:bg-[#7d3423]">
                Find a role <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#5b564e]">
              <span>Salary ranges shown</span>
              <span className="text-[#b3a995]">/</span>
              <span>Requirements listed</span>
            </div>
          </div>

          <div className="border-t-2 border-[#211f1b] bg-[#fbf9f3] px-5 sm:px-7">
            <div className="flex items-end justify-between gap-4 border-b border-[#d9d1c2] py-5">
              <div>
                <p className="font-mono text-xs text-[#777064]">From the current listings</p>
                <h2 className="mt-1 font-serif text-2xl font-normal tracking-tight text-[#211f1b]">A short list</h2>
              </div>
              <Link href="/jobs" className="mb-1 inline-flex shrink-0 items-center gap-1 text-sm font-medium text-[#9b422a] hover:text-[#7d3423]">
                All jobs <ArrowRight size={15} />
              </Link>
            </div>
            <div>
              {previewJobs.map((job, index) => (
                <Link key={job.id} href={`/jobs/${job.id}`} className="group grid gap-2 border-b border-[#d9d1c2] py-5 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div className="flex gap-4">
                    <span className="pt-1 font-mono text-xs tabular-nums text-[#899084]">0{index + 1}</span>
                    <div>
                      <h3 className="font-medium text-[#211f1b] group-hover:text-[#9b422a]">{job.title}</h3>
                      <p className="mt-1 text-sm text-[#5b564e]">{job.company} <span className="px-1 text-[#b3a995]">·</span> {job.location}</p>
                    </div>
                  </div>
                  <div className="pl-8 text-sm text-[#5b564e] sm:pl-0 sm:text-right">
                    <p className="font-medium text-[#211f1b]">{job.salary}</p>
                    <p className="mt-1 text-xs text-[#777064]">{job.jobType}</p>
                  </div>
                </Link>
              ))}
            </div>
            <p className="border-t border-[#d9d1c2] py-3 font-mono text-xs text-[#777064]">Current listings <span className="ml-2 tabular-nums text-[#211f1b]">{String(JOBS.length).padStart(2, '0')}</span></p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[#d9d1c2] pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs text-[#9b422a]">{String(JOBS.length).padStart(2, '0')} listings</p>
            <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight text-[#211f1b]">Open roles</h2>
          </div>
          <Link href="/jobs" className="inline-flex items-center gap-2 text-sm font-medium text-[#9b422a] hover:text-[#7d3423]">Browse all roles <ArrowRight size={16} /></Link>
        </div>
        <div className="border-t-2 border-[#211f1b] bg-[#fbf9f3]">
          {JOBS.map((job, index) => (
            <Link key={job.id} href={`/jobs/${job.id}`} className="group grid gap-3 border-b border-[#d9d1c2] px-4 py-5 hover:bg-[#ebe5d8] sm:grid-cols-[48px_minmax(0,1fr)_190px_140px_24px] sm:items-center sm:px-5">
              <span className="font-mono text-xs tabular-nums text-[#9b422a]">{String(index + 1).padStart(2, '0')}</span>
              <span><span className="block font-medium text-[#211f1b] group-hover:text-[#9b422a]">{job.title}</span><span className="mt-1 block text-sm text-[#5b564e]">{job.company}</span></span>
              <span className="text-sm text-[#5b564e]">{job.location}</span>
              <span><span className="block text-sm font-medium text-[#211f1b]">{job.salary}</span><span className="mt-1 block text-xs text-[#777064]">{job.jobType}</span></span>
              <ArrowRight size={16} className="hidden text-[#9b422a] sm:block" />
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[#d9d1c2] bg-[#ebe5d8]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-3 lg:px-10">
          <div className="border-t border-[#b3a995] pt-4">
            <p className="font-mono text-xs text-[#777064]">01</p>
            <h3 className="mt-4 text-lg font-medium text-[#211f1b]">Search the openings</h3>
            <p className="mt-2 text-sm leading-6 text-[#5b564e]">Filter by title, location, and employment type.</p>
          </div>
          <div className="border-t border-[#b3a995] pt-4">
            <p className="font-mono text-xs text-[#777064]">02</p>
            <h3 className="mt-4 text-lg font-medium text-[#211f1b]">Read the details</h3>
            <p className="mt-2 text-sm leading-6 text-[#5b564e]">Review responsibilities, requirements, and salary before applying.</p>
          </div>
          <div className="border-t border-[#b3a995] pt-4">
            <p className="font-mono text-xs text-[#777064]">03</p>
            <h3 className="mt-4 text-lg font-medium text-[#211f1b]">Follow applications</h3>
            <p className="mt-2 text-sm leading-6 text-[#5b564e]">Candidates and employers can review application status from their dashboards.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-16 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10 lg:py-20">
        <div>
          <p className="text-sm text-[#9b422a]">Your next step</p>
          <h2 className="mt-2 text-3xl font-medium tracking-tight text-[#211f1b]">Ready to look around?</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/jobs" className="inline-flex min-h-11 items-center gap-2 bg-[#9b422a] px-5 text-sm font-medium text-white hover:bg-[#7d3423]">Explore jobs <ArrowRight size={16} /></Link>
          <Link href="/register" className="inline-flex min-h-11 items-center border border-[#b3a995] px-5 text-sm font-medium text-[#211f1b] hover:bg-[#ebe5d8]">Create an account</Link>
        </div>
      </section>
    </div>
  );
}
