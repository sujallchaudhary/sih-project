'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface WithAuthProps {
  fallback?: React.ReactNode;
}

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithAuthProps = {}
) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading } = useAuth();

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (!user) {
      return (
        options.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-md mx-4">
              <CardHeader className="text-center">
                <CardTitle>Authentication Required</CardTitle>
                <CardDescription>
                  Please sign in to access this page
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <GoogleSignInButton />
              </CardContent>
            </Card>
          </div>
        )
      );
    }

    return <WrappedComponent {...props} />;
  };
}

// Hook for checking authentication status
export function useRequireAuth() {
  const { user, loading } = useAuth();
  
  return {
    isAuthenticated: !!user,
    isLoading: loading,
    user,
  };
}
