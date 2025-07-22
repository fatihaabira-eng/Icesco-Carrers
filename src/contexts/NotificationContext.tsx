import { createContext, useContext, ReactNode } from 'react'
import { useNotifications } from '@/hooks/useNotifications'
import type { Notification } from '@/components/NotificationCenter'

interface NotificationContextType {
  notifications: Notification[]
  loading: boolean
  markAsRead: (notificationId: string) => void
  clearNotification: (notificationId: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export const useNotificationContext = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider')
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const notificationProps = useNotifications()

  return (
    <NotificationContext.Provider value={notificationProps}>
      {children}
    </NotificationContext.Provider>
  )
}