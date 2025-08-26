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
}

export interface FilterOptions {
  categories: string[];
  themes: string[];
  organizations: string[];
  departments: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
