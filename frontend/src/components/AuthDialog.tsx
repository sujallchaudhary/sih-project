'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Login from './Login';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  title?: string;
  description?: string;
  feature?: string;
}

const AuthDialog: React.FC<AuthDialogProps> = ({
  open,
  onOpenChange,
  onSuccess,
  title = 'Sign in Required',
  description,
  feature = 'this feature',
}) => {
  const defaultDescription = `Please sign in to access ${feature} and unlock personalized features.`;

  const handleSuccess = () => {
    onOpenChange(false);
    onSuccess?.();
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'bookmark':
      case 'bookmarking':
        return '🔖';
      case 'team':
      case 'teams':
        return '👥';
      case 'profile':
        return '👤';
      default:
        return '🔐';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description || defaultDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 py-4">
          <div className="text-6xl">{getFeatureIcon(feature)}</div>
          <p className="text-sm text-gray-600 text-center max-w-sm">
            {feature === 'bookmark' || feature === 'bookmarking' 
              ? 'Save your favorite problem statements and access them anytime by signing in with your Google account.'
              : 'Get access to personalized features and save your progress by signing in with your Google account.'
            }
          </p>
          <Login onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
