import React from 'react';
import { Leaf} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Adjusted to 3 columns for md screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Brand and Description */}
          <div> {/* Was md:col-span-1, now implicitly one of the 3 cols */}
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="w-7 h-7 text-green-400" />
              <span className="text-xl font-bold">CottonCare AI</span>
            </div>
            <p className="text-gray-300 mb-4">
              Empowering farmers with advanced AI technology to detect and manage cotton plant diseases efficiently.
            </p>
            {/* Social media links removed for simplicity */}
          </div>
          
          {/* Column 2: Simplified Quick Links */}
          <div> {/* Was md:col-span-1 */}
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#upload" className="text-gray-300 hover:text-white transition-colors">Disease Detection</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} CottonCare AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;