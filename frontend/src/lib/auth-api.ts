import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

console.log('API Base URL:', baseURL);

// Create axios instance with better configuration
const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    console.log('Request data:', config.data);
    console.log('Request headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
);

export const authAPI = {
  // Send Firebase ID token to backend for validation and user creation/login
  signIn: async (idToken: string) => {
    if (!idToken) {
      throw new Error('ID Token is required');
    }

    console.log('Attempting to sign in with token length:', idToken.length);
    
    // Ensure the data is properly structured
    const requestData = {
      idToken: idToken
    };

    console.log('Sending request data:', requestData);

    try {
      const response = await api.post('/api/auth/signin', requestData);
      console.log('Sign in successful:', response.data);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorData = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: unknown } }).response?.data 
        : null;
      console.error('Sign in failed:', errorData || errorMessage);
      throw error;
    }
  },

  // Get current user details from backend
  getCurrentUser: async (idToken: string) => {
    if (!idToken) {
      throw new Error('ID Token is required');
    }

    try {
      const response = await api.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorData = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: unknown } }).response?.data 
        : null;
      console.error('Get user failed:', errorData || errorMessage);
      throw error;
    }
  },

  // Optional: Sign out (if your backend has a sign out endpoint)
  signOut: async (idToken: string) => {
    try {
      const response = await api.post('/api/auth/signout', {}, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorData = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: unknown } }).response?.data 
        : null;
      console.error('Sign out failed:', errorData || errorMessage);
      throw error;
    }
  },
};

export default api;
