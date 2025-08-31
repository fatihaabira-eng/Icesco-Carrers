import { Education } from "@/Types/Education";
import { Certification } from "@/Types/Certification";
import { Reference } from "@/Types/Reference";
import { Experience } from "@/Types/Experience";
import { SocialMedia } from "@/Types/SocialMedia";
import { Language } from "@/Types/Language";

export interface FormData {
  offerId: string;
  fullName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  nationality: string;
  dateOfBirth: string;
  address: string;
  education: Education[];
  certifications: Certification[];
  experience: Experience[];
  technicalSkills: string[];
  managerialSkills: string[];
  technicalSkillsEvidence: { [skill: string]: File | null }; // Add evidence for technical skills
  managerialSkillsEvidence: { [skill: string]: File | null }; // Add evidence for managerial skills
  languages: Language[];
  socialMedia: SocialMedia[];
  practicalExperience: string;
  references: Reference[];
  cv: File | null;
  videoIntroSubmitted: boolean;
  videoFile: File | null;
  skillExperiences: { [skill: string]: number[] };
  skillEducation: { [skill: string]: number[] };
}