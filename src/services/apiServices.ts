// Additional API services for the ICESCO Careers platform
import apiClient from '../lib/axios';

// Types for different API responses
export interface JobOffer {
  id: string;
  title: string;
  businessUnit: string;
  location: string;
  type: string;
  experience: string;
  urgent?: boolean;
  description: string;
  skills: string[];
  requirements: string[];
  responsibilities: string[];
  salary_range?: string;
  benefits?: string[];
  application_deadline: string;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  offer_id: string;
  status: 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected';
  submitted_at: string;
  last_updated: string;
  notes?: string;
}

export interface BusinessUnit {
  id: string;
  name: string;
  description: string;
  head_name?: string;
  open_positions: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export class JobService {
  /**
   * Get all job offers with optional filters
   */
  static async getJobs(params?: {
    businessUnit?: string;
    location?: string;
    type?: string;
    experience?: string;
    keyword?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<JobOffer[]>> {
    try {
      const response = await apiClient.get('/jobs', { params });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch jobs');
    }
  }

  /**
   * Get featured/urgent jobs
   */
  static async getFeaturedJobs(): Promise<ApiResponse<JobOffer[]>> {
    try {
      const response = await apiClient.get('/jobs/featured');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch featured jobs');
    }
  }

  /**
   * Search jobs
   */
  static async searchJobs(query: string): Promise<ApiResponse<JobOffer[]>> {
    try {
      const response = await apiClient.get(`/jobs/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to search jobs');
    }
  }
}

export class BusinessUnitService {
  /**
   * Get all business units
   */
  static async getBusinessUnits(): Promise<ApiResponse<BusinessUnit[]>> {
    try {
      const response = await apiClient.get('/business-units');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch business units');
    }
  }

  /**
   * Get business unit by ID
   */
  static async getBusinessUnit(businessUnitId: string): Promise<ApiResponse<BusinessUnit>> {
    try {
      const response = await apiClient.get(`/business-units/${businessUnitId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch business unit');
    }
  }

  /**
   * Get jobs by business unit
   */
  static async getBusinessUnitJobs(businessUnitId: string): Promise<ApiResponse<JobOffer[]>> {
    try {
      const response = await apiClient.get(`/business-units/${businessUnitId}/jobs`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch business unit jobs');
    }
  }
}

export class UserService {
  /**
   * Get user applications
   */
  static async getUserApplications(userId: string): Promise<ApiResponse<Application[]>> {
    try {
      const response = await apiClient.get(`/users/${userId}/applications`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch user applications');
    }
  }

  /**
   * Get user profile
   */
  static async getUserProfile(userId: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.get(`/users/${userId}/profile`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch user profile');
    }
  }

  /**
   * Update user profile
   */
  static async updateUserProfile(userId: string, profileData: any): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.put(`/users/${userId}/profile`, profileData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update user profile');
    }
  }
}

export class AuthService {
  /**
   * Login user
   */
  static async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      
      // Store token in localStorage
      if (response.data.data.token) {
        localStorage.setItem('auth_token', response.data.data.token);
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  }

  /**
   * Register user
   */
  static async register(userData: {
    email: string;
    password: string;
    full_name: string;
    phone_number?: string;
  }): Promise<ApiResponse<{ token: string; user: any }>> {
    try {
      const response = await apiClient.post('/auth/register', userData);
      
      // Store token in localStorage
      if (response.data.data.token) {
        localStorage.setItem('auth_token', response.data.data.token);
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Continue with logout even if API call fails
    } finally {
      localStorage.removeItem('auth_token');
    }
  }

  /**
   * Verify token
   */
  static async verifyToken(): Promise<ApiResponse<{ user: any }>> {
    try {
      const response = await apiClient.get('/auth/verify');
      return response.data;
    } catch (error: any) {
      localStorage.removeItem('auth_token');
      throw new Error(error.message || 'Token verification failed');
    }
  }
}

export class NotificationService {
  /**
   * Get user notifications
   */
  static async getNotifications(): Promise<ApiResponse<any[]>> {
    try {
      const response = await apiClient.get('/notifications');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch notifications');
    }
  }

  /**
   * Mark notification as read
   */
  static async markAsRead(notificationId: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.patch(`/notifications/${notificationId}/read`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to mark notification as read');
    }
  }

  /**
   * Mark all notifications as read
   */
  static async markAllAsRead(): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.patch('/notifications/read-all');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to mark all notifications as read');
    }
  }
}
