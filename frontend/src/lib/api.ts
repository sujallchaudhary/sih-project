import axios from 'axios';
import { ApiResponse, ProblemStatement, FilterOptions } from '@/types/problem-statement';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://192.168.54.82:5000/';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const problemStatementApi = {
  async getAllProblemStatements(): Promise<ApiResponse<ProblemStatement[]>> {
    const response = await api.get('/api/ps');
    return response.data;
  },

  async getFilterOptions(): Promise<ApiResponse<FilterOptions>> {
    const response = await api.get('/api/ps/filters');
    return response.data;
  },

  async getProblemStatementById(id: string): Promise<ApiResponse<ProblemStatement>> {
    const response = await api.get(`/api/ps/${id}`);
    return response.data;
  }
};
