'use client';

import { FormEvent, use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { JOBS } from '@/lib/constants';

const fieldClass = 'w-full border border-[#d9d1c2] bg-[#fbf9f3] px-3 py-3 text-sm text-[#211f1b] placeholder:text-[#777064] focus:border-[#9b422a] focus:outline-none';

export default function JobApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const job = JOBS.find((item) => item.id === id);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };

  if (!job) return <div className="mx-auto max-w-3xl px-5 py-20 text-center text-[#211f1b]">Role not found</div>;

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:py-14">
      <Link href={`/jobs/${job.id}`} className="mb-7 inline-flex items-center gap-2 text-sm text-[#5b564e] hover:text-[#9b422a]"><ArrowLeft size={16} /> Back to role</Link>
      <div className="border-t-2 border-[#9b422a] bg-[#fbf9f3] px-5 py-7 sm:px-8 sm:py-8">
        <div className="mb-7 border-b border-[#d9d1c2] pb-5">
          <p className="text-sm text-[#9b422a]">Application · {job.company}</p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-[#211f1b]">Apply for {job.title}</h1>
        </div>

        {submitted ? (
          <div className="border border-[#cdb3a4] bg-[#f4e9e2] p-5 text-[#9b422a]">
            <div className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5" /><p className="font-medium">Application received</p></div>
            <p className="mt-2 text-sm leading-6">The recruitment team can now review your details for this role.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-x-5 gap-y-5 md:grid-cols-2">
            <div><label className="mb-2 block text-sm text-[#5b564e]">Full name</label><input type="text" required className={fieldClass} /></div>
            <div><label className="mb-2 block text-sm text-[#5b564e]">Email address</label><input type="email" required className={fieldClass} /></div>
            <div><label className="mb-2 block text-sm text-[#5b564e]">Phone number</label><input type="tel" required className={fieldClass} /></div>
            <div><label className="mb-2 block text-sm text-[#5b564e]">Portfolio or LinkedIn</label><input type="url" className={fieldClass} /></div>
            <div className="md:col-span-2"><label className="mb-2 block text-sm text-[#5b564e]">Cover note</label><textarea rows={5} required className={fieldClass} /></div>
            <div className="md:col-span-2"><label className="mb-2 block text-sm text-[#5b564e]">Resume (PDF)</label><input type="file" accept=".pdf" className={`${fieldClass} file:mr-3 file:border-0 file:bg-[#ebe5d8] file:px-3 file:py-2 file:text-sm file:text-[#211f1b]`} /></div>
            <div className="flex justify-end md:col-span-2"><button type="submit" className="min-h-11 bg-[#9b422a] px-5 text-sm font-medium text-white hover:bg-[#7d3423]">Submit application</button></div>
          </form>
        )}
      </div>
    </div>
  );
}
