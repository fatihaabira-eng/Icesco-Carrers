import { addDays, startOfWeek, addWeeks } from 'date-fns';

export type Candidate = {
  name: string;
  position: string;
  avatar?: string;
};

export type Interview = {
  id: number;
  candidate: Candidate;
  date: string;
  time: string;
  duration: number;
  round: string;
  mode: 'video' | 'in-person' | 'phone';
  location: string;
  status: 'scheduled' | 'confirmed' | 'pending' | 'completed' | 'rescheduled' | 'cancelled';
  businessUnit: string;
};

export function getInterviews(currentWeek: Date): Interview[] {
  return [
    {
      id: 1,
      candidate: {
        name: 'Ahmed Hassan El-Masri',
        position: 'Senior Software Engineer',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      date: '2025-08-12',
      time: '10:00',
      duration: 60,
      round: 'Technical',
      mode: 'video',
      location: 'Google Meet',
      status: 'scheduled',
      businessUnit: 'Engineering',
    },
    {
      id: 2,
      candidate: {
        name: 'Fatima Al-Zahra Benali',
        position: 'Marketing Manager',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      date: '2025-08-18',
      time: '14:00',
      round: 'HR',
      duration: 45,
      mode: 'in-person',
      location: 'Conference Room A',
      status: 'confirmed',
      businessUnit: 'Marketing',
    },
    {
      id: 3,
      candidate: {
        name: 'Omar Khalil Al-Rashid',
        position: 'Education Specialist',
        avatar: 'https://randomuser.me/api/portraits/men/35.jpg'
      },
      date: '2025-08-13',
      time: '11:30',
      duration: 60,
      round: 'Committee',
      mode: 'video',
      location: 'Zoom Meeting',
      status: 'pending',
      businessUnit: 'Education',
    },
    {
      id: 4,
      candidate: {
        name: 'Amina Kone Diabate',
        position: 'Financial Analyst',
        avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
      },
      date: '2025-08-14',
      time: '15:30',
      duration: 45,
      round: 'Technical',
      mode: 'phone',
      location: 'Phone Call',
      status: 'completed',
      businessUnit: 'Finance',
    },
    {
      id: 5,
      candidate: {
        name: 'Youssef Ben Mohamed',
        position: 'Data Scientist',
        avatar: 'https://randomuser.me/api/portraits/men/55.jpg'
      },
      date: '2025-08-15',
      time: '09:00',
      round: 'HR',
      duration: 90,
      mode: 'in-person',
      location: 'Lab Room B',
      status: 'rescheduled',
      businessUnit: 'Research',
    },
    {
      id: 6,
      candidate: {
        name: 'Layla Ibrahim',
        position: 'UX Designer',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
      },
      date: '2025-08-19',
      time: '13:00',
      duration: 60,
      round: 'Technical',
      mode: 'video',
      location: 'Microsoft Teams',
      status: 'confirmed',
      businessUnit: 'Engineering',
    },
  ];
}
