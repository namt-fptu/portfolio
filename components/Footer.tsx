import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-black border-t border-gray-900 font-mono text-center relative z-10">
      <div className="flex justify-center gap-6 mb-4">
        <a href="#" className="text-gray-500 hover:text-neon-green transition-colors transform hover:scale-110">
          <Github size={24} />
        </a>
        <a href="#" className="text-gray-500 hover:text-neon-cyan transition-colors transform hover:scale-110">
          <Linkedin size={24} />
        </a>
        <a href="#" className="text-gray-500 hover:text-neon-purple transition-colors transform hover:scale-110">
          <Twitter size={24} />
        </a>
      </div>
      <p className="text-gray-600 text-xs">
        console.log("Built by Your Name © 2025");
      </p>
    </footer>
  );
};

export default Footer;