'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { ABOUT_TEXT } from '@/lib/constants';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(260px,360px)_1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto h-56 w-56 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-2xl ring-4 ring-blue-500/20 dark:border-slate-800 sm:h-72 sm:w-72 lg:h-80 lg:w-80"
        >
          <Image
            src="/lakshay-about.jpg"
            alt="Lakshay Mohabhoi in a formal suit"
            fill
            sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 320px"
            priority
            className="scale-[1.35] object-cover object-[center_32%]"
          />
        </motion.div>

        <div className="space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
                Lakshay Mohabhoi
              </span>
            </h1>
            <p className="text-2xl font-semibold text-slate-700 dark:text-slate-300 sm:text-3xl">
              Full Stack Developer & Web Enthusiast
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl lg:mx-0"
          >
            {ABOUT_TEXT.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row lg:justify-start"
          >
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-blue-700 hover:shadow-xl dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              View My Work
              <ArrowRight size={20} />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-blue-600 px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-slate-800"
            >
              Get in Touch
            </Link>
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/resume.pdf';
                link.download = 'Lakshay_Mohabhoi_Resume.pdf';
                link.click();
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-200 px-8 py-3 font-semibold text-slate-900 transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              <Download size={20} />
              Resume
            </button>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="pt-2"
          >
            <div className="flex justify-center lg:justify-start">
              <div className="flex h-10 w-6 items-center justify-center rounded-full border-2 border-blue-600 dark:border-blue-400">
                <div className="h-2 w-1 animate-pulse-slow rounded-full bg-blue-600 dark:bg-blue-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
