"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, FileText, Video, Download, Star, Clock, Users } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
            Learning Resources
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Access comprehensive learning materials, past solutions, and expert guidance to excel in your hackathon journey.
          </p>
        </motion.div>

        {/* Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-white shadow-2xl border-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
            
            <CardHeader className="text-center pb-6">
              <div className="text-6xl mb-4">📚</div>
              <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
                Resource Library Coming Soon!
              </CardTitle>
              <p className="text-gray-600 text-lg">
                We're curating an extensive collection of resources to help you succeed:
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                  <FileText className="w-6 h-6 text-purple-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Past Year Presentations</h3>
                    <p className="text-sm text-gray-600">Access winning presentations and solutions from previous SIH editions</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-pink-50 rounded-lg">
                  <Video className="w-6 h-6 text-pink-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Tutorial Videos</h3>
                    <p className="text-sm text-gray-600">Step-by-step guides and expert mentorship videos</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-red-50 rounded-lg">
                  <Download className="w-6 h-6 text-red-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Downloadable Templates</h3>
                    <p className="text-sm text-gray-600">Project templates, pitch decks, and documentation formats</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Expert Mentorship</h3>
                    <p className="text-sm text-gray-600">Connect with industry experts and past SIH winners</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <Star className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Best Practices Guide</h3>
                    <p className="text-sm text-gray-600">Comprehensive guides on ideation, development, and presentation</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Time Management Tools</h3>
                    <p className="text-sm text-gray-600">Project planning templates and milestone tracking tools</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 text-center">
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 text-sm">
                  Expected Launch: Coming Soon
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notify Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Get notified when our comprehensive resource library is ready!
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Notify Me
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
