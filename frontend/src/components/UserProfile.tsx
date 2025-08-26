'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut, Mail, Calendar } from 'lucide-react';

export const UserProfile: React.FC = () => {
  const { user, userDetails, signOut, loading } = useAuth();

  if (!user) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src={user.photoURL || userDetails?.avatar} 
              alt={user.displayName || userDetails?.name || 'User'} 
            />
            <AvatarFallback>
              {user.displayName 
                ? getInitials(user.displayName) 
                : userDetails?.name 
                ? getInitials(userDetails.name)
                : <User className="h-4 w-4" />
              }
            </AvatarFallback>
          </Avatar>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>
            Your account information and settings
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage 
                src={user.photoURL || userDetails?.avatar} 
                alt={user.displayName || userDetails?.name || 'User'} 
              />
              <AvatarFallback className="text-lg">
                {user.displayName 
                  ? getInitials(user.displayName) 
                  : userDetails?.name 
                  ? getInitials(userDetails.name)
                  : <User className="h-8 w-8" />
                }
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {user.displayName || userDetails?.name || 'User'}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Mail className="h-3 w-3" />
                {user.email || userDetails?.email}
              </div>
            </div>
          </div>

          {userDetails && (
            <div className="space-y-2">
              <h4 className="font-medium">Account Details</h4>
              <div className="space-y-1 text-sm">
                {userDetails.id && (
                  <div>
                    <span className="text-muted-foreground">ID: </span>
                    {userDetails.id}
                  </div>
                )}
                {userDetails.createdAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Joined: </span>
                    {new Date(userDetails.createdAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleSignOut} 
              variant="outline" 
              disabled={loading}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
