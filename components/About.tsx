import React, { useEffect, useRef } from 'react';
import { User, MapPin, Terminal } from 'lucide-react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = window;
    if (!gsap || !ScrollTrigger || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-20 px-4 max-w-6xl mx-auto relative overflow-hidden">
      <div ref={sectionRef} className="flex flex-col md:flex-row items-center gap-12">
        {/* Code Editor UI */}
        <div className="w-full md:w-1/2 bg-neon-dim border border-gray-800 rounded-lg shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500 will-change-transform">
          <div className="bg-[#1a1a1a] px-4 py-2 flex items-center gap-2 border-b border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-xs text-gray-500 font-mono">aboutMe.ts</span>
          </div>
          <div className="p-6 font-mono text-sm md:text-base leading-relaxed overflow-x-auto">
            <div className="text-gray-400">
              <span className="text-neon-purple">const</span> <span className="text-yellow-300">developer</span> = <span className="text-neon-purple">{`{`}</span>
            </div>
            <div className="pl-6 text-gray-300">
              <span className="text-red-400">name</span>: <span className="text-neon-green">"Your Name"</span>,
            </div>
            <div className="pl-6 text-gray-300">
              <span className="text-red-400">role</span>: <span className="text-neon-green">"Fullstack Engineer"</span>,
            </div>
            <div className="pl-6 text-gray-300">
              <span className="text-red-400">traits</span>: [<span className="text-neon-green">"Creative"</span>, <span className="text-neon-green">"Problem Solver"</span>],
            </div>
             <div className="pl-6 text-gray-300">
              <span className="text-red-400">status</span>: <span className="text-neon-cyan">"Open to work"</span>
            </div>
             <div className="pl-6 text-gray-300">
              <span className="text-red-400">function</span>: <span className="text-blue-400">code</span>() <span className="text-neon-purple">{`{`}</span>
            </div>
             <div className="pl-12 text-gray-500">
              // Continuously learning...
            </div>
             <div className="pl-12 text-gray-300">
               <span className="text-neon-purple">return</span> <span className="text-neon-green">"Innovation"</span>;
            </div>
             <div className="pl-6 text-neon-purple">{`}`}</div>
            <div className="text-neon-purple">{`}`};</div>
          </div>
        </div>

        {/* Text Description */}
        <div className="w-full md:w-1/2 font-mono">
          <div className="flex items-center gap-2 mb-6 text-neon-green">
             <Terminal size={24} />
             <h2 className="text-3xl font-bold uppercase tracking-widest">About_System</h2>
          </div>
          <p className="text-gray-400 mb-6 leading-7">
            I'm a passionate developer who bridges the gap between clean code and creative design. 
            Obsessed with performance and building futuristic user interfaces.
            When I'm not debugging, I'm exploring new technologies in the web ecosystem.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 border border-gray-800 bg-gray-900/50 hover:border-neon-green transition-colors group">
                <User className="text-neon-cyan mb-2 group-hover:animate-bounce" />
                <h3 className="text-white font-bold">Experience</h3>
                <p className="text-sm text-gray-500">5+ Years</p>
             </div>
             <div className="p-4 border border-gray-800 bg-gray-900/50 hover:border-neon-green transition-colors group">
                <MapPin className="text-neon-cyan mb-2 group-hover:animate-bounce" />
                <h3 className="text-white font-bold">Location</h3>
                <p className="text-sm text-gray-500">Vietnam / Remote</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;