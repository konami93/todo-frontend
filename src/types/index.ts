export interface User {
    id: string;
    email: string;
    name?: string;
    createdAt: string;
  }
  
  export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
    status: 'PENDING' | 'COMPLETED';
    userId: string;
    createdAt: string;
    updatedAt: string;
    user?: User;
  }
  
  export interface AuthResponse {
    user: User;
    access_token: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    name?: string;
  }
  
  export interface TaskStatistics {
    total: number;
    completed: number;
    pending: number;
  }