"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProblemStatement } from '@/types/problem-statement';
import { 
  ExternalLink, 
  Youtube, 
  Mail, 
  Building, 
  Users, 
  Lightbulb, 
  Calendar,
  Sparkles,
  Zap,
  Eye,
  Heart,
  Star,
  ArrowRight,
  Code,
  Layers
} from 'lucide-react';

interface ProblemStatementCardProps {
  problemStatement: ProblemStatement;
  index: number;
}

export const ProblemStatementCard: React.FC<ProblemStatementCardProps> = ({ 
  problemStatement, 
  index 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatDescription = (description: string) => {
    const sections = description.split('\n\n');
    return sections.map((section, idx) => {
      if (section.startsWith('Problem Description') || section.startsWith('Problem Statement')) {
        return (
          <motion.div 
            key={idx} 
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="flex items-center mb-3">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3"></div>
              <h4 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Problem Description
              </h4>
            </div>
            <p className="text-foreground/80 leading-relaxed pl-5 border-l-2 border-gradient-to-b from-blue-500/20 to-transparent">
              {section.replace(/Problem Description\n|Problem Statement\n/, '')}
            </p>
          </motion.div>
        );
      } else if (section.startsWith('Impact')) {
        return (
          <motion.div 
            key={idx} 
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="flex items-center mb-3">
              <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3"></div>
              <h4 className="font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Impact
              </h4>
            </div>
            <p className="text-foreground/80 leading-relaxed pl-5 border-l-2 border-gradient-to-b from-green-500/20 to-transparent">
              {section.replace('Impact\n', '')}
            </p>
          </motion.div>
        );
      } else if (section.startsWith('Expected Outcomes') || section.startsWith('Expected Solution')) {
        return (
          <motion.div 
            key={idx} 
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="flex items-center mb-3">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
              <h4 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Expected Outcomes
              </h4>
            </div>
            <p className="text-foreground/80 leading-relaxed pl-5 border-l-2 border-gradient-to-b from-purple-500/20 to-transparent">
              {section.replace(/Expected Outcomes\n|Expected Solution\n/, '')}
            </p>
          </motion.div>
        );
      } else if (section.includes('•')) {
        const points = section.split('•').filter(point => point.trim());
        return (
          <motion.div 
            key={idx} 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="space-y-3">
              {points.map((point, pointIdx) => (
                <motion.div
                  key={pointIdx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: pointIdx * 0.1 }}
                  className="flex items-start group"
                >
                  <motion.div
                    className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-1 mr-3 flex-shrink-0"
                    whileHover={{ scale: 1.2 }}
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(139, 92, 246, 0.7)",
                        "0 0 0 10px rgba(139, 92, 246, 0)",
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-foreground/80 group-hover:text-foreground transition-colors duration-200">
                    {point.trim()}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      }
      return (
        <motion.p 
          key={idx} 
          className="text-foreground/80 leading-relaxed mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          {section}
        </motion.p>
      );
    });
  };

  const getCategoryColor = (category: string) => {
    return category === 'Software' 
      ? 'from-emerald-500 to-cyan-500 text-white' 
      : 'from-orange-500 to-red-500 text-white';
  };

  const getThemeGradient = (theme: string) => {
    const gradients = [
      'from-violet-500 to-purple-500',
      'from-blue-500 to-indigo-500',
      'from-pink-500 to-rose-500',
      'from-cyan-500 to-blue-500',
      'from-emerald-500 to-teal-500',
      'from-amber-500 to-orange-500',
    ];
    return gradients[theme.length % gradients.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full group"
    >
      <Card className="h-full flex flex-col bg-card/50 backdrop-blur-xl border-0 overflow-hidden relative shadow-2xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-500">
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ padding: '1px' }}
        >
          <div className="w-full h-full bg-card rounded-lg" />
        </motion.div>
        
        {/* Floating gradient orbs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl translate-y-12 -translate-x-12" />
        
        {/* Top accent line */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          animate={{ 
            background: [
              "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)",
              "linear-gradient(90deg, #ec4899, #3b82f6, #8b5cf6)",
              "linear-gradient(90deg, #8b5cf6, #ec4899, #3b82f6)",
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Badge 
                variant="outline" 
                className="px-3 py-1 text-xs font-semibold bg-muted/50 backdrop-blur-sm border-border/50"
              >
                <Code className="w-3 h-3 mr-1" />
                ID: {problemStatement.id}
              </Badge>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge 
                className={`px-3 py-1 text-xs font-semibold bg-gradient-to-r ${getCategoryColor(problemStatement.category)} shadow-lg`}
              >
                <Layers className="w-3 h-3 mr-1" />
                {problemStatement.category}
              </Badge>
            </motion.div>
          </div>
          
          <CardTitle className="text-xl font-bold text-foreground leading-tight line-clamp-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 mb-4">
            {problemStatement.title}
          </CardTitle>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-fit"
          >
            <Badge 
              variant="outline" 
              className={`px-3 py-1 text-xs font-medium bg-gradient-to-r ${getThemeGradient(problemStatement.theme)} text-white border-0 shadow-md`}
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {problemStatement.theme}
            </Badge>
          </motion.div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col relative z-10">
          <div className="space-y-4 mb-6">
            <motion.div 
              className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              <Building className="w-4 h-4 mr-3 text-blue-500" />
              <span className="font-medium">{problemStatement.organization}</span>
            </motion.div>
            
            <motion.div 
              className="flex items-start text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              <Users className="w-4 h-4 mr-3 mt-0.5 text-green-500 flex-shrink-0" />
              <span className="leading-relaxed">{problemStatement.department}</span>
            </motion.div>
          </div>

          {/* Interactive buttons */}
          <div className="mt-auto pt-6 border-t border-border/50">
            <div className="flex gap-3 flex-wrap">
              <Dialog>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </motion.div>
                </DialogTrigger>
                
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-border/50">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight pr-8">
                      {problemStatement.title}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-8 mt-8">
                    <div className="flex flex-wrap gap-3">
                      <Badge className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(problemStatement.category)} shadow-lg`}>
                        <Layers className="w-4 h-4 mr-2" />
                        {problemStatement.category}
                      </Badge>
                      <Badge className={`px-4 py-2 bg-gradient-to-r ${getThemeGradient(problemStatement.theme)} text-white shadow-lg`}>
                        <Sparkles className="w-4 h-4 mr-2" />
                        {problemStatement.theme}
                      </Badge>
                      <Badge variant="outline" className="px-4 py-2 border-border/50 bg-muted/50">
                        <Code className="w-4 h-4 mr-2" />
                        ID: {problemStatement.id}
                      </Badge>
                    </div>

                    <motion.div 
                      className="grid md:grid-cols-2 gap-6 p-6 bg-muted/30 backdrop-blur-sm rounded-xl border border-border/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center text-sm">
                        <Building className="w-5 h-5 mr-3 text-blue-500" />
                        <div>
                          <span className="font-semibold text-muted-foreground">Organization:</span>
                          <p className="text-foreground">{problemStatement.organization}</p>
                        </div>
                      </div>
                      <div className="flex items-start text-sm">
                        <Users className="w-5 h-5 mr-3 mt-0.5 text-green-500 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-muted-foreground">Department:</span>
                          <p className="text-foreground">{problemStatement.department}</p>
                        </div>
                      </div>
                    </motion.div>

                    <div className="prose prose-sm max-w-none">
                      {formatDescription(problemStatement.description)}
                    </div>

                    <motion.div 
                      className="flex gap-4 pt-6 border-t border-border/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {problemStatement.youtube && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            asChild 
                            variant="outline" 
                            className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 shadow-lg"
                          >
                            <a href={problemStatement.youtube} target="_blank" rel="noopener noreferrer">
                              <Youtube className="w-4 h-4 mr-2" />
                              Watch Video
                            </a>
                          </Button>
                        </motion.div>
                      )}
                      
                      {problemStatement.contact && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            asChild 
                            variant="outline" 
                            className="border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/50 shadow-lg"
                          >
                            <a href={problemStatement.contact} target="_blank" rel="noopener noreferrer">
                              <Mail className="w-4 h-4 mr-2" />
                              Contact
                            </a>
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </DialogContent>
              </Dialog>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`border-border/50 hover:bg-accent/50 transition-all duration-300 ${
                    isLiked ? 'text-red-500 border-red-200' : 'text-muted-foreground'
                  }`}
                >
                  <motion.div
                    animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  </motion.div>
                  {isLiked ? 'Liked' : 'Like'}
                </Button>
              </motion.div>

              {problemStatement.youtube && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50"
                  >
                    <a href={problemStatement.youtube} target="_blank" rel="noopener noreferrer">
                      <Youtube className="w-4 h-4 mr-2" />
                      Video
                    </a>
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          animate={isHovered ? {
            background: [
              "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05))",
              "radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05))",
              "radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05))",
              "radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05))",
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </Card>
    </motion.div>
  );
};
