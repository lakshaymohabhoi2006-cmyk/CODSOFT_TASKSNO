'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import JobCard from '@/components/JobCard';
import { JOBS } from '@/lib/constants';

export default function JobsPage() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('All');
  const [jobType, setJobType] = useState('All');

  const filteredJobs = useMemo(() => {
    return JOBS.filter((job) => {
      const matchesQuery = [job.title, job.company, job.location].some((value) =>
        value.toLowerCase().includes(query.toLowerCase())
      );
      const matchesLocation = location === 'All' || job.location === location;
      const matchesType = jobType === 'All' || job.jobType === jobType;
      return matchesQuery && matchesLocation && matchesType;
    });
  }, [query, location, jobType]);

  const locations = ['All', ...new Set(JOBS.map((job) => job.location))];
  const jobTypes = ['All', ...new Set(JOBS.map((job) => job.jobType))];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Explore careers</p>
            <h1 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">Find your next opportunity</h1>
          </div>

          <div className="flex flex-1 max-w-xl items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search jobs, companies, or locations"
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
            <SlidersHorizontal className="h-4 w-4 text-slate-500" />
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="bg-transparent text-sm text-slate-700 outline-none dark:text-slate-200"
            >
              {locations.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
            <select
              value={jobType}
              onChange={(event) => setJobType(event.target.value)}
              className="bg-transparent text-sm text-slate-700 outline-none dark:text-slate-200"
            >
              {jobTypes.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Showing <span className="font-semibold text-slate-900 dark:text-white">{filteredJobs.length}</span> jobs
        </p>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-lg font-semibold text-slate-900 dark:text-white">No jobs matched your search.</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Try adjusting filters or searching for another keyword.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
