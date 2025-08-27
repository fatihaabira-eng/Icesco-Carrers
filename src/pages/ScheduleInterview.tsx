"use client"

import { useState } from "react"
import { CalendarIcon } from 'lucide-react'
import { Calendar } from "../components/calendar"
import { InterviewModal } from "../components/interview-modal"
import { DashboardHeader } from "../components/dashboard-header"
import { DashboardSection } from "../components/dashboard-section"

export interface InterviewData {
  date: string
  time: string
  type: 'HR' | 'committee' | 'BU'
  candidate: string
  candidateRef?: string
  jobPosition: string
  location: string
  businessUnit?: string
  questions?: any[]
}
const mockFixedInterviews: InterviewData[] = [
  {
    date: '2025-08-08',
    time: '09:00',
    type: 'HR',
    candidate: 'John Smith',
    jobPosition: 'Software Engineer',
    location: 'Conference Room A',
    businessUnit: 'Education Sector' // <-- must match a name in allBusinessUnits
  },
  {
    date: '2025-08-06',
    time: '10:00',
    type: 'committee',
    candidate: 'Sarah Johnson',
    jobPosition: 'Product Manager',
    location: 'Conference Room B',
    businessUnit: 'Sector of Strategy and Institutional Excellence'
  },
  {
    date: '2025-08-05',
    time: '14:00',
    type: 'BU',
    candidate: 'Michael Brown',
    jobPosition: 'UX Designer',
    location: 'Virtual Meeting',
    businessUnit: 'Culture and Communication Sector'
  }
];


export default function App() {
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null)
  const [interviews, setInterviews] = useState<InterviewData[]>(mockFixedInterviews)
  const [currentDate, setCurrentDate] = useState(new Date())

  const [jobFilter, setJobFilter] = useState('');
const [jobSuggestions, setJobSuggestions] = useState<string[]>([]);
const [buFilter, setBUFilter] = useState('');
const [buSuggestions, setBUSuggestions] = useState<{name: string, type: string}[]>([]);

const allJobPositions = Array.from(new Set(interviews.map(i => i.jobPosition)));
const allBusinessUnits = [
  { name: "Education Sector", type: "sector" },
  { name: "Sector of Strategy and Institutional Excellence", type: "sector" },
  { name: "Sector of Partnerships and International Cooperation", type: "sector" },
  { name: "Science and Environment Sector", type: "sector" },
  { name: "Culture and Communication Sector", type: "sector" },
  { name: "Social and Human Sciences Sector", type: "sector" },
  { name: "Media and Communication Sector", type: "sector" },
  { name: "External Specialized Offices and Centers", type: "center" },
  { name: "Center of Chairs, Scholarships and Prizes", type: "center" },
  { name: "Poetry and Literature Center", type: "center" },
  { name: "Calligraphie and Manuscript Center", type: "center" },
  { name: "Training Center", type: "center" },
  { name: "Center of Foresight and Artificial Intelligence", type: "center" },
  { name: "Civilizational Dialogue Center", type: "center" },
  { name: "Arabic Language Center for Non-Arabic Speakers", type: "center" },
  { name: "Islamic World Heritage Center", type: "center" },
  { name: "Center of Translation and Publishing", type: "center" },
  { name: "Director General Office", type: "support unit" },
  { name: "General Secretariat of National Commissions and Conferences", type: "support unit" },
  { name: "Department of legal affairs and international standards", type: "support unit" },
  { name: "Deputy Director General for Programs", type: "support unit" },
  { name: "Federation of Universities of the Islamic World", type: "support unit" },
  { name: "Department of Administrative Operations", type: "support unit" },
  { name: "Department of Digital Transformation", type: "support unit" },
  { name: "Department of Financial Operations", type: "support unit" },
  { name: "Internal Audit Department", type: "support unit" },
  { name: "Department of Public Relations and Protocol", type: "support unit" },
  { name: "Department of Design and Printing", type: "support unit" },
  { name: "Department of Human Capital Management", type: "support unit" },
];
const handleBUFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setBUFilter(value);
  setBUSuggestions(
    allBusinessUnits.filter(bu =>
      bu.name.toLowerCase().includes(value.toLowerCase())
    )
  );
  setJobFilter('');
};

