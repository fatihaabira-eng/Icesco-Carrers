# Job Application Form - API Integration

## Overview
The Job Application Form has been made dynamic and now integrates with your backend endpoint at `http://localhost:8000/apply`.

## API Integration Features

### 1. Job Offer Integration
- **Job Offers**: Each job now has a unique `id` (e.g., "job-001", "job-002")
- **Apply Links**: Job cards include "Apply Now" buttons that navigate to `/apply?offre_id={jobId}`
- **Form Integration**: The application form automatically captures the `offre_id` from URL parameters
- **Backend Submission**: The `offre_id` is included in the application data sent to your backend

### 2. Form Submission
- **Endpoint**: `POST http://localhost:8000/apply`
- **Content-Type**: `multipart/form-data`
- **Fields**:
  - `application_data`: JSON string containing all form data (including offre_id)
  - `cv_file`: PDF/DOC file (optional)
  - `video_file`: Video file from recording (optional)

### 3. Form Data Structure
The `application_data` JSON includes:
```json
{
  "offre_id": "string",
  "full_name": "string",
  "email": "string", 
  "country_code": "string",
  "phone_number": "string",
  "nationality": "string",
  "date_of_birth": "string",
  "address": "string",
  "education": [
    {
      "school": "string",
      "diploma": "string", 
      "start_date": "string",
      "end_date": "string",
      "gpa": "string"
    }
  ],
  "experience": [
    {
      "company": "string",
      "job_title": "string",
      "start_date": "string", 
      "end_date": "string",
      "description": "string",
      "major_achievements": "string",
      "location": "string"
    }
  ],
  "skills": ["string"],
  "practical_experience": "string",
  "certifications": [
    {
      "certificate_title": "string",
      "issuing_organization": "string",
      "date_received": "string",
      "certificate_url": "string?"
    }
  ],
  "professional_references": [
    {
      "name": "string",
      "title_or_relationship": "string",
      "email": "string",
      "note": "string?"
    }
  ]
}
```

**Note:** The frontend form uses camelCase field names for user interface, but automatically converts them to snake_case when sending to the backend API. The field mapping includes:

- `offerId` → `offre_id`
- `fullName` → `full_name`
- `phoneCountryCode` → `country_code`  
- `phoneNumber` → `phone_number`
- `dateOfBirth` → `date_of_birth`
- `practicalExperience` → `practical_experience`
- Education: `place` → `school`, `startDate` → `start_date`, `endDate` → `end_date`
- Experience: `jobTitle` → `job_title`, `achievements` → `major_achievements`
- Certifications: `title` → `certificate_title`, `issuer` → `issuing_organization`, `date` → `date_received`, `url` → `certificate_url`
- References: `references` → `professional_references`, `title` → `title_or_relationship`

### 3. Video Recording Integration
- Users can record a video introduction via `/record` page
- Video is stored temporarily in localStorage as base64
- When returning to application form, video is converted back to File object
- Video file is included in the final submission

### 4. Routing Setup
- Main application form: `/apply` (also accessible via `/steps` for backward compatibility)
- Video recording page: `/record`
- Navigation flows:
  - Apply page → Record page → Back to Apply page
  - Job details page → Apply page

### 6. Error Handling
- Network errors are displayed to the user
- Loading states during submission
- Success confirmation with optional application ID
- Form validation prevents incomplete submissions

### 7. Files Created/Modified

#### New Files:
- `src/services/api.ts`: API service for backend communication

#### Modified Files:
- `src/pages/apply.tsx`: Added API integration, video file handling, error states
- `src/pages/record.tsx`: Updated to store video for application form
- `src/App.tsx`: Added proper routing for `/apply` and `/record` pages
- `src/pages/OfferDetailPage.tsx`: Updated navigation to use `/apply` route

## Usage

1. **Start your backend server** on `http://localhost:8000`
2. **Fill out the application form** through all 9 steps
3. **Upload CV** (optional) - file will be parsed and auto-fill some fields
4. **Record video introduction** (optional) - redirects to recording page
5. **Submit application** - all data is sent to your backend endpoint

## Backend Expected Response

Your backend should return JSON response:
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "applicationId": "optional-unique-id"
}
```

For errors:
```json
{
  "success": false, 
  "message": "Error description"
}
```

## Configuration

To change the backend URL, modify the `BASE_URL` in `src/services/api.ts`:
```typescript
private static readonly BASE_URL = 'http://localhost:8000';
```

## Testing

The form now includes:
- ✅ Real API calls to your backend
- ✅ File upload handling (CV + Video)
- ✅ Error handling and user feedback
- ✅ Loading states during submission
- ✅ Success/failure notifications
- ✅ Form validation before submission
