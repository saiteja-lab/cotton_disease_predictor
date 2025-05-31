import React, { useState, useEffect } from 'react';
import { Leaf, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">CottonCare AI</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Home</a>
            <a href="#upload" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Disease Detection</a>
            <a href="#info" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Farming Tips</a>
            <a href="#about" className="btn btn-primary">About Us</a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4 fade-in">
            <a 
              href="#home" 
              className="block text-gray-700 hover:text-green-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#upload" 
              className="block text-gray-700 hover:text-green-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Disease Detection
            </a>
            <a 
              href="#info" 
              className="block text-gray-700 hover:text-green-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Farming Tips
            </a>
            <a 
              href="#about" 
              className="inline-block btn btn-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;