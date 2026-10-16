import { Job, NavLink, Project, Skill, SocialLink, StatItem } from '@/types';

export const SITE_CONFIG = {
  title: 'JobBoard | Career Opportunities',
  description: 'Find jobs, manage applications, and connect with employers in one place.',
  author: 'Lakshay Mohabhoi',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://jobboard.example.com',
  keywords: ['jobs', 'career', 'employer', 'job board', 'application portal'],
};

export const NAVIGATION_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/employer', label: 'Employers' },
  { href: '/candidate', label: 'Candidates' },
  { href: '/login', label: 'Login' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'LinkedIn', url: 'https://linkedin.com' },
  { name: 'Email', url: 'mailto:hello@jobboard.com' },
];

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Smart Hiring Dashboard',
    description: 'Analytics-centered hiring portal for recruiters.',
    longDescription: 'A dashboard that centralizes applicant tracking and hiring metrics for fast-moving teams.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    links: { github: 'https://github.com', live: 'https://example.com' },
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Talent Connect',
    description: 'A candidate discovery and resume review workflow.',
    longDescription: 'Built to simplify recruitment by surfacing candidate details and status updates in one place.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    links: { github: 'https://github.com', live: 'https://example.com' },
    featured: true,
  },
  {
    id: 'project-3',
    title: 'Career Portal UI',
    description: 'Responsive job board with search and filtering.',
    longDescription: 'A clean and modern job portal interface designed for speed, usability, and reach.',
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    links: { github: 'https://github.com' },
    featured: false,
  },
];

export const SKILLS: Skill[] = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL'] },
  { category: 'Tools & Technologies', items: ['Git', 'GitHub', 'Docker', 'AWS', 'Vercel', 'VS Code'] },
  { category: 'Soft Skills', items: ['Problem Solving', 'Communication', 'Team Collaboration', 'Project Management'] },
];

export const ABOUT_TEXT = {
  bio: "Hi! I'm Lakshay Mohabhoi, a passionate full-stack developer with experience building modern web applications.",
  intro: 'I love creating beautiful, functional, and user-centric web experiences. With expertise in frontend and backend technologies, I can help bring your ideas to life.',
  details: "I'm constantly learning and exploring new technologies to stay updated with industry trends. When I'm not coding, you can find me exploring new technologies or contributing to open-source projects.",
};

export const JOBS: Job[] = [
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    company: 'Northstar Labs',
    location: 'Remote',
    jobType: 'Full-time',
    salary: '$80K - $110K',
    description:
      'Build polished web experiences for a fast-growing SaaS product and collaborate closely with design and engineering teams.',
    requirements: ['React', 'TypeScript', 'Responsive layouts', 'Figma collaboration'],
    postedBy: 'Ava Thompson',
    postedOn: '2026-10-05',
    isActive: true,
    featured: true,
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    company: 'Pixel Forge',
    location: 'Bengaluru',
    jobType: 'Full-time',
    salary: '₹18L - ₹26L',
    description:
      'Own the user journey for enterprise tools and turn complex workflows into simple, elegant interfaces.',
    requirements: ['UX research', 'Design systems', 'Prototyping', 'Accessibility'],
    postedBy: 'Nikhil Rao',
    postedOn: '2026-10-02',
    isActive: true,
    featured: true,
  },
  {
    id: 'backend-engineer',
    title: 'Backend Engineer',
    company: 'DataNest',
    location: 'Hyderabad',
    jobType: 'Contract',
    salary: '₹22L - ₹30L',
    description:
      'Design and maintain secure APIs and data pipelines for a rapidly scaling data platform.',
    requirements: ['Node.js', 'REST APIs', 'PostgreSQL', 'Redis'],
    postedBy: 'Meera Nair',
    postedOn: '2026-09-28',
    isActive: true,
    featured: true,
  },
  {
    id: 'ui-engineer',
    title: 'UI Engineer',
    company: 'BrightPath',
    location: 'Pune',
    jobType: 'Part-time',
    salary: '₹12L - ₹17L',
    description:
      'Create modern front-end experiences for internal tools and customer dashboards with a high-quality component library.',
    requirements: ['Tailwind', 'Storybook', 'Accessibility', 'CSS architecture'],
    postedBy: 'Rohan Singh',
    postedOn: '2026-09-25',
    isActive: true,
  },
  {
    id: 'fullstack-intern',
    title: 'Full Stack Intern',
    company: 'CloudCanvas',
    location: 'Remote',
    jobType: 'Internship',
    salary: '$25/hr',
    description:
      'Work with product and engineering on real projects, from user interfaces to API integrations and deployment workflows.',
    requirements: ['JavaScript', 'Git', 'Problem solving', 'Learning mindset'],
    postedBy: 'Karan Shah',
    postedOn: '2026-09-20',
    isActive: true,
  },
];

export const APPLICATIONS = [
  { id: 'app-1', jobId: 'frontend-developer', candidateName: 'Priya Sharma', email: 'priya@gmail.com', status: 'Shortlisted' },
  { id: 'app-2', jobId: 'backend-engineer', candidateName: 'Rahul Verma', email: 'rahul@gmail.com', status: 'Applied' },
  { id: 'app-3', jobId: 'product-designer', candidateName: 'Aditi Mehta', email: 'aditi@gmail.com', status: 'Rejected' },
];

export const DASHBOARD_STATS: StatItem[] = [
  { label: 'Open jobs', value: '24', helper: 'Across product and design' },
  { label: 'Applicants', value: '1,286', helper: 'This month' },
  { label: 'Interviews', value: '42', helper: 'Scheduled' },
  { label: 'Hires', value: '18', helper: 'Successful placements' },
];
