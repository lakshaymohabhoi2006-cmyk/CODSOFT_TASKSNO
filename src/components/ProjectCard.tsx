'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group h-full overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl dark:bg-slate-800"
    >
      <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-400 to-cyan-400 transition-opacity group-hover:opacity-90 dark:from-blue-600 dark:to-cyan-600">
        <span className="text-lg font-semibold text-white">Project Image</span>
      </div>

      <div className="space-y-4 p-6">
        <div>
          <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-slate-100">{project.title}</h3>
          <p className="text-slate-600 dark:text-slate-400">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech: string) => (
            <span
              key={tech}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
          {project.links.github && (
            <Link
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-white transition-colors hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
            >
              <Code2 size={18} />
              GitHub
            </Link>
          )}
          {project.links.live && (
            <Link
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <ExternalLink size={18} />
              Live
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
