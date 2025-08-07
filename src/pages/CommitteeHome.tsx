import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Folder, Download, Star, Users } from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardSection from '@/components/DashboardSection';

const meetingMinutes = [
  { date: '2025-07-01', fileUrl: '/minutes/minute-2025-07-01.pdf' },
  { date: '2025-06-15', fileUrl: '/minutes/minute-2025-06-15.pdf' },
];

const committeeMembers = [
  {
    name: 'Prof. Dr.Raheel Qamar',
    title: 'Chief of sciences and technologies sector',
    joined: '2022-03-15',
    photoUrl: '/src/assets/dr-rahel.jpg',
  },
  {
    name: 'Dr. Ahmed Albanyan',
    title: 'Director of the center of translation and publishing',
    joined: '2023-01-10',
    photoUrl: '/src/assets/dr-ahmed-albanyan.webp',
  },
  {
    name: 'Mr. Anar Karimov',
    title: 'Chief of partnerships and international cooperation sector',
    joined: '2021-09-05',
    photoUrl: '/src/assets/dr-anar.jpg',
  },
  {
    name: 'Dr. Nidal Mohammad Zaidan Abuzuhri',
    title: 'Director of the administrative affairs departement',
    joined: '2023-01-10',
    photoUrl: '/src/assets/dr-nidal.jpg',
  },
  {
    name: 'Dr. Sally Mabrouk',
    title: 'Director of the office of director general',
    joined: '2021-09-05',
    photoUrl: '/src/assets/dr-sally-mabrouk.png',
  },
];

const recruitmentDecisions = [
  { businessUnit: 'DT', candidate: 'Ahmed Hassan', score: 85, decision: 'Hired' },
  { businessUnit: 'COM', candidate: 'Fatima Benali', score: 78, decision: 'Rejected' },
  { businessUnit: 'RC', candidate: 'Omar Khalil', score: 82, decision: 'Shortlisted' },
];

const CommitteeHome: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [dateRange, setDateRange] = useState('year');


  return (
    <div className="space-y-8">
     <Card>
        <CardHeader>
          <CardTitle className="text-lg">Committee Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {committeeMembers.map((member, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-gray-50 border rounded-lg p-4 shadow-sm"
              >
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mb-3 border"
                />
                <div className="font-semibold text-center">{member.name}</div>
                <div className="text-sm text-gray-700 text-center">{member.title}</div>
                <div className="text-xs text-gray-500 mt-1">Joined at: {member.joined}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
   

      {/* Block 1: Minutes of Meetings */}
      <DashboardSection
        title="Minutes of Meetings"
        description="Follow-up on committee meetings"
        icon={Users}
      >
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 text-center">
                  <TableHead className="text-center font-bold">Date</TableHead>
                  <TableHead className="text-center font-bold">Minute</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {meetingMinutes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground h-24">
                      No minutes found.
                    </TableCell>
                  </TableRow>
                ) : (
                  meetingMinutes.map((minute, idx) => (
                    <TableRow key={idx} className="text-center font-normal">
                      <TableCell className="text-center">{minute.date}</TableCell>
                      <TableCell className="text-center">
                        <a
                          href={minute.fileUrl}
                          download
                          className="inline-flex items-center gap-2 text-primary hover:underline"
                        >
                          <Folder className="h-5 w-5" />
                          <Download className="h-4 w-4" />
                          <span>Download minute</span>
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </DashboardSection>

      {/* Block 2: Committee Recruitment Decisions */}
      <DashboardSection
        title="Committee Recruitment Decisions"
        description="Decisions made by the recruitment committee"
        icon={Users}
      >
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 text-center">
                  <TableHead className="text-center font-bold">Business Unit</TableHead>
                  <TableHead className="text-center font-bold">Candidate</TableHead>
                  <TableHead className="text-center font-bold">Score</TableHead>
                  <TableHead className="text-center font-bold">Decision</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recruitmentDecisions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground h-24">
                      No decisions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  recruitmentDecisions.map((row, idx) => (
                    <TableRow key={idx} className="text-center font-normal">
                      <TableCell className="text-center">{row.businessUnit}</TableCell>
                      <TableCell className="text-center">{row.candidate}</TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center gap-1 justify-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          {row.score}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">{row.decision}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </DashboardSection>

      {/* Block 3: Recruitment Decisions */}
      <DashboardSection
        title="Recruitment Decisions"
        description="Decisions made by the recruitment committee"
        icon={Users}
      >
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 text-center">
                  <TableHead className="text-center font-bold">Business Unit</TableHead>
                  <TableHead className="text-center font-bold">Candidate</TableHead>
                  <TableHead className="text-center font-bold">Score</TableHead>
                  <TableHead className="text-center font-bold">Decision</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recruitmentDecisions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground h-24">
                      No decisions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  recruitmentDecisions.map((row, idx) => (
                    <TableRow key={idx} className="text-center font-normal">
                      <TableCell className="text-center">{row.businessUnit}</TableCell>
                      <TableCell className="text-center">{row.candidate}</TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center gap-1 justify-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          {row.score}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">{row.decision}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </DashboardSection>

      {/* Block 4: Recruitment Knowledge Hub */}
      <DashboardSection
        title="Recruitment Knowledge Hub"
        description="Access to committee resources"
        icon={Users}
      >
        <Card>
          <CardContent>
            <div className="flex flex-col gap-4">
              <a href="/resources/assessment-manual.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline text-base mt-6" >
                <Folder className="h-5 w-5" /> Assessment manual
              </a>
              <a href="/resources/recruitment-policy.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline text-base">
                <Folder className="h-5 w-5" /> Recruitment Policy
              </a>
            </div>
          </CardContent>
        </Card>
      </DashboardSection>
    </div>
  );
};

export default CommitteeHome;