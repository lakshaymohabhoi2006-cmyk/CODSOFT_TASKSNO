'use client';

import { APPLICATIONS, DASHBOARD_STATS } from '@/lib/constants';

export default function EmployerDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Employer dashboard</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">Hiring overview</h1>
      </div>

      <div className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_STATS.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{stat.helper}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent applicants</h2>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-300">
                <th className="pb-3 pr-4 font-medium">Role</th>
                <th className="pb-3 pr-4 font-medium">Name</th>
                <th className="pb-3 pr-4 font-medium">Email</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {APPLICATIONS.map((application) => (
                <tr key={application.id} className="border-b border-slate-100 last:border-b-0 dark:border-slate-800">
                  <td className="py-4 pr-4 font-medium text-slate-900 dark:text-white">{application.jobId}</td>
                  <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">{application.candidateName}</td>
                  <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">{application.email}</td>
                  <td className="py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${application.status === 'Shortlisted' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300' : application.status === 'Rejected' ? 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300'}`}>
                      {application.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
