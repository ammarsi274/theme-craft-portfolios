export interface PersonalInfo {
  name: string;
  title: string;
  about: string;
  email: string;
  phone: string;
  location: string;
  website: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  dribbble: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  socialLinks: SocialLinks;
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

export interface ExportOptions {
  includeResume: boolean;
  includeProjects: boolean;
  customDomain: string;
}