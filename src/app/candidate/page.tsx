'use client';

import { APPLICATIONS, DASHBOARD_STATS, JOBS } from '@/lib/constants';

export default function CandidateDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      <header className="mb-8 border-b border-[#d9d1c2] pb-6">
        <p className="text-sm text-[#9b422a]">Candidate dashboard</p>
        <h1 className="mt-2 text-4xl font-medium tracking-tight text-[#211f1b]">My applications</h1>
      </header>

      <div className="mb-10 grid gap-0 border-y border-[#d9d1c2] sm:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_STATS.map((stat, index) => (
          <div key={stat.label} className={`px-5 py-5 ${index ? 'border-t border-[#d9d1c2] sm:border-l xl:border-t-0' : ''}`}>
            <p className="text-sm text-[#5b564e]">{stat.label}</p>
            <p className="mt-3 font-mono text-3xl tabular-nums text-[#211f1b]">{stat.value}</p>
            <p className="mt-1 text-xs text-[#777064]">{stat.helper}</p>
          </div>
        ))}
      </div>

      <section>
        <div className="mb-4 flex items-end justify-between border-b border-[#d9d1c2] pb-4">
          <h2 className="text-xl font-medium text-[#211f1b]">Application tracker</h2>
          <span className="font-mono text-xs text-[#777064]">{String(APPLICATIONS.length).padStart(2, '0')} records</span>
        </div>
        <div className="overflow-x-auto border-y border-[#d9d1c2] bg-[#fbf9f3]">
          <table className="min-w-full text-left text-sm">
            <thead><tr className="border-b border-[#d9d1c2] text-[#777064]"><th className="px-4 py-3 font-normal">Role</th><th className="px-4 py-3 font-normal">Candidate</th><th className="px-4 py-3 font-normal">Email</th><th className="px-4 py-3 font-normal">Status</th></tr></thead>
            <tbody>{APPLICATIONS.map((application) => {
              const job = JOBS.find((item) => item.id === application.jobId);
              return <tr key={application.id} className="border-b border-[#d9d1c2] last:border-0">
                <td className="whitespace-nowrap px-4 py-4 font-medium text-[#211f1b]">{job?.title ?? application.jobId}</td>
                <td className="whitespace-nowrap px-4 py-4 text-[#5b564e]">{application.candidateName}</td>
                <td className="whitespace-nowrap px-4 py-4 text-[#5b564e]">{application.email}</td>
                <td className="whitespace-nowrap px-4 py-4"><span className={`inline-flex items-center gap-2 text-xs ${application.status === 'Shortlisted' ? 'text-[#9b422a]' : application.status === 'Rejected' ? 'text-[#a4493c]' : 'text-[#777064]'}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{application.status}</span></td>
              </tr>;
            })}</tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
