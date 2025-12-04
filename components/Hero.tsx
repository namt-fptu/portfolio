import React, { useEffect, useRef, useState } from 'react';
import GlitchText from './GlitchText';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');
  const fullText = "Fullstack Developer_";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const { gsap } = window;
    if (!gsap || !containerRef.current) return;

    // Use gsap.context for proper cleanup in React 18
    const ctx = gsap.context(() => {
      // Fade in animation
      const tl = gsap.timeline();
      tl.from('.hero-anim', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Parallax Effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to('.parallax-layer', {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: 'power2.out',
          overwrite: 'auto' // Prevent conflict
        });
        
        gsap.to('.parallax-layer-reverse', {
          x: -xPos * 1.5,
          y: -yPos * 1.5,
          duration: 1,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      
      // Cleanup listener inside context scope isn't automatic for window listeners,
      // but we can return a cleanup function from the context
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-4 pt-16"
      id="home"
    >
      {/* Floating Code Particles (Decorative) */}
      <div className="parallax-layer-reverse absolute top-1/4 left-10 text-neon-green/20 text-sm font-mono select-none pointer-events-none hidden lg:block will-change-transform">
        &lt;div class="wrapper"&gt;
      </div>
      <div className="parallax-layer absolute bottom-1/3 right-10 text-neon-cyan/20 text-sm font-mono select-none pointer-events-none hidden lg:block will-change-transform">
        const future = await load();
      </div>

      <div className="text-center z-10 max-w-4xl w-full">
        <p className="hero-anim text-neon-cyan font-mono mb-4 tracking-widest text-sm md:text-base">
          &gt; INITIALIZING SYSTEM...
        </p>

        <h1 className="hero-anim text-5xl md:text-8xl font-bold font-mono text-white mb-6">
          HELLO, I'M <br />
          <GlitchText text="[YOUR NAME]" className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-cyan" />
        </h1>

        <div className="hero-anim h-12 md:h-16 mb-8 flex justify-center items-center">
          <span className="text-xl md:text-3xl font-mono text-gray-300">
            &gt; {displayText}
            <span className="animate-pulse text-neon-green">|</span>
          </span>
        </div>

        <div className="hero-anim flex flex-col md:flex-row gap-6 justify-center items-center mt-8">
          <button 
            onClick={() => {
              const el = document.getElementById('projects');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative px-8 py-4 bg-transparent border border-neon-green text-neon-green font-mono uppercase tracking-wider hover:bg-neon-green/10 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">View Projects</span>
            <div className="absolute inset-0 bg-neon-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-0"></div>
          </button>
          
          <button 
            onClick={() => {
              const el = document.getElementById('contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative px-8 py-4 bg-transparent border border-neon-cyan text-neon-cyan font-mono uppercase tracking-wider hover:bg-neon-cyan/10 transition-all duration-300"
          >
            <span className="relative z-10">Contact Me</span>
          </button>
        </div>
      </div>

      <div className="hero-anim absolute bottom-10 animate-bounce">
         <ArrowDown className="text-neon-green w-8 h-8 opacity-70" />
      </div>
    </section>
  );
};

export default Hero;