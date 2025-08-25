"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProblemStatement } from '@/types/problem-statement';
import { ExternalLink, Youtube, Mail, Building, Users, Lightbulb, Calendar } from 'lucide-react';

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
      if (section.startsWith('Problem Statement')) {
        return (
          <div key={idx} className="mb-4">
            <h4 className="font-semibold text-lg text-blue-600 mb-2">Problem Statement</h4>
            <p className="text-gray-700 leading-relaxed">{section.replace('Problem Statement\n', '')}</p>
          </div>
        );
      } else if (section.startsWith('Background')) {
        return (
          <div key={idx} className="mb-4">
            <h4 className="font-semibold text-lg text-green-600 mb-2">Background</h4>
            <p className="text-gray-700 leading-relaxed">{section.replace('Background\n', '')}</p>
          </div>
        );
      } else if (section.startsWith('Expected Solution')) {
        return (
          <div key={idx} className="mb-4">
            <h4 className="font-semibold text-lg text-purple-600 mb-2">Expected Solution</h4>
            <p className="text-gray-700 leading-relaxed">{section.replace('Expected Solution\n', '')}</p>
          </div>
        );
      } else if (section.includes('•')) {
        const points = section.split('•').filter(point => point.trim());
        return (
          <div key={idx} className="mb-4">
            <ul className="space-y-2">
              {points.map((point, pointIdx) => (
                <li key={pointIdx} className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{point.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }
      return (
        <p key={idx} className="text-gray-700 leading-relaxed mb-4">
          {section}
        </p>
      );
    });
  };

  const getCategoryColor = (category: string) => {
    return category === 'Software' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-orange-100 text-orange-800 border-orange-200';
  };

  const getThemeColor = (theme: string) => {
    const colors = [
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-pink-100 text-pink-800 border-pink-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200',
      'bg-cyan-100 text-cyan-800 border-cyan-200',
    ];
    return colors[theme.length % colors.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-3">
            <Badge 
              variant="outline" 
              className="px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-700 border-slate-200"
            >
              ID: {problemStatement.id}
            </Badge>
            <Badge 
              variant="outline" 
              className={`px-3 py-1 text-xs font-semibold ${getCategoryColor(problemStatement.category)}`}
            >
              {problemStatement.category}
            </Badge>
          </div>
          
          <CardTitle className="text-xl font-bold text-gray-800 leading-tight line-clamp-3 group-hover:text-blue-600 transition-colors">
            {problemStatement.title}
          </CardTitle>
          
          <Badge 
            variant="outline" 
            className={`w-fit px-3 py-1 text-xs font-medium ${getThemeColor(problemStatement.theme)}`}
          >
            {problemStatement.theme}
          </Badge>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <Building className="w-4 h-4 mr-2 text-blue-500" />
              <span className="font-medium">{problemStatement.organization}</span>
            </div>
            
            <div className="flex items-start text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <span className="leading-relaxed">{problemStatement.department}</span>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex gap-2 flex-wrap">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-800 leading-tight pr-8">
                      {problemStatement.title}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6 mt-6">
                    <div className="flex flex-wrap gap-3">
                      <Badge className={`px-3 py-1 ${getCategoryColor(problemStatement.category)}`}>
                        {problemStatement.category}
                      </Badge>
                      <Badge className={`px-3 py-1 ${getThemeColor(problemStatement.theme)}`}>
                        {problemStatement.theme}
                      </Badge>
                      <Badge variant="outline" className="px-3 py-1">
                        ID: {problemStatement.id}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center text-sm">
                        <Building className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="font-semibold mr-2">Organization:</span>
                        <span>{problemStatement.organization}</span>
                      </div>
                      <div className="flex items-start text-sm">
                        <Users className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        <span className="font-semibold mr-2">Department:</span>
                        <span>{problemStatement.department}</span>
                      </div>
                    </div>

                    <div className="prose max-w-none">
                      {formatDescription(problemStatement.description)}
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                      {problemStatement.youtube && (
                        <Button 
                          asChild 
                          variant="outline" 
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <a href={problemStatement.youtube} target="_blank" rel="noopener noreferrer">
                            <Youtube className="w-4 h-4 mr-2" />
                            Video
                          </a>
                        </Button>
                      )}
                      
                      {problemStatement.contact && (
                        <Button 
                          asChild 
                          variant="outline" 
                          size="sm"
                          className="border-green-200 text-green-600 hover:bg-green-50"
                        >
                          <a href={problemStatement.contact} target="_blank" rel="noopener noreferrer">
                            <Mail className="w-4 h-4 mr-2" />
                            Contact
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {problemStatement.youtube && (
                <Button 
                  asChild 
                  variant="outline" 
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <a href={problemStatement.youtube} target="_blank" rel="noopener noreferrer">
                    <Youtube className="w-4 h-4 mr-2" />
                    Video
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
