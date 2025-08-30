import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import Cookies from 'js-cookie';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export interface AuthUser {
  id: string;
  firebaseUid: string;
  name: string;
  email: string;
  photoURL?: string;
  role?: string;
  isEmailVerified?: boolean;
  lastLoginAt?: string;
  createdAt?: string;
  isInTeam?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    isNewUser: boolean;
  };
}

export interface CurrentUserResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
  };
}

class AuthService {
  private currentUser: AuthUser | null = null;
  private refreshTimeout: NodeJS.Timeout | null = null;

  constructor() {
    // Set up automatic token refresh
    this.setupTokenRefresh();
  }

  // Sign in with Google
  async signInWithGoogle(): Promise<AuthUser | null> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Get the ID token
      const idToken = await user.getIdToken();
      
      // Store the ID token in cookies with shorter expiry
      Cookies.set('idToken', idToken, { 
        expires: 1, // 1 day instead of 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      // Send ID token to backend
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/signin`, {
        idToken
      });
      
      if (response.data.success) {
        this.currentUser = response.data.data.user;
        return this.currentUser;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      // Clean up on error
      Cookies.remove('idToken');
      throw error;
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
      Cookies.remove('idToken');
      this.currentUser = null;
      this.clearTokenRefresh(); // Clear the refresh timer
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Get current user from backend
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const idToken = Cookies.get('idToken');
      
      if (!idToken) {
        return null;
      }

      const response = await axios.get<CurrentUserResponse>(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      });

      if (response.data.success) {
        this.currentUser = response.data.data.user;
        return this.currentUser;
      } else {
        // Token might be invalid, remove it
        Cookies.remove('idToken');
        return null;
      }
    } catch (error) {
      console.error('Get current user error:', error);
      
      // If token is invalid, remove it
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        Cookies.remove('idToken');
      }
      
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!Cookies.get('idToken');
  }

  // Get stored user data
  getStoredUser(): AuthUser | null {
    return this.currentUser;
  }

  // Listen to auth state changes
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    return onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        // Try to get user data from backend
        const user = await this.getCurrentUser();
        callback(user);
      } else {
        this.currentUser = null;
        callback(null);
      }
    });
  }

  // Refresh token if needed
  async refreshToken(): Promise<string | null> {
    try {
      const firebaseUser = auth.currentUser;
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken(true); // Force refresh
        Cookies.set('idToken', idToken, { 
          expires: 1, // 1 day - reasonable for web apps
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        return idToken;
      }
      return null;
    } catch (error) {
      console.error('Token refresh error:', error);
      return null;
    }
  }

  // Setup automatic token refresh
  private setupTokenRefresh(): void {
    // Clear any existing timeout
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }

    // Set up token refresh every 50 minutes (before 1-hour expiry)
    const refreshInterval = 50 * 60 * 1000; // 50 minutes in milliseconds
    
    this.refreshTimeout = setInterval(async () => {
      if (auth.currentUser && this.isAuthenticated()) {
        try {
          await this.refreshToken();
          console.log('Token refreshed automatically');
        } catch (error) {
          console.error('Automatic token refresh failed:', error);
        }
      }
    }, refreshInterval);
  }

  // Clear token refresh
  private clearTokenRefresh(): void {
    if (this.refreshTimeout) {
      clearInterval(this.refreshTimeout);
      this.refreshTimeout = null;
    }
  }

  // Enhanced getCurrentUser with token refresh on 401
  async getCurrentUserWithRetry(): Promise<AuthUser | null> {
    try {
      return await this.getCurrentUser();
    } catch (error) {
      // If we get a 401, try refreshing the token once
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        try {
          const newToken = await this.refreshToken();
          if (newToken) {
            // Retry the request with the new token
            return await this.getCurrentUser();
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          // Force sign out if refresh fails
          await this.signOut();
        }
      }
      throw error;
    }
  }
}

export const authService = new AuthService();
export default authService;
