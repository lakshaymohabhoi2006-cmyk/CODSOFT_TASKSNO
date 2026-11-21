'use client';

import Link from 'next/link';
import { ArrowUpRight, MapPin, Wallet } from 'lucide-react';
import { Job } from '@/types';

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="flex h-full flex-col border-t-2 border-[#9b422a] bg-[#fbf9f3] px-5 py-5">
      <p className="text-sm text-[#9b422a]">{job.company}</p>
      <h3 className="mt-2 text-xl font-medium tracking-tight text-[#211f1b]">{job.title}</h3>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#5b564e]">
        <span className="inline-flex items-center gap-2"><MapPin size={15} className="text-[#777064]" />{job.location}</span>
        <span className="inline-flex items-center gap-2"><Wallet size={15} className="text-[#777064]" />{job.salary}</span>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#5b564e]">{job.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.requirements.slice(0, 3).map((item) => (
          <span key={item} className="border border-[#d9d1c2] px-2 py-1 text-xs text-[#5b564e]">{item}</span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#d9d1c2] pt-4 mt-6">
        <span className="text-xs text-[#777064]">{job.jobType} <span className="px-1">·</span> Posted {job.postedOn}</span>
        <Link href={`/jobs/${job.id}`} className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-[#9b422a] hover:text-[#7d3423]">
          Details <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}
