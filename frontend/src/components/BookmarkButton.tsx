'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useBookmark } from '@/hooks/useBookmark';
import { useAuthDialog } from '@/hooks/useAuthDialog';
import { toast } from 'sonner';
import AuthDialog from './AuthDialog';

interface BookmarkButtonProps {
  psId: string;
  isBookmarked?: boolean;
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showText?: boolean;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  psId,
  isBookmarked: initialBookmarked = false,
  variant = 'outline',
  size = 'sm',
  className = '',
  showText = false,
}) => {
  const { user } = useAuth();
  const { isBookmarked, isLoading, toggleBookmark, setIsBookmarked } = useBookmark(psId, initialBookmarked);
  const { showAuthDialog, closeAuthDialog, requireAuth } = useAuthDialog();

  // Update bookmark state when initialBookmarked changes (from API response)
  React.useEffect(() => {
    setIsBookmarked(initialBookmarked);
  }, [initialBookmarked, setIsBookmarked]);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    
    requireAuth(async () => {
      await toggleBookmark();
    });
  };

  const handleLoginSuccess = () => {
    // After successful login, the bookmark button will automatically update
    // due to the auth context changes
    toast.success('Welcome! You can now bookmark problem statements.');
  };

  const BookmarkIcon = isBookmarked ? BookmarkCheck : Bookmark;
  const buttonText = isBookmarked ? 'Bookmarked' : 'Bookmark';

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleBookmark}
        disabled={isLoading}
        className={`${className} ${isBookmarked ? 'text-orange-600 border-orange-600' : ''}`}
        title={user ? buttonText : 'Sign in to bookmark'}
      >
        <BookmarkIcon 
          className={`h-4 w-4 ${showText ? 'mr-2' : ''} ${isBookmarked ? 'fill-current' : ''}`} 
        />
        {showText && (
          <span className="hidden sm:inline">
            {isLoading ? 'Loading...' : buttonText}
          </span>
        )}
      </Button>

      <AuthDialog
        open={showAuthDialog}
        onOpenChange={closeAuthDialog}
        onSuccess={handleLoginSuccess}
        feature="bookmark"
        title="Sign in to Bookmark"
        description="Please sign in to bookmark problem statements and access them later."
      />
    </>
  );
};

export default BookmarkButton;
