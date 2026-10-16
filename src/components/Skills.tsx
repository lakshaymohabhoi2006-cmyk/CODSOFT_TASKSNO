'use client';

import { motion } from 'framer-motion';
import { SKILLS } from '@/lib/constants';

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="skills" className="bg-white px-4 py-20 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-12">
          <div className="text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-slate-100 sm:text-5xl">Skills & Expertise</h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400" />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              A comprehensive overview of my technical skills and expertise areas.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {SKILLS.map((skillGroup, categoryIndex: number) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="rounded-lg bg-slate-50 p-6 shadow-md dark:bg-slate-800"
              >
                <h3 className="mb-6 text-xl font-bold text-slate-900 dark:text-slate-100">{skillGroup.category}</h3>
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill: string) => (
                    <motion.span
                      key={skill}
                      variants={itemVariants}
                      className="rounded-lg border-2 border-blue-200 bg-white px-4 py-2 font-medium text-slate-700 transition-colors hover:border-blue-600 dark:border-blue-900 dark:bg-slate-700 dark:text-slate-300 dark:hover:border-blue-400"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 p-8 text-center dark:from-blue-900/20 dark:to-cyan-900/20">
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              I&apos;m always eager to learn new technologies and frameworks. My passion for
              development drives me to stay updated with the latest industry trends and
              best practices.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
