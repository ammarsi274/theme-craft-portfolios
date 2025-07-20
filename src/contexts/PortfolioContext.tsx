import { createContext, useContext, useState, ReactNode } from 'react';
import { PortfolioData, Theme } from '@/types/portfolio';

interface PortfolioContextType {
  portfolioData: PortfolioData;
  selectedTheme: Theme;
  updatePortfolioData: (data: Partial<PortfolioData>) => void;
  updatePersonalInfo: (info: Partial<PortfolioData['personalInfo']>) => void;
  updateSocialLinks: (links: Partial<PortfolioData['socialLinks']>) => void;
  addSkill: (skill: PortfolioData['skills'][0]) => void;
  updateSkill: (index: number, skill: PortfolioData['skills'][0]) => void;
  removeSkill: (index: number) => void;
  addExperience: (experience: PortfolioData['experiences'][0]) => void;
  updateExperience: (id: string, experience: PortfolioData['experiences'][0]) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: PortfolioData['education'][0]) => void;
  updateEducation: (id: string, education: PortfolioData['education'][0]) => void;
  removeEducation: (id: string) => void;
  addProject: (project: PortfolioData['projects'][0]) => void;
  updateProject: (id: string, project: PortfolioData['projects'][0]) => void;
  removeProject: (id: string) => void;
  setSelectedTheme: (theme: Theme) => void;
  resetPortfolio: () => void;
}

const defaultPortfolioData: PortfolioData = {
  personalInfo: {
    name: '',
    title: '',
    about: '',
    email: '',
    phone: '',
    location: '',
    website: '',
  },
  socialLinks: {
    github: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    dribbble: '',
  },
  skills: [],
  experiences: [],
  education: [],
  projects: [],
};

const defaultTheme: Theme = {
  id: 'modern',
  name: 'Modern',
  description: 'Clean and professional design with modern elements',
  preview: 'theme-modern',
  colors: {
    primary: '#6366f1',
    secondary: '#f1f5f9',
    accent: '#8b5cf6',
    background: '#ffffff',
    text: '#1e293b',
  },
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(defaultTheme);

  const updatePortfolioData = (data: Partial<PortfolioData>) => {
    setPortfolioData(prev => ({ ...prev, ...data }));
  };

  const updatePersonalInfo = (info: Partial<PortfolioData['personalInfo']>) => {
    setPortfolioData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  const updateSocialLinks = (links: Partial<PortfolioData['socialLinks']>) => {
    setPortfolioData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, ...links }
    }));
  };

  const addSkill = (skill: PortfolioData['skills'][0]) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, skill]
    }));
  };

  const updateSkill = (index: number, skill: PortfolioData['skills'][0]) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.map((s, i) => i === index ? skill : s)
    }));
  };

  const removeSkill = (index: number) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addExperience = (experience: PortfolioData['experiences'][0]) => {
    setPortfolioData(prev => ({
      ...prev,
      experiences: [...prev.experiences, experience]
    }));
  };

  const updateExperience = (id: string, experience: PortfolioData['experiences'][0]) => {
    setPortfolioData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => e.id === id ? experience : e)
    }));
  };

  const removeExperience = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(e => e.id !== id)
    }));
  };

  const addEducation = (education: PortfolioData['education'][0]) => {
    setPortfolioData(prev => ({
      ...prev,
      education: [...prev.education, education]
    }));
  };

  const updateEducation = (id: string, education: PortfolioData['education'][0]) => {
    setPortfolioData(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? education : e)
    }));
  };

  const removeEducation = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  const addProject = (project: PortfolioData['projects'][0]) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, project]
    }));
  };

  const updateProject = (id: string, project: PortfolioData['projects'][0]) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? project : p)
    }));
  };

  const removeProject = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const resetPortfolio = () => {
    setPortfolioData(defaultPortfolioData);
    setSelectedTheme(defaultTheme);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        selectedTheme,
        updatePortfolioData,
        updatePersonalInfo,
        updateSocialLinks,
        addSkill,
        updateSkill,
        removeSkill,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addProject,
        updateProject,
        removeProject,
        setSelectedTheme,
        resetPortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};