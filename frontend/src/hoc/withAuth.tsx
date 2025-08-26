'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WithAuthProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loadingComponent?: React.ReactNode;
}

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAuthComponent = (props: P & WithAuthProps) => {
    const { user, loading } = useAuth();
    const { fallback, loadingComponent, ...restProps } = props;

    if (loading) {
      return (
        loadingComponent || (
          <div className="container mx-auto py-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          </div>
        )
      );
    }

    if (!user) {
      return (
        fallback || (
          <div className="container mx-auto py-8 px-4">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Authentication Required</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Please sign in to access this page
                </p>
                <GoogleSignInButton className="w-full" />
              </CardContent>
            </Card>
          </div>
        )
      );
    }

    return <WrappedComponent {...(restProps as P)} />;
  };

  WithAuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthComponent;
};

// Simpler hook-based approach for use within components
export const useRequireAuth = () => {
  const { user, loading } = useAuth();
  return { user, loading, isAuthenticated: !!user };
};
