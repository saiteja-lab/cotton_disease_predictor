import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section 
      id="home"
      className="relative bg-gradient-to-br from-green-50 to-green-100 py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Cotton Plant Disease Detection
            <span className="text-green-600"> Using AI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Revolutionizing agriculture with advanced AI technology. 
            Upload an image of your cotton plant and get instant disease detection 
            with personalized treatment recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#upload" 
              className="btn btn-primary px-8 py-3 text-lg"
            >
              Detect Disease Now
            </a>
            <a 
              href="#info" 
              className="btn btn-outline px-8 py-3 text-lg"
            >
              Farming Tips
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce-slow hidden md:block">
        <a href="#upload" className="text-green-600 hover:text-green-700 transition-colors">
          <ChevronDown size={32} />
        </a>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-200 rounded-full opacity-30"></div>
        <div className="absolute top-1/4 -left-20 w-60 h-60 bg-amber-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 right-1/3 w-40 h-40 bg-green-300 rounded-full opacity-20"></div>
      </div>
    </section>
  );
};

export default Hero;