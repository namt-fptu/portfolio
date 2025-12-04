import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '// home', id: 'home' },
    { name: '// about', id: 'about' },
    { name: '// projects', id: 'projects' },
    { name: '// skills', id: 'skills' },
    { name: '// contact', id: 'contact' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 font-mono ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-800 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-xl font-bold text-white tracking-tighter cursor-pointer" onClick={() => scrollTo('home')}>
          DEV_<span className="text-neon-green">PORTFOLIO</span>
        </div>
        
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button 
                onClick={() => scrollTo(link.id)}
                className="text-gray-400 hover:text-neon-cyan text-sm transition-colors hover:shadow-[0_0_8px_rgba(10,239,255,0.5)]"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;