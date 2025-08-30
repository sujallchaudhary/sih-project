'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useAuthErrorHandler = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleAuthError = async (error: AxiosError | Error) => {
    // Check if it's an authentication error
    if ('response' in error && error?.response?.status === 401) {
      const errorData = error.response.data as { 
        code?: string; 
        shouldRefresh?: boolean; 
        message?: string; 
      };
      
      if (errorData?.code === 'TOKEN_EXPIRED' && errorData?.shouldRefresh) {
        // Token expired but can be refreshed - this should be handled automatically by the interceptor
        toast.error('Session expired. Please try again.');
        return;
      }
      
      if (errorData?.code === 'INVALID_TOKEN' || !errorData?.shouldRefresh) {
        // Invalid token or cannot refresh - force sign out
        toast.error('Your session is invalid. Please sign in again.');
        await signOut();
        router.push('/');
        return;
      }

      // Generic auth error
      toast.error('Authentication failed. Please sign in again.');
      await signOut();
      router.push('/');
    }
  };

  return { handleAuthError };
};

export default useAuthErrorHandler;
