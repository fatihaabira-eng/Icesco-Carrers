import { Button } from "@/components/ui/button"
import { useNotificationContext } from "@/contexts/NotificationContext"
import { simulateApplicationStatusChange } from "@/utils/applicationStatusSimulator"
import { toast } from "@/hooks/use-toast"

export default function StatusUpdateDemo() {
  const { addNotification } = useNotificationContext()

  const triggerStatusUpdate = (status: string) => {
    const jobTitle = "Senior Software Engineer"
    const applicationId = "ICESCO-JOB-2024-001"
    
    const notification = simulateApplicationStatusChange(applicationId, jobTitle, status)
    addNotification(notification)
    
    toast({
      title: "Status Updated",
      description: `Application status changed to: ${status.replace('_', ' ')}`,
    })
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50">
      <h3 className="font-semibold mb-3 text-sm">Demo: Trigger Status Updates</h3>
      <div className="space-y-2">
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => triggerStatusUpdate('under_review')}
          className="w-full text-xs"
        >
          Under Review
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => triggerStatusUpdate('shortlisted')}
          className="w-full text-xs"
        >
          Shortlisted
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => triggerStatusUpdate('interview_scheduled')}
          className="w-full text-xs"
        >
          Interview Scheduled
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => triggerStatusUpdate('offer_extended')}
          className="w-full text-xs"
        >
          Offer Extended
        </Button>
      </div>
    </div>
  )
}