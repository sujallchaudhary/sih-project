import axios from 'axios';
import { ApiResponse, ProblemStatement, FilterOptions } from '@/types/problem-statement';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://192.168.54.82:5000/';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    currentPage?: number;
    totalCount?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    nextPage?: number | null;
    prevPage?: number | null;
  };
  filters?: {
    applied: string[];
    totalFiltered: number;
  };
}

export const problemStatementApi = {
  async getAllProblemStatements(page: number = 1, limit: number = 12): Promise<PaginatedResponse<ProblemStatement>> {
    const response = await api.get(`/api/ps?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getFilterOptions(): Promise<ApiResponse<FilterOptions>> {
    const response = await api.get('/api/ps/filters');
    return response.data;
  },

  async getProblemStatementById(id: string): Promise<ApiResponse<ProblemStatement>> {
    const response = await api.get(`/api/ps/${id}`);
    return response.data;
  },

  async searchProblemStatements(
    query: string, 
    filters: {
      category?: string;
      theme?: string;
      organization?: string;
      department?: string;
      difficulty?: string;
      tags?: string;
      techStack?: string;
    } = {},
    page: number = 1,
    limit: number = 12
  ): Promise<PaginatedResponse<ProblemStatement>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (query) params.append('search', query);
    if (filters.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters.theme && filters.theme !== 'all') params.append('theme', filters.theme);
    if (filters.organization && filters.organization !== 'all') params.append('organization', filters.organization);
    if (filters.department && filters.department !== 'all') params.append('department', filters.department);
    if (filters.difficulty && filters.difficulty !== 'all') params.append('difficultyLevel', filters.difficulty);
    if (filters.tags && filters.tags.length > 0) params.append('tags', filters.tags);
    if (filters.techStack && filters.techStack.length > 0) params.append('techStack', filters.techStack);
    if (filters.organization && filters.organization !== 'all') params.append('organization', filters.organization);
    if (filters.department && filters.department !== 'all') params.append('department', filters.department);
    
    const response = await api.get(`/api/ps?${params.toString()}`);
    return response.data;
  }
};

export const authService = {
  async signIn(idToken: string) {
    return api.post('/api/auth/signin', { idToken });
  },
  
  async getCurrentUser(idToken: string) {
    return api.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
  },
};
