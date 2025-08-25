"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProblemStatement } from '@/types/problem-statement';
import { FileText, Cpu, Wrench, Building } from 'lucide-react';

interface StatsComponentProps {
  problemStatements: ProblemStatement[];
  filteredCount: number;
}

export const StatsComponent: React.FC<StatsComponentProps> = ({
  problemStatements,
  filteredCount,
}) => {
  const totalProblems = problemStatements.length;
  const softwareCount = problemStatements.filter(ps => ps.category === 'Software').length;
  const hardwareCount = problemStatements.filter(ps => ps.category === 'Hardware').length;
  const organizationsCount = new Set(problemStatements.map(ps => ps.organization)).size;

  const stats = [
    {
      title: 'Total Problems',
      value: filteredCount,
      total: totalProblems,
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      title: 'Software',
      value: problemStatements.filter(ps => ps.category === 'Software').length,
      total: softwareCount,
      icon: Cpu,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      title: 'Hardware',
      value: problemStatements.filter(ps => ps.category === 'Hardware').length,
      total: hardwareCount,
      icon: Wrench,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
    {
      title: 'Organizations',
      value: organizationsCount,
      total: organizationsCount,
      icon: Building,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color}`}></div>
            
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="text-right"
                >
                  <div className={`text-3xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </div>
                  {stat.value !== stat.total && (
                    <Badge variant="outline" className="text-xs mt-1">
                      of {stat.total}
                    </Badge>
                  )}
                </motion.div>
              </div>
              
              <h3 className="text-sm font-medium text-gray-600">
                {stat.title}
              </h3>
              
              {/* Progress bar for filtered results */}
              {stat.value !== stat.total && stat.total > 0 && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(stat.value / stat.total) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                    ></motion.div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
