import { Experience, Project, Skill } from "./types";

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Cyber_Security_Dash",
    description: "Real-time threat monitoring dashboard with WebSockets and D3.js visualization.",
    tags: ["React", "D3.js", "Node.js", "Socket.io"],
    link: "#",
    status: "Deployed"
  },
  {
    id: 2,
    title: "Crypto_Algo_Bot",
    description: "Automated high-frequency trading bot interacting with Binance API.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    link: "#",
    status: "In Development"
  },
  {
    id: 3,
    title: "Neural_Net_Visualizer",
    description: "Interactive 3D visualization of neural network layers using Three.js.",
    tags: ["Three.js", "React", "TensorFlow.js"],
    link: "#",
    status: "Archived"
  },
  {
    id: 4,
    title: "Zero_Trust_Auth",
    description: "JWT-based authentication system with hardware key support simulation.",
    tags: ["TypeScript", "Next.js", "Redis"],
    link: "#",
    status: "Deployed"
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: "Senior Frontend Engineer",
    company: "Tech_Corp_Solutions",
    date: "2023 - Present",
    description: "Leading the UI overhaul for enterprise security tools.",
    hash: "a1b2c3d"
  },
  {
    id: 2,
    role: "Fullstack Developer",
    company: "StartUp_Inc",
    date: "2021 - 2023",
    description: "Built scalable microservices and React frontends.",
    hash: "e5f6g7h"
  },
  {
    id: 3,
    role: "Junior Dev",
    company: "Web_Studio_X",
    date: "2019 - 2021",
    description: "Developed responsive websites and e-commerce platforms.",
    hash: "i9j0k1l"
  }
];

export const SKILLS: Skill[] = [
  { name: "React", level: 95, icon: "⚛" },
  { name: "TypeScript", level: 90, icon: "TS" },
  { name: "Node.js", level: 85, icon: "JS" },
  { name: "Rust", level: 60, icon: "🦀" },
  { name: "Docker", level: 80, icon: "🐳" },
  { name: "AWS", level: 75, icon: "☁" },
];