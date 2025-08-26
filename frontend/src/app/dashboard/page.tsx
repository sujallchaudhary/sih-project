"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, Target, Calendar, Award } from 'lucide-react';
import { withAuth } from '@/hoc/withAuth';

function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-primary rounded-full mb-6">
            <BarChart3 className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl font-bold text-primary mb-4">
            Dashboard
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
          <Card className="bg-card shadow-lg border overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            
            <CardHeader className="text-center pb-6">
              <div className="text-6xl mb-4">📊</div>
              <CardTitle className="text-3xl font-bold text-foreground mb-4">
                Analytics Dashboard Coming Soon!
              </CardTitle>
              <p className="text-muted-foreground text-lg">
                We're building a comprehensive dashboard with powerful features:
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center p-4 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary mr-3" />
                  <div>
                    <h3 className="font-semibold text-foreground">Progress Tracking</h3>
                    <p className="text-sm text-muted-foreground">Monitor your team's development progress and milestones</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-secondary/10 rounded-lg">
                  <Users className="w-6 h-6 text-secondary-foreground mr-3" />
                  <div>
                    <h3 className="font-semibold text-foreground">Team Management</h3>
                    <p className="text-sm text-muted-foreground">Manage team members, roles, and collaboration tools</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-accent/10 rounded-lg">
                  <Target className="w-6 h-6 text-accent-foreground mr-3" />
                  <div>
                    <h3 className="font-semibold text-foreground">Goal Setting</h3>
                    <p className="text-sm text-muted-foreground">Set and track project goals and deadlines</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-muted/50 rounded-lg">
                  <Calendar className="w-6 h-6 text-primary mr-3" />
                  <div>
                    <h3 className="font-semibold text-foreground">Timeline Management</h3>
                    <p className="text-sm text-muted-foreground">Integrated calendar with hackathon schedules and deadlines</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-secondary/10 rounded-lg">
                  <Award className="w-6 h-6 text-secondary-foreground mr-3" />
                  <div>
                    <h3 className="font-semibold text-foreground">Achievement Tracking</h3>
                    <p className="text-sm text-muted-foreground">Track submissions, evaluations, and competition results</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-accent/10 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-accent-foreground mr-3" />
                  <div>
                    <h3 className="font-semibold text-foreground">Analytics & Insights</h3>
                    <p className="text-sm text-muted-foreground">Detailed analytics on performance and improvement areas</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 text-center">
                <Badge className="bg-primary text-primary-foreground px-4 py-2 text-sm">
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
          <p className="text-muted-foreground mb-6">
            Be the first to access our powerful dashboard when it launches!
          </p>
          <Button 
            size="lg" 
            variant="default"
            className="px-8 py-4"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Notify Me
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default withAuth(DashboardPage);
