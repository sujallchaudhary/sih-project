'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthDialog } from '@/hooks/useAuthDialog';
import AuthDialog from '@/components/AuthDialog';
import BookmarkButton from '@/components/BookmarkButton';

const AuthDialogDemo = () => {
  const { user } = useAuth();
  const { showAuthDialog, closeAuthDialog, requireAuth } = useAuthDialog();

  const handleTeamAction = () => {
    requireAuth(() => {
      alert('Welcome to team management!');
    });
  };

  const handleProfileAction = () => {
    requireAuth(() => {
      alert('Accessing profile settings!');
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Dialog Demo</CardTitle>
          <CardDescription>
            Test the auth dialog functionality with different features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user ? (
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-green-800">
                ✅ Signed in as: <strong>{user.name}</strong>
              </p>
            </div>
          ) : (
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-orange-800">
                ⚠️ Not signed in - Try the buttons below to see auth dialogs
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Bookmark Action</h3>
              <BookmarkButton 
                psId="demo-ps-id" 
                showText 
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Team Action</h3>
              <Button onClick={handleTeamAction} className="w-full">
                Join Team
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Profile Action</h3>
              <Button onClick={handleProfileAction} className="w-full" variant="outline">
                Edit Profile
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Generic Action</h3>
              <Button 
                onClick={() => requireAuth(() => alert('Generic action completed!'))} 
                className="w-full" 
                variant="secondary"
              >
                Generic Feature
              </Button>
            </div>
          </div>

          <AuthDialog
            open={showAuthDialog}
            onOpenChange={closeAuthDialog}
            feature="this feature"
            onSuccess={() => alert('Login successful!')}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthDialogDemo;
