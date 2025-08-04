// API Service for Job Application
import apiClient from '../lib/axios';

export interface ApplicationData {
  offre_id: string;
  full_name: string;
  email: string;
  country_code: string;
  phone_number: string;
  nationality: string;
  date_of_birth: string;
  address: string;
  education: Array<{
    school: string;
    diploma: string;
    start_date: string;
    end_date: string;
    gpa?: string;
  }>;
  experience: Array<{
    company: string;
    job_title: string;
    start_date: string;
    end_date: string;
    description: string;
    major_achievements: string;
    location?: string;
  }>;
  skills: string[];
  practical_experience: string;
  certifications: Array<{
    certificate_title: string;
    issuing_organization: string;
    date_received: string;
    certificate_url?: string;
  }>;
  professional_references: Array<{
    name: string;
    title_or_relationship: string;
    email: string;
    note?: string;
  }>;
  social_media: {
    linkedin: string;
    github: string;
    twitter: string;
    facebook: string;
    instagram: string;
    portfolio: string;
    other: string;
  };
}

export interface SubmitApplicationResponse {
  success?: boolean;
  message: string;
  applicationId?: string;
  application_id?: string; // API returns this field name
  cv_uploaded?: boolean;
  video_uploaded?: boolean;
}

export class ApplicationService {
  /**
   * Submit job application with form data, CV file, and video file
   */
  static async submitApplication(
    applicationData: ApplicationData,
    cvFile: File | null,
    videoFile: File | null
  ): Promise<SubmitApplicationResponse> {
    try {
      const formData = new FormData();
      
      // Add application data as JSON string
      formData.append('application_data', JSON.stringify(applicationData));
      
      // Add CV file if provided
      if (cvFile) {
        formData.append('cv_file', cvFile);
      }
      
      // Add video file if provided
      if (videoFile) {
        formData.append('video_file', videoFile);
      }

      const response = await apiClient.post('/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Error submitting application:', error);
      
      // Handle Axios errors with user-friendly messages
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      if (error.status) {
        switch (error.status) {
          case 400:
            errorMessage = error.message || 'Some required information is missing or invalid. Please check your form and try again.';
            break;
          case 413:
            errorMessage = 'One of your files is too large. Please use smaller files (CV under 10MB, video under 50MB).';
            break;
          case 422:
            errorMessage = error.message || 'There was a problem with the information you provided. Please review your form.';
            break;
          case 500:
            errorMessage = 'We\'re experiencing technical difficulties. Please try again in a few minutes or contact support if the problem persists.';
            break;
          case 503:
            errorMessage = 'Our service is temporarily unavailable. Please try again in a few minutes.';
            break;
          case 0:
            errorMessage = 'Unable to connect to our servers. Please check your internet connection and try again.';
            break;
          default:
            errorMessage = error.message || errorMessage;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  }

  /**
   * Get all job offers
   */
  static async getJobOffers(): Promise<any[]> {
    try {
      const response = await apiClient.get('/jobs');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching job offers:', error);
      throw new Error(error.message || 'Failed to fetch job offers');
    }
  }

  /**
   * Get job offer by ID
   */
  static async getJobOffer(offerId: string): Promise<any> {
    try {
      const response = await apiClient.get(`/jobs/${offerId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching job offer:', error);
      throw new Error(error.message || 'Failed to fetch job offer');
    }
  }

  /**
   * Get application status
   */
  static async getApplicationStatus(applicationId: string): Promise<any> {
    try {
      const response = await apiClient.get(`/applications/${applicationId}/status`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching application status:', error);
      throw new Error(error.message || 'Failed to fetch application status');
    }
  }
}
