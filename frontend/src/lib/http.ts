import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
api.interceptors.request.use((config) => {
  console.log('API Request:', {
    url: config.url,
    method: config.method,
    baseURL: config.baseURL,
    headers: config.headers,
    data: config.data
  });
  return config;
});

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response Success:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Test backend connection
  testConnection: async () => {
    try {
      console.log('Testing connection to:', baseURL);
      const response = await api.get('/api/health');
      return response.data;
    } catch (error) {
      console.error('Connection test failed:', error);
      throw error;
    }
  },

  // Send Firebase ID token to backend for validation and user creation/login
  signIn: async (idToken: string) => {
    console.log('Sending signin request with idToken:', idToken ? 'Token present' : 'Token missing');
    
    if (!idToken) {
      throw new Error('ID Token is required');
    }
    
    const payload = { idToken };
    console.log('Request payload:', payload);
    console.log('Base URL:', baseURL);
    
    try {
      const response = await api.post('/api/auth/signin', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('SignIn API Error:', error);
      throw error;
    }
  },

  // Get current user details from backend
  getCurrentUser: async (idToken: string) => {
    const response = await api.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response.data;
  },

  // Optional: Sign out (if your backend has a sign out endpoint)
  signOut: async (idToken: string) => {
    const response = await api.post('/api/auth/signout', {}, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response.data;
  },
};

export default api;
