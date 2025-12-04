export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  status: "Deployed" | "In Development" | "Archived";
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  date: string;
  description: string;
  hash: string;
}

export interface Skill {
  name: string;
  level: number; // 1-100
  icon: string;
}

// Declare GSAP on window for TS
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}