'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

const TeamComingSoon = () => {
  return (
    <ProtectedRoute feature="team management">
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Card className="shadow-lg">
            <CardHeader className="pb-6">
              <div className="bg-orange-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-10 w-10 text-orange-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                Team Management
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Coming Soon to SIH Hub
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center gap-2 text-orange-600">
                <Clock className="h-5 w-5" />
                <span className="font-medium">Under Development</span>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                We&apos;re working hard to bring you an amazing team management experience. 
                Soon you&apos;ll be able to create teams, invite members, and collaborate 
                seamlessly on Smart India Hackathon challenges.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 text-left">
                <h3 className="font-semibold text-blue-900 mb-3">What&apos;s Coming:</h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Create and manage teams
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Invite team members
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Collaboration tools
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
                <Link href="/problems">
                  <Button className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
                    <Users className="mr-2 h-4 w-4" />
                    Explore Problems
                  </Button>
                </Link>
              </div>
              
              <div className="text-sm text-gray-500 pt-4">
                Want to be notified when it&apos;s ready? Follow us for updates!
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TeamComingSoon;
