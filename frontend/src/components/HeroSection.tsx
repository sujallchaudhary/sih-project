import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Lightbulb, Code, Users } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* SIH 2025 Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Lightbulb className="h-4 w-4" />
            Smart India Hackathon 2025
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            Welcome to <span className="text-orange-500">SIH </span><span className="text-green-600">Hub</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto">
            Discover innovative problem statements from Smart India Hackathon 2025. 
            Connect with challenges that shape the future of technology and society.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/problems">
              <Button size="lg" className="bg-orange-500 text-white hover:bg-orange-600">
                <Search className="mr-2 h-5 w-5" />
                Explore Problems
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/team">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <Users className="mr-2 h-5 w-5" />
                Join Teams
              </Button>
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="bg-orange-500 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Problem Statements</h3>
              <p className="text-gray-600">Browse through diverse challenges across multiple domains</p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="bg-blue-600 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Team Management</h3>
              <p className="text-gray-600">Create or join teams to collaborate on solutions</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="bg-green-600 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Innovation Platform</h3>
              <p className="text-gray-600">Build solutions that make a real-world impact</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
