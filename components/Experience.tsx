import React, { useEffect, useRef } from 'react';
import { EXPERIENCE } from '../constants';
import { GitCommit } from 'lucide-react';

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = window;
    if (!gsap || !ScrollTrigger || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll('.timeline-item');
      if (items) {
        gsap.from(items, {
          opacity: 0,
          x: -50,
          duration: 0.8,
          stagger: 0.3,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-24 px-4 bg-[#080808]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-mono font-bold text-center mb-16 text-white">
          <span className="text-neon-green">git log</span> --pretty=format
        </h2>

        <div ref={containerRef} className="relative border-l-2 border-gray-800 ml-4 md:ml-12 space-y-12">
          {EXPERIENCE.map((exp) => (
            <div key={exp.id} className="timeline-item relative pl-8 md:pl-12">
              {/* Node (Commit Circle) */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-neon-green group hover:scale-125 transition-transform duration-300">
                  <div className="absolute inset-0 bg-neon-green opacity-20 animate-pulse rounded-full"></div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                 <h3 className="text-xl font-bold font-mono text-white">{exp.role}</h3>
                 <span className="font-mono text-sm text-neon-purple px-2 py-0.5 border border-neon-purple/30 rounded bg-neon-purple/5">
                   {exp.date}
                 </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm font-mono text-gray-500 mb-4">
                <GitCommit size={14} className="text-neon-cyan" />
                <span>{exp.hash}</span>
                <span className="text-gray-600">@</span>
                <span className="text-gray-300">{exp.company}</span>
              </div>

              <p className="text-gray-400 font-mono leading-relaxed max-w-2xl bg-gray-900/30 p-4 rounded border-l-2 border-gray-700 hover:border-neon-cyan transition-colors">
                {exp.description}
              </p>
            </div>
          ))}
          
          <div className="absolute -left-[5px] bottom-0 w-2 h-20 bg-gradient-to-b from-gray-800 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Experience;