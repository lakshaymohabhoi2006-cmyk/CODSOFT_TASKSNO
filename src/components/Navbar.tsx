'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { NAVIGATION_LINKS } from '@/lib/constants';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-[#d9d1c2] bg-[#f4f0e7]/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-2" aria-label="JobBoard home">
          <span aria-hidden="true" className="font-serif text-2xl leading-none text-[#9b422a]">J<span className="text-[#211f1b]">.</span></span>
          <span className="font-serif text-lg tracking-tight text-[#211f1b]">JobBoard</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAVIGATION_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-[#5b564e] hover:text-[#9b422a]">{link.label}</Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme" className="rounded-md p-2 text-[#5b564e] hover:bg-[#ebe5d8] hover:text-[#211f1b]">
            <Sun className="hidden dark:block" size={17} />
            <Moon className="block dark:hidden" size={17} />
          </button>
          <Link href="/jobs" className="hidden min-h-9 items-center bg-[#9b422a] px-4 text-sm font-medium text-white hover:bg-[#7d3423] md:inline-flex">Find a role</Link>
          <button type="button" onClick={() => setMenuOpen((value) => !value)} className="rounded-md p-2 text-[#5b564e] hover:bg-[#ebe5d8] md:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-[#d9d1c2] bg-[#f4f0e7] px-5 py-3 md:hidden">
          <div className="flex flex-col">
            {NAVIGATION_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="border-b border-[#d9d1c2] py-3 text-sm text-[#5b564e] last:border-0 hover:text-[#9b422a]">{link.label}</Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
