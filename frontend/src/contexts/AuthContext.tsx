'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { UserDetails } from '@/types/user';
import { authAPI } from '@/lib/auth-api';

interface AuthContextType {
  user: User | null;
  userDetails: UserDetails | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshUserDetails: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user details from backend
  const fetchUserDetails = useCallback(async (idToken: string) => {
    try {
      const userDetails = await authAPI.getCurrentUser(idToken);
      setUserDetails(userDetails);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setUserDetails(null);
    }
  }, []);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      
      // Send token to backend
      await authAPI.signIn(idToken);

      // Fetch user details
      await fetchUserDetails(idToken);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUserDetails(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Refresh user details
  const refreshUserDetails = async () => {
    if (user) {
      try {
        const idToken = await user.getIdToken();
        await fetchUserDetails(idToken);
      } catch (error) {
        console.error('Error refreshing user details:', error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const idToken = await user.getIdToken();
          await fetchUserDetails(idToken);
        } catch (error) {
          console.error('Error getting user details:', error);
        }
      } else {
        setUserDetails(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchUserDetails]);

  const value = {
    user,
    userDetails,
    loading,
    signInWithGoogle,
    signOut,
    refreshUserDetails,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
