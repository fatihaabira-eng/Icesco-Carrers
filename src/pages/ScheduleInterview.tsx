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
  jobPosition: string
  location: string
  businessUnit?: string
}

const mockFixedInterviews: InterviewData[] = [
  {
    date: '2025-08-08',
    time: '09:00',
    type: 'HR',
    candidate: 'John Smith',
    jobPosition: 'Software Engineer',
    location: 'Conference Room A',
    businessUnit: 'Engineering'
  },
  {
    date: '2025-08-06',
    time: '10:00', // changed from 10:30 to 10:00
    type: 'committee',
    candidate: 'Sarah Johnson',
    jobPosition: 'Product Manager',
    location: 'Conference Room B',
    businessUnit: 'Product'
  },
  {
    date: '2025-08-05',
    time: '14:00',
    type: 'BU',
    candidate: 'Michael Brown',
    jobPosition: 'UX Designer',
    location: 'Virtual Meeting',
    businessUnit: 'Marketing'
  }
];



export default function App() {
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null)
  const [interviews, setInterviews] = useState<InterviewData[]>(mockFixedInterviews)
  const [currentDate, setCurrentDate] = useState(new Date())

  const [jobFilter, setJobFilter] = useState('');
const [jobSuggestions, setJobSuggestions] = useState<string[]>([]);
const [buFilter, setBUFilter] = useState('');
const [buSuggestions, setBUSuggestions] = useState<string[]>([]);

const allJobPositions = Array.from(new Set(interviews.map(i => i.jobPosition)));
const allBusinessUnits = Array.from(new Set(interviews.map(i => i.businessUnit || '')));

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
  filteredInterviews = interviews.filter(i => i.jobPosition === jobFilter);
} else if (buFilter) {
  filteredInterviews = interviews.filter(i => (i.businessUnit || '') === buFilter);
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
        bu.toLowerCase().includes(value.toLowerCase())
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
