"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, MessageCircle, Star, MapPin, Calendar } from 'lucide-react';

export default function TeamsPage() {
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
            <Users className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl font-bold text-primary mb-4">
            Team Formation
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
          <Card className="bg-card shadow-lg border overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            
            <CardHeader className="text-center pb-6">
              <div className="text-6xl mb-4">🚀</div>
              <CardTitle className="text-3xl font-bold text-foreground mb-4">
                Coming Soon!
              </CardTitle>
              <p className="text-muted-foreground text-lg">
                We're building an amazing team formation platform with the following features:
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center p-4 bg-primary/10 rounded-lg">
                  <Users className="w-6 h-6 text-primary mr-3" />
                  <div>
                    <h3 className="font-semibold text-foreground">Smart Matching</h3>
                    <p className="text-sm text-muted-foreground">AI-powered team member recommendations based on skills and interests</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-secondary/10 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-secondary-foreground mr-3" />
                  <div>
                    <h3 className="font-semibold text-foreground">Real-time Chat</h3>
                    <p className="text-sm text-muted-foreground">Communicate with potential team members instantly</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-accent/10 rounded-lg">
                  <Star className="w-6 h-6 text-accent-foreground mr-3" />
                  <div>
                    <h3 className="font-semibold text-foreground">Skill Verification</h3>
                    <p className="text-sm text-muted-foreground">Verified profiles with skill assessments and portfolio links</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-muted/50 rounded-lg">
                  <Calendar className="w-6 h-6 text-muted-foreground mr-3" />
                  <div>
                    <h3 className="font-semibold text-foreground">Event Integration</h3>
                    <p className="text-sm text-muted-foreground">Seamless integration with hackathon timelines and deadlines</p>
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
            Want to be notified when the team formation feature goes live?
          </p>
          <Button 
            size="lg" 
            variant="default"
            className="px-8 py-4"
          >
            <Plus className="w-5 h-5 mr-2" />
            Notify Me
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
