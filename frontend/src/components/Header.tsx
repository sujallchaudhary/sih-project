'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Login from './Login';
import UserProfile from './UserProfile';

const Header = () => {
  const { user, loading } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
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
            <div className="hidden sm:flex items-center space-x-1 text-xs text-gray-500">
    
            </div>
          </Link>

          {/* Navigation */}
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

          {/* Auth Section */}
          <div className="flex items-center">
            {loading ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <UserProfile />
            ) : (
              <Login />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
