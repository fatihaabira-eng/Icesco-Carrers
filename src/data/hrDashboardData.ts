import {
  Users,
  Briefcase,
  ArrowUpRight,
  CircleDollarSign,
  Globe,
  Shield,
  MoreHorizontal,
} from 'lucide-react';

// Job Offer Status
export const jobOfferStatusData = {
  sent: 25,
  accepted: 15,
  pending: 5,
  neglected: 2,
  negotiation: 3,
  declined: 5,
};

// Declined Offers Reasons
export const declinedReasonsData = [
  { reason: 'Salary', percentage: 55, Icon: CircleDollarSign },
  { reason: 'Relocation', percentage: 20, Icon: Globe },
  { reason: 'Job Position', percentage: 10, Icon: Briefcase },
  { reason: 'Benefits', percentage: 10, Icon: ArrowUpRight },
  { reason: 'Others', percentage: 5, Icon: MoreHorizontal },
];

// ICESCO Vacancies KPIs
export const icescoVacanciesData = {
  openPositions: 3,
  requestedPositions: 18,
  approvedPositions: 12,
  totalCandidates: 95,
};

// Rejected Candidates Reasons
export const rejectedReasonsData = [
  { reason: 'Language', percentage: 10, Icon: Users },
  { reason: 'Integrity', percentage: 50, Icon: Shield },
  { reason: 'Relevant Experience', percentage: 20, Icon: Briefcase },
  { reason: 'Alignment with ICESCO values', percentage: 20, Icon: Globe },
];

// Recruitment Outreach KPIs
export const recruitmentOutreachData = {
  website: 120,
  socialMedia: 250,
  referral: 45,
  internal: 15,
  external: 80,
};

// Recruitment Efficiency KPIs
export const recruitmentEfficiencyData = {
  overallEfficiency: 88,
  successfulHires: 92,
  probationSuccess: 85,
  oneYearPerformance: 78,
};
