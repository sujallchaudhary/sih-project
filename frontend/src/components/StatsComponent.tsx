"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ProblemStatement } from '@/types/problem-statement';
import { 
  Trophy, 
  Users, 
  Building2, 
  Layers3,
  TrendingUp,
  Clock,
  Target,
  Zap
} from 'lucide-react';

interface StatsComponentProps {
  problemStatements: ProblemStatement[];
  filteredCount: number;
}

export function StatsComponent({ problemStatements, filteredCount }: StatsComponentProps) {
  // Calculate stats
  const totalProblemStatements = problemStatements.length;
  const uniqueOrganizations = new Set(problemStatements.map(ps => ps.organization)).size;
  const uniqueThemes = new Set(problemStatements.map(ps => ps.theme)).size;
  const uniqueCategories = new Set(problemStatements.map(ps => ps.category)).size;

  const stats = [
    {
      label: "Total Challenges",
      value: totalProblemStatements,
      icon: Trophy,
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
      description: "Active problem statements"
    },
    {
      label: "Organizations",
      value: uniqueOrganizations,
      icon: Building2,
      bgColor: "bg-secondary/10",
      iconColor: "text-secondary-foreground",
      description: "Government & private entities"
    },
    {
      label: "Themes",
      value: uniqueThemes,
      icon: Layers3,
      bgColor: "bg-accent/10",
      iconColor: "text-accent-foreground",
      description: "Problem domains"
    },
    {
      label: "Categories",
      value: uniqueCategories,
      icon: Target,
      bgColor: "bg-muted/50",
      iconColor: "text-muted-foreground",
      description: "Challenge types"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-16"
    >
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1 + 0.3,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              {/* Background hover effect */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
              
              <div className={`relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 transition-all duration-300 group-hover:border-border shadow-lg hover:shadow-xl ${stat.bgColor}`}>
                {/* Icon */}
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`p-3 rounded-xl ${stat.bgColor} shadow-lg`}
                  >
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </motion.div>
                  
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                </div>

                {/* Value */}
                <motion.div 
                  className="mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 + 0.5,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <span className={`text-4xl font-bold ${stat.iconColor}`}>
                    {stat.value.toLocaleString()}
                  </span>
                </motion.div>

                {/* Label */}
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-foreground/90 transition-colors">
                  {stat.label}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                  {stat.description}
                </p>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 rounded-2xl ${stat.bgColor} opacity-50 animate-pulse`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Filtered Results Indicator */}
      {filteredCount !== totalProblemStatements && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center justify-center"
        >
          <div className="bg-primary/10 border border-primary/20 rounded-2xl px-6 py-4 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </motion.div>
              
              <div className="text-center">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-amber-700 dark:text-amber-400">
                    {filteredCount}
                  </span>
                  <span className="text-sm text-muted-foreground">of</span>
                  <span className="text-lg font-bold text-muted-foreground">
                    {totalProblemStatements}
                  </span>
                  <span className="text-sm text-muted-foreground">challenges shown</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Results filtered based on your criteria
                </p>
              </div>
              
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-5 h-5 text-amber-600" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Real-time indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex items-center justify-center mt-6"
      >
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 bg-green-500 rounded-full"
          />
          <Clock className="w-3 h-3" />
          <span>Real-time data • Updated continuously</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
