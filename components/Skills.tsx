import React, { useEffect, useRef } from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = window;
    if (!gsap || !ScrollTrigger || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".skill-bar", {
        width: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="py-20 px-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-center mb-12">
        <h2 className="text-3xl font-mono font-bold text-white uppercase border-b-2 border-neon-purple pb-2">
          System_Capabilities
        </h2>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {SKILLS.map((skill) => (
          <div key={skill.name} className="group">
            <div className="flex justify-between mb-2 font-mono text-sm">
              <span className="text-white flex items-center gap-2">
                 <span className="text-neon-cyan">{skill.icon}</span> {skill.name}
              </span>
              <span className="text-gray-500 group-hover:text-neon-green transition-colors">{skill.level}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="skill-bar h-full bg-gradient-to-r from-neon-green to-neon-cyan shadow-[0_0_10px_#0aff0a] will-change-[width]" 
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;