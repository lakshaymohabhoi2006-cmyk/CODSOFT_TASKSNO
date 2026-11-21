import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#d9d1c2] bg-[#ebe5d8] px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3 text-[#211f1b]">
          <span className="flex h-7 w-7 items-center justify-center border border-[#9b422a] font-mono text-[10px] text-[#9b422a]">JB</span>
          <span className="text-sm font-medium">JobBoard</span>
        </Link>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#5b564e]">
          <Link href="/jobs" className="hover:text-[#9b422a]">Browse jobs</Link>
          <Link href="/employer" className="hover:text-[#9b422a]">For employers</Link>
          <Link href="/candidate" className="hover:text-[#9b422a]">Applications</Link>
        </nav>
        <p className="text-xs text-[#777064]">© {new Date().getFullYear()} JobBoard</p>
      </div>
    </footer>
  );
}
