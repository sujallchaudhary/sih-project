'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import AuthDialog from './AuthDialog';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  feature?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback,
  feature = 'this page'
}) => {
  const { user, loading } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return fallback || (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">
            Please sign in to access {feature}.
          </p>
          <Button onClick={() => setShowAuthDialog(true)}>
            Sign In with Google
          </Button>
          
          <AuthDialog
            open={showAuthDialog}
            onOpenChange={setShowAuthDialog}
            feature={feature}
            title="Sign in Required"
            description={`Please sign in to access ${feature} and unlock personalized features.`}
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
