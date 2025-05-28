
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-beauty-50 py-12 border-t border-beauty-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold beauty-gradient-text mb-4">BeautyTrack</h3>
            <p className="text-beauty-800 mb-4">
              Professional beauty procedure tracking and management platform for cosmetic specialists and their clients.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-beauty-900 mb-4">Features</h4>
            <ul className="space-y-2">
              <li><Link to="/appointments" className="text-beauty-700 hover:text-beauty-500">Appointment Scheduling</Link></li>
              <li><Link to="/procedures" className="text-beauty-700 hover:text-beauty-500">Procedure Tracking</Link></li>
              <li><Link to="/recommendations" className="text-beauty-700 hover:text-beauty-500">Personalized Recommendations</Link></li>
              <li><Link to="/integrations" className="text-beauty-700 hover:text-beauty-500">CRM Integrations</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-beauty-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-beauty-700 hover:text-beauty-500">About Us</Link></li>
              <li><Link to="/contact" className="text-beauty-700 hover:text-beauty-500">Contact</Link></li>
              <li><Link to="/careers" className="text-beauty-700 hover:text-beauty-500">Careers</Link></li>
              <li><Link to="/blog" className="text-beauty-700 hover:text-beauty-500">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-beauty-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-beauty-700 hover:text-beauty-500">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-beauty-700 hover:text-beauty-500">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-beauty-700 hover:text-beauty-500">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-beauty-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-beauty-700 text-sm">© {year} BeautyTrack. All rights reserved.</p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://instagram.com" className="text-beauty-700 hover:text-beauty-500" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://facebook.com" className="text-beauty-700 hover:text-beauty-500" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://twitter.com" className="text-beauty-700 hover:text-beauty-500" target="_blank" rel="noreferrer">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