const handleBUSuggestionClick = (buName: string) => {
  setBUFilter(buName);
  setBUSuggestions([]);
  setJobFilter('');
};


const handleBUInputFocus = () => setBUSuggestions(allBusinessUnits);



  const handleSlotClick = (date: string, time: string) => {
    setSelectedSlot({ date, time })
  }

  const handleScheduleInterview = (interviewData: InterviewData) => {
    setInterviews(prev => [...prev, interviewData])
    setSelectedSlot(null)
  }

  const handleCloseModal = () => {
    setSelectedSlot(null)
  }

  const handleTodayClick = () => {
    setCurrentDate(new Date())
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value)
    setCurrentDate(selectedDate)
  }

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

let filteredInterviews = interviews;
if (jobFilter) {
  filteredInterviews = filteredInterviews.filter(i => i.jobPosition === jobFilter);
}
if (buFilter) {
  filteredInterviews = filteredInterviews.filter(i => (i.businessUnit || '') === buFilter);
}

  const formatCurrentWeek = (date: Date) => {
    const currentDay = date.getDay()
    const monday = new Date(date)
    const daysUntilMonday = currentDay === 0 ? 1 : 1 - currentDay
    monday.setDate(date.getDate() + daysUntilMonday)
    
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)
    
    const monthYear = monday.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    
    if (monday.getMonth() === sunday.getMonth()) {
      return `${monday.getDate()} - ${sunday.getDate()} ${monthYear}`
    } else {
      const mondayMonth = monday.toLocaleDateString('en-US', { month: 'short' })
      const sundayMonth = sunday.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      return `${monday.getDate()} ${mondayMonth} - ${sunday.getDate()} ${sundayMonth}`
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="space-y-8">
         <DashboardHeader
  title="Interview Scheduler"
  description="Schedule and manage candidate interviews"
  currentDate={currentDate}
  onTodayClick={handleTodayClick}
  onDateChange={handleDateChange}
  formatCurrentWeek={formatCurrentWeek}
  formatDateForInput={formatDateForInput}
  jobFilter={jobFilter}
  buFilter={buFilter}
  jobSuggestions={jobSuggestions}
  buSuggestions={buSuggestions} 
  onJobFilterChange={e => {
    const value = e.target.value;
    setJobFilter(value);
    setJobSuggestions(
      allJobPositions.filter(pos =>
        pos.toLowerCase().includes(value.toLowerCase())
      )
    );
    setBUFilter('');
  }}
  onJobSuggestionClick={pos => {
    setJobFilter(pos);
    setJobSuggestions([]);
    setBUFilter('');
  }}
  onJobInputFocus={() => setJobSuggestions(allJobPositions)}
  onBUFilterChange={e => {
    const value = e.target.value;
    setBUFilter(value);
    setBUSuggestions(
      allBusinessUnits.filter(bu =>
        bu.name.toLowerCase().includes(value.toLowerCase())
      )
    );
    setJobFilter('');
  }}
  onBUSuggestionClick={bu => {
    setBUFilter(bu);
    setBUSuggestions([]);
    setJobFilter('');
  }}
  onBUInputFocus={() => setBUSuggestions(allBusinessUnits)}
/>

          <DashboardSection
            title="Weekly Schedule"
            description="View and manage interview time slots"
            icon={CalendarIcon}
          >
          <Calendar 
  onSlotClick={handleSlotClick}
  interviews={filteredInterviews}
  currentDate={currentDate}
/>
          </DashboardSection>
        </div>
      </div>

      {selectedSlot && (
        <InterviewModal
          selectedSlot={selectedSlot}
          onSchedule={handleScheduleInterview}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
