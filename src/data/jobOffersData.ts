export interface Candidate {
  id: string;
  name: string;
  jobTitle: string;
  stage: 'new' | 'under_review' | 'interview' | 'offer' | 'hired' | 'rejected';
  stageDate: string;
}

export interface JobOffer {
  id: string;
  title: string;
  department: string;
  type: string;
  status: 'active' | 'draft' | 'closed' | 'archived';
  applications: number;
  publishedDate: string | null;
  closingDate: string | null;
  description: string;
  requirements: string[];
  salary: string;
  experience: string;
  year: number;
  positions: number;
  candidates: Candidate[];
}

export const jobOffersData: JobOffer[] = [
  {
    id: 'SHS25001',
    title: 'Senior Software Engineer',
    department: 'DT',
    type: 'Full-time',
    status: 'active',
    applications: 45,
  publishedDate: '2025-08-10',
    closingDate: '2025-02-10',
    description: 'Lead development of educational technology platforms',
    requirements: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    salary: 'Competitive',
    experience: '5+ years',
    year: 2025,
    positions: 1,
    candidates: [
      { id: 'CAND-1', name: 'Alice Smith', jobTitle: 'Senior Software Engineer', stage: 'interview', stageDate: '2025-01-15' },
      { id: 'CAND-2', name: 'Bob Johnson', jobTitle: 'Senior Software Engineer', stage: 'offer', stageDate: '2025-01-16' },
      { id: 'CAND-3', name: 'Clara Brown', jobTitle: 'Senior Software Engineer', stage: 'hired', stageDate: '2025-01-17' },
      { id: 'CAND-6', name: 'Frank White', jobTitle: 'Senior Software Engineer', stage: 'rejected', stageDate: '2024-01-18' },
    ]
  },
  {
    id: 'SHS25002',
    title: 'Marketing Manager',
    department: 'CCS',
    type: 'Full-time',
    status: 'active',
    applications: 32,
  publishedDate: '2025-08-08',
    closingDate: '2025-02-08',
    description: 'Design and implement innovative marketing strategies',
    requirements: ['Digital Marketing', 'Strategy', 'Analytics', 'Arabic', 'French'],
    salary: 'Competitive',
    experience: '3-5 years',
    year: 2025,
    positions: 1,
    candidates: [
      { id: 'CAND-4', name: 'David Lee', jobTitle: 'Marketing Manager', stage: 'under_review', stageDate: '2024-01-12' },
      { id: 'CAND-5', name: 'Emma Wilson', jobTitle: 'Marketing Manager', stage: 'interview', stageDate: '2024-01-14' },
      { id: 'CAND-7', name: 'Grace Hall', jobTitle: 'Marketing Manager', stage: 'rejected', stageDate: '2024-01-15' },
    ]
  },
  {
    id: 'SHS25003',
    title: 'Education Program Manager',
    department: 'ED',
    type: 'Contract',
    status: 'draft',
    applications: 0,
    publishedDate: "2024-01-10",
    closingDate: "2024-02-10",
    description: 'Design and implement innovative educational programs',
    requirements: ['Program Management', 'Educational Design', 'Stakeholder Management'],
    salary: 'Competitive',
    experience: '3-5 years',
    year: 2025,
    positions: 2,
    candidates: []
  }
];
