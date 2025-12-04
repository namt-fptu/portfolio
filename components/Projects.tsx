import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, X, Code, Lock } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import GlitchText from './GlitchText';

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = window;
    if (!gsap || !ScrollTrigger || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.children;
      if (cards) {
        gsap.fromTo(cards, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="py-24 px-4 bg-neon-dim/30 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-mono font-bold text-center mb-16 text-white">
          <span className="text-neon-green">&lt;</span> Projects <span className="text-neon-green">/&gt;</span>
        </h2>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative h-72 bg-[#0a0a0a] border border-gray-800 rounded-lg overflow-hidden cursor-pointer hover:border-neon-green transition-all duration-300 hover:shadow-[0_0_20px_rgba(10,255,10,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="text-xl font-bold font-mono text-white group-hover:text-neon-green transition-colors">{project.title}</h3>
                   <Code className="text-gray-500 group-hover:text-neon-green" size={20} />
                </div>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs font-mono border border-gray-700 px-2 py-1 text-gray-300 rounded group-hover:border-neon-green/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Scanline decoration inside card */}
              <div className="absolute top-0 w-full h-full bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <style>
            {`
              @keyframes modal-glitch {
                0% { border-color: rgba(10, 239, 255, 0.5); transform: translate(0, 0); }
                20% { border-color: rgba(10, 255, 10, 0.8); transform: translate(-2px, 2px); }
                40% { border-color: rgba(188, 19, 254, 0.8); transform: translate(2px, -2px); }
                60% { border-color: rgba(10, 239, 255, 0.5); transform: translate(0, 0); }
                80% { border-color: rgba(10, 255, 10, 0.5); transform: translate(1px, -1px); }
                100% { border-color: rgba(10, 239, 255, 0.5); transform: translate(0, 0); }
              }
              .animate-modal-entry {
                animation: modal-glitch 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
              }

              @keyframes glitch-text-anim {
                0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); opacity: 0; }
                20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); opacity: 1; color: #0aff0a; }
                40% { clip-path: inset(10% 0 50% 0); transform: translate(-2px, 2px); opacity: 0.8; color: #bc13fe; }
                60% { clip-path: inset(50% 0 20% 0); transform: translate(1px, -2px); opacity: 1; color: #0aefff; }
                80% { clip-path: inset(0% 0 0% 0); transform: translate(0, 0); opacity: 1; }
                100% { clip-path: inset(0% 0 0% 0); transform: translate(0, 0); opacity: 1; }
              }
              .animate-title-glitch {
                animation: glitch-text-anim 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
              }
            `}
          </style>
          <div 
            className="bg-[#0f0f0f] border border-neon-cyan/50 w-full max-w-2xl p-8 rounded-lg relative shadow-[0_0_50px_rgba(10,239,255,0.15)] animate-modal-entry"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              onClick={() => setSelectedProject(null)}
            >
              <X />
            </button>

            <div className="mb-4 flex flex-col md:flex-row md:items-center gap-3">
              <h3 className="text-2xl md:text-3xl font-mono font-bold text-neon-cyan relative inline-block animate-title-glitch">
                {selectedProject.title}
                <span className="absolute top-0 left-0 -z-10 text-neon-green opacity-50 translate-x-[2px] animate-pulse">
                  {selectedProject.title}
                </span>
                <span className="absolute top-0 left-0 -z-10 text-neon-purple opacity-50 -translate-x-[2px] animate-pulse">
                  {selectedProject.title}
                </span>
              </h3>
              
              <div className="flex items-center gap-3 mt-1 md:mt-0">
                {selectedProject.status === 'Deployed' ? (
                  <span className="text-xs bg-neon-green/10 text-neon-green border border-neon-green px-2 py-1 rounded shadow-[0_0_10px_rgba(10,255,10,0.2)]">Live System</span>
                ) : (
                  <span className="text-xs bg-yellow-500/10 text-yellow-500 border border-yellow-500 px-2 py-1 rounded">Dev Build</span>
                )}
              </div>
            </div>

            <p className="text-gray-300 font-mono mb-8 leading-relaxed text-sm md:text-base border-l-2 border-gray-800 pl-4">
              {selectedProject.description}
            </p>

            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-bold">&gt; Tech_Stack_Trace</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map(tag => (
                   <span key={tag} className="text-sm font-mono bg-gray-900/80 border border-gray-700 text-neon-cyan px-3 py-1 rounded-sm hover:border-neon-cyan/50 transition-colors cursor-default">
                     {tag}
                   </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-800/50">
               <a href={selectedProject.link} className="flex-1 md:flex-none flex justify-center items-center gap-2 px-6 py-3 bg-neon-cyan text-black font-bold font-mono hover:bg-white hover:shadow-[0_0_20px_rgba(10,239,255,0.6)] transition-all duration-300 clip-path-polygon">
                  <ExternalLink size={18} /> Initialize
               </a>
               <button className="flex-1 md:flex-none flex justify-center items-center gap-2 px-6 py-3 border border-gray-700 text-gray-400 font-mono hover:border-gray-500 hover:text-white transition-all duration-300">
                  <Lock size={18} /> Source_Code
               </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;