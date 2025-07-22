import { useState, useEffect, useCallback } from 'react'
import type { Notification } from '@/components/NotificationCenter'

// Simulated API or real-time notification service
const simulateNotificationService = () => {
  // In a real app, this would connect to a WebSocket or polling service
  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'application_status',
      title: 'Application Status Update',
      message: 'Your application for Senior Software Engineer is now under review.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      actionUrl: '/dashboard',
      applicationId: '1'
    },
    {
      id: '2',
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'Your interview for Digital Transformation Specialist has been scheduled for July 25th at 2:00 PM.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: false,
      actionUrl: '/dashboard',
      applicationId: '2'
    },
    {
      id: '3',
      type: 'general',
      title: 'Profile Updated',
      message: 'Your CV has been successfully uploaded and processed.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: true,
      actionUrl: '/profile'
    }
  ]

  return mockNotifications
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  // Simulate fetching notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        const mockNotifications = simulateNotificationService()
        setNotifications(mockNotifications)
      } catch (error) {
        console.error('Failed to fetch notifications:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new notifications (for demo purposes)
      if (Math.random() < 0.1) { // 10% chance every 10 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: 'application_status',
          title: 'New Status Update',
          message: 'There has been an update to one of your applications.',
          timestamp: new Date(),
          read: false,
          actionUrl: '/dashboard'
        }
        
        setNotifications(prev => [newNotification, ...prev])
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    )
  }, [])

  const clearNotification = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }, [])

  // Simulate adding new notification (for application status changes)
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    setNotifications(prev => [newNotification, ...prev])
  }, [])

  return {
    notifications,
    loading,
    markAsRead,
    clearNotification,
    markAllAsRead,
    addNotification
  }
}