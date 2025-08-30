'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiService, ProblemStatement } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BookmarkButton from '@/components/BookmarkButton';
import AddToTeamButton from '@/components/AddToTeamButton';
import Login from '@/components/Login';
import { 
  Eye,
  Tag,
  Building,
  BookOpen,
  Clock,
  BookmarkX
} from 'lucide-react';
import Link from 'next/link';

const BookmarkedProblemCard = ({ 
  problem, 
  onBookmarkRemoved // eslint-disable-line @typescript-eslint/no-unused-vars
}: { 
  problem: ProblemStatement;
  onBookmarkRemoved: (psId: string) => void;
}) => (
  <Card className="h-full hover:shadow-lg transition-shadow flex flex-col">
    <CardHeader className="flex-shrink-0">
      <div className="flex justify-between items-start gap-2">
        <CardTitle className="text-xl leading-tight">{problem.title}</CardTitle>
        <div className="flex items-center gap-2">
          <BookmarkButton 
            psId={problem._id} 
            isBookmarked={true}
            size="icon" 
            variant="ghost"
          />
          <Badge variant={problem.difficultyLevel === 'hard' ? 'destructive' : 'secondary'}>
            {problem.difficultyLevel}
          </Badge>
        </div>
      </div>
      <CardDescription className="text-sm leading-relaxed mt-3">{problem.summary}</CardDescription>
    </CardHeader>
    <CardContent className="flex-1 flex flex-col">
      <div className="flex-1">
        {/* Organization & Department */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Building className="h-4 w-4 mr-2" />
            {problem.organization}
          </div>
          <div className="text-sm text-gray-500">{problem.department}</div>
        </div>

        {/* Theme & Category */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">{problem.theme}</Badge>
          <Badge variant="outline">{problem.category}</Badge>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Tag className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm font-medium">Tags</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {problem.tags.slice(0, 5).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {problem.tags.length > 5 && (
              <Badge variant="secondary" className="text-xs">
                +{problem.tags.length - 5} more
              </Badge>
            )}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm font-medium">Tech Stack</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {problem.techStack.slice(0, 5).map((tech, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {problem.techStack.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{problem.techStack.length - 5} more
              </Badge>
            )}
          </div>
        </div>

        {/* Updated Date */}
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <Clock className="h-3 w-3 mr-1" />
          Updated: {new Date(problem.updatedAt).toLocaleDateString()}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto pt-4">
        <div className="flex gap-2">
          <Link href={`/problems/${problem.id}`} className="flex-1">
            <Button className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </Link>
          <AddToTeamButton 
            psId={problem._id} 
            isAddedToTeam={problem.isAddedToTeam}
            showText 
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

const BookmarksPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [bookmarkedProblems, setBookmarkedProblems] = useState<ProblemStatement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    if (user) {
      fetchBookmarkedProblems(1);
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchBookmarkedProblems = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getBookmarkedProblemStatements({
        page: page,
        limit: itemsPerPage
      });
      setBookmarkedProblems(response.data);
      
      // Update pagination state
      const pagination = response.pagination;
      setCurrentPage(pagination.currentPage);
      setTotalPages(pagination.totalPages);
      setTotalCount(pagination.totalCount);
      setHasNextPage(pagination.hasNextPage);
      setHasPrevPage(pagination.hasPrevPage);
    } catch (error) {
      console.error('Error fetching bookmarked problems:', error);
      setError('Failed to load bookmarked problems');
    } finally {
      setLoading(false);
    }
  };

  const handleBookmarkRemoved = (psId: string) => {
    setBookmarkedProblems(prev => prev.filter(problem => problem._id !== psId));
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <BookmarkX className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Sign in to View Bookmarks
              </h2>
              <p className="text-gray-600 mb-6">
                Sign in to bookmark problem statements and access them here.
              </p>
              <Login onSuccess={() => window.location.reload()} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Error Loading Bookmarks
              </h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => fetchBookmarkedProblems(1)}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookmarks</h1>
          <p className="text-gray-600">
            Problem statements you&apos;ve bookmarked for easy access
          </p>
        </div>

        {/* Content */}
        {bookmarkedProblems.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <BookmarkX className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No Bookmarks Yet
              </h2>
              <p className="text-gray-600 mb-6">
                Start bookmarking problem statements to see them here.
              </p>
              <Link href="/problems">
                <Button>
                  Browse Problem Statements
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} bookmarked problem statement{totalCount !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Problem Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedProblems.map((problem) => (
                <BookmarkedProblemCard
                  key={problem.id}
                  problem={problem}
                  onBookmarkRemoved={handleBookmarkRemoved}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t">
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchBookmarkedProblems(currentPage - 1)}
                    disabled={!hasPrevPage || loading}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNumber}
                          variant={currentPage === pageNumber ? "default" : "outline"}
                          size="sm"
                          onClick={() => fetchBookmarkedProblems(pageNumber)}
                          disabled={loading}
                          className="w-8 h-8 p-0"
                        >
                          {pageNumber}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchBookmarkedProblems(currentPage + 1)}
                    disabled={!hasNextPage || loading}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
