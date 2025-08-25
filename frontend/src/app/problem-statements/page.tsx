"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { problemStatementApi } from '@/lib/api';
import { ProblemStatement, FilterOptions } from '@/types/problem-statement';
import { ProblemStatementCard } from '@/components/ProblemStatementCard';
import { FilterComponent } from '@/components/FilterComponent';
import { StatsComponent } from '@/components/StatsComponent';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, RefreshCw, Sparkles, Zap } from 'lucide-react';

export default function ProblemStatementsPage() {
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>([]);
  const [filters, setFilters] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [selectedOrganization, setSelectedOrganization] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [problemStatementsResponse, filtersResponse] = await Promise.all([
          problemStatementApi.getAllProblemStatements(),
          problemStatementApi.getFilterOptions(),
        ]);

        if (problemStatementsResponse.success) {
          setProblemStatements(problemStatementsResponse.data);
        } else {
          setError('Failed to fetch problem statements');
        }

        if (filtersResponse.success) {
          setFilters(filtersResponse.data);
        } else {
          setError('Failed to fetch filter options');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter logic
  const filteredProblemStatements = useMemo(() => {
    return problemStatements.filter((ps) => {
      const matchesCategory = selectedCategory === 'all' || ps.category === selectedCategory;
      const matchesTheme = selectedTheme === 'all' || ps.theme === selectedTheme;
      const matchesOrganization = selectedOrganization === 'all' || ps.organization === selectedOrganization;
      const matchesDepartment = selectedDepartment === 'all' || ps.department === selectedDepartment;
      const matchesSearch = searchQuery === '' || 
        ps.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ps.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ps.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ps.theme.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesTheme && matchesOrganization && matchesDepartment && matchesSearch;
    });
  }, [problemStatements, selectedCategory, selectedTheme, selectedOrganization, selectedDepartment, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProblemStatements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProblemStatements.slice(startIndex, startIndex + itemsPerPage);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTheme('all');
    setSelectedOrganization('all');
    setSelectedDepartment('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await problemStatementApi.getAllProblemStatements();
      if (response.success) {
        setProblemStatements(response.data);
        setError(null);
      }
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Problem Statements</h2>
              <p className="text-gray-500">Fetching the latest challenges for you...</p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-md"
            >
              <Alert className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <Button onClick={handleRefresh} className="mt-4">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Zap className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            SIH Problem Statements
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover innovative challenges from Smart India Hackathon. Find the perfect problem statement 
            that matches your skills and passion for creating impactful solutions.
          </p>
          
          <div className="flex items-center justify-center mt-6 space-x-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-500">
              {problemStatements.length} challenges available
            </span>
            <Sparkles className="w-5 h-5 text-yellow-500" />
          </div>
        </motion.div>

        {/* Stats */}
        <StatsComponent 
          problemStatements={problemStatements}
          filteredCount={filteredProblemStatements.length}
        />

        {/* Filters */}
        <FilterComponent
          filters={filters}
          selectedCategory={selectedCategory}
          selectedTheme={selectedTheme}
          selectedOrganization={selectedOrganization}
          selectedDepartment={selectedDepartment}
          searchQuery={searchQuery}
          onCategoryChange={setSelectedCategory}
          onThemeChange={setSelectedTheme}
          onOrganizationChange={setSelectedOrganization}
          onDepartmentChange={setSelectedDepartment}
          onSearchChange={setSearchQuery}
          onClearFilters={clearFilters}
        />

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8 mt-8"
        >
          <div className="text-gray-600">
            <span className="font-medium">{filteredProblemStatements.length}</span> 
            {filteredProblemStatements.length === 1 ? ' problem statement' : ' problem statements'} found
            {filteredProblemStatements.length !== problemStatements.length && (
              <span className="text-sm text-gray-500 ml-2">
                (filtered from {problemStatements.length} total)
              </span>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </motion.div>

        {/* Problem Statements Grid */}
        <AnimatePresence mode="wait">
          {currentItems.length > 0 ? (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {currentItems.map((ps, index) => (
                <ProblemStatementCard
                  key={ps._id}
                  problemStatement={ps}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Problem Statements Found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center space-x-2 mt-12"
          >
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2"
            >
              Previous
            </Button>

            <div className="flex space-x-1">
              {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === currentPage;
                
                return (
                  <Button
                    key={pageNum}
                    variant={isActive ? "default" : "outline"}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'border-gray-200'
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2"
            >
              Next
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
