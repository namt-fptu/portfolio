import React, { useEffect, useState } from 'react';
import MatrixBackground from './components/MatrixBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial system boot load
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[10000]">
        <div className="font-mono text-neon-green text-xl mb-4 animate-pulse">
          &gt; SYSTEM BOOT SEQUENCE...
        </div>
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-neon-green animate-[width_2s_ease-out_forwards]" style={{ width: '0%' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-gray-200 selection:bg-neon-green selection:text-black">
      {/* Background & Effects */}
      <MatrixBackground />
      <div className="scanlines"></div>
      <CustomCursor />
      
      {/* Main Content */}
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;