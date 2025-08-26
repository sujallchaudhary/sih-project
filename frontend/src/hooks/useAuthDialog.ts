'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface UseAuthDialogReturn {
  showAuthDialog: boolean;
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
  requireAuth: (callback: () => void) => void;
}

export const useAuthDialog = (): UseAuthDialogReturn => {
  const { user } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const openAuthDialog = () => setShowAuthDialog(true);
  const closeAuthDialog = () => setShowAuthDialog(false);

  const requireAuth = (callback: () => void) => {
    if (user) {
      callback();
    } else {
      openAuthDialog();
    }
  };

  return {
    showAuthDialog,
    openAuthDialog,
    closeAuthDialog,
    requireAuth,
  };
};

export default useAuthDialog;
