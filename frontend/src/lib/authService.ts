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
    token: string; // JWT token from backend
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
    // Remove automatic Firebase token refresh since we're using JWT
    // JWT tokens don't need frequent refresh like Firebase tokens
  }

  // Sign in with Google
  async signInWithGoogle(): Promise<AuthUser | null> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Get the Firebase ID token (only used for initial authentication)
      const idToken = await user.getIdToken();
      
      // Send Firebase ID token to backend to get JWT token
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/signin`, {
        idToken
      });
      
      if (response.data.success) {
        // Store the JWT token (not Firebase token) in cookies
        const jwtToken = response.data.data.token;
        Cookies.set('authToken', jwtToken, { 
          expires: 7, // 7 days to match JWT expiry
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        
        this.currentUser = response.data.data.user;
        return this.currentUser;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      // Clean up on error
      Cookies.remove('authToken');
      throw error;
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
      Cookies.remove('authToken'); // Remove JWT token
      this.currentUser = null;
      this.clearTokenRefresh(); // Clear any refresh timers if they exist
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Get current user from backend using JWT token
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const authToken = Cookies.get('authToken');
      
      if (!authToken) {
        return null;
      }

      const response = await axios.get<CurrentUserResponse>(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      if (response.data.success) {
        this.currentUser = response.data.data.user;
        return this.currentUser;
      } else {
        // Token might be invalid, remove it
        Cookies.remove('authToken');
        return null;
      }
    } catch (error) {
      console.error('Get current user error:', error);
      
      // If token is invalid, remove it
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        Cookies.remove('authToken');
      }
      
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!Cookies.get('authToken');
  }

  // Get stored user data
  getStoredUser(): AuthUser | null {
    return this.currentUser;
  }

  // Listen to auth state changes (simplified for JWT)
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    // For JWT-based auth, we primarily rely on stored tokens
    // Firebase auth state is only used for initial authentication
    return onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser && this.isAuthenticated()) {
        // User has Firebase session and JWT token
        const user = await this.getCurrentUser();
        callback(user);
      } else if (!firebaseUser) {
        // No Firebase session, clear everything
        this.currentUser = null;
        Cookies.remove('authToken');
        callback(null);
      } else {
        // Firebase user exists but no JWT token - redirect to signin
        callback(null);
      }
    });
  }

  // Enhanced getCurrentUser with better error handling
  async getCurrentUserWithRetry(): Promise<AuthUser | null> {
    try {
      return await this.getCurrentUser();
    } catch (error) {
      // For JWT tokens, if auth fails, user needs to sign in again
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.error('JWT token invalid, user needs to sign in again');
        await this.signOut();
        return null;
      }
      throw error;
    }
  }

  // Clear any refresh timers (kept for compatibility)
  private clearTokenRefresh(): void {
    if (this.refreshTimeout) {
      clearInterval(this.refreshTimeout);
      this.refreshTimeout = null;
    }
  }
}

export const authService = new AuthService();
export default authService;
