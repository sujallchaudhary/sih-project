'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import Login from './Login';
import UserProfile from './UserProfile';

const Header = () => {
  const { user, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on route change
  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('[data-mobile-menu]')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="bg-orange-500 text-white px-2 py-1 rounded-lg font-bold text-lg">
                  SIH
                </div>
                <span className="text-xl font-bold text-green-600">Hub</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Home
              </Link>
              <Link href="/problems" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Problem Statements
              </Link>
              {user && (
                <Link href="/bookmarks" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                  Bookmarks
                </Link>
              )}
              <Link href="/team" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Team
              </Link>
            </nav>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center">
              {loading ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              ) : user ? (
                <UserProfile />
              ) : (
                <Login />
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4" data-mobile-menu>
              {/* Mobile Auth */}
              {loading ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              ) : user ? (
                <UserProfile />
              ) : (
                <Login />
              )}
              
              {/* Hamburger Menu */}
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-orange-500 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40 backdrop-blur-sm" data-mobile-menu>
            <nav className="px-4 py-2 space-y-1">
              <Link 
                href="/" 
                className="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-colors font-medium"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                href="/problems" 
                className="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-colors font-medium"
                onClick={closeMobileMenu}
              >
                Problem Statements
              </Link>
              {user && (
                <Link 
                  href="/bookmarks" 
                  className="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-colors font-medium"
                  onClick={closeMobileMenu}
                >
                  Bookmarks
                </Link>
              )}
              <Link 
                href="/team" 
                className="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-colors font-medium"
                onClick={closeMobileMenu}
              >
                Team
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
