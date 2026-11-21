import Link from 'next/link';
import { ArrowLeft, ArrowRight, Briefcase, Building2, Check, Globe, MapPin, Wallet } from 'lucide-react';
import { JOBS } from '@/lib/constants';

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = JOBS.find((item) => item.id === id);

  if (!job) return (
    <div className="mx-auto max-w-3xl px-5 py-20 text-center">
      <p className="text-lg font-medium text-[#211f1b]">Role not found</p>
      <Link href="/jobs" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9b422a]"><ArrowLeft size={16} /> Back to jobs</Link>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <Link href="/jobs" className="mb-8 inline-flex items-center gap-2 text-sm text-[#5b564e] hover:text-[#9b422a]"><ArrowLeft size={16} /> All jobs</Link>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <main>
          <header className="border-y-2 border-[#9b422a] bg-[#fbf9f3] px-6 py-7 sm:px-8">
            <p className="text-sm text-[#9b422a]">{job.company}</p>
            <h1 className="mt-2 text-4xl font-medium tracking-tight text-[#211f1b]">{job.title}</h1>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#5b564e]">
              <span className="inline-flex items-center gap-2"><MapPin size={15} className="text-[#777064]" />{job.location}</span>
              <span className="inline-flex items-center gap-2"><Wallet size={15} className="text-[#777064]" />{job.salary}</span>
              <span className="inline-flex items-center gap-2"><Briefcase size={15} className="text-[#777064]" />{job.jobType}</span>
            </div>
            <p className="mt-4 text-xs text-[#777064]">Posted {job.postedOn}</p>
          </header>

          <section className="border-b border-[#d9d1c2] py-8">
            <h2 className="text-xl font-medium text-[#211f1b]">About the role</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#5b564e]">{job.description}</p>
          </section>
          <section className="py-8">
            <h2 className="text-xl font-medium text-[#211f1b]">What you’ll bring</h2>
            <ul className="mt-4 divide-y divide-[#d9d1c2] border-y border-[#d9d1c2]">
              {job.requirements.map((requirement) => (
                <li key={requirement} className="flex items-center gap-3 py-3 text-sm text-[#5b564e]"><Check size={16} className="text-[#9b422a]" />{requirement}</li>
              ))}
            </ul>
          </section>
        </main>

        <aside className="space-y-6">
          <section className="border border-[#d9d1c2] bg-[#fbf9f3] p-5">
            <h2 className="text-lg font-medium text-[#211f1b]">Interested?</h2>
            <p className="mt-2 text-sm leading-6 text-[#5b564e]">Send your details and resume for this role.</p>
            <Link href={`/jobs/${job.id}/apply`} className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#9b422a] px-4 text-sm font-medium text-white hover:bg-[#7d3423]">Apply for this role <ArrowRight size={16} /></Link>
          </section>
          <section className="border-t border-[#b3a995] pt-4">
            <h2 className="text-lg font-medium text-[#211f1b]">Company</h2>
            <div className="mt-4 space-y-3 text-sm text-[#5b564e]">
              <div className="flex items-center gap-3"><Building2 size={16} className="text-[#777064]" />{job.company}</div>
              <div className="flex items-center gap-3"><Globe size={16} className="text-[#777064]" />Global hiring team</div>
              <div className="flex items-center gap-3"><Briefcase size={16} className="text-[#777064]" />{job.jobType} role</div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
