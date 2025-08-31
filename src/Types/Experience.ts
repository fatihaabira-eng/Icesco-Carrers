export interface Experience {
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string;
   achievementType?: string; // Add achievement type
  achievementFile?: File | null; // Add achievement file
  achievementLink?: string; // Add achievement link
  current: boolean;
}