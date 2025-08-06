import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Mock data for vacancies and candidates
const mockVacancies = [
  {
    id: 'JOB-1',
    reference: 'REF-2025-001',
    jobTitle: 'Senior Software Engineer',
    businessUnit: 'Technology Division',
    location: 'Rabat, Morocco',
    closingDate: '2025-09-01T00:00:00Z',
    publishedDate: '2025-08-01T00:00:00Z',
    positionsNeeded: 2,
    status: 'published' as const,
    applicants: 15,
    shortlisted: 5,
    hired: 1,
    rejected: 3,
    candidates: [
      { id: 'CAND-1', name: 'Alice Smith', jobTitle: 'Senior Software Engineer', stage: 'new' as const, stageDate: '2025-08-02T00:00:00Z' },
      { id: 'CAND-2', name: 'Bob Johnson', jobTitle: 'Senior Software Engineer', stage: 'interview' as const, stageDate: '2025-08-03T00:00:00Z' },
      { id: 'CAND-3', name: 'Clara Brown', jobTitle: 'Senior Software Engineer', stage: 'hired' as const, stageDate: '2025-08-04T00:00:00Z' },
    ],
  },
  {
    id: 'JOB-2',
    reference: 'REF-2025-002',
    jobTitle: 'Marketing Manager',
    businessUnit: 'Marketing & Sales',
    location: 'Casablanca, Morocco',
    closingDate: '2025-08-20T00:00:00Z',
    publishedDate: '2025-07-25T00:00:00Z',
    positionsNeeded: 1,
    status: 'draft' as const,
    applicants: 8,
    shortlisted: 2,
    hired: 0,
    rejected: 1,
    candidates: [
      { id: 'CAND-4', name: 'David Lee', jobTitle: 'Marketing Manager', stage: 'under_review' as const, stageDate: '2025-07-26T00:00:00Z' },
      { id: 'CAND-5', name: 'Emma Wilson', jobTitle: 'Marketing Manager', stage: 'offer' as const, stageDate: '2025-07-28T00:00:00Z' },
    ],
  },
  {
    id: 'JOB-3',
    reference: 'REF-2025-003',
    jobTitle: 'Financial Analyst',
    businessUnit: 'Finance',
    location: 'Marrakech, Morocco',
    closingDate: '2025-10-01T00:00:00Z',
    publishedDate: '2025-08-03T00:00:00Z',
    positionsNeeded: 3,
    status: 'archived' as const,
    applicants: 20,
    shortlisted: 8,
    hired: 2,
    rejected: 5,
    candidates: [
      { id: 'CAND-6', name: 'Frank Davis', jobTitle: 'Financial Analyst', stage: 'new' as const, stageDate: '2025-08-04T00:00:00Z' },
    ],
  },
];

interface Vacancy {
  id: string;
  reference: string;
  jobTitle: string;
  businessUnit: string;
  location: string;
  closingDate: string;
  publishedDate: string;
  positionsNeeded: number;
  status: 'published' | 'draft' | 'archived';
  applicants: number;
  shortlisted: number;
  hired: number;
  rejected: number;
  candidates: Candidate[];
}

interface Candidate {
  id: string;
  name: string;
  jobTitle: string;
  stage: 'new' | 'under_review' | 'interview' | 'offer' | 'hired';
  stageDate: string;
}

interface VacanciesListViewProps {
  onCreateNew?: () => void;
}

const stages = [
  { id: 'new', title: 'New', color: 'bg-blue-100' },
  { id: 'under_review', title: 'Under Review', color: 'bg-yellow-100' },
  { id: 'interview', title: 'Interview', color: 'bg-purple-100' },
  { id: 'offer', title: 'Offer', color: 'bg-orange-100' },
  { id: 'hired', title: 'Hired', color: 'bg-green-100' },
] as const;

