import { InterviewData } from "../pages/ScheduleInterview"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, MapPin, Building2, Users, Briefcase, Plus, CalendarIcon } from 'lucide-react'

interface CalendarProps {
  onSlotClick: (date: string, time: string) => void
  interviews: InterviewData[]
  currentDate: Date
}


export function Calendar({ onSlotClick, interviews, currentDate }: CalendarProps) {
  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00"
  ]

  const getWeekDays = (date: Date) => {
    const currentDay = date.getDay()
    const monday = new Date(date)
    const daysUntilMonday = currentDay === 0 ? 1 : 1 - currentDay
    monday.setDate(date.getDate() + daysUntilMonday)
    
    return Array.from({ length: 7 }, (_, i) => {
      const weekDate = new Date(monday)
      weekDate.setDate(monday.getDate() + i)
      return weekDate
    })
  }

  const days = getWeekDays(currentDate)
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const dayIcons = [
    Briefcase, // Monday
    Users, // Tuesday  
    Building2, // Wednesday
    User, // Thursday
    MapPin, // Friday
    Clock, // Saturday
    Plus // Sunday
  ]

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const getInterviewForSlot = (date: string, time: string) => {
  return interviews.find(interview => 
    interview.date === date && interview.time === time
  )
}

const isSelectedDay = (date: Date) => {
    return (
      date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getDate() === currentDate.getDate()
    )
  }

  const getInterviewTypeColor = (type: string) => {
    switch (type) {
      case 'HR': return 'bg-blue-50 text-blue-700 border-blue-600'
      case 'committee': return 'bg-emerald-50 text-emerald-700 border-emerald-600'
      case 'BU': return 'bg-yellow-50 text-yellow-700 border-yellow-600'
      default: return 'bg-muted text-muted-foreground border-border'
    }
  }

  const getInterviewTypeIcon = (type: string) => {
    switch (type) {
      case 'HR': return User
      case 'committee': return Users
      case 'business-unit': return Building2
      default: return Briefcase
    }
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  return (
     <Card>
      <CardContent className="p-0">
        <div className="overflow-hidden">
          {/* Header with time slots */}
          <div className="grid grid-cols-10 bg-muted/50 border-b">
            <div className="col-span-1 p-4 border-r border-border">
              <div className="flex items-center justify-center space-x-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-bold">Day / Time</span>
              </div>
            </div>
            {timeSlots.map((time) => (
              <div key={time} className="p-4 text-center border-r border-border last:border-r-0">
                <div className="flex items-center justify-center space-x-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <div className="text-sm font-bold">
                    {time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Days rows */}
          {days.map((day, dayIndex) => {
            const dateStr = formatDate(day)
            const todayClass = isToday(day) ? 'bg-teal-50 border-l-2 border-l-primary' : ''
            const selectedClass = isSelectedDay(day) ? 'ring-inset' : ''
            
            
            return (
              <div
                key={dateStr}
                className={`grid grid-cols-10 border-b border-border last:border-b-0 hover:bg-accent/30 transition-colors ${todayClass} ${selectedClass}`}
                style={isSelectedDay(day) ? { backgroundColor: '#e4ebf0ff' } : {}}
              >
                {/* Day name */}
                <div className={`col-span-1 p-4 border-r border-border bg-muted/30 flex items-center justify-center ${isSelectedDay(day) ? 'font-bold text-primary' : ''}`}>
                  <div className="flex items-center space-x-2">
                  
                    <span className={`text-sm font-bold text-center ${isToday(day) ? 'text-primary' : 'text-foreground'}`}>
                      {dayNames[dayIndex]}
                    </span>
                    {isSelectedDay(day) && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-primary text-white text-xs">Selected</span>
                    )}
                  </div>
                </div>
                
                {/* Time slots for this day */}
                {timeSlots.map((time) => {
                  const interview = getInterviewForSlot(dateStr, time)
                  
                  return (
                    <div 
                      key={`${dateStr}-${time}`}
                      className="p-2 border-r border-border last:border-r-0 min-h-[80px] cursor-pointer hover:bg-teal-700 transition-all duration-200 relative group"
                      onClick={() => !interview && onSlotClick(dateStr, time)}
                    >
                      {interview ? (
                        <div className={`p-3 rounded-md text-xs font-medium h-full flex flex-col justify-between border ${getInterviewTypeColor(interview.type)}`}>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              {(() => {
                                const InterviewIcon = getInterviewTypeIcon(interview.type)
                                return <InterviewIcon className="h-3 w-3" />
                              })()}
                              <div className="font-bold truncate">{interview.candidate}</div>
                            </div>
                            <div className="flex items-center space-x-1 opacity-90">
                              <Badge variant="secondary" className="text-xs px-1 py-0 bg-gray-500 text-white">
                                {interview.type.replace('-', ' ').toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 opacity-75 text-xs">
                            <Briefcase className="h-2 w-2" />
                            <div className="truncate">{interview.jobPosition}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col items-center space-y-1">
                            <Plus className="h-4 w-4 text-white" />
                            <span className="text-xs text-white">Add Interview</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
