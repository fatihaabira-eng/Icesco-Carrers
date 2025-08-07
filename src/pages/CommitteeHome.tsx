import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Folder, Download, Star, Users } from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardSection from '@/components/DashboardSection';
import anarimage from '@/assets/dr-anar.jpg';
import nidalimage from '@/assets/dr-nidal.jpg';
import albanyanimage from '@/assets/dr-ahmed-albanyan.webp';
import sallyMabroukImage from '@/assets/dr-sally-mabrouk.png';
import rahelimage from '@/assets/dr-rahel.jpg';

const meetingMinutes = [
  { date: '2025-07-01', fileUrl: '/minutes/minute-2025-07-01.pdf' },
  { date: '2025-06-15', fileUrl: '/minutes/minute-2025-06-15.pdf' },
];

const committeeMembers = [
  {
    name: 'Prof. Dr.Raheel Qamar',
    title: 'Chief of sciences and technologies sector',
    joined: '2022-03-15',
    photoUrl: rahelimage,
  },
  {
    name: 'Dr. Ahmed Albanyan',
    title: 'Director of the center of translation and publishing',
    joined: '2023-01-10',
    photoUrl: albanyanimage,
  },
  {
    name: 'Mr. Anar Karimov',
    title: 'Chief of partnerships and international cooperation sector',
    joined: '2021-09-05',
    photoUrl: anarimage,
  },
  {
    name: 'Dr. Nidal Mohammad Zaidan Abuzuhri',
    title: 'Director of the administrative affairs departement',
    joined: '2023-01-10',
    photoUrl: nidalimage,
  },
  {
    name: 'Dr. Sally Mabrouk',
    title: 'Director of the office of director general',
    joined: '2021-09-05',
    photoUrl: sallyMabroukImage,
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

       <DashboardSection
        title="Committee Members"
        description="List of committee members"
        icon={Users}
      >
        
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
            <TableHead className="text-center font-bold">Date</TableHead>
            <TableHead className="text-center font-bold">Meeting Minutes</TableHead>
            <TableHead className="text-center font-bold">Recruitment Decisions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meetingMinutes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground h-24">
                No decisions found.
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
                    className="inline-flex items-center gap-2 text-primary hover:underline justify-center"
                    title="Download meeting minute"
                  >
                    <Folder className="h-5 w-5" />
                  </a>
                </TableCell>
                <TableCell className="text-center">
                  <a
                    href={`/recruitment-decisions/${minute.date}`}
                    className="inline-flex items-center gap-2 text-primary hover:underline justify-center"
                    title="View recruitment decision"
                  >
                    <Folder className="h-5 w-5" />
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

      {/* Block 4: Recruitment Knowledge Hub */}
    <DashboardSection
  title="Recruitment Knowledge Hub"
  description="Access to committee resources"
  icon={Users}
>
  <Card>
    <CardContent>
      <div className="flex flex-row gap-24 mt-6 justify-center">
        <a
          href="/resources/assessment-manual.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary hover:underline text-base"
        >
          <Folder className="h-5 w-5" /> Assessment manual
        </a>
        <a
          href="/resources/recruitment-policy.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary hover:underline text-base"
        >
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