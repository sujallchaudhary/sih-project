"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, Target, Calendar, Award } from 'lucide-react';

export default function DashboardPage() {
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
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-full mb-6">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Dashboard
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Track your progress, manage your team, and monitor your hackathon journey in one place.
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
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"></div>
            
            <CardHeader className="text-center pb-6">
              <div className="text-6xl mb-4">📊</div>
              <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
                Analytics Dashboard Coming Soon!
              </CardTitle>
              <p className="text-gray-600 text-lg">
                We're building a comprehensive dashboard with powerful features:
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Progress Tracking</h3>
                    <p className="text-sm text-gray-600">Monitor your team's development progress and milestones</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-red-50 rounded-lg">
                  <Users className="w-6 h-6 text-red-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Team Management</h3>
                    <p className="text-sm text-gray-600">Manage team members, roles, and collaboration tools</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-pink-50 rounded-lg">
                  <Target className="w-6 h-6 text-pink-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Goal Setting</h3>
                    <p className="text-sm text-gray-600">Set and track project goals and deadlines</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Timeline Management</h3>
                    <p className="text-sm text-gray-600">Integrated calendar with hackathon schedules and deadlines</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <Award className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Achievement Tracking</h3>
                    <p className="text-sm text-gray-600">Track submissions, evaluations, and competition results</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Analytics & Insights</h3>
                    <p className="text-sm text-gray-600">Detailed analytics on performance and improvement areas</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 text-center">
                <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 text-sm">
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
            Be the first to access our powerful dashboard when it launches!
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Notify Me
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
