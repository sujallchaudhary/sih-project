"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal,
  ChevronsLeft,
  ChevronsRight,
  Zap
} from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  loading?: boolean;
}

export const AnimatedPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 12,
  loading = false
}) => {
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems || 0);

  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center space-y-6 mt-12"
    >
      {/* Stats */}
      {totalItems && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <Badge 
            variant="outline" 
            className="px-4 py-2 bg-background/50 backdrop-blur-sm border-border/50 text-muted-foreground"
          >
            <Zap className="w-4 h-4 mr-2 text-purple-500" />
            Showing {startItem}-{endItem} of {totalItems} results
          </Badge>
        </motion.div>
      )}

      {/* Pagination Controls */}
      <motion.div
        className="flex items-center space-x-2 bg-background/50 backdrop-blur-xl border border-border/50 rounded-2xl p-2 shadow-2xl shadow-primary/5"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* First Page */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1 || loading}
            className="w-10 h-10 rounded-xl border-0 hover:bg-accent/50 disabled:opacity-30 transition-all duration-300"
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Previous Page */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="w-10 h-10 rounded-xl border-0 hover:bg-accent/50 disabled:opacity-30 transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Page Numbers */}
        <div className="flex space-x-1">
          <AnimatePresence mode="wait">
            {visiblePages.map((page, index) => (
              <motion.div
                key={`${page}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                {page === "..." ? (
                  <div className="flex items-center justify-center w-10 h-10">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <Button
                      variant={currentPage === page ? "default" : "ghost"}
                      size="sm"
                      onClick={() => onPageChange(page as number)}
                      disabled={loading}
                      className={`w-10 h-10 rounded-xl transition-all duration-300 relative overflow-hidden ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 border-0'
                          : 'border-0 hover:bg-accent/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span className="relative z-10">{page}</span>
                      
                      {/* Animated background for active page */}
                      {currentPage === page && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                          animate={{
                            background: [
                              "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)",
                              "linear-gradient(90deg, #ec4899, #3b82f6, #8b5cf6)",
                              "linear-gradient(90deg, #8b5cf6, #ec4899, #3b82f6)",
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                      
                      {/* Hover effect */}
                      {currentPage !== page && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ opacity: 1 }}
                        />
                      )}
                    </Button>
                    
                    {/* Active page indicator */}
                    {currentPage === page && (
                      <motion.div
                        layoutId="activePage"
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Next Page */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="w-10 h-10 rounded-xl border-0 hover:bg-accent/50 disabled:opacity-30 transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Last Page */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages || loading}
            className="w-10 h-10 rounded-xl border-0 hover:bg-accent/50 disabled:opacity-30 transition-all duration-300"
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Loading indicator */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center space-x-2 text-muted-foreground"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            />
            <span className="text-sm">Loading...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
