export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  technologies: string[];
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
  featured?: boolean;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  salary: string;
  description: string;
  requirements: string[];
  postedBy: string;
  postedOn: string;
  isActive: boolean;
  featured?: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  candidateName: string;
  email: string;
  status: 'Applied' | 'Shortlisted' | 'Rejected';
}

export interface StatItem {
  label: string;
  value: string;
  helper: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
