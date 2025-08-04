# Axios Setup Documentation

## Overview
Axios has been successfully set up in your ICESCO Careers application with a comprehensive configuration including interceptors, error handling, and React Query integration.

## Files Created/Updated

### 1. `/src/lib/axios.ts`
- **Purpose**: Main Axios configuration with interceptors
- **Features**:
  - Base URL configuration (`http://localhost:8000`)
  - Request/Response interceptors
  - Automatic auth token handling
  - Comprehensive error handling
  - Request/Response logging for debugging

### 2. `/src/services/api.ts` (Updated)
- **Purpose**: Application submission service using Axios
- **Changes**:
  - Replaced `fetch` with Axios
  - Improved error handling
  - Cleaner code structure

### 3. `/src/services/apiServices.ts`
- **Purpose**: Additional API services for different features
- **Includes**:
  - `JobService`: Job-related API calls
  - `DepartmentService`: Department management
  - `UserService`: User profile operations
  - `AuthService`: Authentication
  - `NotificationService`: Notifications

### 4. `/src/hooks/useApi.ts`
- **Purpose**: React hooks for API integration with React Query
- **Features**:
  - Custom hooks for all API operations
  - Automatic caching and invalidation
  - Loading and error state management

## Usage Examples

### 1. Using the Application Service (Already Integrated)
```typescript
// In your apply.tsx component (already working)
const response = await ApplicationService.submitApplication(
  applicationData,
  formData.cv,
  formData.videoFile
);
```

### 2. Using React Query Hooks for Jobs
```typescript
import { useJobs, useFeaturedJobs } from '../hooks/useApi';

function JobsList() {
  const { data: jobs, isLoading, error } = useJobs({
    department: 'Digital Transformation',
    type: 'Full-time'
  });

  const { data: featuredJobs } = useFeaturedJobs();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {jobs?.data.map(job => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
}
```

### 3. Using Authentication
```typescript
import { useLogin, useRegister } from '../hooks/useApi';

function LoginForm() {
  const loginMutation = useLogin();

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await loginMutation.mutateAsync({ email, password });
      console.log('Login successful:', result);
      // Redirect or update UI
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleLogin(email, password);
    }}>
      {/* Form fields */}
      <button 
        type="submit" 
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### 4. Direct API Calls
```typescript
import { JobService } from '../services/apiServices';

// In any component or service
const searchResults = await JobService.searchJobs('software engineer');
const departments = await DepartmentService.getDepartments();
```

## Configuration Options

### Environment Variables
You can create a `.env` file to configure different environments:

```env
# .env
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=30000
```

Then update `/src/lib/axios.ts`:
```typescript
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
});
```

## Error Handling

### Automatic Error Handling
- **401 Unauthorized**: Automatically redirects to login
- **Network Errors**: Shows user-friendly messages
- **Server Errors**: Provides appropriate feedback

### Custom Error Handling
```typescript
import { useApiError } from '../hooks/useApi';

function MyComponent() {
  const { handleError } = useApiError();

  const fetchData = async () => {
    try {
      const data = await JobService.getJobs();
      // Handle success
    } catch (error) {
      handleError(error);
    }
  };
}
```

## Authentication Integration

### Token Storage
- Tokens are automatically stored in `localStorage`
- Included in all subsequent requests
- Cleared on logout or 401 errors

### Protected Routes
```typescript
// You can create a hook to check auth status
const { data: user, isLoading } = useVerifyToken();

if (isLoading) return <Loading />;
if (!user) return <Login />;

return <ProtectedContent />;
```

## Best Practices

### 1. Use React Query Hooks
- Prefer `useJobs()` over direct `JobService.getJobs()`
- Automatic caching and background updates
- Better loading and error states

### 2. Error Boundaries
- Wrap components with error boundaries
- Handle API errors gracefully

### 3. Loading States
```typescript
const { isLoading, isError, errors } = useLoadingStates(
  useJobs(),
  useDepartments(),
  useUserProfile(userId)
);
```

### 4. Optimistic Updates
```typescript
const queryClient = useQueryClient();

const updateProfile = useMutation({
  mutationFn: UserService.updateUserProfile,
  onMutate: async (newProfile) => {
    // Optimistically update the cache
    await queryClient.cancelQueries(['user', 'profile', userId]);
    const previousProfile = queryClient.getQueryData(['user', 'profile', userId]);
    queryClient.setQueryData(['user', 'profile', userId], newProfile);
    return { previousProfile };
  },
  onError: (err, newProfile, context) => {
    // Rollback on error
    queryClient.setQueryData(['user', 'profile', userId], context.previousProfile);
  },
});
```

## Next Steps

1. **Update existing components** to use the new API hooks
2. **Add environment variables** for different environments
3. **Implement proper error boundaries**
4. **Add loading spinners** using the provided hooks
5. **Set up authentication flow** using AuthService

The Axios setup is now complete and ready to use throughout your application!
