// React hooks for API calls with React Query integration
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { JobService, BusinessUnitService, UserService, AuthService } from '../services/apiServices';
import { ApplicationService } from '../services/api';
import type { JobOffer, BusinessUnit, Application } from '../services/apiServices';

// Query keys for React Query
export const queryKeys = {
  jobs: ['jobs'] as const,
  job: (id: string) => ['jobs', id] as const,
  businessUnits: ['businessUnits'] as const,
  businessUnit: (id: string) => ['businessUnits', id] as const,
  applications: ['applications'] as const,
  userApplications: (userId: string) => ['applications', 'user', userId] as const,
  notifications: ['notifications'] as const,
};

// Job-related hooks
export const useJobs = (params?: {
  businessUnit?: string;
  location?: string;
  type?: string;
  experience?: string;
  keyword?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [...queryKeys.jobs, params],
    queryFn: () => JobService.getJobs(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useJob = (jobId: string) => {
  return useQuery({
    queryKey: queryKeys.job(jobId),
    queryFn: () => ApplicationService.getJobOffer(jobId),
    enabled: !!jobId,
  });
};

export const useFeaturedJobs = () => {
  return useQuery({
    queryKey: [...queryKeys.jobs, 'featured'],
    queryFn: () => JobService.getFeaturedJobs(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSearchJobs = (query: string) => {
  return useQuery({
    queryKey: [...queryKeys.jobs, 'search', query],
    queryFn: () => JobService.searchJobs(query),
    enabled: !!query.trim(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Business Unit-related hooks
export const useBusinessUnits = () => {
  return useQuery({
    queryKey: queryKeys.businessUnits,
    queryFn: () => BusinessUnitService.getBusinessUnits(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useBusinessUnit = (businessUnitId: string) => {
  return useQuery({
    queryKey: queryKeys.businessUnit(businessUnitId),
    queryFn: () => BusinessUnitService.getBusinessUnit(businessUnitId),
    enabled: !!businessUnitId,
  });
};

export const useBusinessUnitJobs = (businessUnitId: string) => {
  return useQuery({
    queryKey: [...queryKeys.jobs, 'businessUnit', businessUnitId],
    queryFn: () => BusinessUnitService.getBusinessUnitJobs(businessUnitId),
    enabled: !!businessUnitId,
  });
};

// Application-related hooks
export const useSubmitApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationData,
      cvFile,
      videoFile,
    }: {
      applicationData: any;
      cvFile: File | null;
      videoFile: File | null;
    }) => ApplicationService.submitApplication(applicationData, cvFile, videoFile),
    onSuccess: () => {
      // Invalidate applications queries
      queryClient.invalidateQueries({ queryKey: queryKeys.applications });
    },
  });
};

export const useApplicationStatus = (applicationId: string) => {
  return useQuery({
    queryKey: ['applications', 'status', applicationId],
    queryFn: () => ApplicationService.getApplicationStatus(applicationId),
    enabled: !!applicationId,
    refetchInterval: 30 * 1000, // Refresh every 30 seconds
  });
};

export const useUserApplications = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.userApplications(userId),
    queryFn: () => UserService.getUserApplications(userId),
    enabled: !!userId,
  });
};

// Auth-related hooks
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      AuthService.login(email, password),
    onSuccess: () => {
      // Invalidate all queries on successful login
      queryClient.invalidateQueries();
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: {
      email: string;
      password: string;
      full_name: string;
      phone_number?: string;
    }) => AuthService.register(userData),
    onSuccess: () => {
      // Invalidate all queries on successful registration
      queryClient.invalidateQueries();
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      // Clear all queries on logout
      queryClient.clear();
    },
  });
};

export const useVerifyToken = () => {
  return useQuery({
    queryKey: ['auth', 'verify'],
    queryFn: () => AuthService.verifyToken(),
    retry: false,
    staleTime: 0,
  });
};

// User profile hooks
export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ['user', 'profile', userId],
    queryFn: () => UserService.getUserProfile(userId),
    enabled: !!userId,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, profileData }: { userId: string; profileData: any }) =>
      UserService.updateUserProfile(userId, profileData),
    onSuccess: (data, variables) => {
      // Update the user profile in cache
      queryClient.invalidateQueries({ queryKey: ['user', 'profile', variables.userId] });
    },
  });
};

// Custom hook for handling API errors
export const useApiError = () => {
  const handleError = (error: any) => {
    if (error?.status === 401) {
      // Redirect to login on 401
      window.location.href = '/auth';
    } else {
      // Show error notification
      console.error('API Error:', error);
      // You can integrate with a toast notification system here
    }
  };

  return { handleError };
};

// Helper hook for loading states
export const useLoadingStates = (...queries: any[]) => {
  const isLoading = queries.some(query => query.isLoading);
  const isError = queries.some(query => query.isError);
  const errors = queries.filter(query => query.isError).map(query => query.error);

  return {
    isLoading,
    isError,
    errors,
  };
};
