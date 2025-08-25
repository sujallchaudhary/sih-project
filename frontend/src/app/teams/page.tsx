"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, MessageCircle, Star, MapPin, Calendar } from 'lucide-react';

export default function TeamsPage() {
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
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Team Formation
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with talented individuals, form amazing teams, and collaborate on innovative solutions.
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
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
            
            <CardHeader className="text-center pb-6">
              <div className="text-6xl mb-4">🚀</div>
              <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
                Coming Soon!
              </CardTitle>
              <p className="text-gray-600 text-lg">
                We're building an amazing team formation platform with the following features:
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <Users className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Smart Matching</h3>
                    <p className="text-sm text-gray-600">AI-powered team member recommendations based on skills and interests</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Real-time Chat</h3>
                    <p className="text-sm text-gray-600">Communicate with potential team members instantly</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                  <Star className="w-6 h-6 text-purple-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Skill Verification</h3>
                    <p className="text-sm text-gray-600">Verified profiles with skill assessments and portfolio links</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-orange-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Event Integration</h3>
                    <p className="text-sm text-gray-600">Seamless integration with hackathon timelines and deadlines</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 text-center">
                <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 text-sm">
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
            Want to be notified when the team formation feature goes live?
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4"
          >
            <Plus className="w-5 h-5 mr-2" />
            Notify Me
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
