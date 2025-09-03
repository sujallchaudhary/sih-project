import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = Cookies.get('authToken'); // Use JWT token instead of Firebase token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Add response interceptor to handle JWT token expiry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If we get a 401 and haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // For JWT tokens, we can't refresh them automatically
      // User needs to sign in again
      console.error('JWT token expired or invalid, redirecting to login');
      Cookies.remove('authToken');
      
      if (typeof window !== 'undefined') {
        // You might want to show a toast notification here
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);

export interface FilterOptions {
  categories: string[];
  themes: string[];
  organizations: string[];
  departments: string[];
  difficultyLevels: string[];
  tags: string[];
  techStack: string[];
  popular: {
    tags: string[];
    techStack: string[];
  };
}

export interface ProblemStatement {
  _id: string;
  id: string;
  title: string;
  description: string;
  organization: string;
  department: string;
  category: string;
  theme: string;
  youtube: string;
  dataset: string;
  contact: string;
  approach: string[];
  difficultyLevel: string;
  summary: string;
  tags: string[];
  techStack: string[];
  updatedAt: string;
  isBookmarked?: boolean;
  isAddedToTeam?: boolean;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export interface FilterParams {
  page?: number;
  limit?: number;
  category?: string;
  theme?: string;
  organization?: string;
  department?: string;
  difficultyLevel?: string;
  difficulties?: string;
  search?: string;
  tags?: string;
  techStack?: string;
  technology?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ProblemStatementsResponse {
  success: boolean;
  message: string;
  data: ProblemStatement[];
  pagination: PaginationInfo;
  filters: {
    applied: string[];
    totalFiltered: number;
  };
}

export const apiService = {
  // Get filter options
  getFilters: async (): Promise<FilterOptions> => {
    try {
      const response = await api.get('/ps/filters');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching filters:', error);
      throw error;
    }
  },

  // Get all problem statements with filters
  getProblemStatements: async (params: FilterParams = {}): Promise<ProblemStatementsResponse> => {
    try {
      const response = await api.get('/ps', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching problem statements:', error);
      throw error;
    }
  },

  // Get single problem statement by ID
  getProblemStatementById: async (id: string): Promise<ProblemStatement> => {
    try {
      const response = await api.get(`/ps/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching problem statement:', error);
      throw error;
    }
  },

  // Bookmark a problem statement
  bookmarkProblemStatement: async (psId: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.post('/ps/bookmark', { psId });
      return response.data;
    } catch (error) {
      console.error('Error bookmarking problem statement:', error);
      throw error;
    }
  },

  // Remove bookmark from problem statement
  removeBookmark: async (psId: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.delete('/ps/bookmark', { data: { psId } });
      return response.data;
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw error;
    }
  },

  // Get bookmarked problem statements
  getBookmarkedProblemStatements: async (params: FilterParams = {}): Promise<ProblemStatementsResponse> => {
    try {
      const response = await api.get('/ps/bookmarked', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching bookmarked problem statements:', error);
      throw error;
    }
  },
};

export default api;
