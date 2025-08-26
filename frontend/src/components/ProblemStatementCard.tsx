"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProblemStatement } from '@/types/problem-statement';
import { 
  Youtube, 
  Mail, 
  Building, 
  Users, 
  Eye,
  Code
} from 'lucide-react';

interface ProblemStatementCardProps {
  problemStatement: ProblemStatement;
  index: number;
}

export const ProblemStatementCard: React.FC<ProblemStatementCardProps> = ({ 
  problemStatement, 
  index 
}) => {
  const formatDescription = (description: string) => {
    const sections = description.split('\n\n');
    return sections.map((section, idx) => {
      if (section.startsWith('Problem Description') || section.startsWith('Problem Statement')) {
        return (
          <div key={idx} className="mb-6">
            <h4 className="font-semibold text-lg text-foreground mb-3">
              Problem Description
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {section.replace(/Problem Description\n|Problem Statement\n/, '')}
            </p>
          </div>
        );
      } else if (section.startsWith('Impact')) {
        return (
          <div key={idx} className="mb-6">
            <h4 className="font-semibold text-lg text-foreground mb-3">
              Impact
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {section.replace('Impact\n', '')}
            </p>
          </div>
        );
      } else if (section.startsWith('Expected Outcomes') || section.startsWith('Expected Solution')) {
        return (
          <div key={idx} className="mb-6">
            <h4 className="font-semibold text-lg text-foreground mb-3">
              Expected Outcomes
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {section.replace(/Expected Outcomes\n|Expected Solution\n/, '')}
            </p>
          </div>
        );
      } else if (section.includes('•')) {
        const points = section.split('•').filter(point => point.trim());
        return (
          <div key={idx} className="mb-6">
            <div className="space-y-2">
              {points.map((point, pointIdx) => (
                <div key={pointIdx} className="flex items-start text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="leading-relaxed">{point.trim()}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }
      return (
        <p key={idx} className="text-muted-foreground leading-relaxed mb-4">
          {section}
        </p>
      );
    });
  };

  const getCategoryColor = (category: string) => {
    return category === 'Software' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
      : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
  };

  const getThemeColor = (theme: string) => {
    const colors = [
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
      'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
      'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    ];
    return colors[theme.length % colors.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05
      }}
      whileHover={{ y: -2 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col bg-background border border-border hover:shadow-md transition-all duration-200">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-4">
            <Badge 
              variant="outline" 
              className="text-xs font-medium"
            >
              <Code className="w-3 h-3 mr-1" />
              ID: {problemStatement.id}
            </Badge>
            
            <Badge 
              className={`text-xs font-medium ${getCategoryColor(problemStatement.category)}`}
            >
              {problemStatement.category}
            </Badge>
          </div>
          
          <CardTitle className="text-lg font-semibold text-foreground leading-tight line-clamp-2 mb-3">
            {problemStatement.title}
          </CardTitle>
          
          <Badge 
            className={`w-fit text-xs font-medium ${getThemeColor(problemStatement.theme)}`}
          >
            {problemStatement.theme}
          </Badge>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-muted-foreground">
              <Building className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
              <span className="font-medium">{problemStatement.organization}</span>
            </div>
            
            <div className="flex items-start text-sm text-muted-foreground">
              <Users className="w-4 h-4 mr-2 mt-0.5 text-green-600 dark:text-green-400 flex-shrink-0" />
              <span className="leading-relaxed">{problemStatement.department}</span>
            </div>
          </div>

          <div className="text-sm text-muted-foreground mb-6">
            <p className="line-clamp-3">
              {problemStatement.description.split('\n')[0]}
            </p>
          </div>

          <div className="mt-auto pt-4 border-t border-border">
            <div className="flex gap-2 flex-wrap">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Read More
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-foreground mb-2">
                      {problemStatement.title}
                    </DialogTitle>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="text-xs">
                        ID: {problemStatement.id}
                      </Badge>
                      <Badge className={`text-xs ${getCategoryColor(problemStatement.category)}`}>
                        {problemStatement.category}
                      </Badge>
                      <Badge className={`text-xs ${getThemeColor(problemStatement.theme)}`}>
                        {problemStatement.theme}
                      </Badge>
                    </div>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Building className="w-4 h-4 mr-2" />
                        <span className="font-medium">{problemStatement.organization}</span>
                      </div>
                      <div className="flex items-start text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{problemStatement.department}</span>
                      </div>
                    </div>
                    
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      {formatDescription(problemStatement.description)}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button 
                variant="outline" 
                size="sm"
                className="text-xs bg-gray-600 text-white hover:bg-gray-700 border-gray-600"
              >
                <Mail className="w-3 h-3 mr-1" />
                Contact
              </Button>

              {problemStatement.youtube && (
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                  className="text-xs bg-red-600 text-white hover:bg-red-700 border-red-600"
                >
                  <a href={problemStatement.youtube} target="_blank" rel="noopener noreferrer">
                    <Youtube className="w-3 h-3 mr-1" />
                    YouTube
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};