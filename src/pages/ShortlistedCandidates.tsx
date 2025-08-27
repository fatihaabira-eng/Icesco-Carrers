import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Star, ArrowUpDown, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CandidateProfile from '@/components/CandidateProfileMatching';
import { InterviewModal } from '@/components/interview-shortlisted-modal';

import { candidatesData, Candidate } from '../data/candidatesData';
import Pagination from '@/components/Pagination';

// Updated Candidate interface to match HRCandidates


interface InterviewData {
  date: string;
  time: string;
  type?: string;
  candidate?: string;
  jobPosition?: string;
  location?: string;
  duration?: string;
  businessUnit?: string;
  questions?: any[];
}

const ShortlistedCandidates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobRef, setSelectedJobRef] = useState('all');
  const [sortBy, setSortBy] = useState('score');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [selectedInterviewCandidate, setSelectedInterviewCandidate] = useState<Candidate | null>(null);
  const [scheduledInterviews, setScheduledInterviews] = useState<{ [ref: string]: InterviewData }>({});
  const [candidates, setCandidates] = useState<Candidate[]>(candidatesData);


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // you can make this selectable
  
  // Create unique job references with their corresponding titles
  const jobOffers = [
    { value: 'all', label: 'All Job Offers' },
    ...Array.from(
      new Map(
        candidatesData.map((candidate) => [candidate.ref, { value: candidate.ref, label: `${candidate.ref} - ${candidate.position}` }])
      ).values()
    ),
  ];

  const getHrActionColor = (action: string) => {
    switch (action) {
      case 'shortlist':
        return 'bg-green-500 text-white';
      case 'reject':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'hired':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsEvaluationOpen(true);
  };

  const handleCloseProfile = () => {
    setSelectedCandidate(null);
    setIsEvaluationOpen(false);
  };

  const handleStatusChange = (candidateRef: string, newStatus: string, reason?: string) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.ref === candidateRef
          ? { ...candidate, decision: newStatus as 'hired' | 'rejected' }
          : candidate
      )
    );
    console.log(`Updated candidate ${candidateRef} to status ${newStatus}${reason ? ` with reason: ${reason}` : ''}`);
  };

  const handleHrActionChange = (candidateRef: string, action: 'shortlist' | 'reject' | 'not-reviewed') => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.ref === candidateRef ? { ...candidate, hrAction: action } : candidate
      )
    );
  };

  const handleScheduleInterview = (candidateRef: string, interviewData: InterviewData) => {
    setScheduledInterviews(prev => ({ ...prev, [candidateRef]: interviewData }));
    setIsInterviewModalOpen(false);
  };

  const filteredCandidates = candidatesData
    .filter(
      (candidate) =>
        candidate.hrAction === 'shortlist' &&
        (candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.position.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(
      (candidate) =>
        selectedJobRef === 'all' || candidate.ref === selectedJobRef
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.matchingScore - a.matchingScore;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'age':
          return a.age - b.age;
        default:
          return 0;
      }
    });

     // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="">
      <div>
        <div className="flex items-center space-x-2">
        
          <h1 className="text-3xl font-bold tracking-tight">Shortlisted Candidates</h1>

            <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800 border-blue-200">
            Shortlisted
          </Badge>
        </div>
      
        <p className="text-muted-foreground">Review and manage your shortlisted candidates.</p>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={selectedJobRef} onValueChange={setSelectedJobRef}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {jobOffers.map((jobOffer) => (
                    <SelectItem key={jobOffer.value} value={jobOffer.value}>
                      {jobOffer.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="w-24 font-semibold text-gray-700 py-3 text-left">Ref</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-3 text-left">Job Position</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-3 text-center  ">Candidate</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-3 text-center">Nationality</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-3 text-center">Years of Experience</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-3 text-left">Degree</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-3 text-center">Take action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCandidates.map((candidate) => (
                  <TableRow key={candidate.ref} className="hover:bg-gray-50 transition-colors border-b border-gray-200">
                    <TableCell className="font-medium text-gray-600 py-3 text-left">{candidate.ref}</TableCell>
                    <TableCell className="font-medium text-gray-600 py-3 text-left">
                      <p className="text-sm">{candidate.position}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {candidate.skills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs bg-yellow-200 text-yellow-800 border-yellow-100">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 2 && (
                          <Badge variant="outline" className="text-xs bg-yellow-200 text-yellow-800 border-yellow-100">
                            +{candidate.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-600 py-3 text-left">
                      <div className="flex items-center gap-3 justify-between">
                        <img src={candidate.avatar} alt={candidate.name} className="h-10 w-10 rounded-full object-cover" />
                        <div>
                          <p className="text-sm text-left">{candidate.name}</p>
                        </div>

                        <Button size="sm" variant="outline" onClick={() => handleCandidateClick(candidate)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-medium text-gray-600 py-3">
                      <div className="flex items-center justify-between gap-1">
                        <img
                          src={candidate.flag}
                          alt={`${candidate.nationality} flag`}
                          className="h-5 w-7 object-cover rounded-sm shadow-sm"
                        />
                        <span className="text-sm ">{candidate.nationality}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-medium text-gray-600 py-3">
                      {candidate.experience}
                    </TableCell>
                    <TableCell className="font-medium text-gray-600 py-3 text-left">
                      <p className="text-sm">{candidate.degree}</p>
                    </TableCell>
                    <TableCell className="text-center font-medium text-gray-600 py-3">
                      {scheduledInterviews[candidate.ref] ? (
                        <Button size="sm" variant="outline" onClick={() => { setSelectedInterviewCandidate(candidate); setIsInterviewModalOpen(true); }}>
                          Interview Planified
                        </Button>
                      ) : (
                        <Button size="sm" variant="default" onClick={() => { setSelectedInterviewCandidate(candidate); setIsInterviewModalOpen(true); }}>
                          Schedule Interview
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

           <Pagination
           currentPage={currentPage}
           totalPages={totalPages}
           onPageChange={handlePageChange}
         />
        </CardContent>
      </Card>

      {selectedCandidate && (
            <CandidateProfile
              candidate={selectedCandidate}
              onClose={handleCloseProfile}
              onStatusChange={handleStatusChange}
            />
          )}

      {/* Interview Planning Modal */}
      {isInterviewModalOpen && selectedInterviewCandidate && (
        <InterviewModal
          selectedSlot={scheduledInterviews[selectedInterviewCandidate.ref]
            ? scheduledInterviews[selectedInterviewCandidate.ref]
            : {
                date: '',
                time: '',
                candidate: selectedInterviewCandidate.name,
                jobPosition: selectedInterviewCandidate.position,
                businessUnit: selectedInterviewCandidate.businessUnit,
                location: selectedInterviewCandidate.location,
              }
          }
          onSchedule={(data) => handleScheduleInterview(selectedInterviewCandidate.ref, data)}
          onClose={() => setIsInterviewModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ShortlistedCandidates;