"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { problemStatementApi } from '@/lib/api';
import { ProblemStatement, FilterOptions } from '@/types/problem-statement';
import { ProblemStatementCard } from '@/components/ProblemStatementCard';
import { FilterComponent } from '@/components/FilterComponent';
import { StatsComponent } from '@/components/StatsComponent';
import { AnimatedPagination } from '@/components/AnimatedPagination';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  RefreshCw, 
  Sparkles, 
  Rocket,
  Stars,
  Globe,
  Activity
} from 'lucide-react';

export default function ProblemStatementsPage() {
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>([]);
  const [filters, setFilters] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [selectedOrganization, setSelectedOrganization] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination and stats
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [filteredCount, setFilteredCount] = useState(0);
  const itemsPerPage = 10;

  // Fetch problem statements with pagination and filters
  const fetchProblemStatements = useCallback(async (page: number = currentPage) => {
    try {
      setPaginationLoading(true);
      setError(null);

      const response = await problemStatementApi.searchProblemStatements(
        searchQuery,
        {
          category: selectedCategory,
          theme: selectedTheme,
          organization: selectedOrganization,
          department: selectedDepartment,
          difficulty: selectedDifficulty,
          tags: selectedTags.join(','),
          techStack: selectedTechStack.join(','),
        },
        page,
        itemsPerPage
      );

      if (response.success) {
        setProblemStatements(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
        setTotalItems(response.pagination?.total || response.data.length);
        setFilteredCount(response.filters?.totalFiltered || response.data.length);
        setCurrentPage(page);
      } else {
        setError('Failed to fetch problem statements');
      }
    } catch (err) {
      setError('An error occurred while fetching problem statements');
      console.error('Error fetching problem statements:', err);
    } finally {
      setPaginationLoading(false);
    }
  }, [currentPage, searchQuery, selectedCategory, selectedTheme, selectedOrganization, selectedDepartment, selectedDifficulty, selectedTags, selectedTechStack, itemsPerPage]);

  // Fetch initial data and filters
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [filtersResponse] = await Promise.all([
          problemStatementApi.getFilterOptions(),
        ]);

        if (filtersResponse.success) {
          setFilters(filtersResponse.data);
        } else {
          setError('Failed to fetch filter options');
        }

        // Fetch first page
        await fetchProblemStatements(1);
      } catch (err) {
        setError('An error occurred while fetching data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [fetchProblemStatements]);

  // Effect for filter changes
  useEffect(() => {
    if (!loading) {
      setCurrentPage(1);
      fetchProblemStatements(1);
    }
  }, [loading, fetchProblemStatements]);

  // Effect for filter parameter changes
  useEffect(() => {
    if (!loading) {
      setCurrentPage(1);
      fetchProblemStatements(1);
    }
  }, [selectedCategory, selectedTheme, selectedOrganization, selectedDepartment, selectedDifficulty, selectedTags, selectedTechStack, searchQuery, loading, fetchProblemStatements]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTheme('all');
    setSelectedOrganization('all');
    setSelectedDepartment('all');
    setSelectedDifficulty('all');
    setSelectedTags([]);
    setSelectedTechStack([]);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleRefresh = async () => {
    await fetchProblemStatements(currentPage);
  };

  const handlePageChange = (page: number) => {
    fetchProblemStatements(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto relative"
              >
                <div className="w-20 h-20 border-4 border-primary/20 rounded-full"></div>
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-primary rounded-full"></div>
              </motion.div>
              
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-primary">
                  Loading Problem Statements
                </h2>
                <p className="text-muted-foreground">Fetching the latest challenges for you...</p>
              </div>
              
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex justify-center space-x-2"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      backgroundColor: [
                        "rgb(59, 130, 246)",
                        "rgb(139, 92, 246)", 
                        "rgb(236, 72, 153)",
                        "rgb(59, 130, 246)"
                      ]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      delay: i * 0.2 
                    }}
                    className="w-3 h-3 rounded-full bg-blue-500"
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-md space-y-6"
            >
              <div className="text-6xl mb-4">😞</div>
              <Alert className="border-destructive/50 bg-destructive/5">
                <AlertDescription className="text-center">{error}</AlertDescription>
              </Alert>
              <Button 
                onClick={handleRefresh} 
                variant="default"
              >
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center justify-center p-4 bg-primary rounded-2xl mb-8 shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ 
              duration: 0.3
            }}
          >
            <Rocket className="w-10 h-10 text-primary-foreground" />
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary">
              Problem Statements
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover groundbreaking challenges from Smart India Hackathon 2025. 
            Find problems that ignite your passion and drive innovation across India.
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <Stars className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-muted-foreground">
                 Innovation Challenges
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-muted-foreground">
                Pan-India Impact
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-muted-foreground">
                Live Challenges
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <StatsComponent 
          totalCount={totalItems}
          filteredCount={filteredCount}
          filters={filters}
        />

        {/* Filters */}
        <FilterComponent
          filters={filters}
          selectedCategory={selectedCategory}
          selectedTheme={selectedTheme}
          selectedOrganization={selectedOrganization}
          selectedDepartment={selectedDepartment}
          selectedDifficulty={selectedDifficulty}
          selectedTags={selectedTags}
          selectedTechStack={selectedTechStack}
          searchQuery={searchQuery}
          onCategoryChange={setSelectedCategory}
          onThemeChange={setSelectedTheme}
          onOrganizationChange={setSelectedOrganization}
          onDepartmentChange={setSelectedDepartment}
          onDifficultyChange={setSelectedDifficulty}
          onTagsChange={setSelectedTags}
          onTechStackChange={setSelectedTechStack}
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
          <div className="text-muted-foreground">
            <span className="font-medium text-foreground">{totalItems}</span> 
            {totalItems === 1 ? ' problem statement' : ' problem statements'} found
            {filteredCount !== totalItems && (
              <span className="text-sm text-muted-foreground ml-2">
                (filtered from {filteredCount} total)
              </span>
            )}
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={paginationLoading}
              className="border-primary/20 text-primary hover:bg-primary/5 backdrop-blur-sm"
            >
              <motion.div
                animate={paginationLoading ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: paginationLoading ? Infinity : 0, ease: "linear" }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
              </motion.div>
              Refresh
            </Button>
          </motion.div>
        </motion.div>

        {/* Problem Statements Grid */}
        <AnimatePresence mode="wait">
          {problemStatements.length > 0 ? (
            <motion.div
              key={`page-${currentPage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {problemStatements.map((ps, index) => (
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
              className="text-center py-20"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-8xl mb-6"
              >
                🔍
              </motion.div>
              <h3 className="text-2xl font-bold text-foreground mb-3">No Problem Statements Found</h3>
              {/* <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                We couldn't find any challenges matching your criteria. Try adjusting your filters or search terms.
              </p> */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={clearFilters} 
                  variant="default"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        <AnimatedPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          loading={paginationLoading}
        />
      </div>
    </div>
  );
}
