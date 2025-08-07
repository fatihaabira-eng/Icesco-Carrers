import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, User, Briefcase, Clock, CheckCircle, HelpCircle } from 'lucide-react';

// Initialize the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

// Sample interview event data
const events = [
  {
    id: 1,
    title: 'Completed: John Doe',
    start: new Date(2025, 7, 5, 10, 0),
    end: new Date(2025, 7, 5, 11, 0),
    status: 'Completed',
    candidate: 'John Doe',
    position: 'Software Engineer',
    interviewer: 'Dr. Mohammed Al-Rashid',
  },
  {
    id: 2,
    title: 'Proposed: Jane Smith',
    start: new Date(2025, 7, 6, 14, 0),
    end: new Date(2025, 7, 6, 15, 0),
    status: 'Proposed',
    candidate: 'Jane Smith',
    position: 'Product Manager',
    interviewer: 'Ms. Fatima Al-Kindi',
  },
  {
    id: 3,
    title: 'Interview: Bob Johnson',
    start: new Date(2025, 7, 1, 9, 0),
    end: new Date(2025, 7, 1, 10, 0),
    status: 'Scheduled',
    candidate: 'Bob Johnson',
    position: 'Data Scientist',
    interviewer: 'Mr. Hassan Al-Mahmoud',
  },
  {
    id: 4,
    title: 'Interview: Sarah Al-Mansouri',
    start: new Date(2025, 7, 12, 11, 0),
    end: new Date(2025, 7, 12, 12, 0),
    status: 'Scheduled',
    candidate: 'Sarah Al-Mansouri',
    position: 'Data Scientist',
    interviewer: 'Dr. Ahmed Al-Rashid',
  },
  {
    id: 5,
    title: 'Proposed: Mohammed Al-Kindi',
    start: new Date(2025, 7, 15, 15, 0),
    end: new Date(2025, 7, 15, 16, 0),
    status: 'Proposed',
    candidate: 'Mohammed Al-Kindi',
    position: 'Software Engineer',
    interviewer: 'Ms. Aisha Al-Zahra',
  },
];

// Function to style calendar events based on their status
const eventStyleGetter = (event: any) => {
  let className = '';
  if (event.status === 'Scheduled') {
    className = 'bg-primary hover:bg-primary/80 border-primary';
  } else if (event.status === 'Proposed') {
    className = 'bg-secondary hover:bg-secondary-light border-osecondary';
  } else if (event.status === 'Completed') {
    className = 'bg-green-500 hover:bg-green-600 border-green-500';
  }
  return {
    className: `${className} text-white p-2 rounded-lg font-medium`,
  };
};

// Function to get a status icon
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Scheduled':
      return <Clock className="h-5 w-5 text-primary " />;
    case 'Proposed':
      return <HelpCircle className="h-5 w-5 text-secondary" />;
    case 'Completed':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    default:
      return null;
  }
};

// Custom styles for react-big-calendar
const calendarStyles = `
  .rbc-calendar {
    font-family: Inter, sans-serif;
  }
  .rbc-toolbar {
    @apply bg-primary/10 p-4 rounded-t-lg mb-4;
  }
  .rbc-toolbar button {
    @apply text-primary hover:bg-primary/20 px-3 py-1 rounded-md font-medium;
  }
  .rbc-month-view, .rbc-time-view {
    @apply border border-gray-200 rounded-lg;
  }
  .rbc-event {
    @apply rounded-lg shadow-sm;
  }
  .rbc-day-bg {
    @apply hover:bg-gray-50;
  }
  .rbc-header {
    @apply bg-primary/5 text-primary font-semibold py-3;
  }
  .rbc-today {
    @apply bg-primary/10;
  }
`;

const CommitteeCalendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler for selecting an event on the calendar
  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <style>{calendarStyles}</style>
      {/* Page Header */}
      {/* <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-sans">Interview Calendar</h1>
          <p className="text-muted-foreground text-sm">
            A visual overview of all your interview schedules.
          </p>
        </div>
        
      </div> */}

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center space-x-3 justify-between">
            <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CalendarIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-sans">Interviews Calendar</CardTitle>
              <p className="text-sm text-muted-foreground">
                Schedule and manage candidate interviews
              </p>
            </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-sm text-muted-foreground font-sans">Scheduled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <span className="text-sm text-muted-foreground font-sans">Proposed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-muted-foreground font-sans">Completed</span>
                </div>
              </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Component */}
          <div className="h-[calc(100vh-250px)]">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              onSelectEvent={handleSelectEvent}
              eventPropGetter={eventStyleGetter}
              views={[Views.MONTH, Views.WEEK, Views.DAY]}
              popup
              className="font-sans"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Event Details Modal */}
      {selectedEvent && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md border-0 shadow-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-xl font-sans">
                {getStatusIcon(selectedEvent.status)}
                <span>Interview Details</span>
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {selectedEvent.title}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-sans">Candidate</p>
                  <p className="font-medium text-primary">{selectedEvent.candidate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-sans">Position</p>
                  <p className="font-medium text-primary">{selectedEvent.position}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-sans">Date & Time</p>
                  <p className="font-medium text-primary">
                    {moment(selectedEvent.start).format('MMMM Do YYYY, h:mm a')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-sans">Interviewer</p>
                  <p className="font-medium text-primary">{selectedEvent.interviewer}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  {getStatusIcon(selectedEvent.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-sans">Status</p>
                  <p className="font-medium text-primary">{selectedEvent.status}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CommitteeCalendar;