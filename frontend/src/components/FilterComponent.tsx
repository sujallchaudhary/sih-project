"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterOptions } from '@/types/problem-statement';
import { Search, Filter, X, Sparkles } from 'lucide-react';

interface FilterComponentProps {
  filters: FilterOptions | null;
  selectedCategory: string;
  selectedTheme: string;
  selectedOrganization: string;
  selectedDepartment: string;
  searchQuery: string;
  onCategoryChange: (value: string) => void;
  onThemeChange: (value: string) => void;
  onOrganizationChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
}

export const FilterComponent: React.FC<FilterComponentProps> = ({
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
}) => {
  const hasActiveFilters = selectedCategory !== 'all' || 
                          selectedTheme !== 'all' || 
                          selectedOrganization !== 'all' || 
                          selectedDepartment !== 'all' || 
                          searchQuery.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white shadow-lg border-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
        
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-xl font-bold text-gray-800">
            <Filter className="w-5 h-5 mr-2 text-purple-600" />
            Filter Problem Statements
            <Sparkles className="w-4 h-4 ml-2 text-yellow-500" />
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search problem statements..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            />
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {filters?.categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Theme</label>
              <Select value={selectedTheme} onValueChange={onThemeChange}>
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="All Themes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Themes</SelectItem>
                  {filters?.themes.map((theme) => (
                    <SelectItem key={theme} value={theme}>
                      {theme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Organization</label>
              <Select value={selectedOrganization} onValueChange={onOrganizationChange}>
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="All Organizations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Organizations</SelectItem>
                  {filters?.organizations.map((org) => (
                    <SelectItem key={org} value={org}>
                      {org}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {filters?.departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters & Clear Button */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100"
            >
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Search: "{searchQuery}"
                  </Badge>
                )}
                {selectedCategory !== 'all' && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {selectedCategory}
                  </Badge>
                )}
                {selectedTheme !== 'all' && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {selectedTheme}
                  </Badge>
                )}
                {selectedOrganization !== 'all' && (
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {selectedOrganization}
                  </Badge>
                )}
                {selectedDepartment !== 'all' && (
                  <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                    {selectedDepartment}
                  </Badge>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="ml-4 border-red-200 text-red-600 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
