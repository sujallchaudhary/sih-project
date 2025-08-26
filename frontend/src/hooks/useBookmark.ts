'use client';

import { useState, useCallback } from 'react';
import { apiService } from '@/lib/api';
import { toast } from 'sonner';

export interface UseBookmarkReturn {
  isBookmarked: boolean;
  isLoading: boolean;
  toggleBookmark: () => Promise<void>;
  setIsBookmarked: (bookmarked: boolean) => void;
}

export const useBookmark = (psId: string, initialBookmarked: boolean = false): UseBookmarkReturn => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  const toggleBookmark = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (isBookmarked) {
        await apiService.removeBookmark(psId);
        setIsBookmarked(false);
        toast.success('Bookmark removed');
      } else {
        await apiService.bookmarkProblemStatement(psId);
        setIsBookmarked(true);
        toast.success('Problem statement bookmarked');
      }
    } catch (error) {
      console.error('Bookmark operation failed:', error);
      toast.error('Bookmark operation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [psId, isBookmarked, isLoading]);

  return {
    isBookmarked,
    isLoading,
    toggleBookmark,
    setIsBookmarked,
  };
};

export default useBookmark;
