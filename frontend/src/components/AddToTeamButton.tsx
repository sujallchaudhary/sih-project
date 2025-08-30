'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, UserCheck } from 'lucide-react';
import { useAuthDialog } from '@/hooks/useAuthDialog';
import AuthDialog from './AuthDialog';
import api from '@/lib/api';
import { toast } from 'sonner';

interface AddToTeamButtonProps {
  psId: string;
  isAddedToTeam?: boolean;
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showText?: boolean;
}

const AddToTeamButton: React.FC<AddToTeamButtonProps> = ({
  psId,
  isAddedToTeam: initialAddedToTeam = false,
  variant = 'outline',
  size = 'sm',
  className = '',
  showText = true,
}) => {
  const { showAuthDialog, closeAuthDialog, requireAuth } = useAuthDialog();
  const [isAddedToTeam, setIsAddedToTeam] = useState(initialAddedToTeam);
  const [isLoading, setIsLoading] = useState(false);

  // Update state when prop changes
  useEffect(() => {
    setIsAddedToTeam(initialAddedToTeam);
  }, [initialAddedToTeam]);

  const handleLoginSuccess = () => {
    // After successful login, the user can retry the team action
    closeAuthDialog();
  };

  const handleToggleTeam = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling

    requireAuth(async () => {
      setIsLoading(true);
      try {
        if (isAddedToTeam) {
          // Remove from team
          const response = await api.delete('/ps/team', { data: { psId } });
          if (response.data.success) {
            setIsAddedToTeam(false);
            toast.success('Problem statement removed from team!');
          } else {
            toast.error(response.data.message || 'Failed to remove problem statement');
          }
        } else {
          // Add to team
          const response = await api.post('/ps/team', { psId });
          if (response.data.success) {
            setIsAddedToTeam(true);
            toast.success('Problem statement added to team!');
          } else {
            toast.error(response.data.message || 'Failed to add problem statement');
          }
        }
      } catch (error: unknown) {
        console.error('Error toggling team status:', error);
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as { response?: { status?: number; data?: { message?: string } } };
          if (axiosError.response?.status === 400) {
            toast.error(axiosError.response.data?.message || 'Operation failed');
          } else {
            toast.error('Failed to update team status');
          }
        } else {
          toast.error('Failed to update team status');
        }
      } finally {
        setIsLoading(false);
      }
    });
  };

  const buttonText = () => {
    if (isLoading) return 'Loading...';
    if (isAddedToTeam) return 'Added to Team';
    return 'Add to Team';
  };

  const buttonVariant = isAddedToTeam ? 'default' : variant;
  const IconComponent = isAddedToTeam ? UserCheck : UserPlus;

  return (
    <>
      <Button
        onClick={handleToggleTeam}
        disabled={isLoading}
        variant={buttonVariant}
        size={size}
        className={className}
        title={buttonText()}
      >
        <IconComponent className="h-4 w-4" />
        {showText && (
          <span className="ml-2">
            {buttonText()}
          </span>
        )}
      </Button>

      <AuthDialog
        open={showAuthDialog}
        onOpenChange={closeAuthDialog}
        onSuccess={handleLoginSuccess}
        feature="team"
        title="Sign in to Add to Team"
        description="Please sign in to add problem statements to your team and collaborate with others."
      />
    </>
  );
};

export default AddToTeamButton;
