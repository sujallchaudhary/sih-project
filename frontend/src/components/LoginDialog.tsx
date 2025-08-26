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

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({
  open,
  onOpenChange,
  onSuccess,
}) => {
  const handleSuccess = () => {
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Sign in Required</DialogTitle>
          <DialogDescription className="text-center">
            Please sign in to bookmark problem statements and access personalized features.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 py-4">
          <div className="text-6xl">🔖</div>
          <p className="text-sm text-gray-600 text-center max-w-sm">
            Save your favorite problem statements and access them anytime by signing in with your Google account.
          </p>
          <Login onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
