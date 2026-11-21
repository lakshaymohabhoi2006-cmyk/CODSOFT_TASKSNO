'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import JobCard from '@/components/JobCard';
import { JOBS } from '@/lib/constants';

export default function JobsPage() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('All locations');
  const [jobType, setJobType] = useState('All types');

  const filteredJobs = useMemo(() => JOBS.filter((job) => {
    const matchesQuery = [job.title, job.company, job.location].some((value) => value.toLowerCase().includes(query.toLowerCase()));
    return matchesQuery && (location === 'All locations' || job.location === location) && (jobType === 'All types' || job.jobType === jobType);
  }), [query, location, jobType]);

  const locations = ['All locations', ...new Set(JOBS.map((job) => job.location))];
  const jobTypes = ['All types', ...new Set(JOBS.map((job) => job.jobType))];

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      <header className="mb-8 border-b border-[#d9d1c2] pb-6">
        <p className="text-sm text-[#9b422a]">Job listings</p>
        <h1 className="mt-2 text-4xl font-medium tracking-tight text-[#211f1b]">Find a role that fits</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[#5b564e]">Search by title, company, or location, then narrow the list to the work you want.</p>
      </header>

      <div className="mb-8 grid gap-3 border-y border-[#d9d1c2] py-4 md:grid-cols-[minmax(240px,1fr)_220px_190px]">
        <label className="flex min-h-11 items-center gap-3 border border-[#d9d1c2] bg-[#fbf9f3] px-3">
          <Search className="h-4 w-4 shrink-0 text-[#777064]" />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, company, or location" aria-label="Search jobs" className="w-full bg-transparent text-sm text-[#211f1b] placeholder:text-[#777064] focus:outline-none" />
        </label>
        <label className="flex min-h-11 items-center gap-2 border border-[#d9d1c2] bg-[#fbf9f3] px-3">
          <SlidersHorizontal className="h-4 w-4 shrink-0 text-[#777064]" />
          <select value={location} onChange={(event) => setLocation(event.target.value)} aria-label="Filter by location" className="w-full bg-transparent text-sm text-[#211f1b] focus:outline-none">
            {locations.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="flex min-h-11 items-center border border-[#d9d1c2] bg-[#fbf9f3] px-3">
          <select value={jobType} onChange={(event) => setJobType(event.target.value)} aria-label="Filter by employment type" className="w-full bg-transparent text-sm text-[#211f1b] focus:outline-none">
            {jobTypes.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
      </div>

      <div className="mb-5 flex items-center justify-between text-sm">
        <p className="text-[#5b564e]">{filteredJobs.length} {filteredJobs.length === 1 ? 'role' : 'roles'}</p>
        <p className="font-mono text-xs text-[#777064]">{String(filteredJobs.length).padStart(2, '0')} / {String(JOBS.length).padStart(2, '0')}</p>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="border-y border-[#d9d1c2] bg-[#fbf9f3] px-6 py-12 text-center">
          <p className="text-lg font-medium text-[#211f1b]">No roles found</p>
          <p className="mt-2 text-sm text-[#5b564e]">Try a different title, location, or employment type.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredJobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      )}
    </div>
  );
}
