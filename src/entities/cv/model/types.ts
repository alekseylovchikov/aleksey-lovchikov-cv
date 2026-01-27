export interface ContactInfo {
  email: string;
  github: string;
  telegram: string;
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface ExperienceItem {
  position: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  major: string;
  period: string;
}

export interface CVData {
  name: string;
  title: string;
  contacts: ContactInfo;
  about: string;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  languages: {
    name: string;
    level: string;
  }[];
  additionalInfo: string[];
}
