import type { Notification } from '@/components/NotificationCenter'

// Simulate application status changes and generate appropriate notifications
export const simulateApplicationStatusChange = (
  applicationId: string,
  jobTitle: string,
  newStatus: string,
  candidateName: string = 'candidate'
): Omit<Notification, 'id' | 'timestamp'> => {
  const statusMessages = {
    'received': {
      title: 'Application Received',
      message: `Your application for ${jobTitle} has been received and is being processed.`,
      type: 'application_status' as const
    },
    'under_review': {
      title: 'Application Under Review',
      message: `Your application for ${jobTitle} is now under review by our hiring team.`,
      type: 'application_status' as const
    },
    'shortlisted': {
      title: 'Application Shortlisted',
      message: `Congratulations! You've been shortlisted for ${jobTitle}. We'll be in touch soon.`,
      type: 'application_status' as const
    },
    'interview_scheduled': {
      title: 'Interview Scheduled',
      message: `Your interview for ${jobTitle} has been scheduled. Please check your email for details.`,
      type: 'interview' as const
    },
    'interview_completed': {
      title: 'Interview Completed',
      message: `Thank you for interviewing for ${jobTitle}. We'll be in touch with our decision soon.`,
      type: 'application_status' as const
    },
    'offer_extended': {
      title: 'Job Offer Extended',
      message: `Congratulations! We're pleased to extend an offer for the ${jobTitle} position.`,
      type: 'application_status' as const
    },
    'offer_accepted': {
      title: 'Offer Accepted',
      message: `Welcome to ICESCO! Your acceptance of the ${jobTitle} position has been confirmed.`,
      type: 'application_status' as const
    },
    'rejected': {
      title: 'Application Update',
      message: `Thank you for your interest in ${jobTitle}. Unfortunately, we've decided to move forward with other candidates.`,
      type: 'application_status' as const
    }
  }

  const statusInfo = statusMessages[newStatus.toLowerCase().replace(' ', '_')] || statusMessages['under_review']

  return {
    type: statusInfo.type,
    title: statusInfo.title,
    message: statusInfo.message,
    read: false,
    actionUrl: '/dashboard',
    applicationId
  }
}

// Simulate job application submission
export const simulateJobApplication = (jobTitle: string, jobId: string) => {
  return simulateApplicationStatusChange(jobId, jobTitle, 'received')
}