// Additional API services for the ICESCO Careers platform
import apiClient from '../lib/axios';

// Types for different API responses




export interface JobOffer {
  id: number;
  reference: string;
  jobTitle: string;
  location: string;
  contract_type: ContractType;
  job_status: JobStatus;
  priority: Priority;
  business_unit: BusinessUnit;
  numberOfPositions: number;
  closingDate: string;
  publishedDate: string;
  joiningDate: string;
  jobDescription: string;
  tasks: string;
  requiredSkills: string;
  academicQualifications: string;
  preferredCertifications: string;
  salaryBenefits: string;
  program_category: ProgramCategory;
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


export interface ContractType {
  id: number;
  typeName: string;
}

export interface JobStatus {
  id: number;
  statusName: string;
}

export interface Priority {
  id: number;
  priorityLevel: string;
}


export interface ProgramCategory {
  id: number;
  name: string;
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
   * Get all job offers with full details
   */
  static async getJobs(params?: {
    skip?: number;
    limit?: number;
  }): Promise<JobOffer[]> {
    try {
      const response = await apiClient.get('/job_offers-full/', { params });
      
      // Handle different response formats
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        // If the response has a data property that's an array
        return response.data.data;
      } else if (response.data && response.data.success && Array.isArray(response.data.data)) {
        // If the response has success: true and data array
        return response.data.data;
      } else {
        console.error('Unexpected API response format:', response.data);
        return [];
      }
    } catch (error: any) {
      console.error('API Error:', error.response?.data || error.message);
      throw new Error(error.message || 'Failed to fetch jobs');
    }
  }

  /**
   * Get job offers summary (with application counts)
   */
  static async getJobSummaries(params?: {
    skip?: number;
    limit?: number;
  }): Promise<any[]> {
    try {
      const response = await apiClient.get('/job_offers/', { params });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch job summaries');
    }
  }

  /**
   * Get job offer by ID
   */
  static async getJobById(jobId: number): Promise<JobOffer> {
    try {
      const response = await apiClient.get(`/job_offers/${jobId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch job');
    }
  }

  /**
   * Search jobs by keyword
   */
  static async searchJobs(query: string, params?: {
    skip?: number;
    limit?: number;
  }): Promise<JobOffer[]> {
    try {
      // This endpoint might need to be implemented on your backend
      const response = await apiClient.get('/job_offers/search', {
        params: { q: query, ...params }
      });
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
  static async getBusinessUnits(): Promise<BusinessUnit[]> {
    try {
      const response = await apiClient.get('/business_units/');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch business units');
    }
  }

  /**
   * Get business unit by ID
   */
  static async getBusinessUnit(businessUnitId: string): Promise<BusinessUnit> {
    try {
      const response = await apiClient.get(`/business_units/${businessUnitId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch business unit');
    }
  }
}

export class ApplicationService {
  /**
   * Get user applications
   */
  static async getUserApplications(userId: string): Promise<Application[]> {
    try {
      const response = await apiClient.get(`/users/${userId}/applications`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch user applications');
    }
  }

  

  /**
   * Get application by ID
   */
  static async getApplication(applicationId: string): Promise<Application> {
    try {
      const response = await apiClient.get(`/applications/${applicationId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch application');
    }
  }

  /**
   * Submit new application
   */
  static async submitApplication(applicationData: any): Promise<any> {
    try {
      const response = await apiClient.post('/applications/', applicationData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to submit application');
    }
  }
}

export class AuthService {
  /**
   * Login user
   */
  static async login(email: string, password: string): Promise<{ token: string; user: any }> {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
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
  }): Promise<{ token: string; user: any }> {
    try {
      const response = await apiClient.post('/auth/register', userData);
      
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
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
  static async verifyToken(): Promise<{ user: any }> {
    try {
      const response = await apiClient.get('/auth/verify');
      return response.data;
    } catch (error: any) {
      localStorage.removeItem('auth_token');
      throw new Error(error.message || 'Token verification failed');
    }
  }
}

export class UserService {
  /**
   * Get user profile
   */
  static async getUserProfile(userId: string): Promise<any> {
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
  static async updateUserProfile(userId: string, profileData: any): Promise<any> {
    try {
      const response = await apiClient.put(`/users/${userId}/profile`, profileData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update user profile');
    }
  }
}

// Simple notification service (you might want to implement this later)
export class NotificationService {
  /**
   * Get user notifications (mock for now)
   */
  static async getNotifications(): Promise<any[]> {
    try {
      // This endpoint might not exist yet, returning mock data
      return [
        {
          id: '1',
          type: 'info',
          message: 'Welcome to ICESCO Careers Platform',
          read: false,
          created_at: new Date().toISOString()
        }
      ];
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch notifications');
    }
  }
}