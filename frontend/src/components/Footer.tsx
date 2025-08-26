import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, ExternalLink, Lightbulb } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-orange-500 text-white px-2 py-1 rounded-lg font-bold text-lg">
                  SIH
                </div>
                <span className="text-xl font-bold text-blue-600">Hub</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Your central hub for Smart India Hackathon 2025 problem statements. 
              Discover innovative challenges, connect with opportunities, and build the future.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://sujal.info/github" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-orange-500 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://sujal.info/linkedin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-orange-500 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:sujalchaudhary63@gmail.com"
                className="text-gray-500 hover:text-orange-500 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/problems" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Problem Statements
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Team Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://sih.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-orange-500 transition-colors flex items-center"
                >
                  SIH Official Website
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/sujallchaudhary/sih-project" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-orange-500 transition-colors flex items-center"
                >
                  GitHub Repository
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.sih.gov.in/sih2025PS" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-orange-500 transition-colors flex items-center"
                >
                  Official Problem Statements
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} SIH Hub. Built for Smart India Hackathon 2025 community.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            An independent platform to help participants explore problem statements and manage teams.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
