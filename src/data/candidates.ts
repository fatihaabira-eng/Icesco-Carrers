export interface Candidate {
  id: string;
  businessUnit: string;
  score: number;
  ref: string;
  name: string;
  position: string;
  nationality: string;
  flag: string;
  age: number;
  degree: string;
  university: string;
  experience: string;
  matchingScore: number;
  skills: string[];
  languages: string[];
  phase: string;
  decision: 'hired' | 'rejected' | 'under_review';
  avatar: string;
  hrAction: 'shortlist' | 'reject' | 'not-reviewed' | 'under-review';
  appliedDate: string;
  email: string;
  status: 'hired' | 'rejected' | 'under_review' | 'new' | 'interview' | 'offer' | 'declined';
  phone: string;
  location: string;
  year: number;
  videoUrl?: string;
  aiScreeningScore: number;
  aiRecommendations: string[];
  resumeData?: {
    extractedSkills: string[];
    workExperience: string[];
    education: string[];
    certifications: string[];
    languages: string[];
    parsedDate: string;
  };
  education: string;
}
