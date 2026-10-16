'use client';

import Link from 'next/link';
import { Code2, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const iconMap: Record<string, React.ReactNode> = {
    GitHub: <Code2 size={24} />,
    LinkedIn: <Mail size={24} />,
    Email: <Mail size={24} />,
    Twitter: <Code2 size={24} />,
  };

  return (
    <footer className="bg-slate-900 dark:bg-black text-slate-300 dark:text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">LM</h3>
            <p className="text-sm">
              Full-stack developer passionate about creating beautiful and functional web
              experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: '#home', label: 'Home' },
                { href: '#about', label: 'About' },
                { href: '#projects', label: 'Projects' },
                { href: '#skills', label: 'Skills' },
                { href: '#contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Follow Me</h4>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                  aria-label={link.name}
                >
                  {iconMap[link.name] || <Mail size={24} />}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>
            &copy; {currentYear} Lakshay Mohabhoi. All rights reserved. |{' '}
            <a href="#" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            {' '} | {' '}
            <a href="#" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
          </p>
          <p className="mt-4 md:mt-0">
            Designed & Built with{' '}
            <span className="text-blue-400">
              ❤
            </span>{' '}
            by Lakshay Mohabhoi
          </p>
        </div>
      </div>
    </footer>
  );
}