const VacanciesListView: React.FC<VacanciesListViewProps> = ({ onCreateNew }) => {
  const [vacancies, setVacancies] = useState<Vacancy[]>(mockVacancies);
  const [expandedVacancy, setExpandedVacancy] = useState<string | null>(null);

  const handleStageChange = (vacancyId: string, candidateId: string, newStage: Candidate['stage']) => {
    setVacancies((prev) =>
      prev.map((vacancy) => {
        if (vacancy.id === vacancyId) {
          const updatedCandidates = vacancy.candidates.map((candidate) =>
            candidate.id === candidateId
              ? { ...candidate, stage: newStage, stageDate: new Date().toISOString() }
              : candidate
          );
          // Update counts based on stage changes
          const shortlisted = updatedCandidates.filter((c) => ['under_review', 'interview', 'offer'].includes(c.stage)).length;
          const hired = updatedCandidates.filter((c) => c.stage === 'hired').length;
          const rejected = vacancy.applicants - shortlisted - hired; // Assuming rejected = total applicants - (shortlisted + hired)
          return { ...vacancy, candidates: updatedCandidates, shortlisted, hired, rejected };
        }
        return vacancy;
      })
    );
  };

  const togglePipeline = (vacancyId: string) => {
    setExpandedVacancy((prev) => (prev === vacancyId ? null : vacancyId));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Vacancies</CardTitle>
            <Button onClick={onCreateNew} className="flex items-center space-x-2">
              <PlusCircle className="h-4 w-4" />
              <span>Create New Vacancy</span>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Vacancies Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Closing Date</TableHead>
                <TableHead>Business Unit</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead>Positions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Shortlisted</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead>Hired</TableHead>
                <TableHead>Rejected</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vacancies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={13} className="text-center text-muted-foreground">
                    No vacancies found.
                  </TableCell>
                </TableRow>
              ) : (
                vacancies.map((vacancy) => (
                  <React.Fragment key={vacancy.id}>
                    <TableRow>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePipeline(vacancy.id)}
                          aria-label={expandedVacancy === vacancy.id ? 'Collapse pipeline' : 'Expand pipeline'}
                        >
                          {expandedVacancy === vacancy.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>{vacancy.reference}</TableCell>
                      <TableCell className="font-medium">{vacancy.jobTitle}</TableCell>
                      <TableCell>{format(new Date(vacancy.closingDate), 'PPP')}</TableCell>
                      <TableCell>{vacancy.businessUnit}</TableCell>
                      <TableCell>{vacancy.location}</TableCell>
                      <TableCell>{format(new Date(vacancy.publishedDate), 'PPP')}</TableCell>
                      <TableCell>{vacancy.positionsNeeded}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            vacancy.status === 'published'
                              ? 'default'
                              : vacancy.status === 'draft'
                              ? 'secondary'
                              : 'destructive'
                          }
                        >
                          {vacancy.status.charAt(0).toUpperCase() + vacancy.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{vacancy.shortlisted}</TableCell>
                      <TableCell>{vacancy.applicants}</TableCell>
                      <TableCell>{vacancy.hired}</TableCell>
                      <TableCell>{vacancy.rejected}</TableCell>
                    </TableRow>
                    {expandedVacancy === vacancy.id && (
                      <TableRow>
                        <TableCell colSpan={13} className="p-0">
                          <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                              {stages.map((stage) => (
                                <div key={stage.id} className="flex flex-col">
                                  <div className={cn('p-2 rounded-t-md', stage.color)}>
                                    <h3 className="text-sm font-semibold">{stage.title}</h3>
                                  </div>
                                  <div className="space-y-2 p-2">
                                    {vacancy.candidates
                                      .filter((candidate) => candidate.stage === stage.id)
                                      .map((candidate) => (
                                        <Card key={candidate.id} className="shadow-sm">
                                          <CardContent className="p-3">
                                            <div className="space-y-1">
                                              <div className="font-medium text-sm">{candidate.name}</div>
                                              <div className="text-xs text-muted-foreground">
                                                {candidate.jobTitle}
                                              </div>
                                              <div className="text-xs text-muted-foreground">
                                                In stage since: {format(new Date(candidate.stageDate), 'PPP')}
                                              </div>
                                              <Select
                                                value={candidate.stage}
                                                onValueChange={(value) =>
                                                  handleStageChange(vacancy.id, candidate.id, value as Candidate['stage'])
                                                }
                                              >
                                                <SelectTrigger className="w-full text-xs">
                                                  <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  {stages.map((s) => (
                                                    <SelectItem key={s.id} value={s.id}>
                                                      {s.title}
                                                    </SelectItem>
                                                  ))}
                                                </SelectContent>
                                              </Select>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      ))}
                                    {vacancy.candidates.filter((candidate) => candidate.stage === stage.id).length ===
                                      0 && (
                                      <div className="text-center text-muted-foreground text-xs">
                                        No candidates in this stage.
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default VacanciesListView;