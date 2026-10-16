'use client';

import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '@/lib/constants';

export default function Projects() {
  const featuredProjects = PROJECTS.filter((p: { featured?: boolean }) => p.featured);

  return (
    <section id="projects" className="bg-slate-50 px-4 py-20 dark:bg-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-12">
          <div className="text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-slate-100 sm:text-5xl">Featured Projects</h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400" />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              A selection of my recent projects showcasing my skills in web development,
              design, and problem-solving.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <div className="pt-8 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              Want to see more? Visit my{' '}
              <a href="https://github.com/lakshaymohabhoi2006-cmyk" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
                GitHub profile
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
