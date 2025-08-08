import { useState } from "react"
import { X, User, Users,Trash2, Building2, MapPin,Video, Briefcase, Calendar, Clock, CheckCircle, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { InterviewData } from "../pages/ScheduleInterview"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface InterviewModalProps {
  selectedSlot: { date: string; time: string }
  onSchedule: (data: InterviewData) => void
  onClose: () => void
}

const mockCandidates = [
  {
    id: 1,
    name: 'Ahmed Hassan El-Masri',
    position: 'Senior Software Engineer',
    email: 'ahmed.hassan@email.com',
    phone: '+20 123 456 789',
    avatar: '/api/placeholder/40/40',
    status: 'Shortlisted'
  },
  {
    id: 2,
    name: 'Fatima Al-Zahra Benali',
    position: 'Marketing Manager',
    email: 'fatima.benali@email.com',
    phone: '+212 123 456 789',
    avatar: '/api/placeholder/40/40',
    status: 'Technical Round'
  },
  {
    id: 3,
    name: 'Omar Khalil Al-Rashid',
    position: 'Education Specialist',
    email: 'omar.rashid@email.com',
    phone: '+962 123 456 789',
    avatar: '/api/placeholder/40/40',
    status: 'HR Interview'
  }
];

const defaultQuestions = [
  {
    key: "q1",
    label: "💡 Motivation / Culture Fit",
    content: "In your video, you mentioned your alignment with ICESCO’s mission. Can you elaborate on how your previous work reflects a commitment to inclusive and sustainable education?"
  },
  {
    key: "q2",
    label: "💻 Technical Skills – EMIS / EdTech",
    content: (
      <>
        <div>You worked on an EMIS project with UNICEF. What were the main challenges in implementing that system, and how did you overcome them?</div>
        <div className="mt-2">What criteria do you use to select EdTech tools for rural or low-resource environments, and how did you apply this in your previous digitalization project?</div>
      </>
    )
  },
  {
    key: "q3",
    label: "🤝 Behavioral (STAR Method) / Project Management",
    content: "Tell us about a time you managed a cross-cultural education team across multiple countries. What difficulties did you face, and how did you ensure collaboration?"
  },
  {
    key: "q4",
    label: "📈 Fundraising / Stakeholder Engagement",
    content: "Have you ever led or contributed to fundraising efforts for an education project? If so, how did you present the value proposition to donors?"
  },
  {
    key: "q5",
    label: "👶 Early Childhood Development (ECD) / Inclusion",
    content: "What approaches have you used to ensure inclusive access to early childhood education, particularly in communities with linguistic or cultural diversity?"
  },
  {
    key: "q6",
    label: "🗣️ Communication & International Relations",
    content: "Being fluent in three languages is a major asset. Can you give an example where your multilingual skills helped resolve a communication issue or build trust with stakeholders?"
  }
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const mockJobPositions = [
  "sh-113-003-softwareengineer",
  "sh-113-004-productmanager",
  "sh-113-005-uxdesigner",
  "sh-113-006-dataanalyst",
  "sh-113-007-marketingspecialist"
]

const mockLocations = [
  { label: "Video Conference", value: "Video Conference", icon: Video },
  { label: "In-Person", value: "In-Person", icon: MapPin },
  { label: "Phone Call", value: "Phone Call", icon: Clock }
];

const mockBusinessUnits = [
  "Engineering", "Product", "Marketing", "Sales", "Operations", "Human Resources", "Education"
];



export function InterviewModal({ selectedSlot, onSchedule, onClose }: InterviewModalProps) {
  const [interviewType, setInterviewType] = useState<'HR' | 'committee' | 'BU'>('HR')
  const [questionJobFilter, setQuestionJobFilter] = useState('');
  const [questionBUFilter, setQuestionBUFilter] = useState('');

 const [questions, setQuestions] = useState(defaultQuestions);


  const [candidateSearch, setCandidateSearch] = useState('');
  const [selectedBusinessUnits, setSelectedBusinessUnits] = useState<string[]>([]);
  const [candidate, setCandidate] = useState<number | undefined>(undefined)
  const [jobPosition, setJobPosition] = useState('')
  const [location, setLocation] = useState('')
  const [businessUnit, setBusinessUnit] = useState('')
const [showQuestions, setShowQuestions] = useState(false);

  const getJobPositionCode = (index: number, title: string) =>
  `sh-113-${(index + 3).toString().padStart(3, '0')}-${title.replace(/\s+/g, '').toLowerCase()}`;

// Replace your job position suggestion rendering with:
{mockJobPositions
  .filter(pos =>
    pos.toLowerCase().includes(jobPosition.toLowerCase())
  )
  .map((pos, idx) => (
    <div
      key={pos}
      className="px-3 py-2 cursor-pointer hover:bg-muted"
      onClick={() => setJobPosition(getJobPositionCode(idx, pos))}
    >
      {getJobPositionCode(idx, pos)}
    </div>
  ))}

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const handleSubmit = () => {
    if (candidate === undefined || !jobPosition || !location || (interviewType === 'BU' && !businessUnit)) {
      return
    }

    const interviewData: InterviewData = {
      date: selectedSlot.date,
      time: selectedSlot.time,
      type: interviewType,
      candidate: mockCandidates.find(c => c.id === candidate)?.name || '',
      jobPosition,
      location,
      ...(interviewType === 'BU' && { businessUnit })
    }

    onSchedule(interviewData)
  }

  const isFormValid = candidate !== undefined && jobPosition && location && (interviewType !== 'BU' || businessUnit)

  const getInterviewTypeIcon = (type: string) => {
    switch (type) {
      case 'HR': return User
      case 'committee': return Users
      case 'BU': return Building2
      default: return Briefcase
    }
  }

  const getInterviewTypeColor = (type: string) => {
    switch (type) {
      case 'HR': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'committee': return 'text-emerald-600 bg-emerald-50 border-emerald-200'
      case 'BU': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
  <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Schedule Interview</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Block: Existing Content */}
          <div className="w-full md:w-1/2 space-y-4">
            {/* Date and Time */}
            <div className="bg-muted/50 p-4 rounded-md border">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-teal-700" />
                <div className="text-sm font-medium text-muted-foreground">Selected Date & Time</div>
              </div>
              <div className="text-lg font-bold">
                {formatDate(selectedSlot.date)} at {selectedSlot.time}
              </div>
            </div>

            {/* Interview Type */}
            <div className="space-y-2">
              <Label htmlFor="interview-type" className="text-sm font-medium flex items-center space-x-2">
                <Briefcase className="h-4 w-4 text-teal-700" />
                <span>Interview Type</span>
              </Label>
              <Select value={interviewType} onValueChange={(value: 'HR' | 'committee' | 'BU') => setInterviewType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HR">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-teal-700" />
                      <span>HR Interview</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="BU">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4" />
                      <span>Technical Interview</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="committee">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Committee Interview</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
  <Label htmlFor="job-position" className="text-sm font-medium flex items-center space-x-2">
    <Briefcase className="h-4 w-4" />
    <span>Job Position</span>
  </Label>
  <div className="relative">
    <input
      type="text"
      value={jobPosition}
      onChange={e => setJobPosition(e.target.value)}
      placeholder="Type or select job position"
      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      autoComplete="off"
      disabled={!!jobPosition && mockJobPositions.includes(jobPosition)}
    />
    {jobPosition.trim().length > 0 && (!jobPosition || !mockJobPositions.includes(jobPosition)) && (
      <div className="absolute z-10 left-0 right-0 bg-white border rounded shadow mt-1 max-h-40 overflow-y-auto">
        {mockJobPositions
          .filter(pos =>
            pos.toLowerCase().includes(jobPosition.toLowerCase())
          )
          .map(pos => (
            <div
              key={pos}
              className="px-3 py-2 cursor-pointer hover:bg-muted"
              onClick={() => setJobPosition(pos)}
            >
              {pos}
            </div>
          ))}
        {mockJobPositions.filter(pos =>
          pos.toLowerCase().includes(jobPosition.toLowerCase())
        ).length === 0 && (
          <div className="px-3 py-2 text-muted-foreground text-sm">No match</div>
        )}
      </div>
    )}
    {jobPosition && mockJobPositions.includes(jobPosition) && (
      <div className="mt-2 flex items-center gap-2">
        <Badge variant="outline" className="text-base">
          {jobPosition}
          <button
            type="button"
            className="ml-2 text-red-500 hover:text-red-700"
            onClick={() => setJobPosition('')}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      </div>
    )}
  </div>
</div>

{/* Candidate Selection */}
<div className="space-y-2">
  <Label htmlFor="candidate" className="text-sm font-medium flex items-center space-x-2">
    <User className="h-4 w-4" />
    <span>Candidate</span>
  </Label>
  <div className="relative">
    <input
      type="text"
      value={
        candidate
          ? mockCandidates.find(c => c.id === candidate)?.name || candidateSearch || ''
          : candidateSearch || ''
      }
      onChange={e => {
        setCandidate(undefined);
        setCandidateSearch(e.target.value);
      }}
      placeholder="Type or select candidate"
      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      autoComplete="off"
      disabled={!!candidate}
    />
    {!candidate && candidateSearch.trim().length > 0 && (
      <div className="absolute z-10 left-0 right-0 bg-white border rounded shadow mt-1 max-h-40 overflow-y-auto">
        {mockCandidates
          .filter(c =>
            c.name.toLowerCase().includes(candidateSearch.toLowerCase())
          )
          .map(c => (
            <div
              key={c.id}
              className="px-3 py-2 cursor-pointer hover:bg-muted flex items-center gap-2"
              onClick={() => {
                setCandidate(c.id);
                setCandidateSearch('');
              }}
            >
              
              <span>{c.name}</span>
              <span className="text-xs text-muted-foreground">{c.position}</span>
            </div>
          ))}
        {mockCandidates.filter(c =>
          c.name.toLowerCase().includes(candidateSearch.toLowerCase())
        ).length === 0 && (
          <div className="px-3 py-2 text-muted-foreground text-sm">No match</div>
        )}
      </div>
    )}
    {candidate && (
      <div className="mt-2 flex items-center gap-2">
        <Badge variant="outline" className="text-base flex items-center gap-1">
          
          {mockCandidates.find(c => c.id === candidate)?.name}
          <button
            type="button"
            className="ml-2 text-red-500 hover:text-red-700"
            onClick={() => setCandidate(undefined)}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      </div>
    )}
  </div>
</div>

            {/* Business Unit(s) */}
            {(interviewType === 'BU' || interviewType === 'HR') && (
              <div className="space-y-2">
                <Label htmlFor="business-unit" className="text-sm font-medium flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>Business Unit(s)</span>
                </Label>
                <div className="relative">
                  <input
                    type="text"
                    value={businessUnit}
                    onChange={e => setBusinessUnit(e.target.value)}
                    placeholder="Type or select business unit"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    autoComplete="off"
                  />
                  {businessUnit.trim().length > 0 && (
                    <div className="absolute z-10 left-0 right-0 bg-white border rounded shadow mt-1 max-h-40 overflow-y-auto">
                      {mockBusinessUnits
                        .filter(unit =>
                          unit.toLowerCase().includes(businessUnit.toLowerCase()) &&
                          !selectedBusinessUnits.includes(unit)
                        )
                        .map(unit => (
                          <div
                            key={unit}
                            className="px-3 py-2 cursor-pointer hover:bg-muted"
                            onClick={() => {
                              setSelectedBusinessUnits([...selectedBusinessUnits, unit]);
                              setBusinessUnit('');
                            }}
                          >
                            {unit}
                          </div>
                        ))}
                      {mockBusinessUnits.filter(unit =>
                        unit.toLowerCase().includes(businessUnit.toLowerCase()) &&
                        !selectedBusinessUnits.includes(unit)
                      ).length === 0 && (
                        <div className="px-3 py-2 text-muted-foreground text-sm">No match</div>
                      )}
                    </div>
                  )}
                  {selectedBusinessUnits.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedBusinessUnits.map(unit => (
                        <Badge key={unit} variant="outline" className="text-base flex items-center gap-1">
                          {unit}
                          <button
                            type="button"
                            className="ml-1 text-red-500 hover:text-red-700"
                            onClick={() =>
                              setSelectedBusinessUnits(selectedBusinessUnits.filter(u => u !== unit))
                            }
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Interview Mode</span>
              </Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {mockLocations.map((loc) => (
                    <SelectItem key={loc.value} value={loc.value}>
                      <div className="flex items-center space-x-2">
                        <loc.icon className="h-4 w-4" />
                        <span>{loc.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!isFormValid}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
            </div>
          </div>

          {/* Right Block: Generate Interview Question Button */}
              <div className="w-full md:w-1/2 flex flex-col items-center justify-start pt-4">
  <Button
    className="w-md mb-4"
    variant="secondary"
    onClick={() => setShowQuestions(true)}
  >
    <Plus className="h-4 w-4 mr-2" />
    Add New Question
  </Button>
 <div className="w-full">
  {!showQuestions ? (
    <div className="rounded-lg border bg-muted/30 p-4 text-center text-muted-foreground">
      Click the button to generate questions related to CV, video, and job position.
    </div>
  ) : (
    <>
      <Accordion type="single" collapsible className="rounded-lg border bg-muted/30 p-2 w-full">
        {questions.map(q => (
          <AccordionItem key={q.key} value={q.key}>
            <div className="flex items-center justify-between pr-2">
              <AccordionTrigger className="!underline-0 !border-0">{q.label}</AccordionTrigger>
              <button
                type="button"
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => setQuestions(questions.filter(qq => qq.key !== q.key))}
                title="Remove question"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <AccordionContent>
              {q.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => setQuestions(shuffleArray(defaultQuestions))}
        >
          Reload
        </Button>
        <Button
          onClick={() => setShowQuestions(false)}
        >
          Accept
        </Button>
      </div>
    </>
  )}
</div>
</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
