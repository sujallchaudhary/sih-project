"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilterOptions } from '@/types/problem-statement';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  X, 
  SlidersHorizontal,
  Sparkles,
  RefreshCw,
  ChevronDown,
  Building2,
  Layers3,
  Tag,
  Users
} from 'lucide-react';

interface FilterComponentProps {
  filters: FilterOptions | null;
  selectedCategory: string;
  selectedTheme: string;
  selectedOrganization: string;
  selectedDepartment: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onThemeChange: (theme: string) => void;
  onOrganizationChange: (organization: string) => void;
  onDepartmentChange: (department: string) => void;
  onSearchChange: (search: string) => void;
  onClearFilters: () => void;
}

export function FilterComponent({
  filters,
  selectedCategory,
  selectedTheme,
  selectedOrganization,
  selectedDepartment,
  searchQuery,
  onCategoryChange,
  onThemeChange,
  onOrganizationChange,
  onDepartmentChange,
  onSearchChange,
  onClearFilters,
}: FilterComponentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedTheme !== 'all' || 
    selectedOrganization !== 'all' || 
    selectedDepartment !== 'all' || 
    searchQuery !== '';

  const activeFilterCount = [
    selectedCategory !== 'all',
    selectedTheme !== 'all',
    selectedOrganization !== 'all',
    selectedDepartment !== 'all',
    searchQuery !== ''
  ].filter(Boolean).length;

  const filterSections = [
    {
      label: "Category",
      icon: Tag,
      value: selectedCategory,
      onChange: onCategoryChange,
      options: filters?.categories || [],
      placeholder: "Select category"
    },
    {
      label: "Theme",
      icon: Layers3,
      value: selectedTheme,
      onChange: onThemeChange,
      options: filters?.themes || [],
      placeholder: "Select theme"
    },
    {
      label: "Organization",
      icon: Building2,
      value: selectedOrganization,
      onChange: onOrganizationChange,
      options: filters?.organizations || [],
      placeholder: "Select organization"
    },
    {
      label: "Department",
      icon: Users,
      value: selectedDepartment,
      onChange: onDepartmentChange,
      options: filters?.departments || [],
      placeholder: "Select department"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      {/* Main Filter Container */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="p-3 bg-primary rounded-2xl shadow-lg">
              <SlidersHorizontal className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Smart Filters</h2>
              <p className="text-muted-foreground">Find your perfect challenge</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center space-x-3"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {activeFilterCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center space-x-2"
              >
                <Badge 
                  variant="secondary" 
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  <Filter className="w-3 h-3 mr-1" />
                  {activeFilterCount} active
                </Badge>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onClearFilters}
                    className="text-xs border-destructive/20 text-destructive hover:bg-destructive/5"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Clear
                  </Button>
                </motion.div>
              </motion.div>
            )}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="border-primary/20 text-primary hover:bg-primary/5"
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 mr-1" />
                </motion.div>
                {isExpanded ? 'Less' : 'More'}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative mb-8"
        >
          <div className={`relative transition-all duration-300 ${searchFocused ? 'transform scale-[1.02]' : ''}`}>
            <motion.div
              animate={{
                boxShadow: searchFocused 
                  ? "0 0 30px rgba(59, 130, 246, 0.3)" 
                  : "0 0 0px rgba(59, 130, 246, 0)"
              }}
              className="relative"
            >
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                searchFocused ? 'text-blue-500' : 'text-muted-foreground'
              }`} />
              
              <Input
                placeholder="Search problem statements, organizations, themes..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="pl-12 pr-4 py-4 text-lg bg-background/50 border-border/50 rounded-2xl focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
              
              {searchQuery && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onSearchChange('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-muted-foreground/10 hover:bg-muted-foreground/20 transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Category Pills */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Quick Categories</h3>
          <div className="flex flex-wrap gap-3">
            {['all', ...(filters?.categories || [])].slice(0, 6).map((category, index) => (
              <motion.div
                key={category}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCategoryChange(category)}
                  className={`transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'border-border/50 hover:border-border hover:bg-muted/50'
                  }`}
                >
                  {category === 'all' ? (
                    <>
                      <Sparkles className="w-3 h-3 mr-1" />
                      All Categories
                    </>
                  ) : (
                    category
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t border-border/50 pt-8">
                <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Advanced Filters
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filterSections.map((section, index) => {
                    const Icon = section.icon;
                    
                    return (
                      <motion.div
                        key={section.label}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="space-y-3"
                      >
                        <label className="text-sm font-medium text-foreground flex items-center">
                          <Icon className="w-4 h-4 mr-2 text-muted-foreground" />
                          {section.label}
                        </label>
                        
                        <Select
                          value={section.value}
                          onValueChange={section.onChange}
                        >
                          <SelectTrigger className="w-full bg-background/50 border-border/50 rounded-xl hover:border-border transition-colors">
                            <SelectValue placeholder={section.placeholder} />
                          </SelectTrigger>
                          <SelectContent className="bg-background/95 backdrop-blur-xl border-border/50 rounded-xl">
                            <SelectItem value="all" className="rounded-lg">
                              All {section.label}s
                            </SelectItem>
                            {section.options.map((option) => (
                              <SelectItem 
                                key={option} 
                                value={option}
                                className="rounded-lg"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8 pt-6 border-t border-border/50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Active Filters</h3>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="text-xs text-destructive hover:text-destructive hover:bg-destructive/5"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Reset All
                </Button>
              </motion.div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Badge 
                    variant="secondary"
                    className="bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200/50"
                  >
                    <Search className="w-3 h-3 mr-1" />
                    "{searchQuery}"
                    <button
                      onClick={() => onSearchChange('')}
                      className="ml-2 hover:bg-blue-500/20 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                </motion.div>
              )}
              
              {selectedCategory !== 'all' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Badge 
                    variant="secondary"
                    className="bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-200/50"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {selectedCategory}
                    <button
                      onClick={() => onCategoryChange('all')}
                      className="ml-2 hover:bg-purple-500/20 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                </motion.div>
              )}
              
              {selectedTheme !== 'all' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Badge 
                    variant="secondary"
                    className="bg-green-500/10 text-green-700 dark:text-green-300 border-green-200/50"
                  >
                    <Layers3 className="w-3 h-3 mr-1" />
                    {selectedTheme}
                    <button
                      onClick={() => onThemeChange('all')}
                      className="ml-2 hover:bg-green-500/20 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                </motion.div>
              )}
              
              {selectedOrganization !== 'all' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Badge 
                    variant="secondary"
                    className="bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-200/50"
                  >
                    <Building2 className="w-3 h-3 mr-1" />
                    {selectedOrganization}
                    <button
                      onClick={() => onOrganizationChange('all')}
                      className="ml-2 hover:bg-orange-500/20 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                </motion.div>
              )}
              
              {selectedDepartment !== 'all' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Badge 
                    variant="secondary"
                    className="bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-200/50"
                  >
                    <Users className="w-3 h-3 mr-1" />
                    {selectedDepartment}
                    <button
                      onClick={() => onDepartmentChange('all')}
                      className="ml-2 hover:bg-pink-500/20 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
